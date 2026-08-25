"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Banknote,
  Boxes,
  Clapperboard,
  Coins,
  Database,
  Factory,
  Film,
  Flame,
  FlaskConical,
  Gauge,
  Layers,
  MonitorPlay,
  RadioTower,
  Receipt,
  ShieldCheck,
  Store,
  Truck,
  Users,
  Warehouse,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { GlowHalo, HEX_CLIP, Packet, PulseDot } from "./scene-ui";

/* ─────────────────────────────────────────────────────────────
   Industry video hero.
   A self-playing "video" motion-graphics scene that tells the
   story of how SAP integrates into each sector:

     · The Trijotech tri-color logo mark (deep green / mint /
       amber hexagons) is the central SAP hub.
     · Sector nodes pulse and push live data into the hub.
     · The hub beams integrated insight out to a dashboard.
     · Animated video captions narrate the SAP integration.
     · A looping timeline bar makes it feel like a film.

   Full-bleed and silent — the animation carries the story.
   ───────────────────────────────────────────────────────────── */

const TRI = {
  deep: "#ffffff",
  mint: "#ffffff",
  amber: "#ffffff",
  navy: "#232555",
};

type Tone = "deep" | "mint" | "amber";

const TONE: Record<Tone, string> = {
  deep: TRI.deep,
  mint: TRI.mint,
  amber: TRI.amber,
};

const TONE_HEX_BG: Record<Tone, string> = {
  deep: "linear-gradient(160deg,#1c8a5b,#0d5c39)",
  mint: "linear-gradient(160deg,#3bc79d,#1d8a6c)",
  amber: "linear-gradient(160deg,#ffb63d,#df8a12)",
};

type Node = {
  id: string;
  icon: LucideIcon;
  label: string;
  x: number;
  y: number;
  tone: Tone;
};

type Kpi = { value: string; label: string; tone: Tone };

type Shot = {
  id: string;
  caption: string;
  sub: string;
  kpis?: Kpi[];
};

type GoodsSpec = { color: Tone; dur: number; delay: number; size?: number };

type Config = {
  glyph: LucideIcon;
  hubLabel: string;
  hubSub: string;
  nodes: Node[];
  shots: Shot[];
  /* cinematic goods-flow story (e.g. retail: suppliers → warehouses → stores) */
  goodsPath?: string;
  goods?: GoodsSpec[];
  destination?: Node;
};

/* Node / hub / insight layout in viewBox coords (1000 x 640). */
const HUB = { x: 500, y: 318 };
const INSIGHT = { x: 905, y: 150 };
const LINE = (n: Node) => `M ${HUB.x} ${HUB.y} L ${n.x} ${n.y}`;
const INSIGHT_PATH = `M ${HUB.x} ${HUB.y} Q 700 215 ${INSIGHT.x} ${INSIGHT.y}`;

const SHOT_MS = 4600;
const EASE = [0.22, 1, 0.36, 1] as const;

