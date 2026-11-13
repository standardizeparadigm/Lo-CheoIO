/**
 * Start-screen layout metrics & fitting rules (v1.1.8).
 *
 * Extracted from `StartScreen.tsx` after the v1.1.7 overflow bug, where the
 * corner panels were flex siblings and ate 415 of 720 vertical pixels. Keeping
 * the numbers in one module is what makes `tests/menu-layout.test.ts` possible.
 */
export * from "./metrics";
export * from "./fit";
