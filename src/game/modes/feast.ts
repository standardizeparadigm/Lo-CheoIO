import type { ModeConfig } from "../modeTypes";

/**
 * ĐẠI TIỆC DƯA — badge "×0.6 · HŨ ×2.5".
 *
 * "Dưa rơi như trẩy hội · thưởng hũ ×2.5"
 *
 * score ×0.6 · speed ×0.78 · hazard ×1.15 · spawn ×0.6 · `jarBonusMult: 2.5`.
 *
 * v1.1.7: extracted into its own file so a balance tweak touches one record
 * and one diff. Numbers are pinned by tests/modes-balance.test.ts — change
 * them here, never in the engine.
 */
export const feast: ModeConfig = {
  id: "feast",
  name: "ĐẠI TIỆC DƯA",
  tagline: "Dưa rơi như trẩy hội · thưởng hũ ×2.5",
  description:
    "Trẩy hội muối dưa: dưa rơi chậm mà dày đặc gấp gần hai lần, thưởng đổ đầy hũ tăng ×2.5. Điểm mỗi củ chỉ ×0.6 — chơi kiểu «trồng lúa»: nhặt nhanh tay, đổ thật nhiều hũ.",
  badge: "×0.6 · HŨ ×2.5",
  scoreMult: 0.6,
  speedMult: 0.78,
  hazardMult: 1.15,
  spawnMult: 0.6,
  jarBonusMult: 2.5,
  accent: "#5eead4",
  gradient: "linear-gradient(150deg,#08332f 0%,#052422 55%,#031412 100%)",
  tint: "rgba(94,234,212,0.05)",
};
