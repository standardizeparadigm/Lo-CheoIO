/**
 * The ingredient ticker copy (v1.1.8), split out of `StartScreen.tsx`.
 *
 * Fourteen strings, one per ingredient. The ticker renders the list twice to
 * make the marquee loop seamless, so the list is stored once here and the
 * doubling lives in the component where the reader can see why.
 */
import type { MessageKey } from "../../../i18n/i18n";

/** Ticker lines, in display order. Length is asserted by the layout test. */
export const TICKER_KEYS = [
  "ticker.0",
  "ticker.1",
  "ticker.2",
  "ticker.3",
  "ticker.4",
  "ticker.5",
  "ticker.6",
  "ticker.7",
  "ticker.8",
  "ticker.9",
  "ticker.10",
  "ticker.11",
  "ticker.12",
  "ticker.13",
] as const satisfies readonly MessageKey[];

/** Number of distinct lines — the loop duplicates the array, so this is half. */
export const TICKER_LINE_COUNT = TICKER_KEYS.length;

/**
 * Colour rotation. Three classes cycling over the list, so adjacent lines
 * never share a colour even when the list wraps.
 */
export const TICKER_TONES = ["text-tumeric-400", "text-brine-300", "text-chili-400"] as const;

/** Tone for a line index — pure, so the rotation is testable. */
export function tickerTone(index: number): string {
  return TICKER_TONES[index % TICKER_TONES.length];
}
