import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { IndustryPageTemplate } from "@/components/templates/IndustryPageTemplate";

export const metadata: Metadata = pageMetadata({
  title: "Real Estate Seller Acquisition Infrastructure",
  description: "Managed seller acquisition, listing opportunity, investor pipeline, nurture, and CRM infrastructure for serious real estate operators.",
  path: "/industries/real-estate",
});

export default function RealEstatePage() {
  return (
    <IndustryPageTemplate
      heading="seller acquisition infrastructure for serious real estate operators."
      heroBody="Omnikom builds and operates outbound seller acquisition lanes for investors, brokerages, agents, wholesalers, developers, funds, and property teams."
      problem="The market does not need more duplicated lead lists. Operators need proprietary outreach, disciplined qualification, structured follow-up, and clear source attribution."
      revenueLanes={[
        "Seller Acquisition",
        "Listing Opportunities",
        "Investor Buy-Box",
        "Expired and FSBO",
        "Property Management Owner Acquisition",
        "Commercial Owner Outreach",
        "Nurture and Recovery",
      ]}
      qualifiedOpportunity="A verified owner or authorized decision-maker with a relevant property, an openness to discuss options, documented context, a timeline, and an agreed next step."
      omnikomOperates={["Market and list strategy", "Data and enrichment", "Outbound execution", "Qualification", "CRM delivery", "AI summaries", "Nurture", "Reporting"]}
      clientOwns={["Brokerage", "Offers", "Negotiation", "Contracts", "Disclosures", "Closing", "Licensed activity"]}
      ctaLabel="Build a Seller Acquisition Lane"
      industryName="Real Estate and Property"
      slug="real-estate"
    />
  );
}
