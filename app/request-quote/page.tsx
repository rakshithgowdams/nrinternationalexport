import { Suspense } from "react";
import { QuoteWizard } from "@/components/enquiry/QuoteWizard";
import { Container } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Request a Quote",
  description: "Request a bulk quotation for coconuts, copra and agricultural products. Price depends on grade, quantity, packing and destination.",
  path: "/request-quote",
});

export default function QuotePage() {
  return (
    <Container className="py-12 md:py-16">
      <div data-reveal>
        <p className="text-xs font-bold tracking-[0.12em] text-ochre-ink uppercase">Quotation</p>
        <h1 className="mt-2 max-w-3xl font-display text-4xl md:text-6xl">Request a tailored bulk quotation.</h1>
        <p className="mt-4 max-w-2xl text-muted">
          Pricing depends on product, grade, quantity, packing and destination. Adding a product does not reserve stock or fix a price.
        </p>
      </div>
      <div className="mt-10">
        <Suspense fallback={<p>Loading quotation form…</p>}>
          <QuoteWizard />
        </Suspense>
      </div>
    </Container>
  );
}
