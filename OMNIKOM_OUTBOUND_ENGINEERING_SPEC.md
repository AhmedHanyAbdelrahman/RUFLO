# OMNIKOM OUTBOUND ACQUISITION — ENGINEERING SPECIFICATION
## Engine 9 (Internal) + Product 8 "OmniReach" (Partner SaaS)
### System Architecture, Data Model, n8n Workflow Specs, Multi-Tenancy, and Infrastructure Cost Stack

This is the technical companion to `OMNIKOM_OUTBOUND_ACQUISITION_ENGINE.md` and `OMNIKOM_OUTBOUND_FINANCIAL_MODEL.md`. It specifies exactly what gets built, in what order, on what infrastructure, at what cost — sufficient for an engineering team (internal or contracted) to scope and build Phase 1-2 (Outbound Engine doc Part 12).

---

# SECTION 1: SYSTEM ARCHITECTURE OVERVIEW

## 1.1 Component Map

```
┌──────────────────────────────────────────────────────────────────────────┐
│  TRAFFIC SOURCES                                                            │
│  Meta Ads · Google PPC · Google LSA · Organic (Inbound Intake Engine)      │
└───────────────────────────────┬────────────────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────────────┐
│  LANDING PAGE LAYER  (per-tenant: Omnikom internal OR OmniReach partner)   │
│  - Static/JAMstack pages, templated, dynamic local-data injection           │
│  - Embedded AI Concierge chat widget                                        │
│  - Form submission → webhook to n8n Intake Workflow                        │
└───────────────────────────────┬────────────────────────────────────────────┘
                                  │ webhook (POST /intake)
                                  ▼
┌──────────────────────────────────────────────────────────────────────────┐
│  n8n ORCHESTRATION LAYER (self-hosted, multi-tenant)                       │
│                                                                              │
│  ┌────────────────┐  ┌──────────────────┐  ┌───────────────────────────┐ │
│  │ Intake Workflow │→│ AI Concierge      │→│ DIG Scoring Workflow       │ │
│  │ (create/update  │  │ Conversation      │  │ (recompute on every event) │ │
│  │  memory object)  │  │ Workflow (multi-  │  │                            │ │
│  │                  │  │  channel)          │  │                            │ │
│  └────────────────┘  └──────────────────┘  └─────────────┬─────────────┘ │
│                                                              │ score ≥ thresh │
│                                                              ▼                │
│  ┌────────────────┐  ┌──────────────────┐  ┌───────────────────────────┐ │
│  │ Consent &        │  │ Retargeting /     │  │ CRM Sync Workflow          │ │
│  │ Compliance        │  │ Behavioral Trigger│  │ (REsimpli / FUB / GHL /    │ │
│  │ Logging Workflow  │  │ Workflow          │  │  headless dashboard)       │ │
│  └────────────────┘  └──────────────────┘  └───────────────────────────┘ │
└───────────────────────────────┬────────────────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────────────┐
│  DATA LAYER                                                                │
│  - Postgres (Supabase): Unified Contact Memory Objects, DIG scores,        │
│    consent logs, tenant config                                             │
│  - Distress Intent Graph aggregation (read replica feeds Product 2/5)      │
└──────────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────────────┐
│  AI SERVICES                                                               │
│  - OpenAI GPT-4o (text/chat/email reasoning + DIG scoring assist)          │
│  - Retell AI + ElevenLabs (voice nurture + live-transfer)                  │
│  - Twilio (SMS, A2P 10DLC registered numbers)                              │
└──────────────────────────────────────────────────────────────────────────┘
```

## 1.2 Build Philosophy

- **Single shared n8n instance, multi-tenant by `tenant_id`** — every workflow is parameterized by tenant, not duplicated per partner. This is what keeps marginal COGS near-zero (Financial Model Section 2.2).
- **Postgres as the single source of truth** for the Unified Contact Memory Object. CRMs (REsimpli/FUB/GHL) are *sync targets*, not the source of truth — this is what makes the AI Brain CRM-agnostic (Outbound Engine doc Part 7).
- **Landing pages are templated, not hand-built per partner.** A partner's "site" is a configuration record (domain, branding, county/distress-type targeting, ad account ID) applied to a shared template — this is how Section 4.2's "asset ownership" claim is technically true while remaining operationally cheap.

---

# SECTION 2: DATA MODEL

## 2.1 Core Table: `contacts` (The Unified Contact Memory Object)

