"use client";

import Image from "next/image";
import { Mail, MapPin, Phone, Sparkles } from "lucide-react";
import ContactUs from "../components/ContactUs";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import ContactSignalPulse from "@/components/ui/hero-animations/ContactSignalPulse";

const contactItems = [
  {
    icon: Phone,
    title: "Call us",
    color: "bg-[#29ab87]/20 text-[#29ab87] ring-[#29ab87]/40",
    content: (
      <>
        <a href="tel:+911203506433">+91 120-3506433</a>
        <a href="tel:+917982531976">+91 7982531976</a>
      </>
    ),
  },
  {
    icon: Mail,
    title: "Email us",
    color: "bg-[#38bdf8]/20 text-[#38bdf8] ring-[#38bdf8]/40",
    content: <a href="mailto:sales@trijotech.com">sales@trijotech.com</a>,
  },
  {
    icon: MapPin,
    title: "Visit us",
    color: "bg-[#8b7cf6]/20 text-[#8b7cf6] ring-[#8b7cf6]/40",
    content: (
      <p className="text-slate-300">
        C56A, Infinity Tecnopark, 501, 16, C Block, Phase 2, Sector 62, Noida,
        Uttar Pradesh 201309
      </p>
    ),
  },
];

export default function ContactPage() {
  return (
    <main className="overflow-hidden bg-[#121927] text-white">
      {/* ── Hero ─────────────────────────────── */}
      <section className="relative isolate flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden bg-[#050817] pt-12 sm:pt-14 lg:pt-16">
        <Image
          src="/assets/heroes/contact-generated-v2.png"
          alt="Contact Trijotech enterprise consulting team"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-95"
        />
        <div className="absolute inset-0 -z-10 tri-mesh opacity-50" />
        <div className="absolute inset-0 -z-10 tri-grid-bg opacity-30" />
        
        {/* Slow radiating signal pulses & connection waves */}
        <ContactSignalPulse />

        <div className="pointer-events-none absolute right-[8%] top-[14%] h-64 w-64 rounded-full bg-[rgba(41,171,135,0.14)] blur-3xl tri-pulse" />
        <div className="pointer-events-none absolute bottom-[16%] left-[6%] h-48 w-48 rounded-full bg-[rgba(245,166,35,0.12)] blur-3xl tri-pulse" style={{ animationDelay: "1.5s" }} />

        {/* text safe zone */}
        <div className="pointer-events-none absolute inset-0 max-lg:bg-[#050817]/65 lg:bg-[linear-gradient(to_right,rgba(5,8,23,0.85)_0%,rgba(5,8,23,0.45)_50%,transparent_85%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#050817] to-transparent" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 items-center px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-50 backdrop-blur-md animate-pulse-glow"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-200" /> Contact Us
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl xl:text-5xl"
            >
              Let&apos;s start a{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                meaningful conversation
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="mt-3.5 sm:mt-4 max-w-2xl text-sm sm:text-base font-normal leading-relaxed text-slate-200"
            >
              Whether exploring a new SAP implementation, solving integration bottlenecks, or upgrading your analytics, our team is ready to help.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.52 }}
            >
              <a
                href="#contact-form"
                className="mt-6 sm:mt-7 inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-cyan-950 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-xl"
              >
                Start a conversation
              </a>
            </motion.div>
          </div>
        </div>

        {/* Clean bottom separator */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.08]" />
      </section>

      {/* ── Contact Info ─────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#0b1d33] py-12 sm:py-14 lg:py-16 border-b border-white/5">
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
            <p className="tri-overline">Get in touch</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Connect with our team
            </h2>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">
              Reach out directly or send us an enquiry below. We are here to answer questions and explore how we can support your initiatives.
            </p>
          </motion.div>

          <div className="mt-7 sm:mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {contactItems.map(({ icon: Icon, title, content, color }, i) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-[#29ab87]/50 hover:bg-white/[0.07]"
              >
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 3 + i, ease: "easeInOut" }}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ring-1 ${color}`}
                >
                  <Icon className="h-5 w-5" />
                </motion.div>
                <h3 className="mt-4 text-base sm:text-lg font-bold text-white">{title}</h3>
                <div className="mt-2 flex flex-1 flex-col gap-1.5 text-xs sm:text-sm leading-relaxed text-slate-300 [&_a]:font-semibold [&_a]:text-[#7edcc2] [&_a]:hover:text-[#f5a623] [&_a]:transition-colors">
                  {content as ReactNode}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form ─────────────────────── */}
      <section
        id="contact-form"
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
            <p className="tri-overline">Send an enquiry</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              How can we help?
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-300">
              Share a few details and we will respond within one to two business days.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <ContactUs showInquiryDropdown hideHeading />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
