"use client";

import Image from "next/image";
import OptimizedVideo from "@/components/ui/OptimizedVideo";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type ServiceDetailItem = { title: string; description: string };
export type ServiceImpactItem = ServiceDetailItem & { image?: string };

type Props = {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  scene?: ReactNode;
  heroLayout?: "split" | "centered" | "process";
  steps?: { label: string }[];
  scenePosition?: string;
  offerings: ServiceDetailItem[];
  impacts: ServiceImpactItem[];
  impactImage: string;
  impactImageAlt: string;
};

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function ServiceDetailLanding({
  title,
  subtitle,
  description,
  heroImage,
  scene,
  heroLayout = "split",
  steps = [],
  offerings,
  impacts,
  impactImage,
  impactImageAlt,
}: Props) {

  const heroCopy = (
    <>
      <motion.div
        initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-cyan-200 bg-[#050817]/90 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.26em] text-white"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
        </span>
        <Sparkles className="h-3.5 w-3.5" /> SAP Services
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        className="text-2xl font-semibold leading-[1.18] tracking-tight text-white sm:text-3xl lg:text-4xl xl:text-5xl"
      >
        {title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.34, ease: EASE }}
        className="mt-5 text-lg font-semibold leading-relaxed text-white sm:text-xl"
      >
        {subtitle}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.44, ease: EASE }}
        className="mt-4 max-w-xl text-base font-normal leading-[1.7] text-white/80 sm:text-lg"
      >
        {description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.54, ease: EASE }}
        className="mt-10 flex flex-wrap gap-4"
      >
        <Link
          href="/contact"
          className="tri-btn tri-btn-primary tri-focus px-7 py-4 text-sm font-semibold"
        >
          Consult our experts <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/services"
          className="tri-btn tri-btn-ghost tri-focus px-7 py-4 text-sm font-semibold"
        >
          <ArrowLeft className="h-4 w-4" /> All services
        </Link>
      </motion.div>
    </>
  );

  return (
    <main className="service-detail-page public-alternating-page font-sans overflow-hidden bg-[#030713] text-white">

      {/* ── Hero ─────────────────────────────── */}
      <section
        className="relative isolate flex flex-col overflow-hidden bg-[#050817]"
        style={{ minHeight: "100svh" }}
      >
        {/* Backgrounds */}
        <div className="absolute inset-0 -z-10 tri-mesh" />
        <div className="absolute inset-0 -z-10 tri-grid-bg opacity-60" />
        <div className="pointer-events-none absolute right-[8%] top-[12%] -z-10 h-80 w-80 rounded-full bg-[rgba(255, 255, 255,0.14)] blur-[80px] animate-float-slow" />
        <div className="pointer-events-none absolute bottom-[18%] left-[4%] -z-10 h-60 w-60 rounded-full bg-[rgba(255, 255, 255,0.10)] blur-[70px] animate-float-reverse" />

        {heroLayout !== "centered" ? (
          /* split / process: side-by-side */
          <div className="relative mx-auto flex w-full max-w-7xl flex-1 items-center px-5 py-24 sm:px-8 sm:py-28 lg:px-12" style={{ minHeight: "100svh" }}>
            <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-14">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="order-1"
              >
                {heroCopy}
              </motion.div>

              <div className="relative order-2 hidden min-h-[360px] sm:min-h-[440px] lg:block lg:min-h-[600px]">
                <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] shadow-[0_32px_80px_-20px_rgba(255,255,255,0.2)]">
                  <Image src={heroImage} alt="" fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover object-center opacity-55" />
                  <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.12),transparent_55%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,8,23,0.6),transparent_45%)]" />
                  {/* Corner accent */}
                  <div className="absolute inset-0 rounded-[2.5rem] border border-white/[0.08]" />
                  <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-[rgba(255,255,255,0.15)]" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* centered: static background image behind centered text */
          <>
            <div className="absolute inset-0 -z-10 opacity-30">
              <Image src={heroImage} alt="" fill priority sizes="100vw" className="object-cover object-center" />
            </div>
            <div className="pointer-events-none absolute inset-0 max-lg:bg-[#050817]/55 lg:bg-[radial-gradient(ellipse_at_center,rgba(5,8,23,0.70)_0%,rgba(5,8,23,0.30)_42%,transparent_72%)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#050817] to-transparent" />
            <div className="relative mx-auto flex w-full max-w-7xl flex-1 items-center px-5 py-24 sm:px-8 lg:px-12" style={{ minHeight: "100svh" }}>
              <div className="mx-auto flex max-w-4xl flex-col items-center text-center">{heroCopy}</div>
            </div>
          </>
        )}

        {heroLayout === "process" && steps.length > 0 && (
          <div className="relative border-t border-white/[0.07] bg-[#050817]/80">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-4 px-5 py-6 sm:px-8 lg:px-12">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" /> Process
              </span>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
                {steps.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-x-2">
                    <div className="flex items-center gap-2.5 rounded-full border border-white/[0.09] bg-white/[0.05] px-4 py-2 backdrop-blur-sm">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[linear-gradient(150deg,#22d3ee,#2563eb)] text-[10px] font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="text-[12px] font-semibold text-white/85">{step.label}</span>
                    </div>
                    {i < steps.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-white/25" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── Approach ─────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0a1628] py-24 sm:py-32">
        <div aria-hidden className="absolute inset-0 tri-hex-grid opacity-35" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[rgba(255, 255, 255,0.4)] to-transparent" />
        <div aria-hidden className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[rgba(255, 255, 255,0.07)] blur-[80px]" />

        <div className="service-approach-grid detail-split-grid relative mx-auto grid max-w-7xl items-start gap-10 px-5 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:px-12">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="tri-overline">Our approach</span>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Expertise focused on{" "}
              <span className="tri-gradient-text">business value</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="service-template-card tri-glass-card self-start rounded-3xl p-8 sm:p-10"
          >
            <p className="text-[1.05rem] leading-[1.85] text-slate-300">{description}</p>
            <div className="mt-8 flex items-center gap-3.5 border-t border-white/[0.08] pt-7">
              <motion.span
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#22d3ee,#2563eb)] text-white shadow-[0_4px_16px_rgba(255, 255, 255,0.4)]"
              >
                <Check className="h-4 w-4" strokeWidth={2.5} />
              </motion.span>
              <span className="text-sm font-semibold text-white">Practical delivery, measurable outcomes</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Offerings / Capabilities ─────────────────── */}
      <section className="relative overflow-hidden bg-[#06101e] py-24 sm:py-32">
        <div aria-hidden className="absolute inset-0 tri-hex-grid opacity-30" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[rgba(255, 255, 255,0.35)] to-transparent" />
        <div aria-hidden className="pointer-events-none absolute -right-28 bottom-0 h-[500px] w-[500px] rounded-full bg-[rgba(255, 255, 255,0.07)] blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="max-w-3xl"
          >
            <span className="tri-overline">What we deliver</span>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Service capabilities built around your priorities
            </h2>
            <p className="mt-5 text-base leading-[1.8] text-slate-400 sm:text-[1.05rem]">
              Flexible capabilities that connect strategy, technology, data, and day-to-day operations.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {offerings.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
                whileHover={{ y: -5, transition: { duration: 0.25, ease: EASE } }}
                className="service-template-card group relative flex h-full flex-col overflow-hidden rounded-3xl"
              >
                {/* Glass card background */}
                <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(160deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] backdrop-blur-[14px] border border-white/[0.09]" />
                {/* Hover teal shimmer overlay */}
                <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(160deg,rgba(255, 255, 255,0.12),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {/* Inner top highlight */}
                <div className="absolute inset-x-0 top-0 h-px rounded-t-3xl bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
                {/* Shimmer sweep */}
                <div className="absolute inset-0 translate-x-[-105%] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-700 group-hover:translate-x-[105%]" />

                <div className="relative z-10 flex h-full flex-col p-7 sm:p-8">
                  {/* Number badge */}
                  <motion.div
                    whileHover={{ rotate: 6, scale: 1.08 }}
                    transition={{ duration: 0.22 }}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(150deg,rgba(255, 255, 255,0.2),rgba(255, 255, 255,0.15))] text-sm font-extrabold text-white ring-1 ring-[rgba(255, 255, 255,0.3)] transition-all duration-300 group-hover:bg-[linear-gradient(150deg,#22d3ee,#2563eb)] group-hover:text-white group-hover:shadow-[0_8px_24px_rgba(255, 255, 255,0.4)] group-hover:ring-transparent"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </motion.div>

                  {/* Accent underline */}
                  <div className="mt-5 h-px w-8 bg-[linear-gradient(90deg,#22d3ee,#2563eb)] opacity-50 transition-all duration-400 group-hover:w-14 group-hover:opacity-100" />

                  <h3 className="relative mt-5 text-xl font-bold leading-snug text-white transition-colors group-hover:text-white sm:text-[1.3rem]">
                    {item.title}
                  </h3>
                  <p className="relative mt-4 flex-1 text-sm leading-[1.8] text-slate-400">{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact ───────────────────────────── */}
      <section className="relative bg-[#0a1628] py-24 sm:py-32 lg:py-36">
        <div aria-hidden className="absolute inset-0 tri-hex-grid opacity-35" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[rgba(255, 255, 255,0.35)] to-transparent" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative aspect-[16/10] min-w-0 w-full self-center overflow-hidden rounded-[2rem] shadow-[0_32px_80px_-24px_rgba(255, 255, 255,0.35)]"
          >
            {impactImage.toLowerCase().match(/\.(mp4|webm)$/) !== null ? (
              <OptimizedVideo
                src={impactImage}
                alt={impactImageAlt}
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <Image
                src={impactImage}
                alt={impactImageAlt}
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(3,7,19,0.88))]" />
            <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255, 255, 255,0.18),transparent_50%)]" />
            {/* Border glow */}
            <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/[0.08]" />
            <div className="absolute bottom-0 p-8 text-white sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white">Business value</p>
              <p className="mt-3 max-w-md text-2xl font-bold leading-snug">
                Stronger systems. Clearer insight. Better performance.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="min-w-0 lg:pl-4"
          >
            <span className="tri-overline">Real impact</span>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Outcomes you can build on
            </h2>

            <div className="mt-8 grid gap-4">
              {impacts.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.09, ease: EASE }}
                  whileHover={{ x: 4, transition: { duration: 0.15 } }}
                  className="service-template-card group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[linear-gradient(160deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 backdrop-blur-sm transition-all duration-300 hover:border-[rgba(255, 255, 255,0.3)] hover:bg-[linear-gradient(160deg,rgba(255, 255, 255,0.1),rgba(255,255,255,0.03))]"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#22d3ee,#2563eb)] text-white shadow-[0_4px_12px_rgba(255, 255, 255,0.35)] transition-shadow duration-300 group-hover:shadow-[0_6px_20px_rgba(255, 255, 255,0.5)]">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-bold text-white group-hover:text-white transition-colors">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-[1.75] text-slate-400">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────── */}
      <section className="hidden relative bg-[#030713] px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
        <div aria-hidden className="pointer-events-none absolute inset-0 tri-hex-grid opacity-30" />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="tri-border-gradient relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[linear-gradient(145deg,#0e2340,#0b1d33_50%,#050817)] px-6 py-8 text-center shadow-[0_40px_120px_-30px_rgba(3,7,19,0.7)] sm:px-12 sm:py-10"
        >
          <div aria-hidden className="absolute inset-0 tri-hex-grid opacity-45" />
          <div aria-hidden className="absolute -right-16 -top-16 h-80 w-80 rounded-full border-[60px] border-white/[0.03] tri-spin-slow" />
          <div aria-hidden className="tri-blob h-72 w-72 animate-float-slow" style={{ left: "-6%", bottom: "-8%", background: "radial-gradient(circle, rgba(255, 255, 255,0.28), transparent 68%)" }} />
          <div aria-hidden className="tri-blob h-60 w-60 animate-float-reverse" style={{ right: "-4%", top: "10%", background: "radial-gradient(circle, rgba(255, 255, 255,0.22), transparent 68%)" }} />
          <div aria-hidden className="absolute inset-x-0 top-1/2 h-64 -translate-y-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(255, 255, 255,0.08),transparent)]" />

          <div className="relative mx-auto max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-white">
              <Sparkles className="h-4 w-4" /> Let&apos;s work together
            </p>
<h2 className="mt-4 text-2xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-3xl">
              Ready to move your SAP priorities forward?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-[1.7] text-slate-300/85 sm:text-base">
              Connect with our team to shape a practical roadmap around your goals and technology landscape.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="inline-block mt-6">
              <Link href="/contact" className="tri-btn tri-btn-primary px-6 py-3 text-sm font-semibold">
                Start a conversation <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
