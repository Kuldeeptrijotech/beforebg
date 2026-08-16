import type { Metadata } from "next";
import type { CSSProperties } from "react";
import fs from "fs";
import path from "path";
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
} from "lucide-react";
import { getIndustry, industries } from "@/lib/industries-data";
import IndustryVideoScene from "@/components/scenes/IndustryVideoScene";
import IndustryVideoHero, { type IndustryVideoHeroKpi } from "@/components/scenes/IndustryVideoHero";

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

/* Trijotech tri-color composition — deep green / mint / amber */
const cardTones = [
  { color: "#117a4b", soft: "rgba(17,122,75,0.16)" },
  { color: "#29ab87", soft: "rgba(41,171,135,0.16)" },
  { color: "#f5a623", soft: "rgba(245,166,35,0.16)" },
];

const TRI = { deep: "#117a4b", mint: "#29ab87", amber: "#f5a623" } as const;

/* Industry hero videos — same integration as Retail & Supply Chain, unique clip per industry.
   Files are dropped into /public/videos/ with these exact names; the hero activates
   automatically once a file exists and gracefully keeps the animated scene otherwise. */
interface VideoHeroConfig {
  videoSrc: string;
  poster: string;
  objectPosition: string;
  caption: string;
  sub: string;
  kpis: IndustryVideoHeroKpi[];
}

const videoHeroes: Record<string, VideoHeroConfig> = {
  "pharmaceuticals-life-sciences": {
    videoSrc: "/videos/pharmaceuticals-sap.mp4",
    poster: "/videos/pharmaceuticals-sap-poster.jpg",
    objectPosition: "50% 50%",
    caption: "SAP unifies pharma operations end to end",
    sub: "R&D · production · distribution on one system",
    kpis: [
      { value: "100%", label: "FDA compliance", color: TRI.deep },
      { value: "99.99%", label: "Unit traceability", color: TRI.mint },
      { value: "98.9%", label: "Batch yield", color: TRI.amber },
    ],
  },
  manufacturing: {
    videoSrc: "/videos/manufacturing-sap.mp4",
    poster: "/videos/manufacturing-sap-poster.jpg",
    objectPosition: "50% 42%",
    caption: "SAP connects finance to the shop floor",
    sub: "planning · production · quality on one system",
    kpis: [
      { value: "93.4%", label: "Overall OEE", color: TRI.deep },
      { value: "99.98%", label: "Process uptime", color: TRI.mint },
      { value: "-6.8%", label: "Scrap rate", color: TRI.amber },
    ],
  },
  fintech: {
    videoSrc: "/videos/fintech-sap.mp4",
    poster: "/videos/fintech-sap-poster.jpg",
    objectPosition: "50% 42%",
    caption: "SAP automates the fintech financial core",
    sub: "payments · ledgers · risk on one secure platform",
    kpis: [
      { value: "0.18s", label: "Reconciliation", color: TRI.deep },
      { value: "4.8M", label: "Transactions / day", color: TRI.mint },
      { value: "0.01%", label: "Fraud rate", color: TRI.amber },
    ],
  },
  entertainment: {
    videoSrc: "/videos/entertainment-sap.mp4",
    poster: "/videos/entertainment-sap-poster.jpg",
    objectPosition: "50% 42%",
    caption: "SAP centralises media & entertainment finance",
    sub: "content · rights · distribution on one system",
    kpis: [
      { value: "100%", label: "Royalty accuracy", color: TRI.deep },
      { value: "1.4M", label: "Stream concurrency", color: TRI.mint },
      { value: "99.2%", label: "CDN hit rate", color: TRI.amber },
    ],
  },
  "steel-manufacturing": {
    videoSrc: "/videos/steel-manufacturing-sap.mp4",
    poster: "/videos/steel-manufacturing-sap-poster.jpg",
    objectPosition: "50% 50%",
    caption: "SAP links steel production to profitability",
    sub: "melting · casting · logistics on one system",
    kpis: [
      { value: "94.6%", label: "Melting efficiency", color: TRI.deep },
      { value: "99.98%", label: "Steel purity", color: TRI.mint },
      { value: "0 LTI", label: "Safety record", color: TRI.amber },
    ],
  },
  telecommunications: {
    videoSrc: "/videos/telecommunications-sap.mp4",
    poster: "/videos/telecommunications-sap-poster.jpg",
    objectPosition: "68% 42%",
    caption: "SAP unifies telecom operations end to end",
    sub: "network · billing · subscribers on one platform",
    kpis: [
      { value: "4.2ms", label: "Data latency", color: TRI.deep },
      { value: "120k/s", label: "CDR ingestion", color: TRI.mint },
      { value: "1.4Gbps", label: "Throughput", color: TRI.amber },
    ],
  },
};

