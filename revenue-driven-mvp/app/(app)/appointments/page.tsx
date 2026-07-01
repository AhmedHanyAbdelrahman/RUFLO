import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppointmentRow } from './appointment-row';

export default async function AppointmentsPage() {
  const user = await requireUser();
  const supabase = createClient();

  const { data: appointments } = await supabase
    .from('appointments')
    .select('*, customers(first_name, last_name), opportunities(estimated_value), outcomes(recovered_value, verified)')
    .eq('client_id', user.client_id ?? '')
    .order('scheduled_at', { ascending: false })
    .limit(100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Appointment / Outcome Tracker</h1>
        <p className="text-sm text-muted-foreground">Track booked appointments through to verified recovered revenue.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointments ({appointments?.length ?? 0})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {(appointments ?? []).map((a: any) => (
            <AppointmentRow key={a.id} appointment={a} />
          ))}
          {(appointments ?? []).length === 0 && (
            <p className="text-sm text-muted-foreground">
              No appointments yet. Book one from an opportunity or the follow-up task queue.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
