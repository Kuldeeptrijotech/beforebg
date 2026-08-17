"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  Check,
  ChevronRight,
  Code2,
  Compass,
  Cpu,
  Database,
  Layers,
  Maximize2,
  Play,
  Rocket,
  Ruler,
  Scan,
  Server,
  Sparkles,
  Target,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   SAP IMPLEMENTATION — ARCHITECTURAL CAD BLUEPRINT &
   LASER GANTRY SCANNING SYSTEM
   ───────────────────────────────────────────────────────────── */

type StepData = {
  step: string;
  name: string;
  desc: string;
  coords: string;
  color: string;
  modules: string[];
  metrics: { label: string; val: string };
};

const BLUEPRINT_STEPS: StepData[] = [
  {
    step: "01",
    name: "Architectural Scope & Fit-to-Standard",
    desc: "Laser mapping enterprise business processes to standard SAP best practices with zero core modifications.",
    coords: "LAT 42.88° N · GRID A-01",
    color: "#38bdf8",
    modules: ["Process Hierarchy", "Clean-Core Scope", "Security Roles", "Target Architecture"],
    metrics: { label: "Standard Fit Score", val: "100% GxP/ISO Ready" },
  },
  {
    step: "02",
    name: "Clean Core Baseline Configuration",
    desc: "Constructing modular S/4HANA enterprise ledgers, procurement engines, and side-by-side BTP extension points.",
    coords: "LAT 54.12° N · GRID B-04",
    color: "#22d3ee",
    modules: ["FI/CO Universal Ledger", "Order-to-Cash (SD)", "Procure-to-Pay (MM)", "BTP Microservices"],
    metrics: { label: "Configuration Build", val: "340+ Best Practices" },
  },
  {
    step: "03",
    name: "Automated Migration Cockpit & UAT",
    desc: "Executing automated dual-run simulations, data cleansing pipelines, and end-to-end dress rehearsal testing.",
    coords: "LAT 68.45° N · GRID C-08",
    color: "#8b7cf6",
    modules: ["Data Cleansing", "Automated Cutover", "Regression CI/CD", "Security Hardening"],
    metrics: { label: "Migration Accuracy", val: "99.99% Validated" },
  },
  {
    step: "04",
    name: "Zero-Downtime Production Go-Live",
    desc: "Switching active transaction streams over to the high-availability S/4HANA production cluster.",
    coords: "LAT 82.30° N · GRID D-12",
    color: "#29ab87",
    modules: ["Production Switchover", "Hypercare 24/7", "User Enablement", "Value Realization"],
    metrics: { label: "Go-Live Downtime", val: "Zero Disruption" },
  },
];

