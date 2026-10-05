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
    "NR International Export is a partnership in Hassan district, Karnataka, supplying copra, coconut oil, coconut shell, ginger, ragi and maize from the Channarayapatna and Tiptur region for export and domestic trade.",
  path: "/",
  keywords: [
    "coconut exporter Karnataka",
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
    body: "Mature, tender and seedling coconuts, each with its own page.",
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
    a: "Describe the grade, size or weight specification you need and we will confirm whether it can be supplied in the quotation.",
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
            src="/images/nr-global-export-hero.webp"
            alt="NR International Export logistics at seaport with container ship, branded truck and international shipping routes."
            className="h-full w-full object-cover object-center lg:object-[68%_center]"
            fetchPriority="high"
          />
        </HeroPhoto>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,43,33,0.92)_0%,rgba(23,43,33,0.76)_38%,rgba(23,43,33,0.30)_68%,rgba(23,43,33,0.12)_100%)] max-md:bg-[linear-gradient(180deg,rgba(23,43,33,0.92)_0%,rgba(23,43,33,0.80)_60%,rgba(23,43,33,0.40)_100%)]" />
        <Container className="relative z-10 flex min-h-[560px] flex-col justify-center py-14 md:min-h-[72vh] lg:min-h-[78vh] lg:py-16">
          <p data-reveal className="text-xs font-bold tracking-[0.14em] text-[#f3bd6d] uppercase">
            KARNATAKA, INDIA · GLOBAL AGRI EXPORT
          </p>
          <div className="mt-5 max-w-3xl">
            <HeroHeading />
          </div>
          <p data-reveal className="mt-6 max-w-2xl text-lg leading-8 text-ivory/90">
            Coconuts, copra and agricultural commodities sourced from Karnataka and prepared for international buyers through requirement-led quality, packing and export coordination.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/request-quote?market=global" className="inline-flex min-h-12 items-center rounded-md bg-white px-6 text-sm font-semibold text-forest transition-colors hover:bg-ivory">
              Request Export Quote
            </Link>
            <Link href="/global-exports" className="inline-flex min-h-12 items-center rounded-md border border-white/40 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Explore Export Products
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-white">
        <Container data-stagger className="grid gap-6 py-8 md:grid-cols-3">
          {[
            ["International export focus", "Direct coordination from Karnataka sourcing groves to international container ports and overseas markets."],
            ["Karnataka agricultural origin", "Channarayapatna and Tiptur groves provide mature coconuts, copra and regional farm commodities."],
            ["Requirement-led supply", "Grades, export packing formats and phytosanitary requirements confirmed per order."],
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

      <section className="py-16 md:py-24">
        <Container data-stagger className="grid gap-6 lg:grid-cols-12">
          <article className="card relative overflow-hidden rounded-xl border-2 border-forest/30 bg-white shadow-md lg:col-span-7">
            <div className="relative h-72 w-full overflow-hidden">
              <img
                src="/images/nr-global-export-network.webp"
                alt="NR International Export global trade network showing container vessel, branded truck, port logistics, and agricultural commodities."
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
              <span className="absolute top-4 left-4 rounded-full bg-forest px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#f3bd6d] shadow-sm">
                Primary Export Focus
              </span>
            </div>
            <div className="p-6 md:p-8">
              <h2 className="font-display text-3xl md:text-4xl text-forest">Global Exports</h2>
              <p className="mt-3 text-muted leading-relaxed">
                Coconuts, copra, oil, shells, ginger, maize and ragi for international buyers. Destination country, port logistics, packing formats and shipping documentation are coordinated per order.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/global-exports"
                  className="inline-flex min-h-11 items-center rounded-md bg-forest px-6 text-sm font-semibold text-ivory transition-colors hover:bg-olive"
                >
                  Explore Global Export &rarr;
                </Link>
                <Link
                  href="/request-quote?market=global"
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-olive hover:underline"
                >
                  Request export quotation
                </Link>
              </div>
            </div>
          </article>
          <article className="card relative overflow-hidden rounded-xl border border-line bg-white lg:col-span-5">
            <div className="relative h-72 w-full overflow-hidden">
              <img
                src="/images/nr-domestic-supply.webp"
                alt="Domestic agricultural supply operations showing fresh coconuts, ginger, ragi, and farm wholesale loading."
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
              <span className="absolute top-4 left-4 rounded-full bg-ivory px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-muted shadow-sm">
                Domestic Supply
              </span>
            </div>
            <div className="p-6 md:p-8">
              <h2 className="font-display text-2xl md:text-3xl text-ink">Domestic Supply</h2>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                Seedlings, tender nuts, copra, shells, ragi, tomatoes and ginger for wholesale trade inside India.
              </p>
              <div className="mt-6">
                <Link
                  href="/domestic-supply"
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-olive hover:underline"
                >
                  Request domestic pricing &rarr;
                </Link>
              </div>
            </div>
          </article>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div data-image-reveal className="overflow-hidden rounded-lg">
            <img src="/images/origin-sourcing-tiptur.jpg" alt="Harvested mature coconuts neatly gathered along the orchard pathway in a coconut plantation in Tiptur and Channarayapatna, Karnataka." className="aspect-[16/10] w-full object-cover" />
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
