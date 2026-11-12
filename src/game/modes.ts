/* =====================================================================
   Lọ Chéo — Game modes & balance math (pure functions, unit-tested)
   ===================================================================== */

export type ModeId = "classic" | "zen" | "inferno" | "blitz" | "goldrush" | "storm" | "hardcore";

export interface ModeConfig {
  id: ModeId;
  /** Short display name (vi) */
  name: string;
  /** One-line tagline shown on the menu card */
  tagline: string;
  /** Longer description shown in the hover/expanded state */
  description: string;
  /** Score multiplier badge label */
  badge: string;
  /** Points awarded are multiplied by this */
  scoreMult: number;
  /** Fall-speed multiplier for spawned items */
  speedMult: number;
  /** Hazard spawn-weight multiplier (0 disables hazards) */
  hazardMult: number;
  /** Interval multiplier between spawns (lower = denser rain) */
  spawnMult: number;
  /** Optional 60-second-style countdown (seconds); when set, the run ends at 0 */
  timeLimit?: number;
  /** Spawn-weight multiplier for golden powers (Muối Vàng, Ớt Hiểm, Đá Lạnh, Cải Vàng, Tỏi Vàng) */
  goldMult?: number;
  /** Optional cap on cracks before the jar shatters (defaults to MAX_CRACKS) */
  maxCracks?: number;
  /** Accent colour for the card glow / ring */
  accent: string;
  /** CSS gradient used for the card background */
  gradient: string;
  /** Soft tint drawn over the arena while playing (canvas rgba base) */
  tint: string | null;
}

export const MODES: Record<ModeId, ModeConfig> = {
  classic: {
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
  },
  zen: {
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
  },
  inferno: {
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
  },
  blitz: {
    id: "blitz",
    name: "ĐUA 60 GIÂY",
    tagline: "Đồng hồ đếm ngược · chém điểm tối đa",
    description:
      "Chạy đua với đồng hồ: 60 giây, dưa rơi dày hơn và nhanh hơn một chút, đền lại ×1.25 điểm mỗi củ. Hết giờ là hết ván — hứng được càng nhiều càng tốt.",
    badge: "×1.25 · 60S",
    scoreMult: 1.25,
    speedMult: 1.12,
    hazardMult: 1.2,
    spawnMult: 0.9,
    timeLimit: 60,
    accent: "#ffc94a",
    gradient: "linear-gradient(150deg,#3f2c05 0%,#271e06 55%,#171105 100%)",
    tint: "rgba(255,201,74,0.05)",
  },
  goldrush: {
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
  },
  storm: {
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
  },
  hardcore: {
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
  },
};

export const MODE_LIST: ModeConfig[] = [
  MODES.classic,
  MODES.zen,
  MODES.inferno,
  MODES.blitz,
  MODES.goldrush,
  MODES.storm,
  MODES.hardcore,
];

export function isModeId(v: unknown): v is ModeId {
  return (
    v === "classic" ||
    v === "zen" ||
    v === "inferno" ||
    v === "blitz" ||
    v === "goldrush" ||
    v === "storm" ||
    v === "hardcore"
  );
}

/** Combo multiplier: +1 per 4-catch streak, capped at ×9, doubled in frenzy. */
export function multiplierForCombo(combo: number, frenzy: boolean): number {
  const base = Math.min(9, 1 + Math.floor(Math.max(0, combo) / 4));
  return base * (frenzy ? 2 : 1);
}

/** Level curve: one level per 10 catches, starting at level 1. */
export function levelForCatches(catches: number): number {
  return 1 + Math.floor(Math.max(0, catches) / 10);
}

/** Bonus granted when a jar is filled, scaled by current level. */
export function jarBonus(level: number): number {
  return 200 + Math.max(1, level) * 50;
}

/** Seconds a combo survives without a fresh catch. */
export const COMBO_WINDOW = 2.7;

/** Max cracks before the jar breaks. */
export const MAX_CRACKS = 3;
