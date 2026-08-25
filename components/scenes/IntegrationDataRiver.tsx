"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Boxes,
  CheckCircle2,
  Cloud,
  Cpu,
  Database,
  FileCode,
  Gauge,
  Layers,
  Network,
  Radio,
  RefreshCw,
  Server,
  Share2,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   SAP DATA INTEGRATION & ANALYTICS — 3D DATA FABRIC & NEXUS
   Interactive Real-Time Data Mesh, Federation, and Streaming Hub
   ───────────────────────────────────────────────────────────── */

type DataSource = {
  id: string;
  name: string;
  category: string;
  icon: typeof Server;
  protocol: string;
  color: string;
  speed: string;
  schema: string;
  records: string;
  features: string[];
};

type FabricMode = {
  id: string;
  title: string;
  tagline: string;
  throughput: string;
  latency: string;
  quality: string;
  color: string;
};

const DATA_SOURCES: DataSource[] = [
  {
    id: "s4hana",
    name: "SAP S/4HANA ERP",
    category: "Core OLTP Financials & Logistics",
    icon: Server,
    protocol: "OData V4 · CDC Stream",
    color: "#38bdf8",
    speed: "1.2 GB/s",
    schema: "ACDOCA · BSEG · VBAK",
    records: "840K msg/sec",
    features: ["Real-time Change Data Capture (CDC)", "Clean Core Zero-Copy Replication", "ACDOCA Financial Ledger Harmony"],
  },
  {
    id: "crm",
    name: "Salesforce & CRM",
    category: "Customer 360 & Revenue Cloud",
    icon: Share2,
    protocol: "GraphQL · Event Relays",
    color: "#22d3ee",
    speed: "650 MB/s",
    schema: "Account · Contact · Opp",
    records: "420K msg/sec",
    features: ["Bi-directional pipeline streaming", "Customer Golden Record sync", "Instant Order-to-Cash mapping"],
  },
  {
    id: "lakehouse",
    name: "Cloud Lakehouse",
    category: "Snowflake · Databricks · BigQuery",
    icon: Cloud,
    protocol: "Apache Arrow · JDBC/ODBC",
    color: "#8b7cf6",
    speed: "2.8 GB/s",
    schema: "Parquet · Delta · Iceberg",
    records: "1.65M msg/sec",
    features: ["Zero-ETL Query Pushdown", "SAP Datasphere Federated Spaces", "Petabyte-Scale Mass Transformation"],
  },
  {
    id: "iot",
    name: "Edge & IoT Sensors",
    category: "Shopfloor Telemetry & Supply Chain",
    icon: Radio,
    protocol: "MQTT · Apache Kafka",
    color: "#ffffff",
    speed: "480 MB/s",
    schema: "JSON Telemetry Stream",
    records: "980K msg/sec",
    features: ["Sub-second anomaly detection", "Predictive maintenance signals", "Automated Plant Maintenance trigger"],
  },
];

const FABRIC_MODES: FabricMode[] = [
  {
    id: "federation",
    title: "Zero-Copy Federation",
    tagline: "Live Query Pushdown without physical data replication",
    throughput: "3.4 GB/s",
    latency: "< 14 ms",
    quality: "99.99%",
    color: "#38bdf8",
  },
  {
    id: "streaming",
    title: "Event Mesh Streaming",
    tagline: "Sub-second CDC streaming across heterogeneous multi-cloud",
    throughput: "4.8 GB/s",
    latency: "< 6 ms",
    quality: "99.98%",
    color: "#22d3ee",
  },
  {
    id: "semantic",
    title: "Semantic Data Mesh",
    tagline: "Unified Business Data Layer ready for SAC and GenAI",
    throughput: "2.9 GB/s",
    latency: "< 18 ms",
    quality: "100%",
    color: "#ffffff",
  },
];

