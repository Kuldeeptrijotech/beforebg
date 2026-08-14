import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  CircleCheckBig,
  DatabaseZap,
  Layers3,
  Sparkles,
} from "lucide-react";
import { getIndustry, industries } from "@/lib/industries-data";

type Props = { params: Promise<{ slug?: string[] }> };

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: [industry.slug] }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug?.[0];
  const industry = slug ? getIndustry(slug) : undefined;
  if (!industry) return {};
  return {
    title: `${industry.title} Solutions | Trijotech`,
    description: industry.shortDescription,
  };
}

const capabilityIcons = [Layers3, DatabaseZap, BarChart3];

export default async function IndustryDetailPage({ params }: Props) {
  const slug = (await params).slug?.[0];
  const industry = slug ? getIndustry(slug) : undefined;
  if (!industry) notFound();

  return (
    <main className="overflow-hidden bg-[#e8f2fb] text-slate-900">
      <section className="relative isolate min-h-[680px] overflow-hidden bg-cyan-950 pt-24 sm:min-h-[720px]">
        <Image
          src={industry.heroImage}
          alt={`${industry.title} operations`}
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
              <Link href="/industry" className="transition hover:text-white">Industries</Link>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
              <span className="font-medium text-white">{industry.title}</span>
            </nav>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-50 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-cyan-200" aria-hidden="true" />
              Industry solutions
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl">
              {industry.title}
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-medium leading-8 text-cyan-50 sm:text-2xl">
              {industry.subtitle}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
              {industry.shortDescription}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3.5 font-semibold text-cyan-950 shadow-lg shadow-cyan-950/20 transition hover:-translate-y-0.5 hover:bg-cyan-300">
                Talk to our experts <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/industry" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur-md transition hover:bg-white/20">
                <ArrowLeft className="h-4 w-4" /> All industries
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-[#d5eafa] to-[#e8f2fb] py-20 sm:py-24">
        <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-100/70 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-700">Industry expertise</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Turning complexity into connected performance
            </h2>
          </div>
          <div className="rounded-3xl border border-blue-200 bg-[#f5faff]/95 p-7 shadow-xl shadow-blue-950/10 sm:p-10">
            <p className="text-lg leading-8 text-slate-600">{industry.description}</p>
            <div className="mt-7 flex items-center gap-3 border-t border-cyan-100 pt-6 text-sm font-semibold text-cyan-700">
              <CircleCheckBig className="h-5 w-5 text-cyan-600" /> SAP expertise shaped around your operation
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#dcebf8] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-700">What we deliver</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">Capabilities built for your industry</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">Practical technology capabilities that connect teams, data, and decisions across your organization.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industry.services.map((service, index) => {
              const Icon = capabilityIcons[index % capabilityIcons.length];
              return (
                <article key={service} className="group relative overflow-hidden rounded-3xl border border-blue-200 bg-[#f5faff] p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-950/10">
                  <span className="absolute right-5 top-4 text-5xl font-bold text-slate-100 transition group-hover:text-cyan-50">{String(index + 1).padStart(2, "0")}</span>
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 transition group-hover:bg-cyan-600 group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="relative mt-7 text-xl font-bold text-slate-900">{service}</h3>
                  <p className="relative mt-3 leading-7 text-slate-600">Designed to improve visibility, simplify work, and support informed decisions.</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#e8f2fb] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-12">
          <div className="relative min-h-[440px] overflow-hidden rounded-[2rem] bg-cyan-100 shadow-2xl shadow-cyan-950/10 sm:min-h-[520px]">
            <Image src={industry.heroImage} alt={`${industry.title} business outcomes`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition duration-700 hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/85 via-transparent to-transparent" />
            <div className="absolute bottom-0 p-7 text-white sm:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">Built for lasting value</p>
              <p className="mt-3 max-w-md text-2xl font-bold leading-snug">Better data. Clearer decisions. Stronger operations.</p>
            </div>
          </div>

          <div className="lg:pl-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-700">Business value</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">Outcomes you can build on</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">Our solutions focus on measurable improvements in performance, efficiency, and decision-making.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {industry.benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 rounded-2xl border border-cyan-100 bg-cyan-50/60 p-5">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-600 text-white"><Check className="h-4 w-4" /></span>
                  <p className="font-semibold leading-7 text-slate-800">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#ccdfef] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-cyan-700 to-cyan-950 px-6 py-14 text-center shadow-2xl shadow-cyan-950/15 sm:px-12 sm:py-20">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[48px] border-white/5" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-300/10 blur-2xl" />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">Let&apos;s work together</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Ready to transform your {industry.title} operations?</h2>
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
