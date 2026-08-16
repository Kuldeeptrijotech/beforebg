"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   VIDEOS BROADCAST BEAMS (VIDEOS LANDING HERO ANIMATION)
   Slow, majestic harmonic audio/video frequency waves with
   luminous projector beams and pulsing ambient broadcast nodes.
   ───────────────────────────────────────────────────────────── */

interface WaveRibbon {
  amplitude: number;
  frequency: number;
  speed: number;
  color: string;
  phase: number;
  yPercent: number;
  lineWidth: number;
}

interface PulseNode {
  xPercent: number;
  yPercent: number;
  radius: number;
  maxRadius: number;
  color: string;
  alpha: number;
  speed: number;
}

export default function VideosBroadcastBeams({ className = "" }: { className?: string }) {
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

    // Harmonic wave ribbons
    const ribbons: WaveRibbon[] = [
      {
        amplitude: 38,
        frequency: 0.0018,
        speed: 0.004,
        color: "#38bdf8", // Cyan
        phase: 0,
        yPercent: 0.42,
        lineWidth: 2,
      },
      {
        amplitude: 45,
        frequency: 0.0014,
        speed: 0.003,
        color: "#29ab87", // Emerald
        phase: Math.PI / 3,
        yPercent: 0.55,
        lineWidth: 2.2,
      },
      {
        amplitude: 30,
        frequency: 0.0022,
        speed: 0.005,
        color: "#f5a623", // Amber / Gold
        phase: Math.PI / 1.5,
        yPercent: 0.68,
        lineWidth: 1.6,
      },
    ];

    // Pulsing broadcast play nodes
    const nodes: PulseNode[] = [
      {
        xPercent: 0.72,
        yPercent: 0.38,
        radius: 0,
        maxRadius: 65,
        color: "#38bdf8",
        alpha: 0.6,
        speed: 0.35,
      },
      {
        xPercent: 0.85,
        yPercent: 0.58,
        radius: 20,
        maxRadius: 80,
        color: "#29ab87",
        alpha: 0.5,
        speed: 0.3,
      },
      {
        xPercent: 0.64,
        yPercent: 0.75,
        radius: 10,
        maxRadius: 55,
        color: "#f5a623",
        alpha: 0.45,
        speed: 0.4,
      },
    ];

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 1;

      // 1. Draw Slow Luminous Projector Beam Cones
      const beamCenterX = width * 0.82;
      const beamCenterY = height * 0.15;
      
      const beamGrad = ctx.createRadialGradient(
        beamCenterX,
        beamCenterY,
        10,
        beamCenterX,
        beamCenterY,
        width * 0.75
      );
      beamGrad.addColorStop(0, "rgba(56, 189, 248, 0.12)");
      beamGrad.addColorStop(0.4, "rgba(41, 171, 135, 0.06)");
      beamGrad.addColorStop(1, "rgba(3, 7, 19, 0)");

      ctx.save();
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(beamCenterX - 60, 0);
      ctx.lineTo(beamCenterX + 60, 0);
      ctx.lineTo(width * 0.98, height);
      ctx.lineTo(width * 0.4, height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // 2. Draw Harmonic Frequency Wave Ribbons
      ribbons.forEach((ribbon) => {
        ribbon.phase += ribbon.speed;
        const baseY = height * ribbon.yPercent;

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = ribbon.color;
        ctx.lineWidth = ribbon.lineWidth;
        ctx.shadowColor = ribbon.color;
        ctx.shadowBlur = 12;

        for (let x = 0; x <= width; x += 6) {
          const y =
            baseY +
            Math.sin(x * ribbon.frequency + ribbon.phase) * ribbon.amplitude +
            Math.cos((x + time) * (ribbon.frequency * 0.6)) * (ribbon.amplitude * 0.35);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        // Subtle gradient under-wave fill
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        const fillGrad = ctx.createLinearGradient(0, baseY - ribbon.amplitude, 0, height);
        fillGrad.addColorStop(0, `${ribbon.color}15`);
        fillGrad.addColorStop(0.5, `${ribbon.color}05`);
        fillGrad.addColorStop(1, "transparent");
        ctx.fillStyle = fillGrad;
        ctx.fill();

        ctx.restore();
      });

      // 3. Draw Pulsing Broadcast Nodes (Expanding Rings)
      nodes.forEach((node) => {
        const cx = width * node.xPercent;
        const cy = height * node.yPercent;

        node.radius += node.speed;
        if (node.radius > node.maxRadius) {
          node.radius = 0;
        }

        const progress = node.radius / node.maxRadius;
        const currentAlpha = node.alpha * (1 - progress);

        // Outer expanding ripple
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, node.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${node.color}${Math.floor(currentAlpha * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 10;
        ctx.stroke();

        // Secondary ripple
        const subRadius = (node.radius + node.maxRadius * 0.5) % node.maxRadius;
        const subProgress = subRadius / node.maxRadius;
        const subAlpha = node.alpha * 0.7 * (1 - subProgress);
        ctx.beginPath();
        ctx.arc(cx, cy, subRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `${node.color}${Math.floor(subAlpha * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Glowing center dot
        ctx.beginPath();
        ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.restore();
      });

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
