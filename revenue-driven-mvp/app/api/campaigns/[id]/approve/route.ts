import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { dispatchApprovedMessage, OptOutError } from '@/lib/messaging/send';

export async function POST(_request: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireUser();
  const supabase = createClient();

  const { data: campaign } = await supabase.from('campaigns').select('*').eq('id', params.id).single();
  if (!campaign || campaign.client_id !== user.client_id) {
    return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
  }

  await supabase
    .from('campaigns')
    .update({ status: 'active', approved_by: user.id, approved_at: new Date().toISOString() })
    .eq('id', params.id);

  const { data: pendingMessages } = await supabase
    .from('messages')
    .select('id')
    .eq('campaign_id', params.id)
    .eq('status', 'pending_approval');

  let sent = 0;
  let failed = 0;

  for (const m of pendingMessages ?? []) {
    await supabase
      .from('messages')
      .update({ status: 'approved', approved_by: user.id, approved_at: new Date().toISOString() })
      .eq('id', m.id);
    try {
      await dispatchApprovedMessage(m.id);
      sent += 1;
    } catch (err) {
      failed += 1;
      if (!(err instanceof OptOutError)) console.error(`Failed to send message ${m.id}:`, err);
    }
  }

  return NextResponse.json({ sent, failed });
}
