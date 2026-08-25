"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  Dna,
  FileCheck,
  FlaskConical,
  Layers,
  Microscope,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  ThermometerSnowflake,
} from "lucide-react";
import { useState, useEffect } from "react";
import IndustryHeroStage from "./IndustryHeroStage";

const KPIS = [
  { value: "100%", label: "FDA 21 CFR Part 11", color: "#ffffff" },
  { value: "99.99%", label: "Unit Traceability", color: "#ffffff" },
  { value: "98.9%", label: "Batch Yield", color: "#ffffff" },
];

export default function PharmaAnimation() {
  const reduce = useReducedMotion();
  const [activeBatch, setActiveBatch] = useState(0);

  const batches = [
    { id: "GS1-982104", drug: "Biologic Compound A-9", purity: "99.98%", status: "FDA GxP Validated", temp: "-20.4°C" },
    { id: "GS1-982105", drug: "Peptide Synthesis B-4", purity: "99.94%", status: "ATTP Serialized", temp: "-21.1°C" },
    { id: "GS1-982106", drug: "Vaccine Adjuvant V-2", purity: "100.0%", status: "Cold-Chain Monitored", temp: "-20.2°C" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBatch((prev) => (prev + 1) % batches.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [batches.length]);

  return (
    <IndustryHeroStage
      videoSrc="/videos/pharmaceuticals-sap.mp4"
      poster="/videos/pharmaceuticals-sap-poster.jpg"
      caption="SAP unifies pharma operations end to end"
      sub="R&D · batch formulation · serialization · cold-chain compliance"
      kpis={KPIS}
      accentColor="#ffffff"
    >
      <div className="relative h-full w-full overflow-hidden select-none">
        {/* ── Background Molecular Grid & DNA Helix Wave ── */}
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <defs>
            <linearGradient id="pharmaHelix1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="pharmaLaser" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
            </linearGradient>
            <filter id="pharmaGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* DNA Double-Helix Sinusoidal Waves */}
          <path
            d="M 100 380 Q 250 220 400 380 T 700 380 T 1000 380 T 1300 380"
            stroke="url(#pharmaHelix1)"
            strokeWidth="3"
            strokeDasharray="6 8"
            opacity="0.45"
          />
          <path
            d="M 100 380 Q 250 540 400 380 T 700 380 T 1000 380 T 1300 380"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeDasharray="4 6"
            opacity="0.35"
          />

          {/* Cross Rung Molecular Bonds */}
          {[175, 325, 475, 625, 775, 925, 1075, 1225].map((x) => (
            <line
              key={x}
              x1={x}
              y1={300 + Math.sin(x) * 60}
              x2={x}
              y2={460 - Math.sin(x) * 60}
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeOpacity="0.3"
              strokeDasharray="2 4"
            />
          ))}

          {/* Flowing Active Enzyme Molecules */}
          <circle r="6" fill="#ffffff" filter="url(#pharmaGlow)">
            <animateMotion
              dur="12s"
              repeatCount="indefinite"
              path="M 100 380 Q 250 220 400 380 T 700 380 T 1000 380 T 1300 380"
            />
          </circle>
          <circle r="4.5" fill="#ffffff" filter="url(#pharmaGlow)">
            <animateMotion
              dur="12s"
              begin="6s"
              repeatCount="indefinite"
              path="M 100 380 Q 250 540 400 380 T 700 380 T 1000 380 T 1300 380"
            />
          </circle>

          {/* Curved Serialization Carousel Track */}
          <ellipse
            cx="1020"
            cy="420"
            rx="240"
            ry="110"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="8 6"
            strokeOpacity="0.4"
            transform="rotate(-12 1020 420)"
          />

          {/* Laser Scanner Vertical Beam */}
          <line x1="1020" y1="260" x2="1020" y2="540" stroke="url(#pharmaLaser)" strokeWidth="3" filter="url(#pharmaGlow)">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
          </line>
        </svg>

        {/* ── Left Side: 3D Holographic Molecular Bioreactor ── */}
        <div className="absolute left-[4%] top-[14%] sm:left-[7%] max-w-[340px] z-20">
          <motion.div
            animate={reduce ? {} : { rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="relative flex h-32 w-32 items-center justify-center rounded-full border border-white/30 bg-[radial-gradient(circle,rgba(255, 255, 255,0.2)_0%,transparent_70%)] backdrop-blur-md"
          >
            <div className="absolute inset-1 rounded-full border border-dashed border-white/40" />
            <Dna className="h-14 w-14 text-white drop-shadow-[0_0_15px_rgba(255, 255, 255,0.8)]" />
          </motion.div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-[#030713]/80 p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-white">
                <FlaskConical className="h-4 w-4" /> Cleanroom Synthesis
              </span>
              <span className="rounded-full bg-white/40 border border-white/40 px-2 py-0.5 text-[9px] font-mono text-white">
                GxP Class A
              </span>
            </div>
            <p className="mt-2 text-sm font-bold text-white">Active Molecular Formulation</p>
            <div className="mt-2.5 flex items-center justify-between text-xs text-white/70">
              <span>Assay Purity</span>
              <span className="font-mono font-bold text-white">{batches[activeBatch].purity}</span>
            </div>
            <div className="mt-1 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-[99.9%] bg-gradient-to-r from-[#ffffff] to-[#ffffff]" />
            </div>
          </div>
        </div>

        {/* ── Center: SAP S/4HANA Life Sciences Digital Core ── */}
        <motion.div
          animate={reduce ? {} : { scale: [1, 1.03, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-[12%] -translate-x-1/2 z-20 text-center"
        >
          <div className="inline-flex flex-col items-center">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/50 bg-gradient-to-br from-[#ffffff] via-[#030713] to-[#ffffff] p-4 shadow-[0_0_50px_rgba(255, 255, 255,0.4)] backdrop-blur-xl">
              <ShieldCheck className="h-10 w-10 text-white drop-shadow-[0_0_12px_#ffffff]" />
            </div>
            <div className="mt-3 rounded-full border border-white/15 bg-black/60 px-4 py-1 backdrop-blur-md">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-white">
                SAP ATTP Compliance Engine
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Right Side: Live GS1 Unit Serialization & Cold-Chain Telemetry ── */}
        <div className="absolute right-[4%] top-[14%] sm:right-[7%] max-w-[340px] z-20">
          <motion.div
            key={batches[activeBatch].id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/10 bg-[#030713]/85 p-4 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <PackageCheck className="h-5 w-5 text-white" />
                <div>
                  <p className="text-xs font-mono font-extrabold text-white">{batches[activeBatch].id}</p>
                  <p className="text-[9px] text-white/50">{batches[activeBatch].drug}</p>
                </div>
              </div>
              <span className="flex h-2 w-2 rounded-full bg-white animate-ping" />
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="flex items-center justify-between text-white/80">
                <span>Compliance Audit</span>
                <span className="font-semibold text-white">{batches[activeBatch].status}</span>
              </div>
              <div className="flex items-center justify-between text-white/80">
                <span className="flex items-center gap-1">
                  <ThermometerSnowflake className="h-3.5 w-3.5 text-white" /> Cold-Chain
                </span>
                <span className="font-mono font-bold text-white">{batches[activeBatch].temp}</span>
              </div>
            </div>

            <div className="mt-3 rounded-lg bg-white/10 border border-white/30 p-2 text-center text-[10px] font-bold text-white">
              ✓ GS1 DataMatrix Verified · Ready for Global Dispatch
            </div>
          </motion.div>
        </div>
      </div>
    </IndustryHeroStage>
  );
}
