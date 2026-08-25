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
  Gauge,
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
    <main className="industry-detail-page public-alternating-page overflow-hidden bg-[#030713] text-white">
      {/* ── Hero Section ───────────────────────────── */}
      <section className="relative isolate flex min-h-[70vh] w-full flex-col justify-center overflow-hidden bg-[#050817] pb-16 pt-32 sm:pt-36 lg:min-h-[600px] lg:py-24">
        {/* Ambient static backdrop */}
        <div aria-hidden className="absolute inset-0 -z-10 tri-mesh" />
        <div aria-hidden className="absolute inset-0 -z-10 tri-grid-bg opacity-40" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-hex-grid opacity-30" />
        <div aria-hidden className="pointer-events-none absolute right-[8%] top-[14%] -z-10 h-72 w-72 rounded-full bg-white/[0.07] blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute bottom-[16%] left-[6%] -z-10 h-64 w-64 rounded-full bg-white/[0.05] blur-3xl" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex max-w-4xl flex-col items-start text-left">
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
            <p className="mt-4 max-w-2xl text-base font-normal leading-[1.7] text-white/80 sm:text-lg">
              {industry.shortDescription || industry.description}
            </p>

            {/* Action buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
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
              <div className="mt-12 flex flex-wrap items-center gap-2.5 sm:gap-3">
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
        </div>

        {/* Clean bottom boundary */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/10" />
      </section>

      {/* ── Definition / Overview ────────────── */}
      <section className="relative bg-[#050817] py-16 sm:py-20 border-b border-white/5">
        <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[rgba(255, 255, 255,0.08)] blur-3xl animate-float" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 translate-x-1/3 rounded-full bg-[rgba(255, 255, 255,0.07)] blur-3xl animate-float-reverse" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="tri-border-gradient mx-auto max-w-5xl rounded-[2rem] bg-white/[0.03] p-7 shadow-2xl backdrop-blur-md sm:p-10">
            <p className="tri-overline">Definition</p>
            <div className="mt-4 grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="tri-gradient-text text-[clamp(1.35rem,2.5vw,2.1rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
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
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
              <span className="tri-gradient-text">Capabilities built for your industry</span>
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
                  {/* tri-color top hairline */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-0.5 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `linear-gradient(90deg, #22d3ee, #2563eb, #ffffff)` }}
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
                    <Icon className="industry-card-icon h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="relative mt-7 text-xl font-bold text-white">{service}</h3>
                  <p className="relative mt-3 leading-7 text-slate-400">
                    Designed to improve visibility, simplify work, and support informed decisions.
                  </p>
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

      {/* Industry priorities */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 tri-grid-bg opacity-[0.06]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="tri-overline">Industry priorities</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-black sm:text-5xl">Modernize the areas that matter most</h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">A practical transformation agenda for {industry.title.toLowerCase()} teams, connecting operational priorities with secure SAP delivery.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { title: "Connected planning", description: `Bring ${industry.services[0].toLowerCase()} and ${industry.services[1].toLowerCase()} into one governed planning environment.`, icon: Target },
              { title: "Trusted operations", description: `Build reliable controls, integrated data, and clear ownership to support ${industry.benefits[0].toLowerCase()}.`, icon: ShieldCheck },
              { title: "Performance at scale", description: `Turn timely insight into repeatable action and sustain ${industry.benefits[industry.benefits.length - 1].toLowerCase()}.`, icon: Gauge },
            ].map((priority) => {
              const Icon = priority.icon;
              return (
                <article key={priority.title} className="industry-detail-card group min-w-0 overflow-hidden rounded-3xl border p-7 transition-transform duration-300 hover:-translate-y-1">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/25 bg-white/15"><Icon className="h-6 w-6" aria-hidden="true" /></span>
                  <h3 className="mt-6 text-xl font-bold">{priority.title}</h3>
                  <p className="mt-3 leading-7">{priority.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Delivery model */}
      <section className="relative overflow-hidden bg-[#050817] py-20 sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 tri-hex-grid opacity-25" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="tri-overline">How we deliver</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">From industry challenge to measurable value</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">Each engagement follows a transparent path that keeps business teams involved and every SAP decision tied to an operational outcome.</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Assess", "Map processes, systems, data quality, risks, and the outcomes your teams need."],
              ["02", "Design", "Create a fit-for-purpose SAP roadmap with clear priorities and delivery checkpoints."],
              ["03", "Deliver", "Configure, integrate, test, and enable users through controlled implementation cycles."],
              ["04", "Improve", "Track adoption and performance, then continuously optimize the operating model."],
            ].map(([number, title, description]) => (
              <article key={number} className="industry-detail-card min-w-0 overflow-hidden rounded-3xl border border-[#2f8fff]/40 bg-[#111827] p-6">
                <div className="flex items-center justify-between gap-4"><span className="text-sm font-bold tracking-[0.18em] text-[#2f8fff]">{number}</span><Workflow className="h-5 w-5 text-[#2f8fff]" aria-hidden="true" /></div>
                <h3 className="mt-8 text-xl font-bold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      {/* ── Business Outcomes ────────────────── */}
      <section className="industry-outcomes-section bg-[#050817] py-20 sm:py-24 border-b border-white/5">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-12">
          <div className="flex flex-col gap-8">
            <div>
              <p className="tri-overline">Business value</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
                <span className="tri-gradient-text">Outcomes you can build on</span>
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-400">
                Our solutions focus on measurable improvements in performance, efficiency, and decision-making.
              </p>
            </div>

            <div className="industry-outcomes-image relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] bg-slate-950 border border-white/10 shadow-2xl">
              <Image
                src={industry.heroImage}
                alt={`${industry.title} business outcomes`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
              <div aria-hidden className="absolute inset-0 opacity-30 tri-hex-grid" />
              <div className="absolute bottom-0 p-7 sm:p-10">
                <p className="industry-outcomes-kicker text-sm font-bold uppercase tracking-[0.2em] text-white">Built for lasting value</p>
                <p className="tri-gradient-text mt-3 max-w-md text-2xl font-bold leading-snug">
                  Better data. Clearer decisions. Stronger operations.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {industry.benefits.map((benefit, index) => {
              const tone = cardTones[index % cardTones.length];
              return (
                <div
                  key={benefit}
                  className="industry-detail-card flex min-w-0 items-start gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 shadow-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
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
      </section>

      {/* ── CTA Banner ────────────────────────── */}
      <section className="hidden bg-[#030713] px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
        <div
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 px-6 py-8 text-center shadow-2xl sm:px-12 sm:py-10"
          style={{ background: "linear-gradient(135deg, #ffffff 0%, #0b1d33 50%, #7a4a08 100%)" }}
        >
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[48px] border-white/5" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[rgba(255, 255, 255,0.14)] blur-2xl" />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white">Let&apos;s work together</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              <span className="tri-gradient-text">Ready to transform your {industry.title} operations?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-350 sm:text-base">
              Connect with Trijotech to explore SAP solutions designed around your organization, priorities, and growth plans.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffffff] via-[#ffffff] to-[#ffffff] px-6 py-3 font-semibold text-white shadow-lg border border-white/10 transition-all duration-300 hover:opacity-90 hover:scale-105"
            >
              Start a conversation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
