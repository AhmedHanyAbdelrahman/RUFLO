'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function CampaignActions({
  campaignId,
  status,
  messageCount,
  pendingCount,
}: {
  campaignId: string;
  status: string;
  messageCount: number;
  pendingCount: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<'generate' | 'approve' | null>(null);

  async function handleGenerate() {
    setLoading('generate');
    await fetch(`/api/campaigns/${campaignId}/generate`, { method: 'POST' });
    setLoading(null);
    router.refresh();
  }

  async function handleApproveAll() {
    setLoading('approve');
    await fetch(`/api/campaigns/${campaignId}/approve`, { method: 'POST' });
    setLoading(null);
    router.refresh();
  }

  return (
    <div className="flex gap-2">
      {messageCount === 0 && (
        <Button onClick={handleGenerate} disabled={loading !== null}>
          {loading === 'generate' ? 'Generating…' : 'Generate AI drafts'}
        </Button>
      )}
      {pendingCount > 0 && status !== 'active' && (
        <Button onClick={handleApproveAll} disabled={loading !== null}>
          {loading === 'approve' ? 'Approving & sending…' : `Approve & send all ${pendingCount} drafts`}
        </Button>
      )}
    </div>
  );
}
