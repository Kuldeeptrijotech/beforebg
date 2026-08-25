"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Banknote,
  BarChart3,
  CheckCircle2,
  Coins,
  DollarSign,
  Globe,
  Layers,
  Package,
  PieChart,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   PROFITABILITY PRO — 3D MULTI-DIMENSIONAL MARGIN MATRIX
   High-Definition 3D Enterprise Profitability & Allocation Engine
   ───────────────────────────────────────────────────────────── */

const PIPELINE = [
  { label: "Revenue", sub: "$ 48.2M", icon: Coins, tone: "#ffffff", bg: "rgba(255, 255, 255,0.15)" },
  { label: "Direct Costs", sub: "$ 29.4M", icon: Banknote, tone: "#ffffff", bg: "rgba(255, 255, 255,0.15)" },
  { label: "Activity Allocation", sub: "12 Cost Pools", icon: Layers, tone: "#38bdf8", bg: "rgba(56,189,248,0.15)" },
  { label: "Gross Margin", sub: "38.9%", icon: TrendingUp, tone: "#22d3ee", bg: "rgba(34,211,238,0.15)" },
  { label: "Net Profitability", sub: "+12.4% Net", icon: BarChart3, tone: "#ffffff", bg: "rgba(255, 255, 255,0.2)" },
];

const DIMENSIONS = [
  { label: "Product Hierarchy", icon: Package, tone: "#ffffff", badge: "SKU Level" },
  { label: "Customer Segment", icon: Users, tone: "#38bdf8", badge: "Account 360" },
  { label: "Geographic Region", icon: Globe, tone: "#ffffff", badge: "Multi-Entity" },
];

const BARS = [
  { label: "Q1", val: 32, net: 11.2 },
  { label: "Q2", val: 48, net: 13.8 },
  { label: "Q3", val: 65, net: 15.4 },
  { label: "Q4", val: 52, net: 14.1 },
  { label: "EU", val: 72, net: 18.2 },
  { label: "US", val: 84, net: 19.6 },
  { label: "APAC", val: 60, net: 14.8 },
];

