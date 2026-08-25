import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import HexBadge from "@/components/ui/HexBadge";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import { Reveal, StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import { whyChooseStats, whyChooseUs } from "@/lib/site-data";
import { Award, Globe2, BadgeCheck } from "lucide-react";
import OptimizedVideo from "@/components/ui/OptimizedVideo";

const statValues = whyChooseStats.map((stat) => ({
  ...stat,
  numeric: parseInt(stat.value.replace(/[^0-9]/g, ""), 10) || 0,
  suffix: stat.value.replace(/[0-9]/g, ""),
}));

const itemIcons = [Award, Globe2, BadgeCheck];

export default function WhyChooseUs() {
  const visibleItems = whyChooseUs.filter((item) => item.showOnHome);

  return (
    <section className="relative isolate overflow-hidden bg-[#18263e] py-12 sm:py-14 lg:py-16 text-white border-t border-white/10">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-mesh opacity-60" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-30 tri-grid-bg opacity-25" />
      <div aria-hidden className="tri-blob -z-10 h-80 w-80 animate-float-slow" style={{ right: "-10%", top: "8%", background: "radial-gradient(circle, rgba(255, 255, 255,0.14), transparent 70%)" }} />

      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Why Choose Us"
            dark
            align="center"
            className="mx-auto"
            title={
              <>
                SAP expertise built around{" "}
                <span className="tri-gradient-text">business outcomes.</span>
              </>
            }
            description="We combine certified SAP talent, business understanding, and structured delivery practices to help enterprises modernize with confidence."
          />
        </Reveal>

        {/* stats band */}
        <Reveal delay={0.08}>
          <div className="home-stats-band mt-6 sm:mt-8 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4 sm:p-6">
            {statValues.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <p className="text-3xl font-bold sm:text-4xl">
                  <AnimatedCounter
                    to={stat.numeric}
                    suffix={stat.suffix}
                    className="tri-gradient-text"
                  />
                </p>
                <p className="mt-1 max-w-[14rem] text-xs font-medium leading-tight text-slate-300">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <StaggerReveal className="mt-6 sm:mt-8 grid gap-5 lg:grid-cols-3 items-stretch" stagger={0.08}>
          {visibleItems.map((item, index) => {
            const Icon = itemIcons[index % itemIcons.length];
            return (
              <StaggerRevealItem key={item.title} className="h-full">
                <article className="why-choose-card tri-glass-card group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:border-white/60 hover:bg-white/[0.05] hover:shadow-[0_20px_50px_rgba(255, 255, 255,0.22)]">
                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-900">
                    <OptimizedVideo
                      src={item.image}
                      alt={item.imageAlt}
                      className={`pointer-events-none absolute inset-0 h-full w-full object-cover origin-center ${
                        index > 0 ? "scale-[1.22]" : "scale-[1.02]"
                      }`}
                    />
                    {/* Seamless dark gradient overlay matching the card glass background */}
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(14,26,44,0.95)] via-transparent to-transparent" />
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255, 255, 255,0.25),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <HexBadge
                      icon={Icon}
                      tone={index === 1 ? "amber" : "green"}
                      size="md"
                      className="absolute bottom-3 left-4 z-10"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-base sm:text-lg font-bold leading-snug text-white group-hover:text-white transition-colors">{item.title}</h3>
                    <p className="mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-slate-300">{item.description}</p>
                  </div>
                </article>
              </StaggerRevealItem>
            );
          })}
        </StaggerReveal>
      </Container>
    </section>
  );
}
