"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Sparkles, Zap } from "lucide-react";
import OtherSolutions from "@/components/solutions/OtherSolutions";
import type { SolutionItem } from "@/lib/solutions-data";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

function CloudAtmosphere() {
  const layers = [
    { top: "10%", dur: 46, delay: 0, scale: 1, o: 0.45 },
    { top: "26%", dur: 62, delay: -18, scale: 1.4, o: 0.35 },
    { top: "42%", dur: 52, delay: -32, scale: 1.1, o: 0.4 },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden">
      {layers.map((c, i) => (
        <motion.div
          key={i}
          className="absolute left-0"
          style={{ top: c.top, filter: "blur(34px)", opacity: c.o }}
          animate={{ x: ["-42vw", "110vw"] }}
          transition={{ duration: c.dur, repeat: Infinity, ease: "linear", delay: c.delay }}
        >
          <div
            className="relative"
            style={{
              width: "34rem",
              height: "9rem",
              transform: `scale(${c.scale})`,
              background:
                "radial-gradient(closest-side at 18% 72%, rgba(148,187,220,0.5), transparent), radial-gradient(closest-side at 42% 46%, rgba(148,187,220,0.6), transparent), radial-gradient(closest-side at 68% 70%, rgba(148,187,220,0.5), transparent), radial-gradient(closest-side at 88% 50%, rgba(122,168,214,0.35), transparent), radial-gradient(closest-side at 50% 100%, rgba(148,187,220,0.4), transparent)",
            }}
          />
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_55%,rgba(186,212,236,0.06),transparent_70%)]" />
    </div>
  );
}

function OrbitRings() {
  const reduce = useReducedMotion();
  const ring = (size: string, border: string, tilt: string, dur: number, reverse = false, dashed = false) => (
    <div style={{ transform: tilt, transformStyle: "preserve-3d" }} className="absolute flex items-center justify-center">
      <motion.div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          border: dashed ? `1px dashed ${border}` : `1px solid ${border}`,
          boxShadow: "0 0 60px rgba(56,189,248,0.1)",
        }}
        animate={{ rotate: reduce ? 0 : reverse ? -360 : 360 }}
        transition={{ duration: dur, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-[4] flex items-center justify-center overflow-hidden">
      {ring("72vmin", "rgba(56,189,248,0.22)", "rotateX(74deg)", 28)}
      {ring("48vmin", "rgba(34,211,238,0.28)", "rotateX(58deg) rotateY(-12deg)", 18, true, true)}
      {ring("92vmin", "rgba(139,124,246,0.16)", "rotateX(80deg) rotateZ(16deg)", 40)}
      <div style={{ transform: "rotateX(74deg)" }} className="absolute flex h-[72vmin] w-[72vmin] items-center justify-center">
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: reduce ? 0 : 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#67e8f9] shadow-[0_0_14px_#67e8f9]" />
        </motion.div>
      </div>
    </div>
  );
}

type Props = {
  solution: SolutionItem;
  heroImage?: string;
  impactImage?: string;
  heroTitle?: string;
  showHeroCopy?: boolean;
  cleanImpactImage?: boolean;
  scene?: ReactNode;
  heroLayout?: "centered" | "split" | "split-reverse";
};

export default function SolutionDetailLanding({
  solution,
  heroImage = solution.heroImage,
  impactImage = solution.cardImage,
  heroTitle = solution.title,
  showHeroCopy = true,
  scene,
  heroLayout,
}: Props) {
  const layout: "centered" | "split" | "split-reverse" =
    heroLayout ??
    (solution.slug.includes("invoicing")
      ? "centered"
      : solution.slug.includes("consolidation")
        ? "split-reverse"
        : "split");

  const renderTitle = (title: string | ReactNode) => {
    if (typeof title !== "string") return title;
    const words = title.split(" ");
    if (words.length <= 1) {
      return (
        <span className="bg-gradient-to-r from-[#29ab87] via-[#117a4b] to-[#f5a623] bg-clip-text text-transparent">
          {title}
        </span>
      );
    }
    const lastWord = words.pop();
    const rest = words.join(" ");
    return (
      <>
        {rest}{" "}
        <span className="bg-gradient-to-r from-[#29ab87] via-[#117a4b] to-[#f5a623] bg-clip-text text-transparent">
          {lastWord}
        </span>
      </>
    );
  };

  const getDefinitionTitle = () => {
    if (solution.slug === "e-invoicing-pro") {
      return (
        <span className="bg-gradient-to-r from-[#29ab87] via-[#117a4b] to-[#f5a623] bg-clip-text text-transparent">
          E-Invoicing
        </span>
      );
    }
    if (solution.slug === "finlagoon-consolidation") {
      return (
        <span className="bg-gradient-to-r from-[#29ab87] via-[#117a4b] to-[#f5a623] bg-clip-text text-transparent">
          Finlagoon Consolidation
        </span>
      );
    }
    if (solution.slug === "profitability-pro") {
      return (
        <span className="bg-gradient-to-r from-[#29ab87] via-[#117a4b] to-[#f5a623] bg-clip-text text-transparent">
          Profitability Pro
        </span>
      );
    }
    return solution.title;
  };

  const heroCopy = (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-50 backdrop-blur-md animate-pulse-glow"
      >
        <Sparkles className="h-4 w-4 text-cyan-200" /> {solution.eyebrow}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-white"
      >
        {renderTitle(heroTitle)}
      </motion.h1>

      {solution.slug !== "e-invoicing-pro" && solution.subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="mt-6 text-xl font-medium leading-8 text-cyan-50 sm:text-2xl"
        >
          {solution.subtitle}
        </motion.p>
      )}

      {solution.slug !== "e-invoicing-pro" && solution.shortDescription && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.46 }}
          className="mt-4 max-w-xl text-sm leading-7 text-white/55 sm:text-base"
        >
          {solution.shortDescription}
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.52 }}
        className="mt-9 flex flex-wrap gap-4"
      >
        <a
          href="#capabilities"
          className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3.5 font-semibold text-cyan-950 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-xl hover:shadow-cyan-400/25"
        >
          Explore capabilities <ArrowRight className="h-4 w-4" />
        </a>
        <Link
          href="/solutions"
          className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur-md hover:bg-white/20"
        >
          <ArrowLeft className="h-4 w-4" /> All solutions
        </Link>
      </motion.div>
    </>
  );

  return (
    <main className="overflow-hidden bg-[#030713] text-white">
      {/* ── Hero ─────────────────────────────── */}
      <section className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#030713] pb-4 pt-14 sm:pt-16 lg:h-screen lg:min-h-[680px] lg:py-0">
        {/* Brand tri-mesh, grid and hex-grid overlay */}
        <div aria-hidden className="absolute inset-0 -z-10 tri-mesh" />
        <div aria-hidden className="absolute inset-0 -z-10 tri-grid-bg" />
        <div className="pointer-events-none absolute inset-0 -z-10 tri-hex-grid opacity-40" />

        {/* Brand glowing orbs (mint-green/teal and orange/amber) */}
        <div aria-hidden className="pointer-events-none absolute right-[8%] top-[14%] -z-10 h-64 w-64 rounded-full bg-[rgba(41,171,135,0.14)] blur-3xl tri-pulse" />
        <div aria-hidden className="pointer-events-none absolute bottom-[16%] left-[6%] -z-10 h-48 w-48 rounded-full bg-[rgba(245,166,35,0.12)] blur-3xl tri-pulse" style={{ animationDelay: "1.5s" }} />

        {/* Immersive cloudy atmosphere & orbit rings behind the scene */}
        <CloudAtmosphere />
        <OrbitRings />

        {/* Heading zone at the top left (if no interactive scene provided) */}
        {!scene && (
          <div className="relative z-20 mx-auto w-full max-w-7xl px-5 pt-24 sm:px-8 lg:px-12 lg:pt-28 pointer-events-none">
            <div className="max-w-md">
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="text-[clamp(1.25rem,2.4vw,2rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-white"
              >
                {renderTitle(heroTitle)}
              </motion.h1>
            </div>
          </div>
        )}

        {/* Animation zone: Full-bleed responsive canvas */}
        <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col justify-center">
          {scene ? (
            scene
          ) : (
            <div className="absolute inset-0 overflow-hidden opacity-30">
              <Image src={heroImage} alt="" fill priority sizes="100vw" className="object-cover object-center" />
            </div>
          )}
        </div>

        {/* Clean bottom border / cloud transition fade */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.08]" />
      </section>

      {/* ── Overview / Definition ─────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#0b1d33] py-12 sm:py-14 lg:py-16 border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-hex-grid opacity-45" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-mesh opacity-50" />
        <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[rgba(41,171,135,0.08)] blur-3xl animate-float" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="rounded-2xl border border-white/10 bg-[#1a2336]/90 p-5 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl"
          >
            <div className="grid gap-6 lg:grid-cols-12 items-start">
              {/* Left Column: Definition Tag, Title, and Subtitle */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#29ab87]">
                  <span className="h-px w-5 bg-[#29ab87]" />
                  Definition
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] tracking-tight text-white">
                  {getDefinitionTitle()}
                </h2>
                {solution.subtitle && (
                  <p className="mt-3 text-xs sm:text-sm font-medium text-slate-300/90 leading-relaxed">
                    {solution.subtitle}
                  </p>
                )}
              </div>

              {/* Right Column: Narrative Overview & Highlights */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                  {solution.overview}
                </p>

                {/* Streamlined Highlights */}
                {solution.highlights.length > 0 && (
                  <div className="mt-4 space-y-2 pt-4 border-t border-white/10">
                    {solution.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[rgba(41,171,135,0.2)] text-[#29ab87]">
                          <Check className="h-3 w-3" />
                        </span>
                        <p className="text-xs sm:text-sm font-medium text-slate-200 leading-snug">{highlight}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Feature Cards ────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#18263e] py-12 sm:py-14 lg:py-16 border-b border-white/10">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-mesh opacity-60" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-grid-bg opacity-25" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="max-w-3xl"
          >
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#29ab87]">
              <span className="h-px w-5 bg-[#29ab87]" />
              At a glance
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Built for the way your teams work
            </h2>
          </motion.div>
          <div className="mt-7 sm:mt-9 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {solution.featureCards.map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#1a2336]/80 p-5 shadow-md transition-all duration-300 hover:border-[#29ab87] hover:bg-[#222d42]"
              >
                <motion.span
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  transition={{ duration: 0.25 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] border border-white/10 text-[#29ab87] shadow-md"
                >
                  <Zap className="h-4.5 w-4.5" />
                </motion.span>
                <h3 className="mt-4 text-base sm:text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-slate-300">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities ─────────────────────── */}
      <section id="capabilities" className="relative isolate scroll-mt-24 bg-[#0b1d33] py-12 sm:py-14 lg:py-16 border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-hex-grid opacity-45" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-mesh opacity-50" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="max-w-3xl"
          >
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#29ab87]">
              <span className="h-px w-5 bg-[#29ab87]" />
              Capabilities
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Everything needed to move from complexity to control
            </h2>
          </motion.div>
          <div className="mt-7 sm:mt-9 space-y-6">
            {solution.sections.map((section, sectionIndex) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="rounded-2xl border border-white/10 bg-[#1a2336]/80 p-5 shadow-md sm:p-6"
              >
                <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
                  <div>
                    <div className="mb-2.5 flex items-center gap-2.5">
                      <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: 16 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="h-px bg-[#29ab87] block"
                      />
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#29ab87]">
                        Capability {String(sectionIndex + 1).padStart(2, "0")}
                      </p>
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">{section.title}</h3>
                    {section.description && (
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">{section.description}</p>
                    )}
                  </div>
                  <div className="grid items-stretch gap-3.5 sm:grid-cols-2">
                    {section.items.map((item, itemIndex) => (
                      <motion.article
                        key={item.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: itemIndex * 0.08 }}
                        className="flex h-full flex-col rounded-xl border border-white/10 bg-[#222d42]/70 p-4 transition-all duration-300 hover:border-[#29ab87] hover:bg-[#222d42]"
                      >
                        <h4 className="text-xs sm:text-sm font-bold text-white">{item.title}</h4>
                        <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-300">{item.description}</p>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </section>

      {/* ── Business Outcomes ────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#18263e] py-12 sm:py-14 lg:py-16 border-b border-white/10">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-mesh opacity-60" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-grid-bg opacity-25" />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#29ab87]">
                <span className="h-px w-5 bg-[#29ab87]" />
                Business outcomes
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                {solution.outcomesTitle}
              </h2>
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-950 border border-white/10 shadow-2xl">
              <Image
                src={impactImage}
                alt={solution.imageAlt}
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="grid gap-3"
          >
            {solution.benefits.map((benefit, i) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                whileHover={{ x: 4, transition: { duration: 0.15 } }}
                className="rounded-xl border border-white/10 bg-[#1a2336]/80 p-4 hover:border-[#f5a623] transition-colors duration-300"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(245,166,35,0.18)] text-[#f5a623]">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold leading-relaxed text-white">{benefit}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <OtherSolutions currentSlug={solution.slug} />

      {/* ── CTA Banner ────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#18263e] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 border-t border-white/10">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-mesh opacity-60" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-grid-bg opacity-25" />
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-gradient-to-br from-[#117a4b] to-[#121927] border border-white/10 px-6 py-8 text-center shadow-2xl sm:px-12 sm:py-10"
        >
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[48px] border-white/5 animate-spin-slow" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-cyan-300/8 blur-2xl animate-float-slow" />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#29ab87]">
              Let&apos;s work together
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Ready to see {solution.title} in your landscape?
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-300">
              Talk with our team about your priorities, current systems, and the right path to measurable value.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#29ab87] to-[#f5a623] px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-lg border border-white/10 transition-all duration-300 hover:opacity-90"
              >
                Talk to our experts <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
