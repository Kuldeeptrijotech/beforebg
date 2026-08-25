"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Award,
  CheckCircle2,
  Cpu,
  FileCheck2,
  FileCode2,
  FileText,
  Globe2,
  Lock,
  QrCode,
  RefreshCw,
  Scale,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   E-INVOICING PRO — REAL-TIME STATUTORY CLEARANCE ENGINE
   Interactive Multi-Jurisdiction E-Invoice & Peppol Clearance Deck
   ───────────────────────────────────────────────────────────── */

type ClearanceStage = {
  id: string;
  step: string;
  name: string;
  desc: string;
  protocol: string;
  color: string;
  status: string;
  metrics: { label: string; value: string };
  checks: string[];
};

type Jurisdiction = {
  id: string;
  name: string;
  region: string;
  format: string;
  color: string;
  irnExample: string;
  taxAuthority: string;
};

const JURISDICTIONS: Jurisdiction[] = [
  {
    id: "gst",
    name: "India GST e-Invoice",
    region: "NIC / IRP Portal",
    format: "JSON Schema V1.1 · Signed QR",
    color: "#ffffff",
    irnExample: "a8f3e1...99c4d2",
    taxAuthority: "Goods & Services Tax Network (GSTN)",
  },
  {
    id: "peppol",
    name: "PEPPOL BIS 3.0",
    region: "Europe & Global",
    format: "UBL 2.1 XML · AS4 Network",
    color: "#38bdf8",
    irnExample: "urn:peppol:bis:billing:3@0",
    taxAuthority: "OpenPeppol International AISBL",
  },
  {
    id: "zatca",
    name: "Saudi ZATCA Phase 2",
    region: "Fatoora Portal",
    format: "Cryptographic Stamp · ECDSA",
    color: "#ffffff",
    irnExample: "zatca-uuid-48f1-98ac",
    taxAuthority: "Zakat, Tax & Customs Authority",
  },
  {
    id: "ksef",
    name: "Poland KSeF / SDI",
    region: "European Mandatory",
    format: "FA_VAT XML Structured File",
    color: "#8b7cf6",
    irnExample: "ksef-pl-20260816-0042",
    taxAuthority: "National e-Invoice System (KSeF)",
  },
];

const STAGES: ClearanceStage[] = [
  {
    id: "extract",
    step: "01",
    name: "SAP ERP Data Extraction",
    desc: "Seamless real-time capture from SAP SD billing & FI-AR accounting documents.",
    protocol: "OData V4 / IDoc Native Bridge",
    color: "#38bdf8",
    status: "EXTRACTED",
    metrics: { label: "Extraction Latency", value: "< 85 ms" },
    checks: ["Automated line-item tax calculation", "Customer GSTIN/Tax ID verification", "Clean Core Zero-Modification SAP bridge"],
  },
  {
    id: "validate",
    step: "02",
    name: "Pre-Clearance Validation",
    desc: "140+ real-time tax validation rules preventing government portal rejection.",
    protocol: "Rules Engine · 100% Tax Accuracy",
    color: "#22d3ee",
    status: "VALIDATED",
    metrics: { label: "Pre-Validation Accuracy", value: "99.99%" },
    checks: ["HSN/SAC code & rate match", "Calculated tax vs. ledger reconciliation", "Mandatory schema fields assertion"],
  },
  {
    id: "clearance",
    step: "03",
    name: "Government Portal Handshake",
    desc: "Direct cryptographic connection to government tax server with sub-second signing.",
    protocol: "TLS 1.3 / HMAC-SHA256 Sign",
    color: "#ffffff",
    status: "IRN GENERATED",
    metrics: { label: "Clearance Speed", value: "< 340 ms" },
    checks: ["Official IRN hash generated & registered", "Digital signature affixed to payload", "Signed B2B / B2G QR code payload returned"],
  },
  {
    id: "sync",
    step: "04",
    name: "SAP Sync & Buyer Dispatch",
    desc: "Real-time update of SAP billing document with IRN, QR code, and automated dispatch.",
    protocol: "Instant B2B PDF/XML Dispatch",
    color: "#ffffff",
    status: "DISPATCHED",
    metrics: { label: "Auto-Reconciliation", value: "Instant 100%" },
    checks: ["SAP invoice status set to Cleared", "Signed PDF invoice generated with QR", "Automated email/portal dispatch to buyer"],
  },
];

