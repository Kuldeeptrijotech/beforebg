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
    <div className={`relative mx-auto aspect-square w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[450px] ${className}`}>
      {/* connecting lines */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 560 560" fill="none" aria-hidden="true">
        {positions.map((p, i) => {
          const x = (parseFloat(p.left) / 100) * 560;
          const y = (parseFloat(p.top) / 100) * 560;
          return (
            <line
              key={i}
              x1="280"
              y1="280"
              x2={x}
              y2={y}
              stroke={i % 2 === 0 ? "rgba(41,171,135,0.35)" : "rgba(245,166,35,0.3)"}
              strokeWidth="1.5"
              className="tri-dash"
            />
          );
        })}
      </svg>

      {/* orbit rings */}
      <div className={`absolute inset-0 rounded-full border border-[rgba(41,171,135,0.18)] ${reduce ? "" : "tri-spin-slow"}`} style={{ inset: "6%" }} />
      <div className="absolute inset-0 rounded-full border border-dashed border-[rgba(245,166,35,0.16)]" style={{ inset: "20%" }} />

      {/* central hub */}
      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div aria-hidden className="tri-ring absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(41,171,135,0.5)]" />
          <Hexagon size={115} animated />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[linear-gradient(160deg,#29ab87,#117a4b)] shadow-[0_0_30px_rgba(41,171,135,0.6)]">
              <span className="text-xl font-black text-white">T</span>
            </div>
          </div>
        </div>
      </div>

      {/* nodes */}
      {list.map((node, i) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={node.label}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={positions[i]}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
          >
            <div
              className={`flex flex-col items-center gap-1.5 rounded-xl border px-2.5 py-2 backdrop-blur-md transition-colors duration-300 sm:px-3 sm:py-2.5 ${
                node.tone === "amber"
                  ? "border-[rgba(245,166,35,0.35)] bg-[rgba(245,166,35,0.08)] hover:bg-[rgba(245,166,35,0.16)]"
                  : node.tone === "mix"
                    ? "border-[rgba(41,171,135,0.4)] bg-[rgba(41,171,135,0.1)] hover:bg-[rgba(41,171,135,0.18)]"
                    : "border-[rgba(41,171,135,0.35)] bg-[rgba(17,122,75,0.12)] hover:bg-[rgba(17,122,75,0.22)]"
              }`}
            >
              <Icon className="h-4 w-4 text-white" strokeWidth={1.8} />
              <span className="whitespace-nowrap text-[9px] font-semibold tracking-wide text-slate-200 sm:text-[11px]">
                {node.label}
              </span>
            </div>
          </motion.div>
        );
      })}

      {/* ambient glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(41,171,135,0.35), transparent 70%)" }}
      />
    </div>
  );
}
