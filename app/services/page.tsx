import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServiceBanners from "@/components/services/ServiceBanners";

export const metadata: Metadata = {
  title: "Services | Trijotech",
  description:
    "End-to-end SAP implementation, support, integration, cloud, analytics, and AI services.",
};

export default function ServicesPage() {
  return (
    <main className="public-alternating-page font-sans overflow-hidden bg-[#030713] text-white">
      {/* ──── Hero Section (Preserved & Untouched) ──── */}
      <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-[#050817] pt-24 sm:pt-28 lg:pt-24 pb-12">
        {/* Mesh + hexgrid background */}
        <div aria-hidden className="absolute inset-0 -z-40 tri-mesh" />
        <div aria-hidden className="absolute inset-0 -z-30 tri-hex-grid opacity-55" />

        {/* Hero image */}
        <Image
          src="/assets/heroes/services.png"
          alt="Trijotech SAP Services"
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

            <h1 className="max-w-3xl text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
              SAP solutions designed to{" "}
              <span className="tri-gradient-text">transform your business</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base font-normal leading-[1.7] text-white/80 sm:text-lg">
              Trijotech provides end-to-end SAP services across implementation,
              support, integration, analytics, cloud, and intelligent
              technologies.
            </p>

            <div className="mt-9 flex flex-wrap gap-4 relative z-10">
              <a
                href="#explore-services"
                className="hero-btn-blue tri-btn tri-focus px-7 py-4 text-sm font-semibold !text-white relative z-10 hover:z-20 transition-all duration-200"
                style={{
                  background: "#257ae8d6",
                  color: "#ffffff",
                  borderColor: "rgba(255, 255, 255, 0.35)",
                }}
              >
                Explore Services <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="hero-btn-blue tri-btn tri-focus px-7 py-4 text-sm font-semibold !text-white relative z-10 hover:z-20 transition-all duration-200"
                style={{
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
          className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-[#030713]"
        />
      </section>

      {/* ──── Services Full-Width Alternating Banners ──── */}
      <ServiceBanners />
    </main>
  );
}
