import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { ImportWizard } from './import-wizard';

export default async function ImportPage() {
  const user = await requireUser();
  const supabase = createClient();
  const { data: locations } = await supabase
    .from('locations')
    .select('id, name')
    .eq('client_id', user.client_id ?? '');

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Data Upload</h1>
        <p className="text-sm text-muted-foreground">
          Import a Tekmetric repair order, estimate, or customer export (CSV/XLSX). No API connection required.
        </p>
      </div>
      <ImportWizard locations={locations ?? []} />
    </div>
  );
}
