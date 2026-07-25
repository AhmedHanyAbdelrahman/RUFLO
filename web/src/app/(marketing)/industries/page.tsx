import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/heroes/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";
import { IndustryCard } from "@/components/content/IndustryCard";
import { PrimaryCTASection } from "@/components/conversion/PrimaryCTASection";

export const metadata: Metadata = pageMetadata({
  title: "Industries",
  description: "One platform. Configured for your industry.",
  path: "/industries",
});

const INDUSTRIES = [
  { name: "real estate", problem: "Seller acquisition and investor pipelines.", href: "/industries/real-estate" },
  { name: "home services", problem: "Inspections, estimates, and reactivation.", href: "/industries/roofing-home-services" },
  { name: "hvac", problem: "Replacement, maintenance, and seasonal campaigns.", href: "/industries/hvac" },
  { name: "solar", problem: "Residential and commercial consultation infrastructure.", href: "/industries/solar" },
  { name: "automotive", problem: "Declined-service recovery and fleet outreach.", href: "/industries/automotive" },
  { name: "b2b and saas", problem: "Decision-maker meetings and account outreach.", href: "/industries/b2b-saas" },
  { name: "staffing", problem: "Employer acquisition and job orders.", href: "/industries/staffing" },
  { name: "dental and healthcare", problem: "Patient reactivation and consultations.", href: "/industries/dental-healthcare" },
  { name: "med spa and aesthetics", problem: "Past-lead reactivation and membership.", href: "/industries/med-spa" },
  { name: "legal", problem: "Consultation and intake, compliance-bound.", href: "/industries/legal" },
  { name: "financial services", problem: "Policy reviews and managed operations.", href: "/industries/financial-services" },
  { name: "education", problem: "Enrollment consultation and reactivation.", href: "/industries/education" },
  { name: "commercial services", problem: "Decision-maker meetings and projects.", href: "/industries/commercial-industrial" },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        heading="one platform. configured for your industry."
        body="Omnikom adapts each Revenue Lane to the market economics, customer journey, qualification criteria, workflow, and compliance environment of the industry."
      />
      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            find your industry infrastructure.
          </SectionHeading>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((industry) => (
              <IndustryCard key={industry.href} {...industry} />
            ))}
          </div>
        </div>
      </section>
      <PrimaryCTASection
        heading="not listed? we still may be a fit."
        primaryCta={{ label: "Book a Revenue Infrastructure Consultation", href: "/consultation" }}
        theme="lime"
      />
    </>
  );
}
