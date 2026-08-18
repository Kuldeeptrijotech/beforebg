"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import GradientButton from "@/components/ui/GradientButton";
import HexScene from "@/components/three/HexScene";
import { heroSlides } from "@/lib/hero-data";

const AUTO_PLAY_MS = 6500;

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
  exit: {
    opacity: 0,
    y: -16,
    filter: "blur(4px)",
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: EASE_OUT_EXPO },
  }),
};

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduce = useReducedMotion();
  const activeSlide = heroSlides[activeIndex];

  useEffect(() => {
    if (reduce) return;
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, AUTO_PLAY_MS);
    return () => window.clearTimeout(timer);
  }, [activeIndex, reduce]);

  return (
    <section className="hero-fullvh relative isolate overflow-hidden bg-[#091527] text-white">
      {/* Layered rich midnight & emerald mesh background */}
      <div aria-hidden className="absolute inset-0 -z-40 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(17,122,75,0.28),transparent_70%),radial-gradient(ellipse_90%_60%_at_85%_75%,rgba(245,166,35,0.18),transparent_65%),linear-gradient(180deg,#0a192f_0%,#0c1e38_50%,#081324_100%)]" />
      <div aria-hidden className="absolute inset-0 -z-30 tri-hex-grid opacity-50" />

      {/* Slide background image with atmospheric depth overlays */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 -z-20"
        >
          <Image
            src={activeSlide.visual.src}
            alt={activeSlide.visual.alt}
            fill
            priority={activeIndex === 0}
            sizes="100vw"
            className="object-cover object-center opacity-75 mix-blend-luminosity"
          />
          {/* Rich midnight depth gradient overlay */}
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(105deg,rgba(9,21,39,0.92)_0%,rgba(12,30,56,0.68)_50%,rgba(16,40,74,0.35)_100%)]" />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,21,39,0.35)_0%,transparent_35%,rgba(9,21,39,0.7)_100%)]" />
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_50%,rgba(41,171,135,0.22),transparent_70%)]" />
        </motion.div>
      </AnimatePresence>

      {/* Ambient glow orbs */}
      <div aria-hidden className="tri-blob -z-10 h-96 w-96 animate-float-slow" style={{ left: "-6%", top: "18%", background: "radial-gradient(circle, rgba(41,171,135,0.22), transparent 68%)" }} />
      <div aria-hidden className="tri-blob -z-10 h-80 w-80 animate-float-reverse" style={{ right: "-8%", bottom: "8%", background: "radial-gradient(circle, rgba(245,166,35,0.18), transparent 70%)" }} />
      <div aria-hidden className="tri-blob -z-10 h-64 w-64 animate-float-slow" style={{ right: "20%", top: "10%", background: "radial-gradient(circle, rgba(17,122,75,0.14), transparent 65%)", animationDelay: "-3s" }} />

      <Container className="relative z-10 grid min-h-[100svh] items-center gap-10 py-14 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:py-20">
        <div className="mx-auto w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col"
            >
              {/* Eyebrow badge */}
              <motion.span
                custom={0}
                variants={childVariants}
                className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/14 bg-white/[0.06] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7edcc2] backdrop-blur-xl"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tri-2 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-tri-2" />
                </span>
                {activeSlide.eyebrow}
              </motion.span>

              {/* Headline */}
              <motion.h1
                custom={1}
                variants={childVariants}
                className="max-w-[18ch] text-2xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[3.4rem] lg:leading-[1.06]"
              >
                {activeSlide.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                custom={2}
                variants={childVariants}
                className="mt-5 max-w-xl text-sm font-medium leading-[1.7] text-slate-300/90 sm:text-base"
              >
                {activeSlide.description}
              </motion.p>

              {/* CTAs */}
              <motion.div custom={3} variants={childVariants} className="mt-7 flex flex-col gap-3 sm:flex-row">
                <GradientButton href={activeSlide.primaryCta.href} size="md">
                  {activeSlide.primaryCta.label} <ArrowRight className="h-4 w-4" />
                </GradientButton>
                <GradientButton href={activeSlide.secondaryCta.href} variant="ghost" size="md">
                  {activeSlide.secondaryCta.label}
                </GradientButton>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Slide indicators */}
          <div className="mt-8 flex items-center gap-3">
            {heroSlides.map((slide, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Show ${slide.eyebrow}`}
                  onClick={() => setActiveIndex(index)}
                  className="group flex h-5 items-center"
                >
                  <span
                    className={`block rounded-full transition-all duration-500 ${
                      isActive
                        ? "h-1.5 w-10 bg-[linear-gradient(90deg,#29ab87,#f5a623)] shadow-[0_0_8px_rgba(41,171,135,0.6)]"
                        : "h-1 w-4 bg-white/20 group-hover:bg-white/45"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D hexagon scene */}
        <motion.div
          className="mx-auto w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[520px]"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.3, ease: EASE_OUT_EXPO }}
        >
          <HexScene className="aspect-square w-full" />
        </motion.div>
      </Container>
    </section>
  );
}
