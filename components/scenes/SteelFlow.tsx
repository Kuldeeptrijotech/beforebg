import { BarChart3, Box, Factory, Gauge, ShieldCheck, Truck, Warehouse } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FlowLink, GlowHalo, Packet, PulseDot, SceneCanvas, SceneText, TRI } from "./scene-ui";

type Tone = "green" | "amber" | "mix" | "dim" | "white";

const HEX = "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)";

const TONE_BG: Record<Tone, string> = {
  green: "linear-gradient(160deg,#29ab87,#117a4b)",
  amber: "linear-gradient(160deg,#f5a623,#f29e16)",
  mix: "linear-gradient(135deg,#29ab87,#117a4b 55%,#f5a623 130%)",
  dim: "linear-gradient(160deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))",
  white: "linear-gradient(160deg,rgba(255,255,255,0.16),rgba(255,255,255,0.05))",
};

const NODES: { x: number; y: number; label: string; sub: string; icon: LucideIcon; tone: Tone }[] = [
  { x: 60, y: 250, label: "Raw material", sub: "Ore & scrap", icon: Box, tone: "dim" },
  { x: 210, y: 220, label: "Production", sub: "Furnace", icon: Factory, tone: "amber" },
  { x: 360, y: 250, label: "Quality", sub: "Spec control", icon: ShieldCheck, tone: "green" },
  { x: 480, y: 220, label: "Inventory", sub: "Coil stock", icon: Warehouse, tone: "green" },
  { x: 560, y: 250, label: "Distribution", sub: "Dispatch", icon: Truck, tone: "green" },
];

const ZIG = "M60 250 L210 250 L210 220 L360 220 L360 250 L480 250 L480 220 L560 220 L560 250";
const COLUMN = "M560 250 L560 90";

const TICKS: { x: number; y: number }[] = [];
for (let x = 75; x <= 195; x += 20) TICKS.push({ x, y: 250 });
for (let x = 225; x <= 345; x += 20) TICKS.push({ x, y: 220 });
for (let x = 375; x <= 465; x += 20) TICKS.push({ x, y: 250 });
for (let x = 495; x <= 545; x += 20) TICKS.push({ x, y: 220 });

const BARS = [
  { x: 592, y: 74, h: 16 },
  { x: 604, y: 66, h: 24 },
  { x: 616, y: 70, h: 20 },
];

function NodeChip({ x, y, label, sub, icon: Icon, tone }: { x: number; y: number; label: string; sub: string; icon: LucideIcon; tone: Tone }) {
  return (
    <div className="absolute z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: `${(x / 640) * 100}%`, top: `${(y / 480) * 100}%` }}>
      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/35 px-2.5 py-1.5 shadow-lg shadow-black/40 backdrop-blur-sm">
        <span aria-hidden className="relative flex h-7 w-7 shrink-0 items-center justify-center" style={{ clipPath: HEX, background: TONE_BG[tone] }}>
          <Icon className="h-3.5 w-3.5 text-white" strokeWidth={1.8} />
        </span>
        <div className="leading-tight">
          <p className="text-[11px] font-semibold text-white">{label}</p>
          <p className="text-[9px] text-white/45">{sub}</p>
        </div>
      </div>
    </div>
  );
}

