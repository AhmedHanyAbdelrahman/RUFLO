import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { SimpleInfraPage } from "@/components/templates/SimpleInfraPage";

export const metadata: Metadata = pageMetadata({
  title: "Expansion Infrastructure",
  description: "Expansion Infrastructure connects multiple lanes through shared data, governance, CRM, routing, and reporting.",
  path: "/revenue-lanes/expansion",
});

export default function ExpansionLanePage() {
  return (
    <SimpleInfraPage
      eyebrow="stage 3"
      heading="add markets, icps, locations, and service lines without rebuilding."
      body="Expansion Infrastructure connects multiple lanes through shared data, governance, CRM, routing, and reporting."
      heroCta={{ label: "Plan My Expansion Infrastructure", href: "/consultation" }}
      ctaHeading="plan my expansion infrastructure."
      ctaLabel="Plan My Expansion Infrastructure"
    />
  );
}
