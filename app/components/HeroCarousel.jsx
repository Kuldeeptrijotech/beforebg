"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import firstSlide from "../assets/image/L0101.png";
import secondSlide from "../assets/image/L0104.jpg";

const slides = [
  {
    image: firstSlide,
    title: ["NAVIGATING YOUR BUSINESS", "SUCCESS WITH SAP SOLUTIONS"],
    cta: "CONTACT US",
  },
  {
    image: secondSlide,
    title: ["EMPOWERING BUSINESS", "EXCELLENCE WITH SAP EXPERTISE"],
    cta: "EXPLORE OUR SOLUTIONS",
  },
];

export default function HeroCarousel() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const heroRef = useRef(null);
  const isVisibleRef = useRef(false);
  const advanceTimerRef = useRef(null);
  const returnTimerRef = useRef(null);

  const clearTimers = useCallback(() => {
    if (advanceTimerRef.current) window.clearTimeout(advanceTimerRef.current);
    if (returnTimerRef.current) window.clearTimeout(returnTimerRef.current);
    advanceTimerRef.current = null;
    returnTimerRef.current = null;
  }, []);

  const startTiming = useCallback(() => {
    clearTimers();
    if (!isVisibleRef.current) return;

    advanceTimerRef.current = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
      returnTimerRef.current = window.setTimeout(() => {
        setActiveSlide(0);
        returnTimerRef.current = null;
      }, 5000);
      advanceTimerRef.current = null;
    }, 20000);
  }, [clearTimers]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting) startTiming();
      else clearTimers();
    }, { threshold: 0.1 });

    observer.observe(hero);
    return () => {
      observer.disconnect();
      isVisibleRef.current = false;
      clearTimers();
    };
  }, [clearTimers, startTiming]);

  const selectSlide = (direction) => {
    setActiveSlide((current) => (current + direction + slides.length) % slides.length);
    startTiming();
  };

  const slide = slides[activeSlide];

  return (
    <section ref={heroRef} className="hero-carousel" aria-roledescription="carousel" aria-label="Trijotech highlights">
      <div className="carousel-background" style={{ backgroundImage: `url(${slide.image.src})` }} />
      <div className="carousel-overlay" />
      <div className="content-shell carousel-content">
        <div className="carousel-heading" role="heading" aria-level="1">
          {slide.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        <button
          type="button"
          className="primary-action hero-btn-blue relative z-10 hover:z-20 transition-all duration-200"
          style={{ backgroundColor: "#257ae8d6", background: "#257ae8d6", color: "#ffffff", borderColor: "rgba(255, 255, 255, 0.35)" }}
          onClick={() => router.push("/contact")}
        >
          {slide.cta}
        </button>
      </div>
      <div className="carousel-controls" aria-label="Carousel controls">
        <button type="button" className="carousel-control prev-control" onClick={() => selectSlide(-1)} aria-label="Previous slide">&lt;</button>
        <button type="button" className="carousel-control next-control" onClick={() => selectSlide(1)} aria-label="Next slide">&gt;</button>
      </div>
    </section>
  );
}