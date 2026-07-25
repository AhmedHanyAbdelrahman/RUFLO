import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { IndustryPageTemplate } from "@/components/templates/IndustryPageTemplate";

export const metadata: Metadata = pageMetadata({
  title: "Dental and Healthcare Patient Reactivation Infrastructure",
  description: "Patient reactivation and consultation infrastructure built for disciplined follow-up.",
  path: "/industries/dental-healthcare",
});

export default function DentalHealthcarePage() {
  return (
    <IndustryPageTemplate
      heading="patient reactivation and consultation infrastructure built for disciplined follow-up."
      heroBody="Omnikom builds managed reactivation and consultation lanes for dental groups, implant practices, orthodontics, and physical therapy providers."
      revenueLanes={[
        "Implant Consultation",
        "Treatment Plan Recovery",
        "Inactive Patient Reactivation",
        "No-Show Recovery",
        "Orthodontic Consultation",
        "New-Location Launch",
      ]}
      boundary="Omnikom does not diagnose, provide medical advice, or replace licensed clinical personnel."
      ctaLabel="Build a Patient Reactivation Lane"
    />
  );
}
