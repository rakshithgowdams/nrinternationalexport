import { Suspense } from "react";
import { Catalogue } from "@/components/products/Catalogue";
import { Container } from "@/components/ui/primitives";
import { CtaBand } from "@/components/sections/Shared";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Products",
  description: "Find coconuts, copra, grains and fresh produce for global export or domestic supply.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <Container className="py-12 md:py-16">
        <div data-reveal>
          <p className="text-xs font-bold tracking-[0.12em] text-ochre-ink uppercase">Catalogue</p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl md:text-6xl">Find the right product for your market.</h1>
          <p className="mt-4 max-w-2xl text-muted">
            Every product has its own page and photograph. Search names and enquiry spellings such as finger millet, tamato or thunder coconut.
          </p>
        </div>
        <div className="mt-10">
          <Suspense fallback={<p>Loading catalogue…</p>}>
            <Catalogue />
          </Suspense>
        </div>
      </Container>
      <CtaBand
        title="Need help choosing?"
        body="Send the product, quantity and destination. We will reply with what can be confirmed."
        primaryHref="/request-quote"
        primaryLabel="Request a Quote"
        secondaryHref="/contact"
        secondaryLabel="Contact"
      />
    </>
  );
}
