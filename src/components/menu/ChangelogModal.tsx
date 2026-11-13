import { useMemo, useState } from "react";
import { APP_VERSION } from "../../version";
import { useI18n } from "../../i18n/useI18n";
import type { MessageKey } from "../../i18n/i18n";
import {
  CHANGELOG_ENTRIES,
  entriesForTier,
  tierCounts,
  tierFor,
  type ReleaseTier,
} from "../../game/changelog";
import { Modal } from "../ui";

/**
 * Tier styling (v1.1.7). Three visual registers, deliberately far apart so a
 * player can tell a patch from a feature wave at a glance:
 *
 *   PATCH  — violet   : small, frequent, low-key
 *   UPDATE — gold     : the workhorse release, brand accent
 *   MAJOR  — pink     : rare, loud, the loudest thing in the list
 */
const TIER_STYLE: Record<
  ReleaseTier,
  { chip: string; rail: string; dot: string; glow: string; labelKey: MessageKey }
> = {
  patch: {
    chip: "border-violet-500/70 bg-violet-500/15 text-violet-400",
    rail: "border-violet-600/60",
    dot: "bg-violet-500",
    glow: "shadow-[0_0_18px_-6px_rgba(157,107,255,0.9)]",
    labelKey: "changelog.tier.patch",
  },
  minor: {
    chip: "border-tumeric-500/70 bg-tumeric-500/15 text-tumeric-400",
    rail: "border-tumeric-600/60",
    dot: "bg-tumeric-500",
    glow: "shadow-[0_0_18px_-6px_rgba(245,168,28,0.9)]",
    labelKey: "changelog.tier.minor",
  },
  major: {
    chip: "border-pink-500/70 bg-pink-500/15 text-pink-400",
    rail: "border-pink-600/60",
    dot: "bg-pink-500",
    glow: "shadow-[0_0_22px_-4px_rgba(255,95,176,0.95)]",
    labelKey: "changelog.tier.major",
  },
};

const FILTERS: readonly (ReleaseTier | null)[] = [null, "major", "minor", "patch"];

/**
 * In-game changelog — newest first, filtered by release tier.
 * Vietnamese bullets are the source of truth; every other locale reads the
 * English mirror (documented trade-off — see docs/guides/adding-a-locale.md).
 */
export default function ChangelogModal({ onClose }: { onClose: () => void }) {
  const { t, lang } = useI18n();
  const vi = lang === "vi";
  const [filter, setFilter] = useState<ReleaseTier | null>(null);

  const counts = useMemo(() => tierCounts(), []);
  const entries = useMemo(() => entriesForTier(filter), [filter]);
  const total = CHANGELOG_ENTRIES.length;

  return (
    <Modal title={t("changelog.title")} onClose={onClose} wide>
      {/* ---- tier filter ---- */}
      <div
        className="mb-3 flex flex-wrap items-center gap-1.5 border-b-2 border-jade-800 pb-2.5"
        role="group"
        aria-label={t("changelog.filterHint")}
      >
        {FILTERS.map((tier) => {
          const active = filter === tier;
          const style = tier ? TIER_STYLE[tier] : null;
          const label = tier ? t(style!.labelKey) : t("changelog.filter.all");
          const count = tier ? counts[tier] : total;
          return (
            <button
              key={tier ?? "all"}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(tier)}
              className={`press flex items-center gap-1.5 border-2 px-2 py-0.5 font-body text-[9px] font-extrabold tracking-[0.16em] uppercase transition-colors ${
                active
                  ? tier
                    ? style!.chip
                    : "border-clay-100/70 bg-clay-100/10 text-clay-100"
                  : "border-jade-800 bg-jade-900/40 text-clay-100/50 hover:border-jade-600 hover:text-clay-100/80"
              }`}
            >
              {tier && <span aria-hidden="true" className={`h-1.5 w-1.5 ${style!.dot}`} />}
              {label}
              <span className="text-[8px] tabular-nums opacity-70">{count}</span>
            </button>
          );
        })}
        <span className="ml-auto font-body text-[9px] font-bold tracking-[0.18em] text-jade-500 uppercase tabular-nums">
          {t("changelog.releases", { n: entries.length })}
        </span>
      </div>

      {/* ---- release list ---- */}
      <ol className="flex flex-col">
        {entries.map((entry) => {
          const tier = tierFor(entry.version);
          const style = TIER_STYLE[tier];
          const isCurrent = entry.version === APP_VERSION;
          const summary = vi ? entry.vi : entry.en;
          const items = vi ? entry.itemsVi : entry.itemsEn;
          return (
            <li
              key={entry.version}
              className={`relative border-l-[3px] py-2.5 pl-4 ${style.rail} ${
                isCurrent ? "bg-tumeric-500/5" : ""
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute top-3.5 -left-[6.5px] h-2.5 w-2.5 rounded-full ${style.dot} ${style.glow}`}
              />

              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <span
                  className={`font-display text-sm ${
                    tier === "major" ? "text-pink-400" : tier === "minor" ? "text-tumeric-400" : "text-clay-100"
                  }`}
                >
                  v{entry.version}
                </span>
                <span
                  className={`border px-1.5 py-0.5 font-body text-[8px] font-extrabold tracking-[0.22em] uppercase ${style.chip}`}
                >
                  {t(style.labelKey)}
                </span>
                <time
                  className="font-body text-[9px] font-bold tracking-[0.18em] text-jade-500 tabular-nums"
                  dateTime={entry.date}
                >
                  {entry.date}
                </time>
                {isCurrent && (
                  <span className="font-body text-[8px] font-extrabold tracking-[0.22em] text-tumeric-400 uppercase">
                    ★ {t("changelog.current")}
                  </span>
                )}
              </div>

              <p className="mt-1.5 font-body text-[10px] leading-snug text-clay-100/85">{summary}</p>
              {items.length > 0 && (
                <ul className="mt-1.5 space-y-1 list-none pl-0">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-1.5 font-body text-[9px] leading-snug text-clay-100/60"
                    >
                      <span aria-hidden="true" className={`mt-[5px] h-1 w-1 shrink-0 ${style.dot}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </Modal>
  );
}
