# Omnikom Revenue Infrastructure
## Document 03 — Design System, Component Architecture, and Engineering Specification

**Prepared for:** Product designer, UI/UX designer, front-end developer, full-stack developer, CMS implementer, QA engineer, analytics owner, and technical lead  
**Primary use:** Build and launch the Omnikom corporate website and scalable industry platform  
**Version:** 1.0  
**Design direction:** Omnikom — Sharp & Systematic  
**Recommended stack:** Next.js, TypeScript, Tailwind CSS, Framer Motion, headless CMS, Vercel  

---

# 0. Engineering Mandate

The website must communicate operational precision, system architecture, forward motion, and enterprise credibility.

The design should not imitate a generic outsourcing, call-center, lead-generation, or staffing website.

The implementation must support:

- A category-defining corporate homepage
- Platform capability pages
- Solution pages
- Revenue Lane pages
- Industry pages
- Strategic partnership pages
- Case studies
- Insights and resources
- Consultation forms
- Future client portal links
- Scalable CMS publishing
- Multi-brand and co-branded pages

The codebase should be reusable enough to launch future Omnikom industry modules without rebuilding the website.

---

# 1. Design Philosophy

## 1.1 Name

# Omnikom — Sharp & Systematic

## 1.2 Concept

The visual system expresses:

- Precision
- Momentum
- Routing
- Continuity
- Control
- Repeatability
- Operational clarity
- Forward motion

The Omnikom logomark is a circular Q-like system containing a directional arrow.

The mark should become a functional design language, not only a logo.

It may represent:

- Closed-loop optimization
- Revenue movement
- Opportunity routing
- Process continuity
- Active status
- Progress
- Feedback

## 1.3 Overall Feel

The website should feel:

- Bold
- Enterprise
- Technical
- Operational
- Modern
- High-contrast
- Fast
- Controlled
- Intelligent

The website should not feel:

- Soft
- Decorative
- Lifestyle-oriented
- Playful
- Generic SaaS
- Outsourcing-focused
- Labor-focused
- Over-animated

## 1.4 Visual Inspiration Principle

The site may borrow structural confidence from enterprise infrastructure companies, but it must not copy any specific company.

Reference qualities:

- Clear platform architecture
- High information density with strong hierarchy
- Confident typography
- Technical diagrams
- Modular cards
- Operational dashboards
- Minimal decorative imagery

---

# 2. Brand Asset Rules

## 2.1 Logo

Primary logo:

- Lime symbol
- White lowercase wordmark
- Black background

The provided logo asset should be converted into production-ready formats:

- SVG preferred
- PNG fallback
- WebP fallback
- Monochrome white version
- Monochrome black version
- Symbol-only version
- Horizontal lockup
- Compact lockup

## 2.2 Clear Space

Minimum clear space around the complete logo:

- Equal to the height of the lowercase “o” in the wordmark

Minimum clear space around the symbol:

- Equal to 20% of the symbol diameter

## 2.3 Minimum Size

- Full horizontal logo: minimum 120px width on screen
- Symbol-only: minimum 24px
- Favicon: simplified symbol at 16, 32, 48, 180, and 512px

## 2.4 Incorrect Usage

Do not:

- Stretch
- Skew
- Add gradients
- Add drop shadows
- Add glow
- Change symbol proportions
- Place on low-contrast backgrounds
- Use multiple accent colors inside the logo
- Animate the wordmark continuously

## 2.5 Background Logo Treatment

The symbol may be:

- Cropped at large scale
- Used as a low-opacity watermark
- Used as a mask
- Used as a diagram node
- Rotated only when motion meaning is clear

Do not use it as random decoration.

---

# 3. Design Tokens

## 3.1 Color Tokens

### Core Colors

| Token | Hex | Use |
|---|---|---|
| `--color-black` | `#0A0A0A` | Main background |
| `--color-black-soft` | `#111111` | Elevated surfaces |
| `--color-black-card` | `#171717` | Dark cards |
| `--color-blue` | `#1B1FA8` | Primary blue sections |
| `--color-blue-bright` | `#1E22B8` | Interactive and active blue |
| `--color-lime` | `#B4D42D` | Primary accent and CTA |
| `--color-lime-bright` | `#BFDD2E` | Hover and emphasis |
| `--color-white` | `#FFFFFF` | Primary text |
| `--color-gray-100` | `#F3F3F3` | Light backgrounds |
| `--color-gray-300` | `#D8D8D8` | Secondary light text |
| `--color-gray-500` | `#A6A6A6` | Muted text |
| `--color-gray-700` | `#5F5F5F` | Disabled text |
| `--color-border` | `#2A2A2A` | Dark borders |
| `--color-error` | `#E45555` | Errors only |
| `--color-warning` | `#E6B74A` | Warnings only |
| `--color-success` | `#B4D42D` | Success states |

### CSS Variables

