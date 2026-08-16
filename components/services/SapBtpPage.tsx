"use client";

import { motion } from "framer-motion";
import {
  Brain,
  CheckCircle2,
  Database,
  LayoutDashboard,
  MousePointerClick,
  Plug,
  Puzzle,
  Rocket,
} from "lucide-react";
import BtpExplodedLayers from "@/components/scenes/BtpExplodedLayers";
import { Reveal, SlideReveal, StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import ServiceHero from "@/components/services/ServiceHero";
import { Glass, Metric, SectionLabel, ServiceCta, heroH1, introLead } from "@/components/services/service-ui";
import Container from "@/components/ui/Container";
import TiltCard from "@/components/ui/TiltCard";

type ServiceItem = { title: string; description: string };

const TRACKS = [
  { label: "Applications", desc: "Cloud-native apps built around specific business needs — without disrupting the core.", icon: LayoutDashboard },
  { label: "Extensions", desc: "Upgrade-ready side-by-side extensions using SAP Extension Suite.", icon: Puzzle },
  { label: "Experiences", desc: "Intuitive Fiori and UI5 interfaces that lift productivity and adoption.", icon: MousePointerClick },
];

const LAYERS = [
  { label: "Fiori & UI5", tone: "#38bdf8", desc: "Responsive user experiences across devices" },
  { label: "CAP & RAP Services", tone: "#22d3ee", desc: "Maintainable service layers and business logic" },
  { label: "SAP BTP Platform", tone: "#2f8fff", desc: "Runtime, security, and build services" },
  { label: "Integration Suite", tone: "#8b7cf6", desc: "APIs, events, and prebuilt connectors" },
  { label: "SAP Core", tone: "#7edcc2", desc: "Standard S/4HANA — clean and upgrade-ready" },
];

const TRIPLETS = [
  { label: "Integration", desc: "Governed APIs, events, and connectors that unify SAP and third-party systems.", icon: Plug },
  { label: "Data", desc: "Model and expose enterprise data for responsive, real-time applications.", icon: Database },
  { label: "AI", desc: "Embed intelligence and automation into the experiences you build.", icon: Brain },
];

export default function SapBtpPage({ offerings, impacts }: { offerings: ServiceItem[]; impacts: ServiceItem[] }) {
  return (
    <main className="overflow-hidden bg-[#030713] text-white">
      {/* HERO */}
      <ServiceHero
        bgClass="bg-[#030713]"
        glow={["rgba(41,171,135,0.3)", "rgba(245,166,35,0.2)"]}
        scene={<BtpExplodedLayers />}
        fadeTo="#030713"
      />

      {/* WHAT WE BUILD + HERO TAIL */}
      <section className="relative bg-[#050817]">
        <div aria-hidden className="absolute inset-x-0 top-0 flex justify-center">
          <div className="flex h-16 flex-col items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#29ab87] shadow-[0_0_10px_#29ab87]" />
            <div className="h-12 w-px bg-gradient-to-b from-[#29ab87]/70 to-transparent" />
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-12">
          <div>
            <SlideReveal direction="left">
              <SectionLabel>What we build</SectionLabel>
              <h2 className={`mt-5 ${introLead} text-white`}>
                Modern apps, a <span className="bg-gradient-to-r from-[#29ab87] to-[#f5a623] bg-clip-text text-transparent">clean core</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
                We design cloud-native applications, side-by-side extensions, intuitive Fiori experiences, and
                automated workflows on SAP BTP — so teams work faster while keeping the SAP core clean.
              </p>
            </SlideReveal>
            <StaggerReveal className="mt-10 grid gap-3 sm:grid-cols-3" stagger={0.1}>
              {TRACKS.map((t) => {
                const Icon = t.icon;
                return (
                  <StaggerRevealItem key={t.label} variant="fadeIn">
                    <Glass variant="frosted" tone="green" className="h-full p-5">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#29ab87] to-[#117a4b] text-white">
                        <Icon className="h-5 w-5" strokeWidth={1.9} />
                      </span>
                      <h3 className="mt-4 font-bold text-white">{t.label}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-slate-400">{t.desc}</p>
                    </Glass>
                  </StaggerRevealItem>
                );
              })}
            </StaggerReveal>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Reveal>
              <Glass variant="frosted" tone="green" className="p-6">
                <Metric to={3} suffix="x" label="Faster delivery" accent="text-[#29ab87]" />
              </Glass>
            </Reveal>
            <Reveal delay={0.1}>
              <Glass variant="frosted" tone="amber" className="p-6">
                <Metric to={0} label="Core disruption" accent="text-[#f5a623]" sub="extensions live outside the core" />
              </Glass>
            </Reveal>
            <Reveal delay={0.2}>
              <Glass variant="frosted" tone="cyan" className="p-6">
                <Metric to={100} suffix="%" label="Upgrade readiness" accent="text-[#29ab87]" />
              </Glass>
            </Reveal>
            <Reveal delay={0.3}>
              <Glass variant="frosted" tone="green" className="p-6">
                <Metric to={60} suffix="%" label="Less custom code" accent="text-[#117a4b]" />
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
              Full-stack capabilities on <span className="bg-gradient-to-r from-[#29ab87] to-[#f5a623] bg-clip-text text-transparent">SAP BTP</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              Reusable services and proven patterns across the entire application stack.
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

      {/* APP ARCHITECTURE (DARK / GLOWING GREY - HEX GRID PRESERVED) */}
      <section className="relative overflow-hidden bg-[#121927] py-20 text-white sm:py-28">
        <div aria-hidden className="absolute inset-0 tri-hex-grid opacity-60" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(50%_60%_at_80%_15%,rgba(41,171,135,0.2),transparent_60%)]" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <Reveal>
                <SectionLabel dark>Application architecture</SectionLabel>
                <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
                  One coherent <span className="bg-gradient-to-r from-[#29ab87] to-[#f5a623] bg-clip-text text-transparent">technology stack</span>
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
                  Every layer has a job. Fiori on top, CAP services underneath, and the SAP core kept standard at the
                  foundation.
                </p>
              </Reveal>
              <StaggerReveal className="mt-8 grid gap-3 sm:grid-cols-2" stagger={0.08}>
                {impacts.slice(0, 4).map((i) => (
                  <StaggerRevealItem key={i.title} variant="fadeIn">
                    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#29ab87]" />
                      <div>
                        <p className="font-bold text-white">{i.title}</p>
                        <p className="mt-1 text-xs leading-5 text-slate-300">{i.description}</p>
                      </div>
                    </div>
                  </StaggerRevealItem>
                ))}
              </StaggerReveal>
            </div>

            <div>
              <Reveal delay={0.15}>
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#162032]/90 p-8 backdrop-blur-md">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#29ab87]">Layer by layer</p>
                  <div className="mt-6 space-y-3">
                    {LAYERS.map((l, i) => (
                      <motion.div
                        key={l.label}
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5, delay: i * 0.12 }}
                        className="relative flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"
                      >
                        <span className="h-8 w-1 rounded-full" style={{ background: l.tone, boxShadow: `0 0 10px ${l.tone}` }} />
                        <span className="flex-1">
                          <span className="block text-sm font-bold text-white">{l.label}</span>
                          <span className="block text-xs text-slate-400">{l.desc}</span>
                        </span>
                        <span className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: l.tone }}>
                          {i + 1}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-center gap-3 rounded-xl border border-[#29ab87]/25 bg-[#29ab87]/[0.08] px-4 py-3">
                    <Rocket className="h-5 w-5 shrink-0 text-[#29ab87]" />
                    <p className="text-sm text-slate-200">
                      <span className="font-bold text-white">Ship fast, stay clean</span> — reusable services accelerate
                      every new build.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* INTEGRATION · DATA · AI */}
      <section className="relative bg-[#162032] py-20 sm:py-24">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionLabel className="justify-center">Connected by default</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Everything your apps <span className="bg-gradient-to-r from-[#29ab87] to-[#f5a623] bg-clip-text text-transparent">need</span>
            </h2>
          </Reveal>

          <StaggerReveal className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.12}>
            {TRIPLETS.map((t) => {
              const Icon = t.icon;
              return (
                <StaggerRevealItem key={t.label} variant="fadeIn">
                  <div className="flex h-full flex-col items-center rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-xl backdrop-blur-xl">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#29ab87] to-[#117a4b] text-white shadow-lg shadow-violet-950/20">
                      <Icon className="h-7 w-7" strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-5 text-xl font-bold text-white">{t.label}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">{t.desc}</p>
                  </div>
                </StaggerRevealItem>
              );
            })}
          </StaggerReveal>

          <Reveal delay={0.15}>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
              {["CAP", "RAP", "Fiori", "UI5", "Cloud Foundry", "Kyma", "HANA Cloud", "Integration Suite"].map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-300 backdrop-blur-sm">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <ServiceCta
        accent="violet"
        title="Build your next application on SAP BTP?"
        description="Work with our full-stack BTP team to design, extend, and ship modern SAP experiences."
      />
    </main>
  );
}
