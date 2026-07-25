import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/heroes/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";
import { PrimaryCTASection } from "@/components/conversion/PrimaryCTASection";

export const metadata: Metadata = pageMetadata({
  title: "How Omnikom Works | Revenue Infrastructure Deployment",
  description:
    "Omnikom assesses the business, architects the lane, builds the workflow, launches controlled operations, calibrates performance, and expands what works.",
  path: "/how-it-works",
});

const STEPS = [
  {
    number: "01",
    name: "Assess",
    headline: "understand the economics before building the lane.",
    body: "Inputs: average customer value, gross margin, close rate, sales capacity, target market, existing data, CRM, compliance constraints, and current acquisition channels.",
    output: "Revenue Infrastructure Assessment",
  },
  {
    number: "02",
    name: "Architect",
    headline: "design the lane around the objective.",
    body: "Inputs: objective, ICP, market, data model, qualification, routing, SLA, and reporting.",
    output: "Revenue Lane Blueprint",
  },
  {
    number: "03",
    name: "Build",
    headline: "assemble the operating components.",
    body: "Deliverables: data pipeline, scripts, CRM fields, routing rules, AI prompts, QA scorecards, reporting dashboard, and SOPs.",
    output: null,
  },
  {
    number: "04",
    name: "Launch",
    headline: "start with controlled volume.",
    body: "Controlled volume, daily QA, rapid feedback, and close client coordination.",
    output: null,
  },
  {
    number: "05",
    name: "Calibrate",
    headline: "improve what the data shows.",
    body: "Improve data accuracy, contact windows, messaging, qualification, handoff, and client response.",
    output: null,
  },
  {
    number: "06",
    name: "Operate",
    headline: "run the managed operation.",
    body: "Daily production, QA, reporting, nurture, client success, and continuous optimization.",
    output: null,
  },
  {
    number: "07",
    name: "Expand",
    headline: "grow once the lane proves fit.",
    body: "Add markets, ICPs, locations, service lines, databases, and departments once the lane proves operational fit.",
    output: null,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        heading="from commercial objective to operating system."
        body="Omnikom assesses the business, architects the lane, builds the workflow, launches controlled operations, calibrates performance, and expands what works."
        primaryCta={{ label: "Start with an Infrastructure Assessment", href: "/consultation" }}
        accentIcons={["target", "layers", "cpu", "zap", "refresh", "expand"]}
      />

      <section className="bg-ink">
        <div className="container-page divide-y divide-border py-24">
          {STEPS.map((step) => (
            <div key={step.number} className="grid gap-6 py-12 md:grid-cols-[120px_1fr] md:gap-12">
              <span className="text-5xl font-bold text-lime">{step.number}</span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                  {step.name}
                </p>
                <SectionHeading as="h2" size="h3" className="mt-2 max-w-2xl lowercase">
                  {step.headline}
                </SectionHeading>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300">
                  {step.body}
                </p>
                {step.output ? (
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-lime px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-lime">
                    Output: {step.output}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      <PrimaryCTASection
        heading="start with an infrastructure assessment."
        primaryCta={{ label: "Start with an Infrastructure Assessment", href: "/consultation" }}
        theme="lime"
      />
    </>
  );
}
