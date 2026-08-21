"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Mail, Sparkles, Users } from "lucide-react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientButton from "@/components/ui/GradientButton";
import HexBadge from "@/components/ui/HexBadge";
import { StaggerReveal, StaggerRevealItem, Reveal } from "@/components/motion/Reveal";

const cards = [
  {
    title: "About Trijotech",
    href: "/about-us",
    image: "/assets/about/trijotech-team-collaboration-blue.png",
    imageAlt: "Trijotech team collaborating",
    description: "Learn about our company, SAP and data expertise, practical delivery approach, mission, values, and leadership.",
    cta: "Learn More",
    icon: Building2,
    tone: "green" as const,
  },
  {
    title: "Careers",
    href: "/careers",
    image: "/assets/heroes/careers-generated-v2.png",
    imageAlt: "Careers at Trijotech",
    description: "Explore opportunities to build your career in SAP consulting and enterprise technology with a collaborative team.",
    cta: "Explore Careers",
    icon: Users,
    tone: "mix" as const,
  },
  {
    title: "Contact Us",
    href: "/contact",
    image: "/assets/heroes/contact-generated-v2.png",
    imageAlt: "Contact the Trijotech team",
    description: "Connect with Trijotech about services, partnerships, support, careers, or your next transformation priority.",
    cta: "Contact Us",
    icon: Mail,
    tone: "amber" as const,
  },
];

export default function CorporatePage() {
  return (
    <main className="overflow-hidden bg-[#030713] text-white font-sans">
      {/* ── Hero ─────────────────────────────── */}
      <section className="relative isolate flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden bg-[#050817] pt-24 sm:pt-28 lg:pt-24 pb-12">
        {/* Layered ambient backgrounds */}
        <div aria-hidden className="absolute inset-0 -z-40 tri-mesh" />
        <div aria-hidden className="absolute inset-0 -z-30 tri-hex-grid opacity-55" />
        <Image
          src="/assets/about/trijotech-team-collaboration-blue.png"
          alt="Corporate at Trijotech - enterprise consulting team"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-95"
        />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(5,8,23,0.85)_0%,rgba(5,8,23,0.45)_50%,rgba(5,8,23,0.15)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-[#050817] to-transparent" />

        {/* Ambient glow orbs */}
        <div className="tri-blob -z-10 h-80 w-80" style={{ right: "15%", top: "10%", background: "radial-gradient(circle, rgba(41,171,135,0.18), transparent 70%)" }} />
        <div className="tri-blob -z-10 h-64 w-64" style={{ left: "5%", bottom: "15%", background: "radial-gradient(circle, rgba(245,166,35,0.12), transparent 70%)" }} />

        <div className="mx-auto flex min-h-[calc(100svh-9.5rem)] w-full max-w-7xl items-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(41,171,135,0.35)] bg-[rgba(41,171,135,0.1)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#29ab87] shadow-sm shadow-[rgba(41,171,135,0.18)] backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#29ab87]" />
              Corporate
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="max-w-3xl text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Building lasting value through{" "}
              <span className="tri-gradient-text">
                SAP expertise & trust
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="mt-6 max-w-2xl text-base font-normal leading-[1.7] text-white/80 sm:text-lg"
            >
              Learn about our company, career opportunities, and how to connect with the Trijotech team across locations and capabilities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="#explore"
                className="tri-btn tri-btn-primary px-7 py-3.5 text-sm font-semibold"
              >
                Explore Corporate <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/about-us"
                className="tri-btn tri-btn-ghost px-7 py-3.5 text-sm font-semibold"
              >
                About Trijotech
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Clean bottom separator */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.08]" />
      </section>

      {/* ── Cards ─────────────────────────────── */}
      <section id="explore" className="relative overflow-hidden bg-[#162032] py-24 sm:py-32 border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-mesh" />
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[rgba(41,171,135,0.18)] blur-[100px] tri-pulse" />
        <div aria-hidden className="pointer-events-none absolute -bottom-28 -left-28 h-[420px] w-[420px] rounded-full bg-[rgba(245,166,35,0.14)] blur-[100px] tri-pulse" style={{ animationDelay: "2s" }} />

        <Container className="relative">
          <StaggerReveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <StaggerRevealItem className="max-w-3xl">
              <SectionHeading
                eyebrow="Company, people and connections"
                dark
                title={
                  <>
                    Explore the corporate{" "}
                    <span className="tri-gradient-text">information and resources</span>
                  </>
                }
                description="Discover the people, culture, and opportunities that make Trijotech a trusted SAP partner."
              />
            </StaggerRevealItem>
            <StaggerRevealItem>
              <GradientButton href="/about-us" variant="outline" size="md">
                About Trijotech <ArrowRight className="h-4 w-4" />
              </GradientButton>
            </StaggerRevealItem>
          </StaggerReveal>

          <StaggerReveal className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <StaggerRevealItem key={card.href} className="h-full">
                  <motion.article
                    whileHover={{ y: -8, transition: { duration: 0.25 } }}
                    className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-[#29ab87]/50 hover:bg-white/[0.07]"
                  >
                    <Link href={card.href} className="relative block aspect-[16/10] overflow-hidden bg-slate-900">
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
                        className="absolute left-4 top-4"
                      >
                        <HexBadge icon={Icon} tone={card.tone} size="md" />
                      </motion.span>
                    </Link>

                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <h3 className="text-xl font-bold leading-snug text-white transition-colors group-hover:text-[#7edcc2] sm:text-2xl">
                        {card.title}
                      </h3>
                      <p className="mt-4 flex-1 leading-7 text-slate-300">{card.description}</p>
                      <Link
                        href={card.href}
                        className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#7edcc2] transition-all duration-300 group-hover:gap-3 group-hover:text-[#f5a623]"
                      >
                        {card.cta} <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </motion.article>
                </StaggerRevealItem>
              );
            })}
          </StaggerReveal>
        </Container>
      </section>

      {/* ── CTA Banner ────────────────────────── */}
      <section className="relative overflow-hidden bg-[#121927] py-12 sm:py-14">
        <Container className="relative">
          <Reveal>
            <div className="tri-border-gradient relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[linear-gradient(145deg,#1e2a3f,#162236_50%,#111827)] px-6 py-8 text-center shadow-[0_40px_120px_-30px_rgba(0,0,0,0.5)] sm:px-12 sm:py-10">
              <div className="absolute inset-0 tri-hex-grid opacity-50" />
              <div className="absolute -right-16 -top-16 h-80 w-80 rounded-full border-[60px] border-white/[0.03] tri-spin-slow" />
              <div className="tri-blob h-72 w-72 animate-float-slow" style={{ left: "-6%", bottom: "-8%", background: "radial-gradient(circle, rgba(41,171,135,0.28), transparent 68%)" }} />
              <div className="tri-blob h-60 w-60 animate-float-reverse" style={{ right: "-4%", top: "10%", background: "radial-gradient(circle, rgba(245,166,35,0.22), transparent 68%)" }} />

              <div className="relative mx-auto max-w-3xl">
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.22em] text-[#f5a623]"
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
                  Ready to build something great together?
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
                    <GradientButton href="/about-us" variant="ghost" size="lg" className="w-full sm:w-fit">
                      About Trijotech
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