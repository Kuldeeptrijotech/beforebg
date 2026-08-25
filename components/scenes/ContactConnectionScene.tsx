import { BadgeCheck, Handshake, User, Users } from "lucide-react";
import { Packet, SceneCanvas, StageChip, TRI } from "./scene-ui";

const HEX = "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)";

const TO_CLIENT_TO_CONSULTANT = "M95 250 L225 250 C 280 250 360 210 442 158";
const TO_CLIENT_TO_SOLUTION = "M95 250 L225 250 C 280 250 360 290 442 342";

export default function ContactConnectionScene() {
  return (
    <SceneCanvas bleed className="h-full w-full">
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 520 500"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d="M95 250 L225 250" stroke="rgba(191,232,216,0.16)" strokeWidth="1.4" strokeDasharray="4 6" />
        <path d="M315 250 C 360 220 400 180 442 158" stroke="rgba(255, 255, 255,0.5)" strokeWidth="1.4" strokeDasharray="4 6" />
        <path d="M315 250 C 360 280 400 320 442 342" stroke="rgba(255, 255, 255,0.5)" strokeWidth="1.4" strokeDasharray="4 6" />

        <Packet d={TO_CLIENT_TO_CONSULTANT} dur={7} color={TRI.mint} r={4} delay={0} />
        <Packet d={TO_CLIENT_TO_SOLUTION} dur={8} color={TRI.amber} r={3.5} delay={2.5} />

        <g>
          <rect x={-8} y={-5.5} width={16} height={11} rx={2} fill="#ffffff" opacity={0.95} />
          <path d="M-8 -5.5 L0 1.5 L8 -5.5" stroke="#0b1d33" strokeWidth="1.4" fill="none" />
          <animateMotion dur="4s" repeatCount="indefinite" path="M95 250 L225 250" />
        </g>
      </svg>

      <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: "18%", top: "50%" }}>
        <StageChip icon={User} label="Client" sub="Your team" tone="white" />
      </div>

      <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: "52%", top: "50%" }}>
        <div className="relative flex h-28 w-28 items-center justify-center">
          <span aria-hidden className="absolute inset-0 rounded-full border border-tri-2/40 tri-ring" />
          <span aria-hidden className="absolute inset-0 blur-2xl" style={{ clipPath: HEX, background: "rgba(255, 255, 255,0.5)" }} />
          <span className="relative flex h-24 w-24 items-center justify-center" style={{ clipPath: HEX, background: "linear-gradient(160deg,#22d3ee,#2563eb)" }}>
            <Handshake className="h-9 w-9 text-white" strokeWidth={1.8} />
          </span>
        </div>
        <p className="mt-3 text-center text-sm font-bold text-white">Trijotech</p>
        <p className="text-center text-[10px] text-tri-2">SAP &amp; data experts</p>
      </div>

      <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: "86%", top: "31%" }}>
        <StageChip icon={Users} label="Consultant" sub="Expert guidance" tone="green" />
      </div>
      <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: "86%", top: "69%" }}>
        <StageChip icon={BadgeCheck} label="Solution" sub="A practical path" tone="amber" />
      </div>
    </SceneCanvas>
  );
}
