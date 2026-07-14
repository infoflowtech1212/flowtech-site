import type { MetadataRoute } from "next";

// Real last-content-change dates (update when a page's actual content changes —
// not on every build/request, which is what made Google ignore this signal before).
const CONTENT_LAST_MODIFIED = new Date("2026-07-13");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://flowtechapps.com";
  return [
    { url: `${base}/`, lastModified: CONTENT_LAST_MODIFIED, priority: 1 },
    { url: `${base}/case-studies`, lastModified: CONTENT_LAST_MODIFIED, priority: 0.8 },
    { url: `${base}/privacy`, lastModified: CONTENT_LAST_MODIFIED, priority: 0.3 },
    { url: `${base}/terms`, lastModified: CONTENT_LAST_MODIFIED, priority: 0.3 },
  ];
}
