import type { LucideIcon } from "lucide-react";

const HEX_CLIP = "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)";

type Tone = "green" | "amber" | "mix";
type Size = "sm" | "md" | "lg" | "xl";

const sizePx: Record<Size, number> = { sm: 38, md: 50, lg: 62, xl: 80 };

const toneBg: Record<Tone, string> = {
  green: "linear-gradient(160deg, #ffffff 0%, #cbd5e1 100%)",
  amber: "linear-gradient(160deg, #ffffff 0%, #94a3b8 100%)",
  mix: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 55%, #cbd5e1 130%)",
};

const toneGlow: Record<Tone, string> = {
  green: "rgba(255, 255, 255, 0.3)",
  amber: "rgba(255, 255, 255, 0.3)",
  mix: "rgba(255, 255, 255, 0.3)",
};

type HexBadgeProps = {
  icon: LucideIcon;
  tone?: Tone;
  size?: Size;
  glow?: boolean;
  className?: string;
};

/** Icon badge shaped like the Trijotech brand hexagon. */
export default function HexBadge({
  icon: Icon,
  tone = "green",
  size = "md",
  glow = true,
  className = "",
}: HexBadgeProps) {
  const px = sizePx[size];
  const width = Math.round(px * 1.154);
  const box = { width, height: px };
  return (
    <span className={`relative inline-flex shrink-0 items-center justify-center ${className}`} style={box}>
      {glow && (
        <span
          aria-hidden
          className="absolute inset-0 blur-md"
          style={{ clipPath: HEX_CLIP, background: toneGlow[tone], transform: "scale(1.25)" }}
        />
      )}
      <span
        aria-hidden
        className="absolute inset-0"
        style={{ clipPath: HEX_CLIP, background: "linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.02))", opacity: 0.5 }}
      />
      <span className="relative flex h-full w-full items-center justify-center" style={{ clipPath: HEX_CLIP, background: toneBg[tone] }}>
        <Icon className="text-white" style={{ width: px * 0.5, height: px * 0.5 }} strokeWidth={1.8} />
      </span>
    </span>
  );
}

export { HEX_CLIP };
