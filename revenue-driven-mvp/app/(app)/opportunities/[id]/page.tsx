import { notFound } from 'next/navigation';
import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UrgencyBadge } from '@/components/shared/urgency-badge';
import { OPPORTUNITY_TYPE_LABELS } from '@/components/shared/opportunity-type-label';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { OpportunityType } from '@/types/database';

const SCORE_FACTOR_LABELS: Record<string, { label: string; max: number }> = {
  service_urgency: { label: 'Service urgency', max: 20 },
  estimated_revenue_value: { label: 'Estimated revenue value', max: 20 },
  time_since_event: { label: 'Time since decline/estimate', max: 15 },
  customer_history_ltv: { label: 'Customer history / LTV', max: 15 },
  vehicle_service_relevance: { label: 'Vehicle/service relevance', max: 10 },
  prior_engagement: { label: 'Prior engagement', max: 10 },
  contactability: { label: 'Contactability', max: 5 },
  shop_capacity_fit: { label: 'Shop capacity fit', max: 5 },
};

export default async function OpportunityDetailPage({ params }: { params: { id: string } }) {
  const user = await requireUser();
  const supabase = createClient();

  const { data: opp } = await supabase
    .from('opportunities')
    .select('*, customers(*), vehicles(*), repair_orders(*)')
    .eq('id', params.id)
    .eq('client_id', user.client_id ?? '')
    .maybeSingle();

  if (!opp) notFound();

  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .eq('opportunity_id', params.id)
    .order('created_at');

  const { data: appointments } = await supabase
    .from('appointments')
    .select('*')
    .eq('opportunity_id', params.id)
    .order('scheduled_at');

  const customer = opp.customers;
  const vehicle = opp.vehicles;
  const ro = opp.repair_orders;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {customer?.first_name} {customer?.last_name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {OPPORTUNITY_TYPE_LABELS[opp.type as OpportunityType]} · detected {formatDate(opp.detected_at)} ·{' '}
            {opp.days_since_event} days since event
          </p>
        </div>
        <UrgencyBadge urgency={opp.urgency} />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Repair order / service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>{ro?.service_description ?? 'No linked repair order (dormant customer win-back).'}</p>
            {ro && (
              <>
                <p className="text-muted-foreground">RO date: {formatDate(ro.ro_date)}</p>
                <p className="text-muted-foreground">Declined: {formatCurrency(ro.declined_value)}</p>
                <p className="text-muted-foreground">Estimate: {formatCurrency(ro.approved_value)}</p>
              </>
            )}
            {vehicle && (
              <p className="text-muted-foreground">
                Vehicle: {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.mileage ? `· ${vehicle.mileage} mi` : ''}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>{customer?.phone ?? 'No phone'}</p>
            <p>{customer?.email ?? 'No email'}</p>
            <p className="text-muted-foreground">LTV: {formatCurrency(customer?.lifetime_value ?? 0)}</p>
            <p className="text-muted-foreground">Visits: {customer?.visit_count ?? 0}</p>
            {customer?.is_opted_out && <p className="font-medium text-destructive">Opted out — cannot message</p>}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Score breakdown — {opp.score}/100
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(opp.score_breakdown ?? {})
              .filter(([key]) => key !== 'total')
              .map(([key, value]) => {
                const meta = SCORE_FACTOR_LABELS[key];
                if (!meta) return null;
                return (
                  <div key={key} className="flex items-center gap-3 text-sm">
                    <span className="w-56">{meta.label}</span>
                    <div className="h-2 flex-1 rounded bg-muted">
                      <div
                        className="h-2 rounded bg-primary"
                        style={{ width: `${(Number(value) / meta.max) * 100}%` }}
                      />
                    </div>
                    <span className="w-12 text-right font-mono">
                      {String(value)}/{meta.max}
                    </span>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Message history</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Channel</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead>Body</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(messages ?? []).map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="uppercase">{m.channel}</TableCell>
                  <TableCell className="capitalize">{m.direction}</TableCell>
                  <TableCell className="max-w-md truncate text-sm">{m.body}</TableCell>
                  <TableCell className="text-sm capitalize">
                    {m.status}
                    {m.reply_intent ? ` · ${m.reply_intent}` : ''}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatDate(m.sent_at)}</TableCell>
                </TableRow>
              ))}
              {(messages ?? []).length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-6 text-center text-muted-foreground">
                    No messages yet — add this opportunity to a campaign.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {(appointments ?? []).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {appointments!.map((a) => (
              <p key={a.id}>
                {formatDate(a.scheduled_at)} — <span className="capitalize">{a.status}</span> (booked via{' '}
                {a.booked_via.replace('_', ' ')})
              </p>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
