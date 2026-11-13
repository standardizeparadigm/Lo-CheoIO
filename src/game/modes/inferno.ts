import type { ModeConfig } from "../modeTypes";

/**
 * ỚT LỬA — badge "×1.5 ĐIỂM".
 *
 * "Dưa rơi như lửa · thưởng nửa điểm nữa"
 *
 * score ×1.5 · speed ×1.35 · hazard ×1.8 · spawn ×0.85.
 *
 * v1.1.7: extracted into its own file so a balance tweak touches one record
 * and one diff. Numbers are pinned by tests/modes-balance.test.ts — change
 * them here, never in the engine.
 */
export const inferno: ModeConfig = {
  id: "inferno",
  name: "ỚT LỬA",
  tagline: "Dưa rơi như lửa · thưởng nửa điểm nữa",
  description:
    "Địa ngục của dân muối dưa: dưa rơi nhanh hơn 35%, đồ hư nhiều gần gấp đôi, đền lại +50% điểm mỗi củ. Chỉ dành cho tay chéo cứng.",
  badge: "×1.5 ĐIỂM",
  scoreMult: 1.5,
  speedMult: 1.35,
  hazardMult: 1.8,
  spawnMult: 0.85,
  accent: "#ff6a4d",
  gradient: "linear-gradient(150deg,#3d120c 0%,#260b08 55%,#170606 100%)",
  tint: "rgba(230,59,46,0.06)",
};
