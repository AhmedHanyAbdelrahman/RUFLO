import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { IndustryPageTemplate } from "@/components/templates/IndustryPageTemplate";

export const metadata: Metadata = pageMetadata({
  title: "Staffing Employer Acquisition Infrastructure",
  description: "Employer acquisition infrastructure for staffing firms.",
  path: "/industries/staffing",
});

export default function StaffingPage() {
  return (
    <IndustryPageTemplate
      heading="employer acquisition infrastructure for staffing firms."
      heroBody="Omnikom builds and operates outbound lanes for general staffing, healthcare staffing, skilled trades, technology recruiting, and RPO providers."
      revenueLanes={["Employer Acquisition", "Job Orders", "Dormant Account Reactivation", "Vertical Expansion", "Territory Launch"]}
      ctaLabel="Build a Staffing Revenue Lane"
    />
  );
}
