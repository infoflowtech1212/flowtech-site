/**
 * Notifies Bing/Yandex/Naver via the IndexNow protocol that site URLs changed.
 * Not run automatically on build/deploy — this makes an outbound network call,
 * so it's opt-in. Run after a real content update:
 *
 *   npm run indexnow
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://flowtechapps.com";
const KEY = "77b3aeb291b6ff373ee1388d7e041260";

const host = new URL(SITE_URL).host;
const urlList = ["/", "/case-studies", "/privacy", "/terms"].map(
  (path) => `${SITE_URL}${path}`
);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host,
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList,
  }),
});

if (res.ok) {
  console.log(`IndexNow: submitted ${urlList.length} URLs (${res.status})`);
} else {
  console.error(`IndexNow: submission failed (${res.status})`, await res.text());
  process.exitCode = 1;
}
