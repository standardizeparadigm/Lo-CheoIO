import { useEffect, useRef, useState } from "react";
import type { RunStats } from "../game/engine";
import type { ScoreEntry } from "../game/storage";
import { fmtTime } from "./PauseScreen";
import { GameButton, JarLogo, Keycap, Panel, ScoreBoard, Stat } from "./ui";

export default function GameOverScreen({
  stats,
  scores,
  best,
  isHigh,
  rank,
  savedId,
  onSave,
  onRestart,
  onMenu,
}: {
  stats: RunStats;
  scores: ScoreEntry[];
  best: number;
  isHigh: boolean;
  rank: number;
  savedId: string | null;
  onSave: (name: string) => void;
  onRestart: () => void;
  onMenu: () => void;
}) {
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDone(false);
    setName("");
    if (isHigh) window.setTimeout(() => inputRef.current?.focus(), 420);
  }, [isHigh, stats.score]);

  const submit = () => {
    if (done) return;
    onSave((name.trim() || "KHÔNG TÊN").slice(0, 10).toUpperCase());
    setDone(true);
  };

  return (
    <div className="absolute inset-0 z-40 overflow-y-auto overscroll-contain">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_80%_at_50%_0%,rgba(184,31,34,0.28)_0%,rgba(6,26,26,0.88)_55%,#061a1a_100%)]" />

      <div className="relative mx-auto flex min-h-full w-full max-w-6xl items-center gap-6 px-4 py-8 sm:px-8">
        <div className="grid w-full items-center gap-6 lg:grid-cols-12">
          <div className="anim-pop lg:col-span-7">
            <div className="flex items-center gap-3">
              <JarLogo mood="hurt" className="h-16 w-auto shrink-0 sm:h-20" />
              <div>
                <span className="font-body text-[10px] font-extrabold tracking-[0.34em] text-chili-400 uppercase">
                  gốm không chịu nổi
                </span>
                <h2
                  className="font-display text-[clamp(2.6rem,9vw,5rem)] leading-[0.85] text-chili-500"
                  style={{ textShadow: "5px 5px 0 #061a1a" }}
                >
                  VỠ HŨ!
                </h2>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-2">
              <div>
                <div className="font-body text-[10px] font-extrabold tracking-[0.3em] text-jade-500 uppercase">
                  điểm ván này
                </div>
                <div
                  className="font-display text-[clamp(3rem,11vw,6rem)] leading-[0.85] text-tumeric-400 tabular-nums"
                  style={{ textShadow: "6px 6px 0 rgba(6,26,26,0.85)" }}
                >
                  {stats.score.toLocaleString("vi-VN")}
                </div>
              </div>
              <div className="mb-2 flex flex-col gap-1">
                <span className="font-body text-xs font-bold tracking-wider text-clay-100/70">
                  kỷ lục: <b className="font-display text-brine-300">{Math.max(best, stats.score).toLocaleString("vi-VN")}</b>
                </span>
                {isHigh && !done && (
                  <span className="inline-block w-fit -rotate-2 border-[3px] border-jade-950 bg-brine-500 px-2 py-0.5 font-display text-[11px] tracking-[0.14em] text-jade-950 hard-shadow-sm">
                    VÀO TOP {rank}!
                  </span>
                )}
                {done && (
                  <span className="inline-block w-fit border-[3px] border-jade-950 bg-tumeric-500 px-2 py-0.5 font-display text-[11px] tracking-[0.14em] text-jade-950 hard-shadow-sm">
                    ĐÃ GHI VÀO BẢNG VÀNG
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              <Stat label="Củ muối" value={stats.catches} accent="text-brine-300" />
              <Stat label="Chuỗi đỉnh" value={`×${stats.bestCombo}`} accent="text-tumeric-400" />
              <Stat label="Cấp" value={stats.level} />
              <Stat label="Hũ đầy" value={stats.jars} accent="text-brine-300" />
              <Stat label="Đã chém" value={stats.sliced} accent="text-chili-400" />
              <Stat label="Thời gian" value={fmtTime(stats.time)} />
            </div>

            {isHigh && !done && (
              <Panel className="anim-pop mt-4 flex flex-wrap items-center gap-2 p-3">
                <label className="font-body text-[10px] font-extrabold tracking-[0.24em] text-jade-500 uppercase">
                  ghi tên vào bảng vàng
                </label>
                <input
                  ref={inputRef}
                  value={name}
                  maxLength={10}
                  onChange={(e) => setName(e.target.value.toUpperCase())}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      submit();
                    }
                    e.stopPropagation();
                  }}
                  placeholder="VD: BÀ TƯ"
                  className="min-w-0 flex-1 border-[3px] border-jade-700 bg-jade-950 px-3 py-2 font-display text-sm tracking-[0.14em] text-tumeric-400 placeholder-jade-700 outline-none focus:border-tumeric-500"
                />
                <GameButton onClick={submit}>Lưu</GameButton>
              </Panel>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <GameButton size="lg" onClick={onRestart} className="anim-cta">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                  <path d="M20 11a8 8 0 10-2.3 6.3" />
                  <path d="M20 4v7h-7" />
                </svg>
                Muối lại ngay
              </GameButton>
              <GameButton size="lg" variant="ghost" onClick={onMenu}>
                Về menu
              </GameButton>
              <span className="flex items-center gap-1.5 font-body text-[11px] font-bold tracking-wider text-jade-500">
                nhấn <Keycap>R</Keycap> để chơi lại tức thì
              </span>
            </div>
          </div>

          <div className="anim-slide lg:col-span-5">
            <Panel>
              <ScoreBoard entries={scores} highlightId={savedId} rows={8} />
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}
