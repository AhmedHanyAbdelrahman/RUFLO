import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { IndustryPageTemplate } from "@/components/templates/IndustryPageTemplate";

export const metadata: Metadata = pageMetadata({
  title: "Roofing and Home Services Revenue Infrastructure",
  description: "Predictable inspection and estimate opportunities without rebuilding the outbound team.",
  path: "/industries/roofing-home-services",
});

export default function RoofingHomeServicesPage() {
  return (
    <IndustryPageTemplate
      heading="predictable inspection and estimate opportunities without rebuilding the outbound team."
      heroBody="Omnikom builds managed acquisition and reactivation lanes for roofing contractors and high-value home-service operators."
      revenueLanes={[
        "Residential Inspection",
        "Commercial Roofing",
        "Storm Restoration",
        "Past Estimate Reactivation",
        "Maintenance Agreements",
        "Territory Expansion",
      ]}
      qualifiedOpportunity="A property decision-maker in the approved service territory who has a relevant need and is open to an inspection, estimate, consultation, or service conversation."
      ctaLabel="Build a Roofing or Home Services Lane"
      industryName="Roofing and Home Services"
      slug="roofing-home-services"
    />
  );
}
