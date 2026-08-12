import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { services } from "@/lib/site-data";
import Image from "next/image";
import Link from "next/link";

export default function ServicesPreview() {
  const featuredServices = services.filter((service) => service.showOnHome);

  return (
    <section className="bg-white py-20">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600">
              Services
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Practical SAP and digital services for enterprise growth.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Choose focused delivery teams for implementation, support,
              integration, application development, and data-led decisions.
            </p>
          </div>

          <Button href="/services" tone="light">
            View all services
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-cyan-300/70 hover:shadow-xl hover:shadow-cyan-950/10"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-slate-950">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className={service.title === "SAP Support & AMS"
                    ? "scale-[1.3] object-cover opacity-100 transition duration-500 group-hover:scale-[1.34]"
                    : "object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"}
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/65 via-transparent to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold leading-6 text-slate-950">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {service.description}
                </p>
                <span className="mt-auto inline-flex pt-5 text-sm font-semibold text-cyan-700 transition group-hover:text-cyan-900">
                  Learn more
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
