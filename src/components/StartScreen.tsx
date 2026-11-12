import { useState } from "react";
import { APP_VERSION } from "../version";
import { fmtNum } from "../i18n/i18n";
import { useI18n } from "../i18n/useI18n";
import type { MessageKey } from "../i18n/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import type { ModeId } from "../game/modes";
import type { ScoreEntry } from "../game/storage";
import { ACHIEVEMENTS } from "../game/achievements";
import AchievementsPanel from "./AchievementsPanel";
import ModeSelector from "./ModeSelector";
import { GameButton, JarLogo, Keycap, Panel, ScoreBoard } from "./ui";

const TICKER_KEYS = [
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

const RULE_IDS = ["0", "1", "2", "3", "4", "5"] as const;

export default function StartScreen({
  scores,
  best,
  touchMode,
  achievements,
  mode,
  onModeChange,
  onStart,
}: {
  scores: ScoreEntry[];
  best: number;
  touchMode: boolean;
  achievements: string[];
  mode: ModeId;
  onModeChange: (m: ModeId) => void;
  onStart: () => void;
}) {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [achOpen, setAchOpen] = useState(false);

  return (
    <div className="absolute inset-0 z-40 flex flex-col overflow-hidden">
      {/* ------- ambient background layers ------- */}
      <div className="absolute right-3 top-3 z-50 sm:right-5 sm:top-4">
        <LanguageSwitcher compact={false} />
      </div>
      <div className="pointer-events-none absolute inset-0 aurora-bg" />
      <div className="pointer-events-none absolute inset-0 tile-floor tile-floor-mask opacity-45" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_85%_at_20%_8%,rgba(6,26,26,0.42)_0%,rgba(6,26,26,0.88)_62%,#061a1a_100%)]" />

      <div className="relative flex-1 overflow-y-auto overscroll-contain">
        <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center px-4 pt-14 pb-6 sm:px-8 sm:pt-16">
          <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-8">
            {/* ---- title lockup ---- */}
            <div className="anim-slide lg:col-span-7">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1.5 border border-chili-500/50 bg-chili-500/10 px-2 py-0.5">
                  <span className="anim-flicker h-2 w-2 rounded-full bg-chili-500" />
                  <span className="font-body text-[9px] font-extrabold tracking-[0.4em] text-chili-400 uppercase">
                    {t("live.badge")}
                  </span>
                </span>
                <span className="font-body text-[9px] font-bold tracking-[0.3em] text-jade-500 uppercase">
                  {t("menu.arcade")} · v{APP_VERSION}
                </span>
              </div>

              <h1 className="font-display leading-[0.8] select-none">
                <span
                  className="block text-[clamp(3.2rem,11.5vw,7rem)] text-clay-100"
                  style={{ textShadow: "6px 6px 0 #b81f22, 12px 12px 0 rgba(6,26,26,0.55)" }}
                >
                  LỌ
                </span>
                <span className="text-shimmer -mt-1 block pl-[0.08em] text-[clamp(4.2rem,15.5vw,10rem)]">
                  CHÉO
                </span>
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="inline-block -rotate-2 border-[3px] border-jade-950 bg-chili-500 px-3 py-1 font-display text-[11px] tracking-[0.2em] text-clay-100 hard-shadow-sm sm:text-xs">
                  {t("brand.badge")}
                </span>
                <span className="font-body text-xs font-semibold tracking-wide text-brine-300">
                  {t("menu.best")}{" "}
                  <b className="font-display text-sm text-tumeric-400">{fmtNum(best, lang)}</b>
                </span>
              </div>

              <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-clay-100/80 sm:text-[15px]">
                {t("menu.desc1")}<b className="text-brine-300">{t("menu.descStrong")}</b>{t("menu.desc2")}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <div className="relative inline-flex">
                  <GameButton size="lg" onClick={onStart} className="anim-cta sheen relative overflow-hidden">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                      <path d="M7 4.5v15l13-7.5z" />
                    </svg>
                    {t("menu.cta")}
                  </GameButton>
                </div>
                <GameButton size="lg" variant="ghost" onClick={() => setOpen((v) => !v)}>
                  {open ? t("menu.howtoClose") : t("menu.howtoOpen")}
                </GameButton>
                <GameButton size="lg" variant="ink" onClick={() => setAchOpen((v) => !v)} aria-expanded={achOpen}>
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 01-10 0V4z" />
                    <path d="M7 6H4a1 1 0 00-1 1c0 2.2 1.3 4 4 4M17 6h3a1 1 0 011 1c0 2.2-1.3 4-4 4" />
                  </svg>
                  {t("menu.achievements")}
                  <span className="font-display text-[10px] text-tumeric-400 tabular-nums">{achievements.length}/{ACHIEVEMENTS.length}</span>
                </GameButton>
                <span className="hidden items-center gap-2 font-body text-[11px] tracking-wider text-jade-500 sm:flex">
                  {t("menu.orPress")} <Keycap wide>ENTER</Keycap>
                </span>
              </div>

              {/* ---- mode selector ---- */}
              <div className="mt-4 max-w-xl">
                <ModeSelector mode={mode} onChange={onModeChange} />
              </div>

              {touchMode ? (
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t-2 border-dashed border-jade-800 pt-3 font-body text-[11px] font-bold tracking-wider text-clay-100/70">
                  <span className="flex items-center gap-2">
                    <span className="inline-block h-6 w-6 rounded-full border-2 border-tumeric-500 bg-tumeric-500/20" />
                    {t("touch.drag")}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="inline-block font-display text-tumeric-400">⤢</span>
                    {t("touch.diagonal")}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="inline-block h-6 w-6 rounded-full border-2 border-chili-500 bg-chili-500/30" />
                    {t("touch.slam")}
                  </span>
                </div>
              ) : (
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t-2 border-dashed border-jade-800 pt-3">
                  <span className="flex items-center gap-1.5 font-body text-[11px] font-bold tracking-wider text-clay-100/70">
                    {t("keys.move")} <Keycap>W</Keycap>
                    <Keycap>A</Keycap>
                    <Keycap>S</Keycap>
                    <Keycap>D</Keycap> / <Keycap wide>↑ ← ↓ →</Keycap>
                  </span>
                  <span className="flex items-center gap-1.5 font-body text-[11px] font-bold tracking-wider text-clay-100/70">
                    {t("keys.slam")} <Keycap wide>SPACE</Keycap>
                  </span>
                  <span className="flex items-center gap-1.5 font-body text-[11px] font-bold tracking-wider text-clay-100/70">
                    {t("keys.pause")} <Keycap>P</Keycap>
                  </span>
                </div>
              )}

              {open && (
                <Panel className="anim-pop mt-4 p-4">
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {RULE_IDS.map((n, i) => (
                      <li key={n} className="flex gap-3">
                        <span className="font-display text-lg leading-none text-tumeric-500">0{i + 1}</span>
                        <span>
                          <span className="block font-display text-[11px] tracking-[0.12em] text-brine-300">{t(`rule.${n}.t` as MessageKey)}</span>
                          <span className="block font-body text-xs leading-relaxed text-clay-100/70">{t(`rule.${n}.d` as MessageKey)}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </Panel>
              )}

              {achOpen && (
                <Panel className="anim-pop mt-4 p-3">
                  <AchievementsPanel unlocked={achievements} />
                </Panel>
              )}
            </div>

            {/* ---- board + mascot ---- */}
            <div className="anim-pop lg:col-span-5">
              <div className="relative mx-auto max-w-sm pt-14 lg:max-w-none">
                {/* rotating halo behind the mascot */}
                <div
                  aria-hidden="true"
                  className="anim-spin-slow pointer-events-none absolute -top-2 -left-6 -z-0 h-28 w-28 sm:h-36 sm:w-36"
                >
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(245,168,28,0.35)" strokeWidth="1.6" strokeDasharray="3 9" />
                  </svg>
                </div>
                <JarLogo className="anim-bob anim-breathe absolute -top-14 -left-4 h-24 w-auto drop-shadow-[0_10px_18px_rgba(0,0,0,0.5)] sm:-top-16 sm:left-[-1.5rem] sm:h-28" />
                <div className="gradient-border p-0.5 hard-shadow">
                  <div className="panel-grad">
                    <ScoreBoard entries={scores} rows={8} />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-[3px] border-jade-800 bg-jade-900/70 px-3 py-2">
                  <span className="font-body text-[10px] font-extrabold tracking-[0.2em] text-jade-500 uppercase">
                    {t("panel.local")}
                  </span>
                  <span className="flex items-center gap-1.5 font-display text-[11px] text-tumeric-400">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                      <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
                    </svg>
                    TOP 8
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ingredient ticker */}
      <div className="pointer-events-none relative shrink-0 overflow-hidden border-t-[3px] border-jade-800 bg-jade-950/90 py-2">
        <div className="anim-marquee flex w-max gap-8">
          {[...TICKER_KEYS, ...TICKER_KEYS].map((key, i) => (
            <span
              key={i}
              className={`font-display text-[11px] tracking-[0.18em] ${
                i % 3 === 0 ? "text-tumeric-400" : i % 3 === 1 ? "text-brine-300" : "text-chili-400"
              }`}
            >
              {t(key)} <span className="text-jade-700">◆</span>
            </span>
          ))}
        </div>
        <div className="divider-gold mt-2" />
        <div className="flex items-center justify-center gap-3 pt-1.5 font-body text-[8px] font-bold tracking-[0.28em] text-jade-700 uppercase">
          <span>v{APP_VERSION}</span>
          <span aria-hidden="true">·</span>
          <span>AGPL-3.0</span>
          <span aria-hidden="true">·</span>
          <span>Standardize Paradigm</span>
          <span aria-hidden="true">·</span>
          <span className="hidden sm:inline">{t("footer.offline")}</span>
        </div>
      </div>
    </div>
  );
}
