import type { OpportunityType } from '@/types/database';

export const OPPORTUNITY_TYPE_LABELS: Record<OpportunityType, string> = {
  declined_job: 'Declined Job',
  unsold_estimate: 'Unsold Estimate',
  dormant_customer: 'Dormant Customer',
};
