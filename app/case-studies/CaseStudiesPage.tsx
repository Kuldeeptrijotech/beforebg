"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import ImageSlider from "../components/common/ImageSlider";
import { motion } from "framer-motion";
import CaseStudiesVectorTrails from "@/components/ui/hero-animations/CaseStudiesVectorTrails";

const studies = [
  {
    title: "Maximizing ROI for Large Scale S/4HANA Transformations",
    description:
      "Discover the incredible benefits that S/4HANA brings, including streamlined processes and innovative SAP tools that ensure a smooth transition. Our experts share valuable insights on selecting the perfect cloud offering tailored to your unique business needs, helping you achieve unparalleled efficiency and cost-effectiveness.",
    images: Array.from(
      { length: 25 },
      (_, index) =>
        `/assets/image/Casestudy1_${index === 0 ? "001" : String(index + 1).padStart(index + 1 >= 10 ? 4 : 3, "0")}.png`,
    ),
  },
  {
    title: "SAP SAC Financial Planning for a Major Pharmaceutical Company",
    description:
      "The case study illustrates how SAP SAC was used for financial planning by a leading pharmaceutical company. The goal was to analyze data from a BW environment, which included entities such as profit centers, segments, and material costs. The aim was to make use of this data analysis to effectively support the company's financial planning objectives.",
    images: Array.from(
      { length: 8 },
      (_, index) =>
        `/assets/image/Casestudy2_${String(index + 1).padStart(3, "0")}.jpg`,
    ),
  },
  {
    title:
      "Elevate Your Business with SAP Profitability & Performance Management (PaPM)",
    description:
      "Discover how SAP PaPM can transform your approach to financial and operational performance management, with a comprehensive agenda covering its core functionalities, solution architecture, key use cases, and real-world success stories.",
    images: Array.from(
      { length: 11 },
      (_, index) =>
        `/assets/image/Casestudy3_${index + 1 >= 10 ? String(index + 1).padStart(4, "0") : String(index + 1).padStart(3, "0")}.png`,
    ),
  },
  {
    title:
      "MIS & KPIs Dashboard Implementation for a Leading European Automotive Manufacturer using SAP BW/4HANA & SAP Analytics Cloud",
    description:
      "This case study illustrates the implementation of performance indicators (KPIs) and management information system (MIS) reporting for a major British car manufacturer. The implementation was carried out using SAP BW and SAC, with a focus on optimizing business performance through a thorough understanding of KPIs.",
    images: Array.from(
      { length: 13 },
      (_, index) =>
        `/assets/image/Casestudy4_${index + 1 >= 10 ? String(index + 1).padStart(4, "0") : String(index + 1).padStart(3, "0")}.jpg`,
    ),
  },
  {
    title:
      "Legal Consolidation and Disclosure reporting for Major APAC Palm oil Manufacturers using SAP BPC 11.0",
    description:
      "Legal Consolidation and Disclosure reporting for Major APAC Palmoil Manufacturer. It describes a unique approach towards BPC Legal Consolidation (SAP Business Object Planning & Consolidation 11.1 NW for Consolidation) to repurpose the Group Currency of a Group as a source for another group based on alternative currency base.",
    images: Array.from(
      { length: 4 },
      (_, index) =>
        `/assets/image/Casestudy5_${String(index + 1).padStart(3, "0")}.png`,
    ),
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="overflow-hidden bg-[#121927] text-white">
      {/* ── Hero ─────────────────────────────── */}
      <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-cyan-950 pt-24 sm:pt-28 lg:pt-24 pb-12">
        <Image
          src="/assets/case-studies/financial-analysis-team.png"
          alt="Business team reviewing financial analysis and performance reports"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center opacity-95"
        />
        {/* Slow ascending growth curves animation */}
        <CaseStudiesVectorTrails />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-950/85 via-cyan-950/45 to-cyan-900/10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-cyan-950/50 via-transparent to-slate-950/10" />

        {/* Floating orbs */}
        <div className="pointer-events-none absolute right-1/3 top-1/4 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute bottom-1/4 left-1/4 h-56 w-56 rounded-full bg-indigo-400/8 blur-3xl animate-float-reverse" />

        <div className="mx-auto flex min-h-[calc(100svh-9.5rem)] w-full max-w-7xl items-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-50 backdrop-blur-md animate-pulse-glow"
            >
              <Sparkles className="h-4 w-4 text-cyan-200" aria-hidden="true" />
              Case studies
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="text-2xl font-semibold leading-[1.18] tracking-tight text-white sm:text-3xl lg:text-4xl"
            >
              Proven SAP results for{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                global enterprises
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="mt-6 text-lg leading-8 text-cyan-50/90 sm:text-xl"
            >
              Explore how Trijotech helped organizations transform SAP landscapes, automate financial workflows, and unlock actionable insights.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <a
                href="#case-studies"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3.5 font-semibold text-cyan-950 shadow-lg shadow-cyan-950/20 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-xl"
              >
                Explore case studies <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Clean bottom separator */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.08]" />
      </section>

      {/* ── Case Studies ─────────────────────── */}
      <div id="case-studies" className="divide-y divide-white/5">
        {studies.map((study, index) => (
          <section
            className={
              index % 2 === 0
                ? "relative isolate overflow-hidden bg-[#0b1d33] py-12 sm:py-14 lg:py-16"
                : "relative isolate overflow-hidden bg-[#18263e] py-12 sm:py-14 lg:py-16"
            }
            key={index}
          >
            {index % 2 === 0 ? (
              <>
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-hex-grid opacity-45" />
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-mesh opacity-50" />
              </>
            ) : (
              <>
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-mesh opacity-60" />
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-grid-bg opacity-25" />
              </>
            )}
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="max-w-4xl"
              >
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="tri-overline"
                >
                  Case study {String(index + 1).padStart(2, "0")}
                </motion.p>
                <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {study.title}
                </h2>
                <p className="mt-2 max-w-3xl text-xs sm:text-sm leading-relaxed text-slate-300">
                  {study.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="mt-7 sm:mt-9 rounded-2xl border border-white/10 bg-white/[0.04] p-3 shadow-2xl backdrop-blur-xl sm:p-5"
              >
                <ImageSlider images={study.images} label={`Case study ${index + 1}`} />
              </motion.div>
            </div>
          </section>
        ))}
      </div>

      {/* ── CTA Banner ────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#0b1d33] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 border-t border-white/5">
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
          <div className="tri-blob h-56 w-56 animate-float-slow" style={{ left: "-6%", bottom: "-8%", background: "radial-gradient(circle, rgba(41,171,135,0.28), transparent 68%)" }} />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f5a623]">
              Let&apos;s work together
            </p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Ready to create your next success story?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Talk with our team about your priorities and the right path to measurable business value.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block mt-6">
              <Link
                href="/contact"
                className="tri-btn tri-btn-primary px-6 py-3 text-sm font-semibold"
              >
                Start a conversation <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
