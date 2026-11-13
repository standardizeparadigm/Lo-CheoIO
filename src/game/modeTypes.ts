/* =====================================================================
   Lọ Chéo — Game mode vocabulary (types only, no data)
   =====================================================================
   v1.1.7: split out of `game/modes.ts` so the nine balance records can live
   in `game/modes/<id>.ts` without every one of them importing the whole set.
   This file has no runtime code — it is erased at build time.
   ===================================================================== */

export type ModeId =
  | "classic"
  | "zen"
  | "inferno"
  | "blitz"
  | "goldrush"
  | "storm"
  | "hardcore"
  | "combo"
  | "feast";

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
  /** Multiplier for how long a combo survives without a fresh catch (defaults to 1) */
  comboWindowMult?: number;
  /** Multiplier for the jar-fill bonus (defaults to 1) */
  jarBonusMult?: number;
  /** Accent colour for the card glow / ring */
  accent: string;
  /** CSS gradient used for the card background */
  gradient: string;
  /** Soft tint drawn over the arena while playing (canvas rgba base) */
  tint: string | null;
}
