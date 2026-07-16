import type { MetadataRoute } from "next";
import { CONTENT_LAST_MODIFIED } from "@/lib/site-dates";

const lastModified = new Date(CONTENT_LAST_MODIFIED);

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://flowtechapps.com";
  return [
    { url: `${base}/`, lastModified },
    { url: `${base}/case-studies`, lastModified },
    { url: `${base}/privacy`, lastModified },
    { url: `${base}/terms`, lastModified },
  ];
}
