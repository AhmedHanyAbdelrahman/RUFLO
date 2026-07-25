import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/heroes/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";
import { CapabilityCard } from "@/components/content/CapabilityCard";
import { PrimaryCTASection } from "@/components/conversion/PrimaryCTASection";

export const metadata: Metadata = pageMetadata({
  title: "Revenue Infrastructure",
  description:
    "Understand how Omnikom connects strategy, data, outreach, qualification, CRM routing, AI, workforce, and reporting into one managed operating system.",
  path: "/revenue-infrastructure",
});

const FRAGMENTS = [
  "Data without segmentation",
  "Outreach without qualification",
  "Qualification without routing",
  "CRM without discipline",
  "Appointments without recovery",
  "Reporting without attribution",
  "Teams without governance",
];

const FLOW = [
  "Revenue Objective",
  "Market and ICP",
  "Data",
  "Outreach",
  "Qualification",
  "AI Summary",
  "CRM and Routing",
  "Client Team",
  "Outcome Feedback",
  "Optimization",
];

const COMPONENTS = [
  { title: "strategy", description: "Market, ICP, objective, and qualification standard." },
  { title: "data", description: "Sourced, enriched, cleaned, and segmented." },
  { title: "outreach", description: "Approved calling, response, and reactivation." },
  { title: "qualification", description: "Fit, intent, authority, timeline, next action." },
  { title: "crm and routing", description: "Structured notes, source, owner, status." },
  { title: "ai and automation", description: "Summaries, classification, and triggers." },
  { title: "qa and governance", description: "Accuracy, adherence, and standards." },
  { title: "revenue intelligence", description: "Performance and market comparisons." },
  { title: "workforce", description: "Recruited, trained, deployed, and managed." },
];

const COMPOUNDING = ["Data quality", "Script performance", "Qualification accuracy", "Client response", "Routing", "Market selection", "Follow-up", "Reporting"];

export default function RevenueInfrastructurePage() {
  return (
    <>
      <PageHero
        heading="outbound, built as infrastructure."
        body="Most outbound functions are assembled from labor, software, data, and disconnected workflows. Omnikom combines them into one managed operating layer."
        primaryCta={{ label: "Book an Infrastructure Consultation", href: "/consultation" }}
      />

      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            the problem is not one missing tool.
          </SectionHeading>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-300">
            A company can have a CRM, a dialer, callers, and managers — and
            still have no reliable acquisition system.
          </p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {FRAGMENTS.map((item) => (
              <li key={item} className="rounded-[12px] border border-border bg-ink-card px-5 py-4 text-sm text-gray-300">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border bg-blue">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            one operating system from market to opportunity.
          </SectionHeading>
          <div className="mt-10 flex flex-wrap items-center gap-2 overflow-x-auto text-sm font-semibold text-white">
            {FLOW.map((step, index) => (
              <span key={step} className="flex items-center gap-2 whitespace-nowrap">
                <span className="rounded-full border border-lime px-4 py-2">{step}</span>
                {index < FLOW.length - 1 ? <span aria-hidden="true">→</span> : null}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            the nine layers of the platform.
          </SectionHeading>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMPONENTS.map((c, index) => (
              <CapabilityCard
                key={c.title}
                index={String(index + 1).padStart(2, "0")}
                title={c.title}
                description={c.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            campaigns restart. infrastructure compounds.
          </SectionHeading>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-300">
            Every operating cycle improves the system — it gets more informed
            over time.
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {COMPOUNDING.map((item) => (
              <li key={item} className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-300">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PrimaryCTASection
        heading="build your revenue infrastructure."
        primaryCta={{ label: "Request an Infrastructure Assessment", href: "/consultation" }}
        theme="lime"
      />
    </>
  );
}
