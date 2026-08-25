"use client";

import {
  Brain,
  CheckCircle2,
  Database,
  LayoutDashboard,
  MousePointerClick,
  Plug,
  Puzzle,
} from "lucide-react";
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

const TRIPLETS = [
  { label: "Integration", desc: "Governed APIs, events, and connectors that unify SAP and third-party systems.", icon: Plug },
  { label: "Data", desc: "Model and expose enterprise data for responsive, real-time applications.", icon: Database },
  { label: "AI", desc: "Embed intelligence and automation into the experiences you build.", icon: Brain },
];

export default function SapBtpPage({ offerings, impacts }: { offerings: ServiceItem[]; impacts: ServiceItem[] }) {
  return (
    <main className="service-detail-page public-alternating-page font-sans overflow-hidden bg-[#030713] text-white">
      {/* HERO */}
      <ServiceHero
        eyebrow="SAP BTP Full-Stack Development"
        title="Custom Cloud Applications & Side-by-Side Extensions"
        subtitle="Build modern portals, mobile workflows, and clean-core extensions on SAP Business Technology Platform."
        description="We create future-proof solutions on SAP BTP using CAP, RAP, Fiori, and Integration Suite — preserving the core SAP system clean, standard, and continuously upgrade-ready."
        primaryCta={{ label: "Consult BTP architects", href: "/contact" }}
        secondaryCta={{ label: "Explore all services", href: "/services" }}
        metrics={[
          { value: "Clean Core", label: "Architecture Compliant" },
          { value: "Full-Stack", label: "CAP, RAP, UI5 & Fiori" },
          { value: "Secure", label: "Enterprise BTP Runtime" },
        ]}
      />

      {/* WHAT WE BUILD + HERO TAIL */}
      <section className="relative bg-[#050817]">
        <div aria-hidden className="absolute inset-x-0 top-0 flex justify-center">
          <div className="flex h-16 flex-col items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
            <div className="h-12 w-px bg-gradient-to-b from-[#ffffff]/70 to-transparent" />
          </div>
        </div>

        <div className="detail-split-grid mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-12">
          <div>
            <SlideReveal direction="left">
              <SectionLabel>What we build</SectionLabel>
              <h2 className={`mt-5 ${introLead} text-white`}>
                Modern apps, a <span className="bg-gradient-to-r from-[#ffffff] to-[#ffffff] bg-clip-text text-transparent">clean core</span>
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
                      <span className="btp-track-icon flex h-10 w-10 items-center justify-center rounded-xl">
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

          <div className="grid grid-cols-2 gap-4 items-stretch">
            <Reveal className="h-full">
              <Glass variant="frosted" tone="green" className="h-full p-5 sm:p-6">
                <Metric to={3} suffix="x" label="Faster delivery" accent="text-white" />
              </Glass>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <Glass variant="frosted" tone="amber" className="h-full p-5 sm:p-6">
                <Metric to={0} label="Core disruption" accent="text-white" sub="extensions live outside the core" />
              </Glass>
            </Reveal>
            <Reveal delay={0.2} className="h-full">
              <Glass variant="frosted" tone="cyan" className="h-full p-5 sm:p-6">
                <Metric to={100} suffix="%" label="Upgrade readiness" accent="text-white" />
              </Glass>
            </Reveal>
            <Reveal delay={0.3} className="h-full">
              <Glass variant="frosted" tone="green" className="h-full p-5 sm:p-6">
                <Metric to={60} suffix="%" label="Less custom code" accent="text-white" />
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
              Full-stack capabilities on <span className="bg-gradient-to-r from-[#ffffff] to-[#ffffff] bg-clip-text text-transparent">SAP BTP</span>
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

      {/* APP ARCHITECTURE (DARK / GLOWING GREY - HEX GRID PRESERVED) */}
      <section className="relative overflow-hidden bg-[#121927] py-20 text-white sm:py-28">
        <div aria-hidden className="absolute inset-0 tri-hex-grid opacity-60" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(50%_60%_at_80%_15%,rgba(255, 255, 255,0.2),transparent_60%)]" />
        <Container className="relative">
          <div className="mx-auto max-w-5xl">
            <div>
              <Reveal>
                <SectionLabel dark>Application architecture</SectionLabel>
                <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
                  One coherent <span className="bg-gradient-to-r from-[#ffffff] to-[#ffffff] bg-clip-text text-transparent">technology stack</span>
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
                  Every layer has a job. Fiori on top, CAP services underneath, and the SAP core kept standard at the
                  foundation.
                </p>
              </Reveal>
              <StaggerReveal className="mt-8 grid gap-3 sm:grid-cols-2" stagger={0.08}>
                {impacts.slice(0, 4).map((i) => (
                  <StaggerRevealItem key={i.title} variant="fadeIn">
                    <div className="btp-impact-card flex items-start gap-3 rounded-xl border p-4">
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

          </div>
        </Container>
      </section>

      {/* INTEGRATION · DATA · AI */}
      <section className="relative bg-[#162032] py-20 sm:py-24">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionLabel className="justify-center">Connected by default</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Everything your apps <span className="bg-gradient-to-r from-[#ffffff] to-[#ffffff] bg-clip-text text-transparent">need</span>
            </h2>
          </Reveal>

          <StaggerReveal className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.12}>
            {TRIPLETS.map((t) => {
              const Icon = t.icon;
              return (
                <StaggerRevealItem key={t.label} variant="fadeIn">
                  <div className="service-surface-card flex h-full flex-col items-center rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-xl backdrop-blur-xl">
                    <span className="btp-connected-icon flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffffff] to-[#ffffff] shadow-lg shadow-violet-950/20">
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
