import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { SimpleInfraPage } from "@/components/templates/SimpleInfraPage";

export const metadata: Metadata = pageMetadata({
  title: "Outreach Operations",
  description: "Omnikom operates approved calling, response, reactivation, and follow-up workflows through trained teams, defined cadences, scripts, and management.",
  path: "/outreach-operations",
});

export default function OutreachOperationsPage() {
  return (
    <SimpleInfraPage
      heading="managed outreach. controlled execution."
      body="Omnikom operates approved calling, response, reactivation, and follow-up workflows through trained teams, defined cadences, scripts, and management."
      heroCta={{ label: "Explore Managed Outreach", href: "/consultation" }}
      listSections={[
        {
          heading: "what omnikom operates.",
          items: [
            "Calling operations",
            "Inbound response",
            "Database reactivation",
            "Contact cadence",
            "Call windows",
            "Callbacks",
            "No-show recovery",
            "Reporting",
          ],
        },
      ]}
      ctaHeading="explore managed outreach."
      ctaLabel="Explore Managed Outreach"
    />
  );
}