const CONFIGS: Record<string, Config> = {
  "retail-supply-chain": {
    glyph: Boxes,
    hubLabel: "SAP S/4HANA",
    hubSub: "Intelligent ERP for retail",
    nodes: [
      { id: "suppliers", icon: Truck, label: "Suppliers", x: 500, y: 138, tone: "deep" },
      { id: "warehouses", icon: Warehouse, label: "Warehouses", x: 196, y: 392, tone: "mint" },
      { id: "stores", icon: Store, label: "Stores", x: 804, y: 392, tone: "amber" },
    ],
    goodsPath: "M500 138 C 430 218 300 300 196 392 C 380 432 620 432 804 392 C 850 462 872 500 916 544",
    goods: [
      { color: "deep", dur: 9, delay: 0, size: 11 },
      { color: "mint", dur: 9, delay: 3, size: 9 },
      { color: "amber", dur: 9, delay: 6, size: 10 },
    ],
    destination: { id: "customers", icon: Users, label: "Customers", x: 916, y: 546, tone: "amber" },
    shots: [
      {
        id: "connect",
        caption: "SAP connects your entire retail value chain",
        sub: "suppliers · warehouses · stores — one live platform",
      },
      {
        id: "integrate",
        caption: "Inventory, demand and fulfillment inside SAP",
        sub: "planning, forecasting and delivery on a single system",
        kpis: [
          { value: "99.8%", label: "Inventory accuracy", tone: "deep" },
          { value: "+8.2%", label: "Demand forecast", tone: "mint" },
          { value: "98.7%", label: "On-time delivery", tone: "amber" },
        ],
      },
      {
        id: "decide",
        caption: "SAP turns retail data into faster decisions",
        sub: "one trusted source of truth for every department",
      },
    ],
  },

  "pharmaceuticals-life-sciences": {
    glyph: FlaskConical,
    hubLabel: "SAP S/4HANA",
    hubSub: "One compliant backbone",
    nodes: [
      { id: "rnd", icon: FlaskConical, label: "R&D", x: 500, y: 138, tone: "deep" },
      { id: "production", icon: Factory, label: "Production", x: 196, y: 392, tone: "mint" },
      { id: "distribution", icon: Truck, label: "Distribution", x: 804, y: 392, tone: "amber" },
    ],
    shots: [
      {
        id: "connect",
        caption: "SAP unifies pharma operations end to end",
        sub: "R&D · production · distribution on one system",
      },
      {
        id: "comply",
        caption: "Serialization and compliance built into SAP",
        sub: "validated, audit-ready and fully traceable",
        kpis: [
          { value: "100%", label: "FDA compliance", tone: "deep" },
          { value: "99.99%", label: "Unit traceability", tone: "mint" },
          { value: "98.9%", label: "Batch yield", tone: "amber" },
        ],
      },
      {
        id: "agile",
        caption: "SAP gives life sciences real agility",
        sub: "finance, supply and quality in perfect sync",
      },
    ],
  },

  manufacturing: {
    glyph: Factory,
    hubLabel: "SAP S/4HANA",
    hubSub: "Connected plant ERP",
    nodes: [
      { id: "shopfloor", icon: Factory, label: "Shop floor", x: 500, y: 138, tone: "deep" },
      { id: "quality", icon: Gauge, label: "Quality", x: 196, y: 392, tone: "mint" },
      { id: "finance", icon: Banknote, label: "Finance", x: 804, y: 392, tone: "amber" },
    ],
    shots: [
      {
        id: "connect",
        caption: "SAP connects finance to the shop floor",
        sub: "planning · production · quality on one system",
      },
      {
        id: "visibility",
        caption: "Live visibility across every plant in SAP",
        sub: "process data flowing straight into decisions",
        kpis: [
          { value: "93.4%", label: "Overall OEE", tone: "deep" },
          { value: "99.98%", label: "Process uptime", tone: "mint" },
          { value: "-6.8%", label: "Scrap rate", tone: "amber" },
        ],
      },
      {
        id: "excel",
        caption: "SAP powers operational excellence",
        sub: "transparency from the machine to the boardroom",
      },
    ],
  },

  fintech: {
    glyph: Coins,
    hubLabel: "SAP BTP",
    hubSub: "Cloud integration & automation",
    nodes: [
      { id: "payments", icon: Banknote, label: "Payments", x: 500, y: 138, tone: "deep" },
      { id: "ledgers", icon: Receipt, label: "Ledgers", x: 196, y: 392, tone: "mint" },
      { id: "risk", icon: ShieldCheck, label: "Risk", x: 804, y: 392, tone: "amber" },
    ],
    shots: [
      {
        id: "automate",
        caption: "SAP automates the fintech financial core",
        sub: "payments · ledgers · risk on one secure platform",
      },
      {
        id: "realtime",
        caption: "Every transaction reconciled in real time",
        sub: "SAP BTP integrates and automates everything",
        kpis: [
          { value: "0.18s", label: "Reconciliation", tone: "deep" },
          { value: "4.8M", label: "Transactions / day", tone: "mint" },
          { value: "0.01%", label: "Fraud rate", tone: "amber" },
        ],
      },
      {
        id: "scale",
        caption: "SAP scales fintech with intelligence",
        sub: "secure, agile and ready for tomorrow",
      },
    ],
  },

  entertainment: {
    glyph: Clapperboard,
    hubLabel: "SAP Analytics Cloud",
    hubSub: "Planning & reporting hub",
    nodes: [
      { id: "content", icon: Film, label: "Content", x: 500, y: 138, tone: "deep" },
      { id: "rights", icon: MonitorPlay, label: "Rights", x: 196, y: 392, tone: "mint" },
      { id: "distribution", icon: Clapperboard, label: "Distribution", x: 804, y: 392, tone: "amber" },
    ],
    shots: [
      {
        id: "centralize",
        caption: "SAP centralises media & entertainment finance",
        sub: "content · rights · distribution on one system",
      },
      {
        id: "settle",
        caption: "Royalties, rights and revenue inside SAP",
        sub: "accurate settlements, faster releases",
        kpis: [
          { value: "100%", label: "Royalty accuracy", tone: "deep" },
          { value: "1.4M", label: "Stream concurrency", tone: "mint" },
          { value: "99.2%", label: "CDN hit rate", tone: "amber" },
        ],
      },
      {
        id: "grow",
        caption: "SAP accelerates entertainment growth",
        sub: "collaboration and insight across every team",
      },
    ],
  },

  "steel-manufacturing": {
    glyph: Flame,
    hubLabel: "SAP BW/4HANA",
    hubSub: "Analytics & KPI backbone",
    nodes: [
      { id: "melting", icon: Flame, label: "Melting", x: 500, y: 138, tone: "deep" },
      { id: "casting", icon: Layers, label: "Casting", x: 196, y: 392, tone: "mint" },
      { id: "logistics", icon: Truck, label: "Logistics", x: 804, y: 392, tone: "amber" },
    ],
    shots: [
      {
        id: "link",
        caption: "SAP links steel production to profitability",
        sub: "melting · casting · logistics on one system",
      },
      {
        id: "kpis",
        caption: "Live KPIs from every furnace inside SAP",
        sub: "production data streaming into business insight",
        kpis: [
          { value: "94.6%", label: "Melting efficiency", tone: "deep" },
          { value: "99.98%", label: "Steel purity", tone: "mint" },
          { value: "0 LTI", label: "Safety record", tone: "amber" },
        ],
      },
      {
        id: "excel",
        caption: "SAP drives efficiency, quality and safety",
        sub: "from molten metal to the boardroom",
      },
    ],
  },

  telecommunications: {
    glyph: RadioTower,
    hubLabel: "SAP S/4HANA",
    hubSub: "Unified operations core",
    nodes: [
      { id: "network", icon: RadioTower, label: "Network", x: 500, y: 138, tone: "deep" },
      { id: "billing", icon: Receipt, label: "Billing", x: 196, y: 392, tone: "mint" },
      { id: "subscribers", icon: Users, label: "Subscribers", x: 804, y: 392, tone: "amber" },
    ],
    shots: [
      {
        id: "unify",
        caption: "SAP unifies telecom operations end to end",
        sub: "network · billing · subscribers on one platform",
      },
      {
        id: "oneview",
        caption: "Billing and network data in one place",
        sub: "SAP enables agile, intelligent telecom",
        kpis: [
          { value: "4.2ms", label: "Data latency", tone: "deep" },
          { value: "120k/s", label: "CDR ingestion", tone: "mint" },
          { value: "1.4Gbps", label: "Throughput", tone: "amber" },
        ],
      },
      {
        id: "grow",
        caption: "SAP powers smarter telecom experiences",
        sub: "visibility across every department and service",
      },
    ],
  },
};

