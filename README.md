# FlowTech Website — production codebase

Production implementation of the flowtechapps.com redesign, built from the
high-fidelity design handoff. Next.js 14 (App Router) + TypeScript + Tailwind,
react-three-fiber + @react-three/postprocessing for the 3D journey, GSAP
ScrollTrigger for scroll orchestration.

## Quick start

```bash
npm install
cp .env.example .env.local   # add RESEND_API_KEY for live email delivery
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Routes

| Route | Page |
|---|---|
| `/` | 3D journey (chapters 0–4) + light-sheet sections |
| `/case-studies` | Dark case studies page |
| `/privacy`, `/terms` | Legal pages (drafts — attorney review before publishing) |
| `/api/contact` | Contact form backend (Resend) |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | SEO |

## Architecture

- **`components/journey/`** — the 3D experience.
  - `Scene.tsx` is a 1:1 port of the design file's Three.js logic class to R3F:
    all camera keyframes, material colors, grade stops, and animation math are
    the approved prototype values. Client constraints are enforced in code and
    comments: matte buildings/mountains/landmass (no emissive), no hub
    orb/beacon, no globe halo ring, bloom threshold `.93` with strength eased
    to `.12` while the globe fills the frame.
  - `Journey.tsx` owns the master ScrollTrigger (scrub 1.2 → progress 0–1 in
    `scrollState.ts`, the single source of truth for camera, grade, arcs,
    labels, and the progress rail).
  - `useJourneyMode.ts` swaps in `FallbackJourney` (static hero + the same
    chapter copy as scroll sections) below 768px, on low-power devices, or
    when `prefers-reduced-motion` is set.
- **`components/home/`** — light-sheet sections (Intro, Capabilities, Case
  Study rows, Products, Founder, FAQ, Contact). Copy is client-approved
  verbatim; straight apostrophes are preserved via `&#39;`.
- **`components/Reveal.tsx`** — the prototype's `data-anim` entrance
  (fade + translateY + blur, `top 62%` → `top 20%`, reverse on scroll-up).
- **Geo data** — `npm run geo` regenerates `data/us-geo.json` and
  `data/world-geo.json` from the `us-atlas` / `world-atlas` npm packages
  (decimation matches the prototype: ~700-pt lower-48 ring, ~220-pt border
  lines). The output is committed, so production builds make **no runtime or
  build-time CDN fetch** for geometry.

## Contact form

`app/api/contact/route.ts` validates input and sends via
[Resend](https://resend.com). Without `RESEND_API_KEY` it accepts and logs
(useful in previews). Configure `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` in
env; the from-address domain must be verified in Resend.

Because of the API route (and the dynamic OG image), the site deploys as a
standard Node/serverless Next app (Vercel etc.). If a fully static export is
required instead, point the form at a hosted form endpoint and set
`output: "export"` in `next.config.mjs`.

## Assets — action required

`public/assets/` currently contains the real `ft-logo.png` and
`qrtrax-logo.png` from the handoff. **These three are generated placeholders —
swap in the real files (same filenames) before launch:**

- `doccreate-logo.png`
- `prism-logo.png`
- `founder-headshot.jpg`

## Known deviations from the prototype (intentional)

- Progress rail fades out once the journey completes (the prototype left it
  visible over the light sheet; confirm preference).
- Bloom uses `@react-three/postprocessing` (`Bloom` effect) rather than
  UnrealBloomPass: threshold `.93` and the strength curve are identical; the
  prototype's `radius .45` maps to `luminanceSmoothing .45`. Tune visually if
  the glow reads differently.
- Dead prototype code (hub orb/ring/beacon kept at opacity 0, the unused sun
  sprite, the zero-intensity core light) was omitted rather than ported — it
  never rendered, and the client explicitly removed those elements.

## Handoff gaps still open

- Client-logo ticker: designed earlier, not in the final page — confirm with
  client before adding.
- Legal pages need attorney review (effective date currently July 13, 2026).
- Analytics: `lib/analytics.ts` is a stub; wire your provider.
# flowtech-site
