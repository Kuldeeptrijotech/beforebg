"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Mail, Users } from "lucide-react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientButton from "@/components/ui/GradientButton";
import HexBadge from "@/components/ui/HexBadge";
import { StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";

const cards = [
  {
    title: "About Trijotech",
    href: "/about-us",
    image: "/assets/about/trijotech-team-collaboration-blue.png",
    imageAlt: "Trijotech team collaborating",
    description: "Learn about our company, SAP and data expertise, practical delivery approach, mission, values, and leadership.",
    cta: "Learn More",
    icon: Building2,
    tone: "blue" as const,
  },
  {
    title: "Careers",
    href: "/careers",
    image: "/assets/heroes/careers-generated-v2.png",
    imageAlt: "Careers at Trijotech",
    description: "Explore opportunities to build your career in SAP consulting and enterprise technology with a collaborative team.",
    cta: "Explore Careers",
    icon: Users,
    tone: "blue" as const,
  },
  {
    title: "Contact Us",
    href: "/contact",
    image: "/assets/heroes/contact-generated-v2.png",
    imageAlt: "Contact the Trijotech team",
    description: "Connect with Trijotech about services, partnerships, support, careers, or your next transformation priority.",
    cta: "Contact Us",
    icon: Mail,
    tone: "blue" as const,
  },
];

export default function CorporatePage() {
  return (
    <main className="public-alternating-page overflow-hidden bg-[#030713] text-white font-sans">
      {/* ──── Hero ────────────────────────────────────────────────────────────── */}
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
        <div className="tri-blob -z-10 h-80 w-80" style={{ right: "15%", top: "10%", background: "radial-gradient(circle, rgba(255, 255, 255,0.18), transparent 70%)" }} />
        <div className="tri-blob -z-10 h-64 w-64" style={{ left: "5%", bottom: "15%", background: "radial-gradient(circle, rgba(255, 255, 255,0.12), transparent 70%)" }} />

        <div className="mx-auto flex min-h-[calc(100svh-9.5rem)] w-full max-w-7xl items-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="max-w-3xl text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Building lasting value through SAP expertise & trust
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
              className="mt-10 flex flex-wrap gap-4 relative z-10"
            >
              <a
                href="#explore"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 border-0 shadow-[0_8px_20px_rgba(255,255,255,0.25)] hover:shadow-[0_12px_28px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:translate-y-0 relative z-10 hover:z-20 transition-all duration-200"
              >
                Explore Corporate <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/about-us"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white border border-white/20 bg-white/5 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 relative z-10 hover:z-20 transition-all duration-200"
              >
                About Trijotech
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Clean bottom separator */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.08]" />
      </section>

      {/* ──── Cards ────────────────────────────────────────────────────────────── */}
      <section id="explore" className="relative overflow-hidden bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen py-24 sm:py-32 border-b border-slate-200 text-slate-900">
        <Container className="relative">
          <StaggerReveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <StaggerRevealItem className="max-w-3xl">
              <SectionHeading
                eyebrow="Company, people and connections"
                dark={false}
                title="Explore corporate information and resources"
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
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md"
                  >
                    <Link href={card.href} className="relative block aspect-[16/10] overflow-hidden bg-slate-900">
                      <Image
                        src={card.image}
                        alt={card.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition duration-700 group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,26,44,0.7)] via-transparent to-transparent" />
                      <motion.span
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-4 top-4 z-10 drop-shadow-xl"
                      >
                        <HexBadge icon={Icon} tone={card.tone} size="md" />
                      </motion.span>
                    </Link>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="text-base sm:text-lg font-bold leading-snug text-slate-900 group-hover:text-slate-700 transition-colors">
                        {card.title}
                      </h3>
                      <p className="mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-slate-600">{card.description}</p>
                      <div className="mt-auto pt-4">
                        <Link
                          href={card.href}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-900 transition-all duration-300 group-hover:gap-2.5 group-hover:text-slate-700"
                        >
                          <span>{card.cta}</span>
                          <span aria-hidden="true" className="text-base font-bold transition-transform duration-300 group-hover:translate-x-1">→</span>
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
    </main>
  );
}
