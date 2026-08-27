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
import { Reveal, SlideReveal, StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import ServiceHero from "@/components/services/ServiceHero";
import { Glass, Metric, SectionLabel, introLead } from "@/components/services/service-ui";
import Container from "@/components/ui/Container";
import TiltCard from "@/components/ui/TiltCard";

type ServiceItem = { title: string; description: string };

const PILLARS = [
  { label: "Monitor", desc: "Proactive 24*7 monitoring keeps critical processes visible before issues surface.", icon: Activity },
  { label: "Respond", desc: "SLAs, triage, and deep expertise resolve incidents quickly across every layer.", icon: Headphones },
  { label: "Improve", desc: "Structured enhancements help the landscape evolve with the business.", icon: TrendingUp },
];

const PROCESS = [
  { label: "Detect", icon: Activity, tone: "#38bdf8" },
  { label: "Triage", icon: SearchCheck, tone: "#ffffff" },
  { label: "Resolve", icon: Wrench, tone: "#22d3ee" },
  { label: "Verify", icon: RefreshCw, tone: "#67e8f9" },
  { label: "Improve", icon: TrendingUp, tone: "#ffffff" },
];

export default function SapSupportPage({ offerings, impacts }: { offerings: ServiceItem[]; impacts: ServiceItem[] }) {
  return (
    <main className="service-detail-page public-alternating-page font-sans overflow-hidden bg-[#030713] text-white">
      {/* HERO */}
      <ServiceHero
        eyebrow="SAP Support & Application Management"
        title="24*7 Proactive AMS, System Stability & Optimization"
        subtitle="Keep your SAP landscape fast, resilient, and continuously aligned with evolving business needs."
        primaryCta={{ label: "Request support consultation", href: "/contact" }}
        secondaryCta={{ label: "Explore all services", href: "/services" }}
        metrics={[
          { value: "24*7*365", label: "Global Coverage" },
          { value: "<15 min", label: "Critical SLA Response" },
          { value: "99.9%", label: "System Availability" },
        ]}
      />

      {/* SUPPORT MODEL + HERO TAIL */}
      <section className="relative bg-white text-slate-900 py-16 sm:py-20 border-b border-slate-200">
        <div className="detail-split-grid mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-12">
          <div>
            <SlideReveal direction="left">
              <SectionLabel dark={false}>Our support model</SectionLabel>
              <h2 className={`mt-5 ${introLead} text-slate-900`}>
                Stable operations, flexible service
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Our SAP Support and AMS services deliver operational continuity, performance assurance, structured
                change, and ongoing value through flexible models aligned with your business.
              </p>
            </SlideReveal>
            <StaggerReveal className="mt-10 grid gap-3 sm:grid-cols-3" stagger={0.1}>
              {PILLARS.map((p) => {
                const Icon = p.icon;
                return (
                  <StaggerRevealItem key={p.label} variant="fadeIn" className="h-full">
                    <div className="service-surface-card flex h-full flex-col p-5 rounded-2xl border-0 bg-white text-slate-900 border border-slate-200 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 shadow-md transition-transform duration-300">
                        <Icon className="h-5 w-5 text-slate-900" strokeWidth={2.2} />
                      </div>
                      <h3 className="mt-4 font-bold text-white text-base sm:text-lg">{p.label}</h3>
                      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-white/90">{p.desc}</p>
                    </div>
                  </StaggerRevealItem>
                );
              })}
            </StaggerReveal>
          </div>

          <div className="grid grid-cols-2 gap-4 items-stretch">
            <Reveal className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <Metric to={99.9} suffix="%" label="Availability target" accent="text-slate-900" />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <Metric to={30} prefix="< " suffix=" min" label="Response SLA" accent="text-slate-900" />
              </div>
            </Reveal>
            <Reveal delay={0.2} className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <Metric to={24} suffix="*7" label="Coverage" accent="text-slate-900" />
              </div>
            </Reveal>
            <Reveal delay={0.3} className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <Metric to={40} suffix="%" label="Incident reduction" accent="text-slate-900" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="relative bg-[#050817] text-white py-20 sm:py-24 border-b border-white/10">
        <div aria-hidden className="absolute inset-0 tri-mesh opacity-50" />
        <Container className="relative">
          <Reveal className="max-w-2xl">
            <SectionLabel dark={true}>What we deliver</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Capabilities that keep you operational
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
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl text-[11px] font-bold text-white bg-slate-900">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl font-bold text-white">{o.title}</h3>
                    </div>
                    <p className="mt-4 leading-7 text-slate-300">{o.description}</p>
                  </Glass>
                </TiltCard>
              </StaggerRevealItem>
            ))}
          </div>
        </Container>
      </section>

      {/* 24/7 MONITORING */}
      <section className="relative overflow-hidden bg-white text-slate-900 py-20 sm:py-28 border-b border-slate-200">
        <Container className="relative">
          <div className="detail-split-grid grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Reveal>
                <SectionLabel dark={false}>Around the clock</SectionLabel>
                <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl text-slate-900">
                  A command center for your landscape
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                  Monitoring, incident resolution, and performance tuning run as one continuous operation — not a
                  ticket queue.
                </p>
              </Reveal>
              <StaggerReveal className="mt-8 grid gap-3 sm:grid-cols-2" stagger={0.08}>
                {impacts.map((i) => (
                  <StaggerRevealItem key={i.title} variant="fadeIn">
                    <div className="service-surface-card flex items-start gap-3 rounded-2xl border-0 bg-white text-slate-900 border border-slate-200 p-4 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-900 shadow-xs">
                        <ShieldCheck className="h-4.5 w-4.5 text-slate-900" />
                      </span>
                      <div>
                        <p className="font-bold text-white">{i.title}</p>
                        <p className="mt-1 text-xs leading-5 text-white/90">{i.description}</p>
                      </div>
                    </div>
                  </StaggerRevealItem>
                ))}
              </StaggerReveal>
            </div>

            <Reveal delay={0.15}>
              <div className="service-surface-card relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-md sm:p-8">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-900">Live operations feed</p>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-bold text-slate-900">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-900" /> Monitoring
                  </span>
                </div>
                <div className="mt-6 space-y-3.5">
                  {[
                    { t: "S/4HANA job monitoring", s: "Healthy", c: "#38bdf8", icon: Activity },
                    { t: "Interface throughput", s: "Normal", c: "#38bdf8", icon: SlidersHorizontal },
                    { t: "Performance review", s: "Optimizing", c: "#38bdf8", icon: TrendingUp },
                    { t: "Role & access audit", s: "Compliant", c: "#38bdf8", icon: ShieldCheck },
                  ].map((row) => {
                    const Icon = row.icon;
                    return (
                      <div key={row.t} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-slate-900" />
                          <span className="text-sm font-semibold text-slate-900">{row.t}</span>
                        </div>
                        <span className="flex items-center gap-2 text-xs font-bold" style={{ color: row.c }}>
                          <span className="h-2 w-2 rounded-full" style={{ background: row.c, boxShadow: `0 0 8px ${row.c}` }} />
                          {row.s}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="service-surface-card mt-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <AlertTriangle className="h-5 w-5 shrink-0 text-slate-900" />
                  <p className="text-sm text-slate-700">
                    <span className="font-bold text-slate-900">Proactive alerts</span> — we catch degradation before users feel it.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* INCIDENT PROCESS */}
      <section className="relative bg-[#050817] text-white py-20 sm:py-24 border-b border-white/10">
        <div aria-hidden className="absolute inset-0 tri-mesh opacity-50" />
        <Container>
          <Reveal className="max-w-2xl">
            <SectionLabel dark={true}>How we resolve</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              From incident to improvement
            </h2>
          </Reveal>

          <div className="relative mt-14">
            <div aria-hidden className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[#38bdf8]/60 to-[#38bdf8]/40 lg:left-0 lg:top-8 lg:h-px lg:w-full lg:bg-gradient-to-r z-0" />
            <div className="grid gap-6 lg:grid-cols-5 relative z-10">
              {PROCESS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <StaggerRevealItem key={p.label} variant="scale" className="relative pl-16 lg:pl-0 lg:pt-10">
                    <span className="absolute left-6 top-0 -translate-x-1/2 lg:left-0 lg:top-8 lg:translate-x-0 lg:-translate-y-1/2 z-30">
                      <motion.span
                        className="relative z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#080c1d] shadow-lg shadow-blue-950/10"
                        animate={{ scale: [1, 1.12, 1] }}
                        transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.45, ease: "easeInOut" }}
                      >
                        <Icon className="h-5 w-5 text-[#38bdf8]" strokeWidth={1.9} />
                      </motion.span>
                    </span>
                    <Glass variant="frosted" tone="cyan" className="relative z-10 p-5">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#38bdf8]">Step {i + 1}</p>
                      </span>
                      <h3 className="mt-2 text-lg font-bold text-white">{p.label}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
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
            <div className="service-surface-card mt-14 flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-sm sm:flex-row sm:text-left">
              <div>
                <p className="text-lg font-bold text-white">Flexible engagement models</p>
                <p className="mt-1 text-slate-300">Scale teams and SLAs to match operational demand and service priorities.</p>
              </div>
              <div className="sap-support-flexible-badge flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-cyan-950/20">
                <CheckCircle2 className="h-4 w-4" /> Pay for what you need
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
