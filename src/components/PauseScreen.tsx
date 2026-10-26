import type { RunStats } from "../game/engine";
import { GameButton, Keycap, Panel, Stat } from "./ui";

export function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
}

export default function PauseScreen({
  stats,
  muted,
  onResume,
  onRestart,
  onMenu,
  onToggleMute,
}: {
  stats: RunStats;
  muted: boolean;
  onResume: () => void;
  onRestart: () => void;
  onMenu: () => void;
  onToggleMute: () => void;
}) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center overflow-y-auto px-4 py-6">
      <div className="pointer-events-none absolute inset-0 bg-jade-950/70 backdrop-blur-[2px]" />
      <Panel className="anim-pop relative w-full max-w-md p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="font-body text-[10px] font-extrabold tracking-[0.34em] text-jade-500 uppercase">
              hũ đang đậy nắp
            </span>
            <h2
              className="font-display text-4xl leading-none text-tumeric-400 sm:text-5xl"
              style={{ textShadow: "4px 4px 0 #061a1a" }}
            >
              TẠM NGHỈ
            </h2>
          </div>
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={muted ? "Bật âm" : "Tắt âm"}
            className="press flex h-10 w-10 items-center justify-center border-[3px] border-jade-700 bg-jade-900 text-brine-300 hard-shadow-sm"
          >
            {muted ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
                <path d="M17 9l4 6M21 9l-4 6" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
                <path d="M17 8.5a5 5 0 010 7M20 6a9 9 0 010 12" />
              </svg>
            )}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label="Điểm" value={stats.score.toLocaleString("vi-VN")} accent="text-tumeric-400" />
          <Stat label="Củ đã muối" value={stats.catches} accent="text-brine-300" />
          <Stat label="Chuỗi cao nhất" value={`×${stats.bestCombo}`} accent="text-chili-400" />
          <Stat label="Cấp / Hũ" value={`${stats.level} / ${stats.jars}`} />
        </div>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <GameButton size="lg" onClick={onResume} className="flex-1">
            Muối tiếp
          </GameButton>
          <GameButton size="lg" variant="ghost" onClick={onRestart}>
            Chơi lại
          </GameButton>
          <GameButton size="lg" variant="ink" onClick={onMenu}>
            Về menu
          </GameButton>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t-2 border-dashed border-jade-800 pt-3 font-body text-[11px] font-bold tracking-wider text-clay-100/60">
          <span className="flex items-center gap-1.5">
            <Keycap>P</Keycap> / <Keycap wide>ESC</Keycap> tiếp tục
          </span>
          <span className="flex items-center gap-1.5">
            <Keycap wide>SPACE</Keycap> lắc hũ
          </span>
          <span className="flex items-center gap-1.5">
            <Keycap>M</Keycap> tắt tiếng
          </span>
        </div>
      </Panel>
    </div>
  );
}
