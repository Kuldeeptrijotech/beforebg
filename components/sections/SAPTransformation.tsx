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
    <section className="relative isolate overflow-hidden bg-[#0b1d33] py-12 sm:py-14 lg:py-16 text-white border-t border-white/5">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-30 tri-hex-grid opacity-45" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-mesh opacity-50" />
      <div aria-hidden className="absolute inset-0 -z-10 opacity-35">
        <DataFlow className="h-full w-full" />
      </div>
      {/* ambient glow */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[rgba(41,171,135,0.5)] to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/4 h-64 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(41,171,135,0.08),transparent)]" />

      <Container className="relative">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="tri-overline">Transformation Journey</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              From strategy to running systems,{" "}
              <span className="tri-gradient-text">one connected journey.</span>
            </h2>
            <p className="mt-2.5 max-w-2xl text-xs leading-relaxed text-slate-300 sm:text-sm sm:leading-6">
              A structured path that keeps every SAP program practical, transparent, and tied to measurable outcomes.
            </p>
          </div>
        </Reveal>

        <StaggerReveal className="relative mt-8 sm:mt-10 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch" stagger={0.08}>
          {/* connector line */}
          <div aria-hidden className="absolute left-8 right-8 top-5 hidden h-px lg:block">
            <div className="h-full w-full bg-[linear-gradient(90deg,transparent,rgba(41,171,135,0.5),rgba(245,166,35,0.45),rgba(41,171,135,0.3),transparent)]" />
          </div>

          {steps.map((item) => (
            <StaggerRevealItem key={item.step} className="h-full">
              <div className="group relative flex h-full flex-col rounded-2xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-300 hover:border-[#29ab87]/30 hover:bg-white/[0.04]">
                {/* Step badge with connector dot */}
                <div className="relative z-10 flex w-fit flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <HexBadge icon={item.icon} tone={item.tone} size="md" />
                    <span
                      className="text-2xl sm:text-3xl font-black leading-none tracking-tight transition-all duration-500"
                      style={{
                        WebkitTextStroke: "1px rgba(255,255,255,0.14)",
                        color: "transparent",
                      }}
                    >
                      {item.step}
                    </span>
                  </div>
                </div>
                <h3 className="mt-3.5 text-base sm:text-lg font-bold leading-snug text-white group-hover:text-[#7edcc2] transition-colors">{item.title}</h3>
                <div className="mt-2 h-px w-8 bg-[linear-gradient(90deg,#29ab87,#f5a623)] opacity-60 transition-all duration-500 group-hover:w-14 group-hover:opacity-100" />
                <p className="mt-2.5 flex-1 text-xs leading-relaxed text-slate-300">{item.description}</p>
              </div>
            </StaggerRevealItem>
          ))}
        </StaggerReveal>

        <Reveal delay={0.12} className="mt-7 sm:mt-9 flex justify-center">
          <div className="tri-glass-card tri-border-gradient inline-flex flex-col items-center gap-3.5 rounded-xl px-5 py-3 sm:flex-row sm:gap-5 sm:px-7">
            <Workflow className="h-5 w-5 shrink-0 text-tri-2 animate-glow-pulse" strokeWidth={1.75} />
            <p className="text-center text-xs sm:text-sm font-medium leading-relaxed text-slate-200 sm:text-left">
              Every phase is delivered by SAP-certified teams with transparent reporting and{" "}
              <span className="tri-gradient-text font-bold">quality checkpoints</span> built in.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
