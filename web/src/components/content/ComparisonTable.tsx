export interface ComparisonRow {
  model: string;
  sells: string;
  clientManages: string;
  highlight?: boolean;
}

export function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  return (
    <div>
      {/* Desktop table */}
      <table className="hidden w-full border-collapse text-left md:table">
        <caption className="sr-only">
          Comparison of Omnikom against alternative outbound models
        </caption>
        <thead>
          <tr className="border-b border-border text-xs font-semibold uppercase tracking-wide text-gray-500">
            <th scope="col" className="py-4 pr-4">
              Model
            </th>
            <th scope="col" className="py-4 pr-4">
              What it sells
            </th>
            <th scope="col" className="py-4">
              What the client still manages
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.model}
              className={`border-b border-border align-top ${
                row.highlight ? "bg-ink-card" : ""
              }`}
            >
              <th
                scope="row"
                className={`py-4 pr-4 text-sm font-semibold ${
                  row.highlight ? "text-lime" : "text-white"
                }`}
              >
                {row.model}
              </th>
              <td className="py-4 pr-4 text-sm text-gray-300">{row.sells}</td>
              <td className="py-4 text-sm text-gray-300">
                {row.clientManages}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile stacked cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {rows.map((row) => (
          <div
            key={row.model}
            className={`rounded-[16px] border p-5 ${
              row.highlight
                ? "border-lime bg-ink-card"
                : "border-border bg-ink-card"
            }`}
          >
            <p
              className={`mb-3 text-sm font-semibold ${
                row.highlight ? "text-lime" : "text-white"
              }`}
            >
              {row.model}
            </p>
            <p className="mb-1 text-xs uppercase tracking-wide text-gray-500">
              Sells
            </p>
            <p className="mb-3 text-sm text-gray-300">{row.sells}</p>
            <p className="mb-1 text-xs uppercase tracking-wide text-gray-500">
              Client still manages
            </p>
            <p className="text-sm text-gray-300">{row.clientManages}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
