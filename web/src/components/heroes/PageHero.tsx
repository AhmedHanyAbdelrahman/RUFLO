import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
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
  accentIcons?: IconName[];
}

export function PageHero({
  eyebrow,
  heading,
  body,
  primaryCta,
  secondaryCta,
  theme = "black",
  accentIcons,
}: PageHeroProps) {
  return (
    <section
      className={`border-b border-border ${theme === "blue" ? "bg-blue" : "bg-ink"}`}
    >
      <div className="container-page grid min-h-[420px] items-center gap-10 py-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col gap-6">
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
        {accentIcons && accentIcons.length > 0 ? (
          <div
            aria-hidden="true"
            className="hidden grid-cols-3 gap-4 lg:grid"
          >
            {accentIcons.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className={`flex items-center justify-center rounded-[16px] border p-6 ${
                  i === 4
                    ? "border-lime bg-lime text-ink"
                    : "border-border bg-ink-card text-lime"
                }`}
              >
                <Icon name={name} className="h-7 w-7" />
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
