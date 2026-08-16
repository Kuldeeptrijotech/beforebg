import {
  Activity,
  ArrowRight,
  FlaskConical,
  Package,
  Search,
  ShieldCheck,
  TestTube,
} from "lucide-react";
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

const OUTER: { x: number; y: number; label: string; sub: string; icon: LucideIcon; tone: Tone; bond: string }[] = [
  { x: 120, y: 110, label: "Discovery", sub: "Target screening", icon: Search, tone: "green", bond: "M120 110 L320 220" },
  { x: 520, y: 110, label: "Lab data", sub: "Assay & batch", icon: TestTube, tone: "green", bond: "M520 110 L320 220" },
  { x: 120, y: 330, label: "Clinical", sub: "Trial outcomes", icon: Activity, tone: "mix", bond: "M120 330 L320 220" },
  { x: 520, y: 330, label: "Distribution", sub: "Supply & trace", icon: Package, tone: "amber", bond: "M520 330 L320 220" },
];

const TRACE = "M120 330 Q320 430 520 330";

const RING = [
  { x: 372, y: 220 },
  { x: 346, y: 265 },
  { x: 294, y: 265 },
  { x: 268, y: 220 },
  { x: 294, y: 175 },
  { x: 346, y: 175 },
];

function NodeChip({ x, y, label, sub, icon: Icon, tone, size = 28 }: { x: number; y: number; label: string; sub: string; icon: LucideIcon; tone: Tone; size?: number }) {
  return (
    <div className="absolute z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: `${(x / 640) * 100}%`, top: `${(y / 480) * 100}%` }}>
      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/35 px-2.5 py-1.5 shadow-lg shadow-black/40 backdrop-blur-sm">
        <span aria-hidden className="relative flex shrink-0 items-center justify-center" style={{ width: size, height: size, clipPath: HEX, background: TONE_BG[tone] }}>
          <Icon className="text-white" style={{ width: size * 0.5, height: size * 0.5 }} strokeWidth={1.8} />
        </span>
        <div className="leading-tight">
          <p className="text-[11px] font-semibold text-white">{label}</p>
          <p className="text-[9px] text-white/45">{sub}</p>
        </div>
      </div>
    </div>
  );
}

const LIFECYCLE = ["R&D", "Manufacturing", "Quality", "Distribution"] as const;

export default function PharmaNetwork() {
  return (
    <SceneCanvas bleed className="h-full w-full">
      <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 640 480" preserveAspectRatio="none" fill="none">
        {OUTER.map((o) => (
          <FlowLink key={o.label} d={o.bond} color="rgba(41,171,135,0.32)" width={1.3} />
        ))}
        {OUTER.map((o, i) => (
          <Packet key={o.label} d={o.bond} dur={5.5} delay={i * 1.4} color={o.tone === "amber" ? TRI.amber : TRI.mint} r={3.5} />
        ))}
        <FlowLink d={TRACE} color="rgba(245,166,35,0.35)" width={1.3} dash />
        <Packet d={TRACE} dur={6} delay={0.5} color={TRI.amber} r={3.5} />
        {OUTER.map((o) => (
          <PulseDot key={`dot-${o.label}`} cx={o.x} cy={o.y} color={o.tone === "amber" ? TRI.amber : TRI.green} r={3} />
        ))}
        {RING.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3.4} fill={i % 2 === 0 ? TRI.green : TRI.mint} opacity={0.85} />
        ))}
        <circle cx={320} cy={220} r={52} fill="none" stroke="rgba(41,171,135,0.2)" strokeWidth={1} />
        <circle cx={320} cy={220} r={52} fill="none" stroke="rgba(41,171,135,0.18)" strokeWidth={1} transform="rotate(90 320 220)" />
        <GlowHalo cx={320} cy={220} r={60} color={TRI.green} opacity={0.16} />
        <SceneText x={320} y={300} size={9} fill="rgba(245,166,35,0.55)">SUPPLY TRACEABILITY</SceneText>
      </svg>

      <div className="absolute z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: "50%", top: "45.8%" }}>
        <div className="flex flex-col items-center gap-1">
          <span aria-hidden className="relative flex h-12 w-12 items-center justify-center" style={{ clipPath: HEX, background: TONE_BG.green, filter: "drop-shadow(0 6px 18px rgba(41,171,135,0.45))" }}>
            <FlaskConical className="h-6 w-6 text-white" strokeWidth={1.8} />
          </span>
          <div className="rounded-md border border-white/10 bg-black/40 px-2 py-1 text-center">
            <p className="text-[10px] font-bold leading-none text-white">Compound</p>
            <p className="text-[9px] leading-tight text-white/45">Integrated data</p>
          </div>
        </div>
      </div>

      {OUTER.map((o) => (
        <NodeChip key={o.label} {...o} />
      ))}

      <div className="absolute inset-x-6 bottom-5 z-10 flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-black/35 px-4 py-2.5 shadow-lg shadow-black/40 backdrop-blur-md">
        {LIFECYCLE.map((step, i) => (
          <div key={step} className="flex items-center gap-1.5">
            {i > 0 && <ArrowRight className="h-3 w-3 text-tri-3" />}
            <span className={`flex items-center gap-1.5 rounded-md px-2 py-1 ${i === 2 ? "bg-[rgba(245,166,35,0.14)]" : "bg-[rgba(41,171,135,0.14)]"}`}>
              {i === 2 ? <ShieldCheck className="h-3 w-3 text-amber-300" /> : <span className="h-1.5 w-1.5 rounded-full bg-tri-2" />}
              <span className="text-[10px] font-semibold text-white/80">{step}</span>
            </span>
          </div>
        ))}
      </div>
    </SceneCanvas>
  );
}
