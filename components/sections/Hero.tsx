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
    <section className="hero-fullvh relative isolate overflow-hidden bg-[#030713] text-white">
      {/* layered ambient backgrounds */}
      <div aria-hidden className="absolute inset-0 -z-40 tri-mesh" />
      <div aria-hidden className="absolute inset-0 -z-30 tri-hex-grid opacity-60" />

      {/* Slide background image */}
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
            className="object-cover object-center opacity-50"
          />
          {/* rich cinematic gradient overlay */}
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(105deg,rgba(3,7,19,0.97)_0%,rgba(3,7,19,0.82)_45%,rgba(3,7,19,0.38)_100%)]" />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,19,0.3)_0%,transparent_35%,rgba(3,7,19,0.55)_100%)]" />
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_50%,rgba(41,171,135,0.12),transparent_70%)]" />
        </motion.div>
      </AnimatePresence>

      {/* Ambient glow orbs */}
      <div aria-hidden className="tri-blob -z-10 h-96 w-96 animate-float-slow" style={{ left: "-6%", top: "18%", background: "radial-gradient(circle, rgba(41,171,135,0.22), transparent 68%)" }} />
      <div aria-hidden className="tri-blob -z-10 h-80 w-80 animate-float-reverse" style={{ right: "-8%", bottom: "8%", background: "radial-gradient(circle, rgba(245,166,35,0.18), transparent 70%)" }} />
      <div aria-hidden className="tri-blob -z-10 h-64 w-64 animate-float-slow" style={{ right: "20%", top: "10%", background: "radial-gradient(circle, rgba(17,122,75,0.14), transparent 65%)", animationDelay: "-3s" }} />

      <Container className="relative z-10 grid min-h-[100svh] items-center gap-12 pb-20 pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:pt-32">
        <div className="max-w-2xl">
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
                className="mb-7 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/14 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#7edcc2] backdrop-blur-xl"
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
                className="max-w-[15ch] text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[4.5rem] lg:leading-[1.04]"
              >
                {activeSlide.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                custom={2}
                variants={childVariants}
                className="mt-7 max-w-xl text-[1.05rem] font-medium leading-[1.75] text-slate-300/90 sm:text-xl"
              >
                {activeSlide.description}
              </motion.p>

              {/* CTAs */}
              <motion.div custom={3} variants={childVariants} className="mt-10 flex flex-col gap-4 sm:flex-row">
                <GradientButton href={activeSlide.primaryCta.href} size="lg">
                  {activeSlide.primaryCta.label} <ArrowRight className="h-5 w-5" />
                </GradientButton>
                <GradientButton href={activeSlide.secondaryCta.href} variant="ghost" size="lg">
                  {activeSlide.secondaryCta.label}
                </GradientButton>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Slide indicators */}
          <div className="mt-12 flex items-center gap-3">
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
          className="hidden lg:block"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.3, ease: EASE_OUT_EXPO }}
        >
          <HexScene className="mx-auto aspect-square w-full max-w-[560px]" />
        </motion.div>
      </Container>
    </section>
  );
}
