import {
  Boxes,
  Factory,
  PackageCheck,
  Store,
  TrendingUp,
  Truck,
  Warehouse,
} from "lucide-react";
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
  { x: 70, y: 150, label: "Supplier", sub: "Raw goods", icon: Truck, tone: "dim" },
  { x: 170, y: 150, label: "Factory", sub: "Production", icon: Factory, tone: "green" },
  { x: 270, y: 150, label: "Warehouse", sub: "Storage", icon: Warehouse, tone: "green" },
  { x: 370, y: 150, label: "Inventory", sub: "Stock levels", icon: Boxes, tone: "green" },
  { x: 470, y: 150, label: "Store", sub: "Point of sale", icon: Store, tone: "amber" },
  { x: 570, y: 150, label: "Customer", sub: "Delivered", icon: PackageCheck, tone: "green" },
];

const SPINE = "M70 150 L570 150";
const RETURN = "M570 252 L70 252";

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

export default function SupplyChainScene() {
  return (
    <SceneCanvas bleed className="h-full w-full">
      <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 640 480" preserveAspectRatio="none" fill="none">
        <FlowLink d={SPINE} color="rgba(255, 255, 255,0.35)" width={1.5} dash />
        <FlowLink d={RETURN} color="rgba(255, 255, 255,0.3)" width={1.3} dash />
        <Packet d={SPINE} dur={8} delay={0} color={TRI.mint} r={4} />
        <Packet d={SPINE} dur={8} delay={4} color={TRI.green} r={3.5} />
        <Packet d={RETURN} dur={7} delay={1} color={TRI.amber} r={3.5} />
        {NODES.map((n) => (
          <PulseDot key={n.label} cx={n.x} cy={n.y} color={n.tone === "amber" ? TRI.amber : TRI.green} r={3} />
        ))}
        {[120, 230, 330, 430, 530].map((mx) => (
          <path key={mx} d={`M${mx - 6} 143 l8 7 l-8 7`} stroke="rgba(191,232,216,0.35)" strokeWidth={1.4} fill="none" />
        ))}
        <GlowHalo cx={470} cy={150} r={42} color={TRI.amber} opacity={0.15} />
        <GlowHalo cx={570} cy={150} r={46} color={TRI.green} opacity={0.14} />
        <SceneText x={70} y={112} size={9} fill="rgba(191,232,216,0.4)">START</SceneText>
        <SceneText x={570} y={112} size={9} fill="rgba(191,232,216,0.45)">END</SceneText>
        <SceneText x={330} y={236} size={9} fill="rgba(255, 255, 255,0.55)">DEMAND SIGNAL</SceneText>
      </svg>

      {NODES.map((n) => (
        <NodeChip key={n.label} {...n} />
      ))}

      <div className="absolute left-[7%] top-[70%] z-10 flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 shadow-lg shadow-black/40 backdrop-blur-md">
        <span aria-hidden className="relative flex h-8 w-8 shrink-0 items-center justify-center" style={{ clipPath: HEX, background: TONE_BG.green }}>
          <Boxes className="h-4 w-4 text-white" strokeWidth={1.8} />
        </span>
        <div className="leading-tight">
          <p className="text-[10px] font-semibold text-white/50">Inventory</p>
          <p className="text-sm font-bold text-white">12,480 units <span className="font-medium text-tri-2">in stock</span></p>
        </div>
      </div>

      <div className="absolute right-[7%] top-[70%] z-10 flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 shadow-lg shadow-black/40 backdrop-blur-md">
        <span aria-hidden className="relative flex h-8 w-8 shrink-0 items-center justify-center" style={{ clipPath: HEX, background: TONE_BG.amber }}>
          <TrendingUp className="h-4 w-4 text-white" strokeWidth={1.8} />
        </span>
        <div className="leading-tight">
          <p className="text-[10px] font-semibold text-white/50">Demand signal</p>
          <p className="text-sm font-bold text-white">+8.2% <span className="font-medium text-white/70">forecast</span></p>
        </div>
      </div>
    </SceneCanvas>
  );
}
