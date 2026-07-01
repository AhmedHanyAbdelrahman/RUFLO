import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { generateReactivationMessage } from '@/lib/ai/generate';

export async function POST(_request: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireUser();
  const supabase = createClient();

  const { data: campaign } = await supabase.from('campaigns').select('*').eq('id', params.id).single();
  if (!campaign || campaign.client_id !== user.client_id) {
    return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
  }

  const { data: client } = await supabase.from('clients').select('name').eq('id', user.client_id!).single();
  const { data: steps } = await supabase
    .from('campaign_steps')
    .select('*')
    .eq('campaign_id', params.id)
    .order('step_order');

  const { data: opportunities } = await supabase
    .from('opportunities')
    .select('*, customers(*), vehicles(*), repair_orders(*)')
    .eq('assigned_campaign_id', params.id);

  const firstStep = steps?.[0];
  if (!firstStep) return NextResponse.json({ error: 'Campaign has no steps' }, { status: 400 });

  const created = [];
  for (const opp of opportunities ?? []) {
    const customer = opp.customers;
    if (!customer || customer.is_opted_out) continue;

    const { count: priorSent } = await supabase
      .from('messages')
      .select('id', { count: 'exact', head: true })
      .eq('customer_id', customer.id)
      .eq('direction', 'outbound')
      .in('status', ['sent', 'delivered']);

    const vehicle = opp.vehicles;
    const vehicleDescription = vehicle ? `${vehicle.year ?? ''} ${vehicle.make ?? ''} ${vehicle.model ?? ''}`.trim() : null;
    const serviceDescription = opp.repair_orders?.service_description ?? 'a check-in on your vehicle';

    const body = await generateReactivationMessage({
      workflow: campaign.workflow,
      channel: firstStep.channel,
      customerFirstName: customer.first_name,
      shopName: client?.name ?? 'your shop',
      vehicleDescription,
      serviceDescription,
      urgency: opp.urgency,
      isFirstOutboundMessage: (priorSent ?? 0) === 0,
      stepNumber: firstStep.step_order,
    });

    const { data: message } = await supabase
      .from('messages')
      .insert({
        client_id: user.client_id,
        campaign_id: campaign.id,
        campaign_step_id: firstStep.id,
        opportunity_id: opp.id,
        customer_id: customer.id,
        channel: firstStep.channel,
        direction: 'outbound',
        body,
        status: 'pending_approval',
        ai_generated: true,
      })
      .select()
      .single();

    created.push(message);
  }

  await supabase.from('campaigns').update({ status: 'pending_approval' }).eq('id', params.id);

  return NextResponse.json({ generated: created.length });
}
