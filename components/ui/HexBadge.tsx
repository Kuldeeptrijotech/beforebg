import type { LucideIcon } from "lucide-react";

const HEX_CLIP = "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)";

type Tone = "blue" | "green" | "amber" | "mix";
type Size = "sm" | "md" | "lg" | "xl";

const sizePx: Record<Size, number> = { sm: 38, md: 50, lg: 62, xl: 80 };

const toneBg: Record<Tone, string> = {
  blue: "linear-gradient(135deg, #0a6ed1 0%, #004b99 100%)",
  green: "linear-gradient(135deg, #0284c7 0%, #035380 100%)",
  amber: "linear-gradient(135deg, #0284c7 0%, #084e8a 100%)",
  mix: "linear-gradient(135deg, #008fd3 0%, #0a6ed1 100%)",
};

const toneIconColor: Record<Tone, string> = {
  blue: "#ffffff",
  green: "#ffffff",
  amber: "#ffffff",
  mix: "#ffffff",
};

const toneGlow: Record<Tone, string> = {
  blue: "rgba(10, 110, 209, 0.75)",
  green: "rgba(2, 132, 199, 0.75)",
  amber: "rgba(2, 132, 199, 0.75)",
  mix: "rgba(0, 143, 211, 0.75)",
};

type HexBadgeProps = {
  icon: LucideIcon;
  tone?: Tone;
  size?: Size;
  glow?: boolean;
  className?: string;
  iconColor?: string;
};

/** Icon badge shaped like the Trijotech brand hexagon. */
export default function HexBadge({
  icon: Icon,
  tone = "blue",
  size = "md",
  glow = true,
  className = "",
  iconColor,
}: HexBadgeProps) {
  const px = sizePx[size];
  const width = Math.round(px * 1.154);
  const box = { width, height: px };
  const finalIconColor = iconColor || toneIconColor[tone];

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
        style={{
          clipPath: HEX_CLIP,
          background: "linear-gradient(180deg, rgba(255,255,255,0.45), rgba(255,255,255,0.05))",
          opacity: 0.8,
        }}
      />
      <span
        className="relative flex h-full w-full items-center justify-center shadow-lg"
        style={{ clipPath: HEX_CLIP, background: toneBg[tone] }}
      >
        <Icon
          className="!text-white !stroke-white text-white stroke-white"
          style={{
            width: px * 0.52,
            height: px * 0.52,
            color: finalIconColor || "#ffffff",
            stroke: finalIconColor || "#ffffff",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
          }}
          strokeWidth={2.4}
        />
      </span>
    </span>
  );
}

export { HEX_CLIP };
