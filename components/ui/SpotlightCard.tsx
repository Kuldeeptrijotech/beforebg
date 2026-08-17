"use client";

import { useState, type ReactNode } from "react";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  glow?: string;
  radius?: number;
};

/** Card with a radial spotlight that follows the cursor. */
export default function SpotlightCard({
  children,
  className = "",
  glow = "rgba(41,171,135,0.16)",
  radius = 440,
}: SpotlightCardProps) {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });

  return (
    <div
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onPointerLeave={() => setPos({ x: -9999, y: -9999 })}
      className={`group relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px, ${glow}, transparent 70%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
