import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/heroes/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";
import { CapabilityCard } from "@/components/content/CapabilityCard";
import { PrimaryCTASection } from "@/components/conversion/PrimaryCTASection";

export const metadata: Metadata = pageMetadata({
  title: "Revenue Infrastructure Solutions",
  description: "Acquire customers, reactivate databases, qualify opportunities, improve speed-to-lead, operate departments, and expand across markets.",
  path: "/solutions",
});

const SOLUTIONS = [
  { title: "acquire", description: "New qualified opportunities from target markets.", href: "/solutions/acquire" },
  { title: "reactivate", description: "Recover value from dormant customers and past leads.", href: "/solutions/reactivate" },
  { title: "qualify and route", description: "Structured opportunities delivered to the right team.", href: "/solutions/qualify-route" },
  { title: "speed-to-lead", description: "Respond while commercial intent is still active.", href: "/solutions/speed-to-lead" },
  { title: "nurture and recover", description: "Callbacks, no-shows, and future-timeline follow-up.", href: "/solutions/nurture-recovery" },
  { title: "operate departments", description: "Complete revenue, support, or back-office functions.", href: "/solutions/managed-departments" },
  { title: "multi-market expansion", description: "Deploy across territories, locations, and business units.", href: "/solutions/multi-market-expansion" },
  { title: "white-label infrastructure", description: "Your brand in front. Omnikom infrastructure behind it.", href: "/solutions/white-label" },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        heading="infrastructure built around the commercial objective."
        body="Start with the business outcome. Omnikom designs the data, workflow, workforce, qualification, routing, and reporting around it."
      />
      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            eight ways to deploy the platform.
          </SectionHeading>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((s) => (
              <CapabilityCard key={s.href} title={s.title} description={s.description} href={s.href} />
            ))}
          </div>
        </div>
      </section>
      <PrimaryCTASection
        heading="design the solution around your objective."
        primaryCta={{ label: "Book a Revenue Infrastructure Consultation", href: "/consultation" }}
        theme="lime"
      />
    </>
  );
}
