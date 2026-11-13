import type { ModeConfig } from "../modeTypes";

/** Mode balance record — see docs/design/modes-balance.md. */
export const zen: ModeConfig = {
  id: "zen",
  name: "THẢNH THƠI",
  tagline: "Không đồ hư · thư thái muối dưa",
  description:
    "Chế độ chữa lành: mốc và ruồi biến mất, dưa rơi chậm hơn 20%, đổi lại điểm chỉ còn một nửa. Dành cho những buổi chiều mưa.",
  badge: "×0.5 ĐIỂM",
  scoreMult: 0.5,
  speedMult: 0.8,
  hazardMult: 0,
  spawnMult: 1.08,
  accent: "#8cc63f",
  gradient: "linear-gradient(150deg,#0f331f 0%,#0a2418 55%,#071510 100%)",
  tint: "rgba(140,198,63,0.045)",
};