export default function SteelFlow() {
  return (
    <SceneCanvas bleed className="h-full w-full">
      <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 640 480" preserveAspectRatio="none" fill="none">
        <FlowLink d={ZIG} color="rgba(245,166,35,0.28)" width={2} dash />
        <FlowLink d={COLUMN} color="rgba(245,166,35,0.35)" width={1.5} dash />
        <Packet d={ZIG} dur={10} delay={0} color={TRI.amber} r={4} />
        <Packet d={ZIG} dur={10} delay={5} color={TRI.mint} r={3.5} />
        <Packet d={COLUMN} dur={4} delay={1} color={TRI.amber} r={4} />
        {TICKS.map((t, i) => (
          <line key={i} x1={t.x} y1={t.y - 4} x2={t.x} y2={t.y + 4} stroke="rgba(245,166,35,0.35)" strokeWidth={1.4} />
        ))}
        {NODES.map((n) => (
          <PulseDot key={n.label} cx={n.x} cy={n.y} color={n.tone === "amber" ? TRI.amber : TRI.green} r={3} />
        ))}
        <polygon points="360,239 371,250 360,261 349,250" fill="rgba(41,171,135,0.18)" stroke={TRI.green} strokeWidth={1.4} />
        <path d="M355 250 l4 4 l8 -8" stroke={TRI.green} strokeWidth={1.6} fill="none" strokeLinecap="round" />
        <rect x={192} y={202} width={36} height={36} rx={4} fill="rgba(26,15,6,0.9)" stroke="rgba(245,166,35,0.55)" strokeWidth={1.4} />
        <rect x={198} y={208} width={24} height={24} rx={2} fill="rgba(245,166,35,0.14)" className="tri-pulse" />
        <rect x={204} y={188} width={12} height={14} fill="rgba(245,166,35,0.35)" />
        <rect x={204} y={184} width={12} height={4} fill="rgba(245,166,35,0.2)" />
        {BARS.map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width={10} height={b.h} rx={2} fill={i === 1 ? TRI.amber : "rgba(41,171,135,0.7)"} className="tri-pulse" style={{ animationDelay: `${i * 0.6}s` }} />
        ))}
        <GlowHalo cx={210} cy={220} r={44} color={TRI.amber} opacity={0.2} />
        <GlowHalo cx={560} cy={90} r={30} color={TRI.amber} opacity={0.16} />
        <SceneText x={210} y={276} size={9} fill="rgba(245,166,35,0.7)">HOT ZONE</SceneText>
        <SceneText x={560} y={70} size={9} fill="rgba(245,166,35,0.65)">MONTH-END CLOSE</SceneText>
      </svg>

      {NODES.map((n) => (
        <NodeChip key={n.label} {...n} />
      ))}

      <div className="absolute z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: "87.5%", top: "18.75%" }}>
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/35 px-2.5 py-1.5 shadow-lg shadow-black/40 backdrop-blur-sm">
          <span aria-hidden className="relative flex h-7 w-7 shrink-0 items-center justify-center" style={{ clipPath: HEX, background: TONE_BG.amber }}>
            <BarChart3 className="h-3.5 w-3.5 text-white" strokeWidth={1.8} />
          </span>
          <div className="leading-tight">
            <p className="text-[11px] font-semibold text-white">Financial reporting</p>
            <p className="text-[9px] text-white/45">Group KPIs</p>
          </div>
        </div>
      </div>

      <div className="absolute left-[7%] top-[70%] z-10 flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 shadow-lg shadow-black/40 backdrop-blur-md">
        <span aria-hidden className="relative flex h-8 w-8 shrink-0 items-center justify-center" style={{ clipPath: HEX, background: TONE_BG.green }}>
          <Truck className="h-4 w-4 text-white" strokeWidth={1.8} />
        </span>
        <div className="leading-tight">
          <p className="text-[10px] font-semibold text-white/50">This week</p>
          <p className="text-sm font-bold text-white">8,420 <span className="font-medium text-tri-2">tons shipped</span></p>
        </div>
      </div>

      <div className="absolute right-[7%] top-[70%] z-10 flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 shadow-lg shadow-black/40 backdrop-blur-md">
        <span aria-hidden className="relative flex h-8 w-8 shrink-0 items-center justify-center" style={{ clipPath: HEX, background: TONE_BG.amber }}>
          <Gauge className="h-4 w-4 text-white" strokeWidth={1.8} />
        </span>
        <div className="leading-tight">
          <p className="text-[10px] font-semibold text-white/50">Process yield</p>
          <p className="text-sm font-bold text-amber-300">96.4% <span className="font-medium text-white/70">on spec</span></p>
        </div>
      </div>
    </SceneCanvas>
  );
}
