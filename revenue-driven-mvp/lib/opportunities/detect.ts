import { createAdminClient } from '@/lib/supabase/admin';
import { classifyUrgency, scoreOpportunity } from '@/lib/scoring';
import { daysSince } from '@/lib/utils';
import type { OpportunityType, RepairOrder, Customer, Vehicle } from '@/types/database';

const DORMANT_MIN_DAYS = 180; // 6 months
const DORMANT_MAX_DAYS = 730; // 24 months

interface DetectionContext {
  clientId: string;
  locationId: string;
}

/**
 * Scans repair_orders + customers for a location and creates/updates opportunities:
 *  - declined_job: repair_orders with status 'declined'
 *  - unsold_estimate: repair_orders with ro_type 'estimate' and status 'estimate_pending'
 *  - dormant_customer: customers whose last_visit_date is 6-24 months ago
 * Idempotent: re-running does not duplicate opportunities for the same source row.
 */
export async function detectOpportunities({ clientId, locationId }: DetectionContext) {
  const supabase = createAdminClient();

  const { data: location } = await supabase
    .from('locations')
    .select('daily_capacity')
    .eq('id', locationId)
    .single();
  const dailyCapacity = location?.daily_capacity ?? 20;

  const { count: appointmentsThisWeek } = await supabase
    .from('appointments')
    .select('id', { count: 'exact', head: true })
    .eq('location_id', locationId)
    .gte('scheduled_at', new Date().toISOString())
    .lte('scheduled_at', new Date(Date.now() + 7 * 86400000).toISOString());
  const openSlotsThisWeek = Math.max(0, dailyCapacity * 7 - (appointmentsThisWeek ?? 0));

  const { data: repairOrders } = await supabase
    .from('repair_orders')
    .select('*')
    .eq('client_id', clientId)
    .eq('location_id', locationId)
    .in('status', ['declined', 'estimate_pending']);

  let created = 0;

  for (const ro of (repairOrders ?? []) as RepairOrder[]) {
    const type: OpportunityType = ro.status === 'declined' ? 'declined_job' : 'unsold_estimate';
    created += await upsertOpportunityForRepairOrder(supabase, ro, type, clientId, locationId, dailyCapacity, openSlotsThisWeek);
  }

  const { data: customers } = await supabase
    .from('customers')
    .select('*')
    .eq('client_id', clientId)
    .eq('location_id', locationId)
    .eq('is_opted_out', false)
    .not('last_visit_date', 'is', null);

  for (const customer of (customers ?? []) as Customer[]) {
    const days = daysSince(customer.last_visit_date);
    if (days < DORMANT_MIN_DAYS || days > DORMANT_MAX_DAYS) continue;
    created += await upsertOpportunityForDormantCustomer(supabase, customer, clientId, locationId, dailyCapacity, openSlotsThisWeek);
  }

  return { created };
}

async function upsertOpportunityForRepairOrder(
  supabase: ReturnType<typeof createAdminClient>,
  ro: RepairOrder,
  type: OpportunityType,
  clientId: string,
  locationId: string,
  dailyCapacity: number,
  openSlotsThisWeek: number
) {
  const { data: existing } = await supabase
    .from('opportunities')
    .select('id')
    .eq('repair_order_id', ro.id)
    .maybeSingle();
  if (existing) return 0;

  const { data: customer } = await supabase.from('customers').select('*').eq('id', ro.customer_id).single();
  const { data: vehicle } = await supabase.from('vehicles').select('*').eq('id', ro.vehicle_id).maybeSingle();

  const urgency = classifyUrgency(ro.service_description);
  const estimatedValue = type === 'declined_job' ? Number(ro.declined_value) : Number(ro.approved_value) || Number(ro.declined_value);
  const daysSinceEvent = daysSince(ro.ro_date);
  const priorMessages = await countPriorMessages(supabase, ro.customer_id);

  const breakdown = scoreOpportunity({
    type,
    urgency,
    estimatedValue,
    daysSinceEvent,
    customerLifetimeValue: Number(customer?.lifetime_value ?? 0),
    customerVisitCount: customer?.visit_count ?? 0,
    vehicleAgeYears: vehicleAge(vehicle as Vehicle | null),
    priorMessagesSent: priorMessages.sent,
    priorRepliesReceived: priorMessages.replied,
    hasPhone: Boolean(customer?.phone),
    hasEmail: Boolean(customer?.email),
    isOptedOut: Boolean(customer?.is_opted_out),
    shopDailyCapacity: dailyCapacity,
    shopOpenSlotsThisWeek: openSlotsThisWeek,
  });

  await supabase.from('opportunities').insert({
    client_id: clientId,
    location_id: locationId,
    customer_id: ro.customer_id,
    vehicle_id: ro.vehicle_id,
    repair_order_id: ro.id,
    type,
    urgency,
    estimated_value: estimatedValue,
    score: breakdown.total,
    score_breakdown: breakdown,
    status: 'scored',
    days_since_event: daysSinceEvent,
  });

  return 1;
}

