import { createClient } from '@/lib/supabase/server';
import type { FoundMoneyMetrics } from '@/types/database';

// Cost basis for ROI: sum of clients' active plan price for the period.
// Kept simple for the MVP — a real implementation would prorate by billing cycle.
const PLAN_MONTHLY_COST: Record<string, number> = {
  found_money_sprint: 500,
  reactivate_lite: 500,
  reactivate_growth: 1500,
  revenue_driven_os: 3000,
  enterprise: 5000,
};

export async function getFoundMoneyMetrics(clientId: string): Promise<FoundMoneyMetrics> {
  const supabase = createClient();

  const [
    { count: declinedJobsScanned },
    { data: opportunityValues },
    { count: topOpportunities },
    { count: messagesSent },
    { count: repliesReceived },
    { count: appointmentsBooked },
    { count: estimatesReopened },
    { data: outcomes },
    { data: client },
  ] = await Promise.all([
    supabase.from('repair_orders').select('id', { count: 'exact', head: true }).eq('client_id', clientId).eq('status', 'declined'),
    supabase.from('opportunities').select('estimated_value').eq('client_id', clientId),
    supabase.from('opportunities').select('id', { count: 'exact', head: true }).eq('client_id', clientId).gte('score', 70),
    supabase
      .from('messages')
      .select('id', { count: 'exact', head: true })
      .eq('client_id', clientId)
      .eq('direction', 'outbound')
      .in('status', ['sent', 'delivered']),
    supabase.from('messages').select('id', { count: 'exact', head: true }).eq('client_id', clientId).eq('direction', 'inbound'),
    supabase.from('appointments').select('id', { count: 'exact', head: true }).eq('client_id', clientId),
    supabase
      .from('outcomes')
      .select('id', { count: 'exact', head: true })
      .eq('client_id', clientId)
      .eq('type', 'estimate_reopened'),
    supabase.from('outcomes').select('recovered_value, verified').eq('client_id', clientId),
    supabase.from('clients').select('plan_tier').eq('id', clientId).single(),
  ]);

  const totalDeclinedValue = (opportunityValues ?? []).reduce((sum, o) => sum + Number(o.estimated_value), 0);
  const estimatedRecoveredRevenue = (outcomes ?? []).reduce((sum, o) => sum + Number(o.recovered_value), 0);
  const verifiedRecoveredRevenue = (outcomes ?? [])
    .filter((o) => o.verified)
    .reduce((sum, o) => sum + Number(o.recovered_value), 0);

  const replyRate = (messagesSent ?? 0) > 0 ? (repliesReceived ?? 0) / (messagesSent ?? 1) : 0;
  const monthlyCost = PLAN_MONTHLY_COST[client?.plan_tier ?? 'found_money_sprint'] ?? 500;
  const roiMultiple = monthlyCost > 0 ? verifiedRecoveredRevenue / monthlyCost : 0;

  return {
    declined_jobs_scanned: declinedJobsScanned ?? 0,
    total_declined_value: totalDeclinedValue,
    top_opportunities_found: topOpportunities ?? 0,
    messages_sent: messagesSent ?? 0,
    replies_received: repliesReceived ?? 0,
    reply_rate: replyRate,
    appointments_booked: appointmentsBooked ?? 0,
    estimates_reopened: estimatesReopened ?? 0,
    estimated_recovered_revenue: estimatedRecoveredRevenue,
    verified_recovered_revenue: verifiedRecoveredRevenue,
    roi_multiple: roiMultiple,
  };
}
