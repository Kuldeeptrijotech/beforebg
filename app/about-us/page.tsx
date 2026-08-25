"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import AboutPillarsShowcase from "@/components/about/AboutPillarsShowcase";

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
      "Rakesh guides delivery excellence, enterprise architecture, and technical execution across major client programs.",
  },
  {
    name: "Rajesh Soni",
    role: "Director of Delivery",
    image: "/assets/images/team_03.jpg",
    description:
      "Rajesh oversees delivery teams, quality standards, and program governance to keep projects predictable and on track.",
  },
];

export default function AboutUsPage() {
  return (
    <main className="about-page public-alternating-page overflow-hidden bg-[#030713] text-white">
      {/* ── Hero ─────────────────────────────── */}
      <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-[#050817] pt-24 sm:pt-28 lg:pt-24 pb-12">
        <Image
          src="/assets/about/trijotech-team-collaboration-blue.png"
          alt="Trijotech leadership and global consultant team collaboration"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-95"
        />

        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(5,8,23,0.85)_0%,rgba(5,8,23,0.45)_50%,rgba(5,8,23,0.15)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#050817] to-transparent" />

        {/* Ambient glow orbs */}
        <div className="pointer-events-none absolute right-1/4 top-1/4 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-1/3 left-1/3 h-56 w-56 rounded-full bg-indigo-400/8 blur-3xl" />

        <div className="mx-auto flex min-h-[calc(100svh-9.5rem)] w-full max-w-7xl items-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-[#050817]/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white"
            >
              <Sparkles className="h-3.5 w-3.5 text-white" />
              About Trijotech
            </div>

            <h1
              className="mt-5 text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Technology shaped around{" "}
              <span className="tri-gradient-text">
                real outcomes
              </span>
            </h1>

            <p
              className="mt-6 text-base font-normal leading-[1.7] text-white/80 sm:text-lg"
            >
              We help enterprises modernize SAP landscapes, integrate critical data, and turn technology investments into sustainable business advantage.
            </p>

            <div
              className="mt-9 flex flex-wrap gap-4"
            >
              <a
                href="#who-we-are"
                className="inline-flex tri-btn tri-btn-primary tri-focus px-7 py-4 text-sm font-semibold"
              >
                Discover our story <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="rounded-full border border-white/30 bg-white/10 px-6 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-white/20"
              >
                Talk to our team
              </Link>
            </div>
          </div>
        </div>

        {/* narrative progress line */}
        <div className="pointer-events-none absolute inset-x-0 bottom-14">
          <div className="relative mx-auto h-px w-[min(86%,38rem)] bg-white/15">
            <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_rgba(255, 255, 255,0.9)]" />
            <span className="absolute -top-1 left-0 h-3 w-3 -translate-x-1/2 rounded-full border border-white/50" />
            <span className="absolute -top-1 right-0 h-3 w-3 translate-x-1/2 rounded-full border border-white/50" />
          </div>
        </div>

        {/* Clean bottom separator */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.08]" />
      </section>

      {/* ── Who We Are ───────────────────────── */}
      <section id="who-we-are" className="relative isolate overflow-hidden bg-[#0b1d33] py-20 sm:py-24 lg:py-28 border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-hex-grid opacity-45" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-mesh opacity-50" />
        <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[rgba(255, 255, 255,0.15)] blur-3xl animate-float" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-12">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <p className="tri-overline">Who we are</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Deep expertise,{" "}
              <span className="tri-gradient-text">close collaboration</span>
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Trijotech is a technology consulting company focused on SAP, enterprise data, analytics, integration, and intelligent automation. We combine deep functional understanding with hands-on engineering to solve the challenges that matter most to your business.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-300">
              Our consultants bring global experience and a collaborative mindset to every engagement. Whether modernizing a core platform, improving planning and reporting, or building on SAP BTP, we stay close to the outcome from strategy through support.
            </p>
            <div className="about-expertise-note mt-6 flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold sm:text-base">
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(150deg,#22d3ee,#2563eb)] text-white shadow-md"
              >
                <Check className="h-3.5 w-3.5" />
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
            <AboutPillarsShowcase />
          </motion.div>
        </div>
      </section>

      {/* ── Vision / Mission / Goals ─────────── */}
      <section className="relative isolate overflow-hidden bg-[#18263e] py-20 sm:py-24 lg:py-28 border-b border-white/10">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-mesh opacity-60" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-grid-bg opacity-25" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="max-w-3xl"
          >
            <p className="tri-overline">Our direction</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Vision, mission and goals
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              The principles that guide every engagement and long-term client partnership.
            </p>
          </motion.div>

          <div className="mt-7 sm:mt-9 grid gap-5 md:grid-cols-3 items-stretch">
            {purposes.map((item, i) => (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="about-card flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-8 shadow-2xl transition-all duration-300 hover:border-white/50 hover:bg-white/[0.07]"
              >
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-white">{item.label}</p>
                <h3 className="mt-3 text-base sm:text-lg font-bold leading-snug text-white">{item.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-slate-300 sm:text-base">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#0b1d33] py-20 sm:py-24 lg:py-28 border-b border-white/5">
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
            <p className="tri-overline">How we work</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Simple principles, consistently applied
            </h2>
          </motion.div>

          <div className="mt-7 sm:mt-9 grid gap-5 md:grid-cols-3 items-stretch">
            {values.map((value, i) => (
              <motion.article
                key={value.number}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="about-card group relative flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-8 shadow-2xl transition-all duration-300 hover:border-white/50 hover:bg-white/[0.07]"
              >
                <motion.span
                  className="absolute right-4 top-3 text-4xl font-bold text-white/10 transition-colors group-hover:text-white/30"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                >
                  {value.number}
                </motion.span>
                <h3 className="relative mt-8 text-base sm:text-lg font-bold text-white">{value.title}</h3>
                <p className="relative mt-4 flex-1 text-sm leading-7 text-slate-300 sm:text-base">{value.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership ───────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#18263e] py-20 sm:py-24 lg:py-28 border-b border-white/10">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-mesh opacity-60" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-grid-bg opacity-25" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="max-w-3xl"
          >
            <p className="tri-overline">Our leadership</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Leadership that{" "}
              <span className="tri-gradient-text">builds trust</span>
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              Deep SAP experience with a practical focus on predictable delivery and long-term client success.
            </p>
          </motion.div>

          <div className="mt-7 sm:mt-9 grid gap-5 md:grid-cols-3 items-stretch">
            {leadership.map((leader, i) => (
              <motion.article
                key={leader.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="about-card group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl transition-all duration-300 hover:border-white/50 hover:bg-white/[0.07]"
              >
                <div className="relative aspect-[16/10] w-full shrink-0 bg-slate-900 overflow-hidden">
                  <Image
                    src={leader.image}
                    alt={`Photo of ${leader.name}`}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover object-top transition duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121927]/80 via-transparent to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-xl font-bold text-white">{leader.name}</h3>
                  <p className="mt-0.5 text-xs sm:text-sm font-semibold text-white">{leader.role}</p>
                  <p className="mt-4 flex-1 text-sm leading-7 text-slate-300 sm:text-base">{leader.description}</p>
                </div>
              </motion.article>
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
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[48px] border-white/5 tri-spin-slow" />
          <div className="tri-blob h-56 w-56 animate-float-slow" style={{ left: "-6%", bottom: "-8%", background: "radial-gradient(circle, rgba(255, 255, 255,0.28), transparent 68%)" }} />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[.2em] text-white">Let&apos;s work together</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Ready to turn your next priority into progress?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Connect with our team to explore a practical path forward.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="inline-block mt-6">
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