```css
:root {
  --color-black: #0a0a0a;
  --color-black-soft: #111111;
  --color-black-card: #171717;
  --color-blue: #1b1fa8;
  --color-blue-bright: #1e22b8;
  --color-lime: #b4d42d;
  --color-lime-bright: #bfdd2e;
  --color-white: #ffffff;
  --color-gray-100: #f3f3f3;
  --color-gray-300: #d8d8d8;
  --color-gray-500: #a6a6a6;
  --color-gray-700: #5f5f5f;
  --color-border: #2a2a2a;
  --color-error: #e45555;
  --color-warning: #e6b74a;
  --color-success: #b4d42d;
}
```

## 3.2 Color Usage Rules

- No gradients
- No glowing backgrounds
- No glassmorphism
- No pastel variants
- Use flat, solid blocks
- Use lime for action, status, routing, and emphasis
- Do not make every section lime
- Preserve black as the primary brand environment
- Use blue to separate platform and system sections
- Use white sparingly for clarity and contrast

## 3.3 Background Sequence

Recommended homepage rhythm:

1. Black hero
2. Blue category section
3. Black platform section
4. Blue or off-white solution section
5. Black industries
6. Lime process break
7. Black technology
8. Blue differentiation
9. Black result philosophy
10. Lime final CTA

Avoid repeating the same background for too many consecutive sections.

---

# 4. Typography System

## 4.1 Font Strategy

No font files should be committed without appropriate licensing.

Recommended web fonts:

### Headline

Preferred:

- Sora
- Poppins
- Manrope
- Plus Jakarta Sans

Primary recommendation:

**Sora**

### Body

Preferred:

- Inter
- Geist
- IBM Plex Sans
- DM Sans

Primary recommendation:

**Inter**

## 4.2 Font Loading

Use `next/font` where possible.

Example:

```ts
import { Inter, Sora } from "next/font/google";

export const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const headingFont = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});
```

## 4.3 Type Scale

### Desktop

| Token | Size | Line Height | Weight |
|---|---:|---:|---:|
| Display XL | 96px | 0.98 | 700 |
| Display L | 80px | 1.00 | 700 |
| H1 | 72px | 1.02 | 700 |
| H2 | 52px | 1.08 | 650–700 |
| H3 | 36px | 1.15 | 650 |
| H4 | 24px | 1.25 | 600 |
| Body XL | 22px | 1.55 | 400 |
| Body L | 18px | 1.60 | 400 |
| Body | 16px | 1.60 | 400 |
| Small | 14px | 1.50 | 400 |
| Label | 12px | 1.30 | 600 |

### Mobile

| Token | Size | Line Height |
|---|---:|---:|
| Display XL | 54px | 1.00 |
| Display L | 48px | 1.02 |
| H1 | 44px | 1.04 |
| H2 | 36px | 1.10 |
| H3 | 28px | 1.18 |
| H4 | 22px | 1.25 |
| Body XL | 19px | 1.50 |
| Body L | 17px | 1.55 |
| Body | 16px | 1.60 |

## 4.4 Lowercase-First Headline Rule

Most marketing headlines should use sentence structure with lowercase styling:

- build revenue. not headcount.
- one platform. every operating layer.
- always moving. always in control.

Exceptions:

- Proper nouns
- Legal names
- Acronyms
- Formal document titles

## 4.5 Line Length

- Body copy: 55–75 characters per line
- Hero copy: 45–65 characters per line
- Large headline: maximum 12 words where possible

---

# 5. Spacing, Grid, and Layout

## 5.1 Spacing Scale