```sql
CREATE TABLE contacts (
    contact_id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID NOT NULL REFERENCES tenants(tenant_id),
    -- Identity
    first_name          TEXT,
    last_name           TEXT,
    phone               TEXT,
    email               TEXT,
    property_address    TEXT,
    county              TEXT,
    -- Source
    source_channel      TEXT,        -- 'meta_ads' | 'google_ppc' | 'google_lsa' | 'organic' | 'referral'
    landing_page_id     UUID REFERENCES landing_pages(page_id),
    -- DIG Scoring (Doctrine Section 14)
    dig_score           INTEGER DEFAULT 0,
    dig_signals         JSONB,       -- ['NOD','divorce','vacant', ...] with timestamps
    equity_estimate_pct NUMERIC,
    -- Qualification state
    motivation          TEXT,
    timeline            TEXT,        -- 'ASAP' | '30_days' | '90_days' | '6_months+' | 'just_curious'
    property_condition  TEXT,
    channel_preference  TEXT,        -- learned: 'sms' | 'voice' | 'email' | 'chat'
    -- Routing
    dig_tier            TEXT,        -- 'A+' | 'A' | 'B' | 'C' | 'recycle' | 'drip'  (Doctrine routing logic)
    assigned_partner_id UUID REFERENCES partners(partner_id),  -- NULL for Omnikom-internal leads
    -- Compliance
    tcpa_consent        BOOLEAN DEFAULT FALSE,
    tcpa_consent_ts     TIMESTAMPTZ,
    dnc_status          TEXT DEFAULT 'unknown',  -- 'clear' | 'federal_dnc' | 'state_dnc' | 'internal_dnc'
    -- CRM sync
    crm_sync_target     TEXT,        -- 'resimpli' | 'fub' | 'ghl' | 'headless'
    crm_external_id     TEXT,
    crm_last_synced_at  TIMESTAMPTZ,
    -- Timestamps
    created_at          TIMESTAMPTZ DEFAULT now(),
    updated_at          TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_contacts_tenant ON contacts(tenant_id);
CREATE INDEX idx_contacts_dig_score ON contacts(dig_score);
CREATE INDEX idx_contacts_phone ON contacts(phone);
```

## 2.2 Table: `conversation_events` (Cross-Channel Memory — The "Unified Brain")

```sql
CREATE TABLE conversation_events (
    event_id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_id      UUID NOT NULL REFERENCES contacts(contact_id),
    channel         TEXT NOT NULL,   -- 'sms' | 'voice' | 'email' | 'web_chat'
    direction       TEXT NOT NULL,   -- 'inbound' | 'outbound'
    content         TEXT,            -- transcript / message body
    ai_generated    BOOLEAN DEFAULT FALSE,
    metadata        JSONB,           -- call duration, disposition code, etc.
    occurred_at     TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_conv_events_contact ON conversation_events(contact_id, occurred_at);
```

**This table is the technical answer to Ylopo's Gap 2.1 ("AI² is signals, not a shared brain").** Every AI prompt (Section 3.2) injects the last N events from this table regardless of channel — a voice agent calling on Wednesday sees Monday's SMS conversation verbatim.

## 2.3 Table: `tenants` and `landing_pages` (Multi-Tenancy)

```sql
CREATE TABLE tenants (
    tenant_id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_type         TEXT NOT NULL,  -- 'omnikom_internal' | 'omnireach_starter' | 'omnireach_certified' | 'omnireach_elite'
    partner_id          UUID REFERENCES partners(partner_id),  -- NULL for omnikom_internal
    domain              TEXT,            -- partner-owned domain (Part 4.1)
    ad_account_id_meta  TEXT,
    ad_account_id_google TEXT,
    crm_type            TEXT,            -- 'resimpli' | 'fub' | 'ghl' | 'headless'
    crm_credentials_ref TEXT,            -- pointer to secrets manager, never stored in plaintext
    territory_counties  TEXT[],          -- exclusivity enforcement (Part 8.2)
    distress_verticals  TEXT[],          -- ['foreclosure','probate','divorce','tax_delinquent', ...]
    a2p_10dlc_status    TEXT DEFAULT 'pending',
    created_at          TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE landing_pages (
    page_id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id       UUID NOT NULL REFERENCES tenants(tenant_id),
    template_id     TEXT NOT NULL,    -- references shared template library (Inbound Intake Engine)
    county          TEXT,
    distress_type   TEXT,
    url_path        TEXT,
    local_data      JSONB,            -- unique local data injection (avoids thin-content penalty)
    published_at    TIMESTAMPTZ
);
```

