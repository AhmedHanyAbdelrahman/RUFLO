import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { IndustryPageTemplate } from "@/components/templates/IndustryPageTemplate";

export const metadata: Metadata = pageMetadata({
  title: "Solar Acquisition Infrastructure",
  description: "Solar consultation infrastructure built around qualification.",
  path: "/industries/solar",
});

export default function SolarPage() {
  return (
    <IndustryPageTemplate
      heading="solar consultation infrastructure built around qualification."
      heroBody="Omnikom builds managed acquisition and reactivation lanes for residential and commercial solar operators."
      revenueLanes={["Residential Consultation", "Commercial Solar", "Battery Storage", "Past Lead Reactivation", "Market Expansion"]}
      boundary="Omnikom captures approved preliminary information and routes opportunities to appropriately licensed or authorized client personnel."
      ctaLabel="Build a Solar Acquisition Lane"
    />
  );
}
