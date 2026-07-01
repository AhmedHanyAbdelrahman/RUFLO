import { NextRequest, NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/billing/stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import type Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const stripe = getStripeClient();
  const signature = request.headers.get('stripe-signature');
  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: `Webhook signature verification failed: ${(err as Error).message}` }, { status: 400 });
  }

  const supabase = createAdminClient();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const clientId = session.metadata?.client_id;
      const planTier = session.metadata?.plan_tier;
      if (clientId) {
        await supabase
          .from('clients')
          .update({
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: (session.subscription as string) ?? null,
            billing_status: 'active',
            ...(planTier ? { plan_tier: planTier } : {}),
          })
          .eq('id', clientId);
      }
      break;
    }
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const status = subscription.status === 'active' ? 'active' : subscription.status === 'past_due' ? 'past_due' : 'canceled';
      await supabase
        .from('clients')
        .update({ billing_status: status })
        .eq('stripe_subscription_id', subscription.id);
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
