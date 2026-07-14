"use client";

import { useEffect, useRef } from "react";
import { onProgress } from "./scrollState";

/**
 * Fixed left progress rail: 5 vertical bars (3x26px, radius 2).
 * Active bar #2fd4e6, inactive rgba(255,255,255,.18); chapter index is
 * floor(progress * 5). Fades out once the journey completes and the light
 * sheet takes over.
 */
export default function ProgressRail() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return onProgress((p) => {
      const el = ref.current;
      if (!el) return;
      const ch = Math.min(4, Math.floor(p * 5));
      el.style.opacity = p >= 0.999 ? "0" : "1";
      Array.from(el.children).forEach((d, di) => {
        (d as HTMLElement).style.background =
          di <= ch ? "#2fd4e6" : "rgba(255,255,255,.18)";
      });
    });
  }, []);

  return (
    <div
      ref={ref}
      className="fixed left-[22px] top-1/2 z-50 flex -translate-y-1/2 flex-col gap-2 transition-opacity duration-500"
      aria-hidden
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-[26px] w-[3px] rounded-[2px] transition-colors duration-[400ms]"
          style={{ background: i === 0 ? "#2fd4e6" : "rgba(255,255,255,.18)" }}
        />
      ))}
    </div>
  );
}
