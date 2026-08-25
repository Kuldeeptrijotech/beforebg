"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  FileText,
  GitMerge,
  HardDrive,
  Layers,
  RefreshCw,
  Server,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";
import { Reveal, SlideReveal, StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import ServiceHero from "@/components/services/ServiceHero";
import { Glass, Metric, SectionLabel, ServiceCta, heroH1, introLead } from "@/components/services/service-ui";
import Container from "@/components/ui/Container";
import TiltCard from "@/components/ui/TiltCard";

type ServiceItem = { title: string; description: string };

const SOURCES = [
  { label: "ERP / S/4HANA", icon: Server, tone: "#38bdf8" },
  { label: "CRM", icon: Users, tone: "#22d3ee" },
  { label: "Legacy", icon: HardDrive, tone: "#ffffff" },
  { label: "Files & Docs", icon: FileText, tone: "#67e8f9" },
  { label: "Cloud SaaS", icon: Cloud, tone: "#38bdf8" },
  { label: "Databases", icon: Database, tone: "#ffffff" },
];

const JOURNEY = [
  { label: "Assess & map", desc: "Inventory interfaces and map data flows across the landscape.", icon: GitMerge },
  { label: "Model & transform", desc: "Design mappings, validation rules, and transformation logic.", icon: Code2 },
  { label: "Load & validate", desc: "Move data with structured validation and reconciliation.", icon: RefreshCw },
  { label: "Orchestrate", desc: "Compose real-time and batch flows into reliable processes.", icon: Workflow },
  { label: "Monitor & optimize", desc: "Gain traceability, alerts, and continuous improvement.", icon: ShieldCheck },
];

export default function SapDataIntegrationPage({ offerings, impacts }: { offerings: ServiceItem[]; impacts: ServiceItem[] }) {
  return (
    <main className="service-detail-page public-alternating-page font-sans overflow-hidden bg-[#030713] text-white">
      {/* HERO */}
      <ServiceHero
        eyebrow="SAP Data Integration & Migration"
        title="Unified Integration Pipelines & Seamless Data Migration"
        subtitle="Connect on-premise, cloud, and legacy systems into high-reliability, automated enterprise workflows."
        description="We implement secure SAP Integration Suite, CPI, and Event Mesh pipelines that ensure zero data loss, full auditability, and synchronized data across every business application."
        primaryCta={{ label: "Consult integration engineers", href: "/contact" }}
        secondaryCta={{ label: "Explore all services", href: "/services" }}
        metrics={[
          { value: "Zero Loss", label: "Migration Integrity" },
          { value: "Event-Driven", label: "Real-Time Architecture" },
          { value: "Audited", label: "Enterprise Security" },
        ]}
      />

      {/* SOURCE SYSTEMS + HERO TAIL */}
      <section className="relative bg-[#162032]">
        <div aria-hidden className="absolute inset-x-0 top-0 flex justify-center">
          <div className="flex h-16 flex-col items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
            <div className="h-12 w-px bg-gradient-to-b from-[#ffffff]/70 to-transparent" />
          </div>
        </div>

        <div className="detail-split-grid mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-12">
          <div>
            <SlideReveal direction="left">
              <SectionLabel>One reliable foundation</SectionLabel>
              <h2 className={`mt-5 ${introLead} text-white`}>
                Every system, <span className="bg-gradient-to-r from-[#ffffff] to-[#ffffff] bg-clip-text text-transparent">one trusted flow</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Our integration services unify SAP and non-SAP landscapes through scalable APIs, cloud integration,
                migration, and enterprise connectivity — supporting seamless operations and real-time insight.
              </p>
            </SlideReveal>

            <StaggerReveal className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3" stagger={0.07}>
              {SOURCES.map((s) => {
                const Icon = s.icon;
                return (
                  <StaggerRevealItem key={s.label} variant="fadeIn">
                    <div className="service-surface-card flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 backdrop-blur-sm">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white" style={{ background: s.tone }}>
                        <Icon className="h-4 w-4" strokeWidth={1.9} />
                      </span>
                      <span className="text-[13px] font-semibold text-slate-200">{s.label}</span>
                    </div>
                  </StaggerRevealItem>
                );
              })}
            </StaggerReveal>
          </div>

          <div className="grid grid-cols-2 gap-4 items-stretch">
            <Reveal className="h-full">
              <Glass variant="frosted" tone="green" className="h-full p-5 sm:p-6">
                <Metric to={100} suffix="+" label="Interfaces connected" accent="text-white" />
              </Glass>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <Glass variant="frosted" tone="amber" className="h-full p-5 sm:p-6">
                <Metric to={99.95} suffix="%" label="Sync reliability" accent="text-white" />
              </Glass>
            </Reveal>
            <Reveal delay={0.2} className="h-full">
              <Glass variant="frosted" tone="cyan" className="h-full p-5 sm:p-6">
                <Metric to={40} suffix="%" label="Faster data delivery" accent="text-white" />
              </Glass>
            </Reveal>
            <Reveal delay={0.3} className="h-full">
              <Glass variant="frosted" tone="green" className="h-full p-5 sm:p-6">
                <Metric to={0} label="Data silos" accent="text-white" sub="All systems fully unified" />
              </Glass>
            </Reveal>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="relative bg-gradient-to-b from-[#162032] to-[#121927] py-20 sm:py-24">
        <Container>
          <Reveal className="max-w-2xl">
            <SectionLabel>Integration journey</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              From messy sources to <span className="bg-gradient-to-r from-[#ffffff] to-[#ffffff] bg-clip-text text-transparent">clean data</span>
            </h2>
          </Reveal>

          <div className="relative mt-14">
            <div aria-hidden className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[#ffffff]/70 via-[#ffffff]/50 to-transparent lg:left-0 lg:top-8 lg:h-px lg:w-full lg:bg-gradient-to-r" />
            <div className="grid gap-6 lg:grid-cols-5">
              {JOURNEY.map((s, i) => {
                const Icon = s.icon;
                return (
                  <StaggerRevealItem key={s.label} variant="scale" className="relative pl-16 lg:pl-0 lg:pt-10">
                    <span className="absolute left-6 top-0 -translate-x-1/2 lg:left-0 lg:top-8 lg:translate-x-0 lg:-translate-y-1/2">
                      <motion.span
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#121927] text-white shadow-lg shadow-cyan-950/10"
                        animate={{ scale: [1, 1.12, 1] }}
                        transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.45, ease: "easeInOut" }}
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.9} />
                      </motion.span>
                    </span>
                    <Glass variant="frosted" tone="green" className="p-5">
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">{String(i + 1).padStart(2, "0")}</p>
                      <h3 className="mt-2 text-lg font-bold text-white">{s.label}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{s.desc}</p>
                    </Glass>
                  </StaggerRevealItem>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* MAPPING & TRANSFORMATION (DARK / GLOWING GREY - HEX GRID PRESERVED) */}
      <section className="relative overflow-hidden bg-[#121927] py-20 text-white sm:py-28">
        <div aria-hidden className="absolute inset-0 tri-hex-grid opacity-60" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(50%_60%_at_15%_20%,rgba(255, 255, 255,0.16),transparent_60%)]" />
        <Container className="relative">
          <div className="detail-split-grid grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Reveal>
                <SectionLabel dark>Transform at the center</SectionLabel>
                <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
                  Mapped once, <span className="bg-gradient-to-r from-[#ffffff] to-[#ffffff] bg-clip-text text-transparent">trusted everywhere</span>
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
                  Controlled mappings, validation, and reconciliation build trust in the data every downstream system
                  consumes.
                </p>
              </Reveal>
              <StaggerReveal className="mt-8 grid gap-3 sm:grid-cols-2" stagger={0.08}>
                {impacts.map((i) => (
                  <StaggerRevealItem key={i.title} variant="fadeIn">
                    <div className="service-surface-card flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" />
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
              <div className="service-surface-card relative overflow-hidden rounded-3xl border border-white/10 bg-[#162032]/90 p-8 backdrop-blur-md">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white">Mapping in motion</p>
                <div className="mt-6 space-y-3">
                  {[
                    { from: "Legacy ERP", to: "S/4HANA", status: "Validated", tone: "#ffffff" },
                    { from: "CRM export", to: "SAP Integration Suite", status: "Synchronized", tone: "#ffffff" },
                    { from: "Raw files", to: "HANA Cloud", status: "Cleansed", tone: "#ffffff" },
                    { from: "Master data", to: "MDM", status: "Harmonized", tone: "#ffffff" },
                  ].map((r, i) => (
                    <motion.div
                      key={r.from}
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: i * 0.12 }}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"
                    >
                      <Layers className="h-4 w-4 shrink-0 text-white" />
                      <span className="flex-1 truncate text-sm font-semibold text-white/90">{r.from}</span>
                      <span className="text-white">→</span>
                      <span className="flex-1 truncate text-right text-sm font-semibold text-white/90">{r.to}</span>
                      <span className="flex items-center gap-1.5 text-[11px] font-bold" style={{ color: r.tone }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: r.tone, boxShadow: `0 0 8px ${r.tone}` }} />
                        {r.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="service-surface-card mt-6 flex items-center justify-center gap-3 rounded-xl border border-white/25 bg-white/[0.07] px-4 py-3">
                  <RefreshCw className="h-5 w-5 shrink-0 text-white" />
                  <p className="text-sm text-slate-200">
                    <span className="font-bold text-white">Continuous sync</span> — real-time events keep data current.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* CAPABILITIES */}
      <section className="relative bg-[#162032] py-20 sm:py-24">
        <Container>
          <Reveal className="max-w-2xl">
            <SectionLabel>What we deliver</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Integration capabilities that <span className="bg-gradient-to-r from-[#ffffff] to-[#ffffff] bg-clip-text text-transparent">scale</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              Repeatable patterns that connect applications, processes, and partners across the enterprise.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offerings.map((o, i) => (
              <StaggerRevealItem key={o.title} variant="scale">
                <TiltCard max={6} scale={1.02} className="h-full">
                  <Glass variant="frosted" tone={i % 2 ? "cyan" : "amber"} className="h-full p-7">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl text-[11px] font-bold text-white" style={{ background: "linear-gradient(160deg,#22d3ee,#2563eb)" }}>
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

      {/* CTA */}
      <ServiceCta
        accent="violet"
        title="Unify your data, unify your business?"
        description="Let's map your systems and design an integration foundation that scales with your enterprise."
      />
    </main>
  );
}
