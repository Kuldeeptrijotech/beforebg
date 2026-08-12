"use client";

import Container from "@/components/ui/Container";
import { testimonials, type TestimonialItem } from "@/lib/site-data";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const AUTO_ROTATE_MS = 6500;

function loopIndex(index: number, length: number) {
    return ((index % length) + length) % length;
}

function getInitials(name: string) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

export default function TestimonialsPreview() {
    const visibleTestimonials = testimonials.filter((item) => item.showOnHome);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedTestimonial, setSelectedTestimonial] =
        useState<TestimonialItem | null>(null);

    const cardCount = Math.min(3, visibleTestimonials.length);

    const visibleCards = Array.from({ length: cardCount }, (_, offset) => {
        return visibleTestimonials[
            loopIndex(activeIndex + offset, visibleTestimonials.length)
        ];
    });

    function goNext() {
        setActiveIndex((current) =>
            loopIndex(current + 1, visibleTestimonials.length),
        );
    }

    function goPrevious() {
        setActiveIndex((current) =>
            loopIndex(current - 1, visibleTestimonials.length),
        );
    }

    useEffect(() => {
        const visibleCount = visibleTestimonials.length;

        if (visibleCount <= 1 || selectedTestimonial) return;

        const timer = window.setInterval(() => {
            setActiveIndex((current) => loopIndex(current + 1, visibleCount));
        }, AUTO_ROTATE_MS);

        return () => window.clearInterval(timer);
    }, [visibleTestimonials.length, selectedTestimonial]);

    if (!visibleTestimonials.length) return null;

    return (
        <section className="bg-white py-20 text-slate-950">
            <Container>
                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
                            Testimonials
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                            Trusted by teams modernizing with SAP.
                        </h2>

                        <p className="mt-4 text-base leading-7 text-slate-600">
                            Hear from clients who rely on Trijotech for practical delivery,
                            clear communication, and measurable business outcomes.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={goPrevious}
                            className="flex size-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-950 transition hover:border-cyan-300 hover:text-cyan-700"
                            aria-label="Previous testimonial"
                        >
                            <ArrowLeft className="size-5" />
                        </button>

                        <button
                            type="button"
                            onClick={goNext}
                            className="flex size-11 items-center justify-center rounded-lg bg-slate-950 text-white transition hover:bg-cyan-700"
                            aria-label="Next testimonial"
                        >
                            <ArrowRight className="size-5" />
                        </button>
                    </div>
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                        {visibleCards.map((testimonial) => (
                            <motion.article
                                key={`${testimonial.companyName}-${testimonial.writerName}`}
                                layout
                                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -24, scale: 0.97 }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                                className="flex h-full flex-col rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm"
                            >
                                <Quote className="size-8 text-cyan-700" />

                                <p className="mt-5 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">
                                    {testimonial.testimonial}
                                </p>

                                <button
                                    type="button"
                                    onClick={() => setSelectedTestimonial(testimonial)}
                                    className="mt-5 w-fit text-sm font-semibold text-cyan-700 transition hover:text-slate-950"
                                >
                                    Read more
                                </button>

                                <div className="mt-6 flex items-center gap-4 border-t border-slate-200 pt-5">
                                    {testimonial.image ? (
                                        <div className="relative size-12 overflow-hidden rounded-full bg-slate-200">
                                            <Image
                                                src={testimonial.image}
                                                alt={testimonial.imageAlt ?? testimonial.writerName}
                                                fill
                                                sizes="48px"
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex size-12 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                                            {getInitials(testimonial.writerName)}
                                        </div>
                                    )}

                                    <div>
                                        <p className="font-semibold text-slate-950">
                                            {testimonial.writerName}
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            {testimonial.designation}
                                        </p>
                                        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-cyan-700">
                                            {testimonial.companyName}
                                        </p>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </div>
            </Container>

            <AnimatePresence>
                {selectedTestimonial && (
                    <motion.div
                        className="fixed inset-0 z-80 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        role="dialog"
                        aria-modal="true"
                        onClick={() => setSelectedTestimonial(null)}
                    >
                        <motion.div
                            className="relative w-full max-w-2xl rounded-lg bg-white p-6 text-slate-950 shadow-2xl md:p-8"
                            initial={{ opacity: 0, y: 24, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 24, scale: 0.96 }}
                            transition={{ duration: 0.25 }}
                            onClick={(event) => event.stopPropagation()}
                        >
                            <button
                                type="button"
                                onClick={() => setSelectedTestimonial(null)}
                                className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
                                aria-label="Close testimonial"
                            >
                                <X className="size-5" />
                            </button>

                            <p className="pr-10 text-sm font-semibold uppercase tracking-wide text-cyan-700">
                                {selectedTestimonial.companyName}
                            </p>

                            <p className="mt-5 text-lg leading-8 text-slate-700">
                                {selectedTestimonial.testimonial}
                            </p>

                            <div className="mt-8 border-t border-slate-200 pt-5">
                                <p className="font-semibold">{selectedTestimonial.writerName}</p>
                                <p className="text-sm text-slate-500">
                                    {selectedTestimonial.designation}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
