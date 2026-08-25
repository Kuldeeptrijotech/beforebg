"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Cpu,
  Database,
  Globe2,
  HeartPulse,
  Laptop,
  Play,
  RefreshCw,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   SAP SUPPORT — 4-SCREEN CYBER MISSION CONTROL CONSOLE
   SCREEN 1: Live Heartbeat Scope (99.999% SLA)
   SCREEN 2: Automated Self-Healing CLI Terminal (Auto-Remediation)
   SCREEN 3: High-Precision MTTR Performance Meter
   SCREEN 4: Global Enterprise Multi-Region Node Array
   ───────────────────────────────────────────────────────────── */

type LogEntry = {
  id: number;
  time: string;
  type: "OK" | "HEAL" | "PATCH" | "SLA";
  text: string;
};

const INITIAL_LOGS: LogEntry[] = [
  { id: 1, time: "14:20:02", type: "OK", text: "S/4HANA digital core heartbeat nominal (12ms)" },
  { id: 2, time: "14:20:08", type: "HEAL", text: "Stuck IDoc queue #4820 cleared autonomously" },
  { id: 3, time: "14:20:14", type: "PATCH", text: "BTP Kyma microservice auto-scaled +2 replicas" },
  { id: 4, time: "14:20:19", type: "SLA", text: "Global SLA availability verified at 99.999%" },
];

