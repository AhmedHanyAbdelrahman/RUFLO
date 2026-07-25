# Omnikom Website

Next.js implementation of the Omnikom marketing site. Built from the
developer handoff package in `../omnikom_developer_handoff/` and the
synthesized build guide at `../OMNIKOM_WEBSITE_BUILD_GUIDE.md` — read those
first for the business context, copy source, and design system rationale.

## Status

Phase 1 (foundation) and part of Phase 3 (core pages) from the build guide
are implemented:

- Design tokens, fonts (Sora/Inter), global styles matching the
  "Sharp & Systematic" system
- `SiteHeader` (mega menu + mobile menu), `SiteFooter`
- Shared content/conversion components (cards, CTA sections, ownership
  split, comparison table, revenue loop diagram)
- Pages: Home, Revenue Infrastructure, How It Works, Why Omnikom,
  Consultation (with a working Server Action + Zod validation)

Everything else in the sitemap (`Platform` capability pages, `Solutions`,
`Revenue Lanes`, `Industries`, `About`, `Partnerships`, `Case Studies`,
legal pages, etc.) still needs to be built following the same patterns —
see the build guide's Phase 3-5 breakdown.

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
