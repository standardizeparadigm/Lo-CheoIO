/* =====================================================================
   Lọ Chéo — game settings persistence (locheo.settings.v1)

   v1.1.6: the settings schema grows into four sections —
     Âm thanh (audio) · Giao diện & chuyển động (display & motion) ·
     Ngôn ngữ (language) · Dữ liệu (danger zone handled in the UI).

   Mix of control types:
     • on/off toggles  — sfx, music, shake, reducedMotion, autoPauseOnBlur
     • level (0–100)   — sfxVolume, musicVolume
     • discrete choice — shakeLevel ("low"|"high"), visualQuality ("low"|"high")
     • language choice — one of the 7 UI languages

   Everything degrades to in-memory defaults when storage is blocked and
   every read is validated + clamped — corrupt data never crashes the game.
   ===================================================================== */

export type ShakeLevel = "low" | "high";
export type VisualQuality = "low" | "high";

export const SUPPORTED_LANGUAGES = ["vi", "en", "zh", "ja", "ko", "es", "fr"] as const;
export type SettingLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export interface GameSettings {
  /* ---- Âm thanh ---- */
  /** Sound effects (catch, slice, hurt, slam…) */
  sfx: boolean;
  /** Pentatonic background music during a run */
  music: boolean;
  /** SFX loudness 0–100 (applied on top of the SFX gate) */
  sfxVolume: number;
  /** Music loudness 0–100 (applied on top of the music gate) */
  musicVolume: number;
  /* ---- Giao diện & chuyển động ---- */
  /** Screen shake at all (master switch) */
  shake: boolean;
  /** Shake strength — "low" ≈ 45% trauma, "high" = full */
  shakeLevel: ShakeLevel;
  /** Reduce aurora/shimmer/flash/shake for motion-sensitive players */
  reducedMotion: boolean;
  /** "low" halves the particle budget and skips glow passes */
  visualQuality: VisualQuality;
  /** Auto-pause the run when the tab/window loses focus */
  autoPauseOnBlur: boolean;
  /* ---- Ngôn ngữ ---- */
  /** UI language — section moved here from the top-right switcher (v1.1.6) */
  language: SettingLanguage;
}

export const SETTINGS_KEY = "locheo.settings.v1";

export const DEFAULT_SETTINGS: GameSettings = {
  sfx: true,
  music: true,
  sfxVolume: 80,
  musicVolume: 60,
  shake: true,
  shakeLevel: "high",
  reducedMotion: false,
  visualQuality: "high",
  autoPauseOnBlur: true,
  language: "vi",
};

function bool(v: unknown, fallback: boolean): boolean {
  return typeof v === "boolean" ? v : fallback;
}

function clampInt(v: unknown, min: number, max: number, fallback: number): number {
  const n = typeof v === "number" && Number.isFinite(v) ? Math.round(v) : fallback;
  return Math.min(max, Math.max(min, n));
}

function pick<T extends string>(v: unknown, allowed: readonly T[], fallback: T): T {
  return typeof v === "string" && (allowed as readonly string[]).includes(v) ? (v as T) : fallback;
}

/**
 * Normalise an untrusted value into a valid settings object.
 * Unknown keys are dropped; missing/invalid keys fall back to defaults.
 * `languageFallback` lets the caller seed the language from the i18n
 * module on first run (so VI-first-run / browser-locale still works).
 */
export function normalizeSettings(v: unknown, languageFallback: string = DEFAULT_SETTINGS.language): GameSettings {
  const d = DEFAULT_SETTINGS;
  if (typeof v !== "object" || v === null) return { ...d, language: pick(languageFallback, SUPPORTED_LANGUAGES, d.language) };
  const s = v as Record<string, unknown>;
  return {
    sfx: bool(s.sfx, d.sfx),
    music: bool(s.music, d.music),
    sfxVolume: clampInt(s.sfxVolume, 0, 100, d.sfxVolume),
    musicVolume: clampInt(s.musicVolume, 0, 100, d.musicVolume),
    shake: bool(s.shake, d.shake),
    shakeLevel: pick(s.shakeLevel, ["low", "high"] as const, d.shakeLevel),
    reducedMotion: bool(s.reducedMotion, d.reducedMotion),
    visualQuality: pick(s.visualQuality, ["low", "high"] as const, d.visualQuality),
    autoPauseOnBlur: bool(s.autoPauseOnBlur, d.autoPauseOnBlur),
    language: pick(s.language, SUPPORTED_LANGUAGES, pick(languageFallback, SUPPORTED_LANGUAGES, d.language)),
  };
}

export function loadSettings(languageFallback?: string): GameSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return normalizeSettings(null, languageFallback);
    return normalizeSettings(JSON.parse(raw), languageFallback);
  } catch {
    return normalizeSettings(null, languageFallback);
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

/** Reset every setting to defaults except keep the current language choice. */
export function resetSettingsKeepingLanguage(current: GameSettings): GameSettings {
  return saveSettings({ ...DEFAULT_SETTINGS, language: current.language });
}