## 2.4 Table: `consent_log` and `dnc_scrub_log` (Compliance — Part 9.1)

```sql
CREATE TABLE consent_log (
    consent_id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_id      UUID NOT NULL REFERENCES contacts(contact_id),
    consent_type    TEXT NOT NULL,   -- 'tcpa_call_text' | 'tcpa_ai_voice'
    consent_text    TEXT NOT NULL,   -- exact language shown to the homeowner, verbatim
    ip_address      TEXT,
    user_agent      TEXT,
    captured_at     TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE dnc_scrub_log (
    scrub_id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_id      UUID NOT NULL REFERENCES contacts(contact_id),
    scrub_source    TEXT NOT NULL,   -- 'federal_dnc' | 'state_dnc' | 'internal_dnc' | 'litigator_list'
    result          TEXT NOT NULL,   -- 'clear' | 'flagged'
    scrubbed_at     TIMESTAMPTZ DEFAULT now()
);
```

Every outbound AI call MUST have a `consent_log` row with `consent_type = 'tcpa_ai_voice'` AND a `dnc_scrub_log` row with `result = 'clear'` from within the last 24 hours, or the n8n Retell AI Call Outcome workflow refuses to dispatch the call. This is enforced at the database/workflow level, not left to operator discipline.

---

# SECTION 3: AI CONCIERGE — UNIFIED PROMPT ARCHITECTURE

## 3.1 The Memory-Injection Pattern

Every AI interaction (SMS reply, voice call script generation, web chat response) follows this prompt assembly pattern:

```python
def build_system_prompt(contact_id: str, channel: str) -> str:
    contact = get_contact(contact_id)
    history = get_conversation_events(contact_id, limit=20)  # last 20 events, ANY channel
    dig_context = format_dig_signals(contact.dig_signals)

    return f"""
You are the Omnikom AI Seller Concierge. You are continuing an existing
relationship with this homeowner — you have full context from every prior
channel (text, voice, email, chat). NEVER ask the homeowner to repeat
information already in the history below.

HOMEOWNER PROFILE:
- Property: {contact.property_address}, {contact.county}
- Known motivation: {contact.motivation or 'not yet established'}
- Known timeline: {contact.timeline or 'not yet established'}
- Distress signals: {dig_context}
- Current DIG score: {contact.dig_score}
- Channel preference (if learned): {contact.channel_preference or 'none yet'}

FULL CROSS-CHANNEL CONVERSATION HISTORY (most recent {len(history)} events):
{format_history(history)}

CURRENT CHANNEL: {channel}

{get_channel_specific_instructions(channel)}
{get_compliance_disclosure_block(channel)}
"""
```

## 3.2 Channel-Specific Instruction Blocks

| Channel | Additional Instructions |
|---|---|
| `sms` | Keep replies under 320 characters (2 SMS segments). Use the Universal Simple Script branch logic (Playbook Section 2) appropriate to the homeowner's last stated disposition. |
| `voice` (Retell AI) | Generate the call script/response tree, not free text — output structured JSON matching the Retell AI agent config schema (Playbook Section 5). Include the AI self-disclosure line as the first utterance (Part 9.1, FCC disclosure requirement). |
| `email` | Format as a brief, plain-text email (no HTML). Reference the homeowner communication templates (Playbook Section 9, H1-H6) as tone/structure references, but personalize using conversation history. |
| `web_chat` | Conversational, can ask 1-2 qualifying questions per turn. On reaching DIG ≥ 60, present the SOR booking calendar widget. |

## 3.3 DIG Scoring — Computed, Not Just AI-Estimated

The AI Concierge extracts structured signals (timeline, motivation keywords, property condition, equity hints) from the conversation via a function-calling step, but the **DIG Score itself is computed deterministically** by the DIG Scoring Workflow (Section 4.3) using the V2 formula from the Master Doctrine (Section 14) — base points per signal × equity multiplier × stack multiplier. This separation (AI extracts facts; deterministic code computes the score) is deliberate: it makes the score auditable, reproducible, and immune to LLM scoring drift — directly supporting the Lead Quality Guarantee (Financial Model Section 2, Outbound Engine doc Part 5), which must be defensible in a partner dispute.

---

# SECTION 4: n8n WORKFLOW SPECIFICATIONS

## 4.1 Workflow: Lead Intake

**Trigger:** Webhook `POST /webhook/intake/{tenant_id}` from landing page form submission.

