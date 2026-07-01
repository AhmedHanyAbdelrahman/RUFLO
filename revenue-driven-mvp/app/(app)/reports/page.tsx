import { requireUser } from '@/lib/auth';
import { getFoundMoneyMetrics } from '@/lib/queries/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

export default async function ReportsPage() {
  const user = await requireUser();
  const metrics = await getFoundMoneyMetrics(user.client_id ?? '');

  const cards: { label: string; value: string; hint?: string }[] = [
    { label: 'Declined jobs scanned', value: metrics.declined_jobs_scanned.toLocaleString() },
    { label: 'Total declined value', value: formatCurrency(metrics.total_declined_value) },
    { label: 'Top opportunities found', value: metrics.top_opportunities_found.toLocaleString(), hint: 'score ≥ 70' },
    { label: 'Messages sent', value: metrics.messages_sent.toLocaleString() },
    { label: 'Replies received', value: metrics.replies_received.toLocaleString() },
    { label: 'Reply rate', value: `${(metrics.reply_rate * 100).toFixed(1)}%` },
    { label: 'Appointments booked', value: metrics.appointments_booked.toLocaleString() },
    { label: 'Estimates reopened', value: metrics.estimates_reopened.toLocaleString() },
    { label: 'Estimated recovered revenue', value: formatCurrency(metrics.estimated_recovered_revenue) },
    { label: 'Verified recovered revenue', value: formatCurrency(metrics.verified_recovered_revenue) },
    { label: 'ROI multiple', value: `${metrics.roi_multiple.toFixed(1)}x`, hint: 'verified revenue ÷ monthly plan cost' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Found Money Report</h1>
        <p className="text-sm text-muted-foreground">Prove the ROI of Revenue Driven for this shop, at a glance.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{c.value}</p>
              {c.hint && <p className="text-xs text-muted-foreground">{c.hint}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
