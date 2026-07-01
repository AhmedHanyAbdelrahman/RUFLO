import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaskRow } from './task-row';

export default async function TasksPage() {
  const user = await requireUser();
  const supabase = createClient();

  const { data: tasks } = await supabase
    .from('follow_up_tasks')
    .select('*, customers(first_name, last_name, phone), opportunities(id, estimated_value)')
    .eq('client_id', user.client_id ?? '')
    .in('status', ['open', 'in_progress'])
    .order('priority')
    .order('created_at');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Human Follow-Up Task Queue</h1>
        <p className="text-sm text-muted-foreground">
          Replies the AI escalated: pricing questions, technical questions, complaints, and high-value bookings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Open tasks ({tasks?.length ?? 0})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {(tasks ?? []).map((t: any) => (
            <TaskRow key={t.id} task={t} />
          ))}
          {(tasks ?? []).length === 0 && <p className="text-sm text-muted-foreground">Queue is clear.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
