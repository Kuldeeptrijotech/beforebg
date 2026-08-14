"use client";

import Container from "@/components/ui/Container";
import { whyChooseStats, whyChooseUs } from "@/lib/site-data";
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useScroll,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";


function ClientConfidenceScroll() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeStatIndex, setActiveStatIndex] = useState(0);

    const activeStat = whyChooseStats[activeStatIndex] ?? whyChooseStats[0];

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const nextIndex = Math.min(
            whyChooseStats.length - 1,
            Math.max(0, Math.floor(latest * whyChooseStats.length)),
        );

        setActiveStatIndex(nextIndex);
    });

    return (
        <div
            ref={sectionRef}
            className="relative mt-14"
            style={{ minHeight: `${whyChooseStats.length * 85}vh` }}
        >
            <div className="sticky top-20 flex min-h-[calc(100vh-5rem)] items-center py-10">
                <div className="grid w-full gap-8 rounded-lg border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/25 backdrop-blur md:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-20%" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-200">
                            Client Confidence
                        </p>

                        <h3 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
                            Built for clients who need reliable delivery, not just
                            implementation.
                        </h3>

                        <div className="mt-6 text-sm leading-7 text-white/62 md:text-base">
                            <p>
                                At Trijotech, we take ownership beyond technology implementation by
                                combining SAP expertise, industry knowledge, and a client-first delivery
                                model. With experience across industries and geographies, we create
                                practical, scalable, and business-relevant solutions that strengthen
                                operations, improve performance, and support long-term growth.
                            </p>
                        </div>

                        <div className="mt-6 grid gap-3">
                            {whyChooseStats.map((stat, index) => (
                                <button
                                    key={stat.label}
                                    type="button"
                                    onClick={() => setActiveStatIndex(index)}
                                    className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition ${index === activeStatIndex
                                        ? "border-cyan-300/40 bg-white/10 text-white"
                                        : "border-white/10 bg-white/3 text-white/45 hover:bg-white/6"
                                        }`}
                                >
                                    <span
                                        className={`h-2 w-2 shrink-0 rounded-full ${index === activeStatIndex ? "bg-cyan-200" : "bg-white/25"
                                            }`}
                                    />
                                    <span className="text-sm font-semibold">{stat.label}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    <div className="relative min-h-96 overflow-hidden rounded-lg bg-white p-6 text-slate-950 shadow-2xl shadow-black/30 md:p-8">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.18),transparent_32%)]" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStat.label}
                                initial={{ opacity: 0, y: 32, scale: 0.96, filter: "blur(10px)" }}
                                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -32, scale: 0.96, filter: "blur(10px)" }}
                                transition={{ duration: 0.42, ease: "easeOut" }}
                                className="relative flex min-h-80 flex-col justify-center"
                            >
                                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-100">
                                    <Image src={activeStat.animation.src}
                                        alt={activeStat.animation.alt}
                                        fill
                                        sizes="(min-width: 1024px) 40vw, 100vw"
                                        className="object-cover"
                                    />
                                </div>

                                <p className="mt-8 text-6xl font-bold tracking-tight text-orange-500">
                                    {activeStat.value}
                                </p>

                                <p className="mt-4 max-w-md text-2xl font-semibold leading-8 text-slate-950">
                                    {activeStat.label}
                                </p>

                                <p className="mt-4 max-w-md text-sm leading-6 text-slate-600 md:text-base">
                                    {activeStat.summary}
                                </p>

                                <div className="mt-8 flex gap-2">
                                    {whyChooseStats.map((stat, index) => (
                                        <span
                                            key={stat.label}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${index === activeStatIndex
                                                ? "w-12 bg-cyan-500"
                                                : "w-4 bg-slate-200"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function WhyChooseUs() {
    const visibleItems = whyChooseUs.filter((item) => item.showOnHome);

    return (
        <section className="bg-slate-950 py-20 text-white">
            <Container>
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-wide text-cyan-200">
                        Why Choose Us
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                        SAP expertise built around business outcomes.
                    </h2>

                    <p className="mt-4 text-base leading-7 text-white/60">
                        We combine certified SAP talent, business understanding, and structured
                        delivery practices to help enterprises modernize with confidence.
                    </p>
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-3">
                    {visibleItems.map((item) => (
                        <article
                            key={item.title}
                            className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-white/6 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/8"
                        >
                            <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
                                <Image
                                    src={item.image}
                                    alt={item.imageAlt}
                                    fill
                                    sizes="(min-width: 1024px) 33vw, 100vw"
                                    className="object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent" />
                            </div>

                            <div className="flex flex-1 flex-col p-6">
                                <h3 className="text-xl font-semibold leading-7">
                                    {item.title}
                                </h3>

                                <p className="mt-4 text-sm leading-6 text-white/58">
                                    {item.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                <ClientConfidenceScroll />

            </Container>
        </section>
    );
}
