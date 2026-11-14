/* =====================================================================
   Lọ Chéo — localStorage persistence: top-8 board, lifetime progress,
   achievements. Everything degrades to in-memory if storage is blocked.
   ===================================================================== */

export interface ScoreEntry {
  id: string;
  name: string;
  score: number;
  level: number;
  jars: number;
  combo: number;
  date: number;
}

import { STORAGE_KEYS, readJSON, removeRaw, writeJSON } from "./safeStorage";

const KEY = STORAGE_KEYS.scores;
const PROGRESS_KEY = STORAGE_KEYS.progress;
const ACHIEVEMENTS_KEY = STORAGE_KEYS.achievements;
const SIZE = 8;

/** Deep-enough clone so callers can't mutate the module-level SEED rows. */
function seedCopy(): ScoreEntry[] {
  return SEED.map((e) => ({ ...e }));
}

const SEED: ScoreEntry[] = [
  { id: "s1", name: "BÀ TƯ", score: 6420, level: 9, jars: 5, combo: 24, date: Date.now() - 86400000 * 2 },
  { id: "s2", name: "CÔ HẠNH", score: 5180, level: 8, jars: 4, combo: 19, date: Date.now() - 86400000 * 4 },
  { id: "s3", name: "CHÚ BA", score: 4310, level: 7, jars: 3, combo: 17, date: Date.now() - 86400000 * 5 },
  { id: "s4", name: "MỤ NỘI", score: 3260, level: 6, jars: 3, combo: 14, date: Date.now() - 86400000 * 7 },
  { id: "s5", name: "THẰNG TÍ", score: 2410, level: 5, jars: 2, combo: 12, date: Date.now() - 86400000 * 9 },
  { id: "s6", name: "CHỊ HÀ", score: 1580, level: 4, jars: 1, combo: 9, date: Date.now() - 86400000 * 11 },
];

function num(v: unknown, fallback = 0): number {
  return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}

/** A timestamp a `Date` can render, or now. */
function saneDate(v: unknown): number {
  const now = Date.now();
  if (typeof v !== "number" || !Number.isFinite(v)) return now;
  const max = 4_102_444_800_000; // 2100-01-01
  if (v < 0 || v > max) return now;
  return Math.round(v);
}

/**
 * Normalise an untrusted value into a clean, sorted top-8 list.
 * Silently drops malformed entries instead of rejecting the whole board.
 */
export function normalizeScores(v: unknown): ScoreEntry[] {
  if (!Array.isArray(v)) return [];
  const clean: ScoreEntry[] = [];
  for (const raw of v) {
    if (typeof raw !== "object" || raw === null) continue;
    const e = raw as Record<string, unknown>;
    if (typeof e.score !== "number" || !Number.isFinite(e.score)) continue;
    if (typeof e.name !== "string" || e.name.trim().length === 0) continue;
    clean.push({
      id: typeof e.id === "string" && e.id ? e.id : `imp-${Math.random().toString(36).slice(2, 8)}`,
      name: e.name.trim().slice(0, 16),
      score: Math.max(0, Math.round(e.score)),
      level: Math.max(1, Math.round(num(e.level, 1))),
      jars: Math.max(0, Math.round(num(e.jars, 0))),
      combo: Math.max(0, Math.round(num(e.combo, 0))),
      /*
       * `num()` rejects NaN and Infinity but accepts any finite number, and a
       * date is not any finite number. Both ends of the range are reachable
       * from a hand-edited save and both render as garbage on the board:
       *
       *     1e308   →  `new Date(1e308)` is Invalid Date; the row prints
       *                "Invalid Date" beside a perfectly good score
       *     -1e15   →  a year roughly -31 million, printed as "30/12/-31688902"
       *
       * `saneDate()` clamps to the range a JavaScript `Date` can represent and
       * a human can read (1970 → 2100). Anything outside becomes "now", which
       * is what an unparseable date meant before the field existed.
       */
      date: saneDate(e.date),
    });
  }
  return clean.sort((a, b) => b.score - a.score).slice(0, SIZE);
}

