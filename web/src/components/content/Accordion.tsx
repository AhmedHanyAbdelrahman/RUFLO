export interface AccordionItem {
  question: string;
  answer: string;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="flex flex-col divide-y divide-border border-y border-border">
      {items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-white">
            {item.question}
            <span
              aria-hidden="true"
              className="shrink-0 text-lime transition-transform duration-150 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-gray-300">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
