/* =====================================================================
   Lọ Chéo — small numeric helpers (v1.1.6)

   These lived inline in engine.ts (`const clamp = ...`, `const lerp = ...`)
   which meant every UI/HUD helper that needed the same behaviour grew its
   own copy. Pulled out so they are shared and unit-testable.
   ===================================================================== */

/** Clamp `v` into [a, b]. Returns `a` when `v` is NaN (NaN comparisons are false). */
export function clamp(v: number, a: number, b: number): number {
  if (Number.isNaN(v)) return a;
  return v < a ? a : v > b ? b : v;
}

/** Clamp into 0..1 — the most common case, spelled out for readability. */
export function clamp01(v: number): number {
  return clamp(v, 0, 1);
}

/** Linear interpolation from `a` to `b` at `t` (t is not clamped). */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Frame-rate independent smoothing towards `target`.
 *
 * The engine used to write `lerp(x, target, Math.min(1, dt * k))`, which is
 * only correct at 60 fps: on a 144 Hz display `dt` is smaller so each frame
 * covers less ground, but there are 2.4× more frames — the visual result
 * differs and long frames (tab switch, GC pause) overshoot the clamp. The
 * exponential form below integrates the same rate regardless of frame
 * timing. `rate` is "fraction covered per second at 1 fps" ≈ old `k * 60`.
 */
export function damp(current: number, target: number, rate: number, dt: number): number {
  if (!(rate > 0) || !(dt > 0)) return current;
  const k = 1 - Math.exp(-rate * dt);
  return lerp(current, target, clamp01(Number.isFinite(k) ? k : 1));
}
