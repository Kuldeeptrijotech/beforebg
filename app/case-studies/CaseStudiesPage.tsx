"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import ImageSlider from "../components/common/ImageSlider";
import { motion } from "framer-motion";

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
    <main className="overflow-hidden bg-[#e8f2fb] text-slate-900">
      {/* ── Hero ─────────────────────────────── */}
      <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-cyan-950 pt-20">
        <Image
          src="/assets/case-studies/financial-analysis-team.png"
          alt="Business team reviewing financial analysis and performance reports"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-950/95 via-cyan-950/75 to-cyan-900/20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-cyan-950/70 via-transparent to-slate-950/20" />

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
              className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl"
            >
              Our{" "}
              <span className="gradient-text">Case Studies</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="mt-6 max-w-2xl text-xl font-medium leading-8 text-cyan-50 sm:text-2xl"
            >
              Explore real SAP transformation, planning, analytics, and consolidation engagements delivered around measurable outcomes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.52 }}
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

      </section>

      {/* ── Case Studies ─────────────────────── */}
      <div id="case-studies">
        {studies.map((study, index) => (
          <section
            className={
              index % 2 === 0
                ? "bg-gradient-to-b from-[#d5eafa] to-[#e8f2fb] py-20 sm:py-24"
                : "bg-[#e8f2fb] py-20 sm:py-24"
            }
            key={index}
          >
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
                  className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-700"
                >
                  Case study {String(index + 1).padStart(2, "0")}
                </motion.p>
                <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                  {study.title}
                </h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                  {study.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="mt-10 rounded-[2rem] border border-blue-200 bg-white/80 p-3 shadow-2xl shadow-cyan-950/10 sm:p-5"
              >
                <ImageSlider images={study.images} label={`Case study ${index + 1}`} />
              </motion.div>
            </div>
          </section>
        ))}
      </div>

      {/* ── CTA Banner ────────────────────────── */}
      <section className="bg-[#ccdfef] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-cyan-700 to-cyan-950 px-6 py-14 text-center shadow-2xl shadow-cyan-950/15 sm:px-12 sm:py-20"
        >
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[48px] border-white/5 animate-spin-slow" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-cyan-300/8 blur-2xl animate-float-slow" />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">
              Let&apos;s work together
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to create your next success story?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-cyan-50/80">
              Talk with our team about your priorities and the right path to measurable business value.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                href="/contact"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-cyan-950 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-50 hover:shadow-xl"
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
