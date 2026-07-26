const SITE_URL = "https://www.omnikom.com";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Omnikom",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/omnikom_logo_reference.jpeg`,
  description:
    "Omnikom is the outbound revenue infrastructure behind high-growth companies.",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Omnikom",
  url: SITE_URL,
};

export function OrganizationStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([organizationJsonLd, websiteJsonLd]).replace(/</g, "\\u003c"),
      }}
    />
  );
}
