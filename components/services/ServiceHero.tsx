"use client";

import type { ReactNode } from "react";
import { CloudAtmosphere, OrbitRings } from "./hero-atmosphere";

type ServiceHeroProps = {
  /** Page heading only. No eyebrow, no paragraph, no buttons. */
  heading: ReactNode;
  /** Full-bleed page-specific animation. */
  scene: ReactNode;
  /** Hero background gradient classes (dark). */
  bgClass?: string;
  /** Colour the hero melts into at the bottom (start of the next section). */
  fadeTo?: string;
  /** Glow blob colours. */
  glow?: [string, string];
};

/**
 * Hero rule for Service subpages:
 *   PAGE HEADING + LARGE IMMERSIVE ANIMATION
 * Nothing else. The heading breathes at the top, the animation owns the rest
 * of the canvas. A soft bottom fade lets the scene flow into the next section.
 */
export default function ServiceHero({
  heading,
  scene,
  bgClass = "bg-[#030713]",
  fadeTo = "#f2f7fd",
  glow = ["rgba(47,143,255,0.28)", "rgba(34,211,238,0.16)"],
}: ServiceHeroProps) {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden bg-[#050817]">
      {/* Brand tri-mesh, grid and hex-grid overlay */}
      <div aria-hidden className="absolute inset-0 -z-10 tri-mesh" />
      <div aria-hidden className="absolute inset-0 -z-10 tri-grid-bg" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-hex-grid opacity-40" />

      {/* Brand glowing orbs (mint-green/teal and orange/amber) */}
      <div aria-hidden className="pointer-events-none absolute right-[8%] top-[14%] -z-10 h-64 w-64 rounded-full bg-[rgba(41,171,135,0.14)] blur-3xl tri-pulse" />
      <div aria-hidden className="pointer-events-none absolute bottom-[16%] left-[6%] -z-10 h-48 w-48 rounded-full bg-[rgba(245,166,35,0.12)] blur-3xl tri-pulse" style={{ animationDelay: "1.5s" }} />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 bg-[radial-gradient(45%_100%_at_50%_0%,rgba(41,171,135,0.08),transparent_70%)]" />

      {/* full-canvas atmosphere — clouds behind, orbit rings behind the scene */}
      <CloudAtmosphere />
      <OrbitRings />

      <div className="relative z-20 mx-auto w-full max-w-7xl px-5 pt-24 sm:px-8 lg:px-12 lg:pt-28">
        <div className="max-w-md">{heading}</div>
      </div>

      {/* animation zone — the canvas owns roughly 80-85% of the hero */}
      <div className="relative z-10 mt-4 min-h-0 flex-1 lg:mt-2">
        <div className="absolute inset-x-0 bottom-0 top-0">{scene}</div>
      </div>

      {/* Clean sharp boundary line instead of fuzzy cloud transition */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.08]" />
    </section>
  );
}
