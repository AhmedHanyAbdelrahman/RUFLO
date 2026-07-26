import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { SimpleInfraPage } from "@/components/templates/SimpleInfraPage";

export const metadata: Metadata = pageMetadata({
  title: "Speed-to-Lead Infrastructure",
  description: "Omnikom can support rapid response, qualification, appointment coordination, and CRM delivery for approved inbound lead sources.",
  path: "/solutions/speed-to-lead",
});

export default function SpeedToLeadPage() {
  return (
    <SimpleInfraPage
      heading="respond while intent is still active."
      body="Omnikom can support rapid response, qualification, appointment coordination, and CRM delivery for approved inbound lead sources."
      heroCta={{ label: "Improve My Speed-to-Lead", href: "/consultation" }}
      ctaHeading="improve my speed-to-lead."
      ctaLabel="Improve My Speed-to-Lead"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: "Speed-to-Lead", href: "/solutions/speed-to-lead" }]}
    />
  );
}
