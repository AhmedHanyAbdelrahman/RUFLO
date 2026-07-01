-- Revenue Driven Reactivation AI — core schema
-- Tekmetric-first auto repair revenue recovery platform

create extension if not exists "pgcrypto";

-- ============================================================
-- ENUMS
-- ============================================================

create type user_role as enum (
  'rd_admin', 'shop_owner', 'location_manager', 'campaign_manager',
  'appointment_setter', 'qa_analyst', 'ai_supervisor'
);

create type plan_tier as enum (
  'found_money_sprint', 'reactivate_lite', 'reactivate_growth',
  'revenue_driven_os', 'enterprise'
);

create type billing_status as enum ('trialing', 'active', 'past_due', 'canceled');

create type urgency_level as enum ('red', 'yellow', 'green');

create type opportunity_type as enum ('declined_job', 'unsold_estimate', 'dormant_customer');

create type opportunity_status as enum (
  'new', 'scored', 'queued', 'messaged', 'replied', 'booked', 'won', 'lost', 'suppressed'
);

create type campaign_status as enum (
  'draft', 'pending_approval', 'active', 'paused', 'completed', 'archived'
);

create type campaign_step_channel as enum ('sms', 'email');

create type message_direction as enum ('outbound', 'inbound');

create type message_status as enum (
  'draft', 'pending_approval', 'approved', 'queued', 'sent', 'delivered', 'failed', 'undelivered'
);

create type reply_intent as enum (
  'wants_to_book', 'asks_price', 'asks_technical_question', 'asks_availability',
  'not_interested', 'already_fixed_elsewhere', 'wrong_number', 'angry_or_complaint',
  'opt_out', 'needs_human', 'unclear'
);

create type appointment_status as enum ('scheduled', 'confirmed', 'completed', 'no_show', 'cancelled');

create type outcome_type as enum ('estimate_reopened', 'job_booked', 'job_completed', 'no_recovery');

create type import_status as enum ('uploaded', 'mapping', 'validating', 'validated', 'imported', 'failed');

create type ro_type as enum ('repair_order', 'estimate');

create type ro_status as enum ('declined', 'estimate_pending', 'approved', 'completed');

create type task_queue_status as enum ('open', 'in_progress', 'done', 'snoozed');

create type task_queue_priority as enum ('urgent', 'high', 'normal', 'low');

-- ============================================================
-- CORE TENANCY
-- ============================================================

create table clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plan_tier plan_tier not null default 'found_money_sprint',
  stripe_customer_id text,
  stripe_subscription_id text,
  billing_status billing_status not null default 'trialing',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table locations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  name text not null,
  address text,
  city text,
  state text,
  zip text,
  timezone text not null default 'America/New_York',
  daily_capacity integer not null default 20,
  shop_management_system text not null default 'tekmetric',
  created_at timestamptz not null default now()
);

