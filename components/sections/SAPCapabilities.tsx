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
    <section className="relative isolate overflow-hidden bg-[#030713] py-24 text-white sm:py-28">
      <div aria-hidden className="absolute inset-0 -z-20 tri-mesh tri-hex-grid" />

      <Container className="relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <SectionHeading
              eyebrow="SAP Ecosystem"
              dark
              title={
                <>
                  One connected ecosystem across the{" "}
                  <span className="tri-gradient-text">SAP landscape.</span>
                </>
              }
              description="Trijotech works across the SAP stack — core ERP, analytics, finance, platform services, and managed support — so your systems stay connected and your teams keep full visibility."
            />
          </Reveal>

          <StaggerReveal className="mt-9 space-y-4" stagger={0.08}>
            {capabilities.map((capability) => (
              <StaggerRevealItem key={capability}>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(160deg,#29ab87,#117a4b)] text-white">
                    <DatabaseZap className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <p className="text-base leading-7 text-slate-300">{capability}</p>
                </div>
              </StaggerRevealItem>
            ))}
          </StaggerReveal>

          <Reveal delay={0.2}>
            <div className="mt-10">
              <GradientButton href="/services" size="lg">
                Explore our services <ArrowRight className="h-5 w-5" />
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
