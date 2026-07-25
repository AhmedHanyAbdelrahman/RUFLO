import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { SimpleInfraPage } from "@/components/templates/SimpleInfraPage";

export const metadata: Metadata = pageMetadata({
  title: "Multi-Market Expansion Infrastructure",
  description: "Deploy localized data, scripts, qualification, routing, and reporting across territories, locations, franchises, or business units.",
  path: "/solutions/multi-market-expansion",
});

export default function MultiMarketExpansionPage() {
  return (
    <SimpleInfraPage
      heading="enter new markets without rebuilding the engine."
      body="Deploy localized data, scripts, qualification, routing, and reporting across territories, locations, franchises, or business units."
      heroCta={{ label: "Plan a Multi-Market Deployment", href: "/consultation" }}
      ctaHeading="plan a multi-market deployment."
      ctaLabel="Plan a Multi-Market Deployment"
    />
  );
}
