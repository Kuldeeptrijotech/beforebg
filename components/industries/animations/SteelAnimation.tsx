"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  Check,
  Factory,
  Flame,
  Gauge,
  HardHat,
  Layers,
  Percent,
  ShieldCheck,
  Sparkles,
  Thermometer,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";
import IndustryHeroStage from "./IndustryHeroStage";

const KPIS = [
  { value: "94.6%", label: "Melting Yield Efficiency", color: "#117a4b" },
  { value: "99.98%", label: "Steel Metallurgy Purity", color: "#29ab87" },
  { value: "0 LTI", label: "Incident-Free Safety Record", color: "#f5a623" },
];

export default function SteelAnimation() {
  const reduce = useReducedMotion();
  const [bathTemp, setBathTemp] = useState(1640);

  useEffect(() => {
    const interval = setInterval(() => {
      setBathTemp(1640 + Math.floor(Math.random() * 8 - 4));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <IndustryHeroStage
      videoSrc="/videos/steel-manufacturing-sap.mp4"
      poster="/videos/steel-manufacturing-sap-poster.jpg"
      caption="SAP links steel production to profitability"
      sub="electric arc melting · continuous casting · hot rolling · energy optimization"
      kpis={KPIS}
      accentColor="#f5a623"
    >
      <div className="relative h-full w-full overflow-hidden select-none">
        {/* ── Molten Heat Wave & Continuous Casting Roller Rails ── */}
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full opacity-65"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <defs>
            <linearGradient id="steelMoltenRiver" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f5a623" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#ff7828" stopOpacity="1" />
              <stop offset="100%" stopColor="#c2410c" stopOpacity="0.8" />
            </linearGradient>
            <filter id="steelGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Heavy Ingot / Continuous Casting Stream */}
          <path
            d="M 140 460 C 380 460, 520 340, 720 340 S 1060 460, 1300 460"
            stroke="url(#steelMoltenRiver)"
            strokeWidth="4"
            strokeDasharray="12 8"
            opacity="0.65"
          />

          {/* Heavy Mill Pressure Roller Gears */}
          {[260, 420, 580, 720, 860, 1020, 1180].map((x) => (
            <g key={x} opacity="0.45">
              <circle cx={x} cy={445} r="16" stroke="#f5a623" strokeWidth="2" fill="#030713" />
              <circle cx={x} cy={475} r="16" stroke="#f5a623" strokeWidth="2" fill="#030713" />
              <line x1={x - 10} y1={460} x2={x + 10} y2={460} stroke="#ff7828" strokeWidth="3" />
            </g>
          ))}

          {/* Flowing Molten Ember Packets */}
          <circle r="7" fill="#ff7828" filter="url(#steelGlow)">
            <animateMotion
              dur="7s"
              repeatCount="indefinite"
              path="M 140 460 C 380 460, 520 340, 720 340 S 1060 460, 1300 460"
            />
          </circle>
          <circle r="5.5" fill="#f5a623" filter="url(#steelGlow)">
            <animateMotion
              dur="7s"
              begin="3.5s"
              repeatCount="indefinite"
              path="M 140 460 C 380 460, 520 340, 720 340 S 1060 460, 1300 460"
            />
          </circle>
        </svg>

        {/* ── Left Side: EAF Melting Furnace Telemetry ── */}
        <div className="absolute left-[4%] top-[14%] sm:left-[7%] max-w-[340px] z-20">
          <div className="rounded-2xl border border-white/10 bg-[#030713]/85 p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c2410c]/20 border border-[#f5a623]/40 text-[#f5a623]">
                  <Flame className="h-5 w-5 animate-pulse text-[#ff7828]" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white">Electric Arc Furnace #02</p>
                  <p className="text-[9px] text-white/50">Heat Charge #H-8402 (120T)</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-[#ff7828]" suppressHydrationWarning>
                <Thermometer className="h-3 w-3" /> {bathTemp}°C
              </span>
            </div>

            <div className="mt-3 space-y-2">
              <div className="rounded-lg bg-white/[0.03] border border-white/5 p-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/70">Melt Yield</span>
                  <span className="font-mono font-bold text-[#29ab87]">94.6% [OPTIMAL]</span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[94.6%] bg-gradient-to-r from-[#c2410c] to-[#f5a623]" />
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-white/70 px-1">
                <span>Power: 84.2 MW</span>
                <span className="font-semibold text-[#29ab87]">Zero Energy Spikes</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Center: 3D SAP S/4HANA Heavy Plant Operations Core ── */}
        <div className="absolute left-1/2 top-[12%] -translate-x-1/2 z-20 flex flex-col items-center">
          <motion.div
            animate={reduce ? {} : { scale: [1, 1.03, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-[#f5a623]/50 bg-gradient-to-br from-[#c2410c] via-[#030713] to-[#f5a623]/40 shadow-[0_0_60px_rgba(245,166,35,0.4)] backdrop-blur-xl"
          >
            <Factory className="h-12 w-12 text-white drop-shadow-[0_0_15px_#f5a623]" />
          </motion.div>

          <div className="mt-3 rounded-full border border-white/15 bg-black/70 px-4 py-1 backdrop-blur-md">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#f5a623]">
              SAP S/4HANA & BW Steel Operations
            </span>
          </div>
        </div>

        {/* ── Right Side: Continuous Caster Metallurgy Lab ── */}
        <div className="absolute right-[4%] top-[14%] sm:right-[7%] max-w-[340px] z-20">
          <div className="rounded-2xl border border-white/10 bg-[#030713]/85 p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#29ab87]/20 border border-[#29ab87]/40 text-[#29ab87]">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white">Metallurgy Quality Lab</p>
                  <p className="text-[9px] text-white/50">Caster Speed: 1.8 m/min</p>
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="flex items-center justify-between text-white/80">
                <span>Steel Purity Analysis</span>
                <span className="font-mono font-bold text-[#29ab87]">99.98% GRADE A+</span>
              </div>
              <div className="flex items-center justify-between text-white/80">
                <span>Plant Safety Record</span>
                <span className="font-bold text-[#f5a623]">0 LTI (Zero Harm)</span>
              </div>
              <div className="rounded-lg bg-[#f5a623]/15 border border-[#f5a623]/30 p-2 text-center text-[10px] font-bold text-[#f5a623]">
                ✓ Energy Balanced · Scheduled Hot Rolling Dispatch
              </div>
            </div>
          </div>
        </div>
      </div>
    </IndustryHeroStage>
  );
}
