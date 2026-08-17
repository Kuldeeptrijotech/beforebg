import type { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  glow?: "green" | "amber" | null;
  hover?: boolean;
};

/** Glassmorphism card in the Trijotech dark theme. */
export default function GlassCard({
  children,
  className = "",
  glow = null,
  hover = true,
}: GlassCardProps) {
  return (
    <div className={`tri-glass-card relative overflow-hidden ${hover ? "" : ""} ${className}`}>
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              glow === "amber"
                ? "radial-gradient(circle, rgba(245,166,35,0.9), transparent 70%)"
                : "radial-gradient(circle, rgba(41,171,135,0.9), transparent 70%)",
          }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
