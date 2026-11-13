/**
 * Shared UI primitives.
 *
 * v1.1.7: this used to be `components/ui.tsx`, one 337-line file with eight
 * exports. It is now a folder — one primitive per module — and this barrel is
 * the single import site, so every existing `from "./ui"` keeps working.
 */
export { JarLogo } from "./jar";
export { Panel } from "./panel";
export { GameButton } from "./button";
export { Keycap } from "./keycap";
export { Stat } from "./stat";
export { Modal } from "./modal";
export { Switch } from "./switch";
export { ScoreBoard } from "./scoreboard";
