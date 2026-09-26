import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import { Container } from "@/components/ui/primitives";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "Draft privacy notice for enquiries sent through the NR International Export website.",
  path: "/privacy-policy",
  index: false,
});

const sections = [
  ["operator", "Who operates this site", "NR International Export, a partnership, operates this website. The contact email is nrinternationalexport@gmail.com. The registered address is No. 31, Thotada Mane, Begur Road, near Bagur Sub Post Office, Chennarayanapatna, Bagur, Hassan, Karnataka - 573111, India."],
  ["data", "Data you submit", "The contact and quotation forms ask for your name, company, email, phone, enquiry type or product lines, delivery details and message. A product list may be stored in your browser so it survives navigation. That local list is not meant to contain your contact details."],
  ["purpose", "Why it is used", "The information is used to understand and reply to a trade enquiry. It is not used for a separate marketing list on this website."],
  ["delivery", "How it is sent", "If a mail service is configured on the server, the form asks that service to send the enquiry to nrinternationalexport@gmail.com, with your email as the reply address. If no mail service is configured, the site says so and does not claim the message was sent. This website does not keep its own database of enquiries."],
  ["retention", "Retention", "A retention period has not been set in this draft. Messages are not stored by the website itself. If an email is accepted by a mail service, retention follows that mailbox. The browser copy of the product list stays until you clear it or clear site data."],
  ["security", "Security", "Mail credentials, if any, stay on the server. They are not placed in the public website code. Use a current browser. This draft does not claim a security certification."],
  ["cookies", "Cookies and analytics", "This website does not add analytics or advertising cookies. Essential browser storage is limited to the product enquiry list on your device. No cookie banner is shown because no optional cookies are set by the site."],
  ["requests", "Your requests", "To ask about an enquiry you sent, email nrinternationalexport@gmail.com. This draft does not appoint a data protection officer."],
  ["updates", "Updates", "This notice is a draft dated 26 September 2026. It should be reviewed before the site is treated as a public launch. It is not legal advice."],
];

export default function PrivacyPage() {
  return (
    <Container className="py-12 md:py-16">
      <div data-reveal>
        <p className="text-xs font-bold tracking-[0.08em] text-ochre-ink uppercase">Draft · 26 September 2026</p>
        <h1 className="mt-2 font-display text-4xl md:text-6xl">Privacy Policy</h1>
        <p className="mt-4 max-w-2xl text-muted">This notice matches the forms as built. It is not an approved legal policy.</p>
      </div>
      <div className="mt-8 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav aria-label="Contents" className="lg:sticky lg:top-28 lg:self-start">
          <ul className="space-y-2 text-sm">
            {sections.map(([id, title]) => (
              <li key={id}><a className="hover:text-olive" href={`#${id}`}>{title}</a></li>
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
          <p>Questions: <a className="font-semibold" href="mailto:nrinternationalexport@gmail.com">nrinternationalexport@gmail.com</a></p>
          <Link href="/terms-and-conditions" className="inline-flex font-semibold text-olive">Terms and Conditions</Link>
        </div>
      </div>
    </Container>
  );
}
