"use client";

import { motion, MotionConfig, useScroll, useTransform } from "framer-motion";
import {
  BarChart3,
  Boxes,
  Cloud,
  Cpu,
  Database,
  FileText,
  HardDrive,
  Landmark,
  MonitorSmartphone,
  Package,
  Server,
  Settings2,
  Users,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRef, useState } from "react";
import { HEX_CLIP } from "./scene-ui";
import { usePointerRotate } from "@/components/services/service-ui";

/* ─────────────────────────────────────────────────────────────
   SAP Implementation — 3D ASSEMBLY / TRANSFORMATION
   Fragmented legacy blocks → blueprint scan → modules align →
   SAP architecture snaps together → data flows → success pulse.
   ───────────────────────────────────────────────────────────── */

const LOOP = 8;

type Module = {
  label: string;
  icon: LucideIcon;
  ax: number;
  ay: number;
  sx: number;
  sy: number;
  sr: number;
};

const MODULES: Module[] = [
  { label: "Finance", icon: Landmark, ax: 18, ay: 24, sx: -150, sy: -80, sr: -8 },
  { label: "CRM", icon: Users, ax: 72, ay: 22, sx: 170, sy: -90, sr: 7 },
  { label: "Automation", icon: Settings2, ax: 47, ay: 10, sx: 60, sy: -150, sr: 5 },
  { label: "Procurement", icon: Package, ax: 20, ay: 54, sx: -160, sy: 100, sr: 9 },
  { label: "Analytics", icon: BarChart3, ax: 70, ay: 52, sx: 150, sy: 100, sr: -6 },
  { label: "Fiori / UX", icon: MonitorSmartphone, ax: 86, ay: 34, sx: 215, sy: 10, sr: 6 },
  { label: "Integration", icon: Workflow, ax: 14, ay: 38, sx: -210, sy: -10, sr: -7 },
  { label: "Data Core", icon: Database, ax: 50, ay: 62, sx: 0, sy: 170, sr: 4 },
];

type Fragment = {
  label: string;
  icon: LucideIcon;
  x: number;
  y: number;
  sr: number;
};

const FRAGMENTS: Fragment[] = [
  { label: "Legacy core", icon: Server, x: 6, y: 16, sr: -10 },
  { label: "Paper flows", icon: FileText, x: 12, y: 42, sr: 8 },
  { label: "Scattered cloud", icon: Cloud, x: 3, y: 64, sr: -5 },
  { label: "Custom apps", icon: Boxes, x: 92, y: 14, sr: 9 },
  { label: "Siloed files", icon: HardDrive, x: 96, y: 50, sr: -8 },
  { label: "Siloed data", icon: Database, x: 88, y: 72, sr: 6 },
];

const SVG = (m: Module) => {
  const x = m.ax * 10;
  const y = m.ay * 6;
  return `M${x} ${y} C ${(x + 500) / 2} ${(y + 240) / 2 - 30}, ${(x + 500) / 2 + 20} ${(y + 240) / 2}, 498 238`;
};

