"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { getProduct, marketLabel, products, type Product } from "@/data/products";
import { catalogueHref, filterProducts, parseCatalogueQuery, quoteHref, type CatalogueQuery } from "@/lib/catalogue";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-md border border-ochre-ink/40 px-2 py-0.5 text-[11px] font-bold tracking-wide text-ochre-ink uppercase">
      {children}
    </span>
  );
}

export function Catalogue() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const query = parseCatalogueQuery({
    q: params.get("q") ?? undefined,
    category: params.get("category") ?? undefined,
    market: params.get("market") ?? undefined,
  });
  const results = useMemo(() => filterProducts(query), [query]);
  const featured = products.filter((product) => product.featured);

  function update(next: CatalogueQuery) {
    router.replace(catalogueHref({ ...query, ...next }), { scroll: false });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          update({ q: String(data.get("q") ?? "") });
        }}
      >
        <label className="block text-sm font-semibold" htmlFor="product-search">
          Search products
          <input
            id="product-search"
            name="q"
            defaultValue={query.q}
            key={query.q}
            placeholder="Try ragi, tamato, copra"
            className="mt-1 h-11 w-full rounded-md border border-line bg-white px-3 font-normal"
          />
        </label>
        <button type="submit" className="min-h-11 rounded-md bg-olive px-4 text-sm font-semibold text-white">
          Search
        </button>
        <fieldset>
          <legend className="text-sm font-semibold">Market</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {[
              ["", "All"],
              ["global", "Global Export"],
              ["domestic", "Domestic Supply"],
            ].map(([value, label]) => (
              <button
                key={label}
                type="button"
                aria-pressed={(query.market ?? "") === value}
                onClick={() => update({ market: value })}
                className={`min-h-10 rounded-md border px-3 text-sm ${(query.market ?? "") === value ? "border-olive bg-olive text-white" : "border-line bg-white"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-semibold">Category</legend>
          <div className="mt-2 flex flex-col gap-2">
            {[
              ["", "All categories"],
              ["coconuts", "Coconuts"],
              ["copra", "Copra and Coconut Products"],
              ["grains", "Grains"],
              ["produce", "Fresh Produce"],
            ].map(([value, label]) => {
              const pressed =
                value === ""
                  ? !query.category
                  : query.category === value ||
                    (query.category === "field" && (value === "grains" || value === "produce"));
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => update({ category: value })}
                  className={`min-h-10 rounded-md border px-3 text-left text-sm ${pressed ? "border-olive bg-white text-olive" : "border-line bg-white"}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </fieldset>
        <button type="button" className="text-sm font-semibold text-olive" onClick={() => router.replace(pathname, { scroll: false })}>
          Clear filters
        </button>
      </form>

      <div>
        <p className="text-sm text-muted" aria-live="polite">
          {results.length} {results.length === 1 ? "product" : "products"}
          {query.category === "field" ? " in grains and fresh produce" : ""}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`} className="card rounded-lg border border-line bg-white p-4 hover:border-olive">
              <p className="text-xs font-bold tracking-[0.08em] text-ochre-ink uppercase">Featured page</p>
              <p className="mt-1 font-semibold">{product.name}</p>
            </Link>
          ))}
        </div>
        {results.length === 0 ? (
          <div className="rise-in mt-8 rounded-lg border border-line bg-white p-8">
            <h2 className="font-display text-3xl">No matching products</h2>
            <p className="mt-2 text-muted">Try another name, or clear the filters to see the full catalogue.</p>
            <button type="button" className="mt-4 min-h-11 rounded-md bg-olive px-4 text-sm font-semibold text-white" onClick={() => router.replace(pathname, { scroll: false })}>
              Clear filters
            </button>
          </div>
        ) : (
          <ul key={results.map((product) => product.id).join()} className="fade-in mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((product, index) => (
              <li key={product.id} className="rise-in" style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
        <EnquirySummary />
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white">
      <Link href={`/products/${product.slug}`} className="block overflow-hidden">
        <img
          src={product.images[0].src}
          alt={product.images[0].alt}
          width={400}
          height={300}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-wrap gap-1.5">
          {product.markets.map((market) => (
            <Badge key={market}>{marketLabel[market]}</Badge>
          ))}
        </div>
        <h2 className="mt-3 font-display text-2xl">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h2>
        <p className="mt-2 flex-1 text-sm leading-6 text-muted">{product.summary}</p>
        <div className="mt-4 flex gap-2">
          <Link href={`/products/${product.slug}`} className="inline-flex min-h-10 items-center rounded-md bg-olive px-3 text-sm font-semibold text-white">
            View page
          </Link>
          <QuickView product={product} />
        </div>
      </div>
    </article>
  );
}

function QuickView({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState(product.units[0]);
  const { addLine } = useEnquiry();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="inline-flex min-h-10 items-center rounded-md border border-olive px-3 text-sm font-semibold text-olive">
        Quick view
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay fixed inset-0 z-50 bg-forest/40" />
        <Dialog.Content className="dialog fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-[min(640px,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg bg-white p-5">
          <Dialog.Title className="font-display text-3xl">{product.name}</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-muted">{product.summary}</Dialog.Description>
          <img
            src={product.images[0].src}
            alt={product.images[0].alt}
            width={600}
            height={450}
            loading="lazy"
            decoding="async"
            className="mt-4 aspect-[4/3] w-full rounded-md object-cover"
          />
          <dl className="mt-4 divide-y divide-line text-sm">
            {product.specs.slice(0, 4).map((row) => (
              <div key={row.label} className="flex justify-between gap-4 py-2">
                <dt className="text-muted">{row.label}</dt>
                <dd className="text-right font-medium">{row.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="text-sm font-semibold">
              Quantity
              <input className="mt-1 h-11 w-full rounded-md border border-line px-3" value={quantity} inputMode="decimal" onChange={(event) => setQuantity(Number(event.target.value))} />
            </label>
            <label className="text-sm font-semibold">
              Unit
              <select className="mt-1 h-11 w-full rounded-md border border-line px-3" value={unit} onChange={(event) => setUnit(event.target.value)}>
                {product.units.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className="min-h-11 rounded-md bg-olive px-4 text-sm font-semibold text-white"
              onClick={() => {
                if (quantity > 0) addLine({ productId: product.id, grade: "", quantity, unit, otherUnit: "" });
              }}
            >
              Add to enquiry
            </button>
            <Link href={quoteHref({ productId: product.id, market: product.markets[0] })} className="inline-flex min-h-11 items-center rounded-md border border-olive px-4 text-sm font-semibold text-olive">
              Request a Quote
            </Link>
            <Dialog.Close className="inline-flex min-h-11 items-center px-3 text-sm font-semibold">Close</Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function EnquirySummary() {
  const { lines, updateLine, removeLine, clear } = useEnquiry();
  if (lines.length === 0) {
    return <p className="mt-8 text-sm text-muted">Your enquiry list is empty. Add a product from quick view or open its page.</p>;
  }
  const isDomesticOnly =
    lines.length > 0 &&
    lines.every((l) => getProduct(l.productId)?.markets.includes("domestic")) &&
    !lines.some((l) => !getProduct(l.productId)?.markets.includes("domestic"));
  const isGlobalOnly =
    lines.length > 0 &&
    lines.every((l) => getProduct(l.productId)?.markets.includes("global"));
  const market = isDomesticOnly && !isGlobalOnly ? "domestic" : "global";
  const firstProduct = lines[0]?.productId;
  const quoteUrl = quoteHref({ productId: firstProduct, market });

  return (
    <section className="rise-in mt-8 rounded-lg border border-line bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-2xl">Enquiry list</h2>
        <button type="button" className="text-sm font-semibold text-olive" onClick={clear}>Clear</button>
      </div>
      <ul className="mt-3 divide-y divide-line">
        {lines.map((line, index) => {
          const product = getProduct(line.productId);
          return (
            <li key={`${line.productId}-${index}`} className="flex flex-wrap items-center gap-3 py-3 text-sm">
              <span className="min-w-40 font-semibold">{product?.name ?? "Unknown product"}</span>
              <label>
                Qty
                <input className="ml-2 h-10 w-20 rounded-md border border-line px-2" value={line.quantity} onChange={(event) => updateLine(index, { quantity: Number(event.target.value) })} />
              </label>
              <span>{line.unit === "other" ? line.otherUnit : line.unit}</span>
              {line.grade ? <span className="text-muted">{line.grade}</span> : null}
              <button type="button" className="ml-auto text-olive" onClick={() => removeLine(index)}>Remove</button>
            </li>
          );
        })}
      </ul>
      <Link href={quoteUrl} className="mt-4 inline-flex min-h-11 items-center rounded-md bg-olive px-4 text-sm font-semibold text-white">
        Proceed to quote
      </Link>
    </section>
  );
}
