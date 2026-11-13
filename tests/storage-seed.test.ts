import { afterEach, describe, expect, it, vi } from "vitest";
import { clearAllProgress, loadScores } from "../src/game/storage";

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

describe("seeded default board (offline-friendly first-run)", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("returns the 6-entry SEED board when storage is empty", () => {
    vi.stubGlobal("localStorage", memStorage());
    const board = loadScores();
    expect(board.length).toBe(6);
    expect(board[0].score).toBe(6420);
    expect(board[0].name).toBe("BÀ TƯ");
  });

  it("re-seeds after clearAllProgress() (danger zone does not destroy first-run feel)", () => {
    const mem = memStorage();
    vi.stubGlobal("localStorage", mem);
    clearAllProgress();
    const board = loadScores();
    expect(board.length).toBe(6);
    expect(board[0].score).toBe(6420);
  });

  it("returns in-memory SEED copy — mutating it does not corrupt the next load", () => {
    vi.stubGlobal("localStorage", memStorage());
    const a = loadScores();
    a[0].score = 1;
    const b = loadScores();
    expect(b[0].score).toBe(6420);
  });
});