export default function ProfitabilityCube() {
  const reduce = useReducedMotion();
  const [activeTab, setActiveTab] = useState(0);
  const [cubeAngle, setCubeAngle] = useState({ x: -22, y: -32 });
  const [isInteractive, setIsInteractive] = useState(false);

  // Auto rotation if reduced motion is off and not actively hovering
  useEffect(() => {
    if (reduce || isInteractive) return;
    const interval = setInterval(() => {
      setCubeAngle((prev) => ({
        x: -22 + Math.sin(Date.now() / 2000) * 8,
        y: (prev.y + 0.6) % 360,
      }));
    }, 30);
    return () => clearInterval(interval);
  }, [reduce, isInteractive]);

  // Cube Dimensions (Larger sizes for maximum visual impact)
  // Desktop: 260px (Half 130px) | Tablet: 220px (Half 110px) | Mobile: 180px (Half 90px)
  const cubeFaces = [
    { t: "rotateY(0deg) translateZ(var(--cube-half))", label: "P × C × R", sub: "Profitability Matrix", metric: "+18.4% Margin" },
    { t: "rotateY(180deg) translateZ(var(--cube-half))", label: "Cost Pools", sub: "Activity Allocation", metric: "12 Pools Mapped" },
    { t: "rotateY(90deg) translateZ(var(--cube-half))", label: "SKU Margin", sub: "Deep-Dive Profit", metric: "$4.82M EBIT" },
    { t: "rotateY(-90deg) translateZ(var(--cube-half))", label: "Customer 360", sub: "Segment Drivers", metric: "Top 5% Accounts" },
    { t: "rotateX(90deg) translateZ(var(--cube-half))", label: "SAP PaPM", sub: "Calculation Engine", metric: "< 2.4s Runtime" },
    { t: "rotateX(-90deg) translateZ(var(--cube-half))", label: "Net Margin", sub: "EBITDA Uplift", metric: "+12.4% Net" },
  ];

  return (
    <div
      className="relative isolate h-full min-h-full w-full overflow-hidden select-none bg-[#030713] px-3 sm:px-6 lg:px-10 py-3 flex flex-col justify-between"
      style={
        {
          "--cube-size": "260px",
          "--cube-half": "130px",
          "--inner-size": "170px",
          "--inner-half": "85px",
        } as React.CSSProperties
      }
    >
      {/* ── Glowing Mesh Background Grid ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-25">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at center, rgba(255, 255, 255,0.18) 1px, transparent 1px),
              linear-gradient(to right, rgba(255, 255, 255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "36px 36px, 72px 72px",
          }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[460px] w-[800px] rounded-full bg-[radial-gradient(ellipse,rgba(255, 255, 255,0.18)_0%,transparent_70%)] blur-3xl" />
      </div>

      {/* ── Top Header Controls & Dimension Switcher ── */}
      <div className="relative z-30 flex flex-wrap items-center justify-between gap-2 sm:gap-3 border-b border-white/10 pb-2 sm:pb-3 pt-2 sm:pt-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-white/20 border border-white/40 text-white shadow-[0_0_15px_rgba(255, 255, 255,0.4)]">
            <PieChart className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
          </span>
          <div>
            <h2 className="text-[11px] sm:text-xs lg:text-sm font-mono font-extrabold text-white tracking-wider">
              PROFITABILITY PRO · MULTI-DIMENSIONAL MARGIN ENGINE
            </h2>
            <p className="text-[8px] sm:text-[9px] font-mono text-white">
              SAP PaPM & CO-PA ALLOCATION · GRANULAR SKU & CUSTOMER MARGINS
            </p>
          </div>
        </div>

        {/* Dimension Filter Badges */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-full rounded-xl bg-black/60 border border-white/10 p-1 backdrop-blur-md no-scrollbar">
          {DIMENSIONS.map((dim, idx) => {
            const Icon = dim.icon;
            return (
              <button
                key={dim.label}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-mono font-bold transition-all duration-300 ${
                  activeTab === idx
                    ? "bg-white text-slate-950 shadow-md shadow-white/20 scale-105"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="h-3 w-3" style={{ color: activeTab === idx ? "#000" : dim.tone }} />
                <span>{dim.label.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main Interactive 3D Profitability Stage ── */}
      <div className="relative z-20 flex-1 min-h-0 my-auto py-2 sm:py-4 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center overflow-y-auto lg:overflow-visible">
        
        {/* ── LEFT COLUMN (3 Cols): Waterfall Margin Pipeline Stages ── */}
        <div className="lg:col-span-3 flex flex-col gap-1.5 sm:gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-white/50">
              Waterfall Margin Flow
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono text-white">E2E Traceability</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5 sm:gap-2">
            {PIPELINE.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.label}
                  className="group relative flex items-center justify-between rounded-xl sm:rounded-2xl p-2 sm:p-2.5 bg-[#030713]/70 border border-white/10 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:bg-[#030713]/90"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg sm:rounded-xl text-white shadow-sm"
                      style={{ background: p.bg, border: `1px solid ${p.tone}60` }}
                    >
                      <Icon className="h-3.5 w-3.5" style={{ color: p.tone }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-[11px] font-bold text-white tracking-tight truncate">
                        {p.label}
                      </p>
                      <p className="text-[8px] sm:text-[9px] font-mono text-white/50 truncate">
                        {p.sub}
                      </p>
                    </div>
                  </div>

                  <span
                    className="h-1.5 w-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: p.tone, boxShadow: `0 0 6px ${p.tone}` }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CENTER COLUMN (6 Cols): Larger 3D Holographic Matrix Cube ── */}
        <div
          className="lg:col-span-6 flex flex-col items-center justify-center text-center relative py-4 lg:py-6"
          onMouseEnter={() => setIsInteractive(true)}
          onMouseLeave={() => setIsInteractive(false)}
        >
          {/* Ambient Glow Aura beneath cube */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-[radial-gradient(circle,rgba(255, 255, 255,0.25)_0%,transparent_70%)] blur-2xl animate-pulse" />

          {/* Floating Dimension Pills Orbiting the Cube */}
          <div className="hidden sm:flex absolute inset-0 items-center justify-between pointer-events-none px-2 lg:px-4 z-20">
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-[#030713]/90 px-3 py-1 text-[10px] font-mono font-bold text-white shadow-[0_0_15px_rgba(255, 255, 255,0.3)] backdrop-blur-xl"
            >
              <Package className="h-3.5 w-3.5 text-white" />
              <span>Product Dimension</span>
            </motion.div>

            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#38bdf8]/40 bg-[#030713]/90 px-3 py-1 text-[10px] font-mono font-bold text-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.3)] backdrop-blur-xl"
            >
              <Users className="h-3.5 w-3.5 text-[#38bdf8]" />
              <span>Customer Segment</span>
            </motion.div>
          </div>

          {/* ── BIGGER 3D ISOMETRIC CUBE CONTAINER ── */}
          <div
            className="relative flex items-center justify-center my-2 sm:my-4"
            style={{
              width: "280px",
              height: "280px",
              perspective: "1200px",
            }}
          >
            {/* Outer Rotating Glass 3D Cube */}
            <motion.div
              className="relative w-[190px] h-[190px] sm:w-[220px] sm:h-[220px] lg:w-[240px] lg:h-[240px]"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateX(${cubeAngle.x}deg) rotateY(${cubeAngle.y}deg)`,
              }}
            >
              {cubeFaces.map((face, idx) => (
                <div
                  key={idx}
                  className="absolute inset-0 flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300"
                  style={{
                    transform: face.t.replace("var(--cube-half)", "105px"),
                    transformStyle: "preserve-3d",
                    backgroundColor: idx === 5 ? "rgba(255, 255, 255,0.12)" : "rgba(255, 255, 255,0.1)",
                    backgroundImage: "radial-gradient(circle, rgba(255, 255, 255,0.4) 1px, transparent 1.5px)",
                    backgroundSize: "20px 20px",
                    borderColor: idx === 5 ? "rgba(255, 255, 255,0.6)" : "rgba(255, 255, 255,0.45)",
                    boxShadow: idx === 5
                      ? "0 0 25px rgba(255, 255, 255,0.25), inset 0 0 30px rgba(255, 255, 255,0.15)"
                      : "0 0 25px rgba(255, 255, 255,0.2), inset 0 0 30px rgba(255, 255, 255,0.12)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <p
                    className="text-xs sm:text-sm font-black font-mono tracking-wider text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    style={{ transform: "translateZ(10px)" }}
                  >
                    {face.label}
                  </p>
                  <p
                    className="mt-0.5 text-[9px] sm:text-[10px] font-mono font-semibold text-white"
                    style={{ transform: "translateZ(8px)" }}
                  >
                    {face.sub}
                  </p>
                  <span
                    className="mt-1 rounded-full px-2 py-0.5 text-[8px] sm:text-[9px] font-mono font-bold bg-black/60 border border-white/20 text-white"
                    style={{ transform: "translateZ(12px)" }}
                  >
                    {face.metric}
                  </span>

                  {/* Corner Precision Tech Marks */}
                  <span className="absolute top-1.5 left-1.5 h-1 w-1 rounded-full bg-white/50" />
                  <span className="absolute top-1.5 right-1.5 h-1 w-1 rounded-full bg-white/50" />
                  <span className="absolute bottom-1.5 left-1.5 h-1 w-1 rounded-full bg-white/50" />
                  <span className="absolute bottom-1.5 right-1.5 h-1 w-1 rounded-full bg-white/50" />
                </div>
              ))}

              {/* Inner Glowing Core Cube (Nested Counter-Rotating) */}
              <div
                className="absolute left-1/2 top-1/2 w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] lg:w-[150px] lg:h-[150px]"
                style={{
                  transform: "translate(-50%, -50%) rotateX(45deg) rotateY(45deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                {cubeFaces.map((face, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-xl border"
                    style={{
                      transform: face.t.replace("var(--cube-half)", "65px"),
                      backgroundColor: "rgba(255, 255, 255,0.08)",
                      borderColor: "rgba(255, 255, 255,0.45)",
                      boxShadow: "0 0 15px rgba(255, 255, 255,0.2)",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Cube Interactive Guidance Pill */}
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[9px] sm:text-[10px] font-mono text-white/80 backdrop-blur-md">
            <Sparkles className="h-3 w-3 text-white" />
            <span>3D PaPM MULTI-DIMENSIONAL CALCULATION ENGINE</span>
          </div>
        </div>

        {/* ── RIGHT COLUMN (3 Cols): Segment Margin Breakdown & Bar Chart ── */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          <div className="rounded-2xl border border-white/12 bg-[#030713]/95 p-3.5 sm:p-4 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/20 border border-white/40 text-white">
                  <TrendingUp className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-[8px] sm:text-[9px] font-mono text-white/50 uppercase">PROFIT MATRIX</p>
                  <h3 className="text-xs font-mono font-bold text-white">Segment Margin Delta</h3>
                </div>
              </div>
              <span className="rounded-full bg-white/20 border border-white/40 px-2 py-0.5 text-[8px] font-mono font-bold text-white">
                +12.4% Net
              </span>
            </div>

            {/* Dynamic Bar Chart Visualizer */}
            <div className="mt-3 flex h-20 sm:h-24 items-end justify-between gap-1.5 rounded-xl bg-black/60 border border-white/5 p-2.5">
              {BARS.map((b, i) => (
                <div key={b.label} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <span className="text-[7px] font-mono text-white/40">{b.net}%</span>
                  <motion.div
                    animate={{ height: [`${b.val * 0.7}%`, `${b.val}%`, `${b.val * 0.8}%`] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                    className={`w-full rounded-t-md ${
                      i >= 4
                        ? "bg-gradient-to-t from-[#ffffff] to-[#ffffff] shadow-[0_0_8px_rgba(255, 255, 255,0.4)]"
                        : "bg-gradient-to-t from-[#ffffff] to-[#ffffff] shadow-[0_0_8px_rgba(255, 255, 255,0.4)]"
                    }`}
                  />
                  <span className="text-[8px] font-mono font-bold text-white/60">{b.label}</span>
                </div>
              ))}
            </div>

            {/* Summary Telemetry */}
            <div className="mt-3 pt-2.5 border-t border-white/10 space-y-1.5 text-[10px] sm:text-[11px] font-mono">
              <div className="flex items-center justify-between text-white/80">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-white" /> Gross Margin Average
                </span>
                <span className="font-bold text-white">38.9%</span>
              </div>
              <div className="flex items-center justify-between text-white/80">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-white" /> Net Profit Realized
                </span>
                <span className="font-bold text-white">+12.4% Uplift</span>
              </div>
            </div>
          </div>

          {/* Quick SLA / Certification Capsule */}
          <div className="rounded-xl bg-white/[0.03] border border-white/10 p-2.5 flex items-center justify-between text-[9px] sm:text-[10px] font-mono">
            <span className="text-white/60">Real-Time Cost Pool Sync</span>
            <span className="text-[#38bdf8] font-bold">&lt; 2.4s Runtime</span>
          </div>
        </div>
      </div>

      {/* ── Bottom Ribbon: Certified PaPM Integration ── */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 border-t border-white/10 pt-2 text-[9px] sm:text-[10px] font-mono text-white/60">
        <span className="flex items-center gap-1.5 text-white">
          <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> SAP PaPM (PROFITABILITY & PERFORMANCE MANAGEMENT) CERTIFIED
        </span>
        <span className="hidden sm:inline">SUB-SECOND ALLOCATION CALCULATIONS ACROSS MILLIONS OF SKUS</span>
        <span className="text-white">GRANULAR MARGIN INTELLIGENCE</span>
      </div>
    </div>
  );
}
