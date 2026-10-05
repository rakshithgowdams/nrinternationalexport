import { business, indicativeNote } from "@/data/business";
import { pageMetadata } from "@/lib/site";
import { Container } from "@/components/ui/primitives";
import { CtaBand } from "@/components/sections/Shared";
import { SourceToShipment } from "@/components/sections/SourceToShipment";

export const metadata = pageMetadata({
  title: "Quality and Sourcing",
  description: "How to agree product, grade, condition, packing and quantity with NR International Export.",
  path: "/quality-sourcing",
});

export default function QualityPage() {
  return (
    <>
      <section className="bg-forest text-ivory">
        <Container className="py-16 md:py-24">
          <h1 data-reveal className="max-w-3xl font-display text-4xl md:text-6xl">
            Clear specifications. Thoughtful sourcing.
          </h1>
          <p data-reveal className="mt-4 max-w-2xl text-lg text-ivory/80 leading-relaxed">
            From the coconut-growing heartland of Karnataka to international maritime export, understand how NR International Export coordinates quality, handling, and supply.
          </p>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div data-reveal className="max-w-3xl mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-olive font-mono">
              Operational Journey
            </p>
            <h2 className="mt-2 font-display text-3xl md:text-5xl text-ink">
              Source to shipment
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted leading-relaxed">
              Trace how agricultural goods move from origin groves in Karnataka through careful handling, container loading, and port logistics to destination markets.
            </p>
          </div>
          <SourceToShipment />
        </Container>
      </section>

      <section className="bg-white py-16 md:py-24 border-t border-line">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 data-reveal className="font-display text-3xl md:text-4xl text-ink">
              Channarayapatna and Tiptur
            </h2>
            <p data-reveal className="leading-7 text-muted">
              Sourcing is centered around {business.sourcingRegion}, renowned for high-yield, thick-kernel mature coconuts and commercial grade agricultural produce. The registered administrative office is located in Hassan district at {business.address}.
            </p>
            <h3 data-reveal className="font-display text-2xl text-ink pt-2">
              Why the product form matters
            </h3>
            <p data-reveal className="leading-7 text-muted">
              Coconut requirements span mature nuts, tender coconuts, copra, oil, and seedlings. Variety, husk condition, size, and maturity are aligned against buyer requirements before dispatch.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-ivory/50 p-6 md:p-8 space-y-5">
            <h2 data-reveal className="font-display text-3xl text-ink">
              What to confirm in your quotation
            </h2>
            <ul data-reveal className="list-disc space-y-2 pl-5 text-sm text-muted">
              <li>Specification, grade, and required form</li>
              <li>Quantity and preferred unit (pieces, bags, metric tonnes)</li>
              <li>Destination country, city, and nearest port</li>
              <li>Packing preference (jute bags, mesh sacks, crates)</li>
              <li>Requested delivery timing and commercial terms</li>
            </ul>
            <p data-reveal className="text-sm text-muted pt-2 border-t border-line">
              {indicativeNote}
            </p>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Discuss your specifications."
        body="Bring the grade, packing and destination you need checked."
        primaryHref="/request-quote"
        primaryLabel="Discuss Your Specifications"
        secondaryHref="/products"
        secondaryLabel="Browse products"
      />
    </>
  );
}
