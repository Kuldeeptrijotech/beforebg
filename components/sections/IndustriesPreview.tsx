import Container from "@/components/ui/Container";
import GradientButton from "@/components/ui/GradientButton";
import { StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import { industries } from "@/lib/site-data";
import { ArrowRight, Factory, Pill, Radio, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const industryIcons = [Pill, Factory, Wallet, Radio];

export default function IndustriesPreview() {
  const visibleIndustries = industries.filter((industry) => industry.showOnHome);

  return (
    <section className="relative isolate overflow-hidden bg-[#18263e] py-12 sm:py-14 lg:py-16 text-white border-t border-white/10">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-mesh opacity-60" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-grid-bg opacity-25" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[rgba(255, 255, 255,0.45)] to-transparent" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[rgba(255, 255, 255,0.15)] blur-[80px]" />
      <div aria-hidden className="pointer-events-none absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[rgba(255, 255, 255,0.12)] blur-[70px]" />

      <Container className="relative">
        <StaggerReveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <StaggerRevealItem className="max-w-2xl">
            <span className="tri-overline">Industries</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              SAP solutions shaped around{" "}
              <span className="tri-gradient-text">industry needs.</span>
            </h2>
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-slate-300 sm:text-sm sm:leading-6">
              We help organizations modernize operations, reporting, planning, and decision-making across industries with practical SAP expertise.
            </p>
          </StaggerRevealItem>
          <StaggerRevealItem>
            <GradientButton href="/industry" variant="outline" size="md">
              View all industries <ArrowRight className="h-4 w-4" />
            </GradientButton>
          </StaggerRevealItem>
        </StaggerReveal>

        <StaggerReveal className="mt-7 sm:mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch" stagger={0.06}>
          {visibleIndustries.map((industry, i) => {
            const Icon = industryIcons[i % industryIcons.length];
            return (
              <StaggerRevealItem key={industry.title} className="h-full">
                <Link
                  href={industry.href}
                  className="home-industry-card tri-focus group relative block h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:border-white/60 hover:shadow-[0_16px_40px_rgba(255, 255, 255,0.2)]"
                >
                  <div className="relative aspect-[3/4] w-full h-full overflow-hidden flex flex-col justify-end">
                    <Image
                      src={industry.image}
                      alt={industry.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover scale-[1.02]"
                    />
                    <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,19,0.15),rgba(3,7,19,0.92))]" />
                    <div aria-hidden className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255, 255, 255,0.45),transparent_52%)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />

                    <div className="relative z-10 p-4 sm:p-5 flex flex-col h-full justify-end">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.08] text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[linear-gradient(150deg,#22d3ee,#2563eb)] group-hover:border-transparent">
                        <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                      </span>
                      <h3 className="mt-3 text-base sm:text-lg font-bold text-white group-hover:text-white transition-colors">{industry.title}</h3>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-300 opacity-90 transition-all duration-300 group-hover:opacity-100">
                        {industry.description}
                      </p>
                      <div className="mt-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white transition-all duration-300 group-hover:gap-2">
                          Explore industry <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerRevealItem>
            );
          })}
        </StaggerReveal>
      </Container>
    </section>
  );
}
