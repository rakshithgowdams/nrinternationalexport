import { notFound } from "next/navigation";
import Link from "next/link";
import { business, indicativeNote } from "@/data/business";
import { getProduct, marketLabel, products, relatedProducts } from "@/data/products";
import { quoteHref } from "@/lib/catalogue";
import { absoluteUrl, pageMetadata } from "@/lib/site";
import { Container } from "@/components/ui/primitives";
import { Breadcrumbs } from "@/components/sections/Shared";
import { FaqList } from "@/components/sections/FaqList";
import { ProductGallery } from "@/components/products/ProductGallery";
import { QuotePanel } from "@/components/products/QuotePanel";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const role = product.markets.includes("global") ? "Exporter and Supplier" : "Supplier";
  return pageMetadata({
    title: `${product.name} ${role} from Karnataka, India`,
    description: `${product.summary} Supplied by NR International Export, Hassan district, Karnataka. Request a quotation by grade, quantity and destination.`,
    path: `/products/${product.slug}`,
    image: product.images[0],
    keywords: [product.name, ...(product.enquiryNames ?? []), `${product.name} Karnataka`, `${product.name} ${role.toLowerCase()}`],
  });
}

function productSchema(product: NonNullable<ReturnType<typeof getProduct>>) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": absoluteUrl(`/products/${product.slug}#product`),
    name: product.name,
    alternateName: product.enquiryNames,
    description: [product.summary, ...product.overview].join(" "),
    image: product.images.map((image) => absoluteUrl(image.src)),
    url: absoluteUrl(`/products/${product.slug}`),
    category: product.category,
    countryOfOrigin: { "@type": "Country", name: "India" },
    brand: { "@type": "Brand", name: business.name },
    manufacturer: { "@id": absoluteUrl("/#organization") },
    additionalProperty: product.specs.map((row) => ({
      "@type": "PropertyValue",
      name: row.label,
      value: row.value,
    })),
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = relatedProducts(product);

  return (
    <Container className="py-10 md:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema(product)) }} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/products", label: "Products" },
          { label: product.name },
        ]}
      />
      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <div data-reveal>
            <p className="text-xs font-bold tracking-[0.12em] text-ochre-ink uppercase">
              {product.markets.map((market) => marketLabel[market]).join(" · ")}
            </p>
            <h1 className="mt-2 font-display text-4xl md:text-6xl">{product.name}</h1>
            {product.enquiryNames ? (
              <p className="mt-3 text-sm text-muted">Also requested as {product.enquiryNames.join(", ")}.</p>
            ) : null}
          </div>
          <div data-image-reveal className="mt-6">
            <ProductGallery images={product.images} name={product.name} />
          </div>
          <div data-reveal className="mt-8 max-w-3xl space-y-4 leading-7 text-muted">
            {product.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-4 max-w-3xl text-sm">{indicativeNote}</p>
          <Link
            href={quoteHref({ productId: product.id, market: product.markets[0] })}
            className="mt-6 inline-flex min-h-11 items-center rounded-md bg-olive px-5 text-sm font-semibold text-white"
          >
            Request a Quote
          </Link>

          {product.grades ? (
            <section className="mt-12">
              <h2 data-reveal className="font-display text-3xl">Indicative grades</h2>
              <div data-stagger className="mt-4 grid gap-3 sm:grid-cols-3">
                {product.grades.map((grade) => (
                  <article key={grade.name} className="rounded-lg border border-line bg-white p-4">
                    <h3 className="font-semibold">{grade.name}</h3>
                    <p className="mt-1 tabular-nums">{grade.range}</p>
                    <p className="mt-1 text-sm text-muted">{grade.note}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {product.forms ? (
            <section className="mt-12">
              <h2 data-reveal className="font-display text-3xl">Forms you can request</h2>
              <div data-stagger className="mt-4 grid gap-3 sm:grid-cols-2">
                {product.forms.map((form) => (
                  <article key={form.id} className="rounded-lg border border-line bg-white p-4">
                    <h3 className="font-semibold">{form.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{form.description}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-12">
            <h2 data-reveal className="font-display text-3xl">Specifications</h2>
            <div data-reveal className="mt-4 overflow-hidden rounded-lg border border-line bg-white">
              {product.specs.map((row) => (
                <div key={row.label} className="grid gap-1 border-b border-line px-4 py-3 last:border-b-0 sm:grid-cols-[220px_1fr]">
                  <p className="text-sm text-muted">{row.label}</p>
                  <p className="text-sm font-medium">{row.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 data-reveal className="font-display text-3xl">Applications</h2>
            <div data-stagger className="mt-4 grid gap-4 md:grid-cols-2">
              {product.applications.map((item) => (
                <article key={item.title} className="rounded-lg border border-line bg-white p-4">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section data-reveal className="mt-12">
            <h2 className="font-display text-3xl">Packing and storage</h2>
            <p className="mt-3 max-w-3xl leading-7 text-muted">{product.packing}</p>
          </section>

          <section className="mt-12 max-w-3xl">
            <h2 data-reveal className="font-display text-3xl">Product questions</h2>
            <div className="mt-4">
              <FaqList items={product.faqs} />
            </div>
          </section>

          <section className="mt-12">
            <h2 data-reveal className="font-display text-3xl">Related products</h2>
            <ul data-stagger className="mt-4 grid gap-4 sm:grid-cols-3">
              {related.map((item) => (
                <li key={item.id}>
                  <Link href={`/products/${item.slug}`} className="card block overflow-hidden rounded-lg border border-line bg-white">
                    <img src={item.images[0].src} alt={item.images[0].alt} className="aspect-[4/3] w-full object-cover" />
                    <p className="p-3 font-semibold">{item.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <QuotePanel product={product} />
      </div>
    </Container>
  );
}
