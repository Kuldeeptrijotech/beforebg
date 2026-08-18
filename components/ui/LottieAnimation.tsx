"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { Lottie } from "lottie-react";

export type LottieAnimationProps = {
  /** Path to a public JSON file (e.g., '/assets/animations/data.json') or a Lottie JSON object */
  animationData?: any;
  /** URL / path to fetch Lottie JSON from */
  src?: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  style?: CSSProperties;
  speed?: number;
  /** Optional fallback image or placeholder if Lottie fails or during load */
  fallback?: ReactNode;
};

export default function LottieAnimation({
  animationData,
  src,
  loop = true,
  autoplay = true,
  className = "",
  style,
  fallback,
}: LottieAnimationProps) {
  const [isMounted, setIsMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const animationSource = animationData || src;

  if (!isMounted) {
    return <div className={`lottie-placeholder ${className}`} style={style}>{fallback || null}</div>;
  }

  if (!animationSource) {
    return <div className={`lottie-fallback ${className}`} style={style}>{fallback || null}</div>;
  }

  return (
    <div className={`lottie-container relative overflow-hidden ${className}`} style={style}>
      <Lottie
        src={animationSource}
        loop={reduceMotion ? false : loop}
        autoplay={reduceMotion ? false : autoplay}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

