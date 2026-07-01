import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { CampaignBuilder } from './campaign-builder';

export default async function NewCampaignPage() {
  const user = await requireUser();
  const supabase = createClient();

  const [{ data: locations }, { data: opportunities }] = await Promise.all([
    supabase.from('locations').select('id, name').eq('client_id', user.client_id ?? ''),
    supabase
      .from('opportunities')
      .select('id, type, urgency, estimated_value, score, status, customers(first_name, last_name)')
      .eq('client_id', user.client_id ?? '')
      .in('status', ['new', 'scored'])
      .order('score', { ascending: false })
      .limit(200),
  ]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Campaign Builder</h1>
        <p className="text-sm text-muted-foreground">Select opportunities and define the outreach sequence.</p>
      </div>
      <CampaignBuilder locations={locations ?? []} opportunities={(opportunities as any) ?? []} />
    </div>
  );
}