| Node | Function |
|---|---|
| 1. Webhook Trigger | Receives form payload: name, phone, email, property address, distress-type checkbox, TCPA consent checkbox state |
| 2. Validate Consent | If `tcpa_consent != true`, branch to "no-AI-outreach" path — contact is created but flagged `tcpa_consent = FALSE`; only non-AI channels (manual follow-up) permitted |
| 3. DNC Pre-Scrub | Calls federal/state DNC API + internal DNC table; writes `dnc_scrub_log` row |
| 4. Upsert Contact | Insert or update `contacts` row (dedupe on phone+address) |
| 5. Log Consent | Insert `consent_log` row with verbatim consent text + IP + timestamp |
| 6. Trigger AI Concierge | Calls AI Concierge Conversation Workflow (Section 4.2) with `channel = 'sms'` (or `web_chat` if submitted via chat widget) |

## 4.2 Workflow: AI Concierge Conversation

**Trigger:** Called by Intake Workflow, or by inbound SMS/email/chat webhook (Twilio/email provider/chat widget).

| Node | Function |
|---|---|
| 1. Trigger | Inbound message event (any channel) |
| 2. Fetch Memory | Query `contacts` + last 20 `conversation_events` for this `contact_id` |
| 3. Build Prompt | Apply Section 3.1 template |
| 4. Call GPT-4o | Function-calling enabled: extracts `motivation`, `timeline`, `property_condition`, `equity_hint` as structured fields |
| 5. Write Conversation Event | Insert inbound + outbound rows to `conversation_events` |
| 6. Update Contact Fields | Write extracted fields to `contacts` |
| 7. Send Reply | Dispatch via channel-appropriate API (Twilio SMS, email provider, chat widget response, or queue for Retell AI if voice) |
| 8. Trigger DIG Scoring | Calls DIG Scoring Workflow (Section 4.3) |

## 4.3 Workflow: DIG Scoring

**Trigger:** Called by AI Concierge Conversation Workflow after every interaction, and on a nightly batch for signal decay/refresh.

| Node | Function |
|---|---|
| 1. Trigger | `contact_id` passed in |
| 2. Fetch Signals | Read `dig_signals` JSONB + `equity_estimate_pct` |
| 3. Compute Score | Apply DIG V2 formula (Doctrine Section 14): base points per signal × equity multiplier (×1.3 if equity > 40%) × stack multiplier (×1.5 if 3+ signals) |
| 4. Write Score | Update `contacts.dig_score` and `dig_tier` |
| 5. Route Decision | IF `dig_score >= 60` → trigger SOR Booking sub-workflow (route to Senior ISA / CRM Sync as `A`/`A+` lead). IF `40 <= dig_score < 60` → AI nurture sequence continues. IF `20 <= dig_score < 40` → flag for Engine 8 (direct mail). IF `< 20` → route to Nurture Network (Product 7) |
| 6. Trigger CRM Sync | Calls CRM Sync Workflow (Section 4.4) regardless of tier, so partner CRMs always reflect current state |

## 4.4 Workflow: CRM Sync (CRM-Agnostic Layer)

**Trigger:** Called whenever a `contacts` row changes meaningfully (DIG score change, new conversation event, disposition change).

| Node | Function |
|---|---|
| 1. Trigger | `contact_id`, `tenant_id` |
| 2. Lookup Tenant CRM Config | Read `tenants.crm_type` and `crm_credentials_ref` |
| 3. Switch on CRM Type | Branches to one of 4 sub-paths below |
| 3a. REsimpli | POST to REsimpli API: upsert contact, set DIG score as custom field, set pipeline stage from `dig_tier` |
| 3b. Follow Up Boss | POST to FUB API: upsert person, trigger Action Plan based on `dig_tier` (per Playbook Section 5 FUB Action Plans) |
| 3c. GoHighLevel | POST to GHL API: upsert contact, set custom field, move pipeline stage |
| 3d. Headless | Write/update a row in a partner-facing Supabase view or Airtable base (read-only dashboard, no external CRM) |
| 4. Write Sync Timestamp | Update `contacts.crm_last_synced_at` |

## 4.5 Workflow: Retargeting / Behavioral Trigger

**Trigger:** Scheduled (hourly) + webhook from landing page analytics (page view, return visit, time-on-site events).

