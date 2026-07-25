import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionEyebrow } from "@/components/content/SectionEyebrow";
import { SectionHeading } from "@/components/content/SectionHeading";
import { PullQuote } from "@/components/content/PullQuote";
import { CapabilityCard } from "@/components/content/CapabilityCard";
import { RevenueLaneCard } from "@/components/content/RevenueLaneCard";
import { IndustryCard } from "@/components/content/IndustryCard";
import { OwnershipSplit } from "@/components/content/OwnershipSplit";
import { StatStrip } from "@/components/content/StatStrip";
import { RevenueLoopDiagram } from "@/components/diagrams/RevenueLoopDiagram";
import { PrimaryCTASection } from "@/components/conversion/PrimaryCTASection";

export const metadata: Metadata = pageMetadata({
  title: "Omnikom | Revenue Infrastructure for High-Growth Companies",
  description:
    "Omnikom designs, deploys, and operates revenue acquisition infrastructure across data, outreach, qualification, CRM routing, AI, workforce, and reporting.",
  path: "/",
});

const HERO_STATS = [
  { value: "9", label: "Operating layers" },
  { value: "13", label: "Industries served" },
  { value: "4", label: "Lane maturity stages" },
  { value: "1", label: "Accountable system" },
];

const CAPABILITIES: { title: string; description: string; icon: IconName }[] = [
  { title: "market strategy", description: "ICP, objective, and lane economics.", icon: "target" },
  { title: "data infrastructure", description: "Sourced, enriched, and segmented.", icon: "database" },
  { title: "outreach operations", description: "Calling, response, and reactivation.", icon: "signal" },
  { title: "qualification", description: "Fit, intent, authority, timeline.", icon: "shield-check" },
  { title: "crm and routing", description: "Delivered with source and owner.", icon: "route" },
  { title: "ai and automation", description: "Summaries, alerts, and triggers.", icon: "cpu" },
  { title: "quality and governance", description: "Accuracy and operating standards.", icon: "shield" },
  { title: "revenue intelligence", description: "Performance and market comparisons.", icon: "bar-chart" },
];

const SOLUTIONS: { title: string; description: string; href: string; icon: IconName }[] = [
  { title: "acquire", description: "New qualified opportunities from target markets.", href: "/solutions/acquire", icon: "target" },
  { title: "reactivate", description: "Recover value from dormant customers and past leads.", href: "/solutions/reactivate", icon: "refresh" },
  { title: "qualify and route", description: "Structured opportunities delivered to the right team.", href: "/solutions/qualify-route", icon: "filter" },
  { title: "speed-to-lead", description: "Respond while commercial intent is still active.", href: "/solutions/speed-to-lead", icon: "zap" },
  { title: "nurture and recover", description: "Callbacks, no-shows, and future-timeline follow-up.", href: "/solutions/nurture-recovery", icon: "heart" },
  { title: "operate departments", description: "Complete revenue, support, or back-office functions.", href: "/solutions/managed-departments", icon: "building" },
];

const REVENUE_LANES: { stage: string; name: string; objective: string; href: string; icon: IconName }[] = [
  { stage: "stage 1", name: "validate", objective: "Test one market or thesis with controlled infrastructure.", href: "/revenue-lanes/validation", icon: "target" },
  { stage: "stage 2", name: "grow", objective: "Consistent weekly opportunity flow around a proven offer.", href: "/revenue-lanes/growth", icon: "bar-chart" },
  { stage: "stage 3", name: "expand", objective: "Add markets, locations, ICPs, and service lines.", href: "/revenue-lanes/expansion", icon: "expand" },
  { stage: "stage 4", name: "enterprise", objective: "Governed, multi-lane infrastructure across the organization.", href: "/revenue-lanes/enterprise", icon: "building" },
];

