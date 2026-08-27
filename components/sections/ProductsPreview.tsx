import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientButton from "@/components/ui/GradientButton";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import { products } from "@/lib/site-data";
import { ArrowRight, Layers3, LineChart, ReceiptText } from "lucide-react";
import OptimizedVideo from "@/components/ui/OptimizedVideo";
import Link from "next/link";

const productIcons = [ReceiptText, LineChart, Layers3];

export default function ProductsPreview() {
  const visibleProducts = products.filter((product) => product.showOnHome);

  return (
    <section className="relative isolate overflow-hidden bg-[#18263e] py-12 sm:py-14 lg:py-16 text-white border-t border-white/10">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-mesh opacity-60" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-grid-bg opacity-25" />
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-96 w-64 -translate-y-1/2 rounded-full bg-[rgba(255, 255, 255,0.2)] blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/3 h-64 w-64 rounded-full bg-[rgba(255, 255, 255,0.15)] blur-3xl" />

      <Container className="relative">
        <StaggerReveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <StaggerRevealItem className="max-w-2xl">
            <SectionHeading
              eyebrow="Our Solutions"
              dark
              title="Practical SAP products built for enterprise teams."
              description="Explore Trijotech solutions designed to simplify operations, improve reporting, and support business-critical SAP workflows."
            />
          </StaggerRevealItem>
          <StaggerRevealItem>
            <GradientButton href="/solutions" variant="outline" size="md">
              View all solutions <ArrowRight className="h-4 w-4" />
            </GradientButton>
          </StaggerRevealItem>
        </StaggerReveal>

        <StaggerReveal className="mt-7 sm:mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3 items-stretch" stagger={0.08}>
          {visibleProducts.map((product, i) => {
            const Icon = productIcons[i % productIcons.length];
            return (
              <StaggerRevealItem key={product.title} className="h-full">
                <Link
                  href={product.href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/[0.06] hover:shadow-[0_16px_40px_rgba(0,143,211,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <SpotlightCard glow="rgba(255, 255, 255,0.2)" className="flex h-full flex-col">
                    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-900">
                      <OptimizedVideo
                        src={product.image}
                        alt={product.imageAlt}
                        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                      />
                      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(14,26,44,0.95)] via-transparent to-transparent" />
                      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255, 255, 255,0.28),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="flex items-center gap-2.5 text-base sm:text-lg font-bold leading-snug text-white">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(160deg,#22d3ee,#2563eb)] text-white shadow-md">
                          <Icon className="h-4 w-4" strokeWidth={1.8} />
                        </span>
                        {product.title}
                      </h3>
                      <p className="mt-2.5 flex-1 text-xs sm:text-sm leading-relaxed text-slate-300">{product.description}</p>
                      <div className="mt-auto pt-4">
                        <span className="inline-flex w-fit items-center gap-1.5 text-xs sm:text-sm font-semibold text-white transition-all duration-200 group-hover:gap-2.5">
                          Explore product <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </StaggerRevealItem>
            );
          })}
        </StaggerReveal>
      </Container>
    </section>
  );
}
