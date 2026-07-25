export interface OwnershipSplitProps {
  omnikomOwns: string[];
  clientOwns: string[];
  omnikomLabel?: string;
  clientLabel?: string;
}

export function OwnershipSplit({
  omnikomOwns,
  clientOwns,
  omnikomLabel = "Omnikom Owns",
  clientLabel = "Client Owns",
}: OwnershipSplitProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-[16px] border border-lime bg-ink-card p-6">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-lime">
          {omnikomLabel}
        </h3>
        <ul className="flex flex-col gap-2 text-sm text-gray-300">
          {omnikomOwns.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true" className="text-lime">
                —
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-[16px] border border-border bg-ink-card p-6">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
          {clientLabel}
        </h3>
        <ul className="flex flex-col gap-2 text-sm text-gray-300">
          {clientOwns.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true" className="text-gray-500">
                —
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
