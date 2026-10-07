import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { business } from "@/data/business";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: { absolute: "Our Policy | NR International Export" },
  description:
    "Returns, cancellations, refunds and exchange policy for NR International Export agricultural supply and trade enquiries.",
  path: "/our-policy",
});

export default function OurPolicyPage() {
  return (
    <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
      <article className="mx-auto max-w-[800px]">
        {/* =========================================================================
            01 — PAGE HERO (COMPACT & EDITORIAL)
            ========================================================================= */}
        <header data-reveal className="pb-8 md:pb-12 border-b border-line">
          <p className="text-xs font-bold tracking-[0.14em] text-ochre-ink uppercase font-mono">
            OUR POLICY
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl text-ink font-medium leading-[1.1] tracking-tight">
            Returns, refunds, cancellations
            <br className="hidden sm:inline" /> and exchange policy.
          </h1>
          <p className="mt-5 text-[17px] md:text-[18px] leading-relaxed text-muted">
            This policy explains how NR International Export handles returns, cancellations, exchanges and approved refund requests for agricultural goods.
          </p>
        </header>

        {/* =========================================================================
            POLICY SECTIONS
            ========================================================================= */}
        <div className="mt-10 md:mt-12 space-y-12 md:space-y-14">
          {/* SECTION 01 — RETURNS & EXCHANGES */}
          <section data-reveal id="returns-and-exchanges" className="scroll-mt-28">
            <h2 className="font-display text-2xl sm:text-3xl text-ink font-medium">
              01. Returns &amp; Exchanges
            </h2>
            <div className="mt-4 pt-4 border-t border-line">
              <p className="text-[17px] md:text-[18px] leading-relaxed text-muted">
                Any cancellations, returns or exchanges are governed by this policy. Once goods have been inwarded / accepted by the buyer, NR International Export does not generally accept returns or exchanges.
              </p>
            </div>
          </section>

          {/* SECTION 02 — CANCELLATIONS */}
          <section data-reveal id="cancellations" className="scroll-mt-28">
            <h2 className="font-display text-2xl sm:text-3xl text-ink font-medium">
              02. Cancellations
            </h2>
            <div className="mt-4 pt-4 border-t border-line">
              <p className="text-[17px] md:text-[18px] leading-relaxed text-muted">
                An order once placed is generally not cancellable, particularly where procurement, packing or dispatch preparation has commenced. Customers may contact NR International Export regarding a cancellation request; acceptance of such a request remains at the company’s discretion.
              </p>
            </div>
          </section>

          {/* SECTION 03 — REFUNDS & EVIDENCE */}
          <section data-reveal id="refunds" className="scroll-mt-28">
            <h2 className="font-display text-2xl sm:text-3xl text-ink font-medium">
              03. Refunds
            </h2>
            <div className="mt-4 pt-4 border-t border-line space-y-5">
              <p className="text-[17px] md:text-[18px] leading-relaxed text-muted">
                If a perishable product arrives spoiled, damaged or in an unacceptable condition, the buyer may contact NR International Export and submit appropriate proof. Where the refund request is reviewed and approved, the refund will be processed to the original payment method or bank account within 15 days.
              </p>

              {/* Supporting evidence note */}
              <div className="rounded-md border-l-2 border-ochre bg-white/70 px-4 py-3.5 text-sm sm:text-base text-muted">
                <p className="leading-relaxed">
                  <strong className="font-semibold text-ink">Proof / supporting evidence note:</strong>{" "}
                  For damaged or spoiled perishable goods, supporting photographs, delivery details and other relevant proof may be requested before review.
                </p>
              </div>
            </div>
          </section>

          {/* =========================================================================
              NEED ASSISTANCE / CONTACT SECTION
              ========================================================================= */}
          <section
            data-reveal
            id="assistance"
            className="rounded-xl border border-line bg-white p-6 sm:p-8 shadow-xs"
          >
            <h2 className="font-display text-2xl sm:text-3xl text-ink font-medium">
              Need assistance?
            </h2>
            <p className="mt-2 text-[17px] leading-relaxed text-muted">
              For cancellation, refund or policy-related assistance, contact NR International Export.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <a
                href={`mailto:${business.email}`}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-olive px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>Email Us</span>
              </a>
              <a
                href={`tel:${business.phoneTel}`}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ivory hover:border-olive"
              >
                <Phone className="h-4 w-4 text-olive" aria-hidden="true" />
                <span>Call Us</span>
              </a>
            </div>

            <div className="mt-6 border-t border-line pt-4 text-xs sm:text-sm text-muted space-y-1">
              <p>
                <span className="font-medium text-ink">Email:</span>{" "}
                <a
                  href={`mailto:${business.email}`}
                  className="text-olive hover:underline font-mono"
                >
                  {business.email}
                </a>
              </p>
              <p>
                <span className="font-medium text-ink">Phone:</span>{" "}
                <a
                  href={`tel:${business.phoneTel}`}
                  className="text-olive hover:underline font-mono"
                >
                  {business.phoneDisplay}
                </a>
              </p>
            </div>
          </section>

          {/* =========================================================================
              IMPORTANT TRADE CONTEXT (COMPACT DISCLAIMER)
              ========================================================================= */}
          <aside
            data-reveal
            className="border-t border-line pt-6 text-xs sm:text-sm leading-relaxed text-muted"
          >
            <p>
              Product condition, quantity, packing, transport and destination requirements are discussed as part of the quotation and order process. Any approved cancellation, return or refund request is subject to the applicable order circumstances and supporting evidence.
            </p>
          </aside>

          {/* =========================================================================
              SECONDARY LEGAL & ATTRIBUTION LINKS
              ========================================================================= */}
          <footer
            data-reveal
            className="border-t border-line pt-6 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-muted"
          >
            <div className="flex flex-wrap items-center gap-5">
              <Link
                href="/privacy-policy"
                className="font-medium text-olive hover:underline"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="font-medium text-olive hover:underline"
              >
                Terms and Conditions
              </Link>
            </div>
            <Link
              href="/image-credits"
              className="text-muted/80 hover:text-ink hover:underline transition-colors text-xs"
            >
              Image Attributions &nearr;
            </Link>
          </footer>
        </div>
      </article>
    </Container>
  );
}
