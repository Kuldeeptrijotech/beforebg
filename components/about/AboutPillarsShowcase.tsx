"use client";

import { motion } from "framer-motion";
import { Award, Layers, Network, ShieldCheck, Sparkles, Users } from "lucide-react";

const pillars = [
  {
    icon: Layers,
    title: "Full-Stack SAP Architecture",
    description: "Deep expertise spanning SAP S/4HANA, BTP, SAC, PaPM, and BW/4HANA integration.",
    tone: "from-[#ffffff] to-[#ffffff]",
    accent: "text-white",
  },
  {
    icon: Network,
    title: "Connected Data & Governance",
    description: "Unifying transactional systems and analytical models for trusted decision-making.",
    tone: "from-[#38bdf8] to-[#0284c7]",
    accent: "text-[#38bdf8]",
  },
  {
    icon: ShieldCheck,
    title: "Accountable Delivery Ownership",
    description: "Dedicated consultant teams staying close to outcomes from strategy to run-phase.",
    tone: "from-[#ffffff] to-[#cbd5e1]",
    accent: "text-white",
  },
  {
    icon: Users,
    title: "True Collaborative Partnership",
    description: "Transparent knowledge transfer and long-term client enablement at every milestone.",
    tone: "from-[#ffffff] to-[#94a3b8]",
    accent: "text-white",
  },
];

const metrics = [
  { value: "9+", label: "Years Experience" },
  { value: "100%", label: "Delivery Ownership" },
  { value: "Global", label: "Enterprise Reach" },
];

export default function AboutPillarsShowcase() {
  return (
    <div className="about-pillar-shell relative isolate overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7 shadow-2xl backdrop-blur-xl">
      {/* Decorative background glows */}
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[rgba(255, 255, 255,0.15)] blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[rgba(255, 255, 255,0.1)] blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-0 tri-hex-grid opacity-25" />

      {/* Header chip */}
      <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[linear-gradient(150deg,#22d3ee,#2563eb)] text-white shadow-md shadow-[rgba(255, 255, 255,0.3)]">
            <Award className="h-4 w-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
            Delivery Pillars
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-white">
          <Sparkles className="h-3 w-3 text-white" /> Enterprise Excellence
        </span>
      </div>

      {/* 4 Pillars Grid */}
      <div className="relative mt-5 grid gap-3 sm:grid-cols-2">
        {pillars.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="about-pillar-card group flex min-w-0 flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-5 transition-all duration-300 hover:border-white/40 hover:bg-white/[0.06]"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${pillar.tone} text-white shadow-md`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className="text-sm font-bold leading-tight text-white sm:text-base">
                  {pillar.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {pillar.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Metrics Banner */}
      <div className="relative mt-5 grid grid-cols-3 gap-2 rounded-xl border border-white/10 bg-black/30 p-3 text-center">
        {metrics.map((m, i) => (
          <div key={m.label} className={i !== 0 ? "border-l border-white/10" : ""}>
            <div className="text-base sm:text-lg font-extrabold text-white">
              {m.value}
            </div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
