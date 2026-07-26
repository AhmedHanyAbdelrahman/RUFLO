import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { OrganizationStructuredData } from "@/lib/seo/structuredData";
import { CookieBanner } from "@/components/global/CookieBanner";
import "./globals.css";

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const headingFont = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.omnikom.com"),
  title: {
    default: "Omnikom | The Outbound Revenue Infrastructure Behind High-Growth Companies",
    template: "%s | Omnikom",
  },
  description:
    "Omnikom is the outbound revenue infrastructure behind high-growth companies — designing, deploying, and operating the systems behind data, outreach, qualification, CRM routing, AI, workforce, and reporting.",
  openGraph: {
    title: "Omnikom | The Outbound Revenue Infrastructure Behind High-Growth Companies",
    description:
      "Omnikom is the outbound revenue infrastructure behind high-growth companies — designing, deploying, and operating the systems behind data, outreach, qualification, CRM routing, AI, workforce, and reporting.",
    siteName: "Omnikom",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-white">
        <OrganizationStructuredData />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
