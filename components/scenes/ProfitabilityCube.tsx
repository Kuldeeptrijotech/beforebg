"use client";
import { ArrowRight, Banknote, BarChart3, Coins, Globe, Layers, Package, TrendingUp, Users } from "lucide-react";
import { ConnectorLine, Packet, SceneCanvas, StageChip } from "./scene-ui";

const CUBE_SIZE = 170;
const HALF = CUBE_SIZE / 2;

const FACES = [
  { t: `rotateY(0deg) translateZ(${HALF}px)`, label: "P × C × R", sub: "Profit cells" },
  { t: `rotateY(180deg) translateZ(${HALF}px)`, label: "Profit", sub: "Deep-dive" },
  { t: `rotateY(90deg) translateZ(${HALF}px)`, label: "×", sub: "Drivers" },
  { t: `rotateY(-90deg) translateZ(${HALF}px)`, label: "×", sub: "Allocation" },
  { t: `rotateX(90deg) translateZ(${HALF}px)`, label: "Profitability", sub: "3D view" },
  { t: `rotateX(-90deg) translateZ(${HALF}px)`, label: "Margin", sub: "Net +6.8%" },
];

const PIPELINE = [
  { label: "Revenue", sub: "€ 4.2M", icon: Coins, tone: "green" as const },
  { label: "Costs", sub: "€ 3.1M", icon: Banknote, tone: "amber" as const },
  { label: "Allocation", sub: "Cost pools", icon: Layers, tone: "green" as const },
  { label: "Margin", sub: "Gross 34%", icon: TrendingUp, tone: "amber" as const },
  { label: "Profitability", sub: "Net +6.8%", icon: BarChart3, tone: "green" as const },
];

const DIMENSIONS = [
  { label: "Product", icon: Package, left: "12%", top: "27%" },
  { label: "Customer", icon: Users, left: "78%", top: "12%" },
  { label: "Region", icon: Globe, left: "78%", top: "60%" },
];

const BARS = [22, 34, 46, 30, 52, 40, 62, 44, 28];

function CubeFace({ transform, label, sub, emphasis = false }: { transform: string; label: string; sub: string; emphasis?: boolean }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{
        transform,
        transformStyle: "preserve-3d",
        backgroundColor: "rgba(41,171,135,0.07)",
        backgroundImage: "radial-gradient(circle, rgba(126,220,194,0.4) 1px, transparent 1.6px)",
        backgroundSize: "18px 18px",
        border: "1px solid rgba(126,220,194,0.4)",
        boxShadow: "inset 0 0 26px rgba(126,220,194,0.08)",
      }}
    >
      <p className="text-[11px] font-black tracking-[0.22em] text-[#7edcc2]" style={{ transform: "translateZ(2px)" }}>
        {label}
      </p>
      <p className={`mt-1 text-[8px] font-semibold tracking-widest ${emphasis ? "text-tri-3" : "text-[rgba(191,232,216,0.55)]"}`} style={{ transform: "translateZ(2px)" }}>
        {sub}
      </p>
    </div>
  );
}

