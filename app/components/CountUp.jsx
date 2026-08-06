"use client";

import { useEffect, useRef, useState } from "react";

export default function CountUp({ end, suffix = "+", duration = 1500 }) {
    const [value, setValue] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const animate = () => {
            if (started.current) return;
            started.current = true;

            const startTime = performance.now();
            const tick = (now) => {
                const progress = Math.min((now - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setValue(Math.round(eased * end));
                if (progress < 1) {
                    requestAnimationFrame(tick);
                }
            };
            requestAnimationFrame(tick);
        };
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    animate();
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(el);
        const fallback = window.setTimeout(animate, 800);

        return () => {
            observer.disconnect();
            window.clearTimeout(fallback);
        };
    }, [end, duration]);

    return (
        <span ref={ref} className="count-digit">
            {value}
            <span className="count-plus">{suffix}</span>
        </span>
    );
}
