"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   SERVICES CONDUIT STREAM (SERVICES LANDING HERO)
   Slow, elegant glowing circuit grid traces, branching bus lines,
   and gentle traveling energy pulses.
   ───────────────────────────────────────────────────────────── */

interface BusLine {
  startX: number;
  startY: number;
  segments: { dx: number; dy: number }[];
  color: string;
  glow: string;
  pulses: { progress: number; speed: number; size: number }[];
}

export default function ServicesConduitStream({ className = "" }: { className?: string }) {
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

    // Create 4 slow branching bus conduits
    const busLines: BusLine[] = [
      {
        startX: 0,
        startY: height * 0.28,
        segments: [
          { dx: width * 0.35, dy: 0 },
          { dx: width * 0.15, dy: 45 },
          { dx: width * 0.55, dy: 0 },
        ],
        color: "rgba(41, 171, 135, 0.35)",
        glow: "#29ab87",
        pulses: [
          { progress: 0.1, speed: 0.0008, size: 3.5 },
          { progress: 0.6, speed: 0.0007, size: 4 },
        ],
      },
      {
        startX: 0,
        startY: height * 0.48,
        segments: [
          { dx: width * 0.25, dy: 0 },
          { dx: width * 0.2, dy: -35 },
          { dx: width * 0.6, dy: 0 },
        ],
        color: "rgba(56, 189, 248, 0.35)",
        glow: "#38bdf8",
        pulses: [
          { progress: 0.3, speed: 0.0006, size: 4 },
          { progress: 0.85, speed: 0.0009, size: 3.5 },
        ],
      },
      {
        startX: 0,
        startY: height * 0.68,
        segments: [
          { dx: width * 0.4, dy: 0 },
          { dx: width * 0.15, dy: 30 },
          { dx: width * 0.5, dy: 0 },
        ],
        color: "rgba(245, 166, 35, 0.3)",
        glow: "#f5a623",
        pulses: [
          { progress: 0.2, speed: 0.0007, size: 3.8 },
          { progress: 0.75, speed: 0.0008, size: 3.2 },
        ],
      },
    ];

    const getPointAlongBus = (bus: BusLine, progress: number) => {
      let totalLength = 0;
      bus.segments.forEach((s) => (totalLength += Math.hypot(s.dx, s.dy)));

      let targetDist = progress * totalLength;
      let currentX = bus.startX;
      let currentY = bus.startY;

      for (const s of bus.segments) {
        const segLen = Math.hypot(s.dx, s.dy);
        if (targetDist <= segLen) {
          const ratio = targetDist / segLen;
          return {
            x: currentX + s.dx * ratio,
            y: currentY + s.dy * ratio,
          };
        }
        targetDist -= segLen;
        currentX += s.dx;
        currentY += s.dy;
      }
      return { x: currentX, y: currentY };
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      busLines.forEach((bus) => {
        // Draw Circuit Line
        ctx.save();
        ctx.strokeStyle = bus.color;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = bus.glow;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(bus.startX, bus.startY);

        let currX = bus.startX;
        let currY = bus.startY;
        bus.segments.forEach((s) => {
          currX += s.dx;
          currY += s.dy;
          ctx.lineTo(currX, currY);
        });
        ctx.stroke();

        // Draw Junction Nodes
        let nodeX = bus.startX;
        let nodeY = bus.startY;
        bus.segments.forEach((s) => {
          nodeX += s.dx;
          nodeY += s.dy;
          ctx.fillStyle = bus.glow;
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, 2.5, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw Slow Flowing Energy Pulses
        bus.pulses.forEach((p) => {
          p.progress = (p.progress + p.speed) % 1;
          const pos = getPointAlongBus(bus, p.progress);

          ctx.fillStyle = bus.glow;
          ctx.shadowColor = bus.glow;
          ctx.shadowBlur = 14;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        });

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
