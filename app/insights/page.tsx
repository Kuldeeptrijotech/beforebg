import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, ChevronRight, Clapperboard, FileText, Sparkles } from "lucide-react";

export const metadata: Metadata = { title: "Insights | Trijotech", description: "Practical SAP insights, case studies, and videos from Trijotech." };

const cards = [
  {
    title: "Blogs",
    href: "/blogs",
    image: "/assets/heroes/blogs-blue.png",
    imageAlt: "Trijotech SAP articles and insights",
    description: "Read practical perspectives on SAP, enterprise technology, analytics, planning, integration, and digital transformation.",
    cta: "Explore Blogs",
    icon: BookOpen,
  },
  {
    title: "Case Studies",
    href: "/case-studies",
    image: "/assets/heroes/case-studies-blue.png",
    imageAlt: "Trijotech client case studies",
    description: "See real project challenges, solution approaches, and outcomes across planning, consolidation, analytics, and profitability.",
    cta: "Explore Case Studies",
    icon: FileText,
  },
  {
    title: "Videos",
    href: "/videos",
    image: "/assets/heroes/videos-generated-v2.png",
    imageAlt: "Trijotech SAP video library",
    description: "Watch explainers, service overviews, and expert perspectives that make complex SAP and business topics easier to understand.",
    cta: "Explore Videos",
    icon: Clapperboard,
  },
];

export default function InsightsPage() {
  return (
    <main className="overflow-hidden bg-[#e8f2fb] text-slate-900">
      <section className="relative isolate min-h-[680px] overflow-hidden bg-cyan-950 pt-24 sm:min-h-[720px]">
        <Image
          src="/assets/heroes/blogs-blue.png"
          alt="Trijotech insights and knowledge"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-950/95 via-cyan-950/75 to-cyan-900/20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-cyan-950/70 via-transparent to-slate-950/20" />

        <div className="mx-auto flex min-h-[580px] max-w-7xl items-center px-5 py-16 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <nav className="mb-10 flex flex-wrap items-center gap-2 text-sm text-cyan-50/80" aria-label="Breadcrumb">
              <Link href="/" className="transition hover:text-white">Home</Link>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
              <span className="font-medium text-white">Insights</span>
            </nav>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-50 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-cyan-200" aria-hidden="true" />
              Insights
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl">
              Ideas, experience and knowledge from our SAP experts
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-medium leading-8 text-cyan-50 sm:text-2xl">
              Explore practical insights, case studies, videos, and perspectives from the Trijotech team.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#explore" className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3.5 font-semibold text-cyan-950 shadow-lg shadow-cyan-950/20 transition hover:-translate-y-0.5 hover:bg-cyan-300">
                Explore Insights <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur-md transition hover:bg-white/20">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="explore" className="relative bg-gradient-to-b from-[#d5eafa] to-[#e8f2fb] py-20 sm:py-24">
        <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-100/70 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-700">Learn from practical experience</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">Insight formats built for real-world learning</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">Choose from the insight formats already available across the Trijotech website.</p>
          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.href} className="group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-blue-200 bg-[#f5faff] shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-950/10">
                  <Link href={card.href} className="relative block aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image src={card.image} alt={card.imageAlt} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/40 to-transparent" />
                    <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 text-cyan-700 shadow-lg backdrop-blur">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </Link>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="text-xl font-bold leading-snug text-slate-900 sm:text-2xl">{card.title}</h3>
                    <p className="mt-4 leading-7 text-slate-600">{card.description}</p>
                    <Link href={card.href} className="mt-7 inline-flex items-center gap-2 font-semibold text-cyan-700 transition group-hover:gap-3 group-hover:text-cyan-600">
                      {card.cta} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#ccdfef] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-cyan-700 to-cyan-950 px-6 py-14 text-center shadow-2xl shadow-cyan-950/15 sm:px-12 sm:py-20">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[48px] border-white/5" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-300/10 blur-2xl" />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">Let's work together</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Ready to turn insight into action?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-cyan-50/80">Connect with Trijotech to explore SAP solutions designed around your organization, priorities, and growth plans.</p>
            <Link href="/contact" className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-cyan-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-cyan-50">
              Start a conversation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}