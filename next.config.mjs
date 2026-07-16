/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // NOTE: the contact form uses an API route (app/api/contact), which requires a
  // Node/serverless deploy (Vercel, etc.). If you need a fully static export
  // (`output: 'export'`), swap the form action to a hosted form endpoint instead.
  // (Image optimization also requires this same server/serverless deploy target.)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            // No external scripts, styles, images, or fonts are loaded anywhere
            // on the site (verified: no CDN refs, next/font self-hosts, all
            // images are local). 'unsafe-inline' is kept for script-src/style-src
            // because the App Router's RSC hydration payload and several
            // components' inline style={} attributes rely on it; removing it
            // would need a nonce-based setup (middleware) that isn't worth the
            // hydration-breakage risk for a marketing site with no user input
            // rendered as HTML.
            // 'unsafe-eval' is added only in development: `next dev`'s Fast
            // Refresh wraps modules in eval(), and without it every client
            // script (including the 3D hero and scroll animation) fails to
            // execute at all. Production never needs it.
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline'${
                process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""
              }`,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data:",
              "font-src 'self'",
              "connect-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};
export default nextConfig;
