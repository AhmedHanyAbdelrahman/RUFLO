import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/heroes/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Omnikom collects, uses, and protects information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero heading="privacy policy." />
      <section className="border-b border-border bg-ink">
        <div className="container-page max-w-3xl py-20 md:py-24">
          <p className="mb-10 rounded-[12px] border border-warning/40 bg-ink-card px-5 py-4 text-sm text-gray-300">
            Placeholder scaffold — this page needs review and finalization by
            counsel before launch. It is not yet a binding privacy policy.
          </p>
          <div className="space-y-8 text-gray-300">
            <div>
              <SectionHeading as="h2" size="h3" className="mb-2 text-white">Information we collect</SectionHeading>
              <p className="text-sm leading-relaxed">
                Contact and company details submitted through consultation and
                inquiry forms, plus standard site analytics (page views,
                referrer, device type).
              </p>
            </div>
            <div>
              <SectionHeading as="h2" size="h3" className="mb-2 text-white">How we use it</SectionHeading>
              <p className="text-sm leading-relaxed">
                To respond to inquiries, assess fit for a Revenue Lane, operate
                any engaged services, and improve this website.
              </p>
            </div>
            <div>
              <SectionHeading as="h2" size="h3" className="mb-2 text-white">Data retention and deletion</SectionHeading>
              <p className="text-sm leading-relaxed">
                Submission and CRM records are retained for as long as needed
                to support an active or prospective engagement. Contact
                info@omnikom.com to request access, correction, or deletion.
              </p>
            </div>
            <div>
              <SectionHeading as="h2" size="h3" className="mb-2 text-white">Third parties</SectionHeading>
              <p className="text-sm leading-relaxed">
                We use analytics, CRM, and email-delivery providers to operate
                this site and respond to inquiries. We do not sell personal
                information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
