"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export interface IndustryVideoHeroKpi {
  value: string;
  label: string;
  color: string;
}

export interface IndustryVideoHeroProps {
  /** Unique industry video, e.g. /videos/pharmaceuticals-sap.mp4 */
  videoSrc: string;
  /** Static poster used while loading and for reduced-motion users */
  poster?: string;
  /** object-position crop, tuned per industry video */
  objectPosition?: string;
  /** Tailwind scale classes used to focus the video band on mobile */
  mobileScale?: string;
  caption: string;
  sub: string;
  kpis?: IndustryVideoHeroKpi[];
}

const DEFAULT_MOBILE_SCALE = "scale-[1.7] sm:scale-100";

export default function IndustryVideoHero({
  videoSrc,
  poster,
  objectPosition = "50% 42%",
  mobileScale = DEFAULT_MOBILE_SCALE,
  caption,
  sub,
  kpis = [],
}: IndustryVideoHeroProps) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <>
      {/* full-bleed industry video — blends into the hero environment */}
      <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay={!reduce}
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          className={`h-full w-full object-cover opacity-100 ${mobileScale}`}
          style={{ objectPosition }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(3,7,19,0.72)_0%,rgba(3,7,19,0.16)_50%,rgba(3,7,19,0.04)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 z-20 h-[45%] bg-gradient-to-t from-[#030713]/85 via-[#030713]/30 to-transparent" />
      </div>

      {/* tri-color caption overlay — bottom-anchored, clear of the video band */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-4 pb-4 text-center sm:px-6 sm:pb-5">
        <p className="tri-gradient-text text-[clamp(1rem,2.4vw,1.6rem)] font-extrabold leading-tight tracking-tight">
          {caption}
        </p>
        <p className="mt-1 text-[clamp(0.62rem,1.4vw,0.85rem)] font-semibold uppercase tracking-[0.18em] text-slate-200/90">
          {sub}
        </p>
        {kpis.length > 0 && (
          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
            {kpis.map((k) => (
              <div
                key={k.label}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-1.5 sm:px-3 sm:py-2"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: k.color, boxShadow: `0 0 8px ${k.color}` }} />
                <span>
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
    </>
  );
}
