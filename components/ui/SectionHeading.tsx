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
      {eyebrow && (
        <span
          className={`tri-overline mb-0.5 ${
            dark ? "text-white !text-white" : "text-black !text-black"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <Tag
        className={`mt-2 max-w-3xl text-2xl font-bold leading-[1.15] tracking-tight sm:text-3xl lg:text-4xl ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={`mt-2.5 max-w-2xl text-xs leading-relaxed sm:text-sm sm:leading-6 ${
            dark ? "text-slate-300" : "text-slate-600"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
