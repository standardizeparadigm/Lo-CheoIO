/* =====================================================================
   Lọ Chéo — time formatting (v1.1.6)

   `fmtTime` lived inside PauseScreen.tsx and GameOverScreen imported it
   from *another component* — a layering smell that made the formatter
   impossible to unit test without pulling React in. It also mangled
   negative/NaN inputs (`m` came out as "-1"). Moved here, hardened.
   ===================================================================== */

/**
 * Format a run duration as `m:ss`.
 * - NaN / ±Infinity / negative → `0:00`
 * - fractional seconds are floored, hours roll into the minute field
 *   (`90 min` → `90:00`) so a long run never shows `1:30:00` unexpectedly
 */
export function fmtTime(seconds: number): string {
  const s = Number.isFinite(seconds) && seconds > 0 ? Math.floor(seconds) : 0;
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

/** Format a countdown as `ss` until the last minute, then `m:ss`. */
export function fmtCountdown(seconds: number): string {
  const s = Number.isFinite(seconds) && seconds > 0 ? Math.ceil(seconds) : 0;
  if (s < 60) return String(s);
  return fmtTime(s);
}
