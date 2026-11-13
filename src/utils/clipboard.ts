/* =====================================================================
   Lọ Chéo — clipboard helper (v1.1.6)

   `navigator.clipboard` is missing on plain-HTTP origins, in older Safari,
   and inside some embedded webviews. The settings backup button used to
   `await navigator.clipboard?.writeText(...)` and then *claim* success even
   when nothing was copied (`await undefined` resolves happily) — players got
   a "Copied to clipboard" toast with an empty clipboard. This helper reports
   the truth and never throws.
   ===================================================================== */

/** Copy text to the clipboard. Resolves `true` only when it really happened. */
export async function copyText(text: string): Promise<boolean> {
  try {
    const clip = typeof navigator !== "undefined" ? navigator.clipboard : undefined;
    if (!clip || typeof clip.writeText !== "function") return false;
    await clip.writeText(text);
    return true;
  } catch {
    /* permission denied, insecure context, blocked by the browser… */
    return false;
  }
}
