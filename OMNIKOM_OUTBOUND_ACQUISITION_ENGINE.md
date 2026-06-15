# OMNIKOM OUTBOUND ACQUISITION & AI NURTURE ENGINE
## Engine 9 (Internal) + Product 8: "OmniReach" — The Anti-Ylopo Platform

**Status:** New build — companion to the Master Doctrine, Operations Playbook, and Inbound Intake Engine.
**Trigger:** Competitive teardown of Ylopo, LLC (15-brief study, supplied 2026-06-14), synthesized into a gap-exploitation build.
**Core thesis:** Ylopo proved the model — paid ads → branded site → AI text/voice nurture → live transfer → CRM — generates $50-100M/year on a **rented, capped, structurally-flawed stack**. Omnikom builds the same machine on **owned infrastructure, with the gaps closed**, runs it first for its own distressed-seller acquisition (Engine 9), then **productizes it and sells it to the Certified Partner Network** as a recurring-revenue SaaS (Product 8) — directly poaching Ylopo's underserved segments (investors, solo wholesalers, non-FUB teams, anyone burned by the 90-day trap).

This is a **two-for-one build**: it is simultaneously (a) the outbound paid-acquisition engine Omnikom needs to scale its own seller pipeline beyond cold calling, and (b) a sixth product line that converts a competitor's structural weaknesses directly into Omnikom ARR.

---

# PART 1 — THE TEARDOWN, COMPRESSED

## 1. What Ylopo Actually Is

A done-for-you paid-lead-gen + AI-nurture layer that sits on top of a CRM the client brings (almost always Follow Up Boss/Zillow). Dynamic Meta/Google ads → branded Squarespace IDX site → behavioral tracking → AI text (OpenAI) + AI voice (Rime TTS) nurture → live transfer to a human → handoff. ~$50-100M revenue, ~7,000-10,000 paying clients, PE-backed (Summit Partners, 2021), 210-250 staff (substantial Manila offshore team).

## 2. The Five Vulnerabilities That Matter Most to Omnikom

| # | Ylopo's gap | Why it's exploitable |
|---|---|---|
| 1 | **Lead quality vs. the "ready leads" promise** — ~1 deal per 50-70 leads, rated 3/10 by independent reviewers | The #1 complaint, confirmed by fans AND critics. A quality guarantee is a direct kill-shot. |
| 2 | **"No contract" marketing vs. 90-day auto-renew, non-refundable fees, 10% hidden ad markup** | Decision-grade, quotable contradiction — the single most exploitable trust gap in the whole study. |
| 3 | **Rented everything** — Squarespace site, OpenAI, Rime, no owned SEO/brand/domain equity | "Build an asset, not a rental" is a clean counter-narrative. |
| 4 | **Follow Up Boss (Zillow-owned) dependency** — flagship AI Voice is FUB-only | A CRM-agnostic AI layer wins the majority who aren't on FUB — and removes the two-vendor tax. |
| 5 | **Non-exclusive territory** — Ylopo sells to 4-6 competitors per market, same AI texts to the same consumers | "We won't arm your competitor down the street" directly fixes a weakness Ylopo cannot fix without capping revenue. |

## 3. Why This Maps Perfectly to Omnikom

Ylopo's machine was built for **retail buyer/seller leads → agents**. Omnikom's Distress Intent Graph, AI Concierge, n8n orchestration, and Certified Partner Network already exist for the **distressed-seller → investor/wholesaler/agent** market — a market Ylopo barely touches and structurally cannot serve well (their own gap analysis names "agents wanting an asset," "true solo agents," and "buyers wanting transparent, contract-free pricing" as open segments). Omnikom doesn't need to invent the machine — it needs to **build the same machine, owned, for distress, and sell access to it**.

---

# PART 2 — THE 10 ANTI-YLOPO DESIGN PRINCIPLES

Every principle below is a direct counter to a named Ylopo gap, and every one is a **build requirement** for Engine 9 / Product 8 — not marketing copy. If a principle can't be true in the build, it doesn't go in the pitch.

