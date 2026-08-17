"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  Bot,
  Brain,
  CheckCircle2,
  Cpu,
  FileCode,
  LineChart,
  MessageSquare,
  Network,
  Send,
  Sparkles,
  Terminal,
  TrendingUp,
  Workflow,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   SAP AI & MACHINE LEARNING — 3D NEURAL WAVEFORM ORB &
   LIVE JOULE COPILOT COPILOT CONSOLE
   ───────────────────────────────────────────────────────────── */

type CopilotQuery = {
  id: string;
  prompt: string;
  category: string;
  response: string;
  tokens: string;
  confidence: string;
  latency: string;
  color: string;
};

const QUERIES: CopilotQuery[] = [
  {
    id: "q-cash",
    prompt: "Forecast Q4 working capital across all 14 subsidiaries",
    category: "Predictive Treasury LSTM",
    response: "Analyzed universal ledger records. Working capital projected to expand by +14.2% YoY ($18.4M liquid reserves). Invoice delinquency risk scored at low 0.02%.",
    tokens: "142 tokens/s",
    confidence: "98.7% Confidence",
    latency: "6.2ms",
    color: "#38bdf8",
  },
  {
    id: "q-cap",
    prompt: "Joule: Generate CDS schema and draft service handlers",
    category: "Generative Business Copilot",
    response: "Generated clean-core CAP service model in TypeScript with OData V4 draft handling, authorization restrictions, and automated Jest test suite.",
    tokens: "185 tokens/s",
    confidence: "100% Syntax Valid",
    latency: "8.4ms",
    color: "#29ab87",
  },
  {
    id: "q-fraud",
    prompt: "Run anomaly heuristic scan across 5,000 vendor invoices",
    category: "AI Fraud Defense Shield",
    response: "Scanned 5,000 invoices in 0.18s. Zero duplicate billings or split-PO threshold violations found. Compliance integrity rated at 100%.",
    tokens: "210 tokens/s",
    confidence: "99.9% F1-Score",
    latency: "4.1ms",
    color: "#f5a623",
  },
  {
    id: "q-supply",
    prompt: "Predict supplier delivery risks under current weather disruptions",
    category: "Time-Series Supply Transformer",
    response: "Detected potential 3-day lead time variance for Supplier #4802. Autonomous safety stock reorder triggered in S/4HANA MM to eliminate stockouts.",
    tokens: "135 tokens/s",
    confidence: "97.8% Accuracy",
    latency: "7.9ms",
    color: "#8b7cf6",
  },
];

