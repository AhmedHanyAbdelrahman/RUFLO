import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";

export interface IndustryCardProps {
  name: string;
  problem: string;
  href: string;
  icon: IconName;
}

export function IndustryCard({ name, problem, href, icon }: IndustryCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col gap-3 rounded-[16px] border border-border bg-ink-card p-6 transition-colors duration-[180ms] ease-[var(--ease-standard)] hover:border-lime"
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] bg-ink text-lime transition-colors duration-150 group-hover:bg-lime group-hover:text-ink">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <h3 className="text-lg font-semibold lowercase text-white">{name}</h3>
      <p className="text-sm leading-relaxed text-gray-300">{problem}</p>
      <span className="mt-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-lime">
        Explore
        <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}
