/**
 * Mode balance math — all pure, all unit-tested.
 *
 * Split out of `game/modes.ts` in v1.1.7: the nine data records live in
 * `game/modes/`, the derived formulas live here.
 *
 * The engine composes these into the numbers it actually uses:
 *
 *   score         = round(def.pts × multiplierForCombo(combo, frenzy) × scoreMult)
 *   level         = levelForCatches(catches)        // 1 per 10 catches, from 1
 *   jar bonus     = jarBonusFor(level, mode)
 *   combo window  = comboWindowFor(mode)            // COMBO_WINDOW × comboWindowMult
 *   cracks to die = MODES[mode].maxCracks ?? MAX_CRACKS
 *
 * Every one of them clamps its input, so a corrupted save or a NaN from the
 * HUD cannot propagate into the score. `docs/design/modes-balance.md` carries
 * the full derivation; `tests/modes.test.ts` pins the edge cases.
 */
import { MODES, type ModeId } from "./modesIndex";

/**
 * Coerce a possibly-corrupt number into a usable non-negative integer.
 *
 * THE CLAIM THIS FILE USED TO MAKE, AND DID NOT KEEP
 * -------------------------------------------------
 * The header says "every one of them clamps its input, so a corrupted save or a
 * NaN from the HUD cannot propagate into the score". It clamped the *floor*
 * with `Math.max(0, x)` — and `Math.max(0, NaN)` is `NaN`. So a NaN did
 * propagate, straight into `state.score`, where it renders as the literal text
 * "NaN" in the HUD and can never be recovered from: every later addition is
 * still NaN.
 *
 * `Infinity` was worse than NaN in one direction: `jarBonus(Infinity)` is
 * `Infinity`, so a corrupted level makes the *next* jar bonus infinite and the
 * score becomes unwinnable-but-unloseable. Only a reload fixes it.
 *
 * The order matters: `Number.isFinite` first, because `Math.floor(Infinity)` is
 * `Infinity`, not a large number.
 */
function saneInt(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.floor(n));
}

/** Combo multiplier: +1 per 4-catch streak, capped at ×9, doubled in frenzy. */
export function multiplierForCombo(combo: number, frenzy: boolean): number {
  const base = Math.min(9, 1 + Math.floor(saneInt(combo) / 4));
  return base * (frenzy ? 2 : 1);
}

/** Level curve: one level per 10 catches, starting at level 1. */
export function levelForCatches(catches: number): number {
  return 1 + Math.floor(saneInt(catches) / 10);
}

/** Bonus granted when a jar is filled, scaled by current level. */
export function jarBonus(level: number): number {
  /*
   * The floor is 1, not 0 — a jar filled at level 0 (never reachable, since
   * `levelForCatches` starts at 1) still pays the base bonus rather than
   * paying nothing.
   */
  return 200 + Math.max(1, saneInt(level)) * 50;
}

/** Seconds a combo survives without a fresh catch. */
export const COMBO_WINDOW = 2.7;

/** Max cracks before the jar breaks. */
export const MAX_CRACKS = 3;

/** Effective combo window for a mode (COMBO_WINDOW × the mode's comboWindowMult). */
export function comboWindowFor(mode: { comboWindowMult?: number } | ModeId): number {
  const mult =
    typeof mode === "string" ? MODES[mode].comboWindowMult ?? 1 : mode.comboWindowMult ?? 1;
  return COMBO_WINDOW * mult;
}

/** Effective jar bonus for a mode (jarBonus × the mode's jarBonusMult). */
export function jarBonusFor(level: number, mode: { jarBonusMult?: number } | ModeId): number {
  const mult =
    typeof mode === "string" ? MODES[mode].jarBonusMult ?? 1 : mode.jarBonusMult ?? 1;
  return Math.round(jarBonus(level) * mult);
}
