import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FlowTech — Real Estate Strategy, Built & Implemented";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 90px",
          background: "linear-gradient(140deg, #04090c 0%, #0d1a21 55%, #113240 100%)",
          color: "#eef3f4",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: "0.28em",
            color: "#2fd4e6",
            marginBottom: 34,
          }}
        >
          FLOWTECH · REAL ESTATE STRATEGY, BUILT &amp; IMPLEMENTED
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, maxWidth: 940 }}>
          Step inside your portfolio.
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 30,
            color: "rgba(238,243,244,.68)",
            maxWidth: 860,
          }}
        >
          Strategy first. Systems that follow.
        </div>
        <div
          style={{
            marginTop: 60,
            fontSize: 24,
            color: "#2fd4e6",
            letterSpacing: "0.08em",
          }}
        >
          www.flowtechapps.com
        </div>
      </div>
    ),
    { ...size },
  );
}
