import { APP_VERSION } from "../../../version";
import { useI18n } from "../../../i18n/useI18n";
import { TICKER_KEYS, tickerTone } from "./keys";

/**
 * The bottom ticker band (v1.1.8).
 *
 * ## What it fixes
 *
 * In v1.1.7 this markup lived at the end of `StartScreen` and ran two rows: a
 * marquee, then a centred line with `v1.1.7 · AGPL-3.0 · Standardize Paradigm ·
 * 100% offline`. The band had `py-1.5` and no height, so it grew to 55px, the
 * flex column overflowed by 12px, and the copyright line was sliced in half by
 * the bottom of the window.
 *
 * Now the band is a fixed-height strip (`--menu-ticker-h`, 48px) with a hard
 * clip, and the two rows share that height instead of adding to it. The meta
 * line is **inline with the marquee row** on wide screens and drops entirely
 * below 640px — it is a copyright, not information a player needs at 375px.
 *
 * The band is `aria-hidden` only for the marquee half; the meta line carries
 * the version, which assistive tech should still be able to read.
 */
export default function MenuTicker() {
  const { t } = useI18n();

  return (
    <div className="menu-ticker relative shrink-0 border-t-[3px] border-jade-800 bg-jade-950/92">
      <div className="flex h-full items-center">
        {/* marquee half — decorative, duplicated for a seamless loop */}
        <div className="relative flex-1 overflow-hidden" aria-hidden="true">
          <div className="anim-marquee flex w-max gap-8 will-change-transform">
            {[...TICKER_KEYS, ...TICKER_KEYS].map((key, i) => (
              <span
                key={`${key}-${i}`}
                className={`font-display text-[11px] tracking-[0.18em] ${tickerTone(i)}`}
              >
                {t(key)} <span className="text-jade-700">◆</span>
              </span>
            ))}
          </div>
        </div>

        {/* meta half — real text, so it stays in the accessibility tree */}
        <div className="hidden shrink-0 items-center gap-2 px-3 font-body text-[8px] font-bold tracking-[0.24em] text-jade-700 uppercase sm:flex">
          <span>v{APP_VERSION}</span>
          <span aria-hidden="true">·</span>
          <span>AGPL-3.0</span>
          <span aria-hidden="true">·</span>
          <span className="hidden md:inline">Standardize Paradigm</span>
          <span aria-hidden="true" className="hidden md:inline">·</span>
          <span className="hidden lg:inline">{t("footer.offline")}</span>
        </div>
      </div>
    </div>
  );
}
