import type { MetadataRoute } from "next";
import { allowIndex, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!allowIndex) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/privacy-policy", "/terms-and-conditions", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
