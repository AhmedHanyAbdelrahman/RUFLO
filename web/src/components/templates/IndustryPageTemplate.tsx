import { PageHero } from "@/components/heroes/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";
import { OwnershipSplit } from "@/components/content/OwnershipSplit";
import { PrimaryCTASection } from "@/components/conversion/PrimaryCTASection";

export interface IndustryPageTemplateProps {
  eyebrow?: string;
  heading: string;
  heroBody: string;
  problem?: string;
  revenueLanes: string[];
  qualifiedOpportunity?: string;
  omnikomOperates?: string[];
  clientOwns?: string[];
  boundary?: string;
  partnerLine?: string;
  ctaLabel: string;
}

export function IndustryPageTemplate({
  eyebrow = "industry infrastructure",
  heading,
  heroBody,
  problem,
  revenueLanes,
  qualifiedOpportunity,
  omnikomOperates,
  clientOwns,
  boundary,
  partnerLine,
  ctaLabel,
}: IndustryPageTemplateProps) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        heading={heading}
        body={heroBody}
        primaryCta={{ label: ctaLabel, href: "/consultation" }}
      />

      {problem ? (
        <section className="border-b border-border bg-ink">
          <div className="container-page py-16">
            <p className="max-w-2xl text-lg leading-relaxed text-gray-300">
              {problem}
            </p>
          </div>
        </section>
      ) : null}

      <section className="border-b border-border bg-blue">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            revenue lanes for this industry.
          </SectionHeading>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {revenueLanes.map((lane) => (
              <li
                key={lane}
                className="rounded-[12px] border border-blue-bright bg-blue-bright/40 px-5 py-4 text-sm text-gray-100"
              >
                {lane}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {qualifiedOpportunity ? (
        <section className="border-b border-border bg-ink">
          <div className="container-page py-20 md:py-24">
            <SectionHeading className="max-w-2xl lowercase">
              what counts as a qualified opportunity.
            </SectionHeading>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
              {qualifiedOpportunity}
            </p>
          </div>
        </section>
      ) : null}

      {omnikomOperates && clientOwns ? (
        <section className="border-b border-border bg-ink">
          <div className="container-page py-20 md:py-24">
            <SectionHeading className="max-w-2xl lowercase">
              clear ownership creates better execution.
            </SectionHeading>
            <div className="mt-10">
              <OwnershipSplit omnikomOwns={omnikomOperates} clientOwns={clientOwns} />
            </div>
          </div>
        </section>
      ) : null}

      {partnerLine ? (
        <section className="border-b border-border bg-ink">
          <div className="container-page py-10">
            <p className="max-w-2xl text-sm leading-relaxed text-gray-400">
              {partnerLine}
            </p>
          </div>
        </section>
      ) : null}

      {boundary ? (
        <section className="border-b border-border bg-ink">
          <div className="container-page py-10">
            <p className="max-w-2xl rounded-[12px] border border-warning/40 bg-ink-card px-6 py-5 text-sm leading-relaxed text-gray-300">
              {boundary}
            </p>
          </div>
        </section>
      ) : null}

      <PrimaryCTASection heading={ctaLabel.toLowerCase()} primaryCta={{ label: ctaLabel, href: "/consultation" }} theme="lime" />
    </>
  );
}
