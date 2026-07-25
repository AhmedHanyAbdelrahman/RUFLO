import Link from "next/link";

export interface IndustryCardProps {
  name: string;
  problem: string;
  href: string;
}

export function IndustryCard({ name, problem, href }: IndustryCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col gap-3 rounded-[16px] border border-border bg-ink-card p-6 transition-colors duration-[180ms] ease-[var(--ease-standard)] hover:border-lime"
    >
      <h3 className="text-lg font-semibold lowercase text-white">{name}</h3>
      <p className="text-sm leading-relaxed text-gray-300">{problem}</p>
      <span className="mt-auto inline-flex items-center gap-2 pt-2 text-xs font-semibold uppercase tracking-wide text-lime">
        Explore
        <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}
