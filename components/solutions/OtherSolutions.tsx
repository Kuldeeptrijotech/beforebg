import Image from "next/image";
import OptimizedVideo from "@/components/ui/OptimizedVideo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getOtherSolutions } from "@/lib/solutions-data";

export default function OtherSolutions({ currentSlug }: { currentSlug: string }) {
  const others = getOtherSolutions(currentSlug);
  if (others.length === 0) return null;

  return (
    <section className="relative isolate overflow-hidden bg-[#0b1d33] py-12 sm:py-14 lg:py-16 border-t border-white/5">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-hex-grid opacity-45" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-mesh opacity-50" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#29ab87]">More from Trijotech</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Explore Other <span className="tri-gradient-text">Solutions</span>
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {others.map((solution) => (
            <article
              key={solution.slug}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#29ab87]/60 hover:bg-white/[0.05] hover:shadow-[0_16px_40px_rgba(41,171,135,0.18)]"
            >
              <Link href={solution.href} className="no-underline relative block aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-900">
                {solution.cardImage.toLowerCase().match(/\.(mp4|webm)$/) !== null ? (
                  <OptimizedVideo
                    src={solution.cardImage}
                    alt={solution.imageAlt}
                    className="pointer-events-none absolute inset-[-2px] h-[calc(100%+4px)] w-[calc(100%+4px)] object-cover origin-center scale-[1.04]"
                  />
                ) : (
                  <Image
                    src={solution.cardImage}
                    alt={solution.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover origin-center scale-[1.04]"
                  />
                )}
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(14,26,44,0.95)] via-transparent to-transparent" />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(41,171,135,0.28),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-[#7edcc2] transition-colors">{solution.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">{solution.shortDescription}</p>
                <Link href={solution.href} className="mt-auto inline-flex items-center gap-2 pt-5 font-semibold text-[#29ab87] transition-all duration-200 group-hover:gap-3 group-hover:text-[#7edcc2]">
                  Explore Solution <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
