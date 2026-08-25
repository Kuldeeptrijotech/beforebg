import { Box, Check, Cog, Factory, Gauge, ShieldCheck, Truck, Warehouse } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FlowLink, GlowHalo, Packet, PulseDot, SceneCanvas, SceneText, TRI } from "./scene-ui";

type Tone = "green" | "amber" | "mix" | "dim" | "white";

const HEX = "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)";

const TONE_BG: Record<Tone, string> = {
  green: "linear-gradient(160deg,#22d3ee,#2563eb)",
  amber: "linear-gradient(160deg,#22d3ee,#2563eb)",
  mix: "linear-gradient(135deg,#22d3ee,#2563eb 55%,#ffffff 130%)",
  dim: "linear-gradient(160deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))",
  white: "linear-gradient(160deg,rgba(255,255,255,0.16),rgba(255,255,255,0.05))",
};

const NODES: { x: number; y: number; label: string; sub: string; icon: LucideIcon; tone: Tone }[] = [
  { x: 70, y: 150, label: "Raw material", sub: "Inputs", icon: Box, tone: "dim" },
  { x: 240, y: 150, label: "Production", sub: "Line A", icon: Factory, tone: "green" },
  { x: 410, y: 150, label: "Machine", sub: "CNC unit", icon: Cog, tone: "green" },
  { x: 410, y: 300, label: "Quality", sub: "Checkpoint", icon: ShieldCheck, tone: "amber" },
  { x: 520, y: 300, label: "Warehouse", sub: "Storage", icon: Warehouse, tone: "green" },
  { x: 568, y: 300, label: "Delivery", sub: "Dispatch", icon: Truck, tone: "green" },
];

const PATH = "M70 150 L240 150 L410 150 L410 300 L520 300 L568 300";

const TICKS_Y150 = Array.from({ length: 14 }, (_, i) => 85 + i * 25).filter((x) => x < 405);
const TICKS_Y300 = Array.from({ length: 6 }, (_, i) => 425 + i * 25).filter((x) => x < 562);

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

export default function ManufacturingFlow() {
  return (
    <SceneCanvas bleed className="h-full w-full">
      <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 640 480" preserveAspectRatio="none" fill="none">
        <FlowLink d={PATH} color="rgba(255, 255, 255,0.35)" width={1.5} dash />
        <Packet d={PATH} dur={9} delay={0} color={TRI.mint} r={4} />
        <Packet d={PATH} dur={9} delay={4.5} color={TRI.green} r={3.5} />
        {TICKS_Y150.map((x) => (
          <line key={`t1-${x}`} x1={x} y1={146} x2={x} y2={154} stroke="rgba(191,232,216,0.22)" strokeWidth={1.2} />
        ))}
        {TICKS_Y300.map((x) => (
          <line key={`t2-${x}`} x1={x} y1={296} x2={x} y2={304} stroke="rgba(191,232,216,0.22)" strokeWidth={1.2} />
        ))}
        {NODES.map((n) => (
          <PulseDot key={n.label} cx={n.x} cy={n.y} color={n.tone === "amber" ? TRI.amber : TRI.green} r={3} />
        ))}
        <polygon points="410,289 421,300 410,311 399,300" fill="rgba(255, 255, 255,0.16)" stroke={TRI.amber} strokeWidth={1.4} className="tri-pulse" />
        <path d="M405 300 l4 4 l8 -8" stroke={TRI.amber} strokeWidth={1.6} fill="none" strokeLinecap="round" />
        {[155, 325].map((x) => (
          <polygon key={`d1-${x}`} points={`${x},144 ${x + 6},150 ${x},156 ${x - 6},150`} fill="rgba(255, 255, 255,0.18)" stroke={TRI.green} strokeWidth={1.1} />
        ))}
        <polygon points="544,294 550,300 544,306 538,300" fill="rgba(255, 255, 255,0.18)" stroke={TRI.green} strokeWidth={1.1} />
        <GlowHalo cx={410} cy={300} r={40} color={TRI.amber} opacity={0.13} />
        <SceneText x={410} y={276} size={9} fill="rgba(255, 255, 255,0.6)">QUALITY GATE</SceneText>
        <SceneText x={410} y={330} size={9} fill="rgba(191,232,216,0.4)">VERTICAL TRANSFER</SceneText>
      </svg>

      {NODES.map((n) => (
        <NodeChip key={n.label} {...n} />
      ))}

      <div className="absolute left-[7%] top-[72%] z-10 flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 shadow-lg shadow-black/40 backdrop-blur-md">
        <span aria-hidden className="relative flex h-8 w-8 shrink-0 items-center justify-center" style={{ clipPath: HEX, background: TONE_BG.green }}>
          <Gauge className="h-4 w-4 text-white" strokeWidth={1.8} />
        </span>
        <div className="leading-tight">
          <p className="text-[10px] font-semibold text-white/50">Overall efficiency</p>
          <p className="text-sm font-bold text-white">OEE 91.2%</p>
        </div>
      </div>

      <div className="absolute right-[7%] top-[72%] z-10 flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 shadow-lg shadow-black/40 backdrop-blur-md">
        <span aria-hidden className="relative flex h-8 w-8 shrink-0 items-center justify-center" style={{ clipPath: HEX, background: TONE_BG.amber }}>
          <Check className="h-4 w-4 text-white" strokeWidth={1.8} />
        </span>
        <div className="leading-tight">
          <p className="text-[10px] font-semibold text-white/50">Reject rate</p>
          <p className="text-sm font-bold text-white">Scrap &lt; 0.4%</p>
        </div>
      </div>
    </SceneCanvas>
  );
}
