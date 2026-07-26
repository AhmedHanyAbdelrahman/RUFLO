import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { IndustryPageTemplate } from "@/components/templates/IndustryPageTemplate";

export const metadata: Metadata = pageMetadata({
  title: "Commercial Opportunity Infrastructure",
  description: "Commercial opportunity infrastructure for high-value service providers.",
  path: "/industries/commercial-industrial",
});

export default function CommercialIndustrialPage() {
  return (
    <IndustryPageTemplate
      heading="commercial opportunity infrastructure for high-value service providers."
      heroBody="Omnikom builds managed acquisition lanes for commercial roofing, facility maintenance, security, construction, and industrial services providers."
      revenueLanes={[
        "Facility Decision-Maker Outreach",
        "Commercial Project Opportunities",
        "Contract Renewal",
        "Territory Expansion",
        "Account Reactivation",
      ]}
      ctaLabel="Build a Commercial Opportunity Lane"
      industryName="Commercial and Industrial Services"
      slug="commercial-industrial"
    />
  );
}
