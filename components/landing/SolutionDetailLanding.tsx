"use client";

import Image from "next/image";
import OptimizedVideo from "@/components/ui/OptimizedVideo";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Boxes,
  Building2,
  Check,
  CircleDollarSign,
  Cloud,
  FileCheck,
  Landmark,
  Layers,
  Package,
  ShieldCheck,
  SlidersHorizontal,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import OtherSolutions from "@/components/solutions/OtherSolutions";
import type { SolutionItem } from "@/lib/solutions-data";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

function getFeatureCardIcon(title: string, index: number) {
  const t = title.toLowerCase();
  // E-Invoicing Pro features
  if (t.includes("s/4hana") || t.includes("sap")) return Cloud;
  if (t.includes("government") || t.includes("portal")) return Landmark;
  if (t.includes("tracking") || t.includes("real-time")) return Activity;
  if (t.includes("compliance") || t.includes("regulatory")) return ShieldCheck;

  // Finlagoon Consolidation features
  if (t.includes("multi-entity") || t.includes("entity")) return Building2;
  if (t.includes("currency") || t.includes("conversion")) return CircleDollarSign;
  if (t.includes("reporting") || t.includes("customizable")) return SlidersHorizontal;
  if (t.includes("governance") || t.includes("audit")) return FileCheck;

  // Profitability Pro features
  if (t.includes("product")) return Package;
  if (t.includes("customer")) return Users;
  if (t.includes("allocation") || t.includes("automated")) return Workflow;
  if (t.includes("driver") || t.includes("mapping") || t.includes("margin")) return TrendingUp;

  // Fallback distinct icons by index
  const fallbacks = [Cloud, Landmark, Activity, ShieldCheck, Zap, Layers, BarChart3, Building2];
  return fallbacks[index % fallbacks.length];
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
  cleanImpactImage = false,
}: Props) {
  const renderTitle = (title: string | ReactNode) => {
    if (typeof title !== "string") return title;
    return title;
  };

  const getDefinitionTitle = () => {
    if (solution.slug === "e-invoicing-pro") {
      return "E-Invoicing";
    }
    if (solution.slug === "finlagoon-consolidation") {
      return "Finlagoon Consolidation";
    }
    if (solution.slug === "profitability-pro") {
      return "Profitability Pro";
    }
    return solution.title;
  };

  return (
    <main className="solution-detail-page public-alternating-page font-sans overflow-hidden bg-[#030713] text-white">
      {/* ──── Hero Section (Full Height & Full Width Background Image, High Visibility) ──── */}
      <section className="relative isolate flex min-h-[75vh] w-full flex-col justify-center overflow-hidden bg-[#050817] pb-16 pt-32 sm:pt-36 lg:min-h-[640px] lg:py-24">
        {/* Full width & full height image backdrop */}
        {heroImage && (
          <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
            <Image
              src={heroImage}
              alt={solution.title}
              fill
              priority
              sizes="100vw"
              className="h-full w-full object-cover object-center brightness-[0.88] contrast-[1.05]"
            />
            {/* Subtle soft gradient on left for text legibility while keeping image vibrant & visible */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#030713]/80 via-[#030713]/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#030713] to-transparent" />
          </div>
        )}

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex max-w-4xl flex-col items-start text-left">
            {/* Title */}
            <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white drop-shadow-md sm:text-4xl lg:text-5xl">
              {renderTitle(heroTitle)}
            </h1>

            {/* Subtitle */}
            {solution.subtitle && (
              <p className="mt-5 text-lg font-semibold leading-relaxed text-white drop-shadow-md sm:text-xl">
                {solution.subtitle}
              </p>
            )}

            {/* Description */}
            {solution.shortDescription && (
              <p className="mt-4 max-w-2xl text-base font-normal leading-[1.7] text-white/90 drop-shadow sm:text-lg">
                {solution.shortDescription}
              </p>
            )}

            {/* Action buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#capabilities"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-bold text-white bg-[#008fd3] hover:bg-[#007bb8] border-0 shadow-[0_8px_20px_rgba(0,143,211,0.4)] hover:shadow-[0_12px_28px_rgba(0,143,211,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Explore capabilities <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white bg-[#008fd3] hover:bg-[#007bb8] border-0 shadow-[0_8px_20px_rgba(0,143,211,0.3)] hover:shadow-[0_12px_28px_rgba(0,143,211,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                All solutions
              </Link>
            </div>
          </div>
        </div>

        {/* Clean bottom border */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/15" />
      </section>

      {/* ──── Overview / Definition ────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#0b1d33] py-16 sm:py-20 lg:py-24 border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-hex-grid opacity-45" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-mesh opacity-50" />
        <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[rgba(255, 255, 255,0.08)] blur-3xl animate-float" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="solution-detail-card min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#1a2336]/90 p-5 sm:p-8 lg:p-10 shadow-2xl"
          >
            <div className="grid gap-6 lg:grid-cols-12 items-start">
              {/* Left Column: Definition Tag, Title, and Subtitle */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white">
                  <span className="h-px w-5 bg-white" />
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
                        <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[rgba(255, 255, 255,0.2)] text-white">
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

      {/* ──── Feature Cards ──────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#18263e] py-16 sm:py-20 lg:py-24 border-b border-white/10">
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
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white">
              <span className="h-px w-5 bg-white" />
              At a glance
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Built for the way your teams work
            </h2>
          </motion.div>
          <div className="mt-7 sm:mt-9 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {solution.featureCards.map((item, i) => {
              const CardIcon = getFeatureCardIcon(item.title, i);
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="solution-detail-card flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1a2336]/80 p-5 shadow-md transition-all duration-300 hover:border-white hover:bg-[#222d42]"
                >
                  <motion.span
                    whileHover={{ rotate: 12, scale: 1.15 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.08] border border-white/15 text-white shadow-md"
                  >
                    <CardIcon className="solution-card-icon h-5 w-5 text-white" strokeWidth={2} />
                  </motion.span>
                  <h3 className="mt-4 text-base sm:text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-slate-300">{item.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──── Capabilities ────────────────────────────────────────────── */}
      <section id="capabilities" className="relative isolate scroll-mt-24 bg-[#0b1d33] py-16 sm:py-20 lg:py-24 border-b border-white/5">
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
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white">
              <span className="h-px w-5 bg-white" />
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
                className="solution-detail-card min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#1a2336]/80 p-5 shadow-md sm:p-6"
              >
                <div className="detail-split-grid grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
                  <div>
                    <div className="mb-2.5 flex items-center gap-2.5">
                      <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: 16 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="h-px bg-white block"
                      />
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
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
                        className="solution-detail-card flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-[#222d42]/70 p-4 transition-all duration-300 hover:border-white hover:bg-[#222d42]"
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

      {/* ──── Business Outcomes ──────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#18263e] py-16 sm:py-20 lg:py-24 border-b border-white/10">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-mesh opacity-60" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-grid-bg opacity-25" />
        <div className="detail-split-grid mx-auto grid w-full max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white">
                <span className="h-px w-5 bg-white" />
                Business outcomes
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Business Outcomes
              </h2>
            </div>

            <div className={`relative w-full max-w-[480px] overflow-hidden rounded-2xl bg-slate-950 border border-white/10 shadow-2xl ${cleanImpactImage ? "aspect-[2.05/1]" : "aspect-[16/9]"}`}>
              {impactImage.toLowerCase().match(/\.(mp4|webm)$/) !== null ? (
                <OptimizedVideo
                  src={impactImage}
                  alt={solution.imageAlt}
                  className="pointer-events-none absolute inset-[-2px] h-[calc(100%+4px)] w-[calc(100%+4px)] object-cover scale-[1.02]"
                />
              ) : (
                <Image
                  src={impactImage}
                  alt={solution.imageAlt}
                  fill
                  sizes="(max-width:1024px) 100vw, 480px"
                  className="object-cover scale-[1.02]"
                />
              )}
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
                className="solution-detail-card min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#1a2336]/80 p-4 hover:border-white transition-colors duration-300"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(255, 255, 255,0.18)] text-white">
                    <Check className="solution-card-icon h-3.5 w-3.5" />
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold leading-relaxed text-white">{benefit}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <OtherSolutions currentSlug={solution.slug} />

      {/* ──── CTA Banner ──────────────────────────────────────────────────── */}
      <section className="hidden relative isolate overflow-hidden bg-[#0b1d33] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 border-t border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-hex-grid opacity-45" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-mesh opacity-50" />
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="tri-border-gradient relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[linear-gradient(145deg,#1e2a3f,#162236_50%,#111827)] px-6 py-8 text-center shadow-[0_40px_120px_-30px_rgba(0,0,0,0.5)] sm:px-12 sm:py-10"
        >
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[48px] border-white/5 tri-spin-slow" />
          <div className="tri-blob h-56 w-56 animate-float-slow" style={{ left: "-6%", bottom: "-8%", background: "radial-gradient(circle, rgba(255, 255, 255,0.28), transparent 68%)" }} />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white">
              Let&apos;s work together
            </p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Ready to see {solution.title} in your landscape?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-300 sm:text-base">
              Talk with our team about your priorities, current systems, and the right path to measurable value.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block mt-6">
              <Link
                href="/contact"
                className="tri-btn tri-btn-primary px-6 py-3 text-sm font-semibold"
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

