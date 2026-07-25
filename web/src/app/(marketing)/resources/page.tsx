import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/heroes/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";
import { Accordion } from "@/components/content/Accordion";
import { CapabilityCard } from "@/components/content/CapabilityCard";

export const metadata: Metadata = pageMetadata({
  title: "Resource Library",
  description: "Insights, playbooks, case studies, and frequently asked questions about Omnikom Revenue Infrastructure.",
  path: "/resources",
});

const LINKS = [
  { title: "insights", description: "Revenue Infrastructure articles and frameworks.", href: "/insights" },
  { title: "case studies", description: "The infrastructure behind the outcome.", href: "/case-studies" },
  { title: "compliance principles", description: "Compliance-aware infrastructure, clear responsibility boundaries.", href: "/compliance" },
];

const FAQS = [
  { question: "What is Revenue Infrastructure?", answer: "Revenue Infrastructure is the complete operating layer connecting target markets and existing databases to qualified opportunities, CRM delivery, routing, reporting, and optimization." },
  { question: "Is Omnikom a lead-generation company?", answer: "No. Lead generation is one component. Omnikom operates the broader infrastructure around data, outreach, qualification, routing, follow-up, QA, and reporting." },
  { question: "Is Omnikom a call center?", answer: "No. Callers may operate inside a Revenue Lane, but the product is the managed system surrounding them." },
  { question: "Does Omnikom guarantee revenue?", answer: "No. Omnikom guarantees approved operating standards within its control. The client owns sales conversion, regulated activity, contracts, closing, and fulfillment." },
  { question: "How long does implementation take?", answer: "Timing depends on data, integrations, recruiting, compliance, and complexity. A standard lane may launch in several weeks, while enterprise deployments may require a longer implementation." },
  { question: "Why is there a calibration period?", answer: "The first operating period is used to improve data quality, contact timing, messaging, qualification, handoff, and client response." },
  { question: "Can Omnikom work inside our CRM?", answer: "Yes, subject to system compatibility, access, security, and the agreed scope." },
  { question: "Can Omnikom support multiple locations?", answer: "Yes. Opportunities can be routed by geography, service line, team, location, or business unit." },
  { question: "Can Omnikom reactivate our existing database?", answer: "Yes, when the client has a lawful basis to use the data and the campaign is approved." },
  { question: "Does Omnikom provide people only?", answer: "Recruitment-only support can be available, but the primary model is managed operating capacity and complete Revenue Infrastructure." },
  { question: "What industries does Omnikom serve?", answer: "Omnikom supports real estate, home services, automotive, B2B, staffing, healthcare, legal, financial services, education, commercial services, and other high-value sectors where structured opportunity flow creates meaningful value." },
  { question: "What is Rainmaker Wealth Innovation's role?", answer: "Rainmaker Wealth Innovation is the strategic financial-services and Philippines workforce partner supporting Omnikom Financial Services Infrastructure." },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero heading="the revenue infrastructure resource library." />

      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <div className="grid gap-4 sm:grid-cols-3">
            {LINKS.map((link) => (
              <CapabilityCard key={link.href} title={link.title} description={link.description} href={link.href} />
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            frequently asked questions.
          </SectionHeading>
          <div className="mt-10 max-w-3xl">
            <Accordion items={FAQS} />
          </div>
        </div>
      </section>
    </>
  );
}