export default function ImplementationAssembly() {
  const reduce = useReducedMotion();
  const [currentStep, setCurrentStep] = useState(0);
  const [isScanning, setIsScanning] = useState(true);
  const [scanPos, setScanPos] = useState(25);

  const active = BLUEPRINT_STEPS[currentStep];

  useEffect(() => {
    if (!isScanning) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % BLUEPRINT_STEPS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isScanning]);

  useEffect(() => {
    setScanPos((currentStep + 1) * 25);
  }, [currentStep]);

  return (
    <div className="relative isolate h-full min-h-[600px] w-full overflow-hidden select-none bg-[#030713]">
      {/* ── CAD Blueprint Grid Background with Crosshairs ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(56,189,248,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(56,189,248,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(41,171,135,0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(41,171,135,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      {/* ── Top CAD Engineering Status Bar ── */}
      <div className="relative z-30 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2 sm:pb-3 px-3 sm:px-6 pt-2 sm:pt-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#38bdf8]/15 border border-[#38bdf8]/40 text-[#38bdf8]">
            <Compass className="h-4 w-4 animate-[spin_12s_linear_infinite]" />
          </span>
          <div>
            <p className="text-[11px] sm:text-xs font-mono font-bold text-white tracking-wider">
              SAP S/4HANA ARCHITECTURE BLUEPRINT SCANNER
            </p>
            <p className="text-[8px] sm:text-[9px] font-mono text-[#38bdf8]/80">{active.coords} · MODE: CLEAN_CORE_V4</p>
          </div>
        </div>

        {/* Step Trigger Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-full rounded-xl bg-black/60 border border-white/10 p-1 backdrop-blur-md no-scrollbar">
          {BLUEPRINT_STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => {
                setCurrentStep(idx);
                setIsScanning(false);
              }}
              className={`flex items-center gap-1 whitespace-nowrap rounded-lg px-2 sm:px-2.5 py-1 text-[9px] sm:text-[10px] font-mono font-bold transition-all duration-300 ${
                currentStep === idx
                  ? "bg-[#38bdf8] text-slate-950 shadow-md shadow-[#38bdf8]/30 scale-105"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>{s.step}</span>
              <span className="hidden sm:inline">{s.name.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Canvas: CAD Wireframe Schematic & Laser Scanner Gantry ── */}
      <div className="relative z-20 flex min-h-0 w-full flex-1 flex-col justify-between py-2 sm:py-4 px-2 sm:px-6 lg:px-10 overflow-y-auto lg:overflow-visible">
        {/* Center Blueprint Interactive Canvas */}
        <div className="relative w-full flex-1 min-h-[180px] sm:min-h-[220px] lg:min-h-[360px] flex items-center justify-center">
          {/* Animated SVG Schematic Drawing */}
          <svg
            className="w-full h-full max-h-[380px]"
            viewBox="0 0 1200 650"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
          >
            <defs>
              <linearGradient id="gantryLaser" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#29ab87" stopOpacity="0" />
              </linearGradient>
              <filter id="cadGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Blueprint Outer Framing Box */}
            <rect x="80" y="70" width="1040" height="510" rx="20" stroke="rgba(56,189,248,0.25)" strokeWidth="1.5" strokeDasharray="8 8" />
            <circle cx="80" cy="70" r="4" fill="#38bdf8" />
            <circle cx="1120" cy="70" r="4" fill="#38bdf8" />
            <circle cx="80" cy="580" r="4" fill="#38bdf8" />
            <circle cx="1120" cy="580" r="4" fill="#38bdf8" />

            {/* Central Isometric Architectural Enterprise Cube Matrix */}
            <g transform="translate(600, 310)" filter="url(#cadGlow)">
              {/* Isometric Cube Faces */}
              <polygon points="0,-120 120,-50 0,20 -120,-50" fill="rgba(56,189,248,0.12)" stroke="#38bdf8" strokeWidth="2" />
              <polygon points="0,20 120,-50 120,90 0,160" fill="rgba(41,171,135,0.15)" stroke="#29ab87" strokeWidth="2" />
              <polygon points="0,20 -120,-50 -120,90 0,160" fill="rgba(139,124,246,0.12)" stroke="#8b7cf6" strokeWidth="2" />

              {/* Inner Core Pulsing Circuit Node */}
              <circle cx="0" cy="20" r="28" fill="rgba(41,171,135,0.4)" stroke="#29ab87" strokeWidth="2">
                <animate attributeName="r" values="24;32;24" dur="3s" repeatCount="indefinite" />
              </circle>
              <text x="0" y="24" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">
                S/4 CORE
              </text>

              {/* Radial Architecture Lines */}
              {[-120, -50, 20, 90, 160].map((y, i) => (
                <line key={i} x1="-240" y1={y} x2="240" y2={y} stroke="rgba(56,189,248,0.2)" strokeWidth="1" strokeDasharray="4 4" />
              ))}
            </g>

            {/* Dimension Indicators & Crosshair Lines */}
            <line x1="80" y1="310" x2="360" y2="310" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
            <line x1="840" y1="310" x2="1120" y2="310" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />

            {/* Laser Gantry Scanning Beam sweeping across canvas */}
            <motion.g
              animate={{ x: [120, 1080, 120] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
              <line x1="0" y1="80" x2="0" y2="570" stroke="url(#gantryLaser)" strokeWidth="3" filter="url(#cadGlow)" />
              <circle cx="0" cy="80" r="4" fill="#38bdf8" />
              <circle cx="0" cy="570" r="4" fill="#29ab87" />
            </motion.g>
          </svg>

          {/* Desktop Flanking Left Card */}
          <div className="hidden lg:block absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 w-[300px] xl:w-[330px] z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-white/15 bg-[#030713]/90 p-4 sm:p-5 shadow-2xl backdrop-blur-xl"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span className="rounded bg-[#38bdf8]/20 border border-[#38bdf8]/40 px-2 py-0.5 text-[9px] font-mono font-bold text-[#38bdf8]">
                    STAGE {active.step} OF 04
                  </span>
                  <span className="flex items-center gap-1 text-[9px] font-mono text-white/50">
                    <Ruler className="h-3 w-3 text-[#38bdf8]" /> SCALE 1:1
                  </span>
                </div>

                <h3 className="mt-2.5 text-sm sm:text-base font-bold text-white leading-snug">
                  {active.name}
                </h3>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  {active.desc}
                </p>

                <div className="mt-3 space-y-1 pt-2.5 border-t border-white/10">
                  <p className="text-[8px] font-mono uppercase tracking-wider text-white/50">
                    Blueprint Verification Checks
                  </p>
                  {active.modules.map((m) => (
                    <div key={m} className="flex items-center gap-1.5 text-[10px] font-mono text-white/80">
                      <Check className="h-3 w-3 text-[#29ab87]" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Desktop Flanking Right Card */}
          <div className="hidden lg:block absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 w-[300px] xl:w-[330px] z-20">
            <div className="rounded-2xl border border-white/15 bg-[#030713]/90 p-4 sm:p-5 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-white">
                  <Scan className="h-4 w-4 text-[#29ab87] animate-pulse" /> Precision Verification
                </span>
                <span className="h-2 w-2 rounded-full bg-[#29ab87] animate-ping" />
              </div>

              <div className="mt-2.5 space-y-2">
                <div className="rounded-xl bg-white/[0.03] border border-white/8 p-2">
                  <p className="text-[8px] font-mono text-white/50">{active.metrics.label}</p>
                  <p className="text-xs sm:text-sm font-mono font-extrabold text-[#29ab87]" suppressHydrationWarning>
                    {active.metrics.val}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="rounded-lg bg-white/[0.02] border border-white/5 p-1.5">
                    <p className="text-[7px] font-mono text-white/40">CUTOVER SCRIPTS</p>
                    <p className="text-[11px] font-mono font-bold text-[#38bdf8]">1,420 / 1,420</p>
                  </div>
                  <div className="rounded-lg bg-white/[0.02] border border-white/5 p-1.5">
                    <p className="text-[7px] font-mono text-white/40">RISK DEVIATION</p>
                    <p className="text-[11px] font-mono font-bold text-[#29ab87]">0.00%</p>
                  </div>
                </div>
              </div>

              <div className="mt-2.5 rounded-lg bg-[#29ab87]/15 border border-[#29ab87]/30 p-1.5 text-center text-[9px] font-mono font-bold text-[#7edcc2]">
                ✓ SAP Activate Milestone Validated
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile & Tablet Non-Overlapping Responsive Deck (< 1024px) ── */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-3xl mx-auto z-20 my-2 px-1">
          {/* Card 1: Active Stage Breakdown */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl sm:rounded-2xl border border-white/15 bg-[#030713]/95 p-3.5 sm:p-4 shadow-xl backdrop-blur-xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="rounded bg-[#38bdf8]/20 border border-[#38bdf8]/40 px-2 py-0.5 text-[8px] sm:text-[9px] font-mono font-bold text-[#38bdf8]">
                  STAGE {active.step} OF 04
                </span>
                <span className="flex items-center gap-1 text-[8px] sm:text-[9px] font-mono text-white/50">
                  <Ruler className="h-3 w-3 text-[#38bdf8]" /> SCALE 1:1
                </span>
              </div>

              <h3 className="mt-2 text-xs sm:text-sm font-bold text-white leading-snug">
                {active.name}
              </h3>
              <p className="mt-1 text-[11px] sm:text-xs text-slate-300 leading-relaxed line-clamp-2">
                {active.desc}
              </p>

              <div className="mt-2.5 flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                {active.modules.map((m) => (
                  <span key={m} className="inline-flex items-center gap-1 rounded bg-white/[0.04] border border-white/8 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-mono text-white/80">
                    <Check className="h-2.5 w-2.5 text-[#29ab87]" />
                    {m}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Card 2: Precision Verification */}
          <div className="rounded-xl sm:rounded-2xl border border-white/15 bg-[#030713]/95 p-3.5 sm:p-4 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono font-bold text-white">
                <Scan className="h-3.5 w-3.5 text-[#29ab87] animate-pulse" /> Precision Verification
              </span>
              <span className="rounded bg-[#29ab87]/15 px-2 py-0.5 text-[8px] font-mono font-bold text-[#7edcc2]">
                Validated
              </span>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg bg-white/[0.03] border border-white/8 p-2">
                <p className="text-[8px] font-mono text-white/50">{active.metrics.label}</p>
                <p className="text-xs font-mono font-extrabold text-[#29ab87]" suppressHydrationWarning>
                  {active.metrics.val}
                </p>
              </div>
              <div className="rounded-lg bg-white/[0.03] border border-white/8 p-2">
                <p className="text-[8px] font-mono text-white/50">CUTOVER SCRIPTS</p>
                <p className="text-xs font-mono font-bold text-[#38bdf8]">1,420 / 1,420</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Gantry Progress Bar ── */}
        <div className="relative z-20 mt-1 sm:mt-2 mx-auto w-full max-w-4xl px-3">
          <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-white/60 mb-1">
            <span>DISCOVERY (0%)</span>
            <span>CONFIG (33%)</span>
            <span>MIGRATION (66%)</span>
            <span>GO-LIVE (100%)</span>
          </div>
          <div className="relative h-1.5 sm:h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#38bdf8] via-[#22d3ee] to-[#29ab87]"
              animate={{ width: `${scanPos}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
