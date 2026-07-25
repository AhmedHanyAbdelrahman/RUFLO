import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { SimpleInfraPage } from "@/components/templates/SimpleInfraPage";

export const metadata: Metadata = pageMetadata({
  title: "Growth Lane",
  description: "The Growth Lane is designed for companies with a proven offer and sales capacity that need a dependable acquisition rhythm.",
  path: "/revenue-lanes/growth",
});

export default function GrowthLanePage() {
  return (
    <SimpleInfraPage
      eyebrow="stage 2"
      heading="build consistent weekly opportunity flow."
      body="The Growth Lane is designed for companies with a proven offer and sales capacity that need a dependable acquisition rhythm."
      heroCta={{ label: "Design a Growth Lane", href: "/consultation" }}
      listSections={[
        {
          heading: "includes.",
          items: ["Priority capacity", "Stronger targeting", "Follow-up and nurture", "Enhanced QA", "Weekly optimization", "Revenue intelligence"],
        },
      ]}
      ctaHeading="design a growth lane."
      ctaLabel="Design a Growth Lane"
    />
  );
}
