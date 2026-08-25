"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Clapperboard,
  Coins,
  DollarSign,
  FileSpreadsheet,
  Globe2,
  Layers,
  Maximize2,
  Pause,
  PieChart,
  Play,
  RefreshCw,
  RotateCcw,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   FINLAGOON CONSOLIDATION — CINEMATIC VIDEO & MOTION GRAPHICS
   High-Definition Financial Video Hero with Real-Time HUD
   ───────────────────────────────────────────────────────────── */

type Subsidiary = {
  id: string;
  name: string;
  country: string;
  flag: string;
  localCurrency: string;
  localRevenue: string;
  groupEur: string;
  intercompany: string;
  color: string;
};

const SUBSIDIARIES: Subsidiary[] = [
  {
    id: "us",
    name: "US Entity (Americas)",
    country: "Delaware, US",
    flag: "🇺🇸",
    localCurrency: "USD ($)",
    localRevenue: "$ 24.8M",
    groupEur: "€ 22.8M",
    intercompany: "$ 3.2M IC Sales",
    color: "#38bdf8",
  },
  {
    id: "uk",
    name: "UK Entity (EMEA North)",
    country: "London, UK",
    flag: "🇬🇧",
    localCurrency: "GBP (£)",
    localRevenue: "£ 16.4M",
    groupEur: "€ 19.1M",
    intercompany: "£ 1.8M IC Loan",
    color: "#22d3ee",
  },
  {
    id: "de",
    name: "German HQ (Europe Central)",
    country: "Frankfurt, DE",
    flag: "🇩🇪",
    localCurrency: "EUR (€)",
    localRevenue: "€ 38.5M",
    groupEur: "€ 38.5M",
    intercompany: "€ 4.6M IC Recv",
    color: "#ffffff",
  },
  {
    id: "jp",
    name: "Japan Entity (APAC)",
    country: "Tokyo, JP",
    flag: "🇯🇵",
    localCurrency: "JPY (¥)",
    localRevenue: "¥ 2.15B",
    groupEur: "€ 13.4M",
    intercompany: "¥ 180M Royalty",
    color: "#ffffff",
  },
];

