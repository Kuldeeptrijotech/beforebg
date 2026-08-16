"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export const variants = {
  container: containerVariants,
  item: itemVariants,
  fadeIn: fadeInVariants,
  slideLeft: slideLeftVariants,
  slideRight: slideRightVariants,
  scale: scaleVariants,
};

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fadeIn" | "slideLeft" | "slideRight" | "scale" | "item";
  once?: boolean;
  margin?: string;
};

/** Single animated element — fades + slides in when scrolled into view */
export function AnimatedDiv({
  children,
  className,
  delay = 0,
  variant = "fadeIn",
  once = true,
  margin = "-80px",
}: Props) {
  const chosen = variants[variant];
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={{
        ...chosen,
        visible: {
          ...(chosen.visible as object),
          transition: {
            ...(typeof chosen.visible === "object" && "transition" in chosen.visible
              ? (chosen.visible.transition as object)
              : {}),
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container — children animate in one-by-one */
export function StaggerContainer({
  children,
  className,
  once = true,
  margin = "-60px",
  stagger = 0.1,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
  margin?: string;
  stagger?: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Stagger child item */
export function StaggerItem({
  children,
  className,
  variant = "item",
}: {
  children: ReactNode;
  className?: string;
  variant?: "item" | "fadeIn" | "slideLeft" | "slideRight" | "scale";
}) {
  return (
    <motion.div variants={variants[variant]} className={className}>
      {children}
    </motion.div>
  );
}