| # | Ylopo does | Omnikom does instead | Where it lives in the build |
|---|---|---|---|
| 1 | Sells *volume* (50-70 leads/deal) | Sells / delivers **Distress Intent Score-qualified leads only** (60+ DIG score minimum to count toward any guarantee) | Section 5 — Lead Quality Guarantee |
| 2 | 90-day auto-renew, non-refundable, hidden 10% ad markup | **Month-to-month, cancel anytime, flat platform fee, ad spend billed at cost (0% markup) — client's own ad account** | Section 6 — Pricing & Contract Model |
| 3 | Rented Squarespace site, no SEO equity, agent owns nothing on churn | Client (or Omnikom, for internal use) **owns the domain, the site, the SEO equity, and the ad account** from day one | Section 4 — Owned Asset Architecture |
| 4 | AI Voice works ONLY on Follow Up Boss (Zillow-owned) | **CRM-agnostic AI layer** — works on REsimpli, Follow Up Boss, GoHighLevel, or "headless" (no CRM at all, via n8n + Airtable) | Section 7 — CRM-Agnostic AI Layer |
| 5 | "AI²" = two bots sharing signals, human bridges context | **Unified AI Brain** — one memory object per contact across SMS, voice, email, and web chat; no human bridging required | Section 7 — Unified AI Brain |
| 6 | Non-exclusive — sells to 4-6 competitors per market | **Territory exclusivity by default** — one Certified/Elite partner per county per distress vertical for OmniReach subscribers | Section 8 — GTM & Exclusivity |
| 7 | No ad-copy/creative control | Partner controls **all ad creative and copy** within Fair Housing / TCPA guardrails (templates provided, not mandatory) | Section 4 |
| 8 | TCPA liability transferred to the agent/broker silently | **Compliance-first scaffold built in from day one**: consent capture, audit trail, A2P 10DLC registration, DNC scrubbing — documented, not hidden, with Omnikom contractually sharing the compliance burden | Section 9 — Compliance Addendum |
| 9 | Demo-gated, opaque pricing, oversold to poor-fit buyers | **Published pricing**, self-serve trial tier, honest ICP screening (we tell you if you're not a fit) | Section 6, Section 8 |
| 10 | Manufactured social proof (astroturfed reviews) | **Real case studies from Omnikom's own internal use of Engine 9** before any partner sees the product — proof from operating it ourselves, not marketing it | Section 3 |

---

# PART 3 — ENGINE 9: OUTBOUND PAID ACQUISITION (INTERNAL USE)

## 3.1 Why Omnikom Needs This Now

Cold calling (Engines 1-2) has a hard ceiling: every dial requires a phone number, a script, and a compliance envelope. Inbound (Engine 5, the Inbound Intake Engine) compounds but takes 6-12 months to mature. **Paid acquisition is the bridge** — it can be switched on this week, scales linearly with budget, and feeds the same Distress Intent Score pipeline as every other engine.

Engine 9 is the **ninth engine** in the Channel Flywheel (Doctrine Section 15), sitting alongside cold calling, DIG scoring, AI nurture/revival, referral professionals, SEO/inbound, retargeting, marketplace partner-submitted leads, and AI-triggered direct mail.

## 3.2 The Machine (Adapted From Ylopo's Architecture, Built on Owned Infrastructure)

```
AD STACK (Meta FB/IG · Google PPC · Google LSA)
   └ Distress-signal targeting: "stop foreclosure," "sell house fast [county]",
     "behind on property taxes," "inherited house," "divorce sell house",
     lookalike audiences built from the Distress Intent Graph
        │ (click)
        ▼
   OWNED LANDING PAGE (Omnikom-built, on Omnikom's own domain — see Inbound
   Intake Engine site architecture /sell/[county]/[distress-type]/)
   └ Dynamic registration form (3-5 fields max, distress-type aware)
        │
        ▼
   AI SELLER CONCIERGE (Unified AI Brain — Section 7)
   └ Same engine that powers Inbound Intake Engine; same memory object,
     same DIG scoring, same n8n pipeline
        │ qualifies: timeline, condition, motivation, equity estimate
        ▼
   DISTRESS INTENT SCORE V2 (Doctrine Section 14)
   └ Score ≥ 60 → route to live transfer / SOR booking
   └ Score 20-59 → AI nurture sequence (text + voice, unified memory)
   └ Score < 20 → Nurture Network (Product 7), long-term drip
        │
        ▼
   LIVE TRANSFER → Senior ISA (Playbook Section 3) or SOR booking via FUB/REsimpli
        ▼
   SYSTEM OF RECORD = REsimpli (investor pipeline) / FUB (agent partner pipeline)
        │
        ▼
   RETARGETING LOOP → behavioral data (page views, time-on-site, return visits)
   feeds back into Meta/Google custom audiences AND into the Nurture Network
   re-engagement triggers (n8n workflow, Playbook Section 5)
```

**The critical difference from Ylopo:** every component above — the domain, the landing pages, the ad account, the SEO equity that accumulates on those same pages, the AI memory object, and the CRM — is **owned by Omnikom** (or, for Product 8, owned by the partner). Nothing is rented from a platform that can reprice or wall off access.

## 3.3 Targeting Architecture — Distress-Signal Paid Acquisition

| Ad Platform | Targeting Approach | Estimated CPL | Notes |
|---|---|---:|---|
| Meta (FB/IG) | Interest + behavioral targeting: "foreclosure," "probate," "divorce," "tax lien," combined with homeowner + age 45+ + length-of-residence signals; lookalike audiences seeded from DIG-scored closed deals | $8-18 | Special Ad Category restrictions apply (housing) — must use Special Ad Audiences, not standard lookalikes |
| Google Search PPC | High-intent terms: "sell my house fast [city]," "stop foreclosure [county]," "we buy houses [city]" — same Cluster A keywords as Inbound Intake Engine, but paid | $15-35 | Highest-intent, highest-cost; reserve for top 20 counties by DIG density |
| Google LSA (Local Services Ads) | "Sell my house fast" category, pay-per-lead/call | $25-50 | Google-screened badge builds trust; route inbound calls directly to Senior ISA |
| Direct mail retargeting (Engine 8 overlap) | Visitors who didn't convert on a landing page get added to the AI-triggered direct mail queue | N/A (mail cost ~$0.65-1.20/piece) | Closes the loop between digital and physical — a channel Ylopo doesn't have at all |

**Budget allocation (Year 1 pilot):** $8,000-15,000/month, phased in after Inbound Intake Engine foundation pages are live (Month 3-4 of the Inbound roadmap), so paid traffic lands on pages that already have schema, AEO/GEO structure, and conversion-optimized AI Concierge intake — not a bare landing page.

## 3.4 Why This Beats Cold-Calling Economics at the Margin

Cold calling costs ~$0.07/min (Retell AI) plus data acquisition (PropertyRadar/PropStream), and conversion depends on contact rates that decay over a list. Paid acquisition **inverts the funnel** — the homeowner initiates contact at a moment of active distress, which historically converts to SOR at 3-5x the rate of an outbound cold call (homeowner-initiated inquiries are pre-qualified by intent). At even a blended $20 CPL and a 15% AI-qualification rate to DIG 60+, the effective cost per qualified SOR ($133) is competitive with the fully-loaded cost of a 25-caller pod producing the same SOR volume — and it scales without hiring.

---

# PART 4 — OWNED ASSET ARCHITECTURE

This section is the direct counter to Ylopo's Gap 1.4 ("you rent everything; you build no asset").

## 4.1 What Gets Owned, By Whom

| Asset | Internal Use (Engine 9) | Product 8 (OmniReach Partner) |
|---|---|---|
| Domain | Omnikom-owned (subdomain or path under primary domain, per Inbound Intake Engine architecture) | **Partner-owned domain** — Omnikom builds and hands over full control; no Omnikom branding required on the live site |
| Landing pages / site | Built on Omnikom's CMS, integrated with the /sell/ hub from the Inbound Intake Engine | Built on partner's domain using the same template library; partner can self-edit (no $75/hr edit tax like Ylopo) |
| SEO equity | Accrues to Omnikom's domain authority | Accrues to **the partner's domain** — this is the single biggest asset-equity differentiator vs. Ylopo |
| Ad account | Omnikom's Meta/Google ad accounts | **Partner's own ad account** — Omnikom configures and manages campaigns inside it (Co-Pilot model), but the account, the spend history, and the pixel data belong to the partner permanently |
| AI Concierge memory / contact data | Omnikom CRM (REsimpli/FUB) | Partner's CRM — synced via the CRM-agnostic layer (Section 7); exportable, partner owns the data |
| Ad creative & copy | Omnikom-controlled | **Partner-controlled** — template library provided, but partner can write/approve their own copy (within Fair Housing guardrails, with compliance review) |

## 4.2 The "Asset, Not a Rental" Pitch (For Product 8)

> *"When you stop paying Ylopo, you keep your contacts and nothing else — not the site, not the domain, not the SEO you spent two years building, not the ad account history. With OmniReach, if you ever cancel, you keep everything: the domain, the site, the rankings, the ad account, the pixel data, and the contact memory. We built it on your infrastructure, not ours."*

This single paragraph operationalizes Attack Vector #3 from the gap analysis ("True ownership — the agent owns the site, domain, SEO, and ad account").

---

# PART 5 — THE LEAD QUALITY GUARANTEE

This section is the direct counter to Ylopo's Gap 1.3 (the single highest-leverage attack vector identified in the teardown: "Lead INTENT over lead VOLUME").

## 5.1 The Mechanism

Every lead generated through Engine 9 / OmniReach is scored in real time by the Distress Intent Score V2 (Doctrine Section 14) the moment the AI Concierge completes its qualification conversation. The score is visible to the partner in their CRM as a field (`DIG_Score`), not a black box.

**The guarantee, stated plainly:**

> *Leads scoring below 40 on the Distress Intent Score do not count toward your monthly minimum and are not billed at the per-lead rate (flat-fee tiers) — or are refunded/credited (pay-per-lead tiers).*

This is structurally different from Ylopo, where "Only Talk to Leads Who Are Ready" is a marketing claim with **no contractual backing** — the gap analysis calls this the "boldest overclaim" and the cleanest kill-shot available.

## 5.2 How Omnikom Can Afford to Offer This (And Ylopo Can't)

Ylopo can't offer a quality guarantee because their model is volume-optimized — the platform fee + 10% ad markup creates a structural incentive to maximize *spend*, not *quality*. Omnikom's model is the opposite: the AI Concierge **already** has to score every lead for DIG routing (it's not new infrastructure — it's the same scoring engine that powers cold-call list prioritization, inbound intake, and the Nurture Network). Quality scoring is a byproduct of the architecture, not an added cost. **Omnikom can guarantee what it already measures.**

## 5.3 Guarantee Tiers

| Tier | Guarantee | Mechanism |
|---|---|---|
| Starter (self-serve / solo) | DIG ≥ 40 to count toward billing | Automatic CRM tagging; monthly reconciliation |
| Certified Partner | DIG ≥ 60 to count toward the monthly lead minimum; sub-40 leads auto-credited | Same as above + monthly scorecard review with success manager |
| Elite Partner | DIG ≥ 60 guarantee + **SOR conversion benchmark** (if SOR-booking rate from delivered leads falls below the partner's 90-day rolling average for 2 consecutive months, next month's platform fee is waived) | Requires partner CRM write-back so Omnikom can see SOR outcomes — only available where the CRM-agnostic layer (Section 7) has bidirectional sync |

---

# PART 6 — PRICING & CONTRACT MODEL

This section is the direct counter to Ylopo's Gap 3.1 and 3.2 — the "no contract" contradiction and the hidden 10% ad markup, which the gap analysis identifies as "the most exploitable trust gap" and ranks #2 in the top-5 vulnerabilities.

## 6.1 The Contradictions Ledger, Inverted

| Ylopo (per their own contract) | OmniReach |
|---|---|
| "No long-term contracts" marketing vs. auto-renewing fixed term, 90-day cancellation notice, non-refundable fees | **Month-to-month. Cancel with 30 days' notice. No auto-renewal clause. Setup fee (if any) is refundable pro-rata if cancelled within 60 days.** |
| 10% markup on ad spend ("$300 buys $270 of media") | **0% markup. Ad spend is billed directly to the partner's own ad account by Meta/Google — Omnikom never touches the media dollars.** |
| Demo-gated, no public pricing | **Published pricing on the OmniReach page, with a self-serve calculator** |
| Non-exclusive territory | **Territory exclusivity included in every Certified+ tier** (Section 8) |

## 6.2 Published Pricing Structure (Draft — Pending Legal/Finance Review)

| Tier | Monthly Platform Fee | Ad Spend | Setup | Who It's For |
|---|---:|---|---:|---|
| **Starter** (self-serve) | $297/mo | Client's own budget, min. $500/mo recommended | $0 | Solo wholesalers/investors Ylopo's own FAQ admits it can't serve ("more leads than you can handle is waste") |
| **Certified Partner** | $697/mo | Client's own budget, min. $1,500/mo recommended | $500 (refundable within 60 days) | Active Certified Exit Partners wanting their own paid-acquisition engine, county-exclusive |
| **Elite Partner** | $1,497/mo | Client's own budget, min. $3,000/mo recommended | $0 (waived) | Elite-tier partners (Doctrine Section 19); includes Unified AI Brain across text/voice/email/chat, SOR conversion guarantee |
| **Add-on: Direct Mail Loop** | +$150/mo + postage at cost | — | — | Connects non-converting site visitors to Engine 8 AI-triggered direct mail |

**All-in comparison vs. Ylopo:** A solo OmniReach Starter user at $297/mo + $500 ad spend = **$797/mo all-in** ($9.6K/year), vs. Ylopo's documented solo range of $900-$1,900/mo ($12K-$25K/year) — and the Ylopo figure doesn't include the 10% markup tax or the $1,000-1,500 non-refundable setup. **OmniReach is structurally cheaper at every tier because there is no markup on media and no rent-seeking on the platform fee.**

## 6.3 Why Flat Pricing Doesn't Break Omnikom's Margins

Omnikom's actual cost to deliver OmniReach is: (a) the AI Concierge / Unified AI Brain compute (shared infrastructure, marginal cost per partner is low — same GPT-4o + Retell AI stack already running for Engines 1, 5, and 9), (b) landing page hosting/CMS (marginal), (c) a success manager's time (the only real per-partner cost that scales with headcount). At $697-$1,497/mo with near-zero COGS beyond compute and support, **OmniReach gross margins exceed 75%** even before accounting for the data flywheel benefit (every OmniReach partner's leads enrich the Distress Intent Graph — Section 10).

---

# PART 7 — THE UNIFIED AI BRAIN (CRM-AGNOSTIC AI LAYER)

This section is the direct counter to Ylopo's Gaps 1.1, 1.2, 2.1, and 2.2 — no proprietary tech, FUB-only AI Voice, "signals not memory," and "canned after a while."

## 7.1 Architecture

```
                    ┌─────────────────────────────────┐
                    │   UNIFIED CONTACT MEMORY OBJECT  │
                    │   (one record per homeowner,     │
                    │    stored in n8n + Airtable/      │
                    │    Postgres — CRM-agnostic)       │
                    │                                   │
                    │  - Full conversation history      │
                    │    (every SMS, call transcript,   │
                    │    email, web chat — chronological)│
                    │  - DIG Score + signal history     │
                    │  - Stated motivation, timeline,   │
                    │    condition, objections raised   │
                    │  - Channel preference (learned)   │
                    └───────────────┬───────────────────┘
                                     │
        ┌────────────────┬──────────┼──────────┬────────────────┐
        ▼                ▼          ▼          ▼                ▼
   AI TEXT (SMS)    AI VOICE      WEB CHAT    EMAIL          CRM SYNC
   GPT-4o via       Retell AI +   GPT-4o on   GPT-4o via     REsimpli /
   Twilio           ElevenLabs    landing     n8n            FUB / GHL /
                                   pages                      headless
        │                │          │          │                │
        └────────────────┴──────────┴──────────┴────────────────┘
                       Every channel reads AND writes to the
                       SAME memory object — no "human bridges
                       context" step required
```

## 7.2 What "Unified" Actually Means (Vs. Ylopo's "AI²")

Ylopo's AI² shares *signals* between text and voice — disposition tags, qualification status — but not conversational memory. The gap analysis quotes the coaching workaround directly: the human is told to say *"I saw you were texting with my assistant"* to bridge the gap, because the AI itself doesn't carry the conversation across channels.

In the Unified AI Brain, the **system prompt for every channel includes the full prior conversation history from the memory object**, regardless of which channel it occurred on. If a homeowner texted "my husband and I are getting divorced and need to sell fast" on Monday, and the AI Voice agent calls on Wednesday, the voice agent's prompt context already contains that fact — it doesn't need a human to bridge it, and it doesn't ask the homeowner to repeat themselves. This is the single most defensible technical claim in the entire build, and it is **achievable with the existing stack** (GPT-4o context window + a shared memory store) — no new AI primitive required.

## 7.3 CRM-Agnostic Sync Layer

| Partner's CRM | Sync Method | What Syncs |
|---|---|---|
| REsimpli | Native API (n8n connector) | Contact record, DIG score, disposition, call recordings |
| Follow Up Boss | Native API (n8n connector) | Contact record, DIG score, Action Plan triggers, smart lists |
| GoHighLevel | Native API (n8n connector) | Contact record, DIG score, pipeline stage |
| None ("headless") | n8n + Airtable/Postgres dashboard provided by Omnikom | Full memory object accessible via Omnikom-hosted dashboard — for solos who don't want to pay for a separate CRM at all |

This directly opens the "no CRM / true solo" segment Ylopo's own staff admit they can't serve, and removes the "two-vendor tax" the gap analysis calls out as a structural Ylopo weakness (Gap 1.2).

---

# PART 8 — GO-TO-MARKET FOR PRODUCT 8 (OMNIREACH)

This section is the direct counter to Ylopo's Gaps 3.3, 4.1, and 4.2 (non-exclusive territory, oversold to poor-fit buyers, doesn't scale to solos/luxury/non-US).

## 8.1 ICP and Honest Qualification

OmniReach is sold **only** to:
1. Existing Omnikom Certified/Preferred/Elite/Strategic Partners (Doctrine Section 19) — first-party distribution, zero new CAC
2. Independent investors/wholesalers sourced via the Inbound Intake Engine's buyer funnel (Cluster D/E content already targets this audience)
3. Small agent teams (3-15 agents) in mid-price markets — Ylopo's own sweet spot, now contestable on price and ownership

**Explicit non-targets (the honest qualification Ylopo's own sales team is documented as failing to do):** true solo agents with <10 hrs/week for follow-up (directed to Starter self-serve only, with an upfront warning), luxury markets (DIG scoring and distress-signal targeting don't apply — directed to the Inbound Intake Engine's general SEO product instead, if one is built later), and any market where Omnikom cannot offer territory exclusivity due to existing partner conflicts (told directly, not oversold).

## 8.2 Territory Exclusivity Model

Each county (or zip-cluster in dense metros) can have **one** OmniReach Certified+ subscriber per distress vertical (foreclosure, probate, divorce, tax-delinquent, etc.). Exclusivity is enforced at the ad-targeting and landing-page level — Omnikom will not build a competing OmniReach landing page targeting the same county + distress-type combination for a second subscriber.

> *"Ylopo will sell to four other agents in your zip code and run the same AI texts to the same homeowners. We sign one partner per county per distress type. If you're in, your competitors aren't."*

This directly operationalizes Attack Vector #6 ("Market exclusivity — we won't arm your competitor down the street") — a weakness the gap analysis explicitly says Ylopo **cannot fix without capping its own revenue**, because their model depends on selling the same geography repeatedly.

## 8.3 Self-Serve Trial (Closing the "Demo-Gated" Gap)

Unlike Ylopo's demo-gated, 2-4 week onboarding sales motion, OmniReach Starter is **self-serve**: a partner can sign up, connect their ad account, and have a landing page live within 48 hours via the same template library used for the Inbound Intake Engine's programmatic local pages. Certified+ tiers (which include territory exclusivity and require county-availability verification) remain sales-assisted, but the entry tier removes the friction Ylopo's gap analysis identifies as a GTM leak.

## 8.4 Internal Proof Before External Sale (Closing the "Manufactured Footprint" Gap)

Per Design Principle #10, OmniReach is **not sold to a single external partner until Engine 9 has run for Omnikom's own acquisition for at least one full quarter**, producing real cost-per-SOR and conversion data from Omnikom's own operations. The first case study is Omnikom itself — not a curated, survivorship-biased testimonial, but the actual internal dashboard. This is the opposite of Ylopo's astroturfed review pattern and is a genuine trust asset.

---

# PART 9 — COMPLIANCE ADDENDUM (TCPA AND THE LIABILITY QUESTION)

This section is the direct counter to Ylopo's Gap 1.6 — TCPA liability silently transferred to the agent/broker, and the named litigation risk (Lowrey v. OpenAI/Twilio; the Feb 2026 Mortgage One AI-cold-call class action cited in the teardown).

## 9.1 The Structural Difference

Ylopo's AI Voice operates under a consent-by-IDX-registration model, where the homeowner's act of submitting a form on the branded site is treated as consent for subsequent AI calls — but the **agent/broker is the named "caller" of record**, and bears the liability if that consent chain is challenged.

For Engine 9 / OmniReach, every AI Concierge interaction — text, voice, or chat — that leads to an outbound AI call **requires an explicit, logged, timestamped consent capture step**, separate from form submission, following the same protocol already built for Engine 1 (Doctrine Section 18, Playbook Section 7):

- TCPA consent checkbox (not pre-checked) at point of landing-page submission, with explicit "by checking this box you agree to receive calls and texts, including from automated systems, regarding your property"
- A2P 10DLC registration for every OmniReach partner's sending numbers (Omnikom manages this centrally — partners don't need their own registration, closing a real operational gap for solos)
- Federal DNC + state DNC + internal Nurture Network "do not contact" scrub run **before** any AI outbound call, logged with a timestamp
- AI self-disclosure on every call ("Hi, this is [Name], an AI assistant for [Partner Brand]...") — matching the FCC's Feb 2024 "artificial voice" disclosure expectation that Ylopo itself adopted
- 8am-9pm local-time calling windows enforced at the n8n scheduling layer, not left to caller discretion

## 9.2 Liability Allocation — Documented, Not Hidden

Where Ylopo's gap analysis flags that the *exact* TCPA indemnity split in their Platform Agreement is an open question (likely because it favors Ylopo and is buried), the OmniReach partner agreement will state liability allocation **explicitly and in plain language** in the contract itself — to be drafted by counsel before any external launch, but with the principle locked now: **Omnikom is responsible for the technical compliance scaffold (consent logging, DNC scrubbing, registration, disclosure); the partner is responsible for the accuracy of the consent obtained on their own landing pages.** This is a shared-responsibility model stated up front, not a silent transfer.

**This entire section requires sign-off from Omnikom's compliance counsel before Product 8 is sold to any external partner.** It is documented here as a build requirement, not a finished legal position.

## 9.3 Why "Compliance-First" Is a Sellable Feature, Not Just a Risk Mitigant

The gap analysis explicitly identifies "risk-averse brokerages" as an underserved segment and "compliance-first, vendor-stands-behind-it" as attack vector #10. A one-page "TCPA Compliance Summary" — covering consent capture, A2P 10DLC, DNC scrubbing, and disclosure — becomes part of the OmniReach sales packet, turning a defensive requirement into a trust differentiator against an incumbent whose own teardown flags this as exposure.

---

# PART 10 — DATA FLYWHEEL: HOW PRODUCT 8 FEEDS THE $5B MOAT

Every OmniReach partner, regardless of tier, runs on the same Unified AI Brain and Distress Intent Score engine as Omnikom's internal operations. Structurally, this means:

1. **Every qualified lead generated through a partner's OmniReach instance is scored by the same DIG model** — partner instances don't have a separate, disconnected scoring system. This means the Distress Intent Graph (Product 2, Doctrine Section 12) grows with every OmniReach subscriber's traffic, not just Omnikom's own.
2. **Partners who don't convert a lead can route it to the Nurture Network (Product 7)** with the homeowner's consent — turning OmniReach into a top-of-funnel feeder for Omnikom's data products, similar to how Engine 5 (Inbound) and Engine 9 already feed the Graph.
3. **OmniReach itself becomes a distribution mechanism for the Liquidity Map (Product 5)** — partners running OmniReach are natural early subscribers to county-level distress density data, since they're already paying for paid acquisition in those counties.

This is the structural reason Product 8 is not "just another revenue line" — it is a **second acquisition channel for the Distress Intent Graph**, riding on infrastructure partners pay Omnikom to operate.

---

# PART 11 — REVENUE MODEL IMPACT (SIXTH STREAM)

Per the Master Doctrine's 5-stream revenue model (Section 20), OmniReach introduces a sixth:

| Revenue Stream | Description | Year 1 (pilot, internal-only) | Year 2 | Year 3 | Year 5 |
|---|---|---:|---:|---:|---:|
| **Stream 6: OmniReach Subscriptions** | Platform fees from Starter/Certified/Elite partners ($297-$1,497/mo) | $0 (internal Engine 9 pilot only) | $250K (first ~25-35 partners, blended) | $2.4M (first ~150-200 partners) | $14M+ (800+ partners) |

This is deliberately conservative and back-loaded — **Year 1 is internal proof only** (Part 8.4), Year 2 is the soft launch to the existing Certified Partner base (zero CAC, Part 8.1 #1), and Years 3-5 ride the same partner-network growth curve already modeled in the Doctrine (1,000+ certified partners by Year 4).

**Effect on blended ARR multiple:** Stream 6 is the highest-margin stream in the model (>75% gross margin, near-zero marginal COGS per Section 6.3) and is the most directly comparable to a "real" SaaS line item for valuation purposes — strengthening the case for the 8.8-15x ARR multiple range already used in the Doctrine's valuation framework (Section 23), since it demonstrates the platform generating recurring revenue from **other operators**, not just from Omnikom's own transaction volume.

---

# PART 12 — BUILD ROADMAP

| Phase | Timeline | What Gets Built |
|---|---|---|
| **Phase 1 — Engine 9 Internal Pilot** | Months 1-3 (concurrent with Inbound Intake Engine Foundation phase) | Connect Meta/Google ad accounts to Omnikom's owned landing pages (built on Inbound Intake Engine site architecture); wire AI Concierge to read/write the Unified Memory Object; launch in 3-5 top DIG-density counties; budget $8K-15K/month |
| **Phase 2 — Unified AI Brain Hardening** | Months 3-5 | Build the CRM-agnostic sync layer (REsimpli, FUB, GHL, headless); validate cross-channel memory with real call/text transcripts; build the DIG-based lead quality dashboard (the guarantee mechanism, Part 5) |
| **Phase 3 — Internal Proof + Case Study** | Months 5-6 | One full quarter of Engine 9 data: cost-per-lead, DIG-qualification rate, cost-per-SOR, SOR-to-close rate. This becomes the first OmniReach case study (Part 8.4) |
| **Phase 4 — OmniReach Soft Launch (Partner Network)** | Months 6-9 | Offer Certified+ tier to existing partner base at a beta price (e.g., $497/mo Certified tier for first 20-30 partners); build self-serve onboarding flow for Starter tier |
| **Phase 5 — OmniReach Public Launch** | Months 9-12 | Published pricing page; self-serve Starter tier live; sales-assisted Certified/Elite tiers; territory exclusivity enforcement live in the partner CRM |
| **Phase 6 — Scale** | Year 2+ | Direct Mail Loop add-on (Engine 8 integration); expand to non-Omnikom-network independent investors via Inbound Intake Engine buyer-funnel content |

**Total incremental monthly cost to launch Phase 1-2:** $8,000-15,000 (ad spend, internal use only — no new platform fees since AI/CRM/orchestration infrastructure already exists from Engines 1, 5, and 8).

---

# PART 13 — RISK REGISTER ADDITIONS

| New Risk | Severity | Mitigation |
|---|---|---|
| **Special Ad Category restrictions (Meta housing ads)** limit targeting precision for distress-signal audiences | Medium | Use Special Ad Audiences (not standard lookalikes); lean on Google PPC/LSA where housing restrictions are less severe; lean on owned SEO/AEO/GEO (Inbound Intake Engine) as the lower-risk channel |
| **Quality guarantee creates margin exposure** if DIG scoring miscalibrates and too many leads fall below threshold | Low-Medium | Guarantee thresholds (DIG ≥ 40/60) are tunable; pilot in Phase 1-3 (internal only) before any external financial guarantee is offered |
| **TCPA/A2P registration delays** (3-4 week approval, per Doctrine risk register) now apply per-OmniReach-partner, not just Omnikom | Medium | Centralize A2P 10DLC registration management for all OmniReach partners under Omnikom's compliance umbrella (Part 9.1) rather than requiring each partner to self-register |
| **Territory exclusivity creates a sales bottleneck** — finite counties, first-come-first-served could create channel conflict with existing partners | Medium | County-availability map maintained centrally; existing Certified/Elite partners get first right of refusal on OmniReach exclusivity in their existing territory before external sale |
| **Compliance liability allocation (Part 9.2) is unresolved pending counsel review** | High (blocking for external launch) | Phase 4-5 (external launch) is gated on compliance counsel sign-off; Phases 1-3 (internal only) can proceed without it since Omnikom is both operator and "client" |

---

# PART 14 — HOW THIS COMPLETES THE PICTURE

The document set now covers:

- **Strategy** (Master Doctrine) — what Omnikom is, the 13 exit paths, the 7 products, the 5+1 revenue streams, the path to $5B
- **Operations** (Operations Playbook) — how the team executes day to day
- **Inbound** (Inbound Intake Engine) — SEO/AEO/GEO compounding organic acquisition for sellers and buyers
- **Outbound** (this document) — paid acquisition as the bridge channel, AND a sixth revenue stream that turns a top competitor's structural weaknesses into a sellable Omnikom product

**The compounding logic, extended:**

> The cash engine (cold calling) funds the data engine (DIG). The data engine powers the AI scoring engine. Inbound (organic) and Outbound (paid) both feed the same AI Concierge and the same Distress Intent Graph — two acquisition channels, one brain. The brain becomes a product (OmniReach) sold to the partner network. The partner network's traffic feeds the Graph further. The Graph becomes the moat. The moat becomes the category.

Engine 9 and Product 8 are not a detour from the $5B thesis — they are the **fastest-to-revenue new line in the entire model**, because the infrastructure (AI Concierge, DIG scoring, n8n orchestration, partner network) already exists. The only new spend is ad budget, and the only new build is the owned-asset landing page layer and the CRM-agnostic sync — both of which are extensions of work already scoped in the Inbound Intake Engine.

---

*End of Outbound Acquisition & AI Nurture Engine. Companion documents: OMNIKOM_MASTER_DOCTRINE.md, OMNIKOM_OPERATIONS_PLAYBOOK.md, OMNIKOM_INBOUND_INTAKE_ENGINE.md.*
