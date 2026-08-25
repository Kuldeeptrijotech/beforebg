"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import SolutionsHoloRays from "@/components/ui/hero-animations/SolutionsHoloRays";
import OptimizedVideo from "@/components/ui/OptimizedVideo";
import { solutions } from "@/lib/solutions-data";

export default function SolutionsPage() {
  return (
    <main className="public-alternating-page font-sans overflow-hidden bg-[#030713] text-white">
      {/* ── Hero ─────────────────────────────── */}
      <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-[#050817] pt-24 sm:pt-28 lg:pt-24 pb-12">
        {/* Mesh + hexgrid background */}
        <div aria-hidden className="absolute inset-0 -z-40 tri-mesh" />
        <div aria-hidden className="absolute inset-0 -z-30 tri-hex-grid opacity-55" />

        {/* Hero image */}
        <Image
          src="/assets/heroes/products.png"
          alt="In-house SAP solutions and products"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-95"
        />

        {/* Slow geometric holographic rays animation */}
        <SolutionsHoloRays />

        {/* Gradient overlays — side-only */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(5,8,23,0.85)_0%,rgba(5,8,23,0.45)_50%,rgba(5,8,23,0.15)_100%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#050817] to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_75%_55%_at_12%_55%,rgba(255, 255, 255,0.13),transparent_68%)]" />

        {/* Floating orbs */}
        <div aria-hidden className="pointer-events-none absolute right-1/4 top-1/4 -z-10 h-72 w-72 rounded-full bg-[rgba(255, 255, 255,0.16)] blur-3xl animate-float-slow" />
        <div aria-hidden className="pointer-events-none absolute bottom-1/3 left-1/3 -z-10 h-56 w-56 rounded-full bg-[rgba(255, 255, 255,0.12)] blur-3xl animate-float-reverse" />

        <div className="mx-auto flex min-h-[calc(100svh-9.5rem)] w-full max-w-7xl items-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-[#050817]/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white"
            >
              <Sparkles className="h-3.5 w-3.5 text-white" />
              In-House SAP Solutions
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Purpose-built platforms for <span className="tri-gradient-text">modern SAP enterprises</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 max-w-2xl text-base font-normal leading-[1.7] text-white/80 sm:text-lg"
            >
              Extend your SAP investment with specialized tools for statutory compliance, financial consolidation, and operational profitability.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <a
                href="#solutions-list"
                className="tri-btn tri-btn-primary tri-focus px-7 py-4 text-sm font-semibold"
              >
                Explore Solutions <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="tri-btn tri-btn-ghost tri-focus px-7 py-4 text-sm font-semibold"
              >
                Schedule Demo
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Clean bottom separator */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.08]" />
      </section>

      {/* ── Solutions Grid ──────────────────── */}
      <section id="solutions-list" className="relative isolate overflow-hidden bg-[#0b1d33] py-12 sm:py-14 lg:py-16 border-b border-white/5">
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
            <p className="tri-overline">Capabilities</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Enterprise solutions engineered for{" "}
              <span className="tri-gradient-text">scale</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">
              Each product is built to address specific functional gaps in standard enterprise software, delivering rapid time-to-value with minimal disruption.
            </p>
          </motion.div>

          <div className="mx-auto mt-7 sm:mt-9 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 items-stretch">
            {solutions.map((solution) => (
              <article
                key={solution.slug}
                className="group flex min-w-0 h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl transition-all duration-300 hover:border-white/60 hover:bg-white/[0.07] hover:shadow-[0_20px_50px_rgba(255, 255, 255,0.22)]"
              >
                <Link href={solution.href} className="no-underline relative block h-[180px] w-full shrink-0 overflow-hidden bg-slate-900">
                  {solution.cardImage.toLowerCase().match(/\.(mp4|webm)$/) !== null ? (
                    <OptimizedVideo
                      src={solution.cardImage}
                      alt={solution.imageAlt}
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover origin-center"
                    />
                  ) : (
                    <Image
                      src={solution.cardImage}
                      alt={solution.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover origin-center"
                    />
                  )}
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(14,26,44,0.98)] via-[rgba(14,26,44,0.2)] to-transparent" />
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255, 255, 255,0.28),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </Link>
                <div className="flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-5">
                  <h3 className="text-base sm:text-lg font-bold leading-snug text-white transition-colors group-hover:text-white">{solution.title}</h3>
                  <p className="mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-slate-300">{solution.shortDescription}</p>
                  <ul className="mt-3.5 space-y-2 border-t border-white/10 pt-3">
                    {solution.featureCards.slice(0, 4).map((item) => (
                      <li key={item.title} className="flex items-start gap-2 text-xs sm:text-sm font-medium text-slate-200">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white" />
                        {item.title}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4">
                    <Link
                      href={solution.href}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white transition-all duration-200 group-hover:gap-2.5 group-hover:text-white"
                    >
                      Explore Solution <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────── */}
      <section className="hidden relative isolate overflow-hidden bg-[#0b1d33] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 border-t border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-hex-grid opacity-45" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-mesh opacity-50" />
        <div aria-hidden className="pointer-events-none absolute inset-0 tri-hex-grid opacity-30" />
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="tri-border-gradient relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[linear-gradient(145deg,#1e2a3f,#162236_50%,#111827)] px-6 py-8 text-center shadow-[0_40px_120px_-30px_rgba(0,0,0,0.5)] sm:px-12 sm:py-10"
        >
          <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[48px] border-white/5 tri-spin-slow" />
          <div aria-hidden className="tri-blob h-56 w-56 animate-float-slow" style={{ left: "-6%", bottom: "-8%", background: "radial-gradient(circle, rgba(255, 255, 255,0.28), transparent 68%)" }} />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-white">Trijotech</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              See which solution fits{" "}
              <span className="tri-gradient-text">your landscape</span>
            </h2>
            <p className="mt-4 text-sm text-slate-300 sm:text-base">
              Book a technical demonstration tailored to your enterprise processes and data structure.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="inline-block mt-6">
              <Link
                href="/contact"
                className="tri-btn tri-btn-primary px-6 py-3 text-sm font-semibold"
              >
                Talk to Our Experts <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
