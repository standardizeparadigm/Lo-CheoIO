/* =====================================================================
   Lọ Chéo — pure gain math for the WebAudio engine (v1.1.6)

   Keeping these calculations pure makes them testable without an
   AudioContext, and pins down one real bug found during the v1.1.6 audit:
   `unlock()` used to wire the music bus at a flat 0.5, ignoring the
   player's `musicVolume` until some later setter happened to run — so the
   first run after a reload always played music louder than configured.
   ===================================================================== */

/** Base music bus level at 100% volume. */
export const MUSIC_BUS_BASE = 0.5;

/** Default master level when not muted. */
export const MASTER_GAIN = 0.85;

/** Clamp an arbitrary number into 0..1 (NaN → fallback). */
export function unit(v: unknown, fallback = 1): number {
  return typeof v === "number" && Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : fallback;
}

/** Final music bus gain: 0 when the gate is off, else base × volume. */
export function musicBusGain(enabled: boolean, volume: number): number {
  return enabled ? MUSIC_BUS_BASE * unit(volume, 1) : 0;
}

/** Final SFX peak for one sound: base gain × SFX volume (0..1). */
export function sfxPeak(baseGain: number, volume: number): number {
  return Math.max(0, baseGain) * unit(volume, 1);
}

/** Master gain for the muted flag. */
export function masterGain(muted: boolean): number {
  return muted ? 0 : MASTER_GAIN;
}
