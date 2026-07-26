import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

const SITE_URL = "https://www.omnikom.com";

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="border-b border-border bg-ink">
      <div className="container-page py-4">
        <ol className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {index === items.length - 1 ? (
                <span aria-current="page" className="text-gray-300">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-lime">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </nav>
  );
}
