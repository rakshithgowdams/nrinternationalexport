"use client";

import { useEffect, useRef } from "react";

export function MotionScope({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.05 }
    );

    // 1. Observe [data-reveal] and [data-image-reveal]
    root.querySelectorAll<HTMLElement>("[data-reveal], [data-image-reveal]").forEach((el) => {
      observer.observe(el);
    });

    // 2. Observe [data-stagger] children with staggered transition-delay
    root.querySelectorAll<HTMLElement>("[data-stagger]").forEach((group) => {
      const items = Array.from(group.children) as HTMLElement[];
      items.forEach((item, index) => {
        item.style.transitionDelay = `${index * 60}ms`;
        observer.observe(item);
      });
    });

    // 4. Process timeline scroll interaction
    const cleanupListeners: Array<() => void> = [];

    root.querySelectorAll<HTMLElement>("[data-process]").forEach((container) => {
      let isListening = false;
      const line = container.querySelector<HTMLElement>("[data-process-line]");
      const steps = Array.from(container.querySelectorAll<HTMLElement>("[data-step]"));

      let ticking = false;
      const updateProcess = () => {
        ticking = false;
        const rect = container.getBoundingClientRect();
        const winH = window.innerHeight;
        const startTrigger = winH * 0.8;
        const endTrigger = winH * 0.25;

        const totalHeight = rect.height;
        const currentY = startTrigger - rect.top;
        const rawProgress = currentY / (totalHeight + (startTrigger - endTrigger));
        const progress = Math.min(Math.max(rawProgress, 0), 1);

        if (line) {
          line.style.transform = `scaleY(${progress})`;
        }

        steps.forEach((step) => {
          const stepRect = step.getBoundingClientRect();
          if (stepRect.top < startTrigger) {
            step.classList.add("is-active");
          } else {
            step.classList.remove("is-active");
          }
        });
      };

      const onScroll = () => {
        if (!ticking) {
          requestAnimationFrame(updateProcess);
          ticking = true;
        }
      };

      const processObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            container.classList.add("process-ready");
            if (!isListening) {
              window.addEventListener("scroll", onScroll, { passive: true });
              isListening = true;
            }
            updateProcess();
          } else {
            if (isListening) {
              window.removeEventListener("scroll", onScroll);
              isListening = false;
            }
          }
        });
      }, { rootMargin: "100px 0px" });

      processObserver.observe(container);

      cleanupListeners.push(() => {
        processObserver.disconnect();
        if (isListening) {
          window.removeEventListener("scroll", onScroll);
        }
        container.classList.remove("process-ready");
        steps.forEach((s) => s.classList.remove("is-active"));
      });
    });

    return () => {
      observer.disconnect();
      cleanupListeners.forEach((cleanup) => cleanup());
    };
  }, []);

  return <div ref={scope}>{children}</div>;
}
