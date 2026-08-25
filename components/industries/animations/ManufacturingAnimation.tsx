"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  Boxes,
  CheckCircle,
  Cog,
  Cpu,
  Factory,
  Gauge,
  Scan,
  ShieldAlert,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";
import IndustryHeroStage from "./IndustryHeroStage";

const KPIS = [
  { value: "93.4%", label: "Overall OEE", color: "#ffffff" },
  { value: "99.98%", label: "Process Uptime", color: "#ffffff" },
  { value: "-6.8%", label: "Scrap Reduction", color: "#ffffff" },
];

export default function ManufacturingAnimation() {
  const reduce = useReducedMotion();
  const [cycleTime, setCycleTime] = useState(4.2);
  const [oee, setOee] = useState(93.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setCycleTime((prev) => +(4.2 + (Math.random() * 0.4 - 0.2)).toFixed(2));
      setOee((prev) => +(93.4 + (Math.random() * 0.6 - 0.3)).toFixed(1));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <IndustryHeroStage
      videoSrc="/videos/manufacturing-sap.mp4"
      poster="/videos/manufacturing-sap-poster.jpg"
      caption="SAP connects finance to the shop floor"
      sub="planning · robotic assembly · computer vision quality · OEE analytics"
      kpis={KPIS}
      accentColor="#38bdf8"
    >
      <div className="relative h-full w-full overflow-hidden select-none">
        {/* ── Industrial Assembly Floor & Robotic Kinematic Grid ── */}
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full opacity-65"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <defs>
            <linearGradient id="mfgLaserBeam" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
            </linearGradient>
            <filter id="mfgSparkGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Stepped Automated Production Rails */}
          <path
            d="M 120 440 L 460 440 L 580 320 L 920 320 L 1040 440 L 1340 440"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeDasharray="10 6"
            strokeOpacity="0.5"
          />

          {/* Connected Sensor Nodes Along Assembly Line */}
          {[200, 340, 460, 580, 720, 840, 920, 1040, 1180].map((x, i) => (
            <g key={x}>
              <circle
                cx={x}
                cy={x >= 580 && x <= 920 ? 320 : 440}
                r="6"
                fill="#030713"
                stroke="#38bdf8"
                strokeWidth="2"
              />
              <circle
                cx={x}
                cy={x >= 580 && x <= 920 ? 320 : 440}
                r="2"
                fill="#ffffff"
              />
            </g>
          ))}

          {/* Fast Flowing Production Data Packets */}
          <circle r="6" fill="#38bdf8" filter="url(#mfgSparkGlow)">
            <animateMotion
              dur="8s"
              repeatCount="indefinite"
              path="M 120 440 L 460 440 L 580 320 L 920 320 L 1040 440 L 1340 440"
            />
          </circle>
          <circle r="4.5" fill="#ffffff" filter="url(#mfgSparkGlow)">
            <animateMotion
              dur="8s"
              begin="4s"
              repeatCount="indefinite"
              path="M 120 440 L 460 440 L 580 320 L 920 320 L 1040 440 L 1340 440"
            />
          </circle>

          {/* Vision Inspection Scanner Sweep */}
          <line x1="880" y1="200" x2="880" y2="440" stroke="url(#mfgLaserBeam)" strokeWidth="3" filter="url(#mfgSparkGlow)">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" />
          </line>
        </svg>

        {/* ── Left Side: 5-Axis CNC & Real-Time OEE Telemetry Dial ── */}
        <div className="absolute left-[4%] top-[14%] sm:left-[7%] max-w-[340px] z-20">
          <div className="rounded-2xl border border-white/10 bg-[#030713]/85 p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0284c7]/20 border border-[#38bdf8]/40 text-[#38bdf8]">
                  <Cog className="h-5 w-5 animate-[spin_6s_linear_infinite]" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white">CNC Machining Center</p>
                  <p className="text-[9px] text-white/50">Spindle Station #04</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-[#38bdf8]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] animate-ping" /> 18,500 RPM
              </span>
            </div>

            <div className="mt-3.5 space-y-2.5">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/70">Overall OEE</span>
                  <span className="font-mono font-extrabold text-white" suppressHydrationWarning>{oee}%</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#0284c7] via-[#38bdf8] to-[#ffffff]" style={{ width: `${oee}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="rounded-lg bg-white/[0.03] border border-white/5 p-2 text-center">
                  <p className="text-[9px] text-white/50">Cycle Time</p>
                  <p className="text-xs font-mono font-bold text-white" suppressHydrationWarning>{cycleTime}s</p>
                </div>
                <div className="rounded-lg bg-white/[0.03] border border-white/5 p-2 text-center">
                  <p className="text-[9px] text-white/50">Thermal Load</p>
                  <p className="text-xs font-mono font-bold text-[#38bdf8]">62.4°C [OK]</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Center: 3-Joint Robotic Welding Arm & Central SAP MES Core ── */}
        <div className="absolute left-1/2 top-[12%] -translate-x-1/2 z-20 flex flex-col items-center">
          <motion.div
            animate={reduce ? {} : { rotate: [0, 4, 0, -4, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-[#38bdf8]/40 bg-gradient-to-b from-[#0369a1] via-[#030713] to-[#38bdf8]/30 shadow-[0_0_60px_rgba(56,189,248,0.4)] backdrop-blur-xl"
          >
            <Factory className="h-12 w-12 text-white drop-shadow-[0_0_15px_#38bdf8]" />
            <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-white animate-bounce" />
          </motion.div>

          <div className="mt-3 rounded-full border border-white/15 bg-black/70 px-4 py-1 backdrop-blur-md">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#38bdf8]">
              SAP S/4HANA MES & Digital Twin
            </span>
          </div>
        </div>

        {/* ── Right Side: Computer Vision Quality Gate ── */}
        <div className="absolute right-[4%] top-[14%] sm:right-[7%] max-w-[340px] z-20">
          <div className="rounded-2xl border border-white/10 bg-[#030713]/85 p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 border border-white/40 text-white">
                  <Scan className="h-5 w-5 animate-pulse" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white">AI Vision Quality Gate</p>
                  <p className="text-[9px] text-white/50">Laser Tolerance: ±0.002mm</p>
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="flex items-center justify-between text-white/80">
                <span>Tolerance Inspection</span>
                <span className="font-mono font-bold text-white">0.000mm [PERFECT]</span>
              </div>
              <div className="flex items-center justify-between text-white/80">
                <span>Defect Scrap Rate</span>
                <span className="font-mono font-bold text-white">&lt; 0.02%</span>
              </div>
              <div className="rounded-lg bg-white/15 border border-white/30 p-2 text-center text-[10px] font-bold text-white">
                ✓ Autonomous Mobile Robot (AMR) Routed to Dispatch
              </div>
            </div>
          </div>
        </div>
      </div>
    </IndustryHeroStage>
  );
}
