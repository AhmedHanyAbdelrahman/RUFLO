import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/content/SectionEyebrow";
import { SectionHeading } from "@/components/content/SectionHeading";
import { PullQuote } from "@/components/content/PullQuote";
import { CapabilityCard } from "@/components/content/CapabilityCard";
import { RevenueLaneCard } from "@/components/content/RevenueLaneCard";
import { IndustryCard } from "@/components/content/IndustryCard";
import { OwnershipSplit } from "@/components/content/OwnershipSplit";
import { RevenueLoopDiagram } from "@/components/diagrams/RevenueLoopDiagram";
import { PrimaryCTASection } from "@/components/conversion/PrimaryCTASection";

export const metadata: Metadata = pageMetadata({
  title: "Omnikom | Revenue Infrastructure for High-Growth Companies",
  description:
    "Omnikom designs, deploys, and operates revenue acquisition infrastructure across data, outreach, qualification, CRM routing, AI, workforce, and reporting.",
  path: "/",
});

const CAPABILITIES = [
  { title: "market strategy", description: "Define the market, ICP, commercial objective, qualification standard, and lane economics." },
  { title: "data infrastructure", description: "Source, enrich, clean, segment, and maintain the data powering the lane." },
  { title: "outreach operations", description: "Operate approved calling, response, reactivation, and follow-up workflows." },
  { title: "qualification", description: "Capture fit, need, intent, authority, timeline, context, and the agreed next action." },
  { title: "crm and routing", description: "Deliver every opportunity with structured notes, source, owner, status, and next step." },
  { title: "ai and automation", description: "Generate summaries, classifications, alerts, workflow triggers, and recommendations." },
  { title: "quality and governance", description: "Monitor accuracy, adherence, attendance, continuity, and operating standards." },
  { title: "revenue intelligence", description: "Measure performance, compare markets, capture outcomes, and optimize the lane." },
];

const SOLUTIONS = [
  { title: "acquire", description: "Create new qualified opportunities from target markets.", href: "/solutions/acquire" },
  { title: "reactivate", description: "Recover value from dormant customers, past leads, old estimates, and inactive accounts.", href: "/solutions/reactivate" },
  { title: "qualify and route", description: "Turn conversations into structured opportunities delivered to the correct team.", href: "/solutions/qualify-route" },
  { title: "improve speed-to-lead", description: "Respond to inbound demand before commercial intent disappears.", href: "/solutions/speed-to-lead" },
  { title: "nurture and recover", description: "Manage callbacks, no-shows, future-timeline prospects, and incomplete opportunities.", href: "/solutions/nurture-recovery" },
  { title: "operate departments", description: "Deploy complete revenue, customer-support, onboarding, or back-office functions.", href: "/solutions/managed-departments" },
];

const REVENUE_LANES = [
  { stage: "stage 1", name: "validate", objective: "Test one market, ICP, service, or commercial thesis with controlled infrastructure.", href: "/revenue-lanes/validation" },
  { stage: "stage 2", name: "grow", objective: "Create consistent weekly opportunity flow around a proven offer.", href: "/revenue-lanes/growth" },
  { stage: "stage 3", name: "expand", objective: "Add markets, locations, ICPs, service lines, and reactivation workflows.", href: "/revenue-lanes/expansion" },
  { stage: "stage 4", name: "enterprise", objective: "Operate governed, multi-lane infrastructure across teams, territories, or portfolio companies.", href: "/revenue-lanes/enterprise" },
];

const INDUSTRIES = [
  { name: "real estate", problem: "Seller acquisition, listing opportunities, investor pipelines, and property-owner outreach.", href: "/industries/real-estate" },
  { name: "home services", problem: "Inspections, estimates, replacements, maintenance, and past-opportunity reactivation.", href: "/industries/roofing-home-services" },
  { name: "automotive", problem: "Declined-service recovery, inactive customer reactivation, fleet outreach, and multi-location service growth.", href: "/industries/automotive" },
  { name: "b2b and saas", problem: "Decision-maker outreach, account-based campaigns, pipeline development, and market entry.", href: "/industries/b2b-saas" },
  { name: "staffing", problem: "Employer acquisition, job-order creation, dormant account reactivation, and vertical expansion.", href: "/industries/staffing" },
  { name: "healthcare and dental", problem: "Patient reactivation, treatment-plan recovery, consultation coordination, and no-show recovery.", href: "/industries/dental-healthcare" },
  { name: "legal", problem: "Approved consultation, intake, and past-inquiry workflows within defined compliance boundaries.", href: "/industries/legal" },
  { name: "financial services", problem: "Policy reviews, renewals, client onboarding, document collection, and managed workforce infrastructure.", href: "/industries/financial-services" },
  { name: "education", problem: "Enrollment consultation, inquiry reactivation, event follow-up, and student retention.", href: "/industries/education" },
  { name: "commercial services", problem: "Decision-maker meetings, contract opportunities, facility outreach, and project pipelines.", href: "/industries/commercial-industrial" },
];

