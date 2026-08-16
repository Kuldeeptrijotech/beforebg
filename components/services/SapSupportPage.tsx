"use client";

import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Headphones,
  RefreshCw,
  SearchCheck,
  ShieldCheck,
  SlidersHorizontal,
  TrendingUp,
  Wrench,
} from "lucide-react";
import SupportCommandCenter from "@/components/scenes/SupportCommandCenter";
import { Reveal, SlideReveal, StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import ServiceHero from "@/components/services/ServiceHero";
import { Glass, Metric, SectionLabel, ServiceCta, heroH1, introLead } from "@/components/services/service-ui";
import Container from "@/components/ui/Container";
import TiltCard from "@/components/ui/TiltCard";

type ServiceItem = { title: string; description: string };

const PILLARS = [
  { label: "Monitor", desc: "Proactive 24/7 monitoring keeps critical processes visible before issues surface.", icon: Activity },
  { label: "Respond", desc: "SLAs, triage, and deep expertise resolve incidents quickly across every layer.", icon: Headphones },
  { label: "Improve", desc: "Structured enhancements help the landscape evolve with the business.", icon: TrendingUp },
];

const PROCESS = [
  { label: "Detect", icon: Activity, tone: "#38bdf8" },
  { label: "Triage", icon: SearchCheck, tone: "#f5a623" },
  { label: "Resolve", icon: Wrench, tone: "#22d3ee" },
  { label: "Verify", icon: RefreshCw, tone: "#67e8f9" },
  { label: "Improve", icon: TrendingUp, tone: "#29ab87" },
];

export default function SapSupportPage({ offerings, impacts }: { offerings: ServiceItem[]; impacts: ServiceItem[] }) {
  return (
    <main className="overflow-hidden bg-[#030713] text-white">
      {/* HERO */}
      <ServiceHero
        bgClass="bg-[#030713]"
        glow={["rgba(41,171,135,0.3)", "rgba(245,166,35,0.2)"]}
        scene={<SupportCommandCenter />}
        fadeTo="#030713"
      />

      {/* SUPPORT MODEL + HERO TAIL */}
      <section className="relative bg-[#162032]">
        <div aria-hidden className="absolute inset-x-0 top-0 flex justify-center">
          <div className="flex h-16 flex-col items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#29ab87] shadow-[0_0_10px_#29ab87]" />
            <div className="h-12 w-px bg-gradient-to-b from-[#29ab87]/70 to-transparent" />
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-12">
          <div>
            <SlideReveal direction="left">
              <SectionLabel>Our support model</SectionLabel>
              <h2 className={`mt-5 ${introLead} text-white`}>
                Stable operations, <span className="bg-gradient-to-r from-[#29ab87] to-[#f5a623] bg-clip-text text-transparent">flexible service</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Our SAP Support and AMS services deliver operational continuity, performance assurance, structured
                change, and ongoing value through flexible models aligned with your business.
              </p>
            </SlideReveal>
            <StaggerReveal className="mt-10 grid gap-3 sm:grid-cols-3" stagger={0.1}>
              {PILLARS.map((p) => {
                const Icon = p.icon;
                return (
                  <StaggerRevealItem key={p.label} variant="fadeIn">
                    <Glass variant="frosted" tone="green" className="h-full p-5">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#29ab87] to-[#117a4b] text-white">
                        <Icon className="h-5 w-5" strokeWidth={1.9} />
                      </span>
                      <h3 className="mt-4 font-bold text-white">{p.label}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-slate-300">{p.desc}</p>
                    </Glass>
                  </StaggerRevealItem>
                );
              })}
            </StaggerReveal>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Reveal>
              <Glass variant="frosted" tone="green" className="p-6">
                <Metric to={99.9} suffix="%" label="Availability target" accent="text-[#29ab87]" />
              </Glass>
            </Reveal>
            <Reveal delay={0.1}>
              <Glass variant="frosted" tone="amber" className="p-6">
                <Metric to={30} prefix="< " suffix=" min" label="Response SLA" accent="text-[#f5a623]" />
              </Glass>
            </Reveal>
            <Reveal delay={0.2}>
              <Glass variant="frosted" tone="cyan" className="p-6">
                <Metric to={24} suffix="/7" label="Coverage" accent="text-[#29ab87]" />
              </Glass>
            </Reveal>
            <Reveal delay={0.3}>
              <Glass variant="frosted" tone="green" className="p-6">
                <Metric to={40} suffix="%" label="Incident reduction" accent="text-[#117a4b]" />
              </Glass>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="relative bg-gradient-to-b from-[#162032] to-[#121927] py-20 sm:py-24">
        <Container>
          <Reveal className="max-w-2xl">
            <SectionLabel>What we deliver</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Capabilities that keep you <span className="bg-gradient-to-r from-[#29ab87] to-[#f5a623] bg-clip-text text-transparent">operational</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              From incident response to release governance — every capability maps to a real operational need.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offerings.map((o, i) => (
              <StaggerRevealItem key={o.title} variant="scale">
                <TiltCard max={6} scale={1.02} className="h-full">
                  <Glass variant="frosted" tone={i % 2 ? "cyan" : "amber"} className="h-full p-7">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl text-[11px] font-bold text-white" style={{ background: "linear-gradient(160deg,#29ab87,#f5a623)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl font-bold text-white">{o.title}</h3>
                    </div>
                    <p className="mt-4 leading-7 text-white/70">{o.description}</p>
                  </Glass>
                </TiltCard>
              </StaggerRevealItem>
            ))}
          </div>
        </Container>
      </section>

      {/* 24/7 MONITORING (DARK / GLOWING GREY) */}
      <section className="relative overflow-hidden bg-[#121927] py-20 text-white sm:py-28">
        <div aria-hidden className="absolute inset-0 tri-grid-bg opacity-40" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(55%_60%_at_15%_20%,rgba(41,171,135,0.16),transparent_60%)]" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Reveal>
                <SectionLabel dark>Around the clock</SectionLabel>
                <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
                  A command center for <span className="bg-gradient-to-r from-[#29ab87] to-[#f5a623] bg-clip-text text-transparent">your landscape</span>
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
                  Monitoring, incident resolution, and performance tuning run as one continuous operation — not a
                  ticket queue.
                </p>
              </Reveal>
              <StaggerReveal className="mt-8 grid gap-3 sm:grid-cols-2" stagger={0.08}>
                {impacts.map((i) => (
                  <StaggerRevealItem key={i.title} variant="fadeIn">
                    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#29ab87]" />
                      <div>
                        <p className="font-bold text-white">{i.title}</p>
                        <p className="mt-1 text-xs leading-5 text-slate-300">{i.description}</p>
                      </div>
                    </div>
                  </StaggerRevealItem>
                ))}
              </StaggerReveal>
            </div>

            <Reveal delay={0.15}>
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#162032]/90 p-6 backdrop-blur-md sm:p-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#29ab87]">Live operations feed</p>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#29ab87]/10 px-2.5 py-1 text-[10px] font-bold text-[#29ab87]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#29ab87]" /> Monitoring
                  </span>
                </div>
                <div className="mt-6 space-y-3.5">
                  {[
                    { t: "S/4HANA job monitoring", s: "Healthy", c: "#29ab87", icon: Activity },
                    { t: "Interface throughput", s: "Normal", c: "#29ab87", icon: SlidersHorizontal },
                    { t: "Performance review", s: "Optimizing", c: "#f5a623", icon: TrendingUp },
                    { t: "Role & access audit", s: "Compliant", c: "#117a4b", icon: ShieldCheck },
                  ].map((row) => {
                    const Icon = row.icon;
                    return (
                      <div key={row.t} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-[#29ab87]" />
                          <span className="text-sm font-semibold text-white/90">{row.t}</span>
                        </div>
                        <span className="flex items-center gap-2 text-xs font-bold" style={{ color: row.c }}>
                          <span className="h-2 w-2 rounded-full" style={{ background: row.c, boxShadow: `0 0 8px ${row.c}` }} />
                          {row.s}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 flex items-center gap-3 rounded-xl border border-[#29ab87]/25 bg-[#29ab87]/[0.07] px-4 py-3">
                  <AlertTriangle className="h-5 w-5 shrink-0 text-[#f5a623]" />
                  <p className="text-sm text-slate-200">
                    <span className="font-bold text-white">Proactive alerts</span> — we catch degradation before users feel it.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* INCIDENT PROCESS */}
      <section className="relative bg-[#162032] py-20 sm:py-24">
        <Container>
          <Reveal className="max-w-2xl">
            <SectionLabel>How we resolve</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              From incident to <span className="bg-gradient-to-r from-[#29ab87] to-[#f5a623] bg-clip-text text-transparent">improvement</span>
            </h2>
          </Reveal>

          <div className="relative mt-14">
            <div aria-hidden className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[#29ab87]/60 to-[#f5a623]/40 lg:left-0 lg:top-8 lg:h-px lg:w-full lg:bg-gradient-to-r" />
            <div className="grid gap-6 lg:grid-cols-5">
              {PROCESS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <StaggerRevealItem key={p.label} variant="scale" className="relative pl-16 lg:pl-0 lg:pt-10">
                    <span className="absolute left-6 top-0 -translate-x-1/2 lg:left-0 lg:top-8 lg:translate-x-0 lg:-translate-y-1/2">
                      <motion.span
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#080c1d] shadow-lg shadow-blue-950/10"
                        animate={{ scale: [1, 1.12, 1] }}
                        transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.45, ease: "easeInOut" }}
                      >
                        <Icon className="h-5 w-5" style={{ color: p.tone }} strokeWidth={1.9} />
                      </motion.span>
                    </span>
                    <Glass variant="frosted" tone="green" className="p-5">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ background: p.tone, boxShadow: `0 0 8px ${p.tone}` }} />
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#29ab87]">Step {i + 1}</p>
                      </span>
                      <h3 className="mt-2 text-lg font-bold text-white">{p.label}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {i === 0 && "Continuous monitoring and automated checks surface issues early."}
                        {i === 1 && "Impact is assessed and routed to the right expertise."}
                        {i === 2 && "Root cause is fixed and tested across affected processes."}
                        {i === 3 && "Resolution is verified against agreed SLAs and outcomes."}
                        {i === 4 && "Learnings become permanent improvements to the landscape."}
                      </p>
                    </Glass>
                  </StaggerRevealItem>
                );
              })}
            </div>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-14 flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-sm sm:flex-row sm:text-left">
              <div>
                <p className="text-lg font-bold text-white">Flexible engagement models</p>
                <p className="mt-1 text-slate-400">Scale teams and SLAs to match operational demand and service priorities.</p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#29ab87] to-[#f5a623] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-950/20">
                <CheckCircle2 className="h-4 w-4" /> Pay for what you need
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <ServiceCta
        accent="violet"
        title="Keep your SAP landscape healthy and evolving?"
        description="Talk to our AMS team about a support model that matches how your business actually runs."
      />
    </main>
  );
}
