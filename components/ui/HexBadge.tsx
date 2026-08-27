import type { LucideIcon } from "lucide-react";

type Tone = "blue" | "green" | "amber" | "mix";
type Size = "sm" | "md" | "lg" | "xl";

const sizePx: Record<Size, number> = { sm: 24, md: 32, lg: 40, xl: 48 };

type HexBadgeProps = {
  icon: LucideIcon;
  tone?: Tone;
  size?: Size;
  glow?: boolean;
  className?: string;
  iconColor?: string;
};

/** Clean icon badge matching the brand cyan accent without background/border/hover effects. */
export default function HexBadge({
  icon: Icon,
  size = "md",
  className = "",
  iconColor,
}: HexBadgeProps) {
  const px = sizePx[size];

  return (
    <span className={`inline-flex shrink-0 items-center justify-center text-cyan-200 ${className}`}>
      <Icon
        className="text-cyan-200 stroke-cyan-200 drop-shadow-md"
        style={{
          width: px,
          height: px,
          color: iconColor || "#a5f3fc",
          stroke: iconColor || "#a5f3fc",
        }}
        strokeWidth={2}
      />
    </span>
  );
}

const HEX_CLIP = "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)";
export { HEX_CLIP };