create table users (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade,
  location_id uuid references locations(id) on delete set null,
  email text not null unique,
  full_name text not null,
  role user_role not null default 'shop_owner',
  phone text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- CUSTOMER / VEHICLE / REPAIR ORDER DATA (imported)
-- ============================================================

create table files_imports (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  location_id uuid not null references locations(id) on delete cascade,
  uploaded_by uuid references users(id) on delete set null,
  file_name text not null,
  file_type text not null,
  source_system text not null default 'tekmetric',
  status import_status not null default 'uploaded',
  column_mapping jsonb,
  row_count integer not null default 0,
  valid_row_count integer not null default 0,
  error_count integer not null default 0,
  errors jsonb,
  created_at timestamptz not null default now()
);

create table customers (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  location_id uuid not null references locations(id) on delete cascade,
  source_customer_id text,
  first_name text not null,
  last_name text not null,
  phone text,
  email text,
  lifetime_value numeric(10,2) not null default 0,
  first_visit_date date,
  last_visit_date date,
  visit_count integer not null default 0,
  is_opted_out boolean not null default false,
  created_at timestamptz not null default now(),
  unique (client_id, location_id, source_customer_id)
);

create table vehicles (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  customer_id uuid not null references customers(id) on delete cascade,
  year integer,
  make text,
  model text,
  vin text,
  mileage integer,
  created_at timestamptz not null default now()
);

create table repair_orders (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  location_id uuid not null references locations(id) on delete cascade,
  customer_id uuid not null references customers(id) on delete cascade,
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  source_ro_number text,
  ro_type ro_type not null default 'repair_order',
  service_description text not null,
  line_items jsonb not null default '[]',
  declined_value numeric(10,2) not null default 0,
  approved_value numeric(10,2) not null default 0,
  status ro_status not null default 'declined',
  ro_date date not null,
  imported_from uuid references files_imports(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ============================================================
-- OPPORTUNITIES
-- ============================================================

create table opportunities (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  location_id uuid not null references locations(id) on delete cascade,
  customer_id uuid not null references customers(id) on delete cascade,
  vehicle_id uuid references vehicles(id) on delete set null,
  repair_order_id uuid references repair_orders(id) on delete set null,
  type opportunity_type not null,
  urgency urgency_level not null default 'green',
  estimated_value numeric(10,2) not null default 0,
  score integer not null default 0,
  score_breakdown jsonb not null default '{}',
  status opportunity_status not null default 'new',
  detected_at timestamptz not null default now(),
  days_since_event integer not null default 0,
  assigned_campaign_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_opportunities_client_status on opportunities(client_id, status);
create index idx_opportunities_score on opportunities(client_id, score desc);

-- ============================================================
-- CAMPAIGNS / MESSAGES
-- ============================================================

create table campaigns (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  location_id uuid not null references locations(id) on delete cascade,
  name text not null,
  workflow opportunity_type not null,
  status campaign_status not null default 'draft',
  created_by uuid references users(id) on delete set null,
  approved_by uuid references users(id) on delete set null,
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

alter table opportunities
  add constraint fk_opportunities_campaign
  foreign key (assigned_campaign_id) references campaigns(id) on delete set null;

create table campaign_steps (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  step_order integer not null default 1,
  channel campaign_step_channel not null default 'sms',
  delay_hours integer not null default 0,
  message_template text,
  created_at timestamptz not null default now(),
  unique (campaign_id, step_order)
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  campaign_id uuid references campaigns(id) on delete set null,
  campaign_step_id uuid references campaign_steps(id) on delete set null,
  opportunity_id uuid references opportunities(id) on delete set null,
  customer_id uuid not null references customers(id) on delete cascade,
  channel campaign_step_channel not null default 'sms',
  direction message_direction not null default 'outbound',
  body text not null,
  status message_status not null default 'draft',
  ai_generated boolean not null default true,
  approved_by uuid references users(id) on delete set null,
  approved_at timestamptz,
  reply_intent reply_intent,
  reply_confidence numeric(4,3),
  provider_message_id text,
  sent_at timestamptz,
  delivered_at timestamptz,
  created_at timestamptz not null default now()
);

create index idx_messages_client_status on messages(client_id, status);
create index idx_messages_opportunity on messages(opportunity_id);

-- ============================================================
-- APPOINTMENTS / OUTCOMES
-- ============================================================

create table appointments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  location_id uuid not null references locations(id) on delete cascade,
  opportunity_id uuid references opportunities(id) on delete set null,
  customer_id uuid not null references customers(id) on delete cascade,
  vehicle_id uuid references vehicles(id) on delete set null,
  scheduled_at timestamptz not null,
  status appointment_status not null default 'scheduled',
  booked_via text not null default 'manual',
  notes text,
  created_at timestamptz not null default now()
);

create table outcomes (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  opportunity_id uuid not null references opportunities(id) on delete cascade,
  appointment_id uuid references appointments(id) on delete set null,
  type outcome_type not null,
  recovered_value numeric(10,2) not null default 0,
  verified boolean not null default false,
  verified_by uuid references users(id) on delete set null,
  verified_at timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- COMPLIANCE
-- ============================================================

create table opt_outs (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  customer_id uuid references customers(id) on delete set null,
  phone text,
  email text,
  keyword_matched text,
  channel campaign_step_channel not null default 'sms',
  opted_out_at timestamptz not null default now()
);

create index idx_opt_outs_phone on opt_outs(client_id, phone);
create index idx_opt_outs_email on opt_outs(client_id, email);

-- ============================================================
-- QA / REPORTING
-- ============================================================

create table qa_scores (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  message_id uuid references messages(id) on delete cascade,
  campaign_id uuid references campaigns(id) on delete set null,
  scored_by uuid references users(id) on delete set null,
  accuracy_score integer not null check (accuracy_score between 0 and 100),
  tone_score integer not null check (tone_score between 0 and 100),
  compliance_score integer not null check (compliance_score between 0 and 100),
  notes text,
  created_at timestamptz not null default now()
);

create table audit_reports (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  location_id uuid not null references locations(id) on delete cascade,
  period_start date not null,
  period_end date not null,
  metrics jsonb not null default '{}',
  generated_at timestamptz not null default now()
);

-- Human follow-up task queue (escalations from reply classification / high-value opportunities)
create table follow_up_tasks (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  location_id uuid not null references locations(id) on delete cascade,
  opportunity_id uuid references opportunities(id) on delete set null,
  message_id uuid references messages(id) on delete set null,
  customer_id uuid not null references customers(id) on delete cascade,
  assigned_to uuid references users(id) on delete set null,
  reason text not null default 'manual',
  priority task_queue_priority not null default 'normal',
  status task_queue_status not null default 'open',
  due_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_follow_up_tasks_client_status on follow_up_tasks(client_id, status);

-- ============================================================
-- updated_at triggers
-- ============================================================

create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_clients_updated_at before update on clients
  for each row execute function set_updated_at();
create trigger trg_opportunities_updated_at before update on opportunities
  for each row execute function set_updated_at();
create trigger trg_follow_up_tasks_updated_at before update on follow_up_tasks
  for each row execute function set_updated_at();
