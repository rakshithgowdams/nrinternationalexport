"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const settled = "transform,opacity,visibility";

export function MotionScope({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 767px)",
          tablet: "(min-width: 768px) and (max-width: 1023px)",
        },
        (context) => {
          const { motion, mobile, tablet } = context.conditions as Record<string, boolean>;
          if (!motion) return;
          const distance = mobile ? 14 : tablet ? 18 : 22;
          const start = mobile ? "top 94%" : "top 90%";

          (q("[data-reveal]") as HTMLElement[]).forEach((el) => {
            gsap.from(el, {
              y: distance,
              autoAlpha: 0,
              duration: mobile ? 0.5 : 0.55,
              ease: "power2.out",
              clearProps: settled,
              scrollTrigger: { trigger: el, start, once: true },
            });
          });

          (q("[data-stagger]") as HTMLElement[]).forEach((group) => {
            const items = Array.from(group.children) as HTMLElement[];
            if (items.length === 0) return;
            gsap.set(items, { y: distance, autoAlpha: 0 });
            ScrollTrigger.batch(items, {
              start,
              once: true,
              interval: 0.1,
              onEnter: (batch) =>
                gsap.to(batch, {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.5,
                  stagger: mobile ? 0.06 : 0.08,
                  ease: "power2.out",
                  overwrite: true,
                  clearProps: settled,
                }),
            });
          });

          (q("[data-image-reveal]") as HTMLElement[]).forEach((el) => {
            const img = el.tagName === "IMG" ? el : el.querySelector("img");
            const tl = gsap.timeline({
              scrollTrigger: { trigger: el, start: mobile ? "top 92%" : "top 85%", once: true },
            });
            tl.from(el, {
              clipPath: mobile ? "inset(14% 0% 0% 0% round 8px)" : "inset(10% 6% 10% 6% round 8px)",
              autoAlpha: 0,
              duration: mobile ? 0.65 : 0.8,
              ease: "power3.out",
              clearProps: "clipPath,opacity,visibility",
            });
            if (img) {
              tl.from(img, { scale: mobile ? 1.04 : 1.06, duration: 1, ease: "power2.out", clearProps: "transform" }, 0);
            }
          });

          (q("[data-process]") as HTMLElement[]).forEach((container) => {
            container.classList.add("process-ready");
            const line = container.querySelector("[data-process-line]");
            const edge = mobile ? "80%" : "70%";
            if (line) {
              gsap.fromTo(
                line,
                { scaleY: 0 },
                {
                  scaleY: 1,
                  ease: "none",
                  scrollTrigger: { trigger: container, start: `top ${edge}`, end: `bottom ${edge}`, scrub: 0.4 },
                },
              );
            }
            container.querySelectorAll<HTMLElement>("[data-step]").forEach((step) => {
              ScrollTrigger.create({
                trigger: step,
                start: `top ${edge}`,
                onEnter: () => step.classList.add("is-active"),
                onLeaveBack: () => step.classList.remove("is-active"),
              });
            });
          });

          return () => {
            (q("[data-process]") as HTMLElement[]).forEach((container) => {
              container.classList.remove("process-ready");
              container.querySelectorAll("[data-step]").forEach((step) => step.classList.remove("is-active"));
            });
          };
        },
      );

      let frame = 0;
      const refresh = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => ScrollTrigger.refresh());
      };
      const images = q("img") as HTMLImageElement[];
      images.forEach((img) => {
        if (!img.complete) img.addEventListener("load", refresh, { once: true });
      });
      document.fonts?.ready.then(refresh);

      return () => {
        cancelAnimationFrame(frame);
        images.forEach((img) => img.removeEventListener("load", refresh));
        mm.revert();
      };
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
