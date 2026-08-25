import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  Check,
  CircleCheckBig,
  DatabaseZap,
  Layers3,
  ShieldCheck,
  Target,
  Workflow,
} from "lucide-react";
import { getIndustry, industries } from "@/lib/industries-data";

type Props = { params: Promise<{ slug?: string[] }> };

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: [industry.slug] }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug?.[0];
  const industry = slug ? getIndustry(slug) : undefined;
  if (!industry) return {};
  return {
    title: `${industry.title} Solutions | Trijotech`,
    description: industry.shortDescription,
  };
}

const capabilityIcons = [Layers3, DatabaseZap, BarChart3];

/* Trijotech neutral composition */
const cardTones = [
  { color: "#ffffff", soft: "rgba(255, 255, 255,0.16)" },
  { color: "#ffffff", soft: "rgba(255, 255, 255,0.16)" },
  { color: "#ffffff", soft: "rgba(255, 255, 255,0.16)" },
];

export default async function IndustryDetailPage({ params }: Props) {
  const rawSlug = (await params).slug?.[0];
  const industry = rawSlug ? getIndustry(rawSlug) : undefined;
  if (!industry) notFound();

  return (
    <main className="industry-detail-page overflow-hidden bg-[#030713] text-white">
      {/* ── Hero Section (Full Height & Full Width Background Image) ── */}
      <section className="industry-hero-section relative isolate flex min-h-[75vh] w-full flex-col justify-center overflow-hidden bg-[#050817] pb-16 pt-32 sm:pt-36 lg:min-h-[640px] lg:py-24">
        {/* Full width & full height image backdrop */}
        <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
          <Image
            src={industry.heroImage}
            alt={industry.title}
            fill
            priority
            sizes="100vw"
            className="h-full w-full object-cover object-center"
          />
          {/* Multi-layer gradient overlays for text readability */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,19,0.92)_0%,rgba(3,7,19,0.78)_55%,rgba(3,7,19,0.48)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(3,7,19,0.4),rgba(3,7,19,0.92))]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030713] to-transparent" />
        </div>

        {/* Ambient static grids */}
        <div aria-hidden className="absolute inset-0 -z-10 tri-grid-bg opacity-25" />
        <div className="pointer-events-none absolute inset-0 -z-10 tri-hex-grid opacity-20" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex max-w-4xl flex-col items-start text-left">
            {/* Eyebrow badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#050817]/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
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
            <p className="mt-4 max-w-2xl text-base font-normal leading-[1.7] text-white/90 sm:text-lg">
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
                className="tri-btn tri-btn-ghost tri-focus px-7 py-4 text-sm font-semibold text-white backdrop-blur-md bg-white/10 hover:bg-white/20 border-white/20"
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
                    className="flex items-center gap-2 rounded-2xl border border-white/20 bg-[#050817]/70 px-3.5 py-2 backdrop-blur-md"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-white">{serviceName}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Clean bottom boundary */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/15" />
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

      {/* ── Capabilities (What We Deliver) ─────────────────────── */}
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

      {/* ── Business Value & Measurable Outcomes ───────────────────── */}
      <section className="industry-outcomes-section relative bg-[#050817] py-20 sm:py-24 border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 tri-hex-grid opacity-25" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-12">
          {/* Left Column: Title & Feature Image Card */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="tri-overline">Value created</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Measurable outcomes for {industry.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                A strong foundation helps your teams react faster, work with greater precision, and plan with confidence.
              </p>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="tri-btn tri-btn-primary tri-focus px-7 py-3.5 text-sm font-bold text-[#030713]"
                >
                  Start a conversation <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="industry-outcomes-image relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] bg-slate-950 border border-white/10 shadow-2xl">
              <Image
                src={industry.heroImage}
                alt={`${industry.title} business outcomes`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
              <div aria-hidden className="absolute inset-0 opacity-30 tri-hex-grid" />
              <div className="absolute bottom-0 p-6 sm:p-8">
                <p className="industry-outcomes-kicker text-xs font-bold uppercase tracking-[0.2em] text-white/80">Built for lasting value</p>
                <p className="mt-2 text-xl font-bold text-white leading-snug sm:text-2xl">
                  Better data. Clearer decisions. Stronger operations.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Benefits Cards with Rich Background */}
          <div className="grid gap-4 sm:grid-cols-2">
            {industry.benefits.map((benefit, index) => {
              const tone = cardTones[index % cardTones.length];
              return (
                <div
                  key={benefit}
                  className="industry-detail-card flex min-w-0 items-start gap-4 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.10]"
                  style={{ "--benefit-tone": tone.color, "--benefit-soft": tone.soft } as CSSProperties}
                >
                  <span
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-white shadow-sm"
                  >
                    <Check className="h-4 w-4 stroke-[3]" />
                  </span>
                  <div>
                    <p className="text-base font-bold text-white leading-snug">{benefit}</p>
                    <p className="mt-1 text-xs text-white/70">Delivering reliable, repeatable operational gains.</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────── */}
      <section className="bg-[#030713] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#0c1828] via-[#08111e] to-[#050b14] px-6 py-12 text-center shadow-2xl sm:px-12 sm:py-16"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/[0.05] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/[0.05] blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">Let&apos;s work together</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready to transform your {industry.title} operations?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
              Connect with Trijotech to explore SAP solutions designed around your organization, priorities, and growth plans.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-[#030713] shadow-xl transition-all duration-300 hover:bg-slate-200 hover:scale-105"
            >
              Start a conversation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
