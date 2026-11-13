import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CANVAS_COLORS, PALETTE, PALETTE_CSS_TOKENS } from "../src/game/palette";

const css = readFileSync("src/index.css", "utf8");

/** Read `--color-x: #hex;` out of the @theme block. */
function cssColor(token: string): string | undefined {
  return css.match(new RegExp(`${token}:\\s*(#[0-9a-fA-F]{6})`))?.[1];
}

describe("palette", () => {
  it("every canvas colour exists as a CSS custom property with the same hex", () => {
    for (const name of Object.keys(PALETTE) as (keyof typeof PALETTE)[]) {
      const token = PALETTE_CSS_TOKENS[name];
      expect(cssColor(token), `${name} → ${token}`).toBe(PALETTE[name].toLowerCase());
    }
  });

  it("the widened canvas record is a faithful copy", () => {
    expect(CANVAS_COLORS).toEqual(PALETTE);
    expect(CANVAS_COLORS).not.toBe(PALETTE); // a copy, not the frozen object
  });

  it("uses six-digit lowercase hex everywhere", () => {
    for (const hex of Object.values(PALETTE)) expect(hex).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("the engine no longer keeps a private colour table", () => {
    const engine = readFileSync("src/game/engine.ts", "utf8");
    expect(engine).toContain("const C = CANVAS_COLORS;");
    expect(engine).not.toMatch(/const C = \{\s*ink:/);
  });
});
