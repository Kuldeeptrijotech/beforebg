"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   INSIGHTS LUMINOUS STREAM (INSIGHTS HUB HERO)
   Slow, majestic sine waveforms with glowing knowledge packets,
   radiant insight pulses, and gentle ambient floating particles.
   ───────────────────────────────────────────────────────────── */

interface Wave {
  amplitude: number;
  frequency: number;
  speed: number;
  offset: number;
  color: string;
  glowColor: string;
  yPercent: number;
  packets: { pos: number; speed: number; size: number; color: string }[];
}

export default function InsightsLuminousStream({ className = "" }: { className?: string }) {
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

    const waves: Wave[] = [
      {
        amplitude: 28,
        frequency: 0.0028,
        speed: 0.0012, // Slow, gentle flow
        offset: 0,
        color: "rgba(41, 171, 135, 0.45)",
        glowColor: "rgba(41, 171, 135, 0.8)",
        yPercent: 0.35,
        packets: [
          { pos: 0.1, speed: 0.0006, size: 4, color: "#7edcc2" },
          { pos: 0.6, speed: 0.0007, size: 3.5, color: "#ffffff" },
        ],
      },
      {
        amplitude: 36,
        frequency: 0.0022,
        speed: -0.0009,
        offset: 2,
        color: "rgba(56, 189, 248, 0.4)",
        glowColor: "rgba(56, 189, 248, 0.75)",
        yPercent: 0.55,
        packets: [
          { pos: 0.25, speed: 0.0005, size: 4.5, color: "#38bdf8" },
          { pos: 0.8, speed: 0.0008, size: 3.5, color: "#ffffff" },
        ],
      },
      {
        amplitude: 32,
        frequency: 0.0032,
        speed: 0.0011,
        offset: 4,
        color: "rgba(245, 166, 35, 0.35)",
        glowColor: "rgba(245, 166, 35, 0.7)",
        yPercent: 0.72,
        packets: [
          { pos: 0.45, speed: 0.0007, size: 4, color: "#f5a623" },
        ],
      },
    ];

    // Ambient floating sparks
    const sparks = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4, // Slow drift
      vy: -Math.random() * 0.5 - 0.2,   // Gentle upward float
      size: Math.random() * 2 + 1,
      color: ["#29ab87", "#38bdf8", "#f5a623", "#ffffff"][Math.floor(Math.random() * 4)],
      alpha: Math.random() * 0.6 + 0.2,
    }));

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // ── Draw Ambient Floating Insight Sparks ──
      sparks.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        if (s.y < 0) s.y = height + 10;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;

        ctx.save();
        ctx.globalAlpha = s.alpha * (0.6 + Math.sin(time * 0.03 + s.x) * 0.4);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ── Draw Smooth Flowing Knowledge Waves ──
      waves.forEach((w) => {
        w.offset += w.speed;
        const baseY = height * w.yPercent;

        ctx.save();
        ctx.strokeStyle = w.color;
        ctx.lineWidth = 2;
        ctx.shadowColor = w.glowColor;
        ctx.shadowBlur = 12;
        ctx.beginPath();

        for (let x = 0; x <= width; x += 6) {
          const y = baseY + Math.sin(x * w.frequency + w.offset) * w.amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // ── Draw Smooth Orbiting Knowledge Packets on the Wave ──
        w.packets.forEach((p) => {
          p.pos = (p.pos + p.speed) % 1;
          const px = p.pos * width;
          const py = baseY + Math.sin(px * w.frequency + w.offset) * w.amplitude;

          // Glowing trailing tail
          ctx.save();
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 14;
          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Bright center
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(px, py, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
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
