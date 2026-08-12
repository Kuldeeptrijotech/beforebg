import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { industries } from "@/lib/site-data";
import Image from "next/image";
import Link from "next/link";

export default function IndustriesPreview() {
  const visibleIndustries = industries.filter((industry) => industry.showOnHome);

  return (
    <section className="bg-slate-50 py-20 text-slate-950">
      <Container>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
              Industries
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              SAP solutions shaped around industry needs.
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              We help organizations modernize operations, reporting, planning,
              and decision-making across industries with practical SAP expertise.
            </p>
          </div>

          <Button href="/industry" tone="dark" className="industries-view-all-button">
            View all industries
          </Button>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleIndustries.map((industry) => (
            <article
              key={industry.title}
              className="industry-preview-card group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl"
            >
              <div className="industry-preview-media relative aspect-16/10 overflow-hidden bg-slate-100">
                <Image
                  src={industry.image}
                  alt={industry.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="industry-preview-image object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-lg font-semibold leading-6">
                  {industry.title}
                </h3>

                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">
                  {industry.description}
                </p>

                <Link
                  href={industry.href}
                  className="mt-4 inline-flex w-fit items-center text-sm font-semibold text-cyan-700 transition hover:text-slate-950"
                >
                  Explore industry
                  <span className="ml-2 transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
