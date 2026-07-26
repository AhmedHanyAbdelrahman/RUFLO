import { SiteHeader } from "@/components/global/SiteHeader";
import { SiteFooter } from "@/components/global/SiteFooter";
import { SectionHeading } from "@/components/content/SectionHeading";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-ink">
          <div className="container-page flex min-h-[60vh] flex-col justify-center gap-6 py-24">
            <SectionHeading as="h1" size="h1" className="max-w-2xl lowercase">
              this lane does not exist.
            </SectionHeading>
            <p className="max-w-xl text-lg leading-relaxed text-gray-300">
              Return to the Omnikom platform and continue forward.
            </p>
            <div>
              <Button label="Return Home" href="/" style="primary" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
