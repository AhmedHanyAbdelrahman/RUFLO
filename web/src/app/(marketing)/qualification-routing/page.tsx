import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { SimpleInfraPage } from "@/components/templates/SimpleInfraPage";

export const metadata: Metadata = pageMetadata({
  title: "Qualification and Routing",
  description: "Omnikom applies industry-specific qualification frameworks, creates structured CRM records, and routes each accepted opportunity to the correct person, location, territory, or workflow.",
  path: "/qualification-routing",
});

export default function QualificationRoutingPage() {
  return (
    <SimpleInfraPage
      heading="conversations become valuable when the next action is clear."
      body="Omnikom applies industry-specific qualification frameworks, creates structured CRM records, and routes each accepted opportunity to the correct person, location, territory, or workflow."
      heroCta={{ label: "Design a Qualification Framework", href: "/consultation" }}
      listSections={[
        {
          heading: "what omnikom operates.",
          items: [
            "Qualification architecture",
            "Opportunity scoring",
            "Disqualification",
            "CRM delivery",
            "Geographic routing",
            "SLA alerts",
            "Client acceptance",
          ],
        },
      ]}
      ctaHeading="design a qualification framework."
      ctaLabel="Design a Qualification Framework"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Platform", href: "/platform" }, { label: "Qualification and Routing", href: "/qualification-routing" }]}
    />
  );
}
