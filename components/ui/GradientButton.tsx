import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline" | "white";
type Size = "sm" | "md" | "lg";

type GradientButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-xs sm:text-sm",
  md: "px-6 py-3.5 text-sm sm:text-base",
  lg: "px-8 py-4 text-base",
};

const variants: Record<Variant, string> = {
  primary: "bg-[#008fd3] text-white hover:bg-[#007bb8] border-0 border-transparent shadow-[0_8px_20px_rgba(0,143,211,0.35)] hover:shadow-[0_12px_28px_rgba(0,143,211,0.5)]",
  ghost: "bg-[#008fd3]/85 text-white hover:bg-[#008fd3] border-0 border-transparent shadow-[0_8px_20px_rgba(0,143,211,0.25)]",
  outline: "bg-transparent text-white border border-white/35 hover:bg-white/10 hover:border-white",
  white: "bg-white text-[#008fd3] hover:bg-slate-100 border-0 shadow-[0_8px_20px_rgba(0,0,0,0.15)]",
};

export default function GradientButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: GradientButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 hover:-translate-y-0.5 active:translate-y-0 ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
