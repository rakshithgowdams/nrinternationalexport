import Link from "next/link";
import { business, certifications } from "@/data/business";
import { products } from "@/data/products";

export function SiteFooter() {
  return (
    <footer className="bg-forest text-ivory">
      <section aria-labelledby="footer-certifications" className="border-b border-white/10">
        <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
          <p id="footer-certifications" className="text-center text-xs font-bold tracking-[0.08em] text-[#efba6a] uppercase">
            Registrations and certifications
          </p>
          <ul data-stagger className="mx-auto mt-6 flex max-w-5xl flex-wrap justify-center gap-4 sm:gap-6">
            {certifications.map((item) => (
              <li
                key={item.id}
                className="card flex w-[calc(50%-0.5rem)] sm:w-[155px] md:w-[165px] lg:w-[180px] flex-col items-center text-center"
              >
                <div className="overflow-hidden rounded-lg bg-white p-1.5 shadow-sm">
                  <img
                    src={item.image}
                    alt={"alt" in item && item.alt ? item.alt : `${item.name} – ${item.issuer}`}
                    width={400}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full max-w-[150px] object-contain"
                  />
                </div>
                <p className="mt-3 text-sm font-semibold">{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div data-stagger className="mx-auto grid max-w-[1280px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <div className="inline-block rounded-md bg-ivory p-3">
            <img src="/brand/logo-light.png" alt="NR International Export" className="h-28 w-auto" />
          </div>
          <p className="mt-4 max-w-xs text-sm tracking-[0.08em] text-ivory/80 uppercase">
            {business.tagline}
          </p>
        </div>
        <div className="lg:col-span-3">
          <p className="text-xs font-bold tracking-[0.08em] text-[#efba6a] uppercase">Products</p>
          <ul className="mt-3 columns-1 gap-8 text-sm sm:columns-2 lg:columns-1">
            {products.map((product) => (
              <li key={product.id} className="mb-1.5 break-inside-avoid">
                <Link href={`/products/${product.slug}`} className="hover:text-white">
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-2">
          <p className="text-xs font-bold tracking-[0.08em] text-[#efba6a] uppercase">Company</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li><Link href="/products">All products</Link></li>
            <li><Link href="/global-exports">Global Exports</Link></li>
            <li><Link href="/domestic-supply">Domestic Supply</Link></li>
            <li><Link href="/quality-sourcing">Quality and Sourcing</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/request-quote">Request a Quote</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions">Terms and Conditions</Link></li>
            <li><Link href="/image-credits">Image Credits</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-3">
          <p className="text-xs font-bold tracking-[0.08em] text-[#efba6a] uppercase">Contact</p>
          <p className="mt-3 text-sm font-semibold">{business.contactName}</p>
          <p className="text-sm text-ivory/80">{business.contactRole}</p>
          <p className="mt-3 text-sm">
            <a href={`tel:${business.phoneTel}`}>{business.phoneDisplay}</a>
          </p>
          <p className="text-sm">
            <a href={`mailto:${business.email}`}>{business.email}</a>
          </p>
          <p className="text-sm text-ivory/80">
            <a href={`mailto:${business.inboxEmail}`}>{business.inboxEmail}</a>
          </p>
          <address className="mt-3 text-sm leading-6 text-ivory/85 not-italic">
            {business.addressLines.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </address>
          <p className="mt-3 text-sm">GSTIN {business.gstin}</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-4 py-4 text-xs text-ivory/70 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {business.name}. {business.constitution}.</p>
        </div>
      </div>
    </footer>
  );
}
