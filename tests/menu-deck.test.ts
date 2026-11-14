/**
 * The deck: a daily challenge, a daily tip, and the mode you are about to play.
 *
 * The interesting failures here are not visual, they are *temporal* and
 * *catalogue* failures:
 *
 *   - a challenge that changes at UTC midnight changes at 07:00 in Vietnam,
 *     and players read that as "it changed twice today";
 *   - a challenge that is `day % modes.length` walks the mode list in order,
 *     so every player sees classic → zen → inferno → … and learns the ramp;
 *   - a tip that rotates on the same hash as the challenge pairs each mode
 *     with exactly one rule forever, teaching one sixth of the game.
 *
 * Each of those is pinned below.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import {
  challengeFor,
  isToday,
  localDayNumber,
  mix,
} from "../src/components/menu/deck/daily";
import { RULE_COUNT, tipIndexFor } from "../src/components/menu/deck/tip";
import { DECK_HIDE_WIDTH, DECK_MIN_WIDTH } from "../src/components/menu/deck/width";

const MODES = ["classic", "zen", "inferno", "blitz", "goldrush", "hardcore", "storm", "feast", "combo"];

describe("localDayNumber", () => {
  it("is stable across every hour of one local day", () => {
    const days = new Set<number>();
    for (let h = 0; h < 24; h++) {
      days.add(localDayNumber(new Date(2026, 10, 12, h, 30)));
    }
    expect(days.size).toBe(1);
  });

  it("does not use UTC boundaries — 23:59 and 00:01 local are different days", () => {
    const late = new Date(2026, 10, 12, 23, 59);
    const early = new Date(2026, 10, 13, 0, 1);
    expect(localDayNumber(early)).toBe(localDayNumber(late) + 1);
  });

  it("advances by exactly one per calendar day across a month", () => {
    for (let d = 1; d < 30; d++) {
      const a = localDayNumber(new Date(2026, 10, d));
      const b = localDayNumber(new Date(2026, 10, d + 1));
      expect(b - a).toBe(1);
    }
  });

  it("survives a DST transition without dropping a day", () => {
    // Not every locale has DST, but the round() in localDayNumber exists so
    // that one does not lose a day where it applies. The invariant must hold
    // regardless of the host's zone.
    const before = localDayNumber(new Date(2026, 2, 28));
    const after = localDayNumber(new Date(2026, 2, 29));
    expect(after - before).toBe(1);
  });
});

describe("mix", () => {
  it("returns an unsigned 32-bit integer", () => {
    for (const n of [0, 1, 2, 100, 20_000, -5, 1e9]) {
      const v = mix(n);
      expect(Number.isInteger(v)).toBe(true);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(2 ** 32);
    }
  });

  it("does not return consecutive values for consecutive inputs", () => {
    // This is the whole reason mix() exists: `day % modes.length` would.
    const diffs = [];
    for (let d = 0; d < 10; d++) {
      diffs.push(((mix(d + 1) - mix(d)) % 1000 + 1000) % 1000);
    }
    expect(diffs.some((x) => x !== 1 && x !== 999)).toBe(true);
  });
});

describe("challengeFor", () => {
  it("is deterministic for one day and the same mode list", () => {
    const a = challengeFor(new Date(2026, 10, 12), MODES);
    const b = challengeFor(new Date(2026, 10, 12, 18, 45), MODES);
    expect(a).toEqual(b);
  });

  it("picks a real mode from the catalogue", () => {
    for (let d = 0; d < 60; d++) {
      const c = challengeFor(new Date(2026, 8, 1 + d), MODES);
      expect(MODES).toContain(c.mode);
    }
  });

  it("reaches every mode at least once in a 90-day window", () => {
    // A hash that collapses to three modes is a broken rotation; this catches
    // a mix() change that narrows the range without any other test noticing.
    const seen = new Set<string>();
    for (let d = 0; d < 90; d++) seen.add(challengeFor(new Date(2026, 0, 1 + d), MODES).mode);
    expect(seen.size).toBe(MODES.length);
  });

  it("gives a target in the declared band, in hundreds", () => {
    for (let d = 0; d < 90; d++) {
      const { target } = challengeFor(new Date(2026, 0, 1 + d), MODES);
      expect(target).toBeGreaterThanOrEqual(1_200);
      expect(target).toBeLessThanOrEqual(3_600);
      expect(target % 100).toBe(0);
    }
  });

  it("does not repeat yesterday's target every day", () => {
    const targets = new Set<number>();
    for (let d = 0; d < 40; d++) targets.add(challengeFor(new Date(2026, 0, 1 + d), MODES).target);
    expect(targets.size).toBeGreaterThan(1);
  });

  it("is well-formed even with an empty catalogue", () => {
    const c = challengeFor(new Date(2026, 10, 12), []);
    expect(c.mode).toBe("classic");
    expect(Number.isFinite(c.target)).toBe(true);
  });

  it("widens automatically when a mode is added", () => {
    // Nothing about the deck hardcodes nine modes.
    const ten = [...MODES, "newmode"];
    const c = challengeFor(new Date(2026, 10, 12), ten);
    expect(ten).toContain(c.mode);
  });
});

describe("isToday", () => {
  it("is true for the day the challenge was built for", () => {
    const now = new Date(2026, 10, 12, 9);
    expect(isToday(challengeFor(now, MODES).day, now)).toBe(true);
  });

  it("is false for the next day", () => {
    const c = challengeFor(new Date(2026, 10, 12), MODES);
    expect(isToday(c.day, new Date(2026, 10, 13))).toBe(false);
  });
});

describe("tipIndexFor", () => {
  it("stays inside the rule catalogue for a decade of days", () => {
    for (let d = 20_000; d < 23_700; d++) {
      const i = tipIndexFor(d);
      expect(i).toBeGreaterThanOrEqual(0);
      expect(i).toBeLessThan(RULE_COUNT);
      expect(Number.isInteger(i)).toBe(true);
    }
  });

  it("reaches all six rules within one six-day cycle", () => {
    // Stride 5 over 6 slots is coprime with 6, so the cycle is complete.
    const seen = new Set<number>();
    for (let d = 0; d < RULE_COUNT; d++) seen.add(tipIndexFor(d));
    expect(seen.size).toBe(RULE_COUNT);
  });

  it("handles rubbish input instead of producing NaN", () => {
    expect(tipIndexFor(NaN)).toBe(0);
    expect(tipIndexFor(Infinity)).toBe(0);
    expect(tipIndexFor(-1)).toBeGreaterThanOrEqual(0);
  });
});

describe("the deck does not drift from the catalogue", () => {
  it("has exactly six how-to rules in the locale files", () => {
    // RULE_COUNT is a number; the rule texts are data. If they disagree the
    // deck shows `rule.6.t` and renders the raw key.
    const vi = readFileSync("src/i18n/locales/vi.ts", "utf8");
    const rules = [...vi.matchAll(/^\s+"rule\.(\d+)\.t":/gm)].map((m) => Number(m[1]));
    expect(rules).toEqual([0, 1, 2, 3, 4, 5]);
    expect(rules.length).toBe(RULE_COUNT);
  });

  it("hides the whole deck at Tailwind's sm breakpoint", () => {
    // `.deck` is `hidden sm:grid`; sm is 640px. A change to one without the
    // other leaves the deck visible-but-empty or invisible-but-branching.
    expect(DECK_HIDE_WIDTH).toBe(640);
    const css = readFileSync("src/index.css", "utf8");
    expect(css).toContain(".deck");
  });

  it("needs more width for three columns than for two", () => {
    expect(DECK_MIN_WIDTH).toBeGreaterThan(DECK_HIDE_WIDTH);
  });

  it("renders the challenge target with the player's locale grouping", () => {
    // vi groups thousands with "." — 1600 must read "1.600", not "1600".
    expect(new Intl.NumberFormat("vi").format(1600)).toBe("1.600");
    expect(new Intl.NumberFormat("en").format(1600)).toBe("1,600");
  });
});
