"use client";

import { motion, MotionConfig, useScroll, useTransform } from "framer-motion";
import {
  Activity,
  Blocks,
  Bug,
  Cloud,
  Database,
  Gauge,
  Server,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRef } from "react";
import { HEX_CLIP } from "./scene-ui";
import { usePointerRotate } from "@/components/services/service-ui";

/* ─────────────────────────────────────────────────────────────
   SAP Support — 3D OPERATIONS COMMAND CENTER
   A live SAP landscape around a support core. Systems pulse
   healthy; in rotation each system takes an issue signal, gets
   scanned, routes to the support core, and is optimised back to
   healthy. Blue = system · cyan = monitoring · amber = warning ·
   green = resolved.
   ───────────────────────────────────────────────────────────── */

const WINDOW = 5.2;
const TIMES = [0, 0.2, 0.45, 0.9, 1] as number[];

type Node = {
  label: string;
  sub: string;
  icon: LucideIcon;
  x: number;
  y: number;
  px: number;
  py: number;
};

const NODES: Node[] = [
  { label: "S/4HANA", sub: "Digital core", icon: Database, x: 22, y: 24, px: 220, py: 150 },
  { label: "ECC Suite", sub: "Legacy ERP", icon: Server, x: 78, y: 22, px: 780, py: 140 },
  { label: "HANA Cloud", sub: "DB services", icon: Cloud, x: 20, y: 74, px: 200, py: 450 },
  { label: "BTP Apps", sub: "Side-by-side", icon: Blocks, x: 78, y: 72, px: 780, py: 445 },
];

const HUB = { x: 50, y: 46, cx: 500, cy: 285 };

const pathTo = (n: Node) => {
  const cx = (n.px + HUB.cx) / 2;
  const cy = (n.py + HUB.cy) / 2;
  return `M${n.px} ${n.py} C ${cx} ${cy - 26}, ${cx + 6} ${cy + 18}, ${HUB.cx - 6} ${HUB.cy}`;
};

const pathBack = (n: Node) => {
  const cx = (n.px + HUB.cx) / 2;
  const cy = (n.py + HUB.cy) / 2;
  return `M${HUB.cx + 8} ${HUB.cy} C ${cx + 6} ${cy + 18}, ${cx} ${cy - 26}, ${n.px} ${n.py}`;
};

const SUPPORT_MODULES: { icon: LucideIcon; label: string }[] = [
  { icon: Bug, label: "Incidents" },
  { icon: Gauge, label: "Performance" },
  { icon: Sparkles, label: "Enhancements" },
];

