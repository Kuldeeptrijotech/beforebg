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
    <section className="relative isolate overflow-hidden bg-white py-12 sm:py-14 lg:py-16 text-slate-900 border-t border-slate-200">
      <Container className="relative">
        <StaggerReveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <StaggerRevealItem className="max-w-2xl">
            <SectionHeading
              eyebrow="Services"
              dark={false}
              title="Practical SAP and digital services for enterprise growth."
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
                    className="home-service-card group flex h-full flex-col rounded-2xl p-5 sm:p-6 border-0 bg-[#008fd3] text-white shadow-[0_10px_30px_rgba(0,143,211,0.22)] transition-all duration-300 hover:bg-[#007bb8] hover:shadow-[0_16px_40px_rgba(0,143,211,0.35)]"
                  >
                    <div className="home-service-icon-badge flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#008fd3] shadow-md transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6 text-[#008fd3]" strokeWidth={2.2} />
                    </div>
                    <h3 className="mt-4 text-base sm:text-lg font-bold leading-snug text-white transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-white/90">{service.description}</p>
                    <div className="mt-auto pt-5">
                      <span className="home-service-link inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white transition-all duration-300 group-hover:gap-2.5">
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
