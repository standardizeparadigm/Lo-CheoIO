import type { ModeConfig } from "../modeTypes";

/** Mode balance record — see docs/design/modes-balance.md. */
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
