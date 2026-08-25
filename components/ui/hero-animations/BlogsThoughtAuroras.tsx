"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { startViewportAnimationLoop } from "@/components/ui/canvasAnimationLoop";

/* ─────────────────────────────────────────────────────────────
   BLOGS THOUGHT AURORAS (BLOGS LANDING HERO)
   Slow drifting thought particles and soft undulating aurora
   light curtains in emerald and cyan.
   ───────────────────────────────────────────────────────────── */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

export default function BlogsThoughtAuroras({ className = "" }: { className?: string }) {
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

    const particles: Particle[] = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3, // Gentle slow drift
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2.5 + 1.2,
      color: ["#ffffff", "#38bdf8", "#ffffff", "#ffffff"][Math.floor(Math.random() * 4)],
      alpha: Math.random() * 0.5 + 0.3,
    }));

    let time = 0;

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // ── Draw Slow Floating Particles with subtle connections ──
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        ctx.save();
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = p1.alpha * (0.7 + Math.sin(time * 2 + i) * 0.3);
        ctx.shadowColor = p1.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Connect nearby thought particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 120) {
            ctx.save();
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = (1 - dist / 120) * 0.15;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

    };

    const stopAnimation = startViewportAnimationLoop(canvas, render);

    return () => {
      stopAnimation();
      window.removeEventListener("resize", handleResize);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-10 h-full w-full ${className}`}
    />
  );
}
