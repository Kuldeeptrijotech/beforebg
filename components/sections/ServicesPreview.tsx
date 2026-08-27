import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
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
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 shadow-xs hover:bg-slate-50 transition-all"
            >
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </StaggerRevealItem>
        </StaggerReveal>

        <StaggerReveal className="mt-7 sm:mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch" stagger={0.07}>
          {featuredServices.map((service, i) => {
            const Icon = serviceIcons[i % serviceIcons.length];
            return (
              <StaggerRevealItem key={service.href} className="h-full">
                <Link
                  href={service.href}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-sm transition-all duration-300 hover:border-slate-400 hover:shadow-md sm:p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-900 transition-colors group-hover:bg-slate-900 group-hover:text-white">
                    <Icon className="h-6 w-6" strokeWidth={2.2} />
                  </div>
                  <h3 className="mt-4 text-base font-bold leading-snug text-slate-900 sm:text-lg">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-600 sm:text-sm">{service.description}</p>
                  <div className="mt-auto pt-5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 group-hover:text-slate-700 sm:text-sm">
                      Learn more <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
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
