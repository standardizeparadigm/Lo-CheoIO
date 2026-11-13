import { afterEach, describe, expect, it, vi } from "vitest";
import { matches, onMediaChange, prefersCoarsePointer, prefersMoreContrast, prefersReducedMotion } from "../src/utils/mediaQuery";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("mediaQuery helpers (v1.1.6)", () => {
  it("returns the fallback when matchMedia is missing (SSR/jsdom)", () => {
    vi.stubGlobal("window", {});
    expect(matches("(pointer: coarse)")).toBe(false);
    expect(matches("(pointer: coarse)", true)).toBe(true);
    expect(prefersReducedMotion()).toBe(false);
    expect(prefersCoarsePointer()).toBe(false);
    expect(prefersMoreContrast()).toBe(false);
  });

  it("returns the fallback when matchMedia throws", () => {
    vi.stubGlobal("window", {
      matchMedia: () => {
        throw new Error("nope");
      },
    });
    expect(matches("(any)")).toBe(false);
    expect(prefersReducedMotion()).toBe(false);
  });

  it("reads the real match state", () => {
    vi.stubGlobal("window", { matchMedia: (q: string) => ({ matches: q.includes("reduce") }) });
    expect(prefersReducedMotion()).toBe(true);
    expect(prefersCoarsePointer()).toBe(false);
  });

  it("onMediaChange subscribes and unsubscribes without throwing", () => {
    const listeners: Array<(e: { matches: boolean }) => void> = [];
    const mql = {
      matches: false,
      addEventListener: (_: string, cb: (e: { matches: boolean }) => void) => listeners.push(cb),
      removeEventListener: vi.fn(),
    };
    vi.stubGlobal("window", { matchMedia: () => mql });
    const seen: boolean[] = [];
    const off = onMediaChange("(pointer: coarse)", (m) => seen.push(m));
    listeners.forEach((cb) => cb({ matches: true }));
    expect(seen).toEqual([true]);
    off();
    expect(mql.removeEventListener).toHaveBeenCalled();
  });

  it("onMediaChange falls back to legacy addListener (Safari < 14)", () => {
    const addListener = vi.fn();
    const removeListener = vi.fn();
    vi.stubGlobal("window", { matchMedia: () => ({ matches: false, addListener, removeListener }) });
    const off = onMediaChange("(any)", () => {});
    expect(addListener).toHaveBeenCalledTimes(1);
    off();
    expect(removeListener).toHaveBeenCalledTimes(1);
  });

  it("onMediaChange is a no-op without matchMedia", () => {
    vi.stubGlobal("window", {});
    const off = onMediaChange("(any)", () => {});
    expect(typeof off).toBe("function");
    expect(() => off()).not.toThrow();
  });
});