| Node | Function |
|---|---|
| 1. Trigger | Behavioral event from landing page tracking pixel |
| 2. Match Contact | If contact known (returning visitor with cookie/identified email), update `conversation_events` with a `metadata`-tagged "page_revisit" event |
| 3. Update Custom Audience | If `dig_score < 60` and contact has not converted, push contact (hashed email/phone) to Meta/Google Custom Audience for retargeting ad campaigns |
| 4. Direct Mail Handoff | If `dig_score` between 20-40 and no conversion after N days, flag for Engine 8 AI-triggered direct mail queue (per Outbound Engine doc Section 3.3) |

## 4.6 Workflow: Consent & Compliance Pre-Flight (Gating Workflow)

**Trigger:** Called by any workflow attempting to dispatch an outbound AI voice call.

| Node | Function |
|---|---|
| 1. Trigger | `contact_id`, intended call time |
| 2. Check Consent | Query `consent_log` for `consent_type = 'tcpa_ai_voice'` — if absent, ABORT and flag for manual outreach only |
| 3. Check DNC | Query `dnc_scrub_log` for a `result = 'clear'` row within 24 hours — if stale or flagged, re-scrub or ABORT |
| 4. Check Calling Window | Verify current time is within 8am-9pm in the contact's local timezone (derived from property address) — if outside window, queue for next valid window |
| 5. Dispatch | If all checks pass, call Retell AI dispatch API with the AI self-disclosure script |

This workflow is the **technical enforcement** of Part 9.1's compliance scaffold — it is not optional or bypassable by an operator, which is the structural difference from Ylopo's model (where the gap analysis notes liability is "silently transferred" rather than scaffolded).

---

# SECTION 5: MULTI-TENANCY & PARTNER ONBOARDING (TECHNICAL)

## 5.1 Onboarding a New OmniReach Partner (Phase 4-5)

