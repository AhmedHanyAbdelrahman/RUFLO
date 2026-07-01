# Revenue Driven — Reactivation AI

A Tekmetric-first revenue recovery platform for auto repair shops. It finds
money already sitting in a shop's declined jobs, unsold estimates, and
dormant customer list, scores it, drafts human-approved outreach, sends it,
routes replies, and reports the recovered revenue — without requiring a
formal Tekmetric API integration. Shops export CSV/XLSX from Tekmetric (or
any shop management system with a similar export) and upload it directly.

## What's in this MVP

- **CSV/XLSX import** with field mapping and row-level validation, tuned to
  common Tekmetric export column names (auto-suggested mapping).
- **Opportunity detection & scoring** — an 8-factor, 100-point model across
  declined jobs, unsold estimates, and dormant customers (6–24mo inactive),
  with red/yellow/green urgency classification by service keyword.
- **AI message generation** (Anthropic or OpenAI, pluggable) with hard
  guardrails: no invented pricing/warranty/diagnosis, no fear-based copy,
  mandatory opt-out language on first outbound SMS.
- **Human approval workflow** — every AI-drafted message is reviewed and
  approved (editable) before it sends.
- **Twilio SMS + SendGrid/Postmark email** sending, with opt-out enforcement
  checked immediately before every send.
- **Reply classification** into 11 intents (wants_to_book, asks_price,
  angry_or_complaint, opt_out, etc.), with automatic escalation of
  high-ticket, angry, technical, or pricing replies to a human follow-up
  task queue.
- **Appointment/outcome tracking** through to verified recovered revenue.
- **Found Money Report** dashboard with all the metrics a shop owner needs
  to see the ROI.
- **Stripe billing** for the four MVP plan tiers.
- **Compliance screen**: opt-out list, keyword detection log, campaign
  approval history.
- **Row-level security** in Postgres — every table is scoped to `client_id`
  so a multi-tenant deployment can't leak data across shops.

## Stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · shadcn/ui
primitives · Supabase (Postgres + Auth) · Stripe · Twilio · SendGrid/Postmark
· Anthropic/OpenAI (pluggable) · Row Level Security for multi-tenancy.

No background job queue (Redis/BullMQ) is wired up in the MVP — campaign
sends happen synchronously on approval, which is sufficient at MVP volume.
The step delay (`campaign_steps.delay_hours`) is modeled in the schema so a
scheduler can be added later without a data migration.

## Local setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Supabase project

Create a free project at [supabase.com](https://supabase.com), then run the
migrations against it:

```bash
# Using the Supabase CLI (recommended)
supabase link --project-ref <your-project-ref>
supabase db push
```

Or paste `supabase/migrations/0001_init.sql` then
`supabase/migrations/0002_rls.sql` into the Supabase SQL editor, in order.

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in at minimum:
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY` (Supabase project settings → API)
- `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` (set `AI_PROVIDER` accordingly)

Twilio/SendGrid/Postmark/Stripe keys are only needed once you want to
actually send messages or take payments — the app runs fine without them
for demoing the import → scoring → dashboard → approval flow.

### 4. Seed demo data

```bash
npm run seed
```

This creates a demo client ("Ironclad Auto Repair"), one location, one user
per role, and imports the two mock Tekmetric exports in `/examples`,
which produces a ready-to-demo set of scored opportunities.

Demo login (all seeded users share this password):

```
owner@ironcladauto.com
RevenueDriven2026!
```

Other seeded logins: `admin@revenuedriven.ai` (rd_admin),
`manager@ironcladauto.com` (location_manager),
`campaigns@ironcladauto.com` (campaign_manager),
`setter@ironcladauto.com` (appointment_setter),
`qa@ironcladauto.com` (qa_analyst), `ai-supervisor@ironcladauto.com`
(ai_supervisor).

### 5. Run the app

```bash
npm run dev
```

Visit `http://localhost:3000`, log in, and you should land on the
Opportunity Dashboard already populated from the seed import.

## Demo walkthrough

1. **Data Upload** (`/import`) — upload `examples/tekmetric_repair_orders_export.csv`,
   map columns (auto-suggested), review validation, commit.
2. **Opportunity Dashboard** (`/dashboard`) — filter by urgency/type/status,
   click into an opportunity to see its full score breakdown.
3. **Campaign Builder** (`/campaigns/new`) — pick a workflow, select
   opportunities, define a 2-step SMS sequence.
4. **AI Message Review** (`/campaigns/[id]`) — click "Generate AI drafts",
   edit if needed, approve & send (or approve all).
5. **Reply Inbox** (`/inbox`) — inbound replies land here once Twilio's
   webhook (`/api/webhooks/twilio`) is wired to a real number; classified
   automatically by intent.
6. **Follow-Up Task Queue** (`/tasks`) — pricing questions, technical
   questions, complaints, and high-ticket bookings are escalated here.
7. **Appointments** (`/appointments`) — book from an opportunity, record the
   outcome and recovered revenue once the job is done.
8. **Found Money Report** (`/reports`) — the ROI story: declined value
   found, messages sent, reply rate, recovered revenue, ROI multiple.
9. **Billing** (`/billing`) — the four MVP plan tiers, wired to Stripe
   Checkout.
10. **Compliance** (`/compliance`) — opt-out list and campaign approval
    audit trail.

## Wiring Twilio/Stripe webhooks locally

Use the Stripe CLI and `ngrok`/`cloudflared` to forward webhooks to your
local dev server:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

For Twilio, point your phone number's "A message comes in" webhook at
`https://<your-tunnel>/api/webhooks/twilio` (POST).

## Project structure

```
app/
  (app)/                  # authenticated app shell + all 15 MVP screens
  api/                    # route handlers (imports, campaigns, messages,
                           # appointments, tasks, billing, webhooks)
  login/
lib/
  ai/                     # provider abstraction, message generation, reply classification
  billing/                # Stripe plan definitions + client
  compliance/             # opt-out keyword detection
  import/                 # parse (CSV/XLSX) → mapping schema → normalize/validate → commit
  messaging/              # Twilio SMS + SendGrid/Postmark email + send orchestration
  opportunities/          # detection service (declined/estimate/dormant)
  queries/                # dashboard + opportunity list queries
  scoring.ts              # 8-factor opportunity scoring + urgency classification
  supabase/                # browser/server/admin Supabase clients
supabase/migrations/       # schema + RLS
scripts/seed.ts            # demo data seed
examples/                  # mock Tekmetric CSV exports
types/database.ts          # domain types (mirrors the SQL schema)
```

## Known limitations / follow-ups

- No background job queue — campaign sends are synchronous on approval.
  Sequenced steps (`delay_hours`) are stored but not yet auto-dispatched;
  add a scheduler (Redis/BullMQ, Supabase cron, or a Vercel cron route)
  to fire step 2+ automatically.
- The `xlsx` package on the npm registry has known CVEs and hasn't been
  updated there upstream (SheetJS now distributes newer builds from their
  own CDN). Fine for local/demo use; before production, either fetch a
  patched build from `https://cdn.sheetjs.com` per SheetJS's own install
  instructions, or swap in `exceljs`.
- Multi-location reporting rolls up by `client_id`; per-location report
  filters are a straightforward extension of `lib/queries/dashboard.ts`.
- QA scoring (`qa_scores` table) has a schema and is written to by nothing
  yet — wire a QA review UI on top of the message history once volume
  justifies it.
