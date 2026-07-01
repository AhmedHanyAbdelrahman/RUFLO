'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate } from '@/lib/utils';

const PRIORITY_COLORS: Record<string, 'red' | 'yellow' | 'secondary'> = {
  urgent: 'red',
  high: 'yellow',
  normal: 'secondary',
  low: 'secondary',
};

interface Task {
  id: string;
  reason: string;
  priority: string;
  status: string;
  notes: string | null;
  created_at: string;
  customers: { first_name: string; last_name: string; phone: string | null } | null;
  opportunities: { id: string; estimated_value: number } | null;
}

export function TaskRow({ task }: { task: Task }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function setStatus(status: string) {
    setBusy(true);
    await fetch(`/api/tasks/${task.id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setBusy(false);
    router.refresh();
  }

  return (
    <div className="flex items-center justify-between rounded-md border p-3">
      <div>
        <div className="flex items-center gap-2">
          <span className="font-medium">
            {task.customers?.first_name} {task.customers?.last_name}
          </span>
          <Badge variant={PRIORITY_COLORS[task.priority] ?? 'secondary'}>{task.priority}</Badge>
          <span className="text-xs text-muted-foreground capitalize">{task.reason.replaceAll('_', ' ')}</span>
        </div>
        {task.notes && <p className="text-sm text-muted-foreground">{task.notes}</p>}
        <p className="text-xs text-muted-foreground">
          {task.customers?.phone ?? 'no phone'} · opened {formatDate(task.created_at)}
          {task.opportunities ? ` · ${formatCurrency(task.opportunities.estimated_value)} opportunity` : ''}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {task.opportunities && (
          <Button asChild variant="outline" size="sm">
            <Link href={`/opportunities/${task.opportunities.id}`}>View</Link>
          </Button>
        )}
        {task.status === 'open' && (
          <Button size="sm" variant="outline" onClick={() => setStatus('in_progress')} disabled={busy}>
            Claim
          </Button>
        )}
        <Button size="sm" onClick={() => setStatus('done')} disabled={busy}>
          Mark done
        </Button>
      </div>
    </div>
  );
}
