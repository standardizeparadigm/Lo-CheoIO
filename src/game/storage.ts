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
const SIZE = 8;

const SEED: ScoreEntry[] = [
  { id: "s1", name: "BÀ TƯ", score: 6420, level: 9, jars: 5, combo: 24, date: Date.now() - 86400000 * 2 },
  { id: "s2", name: "CÔ HẠNH", score: 5180, level: 8, jars: 4, combo: 19, date: Date.now() - 86400000 * 4 },
  { id: "s3", name: "CHÚ BA", score: 4310, level: 7, jars: 3, combo: 17, date: Date.now() - 86400000 * 5 },
  { id: "s4", name: "MỤ NỘI", score: 3260, level: 6, jars: 3, combo: 14, date: Date.now() - 86400000 * 7 },
  { id: "s5", name: "THẰNG TÍ", score: 2410, level: 5, jars: 2, combo: 12, date: Date.now() - 86400000 * 9 },
  { id: "s6", name: "CHỊ HÀ", score: 1580, level: 4, jars: 1, combo: 9, date: Date.now() - 86400000 * 11 },
];

function valid(v: unknown): v is ScoreEntry[] {
  return Array.isArray(v) && v.every((e) => typeof e?.score === "number" && typeof e?.name === "string");
}

export function loadScores(): ScoreEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [...SEED];
    const parsed: unknown = JSON.parse(raw);
    if (!valid(parsed)) return [...SEED];
    return parsed.slice(0, SIZE);
  } catch {
    return [...SEED];
  }
}

export function persistScores(list: ScoreEntry[]): ScoreEntry[] {
  const next = [...list].sort((a, b) => b.score - a.score).slice(0, SIZE);
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
