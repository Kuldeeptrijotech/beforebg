"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Banknote,
  Boxes,
  Clapperboard,
  Coins,
  Factory,
  Film,
  Flame,
  FlaskConical,
  Gauge,
  Package,
  Play,
  Radio,
  RadioTower,
  ShieldCheck,
  Signal,
  TrendingUp,
  Truck,
  Wifi,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import { usePointerRotate } from "@/components/services/service-ui";
import { GlowHalo, HEX_CLIP, Packet, PulseDot } from "./scene-ui";

/* ─────────────────────────────────────────────────────────────
   Industry hero scenes.
   One glass composition per industry, related to its own content:
   a central glass glyph with a network of floating frosted-glass
   KPI panels, connected by moving data packets. Each industry
   keeps a unique background artwork (route, rings, conveyor,
   ledger, waves, furnace, tower) plus its own accent colour.
   Drag to orbit (mouse), hover to parallax-tilt.
   ───────────────────────────────────────────────────────────── */

type Panel = {
  x: number;
  y: number;
  icon: LucideIcon;
  title: string;
  value: string;
  sub: string;
};

type Config = {
  glyph: LucideIcon;
  glyphLabel: string;
  glyphSub: string;
  accent: string;
  accent2: string;
  panels: Panel[];
  motif: (accent: string, accent2: string) => ReactNode;
};

const G = { x: 62, y: 46 };

function panelPath(p: Panel): string {
  const gx = G.x * 10;
  const gy = G.y * 6.4;
  const px = p.x * 10;
  const py = p.y * 6.4;
  return `M${gx} ${gy} C ${gx + (px - gx) * 0.45} ${gy + (py - gy) * 0.2}, ${px - (px - gx) * 0.12} ${py - (py - gy) * 0.12}, ${px} ${py}`;
}

const orbit = (cx: number, cy: number, r: number) => `M ${cx - r} ${cy} a ${r} ${r} 0 1 1 ${r * 2} 0 a ${r} ${r} 0 1 1 ${-r * 2} 0`;

