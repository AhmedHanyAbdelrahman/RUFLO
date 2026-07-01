import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

const OPT_OUT_KEYWORDS = ['STOP', 'UNSUBSCRIBE', 'QUIT', 'CANCEL', 'END', 'REVOKE', 'OPTOUT'];

export default async function CompliancePage() {
  const user = await requireUser();
  const supabase = createClient();

  const [{ data: optOuts }, { data: approvedCampaigns }] = await Promise.all([
    supabase
      .from('opt_outs')
      .select('*, customers(first_name, last_name)')
      .eq('client_id', user.client_id ?? '')
      .order('opted_out_at', { ascending: false })
      .limit(100),
    supabase
      .from('campaigns')
      .select('*, users!campaigns_approved_by_fkey(full_name)')
      .eq('client_id', user.client_id ?? '')
      .not('approved_by', 'is', null)
      .order('approved_at', { ascending: false })
      .limit(50),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Compliance & Opt-Out</h1>
        <p className="text-sm text-muted-foreground">Opt-out enforcement and campaign approval history.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Opt-out keywords (auto-detected)</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {OPT_OUT_KEYWORDS.map((kw) => (
            <Badge key={kw} variant="secondary">
              {kw}
            </Badge>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Opt-out list ({optOuts?.length ?? 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Keyword</TableHead>
                <TableHead>Opted out</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(optOuts ?? []).map((o: any) => (
                <TableRow key={o.id}>
                  <TableCell>
                    {o.customers?.first_name} {o.customers?.last_name}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{o.phone ?? o.email}</TableCell>
                  <TableCell className="uppercase">{o.channel}</TableCell>
                  <TableCell>{o.keyword_matched ?? 'manual'}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatDate(o.opted_out_at)}</TableCell>
                </TableRow>
              ))}
              {(optOuts ?? []).length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-6 text-center text-muted-foreground">
                    No opt-outs recorded.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Campaign approval history</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Approved by</TableHead>
                <TableHead>Approved at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(approvedCampaigns ?? []).map((c: any) => (
                <TableRow key={c.id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.users?.full_name ?? c.approved_by}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatDate(c.approved_at)}</TableCell>
                </TableRow>
              ))}
              {(approvedCampaigns ?? []).length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="py-6 text-center text-muted-foreground">
                    No approved campaigns yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
