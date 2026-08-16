import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getOtherSolutions } from "@/lib/solutions-data";

export default function OtherSolutions({ currentSlug }: { currentSlug: string }) {
  const others = getOtherSolutions(currentSlug);
  if (others.length === 0) return null;

  return (
    <section className="bg-[#030713] py-16 sm:py-20 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#29ab87]">More from Trijotech</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Explore Other Solutions
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {others.map((solution) => (
            <article
              key={solution.slug}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#29ab87] hover:bg-white/[0.05] hover:shadow-2xl"
            >
              <div className={`relative overflow-hidden bg-slate-950/40 border-b border-white/5 ${solution.slug === "e-invoicing-pro" ? "aspect-[3/2]" : "aspect-[16/10]"}`}>
                <Image
                  src={solution.cardImage}
                  alt={solution.imageAlt}
                  fill
                  className={solution.slug === "e-invoicing-pro" ? "object-cover" : "object-contain p-3 sm:p-4"}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold text-white">{solution.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">{solution.shortDescription}</p>
                <Link href={solution.href} className="mt-auto inline-flex items-center gap-2 pt-5 font-semibold text-[#29ab87] transition-colors hover:text-white">
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
