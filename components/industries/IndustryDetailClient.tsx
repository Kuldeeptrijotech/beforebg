"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Check, CircleCheckBig, DatabaseZap, Layers3, Sparkles } from "lucide-react";
import type { Industry } from "@/lib/industries-data";
import Container from "@/components/ui/Container";

const capabilityIcons = [Layers3, DatabaseZap, BarChart3];

/* Trijotech neutral composition */
const cardTones = [
  { color: "#ffffff", soft: "rgba(255, 255, 255,0.16)" },
  { color: "#ffffff", soft: "rgba(255, 255, 255,0.16)" },
  { color: "#ffffff", soft: "rgba(255, 255, 255,0.16)" },
];

export default function IndustryDetailClient({ industry }: { industry: Industry }) {
  return (
    <main className="industry-detail-page overflow-hidden bg-[#030713] text-white">
      {/* ── Hero Section ───────────────────────────── */}
      <section className="industry-hero-section relative isolate flex min-h-[75vh] w-full flex-col justify-center overflow-hidden bg-[#050817] pb-16 pt-32 sm:pt-36 lg:min-h-[640px] lg:py-24">
        {/* Ambient static backdrop */}
        <div aria-hidden className="absolute inset-0 -z-10 tri-mesh" />
        <div aria-hidden className="absolute inset-0 -z-10 tri-grid-bg opacity-40" />
        <div className="pointer-events-none absolute inset-0 -z-10 tri-hex-grid opacity-30" />
        <div aria-hidden className="pointer-events-none absolute right-[8%] top-[14%] -z-10 h-72 w-72 rounded-full bg-white/[0.07] blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute bottom-[16%] left-[6%] -z-10 h-64 w-64 rounded-full bg-white/[0.05] blur-3xl" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
            {/* Left: Content */}
            <div className="flex flex-col items-start text-left">
              {/* Eyebrow badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                Industry Solutions · SAP Ecosystem
              </div>

              {/* Title */}
              <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
                {industry.title}
              </h1>

              {/* Subtitle */}
              <p className="mt-5 text-lg font-semibold leading-relaxed text-white sm:text-xl">
                {industry.subtitle}
              </p>

              {/* Description */}
              <p className="mt-4 max-w-xl text-base font-normal leading-[1.7] text-white/80 sm:text-lg">
                {industry.shortDescription || industry.description}
              </p>

              {/* Action buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="tri-btn tri-btn-primary tri-focus px-7 py-4 text-sm font-bold text-[#030713]"
                >
                  Schedule consultation <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/industry"
                  className="tri-btn tri-btn-ghost tri-focus px-7 py-4 text-sm font-semibold text-white"
                >
                  Explore all industries
                </Link>
              </div>

              {/* Capability summary chips */}
              {industry.services && industry.services.length > 0 && (
                <div className="mt-10 flex flex-wrap items-center gap-2.5 sm:gap-3">
                  {industry.services.slice(0, 4).map((serviceName) => (
                    <div
                      key={serviceName}
                      className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 py-2 backdrop-blur-md"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/80">{serviceName}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Industry Hero Image (from Navbar) */}
            <div className="relative min-h-[320px] sm:min-h-[400px] lg:min-h-[460px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-md">
              <Image
                src={industry.heroImage}
                alt={industry.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center opacity-95 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050817]/80 via-[#050817]/20 to-transparent" />
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/15" />
            </div>
          </div>
        </div>

        {/* Clean bottom boundary */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/10" />
      </section>

      {/* ── Definition / Overview ────────────── */}
      <section className="industry-definition-section relative overflow-hidden bg-[#0b1d33] py-16 sm:py-20 border-b border-white/5">
        <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[rgba(255,255,255,0.08)] blur-3xl animate-float" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 translate-x-1/3 rounded-full bg-[rgba(255,255,255,0.07)] blur-3xl animate-float-reverse" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="industry-definition-card mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 shadow-2xl backdrop-blur-md sm:p-10">
            <p className="tri-overline">Definition</p>
            <div className="detail-split-grid mt-4 grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="text-2xl font-bold leading-[1.2] text-white sm:text-3xl">
                  {industry.subtitle}
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-sm font-medium leading-7 text-slate-300">
                  {industry.description}
                </p>
              </div>
            </div>
            <div className="mt-7 flex items-center gap-3 border-t border-white/10 pt-6 text-sm font-semibold text-white">
              <CircleCheckBig className="h-5 w-5 text-white" /> SAP expertise shaped around your operation
            </div>
          </div>
        </div>
      </section>

      {/* ── Capabilities ─────────────────────── */}
      <section className="bg-[#030713] py-20 sm:py-24 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="tri-overline">What we deliver</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Capabilities built for your industry
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              Practical technology capabilities that connect teams, data, and decisions across your organization.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industry.services.map((service, index) => {
              const Icon = capabilityIcons[index % capabilityIcons.length];
              const tone = cardTones[index % cardTones.length];
              return (
                <article
                  key={service}
                  className="industry-detail-card group relative min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-white/20"
                  style={{ "--card-tone": tone.color, "--card-soft": tone.soft } as CSSProperties}
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-0.5 opacity-70 transition-opacity duration-300 group-hover:opacity-100 bg-white/40"
                  />
                  <span
                    aria-hidden
                    className="absolute right-5 top-4 text-5xl font-bold transition-colors duration-300"
                    style={{ color: "rgba(255,255,255,0.06)" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div
                    className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white transition-colors duration-300 group-hover:bg-white group-hover:text-[#030713]"
                  >
                    <Icon className="industry-card-icon h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="relative mt-7 text-xl font-bold text-white">{service}</h3>
                  <p className="relative mt-3 leading-7 text-slate-400">
                    Designed to improve visibility, simplify work, and support informed decisions.
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Business Value ───────────────────── */}
      <section className="bg-[#050817] py-20 sm:py-24 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <p className="tri-overline">Value created</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Measurable outcomes for {industry.title}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-400">
                A strong foundation helps your teams react faster, work with greater precision, and plan with confidence.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="tri-btn tri-btn-primary tri-focus px-7 py-3.5 text-sm font-bold text-[#030713]"
                >
                  Start a conversation <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {industry.benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#030713]">
                    <Check className="h-4 w-4 stroke-[3]" />
                  </div>
                  <span className="text-base font-semibold text-white">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
