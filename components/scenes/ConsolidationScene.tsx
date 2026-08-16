"use client";
import { useState, type ReactNode } from "react";
import { BarChart3, Building2, GitMerge, Globe, Scale, TrendingUp } from "lucide-react";
import { FlowLink, GlowHalo, HEX_CLIP, Packet, PulseDot, SceneCanvas, SceneIcon, StageChip, TRI } from "./scene-ui";

const VW = 620;
const VH = 660;
const pc = (x: number, y: number) => ({ left: `${(x / VW) * 100}%`, top: `${(y / VH) * 100}%` });

const HEX = "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)";

const SUBS = [
  { x: 105, y: 105, name: "Company A (US)", sub: "Subsidiary · USD", owned: "100% owned", revenue: "$ 1.2M", ebitda: "+18.4%", localCurrency: "USD", sendAmount: "$ 165k", groupAmount: "€ 152k" },
  { x: 105, y: 205, name: "Company B (UK)", sub: "Subsidiary · GBP", owned: "100% owned", revenue: "£ 890K", ebitda: "+12.1%", localCurrency: "GBP", sendAmount: "£ 92k", groupAmount: "€ 108k" },
  { x: 105, y: 305, name: "Company C (JP)", sub: "Subsidiary · JPY", owned: "78% owned", revenue: "¥ 180M", ebitda: "-2.4%", localCurrency: "JPY", sendAmount: "¥ 18M", groupAmount: "€ 112k" },
  { x: 105, y: 405, name: "Company D (EU)", sub: "Subsidiary · EUR", owned: "100% owned", revenue: "€ 720K", ebitda: "+16.0%", localCurrency: "EUR", sendAmount: "€ 125k", groupAmount: "€ 125k" },
];

const ARROWS = [
  { d: "M178 105 Q258 130 322 155", dur: 5, delay: 0 },
  { d: "M178 205 Q258 168 324 156", dur: 5, delay: 1.2 },
  { d: "M178 305 Q262 205 326 160", dur: 5, delay: 2.4 },
  { d: "M178 405 Q270 222 328 164", dur: 5, delay: 3.6 },
];

const INTERCO = [
  { d: "M192 205 L330 250", dur: 7, delay: 0 },
  { d: "M192 405 L330 250", dur: 7, delay: 3.5 },
];

const CHAIN_Y: Array<{ y: number; label: string; sub: string; icon: typeof Scale; tone: "green" | "mix" | "amber" }> = [
  { y: 250, label: "Elimination", sub: "Intercompany ×", icon: Scale, tone: "green" },
  { y: 340, label: "Currency Translation", sub: "IFRS · group currency", icon: Globe, tone: "mix" },
  { y: 430, label: "Group Reporting", sub: "Consolidated statements", icon: BarChart3, tone: "green" },
  { y: 520, label: "CFO Analytics", sub: "KPIs & commentary", icon: TrendingUp, tone: "amber" },
];

const BAR_HEIGHTS = [26, 40, 34, 52, 44, 60, 30, 46];

function MiniCube({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" className={className} aria-hidden>
      <path d="M9 2 L15 5.5 L15 12.5 L9 16 L3 12.5 L3 5.5 Z" fill="rgba(41,171,135,0.2)" stroke="#7edcc2" strokeWidth="1" />
      <path d="M9 2 L9 8 L3 5.5 M9 8 L15 5.5 M9 8 L9 16" stroke="#7edcc2" strokeWidth="0.8" opacity="0.7" />
    </svg>
  );
}

function CubePacket({ d, dur, delay, color = TRI.mint }: { d: string; dur: number; delay: number; color?: string }) {
  return (
    <g>
      <g>
        <animateMotion dur={`${dur}s`} begin={`-${delay}s`} repeatCount="indefinite" path={d} />
        <polygon points="0,-5 4.5,-2.5 4.5,2.5 0,5 -4.5,2.5 -4.5,-2.5" fill={color} opacity="0.9" />
        <path d="M0 -5 L4.5 -2.5 M0 -5 L-4.5 -2.5 M0 -5 L0 5" stroke="rgba(5,8,23,0.55)" strokeWidth="0.8" />
      </g>
    </g>
  );
}

