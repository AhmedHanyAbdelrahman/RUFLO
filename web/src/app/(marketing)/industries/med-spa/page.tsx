import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { IndustryPageTemplate } from "@/components/templates/IndustryPageTemplate";

export const metadata: Metadata = pageMetadata({
  title: "Med Spa Consultation and Reactivation Infrastructure",
  description: "Turn past inquiries and inactive clients into structured consultation opportunities.",
  path: "/industries/med-spa",
});

export default function MedSpaPage() {
  return (
    <IndustryPageTemplate
      heading="turn past inquiries and inactive clients into structured consultation opportunities."
      heroBody="Omnikom builds managed reactivation and consultation lanes for med spas and aesthetics providers."
      revenueLanes={["Past Lead Reactivation", "Membership", "Consultation", "Treatment Follow-Up", "No-Show Recovery"]}
      ctaLabel="Build a Med Spa Revenue Lane"
      industryName="Med Spa and Aesthetics"
      slug="med-spa"
    />
  );
}
