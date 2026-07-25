import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/heroes/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";
import { RevenueLaneCard } from "@/components/content/RevenueLaneCard";
import { PrimaryCTASection } from "@/components/conversion/PrimaryCTASection";

export const metadata: Metadata = pageMetadata({
  title: "Revenue Lanes",
  description: "Every growth objective needs its own lane.",
  path: "/revenue-lanes",
});

const LANES = [
  { stage: "stage 1", name: "validate", objective: "Test one market or thesis with controlled infrastructure.", href: "/revenue-lanes/validation" },
  { stage: "stage 2", name: "grow", objective: "Consistent weekly opportunity flow around a proven offer.", href: "/revenue-lanes/growth" },
  { stage: "stage 3", name: "expand", objective: "Add markets, locations, ICPs, and service lines.", href: "/revenue-lanes/expansion" },
  { stage: "stage 4", name: "enterprise", objective: "Governed, multi-lane infrastructure across the organization.", href: "/revenue-lanes/enterprise" },
];

export default function RevenueLanesPage() {
  return (
    <>
      <PageHero
        heading="every growth objective needs its own lane."
        body="A Revenue Lane is a complete operating system configured around one audience, objective, workflow, qualification framework, and handoff."
      />
      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            four stages of maturity.
          </SectionHeading>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LANES.map((lane) => (
              <RevenueLaneCard key={lane.href} {...lane} />
            ))}
          </div>
          <p className="mt-10 max-w-xl text-sm text-gray-300">
            Pricing is designed after the business model and required
            capacity are understood — no fixed public packages.
          </p>
        </div>
      </section>
      <PrimaryCTASection
        heading="find the lane that fits your business."
        primaryCta={{ label: "Book a Revenue Infrastructure Consultation", href: "/consultation" }}
        theme="lime"
      />
    </>
  );
}
