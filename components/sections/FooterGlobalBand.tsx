"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/primitives";

export function FooterGlobalBand() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setReducedMotion(true);
      return;
    }

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    // Screen size detection for mobile optimization
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);

    // Lazy-load video only when approaching viewport (300px rootMargin)
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
        rootMargin: "300px 0px",
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

  // Ensure autoplay starts without sound errors once video element attaches
  useEffect(() => {
    if (shouldLoadVideo && videoRef.current && !reducedMotion) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback gracefully to poster if browser policy blocks autoplay
        });
      }
    }
  }, [shouldLoadVideo, reducedMotion]);

  return (
    <section
      ref={containerRef}
      aria-label="Global Trade Reach"
      className="relative min-h-[280px] sm:min-h-[320px] md:min-h-[360px] lg:min-h-[380px] w-full overflow-hidden bg-forest border-b border-white/10 flex items-center"
    >
      {/* Background Media Container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Always present high-resolution poster fallback */}
        <img
          src="/videos/export-map-footer-poster.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-30 mix-blend-screen"
        />

        {/* Lazy-loaded seamless looping route animation */}
        {shouldLoadVideo && !reducedMotion && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-40 mix-blend-screen transition-opacity duration-1000"
          >
            {!isMobile && (
              <source
                src="/videos/export-map-footer.webm"
                type="video/webm"
              />
            )}
            <source
              src={
                isMobile
                  ? "/videos/export-map-footer-mobile.mp4"
                  : "/videos/export-map-footer.mp4"
              }
              type="video/mp4"
            />
          </video>
        )}

        {/* Directional deep-green brand gradient overlays to preserve NR palette & text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#20351f]/85 via-[#20351f]/60 to-[#20351f]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#20351f]/40 to-[#20351f]/90 pointer-events-none" />
      </div>

      {/* Foreground Content */}
      <Container className="relative z-10 py-8 sm:py-10 md:py-14 text-center">
        <div className="mx-auto max-w-[720px] space-y-3 sm:space-y-3.5">
          <p className="text-xs font-bold tracking-[0.16em] text-[#f3bd6d] uppercase font-mono">
            GLOBAL EXPORT
          </p>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-ivory font-medium leading-[1.15]">
            From Karnataka to global markets.
          </h2>

          <p className="mx-auto max-w-xl text-xs sm:text-sm md:text-base leading-relaxed text-ivory/85">
            Agricultural products are discussed around buyer requirements, quantity, packing, destination and export coordination.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 sm:pt-3">
            <Link
              href="/global-exports"
              className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center rounded-md bg-white px-6 text-sm font-semibold text-forest transition-colors hover:bg-ivory shadow-xs"
            >
              Explore Global Exports
            </Link>
            <Link
              href="/request-quote?market=global"
              className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center rounded-md border border-white/40 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
