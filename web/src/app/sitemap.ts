import type { MetadataRoute } from "next";

const BASE_URL = "https://www.omnikom.com";

// Extend this list as additional routes from the sitemap in
// 02_omnikom_website_ux_copy_customer_journey.md §3 are implemented.
const ROUTES = [
  "/",
  "/revenue-infrastructure",
  "/how-it-works",
  "/why-omnikom",
  "/consultation",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));
}
