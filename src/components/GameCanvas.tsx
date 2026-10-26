import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { LoCheoGame, type Phase, type RunStats } from "../game/engine";

interface Props {
  best: number;
  touchMode: boolean;
  controlsLive: boolean;
  onReady: (g: LoCheoGame) => void;
  onPhase: (p: Phase) => void;
  onGameOver: (s: RunStats) => void;
  onPauseKey: () => void;
  onRestartKey: () => void;
  onStartKey: () => void;
  onMuteKey: () => void;
}

const R = 58;

export default function GameCanvas({
  best,
  touchMode,
  controlsLive,
  onReady,
  onPhase,
  onGameOver,
  onPauseKey,
  onRestartKey,
  onStartKey,
  onMuteKey,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<LoCheoGame | null>(null);
  const cb = useRef({ onPhase, onGameOver, onPauseKey, onRestartKey, onStartKey, onMuteKey });
  cb.current = { onPhase, onGameOver, onPauseKey, onRestartKey, onStartKey, onMuteKey };

  const joyId = useRef<number | null>(null);
  const basePt = useRef({ x: 0, y: 0 });
  const baseEl = useRef<HTMLDivElement>(null);
  const knobEl = useRef<HTMLDivElement>(null);
  const chevEl = useRef<HTMLDivElement>(null);

  /* ------------------------------------------------------- engine boot */
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const game = new LoCheoGame(canvas);
    gameRef.current = game;
    game.onPhase = (p: Phase) => cb.current.onPhase(p);
    game.onGameOver = (s: RunStats) => cb.current.onGameOver(s);
    game.setBest(best);
    onReady(game);

    const ro = new ResizeObserver(() => {
      const r = wrap.getBoundingClientRect();
      game.resize(r.width, r.height);
    });
    ro.observe(wrap);
    const rect = wrap.getBoundingClientRect();
    game.resize(rect.width, rect.height);

    const onVis = () => {
      if (document.hidden && game.phase === "playing") cb.current.onPauseKey();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      ro.disconnect();
      game.destroy();
      gameRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    gameRef.current?.setBest(best);
  }, [best]);

  /* --------------------------------------------------------- keyboard */
  useEffect(() => {
    const set = (code: string, v: boolean) => {
      const g = gameRef.current;
      if (!g) return;
      switch (code) {
        case "KeyA":
        case "ArrowLeft":
          g.setInput({ left: v });
          break;
        case "KeyD":
        case "ArrowRight":
          g.setInput({ right: v });
          break;
        case "KeyW":
        case "ArrowUp":
          g.setInput({ up: v });
          break;
        case "KeyS":
        case "ArrowDown":
          g.setInput({ down: v });
          break;
      }
    };
    const down = (e: KeyboardEvent) => {
      if (
        ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Space", "KeyW", "KeyA", "KeyS", "KeyD"].includes(e.code)
      ) {
        e.preventDefault();
      }
      set(e.code, true);
      if (e.repeat) return;
      switch (e.code) {
        case "Space":
          gameRef.current?.slam();
          break;
        case "KeyP":
        case "Escape":
          cb.current.onPauseKey();
          break;
        case "KeyR":
          cb.current.onRestartKey();
          break;
        case "Enter":
          cb.current.onStartKey();
          break;
        case "KeyM":
          cb.current.onMuteKey();
          break;
      }
    };
    const up = (e: KeyboardEvent) => set(e.code, false);
    const blur = () => gameRef.current?.setInput({ left: false, right: false, up: false, down: false, joy: false });
    window.addEventListener("keydown", down, { passive: false });
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, []);

  /* ----------------------------------------------------- touch joystick */
  const pushJoy = useCallback((dx: number, dy: number) => {
    const g = gameRef.current;
    if (!g) return;
    const m = Math.hypot(dx, dy);
    const k = m > 1 ? 1 / m : 1;
    g.setInput({ jx: dx * k, jy: dy * k, joy: m > 0.12 });
    if (knobEl.current) {
      knobEl.current.style.transform = `translate(calc(-50% + ${dx * k * R}px), calc(-50% + ${dy * k * R}px))`;
    }
    const diagonal = m > 0.4 && Math.abs(Math.abs(dx * k) - Math.abs(dy * k)) < m * k * 0.44;
    if (chevEl.current) chevEl.current.style.opacity = diagonal ? "1" : "0.25";
    if (baseEl.current) baseEl.current.style.borderColor = diagonal ? "#ffc94a" : "rgba(182,224,122,0.4)";
  }, []);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (joyId.current !== null) return;
    joyId.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);
    basePt.current = { x: e.clientX, y: e.clientY };
    if (baseEl.current) {
      baseEl.current.style.display = "block";
      baseEl.current.style.left = `${e.clientX}px`;
      baseEl.current.style.top = `${e.clientY}px`;
    }
    pushJoy(0, 0);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (joyId.current !== e.pointerId) return;
    const dx = (e.clientX - basePt.current.x) / R;
    const dy = (e.clientY - basePt.current.y) / R;
    pushJoy(dx, dy);
  };

  const endJoy = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (joyId.current !== e.pointerId) return;
    joyId.current = null;
    if (baseEl.current) baseEl.current.style.display = "none";
    if (chevEl.current) chevEl.current.style.opacity = "0.25";
    pushJoy(0, 0);
    gameRef.current?.setInput({ joy: false, jx: 0, jy: 0 });
  };

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="block h-full w-full" />

      {/* floating joystick layer */}
      <div
        className={`absolute inset-0 ${controlsLive ? "touch-none" : "pointer-events-none"}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endJoy}
        onPointerCancel={endJoy}
      >
        <div
          ref={baseEl}
          className="pointer-events-none fixed z-20 hidden h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brine-400/40 bg-jade-950/25"
          style={{ display: "none" }}
        >
          <div
            ref={chevEl}
            className="absolute inset-0 flex items-center justify-center text-tumeric-400 transition-opacity duration-100"
            style={{ opacity: 0.25 }}
          >
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9">
                <path d="M28 28l-8 0M28 28l0-8M72 28l8 0M72 28l0-8M28 72l-8 0M28 72l0 8M72 72l8 0M72 72l0 8" />
                <path d="M30 30L70 70M70 30L30 70" strokeDasharray="5 7" opacity="0.65" />
              </g>
            </svg>
          </div>
          <div
            ref={knobEl}
            className="absolute top-1/2 left-1/2 h-14 w-14 rounded-full border-[3px] border-jade-950 bg-tumeric-500 hard-shadow-sm"
            style={{ transform: "translate(-50%, -50%)" }}
          />
        </div>
      </div>

      {/* touch action buttons */}
      {touchMode && controlsLive && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex items-end justify-end p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            aria-label="Lắc hũ"
            onPointerDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              gameRef.current?.slam();
            }}
            className="press pointer-events-auto flex h-24 w-24 flex-col items-center justify-center rounded-full border-[3px] border-jade-950 bg-chili-500 font-display text-[11px] leading-tight tracking-wider text-clay-100 opacity-60 transition-opacity duration-150 hard-shadow active:opacity-100"
          >
            <svg viewBox="0 0 24 24" className="mb-0.5 h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M18 6l-2 2M6 18l2-2M18 18l-2-2" />
              <circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none" />
            </svg>
            LẮC
          </button>
        </div>
      )}
    </div>
  );
}
