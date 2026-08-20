"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Boxes, Cloud, Database, LineChart } from "lucide-react";
import Hexagon from "@/components/ui/Hexagon";
import DataFlow from "./DataFlow";

const satellites = [
  { left: "12%", top: "18%", z: 120, size: 84, kind: "hex", tone: "green" as const },
  { left: "82%", top: "24%", z: 70, size: 64, kind: "chip", tone: "amber" as const, icon: Cloud },
  { left: "8%", top: "72%", z: 90, size: 60, kind: "glow", tone: "amber" as const },
  { left: "86%", top: "70%", z: 110, size: 72, kind: "hex", tone: "amber" as const },
  { left: "28%", top: "6%", z: 40, size: 48, kind: "chip", tone: "green" as const, icon: Database },
  { left: "70%", top: "88%", z: 55, size: 52, kind: "chip", tone: "mix" as const, icon: LineChart },
  { left: "50%", top: "94%", z: 30, size: 44, kind: "hex", tone: "green" as const },
  { left: "50%", top: "4%", z: 60, size: 50, kind: "chip", tone: "green" as const, icon: Boxes },
];

const toneFill: Record<string, string> = {
  green: "rgba(41,171,135,0.14)",
  amber: "rgba(245,166,35,0.16)",
  mix: "rgba(17,122,75,0.18)",
};

