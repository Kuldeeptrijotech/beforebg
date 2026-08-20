"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { startViewportAnimationLoop } from "@/components/ui/canvasAnimationLoop";

/* ─────────────────────────────────────────────────────────────
   HERO LASER BULLETS — HIGH-SPEED UNATCHABLE PHOTON TRACERS
   Ultra-fast luminous laser bullets with elongated glowing tails,
   kinetic spark bursts, and enterprise multi-color trajectories.
   ───────────────────────────────────────────────────────────── */

interface Bullet {
  x: number;
  y: number;
  length: number;
  speed: number;
  width: number;
  angle: number; // in radians
  color: string;
  glowColor: string;
  headColor: string;
  opacity: number;
  sparkCooldown: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  life: number;
}

const BULLET_COLORS = [
  { main: "#29ab87", glow: "rgba(41, 171, 135, 0.8)", head: "#ffffff" }, // Mint/Emerald
  { main: "#38bdf8", glow: "rgba(56, 189, 248, 0.8)", head: "#ffffff" }, // Cyan
  { main: "#f5a623", glow: "rgba(245, 166, 35, 0.8)", head: "#ffffff" }, // Amber/Gold
  { main: "#7edcc2", glow: "rgba(126, 220, 194, 0.9)", head: "#ffffff" }, // Light Mint
  { main: "#22d3ee", glow: "rgba(34, 211, 238, 0.85)", head: "#ffffff" }, // Electric Blue
];

export default function HeroLaserBullets({
  className = "",
  bulletCount = 7,
}: {
  className?: string;
  bulletCount?: number;
}) {
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

    const bullets: Bullet[] = [];
    const sparks: Spark[] = [];

    const spawnBullet = (forceX?: number): Bullet => {
      const palette = BULLET_COLORS[Math.floor(Math.random() * BULLET_COLORS.length)];
      // Slight diagonal tilt (-6 deg to +6 deg)
      const angle = (Math.random() * 12 - 6) * (Math.PI / 180);
      
      return {
        x: forceX !== undefined ? forceX : -Math.random() * 400 - 100,
        y: Math.random() * (height * 0.9) + height * 0.05,
        length: Math.random() * 180 + 120, // 120px to 300px long tail
        speed: Math.random() * 32 + 28,     // Ultra-fast uncatchable speed (28-60px per frame at 60fps)
        width: Math.random() * 2 + 1.8,    // 1.8px - 3.8px core thickness
        angle,
        color: palette.main,
        glowColor: palette.glow,
        headColor: palette.head,
        opacity: Math.random() * 0.4 + 0.6,
        sparkCooldown: 0,
      };
    };

    // Initialize bullets staggered across the screen
    for (let i = 0; i < bulletCount; i++) {
      bullets.push(spawnBullet(Math.random() * width));
    }

    const createSparks = (x: number, y: number, color: string) => {
      const sparkCount = Math.floor(Math.random() * 4) + 3;
      for (let i = 0; i < sparkCount; i++) {
        const speed = Math.random() * 5 + 2;
        const angle = Math.random() * Math.PI * 2;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed - 4, // Trail backwards
          vy: Math.sin(angle) * speed * 0.6,
          radius: Math.random() * 1.5 + 0.8,
          color,
          alpha: 1,
          life: 1,
        });
      }
    };

    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = (time - lastTime) / 16.66; // Normalize to 60fps
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // ── Update & Draw Sparks ──
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx * delta;
        s.y += s.vy * delta;
        s.life -= 0.045 * delta;
        s.alpha = Math.max(0, s.life);

        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ── Update & Draw Fast Laser Bullets ──
      bullets.forEach((b) => {
        const vx = Math.cos(b.angle) * b.speed * delta;
        const vy = Math.sin(b.angle) * b.speed * delta;

        b.x += vx;
        b.y += vy;

        // Tail coordinates
        const tailX = b.x - Math.cos(b.angle) * b.length;
        const tailY = b.y - Math.sin(b.angle) * b.length;

        // Periodic micro spark emission
        b.sparkCooldown += delta;
        if (b.sparkCooldown > 6 && Math.random() > 0.4) {
          b.sparkCooldown = 0;
          createSparks(b.x, b.y, b.color);
        }

        // Draw Laser Tracer Gradient Tail
        ctx.save();
        ctx.globalAlpha = b.opacity;

        const grad = ctx.createLinearGradient(tailX, tailY, b.x, b.y);
        grad.addColorStop(0, "rgba(255, 255, 255, 0)");
        grad.addColorStop(0.3, b.glowColor.replace("0.8", "0.2"));
        grad.addColorStop(0.7, b.color);
        grad.addColorStop(1, b.headColor);

        // Outer Glow Bloom
        ctx.shadowColor = b.glowColor;
        ctx.shadowBlur = 18;
        ctx.lineWidth = b.width * 2.2;
        ctx.strokeStyle = grad;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

        // Inner Sharp Photon Core
        ctx.shadowBlur = 6;
        ctx.lineWidth = b.width;
        ctx.strokeStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(b.x - Math.cos(b.angle) * (b.length * 0.25), b.y - Math.sin(b.angle) * (b.length * 0.25));
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

        // Super-bright bullet head particle
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.width * 1.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Recycle bullet when it leaves the viewport
        if (b.x - b.length > width + 100 || b.y < -100 || b.y > height + 100) {
          Object.assign(b, spawnBullet(-Math.random() * 300 - 150));
        }
      });

    };

    const stopAnimation = startViewportAnimationLoop(canvas, (time, resumed) => {
      if (resumed) lastTime = time;
      render(time);
    });

    return () => {
      stopAnimation();
      window.removeEventListener("resize", handleResize);
    };
  }, [reduce, bulletCount]);

  if (reduce) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-10 h-full w-full ${className}`}
    />
  );
}
