export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  href?: string;
  links: NavLink[];
}

// Source: 02_omnikom_website_ux_copy_customer_journey.md §2 (Global Information Architecture)
export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Platform",
    href: "/platform",
    links: [
      { label: "Revenue Infrastructure", href: "/revenue-infrastructure", description: "The complete operating system behind acquisition and reactivation." },
      { label: "Data Infrastructure", href: "/data-infrastructure", description: "Target-market data, enrichment, segmentation, hygiene, and source attribution." },
      { label: "Outreach Operations", href: "/outreach-operations", description: "Managed calling, response, follow-up, and reactivation workflows." },
      { label: "Qualification and Routing", href: "/qualification-routing", description: "Industry-specific qualification, CRM delivery, scoring, and ownership assignment." },
      { label: "AI and Automation", href: "/ai-automation", description: "Summaries, classification, workflow automation, alerts, and next actions." },
      { label: "Revenue Intelligence", href: "/revenue-intelligence", description: "Performance reporting, QA, market comparisons, and optimization." },
      { label: "Workforce Infrastructure", href: "/workforce-infrastructure", description: "Recruitment, training, deployment, management, and continuity." },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    links: [
      { label: "Acquire New Customers", href: "/solutions/acquire" },
      { label: "Reactivate Existing Databases", href: "/solutions/reactivate" },
      { label: "Qualify and Route Opportunities", href: "/solutions/qualify-route" },
      { label: "Improve Speed-to-Lead", href: "/solutions/speed-to-lead" },
      { label: "Nurture and Recover Pipeline", href: "/solutions/nurture-recovery" },
      { label: "Operate Managed Departments", href: "/solutions/managed-departments" },
      { label: "Expand Across Markets", href: "/solutions/multi-market-expansion" },
      { label: "White-Label Revenue Infrastructure", href: "/solutions/white-label" },
    ],
  },
  {
    label: "Revenue Lanes",
    href: "/revenue-lanes",
    links: [
      { label: "Validation Lane", href: "/revenue-lanes/validation" },
      { label: "Growth Lane", href: "/revenue-lanes/growth" },
      { label: "Expansion Infrastructure", href: "/revenue-lanes/expansion" },
      { label: "Enterprise Revenue Infrastructure", href: "/revenue-lanes/enterprise" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    links: [
      { label: "Real Estate and Property", href: "/industries/real-estate" },
      { label: "Roofing and Home Services", href: "/industries/roofing-home-services" },
      { label: "HVAC", href: "/industries/hvac" },
      { label: "Solar", href: "/industries/solar" },
      { label: "Automotive", href: "/industries/automotive" },
      { label: "B2B and SaaS", href: "/industries/b2b-saas" },
      { label: "Staffing and Recruiting", href: "/industries/staffing" },
      { label: "Dental and Healthcare", href: "/industries/dental-healthcare" },
      { label: "Med Spa and Aesthetics", href: "/industries/med-spa" },
      { label: "Legal and Professional Services", href: "/industries/legal" },
      { label: "Financial Services and Insurance", href: "/industries/financial-services" },
      { label: "Education and Training", href: "/industries/education" },
      { label: "Commercial and Industrial Services", href: "/industries/commercial-industrial" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "FAQs", href: "/resources#faq" },
      { label: "Compliance Principles", href: "/compliance" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Partnerships", href: "/partnerships" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const HOW_IT_WORKS_LINK: NavLink = { label: "How It Works", href: "/how-it-works" };
export const WHY_OMNIKOM_LINK: NavLink = { label: "Why Omnikom", href: "/why-omnikom" };

export const PRIMARY_CTA = { label: "Book a Consultation", href: "/consultation" };

export const FOOTER_COLUMNS = [
  {
    title: "Platform",
    links: [
      { label: "Revenue Infrastructure", href: "/revenue-infrastructure" },
      { label: "Data Infrastructure", href: "/data-infrastructure" },
      { label: "Outreach Operations", href: "/outreach-operations" },
      { label: "AI and Automation", href: "/ai-automation" },
      { label: "Revenue Intelligence", href: "/revenue-intelligence" },
      { label: "Workforce Infrastructure", href: "/workforce-infrastructure" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Acquire", href: "/solutions/acquire" },
      { label: "Reactivate", href: "/solutions/reactivate" },
      { label: "Qualify and Route", href: "/solutions/qualify-route" },
      { label: "Managed Departments", href: "/solutions/managed-departments" },
      { label: "Multi-Market Expansion", href: "/solutions/multi-market-expansion" },
      { label: "White Label", href: "/solutions/white-label" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Real Estate", href: "/industries/real-estate" },
      { label: "Home Services", href: "/industries/roofing-home-services" },
      { label: "Automotive", href: "/industries/automotive" },
      { label: "B2B", href: "/industries/b2b-saas" },
      { label: "Staffing", href: "/industries/staffing" },
      { label: "Healthcare", href: "/industries/dental-healthcare" },
      { label: "Legal", href: "/industries/legal" },
      { label: "Financial Services", href: "/industries/financial-services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Partnerships", href: "/partnerships" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
      { label: "Compliance", href: "/compliance" },
    ],
  },
];
