import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  align?: "left" | "center";
};

/** Reusable dark hero for inner pages, built on the Trijotech design language. */
export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  children,
  align = "left",
}: PageHeroProps) {
  const centered = align === "center";
  return (
    <section className="relative isolate overflow-hidden bg-[#0b1d33]">
      <div aria-hidden className="absolute inset-0 -z-30 tri-mesh tri-hex-grid" />
      {image && (
        <>
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="-z-20 object-cover object-center opacity-25" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0b1d33]/70 via-[#0b1d33]/40 to-[#0b1d33]" />
        </>
      )}
      <div aria-hidden className="tri-blob -z-10 h-72 w-72 animate-float-slow" style={{ left: "-6%", top: "18%", background: "radial-gradient(circle, rgba(41,171,135,0.25), transparent 70%)" }} />
      <div aria-hidden className="tri-blob -z-10 h-80 w-80 animate-float-reverse" style={{ right: "-8%", bottom: "6%", background: "radial-gradient(circle, rgba(245,166,35,0.18), transparent 70%)" }} />

      <div className={`mx-auto w-full max-w-7xl px-5 pb-16 pt-36 sm:px-8 sm:pb-24 lg:px-12 lg:pt-44 lg:pb-28 ${centered ? "text-center" : ""}`}>
        <Reveal>
          {eyebrow && (
            <span className={`tri-overline ${centered ? "justify-center" : ""}`} style={{ justifyContent: centered ? "center" : undefined }}>
              {eyebrow}
            </span>
          )}
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-4 max-w-3xl text-2xl font-semibold leading-[1.18] tracking-tight text-white sm:text-3xl lg:text-4xl">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.16}>
            <p className={`mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl ${centered ? "mx-auto" : ""}`}>
              {description}
            </p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.24}>
            <div className={`mt-9 flex flex-wrap gap-4 ${centered ? "justify-center" : ""}`}>{children}</div>
          </Reveal>
        )}
      </div>

      {/* bottom fade into next section */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
    </section>
  );
}
