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
  const [selectedTestimonial, setSelectedTestimonial] = useState<TestimonialItem | null>(null);

  const cardCount = Math.min(3, visibleTestimonials.length);
  const visibleCards = Array.from({ length: cardCount }, (_, offset) =>
    visibleTestimonials[loopIndex(activeIndex + offset, visibleTestimonials.length)]
  );

  function goNext() {
    setActiveIndex((current) => loopIndex(current + 1, visibleTestimonials.length));
  }
  function goPrevious() {
    setActiveIndex((current) => loopIndex(current - 1, visibleTestimonials.length));
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
    <section className="relative isolate overflow-hidden bg-[#0b1d33] py-24 text-white sm:py-28">
      <div aria-hidden className="absolute inset-0 -z-20 tri-hex-grid" />
      <div aria-hidden className="tri-blob -z-10 h-72 w-72 animate-float-slow" style={{ left: "-8%", top: "20%", background: "radial-gradient(circle, rgba(41,171,135,0.2), transparent 70%)" }} />

      <Container className="relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="tri-overline">Testimonials</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Trusted by teams{" "}
              <span className="tri-gradient-text">modernizing with SAP.</span>
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
              Hear from clients who rely on Trijotech for practical delivery, clear communication,
              and measurable business outcomes.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={goPrevious}
              aria-label="Previous testimonial"
              className="tri-focus flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-md transition hover:border-[rgba(41,171,135,0.6)] hover:bg-white/[0.12]"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next testimonial"
              className="tri-focus flex size-11 items-center justify-center rounded-full bg-[linear-gradient(120deg,#29ab87,#117a4b)] text-white shadow-lg shadow-[rgba(41,171,135,0.4)] transition hover:-translate-y-0.5"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleCards.map((testimonial) => (
              <motion.article
                key={`${testimonial.companyName}-${testimonial.writerName}`}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.97 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="tri-glass-card tri-border-gradient flex h-full flex-col rounded-3xl p-6 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(160deg,rgba(41,171,135,0.3),rgba(17,122,75,0.3))]">
                    <Quote className="size-5 text-[#7edcc2]" />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f5a623]">
                    {testimonial.companyName}
                  </span>
                </div>

                <p className="mt-5 line-clamp-3 flex-1 text-sm leading-6 text-slate-300">
                  {testimonial.testimonial}
                </p>

                <button
                  type="button"
                  onClick={() => setSelectedTestimonial(testimonial)}
                  className="tri-focus mt-5 w-fit text-sm font-semibold text-[#7edcc2] transition hover:text-[#f5a623]"
                >
                  Read more
                </button>

                <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-5">
                  {testimonial.image ? (
                    <div className="relative size-12 overflow-hidden rounded-full bg-slate-700">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.imageAlt ?? testimonial.writerName}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex size-12 items-center justify-center rounded-full bg-[linear-gradient(160deg,#29ab87,#117a4b)] text-sm font-bold text-white">
                      {getInitials(testimonial.writerName)}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-white">{testimonial.writerName}</p>
                    <p className="truncate text-sm text-slate-400">{testimonial.designation}</p>
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
            className="fixed inset-0 z-80 flex items-center justify-center bg-slate-950/75 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            onClick={() => setSelectedTestimonial(null)}
          >
            <motion.div
              className="tri-glass-card relative w-full max-w-2xl rounded-3xl p-6 text-white sm:p-8"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedTestimonial(null)}
                aria-label="Close testimonial"
                className="tri-focus absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-300 transition hover:bg-white/[0.14] hover:text-white"
              >
                <X className="size-5" />
              </button>

              <p className="pr-10 text-sm font-semibold uppercase tracking-wide text-[#f5a623]">
                {selectedTestimonial.companyName}
              </p>
              <p className="mt-5 text-lg leading-8 text-slate-200">{selectedTestimonial.testimonial}</p>

              <div className="mt-8 border-t border-white/10 pt-5">
                <p className="font-semibold">{selectedTestimonial.writerName}</p>
                <p className="text-sm text-slate-400">{selectedTestimonial.designation}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