Use an 8px base system.

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 24px;
--space-6: 32px;
--space-7: 48px;
--space-8: 64px;
--space-9: 80px;
--space-10: 96px;
--space-11: 128px;
--space-12: 160px;
```

## 5.2 Container Widths

- Maximum full container: 1440px
- Standard content: 1280px
- Text content: 760px
- Narrow article: 720px
- Wide diagram: 1360px

## 5.3 Page Padding

Desktop:

- 64px minimum horizontal
- 96–160px section vertical

Tablet:

- 32px horizontal
- 80–112px vertical

Mobile:

- 20px horizontal
- 64–88px vertical

## 5.4 Grid

Desktop:

- 12 columns
- 24px gutter

Tablet:

- 8 columns
- 20px gutter

Mobile:

- 4 columns
- 16px gutter

## 5.5 Border Radius

The logo and typography are rounded, but the system should remain crisp.

Recommended:

- Buttons: 10–14px
- Cards: 14–18px
- Inputs: 10–12px
- Pills: 999px only for labels

Avoid excessive rounded “bubble” cards.

## 5.6 Shadows

No soft decorative shadows.

Allowed:

- Very subtle elevation for sticky navigation
- Strong directional shadow only for specific interaction states

Preferred separation:

- Borders
- Color blocks
- Spacing

---

# 6. Iconography and Illustration

## 6.1 Icon Style

- 2px stroke
- Rounded terminals where appropriate
- Geometric construction
- Lime on dark
- Black on lime
- White secondary icons

## 6.2 Core Icon Concepts

- Market
- Data
- Outreach
- Qualification
- CRM
- Routing
- AI
- QA
- Reporting
- Workforce
- Expansion
- Partnership

## 6.3 Q-Mark Bullet

Use the symbol or simplified arrow-circle as a custom bullet.

Use cases:

- Feature lists
- Process steps
- Section labels
- Active tabs
- Loading

## 6.4 Illustration Style

Use:

- Infrastructure diagrams
- Data nodes
- Flow arrows
- Territory maps
- CRM pipeline visuals
- Dashboard mockups
- QA scorecards
- Process schematics

Avoid:

- Generic stock people
- Headset call-center images
- Handshakes
- Abstract blobs
- Cartoon characters
- Shiny 3D objects

## 6.5 Photography

Photography is optional and should be limited to:

- Founder portrait
- Real operations environment
- Client or partner portraits
- Industry-specific contextual photography

Photography should not dominate platform pages.

---

# 7. Motion System

## 7.1 Motion Principle

Motion should feel mechanical, fast, and intentional.

It should reinforce routing, continuity, progression, and control.

## 7.2 Timing Tokens

```css
--duration-fast: 120ms;
--duration-base: 180ms;
--duration-medium: 260ms;
--duration-slow: 420ms;
--ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1);
--ease-sharp: cubic-bezier(0.4, 0, 0.2, 1);
```

## 7.3 Allowed Motion

- Fast fade
- Horizontal slide
- Vertical reveal under 24px
- Arrow translation
- Progress-line draw
- Node activation
- Number count
- Color inversion
- Controlled logo rotation
- Section snap emphasis

## 7.4 Avoided Motion

- Slow floating
- Continuous bobbing
- Large parallax
- Elastic bounce
- Long scroll-jacking
- Background glow
- Heavy 3D
- Cursor effects that interfere with usability

## 7.5 Reduced Motion

Respect `prefers-reduced-motion`.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 7.6 Hero Flow Animation

Animation sequence:

1. Market node appears
2. Line draws to Data
3. Data node activates lime
4. Line advances through Outreach
5. Qualification activates
6. CRM and routing activate
7. Client team receives opportunity
8. Outcome returns through optimization loop
9. Q symbol completes one controlled rotation or arrow sweep

Loop duration:

- 8–12 seconds
- Pause between cycles
- No rapid flashing

---

# 8. Interactive States

## 8.1 Primary Button

Default:

- Lime background
- Black text
- Lime border

Hover:

- Transparent background
- Lime text
- Lime border
- Arrow translates 6px right

Focus:

- 3px white or lime focus ring with offset

Disabled:

- Gray background
- Gray text
- No pointer

## 8.2 Secondary Button

Default:

- Transparent
- White text
- Gray border

Hover:

- White background
- Black text

## 8.3 Card Hover

Dark card:

- Border changes to lime
- Background may shift to blue
- Icon advances or rotates slightly
- No elevation bounce

Blue card:

- Background becomes lime
- Text becomes black

## 8.4 Text Link

- Arrow icon
- Underline grows left to right
- Arrow translates 4px

## 8.5 Tabs

- Active tab lime underline or lime fill
- No pill overload
- Keyboard navigable
- Proper ARIA roles

---

# 9. Component Library

## 9.1 Global Components

- `SiteHeader`
- `MegaMenu`
- `MobileMenu`
- `SiteFooter`
- `CookieBanner`
- `AnnouncementBar`
- `StickyMobileCTA`
- `SkipToContent`

## 9.2 Hero Components

- `HomeHero`
- `PageHero`
- `SplitHero`
- `IndustryHero`
- `PartnershipHero`
- `CaseStudyHero`
- `ResourceHero`

## 9.3 System Components

- `RevenueLoopDiagram`
- `InfrastructureLayerStack`
- `RevenueLaneFlow`
- `IndustryPipeline`
- `GlobalHubMap`
- `RoutingDiagram`
- `ProcessTimeline`
- `DataFlowNode`
- `MetricPanel`
- `QMarkIndicator`

## 9.4 Content Components

- `SectionEyebrow`
- `SectionHeading`
- `RichText`
- `PullQuote`
- `FeatureGrid`
- `CapabilityCard`
- `SolutionCard`
- `RevenueLaneCard`
- `IndustryCard`
- `ComparisonTable`
- `OwnershipSplit`
- `KpiGrid`
- `Accordion`
- `LogoCloud`
- `TestimonialCard`
- `CaseStudyCard`
- `ResourceCard`
- `PartnerCard`
- `DisclaimerBlock`

## 9.5 Conversion Components

- `PrimaryCTASection`
- `InlineCTA`
- `ConsultationForm`
- `PartnerInquiryForm`
- `ResourceDownloadForm`
- `CalendarEmbed`
- `FormSuccessState`
- `FormErrorSummary`

## 9.6 Navigation Components

- `Breadcrumbs`
- `InPageNavigation`
- `RelatedLinks`
- `Pagination`
- `SearchInput`
- `FilterTabs`

---

# 10. Component Specifications

## 10.1 Site Header

### Desktop

- Height: 80px
- Logo left
- Main links center or left-center
- CTA right
- Background transparent in hero
- Background black after scroll
- Bottom border `#2A2A2A` after scroll