| Step | What Happens Technically |
|---|---|
| 1 | Partner signs up (self-serve Starter) or is onboarded by success manager (Certified/Elite) |
| 2 | `tenants` row created: `tenant_type`, `partner_id`, `territory_counties`, `distress_verticals` |
| 3 | Partner connects their own Meta/Google ad accounts via OAuth (stored as `ad_account_id_meta`/`ad_account_id_google` — Omnikom never holds partner ad spend) |
| 4 | Partner selects landing page template(s) from the shared library; `landing_pages` rows created with `local_data` populated per their county/distress-type combination (reusing Inbound Intake Engine's local-data injection pipeline) |
| 5 | Partner connects CRM (REsimpli/FUB/GHL OAuth, or "headless" default) — `crm_type` + `crm_credentials_ref` set |
| 6 | A2P 10DLC registration initiated centrally (Omnikom-managed, per Part 9.1) — `a2p_10dlc_status` tracked |
| 7 | Territory exclusivity check: system verifies no existing `tenants` row has overlapping `territory_counties` + `distress_verticals` — if conflict, onboarding blocks with an explicit message (Part 8.2 enforcement) |
| 8 | Landing pages go live on partner's domain (DNS instructions provided; Omnikom does not need to own the domain) |

## 5.2 Why This Scales to 800+ Partners (Y5) Without Linear Engineering Cost

- All workflows in Section 4 are **tenant-parameterized**, not duplicated. Adding partner #821 means adding one `tenants` row, not one n8n workflow.
- The only linearly-scaling cost is **success manager headcount** (Financial Model Section 5.3) and **AI/voice compute** (Financial Model Section 2.2) — both already modeled as per-partner COGS.
- Landing pages are generated from the shared template library (same one built for the Inbound Intake Engine's ~960 programmatic pages) — adding a partner's pages is a config + content-generation job, not custom development.

---

# SECTION 6: INFRASTRUCTURE & COST STACK

## 6.1 Infrastructure Components

| Component | Tool | Phase 1-2 (Months 1-6, low volume) | Phase 4-5 (Y2, ~30 partners) | Y5 (~820 partners) |
|---|---|---:|---:|---:|
| n8n hosting | Self-hosted VPS (Hetzner/DigitalOcean) | $12/mo (existing) | $48/mo (4 vCPU/8GB) | $192/mo (clustered, 2-3 nodes) |
| Postgres (Supabase) | Managed Postgres | $25/mo (Pro tier) | $25/mo | $599/mo (Team tier, higher connection limits + read replicas for DIG aggregation) |
| GPT-4o API | OpenAI | $200-500/mo (existing, Engine 9 adds ~$100-300/mo at base case volume) | +$800/mo (30 partners × ~$25/mo avg AI compute, Financial Model 2.2) | +$15,000/mo (820 partners, weighted by tier) |
| Retell AI | Voice | $500-2,000/mo (existing) | +$450/mo (30 partners × ~$15/mo avg) | +$25,000/mo (820 partners, weighted) |
| Twilio (A2P 10DLC) | SMS/numbers | $100/mo (existing) | +$60/mo (30 partners × $2/mo) | +$1,640/mo (820 partners × $2/mo) |
| Landing page hosting (Vercel/Netlify) | Static site hosting | Included in existing Inbound Intake Engine hosting | +$60/mo (30 partners × $2/mo, shared CDN) | +$1,640/mo |
| **Total incremental monthly** | | **~$300-800** | **~$1,440** | **~$44,070** |

## 6.2 Reconciling Infrastructure Cost vs. Stream 6 Revenue (Y5)

| | Y5 |
|---|---:|
| Stream 6 ARR | $6,135,840 |
| Stream 6 monthly revenue | $511,320 |
| Infrastructure incremental monthly cost (6.1) | $44,070 |
| Infrastructure as % of revenue | 8.6% |
| Success manager cost (9.6 FTE × $4,500/mo, Financial Model 5.3) | $43,200/mo |
| **Total COGS (infra + SM)** | **$87,270/mo (17.1% of revenue)** |

This is slightly higher than the blended 14-16% COGS estimate in Financial Model Section 3.4 (which excluded SM headcount as a separate line) — **reconciled here**: Financial Model 2.2's "Total COGS" already included an SM allocation per partner ($90/mo for Certified/Elite). Section 6.2 above double-counts SM cost by also listing it separately. **The correct combined COGS % is 14-16% (Financial Model 3.4) — infrastructure-only cost (6.1) is ~8.6% of revenue at Y5, and the remaining ~5-7% is the SM allocation already embedded per-partner.** Use Financial Model 3.4 as the authoritative margin figure; Section 6.1/6.2 here exist to validate that infrastructure scaling doesn't create a hidden cost not captured in the per-partner model — **it doesn't.**

## 6.3 Engineering Build Effort Estimate (Phase 1-2)

| Workstream | Estimated Effort | Notes |
|---|---|---|
| `contacts`/`conversation_events`/`tenants`/`landing_pages`/consent tables (Section 2) | 1-2 weeks | Schema design + migration scripts on existing Supabase instance |
| Lead Intake + AI Concierge Conversation workflows (4.1-4.2) | 2-3 weeks | Builds on existing AI Concierge work from Inbound Intake Engine — largely re-pointing existing logic at the new shared memory table |
| DIG Scoring Workflow (4.3) | 1 week | Doctrine V2 formula already specified; this is implementation, not design |
| CRM Sync Workflow — REsimpli + FUB only for Phase 1-2 (GHL/headless deferred to Phase 4) | 2 weeks | Two integrations sufficient for internal use; GHL/headless added before partner onboarding |
| Retargeting + Compliance Pre-Flight workflows (4.5-4.6) | 1-2 weeks | Compliance pre-flight is the highest-priority of the two — should ship before any paid AI voice dispatch |
| Landing page template adaptation (reuse Inbound Intake Engine templates) | 1 week | Mostly config — add ad-tracking parameters and conversion pixel wiring |
| **Total Phase 1-2 engineering effort** | **8-11 weeks** (1 engineer) or **4-6 weeks** (2 engineers in parallel) | |

---

# SECTION 7: SECURITY & DATA HANDLING NOTES

- **PII (phone, email, property address) lives only in Postgres**, encrypted at rest (Supabase default). CRM sync pushes copies to partner CRMs under the partner's own data-processing terms with those vendors.
- **`crm_credentials_ref`** stores a reference to a secrets manager (e.g., Supabase Vault or a dedicated secrets store), never raw OAuth tokens in the `tenants` table.
- **Consent log (`consent_log`) is append-only** — no updates or deletes, by design, since it is the audit trail referenced in Part 9.2's liability allocation.
- **FinCEN UBO data** (for cash/entity purchases, per Doctrine Section 18) is handled by the existing FinCEN UBO Trigger workflow (Playbook Section 5) — out of scope for this spec, but the `contacts` table's `crm_external_id` provides the join key if UBO data needs to be cross-referenced with a contact's acquisition source.

---

*End of Outbound Acquisition Engineering Specification. Companion documents: OMNIKOM_OUTBOUND_ACQUISITION_ENGINE.md, OMNIKOM_OUTBOUND_FINANCIAL_MODEL.md, OMNIKOM_CRM_ARCHITECTURE.md.*
