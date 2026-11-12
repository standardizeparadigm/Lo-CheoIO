/* =====================================================================
   Lọ Chéo — Achievements: definitions + pure unlock checker (unit-tested)
   ===================================================================== */

import type { ModeId } from "./modes";

/** Minimal run shape the checker needs — decoupled from the engine. */
export interface RunLike {
  score: number;
  catches: number;
  bestCombo: number;
  level: number;
  jars: number;
  sliced: number;
  time: number;
  mode: ModeId;
}

export interface ProgressLike {
  /** Total finished runs across sessions */
  runs: number;
  /** Cumulative jars filled across sessions */
  totalJars: number;
  /** Cumulative hazards sliced across sessions */
  totalSliced: number;
  /** Best lifetime score */
  bestScore: number;
}

export interface AchievementDef {
  id: string;
  name: string;
  description: string;
  /** Glyph drawn inside the badge — kept text-only so it themes cleanly */
  glyph: string;
  /** Palette key used by the panel to colour the badge */
  tone: "gold" | "brine" | "chili" | "jade";
}

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: "first-catch", name: "MẺ MUỐI ĐẦU TIÊN", description: "Hứng được củ dưa đầu tiên trong sự nghiệp.", glyph: "CÀ", tone: "brine" },
  { id: "combo-10", name: "TAY MUỐI CHUYÊN NGHIỆP", description: "Đạt chuỗi 10 củ liên tiếp trong một ván.", glyph: "×10", tone: "gold" },
  { id: "combo-20", name: "CHÉO THẦN VÔ ĐỐI", description: "Đạt chuỗi 20 củ liên tiếp trong một ván.", glyph: "×20", tone: "chili" },
  { id: "slice-10", name: "KIẾM CHÉO THÁI MỎNG", description: "Chém tan 10 đồ hư trong một ván.", glyph: "CHÉM", tone: "chili" },
  { id: "jar-1", name: "HŨ ĐẦU TAY", description: "Đầy một hũ dưa trong một ván.", glyph: "HŨ", tone: "brine" },
  { id: "level-6", name: "BẾP TRƯỞNG XÓM DƯA", description: "Đạt cấp 6 trong một ván.", glyph: "C6", tone: "jade" },
  { id: "score-3000", name: "TÚI MUỐI 3 NÚT", description: "Ghi 3.000 điểm trong một ván.", glyph: "3K", tone: "gold" },
  { id: "score-6000", name: "HUYỀN THOẠI HŨ CHÉO", description: "Ghi 6.000 điểm trong một ván.", glyph: "6K", tone: "chili" },
  { id: "runs-5", name: "MUỐI 5 MẺ", description: "Hoàn thành 5 ván chơi (cộng dồn mọi chế độ).", glyph: "5 MẺ", tone: "jade" },
  { id: "inferno-1500", name: "ĂN ỚT KHÔNG CAY", description: "Ghi 1.500 điểm ở chế độ Ớt Lửa.", glyph: "ỚT", tone: "chili" },
  { id: "blitz-3000", name: "VUA ĐUA 60 GIÂY", description: "Ghi 3.000 điểm trong một ván Đua 60 Giây.", glyph: "60S", tone: "gold" },
  { id: "goldrush-2jars", name: "MÙA VÀNG BỘI THU", description: "Đầy 2 hũ trong một ván Mùa Vàng.", glyph: "2 HŨ", tone: "brine" },
  { id: "storm-60", name: "CƠN MƯA NẶNG HẠT", description: "Hứng được 60 củ trong một ván Mưa Dưa.", glyph: "60 CỦ", tone: "jade" },
  { id: "hardcore-jar", name: "GỐM THÉP", description: "Đầy một hũ trong một ván Gốm Mỏng.", glyph: "1 VẾT", tone: "chili" },
];

export const ACHIEVEMENT_MAP: ReadonlyMap<string, AchievementDef> = new Map(
  ACHIEVEMENTS.map((a) => [a.id, a]),
);

/**
 * Pure check: given a finished run, lifetime progress and the set of already
 * unlocked ids — returns the ids that unlock right now (never duplicates).
 */
export function checkAchievements(
  run: RunLike,
  progress: ProgressLike,
  unlocked: readonly string[],
): string[] {
  const have = new Set(unlocked);
  const next: string[] = [];
  const grant = (id: string, ok: boolean) => {
    if (ok && !have.has(id)) {
      have.add(id);
      next.push(id);
    }
  };

  grant("first-catch", run.catches >= 1);
  grant("combo-10", run.bestCombo >= 10);
  grant("combo-20", run.bestCombo >= 20);
  grant("slice-10", run.sliced >= 10);
  grant("jar-1", run.jars >= 1);
  grant("level-6", run.level >= 6);
  grant("score-3000", run.score >= 3000);
  grant("score-6000", run.score >= 6000);
  grant("runs-5", progress.runs >= 5);
  grant("inferno-1500", run.mode === "inferno" && run.score >= 1500);
  grant("blitz-3000", run.mode === "blitz" && run.score >= 3000);
  grant("goldrush-2jars", run.mode === "goldrush" && run.jars >= 2);
  grant("storm-60", run.mode === "storm" && run.catches >= 60);
  grant("hardcore-jar", run.mode === "hardcore" && run.jars >= 1);

  return next;
}
