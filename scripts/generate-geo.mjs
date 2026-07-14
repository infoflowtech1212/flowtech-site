/**
 * Generates the decimated geometry the 3D journey ships as static JSON.
 *
 * Sources (installed as devDependencies — no network fetch at build time):
 *  - us-atlas@3/states-10m.json  (exact filename matters — 110m does not exist)
 *  - world-atlas@2/countries-110m.json (globe texture)
 *
 * Decimation matches the prototype logic class exactly:
 *  - lower-48 outer rings: keep rings with >80 pts, first pt lon > -130 & lat > 22,
 *    decimated to ~700 pts per ring
 *  - state borders: mesh(a !== b), ~220 pts per line, points west of -130 or south
 *    of 22 dropped
 *
 * Run: npm run geo   (output is committed to data/, so builds don't depend on it)
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import * as topojson from "topojson-client";

const require = createRequire(import.meta.url);

const round = (n, p = 2) => Math.round(n * 10 ** p) / 10 ** p;

// ---------- Continental US (land rings + state borders) ----------
const usTopo = JSON.parse(
  readFileSync(require.resolve("us-atlas/states-10m.json"), "utf8"),
);

const nation = topojson.merge(usTopo, usTopo.objects.states.geometries);
const rings = [];
for (const poly of nation.coordinates) {
  const outer = poly[0];
  if (outer.length > 80 && outer[0][0] > -130 && outer[0][1] > 22) {
    const step = Math.max(1, Math.floor(outer.length / 700));
    const slim = [];
    for (let i = 0; i < outer.length; i += step) {
      slim.push([round(outer[i][0]), round(outer[i][1])]);
    }
    rings.push(slim);
  }
}

const bordersMesh = topojson.mesh(usTopo, usTopo.objects.states, (a, b) => a !== b);
const lineStrs =
  bordersMesh.type === "MultiLineString"
    ? bordersMesh.coordinates
    : [bordersMesh.coordinates];
const borders = [];
for (const ls of lineStrs) {
  const step = Math.max(1, Math.floor(ls.length / 220));
  const pts = [];
  for (let i = 0; i < ls.length; i += step) {
    const [lon, lat] = ls[i];
    if (lon < -130 || lat < 22) continue;
    pts.push([round(lon), round(lat)]);
  }
  if (pts.length > 1) borders.push(pts);
}

// ---------- World countries (globe texture) ----------
const worldTopo = JSON.parse(
  readFileSync(require.resolve("world-atlas/countries-110m.json"), "utf8"),
);
const feats = topojson.feature(worldTopo, worldTopo.objects.countries).features;
const countries = feats
  .map((f) => {
    const polys =
      f.geometry.type === "Polygon"
        ? [f.geometry.coordinates]
        : f.geometry.coordinates;
    // The globe texture draws outer rings only (as in the prototype)
    const outers = polys.map((poly) => {
      const ring = poly[0];
      const step = Math.max(1, Math.floor(ring.length / 500));
      const slim = [];
      for (let i = 0; i < ring.length; i += step) {
        slim.push([round(ring[i][0], 1), round(ring[i][1], 1)]);
      }
      return slim;
    });
    return { us: String(f.id) === "840", rings: outers };
  })
  .filter((c) => c.rings.length);

mkdirSync(new URL("../data/", import.meta.url), { recursive: true });
writeFileSync(
  new URL("../data/us-geo.json", import.meta.url),
  JSON.stringify({ rings, borders }),
);
writeFileSync(
  new URL("../data/world-geo.json", import.meta.url),
  JSON.stringify({ countries }),
);

console.log(
  `us-geo.json: ${rings.length} land ring(s), ${borders.length} border line(s)`,
);
console.log(`world-geo.json: ${countries.length} countries`);
