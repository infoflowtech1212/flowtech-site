"use client";

import { useEffect, useState } from "react";

export type JourneyMode = "3d" | "no-webgl" | "reduced-motion" | null;

function canCreateWebGL(): boolean {
  // Each getContext() call locks a canvas's context mode, even on failure —
  // reusing one canvas for both attempts would make a failed webgl2 probe
  // force the webgl fallback probe to fail too. Use a fresh canvas per try.
  try {
    if (document.createElement("canvas").getContext("webgl2")) return true;
  } catch {
    // ignore, fall through to webgl probe
  }
  try {
    if (document.createElement("canvas").getContext("webgl")) return true;
  } catch {
    // ignore
  }
  return false;
}

/**
 * Decides whether to run the WebGL journey or the static fallback:
 * - prefers-reduced-motion → fallback (accessibility choice, not a GPU issue)
 * - no usable WebGL context (unsupported browser, disabled hardware
 *   acceleration, sandboxed renderer, etc.) → fallback
 * Returns null until resolved on the client (avoids SSR mismatch).
 */
export function useJourneyMode(): JourneyMode {
  const [mode, setMode] = useState<JourneyMode>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const decide = () => {
      if (reduced.matches) {
        setMode("reduced-motion");
        return;
      }
      setMode(canCreateWebGL() ? "3d" : "no-webgl");
    };

    decide();
    reduced.addEventListener("change", decide);
    return () => {
      reduced.removeEventListener("change", decide);
    };
  }, []);

  return mode;
}
