import { useEffect, useState } from "react";
import { APP_VERSION } from "../version";
import { MenuBackground } from "./menu/background";
import { MenuChrome } from "./menu";
import { planMenuLayout } from "./menu/layout";
import { fmtNum } from "../i18n/i18n";
import { useI18n } from "../i18n/useI18n";
import type { MessageKey } from "../i18n/i18n";
import type { ModeId } from "../game/modes";
import { MODES } from "../game/modes";
import type { ScoreEntry } from "../game/storage";
import type { SavedRun } from "../game/runSave";
import type { GameSettings, SettingLanguage } from "../game/settings";
import {
  ModeSelectModal,
  SettingsModal,
  LeaderboardModal,
  AchievementsModal,
  AboutModal,
  ChangelogModal,
  QuitModal,
} from "./menu";
import { GameButton, JarLogo, Keycap, Panel } from "./ui";

const RULE_IDS = ["0", "1", "2", "3", "4", "5"] as const;

type ModalId =
  | "none"
  | "modes"
  | "settings"
  | "leaderboard"
  | "achievements"
  | "about"
  | "changelog"
  | "quit";

export default function StartScreen({
  scores,
  best,
  touchMode,
  achievements,
  mode,
  onModeChange,
  onStart,
  resume,
  onResume,
  settings,
  onPatchSettings,
  onChangeLanguage,
  onQuickSettings,
  onResetDefaults,
  onClearAllData,
}: {
  scores: ScoreEntry[];
  best: number;
  touchMode: boolean;
  achievements: string[];
  mode: ModeId;
  onModeChange: (m: ModeId) => void;
  onStart: () => void;
  resume: SavedRun | null;
  onResume: () => void;
  settings: GameSettings;
  onPatchSettings: (patch: Partial<GameSettings>) => void;
  onChangeLanguage: (lang: SettingLanguage) => void;
  onQuickSettings: (patch: Partial<GameSettings>) => void;
  onResetDefaults: () => void;
  onClearAllData: () => void;
}) {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<ModalId>("none");
  const closeModal = () => setModal("none");

  /**
   * v1.1.8 — the screen now asks the layout module how to lay itself out.
   *
   * Before this, the corner row and the ticker were `shrink-0` children of the
   * same flex column as the scene. At 1280×720 they took 415px and 55px, the
   * scene got 250px, and the CHÉO wordmark and the mascot jar were cut by a
   * seam at y≈247px. Nothing owned the sum, so nothing could notice.
   *
   * `planMenuLayout` owns it now: it returns the reserve, the row density and
   * the corner arrangement, the scene pads itself by `plan.reserve`, and the
   * chrome floats over that band instead of occupying it.
   */
  const [viewport, setViewport] = useState(() => ({
    width: typeof window === "undefined" ? 1280 : window.innerWidth,
    height: typeof window === "undefined" ? 720 : window.innerHeight,
  }));
  useEffect(() => {
    const onResize = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);
  const plan = planMenuLayout(viewport);

  return (
    <div className="absolute inset-0 z-40 flex flex-col overflow-hidden">
      {/* ------- ambient background layers (see background/layers.ts) ------- */}
      <MenuBackground />

      {/* The scene owns the whole viewport. It reserves the bottom band
          (plan.reserve) so nothing the player reads hides under the floating
          chrome — this padding is the entire v1.1.8 fix in one line. */}
      <div
        className="menu-scene relative flex-1 overflow-y-auto overscroll-contain"
        style={{ paddingBottom: plan.reserve }}
        data-reserve={plan.reserve}
      >
        <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center px-4 pt-12 sm:px-8">
          <div className="grid items-center gap-5 lg:grid-cols-12 lg:gap-10">
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

              {/* v1.1.8: the CHÉO line used to be sized purely by viewport
                  width — on a wide-but-short window it became taller than the
                  space left in the scene and the glyphs were sliced by the
                  scroll edge. `menu-lockup` caps it against viewport *height*
                  as well, so the lockup always ends above the reserve band. */}
              <h1 className="menu-lockup font-display leading-[0.8] select-none">
                <span
                  className="menu-wordmark-top block text-clay-100"
                  style={{ textShadow: "6px 6px 0 #b81f22, 12px 12px 0 rgba(6,26,26,0.55)" }}
                >
                  LỌ
                </span>
                <span className="menu-wordmark text-shimmer block pl-[0.08em]">CHÉO</span>
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="inline-block -rotate-2 border-[3px] border-jade-950 bg-chili-500 px-3 py-1 font-display text-[11px] tracking-[0.2em] text-clay-100 hard-shadow-sm sm:text-xs">
                  {t("brand.badge")}
                </span>
                <span className="font-body text-xs font-semibold tracking-wide text-brine-300">
                  {t("menu.best")}{" "}
                  <b className="font-display text-sm text-tumeric-400 tabular-nums">{fmtNum(best, lang)}</b>
                </span>
              </div>

              <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-clay-100/80 sm:text-[15px]">
                {t("menu.desc1")}<b className="text-brine-300">{t("menu.descStrong")}</b>
                {t("menu.desc2")}
              </p>

              <div className="menu-lockup-tail mt-5 flex flex-wrap items-center gap-3">
                <GameButton size="md" variant="ghost" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
                  {open ? t("menu.howtoClose") : t("menu.howtoOpen")}
                </GameButton>
                <span className="hidden items-center gap-2 font-body text-[11px] tracking-wider text-jade-500 sm:flex">
                  {t("menu.orPress")} <Keycap wide>ENTER</Keycap>
                </span>
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
            </div>

            {/* ---- mascot + current-mode card ---- */}
            <div className="anim-pop relative hidden items-center justify-center lg:col-span-5 lg:flex">
              <div
                aria-hidden="true"
                className="anim-spin-slow pointer-events-none absolute top-2 left-6 h-56 w-56 xl:h-72 xl:w-72"
              >
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(245,168,28,0.3)" strokeWidth="1.4" strokeDasharray="3 9" />
                  <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(182,224,122,0.22)" strokeWidth="1" strokeDasharray="1 6" />
                </svg>
              </div>
              <div className="relative flex flex-col items-center">
                <span aria-hidden="true" className="glow-ring pointer-events-none absolute top-[52%] left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 sm:h-64 sm:w-64 xl:h-80 xl:w-80" />
                <JarLogo className="anim-bob anim-breathe jar-glow relative h-44 w-auto xl:h-56" mood="happy" />
                <button
                  type="button"
                  onClick={() => setModal("modes")}
                  title={t("game.modes")}
                  className="press hard-shadow-sm group mt-5 flex items-center gap-3 border-[3px] border-jade-700 bg-jade-950/85 px-4 py-2 transition-colors hover:border-tumeric-500"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-tumeric-500 transition-transform group-hover:scale-125" aria-hidden="true" />
                  <span className="font-body text-[9px] font-extrabold tracking-[0.25em] text-jade-500 uppercase">
                    {t("game.modes")}
                  </span>
                  <span className="font-display text-[13px] tracking-[0.08em] text-tumeric-400">
                    {t(`mode.${mode}.name` as MessageKey)}
                  </span>
                  <span className="font-body text-[9px] font-bold text-brine-400">{MODES[mode].badge}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---- floating chrome: corner panels + ticker (v1.1.8) ----
          Out of the flex column on purpose. As `shrink-0` siblings this row
          was 415px tall and the ticker 55px, leaving the scene 250px of a
          720px window and slicing the wordmark and the mascot in half. */}
      <MenuChrome
        plan={plan}
        resume={resume}
        achievementsUnlocked={achievements.length}
        onPlay={onStart}
        onResume={onResume}
        onModes={() => setModal("modes")}
        onLeaderboard={() => setModal("leaderboard")}
        onAchievements={() => setModal("achievements")}
        onSettings={() => setModal("settings")}
        onAbout={() => setModal("about")}
        onChangelog={() => setModal("changelog")}
        onQuit={() => setModal("quit")}
      />

      {/* ---- modals ---- */}
      {modal === "modes" && <ModeSelectModal mode={mode} onChange={onModeChange} onClose={closeModal} />}
      {modal === "settings" && (
        <SettingsModal
          settings={settings}
          onPatch={onPatchSettings}
          onChangeLanguage={onChangeLanguage}
          onQuickSettings={onQuickSettings}
          onResetDefaults={onResetDefaults}
          onClearAllData={onClearAllData}
          onClose={closeModal}
        />
      )}
      {modal === "leaderboard" && <LeaderboardModal scores={scores} onClose={closeModal} />}
      {modal === "achievements" && <AchievementsModal unlocked={achievements} onClose={closeModal} />}
      {modal === "about" && <AboutModal onClose={closeModal} />}
      {modal === "changelog" && <ChangelogModal onClose={closeModal} />}
      {modal === "quit" && <QuitModal onBack={closeModal} />}
    </div>
  );
}
