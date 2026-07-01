// Domain types for Revenue Driven Reactivation AI.
// Mirrors supabase/migrations/0001_init.sql — keep in sync.

export type UUID = string;
export type ISODateTime = string;

export type UserRole =
  | 'rd_admin'
  | 'shop_owner'
  | 'location_manager'
  | 'campaign_manager'
  | 'appointment_setter'
  | 'qa_analyst'
  | 'ai_supervisor';

export type PlanTier =
  | 'found_money_sprint'
  | 'reactivate_lite'
  | 'reactivate_growth'
  | 'revenue_driven_os'
  | 'enterprise';

export type UrgencyLevel = 'red' | 'yellow' | 'green';

export type OpportunityType =
  | 'declined_job'
  | 'unsold_estimate'
  | 'dormant_customer';

export type OpportunityStatus =
  | 'new'
  | 'scored'
  | 'queued'
  | 'messaged'
  | 'replied'
  | 'booked'
  | 'won'
  | 'lost'
  | 'suppressed';

export type CampaignStatus = 'draft' | 'pending_approval' | 'active' | 'paused' | 'completed' | 'archived';

export type CampaignStepChannel = 'sms' | 'email';

export type MessageDirection = 'outbound' | 'inbound';

export type MessageStatus =
  | 'draft'
  | 'pending_approval'
  | 'approved'
  | 'queued'
  | 'sent'
  | 'delivered'
  | 'failed'
  | 'undelivered';

export type ReplyIntent =
  | 'wants_to_book'
  | 'asks_price'
  | 'asks_technical_question'
  | 'asks_availability'
  | 'not_interested'
  | 'already_fixed_elsewhere'
  | 'wrong_number'
  | 'angry_or_complaint'
  | 'opt_out'
  | 'needs_human'
  | 'unclear';

export type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'no_show' | 'cancelled';

export type OutcomeType = 'estimate_reopened' | 'job_booked' | 'job_completed' | 'no_recovery';

export type ImportStatus = 'uploaded' | 'mapping' | 'validating' | 'validated' | 'imported' | 'failed';

export type TaskQueueStatus = 'open' | 'in_progress' | 'done' | 'snoozed';
export type TaskQueuePriority = 'urgent' | 'high' | 'normal' | 'low';

