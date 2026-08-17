"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Clapperboard,
  DollarSign,
  Film,
  Globe,
  Headphones,
  Layers,
  Music,
  Play,
  Radio,
  Tv,
  Users,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";
import IndustryHeroStage from "./IndustryHeroStage";

const KPIS = [
  { value: "100%", label: "Royalty Calculation Accuracy", color: "#117a4b" },
  { value: "1.4M", label: "Concurrent Global Streams", color: "#29ab87" },
  { value: "99.2%", label: "Edge CDN Cache Hit Rate", color: "#f5a623" },
];

export default function EntertainmentAnimation() {
  const reduce = useReducedMotion();
  const [viewers, setViewers] = useState(1428500);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((prev) => prev + Math.floor(Math.random() * 240 - 100));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <IndustryHeroStage
      videoSrc="/videos/entertainment-sap.mp4"
      poster="/videos/entertainment-sap-poster.jpg"
      caption="SAP centralises media & entertainment finance"
      sub="digital rights · streaming CDN · automated royalties · multi-territory P&L"
      kpis={KPIS}
      accentColor="#ec4899"
    >
      <div className="relative h-full w-full overflow-hidden select-none">
        {/* ── Broadcast Frequency Waves & Streaming Equalizer Grid ── */}
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full opacity-65"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <defs>
            <linearGradient id="entBroadCast" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#29ab87" stopOpacity="1" />
              <stop offset="100%" stopColor="#f5a623" stopOpacity="0.8" />
            </linearGradient>
            <filter id="entGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Broadcast Arc Wavefronts */}
          <path
            d="M 120 460 C 420 280, 620 480, 820 340 S 1180 460, 1340 460"
            stroke="url(#entBroadCast)"
            strokeWidth="3"
            strokeDasharray="6 6"
            opacity="0.6"
          />

          {/* Flowing Media Bitrate Packets */}
          <circle r="6" fill="#f472b6" filter="url(#entGlow)">
            <animateMotion
              dur="7s"
              repeatCount="indefinite"
              path="M 120 460 C 420 280, 620 480, 820 340 S 1180 460, 1340 460"
            />
          </circle>
          <circle r="4.5" fill="#29ab87" filter="url(#entGlow)">
            <animateMotion
              dur="7s"
              begin="3.5s"
              repeatCount="indefinite"
              path="M 120 460 C 420 280, 620 480, 820 340 S 1180 460, 1340 460"
            />
          </circle>

          {/* Multi-Band Equalizer Frequency Spectrum */}
          {[160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380].map((x, i) => (
            <line
              key={x}
              x1={x}
              y1={520 - ((i % 4) + 1) * 9}
              x2={x}
              y2={520 + ((i % 4) + 1) * 9}
              stroke="#ec4899"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.55"
            >
              <animate
                attributeName="y1"
                values={`${520 - ((i % 4) + 1) * 9};${520 - ((i % 3) + 1) * 16};${520 - ((i % 4) + 1) * 9}`}
                dur={`${0.8 + (i % 3) * 0.3}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="y2"
                values={`${520 + ((i % 4) + 1) * 9};${520 + ((i % 3) + 1) * 16};${520 + ((i % 4) + 1) * 9}`}
                dur={`${0.8 + (i % 3) * 0.3}s`}
                repeatCount="indefinite"
              />
            </line>
          ))}
        </svg>

        {/* ── Left Side: Studio IP Rights Vault & Equalizer ── */}
        <div className="absolute left-[4%] top-[14%] sm:left-[7%] max-w-[340px] z-20">
          <div className="rounded-2xl border border-white/10 bg-[#030713]/85 p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#db2777]/20 border border-[#ec4899]/40 text-[#f472b6]">
                  <Clapperboard className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white">Digital IP Rights Vault</p>
                  <p className="text-[9px] text-white/50">Multi-Territory Licensing</p>
                </div>
              </div>
              <span className="flex h-2 w-2 rounded-full bg-[#ec4899] animate-ping" />
            </div>

            <div className="mt-3 space-y-2">
              <div className="rounded-lg bg-white/[0.03] border border-white/5 p-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/70">Royalty Audit Split</span>
                  <span className="font-mono font-bold text-[#f472b6]">100% VERIFIED</span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[98%] bg-gradient-to-r from-[#db2777] via-[#ec4899] to-[#29ab87]" />
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-white/70 px-1">
                <span>Asset: 4K HDR Master</span>
                <span className="font-semibold text-[#29ab87]">Worldwide Sync</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Center: 3D SAP BPC & Analytics Cloud Media Core ── */}
        <div className="absolute left-1/2 top-[12%] -translate-x-1/2 z-20 flex flex-col items-center">
          <motion.div
            animate={reduce ? {} : { rotate: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-[#ec4899]/50 bg-gradient-to-br from-[#9d174d] via-[#030713] to-[#ec4899]/40 shadow-[0_0_60px_rgba(236,72,153,0.4)] backdrop-blur-xl"
          >
            <Film className="h-12 w-12 text-white drop-shadow-[0_0_15px_#f472b6]" />
          </motion.div>

          <div className="mt-3 rounded-full border border-white/15 bg-black/70 px-4 py-1 backdrop-blur-md">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#f472b6]">
              SAP BPC & Analytics Cloud Media
            </span>
          </div>
        </div>

        {/* ── Right Side: Global OTT Streaming CDN & Concurrency Telemetry ── */}
        <div className="absolute right-[4%] top-[14%] sm:right-[7%] max-w-[340px] z-20">
          <div className="rounded-2xl border border-white/10 bg-[#030713]/85 p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#29ab87]/20 border border-[#29ab87]/40 text-[#29ab87]">
                  <Users className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white">Live Global Audience</p>
                  <p className="text-[9px] text-white/50">Edge CDN Hit Rate: 99.2%</p>
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="flex items-center justify-between text-white/80">
                <span>Concurrent Viewers</span>
                <span className="font-mono font-bold text-[#29ab87]" suppressHydrationWarning>
                  {viewers.toLocaleString("en-US")}
                </span>
              </div>
              <div className="flex items-center justify-between text-white/80">
                <span>CDN Cache Hit</span>
                <span className="font-mono font-bold text-[#f5a623]">99.2% Optimal</span>
              </div>
              <div className="rounded-lg bg-[#ec4899]/15 border border-[#ec4899]/30 p-2 text-center text-[10px] font-bold text-[#f472b6]">
                ✓ Syndication P&L Synced · SVOD Revenue Automated
              </div>
            </div>
          </div>
        </div>
      </div>
    </IndustryHeroStage>
  );
}
