"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Check, CircleCheckBig, DatabaseZap, Layers3, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { Industry } from "@/lib/industries-data";
import PharmaAnimation from "@/components/industries/animations/PharmaAnimation";
import ManufacturingAnimation from "@/components/industries/animations/ManufacturingAnimation";
import FintechAnimation from "@/components/industries/animations/FintechAnimation";
import SteelAnimation from "@/components/industries/animations/SteelAnimation";
import TelecomAnimation from "@/components/industries/animations/TelecomAnimation";
import EntertainmentAnimation from "@/components/industries/animations/EntertainmentAnimation";
import { Reveal, SlideReveal, StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import Container from "@/components/ui/Container";
import GradientButton from "@/components/ui/GradientButton";

const capabilityIcons = [Layers3, DatabaseZap, BarChart3];

/* Trijotech tri-color composition — deep green / mint / amber */
const cardTones = [
  { color: "#117a4b", soft: "rgba(17,122,75,0.16)" },
  { color: "#29ab87", soft: "rgba(41,171,135,0.16)" },
  { color: "#f5a623", soft: "rgba(245,166,35,0.16)" },
];

export default function IndustryDetailClient({ industry }: { industry: Industry }) {
  const canonicalSlug = industry.slug;

  return (
    <main className="overflow-hidden bg-[#030713] text-white">
      {/* ── Hero Section ───────────────────────────── */}
      <section className="relative isolate flex h-screen min-h-[640px] w-full flex-col overflow-hidden bg-[#050817]">
        {/* Tri-color ambient backdrop */}
        <div aria-hidden className="absolute inset-0 -z-10 tri-mesh" />
        <div aria-hidden className="absolute inset-0 -z-10 tri-grid-bg" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-hex-grid opacity-40" />
        <div aria-hidden className="pointer-events-none absolute right-[8%] top-[14%] -z-10 h-64 w-64 rounded-full bg-[rgba(17,122,75,0.18)] blur-3xl tri-pulse" />
        <div aria-hidden className="pointer-events-none absolute bottom-[16%] left-[6%] -z-10 h-48 w-48 rounded-full bg-[rgba(245,166,35,0.16)] blur-3xl tri-pulse" style={{ animationDelay: "1.5s" }} />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 bg-[radial-gradient(45%_100%_at_50%_0%,rgba(41,171,135,0.1),transparent_70%)]" />

        {/* ── Retail & Supply Chain — Interactive Video Experience ── */}
        {canonicalSlug === "retail-supply-chain" ? (
          <>
            <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/videos/retail-hero-poster.jpg"
                className="h-full w-full object-cover opacity-100 scale-[1.7] sm:scale-100"
                style={{ objectPosition: "50% 42%" }}
              >
                <source src="/videos/retail-hero.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(3,7,19,0.72)_0%,rgba(3,7,19,0.16)_50%,rgba(3,7,19,0.04)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 z-20 h-[45%] bg-gradient-to-t from-[#030713]/85 via-[#030713]/30 to-transparent" />
            </div>

            {/* tri-color caption overlay — pinned to bottom */}
            <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-0.5.5 pb-0.5.5 text-center sm:px-0.5.5 sm:pb-0.5.5.5">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="tri-gradient-text text-[clamp(1rem,2.4vw,1.6rem)] font-extralight leading-tight tracking-tight"
              >
                SAP connects your entire retail value chain
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-0.5 text-[clamp(0.62rem,1.4vw,0.85rem)] font-extralight uppercase tracking-[0.18em] text-slate-200/90"
              >
                suppliers · warehouses · stores — one live platform
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-0.5.5 flex flex-wrap items-center justify-center gap-0.5.5"
              >
                {[
                  { value: "99.8%", label: "Inventory accuracy", color: "#117a4b" },
                  { value: "+8.2%", label: "Demand forecast", color: "#29ab87" },
                  { value: "98.7%", label: "On-time delivery", color: "#f5a623" },
                ].map((k) => (
                  <div
                    key={k.label}
                    className="flex items-center gap-0.5.5 rounded-xl border border-white/10 bg-white/[0.04] px-0.5.5 py-0.5 sm:px-0.5.5 sm:py-0.5.5 backdrop-blur-md"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: k.color, boxShadow: `0 0 8px ${k.color}` }} />
                    <span>
                      <span className="block text-xs font-extralight leading-none sm:text-xs" style={{ color: k.color }}>
                        {k.value}
                      </span>
                      <span className="mt-0.5 block text-[8px] font-extralight uppercase tracking-[0.12em] text-white/70 sm:text-[9px]">
                        {k.label}
                      </span>
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </>
        ) : canonicalSlug === "pharmaceuticals-life-sciences" ? (
          <PharmaAnimation />
        ) : canonicalSlug === "manufacturing" ? (
          <ManufacturingAnimation />
        ) : canonicalSlug === "fintech" ? (
          <FintechAnimation />
        ) : canonicalSlug === "steel-manufacturing" ? (
          <SteelAnimation />
        ) : canonicalSlug === "telecommunications" ? (
          <TelecomAnimation />
        ) : canonicalSlug === "entertainment" ? (
          <EntertainmentAnimation />
        ) : null}

        {/* Clean bottom boundary */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.08]" />
      </section>

      {/* ── Definition / Overview (Dynamic Scroll Load) ────────────── */}
      <section className="relative bg-[#050817] py-0.5.5 sm:py-0.5.5.5 border-b border-white/5">
        <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[rgba(41,171,135,0.08)] blur-3xl animate-float" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 translate-x-1/3 rounded-full bg-[rgba(245,166,35,0.07)] blur-3xl animate-float-reverse" />
        <Container className="relative">
          <Reveal>
            <div className="tri-border-gradient mx-auto max-w-5xl rounded-[2rem] bg-white/[0.03] p-0.5.5.5 shadow-2xl backdrop-blur-md sm:p-0.5.5.5">
              <p className="tri-overline">Definition</p>
              <div className="mt-0.5.5 grid gap-0.5.5 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <h2 className="tri-gradient-text text-[clamp(1.5rem,3vw,2.4rem)] font-light leading-[1.18] tracking-[-0.02em]">
                    {industry.subtitle}
                  </h2>
                </div>
                <div className="lg:col-span-4">
                  <p className="text-xs font-light leading-7 text-slate-300">
                    {industry.description}
                  </p>
                </div>
              </div>
              <div className="mt-0.5.5.5 flex items-center gap-0.5.5 border-t border-white/10 pt-0.5.5 text-xs font-extralight text-[#29ab87]">
                <CircleCheckBig className="h-5 w-5 text-[#29ab87]" /> SAP expertise shaped around your operation
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Capabilities (Dynamic Stagger Load) ─────────────────────── */}
      <section className="bg-[#030713] py-0.5.5 sm:py-0.5.5.5 border-b border-white/5">
        <Container className="relative">
          <Reveal>
            <div className="max-w-3xl">
              <p className="tri-overline">What we deliver</p>
              <h2 className="mt-0.5.5 text-xs font-extralight leading-[1.18] tracking-tight text-white sm:text-xs lg:text-[2.35rem] xl:text-[2.6rem] lg:leading-[1.15]">
                <span className="tri-gradient-text">Capabilities built for your industry</span>
              </h2>
              <p className="mt-0.5.5 text-xs font-light leading-relaxed text-slate-300/90 sm:text-xs">
                Practical technology capabilities that connect teams, data, and decisions across your organization.
              </p>
            </div>
          </Reveal>

          <StaggerReveal className="mt-0.5.5.5 grid gap-0.5.5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {industry.services.map((service, index) => {
              const Icon = capabilityIcons[index % capabilityIcons.length];
              const tone = cardTones[index % cardTones.length];
              return (
                <StaggerRevealItem key={service} className="h-full">
                  <motion.article
                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-0.5.5.5 shadow-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-2xl"
                    style={{ "--card-tone": tone.color, "--card-soft": tone.soft } as CSSProperties}
                  >
                    {/* tri-color top hairline */}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-0.5 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: `linear-gradient(90deg, #117a4b, #29ab87, #f5a623)` }}
                    />
                    <span
                      aria-hidden
                      className="absolute right-5 top-0.5.5 text-xs font-light transition-colors duration-300"
                      style={{ color: "rgba(255,255,255,0.06)" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div
                      className="relative flex h-12 w-12 items-center justify-center rounded-2xl border transition-colors duration-300 group-hover:text-white"
                      style={{ background: `var(--card-soft)`, borderColor: `var(--card-tone)` }}
                    >
                      <Icon className="h-6 w-6" style={{ color: `var(--card-tone)` }} aria-hidden="true" />
                    </div>
                    <h3 className="relative mt-0.5.5.5 text-xs font-light text-white transition-colors group-hover:text-[#7edcc2]">{service}</h3>
                    <p className="relative mt-0.5.5 flex-1 text-xs leading-relaxed text-slate-300">
                      Designed to improve visibility, simplify work, and support informed decisions.
                    </p>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -bottom-0.5.5 -right-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                      style={{ background: `radial-gradient(circle, var(--card-tone), transparent 70%)` }}
                    />
                  </motion.article>
                </StaggerRevealItem>
              );
            })}
          </StaggerReveal>
        </Container>
      </section>

      {/* ── Business Outcomes (Dynamic Scroll Load) ────────────────── */}
      <section className="bg-[#050817] py-0.5.5 sm:py-0.5.5.5 border-b border-white/5">
        <Container className="relative grid max-w-7xl gap-0.5.5 lg:grid-cols-2 lg:items-center lg:gap-0.5.5">
          <SlideReveal direction="left" className="flex flex-col gap-0.5.5">
            <div>
              <p className="tri-overline">Business value</p>
              <h2 className="mt-0.5.5 text-xs font-extralight leading-[1.18] tracking-tight text-white sm:text-xs lg:text-[2.35rem] xl:text-[2.6rem] lg:leading-[1.15]">
                <span className="tri-gradient-text">Outcomes you can build on</span>
              </h2>
              <p className="mt-0.5.5 text-xs font-light leading-relaxed text-slate-300/90 sm:text-xs">
                Our solutions focus on measurable improvements in performance, efficiency, and decision-making.
              </p>
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] bg-slate-950 border border-white/10 shadow-2xl">
              <Image
                src={industry.heroImage}
                alt={`${industry.title} business outcomes`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div aria-hidden className="absolute inset-0 opacity-30 tri-hex-grid" />
              <div className="absolute bottom-0 p-0.5.5 sm:p-0.5.5">
                <p className="text-xs font-light uppercase tracking-[0.2em] text-[#f5a623]">Built for lasting value</p>
                <p className="tri-gradient-text mt-0.5.5 max-w-md text-xs font-light leading-snug sm:text-xs">
                  Better data. Clearer decisions. Stronger operations.
                </p>
              </div>
            </div>
          </SlideReveal>

          <StaggerReveal className="grid gap-0.5.5 sm:grid-cols-2" stagger={0.08}>
            {industry.benefits.map((benefit, index) => {
              const tone = cardTones[index % cardTones.length];
              return (
                <StaggerRevealItem key={benefit} className="h-full">
                  <motion.div
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="flex h-full items-start gap-0.5.5 rounded-2xl border border-white/10 bg-white/[0.03] p-0.5.5.5 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                    style={{ "--benefit-tone": tone.color, "--benefit-soft": tone.soft } as CSSProperties}
                  >
                    <span
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                      style={{ background: "var(--benefit-soft)", color: "var(--benefit-tone)" }}
                    >
                      <Check className="h-4 w-4" />
                    </span>
                    <p className="font-extralight leading-relaxed text-white text-xs">{benefit}</p>
                  </motion.div>
                </StaggerRevealItem>
              );
            })}
          </StaggerReveal>
        </Container>
      </section>

      {/* ── CTA Banner (Dynamic Reveal) ────────────────────────── */}
      <section className="bg-[#030713] px-0.5.5.5 py-0.5.5 sm:px-0.5.5 sm:py-0.5.5 lg:px-0.5.5">
        <Container className="relative">
          <Reveal>
            <div
              className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 px-0.5.5 py-0.5.5.5 text-center shadow-2xl sm:px-0.5.5 sm:py-0.5.5"
              style={{ background: "linear-gradient(135deg, #117a4b 0%, #0b1d33 50%, #7a4a08 100%)" }}
            >
              <div className="absolute -right-20 -top-0.5.5.5 h-72 w-72 rounded-full border-[48px] border-white/5" />
              <div className="absolute -bottom-0.5.5 -left-24 h-64 w-64 rounded-full bg-[rgba(245,166,35,0.14)] blur-2xl" />
              <div className="relative mx-auto max-w-3xl">
                <p className="inline-flex items-center gap-0.5.5 text-xs font-light uppercase tracking-[0.2em] text-[#f5a623]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Let&apos;s work together
                </p>
                <h2 className="mt-0.5.5 text-xs font-extralight leading-[1.18] tracking-tight sm:text-xs lg:text-xs text-white">
                  <span className="tri-gradient-text">Ready to transform your {industry.title} operations?</span>
                </h2>
                <p className="mx-auto mt-0.5.5 max-w-2xl text-xs leading-relaxed text-slate-300 sm:text-xs">
                  Connect with Trijotech to explore SAP solutions designed around your organization, priorities, and growth plans.
                </p>
                <div className="mt-0.5.5.5 flex justify-center">
                  <GradientButton href="/contact" size="lg">
                    Start a conversation <ArrowRight className="h-4 w-4" />
                  </GradientButton>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
