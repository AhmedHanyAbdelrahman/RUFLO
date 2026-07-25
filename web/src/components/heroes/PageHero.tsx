import { Button } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/content/SectionEyebrow";
import { SectionHeading } from "@/components/content/SectionHeading";
import type { CTA } from "@/types/cta";

export interface PageHeroProps {
  eyebrow?: string;
  heading: string;
  body?: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  theme?: "black" | "blue";
}

export function PageHero({
  eyebrow,
  heading,
  body,
  primaryCta,
  secondaryCta,
  theme = "black",
}: PageHeroProps) {
  return (
    <section
      className={`border-b border-border ${theme === "blue" ? "bg-blue" : "bg-ink"}`}
    >
      <div className="container-page flex min-h-[440px] flex-col justify-center gap-6 py-24">
        {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
        <SectionHeading as="h1" size="h1" className="max-w-3xl lowercase">
          {heading}
        </SectionHeading>
        {body ? (
          <p className="max-w-2xl text-lg leading-relaxed text-gray-300">
            {body}
          </p>
        ) : null}
        {primaryCta || secondaryCta ? (
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {primaryCta ? <Button {...primaryCta} style="primary" /> : null}
            {secondaryCta ? (
              <Button {...secondaryCta} style="secondary" />
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
