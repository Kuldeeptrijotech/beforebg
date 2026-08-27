"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import type { LucideIcon } from "lucide-react";
import Hexagon from "@/components/ui/Hexagon";

type Node = {
  icon: LucideIcon;
  label: string;
  tone: "green" | "amber" | "mix";
};

type SAPEcosystemProps = {
  nodes: Node[];
  className?: string;
};

/** Central brand hexagon hub with orbiting SAP-module nodes connected by data lines. */
export default function SAPEcosystem({ nodes, className = "" }: SAPEcosystemProps) {
  const reduce = useReducedMotion();
  const list = useMemo(() => nodes.slice(0, 8), [nodes]);
  const positions = useMemo(
    () =>
      list.map((_, i) => {
        const angle = (i / Math.max(list.length, 1)) * Math.PI * 2 - Math.PI / 2;
        const radius = 44;
        return {
          left: `${50 + radius * Math.cos(angle)}%`,
          top: `${50 + radius * Math.sin(angle)}%`,
        };
      }),
    [list]
  );

  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[460px] ${className}`}>
      {/* Dynamic ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-70"
        style={{ background: "radial-gradient(circle, rgba(0, 143, 211, 0.45), rgba(56, 189, 248, 0.15) 50%, transparent 75%)" }}
      />

      {/* SVG Connecting data flow streams */}
      <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 560 560" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="streamGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#008fd3" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="streamGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {/* Static faint guide lines */}
        {positions.map((p, i) => {
          const x = (parseFloat(p.left) / 100) * 560;
          const y = (parseFloat(p.top) / 100) * 560;
          return (
            <line
              key={`guide-${i}`}
              x1="280"
              y1="280"
              x2={x}
              y2={y}
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1"
            />
          );
        })}

        {/* Animated pulsating data packet streams */}
        {positions.map((p, i) => {
          const x = (parseFloat(p.left) / 100) * 560;
          const y = (parseFloat(p.top) / 100) * 560;
          return (
            <line
              key={`stream-${i}`}
              x1="280"
              y1="280"
              x2={x}
              y2={y}
              stroke={i % 2 === 0 ? "url(#streamGrad1)" : "url(#streamGrad2)"}
              strokeWidth="2"
              className="tri-dash"
            />
          );
        })}
      </svg>

      {/* Rotating orbit boundary rings */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-full border border-cyan-400/20 ${reduce ? "" : "tri-spin-slow"}`}
        style={{ inset: "6%" }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-full border border-dashed border-white/20"
        style={{ inset: "19%" }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-full border border-dotted border-cyan-300/15 animate-spin-reverse-slow"
        style={{ inset: "32%" }}
      />

      {/* Central Hub */}
      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex items-center justify-center">
          {/* Centered pulsing radar wave rings */}
          <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="tri-ring block h-28 w-28 rounded-full border border-cyan-400/60" />
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center" style={{ animationDelay: "1.3s" }}>
            <span className="tri-ring block h-28 w-28 rounded-full border border-blue-400/40" style={{ animationDelay: "1.3s" }} />
          </div>

          <Hexagon size={118} animated />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-[linear-gradient(150deg,#22d3ee,#008fd3_50%,#1d4ed8)] shadow-[0_0_35px_rgba(34,211,238,0.7)] border border-white/40 cursor-pointer"
            >
              <span className="text-xl font-black tracking-tight text-white drop-shadow-md">T</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Orbiting Satellite Module Nodes */}
      {list.map((node, i) => {
        const Icon = node.icon;
        const floatDelay = i * 0.4;
        const floatDuration = 4 + (i % 3) * 0.8;

        return (
          <motion.div
            key={node.label}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={positions[i]}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 + i * 0.08 }}
            animate={reduce ? undefined : {
              y: [0, -5, 0],
              transition: {
                duration: floatDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: floatDelay,
              },
            }}
          >
            <motion.div
              whileHover={{ scale: 1.12, y: -4 }}
              transition={{ duration: 0.2 }}
              className={`group flex flex-col items-center gap-1.5 rounded-2xl border px-3 py-2 sm:px-3.5 sm:py-2.5 backdrop-blur-xl shadow-lg transition-all duration-300 ${
                node.tone === "amber"
                  ? "border-amber-400/40 bg-slate-900/80 hover:border-amber-300 hover:bg-slate-900/95 hover:shadow-[0_8px_25px_rgba(251,191,36,0.3)]"
                  : node.tone === "mix"
                  ? "border-cyan-400/45 bg-slate-900/80 hover:border-cyan-300 hover:bg-slate-900/95 hover:shadow-[0_8px_25px_rgba(34,211,238,0.35)]"
                  : "border-blue-400/40 bg-slate-900/80 hover:border-blue-300 hover:bg-slate-900/95 hover:shadow-[0_8px_25px_rgba(0,143,211,0.35)]"
              }`}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-cyan-300 transition-colors group-hover:bg-white group-hover:text-[#008fd3]">
                <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
              </div>
              <span className="whitespace-nowrap text-[10px] font-bold tracking-wide text-white sm:text-xs drop-shadow-xs">
                {node.label}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
