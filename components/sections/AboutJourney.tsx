"use client";

import { useEffect, useRef, useState } from "react";

type JourneyStep = {
  id: string;
  stepNum: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

const steps: JourneyStep[] = [
  {
    id: "source",
    stepNum: "01",
    tag: "SOURCE",
    title: "Source",
    description:
      "The product requirement begins with the required commodity, form, quantity and sourcing discussion.",
    image: "/images/nr-karnataka-sourcing.webp",
    alt: "Organized coconut harvesting and sourcing operations in Karnataka groves with collection crates and transport vehicle.",
  },
  {
    id: "check",
    stepNum: "02",
    tag: "CHECK",
    title: "Check",
    description:
      "Visible condition, maturity, product form and buyer expectations are aligned before quotation.",
    image: "/images/nr-quality-inspection.webp",
    alt: "Professional coconut quality-control facility with uniform-wearing team inspecting and sorting produce into NR crates.",
  },
  {
    id: "prepare",
    stepNum: "03",
    tag: "PACK",
    title: "Prepare",
    description:
      "Packing format and order requirements are discussed against product, quantity and destination.",
    image: "/images/nr-export-packing.webp",
    alt: "Export packing and staging operations with mesh-packed coconuts, jute sacks, pallets, and forklift loading export container.",
  },
  {
    id: "coordinate",
    stepNum: "04",
    tag: "MOVE",
    title: "Coordinate",
    description:
      "Accepted orders move into loading and dispatch coordination.",
    image: "/images/container-loading.jpg",
    alt: "Supervised container loading and transport preparation for export dispatch.",
  },
  {
    id: "export",
    stepNum: "05",
    tag: "EXPORT",
    title: "Export",
    description:
      "International requirements are coordinated through the relevant logistics and shipment process.",
    image: "/images/vessel-shipment.jpg",
    alt: "NR International Export container hoisted by port gantry crane onto cargo vessel for maritime export.",
  },
];

export function AboutJourney() {
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
        rootMargin: "-20% 0px -40% 0px",
        threshold: 0.15,
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
      {/* Desktop view: Left sticky image, right scrolling checkpoints */}
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
                    : "opacity-0 scale-[1.02] z-0 pointer-events-none"
                }`}
              >
                <img
                  src={step.image}
                  alt={step.alt}
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/10 to-transparent pointer-events-none" />

                {/* Top indicator tag */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="inline-flex items-center rounded-full bg-forest/90 px-3 py-1 text-xs font-semibold tracking-wider text-ivory uppercase backdrop-blur-md border border-white/15 shadow-sm">
                    Step {step.stepNum} · {step.tag}
                  </span>
                </div>

                {/* Bottom caption with step counter */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs font-medium text-white/90">
                  <span className="font-semibold text-white text-base">
                    {step.title}
                  </span>
                  <span className="font-mono text-xs bg-black/40 px-2.5 py-1 rounded-md border border-white/10">
                    {step.stepNum} of 0{steps.length}
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
            <p className="text-xs font-semibold text-muted font-mono">
              Step 0{activeStep + 1} of 0{steps.length} · {steps[activeStep].title}
            </p>
          </div>
        </div>

        {/* Narrative Scrolling Column (5 cols) */}
        <div className="lg:col-span-5 space-y-10 py-4">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              ref={(el) => {
                stepRefs.current[idx] = el;
              }}
              data-step-index={idx}
              className={`min-h-[38vh] flex flex-col justify-center rounded-xl p-6 transition-all duration-300 ${
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
                  {step.stepNum}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-olive font-mono">
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

      {/* Tablet / Mobile view: vertical card stack */}
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
              <div className="absolute top-3 left-3 bg-forest/90 backdrop-blur-sm text-ivory text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border border-white/20">
                Step {step.stepNum} · {step.tag}
              </div>
              <div className="absolute bottom-2.5 right-2.5 bg-black/60 text-white font-mono text-[10px] px-2 py-0.5 rounded-sm">
                0{idx + 1} / 0{steps.length}
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold font-mono text-ochre-ink">
              <span>Step {step.stepNum}</span>
              <span className="text-line">·</span>
              <span className="uppercase tracking-wider font-semibold text-olive font-mono">
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