/* ── Tri-color hexagon (logo composition) ─────────────────── */
function HexChip({
  icon: Icon,
  tone,
  size,
  glyph = false,
}: {
  icon: LucideIcon;
  tone: Tone;
  size: number;
  glyph?: boolean;
}) {
  return (
    <span
      className="relative inline-flex items-center justify-center"
      style={{
        width: size,
        height: size,
        filter: `drop-shadow(0 0 22px ${TONE[tone]}59)`,
        zIndex: glyph ? 2 : 1,
      }}
    >
      <span aria-hidden className="absolute inset-0" style={{ clipPath: HEX_CLIP, background: TONE_HEX_BG[tone] }} />
      <span aria-hidden className="absolute inset-0" style={{ clipPath: HEX_CLIP, boxShadow: `inset 0 0 0 1.5px ${TONE[tone]}aa` }} />
      {glyph && <span aria-hidden className="absolute inset-0 tri-pulse" style={{ clipPath: HEX_CLIP, background: `radial-gradient(circle at 50% 40%, ${TONE[tone]}55, transparent 70%)` }} />}
      <Icon className="relative" style={{ width: size * 0.46, height: size * 0.46, color: "#ffffff" }} strokeWidth={1.7} />
    </span>
  );
}

/* ── Sector node chip (HTML, positioned over the SVG) ─────── */
function NodeChip({ node }: { node: Node }) {
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ left: `${node.x / 10}%`, top: `${node.y / 6.4}%`, transform: "translate(-50%, -50%)" }}
    >
      <HexChip icon={node.icon} tone={node.tone} size={54} />
      <span
        className="mt-2 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] backdrop-blur-md"
        style={{
          borderColor: `${TONE[node.tone]}44`,
          background: `${TONE[node.tone]}14`,
          color: "#eafaf3",
        }}
      >
        {node.label}
      </span>
    </div>
  );
}

