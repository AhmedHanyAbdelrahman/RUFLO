import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { SimpleInfraPage } from "@/components/templates/SimpleInfraPage";

export const metadata: Metadata = pageMetadata({
  title: "Enterprise Revenue Infrastructure",
  description: "Designed for multi-market, multi-location, portfolio, franchise, and enterprise operating environments.",
  path: "/revenue-lanes/enterprise",
});

export default function EnterpriseLanePage() {
  return (
    <SimpleInfraPage
      eyebrow="stage 4"
      heading="governed revenue infrastructure across the organization."
      body="Designed for multi-market, multi-location, portfolio, franchise, and enterprise operating environments."
      heroCta={{ label: "Discuss an Enterprise Deployment", href: "/consultation" }}
      listSections={[
        {
          heading: "includes.",
          items: [
            "Dedicated architecture",
            "Multiple lanes",
            "Executive reporting",
            "SLAs",
            "Custom routing",
            "White-label capability",
            "Integrations",
            "Governance",
          ],
        },
      ]}
      ctaHeading="discuss an enterprise deployment."
      ctaLabel="Discuss an Enterprise Deployment"
    />
  );
}
