import type { MetadataRoute } from "next";

const BASE_URL = "https://www.omnikom.com";

// Extend this list as additional routes from the sitemap in
// 02_omnikom_website_ux_copy_customer_journey.md §3 are implemented.
const ROUTES = [
  "/",
  "/revenue-infrastructure",
  "/platform",
  "/data-infrastructure",
  "/outreach-operations",
  "/qualification-routing",
  "/ai-automation",
  "/revenue-intelligence",
  "/workforce-infrastructure",
  "/solutions",
  "/solutions/acquire",
  "/solutions/reactivate",
  "/solutions/qualify-route",
  "/solutions/speed-to-lead",
  "/solutions/nurture-recovery",
  "/solutions/managed-departments",
  "/solutions/multi-market-expansion",
  "/solutions/white-label",
  "/revenue-lanes",
  "/revenue-lanes/validation",
  "/revenue-lanes/growth",
  "/revenue-lanes/expansion",
  "/revenue-lanes/enterprise",
  "/how-it-works",
  "/why-omnikom",
  "/industries",
  "/industries/real-estate",
  "/industries/roofing-home-services",
  "/industries/hvac",
  "/industries/solar",
  "/industries/automotive",
  "/industries/b2b-saas",
  "/industries/staffing",
  "/industries/dental-healthcare",
  "/industries/med-spa",
  "/industries/legal",
  "/industries/financial-services",
  "/industries/education",
  "/industries/commercial-industrial",
  "/financial-services-infrastructure",
  "/about",
  "/partnerships",
  "/case-studies",
  "/resources",
  "/insights",
  "/compliance",
  "/consultation",
  "/contact",
  "/careers",
  "/privacy",
  "/terms",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));
}
