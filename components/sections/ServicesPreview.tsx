"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientButton from "@/components/ui/GradientButton";
import TiltCard from "@/components/ui/TiltCard";
import HexBadge from "@/components/ui/HexBadge";
import { StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import { services } from "@/lib/site-data";
import { ArrowRight, Blocks, Compass, DatabaseZap, HeartHandshake } from "lucide-react";

const serviceIcons = [Compass, HeartHandshake, Blocks, DatabaseZap];

export default function ServicesPreview() {
  const featuredServices = services.filter((service) => service.showOnHome);

  return (
    <section className="relative overflow-hidden bg-[#e8f2fb] py-28 sm:py-32">
      {/* Decorative ambient layers */}
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[rgba(41,171,135,0.1)] blur-[80px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 -left-28 h-[420px] w-[420px] rounded-full bg-[rgba(245,166,35,0.08)] blur-[80px]" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[rgba(41,171,135,0.35)] to-transparent" />

      <Container className="relative">
        <StaggerReveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <StaggerRevealItem className="max-w-2xl">
            <SectionHeading
              eyebrow="Services"
              title={
                <>
                  Practical SAP and digital services for{" "}
                  <span className="gradient-text">enterprise growth.</span>
                </>
              }
              description="Choose focused delivery teams for implementation, support, integration, application development, and data-led decisions."
            />
          </StaggerRevealItem>
          <StaggerRevealItem>
            <GradientButton href="/services" variant="outline" size="md">
              View all services <ArrowRight className="h-4 w-4" />
            </GradientButton>
          </StaggerRevealItem>
        </StaggerReveal>

        <StaggerReveal className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {featuredServices.map((service, i) => {
            const Icon = serviceIcons[i % serviceIcons.length];
            return (
              <StaggerRevealItem key={service.href} className="h-full">
                <TiltCard className="h-full">
                  <a
                    href={service.href}
                    className="tri-card-light tri-focus group flex h-full flex-col rounded-2xl p-7 transition-all duration-400"
                  >
                    <HexBadge icon={Icon} tone={i % 2 === 0 ? "green" : "mix"} size="md" />
                    <h3 className="mt-7 text-[1.05rem] font-bold leading-snug text-slate-900 transition-colors group-hover:text-tri-1">
                      {service.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-[1.75] text-slate-600">{service.description}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-tri-1 transition-all duration-300 group-hover:gap-3 group-hover:text-[#0f7a47]">
                      Learn more <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </TiltCard>
              </StaggerRevealItem>
            );
          })}
        </StaggerReveal>
      </Container>
    </section>
  );
}
