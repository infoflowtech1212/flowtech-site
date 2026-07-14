"use client";

import { useEffect, useState } from "react";

export type JourneyMode = "3d" | "fallback" | null;

/**
 * Decides whether to run the WebGL journey or the static fallback:
 * - prefers-reduced-motion → fallback
 * Returns null until resolved on the client (avoids SSR mismatch).
 */
export function useJourneyMode(): JourneyMode {
  const [mode, setMode] = useState<JourneyMode>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const decide = () => {
      setMode(reduced.matches ? "fallback" : "3d");
    };

    decide();
    reduced.addEventListener("change", decide);
    return () => {
      reduced.removeEventListener("change", decide);
    };
  }, []);

  return mode;
}
