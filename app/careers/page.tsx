"use client";

import Image from "next/image";
import { BriefcaseBusiness, Mail, Users } from "lucide-react";
import ContactUs from "../components/ContactUs";
import { motion } from "framer-motion";
import CareersCultureShowcase from "@/components/careers/CareersCultureShowcase";
import CareersAscentStream from "@/components/ui/hero-animations/CareersAscentStream";

const highlights = [
  {
    icon: BriefcaseBusiness,
    title: "Meaningful work",
    text: "Solve real enterprise challenges across SAP, data, analytics, and automation.",
    color: "bg-white/20 text-white ring-[#ffffff]/40",
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
    color: "bg-white/20 text-white ring-[#ffffff]/40",
  },
];

export default function CareersPage() {
  return (
    <main className="public-alternating-page overflow-hidden bg-[#121927] text-white">
      {/* ──── Hero ────────────────────────────────────────────────────────────── */}
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
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Grow with a team that values craft & outcome
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="mt-5 max-w-2xl text-base font-normal leading-[1.7] text-white/80 sm:text-lg"
            >
              Join consultants, engineers, and problem solvers building practical SAP and data solutions for forward-thinking enterprises.
            </motion.p>
          </div>
        </div>

        {/* Clean bottom separator */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.08]" />
      </section>

      {/* ──── Life at Trijotech ────────────────────────────────────── */}
      <section id="culture" className="relative isolate overflow-hidden bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen py-12 sm:py-14 lg:py-16 border-b border-slate-200 text-slate-900">
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
                <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-900">Life at Trijotech</p>
                <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
                  Create impact while building your career
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  We value thoughtful problem-solving, continuous learning, and people who take responsibility for excellent outcomes.
                </p>
              </motion.div>

              <div className="grid flex-1 gap-4 items-stretch">
                {highlights.map(({ icon: Icon, title, text }, i) => (
                  <motion.article
                    key={title}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="flex flex-1 flex-col rounded-2xl border border-slate-200 bg-white text-slate-900 p-4.5 sm:p-5 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md"
                  >
                    <motion.span
                      whileHover={{ rotate: 10, scale: 1.12 }}
                      transition={{ duration: 0.25 }}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-900 shadow-md transition-all duration-300"
                    >
                      <Icon className="h-5 w-5 text-slate-900" strokeWidth={2.2} />
                    </motion.span>
                    <h3 className="mt-3.5 text-base sm:text-lg font-bold text-slate-900">{title}</h3>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-slate-600">{text}</p>
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

      {/* ──── Apply ──────────────────────────────────────────────────────────── */}
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
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#38bdf8]">Join our team</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Tell us where you want to grow
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-300">
              Apply below or email{" "}
              <a className="font-semibold text-white hover:text-white underline" href="mailto:hr@trijotech.com">
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
            className="career-form-parent"
          >
            <ContactUs variant="career" showResume hideHeading />
          </motion.div>
        </div>
      </section>
    </main>
  );
}

