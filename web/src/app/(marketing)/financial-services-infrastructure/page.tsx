import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { SectionEyebrow } from "@/components/content/SectionEyebrow";
import { SectionHeading } from "@/components/content/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CapabilityCard } from "@/components/content/CapabilityCard";
import { PrimaryCTASection } from "@/components/conversion/PrimaryCTASection";

export const metadata: Metadata = pageMetadata({
  title: "Omnikom Financial Services Infrastructure | Powered by Rainmaker Wealth Innovation",
  description: "Revenue, workforce, AI, client-support, onboarding, and back-office infrastructure for financial-services companies across Egypt and the Philippines.",
  path: "/financial-services-infrastructure",
});

const MODULES = [
  { title: "revenue operations", description: "Lead qualification, appointment coordination, CRM administration, and renewal outreach." },
  { title: "workforce infrastructure", description: "Role design, recruitment, screening, training, deployment, and continuity." },
  { title: "business operations", description: "Client onboarding, customer support, document processing, and back-office administration." },
  { title: "ai and workflow engineering", description: "CRM automation, AI call summaries, lead classification, and dashboards." },
  { title: "governance", description: "SOPs, KPIs, QA scorecards, attendance monitoring, and client reporting." },
];

const WHO_WE_SERVE = ["Wealth management", "Financial advisory", "Mortgage", "Insurance", "Lending", "Fintech", "Payments", "Accounting", "Bookkeeping", "Tax services", "Real estate finance", "Financial education"];

const PROCESS = ["Discovery", "Process Mapping", "Role and Workflow Design", "Talent Selection", "Training and Deployment", "Managed Operations", "QA and Reporting", "Optimization and Expansion"];

export default function FinancialServicesInfrastructurePage() {
  return (
    <>
      {/* Hero — Omnikom-first hierarchy */}
      <section className="border-b border-border bg-ink">
        <div className="container-page flex min-h-[460px] flex-col justify-center gap-6 py-24">
          <SectionEyebrow>revenue and operations infrastructure for financial services</SectionEyebrow>
          <SectionHeading as="h1" size="h1" className="max-w-3xl lowercase">
            build financial operations. not operational complexity.
          </SectionHeading>
          <p className="max-w-2xl text-lg leading-relaxed text-gray-300">
            Omnikom Financial Services Infrastructure helps financial
            organizations recruit, deploy, manage, automate, and scale
            revenue and operations teams through one integrated platform
            powered by delivery capabilities across Egypt and the
            Philippines.
          </p>
          <p className="text-sm font-semibold uppercase tracking-wide text-lime">
            Powered by Rainmaker Wealth Innovation
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button label="Build My Financial Operations Infrastructure" href="/consultation" style="primary" />
            <Button label="Explore the Operating Model" href="/platform" style="secondary" />
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            financial services requires more than outsourced headcount.
          </SectionHeading>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
            Financial organizations operate under high expectations for
            responsiveness, documentation, consistency, customer experience,
            and compliance. Building capacity through separate recruiters,
            staffing vendors, call centers, software tools, trainers, and
            managers creates operational complexity. Omnikom and Rainmaker
            bring those capabilities into one coordinated infrastructure
            model.
          </p>
        </div>
      </section>

      {/* Two global talent hubs */}
      <section className="border-b border-border bg-blue">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            two global talent hubs. one operating standard.
          </SectionHeading>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-[16px] border border-blue-bright bg-blue-bright/40 p-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
                egypt — omnikom
              </h3>
              <ul className="space-y-2 text-sm text-gray-100">
                {["Revenue operations", "Outbound infrastructure", "AI and automation", "Data and CRM architecture", "QA", "Technology", "Operations management"].map((i) => (
                  <li key={i}>— {i}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[16px] border border-blue-bright bg-blue-bright/40 p-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
                philippines — rainmaker
              </h3>
              <ul className="space-y-2 text-sm text-gray-100">
                {["Financial-services recruiting", "Talent sourcing", "Client-service professionals", "Administrative operations", "Workforce deployment", "Relationship development"].map((i) => (
                  <li key={i}>— {i}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[16px] border border-lime bg-lime p-6 text-ink">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">
                joint layer
              </h3>
              <ul className="space-y-2 text-sm">
                {["Client discovery", "Process mapping", "Training", "Deployment", "Performance governance", "Reporting", "Expansion"].map((i) => (
                  <li key={i}>— {i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure modules */}
      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            infrastructure modules.
          </SectionHeading>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((m) => (
              <CapabilityCard key={m.title} title={m.title} description={m.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            who we serve.
          </SectionHeading>
          <ul className="mt-8 flex flex-wrap gap-3">
            {WHO_WE_SERVE.map((item) => (
              <li key={item} className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-300">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Operating process */}
      <section className="border-b border-border bg-lime text-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase text-ink">
            most outsourcing companies sell hours. this model deploys operating systems.
          </SectionHeading>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
            The partnership combines talent, management, technology, AI,
            quality assurance, workflows, and performance reporting. Clients
            can begin with one professional, a dedicated team, or a complete
            managed function.
          </p>
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, index) => (
              <li key={step} className="rounded-[14px] border border-ink/20 bg-ink p-4 text-center text-white">
                <span className="block text-xs font-semibold text-lime">{String(index + 1).padStart(2, "0")}</span>
                <span className="mt-2 block text-sm font-semibold">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Compliance boundary */}
      <section className="border-b border-border bg-ink">
        <div className="container-page py-14">
          <p className="max-w-2xl rounded-[12px] border border-warning/40 bg-ink-card px-6 py-5 text-sm leading-relaxed text-gray-300">
            Activities requiring licensing, financial advice, fiduciary
            responsibility, underwriting, binding, regulated solicitation, or
            product recommendations remain under the supervision and
            responsibility of appropriately authorized client personnel.
          </p>
        </div>
      </section>

      <PrimaryCTASection
        heading="build your financial operations infrastructure."
        body="Recruit globally. Operate consistently. Scale intelligently."
        primaryCta={{ label: "Book a Financial Infrastructure Consultation", href: "/consultation" }}
        secondaryCta={{ label: "Discuss a Strategic Partnership", href: "/partnerships" }}
        theme="lime"
      />
    </>
  );
}