### Mobile

- Height: 68px
- Logo left
- Menu button right
- CTA inside menu
- Full-screen black menu
- Large navigation links

### Behavior

- Sticky
- Hide on downward scroll only if usability testing supports it
- Reappear immediately on upward scroll

## 10.2 Mega Menu

- Maximum width 1280px
- Black background
- Lime active markers
- Two or three columns
- Each link includes one sentence
- Keyboard navigable
- Close on Escape
- Close on outside click

## 10.3 Hero

- Minimum viewport height: 760px desktop
- Content aligned left
- Diagram right or background
- Hero text maximum width: 760px
- Primary CTA visible without scroll
- H1 line breaks controlled with responsive spans

## 10.4 Capability Card

Fields:

- Icon
- Title
- Description
- Optional link
- Optional index
- Theme

States:

- Dark
- Blue
- Lime
- Light

## 10.5 Revenue Lane Card

Fields:

- Stage
- Name
- Objective
- Best fit
- Link
- Optional maturity index

Do not show prices by default.

## 10.6 Industry Card

Fields:

- Industry name
- Short problem
- Primary lane types
- Link
- Optional diagram thumbnail

## 10.7 Comparison Table

Requirements:

- Responsive stacked cards on mobile
- Sticky first column only if accessible
- Proper table markup on desktop
- Avoid horizontal overflow where possible

## 10.8 Process Timeline

Desktop:

- Horizontal 7-step timeline
- Q mark as step node
- Active step lime

Mobile:

- Vertical timeline
- No horizontal scroll required

## 10.9 Consultation Form

Requirements:

- Multi-step form preferred
- Progress indicator
- Save current step in session storage
- Accessible labels
- Conditional fields
- Server-side validation
- Spam protection
- CRM integration
- Consent checkbox where required

---

# 11. Page Template System

## 11.1 Standard Marketing Page Template

1. Header
2. Hero
3. Problem
4. Platform or solution explanation
5. Capability grid
6. Process
7. Proof
8. FAQ
9. CTA
10. Footer

## 11.2 Industry Page Template

1. Industry hero
2. Industry problem
3. Revenue Lane cards
4. Use cases
5. Qualified opportunity definition
6. Infrastructure layers
7. Client ownership
8. KPIs
9. Compliance boundary
10. Case studies
11. FAQ
12. CTA

## 11.3 Partnership Page Template

1. Co-branded hero
2. Partnership proposition
3. Roles and capabilities
4. Global delivery model
5. Joint infrastructure modules
6. Client types
7. Operating process
8. Governance
9. Compliance
10. CTA

## 11.4 Case Study Template

1. Hero
2. Client context
3. Challenge
4. Infrastructure deployed
5. Workflow diagram
6. Metrics
7. Outcome
8. Attribution note
9. Expansion
10. CTA

## 11.5 Article Template

1. Breadcrumb
2. Category
3. H1
4. Summary
5. Author and date
6. Table of contents
7. Article body
8. Inline CTAs
9. Related resources
10. Final CTA

---

# 12. Co-Branding System

## 12.1 Omnikom-First Rule

Strategic partnership pages remain part of the Omnikom platform.

Omnikom logo should appear first.

Partner brand appears as:

- Powered by
- Strategic partner
- In collaboration with

The relationship must reflect the approved commercial agreement.

## 12.2 Financial Services Page

Primary title:

**Omnikom Financial Services Infrastructure**

Secondary line:

**Powered by Rainmaker Wealth Innovation**

## 12.3 Partner Color Usage

Do not allow partner colors to replace the Omnikom palette across the page.

Partner colors may appear:

- In the partner logo
- In a small capability section
- In a co-brand lockup

The page remains visually Omnikom.

## 12.4 Partner Logo Rules

- Equal visual respect
- Omnikom retains platform hierarchy
- Clear spacing between marks
- No merging logos into one new symbol unless formally approved

---

# 13. Responsive Design

## 13.1 Breakpoints

Recommended Tailwind breakpoints:

```ts
screens: {
  xs: "375px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
}
```

## 13.2 Mobile Principles

- Single-column default
- Minimum 16px body type
- Minimum 44px touch target
- Sticky bottom CTA where appropriate
- Simplified diagrams
- Reduced motion
- No critical content inside hover only
- No tiny carousels for core information

## 13.3 Tablet

- Two-column cards
- Condensed mega menu or mobile menu
- Diagrams may stack below text

## 13.4 Desktop

- Use full grid
- Large type
- Side-by-side diagrams
- Controlled wide whitespace

## 13.5 Ultra-Wide Screens

Do not allow text or diagrams to stretch excessively.

Use max-width containers.

---

# 14. Accessibility

## 14.1 Standard

Target WCAG 2.2 AA.

## 14.2 Requirements

