"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { startViewportAnimationLoop } from "@/components/ui/canvasAnimationLoop";

/* ─────────────────────────────────────────────────────────────
   CAREERS ASCENT STREAM (CAREERS LANDING HERO)
   Slow, majestic ascending career milestones & luminous talent
   elevation streams with soft glowing beacon nodes.
   ───────────────────────────────────────────────────────────── */

interface AscentRay {
  xPercent: number;
  y: number;
  length: number;
  speed: number;
  color: string;
  width: number;
}

interface MilestoneOrb {
  xPercent: number;
  yPercent: number;
  radius: number;
  color: string;
  pulsePhase: number;
}

export default function CareersAscentStream({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const colors = ["#29ab87", "#38bdf8", "#f5a623", "#7edcc2"];

    const rays: AscentRay[] = Array.from({ length: 9 }, (_, i) => ({
      xPercent: 0.6 + (i * 0.045),
      y: Math.random() * height,
      length: 90 + Math.random() * 120,
      speed: 0.4 + Math.random() * 0.35, // slow ascent
      color: colors[i % colors.length],
      width: 1 + Math.random() * 1.5,
    }));

    const orbs: MilestoneOrb[] = [
      { xPercent: 0.72, yPercent: 0.35, radius: 4, color: "#29ab87", pulsePhase: 0 },
      { xPercent: 0.84, yPercent: 0.52, radius: 5, color: "#38bdf8", pulsePhase: Math.PI / 2 },
      { xPercent: 0.68, yPercent: 0.68, radius: 3.5, color: "#f5a623", pulsePhase: Math.PI },
      { xPercent: 0.9, yPercent: 0.28, radius: 4.5, color: "#7edcc2", pulsePhase: Math.PI * 1.5 },
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Ascending Rays
      rays.forEach((ray) => {
        ray.y -= ray.speed;
        if (ray.y + ray.length < 0) {
          ray.y = height + 20;
        }

        const x = width * ray.xPercent;
        const grad = ctx.createLinearGradient(x, ray.y + ray.length, x, ray.y);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.7, `${ray.color}45`);
        grad.addColorStop(1, ray.color);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, ray.y + ray.length);
        ctx.lineTo(x, ray.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = ray.width;
        ctx.shadowColor = ray.color;
        ctx.shadowBlur = 10;
        ctx.stroke();

        // Tip spark
        ctx.beginPath();
        ctx.arc(x, ray.y, ray.width * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.restore();
      });

      // 2. Draw Milestone Orbs
      orbs.forEach((orb) => {
        orb.pulsePhase += 0.02;
        const cx = width * orb.xPercent;
        const cy = height * orb.yPercent;

        const currentRadius = orb.radius + Math.sin(orb.pulsePhase) * 0.8;
        const ringRadius = currentRadius * 2.8;
        const ringAlpha = (Math.sin(orb.pulsePhase) * 0.5 + 0.5) * 0.35;

        ctx.save();
        // Outer ring
        ctx.beginPath();
        ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `${orb.color}${Math.floor(ringAlpha * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Core orb
        ctx.beginPath();
        ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = orb.color;
        ctx.shadowColor = orb.color;
        ctx.shadowBlur = 14;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(cx, cy, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.restore();
      });

    };

    const stopAnimation = startViewportAnimationLoop(canvas, render);

    return () => {
      window.removeEventListener("resize", handleResize);
      stopAnimation();
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-85 ${className}`}
    />
  );
}
