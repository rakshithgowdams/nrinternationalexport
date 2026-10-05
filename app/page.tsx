import Link from "next/link";
import { business, indicativeNote } from "@/data/business";
import { marketLabel, products } from "@/data/products";
import { catalogueHref } from "@/lib/catalogue";
import { pageMetadata } from "@/lib/site";
import { Container } from "@/components/ui/primitives";
import { HeroHeading, HeroPhoto } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/Shared";
import { FaqList } from "@/components/sections/FaqList";

export const metadata = pageMetadata({
  title: "NR International Export | Coconut, Copra and Agri Exporter from Karnataka, India",
  description:
    "NR International Export is a partnership in Hassan district, Karnataka, supplying semi-husked coconut, copra, coconut oil, coconut shell, ginger, ragi and maize from the Channarayapatna and Tiptur region for export and domestic trade.",
  path: "/",
  keywords: [
    "coconut exporter Karnataka",
    "semi husked coconut supplier",
    "Tiptur coconut",
    "edible copra exporter India",
    "coconut shell supplier",
    "ragi exporter",
    "Channarayapatna coconut",
    "Hassan agricultural exporter",
  ],
});

const families = [
  {
    title: "Coconuts",
    body: "Mature, semi-husked, tender, ritual and seedling coconuts, each with its own page.",
    href: catalogueHref({ category: "coconuts" }),
    image: "/images/coconut-halves.jpg",
    alt: "Halved mature coconuts showing the white kernel inside the brown husk.",
    className: "lg:col-span-5",
  },
  {
    title: "Copra and Coconut Products",
    body: "Edible copra, dry coconut, desiccated coconut, shells and coconut oil.",
    href: catalogueHref({ category: "copra" }),
    image: "/images/copra-halves.jpg",
    alt: "Halved dry coconut cups of copra with brown outer skin and white kernel.",
    className: "lg:col-span-4",
  },
  {
    title: "Grains and Fresh Produce",
    body: "Ragi, maize, ginger and domestic tomatoes.",
    href: catalogueHref({ category: "field" }),
    image: "/images/finger-millet-heads.jpg",
    alt: "Harvested heads of ragi (finger millet).",
    className: "lg:col-span-3",
  },
];

const grades = [
  ["Grade A", "550–850 g"],
  ["Grade B", "350–540 g"],
  ["Grade C", "250–340 g"],
];

const steps = [
  ["Share requirements", "Tell us the product, quantity, market and where it needs to go."],
  ["Confirm specifications", "Grade, visible condition, packing and any buyer limits are agreed in writing."],
  ["Agree commercial terms", "Price and terms belong in the quotation, not on this website."],
  ["Coordinate supply", "Dispatch is arranged only after the requirement is confirmed."],
];

const faqs = [
  {
    q: "Is there a minimum quantity?",
    a: "No minimum is published. Share the quantity you have in mind and it will be confirmed in the quotation.",
  },
  {
    q: "How do I choose a grade?",
    a: "Semi-husked coconuts use the published weight bands. For every other product, describe the grade you need and we will confirm whether it can be discussed.",
  },
  {
    q: "Can you supply outside India?",
    a: "Global Export is for international enquiries. Destination, port and documents are confirmed per order. Domestic Supply is for buyers in India.",
  },
  {
    q: "How should goods be packed?",
    a: "Packing is a preference until the quotation confirms it. Describe the pack your market needs.",
  },
  {
    q: "How do I request a quote?",
    a: "Use Request a Quote, add one or more products, and leave a way to reply. If email delivery is not configured, the form will offer your own email programme instead of claiming the message was sent.",
  },
];