export interface Client {
  id: UUID;
  name: string;
  plan_tier: PlanTier;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  billing_status: 'trialing' | 'active' | 'past_due' | 'canceled';
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

export interface Location {
  id: UUID;
  client_id: UUID;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  timezone: string;
  daily_capacity: number;
  shop_management_system: string;
  created_at: ISODateTime;
}

export interface AppUser {
  id: UUID;
  client_id: UUID | null;
  location_id: UUID | null;
  email: string;
  full_name: string;
  role: UserRole;
  phone: string | null;
  created_at: ISODateTime;
}

export interface Customer {
  id: UUID;
  client_id: UUID;
  location_id: UUID;
  source_customer_id: string | null;
  first_name: string;
  last_name: string;
  phone: string | null;
  email: string | null;
  lifetime_value: number;
  first_visit_date: ISODateTime | null;
  last_visit_date: ISODateTime | null;
  visit_count: number;
  is_opted_out: boolean;
  created_at: ISODateTime;
}

export interface Vehicle {
  id: UUID;
  client_id: UUID;
  customer_id: UUID;
  year: number | null;
  make: string | null;
  model: string | null;
  vin: string | null;
  mileage: number | null;
  created_at: ISODateTime;
}

export interface RepairOrder {
  id: UUID;
  client_id: UUID;
  location_id: UUID;
  customer_id: UUID;
  vehicle_id: UUID;
  source_ro_number: string | null;
  ro_type: 'repair_order' | 'estimate';
  service_description: string;
  line_items: RepairOrderLineItem[];
  declined_value: number;
  approved_value: number;
  status: 'declined' | 'estimate_pending' | 'approved' | 'completed';
  ro_date: ISODateTime;
  imported_from: UUID | null;
  created_at: ISODateTime;
}

export interface RepairOrderLineItem {
  description: string;
  category: string;
  price: number;
  status: 'declined' | 'approved' | 'estimate';
}

export interface Opportunity {
  id: UUID;
  client_id: UUID;
  location_id: UUID;
  customer_id: UUID;
  vehicle_id: UUID | null;
  repair_order_id: UUID | null;
  type: OpportunityType;
  urgency: UrgencyLevel;
  estimated_value: number;
  score: number;
  score_breakdown: OpportunityScoreBreakdown;
  status: OpportunityStatus;
  detected_at: ISODateTime;
  days_since_event: number;
  assigned_campaign_id: UUID | null;
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

export interface OpportunityScoreBreakdown {
  service_urgency: number;
  estimated_revenue_value: number;
  time_since_event: number;
  customer_history_ltv: number;
  vehicle_service_relevance: number;
  prior_engagement: number;
  contactability: number;
  shop_capacity_fit: number;
  total: number;
}

export interface Campaign {
  id: UUID;
  client_id: UUID;
  location_id: UUID;
  name: string;
  workflow: OpportunityType;
  status: CampaignStatus;
  created_by: UUID;
  approved_by: UUID | null;
  approved_at: ISODateTime | null;
  created_at: ISODateTime;
}

export interface CampaignStep {
  id: UUID;
  campaign_id: UUID;
  step_order: number;
  channel: CampaignStepChannel;
  delay_hours: number;
  message_template: string | null;
  created_at: ISODateTime;
}

export interface Message {
  id: UUID;
  client_id: UUID;
  campaign_id: UUID | null;
  campaign_step_id: UUID | null;
  opportunity_id: UUID | null;
  customer_id: UUID;
  channel: CampaignStepChannel;
  direction: MessageDirection;
  body: string;
  status: MessageStatus;
  ai_generated: boolean;
  approved_by: UUID | null;
  approved_at: ISODateTime | null;
  reply_intent: ReplyIntent | null;
  reply_confidence: number | null;
  provider_message_id: string | null;
  sent_at: ISODateTime | null;
  delivered_at: ISODateTime | null;
  created_at: ISODateTime;
}

export interface Appointment {
  id: UUID;
  client_id: UUID;
  location_id: UUID;
  opportunity_id: UUID | null;
  customer_id: UUID;
  vehicle_id: UUID | null;
  scheduled_at: ISODateTime;
  status: AppointmentStatus;
  booked_via: 'ai_reply' | 'human_followup' | 'manual';
  notes: string | null;
  created_at: ISODateTime;
}

export interface Outcome {
  id: UUID;
  client_id: UUID;
  opportunity_id: UUID;
  appointment_id: UUID | null;
  type: OutcomeType;
  recovered_value: number;
  verified: boolean;
  verified_by: UUID | null;
  verified_at: ISODateTime | null;
  notes: string | null;
  created_at: ISODateTime;
}

export interface AuditReport {
  id: UUID;
  client_id: UUID;
  location_id: UUID;
  period_start: ISODateTime;
  period_end: ISODateTime;
  metrics: FoundMoneyMetrics;
  generated_at: ISODateTime;
}

export interface FoundMoneyMetrics {
  declined_jobs_scanned: number;
  total_declined_value: number;
  top_opportunities_found: number;
  messages_sent: number;
  replies_received: number;
  reply_rate: number;
  appointments_booked: number;
  estimates_reopened: number;
  estimated_recovered_revenue: number;
  verified_recovered_revenue: number;
  roi_multiple: number;
}

export interface OptOut {
  id: UUID;
  client_id: UUID;
  customer_id: UUID | null;
  phone: string | null;
  email: string | null;
  keyword_matched: string | null;
  channel: CampaignStepChannel;
  opted_out_at: ISODateTime;
}

export interface FileImport {
  id: UUID;
  client_id: UUID;
  location_id: UUID;
  uploaded_by: UUID;
  file_name: string;
  file_type: 'csv' | 'xlsx';
  source_system: string;
  status: ImportStatus;
  column_mapping: Record<string, string> | null;
  row_count: number;
  valid_row_count: number;
  error_count: number;
  errors: ImportRowError[] | null;
  created_at: ISODateTime;
}

export interface ImportRowError {
  row: number;
  field: string;
  message: string;
}

export interface QaScore {
  id: UUID;
  client_id: UUID;
  message_id: UUID | null;
  campaign_id: UUID | null;
  scored_by: UUID;
  accuracy_score: number;
  tone_score: number;
  compliance_score: number;
  notes: string | null;
  created_at: ISODateTime;
}

export interface FollowUpTask {
  id: UUID;
  client_id: UUID;
  location_id: UUID;
  opportunity_id: UUID | null;
  message_id: UUID | null;
  customer_id: UUID;
  assigned_to: UUID | null;
  reason: ReplyIntent | 'high_value_escalation' | 'manual';
  priority: TaskQueuePriority;
  status: TaskQueueStatus;
  due_at: ISODateTime | null;
  notes: string | null;
  created_at: ISODateTime;
  updated_at: ISODateTime;
}