- Semantic landmarks
- Keyboard navigation
- Visible focus states
- Skip link
- Correct heading hierarchy
- Form labels
- Error summaries
- Alt text
- Captions for video
- Reduced motion
- Sufficient contrast
- No color-only meaning
- Proper table markup
- Accessible menus
- Accessible dialogs

## 14.3 Contrast

Validate all combinations.

Known intended combinations:

- White on black
- Lime on black
- Black on lime
- White on blue
- Lime on blue only after contrast validation at the actual size

## 14.4 Screen Reader Labels

Examples:

- “Open navigation menu”
- “Close navigation menu”
- “Book a Revenue Infrastructure Consultation”
- “Step 1 of 7: Assess”

---

# 15. Recommended Technical Stack

## 15.1 Application

- Next.js 15+ with App Router
- React
- TypeScript strict mode
- Tailwind CSS
- Framer Motion
- Server Components by default
- Client Components only where interaction requires them

## 15.2 CMS

Recommended options:

1. Sanity
2. Payload CMS
3. Contentful
4. Strapi

Preferred:

**Sanity** for flexible structured content and editorial preview.

Alternative:

**Payload** if Omnikom wants tighter ownership and application integration.

## 15.3 Hosting

- Vercel for application
- Managed CMS hosting or self-hosted CMS depending selection
- CDN-backed media

## 15.4 Forms

Options:

- HubSpot forms/API
- Pipedrive API plus custom form
- Custom API route with CRM webhook

Recommended:

Custom front-end form with server-side validation and direct CRM integration.

## 15.5 Scheduling

- Calendly embed or routing form
- Prefer scheduling only after basic qualification

## 15.6 Email

- Resend
- SendGrid
- Postmark

Preferred:

Resend or Postmark for transactional delivery.

## 15.7 Analytics

- Google Analytics 4
- Google Tag Manager
- PostHog optional
- Microsoft Clarity optional
- CRM source attribution

---

# 16. Application Architecture

## 16.1 Recommended Folder Structure

```text
src/
  app/
    (marketing)/
      page.tsx
      revenue-infrastructure/
      platform/
      solutions/
      revenue-lanes/
      industries/
      how-it-works/
      why-omnikom/
      partnerships/
      case-studies/
      insights/
      consultation/
      contact/
    api/
      consultation/
      partner-inquiry/
      resource-download/
      revalidate/
    sitemap.ts
    robots.ts
    layout.tsx
  components/
    global/
    navigation/
    heroes/
    diagrams/
    cards/
    forms/
    content/
    conversion/
    analytics/
  content/
    constants/
    fallbacks/
  lib/
    cms/
    crm/
    analytics/
    validation/
    seo/
    security/
  styles/
    globals.css
    tokens.css
  types/
    cms.ts
    forms.ts
    analytics.ts
  utils/
  middleware.ts
public/
  brand/
  icons/
  diagrams/
  images/
```

## 16.2 Rendering Strategy

- Static generation for standard marketing pages
- Incremental revalidation for CMS content
- Server-side rendering for dynamic search or personalized routing only if needed
- No unnecessary client-side fetching

## 16.3 Data Fetching

- Central CMS client
- Typed query functions
- Cache tags by content type
- Preview mode for editors
- Error boundaries

## 16.4 TypeScript

