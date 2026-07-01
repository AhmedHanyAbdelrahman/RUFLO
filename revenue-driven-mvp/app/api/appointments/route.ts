import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const user = await requireUser();
  const body = await request.json();
  const supabase = createClient();

  const { data: opportunity } = await supabase
    .from('opportunities')
    .select('*')
    .eq('id', body.opportunityId)
    .single();
  if (!opportunity) return NextResponse.json({ error: 'Opportunity not found' }, { status: 404 });

  const { data: appointment, error } = await supabase
    .from('appointments')
    .insert({
      client_id: user.client_id,
      location_id: opportunity.location_id,
      opportunity_id: opportunity.id,
      customer_id: opportunity.customer_id,
      vehicle_id: opportunity.vehicle_id,
      scheduled_at: body.scheduledAt,
      status: 'scheduled',
      booked_via: body.bookedVia ?? 'human_followup',
      notes: body.notes ?? null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase.from('opportunities').update({ status: 'booked' }).eq('id', opportunity.id);

  return NextResponse.json(appointment);
}
