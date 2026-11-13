/**
 * The nine modes, assembled (v1.1.7).
 *
 * Each balance record lives in its own file under `game/modes/`; this module is
 * the single place that knows their order and their union. `MODES` is the same
 * shape the engine has always consumed, so nothing downstream changed.
 *
 * Adding a mode is four edits, all checked by tests/modes-split.test.ts:
 *   1. `modeTypes.ts` — add the id to the `ModeId` union
 *   2. `modes/<id>.ts` — the balance record (copy a sibling, change the numbers)
 *   3. here — one import, one line in `MODES`, one line in `MODE_LIST`
 *   4. `src/i18n/locales/*` — name/tagline/desc/badge in seven languages
 *
 * The two arrays must stay in lockstep: `MODES` fixes the picker order and
 * `MODE_LIST` is what the picker and the tests iterate.
 */
import type { ModeConfig, ModeId } from "./modeTypes";

import { classic } from "./modes/classic";
import { zen } from "./modes/zen";
import { inferno } from "./modes/inferno";
import { blitz } from "./modes/blitz";
import { goldrush } from "./modes/goldrush";
import { storm } from "./modes/storm";
import { hardcore } from "./modes/hardcore";
import { combo } from "./modes/combo";
import { feast } from "./modes/feast";

export type { ModeConfig, ModeId } from "./modeTypes";

/** All modes, keyed by id. Insertion order is the picker's display order. */
export const MODES: Record<ModeId, ModeConfig> = {
  classic,
  zen,
  inferno,
  blitz,
  goldrush,
  storm,
  hardcore,
  combo,
  feast,
};

/**
 * Picker display order, as records. Same nine, same order as `MODES` — kept as
 * an array because every consumer (the picker, the i18n tests, the balance
 * tests) iterates it.
 */
export const MODE_LIST: readonly ModeConfig[] = [
  classic,
  zen,
  inferno,
  blitz,
  goldrush,
  storm,
  hardcore,
  combo,
  feast,
];

/** Type guard for a stored/URL-supplied mode string. */
export function isModeId(v: unknown): v is ModeId {
  return typeof v === "string" && v in MODES;
}
