import type { Config } from "tailwindcss";

/**
 * FlowTech design tokens — sourced from the design handoff README.
 * Colors, radii, and shadows are final and client-approved.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          brand: "#0097A9", // brand teal
          bright: "#2fd4e6", // bright accent
          light: "#5adaea",
          hover: "#00727f", // hover dark teal
        },
        ink: "#101c22",
        body: { DEFAULT: "#4a5a61", soft: "#5b6b72" },
        muted: "#8a969b",
        dark: {
          journey: "#04090c",
          panel: "#0d1a21",
          footer: "#101c22",
          cs: "#0e1517",
          csAlt: "#121b1e",
        },
        sheet: "#eef1f2",
        legal: "#f4f6f7",
        lightText: "#eef3f4",
      },
      fontFamily: {
        // Aptos first when installed locally; Onest as the web fallback (next/font var)
        sans: ["Aptos", "var(--font-onest)", "Segoe UI", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      borderRadius: {
        card: "14px",
        scrim: "24px",
        sheet: "44px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(16,28,34,.08)",
        contact: "0 24px 60px rgba(16,28,34,.25)",
        sheet: "0 -40px 100px rgba(0,0,0,.55)",
        ctaGlow: "0 0 40px rgba(47,212,230,.4)",
      },
    },
  },
  plugins: [],
};
export default config;
