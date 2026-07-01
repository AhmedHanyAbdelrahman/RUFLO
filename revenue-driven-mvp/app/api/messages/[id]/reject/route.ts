import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

export async function POST(_request: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireUser();
  const supabase = createClient();

  const { data: message } = await supabase.from('messages').select('*').eq('id', params.id).single();
  if (!message || message.client_id !== user.client_id) {
    return NextResponse.json({ error: 'Message not found' }, { status: 404 });
  }

  await supabase.from('messages').update({ status: 'failed' }).eq('id', params.id);
  return NextResponse.json({ ok: true });
}
