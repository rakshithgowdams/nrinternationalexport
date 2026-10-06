import { generateLlmsFullTxt } from "@/lib/llms";

export const dynamic = "force-static";

export function GET() {
  const body = generateLlmsFullTxt();

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "all",
    },
  });
}
