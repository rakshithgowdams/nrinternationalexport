import Link from "next/link";
import { business } from "@/data/business";
import { pageMetadata } from "@/lib/site";
import { Container } from "@/components/ui/primitives";
import { TradeCertifications } from "@/components/sections/TradeCertifications";

export const metadata = pageMetadata({
  title: "About NR International Export | Agricultural Export Company, Karnataka",
  description:
    "Learn about NR International Export, a Karnataka-based agricultural trade enterprise connecting regional sourcing with domestic and international buyer requirements.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* =========================================================================
          01 — GLOBAL-FIRST ABOUT HERO
          ========================================================================= */}
      <section className="relative overflow-hidden bg-forest text-ivory">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#f3bd6d_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>
        <Container className="relative z-10 py-16 sm:py-20 md:py-24 lg:py-28">
          <p data-reveal className="text-xs font-bold tracking-[0.14em] text-[#f3bd6d] uppercase font-mono">
            ABOUT NR INTERNATIONAL EXPORT
          </p>
          <div className="mt-4 max-w-4xl">
            <h1 data-reveal className="font-display text-[2.5rem] leading-[1.08] font-medium text-ivory sm:text-5xl lg:text-6xl">
              Bridging Karnataka’s agricultural excellence
              <span className="mt-1 block italic text-[#f3bd6d] font-normal">
                with global markets.
              </span>
            </h1>
          </div>
          <p data-reveal className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-ivory/90">
            NR International Export is a Karnataka-based agricultural trade enterprise connecting regional sourcing with domestic and international buyer requirements. The company focuses on coconuts, copra and selected agricultural commodities, with product, quantity, packing and destination requirements discussed before quotation.
          </p>
          <div data-reveal className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/global-exports"
              prefetch={false}
              className="inline-flex min-h-12 items-center rounded-md bg-white px-6 text-sm font-semibold text-forest transition-colors hover:bg-ivory shadow-sm"
            >
              Explore Global Exports &rarr;
            </Link>
            <Link
              href="/request-quote?market=global"
              prefetch={false}
              className="inline-flex min-h-12 items-center rounded-md border border-white/40 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Request a Quote
            </Link>
          </div>
          <p data-reveal className="mt-8 text-xs font-medium tracking-wide text-ivory/70 font-mono">
            Channarayapatna & Tiptur · Karnataka, India
          </p>
        </Container>
      </section>

      {/* =========================================================================
          02 — WHO WE ARE
          ========================================================================= */}
      <section className="bg-white py-16 md:py-20 border-b border-line">
        <Container>
          <div data-reveal className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-olive font-mono">
              WHO WE ARE
            </p>
            <h2 className="mt-2 font-display text-3xl md:text-5xl text-ink">
              From sourcing conversations to export-ready supply.
            </h2>
            <div className="mt-6 space-y-4 text-base md:text-lg leading-relaxed text-muted">
              <p>
                NR International Export is a partnership based in Hassan district, Karnataka, working with agricultural commodities for domestic and international buyer enquiries.
              </p>
              <p>
                The company was established with a focus on connecting regional agricultural sourcing with broader trade opportunities while maintaining clear communication around product, quantity, packing, destination and commercial requirements.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          03 — WHY WE EXIST
          ========================================================================= */}
      <section className="bg-ivory/40 py-16 md:py-20 border-b border-line">
        <Container>
          <div data-reveal className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-ochre-ink font-mono">
              WHY WE EXIST
            </p>
            <h2 className="mt-2 font-display text-3xl md:text-5xl text-ink">
              Trade that begins at the source.
            </h2>
            <div className="mt-6 space-y-4 text-base md:text-lg leading-relaxed text-muted">
              <p>
                NR International Export approaches agricultural trade as more than a transaction. The company aims to strengthen the connection between regional farming communities, structured domestic supply and international buyer demand.
              </p>
              <p>
                Through transparent commercial discussions and requirement-led sourcing, NR seeks to support dependable agricultural trade and longer-term market opportunities.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          04 — THREE CAPABILITY PILLARS
          ========================================================================= */}
      <section className="bg-white py-16 md:py-20 border-b border-line">
        <Container>
          <div data-reveal className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-olive font-mono">
              OUR CAPABILITIES
            </p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink">
              Structured capability from origin to dispatch.
            </h2>
          </div>

          <div data-stagger className="mt-12 grid gap-8 md:grid-cols-3">
            <article className="border-t-2 border-forest/20 pt-6">
              <span className="font-mono text-xs font-bold text-ochre-ink">01</span>
              <h3 className="mt-3 font-display text-2xl font-semibold text-ink">Karnataka sourcing</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Product sourcing is discussed around established agricultural regions in Karnataka according to buyer requirement, product availability and season.
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

      {/* =========================================================================
          05 — ORIGIN · CHANNARAYAPATNA AND TIPTUR
          ========================================================================= */}
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
              NR International Export gives sourcing priority to the Channarayapatna and Tiptur region of Karnataka, an important belt for fresh coconut and copra.
            </p>
            <p>
              The broader product discussion also includes commodities such as ragi, maize and selected fresh agricultural produce according to buyer demand and supply availability.
            </p>
            <p className="text-sm">
              The registered business address remains in Hassan district, Karnataka.
            </p>
          </div>
          <div data-image-reveal className="overflow-hidden rounded-2xl border border-line shadow-md lg:col-span-7">
            <picture className="w-full block">
              <source
                media="(max-width: 768px)"
                srcSet="/images/nr-karnataka-sourcing-mobile.webp"
                type="image/webp"
                width={640}
                height={400}
              />
              <img
                src="/images/nr-karnataka-sourcing.webp"
                alt="Organized coconut harvesting and sourcing operations in Karnataka groves with workers, collection crates, and transport vehicle."
                className="aspect-[16/10] w-full object-cover object-center"
                loading="lazy"
                decoding="async"
                width={1024}
                height={640}
              />
            </picture>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          06 — OUR DIRECTION / CORE VALUES
          ========================================================================= */}
      <section className="bg-white py-16 md:py-24 border-b border-line">
        <Container>
          <div data-reveal className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-olive font-mono">
              OUR DIRECTION
            </p>
            <h2 className="mt-2 font-display text-3xl md:text-5xl text-ink">
              Built around integrity, transparency and responsible trade.
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted leading-relaxed">
              Operating principles that guide how NR International Export coordinates trade conversations, supplier relationships, and commercial agreements.
            </p>
          </div>

          <div data-stagger className="mt-14 grid gap-8 md:grid-cols-3">
            <article className="rounded-xl border border-line bg-ivory/30 p-7 transition-colors hover:border-forest/40 hover:bg-white">
              <span className="font-mono text-xs font-bold text-ochre-ink">01 · CORE VALUE</span>
              <h3 className="mt-3 font-display text-2xl font-semibold text-ink">Product integrity</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                NR International Export places emphasis on product condition, appropriate handling and buyer-defined quality requirements before commercial confirmation. Product and packing requirements are discussed with reference to applicable buyer and destination requirements.
              </p>
            </article>

            <article className="rounded-xl border border-line bg-ivory/30 p-7 transition-colors hover:border-forest/40 hover:bg-white">
              <span className="font-mono text-xs font-bold text-ochre-ink">02 · CORE VALUE</span>
              <h3 className="mt-3 font-display text-2xl font-semibold text-ink">Transparent trade</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                The company aims to build long-term trade relationships through clear communication, transparent commercial discussion and responsible coordination across domestic and international enquiries.
              </p>
            </article>

            <article className="rounded-xl border border-line bg-ivory/30 p-7 transition-colors hover:border-forest/40 hover:bg-white">
              <span className="font-mono text-xs font-bold text-ochre-ink">03 · CORE VALUE</span>
              <h3 className="mt-3 font-display text-2xl font-semibold text-ink">Regional connection</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                The company maintains a strong sourcing connection with Karnataka’s agricultural regions while pursuing wider market opportunities for locally sourced commodities.
              </p>
            </article>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          07 & 08 — OUR VISION & OUR MISSION (WITH GLOBAL-EXPORT VISUAL)
          ========================================================================= */}
      <section className="bg-ivory/50 py-16 md:py-24 border-b border-line">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Vision & Mission (7 cols) */}
            <div className="space-y-12 lg:col-span-7">
              {/* 07 — VISION */}
              <div data-reveal>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-ochre-ink font-mono">
                  OUR VISION
                </p>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl text-ink">
                  Regional agriculture connected to wider markets.
                </h2>
                <div className="mt-4 space-y-3 text-base text-muted leading-relaxed">
                  <p>
                    Our vision is to contribute to a stronger agricultural economy by connecting regional farming and sourcing communities with broader domestic and international trade opportunities.
                  </p>
                  <p>
                    We aim to support sustainable market access, stronger agricultural value chains and long-term commercial opportunities through responsible agri-trade.
                  </p>
                </div>
              </div>

              <hr className="border-line" />

              {/* 08 — MISSION */}
              <div data-reveal>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-olive font-mono">
                  OUR MISSION
                </p>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl text-ink">
                  Reliable agricultural supply from Karnataka to the market that needs it.
                </h2>
                <div className="mt-4 space-y-3 text-base text-muted leading-relaxed">
                  <p>
                    Our mission is to connect buyers with quality agricultural commodities sourced from Karnataka’s key farming regions, with particular focus on coconut, copra and selected grains and fresh produce.
                  </p>
                  <p>
                    We aim to maintain careful product handling, clear requirement discussions, efficient packing coordination and dependable bulk supply for domestic and international trade.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Global Export Visual (5 cols) */}
            <div data-image-reveal className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-md">
                <picture className="w-full block">
                  <source
                    media="(max-width: 768px)"
                    srcSet="/images/nr-global-export-hero-mobile.webp"
                    type="image/webp"
                    width={640}
                    height={360}
                  />
                  <img
                    src="/images/nr-global-export-hero.webp"
                    alt="NR International Export logistics connectivity connecting Karnataka sourcing groves with maritime port container vessels and international trade."
                    className="aspect-[4/3] lg:aspect-[3/4] w-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={600}
                  />
                </picture>
                <div className="p-4 sm:p-5 border-t border-line bg-white">
                  <p className="text-xs font-mono font-medium text-muted">
                    Regional groves &rarr; Inland transit &rarr; International seaport dispatch
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          09 — GLOBAL EXPORT FOCUS
          ========================================================================= */}
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
                The company’s international enquiries are handled around product, form or grade, quantity, packing, destination and commercial requirements shared by the buyer.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  href="/global-exports"
                  prefetch={false}
                  className="inline-flex min-h-11 items-center justify-center rounded-md bg-white px-6 text-sm font-semibold text-forest transition-colors hover:bg-ivory text-center"
                >
                  Explore Global Export &rarr;
                </Link>
                <Link
                  href="/request-quote?market=global"
                  prefetch={false}
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/30 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10 text-center"
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
                decoding="async"
                width={1024}
                height={576}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          10 — WHO WE WORK WITH
          ========================================================================= */}
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

      {/* =========================================================================
          11 — TRADE REGISTRATIONS
          ========================================================================= */}
      <TradeCertifications />

      {/* =========================================================================
          12 — COMPANY AT A GLANCE
          ========================================================================= */}
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
              <img
                src="/brand/logo-light.webp"
                alt="NR International Export"
                width={200}
                height={123}
                loading="lazy"
                decoding="async"
                className="h-16 w-auto"
              />
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

      {/* =========================================================================
          13 — FINAL EXPORT CTA
          ========================================================================= */}
      <section className="bg-forest py-16 md:py-20 text-ivory">
        <Container className="text-center">
          <div className="mx-auto max-w-3xl space-y-4">
            <p data-reveal className="text-xs font-bold tracking-[0.14em] text-[#f3bd6d] uppercase font-mono">
              START A CONVERSATION
            </p>
            <h2 data-reveal className="font-display text-3xl sm:text-4xl md:text-5xl">
              Discuss your next agricultural supply requirement.
            </h2>
            <p data-reveal className="mx-auto max-w-2xl text-base sm:text-lg text-ivory/85 leading-relaxed">
              Share the product, quantity and destination so the team can review the requirement for quotation.
            </p>
            <div data-reveal className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                href="/request-quote?market=global"
                prefetch={false}
                className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center rounded-md bg-white px-7 text-sm font-semibold text-forest transition-colors hover:bg-ivory shadow-sm text-center"
              >
                Request Export Quote
              </Link>
              <Link
                href="/contact"
                prefetch={false}
                className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center rounded-md border border-white/40 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10 text-center"
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
