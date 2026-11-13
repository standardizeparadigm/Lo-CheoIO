import type { ModeConfig } from "../modeTypes";

/** Mode balance record — see docs/design/modes-balance.md. */
export const combo: ModeConfig = {
  id: "combo",
  name: "LỄ HỘI COMBO",
  tagline: "Cửa sổ combo rộng gấp đôi · kéo dây thả ga",
  description:
    "Lễ hội dành cho tay kéo dây: cửa sổ combo sống gấp đôi (5.4 giây), dưa rơi dày hơn một chút, đền lại +15% điểm mỗi củ. Cứ giữ nhịp hứng — multiplier nhảy vọt như pháo bông.",
  badge: "×1.15 · COMBO ×2",
  scoreMult: 1.15,
  speedMult: 1.05,
  hazardMult: 1.25,
  spawnMult: 0.92,
  comboWindowMult: 2,
  accent: "#ff8ad4",
  gradient: "linear-gradient(150deg,#3a0f2e 0%,#260a1f 55%,#160512 100%)",
  tint: "rgba(255,138,212,0.05)",
};