export default function IntegrationDataRiver() {
  const reduce = useReducedMotion();
  const [activeSource, setActiveSource] = useState(0);
  const [activeMode, setActiveMode] = useState(0);
  const [liveCounter, setLiveCounter] = useState(2847910);
  const [isSyncing, setIsSyncing] = useState(false);

  const currentSource = DATA_SOURCES[activeSource];
  const currentMode = FABRIC_MODES[activeMode];

  // Increment counter in real-time
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveCounter((prev) => prev + Math.floor(Math.random() * 2400) + 1200);
    }, 450);
    return () => clearInterval(timer);
  }, []);

  // Pulse sync simulation
  const handlePulseSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 900);
  };

  return (
    <div className="relative isolate h-full min-h-full w-full overflow-hidden select-none bg-[#030713] px-3 sm:px-6 lg:px-10 py-2 flex flex-col justify-between">
      {/* ── Dynamic Ambient Mesh & Particle Grid Background ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-25">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at center, rgba(56,189,248,0.15) 1px, transparent 1px),
              linear-gradient(to right, rgba(255, 255, 255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px, 80px 80px",
          }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[750px] rounded-full bg-[radial-gradient(ellipse,rgba(56,189,248,0.14)_0%,transparent_70%)] blur-3xl" />
      </div>

      {/* ── Top Header Controls & Mode Switcher ── */}
      <div className="relative z-30 flex flex-wrap items-center justify-between gap-2 sm:gap-3 border-b border-white/10 pb-2 sm:pb-3 pt-2 sm:pt-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-[#38bdf8]/20 border border-[#38bdf8]/40 text-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.4)]">
            <Network className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
          </span>
          <div>
            <h2 className="text-[11px] sm:text-xs lg:text-sm font-mono font-extrabold text-white tracking-wider">
              SAP DATASPHERE · REAL-TIME ENTERPRISE DATA FABRIC
            </h2>
            <p className="text-[8px] sm:text-[9px] font-mono text-[#38bdf8]">
              FEDERATED DATA MESH · EVENT MESH · SEMANTIC BUSINESS LAYER
            </p>
          </div>
        </div>

        {/* Architecture Mode Selector Pills */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-full rounded-xl bg-black/60 border border-white/10 p-1 backdrop-blur-md no-scrollbar">
          {FABRIC_MODES.map((mode, idx) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(idx)}
              className={`whitespace-nowrap rounded-lg px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-mono font-bold transition-all duration-300 ${
                activeMode === idx
                  ? "bg-white text-slate-950 shadow-md shadow-white/20 scale-105"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {mode.title}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Interactive 3D Data Fabric Stage ── */}
      <div className="relative z-20 flex-1 min-h-0 my-auto py-2 sm:py-3 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6 items-center overflow-y-auto lg:overflow-visible">
        
        {/* ── LEFT COLUMN (4 Cols): Data Source Feed Ingestion Matrix ── */}
        <div className="lg:col-span-4 flex flex-col gap-2 sm:gap-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-white/50">
              1. Federated Ingestion Sources
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono text-white">4 Connected</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {DATA_SOURCES.map((src, idx) => {
              const isSelected = activeSource === idx;
              const Icon = src.icon;

              return (
                <button
                  key={src.id}
                  onClick={() => {
                    setActiveSource(idx);
                    handlePulseSync();
                  }}
                  className={`group relative flex items-center justify-between rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-left transition-all duration-300 border backdrop-blur-xl ${
                    isSelected
                      ? "bg-[#030713]/95 shadow-lg scale-[1.02]"
                      : "bg-[#030713]/60 hover:bg-[#030713]/85"
                  }`}
                  style={{
                    borderColor: isSelected ? src.color : "rgba(255,255,255,0.1)",
                    boxShadow: isSelected
                      ? `0 10px 25px -8px ${src.color}60, inset 0 1px 0 rgba(255,255,255,0.2)`
                      : "none",
                  }}
                >
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <div
                      className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg sm:rounded-xl text-white transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${src.color}, #030713)`,
                        border: `1px solid ${src.color}60`,
                      }}
                    >
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] sm:text-xs font-bold text-white tracking-tight truncate">
                        {src.name}
                      </p>
                      <p className="text-[8px] sm:text-[9px] font-mono text-white/50 truncate">
                        {src.protocol}
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex flex-col items-end shrink-0 pl-1">
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold" style={{ color: src.color }}>
                      {src.speed}
                    </span>
                    <span className="text-[7px] font-mono text-white/40">{src.records}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── CENTER COLUMN (4 Cols): 3D Holographic Data Mesh Nexus & Conduits ── */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center text-center relative min-h-[220px] sm:min-h-[260px] lg:min-h-[320px]">
          
          {/* Orbital Conduit Rings & Particle Flows */}
          <div className="relative flex h-48 w-48 sm:h-56 sm:w-56 lg:h-64 lg:w-64 items-center justify-center">
            
            {/* Concentric Rotating Conduits */}
            {[75, 100, 125].map((rad, i) => (
              <motion.div
                key={rad}
                animate={{
                  rotate: i % 2 === 0 ? 360 : -360,
                  scale: isSyncing ? [1, 1.08, 1] : 1,
                }}
                transition={{
                  rotate: { duration: 18 + i * 6, repeat: Infinity, ease: "linear" },
                  scale: { duration: 0.6, ease: "easeOut" },
                }}
                className="absolute rounded-full border border-dashed pointer-events-none"
                style={{
                  width: rad * 2,
                  height: rad * 2,
                  borderColor: i === 0 ? currentSource.color : i === 1 ? currentMode.color : "rgba(255,255,255,0.15)",
                  borderWidth: i === 0 ? "1.5px" : "1px",
                  boxShadow: i === 0 ? `0 0 20px ${currentSource.color}30` : "none",
                }}
              >
                {/* Orbiting Data Satellite Packets */}
                <span
                  className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full shadow-[0_0_10px_currentColor]"
                  style={{
                    backgroundColor: i === 0 ? currentSource.color : currentMode.color,
                    color: i === 0 ? currentSource.color : currentMode.color,
                  }}
                />
              </motion.div>
            ))}

            {/* Central Glowing SAP Datasphere Matrix Cube Core */}
            <motion.div
              animate={{
                scale: isSyncing ? [1, 1.15, 1] : [1, 1.04, 1],
                boxShadow: [
                  `0 0 35px ${currentSource.color}80, inset 0 0 20px ${currentMode.color}60`,
                  `0 0 60px ${currentSource.color}aa, inset 0 0 30px ${currentMode.color}90`,
                  `0 0 35px ${currentSource.color}80, inset 0 0 20px ${currentMode.color}60`,
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-24 w-24 sm:h-28 sm:w-28 flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-[#0c1b33] via-[#030713] to-[#122822] border border-white/30 backdrop-blur-2xl cursor-pointer"
              onClick={handlePulseSync}
            >
              <Database className="h-8 w-8 sm:h-10 sm:w-10 text-white drop-shadow-[0_0_15px_#38bdf8]" />
              <span className="mt-1 text-[8px] sm:text-[9px] font-mono font-extrabold uppercase tracking-wider text-white">
                DATASPHERE
              </span>
            </motion.div>
          </div>

          {/* Quick Core Mode Pill */}
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[9px] sm:text-[10px] font-mono text-white/80 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: currentMode.color }} />
            <span>HARMONIZATION ENGINE: ACTIVE</span>
          </div>
        </div>

        {/* ── RIGHT COLUMN (4 Cols): Live Pipeline Telemetry & Semantic Model HUD ── */}
        <div className="lg:col-span-4 z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentSource.id}-${currentMode.id}`}
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl sm:rounded-3xl border border-white/12 bg-[#030713]/95 p-3.5 sm:p-4 lg:p-5 shadow-2xl backdrop-blur-2xl"
              style={{
                boxShadow: `0 20px 45px -15px ${currentSource.color}40, 0 0 0 1px rgba(255,255,255,0.08)`,
              }}
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3">
                <div>
                  <span className="text-[8px] sm:text-[9px] font-mono font-extrabold uppercase tracking-widest text-white/50">
                    Live Conduit · {currentMode.title}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-snug">
                    {currentSource.name}
                  </h3>
                </div>
                <span
                  className="rounded-full px-2 py-0.5 text-[8px] sm:text-[9px] font-mono font-bold"
                  style={{ background: `${currentSource.color}20`, color: currentSource.color, border: `1px solid ${currentSource.color}40` }}
                >
                  {currentSource.speed}
                </span>
              </div>

              {/* Live Data Schema & Transformation Box */}
              <div className="mt-2.5 sm:mt-3 rounded-xl bg-black/60 border border-white/8 p-2 sm:p-2.5">
                <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-white/40 mb-1">
                  <span>SEMANTIC SCHEMA MAPPING</span>
                  <span style={{ color: currentSource.color }}>SYNCHRONIZED</span>
                </div>
                <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-slate-200">
                  <span className="truncate max-w-[130px] sm:max-w-[160px]">{currentSource.schema}</span>
                  <ArrowRight className="h-3 w-3 text-white/40 shrink-0 mx-1" />
                  <span className="text-white font-bold">SAC / Datasphere</span>
                </div>
              </div>

              {/* Core Features Checklist */}
              <div className="mt-2.5 sm:mt-3 space-y-1 sm:space-y-1.5">
                {currentSource.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-1.5 text-[10px] sm:text-[11px] text-white/80 leading-snug">
                    <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 mt-0.5" style={{ color: currentSource.color }} />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Real-time Telemetry Grid */}
              <div className="mt-3 grid grid-cols-3 gap-1.5 pt-2.5 border-t border-white/10 text-center">
                <div className="rounded-lg bg-white/[0.02] border border-white/5 p-1.5">
                  <p className="text-[7px] sm:text-[8px] font-mono text-white/40">THROUGHPUT</p>
                  <p className="text-[10px] sm:text-xs font-mono font-bold text-[#38bdf8]">{currentMode.throughput}</p>
                </div>
                <div className="rounded-lg bg-white/[0.02] border border-white/5 p-1.5">
                  <p className="text-[7px] sm:text-[8px] font-mono text-white/40">LATENCY</p>
                  <p className="text-[10px] sm:text-xs font-mono font-bold text-white">{currentMode.latency}</p>
                </div>
                <div className="rounded-lg bg-white/[0.02] border border-white/5 p-1.5">
                  <p className="text-[7px] sm:text-[8px] font-mono text-white/40">DATA QUALITY</p>
                  <p className="text-[10px] sm:text-xs font-mono font-bold text-white">{currentMode.quality}</p>
                </div>
              </div>

              {/* Live Record Settled Stream */}
              <div className="mt-2.5 flex items-center justify-between rounded-lg bg-white/[0.03] px-2.5 py-1 text-[9px] sm:text-[10px] font-mono">
                <span className="text-white/50">Total Live Ingested:</span>
                <span className="font-bold text-white" suppressHydrationWarning>
                  {liveCounter.toLocaleString("en-US")} recs
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bottom Ribbon: Certified Integration Matrix ── */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 border-t border-white/10 pt-2 text-[9px] sm:text-[10px] font-mono text-white/60">
        <span className="flex items-center gap-1.5 text-white">
          <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> SAP INTEGRATION SUITE CERTIFIED
        </span>
        <span className="hidden sm:inline">ZERO-ETL BUSINESS DATA FABRIC ARCHITECTURE</span>
        <span className="text-[#38bdf8]">3,200+ PREBUILT ENTERPRISE CONNECTORS</span>
      </div>
    </div>
  );
}