/* ── Moving goods crate for cinematic goods-flow stories ───── */
function GoodsPacket({ d, color, dur, delay, size = 10 }: { d: string; color: Tone; dur: number; delay: number; size?: number }) {
  const c = TONE[color];
  const r = size;
  return (
    <g>
      <rect x={-r} y={-r * 0.72} width={r * 2} height={r * 1.44} rx={2.5} fill={`${c}26`} stroke={c} strokeWidth={1.3} />
      <line x1={-r} y1={-r * 0.12} x2={r} y2={-r * 0.12} stroke={c} strokeOpacity={0.55} strokeWidth={1} />
      <rect x={-r * 0.2} y={-r * 1.04} width={r * 0.4} height={r * 0.34} rx={1} fill="none" stroke={c} strokeOpacity={0.75} strokeWidth={1} />
      <animateMotion dur={`${dur}s`} begin={`-${delay}s`} repeatCount="indefinite" path={d} rotate="auto" />
    </g>
  );
}

/* ── SAP hub = the three tri-color logo hexagons ───────────── */
function SapHub({ config }: { config: Config }) {
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ left: `${HUB.x / 10}%`, top: `${HUB.y / 6.4}%`, transform: "translate(-50%, -50%)" }}
    >
      <div className="flex items-center">
        <HexChip icon={Database} tone="deep" size={56} />
        <div style={{ marginLeft: -12, marginRight: -12 }}>
          <HexChip icon={config.glyph} tone="mint" size={74} glyph />
        </div>
        <HexChip icon={Zap} tone="amber" size={56} />
      </div>
      <div
        className="mt-4 flex items-center gap-2 rounded-full border border-white/12 bg-[#0b1d33]/70 px-3.5 py-1.5 backdrop-blur-md"
        style={{ boxShadow: "0 0 34px rgba(255, 255, 255,0.35)" }}
      >
        <span className="text-[10px] font-extrabold uppercase tracking-[0.22em]" style={{ color: TRI.amber }}>
          SAP
        </span>
        <span className="h-3 w-px bg-white/15" />
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white">{config.hubLabel}</span>
        <span className="hidden text-[9px] font-medium text-white/50 sm:inline">· {config.hubSub}</span>
      </div>
    </div>
  );
}

