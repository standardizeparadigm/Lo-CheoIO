import type { ModeConfig } from "../modeTypes";

/**
 * MƯA DƯA — badge "×0.75 · STORM".
 *
 * "Dưa rơi như trút nước · lụt dưa cả bếp"
 *
 * score ×0.75 · speed ×0.88 · hazard ×1.5 · spawn ×0.72.
 *
 * v1.1.7: extracted into its own file so a balance tweak touches one record
 * and one diff. Numbers are pinned by tests/modes-balance.test.ts — change
 * them here, never in the engine.
 */
export const storm: ModeConfig = {
  id: "storm",
  name: "MƯA DƯA",
  tagline: "Dưa rơi như trút nước · lụt dưa cả bếp",
  description:
    "Thiên tai của dân muối dưa: dưa rơi chậm hơn một chút nhưng dày gấp gần rưỡi, đồ hư cũng nhiều hơn. Điểm mỗi củ chỉ ×0.75 — đổi lấy cảm giác «lụt dưa» sướng tay và leo cấp cực nhanh.",
  badge: "×0.75 · STORM",
  scoreMult: 0.75,
  speedMult: 0.88,
  hazardMult: 1.5,
  spawnMult: 0.72,
  accent: "#7fd0ff",
  gradient: "linear-gradient(150deg,#0d2b38 0%,#081f2b 55%,#050f16 100%)",
  tint: "rgba(127,208,255,0.05)",
};