const CONFIGS: Record<string, Config> = {
  "retail-supply-chain": {
    glyph: Truck,
    glyphLabel: "Supply Chain",
    glyphSub: "Connected commerce",
    accent: "#22d3ee",
    accent2: "#67e8f9",
    panels: [
      { x: 85, y: 15, icon: Boxes, title: "Inventory accuracy", value: "99.8%", sub: "live stock levels" },
      { x: 52, y: 72, icon: TrendingUp, title: "Demand forecast", value: "+8.2%", sub: "next-cycle signal" },
      { x: 86, y: 74, icon: Package, title: "Fulfillment", value: "98.7%", sub: "on-time delivery" },
    ],
    motif: (accent, accent2) => (
      <>
        <path d="M-20 565 Q 250 520 500 545 T 1020 535" stroke={accent} strokeOpacity={0.2} strokeWidth={1.6} strokeDasharray="5 12" />
        {[150, 320, 500, 680, 850].map((x) => (
          <rect key={x} x={x - 5} y={538} width={10} height={10} transform={`rotate(45 ${x} 543)`} stroke={accent} strokeOpacity={0.32} fill="none" />
        ))}
        <circle r={4} fill={accent2}>
          <animateMotion dur="13s" repeatCount="indefinite" path="M-20 565 Q 250 520 500 545 T 1020 535" />
        </circle>
      </>
    ),
  },

  "pharmaceuticals-life-sciences": {
    glyph: FlaskConical,
    glyphLabel: "Life Sciences",
    glyphSub: "Compliant data",
    accent: "#7edcc2",
    accent2: "#2f8fff",
    panels: [
      { x: 84, y: 18, icon: ShieldCheck, title: "Compliance", value: "100%", sub: "FDA validated" },
      { x: 50, y: 70, icon: Activity, title: "Batch yield", value: "98.9%", sub: "per production run" },
      { x: 86, y: 74, icon: Package, title: "Serialization", value: "99.99%", sub: "unit traceability" },
    ],
    motif: (accent, accent2) => (
      <>
        <circle cx={620} cy={294} r={150} stroke={accent} strokeOpacity={0.22} />
        <circle cx={620} cy={294} r={200} stroke={accent2} strokeOpacity={0.16} strokeDasharray="3 10" />
        <circle cx={620} cy={294} r={250} stroke={accent} strokeOpacity={0.1} strokeDasharray="1 8" />
        <circle r={3.5} fill={accent2}>
          <animateMotion dur="20s" repeatCount="indefinite" path={orbit(620, 294, 200)} />
        </circle>
        <circle r={2.5} fill={accent}>
          <animateMotion dur="14s" repeatCount="indefinite" path={orbit(620, 294, 150)} />
        </circle>
      </>
    ),
  },

  manufacturing: {
    glyph: Factory,
    glyphLabel: "Manufacturing",
    glyphSub: "Connected plant",
    accent: "#38bdf8",
    accent2: "#22d3ee",
    panels: [
      { x: 85, y: 15, icon: Gauge, title: "Overall OEE", value: "93.4%", sub: "line efficiency" },
      { x: 52, y: 72, icon: Zap, title: "Process uptime", value: "99.98%", sub: "24/7 availability" },
      { x: 86, y: 74, icon: Activity, title: "Scrap rate", value: "-6.8%", sub: "quality gains" },
    ],
    motif: (accent, accent2) => (
      <>
        <path d="M80 560 H 920" stroke={accent} strokeOpacity={0.22} strokeWidth={1.5} strokeDasharray="8 6" />
        {[200, 400, 600, 800].map((x) => (
          <rect key={x} x={x - 28} y={492} width={56} height={64} rx={10} stroke={accent2} strokeOpacity={0.2} fill="none" />
        ))}
        <path d="M200 526 H 400 M 400 526 H 600 M 600 526 H 800" stroke={accent} strokeOpacity={0.12} strokeWidth={1} />
        <circle r={3.5} fill={accent}>
          <animateMotion dur="9s" repeatCount="indefinite" path="M80 560 H 920" />
        </circle>
      </>
    ),
  },

  fintech: {
    glyph: Coins,
    glyphLabel: "Fintech",
    glyphSub: "Real-time finance",
    accent: "#8b7cf6",
    accent2: "#a78bfa",
    panels: [
      { x: 84, y: 18, icon: Banknote, title: "Reconciled in", value: "0.18s", sub: "per transaction" },
      { x: 50, y: 70, icon: Zap, title: "Daily volume", value: "4.8M", sub: "transactions / day" },
      { x: 86, y: 74, icon: ShieldCheck, title: "Fraud rate", value: "0.01%", sub: "false positives" },
    ],
    motif: (accent, accent2) => (
      <>
        {[120, 150, 180, 210].map((y, i) => (
          <line key={y} x1={690} y1={y} x2={900} y2={y} stroke={accent} strokeOpacity={0.1 + i * 0.04} />
        ))}
        <circle cx={792} cy={180} r={26} stroke={accent2} strokeOpacity={0.28} strokeDasharray="4 6" />
        <circle cx={792} cy={180} r={42} stroke={accent} strokeOpacity={0.16} />
        <circle cx={792} cy={180} r={58} stroke={accent2} strokeOpacity={0.1} strokeDasharray="1 7" />
        <circle r={3} fill={accent2}>
          <animateMotion dur="16s" repeatCount="indefinite" path={orbit(792, 180, 42)} />
        </circle>
      </>
    ),
  },

  entertainment: {
    glyph: Clapperboard,
    glyphLabel: "Entertainment",
    glyphSub: "Media finance",
    accent: "#67e8f9",
    accent2: "#22d3ee",
    panels: [
      { x: 85, y: 15, icon: Play, title: "Royalty accuracy", value: "100%", sub: "settlements verified" },
      { x: 51, y: 72, icon: Radio, title: "Stream concurrency", value: "1.4M", sub: "active viewers" },
      { x: 86, y: 74, icon: Film, title: "CDN delivery", value: "99.2%", sub: "cache hit rate" },
    ],
    motif: (accent, accent2) => (
      <>
        {[70, 100, 130, 160].map((r, i) => (
          <path key={r} d={`M ${800 - r} 150 a ${r} ${r} 0 0 1 ${r * 2} 0`} stroke={accent2} strokeOpacity={0.22 - i * 0.04} />
        ))}
        <path d="M120 545 H 900" stroke={accent} strokeOpacity={0.2} strokeDasharray="2 9" />
        <circle r={3.5} fill={accent}>
          <animateMotion dur="8s" repeatCount="indefinite" path="M120 545 H 900" />
        </circle>
      </>
    ),
  },

  "steel-manufacturing": {
    glyph: Flame,
    glyphLabel: "Steel Making",
    glyphSub: "Molten performance",
    accent: "#f5a623",
    accent2: "#ffb45e",
    panels: [
      { x: 84, y: 18, icon: Gauge, title: "Melting efficiency", value: "94.6%", sub: "furnace yield" },
      { x: 50, y: 70, icon: Activity, title: "Steel purity", value: "99.98%", sub: "quality verified" },
      { x: 86, y: 74, icon: ShieldCheck, title: "Safety record", value: "0 LTI", sub: "incident-free" },
    ],
    motif: (accent, accent2) => (
      <>
        <path d="M700 440 A 180 180 0 0 1 1060 440" stroke={accent} strokeOpacity={0.22} strokeWidth={1.6} />
        {[720, 760, 800, 840, 880, 920, 960, 1000].map((x) => (
          <line key={x} x1={x} y1={440} x2={x} y2={452} stroke={accent} strokeOpacity={0.3} />
        ))}
        {[730, 790, 850].map((x) => (
          <line key={x} x1={x} y1={405 - (x - 730) * 0.08} x2={x + 12} y2={360 - (x - 730) * 0.08} stroke={accent2} strokeOpacity={0.25} />
        ))}
        <rect x={720} y={472} width={84} height={32} rx={6} stroke={accent2} strokeOpacity={0.26} />
        <rect x={824} y={472} width={84} height={32} rx={6} stroke={accent2} strokeOpacity={0.18} />
        <rect x={928} y={472} width={84} height={32} rx={6} stroke={accent} strokeOpacity={0.24} />
        <circle r={3} fill={accent2}>
          <animateMotion dur="10s" repeatCount="indefinite" path="M720 488 H 1012" />
        </circle>
      </>
    ),
  },

  telecommunications: {
    glyph: RadioTower,
    glyphLabel: "Telecom",
    glyphSub: "Connected networks",
    accent: "#2f8fff",
    accent2: "#38bdf8",
    panels: [
      { x: 85, y: 15, icon: Signal, title: "Data latency", value: "4.2ms", sub: "data plane average" },
      { x: 50, y: 70, icon: Wifi, title: "CDR ingestion", value: "120k/s", sub: "records per second" },
      { x: 86, y: 74, icon: Activity, title: "Throughput", value: "1.4Gbps", sub: "5G peak" },
    ],
    motif: (accent, accent2) => (
      <>
        <g stroke={accent} strokeOpacity={0.2} fill="none">
          <path d="M900 555 L 900 320 L 1015 555 Z" />
          <path d="M900 320 L 940 555" />
          <path d="M900 320 L 860 555" />
        </g>
        {[60, 90, 120].map((r, i) => (
          <path key={r} d={`M ${815 - r} 130 a ${r} ${r} 0 0 1 ${r * 2} 0`} stroke={accent2} strokeOpacity={0.24 - i * 0.05} />
        ))}
        <circle r={3.5} fill={accent2}>
          <animateMotion dur="12s" repeatCount="indefinite" path="M780 580 Q 900 520 1000 580" />
        </circle>
      </>
    ),
  },
};

