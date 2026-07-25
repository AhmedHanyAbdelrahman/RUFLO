import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { SimpleInfraPage } from "@/components/templates/SimpleInfraPage";

export const metadata: Metadata = pageMetadata({
  title: "Customer Acquisition Infrastructure",
  description: "Omnikom builds and operates outbound acquisition lanes that identify, contact, qualify, and route new commercial opportunities.",
  path: "/solutions/acquire",
});

export default function AcquirePage() {
  return (
    <SimpleInfraPage
      heading="create qualified opportunities from target markets."
      body="Omnikom builds and operates outbound acquisition lanes that identify, contact, qualify, and route new commercial opportunities."
      heroCta={{ label: "Build an Acquisition Lane", href: "/consultation" }}
      listSections={[
        {
          heading: "best for.",
          items: ["New customer growth", "New market entry", "Territory expansion", "New service lines", "Sales pipeline development"],
        },
        {
          heading: "what omnikom operates.",
          items: ["ICP and market design", "Data sourcing", "Outreach", "Qualification", "CRM delivery", "Follow-up", "Reporting"],
        },
      ]}
      ctaHeading="build an acquisition lane."
      ctaLabel="Build an Acquisition Lane"
    />
  );
}
