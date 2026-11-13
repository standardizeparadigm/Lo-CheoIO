import type { ModeConfig } from "../modeTypes";

/** Mode balance record — see docs/design/modes-balance.md. */
export const hardcore: ModeConfig = {
  id: "hardcore",
  name: "GỐM MỎNG",
  tagline: "Chỉ một vết nứt là vỡ hũ · ×2.0 điểm",
  description:
    "Gốm của lò nung non tay: chỉ chịu được đúng MỘT vết nứt — chạm đồ hư là vỡ hũ ngay. Đền lại ×2.0 điểm mỗi củ và hazard nhiều hơn một chút. Chỉ dành cho tay chéo kim cương.",
  badge: "×2.0 · 1 NỨT",
  scoreMult: 2,
  speedMult: 1.1,
  hazardMult: 1.3,
  spawnMult: 0.95,
  maxCracks: 1,
  accent: "#ff4d6d",
  gradient: "linear-gradient(150deg,#330d16 0%,#22060d 55%,#130409 100%)",
  tint: "rgba(255,77,109,0.06)",
};
