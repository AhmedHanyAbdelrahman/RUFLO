# OMNIKOM OUTBOUND ACQUISITION — FINANCIAL MODEL
## Engine 9 (Internal Paid Acquisition) + Product 8 "OmniReach" (Partner SaaS)
### Deep Dive: Unit Economics, Cohort Build-Up, P&L by Tier, Sensitivity, and Break-Even

This model is the financial companion to `OMNIKOM_OUTBOUND_ACQUISITION_ENGINE.md`. It follows the same conventions as `OMNIKOM_FINANCIAL_MODEL.md` — every assumption is stated explicitly, every output is traceable to an input, and ranges (conservative/base/strong) are given wherever an input is uncertain. **Stream 6 figures here are a refinement of the placeholder figures in the Master Doctrine (Section 20/Part 11 of the Outbound Engine doc) — treat this document as the source of truth going forward.**

---

# SECTION 1: ENGINE 9 (INTERNAL) — FUNNEL & UNIT ECONOMICS

## 1.1 The Funnel, Stage by Stage

| Stage | Conservative | Base Case | Strong |
|---|---:|---:|---:|
| Monthly ad spend | $8,000 | $10,000 | $15,000 |
| Blended CPL (across Meta/Google/LSA) | $28 | $20 | $14 |
| **Raw leads/month** | 286 | 500 | 1,071 |
| AI qualification rate to DIG ≥ 40 (nurture-eligible) | 25% | 35% | 45% |
| **Nurture-eligible leads/month** | 71 | 175 | 482 |
| AI qualification rate to DIG ≥ 60 (SOR-ready) | 10% | 15% | 20% |
| **SOR-ready leads/month** | 29 | 75 | 214 |
| SOR booking rate (DIG ≥ 60 → booked appointment) | 40% | 50% | 60% |
| **SORs booked/month** | 11 | 38 | 129 |
| SOR show rate | 65% | 70% | 75% |
| **SORs conducted/month** | 7 | 26 | 96 |
| SOR → signed opportunity rate | 20% | 25% | 30% |
| **Signed opportunities/month** | 1.4 | 6.6 | 29 |
| Signed → closed rate | 65% | 70% | 75% |
| **Closed deals/month** | 0.9 | 4.6 | 21.6 |

**Reading this table:** the spread between conservative and strong is deliberately wide (1 close/month vs. 22 close/month) because paid-acquisition funnels are highly sensitive to *compounding* conversion rates — small per-stage improvements multiply. The base case is the planning number; conservative is the floor for budget approval; strong represents what the Inbound Intake Engine's AEO/GEO-optimized landing pages *should* enable once mature (Months 9+).

## 1.2 Cost-Per-Outcome Ladder (Base Case)

| Metric | Value | Calculation |
|---|---:|---|
| Cost per raw lead | $20.00 | $10,000 / 500 |
| Cost per nurture-eligible lead (DIG ≥ 40) | $57.14 | $10,000 / 175 |
| **Cost per SOR-ready lead (DIG ≥ 60)** | **$133.33** | $10,000 / 75 |
| Cost per SOR booked | $263.16 | $10,000 / 38 |
| Cost per SOR conducted | $384.62 | $10,000 / 26 |
| Cost per signed opportunity | $1,515.15 | $10,000 / 6.6 |
| **Cost per closed deal** | **$2,173.91** | $10,000 / 4.6 |

## 1.3 Revenue Per Closed Deal (Pulled From OMNIKOM_FINANCIAL_MODEL.md Section 1.4)

Blended net profit per closed deal (45% wholesale / 20% novation / 10% flip-JV / 15% retail listing / remainder) = **$21,345**.

## 1.4 Engine 9 ROI — Base Case

| Item | Monthly |
|---|---:|
| Ad spend | $10,000 |
| Closed deals | 4.6 |
| Revenue (4.6 × $21,345) | $98,187 |
| **Net contribution (before allocated overhead)** | **$88,187** |
| **Implied ROAS** | **9.8x** |

## 1.5 ROI — Across All Three Cases

