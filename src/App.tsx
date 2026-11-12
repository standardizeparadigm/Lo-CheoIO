import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "./i18n/useI18n";
import GameCanvas from "./components/GameCanvas";
import GameOverScreen from "./components/GameOverScreen";
import PauseScreen from "./components/PauseScreen";
import StartScreen from "./components/StartScreen";
import { audio } from "./game/audio";
import { ACHIEVEMENT_MAP, checkAchievements, type AchievementDef } from "./game/achievements";
import type { LoCheoGame, Phase, RunStats } from "./game/engine";
import { isModeId, type ModeId } from "./game/modes";
import type { MessageKey } from "./i18n/i18n";
import {
  bestScore,
  loadAchievements,
  loadScores,
  qualifies,
  rankOf,
  recordRun,
  submitScore,
  unlockAchievements,
  type ScoreEntry,
} from "./game/storage";

const EMPTY: RunStats = { score: 0, catches: 0, bestCombo: 0, level: 1, jars: 0, sliced: 0, time: 0 };

export default function App() {
  const { t, lang } = useI18n();
  const gameRef = useRef<LoCheoGame | null>(null);
  const [phase, setPhase] = useState<Phase>("menu");
  const [scores, setScores] = useState<ScoreEntry[]>(() => loadScores());
  const [run, setRun] = useState<RunStats>(EMPTY);
  const [showOver, setShowOver] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  const [touchMode, setTouchMode] = useState(false);
  const [mode, setMode] = useState<ModeId>(() => {
    try {
      const v = localStorage.getItem("locheo.mode.v1");
      return isModeId(v) ? v : "classic";
    } catch {
      return "classic";
    }
  });
  const [achievements, setAchievements] = useState<string[]>(() => loadAchievements());
  const [newAchievements, setNewAchievements] = useState<AchievementDef[]>([]);
  const modeRef = useRef(mode);
  modeRef.current = mode;

  const best = bestScore(scores);

  /* ---------------------------------------------------- boot listeners */
  useEffect(() => {
    if (window.matchMedia?.("(pointer: coarse)").matches) setTouchMode(true);
    // audio unlock only — a mouse click or keypress must NOT flip touch UI on
    const unlock = () => audio.unlock();
    const coarse = () => setTouchMode(true);
    const onPointer = (e: PointerEvent) => {
      audio.unlock();
      if (e.pointerType === "touch" || e.pointerType === "pen") setTouchMode(true);
    };
    window.addEventListener("touchstart", coarse, { once: true, passive: true });
    window.addEventListener("pointerdown", onPointer, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("touchstart", coarse);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  useEffect(() => {
    audio.setMuted(muted);
  }, [muted]);

  // keep <html lang> honest for screen readers & search engines
  useEffect(() => {
    try {
      document.documentElement.lang = lang;
    } catch {
      /* non-DOM environment */
    }
  }, [lang]);

  // push the mode into the engine and persist it
  useEffect(() => {
    gameRef.current?.setMode(mode);
    try {
      localStorage.setItem("locheo.mode.v1", mode);
    } catch {
      /* storage blocked — session default only */
    }
  }, [mode]);

  const handleModeChange = useCallback((m: ModeId) => setMode(m), []);

  /* ------------------------------------------------------------ actions */
  const onReady = useCallback((g: LoCheoGame) => {
    gameRef.current = g;
    g.setMode(modeRef.current);
  }, []);

  const startRun = useCallback(() => {
    const g = gameRef.current;
    if (!g) return;
    audio.unlock();
    setSavedId(null);
    setNewAchievements([]);
    setRun(EMPTY);
    setShowOver(false);
    g.setMode(modeRef.current);
    g.start();
  }, []);

  const toMenu = useCallback(() => {
    gameRef.current?.toMenu();
    setShowOver(false);
    audio.play("ui");
  }, []);

  const togglePause = useCallback(() => {
    const g = gameRef.current;
    if (!g || (g.phase !== "playing" && g.phase !== "paused")) return;
    g.togglePause();
    setRun({ ...g.stats });
    audio.play("ui");
  }, []);

  const onGameOver = useCallback((s: RunStats) => {
    setRun(s);
    setSavedId(null);
    // fold the run into lifetime progress, then light up any new badges
    const progress = recordRun(s);
    const known = loadAchievements();
    const freshIds = checkAchievements({ ...s, mode: modeRef.current }, progress, known);
    if (freshIds.length > 0) {
      setAchievements(unlockAchievements(freshIds));
      setNewAchievements(
        freshIds
          .map((id) => ACHIEVEMENT_MAP.get(id))
          .filter((d): d is AchievementDef => Boolean(d)),
      );
      audio.play("full");
    } else {
      setAchievements(known);
      setNewAchievements([]);
    }
    setShowOver(true);
  }, []);

  const onStartKey = useCallback(() => {
    const g = gameRef.current;
    if (!g) return;
    if (g.phase === "menu" || g.phase === "gameover") startRun();
  }, [startRun]);

  const onRestartKey = useCallback(() => {
    const g = gameRef.current;
    if (!g || g.phase === "menu") return;
    startRun();
  }, [startRun]);

  const onMuteKey = useCallback(() => setMuted((m) => !m), []);

  const saveScore = useCallback(
    (name: string) => {
      const { list, id } = submitScore({
        name,
        score: run.score,
        level: run.level,
        jars: run.jars,
        combo: run.bestCombo,
        date: Date.now(),
      });
      setScores(list);
      setSavedId(id);
      audio.play("level");
    },
    [run],
  );

  const isHigh = qualifies(run.score, scores);
  const rank = rankOf(run.score, scores);

  /* ---------------------------------------------------------------- view */
  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-jade-950 font-body select-none">
      <GameCanvas
        best={best}
        touchMode={touchMode}
        controlsLive={phase === "playing"}
        onReady={onReady}
        onPhase={setPhase}
        onGameOver={onGameOver}
        onPauseKey={togglePause}
        onRestartKey={onRestartKey}
        onStartKey={onStartKey}
        onMuteKey={onMuteKey}
      />

      {/* ambient overlays */}
      <div className="scanlines pointer-events-none absolute inset-0 z-10 opacity-45" />
      <div className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_140px_rgba(6,26,26,0.9)]" />
      <div className="pointer-events-none absolute inset-2 z-10 hidden border-2 border-jade-700/35 sm:block" />
      <div className="pointer-events-none absolute inset-2 z-10 hidden sm:block">
        {[
          "top-0 left-0 border-t-4 border-l-4",
          "top-0 right-0 border-t-4 border-r-4",
          "bottom-0 left-0 border-b-4 border-l-4",
          "bottom-0 right-0 border-b-4 border-r-4",
        ].map((c) => (
          <span key={c} className={`absolute h-6 w-6 border-tumeric-500/70 ${c}`} />
        ))}
      </div>

      {/* in-run chrome */}
      {(phase === "playing" || phase === "paused") && (
        <div className="absolute top-3 right-3 z-30 flex gap-2">
          <button
            type="button"
            onClick={togglePause}
            aria-label={phase === "paused" ? t("app.pause.ariaOff") : t("app.pause.ariaOn")}
            className="press flex h-10 w-10 items-center justify-center border-[3px] border-jade-700 bg-jade-950/85 text-tumeric-400 hard-shadow-sm"
          >
            {phase === "paused" ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M7 4.5v15l13-7.5z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <rect x="5" y="4" width="4.5" height="16" rx="1" />
                <rect x="14.5" y="4" width="4.5" height="16" rx="1" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={onMuteKey}
            aria-label={muted ? t("mute.turnOn") : t("mute.turnOff")}
            className="press flex h-10 w-10 items-center justify-center border-[3px] border-jade-700 bg-jade-950/85 text-brine-300 hard-shadow-sm"
          >
            {muted ? (
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
                <path d="M17 9l4 6M21 9l-4 6" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
                <path d="M17 8.5a5 5 0 010 7" />
              </svg>
            )}
          </button>
        </div>
      )}

      {phase === "playing" && (
        <div className="pointer-events-none absolute bottom-3 left-4 z-20 hidden lg:block">
          <span className="font-display text-[11px] tracking-[0.22em] text-jade-500/80">{t("app.wordmark")}</span>
          <span className="ml-2 font-body text-[10px] tracking-[0.14em] text-jade-700">
            {t("app.hint", { mode: t(`mode.${mode}.name` as MessageKey) })}
          </span>
        </div>
      )}

      {/* screens */}
      {phase === "menu" && (
        <StartScreen
          scores={scores}
          best={best}
          touchMode={touchMode}
          achievements={achievements}
          mode={mode}
          onModeChange={handleModeChange}
          onStart={startRun}
        />
      )}
      {phase === "paused" && (
        <PauseScreen
          stats={run}
          muted={muted}
          mode={mode}
          onResume={togglePause}
          onRestart={startRun}
          onMenu={toMenu}
          onToggleMute={onMuteKey}
        />
      )}
      {phase === "gameover" && showOver && (
        <GameOverScreen
          stats={run}
          scores={scores}
          best={best}
          isHigh={isHigh}
          rank={rank}
          savedId={savedId}
          mode={mode}
          newAchievements={newAchievements}
          onSave={saveScore}
          onRestart={startRun}
          onMenu={toMenu}
        />
      )}

    </div>
  );
}
