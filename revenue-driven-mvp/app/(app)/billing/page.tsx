import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { PLAN_DEFINITIONS } from '@/lib/billing/stripe';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlanCheckoutButton } from './plan-checkout-button';

export default async function BillingPage({ searchParams }: { searchParams: { checkout?: string } }) {
  const user = await requireUser();
  const supabase = createClient();
  const { data: client } = await supabase.from('clients').select('*').eq('id', user.client_id ?? '').single();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Billing & Plans</h1>
        <p className="text-sm text-muted-foreground">Current plan: {client?.plan_tier?.replaceAll('_', ' ')}</p>
      </div>

      {searchParams.checkout === 'success' && (
        <Card className="border-urgent-green">
          <CardContent className="pt-6 text-sm text-urgent-green">Checkout complete — plan will update once Stripe confirms.</CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {PLAN_DEFINITIONS.map((plan) => (
          <Card key={plan.tier} className={client?.plan_tier === plan.tier ? 'border-primary' : ''}>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>{plan.name}</CardTitle>
              {client?.plan_tier === plan.tier && <Badge>Current</Badge>}
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xl font-bold">{plan.price}</p>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
              <PlanCheckoutButton tier={plan.tier} disabled={client?.plan_tier === plan.tier} />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enterprise / multi-location</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Running more than one shop? Contact Revenue Driven for custom multi-location pricing.
        </CardContent>
      </Card>
    </div>
  );
}
