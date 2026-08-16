"use client";

import { motion, useReducedMotion } from "framer-motion";

/* ── Cloudy atmosphere ────────────────────────────────────────
   Large soft puffs drift across the whole hero on separate time
   scales, with a faint fog wash. This fills the canvas edge-to-
   edge and gives the "cloudy" depth behind every page scene.   */
export function CloudAtmosphere() {
  const layers = [
    { top: "10%", dur: 46, delay: 0, scale: 1, o: 0.45 },
    { top: "26%", dur: 62, delay: -18, scale: 1.4, o: 0.35 },
    { top: "42%", dur: 52, delay: -32, scale: 1.1, o: 0.4 },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden">
      {layers.map((c, i) => (
        <motion.div
          key={i}
          className="absolute left-0"
          style={{ top: c.top, filter: "blur(34px)", opacity: c.o }}
          animate={{ x: ["-42vw", "110vw"] }}
          transition={{ duration: c.dur, repeat: Infinity, ease: "linear", delay: c.delay }}
        >
          <div
            className="relative"
            style={{
              width: "34rem",
              height: "9rem",
              transform: `scale(${c.scale})`,
              background:
                "radial-gradient(closest-side at 18% 72%, rgba(148,187,220,0.5), transparent), radial-gradient(closest-side at 42% 46%, rgba(148,187,220,0.6), transparent), radial-gradient(closest-side at 68% 70%, rgba(148,187,220,0.5), transparent), radial-gradient(closest-side at 88% 50%, rgba(122,168,214,0.35), transparent), radial-gradient(closest-side at 50% 100%, rgba(148,187,220,0.4), transparent)",
            }}
          />
        </motion.div>
      ))}
      {/* fog wash */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_55%,rgba(186,212,236,0.06),transparent_70%)]" />
    </div>
  );
}

/* ── 3D orbit rings ───────────────────────────────────────────
   A family of gyroscope rings tilted on different planes, each
   slowly spinning. They breathe behind the scene so the whole
   hero reads as a single living environment.                   */
export function OrbitRings() {
  const reduce = useReducedMotion();
  const ring = (size: string, border: string, tilt: string, dur: number, reverse = false, dashed = false) => (
    <div style={{ transform: tilt, transformStyle: "preserve-3d" }} className="absolute flex items-center justify-center">
      <motion.div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          border: dashed ? `1px dashed ${border}` : `1px solid ${border}`,
          boxShadow: "0 0 60px rgba(56,189,248,0.1)",
        }}
        animate={{ rotate: reduce ? 0 : reverse ? -360 : 360 }}
        transition={{ duration: dur, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-[4] flex items-center justify-center overflow-hidden">
      {ring("72vmin", "rgba(56,189,248,0.22)", "rotateX(74deg)", 28)}
      {ring("48vmin", "rgba(34,211,238,0.28)", "rotateX(58deg) rotateY(-12deg)", 18, true, true)}
      {ring("92vmin", "rgba(139,124,246,0.16)", "rotateX(80deg) rotateZ(16deg)", 40)}
      {/* signal dot riding the outer ring */}
      <div style={{ transform: "rotateX(74deg)" }} className="absolute flex h-[72vmin] w-[72vmin] items-center justify-center">
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: reduce ? 0 : 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#67e8f9] shadow-[0_0_14px_#67e8f9]" />
        </motion.div>
      </div>
    </div>
  );
}
