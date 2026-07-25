import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/heroes/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: "Terms governing use of the Omnikom website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero heading="terms of use." />
      <section className="border-b border-border bg-ink">
        <div className="container-page max-w-3xl py-20 md:py-24">
          <p className="mb-10 rounded-[12px] border border-warning/40 bg-ink-card px-5 py-4 text-sm text-gray-300">
            Placeholder scaffold — this page needs review and finalization by
            counsel before launch. It is not yet binding terms.
          </p>
          <div className="space-y-8 text-gray-300">
            <div>
              <SectionHeading as="h2" size="h3" className="mb-2 text-white">Website use</SectionHeading>
              <p className="text-sm leading-relaxed">
                This site describes Omnikom&rsquo;s Revenue Infrastructure
                platform for informational purposes. Nothing on this site
                constitutes a binding offer, guarantee, or professional advice.
              </p>
            </div>
            <div>
              <SectionHeading as="h2" size="h3" className="mb-2 text-white">No guarantees</SectionHeading>
              <p className="text-sm leading-relaxed">
                Omnikom does not guarantee revenue, closed deals, signed
                contracts, policies, cases, or commissions. Engagement terms
                are governed by a separate signed agreement.
              </p>
            </div>
            <div>
              <SectionHeading as="h2" size="h3" className="mb-2 text-white">Intellectual property</SectionHeading>
              <p className="text-sm leading-relaxed">
                All content, trademarks, and the Omnikom name and logo are the
                property of Omnikom and may not be used without permission.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
