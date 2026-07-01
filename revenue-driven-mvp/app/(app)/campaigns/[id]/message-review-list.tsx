'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface MessageRow {
  id: string;
  body: string;
  status: string;
  channel: string;
  reply_intent: string | null;
  customers: { first_name: string; last_name: string } | null;
}

export function MessageReviewList({ messages }: { messages: MessageRow[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);

  async function approve(id: string) {
    setBusy(id);
    const edited = editing[id];
    await fetch(`/api/messages/${id}/approve`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(edited ? { body: edited } : {}),
    });
    setBusy(null);
    router.refresh();
  }

  async function reject(id: string) {
    setBusy(id);
    await fetch(`/api/messages/${id}/reject`, { method: 'POST' });
    setBusy(null);
    router.refresh();
  }

  if (messages.length === 0) {
    return <p className="text-sm text-muted-foreground">No drafts yet — click "Generate AI drafts" above.</p>;
  }

  return (
    <div className="space-y-4">
      {messages.map((m) => (
        <div key={m.id} className="space-y-2 rounded-md border p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {m.customers?.first_name} {m.customers?.last_name} · {m.channel.toUpperCase()}
            </span>
            <StatusBadge status={m.status} intent={m.reply_intent} />
          </div>
          {m.status === 'pending_approval' ? (
            <Textarea
              defaultValue={m.body}
              onChange={(e) => setEditing((s) => ({ ...s, [m.id]: e.target.value }))}
              rows={3}
            />
          ) : (
            <p className="text-sm">{m.body}</p>
          )}
          {m.status === 'pending_approval' && (
            <div className="flex gap-2">
              <Button size="sm" onClick={() => approve(m.id)} disabled={busy === m.id}>
                Approve & send
              </Button>
              <Button size="sm" variant="outline" onClick={() => reject(m.id)} disabled={busy === m.id}>
                Reject
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ status, intent }: { status: string; intent: string | null }) {
  if (status === 'pending_approval') return <Badge variant="yellow">Needs approval</Badge>;
  if (status === 'sent' || status === 'delivered') return <Badge variant="green">{status}</Badge>;
  if (status === 'failed') return <Badge variant="red">Rejected / failed</Badge>;
  return <Badge variant="secondary">{status}{intent ? ` · ${intent}` : ''}</Badge>;
}
