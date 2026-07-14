"use client";

/**
 * 3D journey scene — a faithful port of the design handoff's Three.js logic
 * class to react-three-fiber. Every geometry, material color, camera keyframe,
 * and bloom setting comes from the approved prototype. Client constraints
 * honored here:
 *   - buildings, mountains, and the landmass are MATTE (no emissive glow)
 *   - only the metro orbs, arcs, and city labels glow
 *   - NO hub orb / beacon / light pillar
 *   - NO halo ring on the globe
 *   - bloom threshold .93, strength eased down to .12 while the globe fills
 *     the frame (prevents blowout)
 *
 * Geometry ships as static JSON generated from us-atlas / world-atlas at
 * build time (scripts/generate-geo.mjs) — no runtime CDN fetch.
 */

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import usGeo from "@/data/us-geo.json";
import { scrollState } from "./scrollState";

// ---------- constants from the prototype ----------

const CITIES = [
  { name: "SEATTLE", x: -46.2, z: -22.4, n: 7, hMax: 7, spread: 2.8, linear: false },
  { name: "SAN FRANCISCO", x: -46.4, z: 3.1, n: 8, hMax: 8, spread: 2.8, linear: false },
  { name: "LOS ANGELES", x: -38.4, z: 12.9, n: 16, hMax: 4.5, spread: 6.5, linear: false },
  { name: "DENVER", x: -13.1, z: -1.8, n: 8, hMax: 6, spread: 3, linear: false },
  { name: "DALLAS", x: 2.3, z: 16.1, n: 9, hMax: 8, spread: 3.4, linear: false },
  { name: "CHICAGO", x: 19.8, z: -7.5, n: 11, hMax: 12, spread: 3.6, linear: false },
  { name: "ATLANTA", x: 25.8, z: 13.8, n: 9, hMax: 8, spread: 3.2, linear: false },
  { name: "MIAMI", x: 33.8, z: 34.3, n: 8, hMax: 7, spread: 2.2, linear: true },
  { name: "NEW YORK", x: 45.6, z: -4.4, n: 15, hMax: 17, spread: 3.8, linear: false },
];

const LINK_PAIRS: [number, number][] = [
  [8, 5], [8, 6], [8, 7], [8, 3], [5, 3], [5, 4], [3, 0], [3, 1],
  [2, 1], [2, 4], [6, 4], [6, 7], [0, 1], [2, 3],
];

const CAM_KF = [
  { pos: [24, 290, 132], look: [-34, 278, 0] }, // globe right-of-frame from orbit
  { pos: [66, 288, 112], look: [-24, 279, 0] }, // slow orbital drift, still on the globe
  { pos: [2, 284, 90], look: [-16, 280, 0] },   // zoomed onto North America
  { pos: [0, 150, 74], look: [-20, 2, -4] },    // breaking through: country rises into view
  { pos: [2, 96, 42], look: [2, 0, -2] },       // full-country aerial survey
  { pos: [80, 34, 32], look: [26, 6, -2] },     // east coast connection
  { pos: [-6, 55, 108], look: [6, 6, -2] },     // finale vista
] as const;

const GRADE_STOPS = [0x101c2e, 0x14203a, 0x0c2a34, 0x113240, 0x232b3f].map(
  (c) => new THREE.Color(c),
);
const NODE_COLD = new THREE.Color(0xffb066);
const NODE_WARM = new THREE.Color(0x9df0ff);
const US_FACING_ROT = 0.14;
const US_FACING_TILT = 0.62;

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));
const proj = (lon: number, lat: number): [number, number] => [
  (lon + 98) * 1.9,
  -(lat - 39) * 2.6,
];

// ---------- canvas textures ----------

function makeGlowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, "rgba(160,244,255,1)");
  gr.addColorStop(0.35, "rgba(47,212,230,.9)");
  gr.addColorStop(1, "rgba(47,212,230,0)");
  g.fillStyle = gr;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

