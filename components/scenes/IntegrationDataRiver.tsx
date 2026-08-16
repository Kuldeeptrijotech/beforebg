"use client";

import { motion, MotionConfig, useScroll, useTransform } from "framer-motion";
import {
  BarChart3,
  Building2,
  Cloud,
  Database,
  FileText,
  HardDrive,
  Layers,
  Server,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRef, useState } from "react";
import { HEX_CLIP } from "./scene-ui";
import { usePointerRotate } from "@/components/services/service-ui";

/* ─────────────────────────────────────────────────────────────
   SAP Data Integration — 3D DATA RIVER / DATA TUNNEL
   Sources release streams that twist through 3D space into a
   central integration / transformation layer, then re-emerge as
   clean, organised flows toward SAP and analytics. Streams are
   made of small data blocks, rows and tokens — never telecom
   signals.
   ───────────────────────────────────────────────────────────── */

type Source = {
  label: string;
  sub: string;
  icon: LucideIcon;
  x: number;
  y: number;
  color: string;
  path: string;
};

const toIn = (y: number, t: number) => `M230 ${y} C 320 ${y}, 340 ${t}, 400 ${t}`;
const toIn2 = (y: number, t: number) => `M355 ${y} C 378 ${(y + t) / 2}, 388 ${(y + t) / 2}, 400 ${t}`;

const SOURCES: Source[] = [
  { label: "ERP / S/4HANA", sub: "transactional core", icon: Server, x: 9, y: 12, color: "#38bdf8", path: toIn(72, 220) },
  { label: "CRM", sub: "customer data", icon: Users, x: 9, y: 44, color: "#22d3ee", path: toIn(264, 280) },
  { label: "Legacy", sub: "mainframe · files", icon: HardDrive, x: 9, y: 76, color: "#f5a623", path: toIn(456, 340) },
  { label: "Files & Docs", sub: "sheets · documents", icon: FileText, x: 22, y: 12, color: "#67e8f9", path: toIn2(72, 220) },
  { label: "Cloud SaaS", sub: "third-party apps", icon: Cloud, x: 22, y: 44, color: "#38bdf8", path: toIn2(264, 280) },
  { label: "Databases", sub: "data warehouses", icon: Database, x: 22, y: 76, color: "#f5a623", path: toIn2(456, 340) },
];

const TARGETS = [
  { label: "SAP S/4HANA", sub: "single source of truth", icon: Building2, color: "#38bdf8", path: "M540 220 C 620 180, 660 140, 760 120" },
  { label: "Analytics / BW", sub: "insight & reporting", icon: BarChart3, color: "#67e8f9", path: "M540 280 C 640 285, 680 285, 800 285" },
  { label: "Data Platform", sub: "lake · warehouse", icon: Layers, color: "#a78bfa", path: "M540 340 C 630 380, 680 430, 770 460" },
];

function Blocks({
  path,
  count,
  color,
  dur = 6,
  size = 10,
  offset = 0,
}: {
  path: string;
  count: number;
  color: string;
  dur?: number;
  size?: number;
  offset?: number;
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <rect key={i} x={-size / 2} y={-2} width={size} height={4} rx={2} fill={color} opacity={0.9}>
          <animateMotion dur={`${dur}s`} begin={`-${(offset + i * (dur / count)) % dur}s`} repeatCount="indefinite" path={path} />
        </rect>
      ))}
    </>
  );
}

