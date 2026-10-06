import React from "react";

export function HeroHeading() {
  return (
    <h1 className="font-display text-[2.5rem] leading-[1.05] font-medium text-ivory sm:text-6xl lg:text-[5.1rem]">
      Rooted in Karnataka.
      <span className="mt-1 block italic text-[#f3bd6d]">Supplying Global Markets.</span>
    </h1>
  );
}

export function HeroPhoto({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {children}
    </div>
  );
}
