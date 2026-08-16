"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientButton from "@/components/ui/GradientButton";
import { StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import { industries } from "@/lib/site-data";
import { ArrowRight, Factory, Pill, Radio, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const industryIcons = [Pill, Factory, Wallet, Radio];

export default function IndustriesPreview() {
  const visibleIndustries = industries.filter((industry) => industry.showOnHome);

  return (
    <section className="relative overflow-hidden bg-[#e8f2fb] py-28 text-slate-950 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[rgba(41,171,135,0.4)] to-transparent" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[rgba(245,166,35,0.1)] blur-[80px]" />
      <div aria-hidden className="pointer-events-none absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[rgba(41,171,135,0.08)] blur-[70px]" />

      <Container className="relative">
        <StaggerReveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <StaggerRevealItem className="max-w-2xl">
            <SectionHeading
              eyebrow="Industries"
              title={
                <>
                  SAP solutions shaped around{" "}
                  <span className="gradient-text">industry needs.</span>
                </>
              }
              description="We help organizations modernize operations, reporting, planning, and decision-making across industries with practical SAP expertise."
            />
          </StaggerRevealItem>
          <StaggerRevealItem>
            <GradientButton href="/industry" variant="outline" size="md">
              View all industries <ArrowRight className="h-4 w-4" />
            </GradientButton>
          </StaggerRevealItem>
        </StaggerReveal>

        <StaggerReveal className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {visibleIndustries.map((industry, i) => {
            const Icon = industryIcons[i % industryIcons.length];
            return (
              <StaggerRevealItem key={industry.title} className="h-full">
                <Link
                  href={industry.href}
                  className="tri-focus group relative block h-full overflow-hidden rounded-3xl"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={industry.image}
                      alt={industry.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    />
                    <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,19,0.08),rgba(3,7,19,0.85))]" />
                    <div aria-hidden className="absolute inset-0 bg-[linear-gradient(160deg,rgba(41,171,135,0.45),transparent_52%)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />

                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.08] text-white backdrop-blur-md transition-all duration-400 group-hover:scale-110 group-hover:bg-[linear-gradient(150deg,#29ab87,#117a4b)] group-hover:border-transparent">
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </span>
                      <h3 className="mt-4 text-[1.15rem] font-bold text-white">{industry.title}</h3>
                      <p className="mt-2 translate-y-2 text-sm leading-[1.65] text-slate-300 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                        {industry.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#7edcc2] transition-all duration-300 group-hover:gap-2.5">
                        Explore industry <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerRevealItem>
            );
          })}
        </StaggerReveal>
      </Container>
    </section>
  );
}
