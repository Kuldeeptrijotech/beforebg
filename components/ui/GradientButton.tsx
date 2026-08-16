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
  primary: "tri-btn-primary text-white",
  ghost: "tri-btn-ghost text-white",
  outline: "tri-btn-outline",
  white: "bg-white text-[#0b5a38] shadow-lg shadow-[rgba(3,7,19,0.25)] hover:bg-[#eef6f0] hover:-translate-y-0.5",
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
      className={`tri-btn tri-focus ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
