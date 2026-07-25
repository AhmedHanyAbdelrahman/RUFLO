import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/content/SectionHeading";
import type { CTA } from "@/types/cta";

export interface PrimaryCTASectionProps {
  heading: string;
  body?: string;
  primaryCta: CTA;
  secondaryCta?: CTA;
  microcopy?: string;
  theme?: "lime" | "black" | "blue";
}

const themeStyles: Record<NonNullable<PrimaryCTASectionProps["theme"]>, string> = {
  lime: "bg-lime text-ink",
  black: "bg-ink text-white",
  blue: "bg-blue text-white",
};

export function PrimaryCTASection({
  heading,
  body,
  primaryCta,
  secondaryCta,
  microcopy,
  theme = "lime",
}: PrimaryCTASectionProps) {
  const isLight = theme === "lime";
  return (
    <section className={themeStyles[theme]}>
      <div className="container-page flex flex-col items-start gap-6 py-24 md:py-32">
        <SectionHeading
          className={`max-w-3xl lowercase ${isLight ? "text-ink" : ""}`}
        >
          {heading}
        </SectionHeading>
        {body ? (
          <p
            className={`max-w-2xl text-lg leading-relaxed ${
              isLight ? "text-ink/80" : "text-gray-300"
            }`}
          >
            {body}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Button
            {...primaryCta}
            style={isLight ? "secondary" : "primary"}
            className={
              isLight
                ? "!border-ink !text-ink hover:!bg-ink hover:!text-lime"
                : ""
            }
          />
          {secondaryCta ? (
            <Button
              {...secondaryCta}
              style="text"
              className={isLight ? "!text-ink" : ""}
            />
          ) : null}
        </div>
        {microcopy ? (
          <p
            className={`text-xs uppercase tracking-wide ${
              isLight ? "text-ink/60" : "text-gray-500"
            }`}
          >
            {microcopy}
          </p>
        ) : null}
      </div>
    </section>
  );
}
