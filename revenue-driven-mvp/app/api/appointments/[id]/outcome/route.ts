import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireUser();
  const body = await request.json();
  const supabase = createClient();

  const { data: appointment } = await supabase.from('appointments').select('*').eq('id', params.id).single();
  if (!appointment || appointment.client_id !== user.client_id) {
    return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
  }

  await supabase.from('appointments').update({ status: body.appointmentStatus ?? 'completed' }).eq('id', params.id);

  const { data: outcome, error } = await supabase
    .from('outcomes')
    .insert({
      client_id: user.client_id,
      opportunity_id: appointment.opportunity_id,
      appointment_id: appointment.id,
      type: body.type ?? 'job_completed',
      recovered_value: body.recoveredValue ?? 0,
      verified: Boolean(body.verified),
      verified_by: body.verified ? user.id : null,
      verified_at: body.verified ? new Date().toISOString() : null,
      notes: body.notes ?? null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (appointment.opportunity_id) {
    await supabase.from('opportunities').update({ status: 'won' }).eq('id', appointment.opportunity_id);
  }

  return NextResponse.json(outcome);
}
