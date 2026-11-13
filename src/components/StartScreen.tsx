import { useState } from "react";
import { MenuBackground } from "./menu/background";
import type { ModeId } from "../game/modes";
import type { ScoreEntry } from "../game/storage";
import { ACHIEVEMENTS } from "../game/achievements";
import type { SavedRun } from "../game/runSave";
import type { GameSettings, SettingLanguage } from "../game/settings";
import {
  GameMenu,
  InfoMenu,
  ModeSelectModal,
  SettingsModal,
  LeaderboardModal,
  AchievementsModal,
  AboutModal,
  ChangelogModal,
  QuitModal,
} from "./menu";
import MenuHero from "./menu/hero/MenuHero";
import HowToPlayModal from "./menu/HowToPlayModal";

type ModalId =
  | "none"
  | "howto"
  | "modes"
  | "settings"
  | "leaderboard"
  | "achievements"
  | "about"
  | "changelog"
  | "quit";

export default function StartScreen({
  scores,
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
  const [modal, setModal] = useState<ModalId>("none");
  const closeModal = () => setModal("none");

  return (
    <div className="absolute inset-0 z-40 overflow-y-auto overscroll-contain" data-reduced-motion={settings.reducedMotion ? "true" : undefined}>
      <MenuBackground />
      <div className="relative flex min-h-full flex-col">
        <main className="flex min-h-[260px] flex-1 items-center justify-center px-4 py-6">
          <MenuHero />
        </main>

      {/* ---- corner panels: GAME bottom-left, INFO bottom-right ---- */}
      <div className="pointer-events-none relative z-30 flex shrink-0 items-end justify-between gap-2 px-2 pb-2 sm:px-3 sm:pb-3">
        <GameMenu
          resume={resume}
          achievementsUnlocked={achievements.length}
          achievementsTotal={ACHIEVEMENTS.length}
          onHowTo={() => setModal("howto")}
          onPlay={onStart}
          onResume={onResume}
          onModes={() => setModal("modes")}
          onLeaderboard={() => setModal("leaderboard")}
          onAchievements={() => setModal("achievements")}
          onSettings={() => setModal("settings")}
        />
        <InfoMenu
          onAbout={() => setModal("about")}
          onChangelog={() => setModal("changelog")}
          onQuit={() => setModal("quit")}
        />
      </div>

      </div>

      {/* ---- modals ---- */}
      {modal === "howto" && <HowToPlayModal onClose={closeModal} />}
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
