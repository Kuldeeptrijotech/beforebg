import { BarChart3, CreditCard, Cpu, Database, Landmark, Lock, Router, ShieldCheck } from "lucide-react";
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
  { y: 70, label: "Banking system", sub: "Source ledger", icon: Landmark, tone: "dim" },
  { y: 150, label: "Gateway", sub: "Secure ingress", icon: Router, tone: "green" },
  { y: 230, label: "Processing", sub: "Core engine", icon: Cpu, tone: "green" },
  { y: 310, label: "Ledger", sub: "Posting", icon: Database, tone: "green" },
  { y: 390, label: "Analytics", sub: "Insights", icon: BarChart3, tone: "amber" },
];

const SPINE = "M320 70 L320 390";
const RAIL_L = "M150 70 L150 390";
const RAIL_R = "M490 70 L490 390";

const BARS = [18, 30, 24, 44, 36, 58];

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

function SideChip({ x, label, icon: Icon, tone }: { x: number; label: string; icon: LucideIcon; tone: Tone }) {
  return (
    <div className="absolute z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: `${(x / 640) * 100}%`, top: "47.9%" }}>
      <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-black/35 px-2 py-1 backdrop-blur-sm">
        <span aria-hidden className="relative flex h-5 w-5 shrink-0 items-center justify-center" style={{ clipPath: HEX, background: TONE_BG[tone] }}>
          <Icon className="h-2.5 w-2.5 text-white" strokeWidth={2} />
        </span>
        <span className="text-[9px] font-semibold text-white/70">{label}</span>
      </div>
    </div>
  );
}

export default function FintechFlow() {
  return (
    <SceneCanvas bleed className="h-full w-full">
      <div className="absolute right-6 top-5 z-20 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-1 backdrop-blur-md">
        <ShieldCheck className="h-3 w-3 text-tri-2" />
        <span className="text-[9px] font-bold tracking-wide text-white/70">PCI-READY</span>
      </div>

      <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 640 480" preserveAspectRatio="none" fill="none">
        <rect x={262} y={56} width={116} height={352} rx={20} fill="rgba(41,171,135,0.06)" stroke="rgba(41,171,135,0.18)" strokeWidth={1} />
        <FlowLink d={SPINE} color="rgba(41,171,135,0.4)" width={1.5} dash />
        <Packet d={SPINE} dur={7} delay={0} color={TRI.mint} r={4} />
        <Packet d={SPINE} dur={7} delay={3.5} color={TRI.green} r={3.5} />
        <FlowLink d={RAIL_L} color="rgba(245,166,35,0.28)" width={1.2} dash />
        <FlowLink d={RAIL_R} color="rgba(245,166,35,0.28)" width={1.2} dash />
        <Packet d="M490 390 L490 70" dur={6} delay={0.8} color={TRI.amber} r={3.5} />
        <Packet d="M150 390 L150 70" dur={6} delay={3} color={TRI.amber} r={3.5} />
        {NODES.map((n) => (
          <PulseDot key={n.label} cx={320} cy={n.y} color={n.tone === "amber" ? TRI.amber : TRI.green} r={3} />
        ))}
        <GlowHalo cx={320} cy={230} r={58} color={TRI.green} opacity={0.14} />
        <SceneText x={320} y={56} size={9} fill="rgba(191,232,216,0.45)">PAYMENT AUTHORIZED</SceneText>
        <SceneText x={150} y={420} size={8} fill="rgba(245,166,35,0.5)">AUDIT TRAIL</SceneText>
        <SceneText x={490} y={420} size={8} fill="rgba(245,166,35,0.5)">SETTLEMENT</SceneText>
      </svg>

      {NODES.map((n) => (
        <NodeChip key={n.label} {...n} />
      ))}
      <SideChip x={150} label="Encrypted" icon={Lock} tone="amber" />
      <SideChip x={490} label="Compliant" icon={ShieldCheck} tone="green" />

      <div className="absolute inset-x-[6%] bottom-5 z-10 flex items-center gap-4 rounded-xl border border-white/10 bg-black/35 px-4 py-3 shadow-lg shadow-black/40 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <span aria-hidden className="relative flex h-8 w-8 shrink-0 items-center justify-center" style={{ clipPath: HEX, background: TONE_BG.green }}>
            <CreditCard className="h-4 w-4 text-white" strokeWidth={1.8} />
          </span>
          <div className="leading-tight">
            <p className="text-[10px] font-semibold text-white/50">Volume today</p>
            <p className="text-sm font-bold text-white tri-pulse">2.4M <span className="font-medium text-tri-2">transactions</span></p>
          </div>
        </div>
        <div className="ml-auto flex h-10 items-end gap-1.5">
          {BARS.map((h, i) => (
            <span
              key={i}
              className="w-3 rounded-t-sm bg-[linear-gradient(160deg,#29ab87,#117a4b)]"
              style={{ height: `${h}px`, opacity: 0.7 + i * 0.05, animationDelay: `${i * 0.4}s` }}
            />
          ))}
        </div>
      </div>
    </SceneCanvas>
  );
}
