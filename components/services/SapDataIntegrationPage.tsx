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
  { label: "ERP / S/4HANA", icon: Server },
  { label: "CRM", icon: Users },
  { label: "Legacy", icon: HardDrive },
  { label: "Files & Docs", icon: FileText },
  { label: "Cloud SaaS", icon: Cloud },
  { label: "Databases", icon: Database },
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
        primaryCta={{ label: "Consult integration engineers", href: "/contact" }}
        secondaryCta={{ label: "Explore all services", href: "/services" }}
        metrics={[
          { value: "Zero Loss", label: "Migration Integrity" },
          { value: "Event-Driven", label: "Real-Time Architecture" },
          { value: "Audited", label: "Enterprise Security" },
        ]}
      />

      {/* SOURCE SYSTEMS + HERO TAIL */}
      <section className="relative bg-white text-slate-900 py-16 sm:py-20 border-b border-slate-200">
        <div className="detail-split-grid mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-12">
          <div>
            <SlideReveal direction="left">
              <SectionLabel dark={false}>One reliable foundation</SectionLabel>
              <h2 className={`mt-5 ${introLead} text-slate-900`}>
                Every system, one trusted flow
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Our integration services unify SAP and non-SAP landscapes through scalable APIs, cloud integration,
                migration, and enterprise connectivity — supporting seamless operations and real-time insight.
              </p>
            </SlideReveal>

            <StaggerReveal className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3" stagger={0.07}>
              {SOURCES.map((s) => {
                const Icon = s.icon;
                return (
                  <StaggerRevealItem key={s.label} variant="fadeIn">
                    <div className="service-surface-card flex items-center gap-2.5 rounded-xl border-0 bg-white text-slate-900 border border-slate-200 px-3.5 py-3 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-900 shadow-xs">
                        <Icon className="h-4.5 w-4.5 text-slate-900" strokeWidth={2.2} />
                      </span>
                      <span className="text-[13px] font-bold text-white">{s.label}</span>
                    </div>
                  </StaggerRevealItem>
                );
              })}
            </StaggerReveal>
          </div>

          <div className="grid grid-cols-2 gap-4 items-stretch">
            <Reveal className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <Metric to={100} suffix="+" label="Interfaces connected" accent="text-slate-900" />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <Metric to={99.95} suffix="%" label="Sync reliability" accent="text-slate-900" />
              </div>
            </Reveal>
            <Reveal delay={0.2} className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <Metric to={40} suffix="%" label="Faster data delivery" accent="text-slate-900" />
              </div>
            </Reveal>
            <Reveal delay={0.3} className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <Metric to={0} label="Data silos" accent="text-slate-900" sub="All systems fully unified" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="relative bg-[#050817] text-white py-20 sm:py-24 border-b border-white/10">
        <div aria-hidden className="absolute inset-0 tri-mesh opacity-50" />
        <Container className="relative">
          <Reveal className="max-w-2xl">
            <SectionLabel dark={true}>Integration journey</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              From messy sources to clean data
            </h2>
          </Reveal>

          <div className="relative mt-14">
            <div aria-hidden className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[#38bdf8]/70 via-[#38bdf8]/50 to-transparent lg:left-0 lg:top-8 lg:h-px lg:w-full lg:bg-gradient-to-r z-0" />
            <div className="grid gap-6 lg:grid-cols-5 relative z-10">
              {JOURNEY.map((s, i) => {
                const Icon = s.icon;
                return (
                  <StaggerRevealItem key={s.label} variant="scale" className="relative pl-16 lg:pl-0 lg:pt-10">
                    <span className="absolute left-6 top-0 -translate-x-1/2 lg:left-0 lg:top-8 lg:translate-x-0 lg:-translate-y-1/2 z-30">
                      <motion.span
                        className="relative z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#121927] text-white shadow-lg shadow-cyan-950/10"
                        animate={{ scale: [1, 1.12, 1] }}
                        transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.45, ease: "easeInOut" }}
                      >
                        <Icon className="h-5 w-5 text-[#38bdf8]" strokeWidth={1.9} />
                      </motion.span>
                    </span>
                    <Glass variant="frosted" tone="cyan" className="relative z-10 p-5">
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#38bdf8]">{String(i + 1).padStart(2, "0")}</p>
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

      {/* MAPPING & TRANSFORMATION */}
      <section className="relative overflow-hidden bg-white text-slate-900 py-20 sm:py-28 border-b border-slate-200">
        <Container className="relative">
          <div className="detail-split-grid grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Reveal>
                <SectionLabel dark={false}>Transform at the center</SectionLabel>
                <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl text-slate-900">
                  Mapped once, trusted everywhere
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                  Controlled mappings, validation, and reconciliation build trust in the data every downstream system
                  consumes.
                </p>
              </Reveal>
              <StaggerReveal className="mt-8 grid gap-3 sm:grid-cols-2" stagger={0.08}>
                {impacts.map((i) => (
                  <StaggerRevealItem key={i.title} variant="fadeIn">
                    <div className="service-surface-card flex items-start gap-3 rounded-2xl border-0 bg-white text-slate-900 border border-slate-200 p-4 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-900 shadow-xs">
                        <CheckCircle2 className="h-4.5 w-4.5 text-slate-900" />
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
              <div className="service-surface-card relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-md">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-900">Mapping in motion</p>
                <div className="mt-6 space-y-3">
                  {[
                    { from: "Legacy ERP", to: "S/4HANA", status: "Validated", tone: "#38bdf8" },
                    { from: "CRM export", to: "SAP Integration Suite", status: "Synchronized", tone: "#38bdf8" },
                    { from: "Raw files", to: "HANA Cloud", status: "Cleansed", tone: "#38bdf8" },
                    { from: "Master data", to: "MDM", status: "Harmonized", tone: "#38bdf8" },
                  ].map((r, i) => (
                    <motion.div
                      key={r.from}
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: i * 0.12 }}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
                    >
                      <Layers className="h-4 w-4 shrink-0 text-slate-900" />
                      <span className="flex-1 truncate text-sm font-semibold text-slate-900">{r.from}</span>
                      <span className="text-slate-400">→</span>
                      <span className="flex-1 truncate text-right text-sm font-semibold text-slate-900">{r.to}</span>
                      <span className="flex items-center gap-1.5 text-[11px] font-bold" style={{ color: r.tone }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: r.tone, boxShadow: `0 0 8px ${r.tone}` }} />
                        {r.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="service-surface-card mt-6 flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <RefreshCw className="h-5 w-5 shrink-0 text-slate-900" />
                  <p className="text-sm text-slate-700">
                    <span className="font-bold text-slate-900">Continuous sync</span> — real-time events keep data current.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* CAPABILITIES */}
      <section className="relative bg-[#050817] text-white py-20 sm:py-24 border-b border-white/10">
        <div aria-hidden className="absolute inset-0 tri-mesh opacity-50" />
        <Container className="relative">
          <Reveal className="max-w-2xl">
            <SectionLabel dark={true}>What we deliver</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Integration capabilities that scale
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Repeatable patterns that connect applications, processes, and partners across the enterprise.
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

      {/* CTA */}
      <ServiceCta
        accent="violet"
        title="Unify your data, unify your business?"
        description="Let's map your systems and design an integration foundation that scales with your enterprise."
      />
    </main>
  );
}
