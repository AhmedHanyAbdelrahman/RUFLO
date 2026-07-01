import { NextRequest, NextResponse } from 'next/server';
import { dispatchApprovedMessage, OptOutError } from '@/lib/messaging/send';

export async function POST(request: NextRequest) {
  const { messageId } = await request.json();
  if (!messageId) return NextResponse.json({ error: 'messageId is required' }, { status: 400 });

  try {
    await dispatchApprovedMessage(messageId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof OptOutError) {
      return NextResponse.json({ error: err.message }, { status: 409 });
    }
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
