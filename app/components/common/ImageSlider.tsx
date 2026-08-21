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
      <div className="relative">
        <div className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-2xl bg-[#030713] border border-white/10 shadow-2xl">
          <Image
            src={images[current]}
            alt={`${label} – slide ${current + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 880px"
            className="object-contain"
            loading="lazy"
          />
          <span className="absolute right-3.5 top-3.5 rounded-full border border-white/15 bg-[rgba(3,7,19,0.75)] px-3 py-1 text-xs font-semibold text-[#29ab87] shadow-lg backdrop-blur-md">
            {current + 1} / {images.length}
          </span>
        </div>

        {/* Navigation Arrows Outside the Card */}
        <button
          type="button"
          className="absolute -left-4 sm:-left-12 md:-left-14 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[rgba(3,7,19,0.85)] text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#29ab87]/60 hover:bg-[linear-gradient(150deg,#29ab87,#117a4b)] sm:h-11 sm:w-11"
          onClick={() => move(-1)}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="absolute -right-4 sm:-right-12 md:-right-14 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[rgba(3,7,19,0.85)] text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#29ab87]/60 hover:bg-[linear-gradient(150deg,#29ab87,#117a4b)] sm:h-11 sm:w-11"
          onClick={() => move(1)}
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div
        className="mt-4 flex max-w-full items-center justify-center gap-1.5 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-2 pb-1"
        aria-label="Choose slide"
      >
        {images.map((_, index) => (
          <button
            type="button"
            key={index}
            className={`rounded-full transition-all duration-300 ${
              index === current
                ? "h-2 w-6 bg-[linear-gradient(90deg,#29ab87,#f5a623)] shadow-[0_0_6px_rgba(41,171,135,0.6)]"
                : "h-1.5 w-1.5 bg-white/25 hover:bg-white/50"
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