const PROCESS_STEPS = ["Assess", "Architect", "Build", "Launch", "Calibrate", "Operate", "Expand"];

const TECHNOLOGY_CARDS = [
  "AI conversation summaries",
  "Qualification classification",
  "CRM workflow automation",
  "Opportunity routing",
  "QA intelligence",
  "Performance dashboards",
  "Next-action recommendations",
  "Source attribution",
];

const PILLARS = [
  { title: "accountable", description: "One operating partner owns the lane from data to qualified handoff." },
  { title: "configurable", description: "Every lane is built around a specific market, ICP, workflow, and qualification standard." },
  { title: "scalable", description: "Add markets, locations, service lines, business units, and departments without rebuilding the function." },
  { title: "measurable", description: "Every opportunity includes source, activity, context, status, owner, and next action." },
];

const OUTCOME_CARDS = [
  { title: "operational clarity", description: "One source of truth from market selection to opportunity handoff." },
  { title: "repeatable execution", description: "A system that operates beyond individual hires or vendors." },
  { title: "scalable capacity", description: "The ability to expand acquisition without rebuilding the function." },
];

export default function HomePage() {
  return (
    <>
      {/* 5.3 Hero */}
      <section className="border-b border-border bg-ink">
        <div className="container-page flex min-h-[720px] flex-col justify-center gap-8 py-20 md:py-28">
          <SectionEyebrow>revenue infrastructure</SectionEyebrow>
          <SectionHeading as="h1" size="display" className="max-w-3xl lowercase">
            build revenue. not headcount.
          </SectionHeading>
          <div className="max-w-xl space-y-4 text-lg leading-relaxed text-gray-300">
            <p>
              Omnikom designs, deploys, and operates the systems behind
              outbound acquisition, customer reactivation, qualification,
              routing, and revenue growth.
            </p>
            <p>
              Create predictable qualified opportunity flow without
              rebuilding the entire acquisition function internally.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button label="Book a Revenue Infrastructure Consultation" href="/consultation" style="primary" />
            <Button label="Explore the Platform" href="/platform" style="secondary" />
          </div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Strategy. Data. Outreach. Qualification. CRM. AI. Reporting. One operating system.
          </p>
          <div className="mt-6 overflow-x-auto">
            <RevenueLoopDiagram />
          </div>
          <p className="max-w-xl text-sm text-gray-500">
            Built for companies where one qualified opportunity can create
            meaningful commercial value.
          </p>
        </div>
      </section>

      {/* 5.4 Category Shift */}
      <section className="border-b border-border bg-blue">
        <div className="container-page py-24">
          <SectionEyebrow>the category shift</SectionEyebrow>
          <SectionHeading className="max-w-2xl lowercase">
            outbound should not feel fragmented.
          </SectionHeading>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-100">
            Most companies assemble outbound growth from disconnected people,
            software, data vendors, scripts, managers, and reporting systems.
            Each piece creates another dependency. Omnikom replaces the
            fragmented stack with one managed Revenue Infrastructure layer.
          </p>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="rounded-[16px] border border-blue-bright bg-blue-bright/40 p-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
                assembled outbound
              </h3>
              <ul className="space-y-2 text-sm text-gray-100">
                {["Multiple vendors", "Separate tools", "Inconsistent quality", "Weak attribution", "High management load"].map((i) => (
                  <li key={i}>— {i}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[16px] border border-blue-bright bg-blue-bright/40 p-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
                internal build
              </h3>
              <ul className="space-y-2 text-sm text-gray-100">
                {["Recruiting", "Training", "Software", "Leadership", "Replacement", "QA", "Reporting"].map((i) => (
                  <li key={i}>— {i}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[16px] border border-lime bg-lime p-6 text-ink">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">
                omnikom infrastructure
              </h3>
              <ul className="space-y-2 text-sm">
                {["One accountable operator", "One qualification standard", "One source of truth", "One expansion model"].map((i) => (
                  <li key={i}>— {i}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10">
            <Button label="See How the Infrastructure Works" href="/revenue-infrastructure" style="secondary" className="!border-white !text-white hover:!bg-white hover:!text-ink" />
          </div>
        </div>
      </section>

      {/* 5.5 Revenue Infrastructure Definition */}
      <section className="border-b border-border bg-ink">
        <div className="container-page py-24">
          <SectionHeading className="max-w-2xl lowercase">
            from target market to qualified opportunity.
          </SectionHeading>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
            Revenue Infrastructure is the complete operating layer behind
            customer acquisition and reactivation. It connects market
            strategy, data, outreach, qualification, CRM delivery, AI,
            workforce, quality assurance, and reporting.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((c) => (
              <CapabilityCard key={c.title} title={c.title} description={c.description} />
            ))}
          </div>
          <div className="mt-14">
            <PullQuote>The lane—not the caller—is the product.</PullQuote>
          </div>
        </div>
      </section>

      {/* 5.6 Solutions */}
      <section className="border-b border-border bg-ink">
        <div className="container-page py-24">
          <SectionEyebrow>business objectives</SectionEyebrow>
          <SectionHeading className="max-w-2xl lowercase">
            infrastructure built around the outcome you need.
          </SectionHeading>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((s) => (
              <CapabilityCard key={s.href} title={s.title} description={s.description} href={s.href} />
            ))}
          </div>
        </div>
      </section>

      {/* 5.7 Revenue Lanes */}
      <section className="border-b border-border bg-blue">
        <div className="container-page py-24">
          <SectionEyebrow>deployment model</SectionEyebrow>
          <SectionHeading className="max-w-2xl lowercase">
            start with one lane. expand into infrastructure.
          </SectionHeading>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-100">
            Every Revenue Lane is designed around a clear commercial
            objective, target audience, operating workflow, qualification
            framework, and delivery destination.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {REVENUE_LANES.map((lane) => (
              <RevenueLaneCard key={lane.href} {...lane} />
            ))}
          </div>
          <p className="mt-10 max-w-xl text-sm text-gray-300">
            Pricing is designed after the business model, market, complexity,
            and required capacity are understood.
          </p>
          <div className="mt-6">
            <Button label="Explore Revenue Lanes" href="/revenue-lanes" style="secondary" className="!border-white !text-white hover:!bg-white hover:!text-ink" />
          </div>
        </div>
      </section>

      {/* 5.8 Industries */}
      <section className="border-b border-border bg-ink">
        <div className="container-page py-24">
          <SectionHeading className="max-w-2xl lowercase">
            one platform. configured for your industry.
          </SectionHeading>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
            The infrastructure remains consistent. The data, language,
            qualification, workflows, economics, and compliance controls
            change by vertical.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((industry) => (
              <IndustryCard key={industry.href} {...industry} />
            ))}
          </div>
          <div className="mt-10">
            <Button label="Explore All Industries" href="/industries" style="secondary" />
          </div>
        </div>
      </section>

      {/* 5.9 Operating System / process (lime) */}
      <section className="border-b border-border bg-lime text-ink">
        <div className="container-page py-24">
          <SectionHeading className="max-w-2xl lowercase text-ink">
            always moving. always in control.
          </SectionHeading>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
            Omnikom does not launch generic campaigns. Every engagement
            begins with the client&rsquo;s economics, market, sales process,
            operating capacity, and compliance boundaries.
          </p>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
            {PROCESS_STEPS.map((step, index) => (
              <li
                key={step}
                className="rounded-[14px] border border-ink/20 bg-ink p-4 text-center text-white"
              >
                <span className="block text-xs font-semibold text-lime">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-2 block text-sm font-semibold lowercase">
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Button
              label="View the Complete Process"
              href="/how-it-works"
              style="secondary"
              className="!border-ink !text-ink hover:!bg-ink hover:!text-lime"
            />
          </div>
        </div>
      </section>

      {/* 5.10 Technology */}
      <section className="border-b border-border bg-ink">
        <div className="container-page py-24">
          <SectionHeading className="max-w-2xl lowercase">
            technology inside. operating outcomes outside.
          </SectionHeading>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
            Omnikom&rsquo;s AI and automation capabilities are embedded
            inside each lane to improve speed, consistency, routing,
            visibility, and management. The technology is not presented as a
            separate miracle product. It makes the infrastructure more
            reliable.
          </p>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TECHNOLOGY_CARDS.map((item) => (
              <div
                key={item}
                className="rounded-[14px] border border-border bg-ink-card p-5 text-sm font-medium text-white"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button label="Explore AI and Automation" href="/ai-automation" style="secondary" />
          </div>
        </div>
      </section>

      {/* 5.11 Ownership Split */}
      <section className="border-b border-border bg-ink">
        <div className="container-page py-24">
          <SectionHeading className="max-w-2xl lowercase">
            clear ownership creates better execution.
          </SectionHeading>
          <div className="mt-12">
            <OwnershipSplit
              omnikomOwns={["Lane strategy", "Data workflows", "Outreach operations", "Qualification", "CRM delivery", "Routing", "QA", "Reporting", "Managed follow-up", "Optimization"]}
              clientOwns={["Offer", "Pricing", "Sales response", "Negotiation", "Regulated activity", "Contracts", "Closing", "Fulfillment", "Customer experience", "Outcome feedback"]}
            />
          </div>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-gray-300">
            Omnikom creates and manages qualified revenue opportunities. Your
            team converts them into customers, transactions, contracts,
            appointments, or accounts.
          </p>
        </div>
      </section>

      {/* 5.12 Why Omnikom */}
      <section className="border-b border-border bg-blue">
        <div className="container-page py-24">
          <SectionHeading className="max-w-2xl lowercase">
            built as infrastructure. managed as an operating system.
          </SectionHeading>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="rounded-[16px] border border-blue-bright bg-blue-bright/30 p-6">
                <h3 className="mb-3 text-lg font-semibold lowercase text-white">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-gray-100">{pillar.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button label="Why Companies Choose Omnikom" href="/why-omnikom" style="secondary" className="!border-white !text-white hover:!bg-white hover:!text-ink" />
          </div>
        </div>
      </section>

      {/* 5.13 Results Philosophy */}
      <section className="border-b border-border bg-ink">
        <div className="container-page py-24">
          <SectionHeading className="max-w-2xl lowercase">
            we do not sell promises. we build the system behind performance.
          </SectionHeading>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
            Omnikom does not guarantee closed revenue, signed contracts,
            policies, cases, transactions, or commissions. We commit to the
            operating standards we control: approved data workflows,
            execution, qualification, CRM delivery, reporting, quality
            assurance, recovery, and optimization.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {OUTCOME_CARDS.map((card) => (
              <div key={card.title} className="rounded-[16px] border border-border bg-ink-card p-6">
                <h3 className="mb-3 text-lg font-semibold lowercase text-white">{card.title}</h3>
                <p className="text-sm leading-relaxed text-gray-300">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.14 Ideal Client */}
      <section className="border-b border-border bg-ink">
        <div className="container-page py-24">
          <SectionHeading className="max-w-2xl lowercase">
            built for companies ready to operate growth seriously.
          </SectionHeading>
          <div className="mt-12">
            <OwnershipSplit
              omnikomLabel="Strong Fit"
              clientLabel="Not a Fit"
              omnikomOwns={["Proven offer", "Meaningful customer value", "Sales or service capacity", "CRM readiness", "Clear target market", "Need for predictable opportunity flow", "Willingness to provide outcome feedback", "Commitment to calibration"]}
              clientOwns={["Unproven offer", "No response capacity", "No legal basis for outreach", "Expectation of guaranteed revenue", "Refusal to use CRM", "Need for the cheapest hourly labor only"]}
            />
          </div>
        </div>
      </section>

      {/* 5.15 Final CTA */}
      <PrimaryCTASection
        heading="design the revenue infrastructure behind your next stage of growth."
        body="Every company has different customer economics, markets, workflows, and operating constraints. Omnikom designs the lane around the business—not around a generic package."
        primaryCta={{ label: "Book a Revenue Infrastructure Consultation", href: "/consultation" }}
        secondaryCta={{ label: "Download the Revenue Infrastructure Overview", href: "/resources" }}
        microcopy="No fixed public packages. Start with the business model."
        theme="lime"
      />
    </>
  );
}