export default function ImplementationAssembly() {
  const { bind, reset, grabStart, grabEnd, rotateX, rotateY } = usePointerRotate(5);
  const [active, setActive] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.15]);

  const moduleMotion = (i: number, m: Module) => ({
    x: [m.sx, 0, 0, m.sx] as number[],
    y: [m.sy, 0, 0, m.sy] as number[],
    opacity: [0, 1, 1, 0] as number[],
    scale: [0.55, 1, 1, 0.55] as number[],
    rotate: [m.sr, 0, 0, m.sr] as number[],
  });

  const transition = (i: number) => ({
    duration: LOOP,
    repeat: Infinity,
    ease: "easeInOut" as const,
    times: [0, 0.45, 0.88, 1] as number[],
    delay: -i * 0.45,
  });

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden"
      style={{ perspective: 1500, cursor: "grab" }}
      onPointerMove={bind}
      onPointerDown={grabStart}
      onPointerUp={grabEnd}
      onPointerLeave={reset}
      aria-hidden
    >
      <MotionConfig reducedMotion="user">
        <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d", opacity: fade }} className="relative h-full w-full">
          {/* blueprint grid floor */}
          <div
            className="pointer-events-none absolute inset-x-[-20%] bottom-[-18%] h-[70%] opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(rgba(56,189,248,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.14) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              transform: "rotateX(58deg)",
              maskImage: "radial-gradient(ellipse 60% 70% at 50% 40%, black 30%, transparent 78%)",
              WebkitMaskImage: "radial-gradient(ellipse 60% 70% at 50% 40%, black 30%, transparent 78%)",
            }}
          />

          {/* blueprint connectors (draw-in during architecture) */}
          <svg className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 1000 600" preserveAspectRatio="none" fill="none">
            {MODULES.map((m, i) => (
              <g key={m.label}>
                <motion.path
                  d={SVG(m)}
                  stroke={active === i ? "#7ec8f7" : "rgba(56,189,248,0.4)"}
                  strokeWidth={active === i ? 2 : 1.2}
                  strokeDasharray="5 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 0, 1, 1, 0] }}
                  transition={{ duration: LOOP, repeat: Infinity, times: [0, 0.3, 0.48, 0.9, 1], delay: -i * 0.45 }}
                  opacity={active === i ? 1 : 0.5}
                />
                {/* data packets once connected */}
                <circle r="4" fill="#67e8f9" opacity={0.85}>
                  <animateMotion dur={`${4.5 + i * 0.3}s`} begin={`-${i * 0.8}s`} repeatCount="indefinite" path={SVG(m)} />
                </circle>
                <circle r="8" fill="#38bdf8" opacity={0.12}>
                  <animateMotion dur={`${4.5 + i * 0.3}s`} begin={`-${i * 0.8}s`} repeatCount="indefinite" path={SVG(m)} />
                </circle>
              </g>
            ))}
          </svg>

          {/* scanning blueprint line */}
          <motion.div
            className="pointer-events-none absolute inset-x-[-6%] hidden h-10 md:block"
            style={{
              background: "linear-gradient(180deg, transparent, rgba(56,189,248,0.16), transparent)",
            }}
            animate={{ top: ["-5%", "-5%", "88%", "88%"], opacity: [0, 0.9, 0.9, 0] }}
            transition={{ duration: LOOP, repeat: Infinity, times: [0, 0.18, 0.42, 0.55], ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute left-1/2 hidden h-px w-40 -translate-x-1/2 md:block"
            style={{ background: "linear-gradient(90deg, transparent, #38bdf8, transparent)" }}
            animate={{ top: ["-5%", "-5%", "88%", "88%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: LOOP, repeat: Infinity, times: [0, 0.18, 0.42, 0.55], ease: "easeInOut" }}
          />

          {/* full-width data currents — edge to edge */}
          <svg className="pointer-events-none absolute inset-x-0 bottom-1 hidden h-10 w-full md:block" viewBox="0 0 1000 40" preserveAspectRatio="none" fill="none">
            <path d="M0 20 C 120 8, 240 32, 360 18 S 620 8, 740 24 S 900 12, 1000 18" stroke="rgba(56,189,248,0.22)" strokeWidth={1} strokeDasharray="6 8" />
            <circle r="3" fill="#38bdf8" opacity={0.75}>
              <animateMotion dur="9s" repeatCount="indefinite" path="M0 20 C 120 8, 240 32, 360 18 S 620 8, 740 24 S 900 12, 1000 18" />
            </circle>
            <circle r="2.4" fill="#22d3ee" opacity={0.7}>
              <animateMotion dur="11s" begin="4s" repeatCount="indefinite" path="M0 20 C 120 8, 240 32, 360 18 S 620 8, 740 24 S 900 12, 1000 18" />
            </circle>
          </svg>

          {/* SAP core node */}
          <div className="absolute" style={{ left: "50%", top: "40%", transform: "translate(-50%,-50%)" }}>
            <motion.div
              animate={{ scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
              transition={{ duration: LOOP, repeat: Infinity, times: [0, 0.45, 0.9, 1], delay: -0.45 }}
              className="relative flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20"
            >
              <span aria-hidden className="absolute inset-0 blur-lg" style={{ clipPath: HEX_CLIP, background: "rgba(47,143,255,0.5)", transform: "scale(1.4)" }} />
              <span className="relative flex h-full w-full items-center justify-center" style={{ clipPath: HEX_CLIP, background: "linear-gradient(160deg,#2f8fff,#0a6ed1)" }}>
                <Cpu className="h-7 w-7 text-white sm:h-8 sm:w-8" strokeWidth={1.6} />
              </span>
            </motion.div>
          </div>

          {/* success pulse through the completed architecture */}
          {[0, 0.5].map((delay) => (
            <motion.div
              key={delay}
              className="pointer-events-none absolute hidden h-40 w-40 rounded-full border border-[#67e8f9]/70 md:block"
              style={{ left: "50%", top: "40%", margin: "-5rem 0 0 -5rem" }}
              animate={{ scale: [0.3, 0.3, 1.7, 2.1], opacity: [0, 0, 0.7, 0] }}
              transition={{ duration: LOOP, repeat: Infinity, times: [0, 0.9, 0.96, 1], delay, ease: "easeOut" }}
            />
          ))}

          {/* legacy fragments — fade away as the landscape is assembled */}
          {FRAGMENTS.map((f, j) => {
            const Icon = f.icon;
            return (
              <div key={f.label} className="absolute hidden md:block" style={{ left: `${f.x}%`, top: `${f.y}%` }}>
                <motion.div
                  animate={{
                    x: [0, (50 - f.x) * 3.2, (50 - f.x) * 3.2, 0],
                    y: [0, (40 - f.y) * 3.2, (40 - f.y) * 3.2, 0],
                    opacity: [0.7, 0, 0, 0.7],
                    scale: [1, 0.5, 0.5, 1],
                    rotate: [f.sr, 0, 0, f.sr],
                  }}
                  transition={{ duration: LOOP, repeat: Infinity, ease: "easeInOut", times: [0, 0.42, 0.6, 1], delay: -j * 0.3 }}
                  className="flex -translate-x-1/2 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 backdrop-blur-sm"
                >
                  <Icon className="h-3.5 w-3.5 text-white/40" strokeWidth={1.6} />
                  <span className="text-[10px] font-medium text-white/35">{f.label}</span>
                </motion.div>
              </div>
            );
          })}

          {/* SAP modules assembling into position */}
          {MODULES.map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="absolute" style={{ left: `${m.ax}%`, top: `${m.ay}%` }}>
                <motion.div
                  animate={moduleMotion(i, m)}
                  transition={transition(i)}
                  className="pointer-events-auto"
                >
                  <motion.div
                    animate={{ y: active === i ? -8 : 0, scale: active === i ? 1.08 : 1, z: active === i ? 40 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    className="flex -translate-x-1/2 -translate-y-1/2 cursor-default items-center gap-2 rounded-xl border border-white/15 bg-white/[0.07] px-2.5 py-2 shadow-[0_18px_40px_-18px_rgba(3,7,19,0.8)] backdrop-blur-md sm:gap-2.5 sm:px-3.5 sm:py-2.5"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <span
                      aria-hidden
                      className="relative inline-flex h-7 w-7 shrink-0 items-center justify-center sm:h-9 sm:w-9"
                      style={{ clipPath: HEX_CLIP, background: "linear-gradient(160deg,#38bdf8,#0a6ed1)" }}
                    >
                      <Icon className="h-3.5 w-3.5 text-white sm:h-[17px] sm:w-[17px]" strokeWidth={1.8} />
                      {active === i && <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#67e8f9] shadow-[0_0_10px_#67e8f9]" />}
                    </span>
                    <span className="text-[11px] font-semibold text-white/85 sm:text-[12px]">{m.label}</span>
                  </motion.div>
                </motion.div>
              </div>
            );
          })}

          {/* stage caption — tiny, floating, part of the story */}
          <div className="pointer-events-none absolute inset-x-0 bottom-2 hidden items-center justify-center gap-3 sm:flex">
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#38bdf8", boxShadow: "0 0 8px #38bdf8" }} />
              Assembly in progress
            </span>
          </div>
        </motion.div>
      </MotionConfig>
    </div>
  );
}
