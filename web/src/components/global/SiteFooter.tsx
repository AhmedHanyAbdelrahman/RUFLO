import Link from "next/link";
import { FOOTER_COLUMNS, PRIMARY_CTA } from "@/content/constants/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-ink">
      <div className="container-page py-16">
        <div className="mb-12 flex flex-col justify-between gap-8 border-b border-border pb-12 md:flex-row md:items-end">
          <div className="max-w-md">
            <p className="text-lg font-semibold lowercase text-white">omnikom</p>
            <p className="mt-1 text-sm font-semibold text-lime">
              Revenue Infrastructure
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-300">
              Omnikom designs, deploys, and operates the systems behind
              qualified opportunity flow.
            </p>
          </div>
          <Link
            href={PRIMARY_CTA.href}
            className="inline-flex w-fit items-center rounded-[12px] border border-lime bg-lime px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-transparent hover:text-lime"
          >
            {PRIMARY_CTA.label}
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                {column.title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 transition-colors hover:text-lime"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 max-w-3xl text-xs leading-relaxed text-gray-500">
          Omnikom does not guarantee revenue or client-side sales outcomes.
          Regulated and licensed activities remain the responsibility of
          appropriately authorized client personnel.
        </p>
        <p className="mt-4 text-xs text-gray-700">
          © {new Date().getFullYear()} Omnikom. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
