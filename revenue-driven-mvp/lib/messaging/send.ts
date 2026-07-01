import { createAdminClient } from '@/lib/supabase/admin';
import { sendSms } from './sms';
import { sendEmail } from './email';
import type { Message } from '@/types/database';

export class OptOutError extends Error {
  constructor(customerId: string) {
    super(`Customer ${customerId} has opted out — message blocked.`);
    this.name = 'OptOutError';
  }
}

/**
 * Sends an approved message. Re-checks opt-out status immediately before send
 * (a customer may have opted out after the message was approved but before send).
 */
export async function dispatchApprovedMessage(messageId: string): Promise<void> {
  const supabase = createAdminClient();

  const { data: message } = await supabase.from('messages').select('*').eq('id', messageId).single();
  if (!message) throw new Error(`Message ${messageId} not found`);
  const msg = message as Message;

  if (msg.status !== 'approved' && msg.status !== 'queued') {
    throw new Error(`Message ${messageId} is not approved for sending (status=${msg.status})`);
  }

  const { data: customer } = await supabase.from('customers').select('*').eq('id', msg.customer_id).single();
  if (!customer) throw new Error(`Customer ${msg.customer_id} not found`);

  const { data: optOut } = await supabase
    .from('opt_outs')
    .select('id')
    .eq('client_id', msg.client_id)
    .or(`phone.eq.${customer.phone ?? '__none__'},email.eq.${customer.email ?? '__none__'}`)
    .maybeSingle();

  if (customer.is_opted_out || optOut) {
    await supabase.from('messages').update({ status: 'failed' }).eq('id', messageId);
    throw new OptOutError(customer.id);
  }

  try {
    if (msg.channel === 'sms') {
      if (!customer.phone) throw new Error('Customer has no phone number on file');
      const result = await sendSms(customer.phone, msg.body);
      await supabase
        .from('messages')
        .update({ status: 'sent', provider_message_id: result.providerMessageId, sent_at: new Date().toISOString() })
        .eq('id', messageId);
    } else {
      if (!customer.email) throw new Error('Customer has no email on file');
      const result = await sendEmail(customer.email, 'A quick note from your shop', msg.body);
      await supabase
        .from('messages')
        .update({ status: 'sent', provider_message_id: result.providerMessageId, sent_at: new Date().toISOString() })
        .eq('id', messageId);
    }

    if (msg.opportunity_id) {
      await supabase.from('opportunities').update({ status: 'messaged' }).eq('id', msg.opportunity_id);
    }
  } catch (err) {
    await supabase.from('messages').update({ status: 'failed' }).eq('id', messageId);
    throw err;
  }
}
