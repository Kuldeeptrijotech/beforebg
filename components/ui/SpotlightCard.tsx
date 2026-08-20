"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  glow?: string;
  radius?: number;
};

type SpotlightStyle = CSSProperties & {
  "--spotlight-x": string;
  "--spotlight-y": string;
  "--spotlight-radius": string;
  "--spotlight-glow": string;
};

/** Card with a radial spotlight that follows the cursor without React rerenders. */
export default function SpotlightCard({
  children,
  className = "",
  glow = "rgba(41,171,135,0.16)",
  radius = 440,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const pointerRef = useRef({ x: -9999, y: -9999 });

  const updateSpotlight = () => {
    frameRef.current = 0;
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--spotlight-x", `${pointerRef.current.x}px`);
    card.style.setProperty("--spotlight-y", `${pointerRef.current.y}px`);
  };

  const scheduleSpotlight = () => {
    if (!frameRef.current) frameRef.current = window.requestAnimationFrame(updateSpotlight);
  };

  useEffect(() => () => window.cancelAnimationFrame(frameRef.current), []);

  return (
    <div
      ref={cardRef}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointerRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
        scheduleSpotlight();
      }}
      onPointerLeave={() => {
        pointerRef.current = { x: -9999, y: -9999 };
        scheduleSpotlight();
      }}
      className={`group relative overflow-hidden ${className}`}
      style={{
        "--spotlight-x": "-9999px",
        "--spotlight-y": "-9999px",
        "--spotlight-radius": `${radius}px`,
        "--spotlight-glow": glow,
      } as SpotlightStyle}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(var(--spotlight-radius) circle at var(--spotlight-x) var(--spotlight-y), var(--spotlight-glow), transparent 70%)",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}