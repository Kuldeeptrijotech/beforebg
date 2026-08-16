"use client";

import type { ReactNode } from "react";
import { CloudAtmosphere, OrbitRings } from "./hero-atmosphere";

type ServiceHeroProps = {
  /** Optional page heading. */
  heading?: ReactNode;
  /** Full-bleed page-specific animation (owns 100% of the hero viewport). */
  scene: ReactNode;
  /** Hero background gradient classes (dark). */
  bgClass?: string;
  /** Colour the hero melts into at the bottom (start of the next section). */
  fadeTo?: string;
  /** Glow blob colours. */
  glow?: [string, string];
};

/**
 * Service Hero Section:
 * 100% Full-bleed, edge-to-edge interactive animation canvas.
 * Unified dark background (#030713) with atmospheric layers.
 */
export default function ServiceHero({
  heading,
  scene,
  bgClass = "bg-[#030713]",
  fadeTo = "#030713",
  glow = ["rgba(47,143,255,0.28)", "rgba(34,211,238,0.16)"],
}: ServiceHeroProps) {
  return (
    <section className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#030713] pb-4 pt-14 sm:pt-16 lg:h-screen lg:min-h-[680px] lg:py-0">
      {/* Brand tri-mesh, grid and hex-grid overlay */}
      <div aria-hidden className="absolute inset-0 -z-40 tri-mesh" />
      <div aria-hidden className="absolute inset-0 -z-30 tri-grid-bg" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-hex-grid opacity-35" />

      {/* Brand glowing orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute right-[8%] top-[14%] -z-10 h-64 w-64 rounded-full bg-[rgba(41,171,135,0.14)] blur-3xl tri-pulse" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-[16%] left-[6%] -z-10 h-48 w-48 rounded-full bg-[rgba(245,166,35,0.12)] blur-3xl tri-pulse" style={{ animationDelay: "1.5s" }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 bg-[radial-gradient(45%_100%_at_50%_0%,rgba(41,171,135,0.08),transparent_70%)]" />

      {/* Atmosphere clouds & orbit rings */}
      <CloudAtmosphere />
      <OrbitRings />

      {/* Optional Page Heading (if supplied) */}
      {heading && (
        <div className="relative z-20 mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 sm:pt-20 lg:px-10 lg:pt-24 pointer-events-none">
          <div className="max-w-md pointer-events-auto">{heading}</div>
        </div>
      )}

      {/* Animation Zone: Full-bleed responsive canvas */}
      <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col justify-center">
        <div className="relative h-full w-full">{scene}</div>
      </div>

      {/* Clean sharp boundary line */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.08]" />
    </section>
  );
}
