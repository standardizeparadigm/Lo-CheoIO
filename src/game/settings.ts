/* =====================================================================
   Lọ Chéo — game settings persistence (locheo.settings.v1)
   Toggles for SFX / music / screen shake / reduced motion. Degrades to
   in-memory defaults when storage is blocked.
   ===================================================================== */

export interface GameSettings {
  /** Sound effects (catch, slice, hurt, slam…) */
  sfx: boolean;
  /** Pentatonic background music during a run */
  music: boolean;
  /** Trauma-based screen shake (jar fill, SLAM, cracks) */
  shake: boolean;
  /** Reduce aurora/shimmer/shake for motion-sensitive players */
  reducedMotion: boolean;
}

export const SETTINGS_KEY = "locheo.settings.v1";

export const DEFAULT_SETTINGS: GameSettings = {
  sfx: true,
  music: true,
  shake: true,
  reducedMotion: false,
};

function bool(v: unknown, fallback: boolean): boolean {
  return typeof v === "boolean" ? v : fallback;
}

/**
 * Normalise an untrusted value into a valid settings object.
 * Unknown keys are dropped; missing/invalid keys fall back to defaults.
 */
export function normalizeSettings(v: unknown): GameSettings {
  if (typeof v !== "object" || v === null) return { ...DEFAULT_SETTINGS };
  const s = v as Record<string, unknown>;
  return {
    sfx: bool(s.sfx, DEFAULT_SETTINGS.sfx),
    music: bool(s.music, DEFAULT_SETTINGS.music),
    shake: bool(s.shake, DEFAULT_SETTINGS.shake),
    reducedMotion: bool(s.reducedMotion, DEFAULT_SETTINGS.reducedMotion),
  };
}

export function loadSettings(): GameSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    return normalizeSettings(JSON.parse(raw));
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings: GameSettings): GameSettings {
  const clean = normalizeSettings(settings);
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(clean));
  } catch {
    /* storage blocked — keep in memory */
  }
  return clean;
}

/** Patch a subset of settings, persist, and return the full object. */
export function updateSettings(patch: Partial<GameSettings>): GameSettings {
  return saveSettings({ ...loadSettings(), ...patch });
}
