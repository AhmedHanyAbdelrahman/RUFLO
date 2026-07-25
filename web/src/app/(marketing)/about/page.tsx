import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/heroes/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";
import { PrimaryCTASection } from "@/components/conversion/PrimaryCTASection";

export const metadata: Metadata = pageMetadata({
  title: "About Omnikom | Building Revenue Infrastructure",
  description: "Built to make growth operate like infrastructure.",
  path: "/about",
});

const VALUES = ["Precision", "Accountability", "Momentum", "Transparency", "Systems thinking", "Continuous improvement", "Operational ownership", "Partnership"];

export default function AboutPage() {
  return (
    <>
      <PageHero heading="built to make growth operate like infrastructure." />

      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading as="h2" size="h3" className="mb-4 lowercase">
                our story.
              </SectionHeading>
              <p className="text-lg leading-relaxed text-gray-300">
                Omnikom was built after seeing companies repeatedly assemble the
                same acquisition function from scratch. They hired people,
                purchased data, bought software, created scripts, managed
                vendors, rebuilt teams, and still struggled with inconsistent
                opportunity flow. Omnikom was created to replace that
                fragmentation with one operating system.
              </p>
            </div>
            <div>
              <SectionHeading as="h2" size="h3" className="mb-4 lowercase">
                mission and vision.
              </SectionHeading>
              <p className="text-lg leading-relaxed text-gray-300">
                To become the Revenue Infrastructure layer companies use to
                create, manage, and scale qualified commercial opportunities —
                a future where companies do not rebuild outbound departments
                every time they enter a market, launch a service, or expand a
                team.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-blue">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            values.
          </SectionHeading>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <li key={value} className="rounded-[12px] border border-blue-bright bg-blue-bright/40 px-5 py-4 text-sm text-gray-100">
                {value}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            built by an operator, not assembled as an agency.
          </SectionHeading>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
            Ahmed Hany built Omnikom around a simple operating question: why
            should every company rebuild the same acquisition department from
            scratch? His work across sales, business development, data,
            outbound operations, AI workflows, workforce systems, and
            multi-industry growth shaped Omnikom into an infrastructure-first
            company.
          </p>
        </div>
      </section>

      <PrimaryCTASection
        heading="explore the omnikom platform."
        primaryCta={{ label: "Explore the Platform", href: "/platform" }}
        theme="lime"
      />
    </>
  );
}
