import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { IndustryPageTemplate } from "@/components/templates/IndustryPageTemplate";

export const metadata: Metadata = pageMetadata({
  title: "Automotive Customer Reactivation Infrastructure",
  description: "Recover revenue already inside your customer database.",
  path: "/industries/automotive",
});

export default function AutomotivePage() {
  return (
    <IndustryPageTemplate
      heading="recover revenue already inside your customer database."
      heroBody="Omnikom helps repair groups, tire shops, collision centers, dealerships, and service networks reactivate customers and create new service opportunities."
      revenueLanes={[
        "Declined Service Recovery",
        "Deferred Maintenance",
        "Inactive Customer Reactivation",
        "Fleet Acquisition",
        "Appointment Confirmation",
        "Multi-Location Campaigns",
      ]}
      qualifiedOpportunity="A customer or fleet decision-maker with a relevant vehicle or service need who is open to scheduling, receiving an estimate, or speaking with the service team."
      ctaLabel="Build an Automotive Revenue Lane"
      industryName="Automotive"
      slug="automotive"
    />
  );
}
