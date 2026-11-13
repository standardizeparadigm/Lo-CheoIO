/* =====================================================================
   Lọ Chéo — suspended-run persistence (locheo.run.v1)
   Saves an in-progress run so it can be resumed from the main menu
   ("CHƠI TIẾP"). Only stats + jar/combo/power state are kept — the field
   of falling produce is intentionally NOT persisted; a resumed run fades
   in with a short grace period instead.
   ===================================================================== */

import { isModeId, type ModeId } from "./modes";
import type { RunStats } from "./engine";

export const RUN_SAVE_KEY = "locheo.run.v1";

export interface SavedRun {
  version: 1;
  /** Epoch ms when the run was suspended */
  savedAt: number;
  mode: ModeId;
  stats: RunStats;
  /** Jar fill 0..1 */
  fill: number;
  cracks: number;
  stamina: number;
  frenzy: number;
  slow: number;
  shield: number;
  slamCd: number;
  combo: number;
  comboT: number;
  /** Last player position in canvas coordinates (clamped on restore) */
  px: number;
  py: number;
}

const MAX_CRACKS = 3;

function clampNum(v: unknown, min: number, max: number, fallback: number): number {
  const n = typeof v === "number" && Number.isFinite(v) ? v : fallback;
  return Math.min(max, Math.max(min, n));
}

function nonNegInt(v: unknown, fallback = 0): number {
  return Math.max(0, Math.round(clampNum(v, 0, Number.MAX_SAFE_INTEGER, fallback)));
}

/**
 * Normalise an untrusted value into a valid SavedRun, or return null when
 * the data is unusable (wrong version, unknown mode, non-finite stats).
 */
export function normalizeSavedRun(v: unknown): SavedRun | null {
  if (typeof v !== "object" || v === null) return null;
  const r = v as Record<string, unknown>;
  if (r.version !== 1) return null;
  if (!isModeId(typeof r.mode === "string" ? r.mode : null)) return null;
  const s = (typeof r.stats === "object" && r.stats !== null ? r.stats : null) as Record<string, unknown> | null;
  if (!s) return null;
  if (typeof s.score !== "number" || !Number.isFinite(s.score)) return null;
  return {
    version: 1,
    savedAt: nonNegInt(r.savedAt, Date.now()),
    mode: r.mode as ModeId,
    stats: {
      score: nonNegInt(s.score),
      catches: nonNegInt(s.catches),
      bestCombo: nonNegInt(s.bestCombo),
      level: Math.max(1, nonNegInt(s.level, 1)),
      jars: nonNegInt(s.jars),
      sliced: nonNegInt(s.sliced),
      time: clampNum(s.time, 0, Number.MAX_SAFE_INTEGER, 0),
    },
    fill: clampNum(r.fill, 0, 1, 0),
    cracks: nonNegInt(r.cracks),
    stamina: clampNum(r.stamina, 0, 1, 1),
    frenzy: clampNum(r.frenzy, 0, 60, 0),
    slow: clampNum(r.slow, 0, 60, 0),
    shield: nonNegInt(r.shield),
    slamCd: clampNum(r.slamCd, 0, 60, 0),
    combo: nonNegInt(r.combo),
    comboT: clampNum(r.comboT, 0, 60, 0),
    px: clampNum(r.px, 0, 10000, 400),
    py: clampNum(r.py, 0, 10000, 400),
  };
}

export function loadSavedRun(): SavedRun | null {
  try {
    const raw = localStorage.getItem(RUN_SAVE_KEY);
    if (!raw) return null;
    return normalizeSavedRun(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function saveSavedRun(run: SavedRun): SavedRun {
  const clean = normalizeSavedRun(run);
  if (!clean) throw new Error("Cannot persist an invalid SavedRun");
  try {
    localStorage.setItem(RUN_SAVE_KEY, JSON.stringify(clean));
  } catch {
    /* storage blocked — run stays suspended only this session via return value */
  }
  return clean;
}

export function clearSavedRun(): void {
  try {
    localStorage.removeItem(RUN_SAVE_KEY);
  } catch {
    /* storage blocked — nothing to clear */
  }
}

/** Convenience guard for callers that only need a yes/no. */
export function hasSavedRun(): boolean {
  return loadSavedRun() !== null;
}

export { MAX_CRACKS };
