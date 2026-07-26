import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { SimpleInfraPage } from "@/components/templates/SimpleInfraPage";

export const metadata: Metadata = pageMetadata({
  title: "Validation Lane",
  description: "Use a controlled Revenue Lane to test one market, ICP, service line, or outbound thesis.",
  path: "/revenue-lanes/validation",
});

export default function ValidationLanePage() {
  return (
    <SimpleInfraPage
      eyebrow="stage 1"
      heading="validate the market before scaling the machine."
      body="Use a controlled Revenue Lane to test one market, ICP, service line, or outbound thesis."
      heroCta={{ label: "Request a Validation Lane Assessment", href: "/consultation" }}
      listSections={[
        {
          heading: "best for.",
          items: ["First outbound deployment", "New market", "New service", "New audience", "New data source"],
        },
        {
          heading: "includes.",
          items: [
            "Lane blueprint",
            "Shared infrastructure",
            "Approved data workflow",
            "Outreach",
            "Qualification",
            "CRM delivery",
            "Weekly reporting",
            "Calibration",
          ],
        },
      ]}
      ctaHeading="request a validation lane assessment."
      ctaLabel="Request a Validation Lane Assessment"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Revenue Lanes", href: "/revenue-lanes" }, { label: "Validation Lane", href: "/revenue-lanes/validation" }]}
    />
  );
}
