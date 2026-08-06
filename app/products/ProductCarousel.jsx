"use client";

import { useEffect, useRef, useState } from "react";

export default function ProductCarousel({ images }) {
    const [current, setCurrent] = useState(0);
    const timerRef = useRef(null);

    const goTo = (index) => {
        setCurrent((index + images.length) % images.length);
    };

    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);

    useEffect(() => {
        timerRef.current = setInterval(next, 3000);
        return () => clearInterval(timerRef.current);
    }, [current, images.length]);

    return (
        <div className="hbc-carousel">
            <div className="hbc-carousel-viewport">
                <div
                    className="hbc-carousel-track"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {images.map((img, i) => (
                        <div className="hbc-carousel-slide" key={i}>
                            <img
                                src={img.src}
                                className="d-block w-100 slider-img"
                                alt={`Slide ${i + 1}`}
                            />
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    className="hbc-carousel-control hbc-prev"
                    onClick={prev}
                    aria-label="Previous slide"
                >
                    <span>‹</span>
                </button>
                <button
                    type="button"
                    className="hbc-carousel-control hbc-next"
                    onClick={next}
                    aria-label="Next slide"
                >
                    <span>›</span>
                </button>
            </div>
        </div>
    );
}
