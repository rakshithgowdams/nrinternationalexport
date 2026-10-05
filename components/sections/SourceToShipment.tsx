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
    id: "sourcing",
    tag: "Origin & Sourcing",
    title: "Sourcing from Karnataka",
    description:
      "Products are sourced from the Channarayapatna and Tiptur region according to buyer requirement, season, and product form.",
    image: "/images/sourcing-karnataka.jpg",
    alt: "Lush coconut sourcing groves in the Channarayapatna and Tiptur region of Karnataka at morning golden hour.",
  },
  {
    id: "handling",
    tag: "Handling & Grading",
    title: "Thoughtful handling",
    description:
      "Requirements are discussed carefully so the correct form, maturity, visible condition, and buyer expectation are aligned before dispatch.",
    image: "/images/operations-handling.jpg",
    alt: "NR International Export operational area with team handling and de-husking coconuts under strict quality standards.",
  },
  {
    id: "loading",
    tag: "Container Loading",
    title: "Prepared for dispatch",
    description:
      "Once product and quantity are agreed, handling and loading are organized for smooth bulk movement.",
    image: "/images/container-loading.jpg",
    alt: "Workers loading coconuts in export net sacks into an NR International Export heavy shipping container.",
  },
  {
    id: "transit",
    tag: "Inland Transport",
    title: "Inland movement",
    description:
      "Road transport supports movement from sourcing/handling points into the broader export chain.",
    image: "/images/inland-transit.jpg",
    alt: "Branded NR International Export container truck moving in inland transit on the highway towards maritime port.",
  },
  {
    id: "port",
    tag: "Port Logistics",
    title: "Export logistics coordination",
    description:
      "Shipments move through coordinated port-side logistics and commercial preparation.",
    image: "/images/port-logistics.jpg",
    alt: "NR International Export container truck parked at maritime container port terminal beside quay cranes and vessels.",
  },
  {
    id: "shipment",
    tag: "Vessel Shipment",
    title: "Ready for international supply",
    description:
      "After quotation acceptance and dispatch planning, the shipment proceeds through the export route toward the buyer’s destination.",
    image: "/images/vessel-shipment.jpg",
    alt: "NR International Export container being hoisted by port gantry crane onto cargo vessel for international export.",
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
