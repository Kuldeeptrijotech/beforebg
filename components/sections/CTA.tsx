"use client";

import Container from "@/components/ui/Container";
import GradientButton from "@/components/ui/GradientButton";
import { homeCta } from "@/lib/site-data";
import { Reveal } from "@/components/motion/Reveal";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0b1d33] py-12 sm:py-14 border-t border-white/5">
      {/* Outer dark section accent with Hexagon grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-hex-grid opacity-45" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-mesh opacity-50" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[rgba(255, 255, 255,0.4)] to-transparent" />

      <Container className="relative">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(145deg,#1e2a3f,#162236_50%,#111827)] px-5 py-7 text-center shadow-[0_40px_120px_-30px_rgba(0,0,0,0.5)] sm:px-10 sm:py-9 border border-white/10">
            {/* decorative layers (Hexagons preserved) */}
            <div aria-hidden className="absolute inset-0 tri-hex-grid opacity-50" />
            <div aria-hidden className="absolute -right-16 -top-16 h-80 w-80 rounded-full border-[60px] border-white/[0.03] tri-spin-slow" />
            <div aria-hidden className="absolute -left-12 bottom-1/3 h-64 w-64 rounded-full border-[48px] border-white/[0.03]" style={{ animation: 'spin-slow 32s linear infinite reverse' }} />
            <div aria-hidden className="tri-blob h-72 w-72 animate-float-slow" style={{ left: "-6%", bottom: "-8%", background: "radial-gradient(circle, rgba(255, 255, 255,0.32), transparent 68%)" }} />
            <div aria-hidden className="tri-blob h-60 w-60 animate-float-reverse" style={{ right: "-4%", top: "10%", background: "radial-gradient(circle, rgba(255, 255, 255,0.25), transparent 68%)" }} />
            {/* subtle center glow */}
            <div aria-hidden className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(255, 255, 255,0.1),transparent)]" />

            <div className="relative mx-auto max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-white"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {homeCta.eyebrow}
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl"
              >
                {homeCta.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.28 }}
                className="mx-auto mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-300/85"
              >
                {homeCta.description}
              </motion.p>

              <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <GradientButton href={homeCta.primaryAction.href} size="md" className="w-full sm:w-fit">
                    {homeCta.primaryAction.label} <ArrowRight className="h-4 w-4" />
                  </GradientButton>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <GradientButton href={homeCta.secondaryAction.href} variant="ghost" size="md" className="w-full sm:w-fit">
                    {homeCta.secondaryAction.label}
                  </GradientButton>
                </motion.div>
              </div>

              <ul className="mx-auto mt-5 grid max-w-2xl gap-2 text-left sm:grid-cols-3">
                {homeCta.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2 text-xs sm:text-sm leading-snug text-slate-300/90">
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-white" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 backdrop-blur-xl">
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                  className="flex size-7 items-center justify-center rounded-full bg-[linear-gradient(150deg,#22d3ee,#2563eb)] text-white shadow-[0_4px_16px_rgba(255, 255, 255,0.45)]"
                >
                  <Mail className="size-3.5" />
                </motion.span>
                <span className="text-xs leading-snug text-slate-300/85">
                  Share your requirement — our team will map the right solution path.
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
