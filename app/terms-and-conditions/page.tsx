import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import { Container } from "@/components/ui/primitives";

export const metadata = pageMetadata({
  title: "Terms and Conditions",
  description: "Draft terms for using the NR International Export website and requesting a quotation.",
  path: "/terms-and-conditions",
  index: false,
});

const sections = [
  ["use", "Using the website", "You may read the catalogue and send an enquiry. Do not misuse the forms or attempt to disrupt the site."],
  ["information", "Product information", "Photographs and specifications are indicative. They are not an offer, a stock promise, or a test certificate. Figures marked for confirmation are not claims."],
  ["quotations", "Quotations", "A price, packing plan or delivery date exists only in a quotation the business actually sends. Submitting the form, or opening your own email programme, does not create an order."],
  ["acceptance", "Orders", "An order exists only when the commercial terms are accepted by the parties. This website does not take payment."],
  ["samples", "Specifications and samples", "Samples and specifications are discussed per enquiry. Nothing here promises that a sample will be sent."],
  ["payment", "Payment", "Payment arrangements are not published. They belong in the accepted quotation. This draft does not state deposits or refunds."],
  ["delivery", "Packing, delivery and risk", "Packing and delivery are confirmed per order. The site does not publish Incoterms, transit times or a service-area guarantee."],
  ["disputes", "Inspection", "Inspection and any disagreement about quality should be raised against the accepted quotation. This draft does not choose a court."],
  ["ip", "Intellectual property", "The NR International Export name and logo belong to the business. Photographs on this site are either supplied by the business or freely licensed images from Wikimedia Commons, credited on the Image Credits page. They show the type of product and are not proof of a particular facility or lot."],
  ["liability", "Liability", "Information is provided for trade enquiries. This draft does not add liability terms beyond saying that order-specific commitments belong in the accepted quotation."],
];

export default function TermsPage() {
  return (
    <Container className="py-12 md:py-16">
      <div data-reveal>
        <p className="text-xs font-bold tracking-[0.08em] text-ochre-ink uppercase">Draft · 26 September 2026</p>
        <h1 className="mt-2 font-display text-4xl md:text-6xl">Terms and Conditions</h1>
        <p className="mt-4 max-w-2xl text-muted">Draft for review. It is not a signed contract and it is not legal advice.</p>
      </div>
      <div className="mt-8 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav aria-label="Contents" className="lg:sticky lg:top-28 lg:self-start">
          <ul className="space-y-2 text-sm">
            {sections.map(([id, title]) => (
              <li key={id}><a href={`#${id}`}>{title}</a></li>
            ))}
          </ul>
        </nav>
        <div className="max-w-3xl space-y-8">
          {sections.map(([id, title, body]) => (
            <section key={id} id={id} className="scroll-mt-28">
              <h2 className="font-display text-3xl">{title}</h2>
              <p className="mt-3 leading-7 text-muted">{body}</p>
            </section>
          ))}
          <p>Contact: <a className="font-semibold" href="mailto:contact@nrinternationalexport.com">contact@nrinternationalexport.com</a> · <a className="font-semibold" href="tel:+916360510816">+91 63605 10816</a></p>
          <Link href="/privacy-policy" className="inline-flex font-semibold text-olive">Privacy Policy</Link>
        </div>
      </div>
    </Container>
  );
}
