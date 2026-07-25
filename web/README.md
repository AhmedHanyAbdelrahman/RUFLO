# Omnikom Website

Next.js implementation of the Omnikom marketing site. Built from the
developer handoff package in `../omnikom_developer_handoff/` and the
synthesized build guide at `../OMNIKOM_WEBSITE_BUILD_GUIDE.md` — read those
first for the business context, copy source, and design system rationale.

## Status

Phases 1-5 from the build guide are substantially implemented — every
route in the sitemap (doc 02 §3) now resolves to a real page:

- Design tokens, fonts (Sora/Inter), global styles matching the
  "Sharp & Systematic" system — deliberately restrained (plain bordered
  cards, numbered indices, minimal icon use) after an earlier pass
  over-decorated it with icon tiles on every card
- `SiteHeader` (mega menu + mobile menu), `SiteFooter`, `StickyMobileCTA`
- Shared content/conversion components (cards, CTA sections, ownership
  split, comparison table, revenue loop diagram, stat strip)
- Two reusable page templates — `SimpleInfraPage` (platform capability,
  solution, and revenue lane detail pages) and `IndustryPageTemplate`
  (all 13 industry pages) — so new pages stay visually consistent
- Home, Revenue Infrastructure, Platform (+6 capability pages), Solutions
  (+8), Revenue Lanes (+4), Industries (+13), How It Works, Why Omnikom,
  Financial Services Infrastructure partnership page, About, Partnerships,
  Careers, Contact, Case Studies (empty state), Insights, Resources
  (+ FAQ library), Compliance, Consultation (working Server Action + Zod
  validation), Privacy/Terms/Cookies (scaffolds flagged for legal review)

Not yet built: `/careers` has no real job board/ATS integration, no CMS
is wired up (see below), and the legal pages are scaffolds, not reviewed
text.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Notes for the next contributor

- `src/lib/crm/submitConsultation.ts` currently only logs the submission
  server-side. Wire it to the real CRM before launch (doc 03 §20.4-20.6).
- No CMS is wired up yet — page copy lives directly in each page file as
  typed constants, sourced from doc 02. Swap in Sanity/Payload per the
  CMS content model in doc 03 §18 when ready.
- `src/app/sitemap.ts` only lists the routes that exist so far — extend it
  as more pages are added.
