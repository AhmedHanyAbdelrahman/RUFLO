import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/heroes/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";

export const metadata: Metadata = pageMetadata({
  title: "Compliance Principles",
  description: "Compliance-aware infrastructure. Clear responsibility boundaries.",
  path: "/compliance",
});

const SECTIONS = ["Approved scripts", "DNC and suppression", "Calling windows", "Opt-out handling", "Data handling", "Recordkeeping", "QA", "Regulated handoff", "Client responsibility"];

const INDUSTRY_BOUNDARIES = [
  { industry: "Financial Services", note: "Omnikom personnel do not provide financial advice, make fiduciary recommendations, bind policies, approve loans, or perform licensed activity unless separately licensed and authorized." },
  { industry: "Legal", note: "Omnikom personnel do not provide legal advice or represent that a matter will be accepted." },
  { industry: "Healthcare", note: "Omnikom personnel do not diagnose, recommend treatment, or disclose protected information outside approved workflows." },
  { industry: "Real Estate", note: "Omnikom personnel do not perform licensed brokerage activity unless specifically structured and supervised." },
];

export default function CompliancePage() {
  return (
    <>
      <PageHero
        heading="compliance-aware infrastructure. clear responsibility boundaries."
        body="Omnikom designs and operates compliance-oriented workflows, including approved scripts, list hygiene, opt-out handling, call logging, qualification boundaries, CRM documentation, and quality assurance. Clients remain responsible for legal, regulatory, licensing, product, and sales compliance specific to their business."
      />

      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            what we build into every operation.
          </SectionHeading>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SECTIONS.map((item) => (
              <li key={item} className="rounded-[12px] border border-border bg-ink-card px-5 py-4 text-sm text-gray-300">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border bg-ink">
        <div className="container-page py-20 md:py-24">
          <SectionHeading className="max-w-2xl lowercase">
            industry boundaries.
          </SectionHeading>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {INDUSTRY_BOUNDARIES.map((b) => (
              <div key={b.industry} className="rounded-[16px] border border-warning/40 bg-ink-card p-6">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-warning">{b.industry}</h3>
                <p className="text-sm leading-relaxed text-gray-300">{b.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-xs text-gray-500">
            This compliance information is general and does not constitute
            legal advice.
          </p>
        </div>
      </section>
    </>
  );
}
