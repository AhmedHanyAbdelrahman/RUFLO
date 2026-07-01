import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Service-role client for server-only operations that must bypass RLS:
// background jobs, webhooks, import processing. Never import from client components.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