function GlassPanel({
  x,
  y,
  icon: Icon,
  title,
  value,
  sub,
  accent,
  depth,
  reduce,
}: Panel & { accent: string; depth: number; reduce: boolean | null }) {
  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        animate={reduce ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 5 + depth * 0.9, repeat: Infinity, ease: "easeInOut", delay: depth * 0.8 }}
        style={{ transformStyle: "preserve-3d", z: 26 + depth * 14 }}
      >
        <div
          className="w-[190px] rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-[0_24px_60px_-24px_rgba(2,10,25,0.95),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl"
          style={{ borderColor: "rgba(255,255,255,0.12)" }}
        >
          <div className="flex items-center justify-between">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `${accent}1f`, border: `1px solid ${accent}44`, color: accent }}>
              <Icon className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 10px ${accent}` }} />
          </div>
          <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">{title}</p>
          <p className="mt-1 text-xl font-extrabold tracking-tight text-white">{value}</p>
          <p className="mt-1 text-[10px] font-semibold" style={{ color: accent }}>
            {sub}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function IndustryGlassScene({ slug = "retail-supply-chain" }: { slug?: string }) {
  const config = CONFIGS[slug] ?? CONFIGS["retail-supply-chain"];
  const reduce = useReducedMotion();
  const { bind, reset, grabStart, grabEnd, rotateX, rotateY } = usePointerRotate(7);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ perspective: "1300px", cursor: "grab", touchAction: "pan-y" }}
      onPointerMove={bind}
      onPointerLeave={reset}
      onPointerDown={grabStart}
      onPointerUp={grabEnd}
      onPointerCancel={grabEnd}
    >
      <motion.div className="absolute inset-0" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1000 640"
          preserveAspectRatio="none"
          fill="none"
          style={{ pointerEvents: "none" }}
        >
          {config.panels.map((p, i) => (
            <path key={`link-${i}`} d={panelPath(p)} stroke={config.accent} strokeOpacity={0.2} strokeWidth={1.4} strokeDasharray="2 7" />
          ))}
          {config.panels.map((p, i) => (
            <Packet key={`packet-${i}`} d={panelPath(p)} dur={7} delay={i * 1.6} color={config.accent} r={3.5} />
          ))}
          {config.panels.map((p, i) => (
            <PulseDot key={`dot-${i}`} cx={p.x * 10} cy={p.y * 6.4} color={config.accent} r={3} dur={2.6 + i} />
          ))}
          {config.motif(config.accent, config.accent2)}
          <GlowHalo cx={G.x * 10} cy={G.y * 6.4} r={110} color={config.accent} opacity={0.14} />
        </svg>

        {/* Central glass glyph */}
        <div
          className="absolute"
          style={{
            left: `${G.x}%`,
            top: `${G.y}%`,
            transform: "translate(-50%, -50%)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="flex flex-col items-center" style={{ transform: "translateZ(54px)" }}>
            <motion.div
              animate={reduce ? {} : { rotate: [0, 6, 0, -6, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-24 w-24 items-center justify-center"
              style={{
                clipPath: HEX_CLIP,
                background: `linear-gradient(160deg, ${config.accent}40, rgba(255,255,255,0.06))`,
                border: `1px solid ${config.accent}55`,
                boxShadow: `0 0 80px ${config.accent}40`,
                backdropFilter: "blur(8px)",
              }}
            >
              <config.glyph className="h-11 w-11 text-white" style={{ filter: `drop-shadow(0 0 16px ${config.accent})` }} strokeWidth={1.5} />
            </motion.div>
            <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-1.5 text-center backdrop-blur-xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">{config.glyphLabel}</p>
              <p className="text-[9px] font-medium text-white/50">{config.glyphSub}</p>
            </div>
          </div>
        </div>

        {/* Floating glass KPI panels */}
        {config.panels.map((p, i) => (
          <GlassPanel key={p.title} {...p} accent={config.accent} depth={i} reduce={reduce} />
        ))}
      </motion.div>
    </div>
  );
}
