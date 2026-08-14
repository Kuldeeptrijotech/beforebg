import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights?: string[];
};

export default function PlaceholderPage({
  eyebrow,
  title,
  description,
  highlights = [
    "Enterprise-ready SAP expertise",
    "Practical implementation and support",
    "Solutions aligned with measurable outcomes",
  ],
}: PlaceholderPageProps) {
  return (
    <main className="zip-theme min-h-[calc(100vh-4.5rem)] bg-[#030713] font-sans text-white antialiased">
      <section className="relative overflow-hidden border-b border-white/10 py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.16),transparent_34%)]" />
        <Container className="relative">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-200">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">{description}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#050817] transition hover:bg-cyan-100">
              Talk to our team <ArrowRight className="size-4" />
            </Link>
            <Link href="/" className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold transition hover:bg-white/10">
              <ArrowLeft className="size-4" /> Back home
            </Link>
          </div>
        </Container>
      </section>
      <section className="bg-white py-20 text-slate-950">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {highlights.map((highlight) => (
              <div key={highlight} className="rounded-lg border border-slate-200 bg-slate-50 p-6">
                <CheckCircle2 className="size-5 text-cyan-700" />
                <p className="mt-4 font-semibold">{highlight}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
