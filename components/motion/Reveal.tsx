"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

function reduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HeroHeading() {
  const ref = useRef<HTMLHeadingElement>(null);
  useGSAP(() => {
    if (reduced() || !ref.current) return;
    const split = new SplitText(ref.current, { type: "lines" });
    const tween = gsap.from(split.lines, {
      y: 22,
      opacity: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: "power2.out",
    });
    return () => {
      tween.kill();
      split.revert();
    };
  }, { scope: ref });

  return (
    <h1
      ref={ref}
      className="font-display text-[2.5rem] leading-[1.05] font-medium text-ivory sm:text-6xl lg:text-[5.1rem]"
    >
      Rooted in Karnataka.
      <span className="mt-1 block italic text-[#f3bd6d]">Supplying Global Markets.</span>
    </h1>
  );
}

export function HeroPhoto({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (reduced() || !ref.current) return;
    gsap.fromTo(ref.current, { scale: 1.03 }, { scale: 1, duration: 1, ease: "power2.out" });
  }, { scope: ref });
  return (
    <div ref={ref} className="absolute inset-0">
      {children}
    </div>
  );
}
