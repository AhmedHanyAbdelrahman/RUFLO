import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/heroes/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description: "Join the team building Revenue Infrastructure.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        heading="help companies operate growth like infrastructure."
        body="Omnikom builds and operates Revenue Lanes across strategy, data, outreach, qualification, CRM, AI, and workforce. We're looking for people who think in systems."
      />
      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            no open roles listed right now.
          </SectionHeading>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
            We are not actively advertising positions here yet. If you want to
            reach out about revenue operations, data, AI/automation
            engineering, or workforce leadership roles, send us a note and
            we&rsquo;ll follow up when there&rsquo;s a fit.
          </p>
          <div className="mt-8">
            <Button label="Contact Omnikom" href="/contact" style="secondary" />
          </div>
        </div>
      </section>
    </>
  );
}
