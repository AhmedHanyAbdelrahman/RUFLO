# Omnikom Website — Build Guide

**Purpose of this document:** a single developer-facing explanation of everything required to build the Omnikom marketing website, synthesized from the developer handoff package (`01_omnikom_product_vision_business_architecture.md`, `02_omnikom_website_ux_copy_customer_journey.md`, `03_omnikom_design_system_engineering_specification.md`). Those three documents remain the source of truth for exact copy and detail — this guide is the map that tells you what's in them, how the pieces fit together, and in what order to build.

---

## 1. What Omnikom Is (the 60-second version)

Omnikom sells **Revenue Infrastructure** — not callers, not leads, not software. The product is a **Revenue Acquisition Lane**: a managed operating system built around one commercial objective (e.g. "acquire off-market property sellers," "book roofing inspections," "reactivate dormant patients"). Omnikom owns the machinery — strategy, data, outreach, qualification, CRM routing, AI/automation, QA, reporting, workforce. The client owns sales conversion, regulated activity, contracts, and fulfillment.

One platform, nine operating layers, deployed differently per industry:

1. Market & Revenue Strategy
2. Data Infrastructure
3. Outreach Infrastructure
4. Qualification Infrastructure
5. CRM & Routing Infrastructure
6. AI & Automation Infrastructure
7. Quality & Governance Infrastructure
8. Revenue Intelligence & Optimization
9. Workforce Infrastructure

Clients scale through a maturity model: **Validation Lane → Growth Lane → Expansion Infrastructure → Enterprise Revenue Infrastructure.** No pricing is public — the primary conversion is always "Book a Revenue Infrastructure Consultation."

A special case: **Financial Services** is positioned as its own business unit — **"Omnikom Financial Services Infrastructure — Powered by Rainmaker Wealth Innovation"** — combining Omnikom's Egypt-based platform with Rainmaker's Philippines workforce network and financial-services relationships. This gets its own landing page (`/financial-services-infrastructure`) with strict Omnikom-first brand hierarchy.

### Hard guardrails (violating these breaks the whole positioning)

- Never call it a call center, VA agency, lead vendor, or staffing marketplace.
- Never publish fixed pricing.
- Never promise revenue, closed deals, policies, cases, or commissions.
- Every industry page must state what Omnikom operates vs. what the client owns.
- Regulated industries (financial services, insurance, legal, healthcare, real estate) need explicit compliance-boundary copy — no advice, no licensed activity, no guarantees.
- Financial Services page: Omnikom logo/name always first; Rainmaker is "powered by," never co-equal branding.

---

## 2. Information Architecture — Full Sitemap

**Primary nav:** Platform · Solutions · Revenue Lanes · Industries · How It Works · Why Omnikom · Resources · Company, with a persistent **"Book a Consultation"** button. No pricing anywhere in navigation.

### Core pages (~38 routes)
```
/                                  Home
/revenue-infrastructure            Category definition
/platform                          Platform overview (9-layer stack)
/data-infrastructure
/outreach-operations
/qualification-routing
/ai-automation
/revenue-intelligence
/workforce-infrastructure
/solutions                         Overview
/solutions/acquire
/solutions/reactivate
/solutions/qualify-route
/solutions/speed-to-lead
/solutions/nurture-recovery
/solutions/managed-departments
/solutions/multi-market-expansion
/solutions/white-label
/revenue-lanes                     Overview
/revenue-lanes/validation
/revenue-lanes/growth
/revenue-lanes/expansion
/revenue-lanes/enterprise
/how-it-works                      7-step operating process
/why-omnikom                       Comparison vs. VA/call-center/lead-vendor/agency/software
/industries                        Overview
/about
/partnerships
/case-studies
/resources
/insights                          Blog
/compliance
/consultation                      Primary conversion form
/contact
/careers
/privacy /terms /cookies
```

### Industry pages (13 routes, `/industries/[slug]`)
real-estate · roofing-home-services · hvac · solar · automotive · b2b-saas · staffing · dental-healthcare · med-spa · legal · financial-services · education · commercial-industrial

### Special landing page
`/financial-services-infrastructure` — Omnikom Financial Services Infrastructure, powered by Rainmaker.

### Future scalable SEO routes (don't build yet, design for it)
`/industries/[industry]/[use-case]`, `/case-studies/[slug]`, `/insights/[slug]`, `/partners/[slug]`

**Launch priority order for industry pages** (per doc 03 §29.2): Real Estate → Automotive → Roofing/Home Services → B2B → Financial Services, then the remaining 8.

