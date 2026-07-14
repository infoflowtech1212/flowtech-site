"use client";

import { useEffect, useState } from "react";

export type JourneyMode = "3d" | "fallback" | null;

/**
 * Decides whether to run the WebGL journey or the static fallback:
 * - below ~768px viewport → fallback
 * - prefers-reduced-motion → fallback
 * Returns null until resolved on the client (avoids SSR mismatch).
 */
export function useJourneyMode(): JourneyMode {
  const [mode, setMode] = useState<JourneyMode>(null);

  useEffect(() => {
    const small = window.matchMedia("(max-width: 767px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const decide = () => {
      setMode(small.matches || reduced.matches ? "fallback" : "3d");
    };

    decide();
    small.addEventListener("change", decide);
    reduced.addEventListener("change", decide);
    return () => {
      small.removeEventListener("change", decide);
      reduced.removeEventListener("change", decide);
    };
  }, []);

  return mode;
}
