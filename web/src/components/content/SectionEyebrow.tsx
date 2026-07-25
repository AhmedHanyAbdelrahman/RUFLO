export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-lime">
      <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-lime" />
      {children}
    </p>
  );
}
