import { notFound } from 'next/navigation';
import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { OPPORTUNITY_TYPE_LABELS } from '@/components/shared/opportunity-type-label';
import type { OpportunityType } from '@/types/database';
import { CampaignActions } from './campaign-actions';
import { MessageReviewList } from './message-review-list';

export default async function CampaignDetailPage({ params }: { params: { id: string } }) {
  const user = await requireUser();
  const supabase = createClient();

  const { data: campaign } = await supabase.from('campaigns').select('*').eq('id', params.id).single();
  if (!campaign || campaign.client_id !== user.client_id) notFound();

  const { data: opportunities } = await supabase
    .from('opportunities')
    .select('id')
    .eq('assigned_campaign_id', params.id);

  const { data: messages } = await supabase
    .from('messages')
    .select('*, customers(first_name, last_name)')
    .eq('campaign_id', params.id)
    .order('created_at');

  const pendingCount = (messages ?? []).filter((m) => m.status === 'pending_approval').length;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{campaign.name}</h1>
          <p className="text-sm text-muted-foreground">
            {OPPORTUNITY_TYPE_LABELS[campaign.workflow as OpportunityType]} · {opportunities?.length ?? 0} opportunities ·
            created {formatDate(campaign.created_at)}
          </p>
        </div>
        <Badge variant={campaign.status === 'active' ? 'green' : campaign.status === 'pending_approval' ? 'yellow' : 'secondary'}>
          {campaign.status.replaceAll('_', ' ')}
        </Badge>
      </div>

      {campaign.approved_by && (
        <Card>
          <CardContent className="pt-6 text-sm text-muted-foreground">
            Approved {formatDate(campaign.approved_at)} by {campaign.approved_by}
          </CardContent>
        </Card>
      )}

      <CampaignActions
        campaignId={campaign.id}
        status={campaign.status}
        messageCount={messages?.length ?? 0}
        pendingCount={pendingCount}
      />

      <Card>
        <CardHeader>
          <CardTitle>AI message review & approval</CardTitle>
        </CardHeader>
        <CardContent>
          <MessageReviewList messages={(messages as any) ?? []} />
        </CardContent>
      </Card>
    </div>
  );
}
