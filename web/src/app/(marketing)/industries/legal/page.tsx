import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { IndustryPageTemplate } from "@/components/templates/IndustryPageTemplate";

export const metadata: Metadata = pageMetadata({
  title: "Legal Intake Infrastructure",
  description: "Structured intake and consultation infrastructure for law firms.",
  path: "/industries/legal",
});

export default function LegalPage() {
  return (
    <IndustryPageTemplate
      heading="structured intake and consultation infrastructure for law firms."
      heroBody="Omnikom builds managed intake and consultation lanes for personal injury, immigration, family law, estate planning, and other practice areas."
      revenueLanes={["Consultation", "Intake Completion", "Past Inquiry Follow-Up", "Community Outreach", "B2B Referral Development"]}
      boundary="Omnikom does not provide legal advice, accept cases, or represent the law firm."
      ctaLabel="Build a Legal Intake Lane"
    />
  );
}
