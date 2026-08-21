"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import OptimizedVideo from "@/components/ui/OptimizedVideo";
import type { LandingCard } from "./SectionLanding";

const AUTO_PLAY_MS = 6000;

export default function CardsCarousel({ cards, showCardIcons }: { cards: LandingCard[]; showCardIcons: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselInView = useInView(carouselRef, { amount: 0.05 });
  const reduce = useReducedMotion();

  const move = useCallback((step: number) => {
    setActiveIndex((current) => (current + step + cards.length) % cards.length);
  }, [cards.length]);

  useEffect(() => {
    if (isPaused || reduce || !carouselInView || cards.length < 2) return;
    const timer = window.setTimeout(() => move(1), AUTO_PLAY_MS);
    return () => window.clearTimeout(timer);
  }, [activeIndex, cards.length, isPaused, reduce, move, carouselInView]);

  if (!cards.length) return null;

  return (
    <div
      ref={carouselRef}
      className="mt-10"
      aria-roledescription="carousel"
      aria-label="Services"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
    >
      {/* Main carousel card */}
      <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#0e2238]/95 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.7)]" style={{ minHeight: "360px" }}>
        {/* Inner top highlight */}
        <div className="absolute inset-x-0 top-0 z-30 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Nav arrows */}
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous service"
          className="absolute left-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[rgba(3,7,19,0.85)] text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[rgba(41,171,135,0.6)] hover:bg-[linear-gradient(150deg,#29ab87,#117a4b)] hover:shadow-[0_8px_24px_rgba(41,171,135,0.4)] sm:left-5"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next service"
          className="absolute right-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[rgba(3,7,19,0.85)] text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[rgba(41,171,135,0.6)] hover:bg-[linear-gradient(150deg,#29ab87,#117a4b)] hover:shadow-[0_8px_24px_rgba(41,171,135,0.4)] sm:right-5"
        >
          <ArrowRight className="h-5 w-5" />
        </button>

        {/* Carousel Track: Slides side-by-side without any overlap */}
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {cards.map((card, index) => (
            <article
              key={card.href}
              className="group grid w-full shrink-0 grid-rows-[220px_minmax(0,1fr)] md:grid-cols-[1.05fr_.95fr] md:grid-rows-1"
              style={{ minHeight: "360px" }}
            >
              {/* Image panel */}
              <Link href={card.href} className="relative block h-full w-full overflow-hidden rounded-tl-[2rem] rounded-tr-[2rem] md:rounded-bl-[2rem] md:rounded-tr-none">
                {/\.(mp4|webm)(?:$|[?#])/i.test(card.image) ? (
                  <OptimizedVideo
                    src={card.image}
                    alt={card.imageAlt}
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(3,7,19,0.5)] via-transparent to-transparent" />
                {showCardIcons && (
                  <span className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(150deg,#29ab87,#117a4b)] text-white shadow-lg shadow-[rgba(41,171,135,0.4)]">
                    <Wrench className="h-5 w-5" aria-hidden="true" />
                  </span>
                )}
              </Link>

              {/* Content panel */}
              <div className="flex min-h-0 flex-col justify-center overflow-y-auto p-7 sm:p-9 lg:p-10">
                <p className="tri-overline">
                  Service {index + 1} of {cards.length}
                </p>
                <h3 className="mt-4 text-2xl font-bold leading-snug text-white sm:text-3xl">{card.title}</h3>
                <p className="mt-4 text-sm leading-[1.8] text-slate-200">{card.description}</p>
                {card.capabilities?.length ? (
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {card.capabilities.slice(0, 4).map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm font-medium text-slate-100">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#29ab87,#117a4b)]">
                          <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <Link
                  href={card.href}
                  className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#7edcc2] transition-all duration-200 hover:gap-3 hover:text-[#f5a623]"
                >
                  {card.cta ?? "Explore"} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="mt-6 flex justify-center">
        <div className="flex items-center gap-2" aria-label="Choose a service slide">
          {cards.map((item, index) => (
            <button
              key={item.href}
              type="button"
              aria-label={`Show service ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
              className={`rounded-full transition-all duration-500 ${
                index === activeIndex
                  ? "h-1.5 w-10 bg-[linear-gradient(90deg,#29ab87,#f5a623)] shadow-[0_0_8px_rgba(41,171,135,0.6)]"
                  : "h-1 w-4 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
