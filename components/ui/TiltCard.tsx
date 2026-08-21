"use client";

import type { ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
};

/** Clean card wrapper without 3D tilt or scaling */
export default function TiltCard({ children, className = "" }: TiltCardProps) {
  return (
    <div className={className}>
      <div className="h-full w-full">
        {children}
      </div>
    </div>
  );
}