export default function ConsolidationScene() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeSub, setActiveSub] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"pnl" | "bs" | "ic">("pnl");
  const [videoProgress, setVideoProgress] = useState(0);
  const [reconciledVouchers, setReconciledVouchers] = useState(584920);

  // Auto-play video on mount and update progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setVideoProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  // Increment live journal counter
  useEffect(() => {
    const timer = setInterval(() => {
      setReconciledVouchers((prev) => prev + Math.floor(Math.random() * 8) + 2);
    }, 1900);
    return () => clearInterval(timer);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const restartVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
    setIsPlaying(true);
  };

  return (
    <div className="relative isolate h-full min-h-full w-full overflow-hidden select-none bg-[#030713] px-3 sm:px-6 lg:px-10 py-3 flex flex-col justify-between">
      
      {/* ── CINEMATIC FULL-BLEED VIDEO BACKGROUND ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay={!reduce}
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          poster="/videos/fintech-sap-poster.jpg"
          className="h-full w-full object-cover opacity-60 scale-105"
        >
          <source src="/videos/fintech-sap.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Gradient Blending Overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(3,7,19,0.92)_0%,rgba(3,7,19,0.72)_48%,rgba(3,7,19,0.85)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_50%,rgba(255, 255, 255,0.18),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030713] via-[#030713]/80 to-transparent" />
      </div>

      {/* ── Top Header Controls & Video Badge ── */}
      <div className="relative z-30 flex flex-wrap items-center justify-between gap-2 sm:gap-3 border-b border-white/10 pb-2 sm:pb-3 pt-2 sm:pt-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-white/20 border border-white/40 text-white shadow-[0_0_15px_rgba(255, 255, 255,0.5)]">
            <Scale className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
          </span>
          <div>
            <h2 className="text-[11px] sm:text-xs lg:text-sm font-mono font-extrabold text-white tracking-wider">
              FINLAGOON · GENERAL LEDGER CONSOLIDATION ENGINE
            </h2>
            <p className="text-[8px] sm:text-[9px] font-mono text-white">
              MULTI-ENTITY INTERCOMPANY ELIMINATION · IFRS / US GAAP FAST CLOSE
            </p>
          </div>
        </div>

        {/* Video Control Pills */}
        <div className="flex items-center gap-2">
          {/* Live Video Indicator */}
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/70 px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] font-mono text-white/80 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-white animate-ping" />
            <span>4K CINEMATIC SIMULATION</span>
          </div>

          {/* Play/Pause & Restart Buttons */}
          <div className="flex items-center gap-1 rounded-xl bg-black/70 border border-white/10 p-1 backdrop-blur-md">
            <button
              onClick={togglePlay}
              className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 fill-current" />}
            </button>
            <button
              onClick={restartVideo}
              className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
              title="Restart Video"
            >
              <RotateCcw className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Interactive Video Animation Stage ── */}
      <div className="relative z-20 flex-1 min-h-0 my-auto py-2 sm:py-4 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center overflow-y-auto lg:overflow-visible">
        
        {/* ── LEFT COLUMN (4 Cols): 4 Global Operating Subsidiaries ── */}
        <div className="lg:col-span-4 flex flex-col gap-2 sm:gap-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-white/50">
              1. Multi-Entity General Ledgers
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono text-white">4 Connected</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {SUBSIDIARIES.map((sub, idx) => {
              const isSelected = activeSub === idx;

              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    setActiveSub(isSelected ? null : idx);
                  }}
                  className={`group relative flex items-center justify-between rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-left transition-all duration-300 border backdrop-blur-xl ${
                    isSelected
                      ? "bg-[#030713]/95 shadow-lg scale-[1.02]"
                      : "bg-[#030713]/70 hover:bg-[#030713]/90"
                  }`}
                  style={{
                    borderColor: isSelected ? sub.color : "rgba(255,255,255,0.12)",
                    boxShadow: isSelected
                      ? `0 10px 25px -8px ${sub.color}60, inset 0 1px 0 rgba(255,255,255,0.2)`
                      : "none",
                  }}
                >
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <span className="text-lg sm:text-xl shrink-0 drop-shadow-sm">{sub.flag}</span>
                    <div className="min-w-0">
                      <p className="text-[11px] sm:text-xs font-bold text-white tracking-tight truncate">
                        {sub.name}
                      </p>
                      <p className="text-[8px] sm:text-[9px] font-mono text-white/50 truncate">
                        {sub.localRevenue} ({sub.localCurrency.split(" ")[0]})
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex flex-col items-end shrink-0 pl-1">
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold text-white">
                      {sub.groupEur}
                    </span>
                    <span className="text-[7px] font-mono text-white/40">{sub.intercompany}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── CENTER COLUMN (4 Cols): Video Focus Hologram & Fast Close Action ── */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center text-center relative py-2 sm:py-4">
          {/* Center Glowing Hub */}
          <div className="relative flex h-44 w-44 sm:h-52 sm:w-52 items-center justify-center">
            {/* Concentric Pulsing Video Halo Rings */}
            {[65, 88, 110].map((rad, i) => (
              <motion.div
                key={rad}
                animate={{
                  scale: [1, 1.12, 1],
                  opacity: [0.3, 0.65, 0.3],
                }}
                transition={{
                  duration: 2.5 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute rounded-full border border-dashed pointer-events-none"
                style={{
                  width: rad * 2,
                  height: rad * 2,
                  borderColor: i === 0 ? "#ffffff" : i === 1 ? "#38bdf8" : "#ffffff",
                }}
              />
            ))}

            {/* Glowing Core Finlagoon Hub */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 35px rgba(255, 255, 255,0.6)",
                  "0 0 65px rgba(255, 255, 255,0.9)",
                  "0 0 35px rgba(255, 255, 255,0.6)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-24 w-24 sm:h-28 sm:w-28 flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-[#0c2238] via-[#030713] to-[#0e3328] border border-white/30 backdrop-blur-2xl shadow-2xl"
            >
              <FileSpreadsheet className="h-8 w-8 sm:h-10 sm:w-10 text-white drop-shadow-[0_0_15px_#ffffff]" />
              <span className="mt-1 text-[8px] sm:text-[9px] font-mono font-extrabold uppercase tracking-wider text-white">
                FINLAGOON
              </span>
            </motion.div>
          </div>

          {/* Quick Real-Time Fast Close Action */}
          <div className="mt-3 flex flex-col items-center gap-1.5">
            <button
              onClick={restartVideo}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-black/80 px-4 py-1.5 text-[9px] sm:text-[10px] font-mono font-bold text-white hover:bg-white/10 transition-all shadow-[0_0_20px_rgba(255, 255, 255,0.4)] active:scale-95"
            >
              <Zap className="h-3 w-3 text-white" />
              <span>Simulate 48-Hour Fast Close</span>
            </button>
            <span className="text-[8px] font-mono text-white/50">IFRS & MULTI-GAAP ELIMINATION MATRIX</span>
          </div>
        </div>

        {/* ── RIGHT COLUMN (4 Cols): Consolidated Financial Statements Cockpit HUD ── */}
        <div className="lg:col-span-4 z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl sm:rounded-3xl border border-white/12 bg-[#030713]/95 p-3.5 sm:p-4 lg:p-5 shadow-2xl backdrop-blur-2xl"
              style={{
                boxShadow: "0 20px 45px -15px rgba(255, 255, 255,0.35), 0 0 0 1px rgba(255,255,255,0.08)",
              }}
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3">
                <div>
                  <span className="text-[8px] sm:text-[9px] font-mono font-extrabold uppercase tracking-widest text-white/50">
                    Group Financial Matrix · IFRS
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-snug">
                    {activeTab === "pnl" ? "Consolidated Profit & Loss" : activeTab === "bs" ? "Consolidated Balance Sheet" : "Intercompany Reconciliations"}
                  </h3>
                </div>
                <span className="rounded-full bg-white/20 border border-white/40 px-2 py-0.5 text-[8px] sm:text-[9px] font-mono font-bold text-white">
                  48-Hr Close
                </span>
              </div>

              {/* Financial Metrics Summary Grid */}
              <div className="mt-2.5 sm:mt-3 grid grid-cols-2 gap-2 text-[10px] sm:text-[11px] font-mono">
                <div className="rounded-xl bg-white/[0.03] border border-white/8 p-2">
                  <p className="text-[8px] text-white/40 uppercase">GROUP REVENUE</p>
                  <p className="text-xs sm:text-sm font-extrabold text-white mt-0.5">€ 93.80M</p>
                  <p className="text-[7px] text-[#38bdf8]">+16.4% YoY Growth</p>
                </div>

                <div className="rounded-xl bg-white/[0.03] border border-white/8 p-2">
                  <p className="text-[8px] text-white/40 uppercase">IC ELIMINATIONS</p>
                  <p className="text-xs sm:text-sm font-extrabold text-white mt-0.5">- € 8.45M</p>
                  <p className="text-[7px] text-white">100% Balanced Zero-Gap</p>
                </div>
              </div>

              {/* Fast-Close Automated Stages Checklist */}
              <div className="mt-2.5 sm:mt-3 space-y-1.5 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-white/85">
                  <span className="flex items-center gap-1.5 truncate">
                    <CheckCircle2 className="h-3 w-3 text-white shrink-0" />
                    <span className="truncate">Intercompany Elimination</span>
                  </span>
                  <span className="font-mono font-bold text-[9px] text-white">- € 8.45M</span>
                </div>
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-white/85">
                  <span className="flex items-center gap-1.5 truncate">
                    <CheckCircle2 className="h-3 w-3 text-[#38bdf8] shrink-0" />
                    <span className="truncate">Multi-Currency IFRS</span>
                  </span>
                  <span className="font-mono font-bold text-[9px] text-[#38bdf8]">Automated FX</span>
                </div>
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-white/85">
                  <span className="flex items-center gap-1.5 truncate">
                    <CheckCircle2 className="h-3 w-3 text-white shrink-0" />
                    <span className="truncate">Consolidated Balance Sheet</span>
                  </span>
                  <span className="font-mono font-bold text-[9px] text-white">Audit-Proof</span>
                </div>
              </div>

              {/* Bottom Live Journal Counter Bar */}
              <div className="mt-3 flex items-center justify-between rounded-lg bg-white/[0.03] border border-white/8 px-2.5 py-1 text-[8px] sm:text-[9px] font-mono">
                <span className="text-white/50 flex items-center gap-1">
                  <Activity className="h-2.5 w-2.5 text-white animate-pulse" />
                  Auto-Cleared Vouchers:
                </span>
                <span className="font-bold text-white" suppressHydrationWarning>
                  {reconciledVouchers.toLocaleString("en-US")} entries
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Video Progress Scrubber Bar ── */}
      <div className="relative z-20 w-full pt-1">
        <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#ffffff] via-[#38bdf8] to-[#ffffff] transition-all duration-200"
            style={{ width: `${videoProgress}%` }}
          />
        </div>
      </div>

      {/* ── Bottom Ribbon: Certified Financial Close Matrix ── */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 border-t border-white/10 pt-2 text-[9px] sm:text-[10px] font-mono text-white/60">
        <span className="flex items-center gap-1.5 text-white">
          <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> SAP S/4HANA FINANCE & GROUP REPORTING CERTIFIED
        </span>
        <span className="hidden sm:inline">MULTI-GAAP RECONCILIATION: IFRS, US GAAP, HGB</span>
        <span className="text-[#38bdf8]">FAST CLOSE CYCLE &lt; 48 HOURS</span>
      </div>
    </div>
  );
}