export function loadScores(): ScoreEntry[] {
  const stored = readJSON(KEY);
  if (stored === null) return seedCopy();
  const normalized = normalizeScores(stored);
  return normalized.length > 0 ? normalized : seedCopy();
}

export function persistScores(list: ScoreEntry[]): ScoreEntry[] {
  const next = normalizeScores(list);
  // writeJSON swallows quota/private-mode failures — the board stays in memory
  writeJSON(KEY, next);
  return next;
}

export function submitScore(entry: Omit<ScoreEntry, "id">): { list: ScoreEntry[]; id: string } {
  const id = `r${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  const withId: ScoreEntry = { ...entry, id };
  return { list: persistScores([...loadScores(), withId]), id };
}

export function bestScore(list: ScoreEntry[]): number {
  return list.length ? list[0].score : 0;
}

export function qualifies(score: number, list: ScoreEntry[]): boolean {
  return score > 0 && (list.length < SIZE || score > list[list.length - 1].score);
}

export function rankOf(score: number, list: ScoreEntry[]): number {
  let rank = 1;
  for (const e of list) if (e.score > score) rank++;
  return rank;
}

/* --------------------------------------------------------- progress --- */

export interface Progress {
  /** Total finished runs across sessions */
  runs: number;
  /** Cumulative jars filled across sessions */
  totalJars: number;
  /** Cumulative hazards sliced across sessions */
  totalSliced: number;
  /** Best lifetime score */
  bestScore: number;
}

export const EMPTY_PROGRESS: Progress = { runs: 0, totalJars: 0, totalSliced: 0, bestScore: 0 };

function normalizeProgress(v: unknown): Progress {
  if (typeof v !== "object" || v === null) return { ...EMPTY_PROGRESS };
  const p = v as Record<string, unknown>;
  return {
    runs: Math.max(0, Math.round(num(p.runs, 0))),
    totalJars: Math.max(0, Math.round(num(p.totalJars, 0))),
    totalSliced: Math.max(0, Math.round(num(p.totalSliced, 0))),
    bestScore: Math.max(0, Math.round(num(p.bestScore, 0))),
  };
}

export function loadProgress(): Progress {
  const stored = readJSON(PROGRESS_KEY);
  if (stored === null) return { ...EMPTY_PROGRESS };
  return normalizeProgress(stored);
}

export function saveProgress(p: Progress): Progress {
  const clean = normalizeProgress(p);
  writeJSON(PROGRESS_KEY, clean);
  return clean;
}

/** Fold a finished run into lifetime progress and persist it. */
export function recordRun(stats: { jars: number; sliced: number; score: number }): Progress {
  const prev = loadProgress();
  return saveProgress({
    runs: prev.runs + 1,
    totalJars: prev.totalJars + Math.max(0, Math.round(stats.jars)),
    totalSliced: prev.totalSliced + Math.max(0, Math.round(stats.sliced)),
    bestScore: Math.max(prev.bestScore, Math.round(stats.score)),
  });
}

/* ------------------------------------------------------ achievements --- */

export function loadAchievements(): string[] {
  const parsed = readJSON(ACHIEVEMENTS_KEY);
  if (!Array.isArray(parsed)) return [];
  return parsed.filter((v): v is string => typeof v === "string");
}

/** Merge newly unlocked ids into the persisted list; returns the full list. */
export function unlockAchievements(ids: string[]): string[] {
  const merged = [...new Set([...loadAchievements(), ...ids])];
  writeJSON(ACHIEVEMENTS_KEY, merged);
  return merged;
}

/** Danger zone: wipe persisted scores/progress/achievements from this device. */
export function clearAllProgress(): void {
  removeRaw(KEY);
  removeRaw(PROGRESS_KEY);
  removeRaw(ACHIEVEMENTS_KEY);
}