Every marketing page follows a template (doc 03 §11): Header → Hero → Problem → Platform/Solution explanation → Capability grid → Process → Proof → FAQ → CTA → Footer. Industry pages have their own 12-part template (industry hero, problem, lane cards, use cases, qualified-opportunity definition, infrastructure layers, client ownership, KPIs, compliance boundary, case studies, FAQ, CTA).

---

## 3. Design System — "Sharp & Systematic"

Bold, technical, high-contrast, operational. No gradients, no glow, no glassmorphism, no soft SaaS aesthetic, no stock call-center photography. The logomark (a circular "Q" with a directional arrow) is a functional design element representing the closed-loop system, not just a logo — used in diagrams, bullets, loading states.

### Color tokens
| Token | Hex | Use |
|---|---|---|
| `--color-black` | `#0A0A0A` | Primary background |
| `--color-black-soft` | `#111111` | Elevated surfaces |
| `--color-black-card` | `#171717` | Dark cards |
| `--color-blue` | `#1B1FA8` | Section separator (platform/system sections) |
| `--color-blue-bright` | `#1E22B8` | Interactive/active blue |
| `--color-lime` | `#B4D42D` | Primary accent, CTAs, action only |
| `--color-lime-bright` | `#BFDD2E` | Hover/emphasis |
| `--color-white` | `#FFFFFF` | Primary text |
| `--color-gray-100/300/500/700` | `#F3F3F3`/`#D8D8D8`/`#A6A6A6`/`#5F5F5F` | Text hierarchy |
| `--color-error` | `#E45555` | Errors only |
| `--color-warning` | `#E6B74A` | Warnings only |

Recommended homepage background rhythm: black hero → blue category section → black platform → blue/off-white solutions → black industries → **lime** process break → black technology → blue differentiation → black results philosophy → **lime** final CTA. Never repeat the same background for too many consecutive sections; lime is reserved for action/status, not decoration.

### Typography
- **Headings:** Sora (fallback Poppins/Manrope/Plus Jakarta Sans)
- **Body:** Inter (fallback Geist/IBM Plex Sans/DM Sans)
- Load via `next/font/google`.
- Type scale desktop: Display XL 96px → H1 72px → H2 52px → H3 36px → H4 24px → Body 16px (full table in doc 03 §4.3, with a mobile scale too).
- **Lowercase-first headline style** for most marketing H1/H2s: `build revenue. not headcount.` — proper nouns/acronyms are the exception.
- Line-length discipline: body 55–75 chars, hero copy 45–65 chars, headlines ≤12 words.

### Spacing, grid, radius
8px base spacing scale (`--space-1: 4px` up to `--space-12: 160px`). Containers: 1440px max, 1280px standard, 760px text. 12-col desktop grid / 8-col tablet / 4-col mobile. Border radius: buttons 10–14px, cards 14–18px, inputs 10–12px — crisp, not bubbly. No soft decorative shadows; separation comes from borders, color blocks, and spacing.

### Motion
Mechanical, fast, intentional — reinforces routing/continuity/control. Timing tokens: 120/180/260/420ms with `cubic-bezier(0.2,0.8,0.2,1)` standard easing. Allowed: fast fade, slide, <24px vertical reveal, arrow translation, progress-line draw, node activation, number count. Avoid: floating, bobbing, parallax, elastic bounce, scroll-jacking, glow, heavy 3D. Must respect `prefers-reduced-motion`. The signature hero animation is the **Revenue Loop**: Market → Data → Outreach → Qualification → CRM → Client Team → Outcome → Optimization, looping every 8–12s.

### Component inventory (build these once, reuse everywhere)
- **Global:** SiteHeader, MegaMenu, MobileMenu, SiteFooter, CookieBanner, AnnouncementBar, StickyMobileCTA, SkipToContent
- **Heroes:** HomeHero, PageHero, SplitHero, IndustryHero, PartnershipHero, CaseStudyHero, ResourceHero
- **System/diagram:** RevenueLoopDiagram, InfrastructureLayerStack, RevenueLaneFlow, IndustryPipeline, GlobalHubMap, RoutingDiagram, ProcessTimeline, DataFlowNode, MetricPanel, QMarkIndicator
- **Content:** SectionEyebrow, SectionHeading, RichText, PullQuote, FeatureGrid, CapabilityCard, SolutionCard, RevenueLaneCard, IndustryCard, ComparisonTable, OwnershipSplit, KpiGrid, Accordion, LogoCloud, TestimonialCard, CaseStudyCard, ResourceCard, PartnerCard, DisclaimerBlock
- **Conversion:** PrimaryCTASection, InlineCTA, ConsultationForm, PartnerInquiryForm, ResourceDownloadForm, CalendarEmbed, FormSuccessState, FormErrorSummary
- **Navigation:** Breadcrumbs, InPageNavigation, RelatedLinks, Pagination, SearchInput, FilterTabs