const range = ["ginger", "maize", "ragi", "tomatoes"];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-forest">
        <HeroPhoto>
          <img
            src="/images/plantation-india.jpg"
            alt="Rows of tall coconut palms on a plantation in India."
            className="h-full w-full object-cover"
          />
        </HeroPhoto>
        <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/92 to-forest/65" />
        <Container className="relative z-10 flex min-h-[540px] flex-col justify-center py-14 md:min-h-[62vh] lg:py-16">
          <p data-reveal className="text-xs font-bold tracking-[0.12em] text-[#f3bd6d] uppercase">
            {business.sourcingRegion}
          </p>
          <div className="mt-5 max-w-3xl">
            <HeroHeading />
          </div>
          <p data-reveal className="mt-6 max-w-2xl text-lg leading-8 text-ivory/90">
            Explore coconuts, copra and agricultural products for international and domestic trade. Share your product, quantity and destination to discuss supply.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/request-quote" className="inline-flex min-h-12 items-center rounded-md bg-white px-6 text-sm font-semibold text-forest">
              Request a Quote
            </Link>
            <Link href="/products" className="inline-flex min-h-12 items-center rounded-md border border-white/40 px-6 text-sm font-semibold text-white">
              Explore Products
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-white">
        <Container data-stagger className="grid gap-6 py-8 md:grid-cols-3">
          {[
            ["Karnataka sourcing", "Channarayapatna and Tiptur are the sourcing focus for coconut and farm products."],
            ["Two enquiry paths", "International buyers use Global Export. Buyers in India use Domestic Supply."],
            ["Product-led bulk supply", "Each product has its own page, photograph and specification notes."],
          ].map(([title, body]) => (
            <div key={title}>
              <h2 className="font-display text-2xl">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div data-reveal>
            <p className="text-xs font-bold tracking-[0.12em] text-ochre-ink uppercase">Catalogue</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Three product families</h2>
          </div>
          <div data-stagger className="mt-8 grid gap-5 lg:grid-cols-12">
            {families.map((family) => (
              <article key={family.title} className={`card overflow-hidden rounded-lg border border-line bg-white ${family.className}`}>
                <img src={family.image} alt={family.alt} className="h-56 w-full object-cover" />
                <div className="p-5">
                  <h3 className="font-display text-3xl">{family.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{family.body}</p>
                  <Link href={family.href} className="mt-4 inline-flex text-sm font-semibold text-olive">
                    View this range
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div data-image-reveal className="overflow-hidden rounded-lg">
            <img src="/images/semi-husked-coconut-pile.jpg" alt="Pile of semi-husked coconuts with fibre around the eyes and one coconut split to show the white kernel." className="aspect-[4/3] w-full object-cover object-[50%_56%]" />
          </div>
          <div>
            <div data-reveal>
              <p className="text-xs font-bold tracking-[0.12em] text-ochre-ink uppercase">Flagship grade</p>
              <h2 className="mt-2 font-display text-4xl">Semi-husked coconut</h2>
              <p className="mt-4 leading-7 text-muted">
                Mature brown coconuts with fibre kept around the eyes. The weight bands below are indicative supplier ranges, not a promise of a particular lot.
              </p>
            </div>
            <dl data-stagger className="mt-6 grid gap-3 sm:grid-cols-3">
              {grades.map(([name, range]) => (
                <div key={name} className="rounded-md border border-line p-3">
                  <dt className="text-xs font-bold tracking-wide text-ochre-ink uppercase">{name}</dt>
                  <dd className="mt-1 font-semibold tabular-nums">{range}</dd>
                </div>
              ))}
            </dl>
            <Link href="/products/semi-husked-coconuts" className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-olive">
              View specifications
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container data-stagger className="grid gap-5 lg:grid-cols-2">
          <article className="card overflow-hidden rounded-lg border border-line bg-white">
            <img src="/images/kochi-container-terminal.jpg" alt="Container ship berthed under gantry cranes at the International Container Transshipment Terminal, Kochi." className="h-64 w-full object-cover" />
            <div className="p-6">
              <h2 className="font-display text-4xl">Global Exports</h2>
              <p className="mt-3 text-muted">Coconuts, copra, oil, shells, ginger, maize and ragi for buyers outside India. Share the destination with the product and quantity.</p>
              <Link href="/global-exports" className="mt-4 inline-flex min-h-11 items-center font-semibold text-olive">Discuss an export requirement</Link>
            </div>
          </article>
          <article className="card overflow-hidden rounded-lg border border-line bg-white">
            <img src="/images/koyambedu-market.jpg" alt="Traders and produce stalls inside the Koyambedu wholesale market, Chennai." className="h-64 w-full object-cover" />
            <div className="p-6">
              <h2 className="font-display text-4xl">Domestic Supply</h2>
              <p className="mt-3 text-muted">Seedlings, ritual coconuts, semi-husked and tender nuts, copra, shells, ragi, tomatoes and ginger for trade inside India.</p>
              <Link href="/domestic-supply" className="mt-4 inline-flex min-h-11 items-center font-semibold text-olive">Request domestic pricing</Link>
            </div>
          </article>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div data-image-reveal className="overflow-hidden rounded-lg">
            <img src="/images/coconut-heaps.jpg" alt="Heaps of harvested coconuts gathered under coconut palms." className="aspect-[16/10] w-full object-cover" />
          </div>
          <div data-reveal>
            <p className="text-xs font-bold tracking-[0.12em] text-ochre-ink uppercase">Origin</p>
            <h2 className="mt-2 font-display text-4xl">Channarayapatna and Tiptur</h2>
            <p className="mt-4 leading-7 text-muted">
              NR International Export is a partnership registered in Hassan district. Product sourcing is described around Channarayapatna and Tiptur. The registered address and the sourcing region are related, and they are not the same line of text.
            </p>
            <p className="mt-4 text-sm leading-6">{business.address}</p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <div data-image-reveal className="overflow-hidden rounded-lg">
              <img src="/images/coconut-sacks-india.jpg" alt="Jute sacks of whole coconuts marked Product of India, stacked on pallets." className="aspect-[4/3] w-full object-cover" />
            </div>
          </div>
          <ol data-process className="relative space-y-10 pl-6 lg:py-8">
            <span aria-hidden className="absolute top-0 bottom-0 left-0 w-0.5 bg-line" />
            <span aria-hidden data-process-line className="absolute top-0 bottom-0 left-0 w-0.5 origin-top bg-ochre" />
            {steps.map(([title, body], index) => (
              <li key={title} data-step>
                <p className="text-xs font-bold tracking-[0.08em] text-ochre-ink uppercase">Step {index + 1}</p>
                <h2 className="mt-1 font-display text-3xl">{title}</h2>
                <p className="mt-2 text-muted">{body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container data-reveal className="max-w-3xl">
          <h2 className="font-display text-4xl">What to discuss about quality</h2>
          <p className="mt-4 leading-7 text-muted">
            Ask about grade, visible condition, packing and delivery requirements. {indicativeNote}
          </p>
          <Link href="/quality-sourcing" className="mt-4 inline-flex font-semibold text-olive">Read quality and sourcing</Link>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 data-reveal className="font-display text-4xl">Related agricultural range</h2>
          <ul data-stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {range.map((id) => {
              const product = products.find((item) => item.id === id)!;
              return (
                <li key={id}>
                  <Link href={`/products/${product.slug}`} className="card block overflow-hidden rounded-lg border border-line bg-white">
                    <img src={product.images[0].src} alt={product.images[0].alt} className="aspect-[4/3] w-full object-cover" />
                    <div className="p-4">
                      <p className="font-semibold">{product.name}</p>
                      <p className="mt-1 text-xs text-muted">{product.markets.map((market) => marketLabel[market]).join(" · ")}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="max-w-3xl">
          <h2 data-reveal className="font-display text-4xl">Questions before you enquire</h2>
          <div className="mt-6">
            <FaqList items={faqs} />
          </div>
        </Container>
      </section>

      <CtaBand
        title="Tell us what your market needs."
        body="A quotation depends on the product, quantity, packing and destination."
        primaryHref="/request-quote"
        primaryLabel="Request a Quote"
        secondaryHref="/contact"
        secondaryLabel="Contact"
      />
    </>
  );
}
