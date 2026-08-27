"use client";

import { motion } from "framer-motion";
import {
  Boxes,
  Brain,
  CheckCircle2,
  Eye,
  Landmark,
  Lightbulb,
  Sparkles,
  TrendingUp,
  Workflow,
} from "lucide-react";
import { Reveal, SlideReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import ServiceHero from "@/components/services/ServiceHero";
import { Glass, Metric, SectionLabel, introLead } from "@/components/services/service-ui";
import Container from "@/components/ui/Container";


type ServiceItem = { title: string; description: string };

const PIPELINE = [
  { label: "Connect", desc: "Ingest data from SAP and surrounding systems.", icon: Boxes },
  { label: "Prepare", desc: "Clean, govern, and model the foundation.", icon: Workflow },
  { label: "Learn", desc: "Train models on trusted operational history.", icon: Brain },
  { label: "Predict", desc: "Anticipate trends, risks, and opportunities.", icon: TrendingUp },
  { label: "Act", desc: "Put insight and automation where decisions happen.", icon: Sparkles },
];

const CASES = [
  { title: "Demand forecasting", desc: "Improve planning accuracy with AI-driven projections across sales and supply.", icon: TrendingUp },
  { title: "Anomaly detection", desc: "Surface irregularities in transactions and processes before they escalate.", icon: Eye },
  { title: "Cash-flow prediction", desc: "Anticipate liquidity needs and optimize working capital decisions.", icon: Landmark },
  { title: "Intelligent automation", desc: "Automate repeatable analysis and operational decisions with AI rules.", icon: Brain },
];

export default function SapAiPage({ offerings, impacts }: { offerings: ServiceItem[]; impacts: ServiceItem[] }) {
  return (
    <main className="service-detail-page public-alternating-page font-sans overflow-hidden bg-[#030713] text-white">
      {/* HERO */}
      <ServiceHero
        eyebrow="SAP AI & Data Intelligence"
        title="Predictive AI & Real-Time Enterprise Analytics"
        subtitle="Turn enterprise data into forward-looking insights, automated decisioning, and measurable performance visibility."
        primaryCta={{ label: "Consult AI specialists", href: "/contact" }}
        secondaryCta={{ label: "Explore all services", href: "/services" }}
        metrics={[
          { value: "Real-Time", label: "Predictive Telemetry" },
          { value: "100%", label: "Governance Compliance" },
          { value: "Scalable", label: "Enterprise Foundation" },
        ]}
      />

      {/* BUSINESS DATA + HERO TAIL */}
      <section className="relative isolate overflow-hidden bg-white text-slate-900 py-16 sm:py-20 border-b border-slate-200">
        <div className="detail-split-grid mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-12">
          <div>
            <SlideReveal direction="left">
              <SectionLabel dark={false}>Trusted data first</SectionLabel>
              <h2 className={`mt-5 ${introLead} text-slate-900`}>
                Intelligence works when data is connected
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                We combine SAP data integration with AI, machine learning, and automation to surface timely insights,
                simplify decisions, and build an adaptable data foundation.
              </p>
            </SlideReveal>
          </div>

          <div className="grid grid-cols-2 gap-4 items-stretch">
            <Reveal className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-300 hover:shadow-md transition-all">
                <Metric to={35} suffix="%" label="Faster decisions" accent="text-slate-900" />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-300 hover:shadow-md transition-all">
                <Metric to={60} suffix="%" label="Manual effort reduced" accent="text-slate-900" />
              </div>
            </Reveal>
            <Reveal delay={0.2} className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-300 hover:shadow-md transition-all">
                <Metric to={90} suffix="%" label="Forecast accuracy" accent="text-slate-900" />
              </div>
            </Reveal>
            <Reveal delay={0.3} className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-300 hover:shadow-md transition-all">
                <Metric to={100} suffix="%" label="Governed data" accent="text-slate-900" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* AI PROCESS */}
      <section className="relative isolate overflow-hidden bg-[#050817] text-white py-16 sm:py-20 border-b border-white/10">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-mesh opacity-60" />
        <Container>
          <Reveal className="max-w-2xl">
            <SectionLabel dark={true}>How intelligence flows</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              From connected data to confident action
            </h2>
          </Reveal>

          <div className="relative mt-14">
            <div aria-hidden className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[#38bdf8]/70 via-[#38bdf8]/50 to-transparent lg:left-0 lg:top-8 lg:h-px lg:w-full lg:bg-gradient-to-r z-0" />
            <div className="grid gap-6 lg:grid-cols-5 relative z-10">
              {PIPELINE.map((s, i) => {
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

      {/* USE CASES */}
      <section className="relative isolate overflow-hidden bg-white text-slate-900 py-16 sm:py-20 border-b border-slate-200">
        <Container>
          <Reveal className="max-w-2xl">
            <SectionLabel dark={false}>In practice</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Intelligent outcomes for real processes
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {CASES.map((c) => {
              const Icon = c.icon;
              return (
                <StaggerRevealItem key={c.title} variant="slideRight">
                  <div className="ai-practice-card service-surface-card h-full p-7 rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-300 hover:shadow-md transition-all">
                    <div className="flex items-start gap-4">
                      <span className="ai-practice-icon-badge flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-900 shadow-sm">
                        <Icon className="h-6 w-6 text-slate-900" strokeWidth={2.2} />
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{c.title}</h3>
                        <p className="mt-2 leading-7 text-slate-600">{c.desc}</p>
                      </div>
                    </div>
                  </div>
                </StaggerRevealItem>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CAPABILITIES */}
      <section className="relative isolate overflow-hidden bg-[#050817] text-white py-16 sm:py-20 border-b border-white/10">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-mesh opacity-60" />
        <Container>
          <Reveal className="max-w-2xl">
            <SectionLabel dark={true}>What we deliver</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              AI capabilities you can trust
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              From embedded SAP AI to responsible adoption — governed, secure, and practical.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offerings.map((o, i) => (
              <StaggerRevealItem key={o.title} variant="scale">
                <Glass variant="frosted" tone={i % 2 ? "cyan" : "amber"} className="h-full p-7">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl text-[11px] font-bold text-white bg-slate-900">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl font-bold text-white">{o.title}</h3>
                    </div>
                    <p className="mt-4 leading-7 text-slate-300">{o.description}</p>
                  </Glass>
              </StaggerRevealItem>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
