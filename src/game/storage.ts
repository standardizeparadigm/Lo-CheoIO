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

const KEY = "locheo.scores.v1";
const PROGRESS_KEY = "locheo.progress.v1";
const ACHIEVEMENTS_KEY = "locheo.achievements.v1";
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
      name: e.name.slice(0, 16),
      score: Math.max(0, Math.round(e.score)),
      level: Math.max(1, Math.round(num(e.level, 1))),
      jars: Math.max(0, Math.round(num(e.jars, 0))),
      combo: Math.max(0, Math.round(num(e.combo, 0))),
      date: num(e.date, Date.now()),
    });
  }
  return clean.sort((a, b) => b.score - a.score).slice(0, SIZE);
}

export function loadScores(): ScoreEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seedCopy();
    const normalized = normalizeScores(JSON.parse(raw));
    return normalized.length > 0 ? normalized : seedCopy();
  } catch {
    return seedCopy();
  }
}

export function persistScores(list: ScoreEntry[]): ScoreEntry[] {
  const next = normalizeScores(list);
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage blocked — keep in memory */
  }
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
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return { ...EMPTY_PROGRESS };
    return normalizeProgress(JSON.parse(raw));
  } catch {
    return { ...EMPTY_PROGRESS };
  }
}

export function saveProgress(p: Progress): Progress {
  const clean = normalizeProgress(p);
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(clean));
  } catch {
    /* storage blocked — keep in memory */
  }
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
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((v): v is string => typeof v === "string");
  } catch {
    return [];
  }
}

/** Merge newly unlocked ids into the persisted list; returns the full list. */
export function unlockAchievements(ids: string[]): string[] {
  const merged = [...new Set([...loadAchievements(), ...ids])];
  try {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(merged));
  } catch {
    /* storage blocked — keep in memory */
  }
  return merged;
}

/** Danger zone: wipe persisted scores/progress/achievements from this device. */
export function clearAllProgress(): void {
  try {
    localStorage.removeItem(KEY);
    localStorage.removeItem(PROGRESS_KEY);
    localStorage.removeItem(ACHIEVEMENTS_KEY);
  } catch {
    /* storage blocked — nothing to wipe */
  }
}
