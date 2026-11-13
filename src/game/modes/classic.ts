import type { ModeConfig } from "../modeTypes";

/**
 * MUỐI DƯA CỔ ĐIỂN — badge "×1.0 ĐIỂM".
 *
 * "Cân bằng hương vị truyền thống"
 *
 * score ×1 · speed ×1 · hazard ×1 · spawn ×1.
 *
 * v1.1.7: extracted into its own file so a balance tweak touches one record
 * and one diff. Numbers are pinned by tests/modes-balance.test.ts — change
 * them here, never in the engine.
 */
export const classic: ModeConfig = {
  id: "classic",
  name: "MUỐI DƯA CỔ ĐIỂN",
  tagline: "Cân bằng hương vị truyền thống",
  description:
    "Toàn bộ trải nghiệm gốc: cà pháo, tỏi, ớt rơi xuống — né đồ hư, chém chéo khi hưng phấn, lắc hũ cứu nguy.",
  badge: "×1.0 ĐIỂM",
  scoreMult: 1,
  speedMult: 1,
  hazardMult: 1,
  spawnMult: 1,
  accent: "#f5a81c",
  gradient: "linear-gradient(150deg,#3a2c07 0%,#241d05 55%,#141204 100%)",
  tint: null,
};
