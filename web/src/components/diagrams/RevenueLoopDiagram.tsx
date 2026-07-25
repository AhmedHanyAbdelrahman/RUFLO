const NODES = [
  "Market",
  "Data",
  "Outreach",
  "Qualification",
  "CRM",
  "Client Team",
  "Outcome",
  "Optimization",
];

const LOOP_DURATION_SECONDS = 12;

export function RevenueLoopDiagram() {
  return (
    <div role="img" aria-label={`Closed-loop revenue system: ${NODES.join(" leads to ")}, then back to Market.`}>
      <ol className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:gap-2">
        {NODES.map((node, index) => (
          <li key={node} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="loop-node whitespace-nowrap rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500"
              style={{
                animationDelay: `${(index * LOOP_DURATION_SECONDS) / NODES.length}s`,
              }}
            >
              {node}
            </span>
            {index < NODES.length - 1 ? (
              <span aria-hidden="true" className="text-gray-700">
                →
              </span>
            ) : (
              <span aria-hidden="true" className="text-gray-700 md:hidden">
                ↻ Market
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
