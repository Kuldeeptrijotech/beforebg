"use client";

import { motion } from "framer-motion";
import { Award, CheckCircle2, Compass, Flame, GraduationCap, HeartHandshake, ShieldCheck, Sparkles, TrendingUp, Users } from "lucide-react";

export default function CareersCultureShowcase() {
  const perks = [
    {
      icon: GraduationCap,
      title: "SAP Certifications & Learning",
      desc: "Sponsored certifications across S/4HANA, BTP, PaPM, SAC & AI.",
      badge: "Growth",
      tone: "emerald",
    },
    {
      icon: Users,
      title: "Direct Leadership Mentorship",
      desc: "Work closely with seasoned architects and directors on enterprise programs.",
      badge: "Mentorship",
      tone: "cyan",
    },
    {
      icon: TrendingUp,
      title: "Merit-Driven Progression",
      desc: "Clear career advancement tied to delivery impact, ownership, and skill growth.",
      badge: "Fast-Track",
      tone: "amber",
    },
    {
      icon: Compass,
      title: "Modern Hybrid Workplace",
      desc: "Flexible, outcome-oriented work model built for balance and high performance.",
      badge: "Flexibility",
      tone: "emerald",
    },
  ];

  return (
    <div className="relative h-full">
      {/* Background ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[#29ab87]/15 via-[#38bdf8]/10 to-transparent blur-2xl"
      />

      {/* Main Container Card */}
      <div className="relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(150deg,#1a2336_0%,#162032_60%,#121927_100%)] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        {/* Subtle hex grid pattern */}
        <div aria-hidden className="pointer-events-none absolute inset-0 tri-hex-grid opacity-30" />

        {/* Top Header Strip */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(150deg,#29ab87,#117a4b)] text-white shadow-md shadow-[#29ab87]/30">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-white">Why Consultants Choose Trijotech</p>
              <p className="text-xs text-slate-400">Enterprise impact & engineering excellence</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#29ab87]/30 bg-[#29ab87]/10 px-3 py-1 text-xs font-semibold text-[#7edcc2]">
            <CheckCircle2 className="h-3.5 w-3.5" /> High-Ownership Team
          </span>
        </div>

        {/* 2x2 Perks Grid */}
        <div className="relative z-10 mt-6 grid flex-1 gap-4 sm:grid-cols-2">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            const isCyan = perk.tone === "cyan";
            const isAmber = perk.tone === "amber";

            return (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4.5 transition-all duration-300 hover:border-[#29ab87]/50 hover:bg-white/[0.06]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 ${
                        isCyan
                          ? "bg-[#38bdf8]/15 text-[#38bdf8]"
                          : isAmber
                          ? "bg-[#f5a623]/15 text-[#f5a623]"
                          : "bg-[#29ab87]/15 text-[#29ab87]"
                      }`}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        isCyan
                          ? "bg-[#38bdf8]/10 text-[#38bdf8]"
                          : isAmber
                          ? "bg-[#f5a623]/10 text-[#f5a623]"
                          : "bg-[#29ab87]/10 text-[#7edcc2]"
                      }`}
                    >
                      {perk.badge}
                    </span>
                  </div>
                  <h4 className="mt-3.5 text-sm font-bold text-white transition-colors group-hover:text-[#7edcc2]">
                    {perk.title}
                  </h4>
                  <p className="mt-1.5 text-xs leading-5 text-slate-300">{perk.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Key Metric Highlights */}
        <div className="relative z-10 mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5 text-center">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
            <p className="text-xl font-extrabold text-white">100%</p>
            <p className="mt-0.5 text-[11px] font-medium text-slate-400">Project Ownership</p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
            <p className="text-xl font-extrabold text-[#7edcc2]">Global</p>
            <p className="mt-0.5 text-[11px] font-medium text-slate-400">Enterprise Clients</p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
            <p className="text-xl font-extrabold text-[#f5a623]">4.9/5</p>
            <p className="mt-0.5 text-[11px] font-medium text-slate-400">Team Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
}
