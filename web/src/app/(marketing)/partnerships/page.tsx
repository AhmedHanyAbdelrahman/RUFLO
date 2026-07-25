import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/heroes/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";
import { CapabilityCard } from "@/components/content/CapabilityCard";
import { PrimaryCTASection } from "@/components/conversion/PrimaryCTASection";

export const metadata: Metadata = pageMetadata({
  title: "Strategic Partnerships",
  description: "Infrastructure built to plug into serious operators.",
  path: "/partnerships",
});

const MODELS = [
  { title: "strategic industry partnership", description: "Create an industry-specific Omnikom infrastructure business unit." },
  { title: "white label", description: "Offer Omnikom infrastructure under the partner's brand." },
  { title: "channel partnership", description: "Introduce qualified clients under a defined commercial model." },
  { title: "delivery partnership", description: "Add approved workforce or geographic capacity under Omnikom standards." },
  { title: "technology partnership", description: "Integrate data, CRM, communication, workflow, or analytics systems." },
  { title: "portfolio deployment", description: "Deploy Revenue Infrastructure across multiple companies or locations." },
];

export default function PartnershipsPage() {
  return (
    <>
      <PageHero
        heading="infrastructure built to plug into serious operators."
        body="Omnikom partners with industry leaders, agencies, platforms, recruiters, technology providers, portfolio operators, and distribution networks."
      />

      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            partnership models.
          </SectionHeading>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODELS.map((m) => (
              <CapabilityCard key={m.title} title={m.title} description={m.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-blue">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            financial-services infrastructure, strengthened by strategic industry partnership.
          </SectionHeading>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-100">
            Rainmaker Wealth Innovation extends Omnikom&rsquo;s Financial
            Services Infrastructure through industry relationships,
            Philippines recruitment, and talent deployment capabilities.
          </p>
          <div className="mt-8">
            <CapabilityCard
              theme="blue"
              title="explore the financial services partnership"
              description="Omnikom Financial Services Infrastructure, powered by Rainmaker Wealth Innovation."
              href="/financial-services-infrastructure"
            />
          </div>
        </div>
      </section>

      <PrimaryCTASection
        heading="discuss a strategic partnership."
        primaryCta={{ label: "Discuss a Strategic Partnership", href: "/contact" }}
        theme="lime"
      />
    </>
  );
}
