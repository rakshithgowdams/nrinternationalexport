import Link from "next/link";
import { business, certifications } from "@/data/business";
import { FooterGlobalBand } from "@/components/sections/FooterGlobalBand";

const footerProducts = [
  { name: "Fresh Coconut", href: "/products/fresh-coconuts" },
  { name: "Edible Copra", href: "/products/edible-copra" },
  { name: "Coconut Oil", href: "/products/coconut-oil" },
  { name: "Ginger", href: "/products/ginger" },
  { name: "Maize", href: "/products/maize" },
  { name: "Ragi", href: "/products/ragi" },
];

export function SiteFooter() {
  return (
    <footer className="bg-forest text-ivory">
      <FooterGlobalBand />

      {/* Registrations & Certifications Band */}
      <section aria-labelledby="footer-certifications" className="border-b border-white/10">
        <div className="mx-auto max-w-[1280px] px-4 py-5 sm:py-6 lg:py-6 sm:px-6 lg:px-8">
          <p
            id="footer-certifications"
            className="text-center text-xs font-bold tracking-[0.08em] text-[#efba6a] uppercase"
          >
            Registrations and certifications
          </p>
          <ul
            data-stagger
            className="mx-auto mt-3.5 sm:mt-4 flex max-w-5xl flex-wrap justify-center gap-3 sm:gap-4 lg:gap-5"
          >
            {certifications.map((item) => (
              <li
                key={item.id}
                className="card flex w-[calc(50%-0.5rem)] sm:w-[145px] md:w-[155px] lg:w-[160px] flex-col items-center text-center"
              >
                <div className="flex h-[92px] sm:h-[100px] lg:h-[105px] w-full max-w-[145px] sm:max-w-[155px] lg:max-w-[160px] items-center justify-center overflow-hidden rounded-md bg-white p-2 shadow-xs">
                  <img
                    src={item.image}
                    alt={"alt" in item && item.alt ? item.alt : `${item.name} – ${item.issuer}`}
                    width={300}
                    height={300}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <p className="mt-2 text-xs sm:text-[13px] font-semibold text-ivory/95 leading-tight">
                  {item.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Main Footer Navigation & Details */}
      <div
        data-stagger
        className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 lg:grid-cols-12 lg:gap-8 px-4 py-8 sm:py-9 lg:py-9 sm:px-6 lg:px-8"
      >
        {/* Brand Column */}
        <div className="lg:col-span-3">
          <div className="inline-block rounded-md bg-ivory p-2 sm:p-2.5">
            <picture>
              <source srcSet="/brand/logo-light.webp" type="image/webp" />
              <img
                src="/brand/logo-light.png"
                alt="NR International Export"
                width={200}
                height={123}
                loading="lazy"
                decoding="async"
                className="h-20 sm:h-[82px] w-auto"
              />
            </picture>
          </div>
          <p className="mt-3 max-w-xs text-xs sm:text-[13px] font-medium tracking-[0.08em] text-ivory/80 uppercase leading-relaxed">
            {business.tagline}
          </p>
        </div>

        {/* Curated Products Column */}
        <div className="lg:col-span-2">
          <p className="text-xs font-bold tracking-[0.08em] text-[#efba6a] uppercase">Products</p>
          <ul className="mt-2.5 space-y-2 text-sm">
            {footerProducts.map((product) => (
              <li key={product.href}>
                <Link
                  href={product.href}
                  className="text-ivory/85 transition-colors hover:text-white"
                >
                  {product.name}
                </Link>
              </li>
            ))}
            <li className="pt-1">
              <Link
                href="/products"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#efba6a] transition-all hover:text-[#f8d092] hover:translate-x-0.5"
              >
                <span>View all products</span>
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Column */}
        <div className="lg:col-span-3">
          <p className="text-xs font-bold tracking-[0.08em] text-[#efba6a] uppercase">Company</p>
          <ul className="mt-2.5 space-y-1.5 text-sm">
            <li>
              <Link href="/products" className="text-ivory/85 transition-colors hover:text-white">
                All products
              </Link>
            </li>
            <li>
              <Link href="/global-exports" className="text-ivory/85 transition-colors hover:text-white">
                Global Exports
              </Link>
            </li>
            <li>
              <Link href="/domestic-supply" className="text-ivory/85 transition-colors hover:text-white">
                Domestic Supply
              </Link>
            </li>
            <li>
              <Link href="/quality-sourcing" className="text-ivory/85 transition-colors hover:text-white">
                Quality and Sourcing
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-ivory/85 transition-colors hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-ivory/85 transition-colors hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/request-quote" className="text-ivory/85 transition-colors hover:text-white">
                Request a Quote
              </Link>
            </li>
          </ul>
          <ul className="mt-2.5 pt-2 border-t border-white/10 space-y-1 text-xs">
            <li>
              <Link href="/privacy-policy" className="text-ivory/70 transition-colors hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="text-ivory/70 transition-colors hover:text-white">
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link href="/image-credits" className="text-ivory/70 transition-colors hover:text-white">
                Image Credits
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="lg:col-span-4">
          <p className="text-xs font-bold tracking-[0.08em] text-[#efba6a] uppercase">Contact</p>

          {/* Person & Role */}
          <div className="mt-2.5">
            <p className="text-sm font-semibold text-white">{business.contactName}</p>
            <p className="text-xs text-ivory/80">{business.contactRole}</p>
          </div>

          {/* Contact Methods */}
          <div className="mt-2.5 space-y-0.5 text-xs sm:text-sm">
            <p>
              <a
                href={`tel:${business.phoneTel}`}
                className="text-ivory/90 transition-colors hover:text-white"
              >
                {business.phoneDisplay}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${business.email}`}
                className="text-ivory/90 transition-colors hover:text-white"
              >
                {business.email}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${business.inboxEmail}`}
                className="text-xs text-ivory/70 transition-colors hover:text-white"
              >
                {business.inboxEmail}
              </a>
            </p>
          </div>

          {/* Registered Address */}
          <address className="mt-2.5 text-xs leading-relaxed text-ivory/80 not-italic">
            {business.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>

          {/* Tax Identification */}
          <p className="mt-2.5 text-xs font-mono text-ivory/90">
            <span className="text-ivory/60">GSTIN:</span> {business.gstin}
          </p>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8 text-xs text-ivory/70">
          <p>© {new Date().getFullYear()} {business.name}. {business.constitution}.</p>
        </div>
      </div>
    </footer>
  );
}
