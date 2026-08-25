import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientButton from "@/components/ui/GradientButton";
import TiltCard from "@/components/ui/TiltCard";
import HexBadge from "@/components/ui/HexBadge";
import { StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import { services } from "@/lib/site-data";
import { ArrowRight, Blocks, Compass, DatabaseZap, HeartHandshake } from "lucide-react";

const serviceIcons = [Compass, HeartHandshake, Blocks, DatabaseZap];

export default function ServicesPreview() {
  const featuredServices = services.filter((service) => service.showOnHome);

  return (
    <section className="relative isolate overflow-hidden bg-white py-12 sm:py-14 lg:py-16 text-black border-t border-slate-200">
      {/* Decorative ambient glowing layers with Hexagon grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-hex-grid opacity-0" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-mesh opacity-0" />
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[rgba(255, 255, 255,0.18)] blur-[100px] tri-pulse" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 -left-28 h-[420px] w-[420px] rounded-full bg-[rgba(255, 255, 255,0.14)] blur-[100px] tri-pulse" style={{ animationDelay: "2s" }} />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[rgba(255, 255, 255,0.45)] to-transparent" />

      <Container className="relative">
        <StaggerReveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <StaggerRevealItem className="max-w-2xl">
            <SectionHeading
              eyebrow="Services"
              dark
              title={
                <>
                  Practical SAP and digital services for{" "}
                  <span className="tri-gradient-text">enterprise growth.</span>
                </>
              }
              description="Choose focused delivery teams for implementation, support, integration, application development, and data-led decisions."
            />
          </StaggerRevealItem>
          <StaggerRevealItem>
            <GradientButton href="/services" variant="outline" size="md">
              View all services <ArrowRight className="h-4 w-4" />
            </GradientButton>
          </StaggerRevealItem>
        </StaggerReveal>

        <StaggerReveal className="mt-7 sm:mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch" stagger={0.07}>
          {featuredServices.map((service, i) => {
            const Icon = serviceIcons[i % serviceIcons.length];
            return (
              <StaggerRevealItem key={service.href} className="h-full">
                <TiltCard className="h-full">
                  <a
                    href={service.href}
                    className="tri-glass-card group flex h-full flex-col rounded-2xl p-5 sm:p-6 border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-white/[0.06] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                  >
                    <HexBadge icon={Icon} tone={i % 2 === 0 ? "green" : "mix"} size="md" />
                    <h3 className="mt-4 text-base sm:text-lg font-bold leading-snug text-white transition-colors group-hover:text-white">
                      {service.title}
                    </h3>
                    <p className="mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-slate-300">{service.description}</p>
                    <div className="mt-auto pt-5">
                      <span className="home-service-link inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white transition-all duration-300 group-hover:gap-2.5 group-hover:text-white">
                        Learn more <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </a>
                </TiltCard>
              </StaggerRevealItem>
            );
          })}
        </StaggerReveal>
      </Container>
    </section>
  );
}
