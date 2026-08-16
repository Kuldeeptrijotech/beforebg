"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import AboutGrowthScene from "@/components/scenes/AboutGrowthScene";

const purposes = [
  {
    label: "Our Vision",
    title: "Become the trusted partner every organization relies on.",
    text: "We aspire to be the partner organizations depend on for simpler, smarter SAP and data transformation that delivers real, lasting value.",
  },
  {
    label: "Our Mission",
    title: "Make transformation feel achievable.",
    text: "We bring clarity to complex programs, design around real business needs, and deliver technology that creates lasting value.",
  },
  {
    label: "Our Goals",
    title: "Deliver measurable value, build lasting partnerships.",
    text: "We focus on measurable outcomes, long-term client success, and continuous innovation on every engagement.",
  },
];

const values = [
  {
    number: "01",
    title: "Own the Outcome",
    description:
      "We take responsibility from the first conversation through delivery, adoption, and measurable business value.",
  },
  {
    number: "02",
    title: "Keep It Practical",
    description:
      "We turn complex SAP and data challenges into clear, maintainable solutions that teams can confidently use.",
  },
  {
    number: "03",
    title: "Build Together",
    description:
      "We work as an extension of your team, sharing knowledge and making decisions with transparency at every stage.",
  },
];

const leadership = [
  {
    name: "Rakesh Kumar",
    role: "Managing Director",
    image: "/assets/images/team_01.jpg",
    description:
      "Rakesh leads with accountability, business ownership, and a practical focus on SAP transformation that delivers measurable value.",
  },
  {
    name: "Rakesh Shah",
    role: "Managing Director",
    image: "/assets/images/team_02.jpg",
    description:
      "Rakesh builds trusted partnerships and ensures every engagement balances strategy, delivery, and lasting adoption.",
  },
  {
    name: "Priya Sharma",
    role: "Director of Customer Success",
    image: "/assets/images/team_03.jpg",
    description:
      "Priya helps clients turn programs into sustainable change, with a strong emphasis on adoption, support, and continuous improvement.",
  },
];

