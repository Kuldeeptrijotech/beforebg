"use client";

import Container from "@/components/ui/Container";
import GradientButton from "@/components/ui/GradientButton";
import { homeCta } from "@/lib/site-data";
import { Reveal } from "@/components/motion/Reveal";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#e8f2fb] py-28 sm:py-32">
      {/* Outer light section accent */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[rgba(41,171,135,0.3)] to-transparent" />

      <Container className="relative">
        <Reveal>
          <div className="tri-border-gradient relative overflow-hidden rounded-[2.5rem] bg-[linear-gradient(145deg,#0e2340,#0b1d33_50%,#050817)] px-6 py-16 text-center shadow-[0_40px_120px_-30px_rgba(3,7,19,0.55)] sm:px-12 sm:py-24">
            {/* decorative layers */}
            <div aria-hidden className="absolute inset-0 tri-hex-grid opacity-50" />
            <div aria-hidden className="absolute -right-16 -top-16 h-80 w-80 rounded-full border-[60px] border-white/[0.03] tri-spin-slow" />
            <div aria-hidden className="absolute -left-12 bottom-1/3 h-64 w-64 rounded-full border-[48px] border-white/[0.03]" style={{ animation: 'spin-slow 32s linear infinite reverse' }} />
            <div aria-hidden className="tri-blob h-72 w-72 animate-float-slow" style={{ left: "-6%", bottom: "-8%", background: "radial-gradient(circle, rgba(41,171,135,0.28), transparent 68%)" }} />
            <div aria-hidden className="tri-blob h-60 w-60 animate-float-reverse" style={{ right: "-4%", top: "10%", background: "radial-gradient(circle, rgba(245,166,35,0.22), transparent 68%)" }} />
            {/* subtle center glow */}
            <div aria-hidden className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(41,171,135,0.1),transparent)]" />

            <div className="relative mx-auto max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.22em] text-[#f5a623]"
              >
                <Sparkles className="h-4 w-4" />
                {homeCta.eyebrow}
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl"
              >
                {homeCta.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.28 }}
                className="mx-auto mt-7 max-w-2xl text-base leading-[1.8] text-slate-300/85 sm:text-lg"
              >
                {homeCta.description}
              </motion.p>

              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                  <GradientButton href={homeCta.primaryAction.href} size="lg" className="w-full sm:w-fit">
                    {homeCta.primaryAction.label} <ArrowRight className="h-5 w-5" />
                  </GradientButton>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                  <GradientButton href={homeCta.secondaryAction.href} variant="ghost" size="lg" className="w-full sm:w-fit">
                    {homeCta.secondaryAction.label}
                  </GradientButton>
                </motion.div>
              </div>

              <ul className="mx-auto mt-12 grid max-w-2xl gap-3 text-left sm:grid-cols-3">
                {homeCta.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2.5 text-sm leading-[1.7] text-slate-300/90">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#29ab87]" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-11 inline-flex items-center gap-3.5 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3.5 backdrop-blur-xl">
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                  className="flex size-9 items-center justify-center rounded-full bg-[linear-gradient(150deg,#29ab87,#117a4b)] text-white shadow-[0_4px_16px_rgba(41,171,135,0.45)]"
                >
                  <Mail className="size-4" />
                </motion.span>
                <span className="text-sm leading-snug text-slate-300/85">
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
