"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, Wrench } from "lucide-react";
import CardsCarousel from "./CardsCarousel";
import { motion } from "framer-motion";
import ServicesConduitStream from "@/components/ui/hero-animations/ServicesConduitStream";
import { Reveal } from "@/components/motion/Reveal";
import { BlurReveal } from "@/components/motion/Reveal";
import OptimizedVideo from "@/components/ui/OptimizedVideo";

export type LandingCard = {
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  capabilities?: string[];
  cta?: string;
};

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  heroImage: string;
  cardsTitle: React.ReactNode;
  cardsIntro: string;
  cards: LandingCard[];
  showCardIcons?: boolean;
  cardLayout?: "grid" | "rows" | "carousel";
};

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function SectionLanding({
  eyebrow,
  title,
  description,
  heroImage,
  cardsTitle,
  cardsIntro,
  cards,
  showCardIcons = false,
  cardLayout = "grid",
}: Props) {
  return (
    <main className="font-sans overflow-hidden bg-[#030713] text-white">
      {/* ── Hero ─────────────────────────────── */}
      <section
        className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-[#050817] pt-24 sm:pt-28 lg:pt-24 pb-12"
      >
        {/* Mesh + hexgrid background */}
        <div aria-hidden className="absolute inset-0 -z-40 tri-mesh" />
        <div aria-hidden className="absolute inset-0 -z-30 tri-hex-grid opacity-55" />

        {/* Hero image with laser bullet stream */}
        {heroImage && (
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 -z-20 object-cover object-center opacity-95"
          />
        )}

        {/* Slow glowing circuit conduits animation */}
        <ServicesConduitStream />

        {/* Gradient overlays — side-only, NO bottom cloud */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(3,7,19,0.85)_0%,rgba(3,7,19,0.50)_50%,rgba(3,7,19,0.15)_100%)]" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,7,19,0.25)_0%,transparent_30%,transparent_75%,rgba(3,7,19,0.15)_100%)]" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_75%_55%_at_12%_55%,rgba(41,171,135,0.13),transparent_68%)]" />

        <div aria-hidden className="tri-blob -z-10 h-96 w-96 animate-float-slow" style={{ left: "-6%", top: "18%", background: "radial-gradient(circle, rgba(41,171,135,0.20), transparent 68%)" }} />
        <div aria-hidden className="tri-blob -z-10 h-72 w-72 animate-float-slow" style={{ right: "22%", top: "14%", background: "radial-gradient(circle, rgba(17,122,75,0.10), transparent 65%)", animationDelay: "-4s" }} />

        {/* Content */}
        <div className="mx-auto flex min-h-[calc(100svh-9.5rem)] w-full max-w-7xl items-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(41,171,135,0.35)] bg-[rgba(41,171,135,0.1)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#29ab87] shadow-sm shadow-[rgba(41,171,135,0.18)] backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#29ab87] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#29ab87]" />
              </span>
              <Sparkles className="h-3.5 w-3.5 text-[#29ab87]" />
              {eyebrow}
            </span>

            <h1 className="max-w-3xl text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            <p className="mt-6 max-w-2xl text-base font-normal leading-[1.7] text-white/80 sm:text-lg">
              {description}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#explore" className="tri-btn tri-btn-primary tri-focus px-7 py-4 text-sm font-semibold">
                Explore {eyebrow} <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/contact" className="tri-btn tri-btn-ghost tri-focus px-7 py-4 text-sm font-semibold">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Clean bottom separator */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.08]" />
      </section>

      {/* ── Cards Section ─────────────────────── */}
      <section
        id="explore"
        className="relative z-20 bg-[#071322] py-14 sm:py-16 lg:py-20 border-t border-white/10 text-white"
      >
        <div className="relative z-30 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="relative z-30 max-w-3xl">
            <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.24em] text-[#29ab87]">
              <span className="h-0.5 w-6 rounded-full bg-gradient-to-r from-[#f5a623] to-[#29ab87]" />
              Explore
            </span>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {cardsTitle}
            </h2>
            <p className="mt-3.5 max-w-2xl text-sm sm:text-base font-normal leading-relaxed text-slate-100">
              {cardsIntro}
            </p>
          </div>

          {cardLayout === "carousel" ? (
            <CardsCarousel cards={cards} showCardIcons={showCardIcons} />
          ) : (
            <div
              className={
                cardLayout === "rows"
                  ? "mt-8 sm:mt-10 grid gap-6"
                  : "mt-7 sm:mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3 items-stretch"
              }
            >
              {cards.map((card) => (
                <article
                  key={card.href}
                  className={`group tri-glass-card min-w-0 overflow-hidden rounded-2xl h-full border border-white/10 bg-white/[0.03] ${
                    cardLayout === "rows"
                      ? "grid md:grid-cols-[1.15fr_.85fr] md:items-center"
                      : "flex flex-col"
                  }`}
                >
                  <Link
                    href={card.href}
                    className={`no-underline relative block w-full shrink-0 overflow-hidden bg-slate-900 ${
                      cardLayout === "rows"
                        ? "order-2 min-h-[230px] md:min-h-[300px] h-full"
                        : "aspect-[16/10]"
                    }`}
                  >
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
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover"
                      />
                    )}
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(14,26,44,0.95)] via-transparent to-transparent" />
                    {showCardIcons && (
                      <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(150deg,#29ab87,#117a4b)] text-white shadow-lg shadow-[rgba(41,171,135,0.4)]">
                        <Wrench className="h-4.5 w-4.5" aria-hidden="true" />
                      </span>
                    )}
                  </Link>

                  <div
                    className={`flex flex-1 flex-col p-5 sm:p-6 ${
                      cardLayout === "rows" ? "order-1 justify-center md:p-8 lg:p-9" : ""
                    }`}
                  >
                    <h3 className="text-base sm:text-lg font-bold leading-snug text-white transition-colors group-hover:text-[#7edcc2]">
                      {card.title}
                    </h3>
                    <p className="mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-slate-300">{card.description}</p>
                    {card.capabilities?.length ? (
                      <ul className="mt-4 space-y-2 border-t border-white/[0.08] pt-3.5">
                        {card.capabilities.slice(0, 4).map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs sm:text-sm font-medium text-slate-200">
                            <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#29ab87,#117a4b)]">
                              <Check className="h-2 w-2 text-white" strokeWidth={3} />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <div className="mt-auto pt-4">
                      <Link
                        href={card.href}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#7edcc2] transition-all duration-200 group-hover:gap-2.5 group-hover:text-[#f5a623]"
                      >
                        {card.cta ?? "Explore"} <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#0b1d33] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 border-t border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-mesh opacity-60" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-grid-bg opacity-25" />
        <div
          className="tri-border-gradient relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[linear-gradient(145deg,#1e2a3f,#162236_50%,#111827)] px-6 py-8 text-center shadow-[0_40px_120px_-30px_rgba(0,0,0,0.5)] sm:px-12 sm:py-10"
        >
          <div aria-hidden className="absolute inset-0 tri-hex-grid opacity-45" />
          <div aria-hidden className="absolute -right-16 -top-16 h-80 w-80 rounded-full border-[60px] border-white/[0.03] tri-spin-slow" />
          <div aria-hidden className="tri-blob h-72 w-72 animate-float-slow" style={{ left: "-6%", bottom: "-8%", background: "radial-gradient(circle, rgba(41,171,135,0.28), transparent 68%)" }} />
          <div aria-hidden className="tri-blob h-60 w-60 animate-float-reverse" style={{ right: "-4%", top: "10%", background: "radial-gradient(circle, rgba(245,166,35,0.22), transparent 68%)" }} />
          <div aria-hidden className="absolute inset-x-0 top-1/2 h-64 -translate-y-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(41,171,135,0.08),transparent)]" />

          <div className="relative mx-auto max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-[#f5a623]">
              <Sparkles className="h-4 w-4" /> Trijotech
            </p>
            <h2 className="mt-4 text-2xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-3xl lg:text-4xl">
              Let&apos;s turn your next priority into{" "}
              <span className="tri-gradient-text">measurable progress.</span>
            </h2>
            <div className="inline-block mt-6">
              <Link href="/contact" className="tri-btn tri-btn-primary px-6 py-3 text-sm font-semibold">
                Talk to our team <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