function LedgerDoc({ d, dur, delay, amount }: { d: string; dur: number; delay: number; amount: string }) {
  return (
    <g>
      <animateMotion dur={`${dur}s`} begin={`-${delay}s`} repeatCount="indefinite" path={d} rotate="auto" />
      <g>
        <rect x="-16" y="-22" width="32" height="44" rx="3" fill="rgba(4,12,24,0.92)" stroke="#7edcc2" strokeWidth="1.3" />
        <path d="M6 -22 L6 -7 L21 -7 Z" fill="rgba(126,220,194,0.16)" stroke="#7edcc2" strokeWidth="1.1" strokeLinejoin="round" />
        <rect x="-10" y="-13" width="15" height="1.5" rx="0.7" fill="rgba(191,232,216,0.85)" />
        <rect x="-10" y="-8.5" width="20" height="1.5" rx="0.7" fill="rgba(191,232,216,0.5)" />
        <rect x="-10" y="-4" width="12" height="1.5" rx="0.7" fill="rgba(191,232,216,0.5)" />
        <text x="-14" y="6" fontSize="6.5" fontWeight={700} fill="#7edcc2" style={{ fontFamily: "Poppins, sans-serif" }}>
          {amount}
        </text>
        <rect x="-10" y="10" width="2.2" height="5" rx="0.5" fill="rgba(191,232,216,0.7)" />
        <rect x="-6.4" y="10" width="3.2" height="5" rx="0.5" fill="rgba(191,232,216,0.5)" />
        <rect x="-2" y="10" width="2.2" height="5" rx="0.5" fill="rgba(191,232,216,0.7)" />
        <rect x="1.6" y="10" width="3.2" height="5" rx="0.5" fill="rgba(191,232,216,0.45)" />
      </g>
    </g>
  );
}