export default function ProfitabilityCube() {
  return (
    <SceneCanvas bleed className="h-full w-full">
      <div className="absolute right-6 top-5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold text-tri-2">Multi-dimensional</div>

      <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 1000 1000" preserveAspectRatio="none" fill="none">
        <path d="M190 340 L360 320" stroke="rgba(41,171,135,0.4)" strokeWidth="2" className="tri-dash" />
        <path d="M790 200 L640 320" stroke="rgba(41,171,135,0.4)" strokeWidth="2" className="tri-dash" />
        <path d="M780 680 L640 600" stroke="rgba(245,166,35,0.4)" strokeWidth="2" className="tri-dash" />
        <path d="M300 760 L372 600" stroke="rgba(245,166,35,0.5)" strokeWidth="2.2" className="tri-dash" />

        <Packet d="M190 340 L360 320" dur={3.2} delay={0} color="#7edcc2" r={4.5} />
        <Packet d="M790 200 L640 320" dur={3.2} delay={1.1} color="#7edcc2" r={4.5} />
        <Packet d="M780 680 L640 600" dur={3.2} delay={2.2} color="#f5a623" r={4.5} />
        <Packet d="M300 760 L372 600" dur={2.6} delay={0.5} color="#f5a623" r={5} />
      </svg>

      <ArrowRight className="absolute left-[29.5%] top-[63.5%] h-4 w-4 -translate-y-1/2 text-amber-400 tri-pulse" />

      {DIMENSIONS.map((d) => (
        <div
          key={d.label}
          className={`absolute inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold backdrop-blur-md tri-wave ${d.label === "Region" ? "border-[rgba(245,166,35,0.35)] bg-[rgba(245,166,35,0.12)] text-tri-3" : "border-[rgba(126,220,194,0.35)] bg-[rgba(41,171,135,0.12)] text-tri-2"}`}
          style={{ left: d.left, top: d.top }}
        >
          <d.icon className="h-3 w-3" />
          {d.label}
        </div>
      ))}

      <div className="absolute left-[9%] top-1/2 flex -translate-y-1/2 flex-col items-center">
        {PIPELINE.map((p, i) => (
          <div key={p.label} className={`relative ${i < PIPELINE.length - 1 ? "mb-8" : ""}`}>
            {i < PIPELINE.length - 1 && <ConnectorLine />}
            <StageChip
              className="w-[155px]"
              icon={p.icon}
              label={p.label}
              sub={p.sub}
              tone={p.tone}
              pulse={p.label === "Profitability"}
            />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute left-1/2 top-[61%] h-7 w-60 -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,rgba(41,171,135,0.28),transparent_70%)] blur-sm tri-pulse" />

      <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2" style={{ width: CUBE_SIZE, height: CUBE_SIZE, perspective: "1100px" }}>
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d", transform: "rotateX(-24deg) rotateY(-30deg)" }}>
          <div className="tri-spin-slow absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            {FACES.map((f, i) => (
              <CubeFace key={i} transform={f.t} label={f.label} sub={f.sub} emphasis={i === 5} />
            ))}
          </div>
          <div className="tri-spin-slow absolute left-1/2 top-1/2" style={{ width: 112, height: 112, transformStyle: "preserve-3d", transform: "translate(-50%, -50%)", animationDirection: "reverse" }}>
            {FACES.map((f, i) => (
              <div
                key={i}
                className="absolute inset-0"
                style={{
                  transform: f.t.replace(`${HALF}px`, "56px"),
                  backgroundColor: "rgba(245,166,35,0.05)",
                  border: "1px solid rgba(245,166,35,0.35)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-[5%] right-[6%] w-[320px]">
        <div className="tri-glass rounded-2xl px-5 py-3.5 border border-white/10 hover:border-tri-2 transition-colors duration-300">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-white/85">Margin by segment</p>
            <span className="tri-pulse rounded-full bg-[rgba(245,166,35,0.18)] px-2 py-0.5 text-[9px] font-bold text-tri-3">PROFIT</span>
          </div>
          <div className="mt-2.5 flex h-14 items-end gap-1.5 border-b border-white/10 pb-px">
            {BARS.map((h, i) => (
              <span
                key={i}
                className={`tri-pulse w-3.5 rounded-t-sm ${i % 3 === 2 ? "bg-[linear-gradient(180deg,#f5a623,#f29e16)]" : "bg-[linear-gradient(180deg,#7edcc2,#29ab87)]"}`}
                style={{ height: h, animationDelay: `${i * 0.16}s` }}
              />
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between text-[9px]">
            <span className="flex items-center gap-1.5 text-white/45">
              <span className="h-1.5 w-1.5 rounded-full bg-tri-2" /> Gross margin 34%
            </span>
            <span className="flex items-center gap-1.5 font-bold text-tri-3">
              <span className="h-1.5 w-1.5 rounded-full bg-tri-3" /> Net +6.8%
            </span>
          </div>
        </div>
      </div>
    </SceneCanvas>
  );
}
