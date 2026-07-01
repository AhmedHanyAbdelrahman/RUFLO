import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { getStripeClient, getPriceIdForTier } from '@/lib/billing/stripe';
import type { PlanTier } from '@/types/database';

export async function POST(request: NextRequest) {
  const user = await requireUser();
  const { tier } = (await request.json()) as { tier: PlanTier };
  const priceId = getPriceIdForTier(tier);
  if (!priceId) return NextResponse.json({ error: `No Stripe price configured for ${tier}` }, { status: 400 });

  const supabase = createClient();
  const { data: client } = await supabase.from('clients').select('*').eq('id', user.client_id ?? '').single();
  if (!client) return NextResponse.json({ error: 'Client not found' }, { status: 404 });

  const stripe = getStripeClient();
  const session = await stripe.checkout.sessions.create({
    mode: tier === 'found_money_sprint' ? 'payment' : 'subscription',
    customer: client.stripe_customer_id ?? undefined,
    customer_email: client.stripe_customer_id ? undefined : user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { client_id: client.id, plan_tier: tier },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?checkout=cancelled`,
  });

  return NextResponse.json({ url: session.url });
}
