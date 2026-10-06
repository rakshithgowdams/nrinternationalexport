import Image from "next/image";
import credits from "@/data/image-credits.json";
import { pageMetadata } from "@/lib/site";
import { Container } from "@/components/ui/primitives";

export const metadata = pageMetadata({
  title: "Image Credits",
  description: "Sources and licences for the photographs used on the NR International Export website.",
  path: "/image-credits",
  index: false,
});

export default function ImageCreditsPage() {
  return (
    <Container className="py-12 md:py-16">
      <div data-reveal className="max-w-3xl">
        <h1 className="font-display text-4xl md:text-6xl text-ink">Image Credits</h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Selected photographs used on this website are sourced from Wikimedia Commons and are attributed below in accordance with their respective licences. Original and company-supplied visuals are not listed.
        </p>
      </div>

      <ul data-stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {credits.map((item) => (
          <li key={item.id} className="overflow-hidden rounded-xl border border-line bg-white shadow-xs transition-shadow hover:shadow-sm">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-ivory">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
            <div className="p-5 text-sm leading-6">
              <h2 className="font-display text-lg font-semibold text-ink line-clamp-1">
                {item.title}
              </h2>
              
              <div className="mt-3 space-y-1 text-xs text-muted">
                <p>
                  <span className="font-semibold text-ink">Creator:</span> {item.creator}
                </p>
                <p>
                  <span className="font-semibold text-ink">Source:</span>{" "}
                  <a
                    href={item.sourceUrl}
                    className="text-olive hover:underline font-medium"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Wikimedia Commons &nearr;
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-ink">Licence:</span>{" "}
                  {item.licenseUrl ? (
                    <a
                      href={item.licenseUrl}
                      className="text-olive hover:underline font-medium"
                      rel="noopener noreferrer license"
                      target="_blank"
                    >
                      {item.license} &nearr;
                    </a>
                  ) : (
                    <span>{item.license}</span>
                  )}
                  {/^CC BY/i.test(item.license) ? " · resized for web" : ""}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
