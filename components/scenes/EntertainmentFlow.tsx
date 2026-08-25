import { BarChart3, CircleDollarSign, Clapperboard, MonitorDot, Sparkles, Users } from "lucide-react";
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

const OUTER: { x: number; y: number; label: string; sub: string; icon: LucideIcon; tone: Tone; line: string }[] = [
  { x: 170, y: 105, label: "Platform", sub: "Distribution", icon: MonitorDot, tone: "green", line: "M170 105 L320 230" },
  { x: 470, y: 90, label: "Audience", sub: "Engagement", icon: Users, tone: "green", line: "M470 90 L320 230" },
  { x: 500, y: 340, label: "Revenue", sub: "Monetization", icon: CircleDollarSign, tone: "amber", line: "M500 340 L320 230" },
  { x: 160, y: 350, label: "Analytics", sub: "Performance", icon: BarChart3, tone: "green", line: "M160 350 L320 230" },
];

const SPARKS = [
  { x: 96, y: 70 },
  { x: 560, y: 150 },
  { x: 120, y: 430 },
  { x: 520, y: 430 },
  { x: 330, y: 56 },
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

export default function EntertainmentFlow() {
  return (
    <SceneCanvas bleed className="h-full w-full">
      <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 640 480" preserveAspectRatio="none" fill="none">
        {OUTER.map((o) => (
          <FlowLink key={o.label} d={o.line} color={o.tone === "amber" ? "rgba(255, 255, 255,0.4)" : "rgba(255, 255, 255,0.4)"} width={1.4} dash />
        ))}
        {OUTER.map((o, i) => (
          <Packet key={o.label} d={o.line} dur={4.5} delay={i * 1.1} color={o.tone === "amber" ? TRI.amber : TRI.mint} r={3.5} />
        ))}
        {OUTER.map((o) => (
          <PulseDot key={`dot-${o.label}`} cx={o.x} cy={o.y} color={o.tone === "amber" ? TRI.amber : TRI.green} r={3} />
        ))}
        <circle cx={320} cy={230} r={74} fill="none" stroke="rgba(255, 255, 255,0.22)" strokeWidth={1} strokeDasharray="4 10" className="tri-dash" />
        <circle cx={320} cy={230} r={108} fill="none" stroke="rgba(255, 255, 255,0.12)" strokeWidth={1} />
        {SPARKS.map((s, i) => (
          <Sparkles key={i} x={s.x} y={s.y} className="tri-pulse" style={{ width: 12, height: 12 }} />
        ))}
        <GlowHalo cx={320} cy={230} r={70} color={TRI.amber} opacity={0.16} />
        <SceneText x={320} y={368} size={9} fill="rgba(191,232,216,0.45)">ENGAGE → MONETIZE → MEASURE</SceneText>
      </svg>

      <div className="absolute z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: "50%", top: "47.9%" }}>
        <div className="flex flex-col items-center gap-1">
          <span aria-hidden className="relative flex h-12 w-12 items-center justify-center" style={{ clipPath: HEX, background: TONE_BG.amber, filter: "drop-shadow(0 6px 18px rgba(255, 255, 255,0.4))" }}>
            <Clapperboard className="h-6 w-6 text-white" strokeWidth={1.8} />
          </span>
          <div className="rounded-md border border-white/10 bg-black/40 px-2 py-1 text-center">
            <p className="text-[10px] font-bold leading-none text-white">Content hub</p>
            <p className="text-[9px] leading-tight text-white/45">Catalog & rights</p>
          </div>
        </div>
      </div>

      {OUTER.map((o) => (
        <NodeChip key={o.label} {...o} />
      ))}
    </SceneCanvas>
  );
}
