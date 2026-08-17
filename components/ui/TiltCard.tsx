"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
};

/** Pointer-tracking 3D tilt card. Active only for mouse pointers; honors reduced-motion. */
export default function TiltCard({ children, className = "", max = 7, scale = 1.02 }: TiltCardProps) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const s = useMotionValue(1);

  const rotateX = useSpring(rx, { stiffness: 190, damping: 20 });
  const rotateY = useSpring(ry, { stiffness: 190, damping: 20 });
  const scaleV = useSpring(s, { stiffness: 220, damping: 22 });
  const transform = useMotionTemplate`perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scaleV})`;

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rx.set(-py * max);
    ry.set(px * max);
    s.set(scale);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
    s.set(1);
  };

  return (
    <div className={className}>
      <motion.div
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
        style={{ transform, transformStyle: "preserve-3d" }}
        className="h-full w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
