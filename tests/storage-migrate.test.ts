import { afterEach, describe, expect, it, vi } from "vitest";
import { loadScores, normalizeScores } from "../src/game/storage";

function memStorage(): Storage {
  const m = new Map<string, string>();
  return {
    get length() { return m.size; },
    clear: () => m.clear(),
    getItem: (k: string) => (m.has(k) ? m.get(k)! : null),
    key: (i: number) => [...m.keys()][i] ?? null,
    removeItem: (k: string) => { m.delete(k); },
    setItem: (k: string, v: string) => { m.set(k, String(v)); },
  };
}

describe("normalizeScores — offline-proofing the TOP 8 board", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("drops malformed rows but keeps valid siblings", () => {
    const clean = normalizeScores([
      { id: "ok", name: "BÀ TƯ", score: 100, level: 1, jars: 0, combo: 0, date: 1 },
      { id: "bad1", score: 50, name: "" }, // empty name → drop
      { name: "NO SCORE" }, // missing score → drop
      null,
      "garbage",
      { id: "ok2", name: "CHÚ BA", score: 2000, level: 999, jars: -3, combo: 2, date: 2 },
    ]);
    expect(clean.map((e) => e.id)).toEqual(["ok2", "ok"]); // sorted by score desc
    expect(clean[0].level).toBe(999); // level clamp chỉ ở nơi đọc, không đổi giá trị ở đây
    expect(clean[0].jars).toBe(0); // jars âm bị kẹp về 0
  });

  it("imported rows without id get a generated imp-* id", () => {
    const clean = normalizeScores([{ name: "NGƯỜI LẠ", score: 5, date: 3 }]);
    expect(clean[0].id).toMatch(/^imp-/);
  });

  it("caps to 8 entries keeping the highest scores", () => {
    const rows = Array.from({ length: 12 }, (_, i) => ({
      id: `x${i}`, name: `N${i}`, score: i * 100, level: 1, jars: 0, combo: 0, date: i,
    }));
    const clean = normalizeScores(rows);
    expect(clean.length).toBe(8);
    expect(clean[0].score).toBe(1100);
    expect(clean[7].score).toBe(400);
  });

  it("corrupted JSON in storage falls back to SEED (no crash)", () => {
    vi.stubGlobal("localStorage", memStorage());
    localStorage.setItem("locheo.scores.v1", "{not json");
    const board = loadScores();
    expect(board.length).toBe(6);
    expect(board[0].score).toBe(6420);
  });

  it("valid JSON but non-array payload falls back to SEED", () => {
    vi.stubGlobal("localStorage", memStorage());
    localStorage.setItem("locheo.scores.v1", "\"a string\"");
    expect(loadScores().length).toBe(6);
  });

  it("score with float gets rounded, name truncated to 16 chars", () => {
    const clean = normalizeScores([
      { id: "f", name: "X".repeat(40), score: 123.9, level: 1, jars: 0, combo: 0, date: 1 },
    ]);
    expect(clean[0].score).toBe(124);
    expect(clean[0].name.length).toBe(16);
  });
});
