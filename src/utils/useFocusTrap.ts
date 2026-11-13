import { useEffect, type RefObject } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

/**
 * Modal focus containment (v1.1.6 a11y pass).
 *
 * Before this hook, Tab could walk out of an open modal into the canvas and
 * the corner panels behind it — screen-reader users lost the dialog. The hook:
 *   1. remembers the element that had focus,
 *   2. moves focus inside the container on mount,
 *   3. wraps Tab / Shift+Tab around the container,
 *   4. restores the previous focus on unmount.
 *
 * It is intentionally dependency-free (no focus-trap package) and inert on
 * the server: without a DOM it just returns.
 */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active = true) {
  useEffect(() => {
    if (!active) return;
    const container = ref.current;
    if (!container) return;

    const previous = (typeof document !== "undefined" ? document.activeElement : null) as HTMLElement | null;

    const nodes = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );

    // move focus in — first control, or the container itself
    const first = nodes()[0] ?? container;
    first.focus?.({ preventScroll: true });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const list = nodes();
      if (list.length === 0) {
        e.preventDefault();
        return;
      }
      const firstEl = list[0];
      const lastEl = list[list.length - 1];
      const current = document.activeElement;
      if (!e.shiftKey && current === lastEl) {
        e.preventDefault();
        firstEl.focus();
      } else if (e.shiftKey && (current === firstEl || current === container)) {
        e.preventDefault();
        lastEl.focus();
      }
    };

    container.addEventListener("keydown", onKeyDown);
    return () => {
      container.removeEventListener("keydown", onKeyDown);
      previous?.focus?.({ preventScroll: true });
    };
  }, [ref, active]);
}
