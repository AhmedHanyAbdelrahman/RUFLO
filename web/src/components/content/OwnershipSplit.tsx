import { Icon } from "@/components/ui/Icon";

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
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-[16px] border border-lime bg-ink-card p-6 md:p-8">
        <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-lime">
          {omnikomLabel}
        </h3>
        <ul className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
          {omnikomOwns.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-white">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-[16px] border border-border bg-ink-card p-6 md:p-8">
        <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
          {clientLabel}
        </h3>
        <ul className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
          {clientOwns.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-gray-300">
              <Icon name="x" className="mt-0.5 h-4 w-4 shrink-0 text-gray-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
