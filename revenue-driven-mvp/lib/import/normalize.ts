import { TARGET_FIELDS } from './schema';
import type { ImportRowError } from '@/types/database';

export interface NormalizedRow {
  rowIndex: number;
  customer_source_id: string | null;
  customer_first_name: string;
  customer_last_name: string;
  customer_phone: string | null;
  customer_email: string | null;
  customer_last_visit_date: string | null;
  vehicle_year: number | null;
  vehicle_make: string | null;
  vehicle_model: string | null;
  vehicle_vin: string | null;
  vehicle_mileage: number | null;
  ro_number: string | null;
  ro_type: 'repair_order' | 'estimate';
  ro_date: string;
  service_description: string;
  declined_value: number;
  approved_value: number;
  ro_status: 'declined' | 'estimate_pending' | 'approved' | 'completed';
}

const STATUS_ALIASES: Record<string, NormalizedRow['ro_status']> = {
  declined: 'declined',
  decline: 'declined',
  'not approved': 'declined',
  estimate: 'estimate_pending',
  'estimate pending': 'estimate_pending',
  pending: 'estimate_pending',
  unsold: 'estimate_pending',
  approved: 'approved',
  authorized: 'approved',
  completed: 'completed',
  complete: 'completed',
  finished: 'completed',
};

function mapRowByColumnMapping(row: Record<string, string>, mapping: Record<string, string>): Record<string, string> {
  const mapped: Record<string, string> = {};
  for (const [sourceCol, targetKey] of Object.entries(mapping)) {
    if (targetKey && row[sourceCol] !== undefined) mapped[targetKey] = row[sourceCol];
  }
  return mapped;
}

function toNumber(value: string | undefined): number {
  if (!value) return 0;
  const cleaned = value.replace(/[$,]/g, '').trim();
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function toDate(value: string | undefined): string | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

export function normalizeAndValidate(
  rows: Record<string, string>[],
  columnMapping: Record<string, string>
): { valid: NormalizedRow[]; errors: ImportRowError[] } {
  const valid: NormalizedRow[] = [];
  const errors: ImportRowError[] = [];

  rows.forEach((raw, index) => {
    const rowIndex = index + 1;
    const row = mapRowByColumnMapping(raw, columnMapping);
    const rowErrors: ImportRowError[] = [];

    for (const field of TARGET_FIELDS) {
      if (field.required && !row[field.key]?.trim()) {
        rowErrors.push({ row: rowIndex, field: field.key, message: `${field.label} is required` });
      }
    }

    const ro_date = toDate(row.ro_date);
    if (row.ro_date && !ro_date) {
      rowErrors.push({ row: rowIndex, field: 'ro_date', message: `Could not parse date "${row.ro_date}"` });
    }

    const statusKey = row.ro_status?.trim().toLowerCase();
    const ro_status = statusKey ? STATUS_ALIASES[statusKey] : undefined;
    if (row.ro_status && !ro_status) {
      rowErrors.push({
        row: rowIndex,
        field: 'ro_status',
        message: `Unrecognized status "${row.ro_status}" — expected declined/estimate pending/approved/completed`,
      });
    }

    if (rowErrors.length > 0) {
      errors.push(...rowErrors);
      return;
    }

    valid.push({
      rowIndex,
      customer_source_id: row.customer_source_id?.trim() || null,
      customer_first_name: row.customer_first_name.trim(),
      customer_last_name: row.customer_last_name.trim(),
      customer_phone: row.customer_phone?.trim() || null,
      customer_email: row.customer_email?.trim() || null,
      customer_last_visit_date: toDate(row.customer_last_visit_date),
      vehicle_year: row.vehicle_year ? Number(row.vehicle_year) || null : null,
      vehicle_make: row.vehicle_make?.trim() || null,
      vehicle_model: row.vehicle_model?.trim() || null,
      vehicle_vin: row.vehicle_vin?.trim() || null,
      vehicle_mileage: row.vehicle_mileage ? Number(row.vehicle_mileage) || null : null,
      ro_number: row.ro_number?.trim() || null,
      ro_type: row.ro_type?.trim().toLowerCase().includes('estimate') ? 'estimate' : 'repair_order',
      ro_date: ro_date!,
      service_description: row.service_description.trim(),
      declined_value: toNumber(row.declined_value),
      approved_value: toNumber(row.approved_value),
      ro_status: ro_status!,
    });
  });

  return { valid, errors };
}
