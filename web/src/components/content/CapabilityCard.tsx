import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";

export interface CapabilityCardProps {
  title: string;
  description: string;
  icon?: IconName;
  href?: string;
  index?: string;
  theme?: "dark" | "blue" | "lime" | "light";
}

const themeStyles: Record<NonNullable<CapabilityCardProps["theme"]>, string> = {
  dark: "border-border bg-ink-card text-white hover:border-lime",
  blue: "border-blue-bright bg-blue text-white hover:bg-lime hover:text-ink hover:border-lime",
  lime: "border-lime bg-lime text-ink",
  light: "border-gray-300 bg-gray-100 text-ink",
};

const iconWrapStyles: Record<NonNullable<CapabilityCardProps["theme"]>, string> = {
  dark: "bg-ink text-lime group-hover:bg-lime group-hover:text-ink",
  blue: "bg-blue-bright text-lime",
  lime: "bg-ink text-lime",
  light: "bg-white text-blue",
};

export function CapabilityCard({
  title,
  description,
  icon,
  href,
  index,
  theme = "dark",
}: CapabilityCardProps) {
  const cardClasses = `group flex h-full flex-col gap-4 rounded-[16px] border p-6 transition-colors duration-[180ms] ease-[var(--ease-standard)] ${themeStyles[theme]}`;

  const inner = (
    <>
      <div className="flex items-center justify-between">
        {icon ? (
          <span
            className={`inline-flex h-11 w-11 items-center justify-center rounded-[10px] transition-colors duration-150 ${iconWrapStyles[theme]}`}
          >
            <Icon name={icon} className="h-5 w-5" />
          </span>
        ) : null}
        {index ? (
          <span className="text-xs font-semibold uppercase tracking-[0.14em] opacity-50">
            {index}
          </span>
        ) : null}
      </div>
      <h3 className="text-lg font-semibold lowercase">{title}</h3>
      <p className="text-sm leading-relaxed opacity-80">{description}</p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cardClasses}>
        {inner}
        <span className="mt-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
          Learn more
          <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">
            →
          </span>
        </span>
      </Link>
    );
  }

  return <div className={cardClasses}>{inner}</div>;
}
