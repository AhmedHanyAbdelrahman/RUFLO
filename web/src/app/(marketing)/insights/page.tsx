import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/heroes/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description: "Revenue Infrastructure thinking, frameworks, and playbooks.",
  path: "/insights",
});

const PILLAR_ARTICLES = [
  "What Is Revenue Infrastructure?",
  "Why Hiring Callers Is Not an Outbound Strategy",
  "How to Build a Revenue Acquisition Lane",
  "Revenue Infrastructure vs. Lead Generation",
  "How to Calculate Whether Outbound Fits Your Economics",
  "The Revenue Lane Framework",
  "How Database Reactivation Creates Revenue",
  "How Multi-Location Companies Scale Outbound",
  "How to Define a Qualified Opportunity",
  "The Role of AI in Revenue Infrastructure",
  "How Opportunity Routing Improves Conversion",
  "Why CRM Discipline Determines Outbound ROI",
  "How to Choose Between Internal SDRs and Managed Infrastructure",
  "What a 90-Day Outbound Calibration Period Should Include",
  "Revenue Infrastructure for Financial Services",
];

export default function InsightsPage() {
  return (
    <>
      <PageHero
        heading="revenue infrastructure thinking, not generic growth advice."
        body="Frameworks and playbooks on data, qualification, routing, AI, and multi-market expansion. Articles are in production."
      />
      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            coming soon.
          </SectionHeading>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PILLAR_ARTICLES.map((title) => (
              <li key={title} className="rounded-[12px] border border-border bg-ink-card px-5 py-4 text-sm text-gray-300">
                {title}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
