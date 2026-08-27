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
import { Glass, Metric, SectionLabel, introLead } from "@/components/services/service-ui";
import Container from "@/components/ui/Container";


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
        primaryCta={{ label: "Consult BTP architects", href: "/contact" }}
        secondaryCta={{ label: "Explore all services", href: "/services" }}
        metrics={[
          { value: "Clean Core", label: "Architecture Compliant" },
          { value: "Full-Stack", label: "CAP, RAP, UI5 & Fiori" },
          { value: "Secure", label: "Enterprise BTP Runtime" },
        ]}
      />

      {/* WHAT WE BUILD + HERO TAIL */}
      <section className="relative bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen text-slate-900 py-16 sm:py-20 border-b border-slate-200">
        <div className="detail-split-grid mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-12">
          <div>
            <SlideReveal direction="left">
              <SectionLabel dark={false}>What we build</SectionLabel>
              <h2 className={`mt-5 ${introLead} text-slate-900`}>
                Modern apps, a clean core
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                We design cloud-native applications, side-by-side extensions, intuitive Fiori experiences, and
                automated workflows on SAP BTP — so teams work faster while keeping the SAP core clean.
              </p>
            </SlideReveal>
            <StaggerReveal className="mt-10 grid gap-3 sm:grid-cols-3" stagger={0.1}>
              {TRACKS.map((t) => {
                const Icon = t.icon;
                return (
                  <StaggerRevealItem key={t.label} variant="fadeIn" className="h-full">
                    <div className="service-surface-card flex h-full flex-col p-5 rounded-2xl border-0 bg-white text-slate-900 border border-slate-200 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 shadow-md transition-transform duration-300">
                        <Icon className="h-5 w-5 text-slate-900" strokeWidth={2.2} />
                      </div>
                      <h3 className="mt-4 font-bold text-slate-900 text-base sm:text-lg">{t.label}</h3>
                      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600">{t.desc}</p>
                    </div>
                  </StaggerRevealItem>
                );
              })}
            </StaggerReveal>
          </div>

          <div className="grid grid-cols-2 gap-4 items-stretch">
            <Reveal className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <Metric to={3} suffix="x" label="Faster delivery" accent="text-slate-900" />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <Metric to={0} label="Core disruption" accent="text-slate-900" sub="extensions live outside the core" />
              </div>
            </Reveal>
            <Reveal delay={0.2} className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <Metric to={100} suffix="%" label="Upgrade readiness" accent="text-slate-900" />
              </div>
            </Reveal>
            <Reveal delay={0.3} className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <Metric to={60} suffix="%" label="Less custom code" accent="text-slate-900" />
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
              Full-stack capabilities on SAP BTP
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Reusable services and proven patterns across the entire application stack.
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

      {/* APP ARCHITECTURE */}
      <section className="relative overflow-hidden bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen text-slate-900 py-20 sm:py-28 border-b border-slate-200">
        <Container className="relative">
          <div className="mx-auto max-w-5xl">
            <div>
              <Reveal>
                <SectionLabel dark={false}>Application architecture</SectionLabel>
                <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl text-slate-900">
                  One coherent technology stack
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                  Every layer has a job. Fiori on top, CAP services underneath, and the SAP core kept standard at the
                  foundation.
                </p>
              </Reveal>
              <StaggerReveal className="mt-8 grid gap-3 sm:grid-cols-2" stagger={0.08}>
                {impacts.slice(0, 4).map((i) => (
                  <StaggerRevealItem key={i.title} variant="fadeIn">
                    <div className="btp-impact-card flex items-start gap-3 rounded-2xl border-0 bg-white text-slate-900 border border-slate-200 p-4 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-900 shadow-xs">
                        <CheckCircle2 className="h-4.5 w-4.5 text-slate-900" />
                      </span>
                      <div>
                        <p className="font-bold text-slate-900">{i.title}</p>
                        <p className="mt-1 text-xs leading-5 text-slate-600">{i.description}</p>
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
      <section className="relative bg-[#050817] text-white py-20 sm:py-24 border-b border-white/10">
        <div aria-hidden className="absolute inset-0 tri-mesh opacity-50" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionLabel dark={true} className="justify-center">Connected by default</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Everything your apps need
            </h2>
          </Reveal>

          <StaggerReveal className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.12}>
            {TRIPLETS.map((t) => {
              const Icon = t.icon;
              return (
                <StaggerRevealItem key={t.label} variant="fadeIn">
                  <div className="service-surface-card flex h-full flex-col items-center rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-xl backdrop-blur-xl">
                    <span className="btp-connected-icon flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#38bdf8] to-[#2563eb] text-white shadow-lg">
                      <Icon className="h-7 w-7" strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-5 text-xl font-bold text-white">{t.label}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{t.desc}</p>
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
    </main>
  );
}