export default function IntegrationDataRiver() {
  const { bind, reset, grabStart, grabEnd, rotateX, rotateY } = usePointerRotate(4);
  const [active, setActive] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.15]);

  const current = pinned ?? active;

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
          {/* grid floor */}
          <div
            className="pointer-events-none absolute inset-x-[-20%] bottom-[-18%] h-[66%] opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(56,189,248,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.12) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              transform: "rotateX(62deg)",
              maskImage: "radial-gradient(ellipse 60% 70% at 50% 42%, black 28%, transparent 76%)",
              WebkitMaskImage: "radial-gradient(ellipse 60% 70% at 50% 42%, black 28%, transparent 76%)",
            }}
          />

          {/* drifting ambient tokens */}
          {[
            { x: "18%", y: "20%", d: 8 },
            { x: "30%", y: "60%", d: 12 },
            { x: "68%", y: "24%", d: 9 },
            { x: "82%", y: "62%", d: 11 },
            { x: "55%", y: "82%", d: 8 },
          ].map((t, i) => (
            <motion.div
              key={i}
              className="pointer-events-none absolute h-1 w-4 rounded-full bg-[#67e8f9]/30"
              style={{ left: t.x, top: t.y }}
              animate={{ y: [0, -46, 0], x: [0, 6, 0], opacity: [0.15, 0.5, 0.15] }}
              transition={{ duration: 7 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
            />
          ))}

          {/* streams */}
          <svg className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 1000 600" preserveAspectRatio="none" fill="none">
            {/* inbound streams */}
            {SOURCES.map((s, i) => {
              const dim = current !== null && current !== i;
              return (
                <g key={s.label} opacity={dim ? 0.22 : 1} style={{ transition: "opacity 0.3s" }}>
                  <path d={s.path} stroke={s.color} strokeWidth={dim ? 1 : 1.6} strokeOpacity={0.32} strokeDasharray="5 7" />
                  <Blocks path={s.path} count={3} color={s.color} dur={5 + i * 0.4} offset={i * 1.2} />
                  <Blocks path={s.path} count={2} color="#67e8f9" dur={6 + i * 0.3} size={5} offset={i * 1.8} />
                </g>
              );
            })}

            {/* integration / transformation layer */}
            <rect x={400} y={180} width={140} height={200} rx={18} fill="rgba(10,26,48,0.78)" stroke="rgba(56,189,248,0.45)" strokeWidth={1.2} />
            <rect x={400} y={180} width={140} height={200} rx={18} fill="url(#diShine)" opacity={0.5} />
            <defs>
              <linearGradient id="diShine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#38bdf8" stopOpacity="0.5" />
                <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
                <animate attributeName="y1" values="0;1" dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="y2" values="0.2;1" dur="2.6s" repeatCount="indefinite" />
              </linearGradient>
            </defs>

            <text x={470} y={216} textAnchor="middle" fontSize={13} fontWeight={700} fill="#7ec8f7" style={{ fontFamily: "Poppins, sans-serif" }}>
              Integration
            </text>
            <text x={470} y={232} textAnchor="middle" fontSize={9} fontWeight={600} fill="rgba(148,187,220,0.6)" style={{ fontFamily: "Poppins, sans-serif" }}>
              transform · map · orchestrate
            </text>

            {[0, 1, 2].map((r) => (
              <g key={r}>
                <rect x={420} y={252 + r * 30} width={100} height={3} rx={1.5} fill="rgba(56,189,248,0.28)">
                  <animate attributeName="width" values="60;104;60" dur="3s" begin={`${r * 0.8}s`} repeatCount="indefinite" />
                </rect>
                <rect x={420} y={252 + r * 30} width={36} height={3} rx={1.5} fill="#67e8f9">
                  <animateMotion dur={`${3 + r}s`} begin={`-${r * 0.7}s`} repeatCount="indefinite" path={`M420 ${258 + r * 30} L 520 ${258 + r * 30}`} />
                </rect>
              </g>
            ))}

            {/* clean outflow streams */}
            {TARGETS.map((t, i) => {
              const dim = current !== null;
              return (
                <g key={t.label} opacity={dim ? 0.45 : 1} style={{ transition: "opacity 0.3s" }}>
                  <path d={t.path} stroke={t.color} strokeOpacity={0.3} strokeWidth={1.4} strokeDasharray="4 6" />
                  <Blocks path={t.path} count={3} color={t.color} dur={4.6 + i * 0.5} size={13} offset={i * 1.4} />
                  <Blocks path={t.path} count={2} color="#22d3ee" dur={5.6} size={6} offset={i * 0.9} />
                </g>
              );
            })}

            {/* stream flowing toward the next section */}
            <path d="M470 380 L 470 600" stroke="rgba(103,232,249,0.3)" strokeWidth={1.4} strokeDasharray="5 7" />
            <Blocks path="M470 380 L 470 600" count={2} color="#67e8f9" dur={4} size={12} />
          </svg>

          {/* source chips */}
          {SOURCES.map((s, i) => {
            const Icon = s.icon;
            const on = current === i;
            return (
              <div key={s.label} className="absolute" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
                <div
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => {
                    if (pinned === null) setActive(null);
                  }}
                  onClick={() => {
                    setPinned((p) => (p === i ? null : i));
                    setActive(i);
                  }}
                  className="pointer-events-auto flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 backdrop-blur-md transition-all duration-300"
                  style={{
                    borderColor: on ? `${s.color}88` : "rgba(255,255,255,0.12)",
                    background: on ? `linear-gradient(160deg, ${s.color}26, rgba(10,26,48,0.7))` : "rgba(10,26,48,0.55)",
                    boxShadow: on ? `0 0 30px ${s.color}44` : "0 18px 40px -18px rgba(3,7,19,0.8)",
                    opacity: current !== null && !on ? 0.45 : 1,
                  }}
                >
                  <span aria-hidden className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center sm:h-9 sm:w-9" style={{ clipPath: HEX_CLIP, background: `linear-gradient(160deg, ${s.color}dd, #0a6ed1)` }}>
                    <Icon className="h-4 w-4 text-white" strokeWidth={1.8} />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[12px] font-semibold text-white">{s.label}</span>
                    <span className="block text-[9px] text-white/45">{s.sub}</span>
                  </span>
                </div>
              </div>
            );
          })}

          {/* target chips */}
          <div className="pointer-events-none absolute right-[4%] top-[8%] hidden items-end gap-3 lg:flex">
            {TARGETS.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.label} className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-md">
                  <Icon className="h-5 w-5" style={{ color: t.color }} strokeWidth={1.7} />
                  <span className="text-[10px] font-semibold text-white/80">{t.label}</span>
                </div>
              );
            })}
          </div>

          {/* floating hint */}
          <div className="pointer-events-none absolute right-6 top-5 hidden rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white/40 backdrop-blur-md md:block">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#67e8f9] align-middle shadow-[0_0_8px_#67e8f9]" />
            Sources → integration → SAP
          </div>
        </motion.div>
      </MotionConfig>
    </div>
  );
}
