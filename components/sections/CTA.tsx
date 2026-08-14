import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { homeCta } from "@/lib/site-data";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-white py-20 text-slate-950">
      <Container>
        <div className="grid gap-8 border-y border-slate-200 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
              {homeCta.eyebrow}
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {homeCta.title}
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
              {homeCta.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href={homeCta.primaryAction.href}
                tone="dark"
                className="w-full gap-2 sm:w-fit"
              >
                {homeCta.primaryAction.label}
                <ArrowRight className="size-4" />
              </Button>

              <Button
                href={homeCta.secondaryAction.href}
                tone="light"
                className="w-full sm:w-fit"
              >
                {homeCta.secondaryAction.label}
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-lg sm:bg-cyan-100 text-cyan-700">
                <Mail className="size-5" />
              </span>

              <div>
                <p className="text-sm font-semibold text-slate-950">
                  What happens next?
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Share your requirement and our team will help map the right
                  solution path.
                </p>
              </div>
            </div>

            <ul className="mt-6 space-y-4">
              {homeCta.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}