function makeWindowTexture() {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 128;
  const g = c.getContext("2d")!;
  // muted grey structure facade with a subtle window grid
  g.fillStyle = "#7a848b";
  g.fillRect(0, 0, 64, 128);
  for (let wy = 2; wy < 126; wy += 6) {
    for (let wx = 2; wx < 62; wx += 6) {
      const r = Math.random();
      if (r < 0.1) g.fillStyle = "rgba(150,170,180,.8)"; // faint reflection
      else if (r < 0.3) g.fillStyle = "rgba(44,58,68,.85)"; // dark glass
      else g.fillStyle = "rgba(58,72,82,.7)"; // standard window
      g.fillRect(wx, wy, 3.6, 3.6);
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

function monoFontStack() {
  // next/font hashes family names — read the resolved stack from the CSS var.
  const fam = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-plex-mono")
    .trim();
  return fam || '"IBM Plex Mono", monospace';
}

function drawLabel(canvas: HTMLCanvasElement, text: string) {
  const g = canvas.getContext("2d")!;
  g.clearRect(0, 0, 512, 96);
  g.font = `600 44px ${monoFontStack()}`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.shadowColor = "rgba(47,212,230,.9)";
  g.shadowBlur = 18;
  g.fillStyle = "rgba(220,248,252,.95)";
  g.fillText(text, 256, 48);
}

// ---------- scene graph types ----------

type NodeRec = {
  x: number;
  z: number;
  y: number;
  sphere: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;
  sprite: THREE.Sprite;
  phase: number;
};

type TrailRec = {
  curve: THREE.CatmullRomCurve3;
  line: THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>;
  sprites: { sprite: THREE.Sprite; off: number }[];
  speed: number;
};

type Built = ReturnType<typeof buildScene>;

// ---------- imperative scene construction (mirrors the prototype 1:1) ----------

function buildScene() {
  const group = new THREE.Group();

  // lights
  group.add(new THREE.AmbientLight(0x5d7681, 2.6));
  const key = new THREE.DirectionalLight(0xbfe9ef, 1.15);
  key.position.set(20, 50, 20);
  group.add(key);
  const orbitLight = new THREE.DirectionalLight(0xcfe6ec, 0.7);
  orbitLight.position.set(60, 320, 180);
  group.add(orbitLight);

  // ocean
  const water = new THREE.Mesh(
    new THREE.PlaneGeometry(700, 520),
    new THREE.MeshStandardMaterial({ color: 0x081320, roughness: 0.3, metalness: 0.65 }),
  );
  water.rotation.x = -Math.PI / 2;
  water.position.y = -0.25;
  group.add(water);

  // continental US — matte slate land, extruded from real geodata (matte, NO glow)
  const landMat = new THREE.MeshStandardMaterial({ color: 0x2e4854, roughness: 1, metalness: 0 });
  const landGroup = new THREE.Group();
  group.add(landGroup);
  (usGeo.rings as [number, number][][]).forEach((ring) => {
    const shape = new THREE.Shape();
    ring.forEach((pt, idx) => {
      const xy = proj(pt[0], pt[1]);
      if (idx === 0) shape.moveTo(xy[0], -xy[1]);
      else shape.lineTo(xy[0], -xy[1]);
    });
    shape.closePath();
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: 0.9,
      bevelEnabled: true,
      bevelThickness: 0.25,
      bevelSize: 0.45,
      bevelSegments: 1,
    });
    g.rotateX(-Math.PI / 2);
    landGroup.add(new THREE.Mesh(g, landMat));
  });

  // faint state borders
  const borderMat = new THREE.LineBasicMaterial({ color: 0x7fdce8, transparent: true, opacity: 0.3 });
  (usGeo.borders as [number, number][][]).forEach((ls) => {
    const pts = ls.map((pt) => {
      const xy = proj(pt[0], pt[1]);
      return new THREE.Vector3(xy[0], 1.3, xy[1]);
    });
    if (pts.length > 1) {
      landGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), borderMat));
    }
  });

  // mountain ridges: Rockies + Appalachians (matte flat-shaded cones, NO glow)
  const ridgeMat = new THREE.MeshStandardMaterial({ color: 0x3a545e, roughness: 0.97, flatShading: true });
  for (let rk = 0; rk < 10; rk++) {
    const cone = new THREE.Mesh(new THREE.ConeGeometry(rand(3, 5.5), rand(2, 4.5), 5), ridgeMat);
    cone.position.set(rand(-28, -18), 1, -22 + rk * 3.3 + rand(-1.5, 1.5));
    cone.rotation.y = rand(0, Math.PI);
    group.add(cone);
  }
  for (let ap = 0; ap < 7; ap++) {
    const cone2 = new THREE.Mesh(new THREE.ConeGeometry(rand(2, 3.5), rand(1.2, 2.2), 5), ridgeMat);
    cone2.position.set(rand(30, 37), 0.9, -7 + ap * 3 + rand(-1, 1));
    cone2.rotation.y = rand(0, Math.PI);
    group.add(cone2);
  }

  // buildings: matte grey box towers with a window-grid texture (NO emissive glow)
  const winTex = makeWindowTexture();
  const addTower = (x: number, z: number, w: number, d: number, h: number) => {
    const tex = winTex.clone();
    tex.needsUpdate = true;
    tex.repeat.set(Math.max(1, Math.round(w / 2.2)), Math.max(1, Math.round(h / 3)));
    tex.offset.set(Math.random(), Math.random());
    const mat = new THREE.MeshStandardMaterial({
      color: 0x767f86,
      roughness: 0.85,
      metalness: 0.05,
      map: tex,
    });
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, h / 2 + 1.15, z);
    group.add(m);
  };

  // city name labels (glowing canvas sprites)
  const labelSprites: THREE.Sprite[] = [];
  const labelCanvases: { canvas: HTMLCanvasElement; text: string; tex: THREE.CanvasTexture }[] = [];
  const makeLabel = (text: string, x: number, y: number, z: number) => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 96;
    drawLabel(c, text);
    const tex = new THREE.CanvasTexture(c);
    const sp = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0, depthWrite: false }),
    );
    sp.position.set(x, y, z);
    sp.scale.set(16, 3, 1);
    group.add(sp);
    labelSprites.push(sp);
    labelCanvases.push({ canvas: c, text, tex });
  };

  CITIES.forEach((ct) => {
    for (let b = 0; b < ct.n; b++) {
      const frac = b / ct.n;
      const ox = ct.linear ? (frac - 0.5) * ct.spread * 4 : rand(-ct.spread, ct.spread);
      const oz = ct.linear ? rand(-1, 1) : rand(-ct.spread, ct.spread);
      const dCenter = Math.sqrt(ox * ox + oz * oz) / (ct.spread * 1.42);
      const h = ct.hMax * rand(0.45, 1.05) * (ct.linear ? 1 : 1.05 - dCenter * 0.55);
      addTower(ct.x + ox, ct.z + oz, rand(1.1, 2), rand(1.1, 2), Math.max(1, h));
    }
    // signature anchor tower per city
    addTower(ct.x, ct.z, 1.8, 1.8, ct.hMax * 1.25);
    makeLabel(ct.name, ct.x, ct.hMax * 1.25 + 6.5, ct.z);
  });

  const glowTex = makeGlowTexture();

  // market nodes: one glowing point above each metro (these DO bloom)
  const nodes: NodeRec[] = CITIES.map((ct) => {
    const x = ct.x;
    const z = ct.z;
    const y = ct.hMax * 1.25 + 2;
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 16, 16),
      new THREE.MeshStandardMaterial({
        color: 0x0d232b,
        roughness: 0.3,
        metalness: 0.5,
        emissive: 0x2fd4e6,
        emissiveIntensity: 0.12,
      }),
    );
    sphere.position.set(x, y + 0.7, z);
    group.add(sphere);
    const sp = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex,
        color: 0x9df0ff,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    sp.position.set(x, y + 0.9, z);
    sp.scale.setScalar(2.4);
    group.add(sp);
    return { x, z, y, sphere, sprite: sp, phase: Math.random() * Math.PI * 2 };
  });

  // NOTE: the prototype's central hub orb / ring / beacon was explicitly
  // removed by the client (kept dark in the reference). It is not built here.

  // interconnecting arcs: node-to-node light trails over the landscape
  const trails: TrailRec[] = LINK_PAIRS.map((pair) => {
    const a = nodes[pair[0]];
    const b = nodes[pair[1]];
    const pA = new THREE.Vector3(a.x, a.y + 0.9, a.z);
    const pB = new THREE.Vector3(b.x, b.y + 0.9, b.z);
    const dist = pA.distanceTo(pB);
    const mid = pA.clone().lerp(pB, 0.5);
    mid.y = Math.max(pA.y, pB.y) + 4 + dist * 0.18;
    const curve = new THREE.CatmullRomCurve3([pA, mid, pB]);
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(curve.getPoints(60)),
      new THREE.LineBasicMaterial({
        color: 0x27c3d6,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
      }),
    );
    group.add(line);
    const sprites: TrailRec["sprites"] = [];
    for (let s = 0; s < 2; s++) {
      const sp = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTex,
          color: 0xb5f4ff,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      sp.scale.setScalar(1.1);
      group.add(sp);
      sprites.push({ sprite: sp, off: s / 2 });
    }
    return { curve, line, sprites, speed: rand(0.06, 0.13) };
  });

  // atmosphere particles
  const pGeo = new THREE.BufferGeometry();
  const pN = 260;
  const pos = new Float32Array(pN * 3);
  for (let p = 0; p < pN; p++) {
    pos[p * 3] = rand(-90, 90);
    pos[p * 3 + 1] = rand(2, 34);
    pos[p * 3 + 2] = rand(-80, 60);
  }
  pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const points = new THREE.Points(
    pGeo,
    new THREE.PointsMaterial({
      map: glowTex,
      color: 0x2fd4e6,
      size: 0.4,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  group.add(points);

  // opening globe: earth in orbit high above the map (NO halo ring)
  const globeGrp = new THREE.Group();
  globeGrp.position.set(0, 280, 0);
  group.add(globeGrp);
  const globeCanvas = document.createElement("canvas");
  globeCanvas.width = 2048;
  globeCanvas.height = 1024;
  {
    const g = globeCanvas.getContext("2d")!;
    const gr = g.createLinearGradient(0, 0, 0, 1024);
    gr.addColorStop(0, "#12374e");
    gr.addColorStop(0.5, "#0e2c40");
    gr.addColorStop(1, "#0b2334");
    g.fillStyle = gr;
    g.fillRect(0, 0, 2048, 1024);
  }
  const earthTex = new THREE.CanvasTexture(globeCanvas);
  const earthMat = new THREE.MeshBasicMaterial({ map: earthTex, transparent: true, opacity: 1 });
  const earth = new THREE.Mesh(new THREE.SphereGeometry(42, 48, 48), earthMat);
  globeGrp.add(earth);
  const atmoMat = new THREE.MeshBasicMaterial({
    color: 0x2fd4e6,
    transparent: true,
    opacity: 0.07,
    side: THREE.BackSide,
  });
  globeGrp.add(new THREE.Mesh(new THREE.SphereGeometry(44.5, 48, 48), atmoMat));
  const globeLight = new THREE.PointLight(0xeaf6fa, 1.1, 0, 1.4);
  globeLight.position.set(40, 300, 150);
  group.add(globeLight);

  return {
    group,
    nodes,
    trails,
    labelSprites,
    labelCanvases,
    points,
    globeGrp,
    earth,
    earthMat,
    atmoMat,
    globeCanvas,
    earthTex,
  };
}

function paintGlobeTexture(built: Built, world: { countries: { us: boolean; rings: [number, number][][] }[] }) {
  const g = built.globeCanvas.getContext("2d")!;
  const toX = (lon: number) => ((lon + 180) / 360) * 2048;
  const toY = (lat: number) => ((90 - lat) / 180) * 1024;
  g.strokeStyle = "rgba(90,218,234,.09)";
  g.lineWidth = 1;
  for (let gl = -150; gl <= 180; gl += 30) {
    g.beginPath();
    g.moveTo(toX(gl), 0);
    g.lineTo(toX(gl), 1024);
    g.stroke();
  }
  for (let gt = -60; gt <= 60; gt += 30) {
    g.beginPath();
    g.moveTo(0, toY(gt));
    g.lineTo(2048, toY(gt));
    g.stroke();
  }
  world.countries.forEach((f) => {
    g.fillStyle = f.us ? "#5e93ab" : "#3c6072";
    g.strokeStyle = f.us ? "rgba(150,235,248,.85)" : "rgba(120,215,232,.35)";
    g.lineWidth = f.us ? 2.2 : 1.1;
    f.rings.forEach((ring) => {
      g.beginPath();
      ring.forEach((pt, pi) => {
        if (pi === 0) g.moveTo(toX(pt[0]), toY(pt[1]));
        else g.lineTo(toX(pt[0]), toY(pt[1]));
      });
      g.closePath();
      g.fill();
      g.stroke();
    });
  });
  built.earthTex.needsUpdate = true;
}

// ---------- component ----------

export default function JourneyScene() {
  const built = useMemo(() => buildScene(), []);
  const bloomRef = useRef<{ intensity: number } | null>(null);
  const lookCur = useRef(new THREE.Vector3(-34, 278, 0));
  const tmpColor = useMemo(() => new THREE.Color(), []);
  const v3a = useMemo(() => new THREE.Vector3(), []);
  const { scene } = useThree();

  // fog + initial background (grade takes over per-frame)
  useEffect(() => {
    scene.fog = new THREE.FogExp2(0x071019, 0.0065);
    scene.background = new THREE.Color(0x071019);
    return () => {
      scene.fog = null;
      scene.background = null;
    };
  }, [scene]);

  // paint the globe's country texture from static geo data
  useEffect(() => {
    let cancelled = false;
    import("@/data/world-geo.json").then((mod) => {
      if (!cancelled) paintGlobeTexture(built, mod.default as never);
    });
    return () => {
      cancelled = true;
    };
  }, [built]);

  // redraw city labels once web fonts finish loading (canvas text needs the real face)
  useEffect(() => {
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (cancelled) return;
      built.labelCanvases.forEach(({ canvas, text, tex }) => {
        drawLabel(canvas, text);
        tex.needsUpdate = true;
      });
    });
    return () => {
      cancelled = true;
    };
  }, [built]);

  // dispose everything on unmount
  useEffect(() => {
    const g = built.group;
    return () => {
      g.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = (mesh as THREE.Mesh).material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose();
      });
    };
  }, [built]);

  useFrame(({ camera, clock, scene: scn }) => {
    const el = clock.getElapsedTime();
    const pTotal = scrollState.p;
    const unity = smooth((pTotal - 0.66) / 0.26);
    const surveyed = smooth((pTotal - 0.52) / 0.18); // discovery glow-up

    // globe: idle spin settling onto the US, then fade as we descend
    const gPhase = smooth(pTotal / 0.3);
    const TAU = Math.PI * 2;
    const ambient = el * 0.02;
    let delta = (ambient - US_FACING_ROT) % TAU;
    if (delta > Math.PI) delta -= TAU;
    if (delta < -Math.PI) delta += TAU;
    built.earth.rotation.y = US_FACING_ROT + delta * (1 - gPhase);
    built.earth.rotation.x = gPhase * US_FACING_TILT;
    const gFade = 1 - smooth((pTotal - 0.36) / 0.09);
    built.earthMat.opacity = gFade;
    built.atmoMat.opacity = 0.07 * gFade;
    built.globeGrp.visible = gFade > 0.01;

    // camera along keyframes
    const seg = Math.min(5.999, pTotal * 6);
    const i0 = Math.floor(seg);
    const f = smooth(seg - i0);
    const a = CAM_KF[i0];
    const b2 = CAM_KF[Math.min(6, i0 + 1)];
    camera.position.set(
      lerp(a.pos[0], b2.pos[0], f),
      lerp(a.pos[1], b2.pos[1], f),
      lerp(a.pos[2], b2.pos[2], f),
    );
    // gentle idle drift
    camera.position.x += Math.sin(el * 0.3) * 0.4;
    camera.position.y += Math.sin(el * 0.22) * 0.25;
    v3a.set(
      lerp(a.look[0], b2.look[0], f),
      lerp(a.look[1], b2.look[1], f),
      lerp(a.look[2], b2.look[2], f),
    );
    lookCur.current.lerp(v3a, 0.08);
    camera.lookAt(lookCur.current);

    // color grade: background + fog shift through the journey
    const gseg = Math.min(3.999, pTotal * 4);
    const gi = Math.floor(gseg);
    const gf = smooth(gseg - gi);
    tmpColor.copy(GRADE_STOPS[gi]).lerp(GRADE_STOPS[Math.min(4, gi + 1)], gf);
    if (scn.background instanceof THREE.Color) scn.background.copy(tmpColor);
    if (scn.fog) scn.fog.color.copy(tmpColor);

    // market points: warm amber when isolated, cool teal once connected
    built.nodes.forEach((nd) => {
      const pulse = 0.5 + 0.5 * Math.sin(el * 1.6 + nd.phase);
      const base = 0.1 + surveyed * 0.18 + unity * 0.2;
      const sprMat = nd.sprite.material as THREE.SpriteMaterial;
      sprMat.opacity = base + pulse * 0.15 * (surveyed + unity);
      nd.sprite.scale.setScalar(1.8 + (surveyed + unity) * 0.7 + pulse * 0.25 * unity);
      nd.sphere.material.emissiveIntensity = 0.1 + surveyed * 0.3 + unity * 0.6;
      sprMat.color.copy(NODE_COLD).lerp(NODE_WARM, unity);
      nd.sphere.material.emissive.copy(NODE_COLD).lerp(NODE_WARM, unity);
    });

    // city name labels fade in with the survey
    built.labelSprites.forEach((ls) => {
      (ls.material as THREE.SpriteMaterial).opacity = surveyed * 0.55 + unity * 0.35;
    });

    // trails
    built.trails.forEach((tr) => {
      tr.line.material.opacity = unity * 0.4;
      tr.sprites.forEach((s) => {
        const tt = (el * tr.speed + s.off) % 1;
        tr.curve.getPointAt(1 - tt, s.sprite.position);
        (s.sprite.material as THREE.SpriteMaterial).opacity =
          unity * (0.55 + 0.45 * Math.sin(tt * Math.PI));
      });
    });

    // particles drift
    built.points.rotation.y = el * 0.008;
    (built.points.material as THREE.PointsMaterial).opacity = 0.18 + unity * 0.3;

    // keep bloom nearly off while the globe fills the frame (prevents the white orb blowout)
    const groundPhase = smooth((pTotal - 0.38) / 0.08);
    if (bloomRef.current) {
      bloomRef.current.intensity = 0.5 * groundPhase + 0.12 * (1 - groundPhase);
    }
  });

  return (
    <>
      <primitive object={built.group} />
      <EffectComposer>
        <Bloom
          ref={bloomRef as never}
          intensity={0.12}
          luminanceThreshold={0.93}
          luminanceSmoothing={0.45}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}
