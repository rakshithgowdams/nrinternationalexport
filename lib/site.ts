export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");

export const allowIndex =
  Boolean(siteUrl) && process.env.VERCEL_ENV !== "preview";

export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}) {
  const index = (input.index ?? true) && allowIndex;
  return {
    title: input.path === "/" ? { absolute: input.title } : input.title,
    description: input.description,
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false },
    alternates: siteUrl ? { canonical: `${siteUrl}${input.path}` } : undefined,
  };
}
