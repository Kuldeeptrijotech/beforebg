"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   SOLUTIONS HOLO RAYS (SOLUTIONS LANDING HERO)
   Slow rotating geometric arcs, glowing product nodes, and
   gentle holographic rays of light.
   ───────────────────────────────────────────────────────────── */

export default function SolutionsHoloRays({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const nodes = [
      { xPercent: 0.65, yPercent: 0.35, radius: 45, angle: 0, speed: 0.005, color: "#29ab87" },
      { xPercent: 0.82, yPercent: 0.55, radius: 60, angle: 2, speed: -0.004, color: "#38bdf8" },
      { xPercent: 0.58, yPercent: 0.72, radius: 50, angle: 4, speed: 0.003, color: "#f5a623" },
    ];

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // ── Draw Slow Geometric Arcs & Orbiting Satellites ──
      nodes.forEach((n, idx) => {
        n.angle += n.speed;
        const cx = width * n.xPercent;
        const cy = height * n.yPercent;

        // Faint orbital ring
        ctx.save();
        ctx.strokeStyle = `${n.color}30`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(cx, cy, n.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Glowing center core
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fill();

        // Orbiting satellite dot
        const satX = cx + Math.cos(n.angle) * n.radius;
        const satY = cy + Math.sin(n.angle) * n.radius;

        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(satX, satY, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Connecting laser filament between nodes
        if (idx > 0) {
          const prev = nodes[idx - 1];
          const pcx = width * prev.xPercent;
          const pcy = height * prev.yPercent;

          ctx.strokeStyle = `${n.color}20`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(pcx, pcy);
          ctx.lineTo(cx, cy);
          ctx.stroke();
        }

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
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
