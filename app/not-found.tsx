import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import { Container } from "@/components/ui/primitives";

export const metadata = pageMetadata({
  title: "Page not found",
  description: "This page could not be found.",
  path: "/404",
  index: false,
});

export default function NotFound() {
  return (
    <Container className="grid items-center gap-8 py-16 md:grid-cols-2 md:py-24">
      <div data-reveal>
        <p className="font-display text-7xl text-olive">404</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">This page could not be found.</h1>
        <p className="mt-4 max-w-md text-muted">The address may be out of date. You can return home, browse the catalogue, or contact the desk.</p>
        <form action="/products" className="mt-6 flex gap-2">
          <label className="sr-only" htmlFor="missing-search">Search products</label>
          <input id="missing-search" name="q" className="field" placeholder="Search products" />
          <button className="min-h-11 rounded-md bg-olive px-4 text-sm font-semibold text-white" type="submit">Search</button>
        </form>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/" className="inline-flex min-h-11 items-center rounded-md bg-olive px-4 text-sm font-semibold text-white">Back to Home</Link>
          <Link href="/products" className="inline-flex min-h-11 items-center rounded-md border border-olive px-4 text-sm font-semibold text-olive">Browse Products</Link>
          <Link href="/contact" className="inline-flex min-h-11 items-center text-sm font-semibold text-olive">Contact</Link>
        </div>
      </div>
      <div data-image-reveal className="overflow-hidden rounded-lg">
        <img src="/images/coconut-kernel.jpg" alt="Catalogue photograph of a cut coconut." className="aspect-[4/3] w-full object-cover" />
      </div>
    </Container>
  );
}
