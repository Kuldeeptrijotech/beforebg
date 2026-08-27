import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
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
    <section id="why-choose-us" className="relative isolate overflow-hidden bg-white py-12 sm:py-14 lg:py-16 text-slate-900 border-t border-slate-200">
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Why Choose Us"
            dark={false}
            align="center"
            className="mx-auto"
            title="SAP expertise built around business outcomes."
            description="We combine certified SAP talent, business understanding, and structured delivery practices to help enterprises modernize with confidence."
          />
        </Reveal>

        {/* stats band */}
        <Reveal delay={0.08}>
          <div className="mt-6 sm:mt-8 grid gap-4 rounded-2xl border-0 bg-[#008fd3] text-white p-4 shadow-[0_10px_30px_rgba(0,143,211,0.22)] sm:grid-cols-2 lg:grid-cols-4 sm:p-6">
            {statValues.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <p className="text-3xl font-bold sm:text-4xl text-white">
                  <AnimatedCounter
                    to={stat.numeric}
                    suffix={stat.suffix}
                    className="text-white"
                  />
                </p>
                <p className="mt-1 max-w-[14rem] text-xs font-medium leading-tight text-white/90">
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
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm transition-all duration-300 hover:border-[#008fd3] hover:shadow-md">
                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-900">
                    <OptimizedVideo
                      src={item.image}
                      alt={item.imageAlt}
                      className={`pointer-events-none absolute inset-0 h-full w-full object-cover origin-center ${
                        index > 0 ? "scale-[1.22]" : "scale-[1.02]"
                      }`}
                    />
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(14,26,44,0.7)] via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#008fd3] shadow-md transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5 text-[#008fd3]" strokeWidth={2} />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-base sm:text-lg font-bold leading-snug text-slate-900 transition-colors">{item.title}</h3>
                    <p className="mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-slate-600">{item.description}</p>
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
