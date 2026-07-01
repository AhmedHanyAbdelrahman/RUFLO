import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { dispatchApprovedMessage } from '@/lib/messaging/send';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireUser();
  const body = await request.json().catch(() => ({}));
  const editedBody: string | undefined = body?.body;

  const supabase = createClient();
  const { data: message } = await supabase.from('messages').select('*').eq('id', params.id).single();
  if (!message || message.client_id !== user.client_id) {
    return NextResponse.json({ error: 'Message not found' }, { status: 404 });
  }

  await supabase
    .from('messages')
    .update({
      status: 'approved',
      approved_by: user.id,
      approved_at: new Date().toISOString(),
      ...(editedBody ? { body: editedBody } : {}),
    })
    .eq('id', params.id);

  try {
    await dispatchApprovedMessage(params.id);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
