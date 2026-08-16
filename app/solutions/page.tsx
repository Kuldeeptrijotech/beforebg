"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { solutions } from "@/lib/solutions-data";

const whyItems = [
  {
    title: "Tailored for Your Operations",
    description: "Every solution is customized to workflows, industry needs, and operational priorities.",
    accent: "from-cyan-400 to-sky-500",
  },
  {
    title: "Built on SAP Standards",
    description: "Seamless integration, high security, and future-ready scalability using SAP best practices.",
    accent: "from-indigo-400 to-violet-500",
  },
  {
    title: "Automated & Efficient",
    description: "Replace spreadsheets and manual processes with automated, end-to-end workflows.",
    accent: "from-emerald-400 to-teal-500",
  },
  {
    title: "Scalable & Adaptable",
    description: "Solutions ready for growth, system upgrades, and changing business environments.",
    accent: "from-amber-400 to-orange-500",
  },
];

export default function SolutionsPage() {
  return (
    <main className="overflow-hidden bg-[#e8f2fb] text-slate-900">
      {/* ── Hero ─────────────────────────────── */}
      <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-cyan-950 pt-20">
        <Image src="/assets/heroes/products.png" alt="" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-950/95 via-cyan-950/75 to-cyan-900/20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-cyan-950/70 via-transparent to-slate-950/20" />

        {/* Floating orbs */}
        <div className="pointer-events-none absolute right-1/4 top-1/4 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute bottom-1/3 left-1/3 h-56 w-56 rounded-full bg-indigo-400/8 blur-3xl animate-float-reverse" />

        <div className="mx-auto flex min-h-[calc(100svh-9.5rem)] w-full max-w-7xl items-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-50 backdrop-blur-md animate-pulse-glow"
            >
              <Sparkles className="h-4 w-4 text-cyan-200" /> Solutions
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl"
            >
              Purpose-built solutions for{" "}
              <span className="gradient-text">modern enterprise</span> challenges
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="mt-6 max-w-2xl text-xl font-medium leading-8 text-cyan-50 sm:text-2xl"
            >
              Trijotech combines SAP expertise, automation and financial intelligence to simplify complex business processes and improve decision-making.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.52 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#our-solutions"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3.5 font-semibold text-cyan-950 shadow-lg shadow-cyan-950/20 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-xl"
              >
                Explore Solutions <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
              >
                Talk to Our Experts
              </Link>
            </motion.div>
          </div>
        </div>

      </section>

      {/* ── Solutions Grid ────────────────────── */}
      <section id="our-solutions" className="relative scroll-mt-24 bg-gradient-to-b from-[#d5eafa] to-[#e8f2fb] py-20 sm:py-24">
        <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-100/70 blur-3xl animate-float" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="max-w-3xl"
          >
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-cyan-700">
              <span className="h-px w-5 bg-cyan-400" />
              Portfolio
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">Our Solutions</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Three in-house platforms designed for compliance, consolidation and profitability — built to sit cleanly on your SAP landscape.
            </p>
          </motion.div>

          <div className="mx-auto mt-9 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {solutions.map((solution, i) => (
              <motion.article
                key={solution.slug}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-blue-200 bg-[#f5faff] shadow-sm transition-shadow duration-300 hover:border-cyan-300 hover:shadow-xl"
              >
                <Link href={solution.href} className="relative block h-[180px] overflow-hidden bg-white">
                  <Image
                    src={solution.cardImage}
                    alt={solution.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className={`transition duration-700 group-hover:scale-105 ${solution.slug === "e-invoicing-pro" ? "object-cover" : "object-contain p-3 sm:p-4"}`}
                  />
                  {/* Shimmer */}
                  <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
                </Link>
                <div className="flex flex-1 flex-col px-4 py-3.5 sm:px-5 sm:py-4">
                  <h3 className="text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-cyan-800">{solution.title}</h3>
                  <p className="mt-2.5 flex-1 text-sm leading-6 text-slate-600">{solution.shortDescription}</p>
                  <ul className="mt-3.5 space-y-1.5 border-t border-cyan-100 pt-3.5">
                    {solution.featureCards.slice(0, 4).map((item) => (
                      <li key={item.title} className="flex items-start gap-2 text-sm font-medium text-slate-700">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-700" />
                        {item.title}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={solution.href}
                    className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-cyan-700 transition-all duration-200 group-hover:gap-3 group-hover:text-cyan-600"
                  >
                    Explore Solution <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose ───────────────────────── */}
      <section className="bg-[#e8f2fb] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            Why choose in-house SAP solutions from{" "}
            <span className="gradient-text">Trijotech?</span>
          </motion.h2>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {whyItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-blue-200 bg-[#f5faff] p-6 shadow-sm transition-shadow duration-300 hover:border-cyan-300 hover:shadow-xl"
              >
                <div className={`mb-4 h-1 w-12 rounded-full bg-gradient-to-r ${item.accent} transition-all duration-300 group-hover:w-20`} />
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────── */}
      <section className="bg-[#ccdfef] px-5 py-20 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-cyan-700 to-cyan-950 px-6 py-14 text-center sm:px-12 sm:py-20"
        >
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[48px] border-white/5 animate-spin-slow" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-cyan-300/8 blur-2xl animate-float-slow" />
          <div className="relative">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">Trijotech</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              See which solution fits your landscape
            </h2>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                href="/contact"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-cyan-950 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-50 hover:shadow-xl"
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
