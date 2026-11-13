/* =====================================================================
   Lọ Chéo — guarded localStorage access (v1.1.6)

   Every persisted subsystem (scores, settings, saved run, language) writes
   its own `try { localStorage.getItem(…) } catch {}`. That spread made it
   hard to audit *what* the game touches, and Safari-in-private-mode threw
   on `setItem` in a spot that had forgotten its guard.

   One module now owns the whole surface:
     • every access is wrapped,
     • the key inventory lives in one place (see docs/guides/storage-keys.md),
     • `safeStorage.available()` lets the UI explain *why* progress is not
       being saved instead of silently pretending.
   ===================================================================== */

export const STORAGE_KEYS = {
  scores: "locheo.scores.v1",
  progress: "locheo.progress.v1",
  achievements: "locheo.achievements.v1",
  settings: "locheo.settings.v1",
  run: "locheo.run.v1",
  mode: "locheo.mode.v1",
  lang: "locheo.lang.v1",
  muted: "locheo.muted.v1",
} as const;

export type StorageKeyName = keyof typeof STORAGE_KEYS;

/** Is localStorage usable at all (not blocked, not quota-zero)? */
export function storageAvailable(): boolean {
  try {
    if (typeof localStorage === "undefined") return false;
    const probe = "__locheo_probe__";
    localStorage.setItem(probe, "1");
    localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

/** Read a raw string; `null` when missing, blocked, or on any error. */
export function readRaw(key: string): string | null {
  try {
    if (typeof localStorage === "undefined") return null;
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** Write a raw string. Returns `false` when the browser refused (quota/blocked). */
export function writeRaw(key: string, value: string): boolean {
  try {
    if (typeof localStorage === "undefined") return false;
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/** Remove one key; no-op when blocked. */
export function removeRaw(key: string): void {
  try {
    if (typeof localStorage === "undefined") return;
    localStorage.removeItem(key);
  } catch {
    /* blocked */
  }
}

/** Read + JSON.parse in one step. Returns `null` for missing/corrupt entries. */
export function readJSON<T = unknown>(key: string): T | null {
  const raw = readRaw(key);
  if (raw === null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/** JSON.stringify + write. `false` when serialisation or storage failed. */
export function writeJSON(key: string, value: unknown): boolean {
  let payload: string;
  try {
    payload = JSON.stringify(value);
  } catch {
    return false;
  }
  return writeRaw(key, payload);
}

/** Wipe every key this game owns — used by "clear all data". */
export function clearAllGameKeys(): void {
  for (const key of Object.values(STORAGE_KEYS)) removeRaw(key);
}
