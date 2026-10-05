import type { MetadataRoute } from "next";
import { allowIndex, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!allowIndex) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  const disallow = ["/privacy-policy", "/terms-and-conditions", "/api/"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
          "Bingbot",
        ],
        allow: ["/", "/llms.txt"],
        disallow,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
