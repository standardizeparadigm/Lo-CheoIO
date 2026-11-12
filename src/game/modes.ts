/* =====================================================================
   Lọ Chéo — Game modes & balance math (pure functions, unit-tested)
   ===================================================================== */

export type ModeId = "classic" | "zen" | "inferno";

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
};

export const MODE_LIST: ModeConfig[] = [MODES.classic, MODES.zen, MODES.inferno];

export function isModeId(v: unknown): v is ModeId {
  return v === "classic" || v === "zen" || v === "inferno";
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
