import type { ReactNode } from "react";
import DataFlow from "@/components/three/DataFlow";

type SectionBackgroundProps = {
  variant?: "mesh" | "grid" | "hex" | "none";
  children: ReactNode;
  className?: string;
  flow?: boolean;
};

/** Layered decorative background for dark sections: mesh + hex grid + optional data flow + glow blobs. */
export default function SectionBackground({
  variant = "mesh",
  children,
  className = "",
  flow = false,
}: SectionBackgroundProps) {
  return (
    <section className={`relative isolate overflow-hidden ${className}`}>
      {variant !== "none" && <div aria-hidden className={`absolute inset-0 -z-30 ${variant === "grid" ? "tri-grid-bg" : variant === "hex" ? "tri-mesh tri-hex-grid" : "tri-mesh"}`} />}
      {variant !== "none" && (
        <>
          <div aria-hidden className="tri-blob -z-20 h-72 w-72 animate-float-slow" style={{ left: "-8%", top: "12%", background: "radial-gradient(circle, rgba(255, 255, 255,0.22), transparent 70%)" }} />
          <div aria-hidden className="tri-blob -z-20 h-80 w-80 animate-float-reverse" style={{ right: "-10%", bottom: "8%", background: "radial-gradient(circle, rgba(255, 255, 255,0.16), transparent 70%)" }} />
        </>
      )}
      {flow && (
        <div aria-hidden className="absolute inset-0 -z-10 opacity-40">
          <DataFlow className="h-full w-full" />
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
