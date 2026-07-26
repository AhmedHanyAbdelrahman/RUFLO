import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { SimpleInfraPage } from "@/components/templates/SimpleInfraPage";

export const metadata: Metadata = pageMetadata({
  title: "Data Infrastructure",
  description: "Omnikom sources, enriches, cleans, segments, and maintains the data behind each Revenue Lane.",
  path: "/data-infrastructure",
});

export default function DataInfrastructurePage() {
  return (
    <SimpleInfraPage
      heading="better opportunity flow starts with better data."
      body="Omnikom sources, enriches, cleans, segments, and maintains the data behind each Revenue Lane."
      heroCta={{ label: "Build a Data-Powered Revenue Lane", href: "/consultation" }}
      listSections={[
        {
          heading: "what omnikom operates.",
          items: [
            "Market universe design",
            "First-party database ingestion",
            "Enrichment and validation",
            "Segmentation and prioritization",
            "Suppression and data hygiene",
            "Source attribution",
            "Refresh cycles",
          ],
        },
      ]}
      ctaHeading="build a data-powered revenue lane."
      ctaLabel="Build a Data-Powered Revenue Lane"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Platform", href: "/platform" }, { label: "Data Infrastructure", href: "/data-infrastructure" }]}
    />
  );
}
