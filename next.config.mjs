/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  // NOTE: the contact form uses an API route (app/api/contact), which requires a
  // Node/serverless deploy (Vercel, etc.). If you need a fully static export
  // (`output: 'export'`), swap the form action to a hosted form endpoint instead.
};
export default nextConfig;