Use strict mode.

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true
  }
}
```

---

# 17. Core Type Definitions

## 17.1 CTA

```ts
export interface CTA {
  label: string;
  href: string;
  style: "primary" | "secondary" | "text";
  analyticsId?: string;
  external?: boolean;
}
```

## 17.2 Page Hero

```ts
export interface PageHero {
  eyebrow?: string;
  heading: string;
  body?: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  visualType?:
    | "revenue-loop"
    | "layer-stack"
    | "industry-pipeline"
    | "global-hub-map"
    | "none";
  theme: "black" | "blue" | "lime" | "light";
}
```

## 17.3 Industry

```ts
export interface IndustryPage {
  name: string;
  slug: string;
  seoTitle: string;
  metaDescription: string;
  hero: PageHero;
  problem: RichTextBlock[];
  clientTypes: string[];
  revenueLanes: RevenueLaneSummary[];
  useCases: string[];
  qualifiedOpportunity: RichTextBlock[];
  omnikomResponsibilities: string[];
  clientResponsibilities: string[];
  kpis: string[];
  complianceBoundary?: RichTextBlock[];
  relatedCaseStudies?: Reference[];
  relatedInsights?: Reference[];
  finalCta: CTA;
}
```

## 17.4 Revenue Lane

```ts
export interface RevenueLaneSummary {
  name: string;
  slug: string;
  objective: string;
  bestFor: string[];
  includes: string[];
  maturityStage?: "validation" | "growth" | "expansion" | "enterprise";
}
```

## 17.5 Case Study

```ts
export interface CaseStudy {
  title: string;
  slug: string;
  clientLabel: string;
  industry: Reference;
  challenge: RichTextBlock[];
  infrastructureDeployed: string[];
  workflow: DiagramConfig;
  metrics: Metric[];
  outcome: RichTextBlock[];
  attributionNote: string;
  quote?: Testimonial;
  expansion?: RichTextBlock[];
}
```

---

# 18. CMS Schema

## 18.1 Content Types

- `page`
- `industry`
- `solution`
- `revenueLane`
- `platformCapability`
- `caseStudy`
- `article`
- `resource`
- `partner`
- `faq`
- `testimonial`
- `siteSettings`
- `navigation`
- `legalPage`

## 18.2 Reusable Blocks

- Hero
- Rich text
- Feature grid
- Card grid
- Process timeline
- Comparison table
- Ownership split
- Diagram
- Metrics
- Testimonial
- FAQ
- CTA
- Disclaimer
- Logo cloud
- Form embed

## 18.3 Editorial Guardrails

CMS validation should require:

- SEO title
- Meta description
- H1
- Primary CTA
- Alt text for images
- Disclaimer for regulated pages
- Attribution note for case studies

## 18.4 Preview

Editors should be able to preview drafts before publishing.

---

# 19. Diagram Engineering

## 19.1 Technology

Preferred:

- SVG
- CSS transforms
- Framer Motion

Avoid canvas unless required.

## 19.2 Revenue Loop Diagram

Nodes:

- Market
- Data
- Outreach
- Qualification
- CRM
- Client Team
- Outcome
- Optimization

Requirements:

- Accessible text alternative
- Reduced-motion static fallback
- Mobile simplified layout
- Configurable labels

## 19.3 Infrastructure Layer Stack

Nine horizontal or vertical layers.

Interaction:

- Hover or focus expands description
- Active layer lime
- Adjacent layers remain visible

## 19.4 Global Hub Map

Financial services page:

- Egypt node
- Philippines node
- North America / client markets as optional target zone
- Lines connecting through Omnikom platform

Do not create misleading claims about physical offices unless verified.

Use labels such as “delivery hub” or “talent network” only when accurate.

## 19.5 Industry Pipeline

Configurable by industry.

Example automotive:

```text
Customer Database → Reactivation → Qualification → Appointment → Service Team → Repair Order Feedback
```

---

# 20. Forms and CRM Integration

## 20.1 Consultation Form Data Model

```ts
export interface ConsultationSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  website?: string;
  industry: string;
  role?: string;
  country?: string;
  primaryMarket?: string;
  annualRevenueRange?: string;
  averageCustomerValue?: string;
  locations?: string;
  salesTeamSize?: string;
  crm?: string;
  databaseSize?: string;
  acquisitionChannels?: string[];
  outboundStatus?: string;
  growthObjective: string;
  mainChallenge?: string;
  desiredTimeline?: string;
  partnershipInterest?: boolean;
  additionalContext?: string;
  consent: boolean;
  source?: Attribution;
}
```

## 20.2 Validation

Use Zod.

- Validate client and server
- Sanitize text
- Restrict URL formats
- Normalize phone numbers
- Reject disposable email domains only if business policy approves

## 20.3 Spam Protection

- Honeypot
- Rate limiting
- Turnstile or reCAPTCHA Enterprise only if needed
- Server-side validation
- Bot scoring

## 20.4 CRM Mapping

Create:

- Person/contact
- Organization
- Deal/opportunity
- Source campaign
- Page path
- Industry
- Form objective
- Partnership flag

## 20.5 Routing

Examples:

- Financial services → dedicated Rainmaker/Omnikom pipeline
- Strategic partner → partnerships owner
- Existing client → support workflow
- High-revenue multi-location → enterprise owner

## 20.6 Notifications

Send:

- Internal email or Slack notification
- CRM task
- Confirmation email to prospect

Do not expose internal scoring to the prospect.

---

# 21. Analytics and Event Taxonomy

## 21.1 Core Events

- `consultation_cta_click`
- `consultation_form_start`
- `consultation_form_step_complete`
- `consultation_form_submit`
- `partner_inquiry_submit`
- `resource_download`
- `industry_page_view`
- `revenue_lane_page_view`
- `case_study_view`
- `calendar_booking_complete`
- `phone_click`
- `email_click`
- `video_play`
- `faq_expand`

## 21.2 Event Properties

- Page path
- Page type
- CTA label
- CTA location
- Industry
- Revenue Lane
- Campaign source
- Medium
- Content
- Partner page
- Device class

## 21.3 Conversion Funnel

1. Landing page
2. Platform / industry engagement
3. Consultation CTA
4. Form start
5. Form complete
6. Meeting booked
7. Qualified opportunity in CRM
8. Proposal
9. Closed client

## 21.4 Attribution

Persist first-touch and last-touch UTMs.

Store:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- Referrer
- Landing page
- Conversion page

## 21.5 Privacy

Do not load non-essential trackers before consent where required.

---

# 22. SEO Engineering

## 22.1 Metadata

Use Next.js metadata API.

Every page requires:

- Title
- Description
- Canonical
- Open Graph
- Twitter card
- Robots rules

## 22.2 Sitemap

Generate from:

- Static routes
- CMS pages
- Industries
- Solutions
- Revenue Lanes
- Case studies
- Insights

## 22.3 Robots

Allow production content.

Disallow:

- Preview routes
- Internal search parameters where appropriate
- API routes
- Staging

## 22.4 Schema

Implement JSON-LD:

- Organization
- WebSite
- BreadcrumbList
- Service
- FAQPage
- Article
- ContactPage

## 22.5 Internal Linking

Each industry page links to:

- Relevant platform capabilities
- Relevant Revenue Lanes
- How It Works
- Consultation
- Related insights
- Related case studies

## 22.6 Programmatic SEO Guardrail

Do not generate thin market or industry pages automatically.

Each page must have:

- Unique intent
- Unique copy
- Specific workflow
- Relevant qualification
- Useful content

---

# 23. Performance Requirements

## 23.1 Targets

- Lighthouse Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+
- LCP: under 2.5 seconds at p75
- INP: under 200ms at p75
- CLS: under 0.1

## 23.2 Image Optimization

- AVIF or WebP
- Responsive sizes
- Lazy load below fold
- Explicit width and height
- SVG for diagrams and logo

## 23.3 JavaScript Budget

- Minimize client components
- Lazy load heavy animation
- Avoid large UI frameworks
- Tree-shake icons
- No heavy chart package for simple diagrams

## 23.4 Fonts

- Use `next/font`
- Limit weight variants
- Preload critical fonts
- `font-display: swap`

## 23.5 Animation Performance

Animate:

- Transform
- Opacity

Avoid:

- Layout properties
- Large filters
- Continuous backdrop blur

---

# 24. Security and Privacy

## 24.1 Security Headers

Implement:

- Content-Security-Policy
- Strict-Transport-Security
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- Frame restrictions

## 24.2 Form Security

- Server validation
- Rate limiting
- Sanitization
- CSRF protection where relevant
- Secret keys server-only
- No sensitive data in analytics

## 24.3 Environment Variables

Never expose:

- CRM API secrets
- CMS write tokens
- Email provider keys
- Webhook secrets

## 24.4 Data Retention

Document:

- Form submission retention
- CRM retention
- Logs
- Consent records
- Deletion process

## 24.5 Staging

- Password-protected
- `noindex`
- Separate analytics property or disabled tracking

---

# 25. Legal and Compliance Implementation

## 25.1 Required Pages

- Privacy Policy
- Terms
- Cookie Policy
- Compliance Principles

## 25.2 Regulated Page Disclaimer Component

Create reusable `RegulatedIndustryDisclaimer`.

Variants:

- Financial services
- Insurance
- Mortgage
- Legal
- Healthcare
- Real estate

## 25.3 Claims Review

Before publishing:

- Results claims approved
- Client logos approved
- Testimonials approved
- Partnership language approved
- “Powered by” rights approved
- Compliance language reviewed

## 25.4 Consent

Forms should include:

- Privacy consent
- Contact permission where required
- Marketing opt-in separate from required inquiry consent

---

# 26. Testing Strategy

## 26.1 Unit Tests

Test:

- Utility functions
- Schema validation
- Metadata builders
- Routing logic
- Form mapping

## 26.2 Component Tests

Test:

- Buttons
- Menus
- Accordion
- Tabs
- Form steps
- Error states
- Diagrams fallback

## 26.3 End-to-End Tests

Use Playwright.

Critical flows:

1. Homepage → consultation → successful submission
2. Industry page → consultation with prefilled industry
3. Financial services page → financial inquiry route
4. Partnership page → partner inquiry
5. Mobile navigation
6. Keyboard navigation
7. Consent behavior

## 26.4 Accessibility Tests

- axe-core
- Keyboard manual test
- Screen reader spot checks
- Color contrast
- Zoom to 200%

## 26.5 Browser Support

Current and previous major versions:

- Chrome
- Safari
- Edge
- Firefox

Mobile:

- iOS Safari
- Chrome Android

---

# 27. CI/CD and Deployment

## 27.1 Environments

- Local
- Development
- Preview
- Staging
- Production

## 27.2 Pull Request Checks

- Type check
- Lint
- Unit tests
- Build
- Accessibility smoke test
- Broken-link check
- Bundle-size check

## 27.3 Deployment

- Preview deployment per pull request
- Staging approval
- Production promotion
- Rollback capability

## 27.4 Content Deployment

- CMS webhooks trigger revalidation
- Draft preview
- Scheduled publishing where CMS supports it

---

# 28. Monitoring

## 28.1 Error Monitoring

Recommended:

- Sentry

Track:

- Front-end errors
- API errors
- Form failures
- CMS fetch failures
- Webhook failures

## 28.2 Uptime

- UptimeRobot
- Better Uptime
- Vercel monitoring

## 28.3 Form Monitoring

Alert when:

- Submission fails
- CRM webhook fails
- Email confirmation fails
- Spam rate increases

## 28.4 Performance Monitoring

- Vercel Web Analytics
- Speed Insights
- Core Web Vitals

---

# 29. Content Migration and Launch Data

## 29.1 Initial CMS Population

Required before launch:

- Homepage
- Revenue Infrastructure
- Platform
- Solutions
- Revenue Lanes
- How It Works
- Why Omnikom
- Industries overview
- Minimum five priority industry pages
- Financial services partnership page
- About
- Partnerships
- Compliance
- Consultation
- Privacy and Terms

## 29.2 Priority Industry Pages

Launch first:

1. Real estate
2. Automotive
3. Roofing and home services
4. B2B
5. Financial services

Then:

- HVAC
- Solar
- Staffing
- Dental and healthcare
- Commercial services
- Legal
- Education

## 29.3 Asset Checklist

- SVG logo
- PNG logo fallback
- Symbol-only logo
- Favicon set
- Founder portrait
- Partner logo files
- Industry diagrams
- Dashboard mockups
- Social share image

---

# 30. Social and Open Graph Assets

## 30.1 Default Open Graph

Size:

- 1200 × 630

Content:

- Omnikom logo
- Revenue Infrastructure
- “Build revenue. Not headcount.”
- Black background
- Large cropped lime Q mark

## 30.2 Industry Open Graph

- Industry title
- Relevant lane
- Omnikom branding
- No stock image required

## 30.3 Partnership Open Graph

- Omnikom Financial Services Infrastructure
- Powered by Rainmaker Wealth Innovation
- Both logos
- Omnikom visual hierarchy

---

# 31. Developer Implementation Phases

## Phase 1 — Foundation

- Repository
- Next.js
- TypeScript
- Tailwind
- Fonts
- Tokens
- Header
- Footer
- CMS connection
- SEO foundation
- Analytics foundation

## Phase 2 — Core Components

- Heroes
- Cards
- CTA sections
- Process timeline
- Comparison table
- Forms
- Diagrams
- FAQ

## Phase 3 — Core Pages

- Homepage
- Revenue Infrastructure
- Platform
- Solutions
- Revenue Lanes
- How It Works
- Why Omnikom

## Phase 4 — Industry System

- Industry template
- Industries overview
- Priority industry pages
- Financial services partnership page

## Phase 5 — Content and Proof

- Case studies
- Insights
- Resources
- About
- Partnerships
- Compliance

## Phase 6 — Integrations

- CRM
- Email
- Calendar
- Analytics
- Consent
- Error monitoring

## Phase 7 — QA and Launch

- Content review
- Accessibility
- Performance
- Security
- Browser testing
- Analytics validation
- Production launch

---

# 32. Acceptance Criteria by Page

## Homepage

- H1 visible above fold
- Primary CTA visible
- Revenue loop animated and accessible
- Platform layers clear
- Industries linked
- No public pricing
- Final CTA functional

## Industry Page

- Unique copy
- Revenue Lanes listed
- Qualified opportunity defined
- Client ownership defined
- Compliance boundary where required
- Consultation prefilled with industry

## Financial Services Partnership Page

- Omnikom-first hierarchy
- Rainmaker clearly explained
- Egypt and Philippines model visualized
- Regulated activities disclaimer
- Dedicated form routing

## Consultation Page

- Conditional form works
- Server validation works
- CRM record created
- Confirmation email sent
- Analytics event fires
- Accessible errors

---

# 33. Design QA Checklist

- [ ] Colors use approved tokens
- [ ] No gradients
- [ ] No glow effects
- [ ] Logo has clear space
- [ ] Headline typography is consistent
- [ ] Body line length is controlled
- [ ] Section rhythm alternates intentionally
- [ ] Lime is used as action, not decoration everywhere
- [ ] Hover states use inversion or directional motion
- [ ] Diagrams are readable on mobile
- [ ] No generic call-center imagery
- [ ] Partner pages remain visually Omnikom
- [ ] Focus states are visible
- [ ] Reduced motion is supported

---

# 34. Engineering QA Checklist

- [ ] TypeScript strict passes
- [ ] ESLint passes
- [ ] Build passes
- [ ] No console errors
- [ ] No broken links
- [ ] Forms validate client and server
- [ ] Spam protection works
- [ ] CRM mapping verified
- [ ] Analytics events verified
- [ ] Metadata unique
- [ ] Sitemap includes CMS content
- [ ] Robots configured
- [ ] Schema validates
- [ ] Core Web Vitals meet targets
- [ ] Accessibility tests pass
- [ ] Staging is noindex
- [ ] Security headers enabled
- [ ] Error monitoring enabled
- [ ] Backup and rollback process documented

---

# 35. Final Technical Principle

The build should make Omnikom feel like a scalable operating platform before every software module is fully productized.

That does not mean pretending the company is software-only.

It means presenting the managed system with the same clarity, modularity, and discipline expected from infrastructure companies.

The final experience should communicate:

- One platform
- Multiple operating layers
- Multiple Revenue Lanes
- Industry-specific deployment
- Strategic partnerships
- Managed execution
- Measurable governance
- Scalable expansion

The website should be built as the first interface to the Omnikom Revenue Infrastructure platform—not as a temporary marketing brochure.

