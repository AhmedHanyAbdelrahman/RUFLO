import { createAdminClient } from '@/lib/supabase/admin';
import { detectOpportunities } from '@/lib/opportunities/detect';
import type { NormalizedRow } from './normalize';

export interface CommitContext {
  clientId: string;
  locationId: string;
  fileImportId: string;
}

/**
 * Writes normalized rows into customers/vehicles/repair_orders, upserting
 * customers by source_customer_id (or name+phone if no source id), then
 * runs opportunity detection for the location.
 */
export async function commitImport(rows: NormalizedRow[], ctx: CommitContext) {
  const supabase = createAdminClient();
  let repairOrdersCreated = 0;

  for (const row of rows) {
    const customerId = await upsertCustomer(supabase, row, ctx);
    const vehicleId = await upsertVehicle(supabase, row, customerId, ctx);

    await supabase.from('repair_orders').insert({
      client_id: ctx.clientId,
      location_id: ctx.locationId,
      customer_id: customerId,
      vehicle_id: vehicleId,
      source_ro_number: row.ro_number,
      ro_type: row.ro_type,
      service_description: row.service_description,
      line_items: [
        {
          description: row.service_description,
          category: row.ro_type,
          price: row.ro_status === 'declined' ? row.declined_value : row.approved_value,
          status: row.ro_status === 'declined' ? 'declined' : row.ro_status === 'approved' ? 'approved' : 'estimate',
        },
      ],
      declined_value: row.declined_value,
      approved_value: row.approved_value,
      status: row.ro_status,
      ro_date: row.ro_date,
      imported_from: ctx.fileImportId,
    });
    repairOrdersCreated += 1;
  }

  await supabase
    .from('files_imports')
    .update({ status: 'imported', row_count: rows.length, valid_row_count: rows.length })
    .eq('id', ctx.fileImportId);

  const detection = await detectOpportunities({ clientId: ctx.clientId, locationId: ctx.locationId });

  return { repairOrdersCreated, opportunitiesCreated: detection.created };
}

async function upsertCustomer(
  supabase: ReturnType<typeof createAdminClient>,
  row: NormalizedRow,
  ctx: CommitContext
): Promise<string> {
  const sourceId = row.customer_source_id;

  if (sourceId) {
    const { data: existing } = await supabase
      .from('customers')
      .select('id')
      .eq('client_id', ctx.clientId)
      .eq('location_id', ctx.locationId)
      .eq('source_customer_id', sourceId)
      .maybeSingle();
    if (existing) {
      await maybeUpdateVisit(supabase, existing.id, row);
      return existing.id;
    }
  } else if (row.customer_phone) {
    const { data: existing } = await supabase
      .from('customers')
      .select('id')
      .eq('client_id', ctx.clientId)
      .eq('location_id', ctx.locationId)
      .eq('phone', row.customer_phone)
      .maybeSingle();
    if (existing) {
      await maybeUpdateVisit(supabase, existing.id, row);
      return existing.id;
    }
  }

  const revenueEstimate = row.declined_value || row.approved_value || 0;
  const { data: created } = await supabase
    .from('customers')
    .insert({
      client_id: ctx.clientId,
      location_id: ctx.locationId,
      source_customer_id: sourceId,
      first_name: row.customer_first_name,
      last_name: row.customer_last_name,
      phone: row.customer_phone,
      email: row.customer_email,
      lifetime_value: revenueEstimate,
      last_visit_date: row.customer_last_visit_date ?? row.ro_date,
      first_visit_date: row.customer_last_visit_date ?? row.ro_date,
      visit_count: 1,
    })
    .select('id')
    .single();

  return created!.id;
}

async function maybeUpdateVisit(
  supabase: ReturnType<typeof createAdminClient>,
  customerId: string,
  row: NormalizedRow
) {
  const { data: customer } = await supabase.from('customers').select('*').eq('id', customerId).single();
  if (!customer) return;

  const newLastVisit =
    row.customer_last_visit_date && (!customer.last_visit_date || row.customer_last_visit_date > customer.last_visit_date)
      ? row.customer_last_visit_date
      : customer.last_visit_date;

  await supabase
    .from('customers')
    .update({
      last_visit_date: newLastVisit,
      visit_count: customer.visit_count + 1,
      lifetime_value: Number(customer.lifetime_value) + (row.declined_value || row.approved_value || 0),
    })
    .eq('id', customerId);
}

async function upsertVehicle(
  supabase: ReturnType<typeof createAdminClient>,
  row: NormalizedRow,
  customerId: string,
  ctx: CommitContext
): Promise<string | null> {
  if (!row.vehicle_vin && !row.vehicle_make && !row.vehicle_model) return null;

  if (row.vehicle_vin) {
    const { data: existing } = await supabase
      .from('vehicles')
      .select('id')
      .eq('customer_id', customerId)
      .eq('vin', row.vehicle_vin)
      .maybeSingle();
    if (existing) return existing.id;
  }

  const { data: created } = await supabase
    .from('vehicles')
    .insert({
      client_id: ctx.clientId,
      customer_id: customerId,
      year: row.vehicle_year,
      make: row.vehicle_make,
      model: row.vehicle_model,
      vin: row.vehicle_vin,
      mileage: row.vehicle_mileage,
    })
    .select('id')
    .single();

  return created!.id;
}
