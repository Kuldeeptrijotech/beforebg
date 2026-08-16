type DataFlowProps = {
  className?: string;
  variant?: "dark" | "light";
};

/** Animated SVG data-flow lines with traveling particles. Pure CSS/SMIL, no JS cost. */
export default function DataFlow({ className = "", variant = "dark" }: DataFlowProps) {
  const a = variant === "dark" ? "rgba(41,171,135,0.55)" : "rgba(17,122,75,0.5)";
  const b = variant === "dark" ? "rgba(245,166,35,0.5)" : "rgba(245,166,35,0.55)";
  return (
    <svg className={className} viewBox="0 0 600 600" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <path d="M70 560 C 210 500, 300 400, 300 300" stroke={a} strokeWidth="1.5" className="tri-dash" />
      <path d="M530 40 C 420 120, 360 210, 300 300" stroke={a} strokeWidth="1.5" className="tri-dash" />
      <path d="M540 540 C 430 470, 360 390, 300 300" stroke={b} strokeWidth="1.5" className="tri-dash" />
      <path d="M70 40 C 180 120, 240 210, 300 300" stroke={b} strokeWidth="1.5" className="tri-dash" />

      <circle r="4.5" fill="#29ab87" opacity="0.9">
        <animateMotion dur="6s" repeatCount="indefinite" path="M70 560 C 210 500, 300 400, 300 300" />
      </circle>
      <circle r="3" fill="#f5a623" opacity="0.9">
        <animateMotion dur="7s" repeatCount="indefinite" path="M530 40 C 420 120, 360 210, 300 300" />
      </circle>
      <circle r="4" fill="#29ab87" opacity="0.9">
        <animateMotion dur="8s" repeatCount="indefinite" path="M540 540 C 430 470, 360 390, 300 300" />
      </circle>
      <circle r="3.5" fill="#f5a623" opacity="0.9">
        <animateMotion dur="5.5s" repeatCount="indefinite" path="M70 40 C 180 120, 240 210, 300 300" />
      </circle>
    </svg>
  );
}
