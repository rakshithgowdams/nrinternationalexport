import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { allowIndex, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!allowIndex || !siteUrl) return [];
  const paths = [
    "/",
    "/products",
    "/global-exports",
    "/domestic-supply",
    "/quality-sourcing",
    "/about",
    "/contact",
    "/request-quote",
    ...products.map((product) => `/products/${product.slug}`),
  ];
  return paths.map((path) => ({ url: `${siteUrl}${path}` }));
}
