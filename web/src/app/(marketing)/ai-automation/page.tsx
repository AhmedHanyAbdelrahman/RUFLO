import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { SimpleInfraPage } from "@/components/templates/SimpleInfraPage";

export const metadata: Metadata = pageMetadata({
  title: "AI and Automation",
  description: "Omnikom uses AI and workflow automation to reduce manual work, improve consistency, and surface the next best action.",
  path: "/ai-automation",
});

export default function AiAutomationPage() {
  return (
    <SimpleInfraPage
      heading="intelligence embedded inside the operation."
      body="Omnikom uses AI and workflow automation to reduce manual work, improve consistency, and surface the next best action."
      heroCta={{ label: "Explore AI-Enabled Operations", href: "/consultation" }}
      listSections={[
        {
          heading: "capabilities.",
          items: [
            "AI summaries",
            "Classification",
            "Qualification validation",
            "Next-action recommendations",
            "CRM triggers",
            "Notifications",
            "QA assistance",
            "Dashboards",
          ],
        },
      ]}
      boundary="AI supports the operating system. It does not replace accountability, client approval, licensed judgment, or human relationship-building."
      ctaHeading="explore ai-enabled operations."
      ctaLabel="Explore AI-Enabled Operations"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Platform", href: "/platform" }, { label: "AI and Automation", href: "/ai-automation" }]}
    />
  );
}