export default function AboutUsPage() {
  return (
    <main className="overflow-hidden bg-[#e8f2fb] text-slate-900">
      {/* ── Hero ─────────────────────────────── */}
      <section className="relative isolate flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden bg-[#050817] pt-20">
        <div className="absolute inset-0 -z-10 tri-mesh" />
        <div className="absolute inset-0 -z-10 tri-grid-bg" />
        <Image
          src="/assets/images/fun-facts-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 object-cover object-center opacity-30"
        />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(5,8,23,0.92)_0%,rgba(5,8,23,0.6)_42%,rgba(5,8,23,0.25)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#050817] to-transparent" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 items-center px-5 py-16 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-50 backdrop-blur-md animate-pulse-glow"
            >
              <Sparkles className="h-4 w-4 text-cyan-200" /> About Trijotech
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl"
            >
              A trusted partner for your{" "}
              <span className="gradient-text">digital journey</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="mt-6 max-w-2xl text-xl font-medium leading-8 text-cyan-50 sm:text-2xl"
            >
              Practical SAP expertise, collaborative delivery, and accountable outcomes from strategy through support.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.52 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <a
                href="#who-we-are"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3.5 font-semibold text-cyan-950 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-xl"
              >
                Discover our story <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="rounded-full border border-white/30 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
              >
                Talk to our team
              </Link>
            </motion.div>
          </div>
        </div>

        {/* narrative progress line */}
        <div className="pointer-events-none absolute inset-x-0 bottom-14">
          <div className="relative mx-auto h-px w-[min(86%,38rem)] bg-white/15">
            <motion.span
              className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-tri-2 shadow-[0_0_12px_rgba(41,171,135,0.9)]"
              animate={{ left: ["0%", "100%"] }}
              transition={{ repeat: Infinity, duration: 9, repeatType: "reverse", ease: "easeInOut" }}
            />
            <span className="absolute -top-1 left-0 h-3 w-3 -translate-x-1/2 rounded-full border border-tri-2/50" />
            <span className="absolute -top-1 right-0 h-3 w-3 translate-x-1/2 rounded-full border border-tri-2/50" />
          </div>
        </div>

      </section>

      {/* ── Who We Are ───────────────────────── */}
      <section id="who-we-are" className="relative bg-gradient-to-b from-[#d5eafa] to-[#e8f2fb] py-20 sm:py-24">
        <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-100/70 blur-3xl animate-float" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:px-12">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-cyan-700">
              <span className="h-px w-5 bg-cyan-400" />
              Who we are
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Deep expertise,{" "}
              <span className="gradient-text">close collaboration</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Trijotech is a technology consulting company focused on SAP, enterprise data, analytics, integration, and intelligent automation. We combine deep functional understanding with hands-on engineering to solve the challenges that matter most to your business.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Our consultants bring global experience and a collaborative mindset to every engagement. Whether modernizing a core platform, improving planning and reporting, or building on SAP BTP, we stay close to the outcome from strategy through support.
            </p>
            <div className="mt-7 flex items-center gap-3 border-t border-cyan-100 pt-6 font-semibold text-cyan-700">
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-600 text-white"
              >
                <Check className="h-4 w-4" />
              </motion.span>
              Expertise shaped around measurable business value
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <AboutGrowthScene />
          </motion.div>
        </div>
      </section>

      {/* ── Vision / Mission / Goals ─────────── */}
      <section className="bg-[#dcebf8] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="max-w-3xl"
          >
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-cyan-700">
              <span className="h-px w-5 bg-cyan-400" />
              Our direction
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Vision, mission and goals
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              The principles that guide every engagement and long-term client partnership.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {purposes.map((item, i) => (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="flex h-full flex-col rounded-3xl border border-blue-200 bg-[#f5faff] p-7 shadow-sm transition-shadow duration-300 hover:border-cyan-300 hover:shadow-xl"
              >
                <p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-700">{item.label}</p>
                <h3 className="mt-5 text-2xl font-bold leading-snug text-slate-900">{item.title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────── */}
      <section className="bg-[#e8f2fb] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="max-w-3xl"
          >
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-cyan-700">
              <span className="h-px w-5 bg-cyan-400" />
              How we work
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Simple principles, consistently applied
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((value, i) => (
              <motion.article
                key={value.number}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-blue-200 bg-[#f5faff] p-7 shadow-sm transition-shadow duration-300 hover:border-cyan-300 hover:shadow-xl"
              >
                <motion.span
                  className="absolute right-5 top-4 text-5xl font-bold text-slate-100 transition-colors group-hover:text-cyan-100"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                >
                  {value.number}
                </motion.span>
                <h3 className="relative mt-12 text-2xl font-bold text-slate-900">{value.title}</h3>
                <p className="relative mt-4 leading-7 text-slate-600">{value.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership ───────────────────────── */}
      <section className="bg-[#dcebf8] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="max-w-3xl"
          >
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-cyan-700">
              <span className="h-px w-5 bg-cyan-400" />
              Our leadership
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Leadership that{" "}
              <span className="gradient-text">builds trust</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Deep SAP experience with a practical focus on predictable delivery and long-term client success.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {leadership.map((leader, i) => (
              <motion.article
                key={leader.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-blue-200 bg-[#f5faff] shadow-sm transition-shadow duration-300 hover:border-cyan-300 hover:shadow-2xl hover:shadow-cyan-950/10"
              >
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <Image
                    src={leader.image}
                    alt={`Photo of ${leader.name}`}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover object-top transition duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-2xl font-bold text-slate-900">{leader.name}</h3>
                  <p className="mt-1 font-semibold text-cyan-700">{leader.role}</p>
                  <p className="mt-4 leading-7 text-slate-600">{leader.description}</p>
                </div>
              </motion.article>
            ))}
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
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-cyan-700 to-cyan-950 px-6 py-14 text-center shadow-2xl sm:px-12 sm:py-20"
        >
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[48px] border-white/5 animate-spin-slow" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-cyan-300/8 blur-2xl animate-float-slow" />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[.2em] text-white">Let&apos;s work together</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to turn your next priority into progress?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white">
              Connect with our team to explore a practical path forward.
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
