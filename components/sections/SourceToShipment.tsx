"use client";

import { useEffect, useRef, useState } from "react";

type StoryStep = {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

const steps: StoryStep[] = [
  {
    id: "source",
    tag: "01 SOURCE",
    title: "Karnataka sourcing",
    description:
      "Agricultural produce is sourced directly from established coconut plantations and growing belts across Channarayapatna and Tiptur in Karnataka.",
    image: "/images/nr-karnataka-sourcing.webp",
    alt: "Agricultural coconut sourcing operation in Karnataka with harvesting, organized crates, and logistics vehicle.",
  },
  {
    id: "check",
    tag: "02 CHECK",
    title: "Quality / visible condition",
    description:
      "Buyer requirements are discussed against product form, maturity, visible condition, packing and quantity before quotation and dispatch planning.",
    image: "/images/nr-quality-inspection.webp",
    alt: "Professional coconut quality-control facility with uniform-wearing team inspecting and sorting coconuts into green NR crates.",
  },
  {
    id: "prepare",
    tag: "03 PREPARE",
    title: "Packing / preparation",
    description:
      "Whole coconuts, copra, and commodities are packed in agreed formats—such as mesh bags, jute sacks, or custom packing—palletized and prepared for export dispatch.",
    image: "/images/nr-export-packing.webp",
    alt: "Export packing and preparation scene showing mesh-packed coconuts, jute sacks, pallets, and forklift loading export container.",
  },

  {
    id: "dispatch",
    tag: "04 DISPATCH",
    title: "Export movement",
    description:
      "Loaded containers move through dedicated inland highway transport to maritime port terminals for customs clearance and vessel shipment to international destinations.",
    image: "/images/vessel-shipment.jpg",
    alt: "NR International Export container being hoisted by port gantry crane onto cargo vessel for international ocean shipment.",
  },
];

export function SourceToShipment() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-step-index"));
            if (!Number.isNaN(index)) {
              setActiveStep(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-25% 0px -40% 0px",
        threshold: 0.1,
      },
    );

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToStep = (index: number) => {
    const target = stepRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="relative">
      {/* Desktop experience: sticky image viewport on left, scrolling narrative on right */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
        {/* Sticky Visual Column (7 cols) */}
        <div className="lg:col-span-7 lg:sticky lg:top-28">
          <div className="relative aspect-[16/10] xl:aspect-[16/9] w-full overflow-hidden rounded-2xl border border-line bg-forest/5 shadow-md">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  activeStep === idx
                    ? "opacity-100 scale-100 z-10"
                    : "opacity-0 scale-[1.03] z-0 pointer-events-none"
                }`}
              >
                <img
                  src={step.image}
                  alt={step.alt}
                  className="h-full w-full object-cover object-center"
                />
                {/* Subtle protective gradient overlay for bottom label */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent pointer-events-none" />

                {/* Top indicator tag */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="inline-flex items-center rounded-full bg-forest/85 px-3 py-1 text-xs font-semibold tracking-wider text-ivory uppercase backdrop-blur-md border border-white/15 shadow-sm">
                    {step.tag}
                  </span>
                </div>

                {/* Bottom caption with step counter */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs font-medium text-white/90">
                  <span className="font-semibold text-white text-sm">
                    {step.title}
                  </span>
                  <span className="font-mono text-xs bg-black/40 px-2.5 py-1 rounded-md border border-white/10">
                    Step 0{idx + 1} of 0{steps.length}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive step navigation bar underneath sticky visual */}
          <div className="mt-4 flex items-center justify-between rounded-lg border border-line bg-white px-4 py-2.5 shadow-xs">
            <div className="flex items-center gap-1.5">
              {steps.map((step, idx) => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => scrollToStep(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeStep === idx
                      ? "w-8 bg-olive"
                      : "w-2 bg-line hover:bg-olive/40"
                  }`}
                  aria-label={`Jump to step ${idx + 1}: ${step.title}`}
                />
              ))}
            </div>
            <p className="text-xs font-semibold text-muted">
              Source to Shipment · Step 0{activeStep + 1} of 0{steps.length}
            </p>
          </div>
        </div>

        {/* Narrative Scrolling Column (5 cols) */}
        <div className="lg:col-span-5 space-y-12 py-8">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              ref={(el) => {
                stepRefs.current[idx] = el;
              }}
              data-step-index={idx}
              className={`min-h-[48vh] flex flex-col justify-center rounded-xl p-6 transition-all duration-300 ${
                activeStep === idx
                  ? "bg-white border border-line shadow-sm opacity-100"
                  : "bg-transparent border border-transparent opacity-40 hover:opacity-75"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex size-7 items-center justify-center rounded-full text-xs font-bold font-mono transition-colors duration-200 ${
                    activeStep === idx
                      ? "bg-olive text-white shadow-xs"
                      : "border border-line text-muted"
                  }`}
                >
                  0{idx + 1}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-olive">
                  {step.tag}
                </span>
              </div>
              <h3 className="mt-3 font-display text-2xl xl:text-3xl font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-sm xl:text-base leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile / Tablet experience: stacked vertical cards */}
      <div className="lg:hidden space-y-6">
        {steps.map((step, idx) => (
          <article
            key={step.id}
            className="rounded-xl border border-line bg-white p-5 shadow-xs overflow-hidden"
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-lg border border-line mb-4 bg-forest/5">
              <img
                src={step.image}
                alt={step.alt}
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-forest/85 backdrop-blur-sm text-ivory text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border border-white/20">
                {step.tag}
              </div>
              <div className="absolute bottom-2.5 right-2.5 bg-black/60 text-white font-mono text-[10px] px-2 py-0.5 rounded-sm">
                0{idx + 1} / 0{steps.length}
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold font-mono text-ochre-ink">
              <span>Step 0{idx + 1}</span>
              <span className="text-line">·</span>
              <span className="uppercase tracking-wider font-semibold text-olive">
                {step.tag}
              </span>
            </div>
            <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
