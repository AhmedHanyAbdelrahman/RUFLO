import Link from 'next/link';
import { requireUser } from '@/lib/auth';
import { listOpportunities, getOpportunitySummary } from '@/lib/queries/opportunities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UrgencyBadge } from '@/components/shared/urgency-badge';
import { OPPORTUNITY_TYPE_LABELS } from '@/components/shared/opportunity-type-label';
import { formatCurrency, formatDate } from '@/lib/utils';
import { OpportunityFiltersBar } from './filters-bar';
import type { OpportunityStatus, OpportunityType, UrgencyLevel } from '@/types/database';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { urgency?: string; type?: string; status?: string };
}) {
  const user = await requireUser();
  const clientId = user.client_id ?? '';

  const [opportunities, summary] = await Promise.all([
    listOpportunities(clientId, {
      urgency: searchParams.urgency as UrgencyLevel | undefined,
      type: searchParams.type as OpportunityType | undefined,
      status: searchParams.status as OpportunityStatus | undefined,
    }),
    getOpportunitySummary(clientId),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Opportunity Dashboard</h1>
        <p className="text-sm text-muted-foreground">Declined jobs, unsold estimates, and dormant customers, ranked by score.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <SummaryCard label="Total opportunities" value={summary.total.toString()} />
        <SummaryCard label="Total value found" value={formatCurrency(summary.totalValue)} />
        <SummaryCard label="Red — safety" value={summary.red.toString()} accent="text-urgent-red" />
        <SummaryCard label="Yellow — attention" value={summary.yellow.toString()} accent="text-urgent-yellow" />
        <SummaryCard label="Not yet worked" value={summary.unworked.toString()} />
      </div>

      <OpportunityFiltersBar />

      <Card>
        <CardHeader>
          <CardTitle>Opportunities ({opportunities?.length ?? 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Detected</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(opportunities ?? []).map((o: any) => (
                <TableRow key={o.id}>
                  <TableCell>
                    <Link href={`/opportunities/${o.id}`} className="font-medium text-primary hover:underline">
                      {o.customers?.first_name} {o.customers?.last_name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {o.vehicles ? `${o.vehicles.year ?? ''} ${o.vehicles.make ?? ''} ${o.vehicles.model ?? ''}`.trim() : '—'}
                  </TableCell>
                  <TableCell className="text-sm">{OPPORTUNITY_TYPE_LABELS[o.type as OpportunityType]}</TableCell>
                  <TableCell>
                    <UrgencyBadge urgency={o.urgency} />
                  </TableCell>
                  <TableCell>{formatCurrency(o.estimated_value)}</TableCell>
                  <TableCell className="font-mono">{o.score}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatDate(o.detected_at)}</TableCell>
                  <TableCell className="text-sm capitalize">{o.status}</TableCell>
                </TableRow>
              ))}
              {(opportunities ?? []).length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                    No opportunities yet. Import Tekmetric data to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryCard({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={`text-2xl font-bold ${accent ?? ''}`}>{value}</p>
      </CardContent>
    </Card>
  );
}
