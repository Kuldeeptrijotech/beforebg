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
  description = "",
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
    <section className={`relative isolate flex min-h-[75vh] w-full flex-col justify-center overflow-hidden ${bgClass} pb-16 pt-32 sm:pt-36 lg:min-h-[640px] lg:py-24`}>
      {/* Full width & full height image backdrop */}
      {heroImage && (
        <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
          <Image
            src={heroImage}
            alt={title || "Service Hero"}
            fill
            priority
            sizes="100vw"
            className="h-full w-full object-cover object-center brightness-[0.88] contrast-[1.05]"
          />
          {/* Subtle soft gradient on left for text legibility while keeping image vibrant & visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030713]/80 via-[#030713]/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#030713] to-transparent" />
        </div>
      )}

      <Container className="relative z-10 mx-auto w-full max-w-7xl">
        {heading ? (
          <div className="max-w-3xl">{heading}</div>
        ) : (
          <div className="flex max-w-4xl flex-col items-start text-left">
            {/* Eyebrow badge */}
            {eyebrow && <div className="hero-eyebrow-badge mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#050817]/75 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              <Sparkles className="h-3.5 w-3.5 text-white" />
              {eyebrow}
            </div>}

            {/* Title */}
            <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white drop-shadow-md sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="mt-5 text-lg font-semibold leading-relaxed text-white drop-shadow-md sm:text-xl">
                {subtitle}
              </p>
            )}

            {/* Description */}
            {description && (
              <p className="mt-4 max-w-2xl text-base font-normal leading-[1.7] text-white/90 drop-shadow sm:text-lg">
                {description}
              </p>
            )}

            {/* Action buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4 relative z-10">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="hero-btn-blue tri-btn tri-focus px-7 py-4 text-sm font-bold !text-white relative z-10 hover:z-20 transition-all duration-200"
                  style={{ backgroundColor: "#257ae8d6", background: "#257ae8d6", color: "#ffffff", borderColor: "rgba(255, 255, 255, 0.35)" }}
                >
                  {primaryCta.label} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="hero-btn-blue tri-btn tri-focus px-7 py-4 text-sm font-semibold !text-white relative z-10 hover:z-20 transition-all duration-200"
                  style={{ backgroundColor: "#257ae8d6", background: "#257ae8d6", color: "#ffffff", borderColor: "rgba(255, 255, 255, 0.35)" }}
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          </div>
        )}
      </Container>

      {/* Clean bottom border */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/15" />
    </section>
  );
}


