"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ZoomIn, CheckCircle2 } from "lucide-react";
import { certifications } from "@/data/business";
import { Container } from "@/components/ui/primitives";

type CertificationItem = (typeof certifications)[number];

export function TradeCertifications() {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  return (
    <section className="bg-ivory/30 py-16 md:py-20 border-b border-line">
      <Container>
        <div data-reveal className="max-w-3xl mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-olive font-mono">
            TRADE REGISTRATIONS
          </p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink">
            Registered for business and export trade.
          </h2>
          <p className="mt-3 text-sm text-muted">
            Official Indian government and export promotion council registrations verified for commercial and foreign trade. Hover or tap any certificate to view details.
          </p>
        </div>

        <div data-stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {certifications.map((cert) => (
            <div key={cert.id} className="relative group">
              {/* Card Button */}
              <button
                type="button"
                onClick={() => setSelectedCert(cert)}
                className="relative flex h-full w-full flex-col items-center justify-between rounded-xl border border-line bg-white p-5 text-center shadow-xs transition-all duration-200 hover:border-forest/60 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-forest cursor-pointer"
                aria-label={`View ${cert.name} certificate`}
              >
                {/* Mobile Tap Indicator / Desktop Zoom Icon */}
                <span className="absolute top-2.5 right-2.5 inline-flex size-6 items-center justify-center rounded-full bg-ivory text-muted group-hover:bg-forest group-hover:text-white transition-colors">
                  <ZoomIn className="size-3.5" />
                </span>

                <div className="relative mb-3 flex size-16 items-center justify-center overflow-hidden rounded-lg bg-ivory/60 p-2.5 border border-line/50 transition-transform duration-200 group-hover:scale-105">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    width={64}
                    height={64}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="w-full">
                  <h3 className="text-xs font-bold text-ink leading-snug group-hover:text-forest transition-colors">
                    {cert.name}
                  </h3>
                  <p className="mt-1 text-[11px] text-[#3e4839] line-clamp-2">
                    {cert.issuer}
                  </p>
                </div>

                <div className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold text-olive uppercase tracking-wider">
                  <span className="group-hover:underline">View Certificate</span>
                </div>
              </button>

              {/* Desktop Hover Floating Preview Card */}
              <div
                role="tooltip"
                className="pointer-events-none absolute bottom-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-64 rounded-xl border border-line bg-white p-3.5 shadow-2xl z-40 transition-all duration-200 opacity-0 scale-95 translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 hidden lg:block"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-ivory/50 p-3 border border-line/60 flex items-center justify-center">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="max-h-full max-w-full object-contain drop-shadow-xs"
                  />
                </div>
                <div className="mt-2.5 text-center">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-forest uppercase tracking-wider font-mono">
                    <CheckCircle2 className="size-3 text-olive" />
                    Verified Registration
                  </span>
                  <p className="mt-0.5 text-xs font-bold text-ink leading-snug">{cert.name}</p>
                  <p className="mt-0.5 text-[10px] text-muted line-clamp-1">{cert.issuer}</p>
                  <span className="mt-2 block text-[10px] font-medium text-olive font-mono bg-ivory py-1 px-2 rounded-md border border-line/50">
                    Click card to enlarge
                  </span>
                </div>
                {/* Downward triangle arrow */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 size-3 rotate-45 border-r border-b border-line bg-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Full Certificate Lightbox Modal (Click on Desktop & Tap on Mobile) */}
        <Dialog.Root
          open={!!selectedCert}
          onOpenChange={(open) => !open && setSelectedCert(null)}
        >
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-forest/80 backdrop-blur-xs transition-opacity animate-in fade-in duration-200" />
            <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-line bg-white p-5 sm:p-6 shadow-2xl transition-all animate-in zoom-in-95 fade-in duration-200 focus:outline-none">
              <div className="flex items-start justify-between gap-4 border-b border-line pb-4">
                <div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-ochre-ink font-mono">
                    <CheckCircle2 className="size-3 text-olive" />
                    Verified Trade Certificate
                  </span>
                  <Dialog.Title className="mt-1 font-display text-xl sm:text-2xl font-semibold text-ink">
                    {selectedCert?.name}
                  </Dialog.Title>
                  <Dialog.Description className="mt-1 text-xs text-muted leading-relaxed">
                    {selectedCert?.issuer}
                  </Dialog.Description>
                </div>
                <Dialog.Close
                  className="inline-flex size-9 sm:size-10 items-center justify-center rounded-lg border border-line text-muted hover:bg-ivory hover:text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-forest"
                  aria-label="Close certificate preview"
                >
                  <X className="size-5" />
                </Dialog.Close>
              </div>

              {/* Large Certificate Graphic Preview */}
              <div className="relative mt-5 flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-ivory/50 p-6 sm:p-8 border border-line/70 shadow-inner">
                {selectedCert && (
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.name}
                    width={400}
                    height={400}
                    decoding="async"
                    className="max-h-full max-w-full object-contain drop-shadow-md"
                  />
                )}
              </div>

              {/* Footer details */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-line/60">
                <span className="font-mono text-[11px] text-muted">
                  NR International Export · Hassan, Karnataka
                </span>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="inline-flex min-h-9 items-center justify-center rounded-md bg-forest px-4 text-xs font-semibold text-white transition-colors hover:bg-olive"
                  >
                    Close Preview
                  </button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </Container>
    </section>
  );
}
