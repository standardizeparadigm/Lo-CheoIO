/**
 * The deck — what fills the band under the tagline now that the counters are
 * gone.
 *
 * The report's round-2 note said the area under the menu was empty; round 3
 * says the three-number strip that filled it should go ("bỏ luôn chỗ chữ ở
 * hình 2"). Both are right: the strip *did* fill the band, but it filled it
 * with numbers the tagline already states. The deck fills the same band with
 * three things the menu does not say anywhere else:
 *
 *   LEFT    the mode you are about to play, with its one-line description
 *   MIDDLE  today's challenge — a mode and a target score, derived from the
 *           date so it is the same all day and different tomorrow
 *   RIGHT   one how-to rule, rotating daily, tapping through to the modal
 *
 * Everything here is *derived*: the challenge from `daily.ts`, the tip from
 * `tip.ts`, the mode name from i18n. Nothing is a hardcoded string, so a
 * ninth mode or a rewritten rule cannot leave the deck lying.
 *
 * Width: the band needs ~640px to lay out as three columns; below that the
 * middle column is dropped and the remaining two share the row. Below 480px
 * the whole deck is hidden — on a phone in portrait the hero needs every
 * pixel of height, and the mode is already printed on the button under the
 * mascot.
 */
import { useMemo } from "react";
import { useI18n } from "../../../i18n/useI18n";
import type { MessageKey } from "../../../i18n/i18n";
import { MODE_LIST } from "../../../game/modes";
import type { ModeId } from "../../../game/modes";
import { challengeFor, isToday } from "./daily";
import { tipIndexFor } from "./tip";
import { DECK_MIN_WIDTH } from "./width";

const MODE_IDS = MODE_LIST.map((m) => m.id);

/** Three-column deck: current mode · today's challenge · rule of the day. */
export function MenuDeck({
  mode,
  onModes,
  onHowTo,
  viewportWidth,
  now,
}: {
  /** The mode the player has selected. */
  mode: ModeId;
  /** Open the mode picker. */
  onModes: () => void;
  /** Open the how-to modal. */
  onHowTo: () => void;
  /** Current viewport width, px — from `useViewportWidth()`. */
  viewportWidth: number;
  /** Injectable clock, so tests can pin a day. Defaults to now. */
  now?: Date;
}) {
  const { t, lang } = useI18n();

  /*
   * One `Date` per mount unless the caller pins one. Building it inside the
   * memo and not on every render matters: `challengeFor` is cheap, but a new
   * Date every frame would also re-run the tip selector, and the two are
   * stable within a day anyway.
   */
  const today = useMemo(() => now ?? new Date(), [now]);
  const challenge = useMemo(() => challengeFor(today, MODE_IDS), [today]);
  const tipIndex = useMemo(() => tipIndexFor(challenge.day), [challenge.day]);

  const wide = viewportWidth >= DECK_MIN_WIDTH;

  return (
    <div data-deck="menu" className="deck mt-6 hidden w-full max-w-3xl sm:grid">
      {/* ---- current mode ---- */}
      <button
        type="button"
        data-deck-cell="mode"
        onClick={onModes}
        title={t("game.modesHint")}
        className="deck-cell deck-cell--button"
      >
        <span className="deck-cap">{t("menu.game")}</span>
        <span className="deck-line">
          <span className="deck-dot" aria-hidden="true" />
          <span className="deck-value">{t(`mode.${mode}.name` as MessageKey)}</span>
        </span>
        <span className="deck-note">{t(`mode.${mode}.desc` as MessageKey)}</span>
      </button>

      {/* ---- today's challenge (middle column, wide only) ---- */}
      {wide && (
        <div data-deck-cell="daily" className="deck-cell">
          <span className="deck-cap">{t("deck.daily")}</span>
          <span className="deck-line">
            <span className="deck-value deck-value--gold">{fmtTarget(challenge.target, lang)}</span>
          </span>
          <span className="deck-note">
            {t(`mode.${challenge.mode}.name` as MessageKey)}
            {isToday(challenge.day, today) ? "" : " ·"}
          </span>
        </div>
      )}

      {/* ---- rule of the day ---- */}
      <button
        type="button"
        data-deck-cell="tip"
        onClick={onHowTo}
        title={t("menu.howtoOpen")}
        className="deck-cell deck-cell--button"
      >
        <span className="deck-cap">{t("deck.tip")}</span>
        <span className="deck-line">
          <span className="deck-value deck-value--brine">{t(`rule.${tipIndex}.t` as MessageKey)}</span>
        </span>
        <span className="deck-note">{t(`rule.${tipIndex}.d` as MessageKey)}</span>
      </button>
    </div>
  );
}

/** Group the digits so a target score reads as a score, not as a year. */
function fmtTarget(n: number, lang: string): string {
  try {
    return new Intl.NumberFormat(lang).format(n);
  } catch {
    return String(n);
  }
}
