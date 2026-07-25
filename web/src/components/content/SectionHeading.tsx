import type { ElementType } from "react";

interface SectionHeadingProps {
  as?: ElementType;
  size?: "display" | "h1" | "h2" | "h3";
  className?: string;
  children: React.ReactNode;
}

const sizeStyles: Record<NonNullable<SectionHeadingProps["size"]>, string> = {
  display: "text-[54px] leading-[1.02] md:text-[80px] md:leading-[1.0]",
  h1: "text-[44px] leading-[1.04] md:text-[72px] md:leading-[1.02]",
  h2: "text-[36px] leading-[1.1] md:text-[52px] md:leading-[1.08]",
  h3: "text-[28px] leading-[1.18] md:text-[36px] md:leading-[1.15]",
};

export function SectionHeading({
  as: Tag = "h2",
  size = "h2",
  className = "",
  children,
}: SectionHeadingProps) {
  return (
    <Tag
      className={`text-balance font-bold text-white ${sizeStyles[size]} ${className}`}
    >
      {children}
    </Tag>
  );
}
