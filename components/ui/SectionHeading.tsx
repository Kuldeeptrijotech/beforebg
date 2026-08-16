import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3";
};

/** Consistent section heading with brand overline, title and optional description. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className = "",
  as: Tag = "h2",
}: SectionHeadingProps) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col ${alignCls} ${className}`}>
      {eyebrow && <span className="tri-overline mb-1">{eyebrow}</span>}
      <Tag
        className={`mt-5 max-w-3xl text-3xl font-bold leading-[1.09] tracking-tight sm:text-4xl lg:text-[2.85rem] ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={`mt-6 max-w-2xl text-base leading-[1.8] sm:text-[1.05rem] ${
            dark ? "text-slate-300/85" : "text-slate-600"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
