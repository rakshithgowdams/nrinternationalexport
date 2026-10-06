"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function MotionScope({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll<HTMLElement>("[data-reveal], [data-image-reveal]").forEach((el) => {
        el.classList.add("is-revealed");
      });
      root.querySelectorAll<HTMLElement>("[data-stagger] > *").forEach((el) => {
        el.classList.add("is-revealed");
      });
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

    const observeElement = (el: HTMLElement) => {
      if (el.classList.contains("is-revealed")) return;
      const rect = el.getBoundingClientRect();
      // If already visible in the viewport (e.g. above-the-fold content on route navigation), reveal immediately
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("is-revealed");
      } else {
        observer.observe(el);
      }
    };

    const scanAndObserve = (target: HTMLElement) => {
      // 1. Observe [data-reveal] and [data-image-reveal]
      if (target.matches("[data-reveal], [data-image-reveal]")) {
        observeElement(target);
      }
      target.querySelectorAll<HTMLElement>("[data-reveal], [data-image-reveal]").forEach((el) => {
        observeElement(el);
      });

      // 2. Observe [data-stagger] children with staggered transition-delay
      const staggerGroups: HTMLElement[] = [];
      if (target.matches("[data-stagger]")) {
        staggerGroups.push(target);
      }
      target.querySelectorAll<HTMLElement>("[data-stagger]").forEach((el) => {
        staggerGroups.push(el);
      });

      staggerGroups.forEach((group) => {
        const items = Array.from(group.children) as HTMLElement[];
        items.forEach((item, index) => {
          item.style.transitionDelay = `${index * 60}ms`;
          observeElement(item);
        });
      });
    };

    // Initial scan for the newly navigated page
    scanAndObserve(root);

    // MutationObserver to automatically catch newly mounted elements on client route navigation
    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              scanAndObserve(node);
            }
          });
        }
      }
    });

    mutationObserver.observe(root, { childList: true, subtree: true });

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

      const processObserver = new IntersectionObserver(
        (entries) => {
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
        },
        { rootMargin: "100px 0px" }
      );

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
      mutationObserver.disconnect();
      cleanupListeners.forEach((cleanup) => cleanup());
    };
  }, [pathname]);

  return <div ref={scope}>{children}</div>;
}
