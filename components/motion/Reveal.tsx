"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  margin?: string;
};

/** Fade + rise into view */
export function Reveal({ children, className, delay = 0, duration = 0.65, once = true, margin = "-60px" }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Fade + blur + rise into view */
export function BlurReveal({ children, className, delay = 0, duration = 0.75, once = true, margin = "-60px" }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type SlideRevealProps = RevealProps & { direction?: "left" | "right" | "up" | "down"; distance?: number };

/** Directional slide reveal */
export function SlideReveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  once = true,
  margin = "-80px",
  direction = "left",
  distance = 48,
}: SlideRevealProps) {
  const offsets = {
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
  };
  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Scale + fade reveal */
export function ScaleReveal({ children, className, delay = 0, duration = 0.6, once = true, margin = "-80px" }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/** Staggered reveal container — pair children with <StaggerRevealItem> */
export function StaggerReveal({
  children,
  className,
  stagger = 0.09,
  once = true,
  margin = "-40px",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
  margin?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      custom={stagger}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerRevealItem({
  children,
  className,
  variant = "item",
}: {
  children: ReactNode;
  className?: string;
  variant?: "item" | "fadeIn" | "slideLeft" | "slideRight" | "scale";
}) {
  const extraVariants: Record<string, Variants> = {
    item: itemVariants,
    fadeIn: {
      hidden: { opacity: 0, y: 18 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    },
    slideLeft: {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
    },
    slideRight: {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.92 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
    },
  };
  return (
    <motion.div variants={extraVariants[variant]} className={className}>
      {children}
    </motion.div>
  );
}

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
};

/** Subtle vertical parallax driven by scroll position. Disabled for reduced-motion. */
export function ParallaxSection({ children, className, speed = 0.12 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80 * speed, -80 * speed]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

type MouseParallaxProps = {
  children: ReactNode;
  className?: string;
  depth?: number;
};

/** Mouse-tracking parallax wrapper — layers move with the pointer (desktop pointer only). */
export function MouseParallax({ children, className, depth = 12 }: MouseParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--px", String(nx * depth));
    el.style.setProperty("--py", String(ny * depth));
  };

  return (
    <div ref={ref} onPointerMove={onPointerMove} className={`[perspective:1200px] ${className ?? ""}`}>
      <div style={{ transform: "translate3d(calc(var(--px, 0) * 1px), calc(var(--py, 0) * 1px), 0)" }} className="h-full w-full">
        {children}
      </div>
    </div>
  );
}

/** Runs a callback once when its subtree scrolls into view. */
export function InViewOnce({
  children,
  className,
  onInView,
}: {
  children: ReactNode;
  className?: string;
  onInView?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  if (inView) onInView?.();
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
