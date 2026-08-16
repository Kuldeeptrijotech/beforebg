"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   CONTACT SIGNAL PULSE (CONTACT US LANDING HERO)
   Slow, majestic radiating communication signal rings,
   digital handshake vectors and ambient connection pulses.
   ───────────────────────────────────────────────────────────── */

interface SignalWave {
  xPercent: number;
  yPercent: number;
  radius: number;
  maxRadius: number;
  color: string;
  speed: number;
}

interface SignalBeam {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number;
  speed: number;
  color: string;
}

export default function ContactSignalPulse({ className = "" }: { className?: string }) {
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

    const waves: SignalWave[] = [
      {
        xPercent: 0.76,
        yPercent: 0.46,
        radius: 0,
        maxRadius: 260,
        color: "#29ab87", // Emerald
        speed: 0.35,
      },
      {
        xPercent: 0.76,
        yPercent: 0.46,
        radius: 80,
        maxRadius: 260,
        color: "#38bdf8", // Cyan
        speed: 0.35,
      },
      {
        xPercent: 0.76,
        yPercent: 0.46,
        radius: 160,
        maxRadius: 260,
        color: "#f5a623", // Amber
        speed: 0.35,
      },
    ];

    const beams: SignalBeam[] = [
      {
        startX: 0.76,
        startY: 0.46,
        endX: 0.95,
        endY: 0.2,
        progress: 0.1,
        speed: 0.003,
        color: "#38bdf8",
      },
      {
        startX: 0.76,
        startY: 0.46,
        endX: 0.92,
        endY: 0.78,
        progress: 0.5,
        speed: 0.0025,
        color: "#29ab87",
      },
      {
        startX: 0.76,
        startY: 0.46,
        endX: 0.58,
        endY: 0.72,
        progress: 0.8,
        speed: 0.0028,
        color: "#f5a623",
      },
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const hubX = width * 0.76;
      const hubY = height * 0.46;

      // 1. Draw Concentric Radiating Signal Waves
      waves.forEach((wave) => {
        wave.radius += wave.speed;
        if (wave.radius > wave.maxRadius) {
          wave.radius = 0;
        }

        const alpha = Math.max(0, (1 - wave.radius / wave.maxRadius) * 0.35);

        ctx.save();
        ctx.beginPath();
        ctx.arc(hubX, hubY, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${wave.color}${Math.floor(alpha * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = wave.color;
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.restore();
      });

      // 2. Draw Connection Vectors & Digital Beams
      beams.forEach((beam) => {
        beam.progress = (beam.progress + beam.speed) % 1;

        const targetX = width * beam.endX;
        const targetY = height * beam.endY;

        // Vector line
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(hubX, hubY);
        ctx.lineTo(targetX, targetY);
        ctx.strokeStyle = `${beam.color}20`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Traveling pulse bullet
        const curX = hubX + (targetX - hubX) * beam.progress;
        const curY = hubY + (targetY - hubY) * beam.progress;

        ctx.beginPath();
        ctx.arc(curX, curY, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = beam.color;
        ctx.shadowBlur = 12;
        ctx.fill();

        // Endpoint node
        ctx.beginPath();
        ctx.arc(targetX, targetY, 4, 0, Math.PI * 2);
        ctx.fillStyle = beam.color;
        ctx.shadowColor = beam.color;
        ctx.shadowBlur = 10;
        ctx.fill();

        ctx.restore();
      });

      // 3. Central Hub Glowing Beacon
      ctx.save();
      ctx.beginPath();
      ctx.arc(hubX, hubY, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 20;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(hubX, hubY, 16, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(41, 171, 135, 0.5)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
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
