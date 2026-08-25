"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clapperboard, FileText, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientButton from "@/components/ui/GradientButton";
import HexBadge from "@/components/ui/HexBadge";
import { StaggerReveal, StaggerRevealItem, Reveal } from "@/components/motion/Reveal";

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
    tone: "green" as const,
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
    tone: "mix" as const,
  },
  {
    title: "Videos",
    href: "/videos",
    image: "/assets/heroes/videos-camera-hero.png",
    imageAlt: "Trijotech SAP video library",
    description:
      "Watch explainers, service overviews, and expert perspectives that make complex SAP and business topics easier to understand.",
    cta: "Explore Videos",
    icon: Clapperboard,
    tone: "amber" as const,
  },
];

export default function InsightsPage() {
  return (
    <main className="public-alternating-page overflow-hidden bg-[#030713] text-white font-sans">
      {/* ──── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden bg-[#050817] pt-24 sm:pt-28 lg:pt-24 pb-12">
        {/* layered ambient backgrounds */}
        <div aria-hidden className="absolute inset-0 -z-40 tri-mesh" />
        <div aria-hidden className="absolute inset-0 -z-30 tri-hex-grid opacity-55" />
        <Image
          src="/assets/heroes/blogs-blue.png"
          alt="Insights at Trijotech"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-95"
        />
        {/* Slow luminous waveforms & insight pulses */}

        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(5,8,23,0.85)_0%,rgba(5,8,23,0.45)_50%,rgba(5,8,23,0.15)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#050817] to-transparent" />

        {/* Ambient glow orbs */}
        <div className="tri-blob -z-10 h-80 w-80" style={{ right: "15%", top: "10%", background: "radial-gradient(circle, rgba(255, 255, 255,0.18), transparent 70%)" }} />
        <div className="tri-blob -z-10 h-64 w-64" style={{ left: "5%", bottom: "15%", background: "radial-gradient(circle, rgba(255, 255, 255,0.12), transparent 70%)" }} />

        <div className="mx-auto flex min-h-[calc(100svh-9.5rem)] w-full max-w-7xl items-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="max-w-3xl">
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hero-eyebrow-badge mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-[#050817]/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white"
            >
              <Sparkles className="h-3.5 w-3.5 text-white" />
              Insights Hub
            </motion.div>

            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="max-w-3xl text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Practical perspectives on{" "}
              <span className="tri-gradient-text">
                SAP & enterprise growth
              </span>
            </motion.h1>

            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="mt-6 max-w-2xl text-base font-normal leading-[1.7] text-white/80 sm:text-lg"
            >
              Explore blogs, case studies, and videos covering SAP transformation, cloud architecture, financial planning, integration, and data-driven execution.
            </motion.p>

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-9 flex flex-wrap gap-4 relative z-10"
            >
              <a
                href="#explore"
                className="hero-btn-blue tri-btn tri-focus px-7 py-4 text-sm font-semibold !text-white relative z-10 hover:z-20 transition-all duration-200"
                style={{ backgroundColor: "#257ae8d6", background: "#257ae8d6", color: "#ffffff", borderColor: "rgba(255, 255, 255, 0.35)" }}
              >
                Explore Insights <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/blogs"
                className="hero-btn-blue tri-btn tri-focus px-7 py-4 text-sm font-semibold !text-white relative z-10 hover:z-20 transition-all duration-200"
                style={{ backgroundColor: "#257ae8d6", background: "#257ae8d6", color: "#ffffff", borderColor: "rgba(255, 255, 255, 0.35)" }}
              >
                Read latest blogs
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Clean bottom separator */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.08]" />
      </section>

      {/* ──── Cards ────────────────────────────────────────────────────────────── */}
      <section id="explore" className="relative isolate overflow-hidden bg-[#0b1d33] py-12 sm:py-14 lg:py-16 border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-hex-grid opacity-45" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-mesh opacity-50" />
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[rgba(255, 255, 255,0.18)] blur-[100px] tri-pulse" />
        <div aria-hidden className="pointer-events-none absolute -bottom-28 -left-28 h-[420px] w-[420px] rounded-full bg-[rgba(255, 255, 255,0.14)] blur-[100px] tri-pulse" style={{ animationDelay: "2s" }} />

        <Container className="relative">
          <StaggerReveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <StaggerRevealItem className="max-w-3xl">
              <SectionHeading
                eyebrow="Learn from practical experience"
                dark
                title={
                  <>
                    Insight formats built for{" "}
                    <span className="tri-gradient-text">real-world learning</span>
                  </>
                }
                description="Choose from the insight formats already available across the Trijotech website."
              />
            </StaggerRevealItem>
            <StaggerRevealItem>
              <GradientButton href="/blogs" variant="outline" size="md">
                Read our blogs <ArrowRight className="h-4 w-4" />
              </GradientButton>
            </StaggerRevealItem>
          </StaggerReveal>

          <StaggerReveal className="mt-7 sm:mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 items-stretch" stagger={0.08}>
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <StaggerRevealItem key={card.href} className="h-full">
                  <motion.article
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl transition-all duration-300 hover:border-white/50 hover:bg-white/[0.07]"
                  >
                    <Link
                      href={card.href}
                      className="relative block aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-900"
                    >
                      <Image
                        src={card.image}
                        alt={card.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition duration-700 group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121927]/80 via-transparent to-transparent" />
                      <motion.span
                        whileHover={{ scale: 1.12, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-3.5 top-3.5"
                      >
                        <HexBadge icon={Icon} tone={card.tone} size="md" />
                      </motion.span>
                    </Link>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="text-base sm:text-lg font-bold leading-snug text-white transition-colors group-hover:text-white">
                        {card.title}
                      </h3>
                      <p className="mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-slate-300">{card.description}</p>
                      <div className="mt-auto pt-4">
                        <Link
                          href={card.href}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white transition-all duration-300 group-hover:gap-2.5 group-hover:text-white"
                        >
                          {card.cta} <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                </StaggerRevealItem>
              );
            })}
          </StaggerReveal>
        </Container>
      </section>

      {/* ──── CTA Banner ──────────────────────────────────────────────────── */}
      <section className="hidden relative isolate overflow-hidden bg-[#18263e] py-12 sm:py-16 border-t border-white/10">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-mesh opacity-60" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-grid-bg opacity-25" />
        <Container className="relative">
          <Reveal>
            <div className="tri-border-gradient relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[linear-gradient(145deg,#1e2a3f,#162236_50%,#111827)] px-6 py-8 text-center shadow-[0_40px_120px_-30px_rgba(0,0,0,0.5)] sm:px-12 sm:py-10">
              <div className="absolute inset-0 tri-hex-grid opacity-50" />
              <div className="absolute -right-16 -top-16 h-80 w-80 rounded-full border-[60px] border-white/[0.03] tri-spin-slow" />
              <div className="tri-blob h-72 w-72 animate-float-slow" style={{ left: "-6%", bottom: "-8%", background: "radial-gradient(circle, rgba(255, 255, 255,0.28), transparent 68%)" }} />
              <div className="tri-blob h-60 w-60 animate-float-reverse" style={{ right: "-4%", top: "10%", background: "radial-gradient(circle, rgba(255, 255, 255,0.22), transparent 68%)" }} />

              <div className="relative mx-auto max-w-3xl">
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.22em] text-white"
                >
                  <Sparkles className="h-4 w-4" />
                  Let&apos;s work together
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-3 text-2xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-3xl"
                >
                  Ready to turn insight into action?
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.28 }}
                  className="mx-auto mt-4 max-w-2xl text-sm leading-[1.7] text-slate-300 sm:text-base"
                >
                  Connect with Trijotech to explore SAP solutions designed around your organization, priorities, and growth plans.
                </motion.p>

                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                    <GradientButton href="/contact" size="lg" className="w-full sm:w-fit">
                      Start a conversation <ArrowRight className="h-5 w-5" />
                    </GradientButton>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                    <GradientButton href="/blogs" variant="ghost" size="lg" className="w-full sm:w-fit">
                      Explore blogs
                    </GradientButton>
                  </motion.div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
