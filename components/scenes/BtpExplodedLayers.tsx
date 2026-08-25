"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  Blocks,
  Braces,
  Brain,
  CheckCircle2,
  ChevronRight,
  Code2,
  Cpu,
  Database,
  Layers,
  LayoutDashboard,
  Lock,
  MonitorSmartphone,
  Network,
  Plug,
  Puzzle,
  Radio,
  Server,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   SAP BTP FULL STACK — 3D ISOMETRIC ARCHITECTURAL TOWER &
   NEURAL CLOUD DATA RIVER ENGINE
   ───────────────────────────────────────────────────────────── */

type BtpLayer = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  icon: LucideIcon;
  color: string;
  glow: string;
  bgGrad: string;
  tech: string[];
  specs: string[];
  metrics: { label: string; value: string };
};

const BTP_LAYERS: BtpLayer[] = [
  {
    id: "layer-fiori",
    name: "Experience & UI Layer",
    category: "Presentation Tier",
    tagline: "SAP Fiori · UI5 · Modern Web & Mobile",
    icon: MonitorSmartphone,
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.5)",
    bgGrad: "linear-gradient(135deg, rgba(56,189,248,0.18) 0%, rgba(3,7,19,0.85) 100%)",
    tech: ["Fiori Elements", "OpenUI5 / TS", "SAP Build Workzone", "Mobile SDK"],
    specs: [
      "Role-based responsive Fiori launchpads",
      "Dynamic analytical cards, tables & KPIs",
      "Offline-first mobile apps for iOS & Android",
      "Zero-latency client-side state caching",
    ],
    metrics: { label: "Client Rendering", value: "< 16ms (60 FPS)" },
  },
  {
    id: "layer-cap-rap",
    name: "Application & Service Layer",
    category: "Logic & Framework Tier",
    tagline: "CAP (Node.js/Java) · RAP (ABAP) · CDS",
    icon: Braces,
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.5)",
    bgGrad: "linear-gradient(135deg, rgba(34,211,238,0.18) 0%, rgba(3,7,19,0.85) 100%)",
    tech: ["SAP Cloud App Model", "Core Data Services", "OData V4 / GraphQL", "ABAP RESTful Model"],
    specs: [
      "Declarative business logic with CDS schemas",
      "Enterprise OData V4 services & GraphQL endpoints",
      "Built-in transactional draft handling",
      "Event-driven microservice orchestration",
    ],
    metrics: { label: "Service Throughput", value: "24,000 req/s" },
  },
  {
    id: "layer-btp-core",
    name: "Cloud Platform & Runtime",
    category: "Execution & Security Tier",
    tagline: "Cloud Foundry · Kyma (Kubernetes) · IAS",
    icon: Cpu,
    color: "#2f8fff",
    glow: "rgba(47,143,255,0.5)",
    bgGrad: "linear-gradient(135deg, rgba(47,143,255,0.18) 0%, rgba(3,7,19,0.85) 100%)",
    tech: ["Cloud Foundry Runtime", "Kyma Containers", "SAP Cloud Identity (IAS)", "Autoscaler"],
    specs: [
      "Containerized microservices & serverless functions",
      "Enterprise SSO with OAuth 2.0 / SAML 2.0",
      "Zero-trust principal propagation security",
      "Elastic auto-scaling with high availability",
    ],
    metrics: { label: "Runtime Uptime", value: "99.999% SLA" },
  },
  {
    id: "layer-integration",
    name: "Integration & Connectivity",
    category: "Integration Tier",
    tagline: "Integration Suite · Event Mesh · APIs",
    icon: Workflow,
    color: "#8b7cf6",
    glow: "rgba(139,124,246,0.5)",
    bgGrad: "linear-gradient(135deg, rgba(139,124,246,0.18) 0%, rgba(3,7,19,0.85) 100%)",
    tech: ["Cloud Integration (CPI)", "SAP Event Mesh", "API Management", "Open Connectors"],
    specs: [
      "3,000+ prebuilt SAP & 3rd-party connectors",
      "Asynchronous pub/sub event mesh messaging",
      "Governed REST/SOAP API rate-limiting & policies",
      "Real-time B2B & government electronic compliance",
    ],
    metrics: { label: "Event Ingestion", value: "45,000 events/s" },
  },
  {
    id: "layer-hana-core",
    name: "Data & Clean Core S/4HANA",
    category: "Foundation Tier",
    tagline: "SAP HANA Cloud · Datasphere · S/4 Clean Core",
    icon: Database,
    color: "#ffffff",
    glow: "rgba(255, 255, 255,0.5)",
    bgGrad: "linear-gradient(135deg, rgba(255, 255, 255,0.18) 0%, rgba(3,7,19,0.85) 100%)",
    tech: ["HANA Cloud DB", "SAP Datasphere", "S/4HANA Clean Core", "Analytics Cloud (SAC)"],
    specs: [
      "In-memory columnar database speeds",
      "Clean-core side-by-side extension model",
      "Federated multi-cloud data virtualization",
      "Zero-disruption cloud upgrade readiness",
    ],
    metrics: { label: "Core Decoupling", value: "100% Upgrade-Safe" },
  },
];

