import Link from "next/link";
import { business, certifications } from "@/data/business";
import { pageMetadata } from "@/lib/site";
import { Container } from "@/components/ui/primitives";

export const metadata = pageMetadata({
  title: "About NR International Export | Agricultural Export Company, Karnataka",
  description:
    "Learn about NR International Export, a Karnataka-based agricultural trade company discussing coconuts, copra and agricultural commodity requirements for international and domestic buyers.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-forest text-ivory">
        <Container className="py-16 md:py-24">
          <h1 data-reveal className="max-w-3xl font-display text-4xl md:text-6xl">
            A Karnataka connection for agricultural trade.
          </h1>
        </Container>
      </section>

      {/* SECTION 02 — WHO WE ARE & 3 CAPABILITY PILLARS */}
      <section className="bg-white py-16 md:py-24 border-b border-line">
        <Container>
          <div data-reveal className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-olive font-mono">
              WHO WE ARE
            </p>
            <h2 className="mt-2 font-display text-3xl md:text-5xl text-ink">
              From sourcing conversations to export-ready supply.
            </h2>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-muted">
              NR International Export is a partnership based in Hassan district, Karnataka, with sourcing activity described around Channarayapatna and Tiptur. The company works with agricultural products for domestic and international buyer enquiries, with product, quantity, packing, destination and commercial requirements discussed before quotation.
            </p>
          </div>

          <div data-stagger className="mt-14 grid gap-8 md:grid-cols-3">
            <article className="border-t-2 border-forest/20 pt-6">
              <span className="font-mono text-xs font-bold text-ochre-ink">01</span>
              <h3 className="mt-3 font-display text-2xl font-semibold text-ink">Karnataka sourcing</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Product sourcing is discussed around established agricultural regions in Karnataka according to the buyer requirement and product availability.
              </p>
            </article>

            <article className="border-t-2 border-forest/20 pt-6">
              <span className="font-mono text-xs font-bold text-ochre-ink">02</span>
              <h3 className="mt-3 font-display text-2xl font-semibold text-ink">Requirement-led supply</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Product form, visible condition, quantity, packing and destination requirements are discussed before commercial confirmation.
              </p>
            </article>

            <article className="border-t-2 border-forest/20 pt-6">
              <span className="font-mono text-xs font-bold text-ochre-ink">03</span>
              <h3 className="mt-3 font-display text-2xl font-semibold text-ink">Export coordination</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                International enquiries move from product discussion into quotation, packing and dispatch coordination based on the accepted requirement.
              </p>
            </article>
          </div>
        </Container>
      </section>

      {/* SECTION 03 — ORIGIN · CHANNARAYAPATNA AND TIPTUR */}
      <section className="py-16 md:py-24 bg-ivory/40 border-b border-line">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <div data-stagger className="space-y-5 leading-7 text-muted lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-ochre-ink font-mono">
              ORIGIN · CHANNARAYAPATNA AND TIPTUR
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-ink">
              Karnataka origin and organized sourcing.
            </h2>
            <p>
              {business.name} is a {business.constitution.toLowerCase()} based at {business.address}. The business discusses coconuts, copra, coconut products, grains and fresh produce for buyers in India and for international enquiries.
            </p>
            <p>
              Sourcing is focused on {business.sourcingRegion}. That regional description is separate from the registered address.
            </p>
          </div>
          <div data-image-reveal className="overflow-hidden rounded-2xl border border-line shadow-md lg:col-span-7">
            <img
              src="/images/nr-karnataka-sourcing.webp"
              alt="Organized coconut harvesting and sourcing operations in Karnataka groves with workers, collection crates, and transport vehicle."
              className="aspect-[16/10] w-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </Container>
      </section>



      {/* SECTION 05 — GLOBAL TRADE POSITIONING */}
      <section className="py-16 md:py-24 bg-forest text-ivory relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#f3bd6d_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>
        <Container className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div data-reveal className="space-y-6 lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#f3bd6d] font-mono">
                GLOBAL EXPORT FOCUS
              </p>
              <h2 className="font-display text-3xl md:text-5xl text-ivory leading-tight">
                Local sourcing.
                <span className="block italic text-[#f3bd6d]">International buyer requirements.</span>
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-ivory/85">
                The company’s international enquiries are handled around the product, grade or form, quantity, packing, destination and commercial requirement shared by the buyer.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/global-exports"
                  className="inline-flex min-h-11 items-center rounded-md bg-white px-6 text-sm font-semibold text-forest transition-colors hover:bg-ivory"
                >
                  Explore Global Export &rarr;
                </Link>
                <Link
                  href="/request-quote?market=global"
                  className="inline-flex min-h-11 items-center rounded-md border border-white/30 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Discuss a Requirement
                </Link>
              </div>
            </div>
            <div data-image-reveal className="overflow-hidden rounded-2xl border border-white/15 shadow-xl lg:col-span-7">
              <img
                src="/images/nr-global-export-network.webp"
                alt="NR International Export global trade visual showing cargo ship, branded container truck, and international connectivity."
                className="aspect-[16/10] w-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 06 — WHO WE WORK WITH */}
      <section className="bg-white py-16 md:py-24 border-b border-line">
        <Container>
          <div data-reveal className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-olive font-mono">
              WHO WE WORK WITH
            </p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink">
              Built around the buyer requirement.
            </h2>
            <p className="mt-4 text-base text-muted leading-relaxed">
              We coordinate agricultural supply across distinct commercial trading and procurement channels.
            </p>
          </div>

          <div data-stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Importers",
                desc: "Product, quantity, destination and packing-led enquiries.",
              },
              {
                title: "Distributors",
                desc: "Recurring or bulk supply discussions based on market requirement.",
              },
              {
                title: "Wholesalers",
                desc: "Commercial quantities for domestic or international trade.",
              },
              {
                title: "Food processors",
                desc: "Commodity and processing-input requirements.",
              },
              {
                title: "Institutional buyers",
                desc: "Structured procurement and quotation discussions.",
              },
              {
                title: "Retail procurement",
                desc: "Product-specific buying requirements.",
              },
            ].map((buyer) => (
              <article
                key={buyer.title}
                className="rounded-xl border border-line bg-ivory/30 p-6 transition-all duration-200 hover:border-forest/40 hover:bg-white hover:shadow-xs"
              >
                <h3 className="font-display text-xl font-semibold text-ink">
                  {buyer.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {buyer.desc}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 07 — CREDIBILITY / REGISTRATIONS */}
      <section className="bg-ivory/30 py-16 md:py-20 border-b border-line">
        <Container>
          <div data-reveal className="max-w-3xl mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-olive font-mono">
              TRADE REGISTRATIONS
            </p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink">
              Registered for business and export trade.
            </h2>
            <p className="mt-3 text-sm text-muted">
              Official Indian government and export promotion council registrations verified for commercial and foreign trade.
            </p>
          </div>

          <div data-stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="flex flex-col items-center justify-center rounded-xl border border-line bg-white p-5 text-center shadow-xs transition-colors hover:border-forest/40"
              >
                <div className="relative mb-3 flex size-14 items-center justify-center overflow-hidden rounded-lg bg-ivory/60 p-2">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xs font-bold text-ink leading-snug">
                  {cert.name}
                </h3>
                <p className="mt-1 text-[11px] text-muted line-clamp-2">
                  {cert.issuer}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 08 — COMPANY AT A GLANCE */}
      <section className="bg-white py-16 md:py-24 border-b border-line">
        <Container>
          <div data-reveal className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-olive font-mono">
              FACTUAL DETAILS
            </p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink">
              Company at a glance
            </h2>
          </div>

          <div data-stagger className="grid gap-8 lg:grid-cols-12 lg:items-start">
            {/* Left: Brand / Contact Card (5 cols) */}
            <div className="rounded-2xl border border-line bg-ivory/50 p-6 md:p-8 lg:col-span-5 shadow-xs">
              <img src="/brand/logo-light.png" alt="NR International Export" className="h-16 w-auto" />
              <div className="mt-6 border-t border-line/80 pt-6">
                <h3 className="font-display text-2xl font-semibold text-ink">
                  {business.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-olive">
                  {business.contactName} · {business.contactRole}
                </p>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-muted font-mono">Phone</span>
                  <a className="font-semibold text-ink hover:text-olive transition-colors" href={`tel:${business.phoneTel}`}>
                    {business.phoneDisplay}
                  </a>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-muted font-mono">Primary Business Email</span>
                  <a className="font-semibold text-ink hover:text-olive transition-colors" href={`mailto:${business.email}`}>
                    {business.email}
                  </a>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-muted font-mono">Secondary Email</span>
                  <a className="font-semibold text-ink hover:text-olive transition-colors" href={`mailto:${business.inboxEmail}`}>
                    {business.inboxEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Structured Factual Details (7 cols) */}
            <div className="rounded-2xl border border-line bg-white p-6 md:p-8 lg:col-span-7 shadow-xs">
              <h3 className="font-display text-2xl font-semibold text-ink mb-6">
                Entity Profile & Registration
              </h3>
              <dl className="divide-y divide-line text-sm">
                <div className="py-3.5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-muted">Legal name</dt>
                  <dd className="mt-1 font-semibold text-ink sm:col-span-2 sm:mt-0">{business.name}</dd>
                </div>
                <div className="py-3.5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-muted">Constitution</dt>
                  <dd className="mt-1 text-ink sm:col-span-2 sm:mt-0">{business.constitution}</dd>
                </div>
                <div className="py-3.5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-muted">Registered address</dt>
                  <dd className="mt-1 text-ink sm:col-span-2 sm:mt-0 leading-relaxed">{business.address}</dd>
                </div>
                <div className="py-3.5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-muted">GSTIN</dt>
                  <dd className="mt-1 font-mono font-semibold text-ink sm:col-span-2 sm:mt-0">{business.gstin}</dd>
                </div>
                <div className="py-3.5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-muted">Administrative Location</dt>
                  <dd className="mt-1 text-ink sm:col-span-2 sm:mt-0">Registered in Hassan district, Karnataka, India.</dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 09 — FINAL CTA */}
      <section className="bg-forest py-16 md:py-20 text-ivory">
        <Container className="text-center">
          <div className="mx-auto max-w-3xl space-y-4">
            <p data-reveal className="text-xs font-bold tracking-[0.14em] text-[#f3bd6d] uppercase font-mono">
              START A CONVERSATION
            </p>
            <h2 data-reveal className="font-display text-3xl sm:text-4xl md:text-5xl">
              Discuss your next supply requirement.
            </h2>
            <p data-reveal className="mx-auto max-w-2xl text-base sm:text-lg text-ivory/85 leading-relaxed">
              Share the product, quantity and destination and the team can review the requirement for quotation.
            </p>
            <div data-reveal className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/request-quote?market=global"
                className="inline-flex min-h-12 items-center rounded-md bg-white px-7 text-sm font-semibold text-forest transition-colors hover:bg-ivory shadow-sm"
              >
                Request Export Quote
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center rounded-md border border-white/40 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Contact NR International
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