export default function IndustryVideoScene({ slug = "retail-supply-chain" }: { slug?: string }) {
  const config = CONFIGS[slug] ?? CONFIGS["retail-supply-chain"];
  const reduce = useReducedMotion();
  const [shot, setShot] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setShot((s) => (s + 1) % config.shots.length);
    }, SHOT_MS);
    return () => window.clearInterval(id);
  }, [reduce, config.shots.length]);

  const current = config.shots[shot];
  const goodsPath = config.goodsPath;
  const goods = config.goods;

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* bright tri-color aurora — guarantees visible motion */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={reduce ? {} : { scale: [1, 1.12, 1], x: ["0%", "2%", "0%"], y: ["0%", "-1.5%", "0%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(55% 45% at 28% 22%, rgba(255, 255, 255,0.32), transparent 62%), radial-gradient(48% 42% at 72% 28%, rgba(255, 255, 255,0.26), transparent 60%), radial-gradient(75% 55% at 50% 100%, rgba(255, 255, 255,0.32), transparent 68%)",
        }}
      />
      {/* tri-color ambient glow */}
      <div className="pointer-events-none absolute left-[12%] top-[16%] h-80 w-80 rounded-full blur-3xl tri-pulse" style={{ background: "radial-gradient(circle, rgba(255, 255, 255,0.34), transparent 68%)" }} />
      <div className="pointer-events-none absolute right-[10%] top-[12%] h-72 w-72 rounded-full blur-3xl tri-pulse" style={{ background: "radial-gradient(circle, rgba(255, 255, 255,0.26), transparent 68%)", animationDelay: "1.4s" }} />
      <div className="pointer-events-none absolute bottom-[14%] right-[26%] h-72 w-72 rounded-full blur-3xl tri-pulse" style={{ background: "radial-gradient(circle, rgba(255, 255, 255,0.3), transparent 68%)", animationDelay: "2.6s" }} />

      {/* slow cinematic camera drift */}
      <motion.div
        className="absolute inset-0"
        animate={reduce ? {} : { scale: [1, 1.07, 1], x: ["0%", "-1.5%", "0%"] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1000 640"
          preserveAspectRatio="none"
          fill="none"
          style={{ pointerEvents: "none" }}
        >
          {/* connection lines */}
          {config.nodes.map((n) => (
            <path key={`line-${n.id}`} d={LINE(n)} stroke={TONE[n.tone]} strokeOpacity={0.38} strokeWidth={1.5} strokeDasharray="3 9" />
          ))}
          <path d={INSIGHT_PATH} stroke={TRI.amber} strokeOpacity={0.3} strokeWidth={1.5} strokeDasharray="4 9" />

          {/* cinematic goods-flow route (retail: suppliers → warehouses → stores) */}
          {goodsPath && (
            <path d={goodsPath} stroke={TRI.amber} strokeOpacity={0.22} strokeWidth={1.4} strokeDasharray="2 9" />
          )}
          {goodsPath &&
            goods &&
            goods.map((g, i) => (
              <GoodsPacket key={`goods-${i}`} d={goodsPath} color={g.color} dur={g.dur} delay={g.delay} size={g.size} />
            ))}

          {/* data packets node → SAP hub */}
          {config.nodes.map((n, i) => (
            <Packet key={`packet-${n.id}`} d={LINE(n)} dur={6} delay={i * 1.8} color={TONE[n.tone]} r={3.5} />
          ))}
          {/* integrated insight hub → dashboard */}
          <Packet d={INSIGHT_PATH} dur={7} delay={1} color={TRI.amber} r={3.5} />
          <Packet d={INSIGHT_PATH} dur={7} delay={4.4} color={TRI.mint} r={3} />

          {/* pulsing nodes */}
          {config.nodes.map((n, i) => (
            <PulseDot key={`dot-${n.id}`} cx={n.x} cy={n.y} color={TONE[n.tone]} r={3} dur={2.4 + i} />
          ))}
          <PulseDot cx={HUB.x} cy={HUB.y} color={TRI.mint} r={4} dur={2.8} />

          <GlowHalo cx={HUB.x} cy={HUB.y} r={120} color={TRI.mint} opacity={0.1} />
          <GlowHalo cx={INSIGHT.x} cy={INSIGHT.y} r={60} color={TRI.amber} opacity={0.12} />
        </svg>

        {/* sector nodes */}
        {config.nodes.map((n) => (
          <NodeChip key={n.id} node={n} />
        ))}

        {/* goods-flow destination (retail customers) */}
        {config.destination && (
          <div
            className="absolute hidden flex-col items-center sm:flex"
            style={{ left: `${config.destination.x / 10}%`, top: `${config.destination.y / 6.4}%`, transform: "translate(-50%, -50%)" }}
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ border: `1.5px solid ${TONE[config.destination.tone]}66`, background: `${TONE[config.destination.tone]}1a`, boxShadow: `0 0 28px ${TONE[config.destination.tone]}40` }}
            >
              <config.destination.icon className="h-5.5 w-5.5" style={{ color: TONE[config.destination.tone] }} strokeWidth={1.8} />
            </div>
            <span
              className="mt-1.5 whitespace-nowrap rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] backdrop-blur-md"
              style={{ borderColor: `${TONE[config.destination.tone]}44`, background: `${TONE[config.destination.tone]}14`, color: "#eafaf3" }}
            >
              {config.destination.label}
            </span>
          </div>
        )}

        {/* central SAP hub (logo tri-color composition) */}
        <SapHub config={config} />

        {/* insight target */}
        <div
          className="absolute flex items-center justify-center"
          style={{ left: `${INSIGHT.x / 10}%`, top: `${INSIGHT.y / 6.4}%`, transform: "translate(-50%, -50%)" }}
        >
          <div className="flex h-14 w-14 items-center justify-center" style={{ clipPath: HEX_CLIP, background: "linear-gradient(160deg, rgba(255, 255, 255,0.9), rgba(223,138,18,0.95))", boxShadow: "0 0 40px rgba(255, 255, 255,0.55)" }}>
            <Activity className="h-7 w-7 text-white" strokeWidth={1.7} />
          </div>
        </div>
      </motion.div>

      {/* cinematic vignette */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_95%_at_50%_42%,transparent_58%,rgba(3,7,19,0.38)_100%)]" />

      {/* cinematic light rays */}
      {!reduce && (
        <div aria-hidden className="pointer-events-none absolute -left-1/4 -top-1/3 h-[150%] w-32 rotate-[16deg] bg-gradient-to-b from-[rgba(255, 255, 255,0.07)] via-[rgba(255,255,255,0.02)] to-transparent blur-2xl" />
      )}
      {!reduce && (
        <div aria-hidden className="pointer-events-none absolute -right-1/4 top-1/4 h-[130%] w-44 rotate-[-14deg] bg-gradient-to-b from-[rgba(255, 255, 255,0.06)] via-transparent to-transparent blur-3xl" />
      )}

      {/* scanning light sweep */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="absolute inset-y-0 w-56 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent blur-md"
          animate={{ x: ["-20%", "130%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      )}

      {/* ── video captions (animated narration) ── */}
      <div className="absolute inset-x-0 bottom-16 z-20 flex flex-col items-center px-5 text-center sm:bottom-20 sm:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(3px)" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="flex w-full max-w-3xl flex-col items-center"
          >
            <p className="tri-gradient-text text-[clamp(1.05rem,2.6vw,1.9rem)] font-extrabold leading-tight tracking-tight">
              {current.caption}
            </p>
            <p className="mt-2 text-[clamp(0.72rem,1.6vw,0.95rem)] font-semibold uppercase tracking-[0.18em] text-slate-300/85">
              {current.sub}
            </p>

            {current.kpis && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {current.kpis.map((k, i) => (
                  <motion.div
                    key={k.label}
                    initial={{ opacity: 0, scale: 0.8, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease: EASE }}
                    className="flex min-w-[132px] items-center gap-3 rounded-2xl border bg-[#0b1d33]/55 px-4 py-3 backdrop-blur-md"
                    style={{ borderColor: `${TONE[k.tone]}44` }}
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: TONE[k.tone], boxShadow: `0 0 12px ${TONE[k.tone]}` }} />
                    <span>
                      <span className="block text-lg font-extrabold leading-none" style={{ color: TONE[k.tone] }}>
                        {k.value}
                      </span>
                      <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60">
                        {k.label}
                      </span>
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── looping video timeline ── */}
      <div className="absolute inset-x-0 bottom-5 z-30 flex gap-1.5 px-5 sm:px-8 lg:px-12">
        {config.shots.map((s, i) => {
          const done = i < shot;
          const active = i === shot;
          return (
            <div key={s.id} className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/10">
              {done && <div className="absolute inset-0 rounded-full" style={{ background: i % 3 === 0 ? TRI.deep : i % 3 === 1 ? TRI.mint : TRI.amber }} />}
              {active && !reduce && (
                <motion.div
                  key={`fill-${shot}`}
                  className="absolute inset-0 rounded-full"
                  style={{ background: "linear-gradient(90deg,#22d3ee,#2563eb,#ffffff)" }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: SHOT_MS / 1000, ease: "linear" }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
