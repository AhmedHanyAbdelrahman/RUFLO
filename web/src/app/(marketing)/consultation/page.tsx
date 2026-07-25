import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/heroes/PageHero";
import { ConsultationForm } from "@/components/forms/ConsultationForm";

export const metadata: Metadata = pageMetadata({
  title: "Book a Revenue Infrastructure Consultation",
  description:
    "This is not a generic pricing call. It is a working session to understand your customer economics, market, current acquisition process, sales capacity, data, CRM, and growth objective.",
  path: "/consultation",
});

export default function ConsultationPage() {
  return (
    <>
      <PageHero
        heading="design the infrastructure around your business."
        body="This is not a generic pricing call. It is a working session to understand your customer economics, market, current acquisition process, sales capacity, data, CRM, and growth objective."
      />
      <section className="bg-ink">
        <div className="container-page max-w-3xl py-24">
          <ConsultationForm />
        </div>
      </section>
    </>
  );
}
