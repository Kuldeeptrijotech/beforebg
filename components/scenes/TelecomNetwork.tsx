import { Activity, BarChart3, Cloud, Database, Network, RadioTower } from "lucide-react";
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

const NODES: { y: number; label: string; sub: string; icon: LucideIcon; tone: Tone }[] = [
  { y: 80, label: "Tower", sub: "Cell sites", icon: RadioTower, tone: "amber" },
  { y: 170, label: "Network", sub: "Core routing", icon: Network, tone: "green" },
  { y: 260, label: "Cloud", sub: "BTP runtime", icon: Cloud, tone: "green" },
  { y: 350, label: "SAP", sub: "ERP & finance", icon: Database, tone: "green" },
  { y: 440, label: "Analytics", sub: "Real-time KPIs", icon: BarChart3, tone: "amber" },
];

const SPINE = "M320 80 L320 440";
const SPINE_REV = "M320 440 L320 80";

const ARCS = [
  { d: "M320 80 Q275 125 320 170", rev: "M320 170 Q275 125 320 80", color: TRI.amber },
  { d: "M320 170 Q365 215 320 260", rev: "M320 260 Q365 215 320 170", color: TRI.green },
  { d: "M320 260 Q275 305 320 350", rev: "M320 350 Q275 305 320 260", color: TRI.amber },
  { d: "M320 350 Q365 395 320 440", rev: "M320 440 Q365 395 320 350", color: TRI.green },
];

function NodeChip({ y, label, sub, icon: Icon, tone }: { y: number; label: string; sub: string; icon: LucideIcon; tone: Tone }) {
  return (
    <div className="absolute z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: "50%", top: `${(y / 480) * 100}%` }}>
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

function SignalBars({ className }: { className?: string }) {
  return (
    <div className={`flex items-end gap-1 ${className ?? ""}`}>
      {[12, 18, 26, 34].map((h, i) => (
        <span key={i} className="w-1.5 rounded-sm bg-[linear-gradient(160deg,#29ab87,#117a4b)] tri-pulse" style={{ height: `${h}px`, animationDelay: `${i * 0.4}s` }} />
      ))}
    </div>
  );
}

export default function TelecomNetwork() {
  return (
    <SceneCanvas bleed className="h-full w-full">
      <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 640 480" preserveAspectRatio="none" fill="none">
        <FlowLink d={SPINE} color="rgba(41,171,135,0.4)" width={1.5} dash />
        <Packet d={SPINE} dur={7} delay={0} color={TRI.mint} r={4} />
        <Packet d={SPINE} dur={7} delay={3.5} color={TRI.green} r={3.5} />
        <Packet d={SPINE_REV} dur={7} delay={1.5} color={TRI.amber} r={4} />
        <Packet d={SPINE_REV} dur={7} delay={5} color={TRI.amber} r={3.5} />
        {ARCS.map((a, i) => (
          <g key={i}>
            <FlowLink d={a.d} color="rgba(191,232,216,0.28)" width={1.2} dash />
            <Packet d={a.rev} dur={3.6} delay={i * 0.9} color={a.color} r={3} />
          </g>
        ))}
        <path d="M285 80 Q252 92 252 124" stroke="rgba(245,166,35,0.4)" strokeWidth={1.3} fill="none" className="tri-dash" />
        <path d="M355 80 Q388 92 388 124" stroke="rgba(41,171,135,0.4)" strokeWidth={1.3} fill="none" className="tri-dash" />
        {NODES.map((n) => (
          <PulseDot key={n.label} cx={320} cy={n.y} color={n.tone === "amber" ? TRI.amber : TRI.green} r={3} />
        ))}
        {[1, 2, 3].map((i) => (
          <circle key={i} cx={320} cy={80} r={12} fill="none" stroke="rgba(245,166,35,0.55)" strokeWidth={1}>
            <animate attributeName="r" values={`${12 + i * 8};${12 + i * 8 + 34}`} dur={`${2.4 + i * 0.4}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.55;0" dur={`${2.4 + i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <GlowHalo cx={320} cy={80} r={30} color={TRI.amber} opacity={0.18} />
        <GlowHalo cx={320} cy={260} r={48} color={TRI.green} opacity={0.13} />
        <SceneText x={320} y={52} size={9} fill="rgba(245,166,35,0.65)">RADIO ACCESS</SceneText>
        <SceneText x={320} y={470} size={9} fill="rgba(191,232,216,0.45)">FULL-DUPLEX TRAFFIC</SceneText>
      </svg>

      {NODES.map((n) => (
        <NodeChip key={n.label} {...n} />
      ))}

      <SignalBars className="absolute left-[7%] top-[38%] z-10" />
      <SignalBars className="absolute right-[7%] top-[38%] z-10" />

      <div className="absolute bottom-5 left-[7%] z-10 flex items-center gap-2 rounded-lg border border-white/10 bg-black/35 px-3 py-1.5 backdrop-blur-md">
        <Activity className="h-3.5 w-3.5 text-tri-2" />
        <span className="text-[10px] font-semibold text-white/75">Uptime 99.98%</span>
      </div>
      <div className="absolute bottom-5 right-[7%] z-10 flex items-center gap-2 rounded-lg border border-white/10 bg-black/35 px-3 py-1.5 backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-tri-3 tri-pulse" />
        <span className="text-[10px] font-semibold text-white/75">Live across 5 layers</span>
      </div>
    </SceneCanvas>
  );
}
