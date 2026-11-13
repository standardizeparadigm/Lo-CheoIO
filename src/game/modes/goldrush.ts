import type { ModeConfig } from "../modeTypes";

/** Mode balance record — see docs/design/modes-balance.md. */
export const goldrush: ModeConfig = {
  id: "goldrush",
  name: "MÙA VÀNG",
  tagline: "Đồ vàng rơi dày đặc · mùa bội thu",
  description:
    "Mùa gặt rực rỡ: Muối Vàng, Cải Vàng, Tỏi Vàng, Ớt Hiểm và Đá Lạnh rơi dày gấp ~2.6 lần. Cân bằng như Cổ điển, dành cho ai thích ăn vàng và leo thành tựu.",
  badge: "×1.0 · GOLD ×2.6",
  scoreMult: 1,
  speedMult: 1,
  hazardMult: 1,
  spawnMult: 0.95,
  goldMult: 2.6,
  accent: "#ffd766",
  gradient: "linear-gradient(150deg,#3a3305 0%,#292404 55%,#161304 100%)",
  tint: "rgba(255,215,102,0.05)",
};
