import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireUser();
  const body = await request.json();
  const supabase = createClient();

  const { data: task } = await supabase.from('follow_up_tasks').select('client_id').eq('id', params.id).single();
  if (!task || task.client_id !== user.client_id) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  const updates: Record<string, unknown> = {};
  if (body.status) updates.status = body.status;
  if (body.assigned_to !== undefined) updates.assigned_to = body.assigned_to;
  if (body.notes !== undefined) updates.notes = body.notes;

  await supabase.from('follow_up_tasks').update(updates).eq('id', params.id);
  return NextResponse.json({ ok: true });
}
