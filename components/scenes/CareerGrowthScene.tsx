import { Code2, GraduationCap, Lightbulb, TrendingUp, Users, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Packet, PulseDot, SceneCanvas, StageChip, TRI } from "./scene-ui";

type Step = {
  label: string;
  icon: LucideIcon;
  tone?: "green" | "amber" | "dim" | "white";
  x: string;
  y: string;
  cx: number;
  cy: number;
};

const STEPS: Step[] = [
  { label: "Learn", icon: GraduationCap, x: "15.4%", y: "82%", cx: 80, cy: 410 },
  { label: "Collaborate", icon: Users, x: "35.6%", y: "64%", cx: 185, cy: 320 },
  { label: "Build", icon: Wrench, x: "55.8%", y: "46%", cx: 290, cy: 230 },
  { label: "Innovate", icon: Lightbulb, x: "76%", y: "28%", cx: 395, cy: 140 },
  { label: "Grow", icon: TrendingUp, tone: "amber", x: "90.4%", y: "16%", cx: 470, cy: 80 },
];

const STAIR = "M80 410 L185 410 V320 L290 320 V230 L395 230 V140 L470 140 V80";

export default function CareerGrowthScene() {
  return (
    <SceneCanvas className="min-h-[560px] rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50" hex grid>
      <div className="absolute left-6 top-5 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-tri-2 tri-pulse" />
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/60">Your career path</p>
      </div>
      <div className="absolute right-6 top-5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold text-tri-2">Step 5 / 5</div>

      <div className="absolute left-[6%] top-[13%] rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md animate-float-slow">
        <p className="text-[10px] font-semibold text-white/80">SAP Consultant</p>
        <p className="text-[9px] text-tri-2">Hiring · Remote</p>
      </div>
      <div className="absolute left-[6%] top-[27%] rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md animate-float-reverse">
        <p className="text-[10px] font-semibold text-white/80">BTP Developer</p>
        <p className="text-[9px] text-tri-2">Hiring · Hybrid</p>
      </div>

      <div className="absolute right-[5%] top-[4%] rounded-full border border-white/20/30 bg-white/ px-3 py-1 text-[10px] font-semibold text-white">
        Reach your next role
      </div>

      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 520 500"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d={STAIR} stroke="rgba(255, 255, 255,0.5)" strokeWidth="2" strokeDasharray="5 7" />
        <path d={STAIR} stroke="rgba(255, 255, 255,0.9)" strokeWidth="2.5" strokeLinejoin="round" />
        <Packet d={STAIR} dur={10} color={TRI.mint} r={4} delay={0} />
        <Packet d={STAIR} dur={10} color={TRI.amber} r={3} delay={5} />

        {STEPS.map((s, i) => (
          <PulseDot
            key={s.label}
            cx={s.cx}
            cy={s.cy}
            color={i === STEPS.length - 1 ? TRI.amber : TRI.green}
            r={3}
            dur={2.6}
          />
        ))}
      </svg>

      {STEPS.map((s, i) => (
        <div key={s.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: s.x, top: s.y }}>
          <StageChip icon={s.icon} label={s.label} sub={String(i + 1).padStart(2, "0")} tone={s.tone} />
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-black/40 px-3 sm:px-6 py-2 sm:py-3 backdrop-blur-md">
        <div className="flex items-center gap-1.5 sm:gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 sm:px-3 py-1 sm:py-1.5">
          <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white/40" />
          <span className="text-[10px] sm:text-[11px] font-semibold text-white/60">Bring your ambition</span>
        </div>
        <div className="hidden md:flex flex-1 items-center">
          <span className="h-px flex-1 bg-[repeating-linear-gradient(90deg,rgba(255, 255, 255,0.6)_0,rgba(255, 255, 255,0.6)_6px,transparent_6px,transparent_12px)]" />
          <Code2 className="mx-2 h-4 w-4 text-tri-2 tri-pulse" />
          <span className="h-px flex-1 bg-[repeating-linear-gradient(90deg,rgba(255, 255, 255,0.7)_0,rgba(255, 255, 255,0.7)_6px,transparent_6px,transparent_12px)]" />
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 rounded-lg bg-[linear-gradient(160deg,#22d3ee,#2563eb)] px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-lg shadow-[rgba(255, 255, 255,0.35)]">
          <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
          <span className="text-[10px] sm:text-[11px] font-bold text-white">Grow with Trijotech</span>
        </div>
      </div>
    </SceneCanvas>
  );
}
