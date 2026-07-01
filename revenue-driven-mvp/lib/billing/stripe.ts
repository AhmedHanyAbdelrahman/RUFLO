import Stripe from 'stripe';
import type { PlanTier } from '@/types/database';

let stripeClient: Stripe | null = null;

export function getStripeClient(): Stripe {
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-02-24.acacia' });
  }
  return stripeClient;
}

export const PLAN_DEFINITIONS: { tier: PlanTier; name: string; price: string; priceEnvVar: string; description: string }[] = [
  {
    tier: 'found_money_sprint',
    name: 'Found Money Sprint',
    price: '$500 one-time',
    priceEnvVar: 'STRIPE_PRICE_FOUND_MONEY_SPRINT',
    description: 'One-time audit: import your data, find the top recoverable revenue, and prove the model works.',
  },
  {
    tier: 'reactivate_lite',
    name: 'Reactivate Lite',
    price: '$500/mo',
    priceEnvVar: 'STRIPE_PRICE_REACTIVATE_LITE',
    description: 'Single-location declined job + estimate recovery campaigns with human-approved messaging.',
  },
  {
    tier: 'reactivate_growth',
    name: 'Reactivate Growth',
    price: '$1,500/mo',
    priceEnvVar: 'STRIPE_PRICE_REACTIVATE_GROWTH',
    description: 'All 3 workflows, reply inbox, follow-up task queue, and full Found Money reporting.',
  },
  {
    tier: 'revenue_driven_os',
    name: 'Revenue Driven OS',
    price: '$3,000/mo',
    priceEnvVar: 'STRIPE_PRICE_REVENUE_DRIVEN_OS',
    description: 'Multi-workflow automation, QA scoring, and dedicated AI supervisor review across all locations.',
  },
];

export function getPriceIdForTier(tier: PlanTier): string | null {
  const def = PLAN_DEFINITIONS.find((p) => p.tier === tier);
  if (!def) return null;
  return process.env[def.priceEnvVar] ?? null;
}
