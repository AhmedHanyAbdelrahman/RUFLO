import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { SimpleInfraPage } from "@/components/templates/SimpleInfraPage";

export const metadata: Metadata = pageMetadata({
  title: "Nurture and Recovery Infrastructure",
  description: "Build systematic follow-up around callbacks, no-shows, future-timeline prospects, incomplete applications, and unresponsive opportunities.",
  path: "/solutions/nurture-recovery",
});

export default function NurtureRecoveryPage() {
  return (
    <SimpleInfraPage
      heading="not now does not mean never."
      body="Build systematic follow-up around callbacks, no-shows, future-timeline prospects, incomplete applications, and unresponsive opportunities."
      heroCta={{ label: "Build a Nurture Lane", href: "/consultation" }}
      ctaHeading="build a nurture lane."
      ctaLabel="Build a Nurture Lane"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: "Nurture and Recovery", href: "/solutions/nurture-recovery" }]}
    />
  );
}
