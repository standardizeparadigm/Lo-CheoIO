/* =====================================================================
   Lọ Chéo — weighted item spawning (v1.1.6)

   `LoCheoGame.pickKind()` used to build the weight table inline, which made
   the *balance* of every mode impossible to inspect or test without booting
   a canvas. Pulled out pure: same weights, same order, same result — but now
   `tests/spawn.test.ts` can assert things like "hardcore never spawns a
   golden item at level 1" or "storm raises hazards".

   Weight semantics (unchanged):
     • base weight comes from the item definition at the current level
     • hazards scale with the mode's `hazardMult`
     • power/fill-boost items scale with `goldMult` (undefined → 1)
     • decorative (attract-mode) items halve gold weight and cut hazards ×0.4
   ===================================================================== */

import { DEFS, type ItemKind } from "./engine";

/** Anything with a `weight(level)` curve — `DEFS` entries satisfy this. */
export interface WeightedItem {
  weight: (level: number) => number;
  hazard?: boolean;
  power?: unknown;
  fillBoost?: number;
}

export interface SpawnMode {
  hazardMult?: number;
  goldMult?: number;
}

export interface WeightOptions {
  /** level used for the weight curves (attract mode pins it to 4) */
  level: number;
  mode?: SpawnMode;
  /** attract/decoration pass — calmer and less golden */
  deco?: boolean;
}

/** Relative weight of one item kind under the given options. */
export function itemWeight(def: WeightedItem, opts: WeightOptions): number {
  const { level, mode = {}, deco = false } = opts;
  let w = def.weight(level);
  if (def.hazard) w *= mode.hazardMult ?? 1;
  if (def.power || def.fillBoost) w *= mode.goldMult ?? 1;
  if (deco) {
    if (def.hazard) w *= 0.4;
    if (def.power) w *= 0.5;
  }
  return w < 0 || !Number.isFinite(w) ? 0 : w;
}

/**
 * Pick a kind by weighted random. `kinds` order is preserved so a given
 * `random()` sequence always maps to the same spawn — deterministic in tests.
 */
export function weightedPick(
  kinds: readonly ItemKind[],
  opts: WeightOptions,
  random: () => number = Math.random,
): ItemKind {
  const weights = kinds.map((k) => itemWeight(DEFS[k], opts));
  const total = weights.reduce((a, b) => a + b, 0);
  if (!(total > 0)) return kinds[0] ?? "ca";
  let r = random() * total;
  for (let i = 0; i < kinds.length; i++) {
    r -= weights[i];
    if (r <= 0) return kinds[i];
  }
  // Float drift (or a random() that returns exactly 1) can leave r positive
  // after the last subtraction. Returning kinds[last] blindly would spawn an
  // item the mode disables (its weight is 0), so fall back to the last kind
  // that actually has weight.
  for (let i = kinds.length - 1; i >= 0; i--) {
    if (weights[i] > 0) return kinds[i];
  }
  return kinds[0] ?? "ca";
}

/** The full weight table for inspection (same order as `kinds`). */
export function weightTable(kinds: readonly ItemKind[], opts: WeightOptions): number[] {
  return kinds.map((k) => itemWeight(DEFS[k], opts));
}
