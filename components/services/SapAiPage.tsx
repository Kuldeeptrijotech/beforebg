"use client";

import { motion } from "framer-motion";
import {
  Boxes,
  Brain,
  CheckCircle2,
  Eye,
  Landmark,
  Lightbulb,
  PackageSearch,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";
import AiPredictionField from "@/components/scenes/AiPredictionField";
import { Reveal, SlideReveal, StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import ServiceHero from "@/components/services/ServiceHero";
import { Glass, Metric, SectionLabel, ServiceCta, heroH1, introLead } from "@/components/services/service-ui";
import Container from "@/components/ui/Container";
import TiltCard from "@/components/ui/TiltCard";

type ServiceItem = { title: string; description: string };

const DOMAINS = [
  { label: "Finance", icon: Landmark, tone: "#117a4b" },
  { label: "Sales", icon: PackageSearch, tone: "#29ab87" },
  { label: "Customer", icon: Users, tone: "#f5a623" },
  { label: "Operations", icon: Workflow, tone: "#29ab87" },
  { label: "Supply Chain", icon: Boxes, tone: "#117a4b" },
];

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
    <main className="font-sans overflow-hidden bg-[#030713] text-white">
      {/* HERO */}
      <ServiceHero
        bgClass="bg-[#030713]"
        glow={["rgba(41,171,135,0.3)", "rgba(245,166,35,0.2)"]}
        scene={<AiPredictionField />}
        fadeTo="#030713"
      />

      {/* BUSINESS DATA + HERO TAIL */}
      <section className="relative isolate overflow-hidden bg-[#0b1d33] border-t border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-hex-grid opacity-45" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-mesh opacity-50" />
        <div aria-hidden className="absolute inset-x-0 top-0 flex justify-center">
          <div className="flex h-16 flex-col items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#29ab87] shadow-[0_0_10px_#29ab87]" />
            <div className="h-12 w-px bg-gradient-to-b from-[#29ab87]/70 to-transparent" />
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-12">
          <div>
            <SlideReveal direction="left">
              <SectionLabel>Trusted data first</SectionLabel>
              <h2 className={`mt-5 ${introLead} text-white`}>
                Intelligence works when <span className="bg-gradient-to-r from-[#29ab87] to-[#f5a623] bg-clip-text text-transparent">data is connected</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                We combine SAP data integration with AI, machine learning, and automation to surface timely insights,
                simplify decisions, and build an adaptable data foundation.
              </p>
            </SlideReveal>

            <StaggerReveal className="mt-10 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3" stagger={0.07}>
              {DOMAINS.map((d) => {
                const Icon = d.icon;
                return (
                  <StaggerRevealItem key={d.label} variant="fadeIn" className="h-full">
                    <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 backdrop-blur-sm h-full w-full justify-start">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white" style={{ background: d.tone }}>
                        <Icon className="h-4 w-4" strokeWidth={1.9} />
                      </span>
                      <span className="text-[13px] font-semibold text-slate-200">{d.label}</span>
                    </div>
                  </StaggerRevealItem>
                );
              })}
            </StaggerReveal>
          </div>

          <div className="grid grid-cols-2 gap-4 items-stretch">
            <Reveal className="h-full">
              <Glass variant="frosted" tone="green" className="h-full p-5 sm:p-6">
                <Metric to={35} suffix="%" label="Faster decisions" accent="text-[#29ab87]" />
              </Glass>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <Glass variant="frosted" tone="amber" className="h-full p-5 sm:p-6">
                <Metric to={60} suffix="%" label="Manual effort reduced" accent="text-[#f5a623]" />
              </Glass>
            </Reveal>
            <Reveal delay={0.2} className="h-full">
              <Glass variant="frosted" tone="cyan" className="h-full p-5 sm:p-6">
                <Metric to={90} suffix="%" label="Forecast accuracy" accent="text-[#29ab87]" />
              </Glass>
            </Reveal>
            <Reveal delay={0.3} className="h-full">
              <Glass variant="frosted" tone="green" className="h-full p-5 sm:p-6">
                <Metric to={100} suffix="%" label="Governed data" accent="text-[#117a4b]" />
              </Glass>
            </Reveal>
          </div>
        </div>
      </section>

      {/* AI PROCESS */}
      <section className="relative isolate overflow-hidden bg-[#18263e] py-16 sm:py-20 border-t border-white/10">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-mesh opacity-60" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-grid-bg opacity-25" />
        <Container>
          <Reveal className="max-w-2xl">
            <SectionLabel>How intelligence flows</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              From connected data to <span className="bg-gradient-to-r from-[#29ab87] to-[#f5a623] bg-clip-text text-transparent">confident action</span>
            </h2>
          </Reveal>

          <div className="relative mt-14">
            <div aria-hidden className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[#29ab87]/70 via-[#117a4b]/50 to-transparent lg:left-0 lg:top-8 lg:h-px lg:w-full lg:bg-gradient-to-r" />
            <div className="grid gap-6 lg:grid-cols-5">
              {PIPELINE.map((s, i) => {
                const Icon = s.icon;
                return (
                  <StaggerRevealItem key={s.label} variant="scale" className="relative pl-16 lg:pl-0 lg:pt-10">
                    <span className="absolute left-6 top-0 -translate-x-1/2 lg:left-0 lg:top-8 lg:translate-x-0 lg:-translate-y-1/2">
                      <motion.span
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#121927] text-[#29ab87] shadow-lg shadow-violet-950/10"
                        animate={{ scale: [1, 1.12, 1] }}
                        transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.45, ease: "easeInOut" }}
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.9} />
                      </motion.span>
                    </span>
                    <Glass variant="frosted" tone="green" className="p-5">
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#29ab87]">{String(i + 1).padStart(2, "0")}</p>
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
      <section className="relative isolate overflow-hidden bg-[#0b1d33] py-16 sm:py-20 border-t border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-hex-grid opacity-45" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-mesh opacity-50" />
        <Container>
          <Reveal className="max-w-2xl">
            <SectionLabel>In practice</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Intelligent outcomes for <span className="bg-gradient-to-r from-[#29ab87] to-[#f5a623] bg-clip-text text-transparent">real processes</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {CASES.map((c) => {
              const Icon = c.icon;
              return (
                <StaggerRevealItem key={c.title} variant="slideRight">
                  <TiltCard max={5} scale={1.02} className="h-full">
                    <Glass variant="frosted" tone="green" className="h-full p-7">
                      <div className="flex items-start gap-4">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: "linear-gradient(160deg,#29ab87,#117a4b)" }}>
                          <Icon className="h-6 w-6" strokeWidth={1.8} />
                        </span>
                        <div>
                          <h3 className="text-xl font-bold text-white">{c.title}</h3>
                          <p className="mt-2 leading-7 text-white/70">{c.desc}</p>
                        </div>
                      </div>
                    </Glass>
                  </TiltCard>
                </StaggerRevealItem>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CAPABILITIES */}
      <section className="relative isolate overflow-hidden bg-[#18263e] py-16 sm:py-20 border-t border-white/10">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-mesh opacity-60" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-grid-bg opacity-25" />
        <Container>
          <Reveal className="max-w-2xl">
            <SectionLabel>What we deliver</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              AI capabilities you can <span className="bg-gradient-to-r from-[#29ab87] to-[#f5a623] bg-clip-text text-transparent">trust</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              From embedded SAP AI to responsible adoption — governed, secure, and practical.
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

      {/* CTA */}
      <ServiceCta
        accent="violet"
        title="Turn your data into intelligent action?"
        description="Talk to our AI and data team about embedding practical intelligence into your SAP landscape."
      />
    </main>
  );
}
