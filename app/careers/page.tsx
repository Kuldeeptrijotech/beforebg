"use client";

import Image from "next/image";
import { BriefcaseBusiness, Mail, Sparkles, Users } from "lucide-react";
import ContactUs from "../components/ContactUs";
import { motion } from "framer-motion";
import CareersCultureShowcase from "@/components/careers/CareersCultureShowcase";
import CareersAscentStream from "@/components/ui/hero-animations/CareersAscentStream";

const highlights = [
  {
    icon: BriefcaseBusiness,
    title: "Meaningful work",
    text: "Solve real enterprise challenges across SAP, data, analytics, and automation.",
    color: "bg-[#29ab87]/20 text-[#29ab87] ring-[#29ab87]/40",
  },
  {
    icon: Users,
    title: "Grow together",
    text: "Learn alongside experienced consultants in a collaborative, ownership-driven team.",
    color: "bg-[#38bdf8]/20 text-[#38bdf8] ring-[#38bdf8]/40",
  },
  {
    icon: Mail,
    title: "Start a conversation",
    text: "Share your experience with us and we will contact you when there is a strong fit.",
    color: "bg-[#f5a623]/20 text-[#f5a623] ring-[#f5a623]/40",
  },
];

export default function CareersPage() {
  return (
    <main className="overflow-hidden bg-[#121927] text-white">
      {/* ── Hero ─────────────────────────────── */}
      <section className="relative isolate flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden bg-[#050817] pt-24 sm:pt-28 lg:pt-24 pb-10 sm:pb-12">
        <div className="absolute inset-0 -z-10 tri-mesh" />
        <div className="absolute inset-0 -z-10 tri-grid-bg" />
        <Image
          src="/assets/heroes/careers-generated-v2.png"
          alt="Careers at Trijotech - enterprise consulting team"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 object-cover object-center opacity-95"
        />
        {/* Slow rising talent elevation streams & milestone orbs */}
        <CareersAscentStream />

        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(5,8,23,0.85)_0%,rgba(5,8,23,0.45)_50%,rgba(5,8,23,0.15)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#050817] to-transparent" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 items-center px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-50 backdrop-blur-md animate-pulse-glow"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-200" /> Careers
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="text-xl font-semibold leading-[1.2] tracking-tight text-white sm:text-2xl lg:text-3xl xl:text-4xl"
            >
              Grow with a team that{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                values craft & outcome
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="mt-3.5 sm:mt-4 max-w-2xl text-sm sm:text-base font-normal leading-relaxed text-slate-200"
            >
              Join consultants, engineers, and problem solvers building practical SAP and data solutions for forward-thinking enterprises.
            </motion.p>
          </div>
        </div>

        {/* Clean bottom separator */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.08]" />
      </section>

      {/* ── Life at Trijotech ─────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#0b1d33] py-12 sm:py-14 lg:py-16 border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-hex-grid opacity-45" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-mesh opacity-50" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex h-full flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="max-w-3xl"
              >
                <p className="tri-overline">Life at Trijotech</p>
                <h2 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl">
                  Create impact while{" "}
                  <span className="tri-gradient-text">building your career</span>
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  We value thoughtful problem-solving, continuous learning, and people who take responsibility for excellent outcomes.
                </p>
              </motion.div>

              <div className="grid flex-1 gap-4 items-stretch">
                {highlights.map(({ icon: Icon, title, text, color }, i) => (
                  <motion.article
                    key={title}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="flex flex-1 flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-[#29ab87]/50 hover:bg-white/[0.07]"
                  >
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.12 }}
                      transition={{ duration: 0.25 }}
                      className={`flex h-9 w-9 items-center justify-center rounded-xl ring-1 ${color}`}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.div>
                    <h3 className="mt-3 text-sm sm:text-base font-bold text-white">{title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-300">{text}</p>
                  </motion.article>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="h-full"
            >
              <div className="h-full">
                <CareersCultureShowcase />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Apply ────────────────────────────── */}
      <section
        id="apply"
        className="relative isolate overflow-hidden scroll-mt-24 bg-[#18263e] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 border-t border-white/10"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-mesh opacity-60" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-grid-bg opacity-25" />
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="mb-8 text-center"
          >
            <p className="tri-overline">Join our team</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Tell us where you want to grow
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-300">
              Apply below or email{" "}
              <a className="font-semibold text-[#7edcc2] hover:text-[#f5a623] underline" href="mailto:hr@trijotech.com">
                hr@trijotech.com
              </a>
              . We will get in touch when your experience matches an opportunity.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <ContactUs variant="career" showResume hideHeading />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
