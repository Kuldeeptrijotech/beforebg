"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────
   Shared scene primitives for the Trijotech page-specific
   animation library.

   These are STRUCTURAL helpers (a canvas, a packet, a link, a
   stage chip). Every scene still describes its own topic:
   stages, topology, motion and meaning come from the scene
   component, not from these helpers.
   ───────────────────────────────────────────────────────────── */

export const TRI = {
  green: "#29ab87",
  greenDeep: "#117a4b",
  amber: "#f5a623",
  mint: "#7edcc2",
  mintText: "rgba(191,232,216,0.9)",
  faint: "rgba(191,232,216,0.55)",
  line: "rgba(41,171,135,0.4)",
  lineAmber: "rgba(245,166,35,0.35)",
  ink: "#030713",
};

export const HEX_CLIP = "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)";

type Tone = "green" | "amber" | "mix" | "dim" | "white";

const TONE_BG: Record<Tone, string> = {
  green: "linear-gradient(160deg,#29ab87,#117a4b)",
  amber: "linear-gradient(160deg,#f5a623,#f29e16)",
  mix: "linear-gradient(135deg,#29ab87,#117a4b 55%,#f5a623 130%)",
  dim: "linear-gradient(160deg,rgba(41,171,135,0.22),rgba(17,122,75,0.32))",
  white: "linear-gradient(160deg,rgba(255,255,255,0.16),rgba(255,255,255,0.05))",
};

const TONE_GLOW: Record<Tone, string> = {
  green: "rgba(41,171,135,0.35)",
  amber: "rgba(245,166,35,0.3)",
  mix: "rgba(41,171,135,0.35)",
  dim: "rgba(41,171,135,0.12)",
  white: "rgba(255,255,255,0.06)",
};

/** Dark scene canvas with brand mesh + optional hex lattice overlay. SSR-safe.
    When `bleed` is true the canvas becomes an edge-to-edge, transparent,
    pointer-transparent layer that fills its nearest positioned parent —
    used for immersive full-hero environments instead of framed panels. */
export function SceneCanvas({
  children,
  className = "",
  bleed = false,
  mesh = true,
  hex = true,
  grid = false,
  vignette = true,
}: {
  children: ReactNode;
  className?: string;
  bleed?: boolean;
  mesh?: boolean;
  hex?: boolean;
  grid?: boolean;
  vignette?: boolean;
}) {
  if (bleed) {
    return (
      <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
        <div className="relative h-full w-full">{children}</div>
      </div>
    );
  }
  return (
    <div className={`relative isolate overflow-hidden bg-[#050817] ${className}`}>
      {mesh && <div aria-hidden className="absolute inset-0 -z-10 tri-mesh" />}
      {hex && <div aria-hidden className="absolute inset-0 -z-10 tri-hex-grid opacity-70" />}
      {grid && <div aria-hidden className="absolute inset-0 -z-10 tri-grid-bg" />}
      <div aria-hidden className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-[rgba(41,171,135,0.14)] blur-3xl tri-pulse" />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-8 h-52 w-52 rounded-full bg-[rgba(245,166,35,0.1)] blur-3xl tri-pulse" style={{ animationDelay: "1.6s" }} />
      {vignette && <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(3,7,19,0.55)_100%)]" />}
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}

/** Hexagon icon chip used as a stage/node marker. */
export function SceneIcon({
  icon: Icon,
  tone = "green",
  size = 34,
  className = "",
}: {
  icon: LucideIcon;
  tone?: Tone;
  size?: number;
  className?: string;
}) {
  return (
    <span className={`relative inline-flex shrink-0 items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <span aria-hidden className="absolute inset-0 blur-md" style={{ clipPath: HEX_CLIP, background: TONE_GLOW[tone], transform: "scale(1.35)" }} />
      <span className="relative flex h-full w-full items-center justify-center" style={{ clipPath: HEX_CLIP, background: TONE_BG[tone] }}>
        <Icon className="text-white" style={{ width: size * 0.52, height: size * 0.52 }} strokeWidth={1.8} />
      </span>
    </span>
  );
}

/** Pill chip holding a hexagon icon + label. Used to label nodes in HTML layouts. */
export function StageChip({
  icon: Icon,
  label,
  sub,
  tone = "green",
  className = "",
  pulse = false,
}: {
  icon: LucideIcon;
  label: string;
  sub?: string;
  tone?: Tone;
  className?: string;
  pulse?: boolean;
}) {
  return (
    <div
      className={`relative inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 shadow-lg shadow-black/30 backdrop-blur-md ${pulse ? "tri-pulse" : ""} ${className}`}
    >
      <SceneIcon icon={Icon} tone={tone} size={28} />
      <div className="leading-tight">
        <p className="text-[12px] font-semibold text-white">{label}</p>
        {sub && <p className="text-[10px] text-white/50">{sub}</p>}
      </div>
    </div>
  );
}

/** Dashed connector used in HTML (non-SVG) layouts. */
export function ConnectorLine({ vertical = true, className = "" }: { vertical?: boolean; className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute left-1/2 top-full h-8 w-px -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,rgba(41,171,135,0.55)_0,rgba(41,171,135,0.55)_5px,transparent_5px,transparent_10px)] ${vertical ? "" : "rotate-90"} ${className}`}
    />
  );
}

/** Moving packet for SVG scenes: a dot that travels a path forever. */
export function Packet({
  d,
  dur = 6,
  color = TRI.mint,
  r = 4,
  delay = 0,
}: {
  d: string;
  dur?: number;
  color?: string;
  r?: number;
  delay?: number;
}) {
  return (
    <>
      <circle r={r * 2} fill={color} opacity={0.14}>
        <animateMotion dur={`${dur}s`} begin={`-${delay}s`} repeatCount="indefinite" path={d} />
      </circle>
      <circle r={r} fill={color}>
        <animateMotion dur={`${dur}s`} begin={`-${delay}s`} repeatCount="indefinite" path={d} />
      </circle>
    </>
  );
}

/** Static connection line (optionally animated dashes via CSS class). */
export function FlowLink({
  d,
  color = TRI.line,
  width = 1.4,
  dash = false,
  opacity = 1,
}: {
  d: string;
  color?: string;
  width?: number;
  dash?: boolean;
  opacity?: number;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      opacity={opacity}
      className={dash ? "tri-dash" : undefined}
    />
  );
}

/** Pulsing static node dot for SVG scenes. */
export function PulseDot({ cx, cy, color = TRI.green, r = 4, dur = 3 }: { cx: number; cy: number; color?: string; r?: number; dur?: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r * 2.2} fill="none" stroke={color} strokeWidth={1}>
        <animate attributeName="r" values={`${r * 2.2};${r * 4.4}`} dur={`${dur}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0" dur={`${dur}s`} repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r={r} fill={color} />
    </>
  );
}

/** Small caption text inside SVG scenes. */
export function SceneText({
  x,
  y,
  children,
  size = 12,
  fill = TRI.mintText,
  weight = 600,
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  fill?: string;
  weight?: number;
}) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={weight} fill={fill} style={{ fontFamily: "Poppins, sans-serif", letterSpacing: "0.02em" }}>
      {children}
    </text>
  );
}

/** Soft glow circle behind a group (SVG). */
export function GlowHalo({ cx, cy, r, color = TRI.green, opacity = 0.16 }: { cx: number; cy: number; r: number; color?: string; opacity?: number }) {
  return <circle cx={cx} cy={cy} r={r} fill={color} opacity={opacity} className="tri-pulse" />;
}
