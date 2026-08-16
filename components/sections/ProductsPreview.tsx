"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientButton from "@/components/ui/GradientButton";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import { products } from "@/lib/site-data";
import { ArrowRight, Layers3, LineChart, ReceiptText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const productIcons = [ReceiptText, LineChart, Layers3];

export default function ProductsPreview() {
  const visibleProducts = products.filter((product) => product.showOnHome);

  return (
    <section className="relative overflow-hidden bg-white py-24 text-slate-950 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-96 w-64 -translate-y-1/2 rounded-full bg-[rgba(17,122,75,0.08)] blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/3 h-64 w-64 rounded-full bg-[rgba(245,166,35,0.1)] blur-3xl" />

      <Container className="relative">
        <StaggerReveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <StaggerRevealItem className="max-w-2xl">
            <SectionHeading
              eyebrow="Our Solutions"
              title={
                <>
                  Practical SAP products built for{" "}
                  <span className="gradient-text">enterprise teams.</span>
                </>
              }
              description="Explore Trijotech solutions designed to simplify operations, improve reporting, and support business-critical SAP workflows."
            />
          </StaggerRevealItem>
          <StaggerRevealItem>
            <GradientButton href="/solutions" variant="outline" size="md">
              View all solutions <ArrowRight className="h-4 w-4" />
            </GradientButton>
          </StaggerRevealItem>
        </StaggerReveal>

        <StaggerReveal className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3" stagger={0.1}>
          {visibleProducts.map((product, i) => {
            const Icon = productIcons[i % productIcons.length];
            return (
              <StaggerRevealItem key={product.title} className="h-full">
                <Link
                  href={product.href}
                  className="tri-card-light tri-focus group flex h-full flex-col overflow-hidden rounded-3xl"
                >
                  <SpotlightCard glow="rgba(245,166,35,0.12)" className="flex h-full flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <Image
                        src={product.image}
                        alt={product.imageAlt}
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(11,29,51,0.35))]" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="flex items-center gap-3 text-xl font-bold leading-7 text-slate-900 transition-colors group-hover:text-tri-1">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(160deg,#29ab87,#117a4b)] text-white shadow-md">
                          <Icon className="h-5 w-5" strokeWidth={1.8} />
                        </span>
                        {product.title}
                      </h3>
                      <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">{product.description}</p>
                      <span className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-tri-1 transition-all duration-200 group-hover:gap-3 group-hover:text-tri-3-deep">
                        Explore product <ArrowRight className="h-4 w-4" />
                      </span>
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
