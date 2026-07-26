import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { IndustryPageTemplate } from "@/components/templates/IndustryPageTemplate";

export const metadata: Metadata = pageMetadata({
  title: "Financial Services Revenue and Operations Infrastructure",
  description: "Financial operations infrastructure built for capacity, consistency, and control.",
  path: "/industries/financial-services",
});

export default function FinancialServicesPage() {
  return (
    <IndustryPageTemplate
      heading="financial operations infrastructure built for capacity, consistency, and control."
      heroBody="Omnikom helps financial-services organizations build and operate revenue, client-support, onboarding, and back-office functions through one integrated platform."
      revenueLanes={[
        "Policy Review",
        "Renewal and Retention",
        "Financial Consultation",
        "Mortgage Inquiry",
        "Client Onboarding",
        "Document Collection",
        "Database Reactivation",
        "Customer Support",
      ]}
      partnerLine="Financial-services deployments may be supported through Omnikom Financial Services Infrastructure, powered by Rainmaker Wealth Innovation."
      boundary="Regulated advice, product recommendations, fiduciary responsibility, binding, underwriting, lending decisions, and licensed solicitation remain with authorized client personnel."
      ctaLabel="Explore Financial Services Infrastructure"
      industryName="Financial Services"
      slug="financial-services"
    />
  );
}