Full spec (states, hover behavior, field lists) is in doc 03 §9–10.

---

## 4. Technical Architecture

### Stack
Next.js 15+ (App Router) · React · TypeScript strict mode · Tailwind CSS · Framer Motion · Server Components by default, Client Components only where interactivity requires it.

### CMS
Preferred **Sanity** (flexible structured content, editorial preview); alternative **Payload** for tighter app integration. Content types: `page`, `industry`, `solution`, `revenueLane`, `platformCapability`, `caseStudy`, `article`, `resource`, `partner`, `faq`, `testimonial`, `siteSettings`, `navigation`, `legalPage`. Reusable blocks: hero, rich text, feature grid, card grid, process timeline, comparison table, ownership split, diagram, metrics, testimonial, FAQ, CTA, disclaimer, logo cloud, form embed.

### Folder structure (recommended)
```
src/
  app/
    (marketing)/  page.tsx, revenue-infrastructure/, platform/, solutions/,
                  revenue-lanes/, industries/, how-it-works/, why-omnikom/,
                  partnerships/, case-studies/, insights/, consultation/, contact/
    api/          consultation/, partner-inquiry/, resource-download/, revalidate/
    sitemap.ts, robots.ts, layout.tsx
  components/     global/, navigation/, heroes/, diagrams/, cards/, forms/, content/, conversion/, analytics/
  content/        constants/, fallbacks/
  lib/            cms/, crm/, analytics/, validation/, seo/, security/
  styles/         globals.css, tokens.css
  types/          cms.ts, forms.ts, analytics.ts
  utils/
  middleware.ts
public/           brand/, icons/, diagrams/, images/
```

### Rendering strategy
Static generation for standard marketing pages, ISR for CMS content, SSR only where truly needed (personalization/search). Avoid unnecessary client-side fetching.

### Key type definitions (doc 03 §17 has full code)
`CTA { label, href, style: primary|secondary|text, analyticsId?, external? }`, `PageHero { eyebrow?, heading, body?, primaryCta?, secondaryCta?, visualType, theme }`, `IndustryPage`, `RevenueLaneSummary`, `CaseStudy` — these should become your shared TypeScript interfaces before writing components.

### Forms & CRM
`ConsultationSubmission` data model (doc 03 §20.1) captures name/contact/company/industry plus qualification fields (revenue range, customer value, locations, sales team size, existing CRM, database size, acquisition channels, timeline, partnership interest). Multi-step form with progress indicator, session-storage step persistence, Zod validation client+server, honeypot + rate limiting for spam. Routes to CRM by segment: financial services → Rainmaker/Omnikom pipeline, strategic partner → partnerships owner, high-revenue multi-location → enterprise owner.

### Analytics
GA4 + GTM (PostHog/Clarity optional). Core events: `consultation_cta_click`, `consultation_form_start/step_complete/submit`, `partner_inquiry_submit`, `resource_download`, `industry_page_view`, `revenue_lane_page_view`, `case_study_view`, `calendar_booking_complete`, `phone_click`, `email_click`, `faq_expand`. Persist first/last-touch UTMs. Consent-gate non-essential trackers.

### SEO
Next.js Metadata API on every page (title/description/canonical/OG/Twitter/robots). JSON-LD: Organization, WebSite, BreadcrumbList, Service, FAQPage, Article, ContactPage. Sitemap generated from static + CMS routes. **Guardrail: no programmatic thin pages** — every industry/lane page needs unique copy and a real qualification framework, not a templated mail-merge.

### Performance, accessibility, security targets
- Lighthouse 90+/95+/95+/95+ (Perf/A11y/BP/SEO), LCP <2.5s, INP <200ms, CLS <0.1.
- WCAG 2.2 AA: semantic landmarks, keyboard nav, visible focus rings, skip link, alt text, reduced motion, no color-only meaning.
- Security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy), server-only secrets, staging password-protected + `noindex`.

---

## 5. Page-by-Page Copy Reference (where to find exact content)

The copy for every page already exists verbatim in **doc 02**. Use this table to jump straight to the right section instead of re-deriving copy:

