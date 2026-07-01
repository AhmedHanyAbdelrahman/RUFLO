import Link from 'next/link';
import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { OPPORTUNITY_TYPE_LABELS } from '@/components/shared/opportunity-type-label';
import type { OpportunityType } from '@/types/database';

export default async function CampaignsPage() {
  const user = await requireUser();
  const supabase = createClient();
  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('*')
    .eq('client_id', user.client_id ?? '')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Campaigns</h1>
          <p className="text-sm text-muted-foreground">Build reactivation sequences and review AI-drafted messages before sending.</p>
        </div>
        <Button asChild>
          <Link href="/campaigns/new">New campaign</Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {(campaigns ?? []).map((c) => (
          <Link key={c.id} href={`/campaigns/${c.id}`}>
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base">{c.name}</CardTitle>
                <Badge variant={c.status === 'active' ? 'green' : c.status === 'pending_approval' ? 'yellow' : 'secondary'}>
                  {c.status.replaceAll('_', ' ')}
                </Badge>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {OPPORTUNITY_TYPE_LABELS[c.workflow as OpportunityType]} · created {formatDate(c.created_at)}
              </CardContent>
            </Card>
          </Link>
        ))}
        {(campaigns ?? []).length === 0 && <p className="text-sm text-muted-foreground">No campaigns yet.</p>}
      </div>
    </div>
  );
}
