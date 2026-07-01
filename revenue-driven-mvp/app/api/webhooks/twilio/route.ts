import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { classifyReply, ESCALATION_INTENTS } from '@/lib/ai/classify';
import { matchesOptOutKeyword } from '@/lib/compliance/optout';

// Twilio posts application/x-www-form-urlencoded to this webhook on inbound SMS.
export async function POST(request: NextRequest) {
  const form = await request.formData();
  const from = String(form.get('From') ?? '');
  const body = String(form.get('Body') ?? '');
  const messageSid = String(form.get('MessageSid') ?? '');

  const supabase = createAdminClient();

  const { data: customer } = await supabase
    .from('customers')
    .select('*')
    .eq('phone', from)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!customer) {
    // Unknown number — log nothing sensitive, just acknowledge.
    return new NextResponse('<Response></Response>', { headers: { 'content-type': 'text/xml' } });
  }

  const { data: lastOutbound } = await supabase
    .from('messages')
    .select('*')
    .eq('customer_id', customer.id)
    .eq('direction', 'outbound')
    .order('sent_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const optOutKeyword = matchesOptOutKeyword(body);

  const inboundMessage = {
    client_id: customer.client_id,
    campaign_id: lastOutbound?.campaign_id ?? null,
    opportunity_id: lastOutbound?.opportunity_id ?? null,
    customer_id: customer.id,
    channel: 'sms' as const,
    direction: 'inbound' as const,
    body,
    status: 'delivered' as const,
    ai_generated: false,
    provider_message_id: messageSid,
  };

  if (optOutKeyword) {
    await supabase.from('opt_outs').insert({
      client_id: customer.client_id,
      customer_id: customer.id,
      phone: from,
      keyword_matched: optOutKeyword,
      channel: 'sms',
    });
    await supabase.from('customers').update({ is_opted_out: true }).eq('id', customer.id);
    await supabase.from('messages').insert({ ...inboundMessage, reply_intent: 'opt_out', reply_confidence: 1 });
    return new NextResponse(
      '<Response><Message>You have been unsubscribed and will not receive further messages. Reply START to opt back in.</Message></Response>',
      { headers: { 'content-type': 'text/xml' } }
    );
  }

  const { data: opportunity } = lastOutbound?.opportunity_id
    ? await supabase.from('opportunities').select('estimated_value').eq('id', lastOutbound.opportunity_id).single()
    : { data: null };

  const classification = await classifyReply(body, opportunity?.estimated_value);

  const { data: insertedMessage } = await supabase
    .from('messages')
    .insert({
      ...inboundMessage,
      reply_intent: classification.intent,
      reply_confidence: classification.confidence,
    })
    .select()
    .single();

  if (lastOutbound?.opportunity_id) {
    await supabase.from('opportunities').update({ status: 'replied' }).eq('id', lastOutbound.opportunity_id);
  }

  if (classification.requiresEscalation || ESCALATION_INTENTS.includes(classification.intent)) {
    await supabase.from('follow_up_tasks').insert({
      client_id: customer.client_id,
      location_id: customer.location_id,
      opportunity_id: lastOutbound?.opportunity_id ?? null,
      message_id: insertedMessage?.id ?? null,
      customer_id: customer.id,
      reason: classification.intent,
      priority: classification.intent === 'angry_or_complaint' ? 'urgent' : 'high',
      status: 'open',
      notes: classification.escalationReason,
    });
  } else if (classification.intent === 'wants_to_book') {
    await supabase.from('follow_up_tasks').insert({
      client_id: customer.client_id,
      location_id: customer.location_id,
      opportunity_id: lastOutbound?.opportunity_id ?? null,
      message_id: insertedMessage?.id ?? null,
      customer_id: customer.id,
      reason: 'wants_to_book',
      priority: 'normal',
      status: 'open',
      notes: 'Customer wants to book — confirm appointment details.',
    });
  }

  return new NextResponse('<Response></Response>', { headers: { 'content-type': 'text/xml' } });
}
