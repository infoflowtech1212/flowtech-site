"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setProgress } from "./scrollState";
import { useJourneyMode } from "./useJourneyMode";
import { WebGLErrorBoundary } from "./WebGLErrorBoundary";
import ProgressRail from "./ProgressRail";
import { ChapterHero, Chapter1, Chapter2, Chapter3, Chapter4 } from "./Chapters";

const JourneyScene = dynamic(() => import("./Scene"), { ssr: false });

/**
 * The scroll-driven 3D journey (chapters 0–4).
 * - Fixed full-viewport canvas at z-0, radial vignette at z-1, HTML chapter
 *   overlays at z-10, progress rail at z-50.
 * - A master ScrollTrigger (scrub 1.2) maps scroll over the journey height to
 *   progress 0→1 — the single source of truth for camera, grade, arcs, labels,
 *   and the rail.
 * - Below 768px, on low-power devices, or with prefers-reduced-motion, the
 *   WebGL scene is replaced by a static hero and the same chapter copy as
 *   plain scroll sections.
 */
export default function Journey() {
  const mode = useJourneyMode();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  // Global safety net: @react-three/fiber drives frames via
  // requestAnimationFrame, outside React's render/commit cycle, so a WebGL
  // failure there (e.g. context lost mid-session) throws as an uncaught
  // global error that WebGLErrorBoundary below can never see. Catch it here
  // and drop to the static fallback instead of letting it crash the app.
  useEffect(() => {
    if (mode !== "3d" || webglFailed) return;
    const looksWebglRelated = (s: string) => /webgl|three\.js/i.test(s);

    const onError = (e: ErrorEvent) => {
      if (looksWebglRelated(e.message) || looksWebglRelated(String(e.error))) {
        e.preventDefault();
        setWebglFailed(true);
      }
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      if (looksWebglRelated(String(e.reason))) {
        e.preventDefault();
        setWebglFailed(true);
      }
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, [mode, webglFailed]);

  // master scrub — only when the 3D journey is live
  useEffect(() => {
    if (mode !== "3d" || webglFailed) return;
    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      start: 0,
      end: () => {
        const last = document.querySelector<HTMLElement>('[data-chapter="4"]');
        if (last) return Math.max(1, last.offsetTop + last.offsetHeight - window.innerHeight);
        return Math.max(1, document.body.scrollHeight - window.innerHeight);
      },
      scrub: 1.2,
      onUpdate: (self) => setProgress(self.progress),
    });

    // recompute ranges once final layout is in place
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    const t = setTimeout(() => ScrollTrigger.refresh(), 2000);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(t);
      st.kill();
    };
  }, [mode, webglFailed]);

  // Until the client decides, render nothing journey-specific below the hero
  // copy to avoid a WebGL flash on devices that will fall back.
  if (mode === "reduced-motion") return <FallbackJourney />;
  if (mode === "no-webgl" || webglFailed) return <FallbackJourney showWebglNotice />;

  return (
    <div ref={wrapRef}>
      {mode === "3d" && (
        <WebGLErrorBoundary onError={() => setWebglFailed(true)}>
          <div className="fixed inset-0 z-0">
            <Canvas
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
              camera={{ fov: 55, near: 0.1, far: 300, position: [24, 290, 132] }}
            >
              <JourneyScene />
            </Canvas>
          </div>
          {/* radial vignette above the canvas */}
          <div
            className="pointer-events-none fixed inset-0 z-[1]"
            style={{
              background:
                "radial-gradient(ellipse at 50% 120%, transparent 40%, rgba(4,9,12,.5) 100%)",
            }}
          />
          <ProgressRail />
        </WebGLErrorBoundary>
      )}
      <ChapterHero />
      <Chapter1 />
      <Chapter2 />
      <Chapter3 />
      <Chapter4 />
    </div>
  );
}

/**
 * Static journey for mobile / low-power / reduced-motion: dark hero with a
 * subtle teal atmosphere, then the same client-approved chapter copy as
 * ordinary scroll sections.
 */
function FallbackJourney({ showWebglNotice = false }: { showWebglNotice?: boolean }) {
  return (
    <div className="relative overflow-hidden bg-dark-journey">
      {/* static atmosphere in place of the WebGL scene */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 90% 50% at 85% 12%, rgba(18,55,78,.85) 0%, transparent 60%)," +
            "radial-gradient(ellipse 70% 40% at 15% 80%, rgba(0,151,169,.22) 0%, transparent 65%)," +
            "radial-gradient(ellipse at 50% 120%, transparent 40%, rgba(4,9,12,.5) 100%)",
        }}
      />
      <div className="relative">
        {showWebglNotice && <WebglNoticeModal />}
        <ChapterHero overlay={false} />
        <Chapter1 overlay={false} />
        <Chapter2 overlay={false} />
        <Chapter3 overlay={false} />
        <Chapter4 overlay={false} />
      </div>
    </div>
  );
}

/**
 * Popup alert shown once when we've fallen back because WebGL isn't
 * available. Sits above everything (including the fixed nav) as a centered
 * modal with a backdrop, so it can never end up clipped or hidden.
 */
function WebglNoticeModal() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="webgl-notice-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[420px] rounded-card border border-teal-bright/25 bg-[rgba(13,26,33,.97)] px-6 py-6 shadow-[0_24px_60px_rgba(0,0,0,.55)]"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full border border-white/[.14] text-[rgba(238,243,244,.6)] transition-colors hover:border-teal-bright/60 hover:text-white"
        >
          ✕
        </button>
        <div
          id="webgl-notice-title"
          className="mb-2 pr-6 font-mono text-[13px] font-semibold text-teal-bright"
        >
          Interactive 3D view unavailable
        </div>
        <p className="font-mono text-[12px] leading-relaxed text-[rgba(238,243,244,.8)]">
          Your browser can&apos;t render our interactive 3D view, so you&apos;re seeing the
          static version below — everything still works. Enabling hardware acceleration in
          your browser&apos;s settings will restore the animation.
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-5 w-full rounded-full border border-teal-bright/50 py-2.5 font-mono text-[12.5px] font-semibold text-teal-bright transition-colors hover:bg-[rgba(47,212,230,.12)]"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
