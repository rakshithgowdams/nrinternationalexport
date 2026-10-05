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
      <div data-reveal>
        <h1 className="font-display text-4xl md:text-6xl">Image Credits</h1>
        <p className="mt-4 max-w-2xl text-muted">
          These photographs come from Wikimedia Commons and are used under the licences listed. Photographs not listed here were supplied by the business.
        </p>
      </div>
      <ul data-stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {credits.map((item) => (
          <li key={item.file} className="overflow-hidden rounded-lg border border-line bg-white">
            <img src={item.file} alt={item.subject} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            <div className="p-4 text-sm leading-6">
              <p className="font-semibold">{item.subject}</p>
              <p className="text-muted">
                <a href={item.source} className="underline" rel="noopener" target="_blank">{item.title}</a>
                {" by "}
                {item.author}
              </p>
              <p className="text-muted">
                {item.licenseUrl ? (
                  <a href={item.licenseUrl} className="underline" rel="noopener license" target="_blank">{item.license}</a>
                ) : (
                  item.license
                )}
                {/^CC BY/.test(item.license) ? " · resized for the web" : ""}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
