import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import IndustryAngledBanners from "@/components/industries/IndustryAngledBanners";

export const metadata: Metadata = {
  title: "Industries | Trijotech",
  description:
    "Industry-focused SAP solutions for connected operations, reporting, analytics, and growth.",
};

export default function IndustryPage() {
  return (
    <main className="public-alternating-page font-sans overflow-hidden bg-[#030713] text-white">
      {/* ──── Hero Section (Preserved & Untouched) ──── */}
      <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-[#050817] pt-24 sm:pt-28 lg:pt-24 pb-12">
        {/* Mesh + hexgrid background */}
        <div aria-hidden className="absolute inset-0 -z-40 tri-mesh" />
        <div aria-hidden className="absolute inset-0 -z-30 tri-hex-grid opacity-55" />

        {/* Hero image */}
        <Image
          src="/assets/heroes/industry.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-95"
        />

        {/* Gradient overlays — side-only */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(3,7,19,0.85)_0%,rgba(3,7,19,0.50)_50%,rgba(3,7,19,0.15)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,7,19,0.25)_0%,transparent_30%,transparent_75%,rgba(3,7,19,0.15)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_75%_55%_at_12%_55%,rgba(255, 255, 255,0.13),transparent_68%)]"
        />

        {/* Content */}
        <div className="mx-auto flex min-h-[calc(100svh-9.5rem)] w-full max-w-7xl items-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="max-w-3xl">
            <span className="hero-eyebrow-badge mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-[#050817]/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              <Sparkles className="h-3.5 w-3.5 text-white" />
              Industries
            </span>

            <h1 className="max-w-3xl text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Industry knowledge meets{" "}
              <span className="tri-gradient-text">SAP expertise</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base font-normal leading-[1.7] text-white/80 sm:text-lg">
              We shape connected, practical SAP solutions around the
              operational, financial, and data challenges unique to your
              industry.
            </p>

            <div className="mt-9 flex flex-wrap gap-4 relative z-10">
              <a
                href="#explore"
                className="hero-btn-blue tri-btn tri-focus px-7 py-4 text-sm font-semibold !text-white relative z-10 hover:z-20 transition-all duration-200"
                style={{
                  backgroundColor: "#257ae8d6",
                  background: "#257ae8d6",
                  color: "#ffffff",
                  borderColor: "rgba(255, 255, 255, 0.35)",
                }}
              >
                Explore Industries <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="hero-btn-blue tri-btn tri-focus px-7 py-4 text-sm font-semibold !text-white relative z-10 hover:z-20 transition-all duration-200"
                style={{
                  backgroundColor: "#257ae8d6",
                  background: "#257ae8d6",
                  color: "#ffffff",
                  borderColor: "rgba(255, 255, 255, 0.35)",
                }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Clean bottom separator */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.08]"
        />
      </section>

      {/* ──── Full Width Alternating Angled Banners List ──── */}
      <IndustryAngledBanners />
    </main>
  );
}
