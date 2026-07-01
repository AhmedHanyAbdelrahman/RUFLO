// Target fields the importer maps source columns onto. One row = one repair
// order / estimate line for a customer + vehicle (matches how Tekmetric's
// "Repair Order Export" and "Estimate Export" reports are structured).

export interface TargetField {
  key: string;
  label: string;
  required: boolean;
  group: 'customer' | 'vehicle' | 'repair_order';
}

export const TARGET_FIELDS: TargetField[] = [
  { key: 'customer_source_id', label: 'Customer ID', required: false, group: 'customer' },
  { key: 'customer_first_name', label: 'Customer First Name', required: true, group: 'customer' },
  { key: 'customer_last_name', label: 'Customer Last Name', required: true, group: 'customer' },
  { key: 'customer_phone', label: 'Customer Phone', required: false, group: 'customer' },
  { key: 'customer_email', label: 'Customer Email', required: false, group: 'customer' },
  { key: 'customer_last_visit_date', label: 'Last Visit Date', required: false, group: 'customer' },
  { key: 'vehicle_year', label: 'Vehicle Year', required: false, group: 'vehicle' },
  { key: 'vehicle_make', label: 'Vehicle Make', required: false, group: 'vehicle' },
  { key: 'vehicle_model', label: 'Vehicle Model', required: false, group: 'vehicle' },
  { key: 'vehicle_vin', label: 'VIN', required: false, group: 'vehicle' },
  { key: 'vehicle_mileage', label: 'Mileage', required: false, group: 'vehicle' },
  { key: 'ro_number', label: 'RO / Estimate Number', required: false, group: 'repair_order' },
  { key: 'ro_type', label: 'Type (Repair Order / Estimate)', required: false, group: 'repair_order' },
  { key: 'ro_date', label: 'RO Date', required: true, group: 'repair_order' },
  { key: 'service_description', label: 'Service / Line Item Description', required: true, group: 'repair_order' },
  { key: 'declined_value', label: 'Declined Amount', required: false, group: 'repair_order' },
  { key: 'approved_value', label: 'Approved / Estimate Amount', required: false, group: 'repair_order' },
  { key: 'ro_status', label: 'Status (Declined / Estimate Pending / Approved / Completed)', required: true, group: 'repair_order' },
];

// Best-effort auto-mapping from common Tekmetric export column headers.
export const TEKMETRIC_AUTO_MAP: Record<string, string> = {
  'Customer ID': 'customer_source_id',
  'First Name': 'customer_first_name',
  'Last Name': 'customer_last_name',
  'Phone': 'customer_phone',
  'Mobile Phone': 'customer_phone',
  'Email': 'customer_email',
  'Last Visit': 'customer_last_visit_date',
  'Last Visit Date': 'customer_last_visit_date',
  'Year': 'vehicle_year',
  'Make': 'vehicle_make',
  'Model': 'vehicle_model',
  'VIN': 'vehicle_vin',
  'Mileage': 'vehicle_mileage',
  'RO Number': 'ro_number',
  'RO #': 'ro_number',
  'Estimate Number': 'ro_number',
  'Type': 'ro_type',
  'RO Date': 'ro_date',
  'Date': 'ro_date',
  'Job Description': 'service_description',
  'Service Description': 'service_description',
  'Line Item': 'service_description',
  'Declined Amount': 'declined_value',
  'Declined Total': 'declined_value',
  'Estimate Total': 'approved_value',
  'Approved Amount': 'approved_value',
  'Status': 'ro_status',
  'Job Status': 'ro_status',
};

export function autoSuggestMapping(sourceColumns: string[]): Record<string, string> {
  const mapping: Record<string, string> = {};
  for (const col of sourceColumns) {
    const target = TEKMETRIC_AUTO_MAP[col.trim()];
    if (target) mapping[col] = target;
  }
  return mapping;
}
