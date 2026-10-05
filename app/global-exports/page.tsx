import Link from "next/link";
import { productsForMarket, marketLabel } from "@/data/products";
import { quoteHref } from "@/lib/catalogue";
import { pageMetadata } from "@/lib/site";
import { Container } from "@/components/ui/primitives";
import { CtaBand } from "@/components/sections/Shared";
import { FaqList } from "@/components/sections/FaqList";

export const metadata = pageMetadata({
  title: "Global Exports",
  description:
    "Export enquiries for fresh coconut, edible copra, dry coconut, desiccated coconut, coconut shell, coconut oil, ginger, maize and ragi from Karnataka, India. Share product, quantity and destination for a quotation.",
  keywords: ["coconut exporter India", "edible copra export", "coconut oil exporter", "ragi export", "maize exporter India"],
  path: "/global-exports",
});

const steps = [
  "Requirement review",
  "Specification agreement",
  "Commercial quotation",
  "Packing and document discussion",
  "Dispatch coordination",
];

const faqs = [
  {
    q: "Can I request a sample?",
    a: "Ask for a sample in the quotation. Availability is confirmed per product and is not promised on this page.",
  },
  {
    q: "What is the minimum quantity?",
    a: "No minimum is published. Share the quantity and destination you have in mind.",
  },
  {
    q: "Which documents will be provided?",
    a: "NR International Export holds an Import Export Code (IEC) from DGFT, MSME (Udyam) registration, and FIEO registration with an RCMC. Product documents for the destination are confirmed for each order.",
  },
  {
    q: "How long does shipment take?",
    a: "Transit time is not published. Timing is discussed after the specification and destination are known.",
  },
];

export default function GlobalExportsPage() {
  const items = productsForMarket("global");
  return (
    <>
      <section className="bg-forest text-ivory">
        <Container data-stagger className="py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.12em] text-[#f3bd6d] uppercase">Global Export</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl md:text-6xl">Agricultural products for international trade.</h1>
          <p className="mt-5 max-w-2xl text-lg text-ivory/85">Tell us the product, quantity and destination. A quotation follows only after those points are clear.</p>
        </Container>
      </section>
      <Container className="py-14">
        <h2 data-reveal className="font-display text-4xl">Export catalogue</h2>
        <ul data-stagger className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <li key={product.id}>
              <Link href={`/products/${product.slug}`} className="card block h-full overflow-hidden rounded-lg border border-line bg-white">
                <img src={product.images[0].src} alt={product.images[0].alt} className="aspect-[4/3] w-full object-cover" />
                <div className="p-4">
                  <p className="text-xs font-bold tracking-wide text-ochre-ink uppercase">{marketLabel.global}</p>
                  <h3 className="mt-1 font-display text-2xl">{product.name}</h3>
                  <p className="mt-2 text-sm text-muted">{product.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 data-reveal className="font-display text-3xl">What buyers should include</h2>
            <ul data-stagger className="mt-4 list-disc space-y-2 pl-5 text-muted">
              <li>Grade or the specification you need</li>
              <li>Quantity and unit</li>
              <li>Packing preference</li>
              <li>Intended application</li>
              <li>Destination country and, if useful, the port</li>
              <li>Preferred timing</li>
            </ul>
          </div>
          <div>
            <h2 data-reveal className="font-display text-3xl">How an order is discussed</h2>
            <ol data-stagger className="mt-4 space-y-3">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="font-semibold text-ochre-ink">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mt-16 grid items-center gap-8 lg:grid-cols-2">
          <div data-image-reveal className="overflow-hidden rounded-lg">
            <img src="/images/export-packing-sacks.jpg" alt="Mature coconuts neatly packed in jute and mesh sacks on wooden pallets in an export staging warehouse." className="aspect-[4/3] w-full object-cover" />
          </div>
          <div data-reveal>
            <h2 className="font-display text-3xl">Packing</h2>
            <p className="mt-3 leading-7 text-muted">
              Whole coconuts and copra are typically packed in jute or mesh sacks. Choose the pack and net weight you want quoted. Capacities are not invented on this page.
            </p>
          </div>
        </section>

        <section data-reveal className="mt-16 max-w-3xl">
          <h2 className="font-display text-3xl">Documents</h2>
          <p className="mt-3 leading-7 text-muted">
            NR International Export is registered with an Import Export Code (IEC) from DGFT, MSME (Udyam) registration, and FIEO membership with a Registration-cum-Membership Certificate (RCMC). Product documents, such as phytosanitary or origin certificates, depend on the product and the destination and are confirmed for each order.
          </p>
        </section>

        <section className="mt-16 max-w-3xl">
          <h2 data-reveal className="font-display text-3xl">Export questions</h2>
          <div className="mt-4">
            <FaqList items={faqs} />
          </div>
        </section>
      </Container>
      <CtaBand
        title="Discuss an export requirement"
        body="The quotation form will open with Global Export selected."
        primaryHref={quoteHref({ market: "global" })}
        primaryLabel="Discuss an Export Requirement"
        secondaryHref="/contact"
        secondaryLabel="Contact"
      />
    </>
  );
}
