import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { SimpleInfraPage } from "@/components/templates/SimpleInfraPage";

export const metadata: Metadata = pageMetadata({
  title: "Customer Reactivation Infrastructure",
  description: "Past customers, old estimates, dormant leads, no-shows, declined services, and closed-lost opportunities often contain the fastest path to near-term revenue.",
  path: "/solutions/reactivate",
});

export default function ReactivatePage() {
  return (
    <SimpleInfraPage
      heading="recover value already inside your database."
      body="Past customers, old estimates, dormant leads, no-shows, declined services, and closed-lost opportunities often contain the fastest path to near-term revenue."
      heroCta={{ label: "Assess My Reactivation Opportunity", href: "/consultation" }}
      listSections={[
        {
          heading: "use cases.",
          items: [
            "Automotive declined service",
            "Dental treatment plans",
            "Home-service estimates",
            "Dormant B2B opportunities",
            "Inactive financial-services clients",
            "Lapsed memberships",
          ],
        },
      ]}
      ctaHeading="assess my reactivation opportunity."
      ctaLabel="Assess My Reactivation Opportunity"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: "Reactivate", href: "/solutions/reactivate" }]}
    />
  );
}
