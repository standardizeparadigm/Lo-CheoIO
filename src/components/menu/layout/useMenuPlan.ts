/**
 * Read the viewport and keep a `MenuPlan` in sync with it.
 *
 * The plan itself is pure (`fit.ts`); this hook only supplies the width and
 * height. Keeping the subscription here rather than in StartScreen means the
 * layout decision stays testable and the component stays a renderer.
 *
 * Notes on the implementation:
 *
 *   - `visualViewport` is preferred when available. On mobile browsers
 *     `window.innerHeight` includes the URL bar that slides away, so a plan
 *     computed from it changes as the user scrolls — which is one of the ways
 *     a layout appears to "jump" on its own.
 *   - Updates are coalesced into an animation frame. A resize drag fires
 *     dozens of events per second and re-planning on each one is wasted work.
 *   - The initial value is computed synchronously from `window` on the client
 *     so the first paint is already correct (no flash from a default plan).
 *     On the server there is no `window`, so it falls back to the 1280×720
 *     reference plan — which is what the SSR smoke test renders.
 */
import { useEffect, useState } from "react";
import { planMenuLayout } from "./fit";
import type { MenuPlan, Viewport } from "./fit";
import { onViewportChange } from "./viewportEvents";

/** The viewport the SSR smoke test and the fallback path use. */
export const REFERENCE_VIEWPORT: Viewport = { width: 1280, height: 720 };

function readViewport(): Viewport {
  if (typeof window === "undefined") return REFERENCE_VIEWPORT;
  const vv = window.visualViewport;
  return {
    width: Math.round(vv?.width ?? window.innerWidth),
    height: Math.round(vv?.height ?? window.innerHeight),
  };
}

/** The current viewport width — the same value the plan was computed from. */
export function useViewportWidth(): number {
  const [width, setWidth] = useState<number>(() => readViewport().width);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setWidth(readViewport().width));
    };
    const unsubscribe = onViewportChange(update);
    return () => {
      cancelAnimationFrame(frame);
      unsubscribe();
    };
  }, []);
  return width;
}

/** The current plan for the current viewport. */
export function useMenuPlan(): MenuPlan {
  const [plan, setPlan] = useState<MenuPlan>(() => planMenuLayout(readViewport()));

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setPlan(planMenuLayout(readViewport()));
      });
    };
    update();
    /*
     * One subscription, covering resize, orientationchange, fullscreenchange
     * and visualViewport resize — see `viewportEvents.ts` for why fullscreen
     * had to be added in round 6 (it is how the user produced the two
     * screenshots that started it).
     */
    const unsubscribe = onViewportChange(update);
    return () => {
      cancelAnimationFrame(frame);
      unsubscribe();
    };
  }, []);

  return plan;
}
