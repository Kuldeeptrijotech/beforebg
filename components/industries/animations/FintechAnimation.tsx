"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Banknote,
  CheckCircle2,
  Coins,
  CreditCard,
  Database,
  Globe2,
  Lock,
  Receipt,
  Scale,
  ShieldCheck,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";
import IndustryHeroStage from "./IndustryHeroStage";

const KPIS = [
  { value: "0.18s", label: "Reconciliation Latency", color: "#117a4b" },
  { value: "4.8M", label: "Transactions / Day", color: "#29ab87" },
  { value: "0.01%", label: "Fraud Anomaly Rate", color: "#f5a623" },
];

export default function FintechAnimation() {
  const reduce = useReducedMotion();
  const [txCount, setTxCount] = useState(4829104);

  useEffect(() => {
    const interval = setInterval(() => {
      setTxCount((prev) => prev + Math.floor(Math.random() * 45 + 15));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <IndustryHeroStage
      videoSrc="/videos/fintech-sap.mp4"
      poster="/videos/fintech-sap-poster.jpg"
      caption="SAP automates the fintech financial core"
      sub="global payments · real-time ledgers · AI fraud scoring · automated settlement"
      kpis={KPIS}
      accentColor="#8b7cf6"
    >
      <div className="relative h-full w-full overflow-hidden select-none">
        {/* ── Cryptographic High-Velocity Payment Grid & Orbital Rails ── */}
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full opacity-65"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <defs>
            <linearGradient id="fintechOrbital" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b7cf6" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#29ab87" stopOpacity="1" />
              <stop offset="100%" stopColor="#f5a623" stopOpacity="0.8" />
            </linearGradient>
            <filter id="fintechGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Symmetrical High-Speed Payment Rings */}
          <ellipse
            cx="720"
            cy="420"
            rx="520"
            ry="220"
            stroke="url(#fintechOrbital)"
            strokeWidth="2.5"
            strokeDasharray="8 8"
            opacity="0.5"
          />
          <ellipse
            cx="720"
            cy="420"
            rx="380"
            ry="140"
            stroke="#8b7cf6"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            opacity="0.35"
          />

          {/* High-Velocity Currency Packets */}
          <circle r="6" fill="#a78bfa" filter="url(#fintechGlow)">
            <animateMotion
              dur="8s"
              repeatCount="indefinite"
              path="M 200 420 a 520 220 0 1 0 1040 0 a 520 220 0 1 0 -1040 0"
            />
          </circle>
          <circle r="5" fill="#29ab87" filter="url(#fintechGlow)">
            <animateMotion
              dur="8s"
              begin="4s"
              repeatCount="indefinite"
              path="M 200 420 a 520 220 0 1 0 1040 0 a 520 220 0 1 0 -1040 0"
            />
          </circle>
          <circle r="4.5" fill="#f5a623" filter="url(#fintechGlow)">
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              path="M 340 420 a 380 140 0 1 0 760 0 a 380 140 0 1 0 -760 0"
            />
          </circle>
        </svg>

        {/* ── Left Side: Real-Time Multi-Currency Gateway & Live Ticker ── */}
        <div className="absolute left-[4%] top-[14%] sm:left-[7%] max-w-[340px] z-20">
          <div className="rounded-2xl border border-white/10 bg-[#030713]/85 p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6d28d9]/20 border border-[#8b7cf6]/40 text-[#a78bfa]">
                  <Globe2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white">Global Payment Ingestion</p>
                  <p className="text-[9px] text-white/50">USD · EUR · GBP · INR · JPY</p>
                </div>
              </div>
              <span className="flex h-2 w-2 rounded-full bg-[#8b7cf6] animate-ping" />
            </div>

            <div className="mt-3 space-y-2">
              <div className="rounded-lg bg-white/[0.03] border border-white/5 p-2.5">
                <p className="text-[9px] uppercase tracking-wider text-white/50">Live Settled Volume Today</p>
                <p className="text-base font-mono font-extrabold text-[#29ab87]" suppressHydrationWarning>
                  {txCount.toLocaleString("en-US")} <span className="text-[10px] font-normal text-white/50">txns</span>
                </p>
              </div>
              <div className="flex items-center justify-between text-[10px] text-white/70 px-1">
                <span>Throughput: 18,450 tx/s</span>
                <span className="font-mono text-[#a78bfa]">TLS 1.3 · ISO 20022</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Center: 3D Quantum SAP BTP Financial Core ── */}
        <div className="absolute left-1/2 top-[12%] -translate-x-1/2 z-20 flex flex-col items-center">
          <motion.div
            animate={reduce ? {} : { rotateY: [0, 360] }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-[#8b7cf6]/50 bg-gradient-to-br from-[#5b21b6] via-[#030713] to-[#8b7cf6]/40 shadow-[0_0_60px_rgba(139,124,246,0.4)] backdrop-blur-xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Coins className="h-12 w-12 text-white drop-shadow-[0_0_15px_#a78bfa]" />
          </motion.div>

          <div className="mt-3 rounded-full border border-white/15 bg-black/70 px-4 py-1 backdrop-blur-md">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#a78bfa]">
              SAP BTP Automated Dual-Ledger Core
            </span>
          </div>
        </div>

        {/* ── Right Side: AI Fraud Shield & Anomaly Defense Radar ── */}
        <div className="absolute right-[4%] top-[14%] sm:right-[7%] max-w-[340px] z-20">
          <div className="rounded-2xl border border-white/10 bg-[#030713]/85 p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#29ab87]/20 border border-[#29ab87]/40 text-[#29ab87]">
                  <ShieldCheck className="h-5 w-5 animate-pulse" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white">AI Fraud Risk Shield</p>
                  <p className="text-[9px] text-white/50">Sub-Second Heuristic Radar</p>
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="flex items-center justify-between text-white/80">
                <span>Threat Isolation</span>
                <span className="font-mono font-bold text-[#29ab87]">99.99% BLOCKED</span>
              </div>
              <div className="flex items-center justify-between text-white/80">
                <span>Reconciliation Speed</span>
                <span className="font-mono font-bold text-[#f5a623]">0.18s / Batch</span>
              </div>
              <div className="rounded-lg bg-[#8b7cf6]/15 border border-[#8b7cf6]/30 p-2 text-center text-[10px] font-bold text-[#a78bfa]">
                ✓ Continuous Multi-GAAP Accounting · Zero Variance
              </div>
            </div>
          </div>
        </div>
      </div>
    </IndustryHeroStage>
  );
}
