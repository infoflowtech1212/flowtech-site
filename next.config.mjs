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
        ],
      },
    ];
  },
};
export default nextConfig;
