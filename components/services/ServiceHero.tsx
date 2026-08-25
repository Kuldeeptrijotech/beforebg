"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import { navHeroImages } from "@/lib/nav-hero-images";

type ServiceHeroProps = {
  /** Optional Eyebrow badge text */
  eyebrow?: string;
  /** Hero Title */
  title?: string;
  /** Hero Subtitle / Lead */
  subtitle?: string;
  /** Hero Description */
  description?: string;
  /** Primary Action Button */
  primaryCta?: { label: string; href: string };
  /** Secondary Action Button */
  secondaryCta?: { label: string; href: string };
  /** Key metrics / capability pills */
  metrics?: { value: string; label: string }[];
  /** Optional custom heading component */
  heading?: ReactNode;
  /** Optional custom scene (unused in static mode) */
  scene?: ReactNode;
  /** Hero background gradient classes */
  bgClass?: string;
  /** Colour the hero melts into at the bottom */
  fadeTo?: string;
  /** Glow blob colours */
  glow?: [string, string];
};

/**
 * Service Hero Section:
 * Clean, modern static enterprise hero header.
 * High-readability typography with pure white & dark slate background.
 */
export default function ServiceHero({
  eyebrow = "SAP Enterprise Services",
  title = "End-to-End SAP Transformation & Consulting",
  subtitle = "Delivering scalable architecture, cloud integration, and measurable business outcomes.",
  description = "Our dedicated SAP consultants partner with enterprise teams from initial architecture strategy and system implementation through continuous optimization.",
  primaryCta = { label: "Consult our SAP experts", href: "/contact" },
  secondaryCta = { label: "Explore all services", href: "/services" },
  metrics = [
    { value: "9+", label: "Years Experience" },
    { value: "100%", label: "Delivery Ownership" },
    { value: "24/7", label: "Enterprise Support" },
  ],
  heading,
  bgClass = "bg-[#050817]",
}: ServiceHeroProps) {
  const pathname = usePathname();
  const heroImage = navHeroImages[pathname];
  return (
    <section className={`relative isolate flex min-h-[70vh] w-full flex-col justify-center overflow-hidden ${bgClass} pb-16 pt-32 sm:pt-36 lg:min-h-[600px] lg:py-24`}>
      {heroImage && (
        <Image src={heroImage} alt="" fill priority sizes="100vw" className="-z-50 object-cover object-center" />
      )}
      <div aria-hidden className="absolute inset-0 -z-40 bg-gradient-to-r from-[#050817]/95 via-[#050817]/78 to-[#050817]/45" />
      {/* Brand tri-mesh and grid overlays (static) */}
      <div aria-hidden className="absolute inset-0 -z-30 tri-mesh opacity-40" />
      <div aria-hidden className="absolute inset-0 -z-30 tri-grid-bg opacity-40" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-hex-grid opacity-30" />

      {/* Subtle static ambient glows */}
      <div aria-hidden className="pointer-events-none absolute -right-20 top-10 -z-10 h-80 w-80 rounded-full bg-white/[0.07] blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-20 bottom-10 -z-10 h-72 w-72 rounded-full bg-white/[0.05] blur-3xl" />

      <Container className="relative z-10 mx-auto w-full max-w-7xl">
        {heading ? (
          <div className="max-w-3xl">{heading}</div>
        ) : (
          <div className="flex max-w-4xl flex-col items-start text-left">
            {/* Eyebrow badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              <Sparkles className="h-3.5 w-3.5 text-white" />
              {eyebrow}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="mt-5 text-lg font-semibold leading-relaxed text-white sm:text-xl">
                {subtitle}
              </p>
            )}

            {/* Description */}
            {description && (
              <p className="mt-4 max-w-2xl text-base font-normal leading-[1.7] text-white/80 sm:text-lg">
                {description}
              </p>
            )}

            {/* Action buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="tri-btn tri-btn-primary tri-focus px-7 py-4 text-sm font-bold text-[#030713]"
                >
                  {primaryCta.label} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="tri-btn tri-btn-ghost tri-focus px-7 py-4 text-sm font-semibold text-white"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>

            {/* Key Metrics / Highlights */}
            {metrics && metrics.length > 0 && (
              <div className="mt-12 flex flex-wrap items-center gap-3 sm:gap-4">
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-md"
                  >
                    <span className="text-base font-extrabold text-white sm:text-lg">{m.value}</span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-white/70">{m.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Container>

      {/* Clean sharp boundary line */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/10" />
    </section>
  );
}