export default function EInvoiceWorkflow() {
  const reduce = useReducedMotion();
  const [activeJur, setActiveJur] = useState(0);
  const [activeStage, setActiveStage] = useState(2); // Default to Step 3 (IRN Clearance)
  const [isProcessing, setIsProcessing] = useState(false);
  const [invoiceCounter, setInvoiceCounter] = useState(1489240);

  const jur = JURISDICTIONS[activeJur];
  const stage = STAGES[activeStage];

  // Increment counter in real-time
  useEffect(() => {
    const timer = setInterval(() => {
      setInvoiceCounter((prev) => prev + Math.floor(Math.random() * 12) + 3);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const triggerSimulatedClearance = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setActiveStage((prev) => (prev + 1) % STAGES.length);
    }, 800);
  };

  return (
    <div className="relative isolate h-full min-h-full w-full overflow-hidden select-none bg-[#030713] px-3 sm:px-6 lg:px-10 py-3 flex flex-col justify-between">
      {/* ── Glowing Mesh & Cyber Grid Background ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at center, rgba(255, 255, 255,0.18) 1px, transparent 1px),
              linear-gradient(to right, rgba(56,189,248,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "36px 36px, 72px 72px",
          }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[700px] rounded-full bg-[radial-gradient(ellipse,rgba(255, 255, 255,0.16)_0%,transparent_70%)] blur-3xl" />
      </div>

      {/* ── Top Header Controls & Jurisdiction Switcher ── */}
      <div className="relative z-30 flex flex-wrap items-center justify-between gap-2 sm:gap-3 border-b border-white/10 pb-2 sm:pb-3 pt-2 sm:pt-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-white/20 border border-white/40 text-white shadow-[0_0_15px_rgba(255, 255, 255,0.4)]">
            <FileCheck2 className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
          </span>
          <div>
            <h2 className="text-[11px] sm:text-xs lg:text-sm font-mono font-extrabold text-white tracking-wider">
              E-INVOICING PRO · STATUTORY CLEARANCE ENGINE
            </h2>
            <p className="text-[8px] sm:text-[9px] font-mono text-white">
              GLOBAL PEPPOL NETWORK · ZATCA · GST IRP · 100% AUDIT-PROOF
            </p>
          </div>
        </div>

        {/* Global Mandate Selector Pills */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-full rounded-xl bg-black/60 border border-white/10 p-1 backdrop-blur-md no-scrollbar">
          {JURISDICTIONS.map((j, idx) => (
            <button
              key={j.id}
              onClick={() => setActiveJur(idx)}
              className={`whitespace-nowrap rounded-lg px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-mono font-bold transition-all duration-300 ${
                activeJur === idx
                  ? "bg-white text-slate-950 shadow-md shadow-white/20 scale-105"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {j.name.split(" ")[0]} {j.name.split(" ")[1]}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Interactive Clearance Stage ── */}
      <div className="relative z-20 flex-1 min-h-0 my-auto py-2 sm:py-3 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6 items-center overflow-y-auto lg:overflow-visible">
        
        {/* ── LEFT / CENTER COLUMN (6 Cols): Live Glowing Digital Tax Invoice Card ── */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <motion.div
            key={jur.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md rounded-2xl sm:rounded-3xl border border-white/15 bg-gradient-to-b from-[#0e1828]/95 via-[#08101d]/95 to-[#040812]/95 p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative overflow-hidden"
            style={{
              boxShadow: `0 20px 50px -15px ${jur.color}40, 0 0 0 1px rgba(255,255,255,0.1)`,
            }}
          >
            {/* Dynamic Laser Scanning Beam */}
            <motion.div
              animate={{ y: [0, 220, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-x-0 h-1 pointer-events-none z-10 opacity-70"
              style={{
                background: `linear-gradient(90deg, transparent, ${jur.color}, transparent)`,
                boxShadow: `0 0 15px ${jur.color}`,
              }}
            />

            {/* Invoice Card Top Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-white shadow-md font-mono text-xs font-black"
                  style={{ background: jur.color }}
                >
                  <FileText className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[9px] font-mono text-white/50 uppercase">{jur.taxAuthority}</p>
                  <p className="text-xs sm:text-sm font-mono font-extrabold text-white">INV-2026-084920</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] sm:text-[10px] font-mono font-bold bg-white/20 border border-white/40 text-white shadow-[0_0_10px_rgba(255, 255, 255,0.3)]">
                <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
                <span>IRN CLEARED</span>
              </div>
            </div>

            {/* Invoice Core Details Grid */}
            <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] sm:text-[11px] font-mono">
              <div className="rounded-xl bg-white/[0.03] border border-white/8 p-2.5">
                <p className="text-[8px] sm:text-[9px] text-white/40 uppercase">SELLER / SUPPLIER</p>
                <p className="font-bold text-white mt-0.5 truncate">TRIJOTECH GLOBAL LTD</p>
                <p className="text-[8px] text-[#38bdf8]">SAP S/4HANA CLOUD</p>
              </div>

              <div className="rounded-xl bg-white/[0.03] border border-white/8 p-2.5">
                <p className="text-[8px] sm:text-[9px] text-white/40 uppercase">BUYER / RECIPIENT</p>
                <p className="font-bold text-white mt-0.5 truncate">ENTERPRISE CORP AG</p>
                <p className="text-[8px] text-white">PEPPOL ID: 0088:492</p>
              </div>
            </div>

            {/* Cryptographic IRN / Hash Stamp Box */}
            <div className="mt-2.5 rounded-xl bg-black/60 border border-white/10 p-2.5 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px] font-mono text-white/50">
                  <Lock className="h-3 w-3 text-white" />
                  <span>CRYPTOGRAPHIC IRN HASH</span>
                </div>
                <p className="mt-0.5 text-[10px] sm:text-xs font-mono font-extrabold text-white truncate">
                  {jur.irnExample} · SIGNED_OK
                </p>
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 border border-white/20 text-[#38bdf8]">
                <QrCode className="h-5 w-5" />
              </div>
            </div>

            {/* Invoice Line & Total */}
            <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
              <div>
                <p className="text-[8px] font-mono text-white/40 uppercase">TOTAL TAXABLE + STATUTORY TAX</p>
                <p className="text-xs font-mono text-white/70">18.00% Integrated IGST / VAT</p>
              </div>
              <div className="text-right">
                <p className="text-base sm:text-lg font-mono font-extrabold text-white">
                  $128,450.00 <span className="text-[10px] text-white">USD</span>
                </p>
              </div>
            </div>

            {/* Test Clearance Action Button */}
            <div className="mt-3 pt-2 border-t border-white/10">
              <button
                onClick={triggerSimulatedClearance}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 rounded-xl py-2 px-3 text-xs font-mono font-bold text-slate-950 transition-all duration-300 shadow-lg active:scale-95"
                style={{
                  background: isProcessing ? "#fff" : `linear-gradient(135deg, ${jur.color}, #ffffff)`,
                  boxShadow: `0 0 20px ${jur.color}60`,
                }}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>Signing Cryptographic Payload...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-3.5 w-3.5" />
                    <span>Test Instant Government Clearance Handshake</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN (6 Cols): 4-Step Clearance Workflow Deck & Telemetry HUD ── */}
        <div className="lg:col-span-6 flex flex-col gap-2.5 sm:gap-3">
          
          {/* Interactive Step Switcher Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
            {STAGES.map((s, idx) => {
              const isSelected = activeStage === idx;

              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStage(idx)}
                  className={`flex flex-col items-start p-2 sm:p-2.5 rounded-xl border text-left transition-all duration-300 backdrop-blur-xl ${
                    isSelected
                      ? "bg-[#030713]/95 shadow-md scale-[1.02]"
                      : "bg-[#030713]/60 hover:bg-[#030713]/80"
                  }`}
                  style={{
                    borderColor: isSelected ? s.color : "rgba(255,255,255,0.1)",
                    boxShadow: isSelected ? `0 0 15px ${s.color}40` : "none",
                  }}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[8px] font-mono font-extrabold" style={{ color: s.color }}>
                      STEP {s.step}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                  </div>
                  <p className="mt-0.5 text-[10px] sm:text-[11px] font-bold text-white truncate w-full">
                    {s.name.split(" ")[0]}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Stage Breakdown Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl sm:rounded-3xl border border-white/12 bg-[#030713]/95 p-4 sm:p-5 shadow-2xl backdrop-blur-2xl"
              style={{
                boxShadow: `0 20px 45px -15px ${stage.color}40, 0 0 0 1px rgba(255,255,255,0.08)`,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div>
                  <span className="text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-white/50">
                    Step {stage.step} of 04 · Architecture Protocol
                  </span>
                  <h3 className="text-xs sm:text-sm lg:text-base font-bold text-white leading-snug">
                    {stage.name}
                  </h3>
                </div>
                <span
                  className="rounded-full px-2.5 py-0.5 text-[8px] sm:text-[9px] font-mono font-bold"
                  style={{ background: `${stage.color}20`, color: stage.color, border: `1px solid ${stage.color}40` }}
                >
                  {stage.metrics.value}
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {stage.desc}
              </p>

              {/* Checks Checklist */}
              <div className="mt-3 space-y-1.5 pt-2.5 border-t border-white/10">
                <p className="text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-white/40">
                  Compliance Automation Checks
                </p>
                {stage.checks.map((chk) => (
                  <div key={chk} className="flex items-start gap-1.5 text-[10px] sm:text-xs text-white/85">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: stage.color }} />
                    <span>{chk}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Telemetry Metrics */}
              <div className="mt-3 grid grid-cols-3 gap-1.5 pt-2.5 border-t border-white/10 text-center">
                <div className="rounded-lg bg-white/[0.02] border border-white/5 p-1.5">
                  <p className="text-[7px] sm:text-[8px] font-mono text-white/40">CLEARANCE TIME</p>
                  <p className="text-[11px] sm:text-xs font-mono font-bold text-white">&lt; 340 ms</p>
                </div>
                <div className="rounded-lg bg-white/[0.02] border border-white/5 p-1.5">
                  <p className="text-[7px] sm:text-[8px] font-mono text-white/40">ERROR RATE</p>
                  <p className="text-[11px] sm:text-xs font-mono font-bold text-[#38bdf8]">0.00%</p>
                </div>
                <div className="rounded-lg bg-white/[0.02] border border-white/5 p-1.5">
                  <p className="text-[7px] sm:text-[8px] font-mono text-white/40">ERP INTEGRITY</p>
                  <p className="text-[11px] sm:text-xs font-mono font-bold text-white">100% Clean</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Live Invoices Cleared Counter Bar */}
          <div className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/10 px-3 py-1.5 text-[9px] sm:text-[10px] font-mono">
            <span className="text-white/60 flex items-center gap-1.5">
              <Activity className="h-3 w-3 text-white animate-pulse" />
              Live Invoices Cleared This Fiscal Year:
            </span>
            <span className="font-extrabold text-white" suppressHydrationWarning>
              {invoiceCounter.toLocaleString("en-US")} docs
            </span>
          </div>
        </div>
      </div>

      {/* ── Bottom Ribbon: Certified Integration Matrix ── */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 border-t border-white/10 pt-2 text-[9px] sm:text-[10px] font-mono text-white/60">
        <span className="flex items-center gap-1.5 text-white">
          <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> SAP CERTIFIED INTEGRATION FOR S/4HANA & ECC 6.0
        </span>
        <span className="hidden sm:inline">MULTI-COUNTRY STATUTORY CLEARANCE (PEPPOL, ZATCA, GSTN, SDI)</span>
        <span className="text-[#38bdf8]">100% AUDIT & PENALTY PROTECTION</span>
      </div>
    </div>
  );
}
