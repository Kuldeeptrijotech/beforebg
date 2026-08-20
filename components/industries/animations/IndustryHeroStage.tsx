"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

export interface HeroKpi {
  value: string;
  label: string;
  color: string;
}

export interface IndustryHeroStageProps {
  videoSrc?: string;
  poster?: string;
  objectPosition?: string;
  caption: string;
  sub: string;
  kpis: HeroKpi[];
  accentColor?: string;
  children: ReactNode;
}

export default function IndustryHeroStage({
  videoSrc,
  poster,
  objectPosition = "50% 50%",
  caption,
  sub,
  kpis,
  accentColor = "#29ab87",
  children,
}: IndustryHeroStageProps) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduce || !videoSrc) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, videoSrc]);

  return (
    <div className="relative isolate h-full min-h-full w-full overflow-hidden bg-[#030713]">
      {/* ── Background Video Layer (Optional / Subtle Blend) ── */}
      {videoSrc && (
        <div aria-hidden className="absolute inset-0 z-0 overflow-hidden opacity-35 mix-blend-screen pointer-events-none">
          <video
            ref={videoRef}
            autoPlay={!reduce}
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            className="h-full w-full object-cover scale-[1.5] sm:scale-100"
            style={{ objectPosition }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,7,19,0.7)_70%,#030713_100%)]" />
        </div>
      )}

      {/* ── Ambient Radial Atmosphere ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/4 z-0 h-96 w-96 rounded-full blur-[120px] opacity-25"
        style={{ background: accentColor }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-5%] top-1/3 z-0 h-[450px] w-[450px] rounded-full blur-[140px] opacity-20"
        style={{ background: "#117a4b" }}
      />

      {/* ── Bespoke 3D / SVG Animation Canvas ── */}
      <div className="absolute inset-0 z-10 overflow-hidden pt-18 sm:pt-20 lg:pt-0">
        {children}
      </div>

      {/* ── Bottom Gradient Fade for Content Readability ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[32%] bg-gradient-to-t from-[#030713] via-[#030713]/80 to-transparent"
      />

      {/* ── Bottom Caption & KPI Telemetry Overlay ── */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col items-center px-4 pb-4 text-center sm:px-6 sm:pb-6 pointer-events-auto">
        <p className="tri-gradient-text text-[clamp(1.05rem,2.5vw,1.65rem)] font-extrabold leading-tight tracking-tight">
          {caption}
        </p>
        <p className="mt-1 text-[clamp(0.62rem,1.4vw,0.85rem)] font-semibold uppercase tracking-[0.18em] text-slate-200/90">
          {sub}
        </p>
        {kpis && kpis.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {kpis.map((k) => (
              <div
                key={k.label}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-1.5 shadow-lg shadow-black/40 backdrop-blur-md transition-transform duration-300 hover:scale-105 sm:px-3 sm:py-2"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full animate-pulse"
                  style={{ background: k.color, boxShadow: `0 0 10px ${k.color}` }}
                />
                <span className="text-left">
                  <span className="block text-xs font-extrabold leading-none sm:text-sm" style={{ color: k.color }}>
                    {k.value}
                  </span>
                  <span className="mt-0.5 block text-[8px] font-semibold uppercase tracking-[0.12em] text-white/70 sm:text-[9px]">
                    {k.label}
                  </span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Clean Bottom Border Line ── */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.08]" />
    </div>
  );
}
