import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { SimpleInfraPage } from "@/components/templates/SimpleInfraPage";

export const metadata: Metadata = pageMetadata({
  title: "Managed Departments",
  description: "Omnikom can recruit, train, operate, and govern complete functions with workflows, service levels, reporting, and management.",
  path: "/solutions/managed-departments",
});

export default function ManagedDepartmentsPage() {
  return (
    <SimpleInfraPage
      heading="deploy a business function—not isolated seats."
      body="Omnikom can recruit, train, operate, and govern complete functions with workflows, service levels, reporting, and management."
      heroCta={{ label: "Design a Managed Department", href: "/consultation" }}
      listSections={[
        {
          heading: "departments we operate.",
          items: [
            "Revenue operations",
            "Client onboarding",
            "Lead management",
            "Customer support",
            "Appointment coordination",
            "Document collection",
            "Back-office administration",
            "Data operations",
          ],
        },
      ]}
      ctaHeading="design a managed department."
      ctaLabel="Design a Managed Department"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: "Managed Departments", href: "/solutions/managed-departments" }]}
    />
  );
}
