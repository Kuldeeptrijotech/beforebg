"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clapperboard, FileText, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Blogs",
    href: "/blogs",
    image: "/assets/heroes/blogs-blue.png",
    imageAlt: "Trijotech SAP articles and insights",
    description:
      "Read practical perspectives on SAP, enterprise technology, analytics, planning, integration, and digital transformation.",
    cta: "Explore Blogs",
    icon: BookOpen,
    accent: "from-cyan-500 to-sky-600",
  },
  {
    title: "Case Studies",
    href: "/case-studies",
    image: "/assets/case-studies/financial-analysis-team.png",
    imageAlt: "Business team reviewing financial analysis and performance reports",
    description:
      "See real project challenges, solution approaches, and outcomes across planning, consolidation, analytics, and profitability.",
    cta: "Explore Case Studies",
    icon: FileText,
    accent: "from-indigo-500 to-violet-600",
  },
  {
    title: "Videos",
    href: "/videos",
    image: "/assets/heroes/videos-generated-v2.png",
    imageAlt: "Trijotech SAP video library",
    description:
      "Watch explainers, service overviews, and expert perspectives that make complex SAP and business topics easier to understand.",
    cta: "Explore Videos",
    icon: Clapperboard,
    accent: "from-amber-500 to-orange-600",
  },
];

export default function InsightsPage() {
  return (
    <main className="overflow-hidden bg-[#e8f2fb] text-slate-900">
      {/* ── Hero ─────────────────────────────── */}
      <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-cyan-950 pt-20">
        <Image
          src="/assets/heroes/blogs-blue.png"
          alt="Trijotech insights and knowledge"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-950/95 via-cyan-950/75 to-cyan-900/20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-cyan-950/70 via-transparent to-slate-950/20" />

        {/* Floating orbs */}
        <div className="pointer-events-none absolute right-1/4 top-1/4 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute bottom-1/4 left-1/3 h-56 w-56 rounded-full bg-indigo-400/8 blur-3xl animate-float-reverse" />

        <div className="mx-auto flex min-h-[calc(100svh-9.5rem)] w-full max-w-7xl items-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-50 backdrop-blur-md animate-pulse-glow"
            >
              <Sparkles className="h-4 w-4 text-cyan-200" aria-hidden="true" />
              Insights
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl"
            >
              Ideas, experience and{" "}
              <span className="gradient-text">knowledge</span> from our SAP experts
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="mt-6 max-w-2xl text-xl font-medium leading-8 text-cyan-50 sm:text-2xl"
            >
              Explore practical insights, case studies, videos, and perspectives from the Trijotech team.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.52 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <a
                href="#explore"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3.5 font-semibold text-cyan-950 shadow-lg shadow-cyan-950/20 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-xl"
              >
                Explore Insights <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>

      </section>

      {/* ── Cards ─────────────────────────────── */}
      <section id="explore" className="relative bg-gradient-to-b from-[#d5eafa] to-[#e8f2fb] py-20 sm:py-24">
        <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-100/70 blur-3xl animate-float" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-48 w-48 translate-x-1/3 rounded-full bg-sky-100/60 blur-3xl animate-float-reverse" />

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
              Learn from practical experience
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Insight formats built for{" "}
              <span className="gradient-text">real-world learning</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Choose from the insight formats already available across the Trijotech website.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.article
                  key={card.href}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-blue-200 bg-[#f5faff] shadow-sm transition-shadow duration-300 hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-950/10"
                >
                  <Link
                    href={card.href}
                    className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
                  >
                    <Image
                      src={card.image}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/40 to-transparent" />
                    {/* Shimmer */}
                    <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
                    <motion.span
                      whileHover={{ scale: 1.12, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} text-white shadow-lg`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </motion.span>
                  </Link>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-cyan-800 sm:text-2xl">
                      {card.title}
                    </h3>
                    <p className="mt-4 flex-1 leading-7 text-slate-600">{card.description}</p>
                    <Link
                      href={card.href}
                      className="mt-auto inline-flex items-center gap-2 pt-7 font-semibold text-cyan-700 transition-all duration-200 group-hover:gap-3 group-hover:text-cyan-600"
                    >
                      {card.cta} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

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
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-300/10 blur-2xl animate-float-slow" />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">
              Let&apos;s work together
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to turn insight into action?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-cyan-50/80">
              Connect with Trijotech to explore SAP solutions designed around your organization, priorities, and growth plans.
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