| Page | Doc 02 section |
|---|---|
| Homepage (full hero, 10 sections, final CTA) | §5 |
| Revenue Infrastructure | §6 |
| Platform Overview | §7 |
| Platform capability pages (Data/Outreach/Qualification/AI/Revenue Intelligence/Workforce) | §8 |
| Solutions overview + 8 solution pages | §9–10 |
| Revenue Lanes (Validation/Growth/Expansion/Enterprise) | §11 |
| How It Works (7 steps) | §12 |
| Why Omnikom (comparison matrix) | §13 |
| Industries overview + 13 industry pages | §14–16 |
| Financial Services partnership landing page | §17 |
| About | §18 |
| Partnerships | §19 |
| Case Studies (structure + empty state) | §20 |
| Resources/Insights (15 pillar article titles) | §21 |
| Compliance | §22 |
| Consultation (fields + logic + confirmation copy) | §23 |
| Contact | §24 |
| FAQ library (12 Q&As) | §25 |
| Footer copy | §26 |
| SEO keyword themes | §27 |
| CMS field lists per content type | §28 |
| Microcopy/system states (errors, loading, 404) | §29 |

Do not paraphrase this copy freely — it's been deliberately worded to avoid the banned terms in §4.2/4.3 of doc 02 (no "cheap labor," "leads on demand," "guaranteed appointments," etc.) and to stay inside compliance boundaries.

---

## 6. Build Phases (recommended order)

**Phase 1 — Foundation:** repo, Next.js/TS/Tailwind, fonts, design tokens, SiteHeader, SiteFooter, CMS connection, SEO foundation, analytics foundation.

**Phase 2 — Core components:** heroes, cards, CTA sections, process timeline, comparison table, forms, diagrams, FAQ/accordion.

**Phase 3 — Core pages:** Home, Revenue Infrastructure, Platform (+6 capability pages), Solutions (+8), Revenue Lanes (+4), How It Works, Why Omnikom.

**Phase 4 — Industry system:** industry page template, Industries overview, 5 priority industry pages, Financial Services partnership page.

**Phase 5 — Content & proof:** Case Studies, Insights, Resources, About, Partnerships, Compliance, remaining 8 industry pages.

**Phase 6 — Integrations:** CRM, email (Resend/Postmark preferred), calendar, analytics, consent, error monitoring (Sentry).

**Phase 7 — QA & launch:** content review against acceptance criteria, accessibility audit, performance audit, security review, cross-browser testing (Chrome/Safari/Edge/Firefox + iOS Safari/Chrome Android), production launch.

---

## 7. Assets Needed Before Launch

- Production logo set: SVG (preferred), PNG/WebP fallback, monochrome white/black, symbol-only, horizontal + compact lockups, favicon at 16/32/48/180/512px — all derived from `brand/omnikom_logo_reference.jpeg` (lime Q-mark + white lowercase wordmark on black).
- Founder portrait, partner (Rainmaker) logo files, industry diagrams, dashboard mockups, default OG image (1200×630, black bg, lime Q-mark, "Build revenue. Not headcount.").
- Legal pages: Privacy, Terms, Cookies, Compliance — with a reusable `RegulatedIndustryDisclaimer` component (variants: financial services, insurance, mortgage, legal, healthcare, real estate).

---

## 8. Launch Acceptance Checklist (condensed from doc 03 §32–34)

- [ ] Every page has one clear purpose and one primary CTA; no public pricing anywhere
- [ ] No page leads with staffing/VA/caller/cheap-labor framing
- [ ] Industry pages define Omnikom-owned vs. client-owned responsibilities
- [ ] Regulated pages carry compliance boundary copy
- [ ] Financial Services page uses correct Omnikom-first/Rainmaker "powered by" hierarchy
- [ ] All forms validate client+server, integrate with CRM, fire analytics events, send confirmation email
- [ ] Metadata unique per page; sitemap includes CMS content; schema validates
- [ ] Core Web Vitals targets met; accessibility (axe-core + manual) passes; reduced motion respected
- [ ] Staging is password-protected and `noindex`; security headers enabled; error monitoring live

---

## Source documents

Full detail lives in `omnikom_developer_handoff/` (uploaded package):
- `01_omnikom_product_vision_business_architecture.md` — business model, industries, commercial model, KPIs, compliance framework, Rainmaker partnership
- `02_omnikom_website_ux_copy_customer_journey.md` — sitemap, IA, full page copy, FAQs, CMS content model
- `03_omnikom_design_system_engineering_specification.md` — design tokens, components, Next.js architecture, CMS/CRM/analytics/SEO, testing, deployment, acceptance criteria
- `brand/omnikom_logo_reference.jpeg` — logo reference asset
