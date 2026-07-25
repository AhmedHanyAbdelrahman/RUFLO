import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/heroes/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";
import { ComparisonTable } from "@/components/content/ComparisonTable";
import { PrimaryCTASection } from "@/components/conversion/PrimaryCTASection";

export const metadata: Metadata = pageMetadata({
  title: "Why Omnikom | Infrastructure Instead of Fragmented Outbound",
  description: "Omnikom does not sell one disconnected component. It operates the complete lane.",
  path: "/why-omnikom",
});

const ROWS = [
  { model: "Freelancer / VA", sells: "Labor", clientManages: "Data, scripts, training, QA, CRM, reporting" },
  { model: "Call center", sells: "Hours and headcount", clientManages: "Strategy, qualification, routing, conversion feedback" },
  { model: "Lead vendor", sells: "Contact records", clientManages: "Follow-up, duplicates, qualification, attribution" },
  { model: "Software", sells: "Tools", clientManages: "All execution and management" },
  { model: "Traditional agency", sells: "Campaign activity", clientManages: "Operational handoff and internal follow-through" },
  { model: "Omnikom", sells: "Revenue Infrastructure", clientManages: "Sales conversion, regulated activity, and fulfillment", highlight: true },
];

const DIFFERENTIATORS = [
  "Infrastructure-first model",
  "One system from data to handoff",
  "Industry-specific qualification",
  "Proprietary AI and workflow engineering",
  "Global workforce infrastructure",
  "Source attribution",
  "Modular expansion",
  "White-label capability",
  "Multi-market governance",
];

export default function WhyOmnikomPage() {
  return (
    <>
      <PageHero
        heading="the difference is the system."
        body="Omnikom does not sell one disconnected component. It operates the complete lane."
      />

      <section className="border-b border-border bg-ink">
        <div className="container-page py-24">
          <ComparisonTable rows={ROWS} />
        </div>
      </section>

      <section className="border-b border-border bg-ink">
        <div className="container-page py-24">
          <SectionHeading className="max-w-2xl lowercase">
            what makes the difference.
          </SectionHeading>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIATORS.map((item) => (
              <li key={item} className="rounded-[12px] border border-border bg-ink-card px-5 py-4 text-sm text-gray-300">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PrimaryCTASection
        heading="see whether omnikom fits your growth model."
        primaryCta={{ label: "See Whether Omnikom Fits Your Growth Model", href: "/consultation" }}
        theme="lime"
      />
    </>
  );
}
