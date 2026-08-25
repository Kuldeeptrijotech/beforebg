import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonTone = "light" | "dark";

type ButtonProps = {
    href: string;
    children: ReactNode;
    tone?: ButtonTone;
    className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const toneClasses = {
    light:
        "border border-slate-200 bg-white text-slate-900 hover:border-cyan-300 hover:bg-cyan-50 hover:text-slate-950",
    dark:
        "border border-slate-950 bg-slate-950 text-white hover:border-cyan-700 hover:bg-cyan-700",
};

export default function Button({
    href,
    children,
    tone = "light",
    className = "",
    ...props
}: ButtonProps) {
    return (
        <Link
            href={href}
            className={`site-button site-button-${tone} relative inline-flex h-11 w-fit items-center justify-center gap-2 overflow-hidden rounded-lg px-5 text-sm font-semibold transition ${toneClasses[tone]} ${className}`}      {...props}
        >
            {children}
        </Link>
    );
}
