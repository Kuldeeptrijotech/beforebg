"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Blocks,
  Braces,
  Building2,
  Cpu,
  Database,
  MonitorSmartphone,
  Workflow,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   SAP BTP — 3D CONSTELLATION ORBIT SYSTEM
   ───────────────────────────────────────────────────────────── */

type Layer = {
  label: string;
  sub: string;
  icon: LucideIcon;
  tint: string;
  edge: string;
  glow: string;
};

const LAYERS: Layer[] = [
  { label: "User Experience / Fiori", sub: "Launchpad · responsive UX · mobile", icon: MonitorSmartphone, tint: "rgba(34,211,238,0.14)", edge: "#22d3ee", glow: "rgba(34,211,238,0.35)" },
  { label: "Application Layer", sub: "UI5 · web components · workflows", icon: Blocks, tint: "rgba(47,143,255,0.15)", edge: "#38bdf8", glow: "rgba(47,143,255,0.35)" },
  { label: "CAP / Services", sub: "Domain services · business logic", icon: Braces, tint: "rgba(10,110,209,0.2)", edge: "#2f8fff", glow: "rgba(47,143,255,0.4)" },
  { label: "SAP BTP Core", sub: "Runtime · extensibility · security", icon: Cpu, tint: "rgba(0,112,242,0.26)", edge: "#0a6ed1", glow: "rgba(10,110,209,0.5)" },
  { label: "Integration Suite", sub: "APIs · events · connectors", icon: Workflow, tint: "rgba(139,124,246,0.18)", edge: "#8b7cf6", glow: "rgba(139,124,246,0.35)" },
  { label: "HANA / Data", sub: "Database · data lake · analytics", icon: Database, tint: "rgba(103,232,249,0.15)", edge: "#67e8f9", glow: "rgba(103,232,249,0.35)" },
  { label: "SAP / External Systems", sub: "S/4HANA · third-party · cloud", icon: Building2, tint: "rgba(255,255,255,0.05)", edge: "rgba(255,255,255,0.4)", glow: "rgba(255,255,255,0.2)" },
];

const LAYER_SPECS = [
  {
    tech: "UI5 · Fiori Elements · TypeScript",
    points: [
      "Role-based Fiori launchpad experiences",
      "Dynamic cards, charts, and table elements",
      "Offline-capable mobile apps with Swift/Kotlin",
      "Standard and custom CSS variables styling"
    ]
  },
  {
    tech: "Business Application Studio · BAS Workflows",
    points: [
      "Cross-service workflow orchestrations",
      "Custom task approvals and inbox integrations",
      "Low-code cloud apps via SAP Build Apps",
      "Pro-code full stack developer tooling"
    ]
  },
  {
    tech: "CAP (Node.js/Java) · RAP (ABAP) · CDS",
    points: [
      "Clean OData V4 and GraphQL service layers",
      "Schema-based Core Data Services models",
      "Built-in draft handling and transaction loops",
      "Extensible business event handlers"
    ]
  },
  {
    tech: "Cloud Foundry · Kyma (Kubernetes) · IAS",
    points: [
      "Secure enterprise identity integrations (IAS/IPS)",
      "Kyma serverless and containerized services",
      "Scalable multi-tenant subscription runtimes",
      "Autoscaling based on load and memory profiles"
    ]
  },
  {
    tech: "Cloud Integration (CPI) · Event Mesh · APIs",
    points: [
      "Prebuilt integration packs for SAP S/4HANA",
      "Asynchronous event handling with Event Mesh",
      "Comprehensive REST/SOAP API management",
      "Secure B2B and government connectivity adapters"
    ]
  },
  {
    tech: "HANA Cloud · Data Sphere · Analytics Cloud (SAC)",
    points: [
      "In-memory column database speeds",
      "Federated views across cloud and on-premise",
      "Unified story reporting directly inside apps",
      "Advanced predictive and planning modeling"
    ]
  },
  {
    tech: "S/4HANA Cloud · SuccessFactors · External APIs",
    points: [
      "Clean-core side-by-side extensions",
      "Real-time eventing via enterprise hooks",
      "Secure principal propagation via connectivity",
      "RFC and BAPI standard integration endpoints"
    ]
  }
];

