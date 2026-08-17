"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientButton from "@/components/ui/GradientButton";
import SAPEcosystem from "@/components/three/SAPEcosystem";
import { Reveal, StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import { ArrowRight, Blocks, Database, DatabaseZap, Landmark, LifeBuoy, LineChart } from "lucide-react";

const nodes = [
  { icon: Database, label: "S/4HANA", tone: "green" as const },
  { icon: LineChart, label: "Analytics Cloud", tone: "green" as const },
  { icon: Blocks, label: "BTP", tone: "amber" as const },
  { icon: DatabaseZap, label: "Data & Integration", tone: "mix" as const },
  { icon: Landmark, label: "Finance & Reporting", tone: "green" as const },
  { icon: LifeBuoy, label: "Support & AMS", tone: "amber" as const },
];

const capabilities = [
  "SAP S/4HANA implementation and system conversion",
  "SAP BPC, Group Reporting & Analytics Cloud",
  "BTP application development and integrations",
  "Data migration, integration & AI-assisted insights",
  "SAP support, AMS and continuous optimization",
];

export default function SAPCapabilities() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0b1d33] py-12 sm:py-14 lg:py-16 text-white border-t border-white/5">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-hex-grid opacity-45" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-30 tri-mesh opacity-50" />

      <Container className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <Reveal>
            <span className="tri-overline">SAP Ecosystem</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              One connected ecosystem across the{" "}
              <span className="tri-gradient-text">SAP landscape.</span>
            </h2>
            <p className="mt-2.5 max-w-xl text-xs leading-relaxed text-slate-300 sm:text-sm sm:leading-6">
              Trijotech works across the SAP stack — core ERP, analytics, finance, platform services, and managed support — so your systems stay connected and your teams keep full visibility.
            </p>
          </Reveal>

          <StaggerReveal className="mt-5 space-y-2.5" stagger={0.06}>
            {capabilities.map((capability) => (
              <StaggerRevealItem key={capability}>
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(160deg,#29ab87,#117a4b)] text-white shadow-sm">
                    <DatabaseZap className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                  <p className="text-xs font-medium leading-snug text-slate-200 sm:text-sm">{capability}</p>
                </div>
              </StaggerRevealItem>
            ))}
          </StaggerReveal>

          <Reveal delay={0.15}>
            <div className="mt-6">
              <GradientButton href="/services" size="md">
                Explore our services <ArrowRight className="h-4 w-4" />
              </GradientButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <SAPEcosystem nodes={nodes} />
        </Reveal>
      </Container>
    </section>
  );
}