/** CSS 3D glass-hexagon hero scene with pointer parallax. Mouse-only, reduced-motion aware. */
export default function HexScene({ active = true, className = "" }: { active?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  const mrx = useMotionValue(0);
  const mry = useMotionValue(0);
  const rotateX = useSpring(mrx, { stiffness: 55, damping: 16 });
  const rotateY = useSpring(mry, { stiffness: 55, damping: 16 });
  const transform = useMotionTemplate`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mry.set(nx * 20);
    mrx.set(-ny * 16);
  };

  const reset = () => {
    mrx.set(0);
    mry.set(0);
  };

  return (
    <div
      className={`relative ${className}`}
      style={{ perspective: 1400 }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {/* ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 blur-3xl"
        style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(41,171,135,0.38), rgba(15,34,60,0.5) 45%, transparent 75%)" }}
      />

      {/* data flow layer */}
      <DataFlow className="absolute inset-0 z-20 h-full w-full opacity-70" />

      {/* 3D group */}
      <motion.div style={{ transform, transformStyle: "preserve-3d" }} className="absolute inset-0">
        {/* central 3D Trijotech Three-Hexagon Logo */}
        <div
          className="absolute"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%) translateZ(0px)", width: "68%", height: "68%" }}
        >
          <div className="relative flex h-full w-full items-center justify-center">
            {/* Outer revolving boundary hexagon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Hexagon className="h-full w-full" animated strokeWidth={2} fill="rgba(41,171,135,0.04)" />
            </div>

            {/* Borderless & background-free revolving Three-Hexagon Logo with shiny crystal glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="relative flex items-center justify-center"
                style={{
                  width: "60%",
                  height: "60%",
                  transform: "translateZ(30px)",
                }}
              >
                {/* Radiant shiny center aura */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -m-6 rounded-full opacity-80 blur-2xl animate-pulse-glow"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(41,171,135,0.6), rgba(245,166,35,0.45) 50%, transparent 75%)",
                  }}
                />

                {/* 3-Hexagon Vector Logo - Continuous Smooth 360° Revolving Animation */}
                <motion.div
                  className="relative z-10 flex h-full w-full items-center justify-center"
                  animate={active && !reduce ? { rotate: 360 } : { rotate: 0 }}
                  transition={{
                    repeat: active && !reduce ? Infinity : 0,
                    duration: 18,
                    ease: "linear",
                  }}
                  style={{ transformOrigin: "50% 50%" }}
                >
                  <svg
                    viewBox="0 0 220 220"
                    className="h-full w-full filter drop-shadow-[0_0_20px_rgba(41,171,135,0.85)] drop-shadow-[0_0_35px_rgba(245,166,35,0.6)]"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                  <defs>
                    {/* Top-Left Deep Green Shiny Gloss Gradient */}
                    <linearGradient id="tri-hex-top-green" x1="0" y1="0" x2="123" y2="106" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#48e39f" />
                      <stop offset="35%" stopColor="#1ebd76" />
                      <stop offset="70%" stopColor="#117a4b" />
                      <stop offset="100%" stopColor="#084d2f" />
                    </linearGradient>

                    {/* Bottom-Left Mint Green Shiny Gloss Gradient */}
                    <linearGradient id="tri-hex-bot-mint" x1="0" y1="111" x2="123" y2="218" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#86f3d4" />
                      <stop offset="35%" stopColor="#3cd2a8" />
                      <stop offset="70%" stopColor="#29ab87" />
                      <stop offset="100%" stopColor="#136750" />
                    </linearGradient>

                    {/* Right Amber / Gold Shiny Gloss Gradient */}
                    <linearGradient id="tri-hex-right-amber" x1="96" y1="56" x2="219" y2="162" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#ffe68a" />
                      <stop offset="35%" stopColor="#ffb833" />
                      <stop offset="70%" stopColor="#f5a623" />
                      <stop offset="100%" stopColor="#b86b04" />
                    </linearGradient>

                    {/* Top Glass Specular Shine Linear Gradient */}
                    <linearGradient id="hex-glass-shine" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                      <stop offset="30%" stopColor="#ffffff" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* 1. Top-Left Hexagon (Shiny Deep Green) */}
                  <g className="transition-transform duration-500 hover:scale-105" style={{ transformOrigin: "61px 53px" }}>
                    <path
                      d="M122.88 53.248L92.16 0H30.72L0 53.248L30.72 106.496H92.16L122.88 53.248Z"
                      fill="url(#tri-hex-top-green)"
                      stroke="rgba(255,255,255,0.7)"
                      strokeWidth="1.8"
                    />
                    {/* Glass Glossy Top Half Shine */}
                    <path
                      d="M122.88 53.248L92.16 0H30.72L0 53.248Q61.44 70 122.88 53.248Z"
                      fill="url(#hex-glass-shine)"
                      opacity="0.55"
                    />
                    {/* Specular White Rim Highlight */}
                    <path
                      d="M92.16 0H30.72L0 53.248"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      opacity="0.95"
                    />
                  </g>

                  {/* 2. Bottom-Left Hexagon (Shiny Mint Green) */}
                  <g className="transition-transform duration-500 hover:scale-105" style={{ transformOrigin: "61px 164px" }}>
                    <path
                      d="M122.88 164.608L92.16 111.36H30.72L0 164.608L30.72 217.856H92.16L122.88 164.608Z"
                      fill="url(#tri-hex-bot-mint)"
                      stroke="rgba(255,255,255,0.75)"
                      strokeWidth="1.8"
                    />
                    {/* Glass Glossy Top Half Shine */}
                    <path
                      d="M122.88 164.608L92.16 111.36H30.72L0 164.608Q61.44 180 122.88 164.608Z"
                      fill="url(#hex-glass-shine)"
                      opacity="0.55"
                    />
                    {/* Specular White Rim Highlight */}
                    <path
                      d="M92.16 111.36H30.72L0 164.608"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      opacity="0.95"
                    />
                  </g>

                  {/* 3. Right Hexagon (Shiny Amber / Gold) */}
                  <g className="transition-transform duration-500 hover:scale-105" style={{ transformOrigin: "157px 108px" }}>
                    <path
                      d="M218.84 108.848L188.12 55.6H126.68L95.96 108.848L126.68 162.096H188.12L218.84 108.848Z"
                      fill="url(#tri-hex-right-amber)"
                      stroke="rgba(255,255,255,0.8)"
                      strokeWidth="1.8"
                    />
                    {/* Glass Glossy Top Half Shine */}
                    <path
                      d="M218.84 108.848L188.12 55.6H126.68L95.96 108.848Q157.4 125 218.84 108.848Z"
                      fill="url(#hex-glass-shine)"
                      opacity="0.55"
                    />
                    {/* Specular White Rim Highlight */}
                    <path
                      d="M188.12 55.6H126.68L95.96 108.848"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      opacity="0.95"
                    />
                  </g>
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* inner orbit ring */}
        <div
          className="absolute rounded-full border border-[rgba(41,171,135,0.25)]"
          style={{
            left: "50%",
            top: "50%",
            width: "50%",
            height: "50%",
            transform: "translate(-50%, -50%) translateZ(-30px)",
          }}
        >
          <span
            className="tri-ring absolute left-1/2 top-1/2 h-5 w-5 rounded-full border-2 border-[rgba(245,166,35,0.8)]"
            style={{ transform: "translate(-50%,-50%)" }}
          />
        </div>

        {/* satellites at various depths */}
        {satellites.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: s.left,
                top: s.top,
                transform: `translate(-50%, -50%) translateZ(${s.z}px)`,
              }}
            >
              <div className="animate-float-slow" style={{ animationDelay: `${i * 0.7}s` }}>
                {s.kind === "glow" ? (
                  <div
                    aria-hidden
                    className="rounded-full blur-2xl"
                    style={{
                      width: s.size,
                      height: s.size,
                      background:
                        s.tone === "amber"
                          ? "radial-gradient(circle, rgba(245,166,35,0.5), transparent 70%)"
                          : "radial-gradient(circle, rgba(41,171,135,0.5), transparent 70%)",
                    }}
                  />
                ) : s.kind === "chip" ? (
                  <div className="flex items-center justify-center rounded-xl border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.07)] shadow-lg shadow-[rgba(3,7,19,0.4)] backdrop-blur-md">
                    {Icon && <Icon className="text-white/90" style={{ width: s.size * 0.5, height: s.size * 0.5 }} strokeWidth={1.6} />}
                  </div>
                ) : (
                  <Hexagon size={s.size} fill={toneFill[s.tone]} />
                )}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* top scan highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-10 top-0 h-px opacity-60"
        style={{ background: "linear-gradient(90deg, transparent, rgba(41,171,135,0.8), rgba(245,166,35,0.8), transparent)" }}
      />
    </div>
  );
}