export default async function IndustryDetailPage({ params }: Props) {
  const slug = (await params).slug?.[0];
  const industry = slug ? getIndustry(slug) : undefined;
  if (!industry) notFound();

  const videoHeroConfig = slug ? videoHeroes[slug] : undefined;
  const videoHero =
    videoHeroConfig &&
    fs.existsSync(path.join(process.cwd(), "public", "videos", path.basename(videoHeroConfig.videoSrc)))
      ? videoHeroConfig
      : null;

  return (
    <main className="overflow-hidden bg-[#030713] text-white">
      {/* ── Hero — full-bleed video animation ───────── */}
      <section className="relative isolate flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden bg-[#050817]">
        {/* tri-color ambient backdrop */}
        <div aria-hidden className="absolute inset-0 -z-10 tri-mesh" />
        <div aria-hidden className="absolute inset-0 -z-10 tri-grid-bg" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-hex-grid opacity-40" />
        <div aria-hidden className="pointer-events-none absolute right-[8%] top-[14%] -z-10 h-64 w-64 rounded-full bg-[rgba(17,122,75,0.18)] blur-3xl tri-pulse" />
        <div aria-hidden className="pointer-events-none absolute bottom-[16%] left-[6%] -z-10 h-48 w-48 rounded-full bg-[rgba(245,166,35,0.16)] blur-3xl tri-pulse" style={{ animationDelay: "1.5s" }} />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 bg-[radial-gradient(45%_100%_at_50%_0%,rgba(41,171,135,0.1),transparent_70%)]" />

        {/* Retail hero — plays the actual retail supply-chain film at full opacity */}
        {slug === "retail-supply-chain" ? (
          <>
            <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/videos/retail-hero-poster.jpg"
                className="h-full w-full object-cover opacity-100 scale-[1.7] sm:scale-100"
                style={{ objectPosition: "50% 42%" }}
              >
                <source src="/videos/retail-hero.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(3,7,19,0.72)_0%,rgba(3,7,19,0.16)_50%,rgba(3,7,19,0.04)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 z-20 h-[45%] bg-gradient-to-t from-[#030713]/85 via-[#030713]/30 to-transparent" />
            </div>

            {/* tri-color caption overlay — pinned to the very bottom so it never covers the video band */}
            <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-4 pb-4 text-center sm:px-6 sm:pb-5">
              <p className="tri-gradient-text text-[clamp(1rem,2.4vw,1.6rem)] font-extrabold leading-tight tracking-tight">
                SAP connects your entire retail value chain
              </p>
              <p className="mt-1 text-[clamp(0.62rem,1.4vw,0.85rem)] font-semibold uppercase tracking-[0.18em] text-slate-200/90">
                suppliers · warehouses · stores — one live platform
              </p>
              <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
                {[
                  { value: "99.8%", label: "Inventory accuracy", color: "#117a4b" },
                  { value: "+8.2%", label: "Demand forecast", color: "#29ab87" },
                  { value: "98.7%", label: "On-time delivery", color: "#f5a623" },
                ].map((k) => (
                  <div
                    key={k.label}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-1.5 sm:px-3 sm:py-2"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: k.color, boxShadow: `0 0 8px ${k.color}` }} />
                    <span>
                      <span className="block text-xs font-extrabold leading-none sm:text-sm" style={{ color: k.color }}>
                        {k.value}
                      </span>
                      <span className="mt-0.5 block text-[8px] font-semibold uppercase tracking-[0.12em] text-white/70 sm:text-[9px]">
                        {k.label}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : videoHero ? (
          /* Full-bleed industry video hero — same integration as Retail & Supply Chain */
          <IndustryVideoHero
            videoSrc={videoHero.videoSrc}
            poster={videoHero.poster}
            objectPosition={videoHero.objectPosition}
            caption={videoHero.caption}
            sub={videoHero.sub}
            kpis={videoHero.kpis}
          />
        ) : (
          /* The video story — tells how SAP integrates into this sector */
          <div className="absolute inset-0 z-10">
            <IndustryVideoScene slug={industry.slug} />
          </div>
        )}

        {/* Clean bottom boundary */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.08]" />
      </section>

      {/* ── Definition / Overview ────────────── */}
      <section className="relative bg-[#050817] py-16 sm:py-20 border-b border-white/5">
        <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[rgba(41,171,135,0.08)] blur-3xl animate-float" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 translate-x-1/3 rounded-full bg-[rgba(245,166,35,0.07)] blur-3xl animate-float-reverse" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="tri-border-gradient mx-auto max-w-5xl rounded-[2rem] bg-white/[0.03] p-7 shadow-2xl backdrop-blur-md sm:p-10">
            <p className="tri-overline">Definition</p>
            <div className="mt-4 grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="tri-gradient-text text-[clamp(1.75rem,3.4vw,2.9rem)] font-bold leading-[1.16] tracking-[-0.02em]">
                  {industry.subtitle}
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-sm font-medium leading-7 text-slate-300">
                  {industry.description}
                </p>
              </div>
            </div>
            <div className="mt-7 flex items-center gap-3 border-t border-white/10 pt-6 text-sm font-semibold text-[#29ab87]">
              <CircleCheckBig className="h-5 w-5 text-[#29ab87]" /> SAP expertise shaped around your operation
            </div>
          </div>
        </div>
      </section>

      {/* ── Capabilities ─────────────────────── */}
      <section className="bg-[#030713] py-20 sm:py-24 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="tri-overline">What we deliver</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
              <span className="tri-gradient-text">Capabilities built for your industry</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">Practical technology capabilities that connect teams, data, and decisions across your organization.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industry.services.map((service, index) => {
              const Icon = capabilityIcons[index % capabilityIcons.length];
              const tone = cardTones[index % cardTones.length];
              return (
                <article
                  key={service}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  style={{ "--card-tone": tone.color, "--card-soft": tone.soft } as CSSProperties}
                >
                  {/* tri-color top hairline */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-0.5 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `linear-gradient(90deg, #117a4b, #29ab87, #f5a623)` }}
                  />
                  <span
                    aria-hidden
                    className="absolute right-5 top-4 text-5xl font-bold transition-colors duration-300"
                    style={{ color: "rgba(255,255,255,0.06)" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div
                    className="relative flex h-12 w-12 items-center justify-center rounded-2xl border transition-colors duration-300 group-hover:text-white"
                    style={{ background: `var(--card-soft)`, borderColor: `var(--card-tone)` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: `var(--card-tone)` }} aria-hidden="true" />
                  </div>
                  <h3 className="relative mt-7 text-xl font-bold text-white">{service}</h3>
                  <p className="relative mt-3 leading-7 text-slate-400">Designed to improve visibility, simplify work, and support informed decisions.</p>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                    style={{ background: `radial-gradient(circle, var(--card-tone), transparent 70%)` }}
                  />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Business Outcomes ────────────────── */}
      <section className="bg-[#050817] py-20 sm:py-24 border-b border-white/5">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-12">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-slate-950 border border-white/10 shadow-2xl">
            <Image src={industry.heroImage} alt={`${industry.title} business outcomes`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition duration-700 hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            <div aria-hidden className="absolute inset-0 opacity-30 tri-hex-grid" />
            <div className="absolute bottom-0 p-7 sm:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f5a623]">Built for lasting value</p>
              <p className="tri-gradient-text mt-3 max-w-md text-2xl font-bold leading-snug">Better data. Clearer decisions. Stronger operations.</p>
            </div>
          </div>

          <div className="lg:pl-8">
            <p className="tri-overline">Business value</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
              <span className="tri-gradient-text">Outcomes you can build on</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">Our solutions focus on measurable improvements in performance, efficiency, and decision-making.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {industry.benefits.map((benefit, index) => {
                const tone = cardTones[index % cardTones.length];
                return (
                  <div
                    key={benefit}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors duration-300"
                    style={{ "--benefit-tone": tone.color, "--benefit-soft": tone.soft } as CSSProperties}
                  >
                    <span
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                      style={{ background: "var(--benefit-soft)", color: "var(--benefit-tone)" }}
                    >
                      <Check className="h-4 w-4" />
                    </span>
                    <p className="font-semibold leading-7 text-white">{benefit}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────── */}
      <section className="bg-[#030713] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 px-6 py-14 text-center shadow-2xl sm:px-12 sm:py-20" style={{ background: "linear-gradient(135deg, #117a4b 0%, #0b1d33 50%, #7a4a08 100%)" }}>
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[48px] border-white/5" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[rgba(245,166,35,0.14)] blur-2xl" />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f5a623]">Let&apos;s work together</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
              <span className="tri-gradient-text">Ready to transform your {industry.title} operations?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-350">Connect with Trijotech to explore SAP solutions designed around your organization, priorities, and growth plans.</p>
            <Link href="/contact" className="mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#29ab87] via-[#117a4b] to-[#f5a623] px-7 py-3.5 font-semibold text-white shadow-lg border border-white/10 transition-all duration-300 hover:opacity-90">
              Start a conversation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
