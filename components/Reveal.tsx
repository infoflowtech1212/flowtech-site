"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Recreates the prototype's `data-anim` entrance:
 * fromTo(opacity 0 / y 70 / blur 10 → opacity 1 / y 0 / blur 0),
 * triggered at "top 62%" → "top 20%", play none none reverse.
 *
 * `hero` plays immediately on mount (the prototype's chapter-0 behavior).
 * Honors prefers-reduced-motion (content shown statically).
 */
export default function Reveal({
  children,
  hero = false,
  className,
  style,
}: {
  children: React.ReactNode;
  hero?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    // Touch/narrow-viewport devices are typically scrolled with fast flicks —
    // the desktop pacing (wide blur, slow tween, late trigger) reads as
    // "stuck blurry" content on mobile because it doesn't have time to
    // resolve before the section scrolls past. Trigger earlier, over a wider
    // window, with a lighter/faster animation so it reliably finishes.
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    let tween: gsap.core.Tween;
    if (hero) {
      tween = gsap.fromTo(
        el,
        { opacity: 0, y: 40, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, delay: 0.25, ease: "power2.out" },
      );
    } else if (isCoarse) {
      tween = gsap.fromTo(
        el,
        { opacity: 0, y: 30, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.45,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top 95%",
            end: "top 55%",
            toggleActions: "play none none reverse",
          },
        },
      );
    } else {
      tween = gsap.fromTo(
        el,
        { opacity: 0, y: 70, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top 62%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [hero]);

  return (
    <div ref={ref} data-anim className={className} style={style}>
      {children}
    </div>
  );
}
