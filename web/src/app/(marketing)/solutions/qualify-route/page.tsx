import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { SimpleInfraPage } from "@/components/templates/SimpleInfraPage";

export const metadata: Metadata = pageMetadata({
  title: "Qualification and Routing Solutions",
  description: "Omnikom converts raw conversations into structured, routed opportunities with clear qualification, status, source, owner, and next action.",
  path: "/solutions/qualify-route",
});

export default function QualifyRoutePage() {
  return (
    <SimpleInfraPage
      heading="every opportunity should arrive with context and ownership."
      body="Omnikom converts raw conversations into structured, routed opportunities with clear qualification, status, source, owner, and next action."
      heroCta={{ label: "Design My Qualification and Routing System", href: "/consultation" }}
      ctaHeading="design my qualification and routing system."
      ctaLabel="Design My Qualification and Routing System"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: "Qualify and Route", href: "/solutions/qualify-route" }]}
    />
  );
}
