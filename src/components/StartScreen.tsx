import { useState } from "react";
import type { ScoreEntry } from "../game/storage";
import { GameButton, JarLogo, Keycap, Panel, ScoreBoard } from "./ui";

const TICKER = [
  "CÀ PHÁO +10",
  "ỚT +15",
  "TỎI +10",
  "GỪNG +12",
  "MUỐI +8",
  "CẢI +18",
  "MUỐI VÀNG +120",
  "ỚT HIỂM ×2",
  "ĐÁ LẠNH — CHẬM",
  "MỐC — NÉ!",
  "RUỒI — NÉ!",
];

const RULES: [string, string, string][] = [
  ["01", "LƯỢT CHÉO", "Giữ 2 phím cùng lúc (hoặc kéo queo chéo) — lọ tăng tốc, phát sáng và CHÉM tan mốc, ruồi."],
  ["02", "HỨNG ĐỒ MUỐI", "Cà pháo, ớt, tỏi, gừng rơi xuống. Bắt liên tục để dựng chuỗi nhân điểm tới ×9."],
  ["03", "LẮC HŨ", "Phím Cách (hoặc nút đỏ góc phải) tạo sóng xung kích: dọn sạch đồ hư quanh lọ và hút đồ muối về phía mình."],
  ["04", "3 VẾT NỨT", "Đụng đồ hư khi không lướt chéo là nứt hũ. Ba vết là mất hũ, đầy hũ thì được thưởng."],
];

export default function StartScreen({
  scores,
  best,
  touchMode,
  onStart,
}: {
  scores: ScoreEntry[];
  best: number;
  touchMode: boolean;
  onStart: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute inset-0 z-40 flex flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_10%,rgba(6,26,26,0.55)_0%,rgba(6,26,26,0.92)_60%,#061a1a_100%)]" />

      <div className="relative flex-1 overflow-y-auto overscroll-contain">
      <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center px-4 pt-16 pb-8 sm:px-8 sm:pt-20">
        <div className="grid items-center gap-7 lg:grid-cols-12">
          {/* ---- title lockup ---- */}
          <div className="anim-slide lg:col-span-7">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-chili-500" />
              <span className="font-body text-[10px] font-extrabold tracking-[0.42em] text-jade-500 uppercase">
                Arcade muối dưa · 60fps
              </span>
            </div>

            <h1 className="font-display leading-[0.8] select-none">
              <span
                className="block text-[clamp(3.4rem,12vw,7.5rem)] text-clay-100"
                style={{ textShadow: "6px 6px 0 #b81f22, 12px 12px 0 rgba(6,26,26,0.55)" }}
              >
                LỌ
              </span>
              <span
                className="-mt-1 block pl-[0.08em] text-[clamp(4.4rem,16vw,10.5rem)] text-tumeric-500"
                style={{ textShadow: "7px 7px 0 #061a1a, 0 0 46px rgba(245,168,28,0.35)" }}
              >
                CHÉO
              </span>
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span
                className="inline-block -rotate-2 border-[3px] border-jade-950 bg-chili-500 px-3 py-1 font-display text-[11px] tracking-[0.2em] text-clay-100 hard-shadow-sm sm:text-xs"
              >
                HŨ DƯA ĐẠI CHIẾN
              </span>
              <span className="font-body text-xs font-semibold tracking-wide text-brine-300">
                kỷ lục hiện tại:{" "}
                <b className="font-display text-sm text-tumeric-400">{best.toLocaleString("vi-VN")}</b>
              </span>
            </div>

            <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-clay-100/80 sm:text-[15px]">
              Cái lọ này <b className="text-brine-300">chỉ chịu đi đường chéo</b>. Lượn xiên để tăng tốc và chém
              tan mốc, ruồi; hứng trọn cà pháo, tỏi, ớt cho đầy hũ trước khi gốm nứt làm ba.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <GameButton size="lg" onClick={onStart} className="anim-cta">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M7 4.5v15l13-7.5z" />
                </svg>
                Vào bếp
              </GameButton>
              <GameButton size="lg" variant="ghost" onClick={() => setOpen((v) => !v)}>
                {open ? "Bớt lại" : "Cách chơi"}
              </GameButton>
              <span className="hidden items-center gap-2 font-body text-[11px] tracking-wider text-jade-500 sm:flex">
                hoặc nhấn <Keycap wide>ENTER</Keycap>
              </span>
            </div>

            {touchMode ? (
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t-2 border-dashed border-jade-800 pt-4 font-body text-[11px] font-bold tracking-wider text-clay-100/70">
                <span className="flex items-center gap-2">
                  <span className="inline-block h-6 w-6 rounded-full border-2 border-tumeric-500 bg-tumeric-500/20" />
                  KÉO NGÓN TAY — lọ trượt theo
                </span>
                <span className="flex items-center gap-2">
                  <span className="inline-block font-display text-tumeric-400">⤢</span>
                  KÉO XÉO 45° — chém mốc
                </span>
                <span className="flex items-center gap-2">
                  <span className="inline-block h-6 w-6 rounded-full border-2 border-chili-500 bg-chili-500/30" />
                  NÚT LẮC — dọn sạch
                </span>
              </div>
            ) : (
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t-2 border-dashed border-jade-800 pt-4">
                <span className="flex items-center gap-1.5 font-body text-[11px] font-bold tracking-wider text-clay-100/70">
                  DI CHUYỂN <Keycap>W</Keycap>
                  <Keycap>A</Keycap>
                  <Keycap>S</Keycap>
                  <Keycap>D</Keycap> / <Keycap wide>↑ ← ↓ →</Keycap>
                </span>
                <span className="flex items-center gap-1.5 font-body text-[11px] font-bold tracking-wider text-clay-100/70">
                  LẮC HŨ <Keycap wide>SPACE</Keycap>
                </span>
                <span className="flex items-center gap-1.5 font-body text-[11px] font-bold tracking-wider text-clay-100/70">
                  TẠM NGHỈ <Keycap>P</Keycap>
                </span>
              </div>
            )}

            {open && (
              <Panel className="anim-pop mt-5 p-4">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {RULES.map(([n, t, d]) => (
                    <li key={n} className="flex gap-3">
                      <span className="font-display text-lg leading-none text-tumeric-500">{n}</span>
                      <span>
                        <span className="block font-display text-[11px] tracking-[0.12em] text-brine-300">{t}</span>
                        <span className="block font-body text-xs leading-relaxed text-clay-100/70">{d}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Panel>
            )}
          </div>

          {/* ---- board + mascot ---- */}
          <div className="anim-pop lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <JarLogo className="anim-bob absolute -top-16 -left-2 h-20 w-auto drop-shadow-[0_8px_14px_rgba(0,0,0,0.45)] sm:-top-20 sm:h-24" />
              <Panel className="pt-3">
                <ScoreBoard entries={scores} rows={8} />
              </Panel>
              <div className="mt-3 flex items-center justify-between border-[3px] border-jade-800 bg-jade-900/70 px-3 py-2">
                <span className="font-body text-[10px] font-extrabold tracking-[0.2em] text-jade-500 uppercase">
                  lưu trên máy bạn
                </span>
                <span className="flex items-center gap-1 font-display text-[11px] text-tumeric-400">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
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
          {[...TICKER, ...TICKER].map((t, i) => (
            <span
              key={i}
              className={`font-display text-[11px] tracking-[0.18em] ${
                i % 3 === 0 ? "text-tumeric-400" : i % 3 === 1 ? "text-brine-300" : "text-chili-400"
              }`}
            >
              {t} <span className="text-jade-700">◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