export default function AiPredictionField() {
  const reduce = useReducedMotion();
  const [activeQuery, setActiveQuery] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const query = QUERIES[activeQuery];

  // Typewriter effect for live AI response
  useEffect(() => {
    setIsTyping(true);
    setDisplayText("");
    const fullText = query.response;
    let index = 0;

    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 18);

    return () => clearInterval(timer);
  }, [activeQuery, query.response]);

  useEffect(() => {
    const cycleTimer = setInterval(() => {
      setActiveQuery((prev) => (prev + 1) % QUERIES.length);
    }, 6000);
    return () => clearInterval(cycleTimer);
  }, []);

  return (
    <div className="relative isolate h-full min-h-full w-full overflow-hidden select-none bg-[#030713] px-3 sm:px-6 lg:px-10 py-2 flex flex-col justify-between">
      {/* ── Background Neural Ambient Aura ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#29ab87]/25 blur-[140px]" />
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#8b7cf6]/20 blur-[140px]" />
      </div>

      {/* ── Top Header Controls ── */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 sm:gap-3 border-b border-white/10 pb-2 sm:pb-3 pt-2 sm:pt-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-[#29ab87]/20 border border-[#29ab87]/40 text-[#29ab87]">
            <Brain className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>
          <div>
            <h2 className="text-[11px] sm:text-xs lg:text-sm font-mono font-extrabold text-white tracking-wider">
              SAP BUSINESS AI · JOULE COPILOT NEURAL ENGINE
            </h2>
            <p className="text-[8px] sm:text-[9px] font-mono text-[#29ab87]">
              GENERATIVE AI · PREDICTIVE ANALYTICS · ZERO-SHOT CONTEXT EMBEDDING
            </p>
          </div>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/10 bg-black/60 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-mono text-white/80 backdrop-blur-md">
          <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#29ab87] animate-ping" />
          <span>INFERENCE: {query.latency}</span>
        </div>
      </div>

      {/* ── Main Neural Laboratory Stage (Left Orb + Right Copilot Console) ── */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 my-auto py-2 items-center overflow-y-auto lg:overflow-visible">
        {/* LEFT COLUMN (5 Cols): 3D Generative AI Neural Waveform Orb */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
          <div className="relative flex h-36 w-36 sm:h-48 sm:w-48 lg:h-56 lg:w-56 items-center justify-center">
            {/* Concentric Pulsing Sound Waveform Rings */}
            {[50, 70, 90].map((r, i) => (
              <motion.div
                key={r}
                animate={{
                  scale: [1, 1.14, 1],
                  opacity: [0.35, 0.7, 0.35],
                }}
                transition={{
                  duration: 2.4 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute rounded-full border border-dashed pointer-events-none"
                style={{
                  width: r * 2,
                  height: r * 2,
                  borderColor: i === 0 ? "#29ab87" : i === 1 ? "#38bdf8" : "#8b7cf6",
                }}
              />
            ))}

            {/* Glowing Center Neural Core */}
            <motion.div
              animate={{
                scale: [1, 1.06, 1],
                boxShadow: [
                  "0 0 30px rgba(41,171,135,0.6)",
                  "0 0 55px rgba(41,171,135,0.9)",
                  "0 0 30px rgba(41,171,135,0.6)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#117a4b] via-[#030713] to-[#29ab87] border border-white/30 backdrop-blur-xl"
            >
              <Bot className="h-9 w-9 sm:h-11 sm:w-11 text-white drop-shadow-[0_0_12px_#7edcc2]" />
            </motion.div>
          </div>

          {/* Quick AI Prompts Capsules */}
          <div className="mt-2 flex flex-wrap justify-center gap-1 sm:gap-1.5 max-w-sm px-2">
            {QUERIES.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setActiveQuery(idx)}
                className={`rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-mono font-bold transition-all duration-300 border ${
                  activeQuery === idx
                    ? "bg-white text-slate-950 border-white shadow-lg scale-105"
                    : "bg-black/60 text-white/70 border-white/10 hover:text-white hover:bg-white/10"
                }`}
              >
                ✦ {q.prompt.split(" ")[0]} {q.prompt.split(" ")[1]}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN (7 Cols): Live Joule Business Copilot Console */}
        <div className="lg:col-span-7 rounded-2xl sm:rounded-3xl border border-white/12 bg-[#030713]/95 p-4 sm:p-5 lg:p-6 shadow-2xl backdrop-blur-2xl">
          {/* Query Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-[#29ab87]/20 border border-[#29ab87]/40 text-[#29ab87]">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </span>
              <div>
                <p className="text-[8px] sm:text-[9px] font-mono uppercase text-white/50">{query.category}</p>
                <p className="text-[11px] sm:text-xs font-mono font-bold text-white">SAP Joule Interactive Copilot</p>
              </div>
            </div>
            <span
              className="rounded-full px-2 py-0.5 text-[8px] sm:text-[9px] font-mono font-bold"
              style={{ background: `${query.color}20`, color: query.color, border: `1px solid ${query.color}40` }}
            >
              {query.confidence}
            </span>
          </div>

          {/* User Prompt Bubble */}
          <div className="mt-3 sm:mt-4 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 p-2.5 sm:p-3.5 flex items-start gap-2 sm:gap-2.5">
            <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#38bdf8] shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm font-mono font-bold text-white">
              "{query.prompt}"
            </p>
          </div>

          {/* Live Copilot AI Response Output */}
          <div className="mt-2.5 sm:mt-3 rounded-xl sm:rounded-2xl bg-black/70 border border-white/8 p-3 sm:p-4 min-h-[75px] sm:min-h-[90px]">
            <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-white/40 mb-1 sm:mb-1.5">
              <span>COPILOT INFERENCE GENERATION</span>
              <span className="text-[#29ab87]">{query.tokens}</span>
            </div>
            <p className="text-[11px] sm:text-xs lg:text-sm font-mono text-slate-200 leading-relaxed">
              {displayText}
              {isTyping && <span className="inline-block h-2.5 sm:h-3 w-1 sm:w-1.5 bg-[#29ab87] ml-1 animate-ping" />}
            </p>
          </div>

          {/* Performance Telemetry Grid */}
          <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-1.5 sm:gap-2 pt-2.5 sm:pt-3 border-t border-white/10 text-center">
            <div className="rounded-lg sm:rounded-xl bg-white/[0.02] border border-white/5 p-1.5 sm:p-2">
              <p className="text-[7px] sm:text-[8px] font-mono text-white/40">INFERENCE SPEED</p>
              <p className="text-[11px] sm:text-xs font-mono font-bold text-[#38bdf8]">{query.latency}</p>
            </div>
            <div className="rounded-lg sm:rounded-xl bg-white/[0.02] border border-white/5 p-1.5 sm:p-2">
              <p className="text-[7px] sm:text-[8px] font-mono text-white/40">MODEL ACCURACY</p>
              <p className="text-[11px] sm:text-xs font-mono font-bold text-[#29ab87]">99.4% F1</p>
            </div>
            <div className="rounded-lg sm:rounded-xl bg-white/[0.02] border border-white/5 p-1.5 sm:p-2">
              <p className="text-[7px] sm:text-[8px] font-mono text-white/40">DATA GOVERNANCE</p>
              <p className="text-[11px] sm:text-xs font-mono font-bold text-[#f5a623]">EU AI Compliant</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Console Bottom Status Ribbon ── */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 border-t border-white/10 pt-2 text-[9px] sm:text-[10px] font-mono text-white/60">
        <span className="flex items-center gap-1.5 text-[#29ab87]">
          <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> SAP JOULE EMBEDDED ARCHITECTURE
        </span>
        <span className="hidden sm:inline">ZERO-SHOT PREDICTIVE ENGINE</span>
        <span className="text-[#38bdf8]">14,500+ DAILY AUTOMATED INSIGHTS</span>
      </div>
    </div>
  );
}
