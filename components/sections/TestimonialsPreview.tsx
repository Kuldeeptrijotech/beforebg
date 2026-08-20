"use client";

import Container from "@/components/ui/Container";
import { testimonials, type TestimonialItem } from "@/lib/site-data";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { amount: 0.05 });
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
    if (visibleCount <= 1 || selectedTestimonial || !sectionInView) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => loopIndex(current + 1, visibleCount));
    }, AUTO_ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [visibleTestimonials.length, selectedTestimonial, sectionInView]);

  if (!visibleTestimonials.length) return null;

  return (
    <section ref={sectionRef} data-content-visibility="off" className="relative isolate overflow-hidden bg-[#0b1d33] py-12 sm:py-14 lg:py-16 text-white border-t border-white/5">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-hex-grid opacity-45" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-30 tri-mesh opacity-50" />
      <div aria-hidden className="tri-blob -z-10 h-72 w-72 animate-float-slow" style={{ left: "-8%", top: "20%", background: "radial-gradient(circle, rgba(41,171,135,0.2), transparent 70%)" }} />

      <Container className="relative">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="tri-overline">Testimonials</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Trusted by teams{" "}
              <span className="tri-gradient-text">modernizing with SAP.</span>
            </h2>
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-slate-300 sm:text-sm sm:leading-6">
              Hear from clients who rely on Trijotech for practical delivery, clear communication,
              and measurable business outcomes.
            </p>
          </div>

          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={goPrevious}
              aria-label="Previous testimonial"
              className="tri-focus flex size-9 sm:size-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-md transition hover:border-[rgba(41,171,135,0.6)] hover:bg-white/[0.12]"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next testimonial"
              className="tri-focus flex size-9 sm:size-10 items-center justify-center rounded-full bg-[linear-gradient(120deg,#29ab87,#117a4b)] text-white shadow-lg shadow-[rgba(41,171,135,0.4)] transition hover:-translate-y-0.5"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-7 sm:mt-8 grid gap-5 lg:grid-cols-3 items-stretch">
          <AnimatePresence mode="popLayout">
            {visibleCards.map((testimonial) => (
              <motion.article
                key={`${testimonial.companyName}-${testimonial.writerName}`}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.97 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="tri-glass-card tri-border-gradient flex h-full flex-col rounded-2xl p-5 sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[linear-gradient(160deg,rgba(41,171,135,0.3),rgba(17,122,75,0.3))]">
                    <Quote className="size-4 text-[#7edcc2]" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f5a623]">
                    {testimonial.companyName}
                  </span>
                </div>

                <p className="mt-5 line-clamp-3 flex-1 text-sm leading-6 text-slate-300">
                  {testimonial.testimonial}
                </p>

                <div className="mt-auto pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedTestimonial(testimonial)}
                    className="tri-focus w-fit text-sm font-semibold text-[#7edcc2] transition hover:text-[#f5a623]"
                  >
                    Read more
                  </button>

                  <div className="mt-5 flex items-center gap-4 border-t border-white/10 pt-5">
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
