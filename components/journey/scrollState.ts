/**
 * Single source of truth for journey scroll progress (0→1).
 * Written by the master GSAP ScrollTrigger in Journey.tsx; read every frame
 * by the 3D scene (camera, grade, arcs, labels) and by the progress rail.
 */
export const scrollState = { p: 0 };

type Listener = (p: number) => void;
const listeners = new Set<Listener>();

export function setProgress(p: number) {
  scrollState.p = p;
  listeners.forEach((l) => l(p));
}

export function onProgress(l: Listener) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}
