import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { IndustryPageTemplate } from "@/components/templates/IndustryPageTemplate";

export const metadata: Metadata = pageMetadata({
  title: "B2B Outbound Revenue Infrastructure",
  description: "Outbound infrastructure for complex B2B growth.",
  path: "/industries/b2b-saas",
});

export default function B2bSaasPage() {
  return (
    <IndustryPageTemplate
      heading="outbound infrastructure for complex b2b growth."
      heroBody="Omnikom builds and operates outbound lanes for SaaS companies, agencies, MSPs, consultants, and business services firms."
      revenueLanes={[
        "Decision-Maker Meetings",
        "Account-Based Outreach",
        "Market Entry",
        "Event Follow-Up",
        "Closed-Lost Reactivation",
        "Channel Partnerships",
      ]}
      qualifiedOpportunity="A relevant stakeholder at a matching account with a documented problem, initiative, timing signal, and agreed next action."
      ctaLabel="Build a B2B Revenue Lane"
    />
  );
}
