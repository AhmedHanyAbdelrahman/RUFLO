import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/heroes/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description: "How Omnikom uses cookies and similar technologies.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <>
      <PageHero heading="cookie policy." />
      <section className="border-b border-border bg-ink">
        <div className="container-page max-w-3xl py-20 md:py-24">
          <p className="mb-10 rounded-[12px] border border-warning/40 bg-ink-card px-5 py-4 text-sm text-gray-300">
            Placeholder scaffold — this page needs review and finalization by
            counsel before launch.
          </p>
          <div className="space-y-8 text-gray-300">
            <div>
              <SectionHeading as="h2" size="h3" className="mb-2 text-white">Essential cookies</SectionHeading>
              <p className="text-sm leading-relaxed">
                Required for the site to function — session state, security,
                and load balancing.
              </p>
            </div>
            <div>
              <SectionHeading as="h2" size="h3" className="mb-2 text-white">Analytics cookies</SectionHeading>
              <p className="text-sm leading-relaxed">
                Used to understand aggregate site usage (page views, referrer,
                device type) so we can improve content and performance.
                Non-essential trackers are not loaded until consent is given
                where required.
              </p>
            </div>
            <div>
              <SectionHeading as="h2" size="h3" className="mb-2 text-white">Managing cookies</SectionHeading>
              <p className="text-sm leading-relaxed">
                Most browsers let you block or delete cookies through their
                settings. Blocking essential cookies may affect site
                functionality.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
