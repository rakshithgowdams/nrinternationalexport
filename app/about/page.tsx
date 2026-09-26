import { business } from "@/data/business";
import { pageMetadata } from "@/lib/site";
import { Container } from "@/components/ui/primitives";
import { CtaBand } from "@/components/sections/Shared";

export const metadata = pageMetadata({
  title: "About",
  description: "NR International Export is a Karnataka partnership trading coconuts, copra and agricultural products.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="bg-forest text-ivory">
        <Container className="py-16 md:py-24">
          <h1 data-reveal className="max-w-3xl font-display text-4xl md:text-6xl">A Karnataka connection for agricultural trade.</h1>
        </Container>
      </section>
      <Container className="grid gap-12 py-14 lg:grid-cols-2">
        <div data-stagger className="space-y-5 leading-7 text-muted">
          <p>
            {business.name} is a {business.constitution.toLowerCase()} based at {business.address}. The business discusses coconuts, copra, coconut products, grains and fresh produce for buyers in India and for international enquiries.
          </p>
          <p>
            Sourcing is focused on {business.sourcingRegion}. That regional description is separate from the registered address.
          </p>
        </div>
        <div data-image-reveal className="overflow-hidden rounded-lg">
          <img src="/images/hero-grove.jpg" alt="Catalogue photograph of coconut palms. Not a claim of farm ownership." className="aspect-[4/3] w-full object-cover" />
        </div>
      </Container>
      <section className="bg-white py-14">
        <Container>
          <h2 data-reveal className="font-display text-4xl">Who the site is for</h2>
          <ul data-stagger className="mt-4 flex flex-wrap gap-2">
            {business.buyers.map((buyer) => (
              <li key={buyer} className="rounded-md border border-line bg-ivory px-3 py-2 text-sm">{buyer}</li>
            ))}
          </ul>
          <div data-stagger className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Clear communication", "You can see the product, the market and the contact path."],
              ["Specification clarity", "Unknown figures stay marked for confirmation instead of being filled in."],
              ["Practical coordination", "Quantity, packing and destination are handled in the quotation."],
            ].map(([title, body]) => (
              <article key={title} className="rounded-lg border border-line p-4">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="py-14">
        <Container data-stagger className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-line bg-white p-6">
            <img src="/brand/logo-light.png" alt="" className="h-24 w-auto" />
            <h2 className="mt-4 font-display text-3xl">{business.contactName}</h2>
            <p className="text-muted">{business.contactRole}</p>
            <p className="mt-4"><a className="font-semibold" href={`tel:${business.phoneTel}`}>{business.phoneDisplay}</a></p>
            <p><a className="font-semibold" href={`mailto:${business.email}`}>{business.email}</a></p>
          </div>
          <div>
            <h2 className="font-display text-3xl">Company details</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div><dt className="text-muted">Legal name</dt><dd className="font-semibold">{business.name}</dd></div>
              <div><dt className="text-muted">Constitution</dt><dd>{business.constitution}</dd></div>
              <div><dt className="text-muted">Registered address</dt><dd>{business.address}</dd></div>
              <div><dt className="text-muted">GSTIN</dt><dd className="tabular-nums">{business.gstin}</dd></div>
            </dl>
          </div>
        </Container>
      </section>
      <CtaBand
        title="Talk to the desk."
        body="Start with a product page or send a quotation request."
        primaryHref="/products"
        primaryLabel="Browse products"
        secondaryHref="/contact"
        secondaryLabel="Contact"
      />
    </>
  );
}
