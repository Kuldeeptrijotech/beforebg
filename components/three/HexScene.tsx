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
export default function HexScene({ className = "" }: { className?: string }) {
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
        style={{ background: "radial-gradient(55% 55% at 50% 50%, rgba(41,171,135,0.3), transparent 72%)" }}
      />

      {/* data flow layer */}
      <DataFlow className="absolute inset-0 z-20 h-full w-full opacity-70" />

      {/* 3D group */}
      <motion.div style={{ transform, transformStyle: "preserve-3d" }} className="absolute inset-0">
        {/* central hexagon */}
        <div
          className="absolute"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%) translateZ(0px)" }}
        >
          <div className="relative flex items-center justify-center">
            <Hexagon size={300} animated strokeWidth={2} fill="rgba(41,171,135,0.06)" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="flex items-center justify-center rounded-3xl border border-[rgba(41,171,135,0.5)] bg-[linear-gradient(160deg,rgba(41,171,135,0.35),rgba(17,122,75,0.25))] backdrop-blur-xl"
                style={{ width: 130, height: 130 }}
              >
                <span className="text-5xl font-black text-white [text-shadow:0_0_30px_rgba(41,171,135,0.8)]">T</span>
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
            width: 230,
            height: 230,
            transform: "translate(-50%, -50%) translateZ(-30px)",
            marginLeft: -115,
            marginTop: -115,
          }}
        >
          <span
            className="tri-ring absolute left-1/2 top-1/2 h-6 w-6 rounded-full border-2 border-[rgba(245,166,35,0.8)]"
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
