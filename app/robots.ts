import type { MetadataRoute } from "next";
import { allowIndex, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteUrl || "https://nrinternationalexport.com";

  if (!allowIndex) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  const disallow = ["/api/", "/_next/"];
  const allow = [
    "/",
    "/llms.txt",
    "/llms-full.txt",
    "/.well-known/llms.txt",
    "/citation/",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow,
        disallow,
      },
      {
        userAgent: [
          // Mainstream Search Engines
          "Googlebot",
          "Googlebot-Image",
          "Bingbot",
          "Applebot",
          "DuckDuckBot",
          // OpenAI (ChatGPT, ChatGPT Search, Training)
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          // Anthropic (Claude, Claude Search)
          "ClaudeBot",
          "Claude-SearchBot",
          "anthropic-ai",
          // Perplexity AI Answer Engine
          "PerplexityBot",
          // Google AI Overviews & Gemini
          "Google-Extended",
          // Apple Intelligence
          "Applebot-Extended",
          // Cohere & Meta AI
          "cohere-ai",
          "Meta-ExternalAgent",
          "FacebookBot",
          // ByteDance Doubao / TikTok AI
          "Bytespider",
          // Common Crawl & Structured Knowledge
          "CCBot",
          "Diffbot",
        ],
        allow,
        disallow,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
