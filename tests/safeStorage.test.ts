import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  STORAGE_KEYS,
  clearAllGameKeys,
  readJSON,
  readRaw,
  removeRaw,
  storageAvailable,
  writeJSON,
  writeRaw,
} from "../src/game/safeStorage";

let store: Map<string, string>;

beforeEach(() => {
  store = new Map();
  (globalThis as { localStorage?: Storage }).localStorage = {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => void store.set(k, String(v)),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
    key: (i: number) => Array.from(store.keys())[i] ?? null,
    get length() {
      return store.size;
    },
  } as unknown as Storage;
});

afterEach(() => vi.restoreAllMocks());

describe("storageAvailable", () => {
  it("is true with a working localStorage and leaves no probe behind", () => {
    expect(storageAvailable()).toBe(true);
    expect(store.has("__locheo_probe__")).toBe(false);
  });

  it("is false when setItem throws (Safari private mode)", () => {
    (globalThis as { localStorage?: Storage }).localStorage = {
      getItem: () => null,
      setItem: () => {
        throw new Error("QuotaExceededError");
      },
      removeItem: () => {},
      clear: () => {},
      key: () => null,
      length: 0,
    } as unknown as Storage;
    expect(storageAvailable()).toBe(false);
  });
});

describe("raw read/write", () => {
  it("round-trips and reports failures instead of throwing", () => {
    expect(writeRaw("k", "v")).toBe(true);
    expect(readRaw("k")).toBe("v");
    expect(readRaw("missing")).toBeNull();
    removeRaw("k");
    expect(readRaw("k")).toBeNull();
  });

  it("never throws when the storage object itself throws", () => {
    (globalThis as { localStorage?: Storage }).localStorage = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
      removeItem: () => {
        throw new Error("blocked");
      },
      clear: () => {},
      key: () => null,
      length: 0,
    } as unknown as Storage;
    expect(readRaw("k")).toBeNull();
    expect(writeRaw("k", "v")).toBe(false);
    expect(() => removeRaw("k")).not.toThrow();
  });
});

describe("JSON helpers", () => {
  it("returns null for corrupt payloads instead of throwing", () => {
    store.set("bad", "{not json");
    expect(readJSON("bad")).toBeNull();
    expect(readJSON("absent")).toBeNull();
  });

  it("round-trips objects and rejects un-serialisable values", () => {
    expect(writeJSON("obj", { a: 1 })).toBe(true);
    expect(readJSON("obj")).toEqual({ a: 1 });
    const cyclic: Record<string, unknown> = {};
    cyclic.self = cyclic;
    expect(writeJSON("cyc", cyclic)).toBe(false);
  });
});

describe("clearAllGameKeys", () => {
  it("removes exactly the documented inventory and nothing else", () => {
    store.set("unrelated", "keep me");
    for (const key of Object.values(STORAGE_KEYS)) store.set(key, "x");
    clearAllGameKeys();
    expect(store.get("unrelated")).toBe("keep me");
    for (const key of Object.values(STORAGE_KEYS)) expect(store.has(key)).toBe(false);
  });
});
