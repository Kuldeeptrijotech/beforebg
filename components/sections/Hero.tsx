"use client";

import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import OptimizedVideo from "@/components/ui/OptimizedVideo";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
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
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { amount: 0.05 });
  const reduce = useReducedMotion();
  const activeSlide = heroSlides[activeIndex];

  useEffect(() => {
    if (reduce || !sectionInView) return;
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, AUTO_PLAY_MS);
    return () => window.clearTimeout(timer);
  }, [activeIndex, reduce, sectionInView]);

  return (
    <section ref={sectionRef} className="hero-fullvh relative isolate overflow-hidden bg-[#050817] text-white">
      {/* Layered rich midnight & white mesh background */}
      <div aria-hidden className="absolute inset-0 -z-40 bg-[linear-gradient(180deg,#071224_0%,#050b18_50%,#030713_100%)]" />
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
          <OptimizedVideo
            src={activeSlide.visual.src}
            alt={activeSlide.visual.alt}
            priority={activeIndex === 0}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-75 mix-blend-luminosity"
          />
          {/* Rich midnight depth gradient overlay */}
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(105deg,rgba(5,8,23,0.92)_0%,rgba(11,29,51,0.72)_50%,rgba(3,7,19,0.25)_100%)]" />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,23,0.4)_0%,transparent_35%,rgba(5,8,23,0.85)_100%)]" />
          <div aria-hidden className="absolute inset-0 opacity-0" />
        </motion.div>
      </AnimatePresence>

      {/* Ambient glow orbs */}
      <div aria-hidden className="tri-blob -z-10 h-96 opacity-0 w-96 animate-float-slow" style={{ left: "-6%", top: "18%", background: "radial-gradient(circle, rgba(255, 255, 255,0.18), transparent 68%)" }} />
      <div aria-hidden className="tri-blob -z-10 h-80 opacity-0 w-80 animate-float-reverse" style={{ right: "-8%", bottom: "8%", background: "radial-gradient(circle, rgba(255, 255, 255,0.12), transparent 70%)" }} />
      <div aria-hidden className="tri-blob -z-10 h-64 opacity-0 w-64 animate-float-slow" style={{ right: "20%", top: "10%", background: "radial-gradient(circle, rgba(255, 255, 255,0.12), transparent 65%)", animationDelay: "-3s" }} />

      <Container className="relative z-10 flex min-h-[calc(100svh-4.5rem)] !max-w-7xl 2xl:!max-w-7xl 3xl:!max-w-7xl !px-5 sm:!px-8 lg:!px-12 max-h-[1100px] flex-col justify-center pt-24 pb-14 sm:pt-28 sm:pb-16 lg:py-20 2xl:py-28">
        <div className="w-full max-w-3xl lg:max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`flex flex-col ${["sap-consulting", "sap-support-ams", "sap-btp-applications", "sap-data-ai"].includes(activeSlide.id) ? "pt-24 sm:pt-28" : ""}`}
            >
              {/* Eyebrow badge */}
              <motion.span
                custom={0}
                variants={childVariants}
                className="home-hero-eyebrow mb-5 inline-flex w-fit text-xs font-bold uppercase tracking-[0.04em] text-cyan-200 sm:text-sm"
              >
                {activeSlide.eyebrow}
              </motion.span>

              {/* Headline */}
              <motion.h1
                custom={1}
                variants={childVariants}
                className="home-hero-heading max-w-4xl text-4xl font-extrabold leading-[1.04] tracking-[-0.025em] text-white sm:text-5xl lg:text-6xl"
              >
                {activeSlide.id === "sap-consulting" ? (
                  <>Plan, implement, and optimize SAP systems <span className="tri-gradient-text">with confidence</span></>
                ) : activeSlide.id === "sap-support-ams" ? (
                  <>Keep your SAP systems stable, secure, and <span className="tri-gradient-text">continuously optimized</span></>
                ) : activeSlide.id === "sap-btp-applications" ? (
                  <>Build scalable SAP extensions, <span className="tri-gradient-text">portals, and workflows</span></>
                ) : activeSlide.id === "sap-data-ai" ? (
                  <>Turn enterprise data into <span className="tri-gradient-text">smarter decisions</span></>
                ) : (
                  activeSlide.title
                )}
              </motion.h1>

              {/* Description */}
              <motion.p
                custom={2}
                variants={childVariants}
                className="home-hero-description mt-6 max-w-3xl text-base font-normal leading-[1.75] text-slate-300 sm:text-lg"
              >
                {activeSlide.description}
              </motion.p>

              {/* CTAs */}
              <motion.div custom={3} variants={childVariants} className="mt-9 flex flex-wrap gap-4">
                <Link
                  href={activeSlide.primaryCta.href}
                  className="home-hero-primary tri-btn tri-focus px-7 py-4 text-sm font-semibold"
                >
                  {activeSlide.primaryCta.label}
                </Link>
                <Link
                  href={activeSlide.secondaryCta.href}
                  className="home-hero-secondary tri-btn tri-focus px-7 py-4 text-sm font-semibold"
                >
                  {activeSlide.secondaryCta.label}
                </Link>
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
                        ? "h-1.5 w-10 bg-[linear-gradient(90deg,#67e8f9,#22d3ee)]"
                        : "h-1 w-4 bg-slate-500/70 group-hover:bg-cyan-200/70"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
