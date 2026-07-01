import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const user = await requireUser();
  if (!user.client_id) return NextResponse.json({ error: 'User has no client assigned' }, { status: 400 });

  const body = await request.json();
  const { name, workflow, locationId, opportunityIds, steps } = body as {
    name: string;
    workflow: string;
    locationId: string;
    opportunityIds: string[];
    steps: { channel: 'sms' | 'email'; delay_hours: number }[];
  };

  const supabase = createClient();

  const { data: campaign, error } = await supabase
    .from('campaigns')
    .insert({
      client_id: user.client_id,
      location_id: locationId,
      name,
      workflow,
      status: 'draft',
      created_by: user.id,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const stepRows = steps.map((s, i) => ({
    campaign_id: campaign.id,
    step_order: i + 1,
    channel: s.channel,
    delay_hours: s.delay_hours,
  }));
  await supabase.from('campaign_steps').insert(stepRows);

  await supabase
    .from('opportunities')
    .update({ assigned_campaign_id: campaign.id, status: 'queued' })
    .in('id', opportunityIds);

  return NextResponse.json(campaign);
}