export default function SupportCommandCenter() {
  const { bind, reset, grabStart, grabEnd, rotateX, rotateY } = usePointerRotate(4);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.15]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden"
      style={{ perspective: 1400, cursor: "grab" }}
      onPointerMove={bind}
      onPointerDown={grabStart}
      onPointerUp={grabEnd}
      onPointerLeave={reset}
      aria-hidden
    >
      <MotionConfig reducedMotion="user">
        <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d", opacity: fade }} className="relative h-full w-full">
          {/* monitoring sweep */}
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50 tri-scan" />

          {/* grid floor */}
          <div
            className="pointer-events-none absolute inset-x-[-20%] bottom-[-20%] h-[68%] opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(rgba(34,211,238,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.12) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
              transform: "rotateX(60deg)",
              maskImage: "radial-gradient(ellipse 62% 72% at 50% 45%, black 30%, transparent 78%)",
              WebkitMaskImage: "radial-gradient(ellipse 62% 72% at 50% 45%, black 30%, transparent 78%)",
            }}
          />

          {/* link layer */}
          <svg className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 1000 600" preserveAspectRatio="none" fill="none">
            {NODES.map((n, i) => (
              <g key={n.label}>
                <path d={pathTo(n)} stroke="rgba(56,189,248,0.22)" strokeWidth={1.2} strokeDasharray="5 7" />
                <path d={pathBack(n)} stroke="rgba(56,189,248,0.22)" strokeWidth={1.2} strokeDasharray="5 7" />

                {/* issue signal routed to support core */}
                <motion.g
                  animate={{ opacity: [0, 1, 1, 0, 0] }}
                  transition={{ duration: WINDOW, repeat: Infinity, times: [0.12, 0.28, 0.4, 0.62, 1], delay: -i * WINDOW, ease: "easeInOut" }}
                >
                  <circle r="5" fill="#f5a623" />
                  <animateMotion dur={`${WINDOW}s`} begin={`-${i * WINDOW}s`} repeatCount="indefinite" path={pathTo(n)} keyPoints="0;1;1" keyTimes="0;0.28;1" calcMode="linear" />
                </motion.g>

                {/* optimisation signal returning to the system */}
                <motion.g
                  animate={{ opacity: [0, 0, 1, 1, 0] }}
                  transition={{ duration: WINDOW, repeat: Infinity, times: [0, 0.5, 0.65, 0.9, 1], delay: -i * WINDOW, ease: "easeInOut" }}
                >
                  <circle r="5" fill="#29ab87" />
                  <animateMotion dur={`${WINDOW}s`} begin={`-${i * WINDOW}s`} repeatCount="indefinite" path={pathBack(n)} keyPoints="0;0;1;1" keyTimes="0;0.5;0.72;1" calcMode="linear" />
                </motion.g>
              </g>
            ))}

            <circle cx={HUB.cx} cy={HUB.cy} r="90" fill="rgba(34,211,238,0.06)" />
            <circle cx={HUB.cx} cy={HUB.cy} r="74" fill="none" stroke="rgba(34,211,238,0.5)" strokeWidth={1.2}>
              <animate attributeName="r" values="74;112" dur="3.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0" dur="3.4s" repeatCount="indefinite" />
            </circle>
            <circle cx={HUB.cx} cy={HUB.cy} r="74" fill="none" stroke="rgba(47,143,255,0.4)" strokeWidth={1}>
              <animate attributeName="r" values="74;112" dur="3.4s" begin="1.7s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0" dur="3.4s" begin="1.7s" repeatCount="indefinite" />
            </circle>
          </svg>

          {/* support core */}
          <div className="absolute" style={{ left: "50%", top: "46%", transform: "translate(-50%,-50%)" }}>
            <motion.div
              animate={{ scale: [1, 1.04, 1], opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28"
            >
              <span aria-hidden className="absolute inset-0 blur-lg" style={{ clipPath: HEX_CLIP, background: "rgba(34,211,238,0.4)", transform: "scale(1.45)" }} />
              <span className="relative flex h-full w-full items-center justify-center" style={{ clipPath: HEX_CLIP, background: "linear-gradient(160deg,#0a6ed1,#0e2f52)" }}>
                <Activity className="h-9 w-9 text-[#67e8f9] sm:h-11 sm:w-11" strokeWidth={1.6} />
              </span>
            </motion.div>
            <div className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-[#7ec8f7] backdrop-blur-md">
              Support Core · 24×7
            </div>
          </div>

          {/* support modules activate as issues route in */}
          {SUPPORT_MODULES.map((mod, i) => {
            const Icon = mod.icon;
            const angle = ((360 / SUPPORT_MODULES.length) * i - 90) * (Math.PI / 180);
            const x = 50 + (16.5 * Math.cos(angle)) / 2;
            const y = 46 + (12 * Math.sin(angle)) / 2;
            return (
              <div key={mod.label} className="absolute hidden md:block" style={{ left: `${x}%`, top: `${y}%` }}>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                  className="flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
                >
                  <span className="relative flex h-10 w-10 items-center justify-center" style={{ clipPath: HEX_CLIP, background: "linear-gradient(160deg,rgba(34,211,238,0.9),rgba(10,110,209,0.8))", boxShadow: "0 0 18px rgba(34,211,238,0.35)" }}>
                    <Icon className="h-4 w-4 text-white" strokeWidth={1.8} />
                  </span>
                  <span className="rounded-full border border-white/10 bg-black/35 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.16em] text-white/55 backdrop-blur-md">
                    {mod.label}
                  </span>
                </motion.div>
              </div>
            );
          })}

          {/* system nodes — each runs its own incident → scan → resolve cycle */}
          {NODES.map((n, i) => {
            const Icon = n.icon;
            return (
              <div key={n.label} className="absolute" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
                <motion.div
                  animate={{
                    x: [0, 0, 0, 0, 0],
                    y: [0, -2, 0, 0, 0],
                    scale: [1, 1.05, 1, 1, 1],
                  }}
                  transition={{ duration: WINDOW, repeat: Infinity, times: TIMES, delay: -i * WINDOW, ease: "easeInOut" }}
                  className="pointer-events-auto relative flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-xl border border-white/12 bg-[#0a1a30]/60 px-3 py-2.5 shadow-[0_18px_40px_-18px_rgba(3,7,19,0.85)] backdrop-blur-md sm:gap-3 sm:px-4 sm:py-3"
                >
                  {/* scan ring */}
                  <motion.span
                    aria-hidden
                    animate={{ scale: [0.5, 0.5, 1.7, 1.7, 0.5], opacity: [0, 1, 0.5, 0, 0] }}
                    transition={{ duration: WINDOW, repeat: Infinity, times: [0, 0.18, 0.42, 0.6, 1], delay: -i * WINDOW, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-xl border border-[#22d3ee]/70"
                  />

                  {/* steady healthy pulse */}
                  <motion.span
                    aria-hidden
                    animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                    className="absolute inset-0 rounded-xl border border-[#38bdf8]/30"
                  />

                  <span aria-hidden className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center sm:h-10 sm:w-10" style={{ clipPath: HEX_CLIP, background: "linear-gradient(160deg,#0a6ed1,#0e2f52)" }}>
                    <Icon className="h-4 w-4 text-[#7ec8f7] sm:h-[18px] sm:w-[18px]" strokeWidth={1.8} />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[12px] font-semibold text-white sm:text-[13px]">{n.label}</span>
                    <span className="block text-[9px] text-white/45">{n.sub}</span>
                  </span>

                  {/* status LEDs: blue healthy → amber warning → green resolved */}
                  <span className="relative ml-1 flex h-3 w-3 items-center justify-center">
                    <motion.span
                      animate={{ opacity: [1, 0, 0, 0, 1] }}
                      transition={{ duration: WINDOW, repeat: Infinity, times: TIMES, delay: -i * WINDOW }}
                      className="absolute h-2.5 w-2.5 rounded-full bg-[#38bdf8]"
                      style={{ boxShadow: "0 0 8px #38bdf8" }}
                    />
                    <motion.span
                      animate={{ opacity: [0, 1, 0, 0, 0] }}
                      transition={{ duration: WINDOW, repeat: Infinity, times: TIMES, delay: -i * WINDOW }}
                      className="absolute h-2.5 w-2.5 rounded-full bg-[#f5a623]"
                      style={{ boxShadow: "0 0 8px #f5a623" }}
                    />
                    <motion.span
                      animate={{ opacity: [0, 0, 1, 1, 0] }}
                      transition={{ duration: WINDOW, repeat: Infinity, times: TIMES, delay: -i * WINDOW }}
                      className="absolute h-2.5 w-2.5 rounded-full bg-[#29ab87]"
                      style={{ boxShadow: "0 0 8px #29ab87" }}
                    />
                  </span>
                </motion.div>
              </div>
            );
          })}

          {/* telemetry baseline — monitoring pulse flows into the next section */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden sm:block">
            <svg className="absolute inset-x-0 bottom-3 h-6 w-full" viewBox="0 0 1000 24" preserveAspectRatio="none" fill="none">
              <path d="M0 20 C 80 6, 120 22, 200 12 S 320 18, 400 14 S 540 6, 620 16 S 780 22, 860 10 S 950 6, 1000 14" stroke="rgba(56,189,248,0.35)" strokeWidth={1.2} fill="none" />
              <circle r="3" fill="#67e8f9">
                <animateMotion dur="7s" repeatCount="indefinite" path="M0 20 C 80 6, 120 22, 200 12 S 320 18, 400 14 S 540 6, 620 16 S 780 22, 860 10 S 950 6, 1000 14" />
              </circle>
            </svg>
          </div>

          {/* upper signal band — fills the full canvas width */}
          <svg className="pointer-events-none absolute inset-x-0 top-2 hidden h-8 w-full md:block" viewBox="0 0 1000 32" preserveAspectRatio="none" fill="none">
            <path d="M0 16 C 100 8, 200 24, 300 14 S 520 6, 640 18 S 840 26, 1000 12" stroke="rgba(34,211,238,0.2)" strokeWidth={1} strokeDasharray="5 9" />
            <circle r="2.6" fill="#22d3ee" opacity={0.7}>
              <animateMotion dur="8s" begin="2s" repeatCount="indefinite" path="M0 16 C 100 8, 200 24, 300 14 S 520 6, 640 18 S 840 26, 1000 12" />
            </circle>
          </svg>
        </motion.div>
      </MotionConfig>
    </div>
  );
}
