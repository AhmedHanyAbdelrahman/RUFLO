import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/heroes/PageHero";
import { PrimaryCTASection } from "@/components/conversion/PrimaryCTASection";

export const metadata: Metadata = pageMetadata({
  title: "Revenue Infrastructure Case Studies",
  description: "See the infrastructure behind the outcome.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero heading="see the infrastructure behind the outcome." />
      <section className="border-b border-border bg-ink">
        <div className="container-page py-24">
          <div className="max-w-2xl rounded-[16px] border border-border bg-ink-card p-8">
            <p className="text-lg font-semibold text-white">
              proof should explain the system—not only celebrate the result.
            </p>
            <p className="mt-4 text-base leading-relaxed text-gray-300">
              Verified infrastructure stories are being prepared. New case
              studies will be added as lane data is verified, client-approved,
              and attributable.
            </p>
          </div>
        </div>
      </section>
      <PrimaryCTASection
        heading="build the case study behind your business."
        primaryCta={{ label: "Book a Revenue Infrastructure Consultation", href: "/consultation" }}
        theme="lime"
      />
    </>
  );
}
