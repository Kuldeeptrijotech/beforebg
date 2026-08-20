"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SECTION_SELECTOR = ".zip-theme > section, main > section, .zip-inner-theme > section";

export default function ViewportPerformance() {
  const pathname = usePathname();

  useEffect(() => {
    let cleanupObserver: () => void = () => {};
    const frame = window.requestAnimationFrame(() => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR));
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            entry.target.classList.toggle("perf-offscreen", !entry.isIntersecting);
          });
        },
        { rootMargin: "250px 0px" },
      );

      sections.forEach((section) => observer.observe(section));
      cleanupObserver = () => {
        observer.disconnect();
        sections.forEach((section) => section.classList.remove("perf-offscreen"));
      };
    });

    const updatePageVisibility = () => {
      document.documentElement.classList.toggle("page-not-visible", document.hidden);
    };

    updatePageVisibility();
    document.addEventListener("visibilitychange", updatePageVisibility);

    return () => {
      window.cancelAnimationFrame(frame);
      cleanupObserver();
      document.removeEventListener("visibilitychange", updatePageVisibility);
      document.documentElement.classList.remove("page-not-visible");
    };
  }, [pathname]);

  return null;
}
