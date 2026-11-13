/* =====================================================================
   Lọ Chéo — safe media-query helpers (v1.1.6)

   `window.matchMedia` throws in some embedded webviews and is absent in
   jsdom/SSR. Every call site used to inline a `try/catch` or a `?.` — this
   module centralises the fallbacks so a missing API can never crash boot.
   ===================================================================== */

/** True when the player's OS asks for less motion. Defaults to `false`. */
export function prefersReducedMotion(): boolean {
  return matches("(prefers-reduced-motion: reduce)", false);
}

/** True when the pointer is coarse (touch-first device). Defaults to `false`. */
export function prefersCoarsePointer(): boolean {
  return matches("(pointer: coarse)", false);
}

/** True when the OS asks for more contrast. Defaults to `false`. */
export function prefersMoreContrast(): boolean {
  return matches("(prefers-contrast: more)", false);
}

/**
 * Read a media query without ever throwing.
 * @param query   CSS media query string
 * @param fallback value returned when the API is unavailable or throws
 */
export function matches(query: string, fallback = false): boolean {
  try {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return fallback;
    return window.matchMedia(query).matches;
  } catch {
    return fallback;
  }
}

/** Subscribe to changes of a media query. Returns an unsubscribe function. */
export function onMediaChange(query: string, cb: (matches: boolean) => void): () => void {
  try {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return () => {};
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => cb(e.matches);
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    }
    // Safari < 14
    mql.addListener(handler);
    return () => mql.removeListener(handler);
  } catch {
    return () => {};
  }
}
