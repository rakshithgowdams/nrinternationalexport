import { business } from "@/data/business";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");

export const allowIndex =
  Boolean(siteUrl) && process.env.VERCEL_ENV !== "preview";

export const defaultShareImage = "/images/plantation-india.jpg";

export function absoluteUrl(path: string) {
  return siteUrl ? `${siteUrl}${path}` : path;
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
  const image = input.image ?? { src: defaultShareImage, alt: `${business.name}, Karnataka` };
  const title = input.path === "/" ? input.title : `${input.title} · ${business.name}`;
  return {
    title: input.path === "/" ? { absolute: input.title } : input.title,
    description: input.description,
    keywords: input.keywords,
    robots: index
      ? { index: true, follow: true, "max-image-preview": "large" as const, "max-snippet": -1 }
      : { index: false, follow: false },
    alternates: siteUrl ? { canonical: `${siteUrl}${input.path}` } : undefined,
    openGraph: {
      type: "website" as const,
      siteName: business.name,
      locale: "en_IN",
      title,
      description: input.description,
      url: absoluteUrl(input.path),
      images: [{ url: image.src, alt: image.alt }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description: input.description,
      images: [image.src],
    },
  };
}
