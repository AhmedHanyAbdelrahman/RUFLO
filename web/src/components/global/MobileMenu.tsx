"use client";

import Link from "next/link";
import { useEffect } from "react";
import { NAV_GROUPS, HOW_IT_WORKS_LINK, WHY_OMNIKOM_LINK, PRIMARY_CTA } from "@/content/constants/navigation";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink md:hidden"
    >
      <div className="container-page flex items-center justify-between py-5">
        <span className="text-lg font-semibold lowercase text-white">
          omnikom
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="text-sm font-semibold uppercase tracking-wide text-white"
        >
          Close
        </button>
      </div>
      <nav className="container-page flex flex-1 flex-col gap-8 pb-12">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-lime">
              {group.href ? (
                <Link href={group.href} onClick={onClose}>
                  {group.label}
                </Link>
              ) : (
                group.label
              )}
            </p>
            <ul className="flex flex-col gap-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="text-lg font-medium text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex flex-col gap-3 border-t border-border pt-6">
          <Link
            href={HOW_IT_WORKS_LINK.href}
            onClick={onClose}
            className="text-lg font-medium text-white"
          >
            {HOW_IT_WORKS_LINK.label}
          </Link>
          <Link
            href={WHY_OMNIKOM_LINK.href}
            onClick={onClose}
            className="text-lg font-medium text-white"
          >
            {WHY_OMNIKOM_LINK.label}
          </Link>
        </div>
        <Link
          href={PRIMARY_CTA.href}
          onClick={onClose}
          className="mt-auto inline-flex items-center justify-center rounded-[12px] border border-lime bg-lime px-6 py-4 text-sm font-semibold text-ink"
        >
          {PRIMARY_CTA.label}
        </Link>
      </nav>
    </div>
  );
}
