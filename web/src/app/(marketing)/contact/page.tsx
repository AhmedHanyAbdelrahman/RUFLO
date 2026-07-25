import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/heroes/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Start the right conversation.",
  path: "/contact",
});

const OPTIONS = [
  { title: "Revenue Infrastructure Consultation", description: "The primary conversion — a working session on your economics, market, and objective.", href: "/consultation" },
  { title: "Strategic Partnership", description: "Industry, white-label, channel, delivery, technology, or portfolio partnerships.", href: "/partnerships" },
  { title: "Existing Client Support", description: "Already working with Omnikom and need help with your lane?", href: "mailto:support@omnikom.com" },
  { title: "Careers", description: "Interested in joining the team.", href: "/careers" },
  { title: "Media and Speaking", description: "Press, interviews, and speaking requests.", href: "mailto:press@omnikom.com" },
  { title: "General Inquiry", description: "Anything else.", href: "mailto:info@omnikom.com" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero heading="start the right conversation." />
      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            how can we help?
          </SectionHeading>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OPTIONS.map((option) => (
              <div key={option.title} className="flex h-full flex-col gap-3 rounded-[16px] border border-border bg-ink-card p-6">
                <h3 className="text-lg font-semibold text-white">{option.title}</h3>
                <p className="text-sm leading-relaxed text-gray-300">{option.description}</p>
                <div className="mt-auto pt-2">
                  <Button label="Send an Inquiry" href={option.href} style="text" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
