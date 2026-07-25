import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";
import type { CTA } from "@/types/cta";

const ArrowIcon = ({ className = "" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 20"
    fill="none"
    className={`h-4 w-4 transition-transform duration-[180ms] ease-[var(--ease-standard)] ${className}`}
  >
    <path
      d="M4 10h12M11 5l5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const styles: Record<NonNullable<CTA["style"]>, string> = {
  primary:
    "group inline-flex items-center gap-2 rounded-[12px] border border-lime bg-lime px-6 py-3 text-sm font-semibold text-ink transition-colors duration-[180ms] ease-[var(--ease-standard)] hover:bg-transparent hover:text-lime",
  secondary:
    "group inline-flex items-center gap-2 rounded-[12px] border border-gray-700 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors duration-[180ms] ease-[var(--ease-standard)] hover:border-white hover:bg-white hover:text-ink",
  text: "group inline-flex items-center gap-2 text-sm font-semibold text-lime underline decoration-transparent underline-offset-4 transition-colors duration-[180ms] hover:decoration-lime",
};

interface ButtonProps extends CTA {
  className?: string;
}

export function Button({
  label,
  href,
  style = "primary",
  external,
  className = "",
}: ButtonProps) {
  const content = (
    <>
      <span>{label}</span>
      <ArrowIcon className="group-hover:translate-x-1.5" />
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles[style]} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={`${styles[style]} ${className}`}>
      {content}
    </Link>
  );
}

export function NativeButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${styles.primary} justify-center disabled:cursor-not-allowed disabled:border-gray-700 disabled:bg-gray-700 disabled:text-gray-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