const ORBIT_RADII = [160, 200, 240, 0, 280, 320, 360];
const ORBIT_SPEEDS = [0.015, -0.012, 0.010, 0, -0.008, 0.007, -0.006];
const ORBIT_PHASES = [0, 1.2, 2.4, 0, 3.6, 4.8, 5.5];
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export default function BtpExplodedLayers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const angleX = useRef(-0.5);
  const angleY = useRef(0.6);
  const isDragging = useRef(false);
  const startPointer = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: -0.5, y: 0.6 });

  const [coords, setCoords] = useState<{ x: number; y: number; scale: number; z: number }[]>(
    LAYERS.map(() => ({ x: 0, y: 0, scale: 1, z: 0 }))
  );

  const activeIndex = selected !== null ? selected : hovered;
  const isLocked = selected !== null;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      canvas.width = rect?.width || 800;
      canvas.height = rect?.height || 600;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; z: number; progress: number; speed: number; layer: number }[] = [];

    const loop = () => {
      time += 0.01;
      animId = requestAnimationFrame(loop);

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      if (!isDragging.current) {
        targetRotation.current.y += 0.001;
      }
      angleX.current += (targetRotation.current.x - angleX.current) * 0.1;
      angleY.current += (targetRotation.current.y - angleY.current) * 0.1;

      const cosX = Math.cos(angleX.current);
      const sinX = Math.sin(angleX.current);
      const cosY = Math.cos(angleY.current);
      const sinY = Math.sin(angleY.current);

      const rotate3D = (px: number, py: number, pz: number) => {
        const x1 = px * cosY - pz * sinY;
        const z1 = px * sinY + pz * cosY;
        const y2 = py * cosX - z1 * sinX;
        const z2 = py * sinX + pz * cosX;
        return { x: x1, y: y2, z: z2 };
      };

      const perspective = 800;
      const newCoords = LAYERS.map((_, i) => {
        if (i === 3) {
          const rot = rotate3D(0, 0, 0);
          const scale = perspective / (perspective + rot.z);
          return {
            x: centerX + rot.x * scale,
            y: centerY + rot.y * scale,
            scale,
            z: rot.z,
          };
        }

        const rad = ORBIT_RADII[i];
        const theta = time * ORBIT_SPEEDS[i] * 60 + ORBIT_PHASES[i];
        const ox = Math.cos(theta) * rad;
        const oz = Math.sin(theta) * rad;
        const oy = Math.sin(theta * 1.5) * (rad * 0.15);

        const rot = rotate3D(ox, oy, oz);
        const scale = perspective / (perspective + rot.z);

        return {
          x: centerX + rot.x * scale,
          y: centerY + rot.y * scale,
          scale,
          z: rot.z,
        };
      });

      setCoords(newCoords);

      ctx.lineWidth = 1;
      LAYERS.forEach((_, i) => {
        if (i === 3) return;
        const rad = ORBIT_RADII[i];
        ctx.beginPath();
        const segments = 60;
        for (let j = 0; j <= segments; j++) {
          const theta = (j / segments) * Math.PI * 2;
          const ox = Math.cos(theta) * rad;
          const oz = Math.sin(theta) * rad;
          const oy = Math.sin(theta * 1.5) * (rad * 0.15);

          const rot = rotate3D(ox, oy, oz);
          const scale = perspective / (perspective + rot.z);
          const sx = centerX + rot.x * scale;
          const sy = centerY + rot.y * scale;

          if (j === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = activeIndex === i ? "rgba(41,171,135,0.22)" : "rgba(255,255,255,0.04)";
        ctx.stroke();
      });

      const core = newCoords[3];
      newCoords.forEach((node, i) => {
        if (i === 3) return;
        ctx.beginPath();
        ctx.moveTo(core.x, core.y);
        ctx.lineTo(node.x, node.y);
        ctx.strokeStyle = activeIndex === i
          ? `rgba(41, 171, 135, ${0.12 + Math.max(0, 1 - node.z / 600) * 0.28})`
          : "rgba(255,255,255,0.03)";
        ctx.lineWidth = activeIndex === i ? 2 : 1;
        ctx.stroke();
      });

      if (Math.random() < 0.08) {
        const targetLayer = Math.floor(Math.random() * LAYERS.length);
        if (targetLayer !== 3) {
          particles.push({
            x: 0,
            y: 0,
            z: 0,
            progress: 0,
            speed: 0.015 + Math.random() * 0.01,
            layer: targetLayer,
          });
        }
      }

      ctx.lineWidth = 1;
      for (let j = particles.length - 1; j >= 0; j--) {
        const p = particles[j];
        p.progress += p.speed;

        if (p.progress >= 1) {
          particles.splice(j, 1);
          continue;
        }

        const targetRadius = ORBIT_RADII[p.layer];
        const theta = time * ORBIT_SPEEDS[p.layer] * 60 + ORBIT_PHASES[p.layer];
        const targetX = Math.cos(theta) * targetRadius * p.progress;
        const targetZ = Math.sin(theta) * targetRadius * p.progress;
        const targetY = Math.sin(theta * 1.5) * (targetRadius * 0.15) * p.progress;

        const rot = rotate3D(targetX, targetY, targetZ);
        const scale = perspective / (perspective + rot.z);
        const sx = centerX + rot.x * scale;
        const sy = centerY + rot.y * scale;

        const color = LAYERS[p.layer].edge;
        ctx.beginPath();
        ctx.arc(sx, sy, 3.5 * scale, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [activeIndex]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    startPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startPointer.current.x;
    const dy = e.clientY - startPointer.current.y;
    targetRotation.current.y = angleY.current + dx * 0.005;
    targetRotation.current.x = Math.max(-1.2, Math.min(1.2, angleX.current + dy * 0.005));
    startPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 bg-transparent"
      style={{ userSelect: "none" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 lg:-translate-x-[16%]"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ cursor: "grab" }}
      />

      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden lg:-translate-x-[16%]">
        {LAYERS.map((layer, i) => {
          const Icon = layer.icon;
          const coord = coords[i] || { x: 0, y: 0, scale: 1, z: 0 };
          const lifted = activeIndex === i;

          return (
            <div
              key={layer.label}
              className="absolute pointer-events-auto"
              style={{
                left: coord.x,
                top: coord.y,
                transform: `translate(-50%, -50%) scale(${coord.scale})`,
                zIndex: Math.round(1000 - coord.z),
              }}
            >
              <button
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(selected === i ? null : i);
                }}
                className={`relative flex items-center justify-center rounded-2xl border transition-all duration-300 ${
                  i === 3 ? "p-4 sm:p-5" : "p-3 sm:p-3.5"
                }`}
                style={{
                  borderColor: lifted ? `${layer.edge}aa` : `${layer.edge}38`,
                  background: lifted
                    ? `radial-gradient(circle at center, ${layer.tint}, rgba(10,26,48,0.72))`
                    : `radial-gradient(circle at center, ${layer.tint}, rgba(10,26,48,0.5))`,
                  boxShadow: lifted
                    ? `0 14px 44px -10px rgba(3,7,19,0.9), 0 0 0 1px ${layer.edge}24, 0 0 28px ${layer.glow}66`
                    : `0 8px 24px -10px rgba(3,7,19,0.7), 0 0 0 1px ${layer.edge}08`,
                }}
              >
                <span
                  className="absolute inset-0 rounded-2xl opacity-10 animate-border-shimmer"
                  style={{ border: `1.5px solid ${layer.edge}` }}
                />
                <Icon
                  className="size-5 sm:size-6"
                  strokeWidth={1.8}
                  style={{
                    color: layer.edge,
                    filter: lifted ? `drop-shadow(0 0 8px ${layer.glow})` : "none",
                  }}
                />
                {i === 3 && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-[#0a6ed1] px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest text-white shadow-md">
                    CORE
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Floating Specs Inspector Panel */}
      <div
        className="pointer-events-auto absolute bottom-4 left-4 right-4 z-30 flex flex-col justify-end lg:bottom-auto lg:right-[6%] lg:top-[28%] lg:left-auto lg:w-[380px] lg:justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          {activeIndex !== null ? (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
              className="tri-glass-card rounded-[2rem] border border-white/[0.08] bg-slate-950/45 p-6 backdrop-blur-xl shadow-[0_34px_80px_-24px_rgba(3,7,19,0.85)]"
            >
              {/* Header Tone Line */}
              <div
                className="h-1 w-14 rounded-full mb-5"
                style={{
                  background: `linear-gradient(90deg, ${LAYERS[activeIndex].edge}, #f5a623)`,
                  boxShadow: `0 0 10px ${LAYERS[activeIndex].glow}`,
                }}
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
                Layer {String(activeIndex + 1).padStart(2, "0")} Inspector
              </span>

              <h4 className="mt-2 text-xl font-bold leading-snug text-white">
                {LAYERS[activeIndex].label}
              </h4>

              <p className="mt-2.5 text-xs font-semibold text-[#7edcc2] uppercase tracking-wider">
                {LAYER_SPECS[activeIndex].tech}
              </p>

              <ul className="mt-5 space-y-3.5 border-t border-white/[0.07] pt-5">
                {LAYER_SPECS[activeIndex].points.map((pt, idx) => (
                  <motion.li
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    key={idx}
                    className="flex items-start gap-3 text-xs leading-[1.6] text-slate-300"
                  >
                    <CheckCircle
                      className="mt-0.5 size-4 shrink-0"
                      style={{ color: LAYERS[activeIndex].edge }}
                    />
                    <span>{pt}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between text-[10px] font-bold text-slate-500 border-t border-white/[0.05] pt-4">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="size-3.5" style={{ color: LAYERS[activeIndex].edge }} />
                  Interactive specs catalog
                </span>
                <button
                  onClick={() => setSelected(null)}
                  className="cursor-pointer text-[#7edcc2] hover:text-white transition-colors"
                >
                  {isLocked ? "Unlock Panel" : "Lock Mode"}
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
