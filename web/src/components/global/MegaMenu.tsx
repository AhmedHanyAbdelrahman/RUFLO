import Link from "next/link";
import type { NavGroup } from "@/content/constants/navigation";

export function MegaMenu({ group }: { group: NavGroup }) {
  return (
    <div
      role="menu"
      aria-label={`${group.label} menu`}
      className="absolute left-1/2 top-full z-40 w-[min(720px,90vw)] -translate-x-1/2 rounded-[16px] border border-border bg-ink p-6 shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
    >
      <ul className="grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2">
        {group.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              role="menuitem"
              className="group block rounded-[10px] px-3 py-2.5 transition-colors duration-150 hover:bg-ink-card"
            >
              <span className="block text-sm font-semibold text-white group-hover:text-lime">
                {link.label}
              </span>
              {link.description ? (
                <span className="mt-0.5 block text-xs leading-relaxed text-gray-500">
                  {link.description}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
