"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import HexBadge from "@/components/ui/HexBadge";
import DataFlow from "@/components/three/DataFlow";
import { Reveal, StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import { Blocks, ClipboardCheck, Rocket, Route, Workflow } from "lucide-react";

const steps = [
  {
    icon: Route,
    tone: "green" as const,
    step: "01",
    title: "Discover & Strategize",
    description:
      "We map your current SAP landscape, business goals, and constraints into a clear transformation roadmap.",
  },
  {
    icon: ClipboardCheck,
    tone: "mix" as const,
    step: "02",
    title: "Design & Plan",
    description:
      "Solution design, data strategy, and delivery planning built around your processes, not boilerplate.",
  },
  {
    icon: Blocks,
    tone: "amber" as const,
    step: "03",
    title: "Build & Integrate",
    description:
      "Certified teams implement, extend, and integrate across SAP and non-SAP systems with quality checkpoints.",
  },
  {
    icon: Rocket,
    tone: "green" as const,
    step: "04",
    title: "Run & Optimize",
    description:
      "Stabilize, support, and continuously improve so your SAP landscape keeps delivering business value.",
  },
];

export default function SAPTransformation() {
  return (
    <section className="relative isolate overflow-hidden bg-[#050817] py-28 text-white sm:py-36">
      <div aria-hidden className="absolute inset-0 -z-20 tri-grid-bg opacity-70" />
      <div aria-hidden className="absolute inset-0 -z-10 opacity-40">
        <DataFlow className="h-full w-full" />
      </div>
      {/* ambient glow */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[rgba(41,171,135,0.5)] to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/4 h-64 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(41,171,135,0.08),transparent)]" />

      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Transformation Journey"
            dark
            align="center"
            className="mx-auto max-w-3xl"
            title={
              <>
                From strategy to running systems,{" "}
                <span className="tri-gradient-text">one connected journey.</span>
              </>
            }
            description="A structured path that keeps every SAP program practical, transparent, and tied to measurable outcomes."
          />
        </Reveal>

        <StaggerReveal className="relative mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-4" stagger={0.11}>
          {/* connector line */}
          <div aria-hidden className="absolute left-8 right-8 top-6 hidden h-px lg:block">
            <div className="h-full w-full bg-[linear-gradient(90deg,transparent,rgba(41,171,135,0.5),rgba(245,166,35,0.45),rgba(41,171,135,0.3),transparent)]" />
          </div>

          {steps.map((item, idx) => (
            <StaggerRevealItem key={item.step}>
              <div className="group relative flex h-full flex-col">
                {/* Step badge with connector dot on the line */}
                <div className="relative z-10 flex w-fit flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <HexBadge icon={item.icon} tone={item.tone} size="lg" />
                    <span
                      className="text-4xl font-black leading-none tracking-tight transition-all duration-500"
                      style={{
                        WebkitTextStroke: "1px rgba(255,255,255,0.12)",
                        color: "transparent",
                      }}
                    >
                      {item.step}
                    </span>
                  </div>
                </div>
                <h3 className="mt-7 text-xl font-bold leading-snug text-white">{item.title}</h3>
                <div className="mt-4 h-px w-10 bg-[linear-gradient(90deg,#29ab87,#f5a623)] opacity-60 transition-all duration-500 group-hover:w-16 group-hover:opacity-100" />
                <p className="mt-4 flex-1 text-sm leading-[1.8] text-slate-400">{item.description}</p>
              </div>
            </StaggerRevealItem>
          ))}
        </StaggerReveal>

        <Reveal delay={0.15} className="mt-20 flex justify-center">
          <div className="tri-glass-card tri-border-gradient inline-flex flex-col items-center gap-5 rounded-2xl px-7 py-6 sm:flex-row sm:gap-7 sm:px-10">
            <Workflow className="h-9 w-9 shrink-0 text-tri-2 animate-glow-pulse" strokeWidth={1.5} />
            <p className="text-center text-base font-medium leading-relaxed text-slate-200 sm:text-left">
              Every phase is delivered by SAP-certified teams with transparent reporting and{" "}
              <span className="tri-gradient-text font-bold">quality checkpoints</span> built in.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
