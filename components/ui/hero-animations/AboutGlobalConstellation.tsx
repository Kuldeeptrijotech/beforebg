"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   ABOUT GLOBAL CONSTELLATION (ABOUT US LANDING HERO)
   Slow, majestic interconnected constellation network &
   luminous partnership arcs representing global collaboration.
   ───────────────────────────────────────────────────────────── */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  pulsePhase: number;
}

export default function AboutGlobalConstellation({ className = "" }: { className?: string }) {
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

    const colors = ["#29ab87", "#38bdf8", "#f5a623", "#7edcc2"];
    const nodeCount = 28;
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25, // very slow drift
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 2 + 2,
        color: colors[i % colors.length],
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const maxDistance = 160;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Slow Luminous Partnership Arcs in Background
      const arcCenterX = width * 0.78;
      const arcCenterY = height * 0.45;
      const time = Date.now() * 0.0005;

      ctx.save();
      for (let r = 120; r <= 300; r += 70) {
        ctx.beginPath();
        ctx.arc(
          arcCenterX,
          arcCenterY,
          r,
          time * 0.2,
          time * 0.2 + Math.PI * 0.8
        );
        ctx.strokeStyle = "rgba(41, 171, 135, 0.08)";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(
          arcCenterX,
          arcCenterY,
          r + 20,
          -time * 0.15 + Math.PI,
          -time * 0.15 + Math.PI * 1.7
        );
        ctx.strokeStyle = "rgba(56, 189, 248, 0.06)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();

      // 2. Update & Connect Constellation Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;
        node.pulsePhase += 0.015;

        // Wrap around boundaries smoothly
        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;

        // Connect nearby nodes with glowing threads
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.28;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `${node.color}${Math.floor(alpha * 255)
              .toString(16)
              .padStart(2, "0")}`;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
          }
        }

        // Draw node with pulsating glow
        const currentRadius = node.radius + Math.sin(node.pulsePhase) * 0.8;
        ctx.save();
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 10;
        ctx.fill();

        // Subtle outer pulse ring
        const ringRadius = currentRadius * 2.2;
        const ringAlpha = (Math.sin(node.pulsePhase) * 0.5 + 0.5) * 0.25;
        ctx.beginPath();
        ctx.arc(node.x, node.y, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `${node.color}${Math.floor(ringAlpha * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();
      }

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
