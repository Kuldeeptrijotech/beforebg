"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type ImageSliderProps = {
  images: string[];
  label: string;
  className?: string;
};

export default function ImageSlider({
  images,
  label,
  className = "",
}: ImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const move = (offset: number) =>
    setCurrent((current + offset + images.length) % images.length);

  return (
    <div className={`w-full ${className}`.trim()} aria-label={label}>
      <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-[1.4rem] bg-slate-100">
        <Image
          src={images[current]}
          alt={`${label} – slide ${current + 1}`}
          fill
          sizes="(max-width: 1200px) 100vw, 1140px"
          className="object-contain"
          loading="lazy"
        />
        <span className="absolute right-4 top-4 rounded-full bg-cyan-950/80 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
          {current + 1} / {images.length}
        </span>
        <button
          type="button"
          className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-cyan-950/80 text-white shadow-xl backdrop-blur-md transition hover:scale-105 hover:bg-cyan-700 sm:left-5 sm:h-12 sm:w-12"
          onClick={() => move(-1)}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-cyan-950/80 text-white shadow-xl backdrop-blur-md transition hover:scale-105 hover:bg-cyan-700 sm:right-5 sm:h-12 sm:w-12"
          onClick={() => move(1)}
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div
        className="mt-5 flex max-w-full items-center justify-center gap-2 overflow-x-auto px-2 pb-1"
        aria-label="Choose slide"
      >
        {images.map((_, index) => (
          <button
            type="button"
            key={index}
            className={`h-2.5 shrink-0 rounded-full transition-all ${
              index === current
                ? "w-8 bg-cyan-600"
                : "w-2.5 bg-blue-200 hover:bg-cyan-300"
            }`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === current ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
