import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

const INTENT_COLORS: Record<string, 'green' | 'yellow' | 'red' | 'secondary'> = {
  wants_to_book: 'green',
  asks_price: 'yellow',
  asks_availability: 'yellow',
  asks_technical_question: 'yellow',
  angry_or_complaint: 'red',
  opt_out: 'red',
  not_interested: 'secondary',
  already_fixed_elsewhere: 'secondary',
  wrong_number: 'secondary',
  needs_human: 'yellow',
  unclear: 'secondary',
};

export default async function InboxPage() {
  const user = await requireUser();
  const supabase = createClient();

  const { data: replies } = await supabase
    .from('messages')
    .select('*, customers(first_name, last_name, phone), opportunities(id, type, estimated_value)')
    .eq('client_id', user.client_id ?? '')
    .eq('direction', 'inbound')
    .order('created_at', { ascending: false })
    .limit(100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reply Inbox</h1>
        <p className="text-sm text-muted-foreground">Inbound SMS/email replies, auto-classified by intent.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Replies ({replies?.length ?? 0})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {(replies ?? []).map((m: any) => (
            <div key={m.id} className="rounded-md border p-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {m.customers?.first_name} {m.customers?.last_name}
                </span>
                <div className="flex items-center gap-2">
                  <Badge variant={INTENT_COLORS[m.reply_intent] ?? 'secondary'}>{m.reply_intent ?? 'unclassified'}</Badge>
                  <span className="text-xs text-muted-foreground">{formatDate(m.created_at)}</span>
                </div>
              </div>
              <p className="mt-1 text-sm">{m.body}</p>
              {m.opportunities && (
                <Link href={`/opportunities/${m.opportunities.id}`} className="mt-1 inline-block text-xs text-primary hover:underline">
                  View linked opportunity
                </Link>
              )}
            </div>
          ))}
          {(replies ?? []).length === 0 && <p className="text-sm text-muted-foreground">No replies yet.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
