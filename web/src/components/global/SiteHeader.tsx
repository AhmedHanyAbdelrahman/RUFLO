"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MegaMenu } from "@/components/global/MegaMenu";
import { MobileMenu } from "@/components/global/MobileMenu";
import {
  NAV_GROUPS,
  HOW_IT_WORKS_LINK,
  WHY_OMNIKOM_LINK,
  PRIMARY_CTA,
} from "@/content/constants/navigation";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    const onClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenGroup(null);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClickOutside);
    };
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-colors duration-200 ${
          scrolled
            ? "border-border bg-ink"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="container-page flex h-[68px] items-center justify-between md:h-20">
          <Link href="/" className="text-lg font-semibold lowercase text-white">
            omnikom
          </Link>

          <nav
            ref={navRef}
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
          >
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="relative">
                <button
                  type="button"
                  aria-expanded={openGroup === group.label}
                  aria-haspopup="true"
                  onClick={() =>
                    setOpenGroup((current) =>
                      current === group.label ? null : group.label,
                    )
                  }
                  className="px-4 py-2 text-sm font-medium text-white transition-colors hover:text-lime"
                >
                  {group.label}
                </button>
                {openGroup === group.label ? (
                  <MegaMenu group={group} />
                ) : null}
              </div>
            ))}
            <Link
              href={HOW_IT_WORKS_LINK.href}
              className="px-4 py-2 text-sm font-medium text-white transition-colors hover:text-lime"
            >
              {HOW_IT_WORKS_LINK.label}
            </Link>
            <Link
              href={WHY_OMNIKOM_LINK.href}
              className="px-4 py-2 text-sm font-medium text-white transition-colors hover:text-lime"
            >
              {WHY_OMNIKOM_LINK.label}
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href={PRIMARY_CTA.href}
              className="hidden items-center rounded-[10px] border border-lime bg-lime px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-transparent hover:text-lime lg:inline-flex"
            >
              {PRIMARY_CTA.label}
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-border text-white lg:hidden"
            >
              <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