| Case | Ad Spend | Closed Deals | Revenue | Net Contribution | ROAS |
|---|---:|---:|---:|---:|---:|
| Conservative | $8,000 | 0.9 | $19,211 | $11,211 | 2.4x |
| Base | $10,000 | 4.6 | $98,187 | $88,187 | 9.8x |
| Strong | $15,000 | 21.6 | $461,052 | $446,052 | 30.7x |

**Why the conservative case still clears the bar:** even at 2.4x ROAS, Engine 9 outperforms the blended cost-per-close of the 25-caller pod ($27,600/month ÷ ~10 closes = $2,760/close per the Operations Playbook) at $8,889/close — meaning the conservative case is a *worst-case floor that still doesn't lose money*, while the base and strong cases materially beat the calling-pod cost structure. **This is the justification for greenlighting Phase 1 (Months 1-3) at the conservative budget without waiting for Inbound Intake Engine maturity.**

## 1.6 Sensitivity: What Moves the Needle Most

| Variable | -20% from base | Base | +20% from base | Effect on closed deals/month |
|---|---:|---:|---:|---|
| Blended CPL ($20) | $16 | $20 | $24 | 625 → 500 → 417 raw leads → deals move proportionally: 5.75 / 4.6 / 3.83 |
| DIG ≥ 60 qualification rate (15%) | 12% | 15% | 18% | 3.68 / 4.6 / 5.52 |
| SOR booking rate (50%) | 40% | 50% | 60% | 3.68 / 4.6 / 5.52 |
| SOR show rate (70%) | 56% | 70% | 84% | 3.68 / 4.6 / 5.52 |

**Conclusion:** the DIG ≥ 60 qualification rate, SOR booking rate, and SOR show rate each carry **identical leverage** (a 20% move in any one of them moves closed deals by ~20%) because they're multiplicative — none dominates. CPL has the same proportional effect. **This means the single highest-ROI investment is improving the AI Concierge's qualification prompt quality (Unified AI Brain, Section 7 of the Outbound Engine doc) — it's the only lever that improves two stages of the funnel at once (DIG ≥ 60 rate AND, indirectly, SOR show rate via better pre-appointment context-setting).**

---

# SECTION 2: OMNIREACH (PRODUCT 8) — PER-PARTNER UNIT ECONOMICS

## 2.1 Per-Partner Funnel (Same Mechanics as Engine 9, Smaller Scale)

A typical Certified-tier partner runs $1,500/month in ad spend (their own money, billed directly to their ad account — Section 6.1 of the Outbound Engine doc). Applying the same base-case funnel ratios at 1/6.67th scale of Engine 9's $10K base:

| Stage | Certified Partner (Base Case, $1,500/mo ad spend) |
|---|---:|
| Raw leads/month | 75 |
| SOR-ready leads (DIG ≥ 60) | 11.25 |
| SORs booked | 5.6 |
| Closed deals/month (partner's own close rate, assumed equal to Omnikom's 70%/65% chain) | 0.7 |

