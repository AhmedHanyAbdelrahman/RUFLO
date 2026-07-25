export interface Stat {
  value: string;
  label: string;
}

export function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label}>
          <dt className="text-3xl font-bold text-lime md:text-4xl">{stat.value}</dt>
          <dd className="mt-1 text-xs uppercase tracking-wide text-gray-500">
            {stat.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
