import { createClient } from '@/lib/supabase/server';
import type { OpportunityStatus, OpportunityType, UrgencyLevel } from '@/types/database';

export interface OpportunityFilters {
  urgency?: UrgencyLevel;
  type?: OpportunityType;
  status?: OpportunityStatus;
  locationId?: string;
}

export async function listOpportunities(clientId: string, filters: OpportunityFilters = {}) {
  const supabase = createClient();
  let query = supabase
    .from('opportunities')
    .select('*, customers(first_name, last_name, phone, email), vehicles(year, make, model)')
    .eq('client_id', clientId)
    .order('score', { ascending: false })
    .limit(200);

  if (filters.urgency) query = query.eq('urgency', filters.urgency);
  if (filters.type) query = query.eq('type', filters.type);
  if (filters.status) query = query.eq('status', filters.status);
  if (filters.locationId) query = query.eq('location_id', filters.locationId);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getOpportunitySummary(clientId: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from('opportunities')
    .select('urgency, estimated_value, status')
    .eq('client_id', clientId);

  const rows = data ?? [];
  return {
    total: rows.length,
    totalValue: rows.reduce((sum, r) => sum + Number(r.estimated_value), 0),
    red: rows.filter((r) => r.urgency === 'red').length,
    yellow: rows.filter((r) => r.urgency === 'yellow').length,
    green: rows.filter((r) => r.urgency === 'green').length,
    unworked: rows.filter((r) => ['new', 'scored'].includes(r.status)).length,
  };
}
