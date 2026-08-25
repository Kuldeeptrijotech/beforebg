"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  Globe,
  Radio,
  RadioTower,
  Server,
  Signal,
  Smartphone,
  Wifi,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";
import IndustryHeroStage from "./IndustryHeroStage";

const KPIS = [
  { value: "4.2ms", label: "Data Plane Latency", color: "#ffffff" },
  { value: "120k/s", label: "CDR Mediation Rate", color: "#ffffff" },
  { value: "1.4 Gbps", label: "5G Peak Throughput", color: "#ffffff" },
];

export default function TelecomAnimation() {
  const reduce = useReducedMotion();
  const [cdrRate, setCdrRate] = useState(120480);

  useEffect(() => {
    const interval = setInterval(() => {
      setCdrRate(120000 + Math.floor(Math.random() * 1200 - 600));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <IndustryHeroStage
      videoSrc="/videos/telecommunications-sap.mp4"
      poster="/videos/telecommunications-sap-poster.jpg"
      caption="SAP unifies telecom operations end to end"
      sub="5G network slicing · CDR mediation · convergent billing · subscriber analytics"
      kpis={KPIS}
      accentColor="#2f8fff"
    >
      <div className="relative h-full w-full overflow-hidden select-none">
        {/* ── 5G Massive MIMO Microwave Radar Rings & Fiber Grid ── */}
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full opacity-65"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <defs>
            <linearGradient id="telecomBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2f8fff" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
            </linearGradient>
            <filter id="telecomGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Radiating 5G High-Frequency Microwave Wavefronts */}
          {[140, 220, 300, 380, 460].map((r, i) => (
            <circle
              key={r}
              cx="720"
              cy="340"
              r={r}
              stroke="#2f8fff"
              strokeWidth="1.5"
              strokeDasharray="4 8"
              opacity={0.35 - i * 0.06}
            >
              <animate
                attributeName="r"
                values={`${r};${r + 80};${r}`}
                dur="7s"
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* High-Speed Optical Backhaul Waveguides */}
          <path
            d="M 120 460 Q 420 300 720 460 T 1320 460"
            stroke="url(#telecomBeam)"
            strokeWidth="3"
            strokeDasharray="8 6"
            opacity="0.6"
          />

          {/* Flowing High-Density CDR Packets */}
          <circle r="6" fill="#38bdf8" filter="url(#telecomGlow)">
            <animateMotion
              dur="7.5s"
              repeatCount="indefinite"
              path="M 120 460 Q 420 300 720 460 T 1320 460"
            />
          </circle>
          <circle r="4.5" fill="#ffffff" filter="url(#telecomGlow)">
            <animateMotion
              dur="7.5s"
              begin="3.75s"
              repeatCount="indefinite"
              path="M 120 460 Q 420 300 720 460 T 1320 460"
            />
          </circle>
        </svg>

        {/* ── Left Side: 5G RAN & Ultra-Low Latency Telemetry ── */}
        <div className="absolute left-[4%] top-[14%] sm:left-[7%] max-w-[340px] z-20">
          <div className="rounded-2xl border border-white/10 bg-[#030713]/85 p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0284c7]/20 border border-[#2f8fff]/40 text-[#38bdf8]">
                  <RadioTower className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white">5G Massive MIMO RAN</p>
                  <p className="text-[9px] text-white/50">Band: n78 (3.5 GHz 100MHz)</p>
                </div>
              </div>
              <span className="flex h-2 w-2 rounded-full bg-[#38bdf8] animate-ping" />
            </div>

            <div className="mt-3 space-y-2">
              <div className="rounded-lg bg-white/[0.03] border border-white/5 p-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/70">Peak Throughput</span>
                  <span className="font-mono font-bold text-[#38bdf8]">1.4 Gbps</span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[94%] bg-gradient-to-r from-[#0284c7] via-[#2f8fff] to-[#38bdf8]" />
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-white/70 px-1">
                <span>Data Latency: 4.2ms</span>
                <span className="font-semibold text-white">URLLC Sliced</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Center: 3D SAP BTP Convergent Mediation & Rating Core ── */}
        <div className="absolute left-1/2 top-[12%] -translate-x-1/2 z-20 flex flex-col items-center">
          <motion.div
            animate={reduce ? {} : { scale: [1, 1.03, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-[#2f8fff]/50 bg-gradient-to-br from-[#0369a1] via-[#030713] to-[#2f8fff]/40 shadow-[0_0_60px_rgba(47,143,255,0.4)] backdrop-blur-xl"
          >
            <Server className="h-12 w-12 text-white drop-shadow-[0_0_15px_#38bdf8]" />
          </motion.div>

          <div className="mt-3 rounded-full border border-white/15 bg-black/70 px-4 py-1 backdrop-blur-md">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#38bdf8]">
              SAP BTP Convergent Billing Engine
            </span>
          </div>
        </div>

        {/* ── Right Side: CDR Mediation Pipeline Telemetry ── */}
        <div className="absolute right-[4%] top-[14%] sm:right-[7%] max-w-[340px] z-20">
          <div className="rounded-2xl border border-white/10 bg-[#030713]/85 p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 border border-white/40 text-white">
                  <Smartphone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white">Live CDR Mediation</p>
                  <p className="text-[9px] text-white/50">Voice · 5G Data · Roaming</p>
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="flex items-center justify-between text-white/80">
                <span>Ingestion Velocity</span>
                <span className="font-mono font-bold text-white" suppressHydrationWarning>
                  {cdrRate.toLocaleString("en-US")} CDRs/s
                </span>
              </div>
              <div className="flex items-center justify-between text-white/80">
                <span>Packet Drop Rate</span>
                <span className="font-mono font-bold text-[#38bdf8]">0.000% (Zero Loss)</span>
              </div>
              <div className="rounded-lg bg-[#2f8fff]/15 border border-[#2f8fff]/30 p-2 text-center text-[10px] font-bold text-[#38bdf8]">
                ✓ Dynamic Slice Allocation · Roaming Settled
              </div>
            </div>
          </div>
        </div>
      </div>
    </IndustryHeroStage>
  );
}
