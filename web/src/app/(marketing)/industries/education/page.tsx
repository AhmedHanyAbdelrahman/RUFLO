import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { IndustryPageTemplate } from "@/components/templates/IndustryPageTemplate";

export const metadata: Metadata = pageMetadata({
  title: "Education Enrollment Infrastructure",
  description: "Enrollment and inquiry reactivation infrastructure for education providers.",
  path: "/industries/education",
});

export default function EducationPage() {
  return (
    <IndustryPageTemplate
      heading="enrollment and inquiry reactivation infrastructure for education providers."
      heroBody="Omnikom builds managed enrollment and reactivation lanes for trade schools, coaching companies, bootcamps, and continuing-education providers."
      revenueLanes={["Enrollment Consultation", "Inquiry Reactivation", "Event Follow-Up", "Student Retention", "Program Launch"]}
      ctaLabel="Build an Enrollment Lane"
    />
  );
}
