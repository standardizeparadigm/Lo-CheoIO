/* =====================================================================
   Lọ Chéo — settings backup & restore (v1.1.6)

   Players asked for a way to carry their tuning between browsers/machines.
   The backup is a tiny JSON envelope; importing one is validated through
   `normalizeSettings`, so a hand-edited or truncated file can never inject
   garbage into the live settings object.

   Envelope (forward compatible — extra keys are ignored):

     {
       "app": "lo-cheoio",
       "kind": "settings",
       "version": 1,
       "exportedAt": "2026-11-13T…",
       "settings": { …GameSettings }
     }

   `importSettings` also accepts a *bare* settings object (what older
   console snippets produced) so power users are not punished for it.
   ===================================================================== */

import { normalizeSettings, type GameSettings } from "./settings";

export const BACKUP_APP = "lo-cheoio";
export const BACKUP_KIND = "settings";
export const BACKUP_VERSION = 1;

interface BackupEnvelope {
  app: string;
  kind: string;
  version: number;
  exportedAt: string;
  settings: GameSettings;
}

/** Serialise the live settings into a pretty, human-readable envelope. */
export function exportSettings(settings: GameSettings, now: Date = new Date()): string {
  const envelope: BackupEnvelope = {
    app: BACKUP_APP,
    kind: BACKUP_KIND,
    version: BACKUP_VERSION,
    exportedAt: now.toISOString(),
    settings: normalizeSettings(settings),
  };
  return JSON.stringify(envelope, null, 2);
}

/**
 * Parse a backup (envelope or bare object) into normalised settings.
 * Returns `null` for anything that is not usable — callers show an error
 * instead of silently overwriting the player's configuration.
 */
export function importSettings(raw: string, languageFallback?: string): GameSettings | null {
  if (typeof raw !== "string" || raw.trim().length === 0) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return null;
  const obj = parsed as Record<string, unknown>;
  const candidate =
    obj.kind === BACKUP_KIND && typeof obj.settings === "object" && obj.settings !== null
      ? obj.settings
      : obj;
  // Reject objects that share none of the known keys — almost certainly a
  // score board or a random snippet pasted into the wrong box.
  const known = [
    "sfx", "music", "sfxVolume", "musicVolume", "shake", "shakeLevel",
    "reducedMotion", "visualQuality", "autoPauseOnBlur", "language",
  ];
  const hasKnown = known.some((k) => Object.prototype.hasOwnProperty.call(candidate, k));
  if (!hasKnown) return null;
  return normalizeSettings(candidate, languageFallback);
}

/** True when the string looks like a Lọ Chéo settings backup. */
export function looksLikeSettingsBackup(raw: string): boolean {
  return importSettings(raw) !== null;
}
