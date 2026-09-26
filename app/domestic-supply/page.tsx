import Link from "next/link";
import { productsForMarket } from "@/data/products";
import { quoteHref } from "@/lib/catalogue";
import { pageMetadata } from "@/lib/site";
import { Container } from "@/components/ui/primitives";
import { CtaBand } from "@/components/sections/Shared";
import { FaqList } from "@/components/sections/FaqList";
import { DomesticCompare } from "@/components/sections/DomesticCompare";

export const metadata = pageMetadata({
  title: "Domestic Supply",
  description: "Agricultural supply for businesses in India, from seedlings and coconuts to grains and tomatoes.",
  path: "/domestic-supply",
});

const faqs = [
  {
    q: "Do you deliver everywhere in India?",
    a: "No coverage map is published. Share the city, postal code and date. The quotation will say whether that delivery can be discussed.",
  },
  {
    q: "Are tender and semi-husked coconuts the same?",
    a: "No. Tender coconut is the young green nut. Semi-husked coconut is a mature brown nut with a reduced husk.",
  },
  {
    q: "When will goods arrive?",
    a: "A requested date is not a booking. Timing is confirmed with quantity and destination.",
  },
];

export default function DomesticPage() {
  const items = productsForMarket("domestic");
  return (
    <>
      <section className="bg-forest text-ivory">
        <Container data-stagger className="py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.12em] text-[#f3bd6d] uppercase">Domestic Supply</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl md:text-6xl">Agricultural supply for your business in India.</h1>
          <p className="mt-5 max-w-2xl text-lg text-ivory/85">Seedlings, coconuts, copra, grains and fresh produce for wholesale, processing and events. This is supply inside India, not an export service.</p>
        </Container>
      </section>
      <Container className="py-14">
        <h2 data-reveal className="font-display text-4xl">Domestic catalogue</h2>
        <ul data-stagger className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <li key={product.id}>
              <Link href={`/products/${product.slug}`} className="card block h-full overflow-hidden rounded-lg border border-line bg-white">
                <img src={product.images[0].src} alt={product.images[0].alt} className="aspect-[4/3] w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-display text-2xl">{product.name}</h3>
                  <p className="mt-2 text-sm text-muted">{product.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <DomesticCompare />

        <section data-stagger className="mt-16 grid gap-5 md:grid-cols-3">
          {[
            ["Wholesale and retail", "Semi-husked coconuts, tender coconuts, tomatoes and ginger for shops and traders."],
            ["Food processing", "Copra, coconut shell and ragi for buyers who will process the goods further."],
            ["Ritual and events", "Thambulam coconuts for ceremonies. Share the date, town and count."],
          ].map(([title, body]) => (
            <article key={title} className="rounded-lg border border-line bg-white p-5">
              <h2 className="font-display text-2xl">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
            </article>
          ))}
        </section>

        <section data-reveal className="mt-16 max-w-3xl">
          <h2 className="font-display text-3xl">Delivery enquiry</h2>
          <p className="mt-3 leading-7 text-muted">
            Include the product, quantity, city or town, postal code and the date you hope to receive the goods. Quantity, grade and delivery are confirmed during the enquiry. A date in the form is a request.
          </p>
        </section>

        <section className="mt-16 max-w-3xl">
          <h2 data-reveal className="font-display text-3xl">Domestic questions</h2>
          <div className="mt-4"><FaqList items={faqs} /></div>
        </section>
      </Container>
      <CtaBand
        title="Request domestic pricing"
        body="The quotation form will open with Domestic Supply selected."
        primaryHref={quoteHref({ market: "domestic" })}
        primaryLabel="Request Domestic Pricing"
        secondaryHref="/contact"
        secondaryLabel="Contact"
      />
    </>
  );
}
