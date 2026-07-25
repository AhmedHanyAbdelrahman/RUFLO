import Link from "next/link";

export interface RevenueLaneCardProps {
  stage: string;
  name: string;
  objective: string;
  bestFor?: string[];
  href: string;
}

export function RevenueLaneCard({
  stage,
  name,
  objective,
  bestFor,
  href,
}: RevenueLaneCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col gap-4 rounded-[16px] border border-blue-bright bg-blue p-6 text-white transition-colors duration-[180ms] ease-[var(--ease-standard)] hover:bg-lime hover:text-ink"
    >
      <span className="text-xs font-semibold uppercase tracking-[0.14em] opacity-70">
        {stage}
      </span>
      <h3 className="text-xl font-semibold lowercase">{name}</h3>
      <p className="text-sm leading-relaxed opacity-90">{objective}</p>
      {bestFor && bestFor.length > 0 ? (
        <ul className="mt-auto flex flex-col gap-1 text-xs opacity-80">
          {bestFor.map((item) => (
            <li key={item}>— {item}</li>
          ))}
        </ul>
      ) : null}
    </Link>
  );
}
