import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { SimpleInfraPage } from "@/components/templates/SimpleInfraPage";

export const metadata: Metadata = pageMetadata({
  title: "Workforce Infrastructure",
  description: "Omnikom recruits, trains, deploys, manages, measures, and supports the people behind each lane.",
  path: "/workforce-infrastructure",
});

export default function WorkforceInfrastructurePage() {
  return (
    <SimpleInfraPage
      heading="the workforce sits inside the operating system."
      body="Omnikom recruits, trains, deploys, manages, measures, and supports the people behind each lane. The client does not receive unmanaged headcount. The client receives managed operating capacity."
      heroCta={{ label: "Build Managed Operating Capacity", href: "/consultation" }}
      listSections={[
        {
          heading: "what omnikom operates.",
          items: [
            "Role design",
            "Recruiting",
            "Screening",
            "Training",
            "Deployment",
            "Team leadership",
            "QA",
            "Replacement and continuity",
            "Multi-time-zone operations",
          ],
        },
      ]}
      ctaHeading="build managed operating capacity."
      ctaLabel="Build Managed Operating Capacity"
    />
  );
}
