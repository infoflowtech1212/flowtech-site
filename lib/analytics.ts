/**
 * Analytics stub. Swap the body of `track` for your provider
 * (Plausible, GA4, PostHog, ...) when analytics is chosen.
 */
export function track(event: string, props?: Record<string, unknown>) {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, props ?? {});
  }
  // no-op in production until a provider is wired
}
