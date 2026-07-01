import type { OpportunityScoreBreakdown, OpportunityType, UrgencyLevel } from '@/types/database';

// ============================================================
// Urgency classification — keyword match against service description.
// ============================================================

const RED_KEYWORDS = [
  'brake', 'tire', 'steering', 'suspension', 'abs', 'leak', 'overheat', 'safety inspection',
  'ball joint', 'tie rod', 'wheel bearing', 'rotor', 'caliper',
];

const YELLOW_KEYWORDS = [
  'check engine', 'cooling', 'belt', 'hose', 'fluid leak', 'a/c', 'ac ', 'air condition',
  'drivetrain', 'battery', 'transmission', 'alternator', 'radiator', 'sensor',
];

const GREEN_KEYWORDS = [
  'filter', 'wiper', 'bulb', 'fluid', 'oil service', 'oil change', 'alignment',
  'routine maintenance', 'tire rotation', 'inspection',
];

export function classifyUrgency(serviceDescription: string): UrgencyLevel {
  const text = serviceDescription.toLowerCase();
  if (RED_KEYWORDS.some((kw) => text.includes(kw))) return 'red';
  if (YELLOW_KEYWORDS.some((kw) => text.includes(kw))) return 'yellow';
  if (GREEN_KEYWORDS.some((kw) => text.includes(kw))) return 'green';
  return 'yellow'; // unclassified services default to medium urgency, never silently dropped
}

// ============================================================
// Opportunity scoring — 100pt model, 8 weighted factors.
// ============================================================

export interface ScoringInput {
  type: OpportunityType;
  urgency: UrgencyLevel;
  estimatedValue: number;
  daysSinceEvent: number;
  customerLifetimeValue: number;
  customerVisitCount: number;
  vehicleAgeYears: number | null;
  priorMessagesSent: number;
  priorRepliesReceived: number;
  hasPhone: boolean;
  hasEmail: boolean;
  isOptedOut: boolean;
  shopDailyCapacity: number;
  shopOpenSlotsThisWeek: number;
}

const MAX_ESTIMATED_VALUE_REFERENCE = 2000; // dollar amount that maxes out the revenue-value factor
const MAX_LTV_REFERENCE = 5000; // dollar amount that maxes out the customer history factor

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function scoreServiceUrgency(urgency: UrgencyLevel): number {
  if (urgency === 'red') return 20;
  if (urgency === 'yellow') return 12;
  return 6;
}

function scoreRevenueValue(estimatedValue: number): number {
  return Math.round(clamp(estimatedValue / MAX_ESTIMATED_VALUE_REFERENCE, 0, 1) * 20);
}

function scoreTimeSinceEvent(daysSinceEvent: number, type: OpportunityType): number {
  // Declined jobs/estimates: urgency decays slowly then falls off after ~120 days.
  // Dormant customers: score peaks in the 6-24mo "still winnable" window (spec-defined).
  if (type === 'dormant_customer') {
    const months = daysSinceEvent / 30;
    if (months < 6) return 3; // not actually dormant yet
    if (months <= 24) return 15;
    if (months <= 36) return 8;
    return 3;
  }
  if (daysSinceEvent <= 7) return 9;
  if (daysSinceEvent <= 30) return 15;
  if (daysSinceEvent <= 90) return 12;
  if (daysSinceEvent <= 180) return 6;
  return 2;
}

function scoreCustomerHistory(lifetimeValue: number, visitCount: number): number {
  const ltvScore = clamp(lifetimeValue / MAX_LTV_REFERENCE, 0, 1) * 10;
  const loyaltyScore = clamp(visitCount / 6, 0, 1) * 5;
  return Math.round(ltvScore + loyaltyScore);
}

function scoreVehicleRelevance(vehicleAgeYears: number | null): number {
  if (vehicleAgeYears == null) return 5;
  // Older vehicles are more likely to need the declined/estimated service and less likely
  // to be traded in before the follow-up window closes.
  if (vehicleAgeYears >= 6) return 10;
  if (vehicleAgeYears >= 3) return 7;
  return 4;
}

function scorePriorEngagement(messagesSent: number, repliesReceived: number): number {
  if (messagesSent === 0) return 5; // no prior fatigue, neutral-positive
  const replyRate = repliesReceived / messagesSent;
  return Math.round(clamp(replyRate, 0, 1) * 10);
}

function scoreContactability(hasPhone: boolean, hasEmail: boolean, isOptedOut: boolean): number {
  if (isOptedOut) return 0;
  if (hasPhone && hasEmail) return 5;
  if (hasPhone || hasEmail) return 3;
  return 0;
}

function scoreShopCapacityFit(dailyCapacity: number, openSlotsThisWeek: number): number {
  if (dailyCapacity <= 0) return 2;
  const utilization = 1 - clamp(openSlotsThisWeek / (dailyCapacity * 7), 0, 1);
  // Prefer opportunities we can actually book — mid utilization shops score highest.
  return Math.round(clamp(1 - Math.abs(utilization - 0.6) / 0.6, 0, 1) * 5);
}

export function scoreOpportunity(input: ScoringInput): OpportunityScoreBreakdown {
  const service_urgency = scoreServiceUrgency(input.urgency);
  const estimated_revenue_value = scoreRevenueValue(input.estimatedValue);
  const time_since_event = scoreTimeSinceEvent(input.daysSinceEvent, input.type);
  const customer_history_ltv = scoreCustomerHistory(input.customerLifetimeValue, input.customerVisitCount);
  const vehicle_service_relevance = scoreVehicleRelevance(input.vehicleAgeYears);
  const prior_engagement = scorePriorEngagement(input.priorMessagesSent, input.priorRepliesReceived);
  const contactability = scoreContactability(input.hasPhone, input.hasEmail, input.isOptedOut);
  const shop_capacity_fit = scoreShopCapacityFit(input.shopDailyCapacity, input.shopOpenSlotsThisWeek);

  const total =
    service_urgency +
    estimated_revenue_value +
    time_since_event +
    customer_history_ltv +
    vehicle_service_relevance +
    prior_engagement +
    contactability +
    shop_capacity_fit;

  return {
    service_urgency,
    estimated_revenue_value,
    time_since_event,
    customer_history_ltv,
    vehicle_service_relevance,
    prior_engagement,
    contactability,
    shop_capacity_fit,
    total,
  };
}
