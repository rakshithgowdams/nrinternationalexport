import {
  categories,
  categoryLabel,
  getProduct,
  markets,
  products,
  type CategoryFilter,
  type Market,
  type Product,
} from "../data/products";

export type CatalogueQuery = {
  q?: string;
  category?: string;
  market?: string;
};

export function parseCatalogueQuery(input: CatalogueQuery) {
  const q = (input.q ?? "").trim().slice(0, 80);
  const category = categories.includes(input.category as CategoryFilter)
    ? (input.category as CategoryFilter)
    : undefined;
  const market = markets.includes(input.market as Market)
    ? (input.market as Market)
    : undefined;
  return { q, category, market };
}

export function filterProducts(input: CatalogueQuery): Product[] {
  const { q, category, market } = parseCatalogueQuery(input);
  const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);

  return products.filter((product) => {
    if (market && !product.markets.includes(market)) return false;
    if (category === "field") {
      if (product.category !== "grains" && product.category !== "produce") return false;
    } else if (category && product.category !== category) {
      return false;
    }
    if (tokens.length === 0) return true;
    const haystack = [product.name, product.summary, ...product.aliases, ...(product.enquiryNames ?? [])]
      .join(" ")
      .toLowerCase();
    return tokens.every((token) => haystack.includes(token));
  });
}

export function catalogueHref(input: CatalogueQuery) {
  const parsed = parseCatalogueQuery(input);
  const params = new URLSearchParams();
  if (parsed.q) params.set("q", parsed.q);
  if (parsed.category) params.set("category", parsed.category);
  if (parsed.market) params.set("market", parsed.market);
  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}

export function quoteHref(input: { productId?: string; market?: Market }) {
  const params = new URLSearchParams();
  if (input.productId && getProduct(input.productId)) params.set("product", input.productId);
  if (input.market) params.set("market", input.market);
  const query = params.toString();
  return query ? `/request-quote?${query}` : "/request-quote";
}

export function categoryTitle(category?: CategoryFilter) {
  return category ? categoryLabel[category] : "All products";
}
