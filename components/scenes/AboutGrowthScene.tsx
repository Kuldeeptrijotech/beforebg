import { Award, Compass, Handshake, TrendingUp, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Packet, PulseDot, SceneCanvas, StageChip, TRI } from "./scene-ui";

type Milestone = {
  label: string;
  sub: string;
  icon: LucideIcon;
  tone?: "green" | "amber" | "dim" | "white";
  x: string;
  y: string;
  cx: number;
  cy: number;
};

const MILESTONES: Milestone[] = [
  { label: "Founded", sub: "2015", icon: Compass, tone: "dim", x: "7.5%", y: "78%", cx: 40, cy: 390 },
  { label: "SAP Expertise", sub: "Global projects", icon: Award, x: "25%", y: "66%", cx: 130, cy: 330 },
  { label: "Partnerships", sub: "Across industries", icon: Handshake, x: "45%", y: "50.4%", cx: 233, cy: 252 },
  { label: "Team & reach", sub: "Scaling together", icon: Users, x: "67%", y: "34%", cx: 347, cy: 169 },
  { label: "Momentum", sub: "Today", icon: TrendingUp, tone: "amber", x: "90%", y: "19%", cx: 470, cy: 95 },
];

export default function AboutGrowthScene() {
  return (
    <SceneCanvas className="min-h-[560px] rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50" hex grid>
      <div className="absolute left-6 top-5 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-tri-2 tri-pulse" />
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/60">Our growth story</p>
      </div>
      <div className="absolute right-6 top-5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold text-tri-2">Since 2015</div>

      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 520 500"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="growArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#29ab87" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#29ab87" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path d="M40 390 C150 330 300 180 470 95 L470 470 L40 470 Z" fill="url(#growArea)" />
        <path d="M40 470 L470 470" stroke="rgba(191,232,216,0.12)" strokeWidth="1.2" strokeDasharray="3 6" />

        <g>
          <rect x={31} y={390} width={14} height={80} fill="#29ab87" opacity={0.16} />
          <rect x={123} y={330} width={14} height={140} fill="#29ab87" opacity={0.18} />
          <rect x={225} y={252} width={14} height={218} fill="#29ab87" opacity={0.2} />
          <rect x={340} y={169} width={14} height={301} fill="#29ab87" opacity={0.22} />
          <rect x={462} y={95} width={14} height={375} fill="#f5a623" opacity={0.28} />
        </g>

        <path d="M40 390 C150 330 300 180 470 95" stroke="rgba(41,171,135,0.85)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M40 390 C150 330 300 180 470 95" stroke="rgba(191,232,216,0.18)" strokeWidth="6" strokeLinecap="round" strokeDasharray="1 14" />

        <Packet d="M40 390 C150 330 300 180 470 95" dur={8} color={TRI.mint} r={4.5} delay={0} />
        <Packet d="M40 390 C150 330 300 180 470 95" dur={8} color={TRI.amber} r={3.5} delay={4} />

        {MILESTONES.map((m, i) => (
          <PulseDot
            key={m.label}
            cx={m.cx}
            cy={m.cy}
            color={i === MILESTONES.length - 1 ? TRI.amber : TRI.green}
            r={3}
            dur={2.6}
          />
        ))}
      </svg>

      {MILESTONES.map((m) => (
        <div key={m.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: m.x, top: m.y }}>
          <StageChip icon={m.icon} label={m.label} sub={m.sub} tone={m.tone} />
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 border-t border-white/10 bg-black/30 px-6 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">
          <Compass className="h-3.5 w-3.5 text-white/40" />
          <span className="text-[11px] font-semibold text-white/45">Experience</span>
        </div>
        <div className="flex flex-1 items-center">
          <span className="h-px flex-1 bg-[repeating-linear-gradient(90deg,rgba(41,171,135,0.6)_0,rgba(41,171,135,0.6)_6px,transparent_6px,transparent_12px)]" />
          <TrendingUp className="mx-2 h-4 w-4 text-tri-2 tri-pulse" />
          <span className="h-px flex-1 bg-[repeating-linear-gradient(90deg,rgba(245,166,35,0.6)_0,rgba(245,166,35,0.6)_6px,transparent_6px,transparent_12px)]" />
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-[linear-gradient(160deg,#29ab87,#117a4b)] px-3 py-1.5 shadow-lg shadow-[rgba(41,171,135,0.35)]">
          <Handshake className="h-3.5 w-3.5 text-white" />
          <span className="text-[11px] font-bold text-white">Lasting impact</span>
        </div>
      </div>
    </SceneCanvas>
  );
}