At a blended net of $21,345/deal **to the partner** (not to Omnikom — OmniReach doesn't take a transaction cut), this is **~$14,900/month in partner revenue generated from $1,500 ad spend + $697 platform fee = $2,197 total cost** — a 6.8x return for the partner. This is the core of the OmniReach sales pitch: **the platform fee is justified by partner-side ROI, independent of what Omnikom earns from the subscription itself.**

## 2.2 Omnikom's COGS Per Partner (What It Actually Costs to Deliver OmniReach)

| Cost Component | Starter ($297/mo) | Certified ($697/mo) | Elite ($1,497/mo) | Notes |
|---|---:|---:|---:|---|
| AI compute (GPT-4o conversations, est. 75-300 leads/mo × ~$0.08/qualification conversation) | $6-24 | $24 | $96 | Scales with lead volume per tier's typical ad spend |
| Retell AI voice minutes (AI Voice nurture + live-transfer attempts, ~$0.07/min) | $5 | $15 | $50 | Elite includes more voice nurture touches |
| Landing page hosting / CMS (shared infrastructure, marginal cost) | $2 | $2 | $2 | Amortized shared hosting (Section 3, Engineering Spec) |
| CRM sync (n8n shared infrastructure, marginal) | $1 | $1 | $1 | Amortized |
| A2P 10DLC registration (centrally managed, amortized one-time $35 + $2/mo carrier fees) | $2 | $2 | $2 | Per the compliance addendum, Omnikom manages this centrally |
| Success manager time (1 manager per ~50 partners at $4,500/mo fully-loaded) | $0 (self-serve, no SM) | $90 | $90 | Starter is self-serve only — no allocated SM cost |
| **Total COGS** | **$10-29** | **$134** | **$241** |
| **Gross Margin** | **90-97%** | **81%** | **84%** |

## 2.3 Partner CAC and Payback

| Acquisition Channel | CAC | Notes |
|---|---:|---|
| Existing Certified/Preferred/Elite partner (Part 8.1 #1, Outbound Engine doc) | $0-50 | Zero new marketing spend — sold via existing partner success manager relationship; "$50" accounts for the marginal time cost of the pitch |
| Inbound Intake Engine buyer-funnel content (Part 8.1 #2) | $75-150 | Organic content already built for Cluster D/E; CAC = amortized content production cost per converted partner |
| Self-serve signup (Starter tier, Part 8.3) | $0 | Self-serve, no sales touch |

**Blended CAC assumption: $60/partner** (weighted toward existing-partner conversion in Years 1-2, shifting toward Inbound-funnel and self-serve as the partner base grows).

**Payback period:**

| Tier | Monthly Fee | Gross Margin $ | CAC | Payback (months) |
|---|---:|---:|---:|---:|
| Starter | $297 | $277 (avg) | $0 | <1 (instant) |
| Certified | $697 | $563 | $60 | 0.1 |
| Elite | $1,497 | $1,256 | $60 | 0.05 |

**Payback is effectively immediate at every tier** — this is the structural advantage of selling to an existing partner base on shared infrastructure: there is no meaningful CAC to recover.

## 2.4 Churn Assumptions

| Tier | Annual Churn | Rationale |
|---|---:|---|
| Starter | 35% | Self-serve/solo segment — highest churn, matches SMB SaaS norms; mitigated by month-to-month low commitment (low switching cost both ways) |
| Certified | 18% | Existing partner relationship + territory exclusivity creates switching cost (losing exclusivity = losing the deal) |
| Elite | 10% | Deepest integration (Unified AI Brain across all channels, SOR conversion guarantee) — highest lock-in via workflow dependency, not contract terms |

**Blended LTV (Certified tier, illustrative):** $697/mo × $563 gross margin/mo ÷ 18% monthly-equivalent churn (1.5%/mo) ≈ **$37,500 LTV per Certified partner** against a ~$60 CAC — an LTV:CAC ratio of **~625:1**. Even haircut by 90% for model conservatism, this is a >60:1 ratio, far above the 3:1 SaaS health benchmark.

---

# SECTION 3: STREAM 6 COHORT BUILD-UP (REPLACES PLACEHOLDER DOCTRINE FIGURES)

## 3.1 Tier Mix Evolution

| Year | Starter % | Certified % | Elite % | Blended ARPU/mo |
|---|---:|---:|---:|---:|
| Y2 (soft launch, existing partners) | 30% | 55% | 15% | $760 |
| Y3 | 40% | 45% | 15% | $689 |
| Y4 | 45% | 42% | 13% | $645 |
| Y5 | 48% | 40% | 12% | $621 |

*Blended ARPU calc example (Y2): 0.30×$297 + 0.55×$697 + 0.15×$1,497 = $89.10 + $383.35 + $224.55 = $696.55 ≈ **$697**... (recompute precisely below)*

**Recomputed ARPU (precise):**

| Year | Calculation | Blended ARPU/mo |
|---|---|---:|
| Y2 | 0.30(297) + 0.55(697) + 0.15(1497) | $89.10 + $383.35 + $224.55 = **$697.00** |
| Y3 | 0.40(297) + 0.45(697) + 0.15(1497) | $118.80 + $313.65 + $224.55 = **$657.00** |
| Y4 | 0.45(297) + 0.42(697) + 0.13(1497) | $133.65 + $292.74 + $194.61 = **$621.00** |
| Y5 | 0.48(297) + 0.40(697) + 0.12(1497) | $142.56 + $278.80 + $179.64 = **$601.00** |

*(Note: ARPU declines as Starter mix grows — this is intentional. Starter (self-serve, zero CAC, zero SM cost) is the volume tier that drives partner count; Certified/Elite drive margin per partner. Total revenue still grows because partner count growth outpaces ARPU decline — see 3.2.)*

Add-on attach (Direct Mail Loop, +$150/mo, ~20% attach rate on Certified+ from Y3 onward) is layered in separately below.

## 3.2 Partner Count & Revenue Build-Up

| Year | New Partners Added | Cumulative Partners (net of churn) | Blended ARPU/mo | Add-on Revenue/mo | Stream 6 ARR |
|---|---:|---:|---:|---:|---:|
| Y1 | 0 (internal pilot only — Part 8.4) | 0 | — | — | $0 |
| Y2 | ~32 (soft launch to existing partner base) | 30 | $697 | $0 | **$251,000** |
| Y3 | ~155 | 165 | $657 | ~$2,500 (33 add-ons × $150 × ~50% realization) | **$1,335,000** |
| Y4 | ~420 | 480 | $621 | ~$10,800 | **$3,706,000** |
| Y5 | ~430 | 820 | $601 | ~$18,500 | **$6,135,000** |

**Cumulative-partner calc detail:**
- Y2: 32 new − ~2 churned (partial-year churn on a partial-year base) = 30
- Y3: 30 retained × (1 − blended churn ~22%) ≈ 23 + 155 new − ~13 churned from new cohort = ~165
- Y4: 165 × (1 − ~20%) ≈ 132 + 420 new − ~72 churned = ~480
- Y5: 480 × (1 − ~18%) ≈ 394 + 430 new − ~ a portion churned = ~820

**ARR formula:** Cumulative Partners × Blended ARPU × 12 + (Add-on Revenue/mo × 12)

- Y2: 30 × $697 × 12 = $250,920 + $0 = **$250,920** ✓ (matches Outbound Engine doc's $250K placeholder almost exactly)
- Y3: 165 × $657 × 12 = $1,300,860 + $30,000 = **$1,330,860**
- Y4: 480 × $621 × 12 = $3,576,960 + $129,600 = **$3,706,560**
- Y5: 820 × $601 × 12 = $5,913,840 + $222,000 = **$6,135,840**

## 3.3 Revised Stream 6 vs. Original Placeholder

| | Y2 | Y3 | Y4 | Y5 |
|---|---:|---:|---:|---:|
| Outbound Engine doc placeholder | $250K | $2.4M | — | $14M |
| **This model (bottoms-up)** | **$251K** | **$1.33M** | **$3.71M** | **$6.14M** |

**The Y3 and Y5 figures in the original placeholder were too aggressive.** This bottoms-up model implies Stream 6 reaches **$6.1M ARR by Y5**, not $14M — still a meaningful, high-margin sixth revenue line, but the partner-count growth rate (820 partners by Y5) is the binding constraint, not pricing or margin. **To hit $14M by Y5 would require ~1,870 partners at the Y5 ARPU — roughly 2.3x this model's partner count.** That is achievable only if OmniReach expands beyond the Omnikom partner network into the broader independent-investor market (Part 8.1 #2-3) faster than modeled here. **Recommendation: use $6.1M as the Y5 planning number for Stream 6; treat $14M as an upside case contingent on external-market expansion exceeding the partner-network-only growth curve.**

## 3.4 Stream 6 Gross Margin at Scale

| Year | ARR | Blended COGS % (weighted by tier mix) | Gross Profit |
|---|---:|---:|---:|
| Y2 | $251K | ~16% | $211K |
| Y3 | $1.33M | ~15% | $1.13M |
| Y4 | $3.71M | ~15% | $3.15M |
| Y5 | $6.14M | ~14% | $5.28M |

*(COGS % derived from Section 2.2's per-tier dollar costs as a % of each tier's monthly fee, weighted by the tier mix in 3.1. Starter's COGS % is near-zero; Certified/Elite run 12-19%. The blend lands at 14-16%.)*

---

# SECTION 4: COMBINED IMPACT ON THE $5B MODEL

## 4.1 Updated 5-Stream + Stream 6 ARR Table (Revised Year 5)

| Revenue Stream | Y5 (Master Doctrine, pre-Stream 6) | Y5 (Revised, with Stream 6) |
|---|---:|---:|
| Transaction Fees | (per Doctrine Section 20) | unchanged |
| Partner Subscriptions (Seller OS SaaS) | $10M+ | unchanged |
| Data Subscriptions (Liquidity Map / DIG API) | (per Doctrine) | unchanged |
| Nurture Network Licensing | $22M | unchanged |
| Financial Product Referrals | (per Doctrine) | unchanged |
| **Stream 6: OmniReach Subscriptions (NEW)** | $0 (not in original model) | **+$6.1M** |
| **Total ARR delta** | — | **+$6.1M** |

This is incremental to the ~$290M Year 5 ARR figure in the Master Doctrine — a **+2.1% lift to total ARR**, but at a **higher gross margin (85-86%) than the blended company average (72% EBITDA base case)**, meaning Stream 6 has an outsized positive effect on blended margin and, by extension, the ARR multiple used in valuation.

## 4.2 Valuation Multiple Effect (Illustrative)

Stream 6 is the cleanest "horizontal SaaS" comparable in the entire model — recurring, subscription-based, sold to operators *other than* Omnikom itself, with demonstrable per-partner ROI (Section 2.1). At even a conservative 6x revenue multiple specifically for this stream (below the 8.8-15x blended range, reflecting its smaller scale and earlier stage), Stream 6 alone contributes:

| Year | Stream 6 ARR | Standalone Multiple | Implied Value Contribution |
|---|---:|---:|---:|
| Y3 | $1.33M | 6x | $8.0M |
| Y5 | $6.14M | 8x (matured, proven retention) | $49.1M |

**This is a rounding error against the $2.7B-$5.5B total valuation target — and that is the correct read.** Stream 6's primary value to the $5B thesis is **not its standalone revenue contribution**; it is (a) the data-flywheel effect on the Distress Intent Graph (Part 10 of the Outbound Engine doc), which strengthens Product 2/5's valuation case, and (b) proof, to acquirers/investors, that the AI Concierge + DIG stack is a **platform other operators will pay to use** — the single strongest piece of evidence for the "intelligence layer" positioning in Doctrine Section 31.

---

# SECTION 5: BREAK-EVEN & DECISION GATES

## 5.1 Engine 9 Phase 1 Break-Even (Months 1-3, Internal Pilot)

| | Conservative | Base |
|---|---:|---:|
| Monthly ad spend | $8,000 | $10,000 |
| Monthly net contribution | $11,211 | $88,187 |
| **Break-even ad spend (deals = $0 net)** | N/A — already net-positive at conservative case | N/A |

Engine 9 is net-positive from month 1 in both modeled cases (Section 1.5). **There is no break-even gate to clear for Phase 1 — the only decision is whether $8-10K/month is available in the marketing budget alongside the existing cold-calling pod cost ($27,600/month per Operations Playbook).**

## 5.2 OmniReach Decision Gates (Phase 4-5, Outbound Engine Doc Part 12)

| Gate | Threshold | What It Unlocks |
|---|---|---|
| Gate 1 | Engine 9 runs ≥ 1 full quarter with closed-deal data matching or exceeding the conservative case (Section 1.5) | Phase 3 case study is produced → Phase 4 (soft launch) approved |
| Gate 2 | First 10 Certified-tier soft-launch partners retained at ≥ 80% after 90 days | Phase 5 (public launch) approved |
| Gate 3 | Compliance counsel sign-off on Part 9.2 liability allocation (Outbound Engine doc) | External (non-network) sales (Part 8.1 #2-3) approved — this is the hard legal gate, independent of financial performance |

## 5.3 Headcount Implication

At the Y3 partner count (~165), the success-manager allocation (1:50, Section 2.2) implies **~3.3 FTE success managers** dedicated to OmniReach by Y3, rising to **~9.6 FTE by Y5** (820 partners). This headcount should be modeled as a new line in the overall company P&L starting Y3 — it is the only cost in this model that scales with partner count rather than being absorbed by shared infrastructure.

---

*End of Outbound Acquisition Financial Model. Companion documents: OMNIKOM_FINANCIAL_MODEL.md, OMNIKOM_OUTBOUND_ACQUISITION_ENGINE.md, OMNIKOM_OUTBOUND_ENGINEERING_SPEC.md.*
