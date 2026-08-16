"use client";

import { motion, MotionConfig, useScroll, useTransform } from "framer-motion";
import {
  Boxes,
  Landmark,
  PackageSearch,
  Users,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRef, useState } from "react";
import { HEX_CLIP } from "./scene-ui";
import { usePointerRotate } from "@/components/services/service-ui";

/* ─────────────────────────────────────────────────────────────
   SAP AI & Data Insights — ORGANIC 3D INTELLIGENCE FIELD
   Fragmented business data streams into a fluid intelligence
   field. Patterns emerge, similar data clusters, prediction
   paths branch outward — most fade, one strong path becomes the
   highlighted insight surface.
   ───────────────────────────────────────────────────────────── */

type Domain = {
  label: string;
  icon: LucideIcon;
  x: number;
  y: number;
  cx: number;
  cy: number;
  color: string;
};

const DOMAINS: Domain[] = [
  { label: "Finance", icon: Landmark, x: 150, y: 80, cx: 398, cy: 248, color: "#38bdf8" },
  { label: "Sales", icon: PackageSearch, x: 150, y: 200, cx: 492, cy: 252, color: "#22d3ee" },
  { label: "Customer", icon: Users, x: 150, y: 320, cx: 402, cy: 336, color: "#8b7cf6" },
  { label: "Operations", icon: Workflow, x: 150, y: 440, cx: 488, cy: 340, color: "#67e8f9" },
  { label: "Supply Chain", icon: Boxes, x: 520, y: 70, cx: 450, cy: 278, color: "#a78bfa" },
];

const pTo = (x: number, y: number, cx: number, cy: number) =>
  `M${x} ${y} C ${(x + cx) / 2} ${y}, ${(x + cx) / 2 + 10} ${cy - 14}, ${cx} ${cy}`;

const FIELDC = { x: 450, y: 300 };

const BRANCHES = [
  { d: "M505 292 C 600 210, 660 200, 735 190", color: "rgba(56,189,248,0.35)", strong: false },
  { d: "M505 308 C 620 372, 690 388, 742 402", color: "rgba(139,124,246,0.35)", strong: false },
  { d: "M505 300 C 620 300, 680 300, 742 300", color: "#2f8fff", strong: true },
  { d: "M505 296 C 580 150, 640 140, 720 140", color: "rgba(103,232,249,0.3)", strong: false },
];

const INSIGHT_LINE = "M736 384 L 764 336 L 792 356 L 822 292 L 852 314 L 882 246 L 912 268 L 936 238";

function Flow({ path, count, color, dur, offset = 0 }: { path: string; count: number; color: string; dur: number; offset?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <circle key={i} r={3} fill={color} opacity={0.8}>
          <animateMotion dur={`${dur}s`} begin={`-${(offset + i * (dur / count)) % dur}s`} repeatCount="indefinite" path={path} />
        </circle>
      ))}
    </>
  );
}

