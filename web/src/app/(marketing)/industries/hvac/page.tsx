import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { IndustryPageTemplate } from "@/components/templates/IndustryPageTemplate";

export const metadata: Metadata = pageMetadata({
  title: "HVAC Revenue Infrastructure",
  description: "Build consistent replacement, maintenance, and service opportunity flow.",
  path: "/industries/hvac",
});

export default function HvacPage() {
  return (
    <IndustryPageTemplate
      heading="build consistent replacement, maintenance, and service opportunity flow."
      heroBody="Omnikom builds managed acquisition and reactivation lanes for HVAC contractors and multi-location service operators."
      revenueLanes={[
        "Replacement",
        "Preventive Maintenance",
        "Commercial Maintenance",
        "Seasonal Campaign",
        "Lapsed Customer Reactivation",
        "Multi-Location Growth",
      ]}
      ctaLabel="Build an HVAC Revenue Lane"
      industryName="HVAC"
      slug="hvac"
    />
  );
}
