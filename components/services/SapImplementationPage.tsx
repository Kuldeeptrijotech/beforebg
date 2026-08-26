"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Code2,
  Cog,
  Database,
  Layers,
  Lock,
  Rocket,
  Server,
  ShieldCheck,
  Target,
  Zap,
} from "lucide-react";
import { Reveal, SlideReveal, StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import ServiceHero from "@/components/services/ServiceHero";
import { Glass, Metric, SectionLabel, ServiceCta, heroH1, introLead } from "@/components/services/service-ui";
import Container from "@/components/ui/Container";
import TiltCard from "@/components/ui/TiltCard";

const HEX_CLIP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

type ServiceItem = { title: string; description: string };

const STEPS = [
  { n: "01", label: "Assess & plan", icon: Target },
  { n: "02", label: "Configure", icon: Cog },
  { n: "03", label: "Develop & test", icon: Code2 },
  { n: "04", label: "Migrate data", icon: Database },
  { n: "05", label: "Go-live & optimize", icon: Rocket },
];

const STACK = [
  { label: "Strategy & Governance", desc: "Roadmaps, delivery models, and governance that keep transformation on track.", icon: ShieldCheck },
  { label: "SAP Solutions", desc: "S/4HANA, consolidation, planning, and analytics built around your business.", icon: Server },
  { label: "Platform & Clean Core", desc: "BTP extensions that keep the core standard, stable, and upgrade-ready.", icon: Layers },
  { label: "Data & Foundation", desc: "A trusted data backbone that powers reporting and intelligent decisions.", icon: Database },
];

const EXTENSIONS = ["Consolidation", "Planning", "Analytics", "Automation", "Integrations", "Profitability"];

export default function SapImplementationPage({ offerings, impacts }: { offerings: ServiceItem[]; impacts: ServiceItem[] }) {
  return (
    <main className="service-detail-page public-alternating-page font-sans overflow-hidden bg-[#030713] text-white">
      {/* HERO */}
      <ServiceHero
        eyebrow=""
        title="Strategy, Implementation & Full-Lifecycle SAP Consulting"
        subtitle="Plan, deliver, and optimize standard and cloud-native SAP landscapes with accountable delivery ownership."
        primaryCta={{ label: "Consult our SAP team", href: "/contact" }}
        secondaryCta={{ label: "Explore all services", href: "/services" }}
        metrics={[
          { value: "9+", label: "Years Experience" },
          { value: "100+", label: "Projects Delivered" },
          { value: "100%", label: "Delivery Ownership" },
        ]}
      />

      {/* INTRODUCTION + HERO TAIL */}
      <section className="relative bg-white text-slate-900 py-16 sm:py-20 border-b border-slate-200">
        <div className="detail-split-grid mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-12">
          <div>
            <SlideReveal direction="left">
              <SectionLabel dark={false}>Our approach</SectionLabel>
              <h2 className={`mt-2 text-[clamp(1.4rem,2.6vw,2.1rem)] font-bold leading-[1.16] tracking-[-0.02em] text-slate-900`}>
                Strategy, technology and data — one transformation
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                Whether you are starting fresh with SAP or modernizing an established landscape, we combine strategy,
                technology, and industry knowledge to create measurable outcomes — and an enterprise ready for what
                comes next.
              </p>
            </SlideReveal>
            <StaggerReveal className="mt-10 grid max-w-xl gap-3" stagger={0.08}>
              {impacts.slice(0, 2).map((i) => (
                <StaggerRevealItem key={i.title} variant="fadeIn">
                  <div className="service-surface-card flex items-start gap-3 rounded-2xl border-0 bg-[#008fd3] text-white p-4 shadow-[0_10px_30px_rgba(0,143,211,0.22)] transition-all duration-300 hover:bg-[#007bb8]">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#008fd3] shadow-xs">
                      <CheckCircle2 className="h-4.5 w-4.5 text-[#008fd3]" />
                    </span>
                    <div>
                      <p className="font-bold text-white">{i.title}</p>
                      <p className="mt-0.5 text-sm leading-6 text-white/90">{i.description}</p>
                    </div>
                  </div>
                </StaggerRevealItem>
              ))}
            </StaggerReveal>
          </div>

          <div className="grid grid-cols-2 gap-4 items-stretch">
            <Reveal className="h-full">
              <div className="h-full rounded-2xl border border-[#38bdf8] bg-[#008fd3] p-5 shadow-[0_20px_46px_-30px_rgba(10,110,209,0.82),inset_0_0_0_1px_rgba(255,255,255,0.14)] transition-colors duration-300 hover:bg-[#007bb8] sm:p-6">
                <Metric to={9} suffix="+" label="Years of SAP expertise" accent="text-white" />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <div className="h-full rounded-2xl border border-[#38bdf8] bg-[#008fd3] p-5 shadow-[0_20px_46px_-30px_rgba(10,110,209,0.82),inset_0_0_0_1px_rgba(255,255,255,0.14)] transition-colors duration-300 hover:bg-[#007bb8] sm:p-6">
                <Metric to={100} suffix="+" label="Projects delivered" accent="text-white" />
              </div>
            </Reveal>
            <Reveal delay={0.2} className="h-full">
              <div className="h-full rounded-2xl border border-[#38bdf8] bg-[#008fd3] p-5 shadow-[0_20px_46px_-30px_rgba(10,110,209,0.82),inset_0_0_0_1px_rgba(255,255,255,0.14)] transition-colors duration-300 hover:bg-[#007bb8] sm:p-6">
                <Metric to={100} suffix="%" label="Go-live success rate" accent="text-white" />
              </div>
            </Reveal>
            <Reveal delay={0.3} className="h-full">
              <div className="h-full rounded-2xl border border-[#38bdf8] bg-[#008fd3] p-5 shadow-[0_20px_46px_-30px_rgba(10,110,209,0.82),inset_0_0_0_1px_rgba(255,255,255,0.14)] transition-colors duration-300 hover:bg-[#007bb8] sm:p-6">
                <Metric to={30} suffix="+" label="Founder industry expertise" accent="text-white" />
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
            <SectionLabel dark={true}>Delivery journey</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              From blueprint to go-live
            </h2>
          </Reveal>

          <div className="relative mt-14">
            <div aria-hidden className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[#38bdf8]/70 via-[#38bdf8]/50 to-transparent lg:left-0 lg:top-8 lg:h-px lg:w-full lg:bg-gradient-to-r z-0" />
            <div className="grid gap-6 lg:grid-cols-5 relative z-10">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <StaggerRevealItem key={s.n} variant="scale" className="relative pl-16 lg:pl-0 lg:pt-10">
                    <span
                      aria-hidden
                      className="absolute left-6 top-0 flex -translate-x-1/2 items-center justify-center lg:left-0 lg:top-8 lg:-translate-y-1/2 lg:translate-x-0 z-30"
                    >
                      <motion.span
                        className="relative z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#121927] text-white shadow-lg shadow-cyan-950/10"
                        animate={{ scale: [1, 1.12, 1] }}
                        transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                      >
                        <Icon className="h-5 w-5 text-[#38bdf8]" strokeWidth={1.9} />
                      </motion.span>
                    </span>
                    <Glass variant="frosted" tone="cyan" className="relative z-10 p-5">
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#38bdf8]">{s.n}</p>
                      <h3 className="mt-2 text-lg font-bold text-white">{s.label}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {i === 0 && "Prioritize goals, define scope, and build the transformation roadmap."}
                        {i === 1 && "Configure core processes to fit your operating model and standards."}
                        {i === 2 && "Build, integrate, and test end-to-end before anything goes live."}
                        {i === 3 && "Move data with validation, reconciliation, and cutover planning."}
                        {i === 4 && "Deploy, stabilize, and keep optimizing after launch."}
                      </p>
                    </Glass>
                  </StaggerRevealItem>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* CAPABILITIES */}
      <section className="relative bg-white text-slate-900 py-20 sm:py-24 border-b border-slate-200">
        <Container>
          <div className="detail-split-grid grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <Reveal>
              <SectionLabel dark={false}>What we deliver</SectionLabel>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Capabilities built around your priorities
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-xl text-lg leading-8 text-slate-600">
                Flexible capabilities that connect strategy, technology, data, and day-to-day operations — delivered as
                one coherent program.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offerings.map((o, i) => (
              <StaggerRevealItem key={o.title} variant="scale">
                <TiltCard max={6} scale={1.02} className="h-full">
                  <div className="h-full rounded-2xl border border-[#38bdf8] bg-[#008fd3] shadow-[0_20px_46px_-30px_rgba(10,110,209,0.82),inset_0_0_0_1px_rgba(255,255,255,0.14)] transition-colors duration-300 hover:bg-[#007bb8] p-7">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 bg-white/15 text-[11px] font-bold text-white">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl font-bold text-white">{o.title}</h3>
                    </div>
                    <p className="mt-4 leading-7 text-white/90">{o.description}</p>
                  </div>
                </TiltCard>
              </StaggerRevealItem>
            ))}
          </div>
        </Container>
      </section>

      {/* SAP ARCHITECTURE (DARK) */}
      <section className="relative overflow-hidden bg-[#050817] py-20 text-white sm:py-28 border-b border-white/10">
        <div aria-hidden className="absolute inset-0 tri-hex-grid opacity-60" />
        <Container className="relative">
          <Reveal className="max-w-2xl">
            <SectionLabel dark={true}>How it comes together</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl text-white">
              A clean core with flexible edges
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              We keep your SAP core standard and upgrade-ready, moving everything extensible to the platform layer
              around it.
            </p>
          </Reveal>

          <div className="detail-split-grid mt-14 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative">
              <div aria-hidden className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[#38bdf8]/60 to-[#38bdf8]/20" />
              {STACK.map((s, i) => {
                const Icon = s.icon;
                return (
                  <Reveal key={s.label} delay={i * 0.1}>
                    <div className="relative mb-5 pl-16 last:mb-0">
                      <span className="absolute left-0 top-1 flex h-12 w-12 items-center justify-center" style={{ clipPath: HEX_CLIP, background: "linear-gradient(160deg,#22d3ee,#2563eb)" }}>
                        <Icon className="h-5 w-5 text-white" strokeWidth={1.9} />
                      </span>
                      <div className="service-surface-card rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                        <h3 className="text-lg font-bold text-white">{s.label}</h3>
                        <p className="mt-1.5 text-sm leading-6 text-slate-300">{s.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <div>
              <Reveal delay={0.15}>
                <div className="service-surface-card relative overflow-hidden rounded-3xl border border-white/10 bg-[#162032]/90 p-8 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                     <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#38bdf8]">Clean core model</p>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-2.5 py-1 text-[10px] font-bold text-white">
                      <Lock className="h-3 w-3" /> Standard & stable
                    </span>
                  </div>
                  <div className="mt-8 flex justify-center">
                    <div className="flex h-36 w-36 items-center justify-center text-center" style={{ clipPath: HEX_CLIP, background: "linear-gradient(160deg,#22d3ee,#2563eb)", boxShadow: "0 0 60px rgba(34,211,238,0.35)" }}>
                      <div>
                        <p className="text-sm font-extrabold text-white">SAP Core</p>
                        <p className="mt-1 px-4 text-[10px] leading-4 text-white/75">S/4HANA standard, minimal custom code</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 grid grid-cols-3 gap-2.5">
                    {EXTENSIONS.map((e) => (
                      <div key={e} className="flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-2 py-2 text-center text-[10px] font-semibold text-slate-200">
                        {e}
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 text-center text-xs text-slate-400">
                    Everything non-core lives outside — as governed extensions on BTP.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* WHY TRIJOTECH */}
      <section className="relative bg-white text-slate-900 py-20 sm:py-24 border-b border-slate-200">
        <Container>
          <div className="detail-split-grid grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <Reveal>
                <SectionLabel dark={false}>Why Trijotech</SectionLabel>
                <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                  Outcomes you can build on
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-8 flex items-center gap-4 h-full rounded-2xl border border-[#38bdf8] bg-[#008fd3] shadow-[0_20px_46px_-30px_rgba(10,110,209,0.82),inset_0_0_0_1px_rgba(255,255,255,0.14)] transition-colors duration-300 hover:bg-[#007bb8] p-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/25 bg-white/15 text-white">
                    <Zap className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-2xl font-extrabold text-white">Practical delivery</p>
                    <p className="text-sm text-white/90">Structured governance, testing, migration, and adoption throughout.</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <StaggerReveal className="grid gap-5 sm:grid-cols-2" stagger={0.1}>
              {impacts.map((i) => (
                <StaggerRevealItem key={i.title} variant="slideRight">
                  <div className="h-full rounded-2xl border border-[#38bdf8] bg-[#008fd3] shadow-[0_20px_46px_-30px_rgba(10,110,209,0.82),inset_0_0_0_1px_rgba(255,255,255,0.14)] transition-colors duration-300 hover:bg-[#007bb8] p-6">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                    <h3 className="mt-4 text-xl font-bold text-white">{i.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/90">{i.description}</p>
                  </div>
                </StaggerRevealItem>
              ))}
            </StaggerReveal>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <ServiceCta
        accent="violet"
        title="Ready to transform your SAP landscape?"
        description="Connect with our team to shape a practical implementation roadmap around your goals, data, and operating model."
      />
    </main>
  );
}

