import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(__dirname, "..");
const read = (p: string) => readFileSync(resolve(root, p), "utf8");

/**
 * Static wiring assertions — cheap guardrails that catch a whole class of
 * v1.1.6 regressions (a setting added to the schema but never applied).
 */
describe("settings → runtime wiring (v1.1.6)", () => {
  const app = read("src/App.tsx");

  it("App applies every audio setting", () => {
    for (const call of [
      "audio.setSfxEnabled(settings.sfx)",
      "audio.setMusicEnabled(settings.music)",
      "audio.setSfxVolume(settings.sfxVolume / 100)",
      "audio.setMusicVolume(settings.musicVolume / 100)",
    ]) {
      expect(app, call).toContain(call);
    }
  });

  it("App applies every engine setting, both on patch and on boot", () => {
    for (const call of [
      "setShakeEnabled(settings.shake)",
      "setShakeLevel(settings.shakeLevel)",
      "setQuality(settings.visualQuality)",
      "setReducedMotion(settings.reducedMotion)",
    ]) {
      expect(app, call).toContain(call);
    }
    // onReady path (engine hand-off) must not forget the new hooks
    expect(app).toContain("g.setShakeLevel(s.shakeLevel)");
    expect(app).toContain("g.setQuality(s.visualQuality)");
  });

  it("settings.language drives the i18n module", () => {
    expect(app).toContain("setLanguage(settings.language)");
    expect(app).toContain("loadSettings(detectInitialLanguage())");
  });

  it("GameCanvas gates auto-pause on the setting", () => {
    const canvas = read("src/components/GameCanvas.tsx");
    expect(canvas).toContain("autoPauseOnBlur");
    expect(canvas).toContain("if (!cb.current.autoPauseOnBlur) return;");
  });

  it("the language switcher component is gone and the settings modal is re-exported", () => {
    const barrel = read("src/components/menu/index.ts");
    expect(barrel).toContain("SettingsModal");
    expect(barrel).toContain("../settings/SettingsModal");
    expect(() => read("src/components/LanguageSwitcher.tsx")).toThrow();
  });

  it("StartScreen no longer mounts a language switcher", () => {
    const start = read("src/components/StartScreen.tsx");
    expect(start).not.toContain("LanguageSwitcher");
    // the settings modal is reachable from the menu (route + props)
    expect(start).toContain("<SettingsModal");
    expect(start).toContain("onChangeLanguage={onChangeLanguage}");
  });
});