function Anchor({ children, x, y, className = "", onMouseEnter, onMouseLeave }: { children: ReactNode; x: number; y: number; className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <div
      className={`absolute -translate-x-1/2 -translate-y-1/2 ${className}`}
      style={pc(x, y)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}

export default function ConsolidationScene() {
  const [activeSub, setActiveSub] = useState<number | null>(null);

  return (
    <SceneCanvas bleed className="h-full w-full">
      <div className="absolute right-6 top-5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold text-tri-2 transition-all duration-300">
        {activeSub !== null ? `Focusing: ${SUBS[activeSub].name}` : "4 entities → 1 Group View (EUR)"}
      </div>

      <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="none" fill="none">
        <GlowHalo cx={360} cy={160} r={86} color={TRI.green} opacity={0.14} />
        <GlowHalo cx={360} cy={520} r={60} color={TRI.amber} opacity={0.1} />

        {ARROWS.map((a, i) => {
          const isFocused = activeSub === i;
          const isDimmed = activeSub !== null && !isFocused;
          return (
            <g key={i} className="transition-all duration-300" style={{ opacity: isDimmed ? 0.15 : 1 }}>
              <FlowLink
                d={a.d}
                color={isFocused ? "#f5a623" : "rgba(41,171,135,0.45)"}
                width={isFocused ? 2.6 : 1.5}
                dash={!isFocused}
              />
              <CubePacket d={a.d} dur={isFocused ? a.dur * 0.4 : a.dur} delay={a.delay} color={isFocused ? TRI.amber : TRI.mint} />
              <path
                d="M316 147 L324 155 L316 163"
                stroke={isFocused ? "#f5a623" : "rgba(126,220,194,0.8)"}
                strokeWidth={isFocused ? 2.4 : 1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="tri-pulse"
              />
            </g>
          );
        })}

        {/* LedgerDoc documents on link lines with local currencies */}
        <g className="transition-all duration-300" style={{ opacity: activeSub === 0 || activeSub === null ? 1 : 0.12 }}>
          <LedgerDoc d={ARROWS[0].d} dur={activeSub === 0 ? ARROWS[0].dur * 0.4 : ARROWS[0].dur} delay={ARROWS[0].delay} amount="$ 165k" />
        </g>
        <g className="transition-all duration-300" style={{ opacity: activeSub === 1 || activeSub === null ? 1 : 0.12 }}>
          <LedgerDoc d={ARROWS[1].d} dur={activeSub === 1 ? ARROWS[1].dur * 0.4 : ARROWS[1].dur} delay={ARROWS[1].delay} amount="£ 92k" />
        </g>
        <g className="transition-all duration-300" style={{ opacity: activeSub === 2 || activeSub === null ? 1 : 0.12 }}>
          <LedgerDoc d={ARROWS[2].d} dur={activeSub === 2 ? ARROWS[2].dur * 0.4 : ARROWS[2].dur} delay={ARROWS[2].delay} amount="¥ 18M" />
        </g>

        {INTERCO.map((l, i) => (
          <g key={i} className="transition-opacity duration-300" style={{ opacity: activeSub === null ? 1 : 0.2 }}>
            <FlowLink d={l.d} color="rgba(245,166,35,0.45)" width={1.4} dash />
            <Packet d={l.d} dur={l.dur} delay={l.delay} color={TRI.amber} r={3} />
          </g>
        ))}

        <FlowLink d="M360 190 L360 220" color="rgba(245,166,35,0.5)" width={1.5} dash />
        <path d="M354 210 L360 218 L366 210" stroke="#f5a623" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="tri-pulse" />
        <circle cx="360" cy="250" r="20" fill="none" stroke="#f5a623" strokeWidth={1.1} opacity="0.65" className="tri-ring" />
        <path d="M347 237 L373 263" stroke="#f5a623" strokeWidth={2.6} strokeLinecap="round" className="tri-pulse" />
        <path d="M373 237 L347 263" stroke="#f5a623" strokeWidth={2.6} strokeLinecap="round" className="tri-pulse" />

        <FlowLink d="M360 280 L360 310" color="rgba(41,171,135,0.45)" width={1.5} dash />
        <FlowLink d="M360 370 L360 400" color="rgba(41,171,135,0.45)" width={1.5} dash />
        <FlowLink d="M360 460 L360 490" color="rgba(41,171,135,0.45)" width={1.5} dash />
        <FlowLink d="M360 550 L360 572" color="rgba(41,171,135,0.55)" width={1.5} dash />
        <FlowLink d="M360 596 L360 572" color="rgba(41,171,135,0.35)" width={1.5} dash />

        <Packet d="M360 190 L360 218" dur={2.5} delay={0} color={TRI.amber} r={3} />
        <Packet d="M360 280 L360 310" dur={3} delay={0} color={TRI.mint} r={3} />
        <Packet d="M360 370 L360 400" dur={3} delay={1} color={TRI.mint} r={3} />
        <Packet d="M360 460 L360 490" dur={3} delay={2} color={TRI.mint} r={3} />
        <Packet d="M360 550 L360 572" dur={3} delay={0.5} color={TRI.amber} r={3.5} />

        {CHAIN_Y.map((c) => (
          <PulseDot key={c.y} cx={360} cy={c.y} color={TRI.green} r={3} dur={2.8} />
        ))}
        <PulseDot cx={360} cy={600} color={TRI.amber} r={3} dur={2.8} />
      </svg>

      {/* Subsidiary entity cards */}
      {SUBS.map((s, i) => {
        const isFocused = activeSub === i;
        const isDimmed = activeSub !== null && !isFocused;
        return (
          <Anchor
            key={s.name}
            x={s.x}
            y={s.y}
            onMouseEnter={() => setActiveSub(i)}
            onMouseLeave={() => setActiveSub(null)}
          >
            <div
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2 cursor-pointer transition-all duration-300 border backdrop-blur-md ${
                isFocused
                  ? "border-[#29ab87] bg-white/[0.14] scale-105 shadow-[0_0_20px_rgba(41,171,135,0.3)]"
                  : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
              }`}
              style={{ opacity: isDimmed ? 0.35 : 1 }}
            >
              <SceneIcon icon={Building2} tone={isFocused ? "amber" : "green"} size={26} />
              <div className="leading-tight">
                <p className="text-[12px] font-semibold text-white">{s.name}</p>
                <p className="text-[10px] text-white/45">{s.sub}</p>
                <p className="mt-0.5 text-[9px] font-bold text-tri-2">{s.owned}</p>
              </div>
              <MiniCube className={`ml-1 transition-transform duration-300 ${isFocused ? "scale-110 rotate-12" : "tri-wave"}`} />
            </div>
          </Anchor>
        );
      })}

      {/* Central Consolidation Hub */}
      <Anchor x={360} y={160}>
        <span aria-hidden className="absolute left-1/2 top-1/2 -z-10 h-[130px] w-[130px] -translate-x-1/2 -translate-y-1/2 blur-xl" style={{ clipPath: HEX_CLIP, background: activeSub !== null ? "rgba(245,166,35,0.4)" : "rgba(41,171,135,0.4)" }} />
        <div className="relative flex items-center justify-center transition-transform duration-300 hover:scale-105" style={{ width: 86, height: 86, clipPath: HEX, background: activeSub !== null ? "linear-gradient(135deg,#f5a623,#f29e16 65%,#117a4b 140%)" : "linear-gradient(135deg,#29ab87,#117a4b 55%,#f5a623 130%)" }}>
          <GitMerge className="h-9 w-9 text-white" strokeWidth={1.8} />
        </div>
        <p className="mt-2.5 text-center text-[13px] font-bold text-white">Consolidation</p>
        <p className="text-center text-[10px] text-white/45">Statutory · group level</p>
        <span className="mt-1.5 inline-block rounded-full bg-[rgba(41,171,135,0.2)] px-2 py-0.5 text-[9px] font-bold text-tri-2">Equity method · 100%</span>
      </Anchor>

      {/* Standard process flow chips */}
      {CHAIN_Y.map((c) => (
        <Anchor key={c.label} x={360} y={c.y}>
          <StageChip icon={c.icon} label={c.label} sub={c.sub} tone={c.tone} pulse={c.tone === "amber"} />
        </Anchor>
      ))}

      {/* Floating Exchange Rate Ticker Card */}
      <Anchor x={485} y={340} className="w-[160px] pointer-events-none z-20">
        <div className="rounded-lg border border-white/10 bg-black/60 p-2 text-[9px] leading-tight text-white/60 backdrop-blur-md">
          <p className="font-bold text-tri-2">Smart FX Translation</p>
          <div className="mt-1 space-y-0.5 font-mono">
            <p>USD → EUR: <span className="text-white font-semibold">0.92</span></p>
            <p>GBP → EUR: <span className="text-white font-semibold">1.17</span></p>
            <p>JPY → EUR: <span className="text-white font-semibold">0.0062</span></p>
          </div>
        </div>
      </Anchor>

      {/* Floating Intercompany Offset Card */}
      <Anchor x={485} y={250} className="w-[160px] pointer-events-none z-20">
        <div className="rounded-lg border border-white/10 bg-black/60 p-2 text-[9px] leading-tight text-white/60 backdrop-blur-md">
          <p className="font-bold text-[#f5a623]">Intercompany Offset</p>
          <div className="mt-1 space-y-0.5 font-mono">
            <p>IC Sales: <span className="text-[#f5a623]">-$42k</span></p>
            <p>IC Loans: <span className="text-[#f5a623]">-$15k</span></p>
            <p className="text-white font-semibold">Net offset: <span className="text-tri-2">€57k</span></p>
          </div>
        </div>
      </Anchor>

      {/* Floating Audit and Governance Card */}
      <Anchor x={485} y={430} className="w-[160px] pointer-events-none z-20">
        <div className="rounded-lg border border-white/10 bg-black/60 p-2 text-[9px] leading-tight text-white/60 backdrop-blur-md">
          <p className="font-bold text-tri-2">Governance & Control</p>
          <div className="mt-1 space-y-0.5">
            <p>Rule: <span className="text-white font-mono font-semibold">IFRS & US-GAAP</span></p>
            <p>Trace: <span className="text-white font-mono font-semibold">Active Log</span></p>
            <p>Sox: <span className="text-[#29ab87] font-semibold">Compliant close</span></p>
          </div>
        </div>
      </Anchor>

      {/* Dynamic Report card */}
      <Anchor x={360} y={600} className="w-[300px]">
        <div className="tri-glass rounded-2xl p-4 border border-white/10 hover:border-tri-2 transition-colors duration-300 bg-black/50 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-white/85 transition-all duration-300">
              {activeSub !== null ? `${SUBS[activeSub].name} close` : "Consolidated P&L (EUR)"}
            </p>
            <span className="rounded-full bg-[rgba(41,171,135,0.22)] px-2 py-0.5 text-[9px] font-bold text-tri-2 transition-all duration-300">
              {activeSub !== null ? `LOCAL: ${SUBS[activeSub].localCurrency}` : "GROUP VIEW"}
            </span>
          </div>
          <div className="mt-2.5 flex h-11 items-end gap-1.5">
            {BAR_HEIGHTS.map((h, i) => {
              const isHighlighted = activeSub === null || i % 4 === activeSub;
              return (
                <span
                  key={i}
                  className="w-2.5 rounded-t-sm transition-all duration-500"
                  style={{
                    height: h,
                    background: isHighlighted ? "linear-gradient(180deg,#7edcc2,#29ab87)" : "rgba(255,255,255,0.06)",
                    boxShadow: isHighlighted ? "0 0 8px rgba(41, 171, 135, 0.3)" : "none",
                    animationDelay: `${i * 0.12}s`
                  }}
                />
              );
            })}
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[9px] transition-all duration-300">
            <span className="text-white/40">
              {activeSub !== null ? `Local: ${SUBS[activeSub].sendAmount} → Group: ${SUBS[activeSub].groupAmount}` : "EBITDA +14.2%"}
            </span>
            <span className="font-bold text-tri-2">
              {activeSub !== null ? `Local EBITDA: ${SUBS[activeSub].ebitda}` : "Net margin +6.8%"}
            </span>
          </div>
        </div>
      </Anchor>
    </SceneCanvas>
  );
}
