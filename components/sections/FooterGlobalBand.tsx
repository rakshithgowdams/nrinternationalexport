"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/primitives";

export function FooterGlobalBand() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return false;
    const isSaveData =
      typeof navigator !== "undefined" &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (navigator as any).connection?.saveData === true;
    return window.innerWidth >= 1024 && !isSaveData;
  });
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    // Check user preference for reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    // Only load video on desktop devices (width >= 1024px) without data-saver
    const handleResize = () => {
      const isConnectionSaveData =
        typeof navigator !== "undefined" &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (navigator as any).connection?.saveData === true;
      setIsDesktop(window.innerWidth >= 1024 && !isConnectionSaveData);
    };
    window.addEventListener("resize", handleResize);

    // Lazy-load video strictly when footer approaches viewport on desktop
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "150px 0px",
        threshold: 0.05,
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  // Autoplay without audio once video element attaches on desktop
  useEffect(() => {
    if (shouldLoadVideo && videoRef.current && !reducedMotion && isDesktop) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Graceful fallback to static poster if autoplay blocked
        });
      }
    }
  }, [shouldLoadVideo, reducedMotion, isDesktop]);

  return (
    <section
      ref={containerRef}
      aria-label="Global Trade Reach"
      className="relative min-h-[250px] sm:min-h-[270px] lg:min-h-[290px] w-full overflow-hidden bg-forest border-b border-white/10 flex items-center"
    >
      {/* Background Media Container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Always present high-resolution poster fallback (Used for all mobile devices & reduced-motion) */}
        <img
          src="/videos/export-map-footer-poster.webp"
          alt=""
          aria-hidden="true"
          width={1280}
          height={300}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-30 mix-blend-screen"
        />

        {/* Desktop-only viewport-deferred video with preload="none" */}
        {shouldLoadVideo && isDesktop && !reducedMotion && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            preload="none"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-40 mix-blend-screen transition-opacity duration-1000"
          >
            <source src="/videos/export-map-footer.webm" type="video/webm" />
            <source src="/videos/export-map-footer.mp4" type="video/mp4" />
          </video>
        )}

        {/* Directional deep-green brand gradient overlays to preserve NR palette & text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#20351f]/85 via-[#20351f]/60 to-[#20351f]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#20351f]/40 to-[#20351f]/90 pointer-events-none" />
      </div>

      {/* Foreground Content */}
      <Container className="relative z-10 py-6 sm:py-7 lg:py-8 text-center">
        <div className="mx-auto max-w-[720px]">
          <p className="text-xs font-bold tracking-[0.16em] text-[#f3bd6d] uppercase font-mono">
            GLOBAL EXPORT
          </p>

          <h2 className="mt-1.5 font-display text-2xl sm:text-3xl lg:text-[2.25rem] text-ivory font-medium leading-[1.18]">
            From Karnataka to global markets.
          </h2>

          <p className="mx-auto mt-2 sm:mt-2.5 max-w-xl text-xs sm:text-sm leading-relaxed text-ivory/85">
            Agricultural products are discussed around buyer requirements, quantity, packing, destination and export coordination.
          </p>

          <div className="mt-3.5 sm:mt-4 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
            <Link
              href="/global-exports"
              className="inline-flex min-h-10 sm:min-h-11 w-full sm:w-auto items-center justify-center rounded-md bg-white px-5 sm:px-6 text-sm font-semibold text-forest transition-colors hover:bg-ivory shadow-xs"
            >
              Explore Global Exports
            </Link>
            <Link
              href="/request-quote?market=global"
              className="inline-flex min-h-10 sm:min-h-11 w-full sm:w-auto items-center justify-center rounded-md border border-white/40 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