export default function BtpExplodedLayers() {
  const reduce = useReducedMotion();
  const [selectedLayer, setSelectedLayer] = useState<number>(0);
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const activeIndex = hoveredLayer !== null ? hoveredLayer : selectedLayer;
  const current = BTP_LAYERS[activeIndex];

  // Auto-cycle through layers if user isn't interacting
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setSelectedLayer((prev) => (prev + 1) % BTP_LAYERS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [autoRotate]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || reduce) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 14, y: y * -14 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setAutoRotate(false)}
      onMouseLeave={() => {
        setMousePos({ x: 0, y: 0 });
        setAutoRotate(true);
      }}
      className="relative isolate h-full min-h-[600px] w-full overflow-hidden select-none"
    >
      {/* ── Background Cyber-Grid & Volumetric Aura ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/3 top-1/4 h-96 w-96 rounded-full blur-[130px] opacity-25 transition-colors duration-700"
          style={{ background: current.color }}
        />
        <div className="absolute right-10 bottom-10 h-80 w-80 rounded-full bg-white/20 blur-[120px]" />
      </div>

      {/* ── Top Floating Navigation Filters ── */}
      <div className="relative z-30 flex flex-wrap items-center justify-between gap-2 px-3 sm:px-6 pt-2 sm:pt-4">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 border border-white/40 text-white">
            <Layers className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs font-bold text-white tracking-tight">SAP BTP Full-Stack Architecture</p>
            <p className="text-[9px] text-white/50">Clean Core · Side-by-Side Extensibility</p>
          </div>
        </div>

        {/* Layer Pill Switchers (Responsive scroll on mobile) */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-full rounded-full border border-white/10 bg-black/60 p-1 backdrop-blur-xl shadow-lg no-scrollbar">
          {BTP_LAYERS.map((layer, idx) => (
            <button
              key={layer.id}
              onClick={() => {
                setSelectedLayer(idx);
                setAutoRotate(false);
              }}
              className={`whitespace-nowrap rounded-full px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] font-bold transition-all duration-300 ${
                activeIndex === idx
                  ? "bg-white text-slate-950 shadow-md scale-105"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {layer.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Interactive Stage (Isometric 3D Tower + Inspector HUD) ── */}
      <div className="relative z-20 flex min-h-0 w-full flex-1 flex-col lg:flex-row items-center justify-center lg:justify-between gap-4 sm:gap-6 lg:gap-10 px-3 sm:px-6 lg:px-12 py-3 lg:py-6 overflow-y-auto lg:overflow-visible">
        {/* ── Left / Center: 3D Isometric Exploded Glass Stack ── */}
        <div
          className="relative flex-1 h-[260px] sm:h-[340px] md:h-[400px] lg:h-[500px] w-full flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          {/* Central Vertical Data Column Laser Beam */}
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full pointer-events-none z-0 opacity-70"
            viewBox="0 0 800 600"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="verticalDataBeam" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="25%" stopColor="#22d3ee" stopOpacity="1" />
                <stop offset="50%" stopColor="#2f8fff" stopOpacity="1" />
                <stop offset="75%" stopColor="#8b7cf6" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
              </linearGradient>
              <filter id="beamGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Vertical Flow Spine */}
            <line
              x1="400"
              y1="90"
              x2="400"
              y2="510"
              stroke="url(#verticalDataBeam)"
              strokeWidth="4"
              filter="url(#beamGlow)"
              strokeDasharray="8 6"
            />

            {/* Moving Bi-Directional Request Packets */}
            <circle cx="400" r="6" fill="#38bdf8" filter="url(#beamGlow)">
              <animate attributeName="cy" values="90;510;90" dur="4.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="400" r="5" fill="#ffffff" filter="url(#beamGlow)">
              <animate attributeName="cy" values="510;90;510" dur="4.5s" repeatCount="indefinite" />
            </circle>
          </svg>

          {/* 3D Isometric Stack Container */}
          <motion.div
            animate={{
              rotateX: 52 + mousePos.y,
              rotateZ: -30 + mousePos.x,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="relative w-[260px] sm:w-[320px] md:w-[360px] lg:w-[410px] h-[220px] sm:h-[280px] lg:h-[340px] flex flex-col justify-between items-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {BTP_LAYERS.map((layer, idx) => {
              const isLayerActive = activeIndex === idx;
              const Icon = layer.icon;

              return (
                <motion.div
                  key={layer.id}
                  onClick={() => {
                    setSelectedLayer(idx);
                    setAutoRotate(false);
                  }}
                  onMouseEnter={() => setHoveredLayer(idx)}
                  onMouseLeave={() => setHoveredLayer(null)}
                  animate={{
                    z: isLayerActive ? (4 - idx) * 38 + 28 : (4 - idx) * 38,
                    scale: isLayerActive ? 1.04 : 1,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative w-full h-[46px] sm:h-[56px] lg:h-[64px] cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl border transition-all duration-300"
                  style={{
                    transformStyle: "preserve-3d",
                    background: layer.bgGrad,
                    borderColor: isLayerActive ? layer.color : "rgba(255,255,255,0.12)",
                    boxShadow: isLayerActive
                      ? `0 16px 40px -10px ${layer.glow}, 0 0 28px ${layer.glow}, inset 0 1px 0 rgba(255,255,255,0.3)`
                      : "0 8px 20px -5px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Layer Surface Grid Pattern */}
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-[inherit] opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(circle at center, ${layer.color} 1px, transparent 1px)`,
                      backgroundSize: "16px 16px",
                    }}
                  />

                  {/* Layer Content */}
                  <div className="relative h-full w-full flex items-center justify-between px-3 sm:px-5">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div
                        className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl text-white shadow-md transition-transform duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${layer.color}, #030713)`,
                          border: `1px solid ${layer.color}80`,
                        }}
                      >
                        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </div>
                      <div>
                        <p className="text-[11px] sm:text-xs lg:text-sm font-extrabold text-white tracking-tight leading-tight">
                          {layer.name}
                        </p>
                        <p className="text-[8px] sm:text-[9px] lg:text-[10px] font-semibold truncate max-w-[140px] sm:max-w-none" style={{ color: layer.color }}>
                          {layer.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Active State Indicator */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {isLayerActive && (
                        <span
                          className="hidden md:inline-block rounded-full px-2 py-0.5 text-[7px] lg:text-[8px] font-mono font-extrabold uppercase tracking-wider text-white shadow-md animate-pulse"
                          style={{ background: layer.color }}
                        >
                          ACTIVE
                        </span>
                      )}
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{
                          background: layer.color,
                          boxShadow: isLayerActive ? `0 0 10px ${layer.color}` : "none",
                        }}
                      />
                    </div>
                  </div>

                  {/* Corner Accent Screws / Tech Marks */}
                  <span className="absolute top-1 left-1 h-0.5 w-0.5 rounded-full bg-white/40" />
                  <span className="absolute top-1 right-1 h-0.5 w-0.5 rounded-full bg-white/40" />
                  <span className="absolute bottom-1 left-1 h-0.5 w-0.5 rounded-full bg-white/40" />
                  <span className="absolute bottom-1 right-1 h-0.5 w-0.5 rounded-full bg-white/40" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ── Right Side: Real-Time BTP Architecture Inspector HUD ── */}
        <div className="w-full lg:w-[380px] xl:w-[410px] z-20 shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl sm:rounded-3xl border border-white/12 bg-[#030713]/95 p-4 sm:p-5 lg:p-6 shadow-[0_30px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
              style={{
                boxShadow: `0 20px 50px -20px ${current.glow}, 0 0 0 1px rgba(255,255,255,0.08)`,
              }}
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <span
                    className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl text-white shadow-lg"
                    style={{ background: current.color }}
                  >
                    <current.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-white/50">
                      Tier 0{activeIndex + 1} · {current.category}
                    </span>
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white leading-snug">
                      {current.name}
                    </h3>
                  </div>
                </div>
                <span
                  className="rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[9px] font-mono font-bold"
                  style={{ background: `${current.color}20`, color: current.color, border: `1px solid ${current.color}40` }}
                >
                  {current.metrics.value}
                </span>
              </div>

              {/* Technologies / Frameworks Badges */}
              <div className="mt-3 sm:mt-4">
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white/40 mb-1.5 sm:mb-2">
                  Engineered With
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {current.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-mono text-white/85 shadow-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Core Capabilities Checklist */}
              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-white/10">
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2">
                  Full-Stack Architecture Capabilities
                </p>
                <ul className="space-y-1.5 sm:space-y-2">
                  {current.specs.map((spec) => (
                    <li key={spec} className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-white/80 leading-relaxed">
                      <CheckCircle2
                        className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 mt-0.5"
                        style={{ color: current.color }}
                      />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Quick Metric Telemetry */}
              <div className="mt-3 sm:mt-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/8 p-2.5 sm:p-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-white/70">
                  <Activity className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color: current.color }} />
                  <span>{current.metrics.label}</span>
                </div>
                <span className="font-mono font-bold text-[11px] sm:text-xs" style={{ color: current.color }}>
                  {current.metrics.value}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
