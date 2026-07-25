import { PageHero } from "@/components/heroes/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";
import { PrimaryCTASection } from "@/components/conversion/PrimaryCTASection";
import type { CTA } from "@/types/cta";

export interface ListSection {
  heading: string;
  items: string[];
}

export interface SimpleInfraPageProps {
  eyebrow?: string;
  heading: string;
  body: string;
  heroCta?: CTA;
  listSections?: ListSection[];
  boundary?: string;
  ctaHeading: string;
  ctaLabel: string;
  ctaHref?: string;
}

export function SimpleInfraPage({
  eyebrow,
  heading,
  body,
  heroCta,
  listSections,
  boundary,
  ctaHeading,
  ctaLabel,
  ctaHref = "/consultation",
}: SimpleInfraPageProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} heading={heading} body={body} primaryCta={heroCta} />

      {listSections?.map((section, i) => (
        <section
          key={section.heading}
          className={`border-b border-border ${i % 2 === 1 ? "bg-blue" : "bg-ink"}`}
        >
          <div className="container-page py-20 md:py-24">
            <SectionHeading className="max-w-2xl lowercase">
              {section.heading}
            </SectionHeading>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <li
                  key={item}
                  className={`rounded-[12px] border px-5 py-4 text-sm ${
                    i % 2 === 1
                      ? "border-blue-bright bg-blue-bright/40 text-gray-100"
                      : "border-border bg-ink-card text-gray-300"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {boundary ? (
        <section className="border-b border-border bg-ink">
          <div className="container-page py-14">
            <p className="max-w-2xl rounded-[12px] border border-warning/40 bg-ink-card px-6 py-5 text-sm leading-relaxed text-gray-300">
              {boundary}
            </p>
          </div>
        </section>
      ) : null}

      <PrimaryCTASection heading={ctaHeading} primaryCta={{ label: ctaLabel, href: ctaHref }} theme="lime" />
    </>
  );
}
