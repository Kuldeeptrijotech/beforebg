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
    <main className="zip-theme min-h-[calc(100svh-4.5rem)] bg-[#121927] font-sans text-white antialiased">
      <section className="relative overflow-hidden border-b border-white/10 py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.16),transparent_34%)]" />
        <Container className="relative">
          <p className="tri-overline">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{description}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="tri-btn tri-btn-primary px-6 py-3 text-sm font-semibold">
              Talk to our team <ArrowRight className="size-4" />
            </Link>
            <Link href="/" className="tri-btn tri-btn-ghost px-6 py-3 text-sm font-semibold">
              <ArrowLeft className="size-4" /> Back home
            </Link>
          </div>
        </Container>
      </section>
      <section className="bg-[#162032] py-20 text-white border-b border-white/5">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {highlights.map((highlight) => (
              <div key={highlight} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl backdrop-blur-xl">
                <CheckCircle2 className="size-5 text-[#29ab87]" />
                <p className="mt-4 font-semibold text-slate-200">{highlight}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
