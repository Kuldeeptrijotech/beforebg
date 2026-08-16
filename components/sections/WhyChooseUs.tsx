"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import HexBadge from "@/components/ui/HexBadge";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import { Reveal, StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import { whyChooseStats, whyChooseUs } from "@/lib/site-data";
import { Award, Globe2, BadgeCheck } from "lucide-react";
import Image from "next/image";

const statValues = whyChooseStats.map((stat) => ({
  ...stat,
  numeric: parseInt(stat.value.replace(/[^0-9]/g, ""), 10) || 0,
  suffix: stat.value.replace(/[0-9]/g, ""),
}));

const itemIcons = [Award, Globe2, BadgeCheck];

export default function WhyChooseUs() {
  const visibleItems = whyChooseUs.filter((item) => item.showOnHome);

  return (
    <section className="relative isolate overflow-hidden bg-[#0b1d33] py-24 text-white sm:py-28">
      <div aria-hidden className="absolute inset-0 -z-20 tri-hex-grid" />
      <div aria-hidden className="tri-blob -z-10 h-80 w-80 animate-float-slow" style={{ right: "-10%", top: "8%", background: "radial-gradient(circle, rgba(245,166,35,0.14), transparent 70%)" }} />

      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Why Choose Us"
            dark
            align="center"
            className="mx-auto"
            title={
              <>
                SAP expertise built around{" "}
                <span className="tri-gradient-text">business outcomes.</span>
              </>
            }
            description="We combine certified SAP talent, business understanding, and structured delivery practices to help enterprises modernize with confidence."
          />
        </Reveal>

        {/* stats band */}
        <Reveal delay={0.1}>
          <div className="mt-14 grid gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4 sm:p-8">
            {statValues.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <p className="text-4xl font-bold sm:text-5xl">
                  <AnimatedCounter
                    to={stat.numeric}
                    suffix={stat.suffix}
                    className="tri-gradient-text"
                  />
                </p>
                <p className="mt-2 max-w-[14rem] text-sm font-medium leading-5 text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <StaggerReveal className="mt-12 grid gap-6 lg:grid-cols-3" stagger={0.1}>
          {visibleItems.map((item, index) => {
            const Icon = itemIcons[index % itemIcons.length];
            return (
              <StaggerRevealItem key={item.title} className="h-full">
                <article className="tri-glass-card group flex h-full flex-col overflow-hidden rounded-3xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                    />
                    <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(3,7,19,0.8))]" />
                    <HexBadge
                      icon={Icon}
                      tone={index === 1 ? "amber" : "green"}
                      size="lg"
                      className="absolute bottom-4 left-5"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold leading-7 text-white">{item.title}</h3>
                    <p className="mt-4 flex-1 text-sm leading-6 text-slate-400">{item.description}</p>
                  </div>
                </article>
              </StaggerRevealItem>
            );
          })}
        </StaggerReveal>
      </Container>
    </section>
  );
}
