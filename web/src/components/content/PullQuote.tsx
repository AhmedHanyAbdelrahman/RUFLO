export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-2 border-lime pl-6 text-2xl font-medium text-white md:text-3xl">
      {children}
    </blockquote>
  );
}
