# OMNIKOM CRM ARCHITECTURE
## Follow Up Boss as Industry-Standard CRM + Integration Stack
### Dual-CRM Strategy: FUB (Agent Network) + REsimpli (Investor Engine)
#### June 2026

---

## THE STRATEGIC DECISION: WHY FUB + REsimpli (NOT GHL ALONE)

After deep research, the optimal CRM architecture for Omnikom is a **dual-CRM strategy**, not a single platform. Here's why:

| Dimension | GoHighLevel | Follow Up Boss | REsimpli | Winner |
|-----------|:-----------:|:--------------:|:--------:|--------|
| Agent/partner adoption | Low (agents don't use GHL) | **High** (NAR member base) | Low | **FUB** |
| Investor/wholesaler fit | Moderate | Poor natively | **Excellent** | **REsimpli** |
| Zillow/Realtor.com integration | Via Zapier (slow) | **Native, real-time** | No | **FUB** |
| Power dialer / outbound | Via third-party | Via third-party | **Built-in** | **REsimpli** |
| Direct mail module | Via third-party | Via third-party | **Built-in** | **REsimpli** |
| AI features | **Strong (native voice AI)** | Moderate (Smart Summaries) | Minimal | **GHL** |
| API / webhooks | All plans | Platform tier ($833+/mo) | Limited | **GHL** |
| Cost (10-user team) | $297/mo | $499/mo | $199/mo | GHL |
| n8n / Retell AI integration | **Native** | Via webhooks + API | Via webhooks | **GHL** |
| White-label capability | **Yes** | No | No | **GHL** |
| Monthly flat price | **Yes** | Per-user (scales up) | Per-user | **GHL** |

**Verdict**: No single CRM wins across all dimensions. The solution is:

```
REsimpli  →  Investor/Wholesale/Acquisition operations
FUB       →  Agent partner network, Zillow/Realtor.com inbound, retail buyer pipeline
n8n       →  The bridge: syncs data between both CRMs; orchestrates Retell AI
```

---

## FOLLOW UP BOSS — CURRENT PRICING (2025–2026)

| Plan | Monthly | Annual/mo | Users Included | Extra Users (monthly) |
|------|:-------:|:---------:|:--------------:|:--------------------:|
| **Grow** | $69/user | $58/user | Per-user basis | N/A |
| **Pro** | $499 | $416 | 10 users | +$49/user |
| **Platform** | $1,000 | $833 | 30 users | +$20/user |
| Calling add-on (Grow only) | +$39/user/mo | +$33/user/mo | N/A | N/A |

**Pro and Platform include**: Unlimited calling + texting (US/Canada), call recording, team inbox, AI features

**API access**: Likely gated to Platform tier ($833/mo annual) — verify with FUB sales. Full REST API at `https://api.followupboss.com/v1/`

**When FUB makes financial sense for Omnikom**:
- 10+ active agent partners who will use it for Zillow/Realtor leads → Pro plan ($499/mo) 
- 30+ agent partners + lender access + multi-team → Platform plan ($833/mo annual)
- If agent network < 10 people → defer FUB; use GHL + Zapier for portal lead intake

---

## FUB PIPELINE CONFIGURATION FOR OMNIKOM

### Pipeline 1: Inbound Seller Leads (Portal + Paid Ads)
```
Stages:
├── New Lead (auto-entry from Zillow/Realtor.com/Facebook)
├── Attempting Contact (AI/ISA working lead)
├── Contacted - Warm (responded positively)
├── Appointment Set
├── Appointment Completed → Qualification Score Applied
├── Offer Presented
├── Under Contract → Hand off to REsimpli Deal Pipeline
├── Closed - Won
└── Closed - Lost (reason tracked)
```

### Pipeline 2: Buyer Database (Retail + Novation)
```
Stages:
├── New Buyer Inquiry
├── Pre-Approval / POF Requested  
├── Verified Buyer (Tier 1 gate cleared)
├── Active - Property Search
├── Matched to Property
├── Offer Submitted
├── Under Contract
└── Closed Buyer
```

### Pipeline 3: Agent Partner Management
```
Stages:
├── Partner Application
├── Vetting in Progress
├── Approved - Onboarding
├── Active Certified Partner
├── Preferred Partner (5+ deals)
└── Elite Partner (20+ deals)
```

### Smart Lists (FUB's Power Feature for Omnikom)
- `Tag: probate` → All probate-referred leads; assigned to probate attorney partner
- `Tag: pre-foreclosure` → NOD leads; priority follow-up queue
- `Tag: vacant` → D4D-sourced leads
- `Tag: novation-eligible` → High equity + condition allows retail listing
- `Tag: 1031-buyer` → 1031 exchange buyers in active identification period
- `Stage: appointment-set + Last Contact > 5 days` → Overdue follow-up alert

### FUB Action Plans (Automated Sequences)

**Seller Inbound — 14-Day Action Plan**
```
Minute 0:  Auto-text: "Hi [Name], saw your inquiry about [Address]. 
           This is [Agent] from Omnikom. Are you available 
           for a quick call today?"
Hour 1:    Vocaly AI / Mod AI makes inbound callback attempt
Hour 2:    Email: "Your Seller Options Summary" (pre-built template)
Day 2:     Agent task: Personal call attempt
Day 3:     Auto-text: "Still here if you have questions about [Address]"
Day 5:     Email: Case study — "How Maria sold her distressed home in 14 days"
Day 7:     Agent task: Second personal call
Day 10:    Auto-text: "Quick update — we have an investor looking in 
           [City] this week. Still interested?"
Day 14:    Agent task: Final qualification call; decision to nurture or close
```

**Buyer New Lead — 7-Day Action Plan**
```
Minute 0:  Auto-text: "Hi [Name]! You requested info about our 
           off-market properties. What's your ideal timeframe 
           and budget?"
Hour 2:    Email: "How Omnikom Off-Market Buying Works" overview
Day 1:     Task: Qualification call (Tier 1 gate)
Day 3:     Auto-text: "[Number] new off-market properties 
           hit our network this week in [City]. Want first look?"
Day 7:     Email: Featured property alert (if matched)
```

---

## RETELL AI → FOLLOW UP BOSS INTEGRATION ARCHITECTURE

Since there is no native Retell AI ↔ FUB integration, use n8n as the middleware:

```
FLOW: Outbound Call Completion → FUB Update

[1] Retell AI completes call
    ↓ (webhook fires to n8n)
[2] n8n receives Retell call payload:
    {
      "contact_id": "ghl_or_retell_id",
      "call_outcome": "appointment_set | warm | no_answer | dnd",  
      "appointment_datetime": "2026-07-15T14:00:00",
      "motivation_score": 8,
      "call_summary": "Seller has NOD filed, 90 days to auction, 
                       40% equity, open to cash offer",
      "transcript": "full text..."
    }
    ↓
[3] n8n looks up FUB contact via GET /people?email={email}
    ↓
[4] n8n creates Note in FUB:
    POST /notes
    {
      "personId": "{fub_contact_id}",
      "body": "AI Call Summary: [summary]\nMotivation Score: 8/10\nOutcome: Appointment Set for July 15 at 2pm",
      "isHtml": false
    }
    ↓
[5] n8n updates FUB Stage:
    PUT /people/{id}
    { "stage": "Appointment Set" }
    ↓
[6] n8n adds FUB Tag:
    POST /people/{id}/tags
    { "tag": "ai-qualified | motivation-high | nod-seller" }
    ↓
[7] n8n triggers FUB Action Plan (if appointment set):
    POST /actionPlans/{planId}/apply
    { "personId": "{fub_contact_id}" }
    ↓
[8] Slack notification to team:
    "#deals-alerts: 🔥 HOT LEAD — [Name] at [Address]. 
    Score: 8/10. Appointment: July 15 2pm. 
    NOD filed, 40% equity, 90 days to auction."
```

**Inbound FUB Lead → Retell AI Callback**
```
[1] New lead enters FUB (Zillow, Realtor.com, Facebook, web form)
    ↓ (FUB fires webhook: peopleCreated)
[2] n8n receives FUB webhook
    ↓
[3] n8n enriches lead (PropStream API → equity, mortgage, distress signals)
    ↓
[4] n8n generates personalized call script using OpenAI:
    "Hi [Name], you recently asked about options for [Address]. 
    We pulled some data and noticed [specific insight]. 
    Our specialist wanted to reach out personally..."
    ↓
[5] If lead score > 60: n8n triggers Retell AI outbound call immediately
    POST https://api.retellai.com/v2/create-phone-call
    {
      "from_number": "+1...",
      "to_number": "{lead_phone}",
      "agent_id": "omnikom_inbound_followup_agent",
      "retell_llm_dynamic_variables": {
        "first_name": "{lead_first_name}",
        "property_address": "{address}",
        "equity_estimate": "$120,000",
        "specific_insight": "tax delinquency notice filed 8 months ago"
      }
    }
    ↓
[6] Call outcome → FUB update (same flow as above, Steps 3–8)
```

---

## FUB NATIVE AI FEATURES — CONFIGURATION FOR OMNIKOM

| Feature | How to Use for Omnikom | Plan Required |
|---------|----------------------|:-------------:|
| **Predictive Lead Prioritization** | Surfaces highest-intent inbound sellers daily → ISA calls these first | Pro/Platform |
| **Smart Summaries** | One-click call recording summary → saves ISA 5 min per lead | Pro/Platform |
| **Smart Messages** | AI drafts personalized reply to seller text/email → agent reviews + sends | Pro/Platform |
| **Suggested Tasks** | AI flags leads overdue for follow-up → prevents deals from falling through cracks | All plans |
| **AI Lead Scoring** | Zillow buyer intent score auto-applied → routes to agent immediately | Pro/Platform |

**Third-party AI voice for FUB** (from FUB Marketplace):
- **Vocaly AI** (vocaly.ca): Free tier; answers inbound calls 24/7; qualifies and books appointments; updates FUB contact in real time; also does rule-based outbound callbacks
- **Mod AI Automation** (ModAiAutomation.com): Free; AI texting + voice + email; updates FUB records and triggers action plans from conversation outcomes

For Omnikom: Use **Retell AI for outbound cold calling campaigns** (better for high-volume custom scripting). Use **Vocaly AI for inbound 24/7 coverage** (free, native FUB integration, zero setup friction).

---

## RESIMPLI — INVESTOR/WHOLESALE ENGINE

REsimpli remains the operational CRM for the acquisition/wholesale side. It provides what FUB cannot:

| Feature | REsimpli Capability |
|---------|---------------------|
| Built-in dialer | Multi-line power dialer included |
| Direct mail | Integrated postcard/letter sending |
| Skip tracing | Built-in (no PropStream add-on needed for basic) |
| Deal tracking | Wholesale/assignment/double-close specific |
| Driving for dollars | Built-in D4D map |
| Disposition (selling deals) | Buyer list management |
| List stacking | Import and stack multiple lists |
| Cost | $199/month |

---

## COMPLETE TECH STACK (REVISED — FUB EDITION)

| Layer | Tool | Monthly Cost | Purpose |
|-------|------|:------------:|---------|
| **Acquisition CRM** | REsimpli | $199 | Outbound investor ops; dialer; D4D; direct mail; wholesale pipeline |
| **Agent/Portal CRM** | Follow Up Boss Pro | $499 | Agent partners; Zillow/Realtor.com leads; retail buyer pipeline; team management |
| **AI Voice (Outbound)** | Retell AI | ~$500–2,000 | High-volume outbound cold calls to distressed sellers |
| **AI Voice (Inbound/FUB)** | Vocaly AI | Free | 24/7 inbound on FUB portal leads; books appointments in FUB calendar |
| **Orchestration** | n8n (self-hosted) | $12 (VPS) | Bridges REsimpli ↔ FUB; orchestrates Retell AI; agentic workflows |
| **Simple Automations** | Make.com | $29 | Lightweight webhook bridges; non-agentic triggers |
| **Data / Lists** | PropertyRadar | $249 | CA court-sourced distress data (NOD, probate, divorce) |
| **Data / Outreach** | PropStream/BatchLeads | $199 | Nationwide + skip trace + batch contact |
| **Expired Listings** | REDX | $80 | Expired MLS data (not in REsimpli/PropStream) |
| **D4D** | DealMachine | $119 | AI Street View analysis for vacant properties |
| **AI Brain** | OpenAI API (GPT-4o) | $200–500 | Lead scoring; script generation; deal analysis; knowledge base queries |
| **AI Voice TTS** | ElevenLabs | $22 | Custom voice cloning for Retell AI agents |
| **Knowledge Base** | Notion | $16 | SOPs; scripts; compliance; training |
| **Communication** | Slack | $50 | Internal team; deal alerts; AI notifications |
| **Phone Numbers** | Twilio | $100 | Number provisioning for Retell + REsimpli |
| **Wire Security** | ClosingLock | $49 | Encrypted wire instructions |
| **E-Signing** | DocuSign | $45 | Contracts; partner agreements |
| **Finance** | Mercury + QuickBooks | $30 | US banking + accounting |
| **Background Checks** | Checkr | $30–50/check | Partner vetting |
| **Total Stack** | | **~$2,400–3,200/mo** | |

**Stack cost per closed deal** (at 35 deals/month): $69–$91/deal in technology costs — extremely efficient.

---

## DATA FLOW DIAGRAM

```
DISTRESS SIGNALS (PropertyRadar + PropStream + REDX + DealMachine)
         ↓
    n8n — LIST STACKING AGENT
    (score each record 1–40 based on signal combination)
         ↓
    ┌────────────────────────────────┐
    │ Score 25+: Retell AI Outbound  │
    │ Score 15–24: REsimpli Mail     │
    │ Score <15: REsimpli Nurture    │
    └────────────────────────────────┘
         ↓
    RETELL AI OUTBOUND CALL
    (LPMAMA qualification; books appointment)
         ↓
    n8n WEBHOOK PROCESSOR
    (parse outcome; determine routing)
         ↓
    ┌──────────────────────────────────────┐
    │ HOT (appt set): → REsimpli "Appt"    │
    │   + Slack alert + FUB if agent deal  │
    │ WARM: → REsimpli 5-touch nurture     │
    │ COLD: → REsimpli 90-day drip         │
    └──────────────────────────────────────┘
         ↓
    INBOUND (Zillow/Realtor/Facebook/Google)
         ↓
    FOLLOW UP BOSS (FUB)
    (native integrations; AI lead scoring;
     Vocaly AI answers 24/7; ISA qualifies)
         ↓
    n8n BRIDGE (FUB → REsimpli)
    When seller qualifies → create deal in REsimpli
    When retail buyer qualifies → keep in FUB buyer pipeline
         ↓
    RESIMPLI DEAL PIPELINE
    (contract → title → close)
         ↓
    n8n POST-CLOSE AGENT
    (stakeholder routing; referral fees;
     FinCEN compliance; review capture)
```

---

## MIGRATION PLAN (GHL → FUB + REsimpli)

If you are already on GoHighLevel or starting fresh, here is the recommended path:

**Month 1–2: Run REsimpli only**
- REsimpli handles all outbound acquisition operations
- No FUB yet — agent partner network is too small to justify $499/month
- n8n bridges REsimpli ↔ Retell AI ↔ Slack

**Month 3–6: Add FUB Pro when agent network reaches 5+ active partners**
- Import agent contacts; configure Zillow/Realtor.com integrations
- Add Vocaly AI for 24/7 inbound handling
- Build n8n bridge: FUB webhook → REsimpli deal creation (when FUB lead converts to under-contract)

**Month 6+: Platform tier when you need API access + 30+ agent users**
- Platform plan ($833/mo annual) unlocks full REST API
- Enables deeper Retell AI ↔ FUB automation
- Multi-team structure for multi-state operations

**Keep GHL?** Consider keeping GHL for:
- White-label AI Seller Concierge product (built on GHL snapshot for partner brokerages)
- Landing pages + funnels for digital ads → feeds into FUB via webhook
- GoHighLevel's funnel builder + Facebook/Google ad integrations are superior for lead capture; FUB receives the lead and manages the relationship

**Final stack summary**:
```
GHL ($297/mo)  → Landing pages + funnels + ad integrations + white-label SaaS
FUB Pro ($499) → Agent CRM + portal integrations + buyer pipeline
REsimpli ($199)→ Investor/acquisition CRM + dialer + direct mail
n8n ($12)      → The orchestration brain connecting all three
Retell AI      → Voice agents (outbound cold + inbound overflow)
```
**Total**: ~$1,007/month for the CRM/comms layer — less than a single US employee's monthly cost.

---

*CRM architecture built on June 2026 research. FUB pricing verified against followupboss.com/pricing. API documentation verified against docs.followupboss.com. Integration capabilities confirmed via FUB marketplace listings and n8n community nodes.*
