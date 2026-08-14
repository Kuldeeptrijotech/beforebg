"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Container from "@/components/ui/Container";
import { heroSlides } from "@/lib/hero-data";

const AUTO_PLAY_MS = 6500;

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = heroSlides[activeIndex];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length)
    }, AUTO_PLAY_MS)

    return () => window.clearTimeout(timer)
  }, [activeIndex]);

  return (
    <section className="relative min-h-[calc(100vh-4.5rem)] overflow-hidden bg-[#030713] text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {activeSlide.visual.type === "gif" || activeSlide.visual.type === "image" ? (
            <Image
              src={activeSlide.visual.src}
              alt={activeSlide.visual.alt}
              fill
              priority={activeIndex === 0} // Prioritize loading the first slide's visual
              sizes="100vw"
              className="scale-200 object-cover object-center sm:scale-175 md:scale-150 lg:scale-100"
            />
          ) : null}

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,19,0.92),rgba(3,7,19,0.68),rgba(3,7,19,0.3))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_34%)]" />
        </motion.div>
      </AnimatePresence>

      <Container className="relative z-10 flex min-h-[calc(100vh-4.5rem)] items-center py-20 lg:py-28">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-cyan-200">
                {activeSlide.eyebrow}
              </p>
              <h1 className="text-4xl font-bold leading-light tracking-light md:text-6xl">
                {activeSlide.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
                {activeSlide.description}
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={activeSlide.primaryCta.href}
                  className="home-hero-primary rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-[#050817] transition hover:bg-cyan-100"
                >
                  {activeSlide.primaryCta.label}
                </Link>

                <Link
                  href={activeSlide.secondaryCta.href}
                  className="home-hero-secondary rounded-full border border-white/20 bg-white/6 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {activeSlide.secondaryCta.label}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex items-center gap-3">
            {heroSlides.map((slide, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Show  ${slide.eyebrow}`}
                  onClick={() => setActiveIndex(index)}
                  className="group flex h-3 items-center"
                >
                  <span className={`block h-1.5 rounded-full transition-all ${isActive ?
                    "w-10 bg-cyan-200" : "w-4 bg-white/30 group-hover:bg-white/60"
                    }`} />
                </button>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