export default function AiPredictionField() {
  const { bind, reset, grabStart, grabEnd, rotateX, rotateY } = usePointerRotate(5);
  const [active, setActive] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.15]);

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
          {/* organic field backdrop */}
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(47,143,255,0.18), rgba(139,124,246,0.1) 40%, transparent 68%)" }} />
          <div
            className="pointer-events-none absolute inset-x-[-20%] bottom-[-16%] h-[64%] opacity-35"
            style={{
              backgroundImage:
                "linear-gradient(rgba(139,124,246,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(139,124,246,0.14) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              transform: "rotateX(62deg)",
              maskImage: "radial-gradient(ellipse 60% 70% at 50% 42%, black 26%, transparent 78%)",
              WebkitMaskImage: "radial-gradient(ellipse 60% 70% at 50% 42%, black 26%, transparent 78%)",
            }}
          />

          {/* ambient field particles */}
          {[
            { x: 30, y: 44 }, { x: 38, y: 56 }, { x: 46, y: 36 }, { x: 52, y: 60 }, { x: 42, y: 64 },
            { x: 36, y: 40 }, { x: 55, y: 46 }, { x: 48, y: 52 },
          ].map((p, i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute h-1 w-1 rounded-full"
              style={{ left: `${p.x}%`, top: `${p.y}%`, background: i % 2 ? "#22d3ee" : "#8b7cf6", boxShadow: `0 0 6px ${i % 2 ? "#22d3ee" : "#8b7cf6"}` }}
              animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.6, 1], y: [0, -10, 0] }}
              transition={{ duration: 4 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            />
          ))}

          <svg className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 1000 600" preserveAspectRatio="none" fill="none">
            {/* data streaming into the intelligence field */}
            {DOMAINS.map((d, i) => {
              const dim = active !== null && active !== i;
              return (
                <g key={d.label} opacity={dim ? 0.2 : 0.95} style={{ transition: "opacity 0.3s" }}>
                  <path d={pTo(d.x, d.y, d.cx, d.cy)} stroke={d.color} strokeOpacity={dim ? 0.08 : 0.24} strokeWidth={dim ? 1 : 1.4} strokeDasharray="4 6" />
                  <Flow path={pTo(d.x, d.y, d.cx, d.cy)} count={4} color={d.color} dur={6 + i * 0.5} offset={i * 1.1} />
                  <Flow path={pTo(d.x, d.y, d.cx, d.cy)} count={2} color="#a78bfa" dur={7} offset={i * 0.6} />
                </g>
              );
            })}

            {/* intelligence field */}
            <ellipse cx={FIELDC.x} cy={FIELDC.y} rx={150} ry={110} fill="rgba(47,143,255,0.06)" />
            <ellipse cx={FIELDC.x} cy={FIELDC.y} rx={150} ry={110} fill="none" stroke="rgba(47,143,255,0.4)" strokeWidth={1}>
              <animate attributeName="rx" values="150;182" dur="4s" repeatCount="indefinite" />
              <animate attributeName="ry" values="110;134" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0" dur="4s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx={FIELDC.x} cy={FIELDC.y} rx={150} ry={110} fill="none" stroke="rgba(139,124,246,0.35)" strokeWidth={1}>
              <animate attributeName="rx" values="150;182" dur="4s" begin="2s" repeatCount="indefinite" />
              <animate attributeName="ry" values="110;134" dur="4s" begin="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0" dur="4s" begin="2s" repeatCount="indefinite" />
            </ellipse>

            {/* prediction branches — most fade, one stays strong */}
            {BRANCHES.map((b, i) => (
              <g key={i}>
                <motion.path
                  d={b.d}
                  stroke={b.strong ? "#2f8fff" : b.color}
                  strokeWidth={b.strong ? 2 : 1}
                  strokeDasharray={b.strong ? "none" : "4 7"}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 1, 0] }}
                  transition={{ duration: 9, repeat: Infinity, times: [0, 0.5, 0.9, 1], delay: i * 0.4 }}
                  opacity={b.strong ? 1 : 0.6}
                />
                {b.strong && (
                  <>
                    <motion.path
                      d={b.d}
                      stroke="#67e8f9"
                      strokeWidth={1}
                      strokeDasharray="2 6"
                      opacity={0.9}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: [0, 1, 1, 0] }}
                      transition={{ duration: 9, repeat: Infinity, times: [0, 0.5, 0.9, 1], ease: "easeInOut" }}
                    />
                    <circle r="4" fill="#67e8f9">
                      <animateMotion dur="5s" begin="-1s" repeatCount="indefinite" path={b.d} />
                    </circle>
                    <circle r="8" fill="#2f8fff" opacity={0.14}>
                      <animateMotion dur="5s" begin="-1s" repeatCount="indefinite" path={b.d} />
                    </circle>
                  </>
                )}
              </g>
            ))}

            {/* insight surface */}
            <rect x={720} y={200} width={250} height={210} rx={18} fill="rgba(10,26,48,0.78)" stroke="rgba(139,124,246,0.4)" strokeWidth={1.2} />
            <text x={845} y={228} textAnchor="middle" fontSize={12} fontWeight={700} fill="#cdd8f8" style={{ fontFamily: "Poppins, sans-serif" }}>
              Predictive Insight
            </text>
            <circle cx={920} cy={214} r={3} fill="#22d3ee">
              <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
            </circle>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <rect key={i} x={736 + i * 26} y={404} width={16} rx={3} fill="#38bdf8">
                <animate attributeName="height" values="0;40;0" dur="4s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
                <animate attributeName="y" values="404;364;404" dur="4s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
              </rect>
            ))}
            <motion.path
              d={INSIGHT_LINE}
              stroke="#67e8f9"
              strokeWidth={2}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
            />
            <path d="M730 404 L 960 404" stroke="rgba(255,255,255,0.14)" strokeWidth={1} />

            {/* prediction line flowing into the next section */}
            <path d="M845 410 L 845 600" stroke="rgba(139,124,246,0.3)" strokeWidth={1.4} strokeDasharray="5 7" />
            <Flow path="M845 410 L 845 600" count={2} color="#a78bfa" dur={4} />
          </svg>

          {/* domain labels */}
          {DOMAINS.map((d, i) => {
            const Icon = d.icon;
            const on = active === i;
            return (
              <div key={d.label} className="absolute hidden md:block" style={{ left: `${(d.x / 1000) * 100}%`, top: `${(d.y / 600) * 100}%` }}>
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4.5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  className="pointer-events-auto flex -translate-x-1/2 -translate-y-1/2 cursor-default items-center gap-2 rounded-lg border px-2.5 py-1.5 backdrop-blur-md"
                  style={{
                    borderColor: on ? `${d.color}88` : "rgba(255,255,255,0.1)",
                    background: on ? `${d.color}22` : "rgba(0,0,0,0.4)",
                    boxShadow: on ? `0 0 22px ${d.color}55` : "none",
                  }}
                >
                  <span aria-hidden className="relative inline-flex h-7 w-7 items-center justify-center" style={{ clipPath: HEX_CLIP, background: `linear-gradient(160deg, ${d.color}, #0a6ed1)` }}>
                    <Icon className="h-3.5 w-3.5 text-white" strokeWidth={1.8} />
                  </span>
                  <span className="text-[11px] font-semibold text-white/80">{d.label}</span>
                </motion.div>
              </div>
            );
          })}

          {/* field caption */}
          <div className="pointer-events-none absolute left-1/2 top-[86%] hidden -translate-x-1/2 md:block">
            <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 backdrop-blur-md">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#8b7cf6] align-middle shadow-[0_0_8px_#8b7cf6]" />
              Data in · patterns · prediction
            </span>
          </div>
        </motion.div>
      </MotionConfig>
    </div>
  );
}
