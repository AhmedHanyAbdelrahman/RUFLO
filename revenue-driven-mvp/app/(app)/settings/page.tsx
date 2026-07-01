import { requireUser, roleLabel } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default async function SettingsPage() {
  const user = await requireUser();
  const supabase = createClient();
  const { data: teamMembers } = await supabase
    .from('users')
    .select('*')
    .eq('client_id', user.client_id ?? '')
    .order('created_at');

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and team roles.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          <p>{user.full_name}</p>
          <p className="text-muted-foreground">{user.email}</p>
          <Badge variant="secondary">{roleLabel(user.role)}</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team ({teamMembers?.length ?? 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(teamMembers ?? []).map((m) => (
                <TableRow key={m.id}>
                  <TableCell>{m.full_name}</TableCell>
                  <TableCell className="text-muted-foreground">{m.email}</TableCell>
                  <TableCell>{roleLabel(m.role)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
