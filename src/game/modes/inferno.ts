import type { ModeConfig } from "../modeTypes";

/** Mode balance record — see docs/design/modes-balance.md. */
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
