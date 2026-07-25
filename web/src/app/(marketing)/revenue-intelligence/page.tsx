import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { SimpleInfraPage } from "@/components/templates/SimpleInfraPage";

export const metadata: Metadata = pageMetadata({
  title: "Revenue Intelligence",
  description: "Measure data quality, contactability, qualification, handoff, client response, pipeline movement, and expansion opportunities.",
  path: "/revenue-intelligence",
});

export default function RevenueIntelligencePage() {
  return (
    <SimpleInfraPage
      heading="see how the lane is operating—not just how many calls were made."
      body="Measure data quality, contactability, qualification, handoff, client response, pipeline movement, and expansion opportunities."
      heroCta={{ label: "See the Revenue Intelligence Model", href: "/consultation" }}
      listSections={[
        {
          heading: "metrics we track.",
          items: [
            "Data validity",
            "Contact rate",
            "Conversation rate",
            "Qualification rate",
            "Opportunity acceptance",
            "Speed-to-lead",
            "Held rate",
            "Market performance",
            "Client feedback",
          ],
        },
      ]}
      ctaHeading="see the revenue intelligence model."
      ctaLabel="See the Revenue Intelligence Model"
    />
  );
}
