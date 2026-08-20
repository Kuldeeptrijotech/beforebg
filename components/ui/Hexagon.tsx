import { useId } from "react";

type HexagonProps = {
  className?: string;
  size?: number;
  fill?: string;
  strokeWidth?: number;
  animated?: boolean;
};

const HEX_PATH =
  "M100 6 L179.3 53 L179.3 147 L100 194 L20.7 147 L20.7 53 Z";

/** Decorative Trijotech hexagon with a brand gradient stroke. */
export default function Hexagon({
  className = "",
  size,
  fill = "rgba(41,171,135,0.04)",
  strokeWidth = 1.5,
  animated = false,
}: HexagonProps) {
  const id = useId();
  const gradId = `tri-hex-${id}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      className={`${animated ? "tri-spin-slow" : ""} ${className}`}
    >
      <defs>
        <linearGradient id={gradId} x1="20" y1="6" x2="180" y2="194" gradientUnits="userSpaceOnUse">
          <stop stopColor="#29ab87" />
          <stop offset="0.55" stopColor="#117a4b" />
          <stop offset="1" stopColor="#f5a623" />
        </linearGradient>
      </defs>
      <path d={HEX_PATH} fill={fill} stroke={`url(#${gradId})`} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path
        d={HEX_PATH}
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth={0.6}
        strokeLinejoin="round"
        opacity={0.4}
        transform="scale(0.78) translate(28,28)"
      />
    </svg>
  );
}