export default function SupportCommandCenter() {
  const reduce = useReducedMotion();
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [isAlerting, setIsAlerting] = useState(false);
  const [activeRegion, setActiveRegion] = useState(0);

  const regions = [
    { name: "Americas Region", uptime: "99.999%", latency: "14ms", status: "NOMINAL" },
    { name: "EMEA Headquarters", uptime: "100.0%", latency: "9ms", status: "OPTIMAL" },
    { name: "APAC Hub", uptime: "99.994%", latency: "18ms", status: "STABLE" },
    { name: "Cloud Multi-Tenant", uptime: "99.999%", latency: "6ms", status: "ACTIVE" },
  ];

  // Auto-feed terminal logs periodically
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
      const newLogs: LogEntry[] = [
        { id: Date.now() + 1, time: timeStr, type: "OK", text: "Universal journal ledger synchronization verified" },
        { id: Date.now() + 2, time: timeStr, type: "HEAL", text: "SAP CPI message retry buffer flushed [0 errors]" },
        { id: Date.now() + 3, time: timeStr, type: "SLA", text: "P1 response SLA verified: < 15 min target met" },
      ];
      const randomLog = newLogs[Math.floor(Math.random() * newLogs.length)];
      setLogs((prev) => [randomLog, ...prev.slice(0, 4)]);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const triggerSimulatedAlert = () => {
    setIsAlerting(true);
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
    const alertLog: LogEntry = {
      id: Date.now(),
      time: timeStr,
      type: "HEAL",
      text: "⚡ Anomaly detected: Memory table peak auto-compacted in 1.4s",
    };
    setLogs((prev) => [alertLog, ...prev.slice(0, 4)]);
    setTimeout(() => {
      setIsAlerting(false);
    }, 2000);
  };

  return (
    <div className="relative isolate h-full min-h-full w-full overflow-hidden select-none bg-[#030713] px-3 sm:px-6 lg:px-10 py-2 flex flex-col justify-between">
      {/* ── Console Ambient Backdrop ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-white/30 blur-[140px]" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-[#38bdf8]/20 blur-[140px]" />
      </div>

      {/* ── Top Mission Control Nav & Emergency Trigger ── */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 sm:gap-3 border-b border-white/10 pb-2 sm:pb-3 pt-2 sm:pt-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-white/20 border border-white/40 text-white">
            <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>
          <div>
            <h2 className="text-[11px] sm:text-xs lg:text-sm font-mono font-extrabold text-white tracking-wider">
              SAP MANAGED SERVICES · 24/7 COMMAND DECK
            </h2>
            <p className="text-[8px] sm:text-[9px] font-mono text-white">
              AUTONOMOUS HEALING ENGINE · LEVEL 1-3 GLOBAL SUPPORT ACTIVE
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={triggerSimulatedAlert}
            className={`flex items-center gap-1.5 sm:gap-2 rounded-xl px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-mono font-bold transition-all duration-300 backdrop-blur-md border ${
              isAlerting
                ? "bg-white text-slate-950 border-white shadow-[0_0_20px_rgba(255, 255, 255,0.6)] animate-pulse"
                : "bg-white/5 hover:bg-white/10 text-white border-white/15 active:scale-95"
            }`}
          >
            <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
            <span>{isAlerting ? "Intercepting Alert..." : "Test Anomaly Trigger"}</span>
          </button>
        </div>
      </div>

      {/* ── 4-Screen Cyber Console Grid ── */}
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3.5 lg:gap-4 my-auto py-2 overflow-y-auto lg:overflow-visible">
        {/* SCREEN 1: Live System Heartbeat Scope */}
        <div className="rounded-xl sm:rounded-2xl border border-white/12 bg-[#030713]/90 p-3 sm:p-4 lg:p-5 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 sm:pb-3">
            <span className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono font-bold text-white">
              <HeartPulse className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white animate-pulse" />
              SCREEN 01: SYSTEM HEARTBEAT SCOPE
            </span>
            <span className="rounded-full bg-white/20 border border-white/40 px-2 py-0.5 text-[7px] sm:text-[8px] font-mono font-bold text-white">
              99.999% NOMINAL
            </span>
          </div>

          <div className="mt-2.5 sm:mt-3">
            <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-300 font-mono mb-1.5 sm:mb-2">
              <span>S/4HANA CORE CPU: 24.2%</span>
              <span className="text-white">ZERO DISRUPTIONS</span>
            </div>

            {/* Continuous Pulse Waveform SVG */}
            <div className="h-10 sm:h-12 lg:h-14 w-full rounded-lg sm:rounded-xl bg-black/60 border border-white/5 p-1.5 overflow-hidden flex items-center">
              <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 500 50">
                <path
                  d="M 0 25 L 80 25 L 95 8 L 110 42 L 125 15 L 140 32 L 155 25 L 260 25 L 275 8 L 290 42 L 305 15 L 320 32 L 335 25 L 500 25"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  fill="none"
                >
                  <animate attributeName="stroke-dashoffset" values="0;500" dur="3s" repeatCount="indefinite" />
                </path>
              </svg>
            </div>
          </div>
        </div>

        {/* SCREEN 2: Automated Self-Healing CLI Terminal */}
        <div className="rounded-xl sm:rounded-2xl border border-white/12 bg-[#030713]/90 p-3 sm:p-4 lg:p-5 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 sm:pb-3">
            <span className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono font-bold text-white">
              <Terminal className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#38bdf8]" />
              SCREEN 02: AUTONOMOUS REMEDIATION STREAM
            </span>
            <span className="flex items-center gap-1 text-[7px] sm:text-[8px] font-mono text-white/50">
              <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] animate-ping" /> LIVE CLI
            </span>
          </div>

          <div className="mt-2.5 sm:mt-3 space-y-1 sm:space-y-1.5 font-mono text-[10px] sm:text-[11px] h-12 sm:h-14 lg:h-16 overflow-hidden">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="text-white/40">[{log.time}]</span>
                <span
                  className={`font-bold px-1 rounded text-[8px] sm:text-[9px] ${
                    log.type === "HEAL"
                      ? "bg-white/20 text-white"
                      : log.type === "PATCH"
                      ? "bg-[#38bdf8]/20 text-[#38bdf8]"
                      : "bg-white/10 text-white/80"
                  }`}
                >
                  {log.type}
                </span>
                <span className="text-slate-300 truncate">{log.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SCREEN 3: MTTR & Performance SLA Meter */}
        <div className="rounded-xl sm:rounded-2xl border border-white/12 bg-[#030713]/90 p-3 sm:p-4 lg:p-5 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 sm:pb-3">
            <span className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono font-bold text-white">
              <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
              SCREEN 03: P1 RESPONSE & MTTR METRICS
            </span>
            <span className="rounded-full bg-white/20 border border-white/40 px-2 py-0.5 text-[7px] sm:text-[8px] font-mono font-bold text-white">
              SLA GUARANTEED
            </span>
          </div>

          <div className="mt-2.5 sm:mt-3 grid grid-cols-2 gap-2 sm:gap-3">
            <div className="rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/5 p-2 sm:p-3 text-center">
              <p className="text-[8px] sm:text-[9px] font-mono uppercase text-white/50">Priority 1 SLA Target</p>
              <p className="text-sm sm:text-base lg:text-lg font-mono font-extrabold text-white mt-0.5">
                &lt; 15 Minutes
              </p>
              <p className="text-[7px] sm:text-[8px] font-mono text-white mt-0.5">Actual Avg: 11.2 min</p>
            </div>
            <div className="rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/5 p-2 sm:p-3 text-center">
              <p className="text-[8px] sm:text-[9px] font-mono uppercase text-white/50">Auto-Remediation Rate</p>
              <p className="text-sm sm:text-base lg:text-lg font-mono font-extrabold text-[#38bdf8] mt-0.5">
                88.4%
              </p>
              <p className="text-[7px] sm:text-[8px] font-mono text-[#38bdf8]/80 mt-0.5">Zero Human Touch</p>
            </div>
          </div>
        </div>

        {/* SCREEN 4: Global Multi-Region Node Array */}
        <div className="rounded-xl sm:rounded-2xl border border-white/12 bg-[#030713]/90 p-3 sm:p-4 lg:p-5 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 sm:pb-3">
            <span className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono font-bold text-white">
              <Globe2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#8b7cf6]" />
              SCREEN 04: GLOBAL MULTI-REGION NODES
            </span>
            <span className="text-[7px] sm:text-[8px] font-mono text-white/50">4 REGIONS ONLINE</span>
          </div>

          <div className="mt-2.5 sm:mt-3 grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
            {regions.map((r, idx) => (
              <button
                key={r.name}
                onClick={() => setActiveRegion(idx)}
                className={`rounded-lg sm:rounded-xl p-2 sm:p-2.5 text-center transition-all duration-300 border ${
                  activeRegion === idx
                    ? "bg-white/10 border-[#38bdf8] shadow-md shadow-[#38bdf8]/20"
                    : "bg-white/[0.03] border-white/5 hover:bg-white/5"
                }`}
              >
                <p className="text-[7px] sm:text-[8px] font-mono text-white/50 truncate">{r.name.split(" ")[0]}</p>
                <p className="text-[11px] sm:text-xs font-mono font-bold text-white mt-0.5">{r.uptime}</p>
                <p className="text-[7px] sm:text-[8px] font-mono text-white/60">{r.latency}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Console Bottom Status Ribbon ── */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 border-t border-white/10 pt-2 text-[9px] sm:text-[10px] font-mono text-white/60">
        <span className="flex items-center gap-1.5 text-white">
          <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> SAP SOLMAN & CLOUD ALM CERTIFIED
        </span>
        <span className="hidden sm:inline">QUARTERLY UPGRADE ASSURANCE: 100% CLEAN CORE</span>
        <span className="text-[#38bdf8]">24/7/365 COMMAND DECK ACTIVE</span>
      </div>
    </div>
  );
}
