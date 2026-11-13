import type { ModeConfig } from "../modeTypes";

/**
 * ĐUA 60 GIÂY — badge "×1.25 · 60S".
 *
 * "Đồng hồ đếm ngược · chém điểm tối đa"
 *
 * score ×1.25 · speed ×1.12 · hazard ×1.2 · spawn ×0.9 · `timeLimit: 60`.
 *
 * v1.1.7: extracted into its own file so a balance tweak touches one record
 * and one diff. Numbers are pinned by tests/modes-balance.test.ts — change
 * them here, never in the engine.
 */
export const blitz: ModeConfig = {
  id: "blitz",
  name: "ĐUA 60 GIÂY",
  tagline: "Đồng hồ đếm ngược · chém điểm tối đa",
  description:
    "Chạy đua với đồng hồ: 60 giây, dưa rơi dày hơn và nhanh hơn một chút, đền lại ×1.25 điểm mỗi củ. Hết giờ là hết ván — hứng được càng nhiều càng tốt.",
  badge: "×1.25 · 60S",
  scoreMult: 1.25,
  speedMult: 1.12,
  hazardMult: 1.2,
  spawnMult: 0.9,
  timeLimit: 60,
  accent: "#ffc94a",
  gradient: "linear-gradient(150deg,#3f2c05 0%,#271e06 55%,#171105 100%)",
  tint: "rgba(255,201,74,0.05)",
};
