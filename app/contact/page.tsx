import { Suspense } from "react";
import { ContactForm } from "@/components/enquiry/ContactForm";
import { FaqList } from "@/components/sections/FaqList";
import { Container } from "@/components/ui/primitives";
import { business } from "@/data/business";
import { pageMetadata } from "@/lib/site";
import { CopyAddress } from "@/components/enquiry/CopyAddress";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact NR International Export about coconuts, copra and agricultural supply.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="py-12 md:py-16">
      <div data-reveal>
        <p className="text-xs font-bold tracking-[0.12em] text-ochre-ink uppercase">Contact</p>
        <h1 className="mt-2 max-w-3xl font-display text-4xl md:text-6xl">Let us understand your requirement.</h1>
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div data-reveal className="space-y-4 rounded-lg border border-line bg-white p-6">
          <p className="font-display text-3xl">{business.contactName}</p>
          <p className="text-muted">{business.contactRole}</p>
          <p><a className="font-semibold" href={`tel:${business.phoneTel}`}>{business.phoneDisplay}</a></p>
          <p><a className="font-semibold" href={`mailto:${business.email}`}>{business.email}</a></p>
          <p><a className="text-sm font-semibold text-muted" href={`mailto:${business.inboxEmail}`}>{business.inboxEmail}</a></p>
          <address className="text-sm leading-6 not-italic">{business.address}</address>
          <CopyAddress />
          <p className="text-sm">GSTIN {business.gstin}</p>
          <a className="inline-flex text-sm font-semibold text-olive" href={business.mapsSearch} target="_blank" rel="noreferrer">
            Search this address for directions
          </a>
          <p className="text-xs text-muted">A map pin is not shown because coordinates were not separately verified.</p>
        </div>
        <Suspense fallback={<p>Loading form…</p>}>
          <ContactForm />
        </Suspense>
      </div>
      <section className="mt-14 max-w-3xl">
        <h2 data-reveal className="font-display text-3xl">How to send specifications</h2>
        <div className="mt-4">
          <FaqList
            items={[
              {
                q: "Where should I put grades and quantities?",
                a: "Use the quotation form when you have products and quantities. Use this contact form for a shorter question.",
              },
              {
                q: "What if the form cannot send email?",
                a: "The page will say so and offer your email programme. Opening that programme is not the same as a submitted request.",
              },
            ]}
          />
        </div>
        <a href="/request-quote" className="mt-4 inline-flex font-semibold text-olive">Go to the quotation form</a>
      </section>
    </Container>
  );
}