async function upsertOpportunityForDormantCustomer(
  supabase: ReturnType<typeof createAdminClient>,
  customer: Customer,
  clientId: string,
  locationId: string,
  dailyCapacity: number,
  openSlotsThisWeek: number
) {
  const { data: existing } = await supabase
    .from('opportunities')
    .select('id')
    .eq('customer_id', customer.id)
    .eq('type', 'dormant_customer')
    .in('status', ['new', 'scored', 'queued', 'messaged', 'replied'])
    .maybeSingle();
  if (existing) return 0;

  const { data: vehicle } = await supabase
    .from('vehicles')
    .select('*')
    .eq('customer_id', customer.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const daysSinceEvent = daysSince(customer.last_visit_date);
  const priorMessages = await countPriorMessages(supabase, customer.id);

  const breakdown = scoreOpportunity({
    type: 'dormant_customer',
    urgency: 'green',
    estimatedValue: Number(customer.lifetime_value) / Math.max(1, customer.visit_count) || 150,
    daysSinceEvent,
    customerLifetimeValue: Number(customer.lifetime_value),
    customerVisitCount: customer.visit_count,
    vehicleAgeYears: vehicleAge(vehicle as Vehicle | null),
    priorMessagesSent: priorMessages.sent,
    priorRepliesReceived: priorMessages.replied,
    hasPhone: Boolean(customer.phone),
    hasEmail: Boolean(customer.email),
    isOptedOut: customer.is_opted_out,
    shopDailyCapacity: dailyCapacity,
    shopOpenSlotsThisWeek: openSlotsThisWeek,
  });

  await supabase.from('opportunities').insert({
    client_id: clientId,
    location_id: locationId,
    customer_id: customer.id,
    vehicle_id: vehicle?.id ?? null,
    repair_order_id: null,
    type: 'dormant_customer',
    urgency: 'green',
    estimated_value: Number(customer.lifetime_value) / Math.max(1, customer.visit_count) || 150,
    score: breakdown.total,
    score_breakdown: breakdown,
    status: 'scored',
    days_since_event: daysSinceEvent,
  });

  return 1;
}

async function countPriorMessages(supabase: ReturnType<typeof createAdminClient>, customerId: string) {
  const { count: sent } = await supabase
    .from('messages')
    .select('id', { count: 'exact', head: true })
    .eq('customer_id', customerId)
    .eq('direction', 'outbound')
    .in('status', ['sent', 'delivered']);
  const { count: replied } = await supabase
    .from('messages')
    .select('id', { count: 'exact', head: true })
    .eq('customer_id', customerId)
    .eq('direction', 'inbound');
  return { sent: sent ?? 0, replied: replied ?? 0 };
}

function vehicleAge(vehicle: Vehicle | null): number | null {
  if (!vehicle?.year) return null;
  return new Date().getFullYear() - vehicle.year;
}
