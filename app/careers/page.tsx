"use client";

import Image from "next/image";
import { BriefcaseBusiness, Mail, Sparkles, Users } from "lucide-react";
import ContactUs from "../components/ContactUs";
import { motion } from "framer-motion";
import CareerGrowthScene from "@/components/scenes/CareerGrowthScene";

const highlights = [
  {
    icon: BriefcaseBusiness,
    title: "Meaningful work",
    text: "Solve real enterprise challenges across SAP, data, analytics, and automation.",
    color: "bg-cyan-50 text-cyan-700 ring-cyan-100",
  },
  {
    icon: Users,
    title: "Grow together",
    text: "Learn alongside experienced consultants in a collaborative, ownership-driven team.",
    color: "bg-indigo-50 text-indigo-700 ring-indigo-100",
  },
  {
    icon: Mail,
    title: "Start a conversation",
    text: "Share your experience with us and we will contact you when there is a strong fit.",
    color: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  },
];

export default function CareersPage() {
  return (
    <main className="overflow-hidden bg-[#e8f2fb] text-slate-900">
      {/* ── Hero ─────────────────────────────── */}
      <section className="relative isolate flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden bg-[#050817] pt-20">
        <div className="absolute inset-0 -z-10 tri-mesh" />
        <div className="absolute inset-0 -z-10 tri-grid-bg" />
        <Image
          src="/assets/heroes/careers-generated-v2.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 object-cover object-center opacity-45"
        />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(5,8,23,0.94)_0%,rgba(5,8,23,0.62)_44%,rgba(5,8,23,0.2)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#050817] to-transparent" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 items-center px-5 py-16 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-50 backdrop-blur-md animate-pulse-glow"
            >
              <Sparkles className="h-4 w-4 text-cyan-200" /> Careers
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl"
            >
              Build work that{" "}
              <span className="gradient-text">moves businesses forward</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="mt-6 max-w-2xl text-xl font-medium leading-8 text-cyan-50 sm:text-2xl"
            >
              Bring your curiosity, expertise, and ambition to a team delivering practical SAP and technology transformation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.52 }}
            >
              <a
                href="#apply"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3.5 font-semibold text-cyan-950 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-xl hover:shadow-cyan-400/30"
              >
                Explore opportunities
              </a>
            </motion.div>
          </div>
        </div>

        {/* rising growth markers */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-[10%] hidden w-24 lg:block">
          <div className="absolute bottom-24 left-0 h-2 w-2 rounded-full bg-tri-2/60 tri-pulse" />
          <div className="absolute bottom-40 left-8 h-1.5 w-1.5 rounded-full bg-amber-400/70 tri-pulse" style={{ animationDelay: "0.8s" }} />
          <div className="absolute bottom-64 left-4 h-2.5 w-2.5 rounded-full bg-tri-2/80 tri-pulse" style={{ animationDelay: "1.6s" }} />
          <div className="absolute bottom-80 left-10 h-1.5 w-1.5 rounded-full bg-[#7edcc2]/70 tri-pulse" style={{ animationDelay: "2.4s" }} />
          <div className="absolute bottom-96 left-2 h-2 w-2 rounded-full bg-tri-2/70 tri-pulse" style={{ animationDelay: "3.2s" }} />
        </div>

      </section>

      {/* ── Life at Trijotech ─────────────────── */}
      <section className="bg-gradient-to-b from-[#d5eafa] to-[#e8f2fb] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="max-w-3xl"
            >
              <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-cyan-700">
                <span className="h-px w-5 bg-cyan-400" />
                Life at Trijotech
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Create impact while{" "}
                <span className="gradient-text">building your career</span>
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                We value thoughtful problem-solving, continuous learning, and people who take responsibility for excellent outcomes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            >
              <CareerGrowthScene />
            </motion.div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {highlights.map(({ icon: Icon, title, text, color }, i) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="flex h-full flex-col rounded-3xl border border-blue-200 bg-[#f5faff] p-7 shadow-sm transition-shadow duration-300 hover:border-cyan-300 hover:shadow-xl"
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.12 }}
                  transition={{ duration: 0.25 }}
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${color}`}
                >
                  <Icon className="h-6 w-6" />
                </motion.div>
                <h3 className="mt-6 text-xl font-bold text-slate-900">{title}</h3>
                <p className="mt-3 flex-1 leading-7 text-slate-600">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Apply ────────────────────────────── */}
      <section
        id="apply"
        className="industry-form-theme scroll-mt-24 bg-[#dcebf8] px-5 py-14 sm:px-8 sm:py-16 lg:px-12"
      >
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="mb-7 text-center"
          >
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-cyan-700">
              <span className="h-px w-5 bg-cyan-400" />
              Join our team
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Tell us where you want to grow
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Apply below or email{" "}
              <a className="font-semibold text-cyan-700 hover:text-cyan-600" href="mailto:hr@trijotech.com">
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
