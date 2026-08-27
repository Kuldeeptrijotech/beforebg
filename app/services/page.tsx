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
    <main className="services-page-root font-sans overflow-hidden bg-[#030713] text-white">
      {/* ──── Hero Section (Preserved & Untouched) ──── */}
      <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-[#050817] pt-24 sm:pt-28 lg:pt-24 pb-12">
        {/* Mesh + hexgrid background */}
        <div aria-hidden className="absolute inset-0 -z-40 tri-mesh" />
        <div aria-hidden className="absolute inset-0 -z-30 tri-hex-grid opacity-55" />

        {/* Hero image */}
        <Image
          src="/assets/heroes/services-blue.png"
          alt="Trijotech SAP Services"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-90"
        />

        {/* Gradient overlays — balanced for text readability and clear background visibility */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,7,19,0.92)_0%,rgba(3,7,19,0.70)_40%,rgba(3,7,19,0.20)_75%,transparent_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,7,19,0.30)_0%,transparent_30%,transparent_70%,rgba(3,7,19,0.60)_100%)]"
        />

        {/* Content */}
        <div className="mx-auto flex min-h-[calc(100svh-9.5rem)] w-full max-w-7xl items-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="max-w-3xl">

            <h1 className="max-w-3xl text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
              SAP solutions designed to transform your business
            </h1>

            <p className="mt-6 max-w-2xl text-base font-normal leading-[1.7] text-white/80 sm:text-lg">
              Trijotech provides end-to-end SAP services across implementation,
              support, integration, analytics, cloud, and intelligent
              technologies.
            </p>

            <div className="mt-9 flex flex-wrap gap-4 relative z-10">
              <a
                href="#explore-services"
                className="service-hero-cta-btn inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white transition-all duration-200 border-0 border-none shadow-none relative z-10 hover:z-20"
                style={{
                  background: "#008fd3",
                  backgroundColor: "#008fd3",
                  color: "#ffffff",
                  border: "none",
                  borderWidth: "0px",
                  outline: "none",
                }}
              >
                Explore Services <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="service-hero-cta-btn inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white transition-all duration-200 border-0 border-none shadow-none relative z-10 hover:z-20"
                style={{
                  background: "#008fd3",
                  backgroundColor: "#008fd3",
                  color: "#ffffff",
                  border: "none",
                  borderWidth: "0px",
                  outline: "none",
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
