/**
 * Mode balance math (pure, unit-tested).
 *
 * Split out of `game/modes.ts` in v1.1.7 — the nine data records live in
 * `game/modes/`, the derived formulas live here.
 */
import { MODES, type ModeId } from "./modesIndex";
/** Combo multiplier: +1 per 4-catch streak, capped at ×9, doubled in frenzy. */
export function multiplierForCombo(combo: number, frenzy: boolean): number {
  const base = Math.min(9, 1 + Math.floor(Math.max(0, combo) / 4));
  return base * (frenzy ? 2 : 1);
}

/** Level curve: one level per 10 catches, starting at level 1. */
export function levelForCatches(catches: number): number {
  return 1 + Math.floor(Math.max(0, catches) / 10);
}

/** Bonus granted when a jar is filled, scaled by current level. */
export function jarBonus(level: number): number {
  return 200 + Math.max(1, level) * 50;
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
