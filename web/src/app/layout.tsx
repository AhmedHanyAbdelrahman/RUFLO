import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
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
    default: "Omnikom | Revenue Infrastructure for High-Growth Companies",
    template: "%s | Omnikom",
  },
  description:
    "Omnikom designs, deploys, and operates revenue acquisition infrastructure across data, outreach, qualification, CRM routing, AI, workforce, and reporting.",
  openGraph: {
    title: "Omnikom | Revenue Infrastructure for High-Growth Companies",
    description:
      "Omnikom designs, deploys, and operates revenue acquisition infrastructure across data, outreach, qualification, CRM routing, AI, workforce, and reporting.",
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
        {children}
      </body>
    </html>
  );
}
