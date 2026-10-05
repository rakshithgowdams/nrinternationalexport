import { business, indicativeNote } from "@/data/business";
import { pageMetadata } from "@/lib/site";
import { Container } from "@/components/ui/primitives";
import { CtaBand } from "@/components/sections/Shared";

export const metadata = pageMetadata({
  title: "Quality and Sourcing",
  description: "How to agree product, grade, condition, packing and quantity with NR International Export.",
  path: "/quality-sourcing",
});

const checkpoints = [
  ["Agree the product and grade", "Name the exact form. Mature, tender, ritual and seedling coconuts are different products."],
  ["Review visible condition", "Describe the colour, damage limit or cleanliness you need to see."],
  ["Agree packing", "Packing is confirmed for the product and the destination."],
  ["Confirm quantity", "A website listing is not reserved stock."],
  ["Coordinate dispatch", "Dispatch follows the accepted quotation. The steps above are a proposed way to work, not an audited process."],
];

export default function QualityPage() {
  return (
    <>
      <section className="bg-forest text-ivory">
        <Container className="py-16 md:py-24">
          <h1 data-reveal className="max-w-3xl font-display text-4xl md:text-6xl">Clear specifications. Thoughtful sourcing.</h1>
        </Container>
      </section>
      <Container className="grid gap-12 py-14 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <div data-image-reveal className="overflow-hidden rounded-lg">
            <img src="/images/coconut-farm-kadakola.jpg" alt="Coconut farm with red soil at Kadakola village, Mysuru district, Karnataka." className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
        <div className="space-y-10">
          <section data-reveal>
            <h2 className="font-display text-3xl">Channarayapatna and Tiptur</h2>
            <p className="mt-3 leading-7 text-muted">
              Sourcing is described around {business.sourcingRegion}. The registered office is in Hassan district at {business.address}. The photograph shows a coconut farm at Kadakola village in Karnataka. It is not NR-owned land.
            </p>
          </section>
          <section data-reveal>
            <h2 className="font-display text-3xl">Why the form matters</h2>
            <p className="mt-3 leading-7 text-muted">
              Coconut can mean a fresh nut, a semi-husked nut, a tender nut, a ritual nut, copra, oil or a seedling. Variety and maturity have to be confirmed for the requirement in front of you.
            </p>
          </section>
          <section>
            <h2 data-reveal className="font-display text-3xl">Proposed checkpoints</h2>
            <ol data-process className="relative mt-4 space-y-6 pl-6">
              <span aria-hidden className="absolute top-0 bottom-0 left-0 w-0.5 bg-line" />
              <span aria-hidden data-process-line className="absolute top-0 bottom-0 left-0 w-0.5 origin-top bg-ochre" />
              {checkpoints.map(([title, body], index) => (
                <li key={title} data-step>
                  <p className="text-xs font-bold text-ochre-ink">0{index + 1}</p>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm leading-6 text-muted">{body}</p>
                </li>
              ))}
            </ol>
          </section>
          <section data-reveal>
            <h2 className="font-display text-3xl">Grade example</h2>
            <p className="mt-3 text-sm leading-6 text-muted">Semi-husked coconut uses these indicative piece weights. They are not certificates.</p>
            <ul className="mt-3 space-y-1 text-sm">
              <li>Grade A: 550–850 g</li>
              <li>Grade B: 350–540 g</li>
              <li>Grade C: 250–340 g</li>
            </ul>
          </section>
          <section data-reveal>
            <h2 className="font-display text-3xl">What to confirm in your quotation</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
              <li>Specification and grade</li>
              <li>Quantity and unit</li>
              <li>Delivery place and requested date</li>
              <li>Packing</li>
              <li>Commercial terms</li>
            </ul>
            <p className="mt-3 text-sm">{indicativeNote}</p>
          </section>
        </div>
      </Container>
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
