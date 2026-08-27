"use client";

import Container from "@/components/ui/Container";
import GradientButton from "@/components/ui/GradientButton";
import { Reveal, StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import {
  ArrowRight,
  Blocks,
  Database,
  DatabaseZap,
  Landmark,
  Layers,
  LifeBuoy,
  LineChart,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const nodes = [
  { icon: Database, label: "SAP S/4HANA", desc: "Core cloud & on-premise ERP" },
  { icon: LineChart, label: "Analytics Cloud", desc: "Enterprise planning & SAC dashboards" },
  { icon: Blocks, label: "SAP BTP", desc: "Custom apps, extensions & workflows" },
  { icon: DatabaseZap, label: "Data & Integration", desc: "Automated pipelines & AI workflows" },
  { icon: Landmark, label: "Finance & Reporting", desc: "Group consolidation & PaPM analytics" },
  { icon: LifeBuoy, label: "Support & AMS", desc: "24/7 SLA governance & optimization" },
];

const capabilities: { text: string; icon: LucideIcon }[] = [
  {
    text: "SAP S/4HANA implementation and system conversion",
    icon: Layers,
  },
  {
    text: "SAP BPC, Group Reporting & Analytics Cloud",
    icon: LineChart,
  },
  {
    text: "BTP application development and integrations",
    icon: Blocks,
  },
  {
    text: "Data migration, integration & AI-assisted insights",
    icon: Sparkles,
  },
  {
    text: "SAP support, AMS and continuous optimization",
    icon: ShieldCheck,
  },
];

export default function SAPCapabilities() {
  return (
    <section className="relative isolate overflow-hidden bg-[#18263e] py-12 sm:py-14 lg:py-16 text-white border-t border-white/10">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-mesh opacity-60" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-30 tri-grid-bg opacity-25" />

      <Container className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <Reveal>
            <span className="tri-overline text-[#38bdf8]">SAP Ecosystem</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              One connected ecosystem across the SAP landscape.
            </h2>
            <p className="mt-2.5 max-w-xl text-xs leading-relaxed text-slate-300 sm:text-sm sm:leading-6">
              Trijotech works across the SAP stack — core ERP, analytics, finance, platform services, and managed support — so your systems stay connected and your teams keep full visibility.
            </p>
          </Reveal>

          <StaggerReveal className="mt-5 space-y-2.5" stagger={0.06}>
            {capabilities.map(({ text, icon: Icon }) => (
              <StaggerRevealItem key={text}>
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(160deg,#22d3ee,#2563eb)] text-white shadow-sm">
                    <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                  <p className="text-xs font-medium leading-snug text-slate-200 sm:text-sm">{text}</p>
                </div>
              </StaggerRevealItem>
            ))}
          </StaggerReveal>

          <Reveal delay={0.15}>
            <div className="mt-6">
              <GradientButton href="/services" variant="outline" size="md">
                Explore our services <ArrowRight className="h-4 w-4" />
              </GradientButton>
            </div>
          </Reveal>
        </div>

        <div>
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 gap-3.5" stagger={0.05}>
            {nodes.map((node) => {
              const Icon = node.icon;
              return (
                <StaggerRevealItem key={node.label}>
                  <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-900/60 p-3.5 transition-all duration-300 hover:border-cyan-400/50 hover:bg-slate-900/80">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(150deg,#22d3ee,#008fd3_60%,#1d4ed8)] text-white shadow-md">
                      <Icon className="h-4.5 w-4.5" strokeWidth={2.2} />
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white leading-snug">{node.label}</h4>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-300">{node.desc}</p>
                    </div>
                  </div>
                </StaggerRevealItem>
              );
            })}
          </StaggerReveal>
        </div>
      </Container>
    </section>
  );
}
