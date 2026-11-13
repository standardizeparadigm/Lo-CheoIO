/**
 * The start-screen menu (v1.1.8).
 *
 * Barrel only — the real modules live in sub-folders:
 *
 *   · `background/`  the eight decorative layers behind the scene
 *   · `layout/`      the metrics and the fitting rules that size the screen
 *   · `ticker/`      the scrolling ingredient band
 *   · `icons/`       the inline SVG row icons
 *   · this folder    the corner panels, their rows, and the modals
 */
export { default as CornerPanel } from "./CornerPanel";
export { default as MenuItemButton } from "./MenuItemButton";
export { default as MenuChrome } from "./MenuChrome";
export { default as GameMenu } from "./GameMenu";
export { default as InfoMenu } from "./InfoMenu";
export { default as ModeSelectModal } from "./ModeSelectModal";
export { default as SettingsModal } from "../settings/SettingsModal";
export { default as LeaderboardModal } from "./LeaderboardModal";
export { default as AchievementsModal } from "./AchievementsModal";
export { default as AboutModal } from "./AboutModal";
export { default as ChangelogModal } from "./ChangelogModal";
export { default as QuitModal } from "./QuitModal";
