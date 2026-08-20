"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { startViewportAnimationLoop } from "@/components/ui/canvasAnimationLoop";

/* ─────────────────────────────────────────────────────────────
   CASE STUDIES VECTOR TRAILS (CASE STUDIES LANDING HERO)
   Slow, majestic ascending ROI / growth curves with soft glowing
   heads and graceful luminous tails.
   ───────────────────────────────────────────────────────────── */

interface VectorTrail {
  startPercentX: number;
  startPercentY: number;
  controlPercentX: number;
  controlPercentY: number;
  endPercentX: number;
  endPercentY: number;
  color: string;
  headProgress: number;
  speed: number;
  tailLength: number;
}

export default function CaseStudiesVectorTrails({ className = "" }: { className?: string }) {
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

    const trails: VectorTrail[] = [
      {
        startPercentX: 0.1,
        startPercentY: 0.85,
        controlPercentX: 0.55,
        controlPercentY: 0.75,
        endPercentX: 0.95,
        endPercentY: 0.25,
        color: "#29ab87",
        headProgress: 0.1,
        speed: 0.0006, // Slow, graceful ascent
        tailLength: 0.2,
      },
      {
        startPercentX: 0.2,
        startPercentY: 0.9,
        controlPercentX: 0.65,
        controlPercentY: 0.65,
        endPercentX: 0.98,
        endPercentY: 0.4,
        color: "#38bdf8",
        headProgress: 0.6,
        speed: 0.0005,
        tailLength: 0.22,
      },
    ];

    const getBezierPoint = (t: number, p0: { x: number; y: number }, p1: { x: number; y: number }, p2: { x: number; y: number }) => {
      const inv = 1 - t;
      return {
        x: inv * inv * p0.x + 2 * inv * t * p1.x + t * t * p2.x,
        y: inv * inv * p0.y + 2 * inv * t * p1.y + t * t * p2.y,
      };
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      trails.forEach((trail) => {
        trail.headProgress = (trail.headProgress + trail.speed) % 1;

        const p0 = { x: width * trail.startPercentX, y: height * trail.startPercentY };
        const p1 = { x: width * trail.controlPercentX, y: height * trail.controlPercentY };
        const p2 = { x: width * trail.endPercentX, y: height * trail.endPercentY };

        // Draw faint base guide curve
        ctx.save();
        ctx.strokeStyle = `${trail.color}15`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
        ctx.stroke();

        // Draw glowing ascending trail
        const steps = 35;
        for (let i = 0; i < steps; i++) {
          const t = trail.headProgress - (i / steps) * trail.tailLength;
          if (t < 0) continue;

          const pt = getBezierPoint(t, p0, p1, p2);
          const alpha = 1 - i / steps;

          ctx.fillStyle = trail.color;
          ctx.globalAlpha = alpha * 0.8;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, (1 - i / steps) * 2 + 0.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw Glowing Lead Head
        const headPt = getBezierPoint(trail.headProgress, p0, p1, p2);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = trail.color;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(headPt.x, headPt.y, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

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