const INDUSTRIES: { name: string; problem: string; href: string; icon: IconName }[] = [
  { name: "real estate", problem: "Seller acquisition and investor pipelines.", href: "/industries/real-estate", icon: "building" },
  { name: "home services", problem: "Inspections, estimates, and reactivation.", href: "/industries/roofing-home-services", icon: "layers" },
  { name: "automotive", problem: "Declined-service recovery and fleet outreach.", href: "/industries/automotive", icon: "zap" },
  { name: "b2b and saas", problem: "Decision-maker meetings and account outreach.", href: "/industries/b2b-saas", icon: "cpu" },
  { name: "staffing", problem: "Employer acquisition and job orders.", href: "/industries/staffing", icon: "users" },
  { name: "healthcare and dental", problem: "Patient reactivation and consultations.", href: "/industries/dental-healthcare", icon: "heart" },
  { name: "legal", problem: "Consultation and intake, compliance-bound.", href: "/industries/legal", icon: "shield-check" },
  { name: "financial services", problem: "Policy reviews and managed operations.", href: "/industries/financial-services", icon: "bar-chart" },
  { name: "education", problem: "Enrollment consultation and reactivation.", href: "/industries/education", icon: "globe" },
  { name: "commercial services", problem: "Decision-maker meetings and projects.", href: "/industries/commercial-industrial", icon: "route" },
];

const PROCESS_STEPS = ["Assess", "Architect", "Build", "Launch", "Calibrate", "Operate", "Expand"];

const TECHNOLOGY_CARDS: { label: string; icon: IconName }[] = [
  { label: "AI conversation summaries", icon: "cpu" },
  { label: "Qualification classification", icon: "shield-check" },
  { label: "CRM workflow automation", icon: "route" },
  { label: "Opportunity routing", icon: "target" },
  { label: "QA intelligence", icon: "shield" },
  { label: "Performance dashboards", icon: "bar-chart" },
  { label: "Next-action recommendations", icon: "zap" },
  { label: "Source attribution", icon: "database" },
];

const PILLARS: { title: string; description: string; icon: IconName }[] = [
  { title: "accountable", description: "One operating partner owns the lane end to end.", icon: "shield" },
  { title: "configurable", description: "Built around your market, ICP, and workflow.", icon: "target" },
  { title: "scalable", description: "Add markets and business units without rebuilding.", icon: "expand" },
  { title: "measurable", description: "Every opportunity has source, status, and owner.", icon: "bar-chart" },
];

