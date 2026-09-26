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
          small: "(max-width: 767px)",
          wide: "(min-width: 1024px)",
        },
        (context) => {
          const { motion, small, wide } = context.conditions as Record<string, boolean>;
          if (!motion) return;
          const distance = small ? 12 : 20;

          (q("[data-reveal]") as HTMLElement[]).forEach((el) => {
            gsap.from(el, {
              y: distance,
              autoAlpha: 0,
              duration: 0.55,
              ease: "power2.out",
              clearProps: settled,
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            });
          });

          (q("[data-stagger]") as HTMLElement[]).forEach((group) => {
            const items = Array.from(group.children);
            if (items.length === 0) return;
            gsap.from(items, {
              y: distance,
              autoAlpha: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: "power2.out",
              clearProps: settled,
              scrollTrigger: { trigger: group, start: "top 88%", once: true },
            });
          });

          (q("[data-image-reveal]") as HTMLElement[]).forEach((el) => {
            const img = el.tagName === "IMG" ? el : el.querySelector("img");
            const tl = gsap.timeline({
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            });
            if (small) {
              tl.from(el, { autoAlpha: 0, duration: 0.6, ease: "power1.out", clearProps: "opacity,visibility" });
              return;
            }
            tl.from(el, {
              clipPath: "inset(10% 6% 10% 6% round 8px)",
              autoAlpha: 0,
              duration: 0.8,
              ease: "power3.out",
              clearProps: "clipPath,opacity,visibility",
            });
            if (img) tl.from(img, { scale: 1.06, duration: 1, ease: "power2.out", clearProps: "transform" }, 0);
          });

          if (wide) {
            (q("[data-process]") as HTMLElement[]).forEach((container) => {
              container.classList.add("process-ready");
              const line = container.querySelector("[data-process-line]");
              if (line) {
                gsap.fromTo(
                  line,
                  { scaleY: 0 },
                  {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: { trigger: container, start: "top 70%", end: "bottom 70%", scrub: 0.4 },
                  },
                );
              }
              container.querySelectorAll<HTMLElement>("[data-step]").forEach((step) => {
                ScrollTrigger.create({
                  trigger: step,
                  start: "top 70%",
                  onEnter: () => step.classList.add("is-active"),
                  onLeaveBack: () => step.classList.remove("is-active"),
                });
              });
            });
          }

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
