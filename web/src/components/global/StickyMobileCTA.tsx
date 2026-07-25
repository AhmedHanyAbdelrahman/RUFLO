"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PRIMARY_CTA } from "@/content/constants/navigation";

export function StickyMobileCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === PRIMARY_CTA.href) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-border bg-ink p-3 transition-transform duration-200 ease-[var(--ease-standard)] lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Link
        href={PRIMARY_CTA.href}
        className="flex items-center justify-center rounded-[10px] border border-lime bg-lime px-6 py-3.5 text-sm font-semibold text-ink"
      >
        {PRIMARY_CTA.label}
      </Link>
    </div>
  );
}
