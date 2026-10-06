import { business } from "@/data/business";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://nrinternationalexport.com"
).replace(/\/$/, "");

export const allowIndex = process.env.VERCEL_ENV !== "preview";

export const defaultShareImage = "/images/nr-global-export-hero.webp";

export function absoluteUrl(path: string) {
  const base = siteUrl || "https://nrinternationalexport.com";
  return path.startsWith("http") ? path : `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
  image?: { src: string; alt: string };
  keywords?: string[];
}) {
  const index = (input.index ?? true) && allowIndex;
  const image = input.image ?? {
    src: defaultShareImage,
    alt: `${business.name} logistics with container ship and truck`,
  };
  const title = input.path === "/" ? input.title : `${input.title} · ${business.name}`;
  const fullImageUrl = absoluteUrl(image.src);

  return {
    title: input.path === "/" ? { absolute: input.title } : input.title,
    description: input.description,
    keywords: input.keywords,
    robots: index
      ? {
          index: true,
          follow: true,
          "max-image-preview": "large" as const,
          "max-snippet": -1,
          "max-video-preview": -1,
        }
      : { index: false, follow: false },
    alternates: siteUrl ? { canonical: `${siteUrl}${input.path}` } : undefined,
    openGraph: {
      type: "website" as const,
      siteName: business.name,
      locale: "en_IN",
      title,
      description: input.description,
      url: absoluteUrl(input.path),
      images: [
        {
          url: fullImageUrl,
          alt: image.alt,
          width: 1024,
          height: 576,
          type: "image/webp",
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description: input.description,
      images: [fullImageUrl],
    },
  };
}