const OUTCOME_CARDS: { title: string; description: string; icon: IconName }[] = [
  { title: "operational clarity", description: "One source of truth, market to handoff.", icon: "layers" },
  { title: "repeatable execution", description: "A system beyond any single hire or vendor.", icon: "refresh" },
  { title: "scalable capacity", description: "Expand acquisition without rebuilding the function.", icon: "expand" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-ink">
        <div className="container-page grid gap-12 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="flex flex-col gap-7">
            <SectionEyebrow>revenue infrastructure</SectionEyebrow>
            <SectionHeading as="h1" size="display" className="lowercase">
              build revenue. not headcount.
            </SectionHeading>
            <p className="max-w-xl text-lg leading-relaxed text-gray-300">
              Omnikom designs, deploys, and operates the systems behind
              outbound acquisition, reactivation, qualification, and routing —
              so you get predictable opportunity flow without rebuilding the
              function internally.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button label="Book a Revenue Infrastructure Consultation" href="/consultation" style="primary" />
              <Button label="Explore the Platform" href="/platform" style="secondary" />
            </div>
            <div className="mt-4">
              <StatStrip stats={HERO_STATS} />
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-[20px] border border-border bg-ink-card p-6 lg:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
              the closed loop
            </p>
            <div className="overflow-x-auto">
              <RevenueLoopDiagram />
            </div>
            <p className="text-sm text-gray-500">
              One accountable system — from market to qualified opportunity,
              and back.
            </p>
          </div>
        </div>
      </section>

      {/* Category Shift */}
      <section className="border-b border-border bg-blue">
        <div className="container-page py-20 md:py-24">
          <SectionEyebrow>the category shift</SectionEyebrow>
          <SectionHeading className="max-w-2xl lowercase">
            outbound should not feel fragmented.
          </SectionHeading>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-100">
            Omnikom replaces a stack of disconnected vendors, tools, and
            managers with one managed Revenue Infrastructure layer.
          </p>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="rounded-[16px] border border-blue-bright bg-blue-bright/40 p-6">
              <Icon name="x" className="mb-4 h-6 w-6 text-white/70" />
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
                assembled outbound
              </h3>
              <ul className="space-y-2 text-sm text-gray-100">
                {["Multiple vendors", "Separate tools", "Weak attribution", "High management load"].map((i) => (
                  <li key={i}>— {i}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[16px] border border-blue-bright bg-blue-bright/40 p-6">
              <Icon name="layers" className="mb-4 h-6 w-6 text-white/70" />
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
                internal build
              </h3>
              <ul className="space-y-2 text-sm text-gray-100">
                {["Recruiting", "Training", "Leadership", "QA and reporting"].map((i) => (
                  <li key={i}>— {i}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[16px] border border-lime bg-lime p-6 text-ink">
              <Icon name="check" className="mb-4 h-6 w-6" />
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
          <div className="mt-10 flex flex-wrap gap-4">
            <Button label="See How the Infrastructure Works" href="/revenue-infrastructure" style="secondary" className="!border-white !text-white hover:!bg-white hover:!text-ink" />
            <Button label="Book a Consultation" href="/consultation" style="text" className="!text-white" />
          </div>
        </div>
      </section>

      {/* Revenue Infrastructure Definition */}
      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            from target market to qualified opportunity.
          </SectionHeading>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-300">
            One operating layer connects strategy, data, outreach,
            qualification, CRM, AI, workforce, and reporting.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((c) => (
              <CapabilityCard key={c.title} title={c.title} description={c.description} icon={c.icon} />
            ))}
          </div>
          <div className="mt-14">
            <PullQuote>The lane—not the caller—is the product.</PullQuote>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionEyebrow>business objectives</SectionEyebrow>
          <SectionHeading className="max-w-2xl lowercase">
            infrastructure built around the outcome you need.
          </SectionHeading>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((s) => (
              <CapabilityCard key={s.href} title={s.title} description={s.description} href={s.href} icon={s.icon} />
            ))}
          </div>
        </div>
      </section>

      {/* Revenue Lanes */}
      <section className="border-b border-border bg-blue">
        <div className="container-page py-20 md:py-24">
          <SectionEyebrow>deployment model</SectionEyebrow>
          <SectionHeading className="max-w-2xl lowercase">
            start with one lane. expand into infrastructure.
          </SectionHeading>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-100">
            Every Revenue Lane targets one objective, one audience, and one
            qualification standard.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {REVENUE_LANES.map((lane) => (
              <RevenueLaneCard key={lane.href} {...lane} />
            ))}
          </div>
          <p className="mt-10 max-w-xl text-sm text-gray-300">
            Pricing is designed after the business model and required
            capacity are understood — no fixed public packages.
          </p>
          <div className="mt-6">
            <Button label="Explore Revenue Lanes" href="/revenue-lanes" style="secondary" className="!border-white !text-white hover:!bg-white hover:!text-ink" />
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            one platform. configured for your industry.
          </SectionHeading>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-300">
            The infrastructure stays consistent. The data, language, and
            qualification change by vertical.
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

      {/* Mid-page CTA banner */}
      <section className="border-b border-border bg-lime">
        <div className="container-page flex flex-col items-start justify-between gap-6 py-10 text-ink md:flex-row md:items-center">
          <p className="text-xl font-semibold lowercase md:max-w-xl">
            not sure which lane fits your business? we&rsquo;ll map it in one working session.
          </p>
          <Button
            label="Book a Revenue Infrastructure Consultation"
            href="/consultation"
            style="secondary"
            className="!border-ink !text-ink shrink-0 hover:!bg-ink hover:!text-lime"
          />
        </div>
      </section>

      {/* Operating System / process */}
      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            always moving. always in control.
          </SectionHeading>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-300">
            Every engagement starts with your economics, market, and
            compliance boundaries — not a generic campaign.
          </p>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
            {PROCESS_STEPS.map((step, index) => (
              <li
                key={step}
                className="rounded-[14px] border border-border bg-ink-card p-4 text-center transition-colors duration-150 hover:border-lime"
              >
                <span className="block text-xs font-semibold text-lime">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-2 block text-sm font-semibold lowercase text-white">
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Button label="View the Complete Process" href="/how-it-works" style="secondary" />
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            technology inside. operating outcomes outside.
          </SectionHeading>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-300">
            AI and automation are embedded inside each lane to improve speed
            and consistency — not sold as a separate product.
          </p>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TECHNOLOGY_CARDS.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-[14px] border border-border bg-ink-card p-5 text-sm font-medium text-white"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-ink text-lime">
                  <Icon name={item.icon} className="h-4 w-4" />
                </span>
                {item.label}
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button label="Explore AI and Automation" href="/ai-automation" style="secondary" />
          </div>
        </div>
      </section>

      {/* Ownership Split */}
      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            clear ownership creates better execution.
          </SectionHeading>
          <div className="mt-10">
            <OwnershipSplit
              omnikomOwns={["Lane strategy", "Data workflows", "Outreach operations", "Qualification", "CRM delivery", "Routing", "QA", "Reporting"]}
              clientOwns={["Offer & pricing", "Sales response", "Negotiation", "Regulated activity", "Contracts", "Closing", "Fulfillment", "Outcome feedback"]}
            />
          </div>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-gray-300">
            Omnikom creates and manages qualified opportunities. Your team
            converts them into customers, contracts, or accounts.
          </p>
        </div>
      </section>

      {/* Why Omnikom */}
      <section className="border-b border-border bg-blue">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            built as infrastructure. managed as an operating system.
          </SectionHeading>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="rounded-[16px] border border-blue-bright bg-blue-bright/30 p-6">
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[10px] bg-blue-bright text-lime">
                  <Icon name={pillar.icon} className="h-5 w-5" />
                </span>
                <h3 className="mb-2 text-lg font-semibold lowercase text-white">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-gray-100">{pillar.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button label="Why Companies Choose Omnikom" href="/why-omnikom" style="secondary" className="!border-white !text-white hover:!bg-white hover:!text-ink" />
          </div>
        </div>
      </section>

      {/* Results Philosophy */}
      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            we do not sell promises. we build the system behind performance.
          </SectionHeading>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-300">
            Omnikom does not guarantee closed revenue or signed contracts. We
            commit to the operating standards we control.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {OUTCOME_CARDS.map((card) => (
              <div key={card.title} className="rounded-[16px] border border-border bg-ink-card p-6">
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[10px] bg-ink text-lime">
                  <Icon name={card.icon} className="h-5 w-5" />
                </span>
                <h3 className="mb-2 text-lg font-semibold lowercase text-white">{card.title}</h3>
                <p className="text-sm leading-relaxed text-gray-300">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal Client */}
      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            built for companies ready to operate growth seriously.
          </SectionHeading>
          <div className="mt-10">
            <OwnershipSplit
              omnikomLabel="Strong Fit"
              clientLabel="Not a Fit"
              omnikomOwns={["Proven offer", "Meaningful customer value", "Sales capacity", "CRM readiness", "Clear target market", "Commitment to calibration"]}
              clientOwns={["Unproven offer", "No response capacity", "No legal basis for outreach", "Expects guaranteed revenue", "Refuses CRM use", "Wants cheapest labor only"]}
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <PrimaryCTASection
        heading="design the revenue infrastructure behind your next stage of growth."
        body="Every company has different economics, markets, and constraints. Omnikom designs the lane around your business — not a generic package."
        primaryCta={{ label: "Book a Revenue Infrastructure Consultation", href: "/consultation" }}
        secondaryCta={{ label: "Download the Revenue Infrastructure Overview", href: "/resources" }}
        microcopy="No fixed public packages. Start with the business model."
        theme="lime"
      />
    </>
  );
}
