import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { SimpleInfraPage } from "@/components/templates/SimpleInfraPage";

export const metadata: Metadata = pageMetadata({
  title: "White-Label Revenue Infrastructure",
  description: "Agencies, consultants, platforms, brokerages, and strategic partners can deliver revenue infrastructure under their own brand or through a co-branded model.",
  path: "/solutions/white-label",
});

export default function WhiteLabelPage() {
  return (
    <SimpleInfraPage
      heading="your brand in front. omnikom infrastructure behind it."
      body="Agencies, consultants, platforms, brokerages, and strategic partners can deliver revenue infrastructure under their own brand or through a co-branded model."
      heroCta={{ label: "Discuss a White-Label Partnership", href: "/consultation" }}
      listSections={[
        {
          heading: "partner benefits.",
          items: [
            "Faster product launch",
            "Managed fulfillment",
            "Industry modules",
            "Reporting",
            "QA",
            "CRM delivery",
            "Expansion capacity",
          ],
        },
      ]}
      ctaHeading="discuss a white-label partnership."
      ctaLabel="Discuss a White-Label Partnership"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: "White Label", href: "/solutions/white-label" }]}
    />
  );
}
