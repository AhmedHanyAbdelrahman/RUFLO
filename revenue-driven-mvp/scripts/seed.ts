/* eslint-disable no-console */
// Seeds a demo client, location, one user per role, and imports the mock
// Tekmetric exports in /examples so the app can be demoed immediately.
//
// Usage: npm run seed
// Requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local
// pointed at a Supabase project that already has the migrations applied.

import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import Papa from 'papaparse';
import { createClient } from '@supabase/supabase-js';
import { normalizeAndValidate } from '../lib/import/normalize';
import { autoSuggestMapping } from '../lib/import/schema';
import { commitImport } from '../lib/import/commit';

const DEMO_PASSWORD = 'RevenueDriven2026!';
const SHOP_NAME = 'Ironclad Auto Repair';

const DEMO_USERS: { email: string; full_name: string; role: string }[] = [
  { email: 'admin@revenuedriven.ai', full_name: 'Dana Whitfield', role: 'rd_admin' },
  { email: 'owner@ironcladauto.com', full_name: 'Marcus Ironside', role: 'shop_owner' },
  { email: 'manager@ironcladauto.com', full_name: 'Priya Chandra', role: 'location_manager' },
  { email: 'campaigns@ironcladauto.com', full_name: 'Jordan Reyes', role: 'campaign_manager' },
  { email: 'setter@ironcladauto.com', full_name: 'Casey Nolan', role: 'appointment_setter' },
  { email: 'qa@ironcladauto.com', full_name: 'Elena Voss', role: 'qa_analyst' },
  { email: 'ai-supervisor@ironcladauto.com', full_name: 'Sam Okafor', role: 'ai_supervisor' },
];

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Copy .env.example to .env.local first.');
    process.exit(1);
  }
  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

  console.log(`Seeding demo client "${SHOP_NAME}"...`);
  const { data: client, error: clientError } = await supabase
    .from('clients')
    .insert({ name: SHOP_NAME, plan_tier: 'reactivate_growth', billing_status: 'trialing' })
    .select()
    .single();
  if (clientError) throw clientError;

  const { data: location, error: locationError } = await supabase
    .from('locations')
    .insert({
      client_id: client.id,
      name: `${SHOP_NAME} — Main St`,
      address: '480 Main St',
      city: 'Columbus',
      state: 'OH',
      zip: '43215',
      daily_capacity: 18,
      shop_management_system: 'tekmetric',
    })
    .select()
    .single();
  if (locationError) throw locationError;

  console.log('Creating demo users (one per role)...');
  for (const demoUser of DEMO_USERS) {
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: demoUser.email,
      password: DEMO_PASSWORD,
      email_confirm: true,
    });
    if (authError) {
      console.warn(`  Skipping ${demoUser.email}: ${authError.message}`);
      continue;
    }
    await supabase.from('users').insert({
      id: authUser.user.id,
      client_id: client.id,
      location_id: location.id,
      email: demoUser.email,
      full_name: demoUser.full_name,
      role: demoUser.role,
    });
    console.log(`  Created ${demoUser.role}: ${demoUser.email}`);
  }

  const exampleFiles = ['tekmetric_repair_orders_export.csv', 'tekmetric_dormant_customers_export.csv'];
  for (const fileName of exampleFiles) {
    console.log(`Importing ${fileName}...`);
    const filePath = path.join(__dirname, '..', 'examples', fileName);
    const csvText = fs.readFileSync(filePath, 'utf-8');
    const parsed = Papa.parse<Record<string, string>>(csvText, { header: true, skipEmptyLines: true });
    const mapping = autoSuggestMapping(parsed.meta.fields ?? []);
    const { valid, errors } = normalizeAndValidate(parsed.data, mapping);
    if (errors.length > 0) {
      console.warn(`  ${errors.length} rows failed validation in ${fileName}`);
    }

    const { data: fileImport } = await supabase
      .from('files_imports')
      .insert({
        client_id: client.id,
        location_id: location.id,
        file_name: fileName,
        file_type: 'csv',
        source_system: 'tekmetric',
        status: 'validated',
        row_count: parsed.data.length,
      })
      .select()
      .single();

    const result = await commitImport(valid, {
      clientId: client.id,
      locationId: location.id,
      fileImportId: fileImport!.id,
    });
    console.log(`  Imported ${result.repairOrdersCreated} rows, detected ${result.opportunitiesCreated} opportunities`);
  }

  console.log('\nSeed complete.');
  console.log(`Demo login password for all seeded users: ${DEMO_PASSWORD}`);
  console.log('Try: owner@ironcladauto.com / ' + DEMO_PASSWORD);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
