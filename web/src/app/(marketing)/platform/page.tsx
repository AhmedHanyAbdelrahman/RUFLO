import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/heroes/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";
import { PrimaryCTASection } from "@/components/conversion/PrimaryCTASection";

export const metadata: Metadata = pageMetadata({
  title: "Omnikom Platform | Data, Outreach, AI, Workforce, and Revenue Intelligence",
  description: "Explore the operating layers that power every Omnikom Revenue Lane.",
  path: "/platform",
});

const LAYERS = [
  { name: "market strategy", href: "/revenue-infrastructure" },
  { name: "data infrastructure", href: "/data-infrastructure" },
  { name: "outreach operations", href: "/outreach-operations" },
  { name: "qualification and routing", href: "/qualification-routing" },
  { name: "ai and automation", href: "/ai-automation" },
  { name: "qa and governance", href: "/revenue-infrastructure" },
  { name: "revenue intelligence", href: "/revenue-intelligence" },
  { name: "workforce infrastructure", href: "/workforce-infrastructure" },
];

export default function PlatformPage() {
  return (
    <>
      <PageHero
        heading="one platform. every operating layer."
        body="Omnikom brings strategy, data, outreach, qualification, CRM, AI, QA, reporting, and workforce into one connected system."
        primaryCta={{ label: "Explore Revenue Lanes", href: "/revenue-lanes" }}
      />

      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            every layer has one job. the platform makes them work together.
          </SectionHeading>
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {LAYERS.map((layer, index) => (
              <li key={layer.name}>
                <Link
                  href={layer.href}
                  className="group flex h-full flex-col gap-2 rounded-[14px] border border-border bg-ink-card p-5 transition-colors duration-150 hover:border-lime"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold lowercase text-white">
                    {layer.name}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <PrimaryCTASection
        heading="see the platform mapped to your business."
        primaryCta={{ label: "Book a Revenue Infrastructure Consultation", href: "/consultation" }}
        theme="lime"
      />
    </>
  );
}
