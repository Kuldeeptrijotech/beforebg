"use client";

import { Mail, MapPin, Phone, Sparkles } from "lucide-react";
import ContactUs from "../components/ContactUs";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import ContactConnectionScene from "@/components/scenes/ContactConnectionScene";

const contactItems = [
  {
    icon: Phone,
    title: "Call us",
    color: "bg-emerald-50 text-emerald-700 ring-emerald-100",
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
    color: "bg-cyan-50 text-cyan-700 ring-cyan-100",
    content: <a href="mailto:sales@trijotech.com">sales@trijotech.com</a>,
  },
  {
    icon: MapPin,
    title: "Visit us",
    color: "bg-indigo-50 text-indigo-700 ring-indigo-100",
    content: (
      <p>
        C56A, Infinity Tecnopark, 501, 16, C Block, Phase 2, Sector 62, Noida,
        Uttar Pradesh 201309
      </p>
    ),
  },
];

export default function ContactPage() {
  return (
    <main className="overflow-hidden bg-[#e8f2fb] text-slate-900">
      {/* ── Hero ─────────────────────────────── */}
      <section className="relative isolate flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden bg-[#050817] pt-20">
        <div className="absolute inset-0 -z-10 tri-mesh" />
        <div className="absolute inset-0 -z-10 tri-grid-bg" />
        <div className="pointer-events-none absolute right-[8%] top-[14%] h-64 w-64 rounded-full bg-[rgba(41,171,135,0.14)] blur-3xl tri-pulse" />
        <div className="pointer-events-none absolute bottom-[16%] left-[6%] h-48 w-48 rounded-full bg-[rgba(245,166,35,0.12)] blur-3xl tri-pulse" style={{ animationDelay: "1.5s" }} />

        <div className="absolute inset-0 top-[4.5rem]">
          <ContactConnectionScene />
        </div>

        {/* text safe zone */}
        <div className="pointer-events-none absolute inset-0 max-lg:bg-[#050817]/65 lg:bg-[linear-gradient(to_right,rgba(5,8,23,0.9)_0%,rgba(5,8,23,0.55)_38%,transparent_66%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#050817] to-transparent" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 items-center px-5 py-16 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-50 backdrop-blur-md animate-pulse-glow"
            >
              <Sparkles className="h-4 w-4 text-cyan-200" /> Contact us
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl"
            >
              Let&apos;s solve what{" "}
              <span className="gradient-text">matters next</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="mt-6 max-w-2xl text-xl font-medium leading-8 text-cyan-50 sm:text-2xl"
            >
              Tell us about your SAP, data, or technology priorities. Our team will help you find a practical path forward.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.52 }}
            >
              <a
                href="#contact-form"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3.5 font-semibold text-cyan-950 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-xl"
              >
                Start a conversation
              </a>
            </motion.div>
          </div>
        </div>

      </section>

      {/* ── Contact Info ─────────────────────── */}
      <section className="bg-gradient-to-b from-[#d5eafa] to-[#e8f2fb] py-14 sm:py-16">
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
              Get in touch
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Connect with the{" "}
              <span className="gradient-text">right team</span>
            </h2>
          </motion.div>

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {contactItems.map(({ icon: Icon, title, content, color }, i) => (
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
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 3 + i, ease: "easeInOut" }}
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${color}`}
                >
                  <Icon className="h-6 w-6" />
                </motion.div>
                <h3 className="mt-6 text-xl font-bold text-slate-900">{title}</h3>
                <div className="mt-3 flex flex-col gap-2 leading-7 text-slate-600 [&_a]:font-semibold [&_a]:text-cyan-700 [&_a]:hover:text-cyan-600 [&_a]:transition-colors">
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
              Send an enquiry
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              How can we help?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
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
