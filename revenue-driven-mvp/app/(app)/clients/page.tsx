import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AddLocationForm } from './add-location-form';

export default async function ClientsPage() {
  const user = await requireUser();
  const supabase = createClient();

  const { data: client } = await supabase.from('clients').select('*').eq('id', user.client_id ?? '').maybeSingle();
  const { data: locations } = await supabase
    .from('locations')
    .select('*')
    .eq('client_id', user.client_id ?? '')
    .order('created_at');

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Client & Location Setup</h1>
        <p className="text-sm text-muted-foreground">Manage the shop account and its locations.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="font-medium">{client?.name ?? 'No client configured'}</p>
            <p className="text-sm text-muted-foreground">Billing status: {client?.billing_status ?? '—'}</p>
          </div>
          <Badge>{client?.plan_tier?.replaceAll('_', ' ') ?? 'no plan'}</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Locations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(locations ?? []).map((loc) => (
            <div key={loc.id} className="flex items-center justify-between rounded-md border p-3">
              <div>
                <p className="font-medium">{loc.name}</p>
                <p className="text-sm text-muted-foreground">
                  {[loc.city, loc.state].filter(Boolean).join(', ') || 'No address on file'} · {loc.daily_capacity}{' '}
                  jobs/day capacity
                </p>
              </div>
              <Badge variant="secondary">{loc.shop_management_system}</Badge>
            </div>
          ))}
          {(locations ?? []).length === 0 && <p className="text-sm text-muted-foreground">No locations yet.</p>}
          <AddLocationForm />
        </CardContent>
      </Card>
    </div>
  );
}
