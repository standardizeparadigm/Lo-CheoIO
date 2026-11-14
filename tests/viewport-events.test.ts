/**
 * The viewport subscription: every event that can change the layout.
 *
 * The bug behind this file is not subtle. The app re-planned on `resize` and
 * `orientationchange`. A fullscreen toggle on Firefox does not fire `resize`;
 * on Safari's prefixed API it fires `webkitfullscreenchange` and nothing else.
 * So the window changed height, the hero kept its old plan, and the result was
 * the pair of round-6 screenshots — same width, 260px apart in height, one with
 * the mode chip cut in half.
 *
 * NO JSDOM
 * --------
 * This project has no DOM test environment and adding one for a single file
 * would mean a 40MB dependency and a second test runtime. `onViewportChange`
 * only touches five methods on `window`, so the test installs a stub with
 * those five and records the calls. That also makes the assertions exact:
 * no jsdom listeners polluting the "was it removed" set.
 */
import { afterEach, describe, expect, it } from "vitest";
import { VIEWPORT_EVENTS, onViewportChange } from "../src/components/menu/layout/viewportEvents";

/** A window stub that records subscriptions. */
function stubWindow({ withVisualViewport = false } = {}) {
  const added: string[] = [];
  const removed: string[] = [];
  const handlers = new Map<string, Set<() => void>>();

  const record = (list: string[]) => (type: string, fn: () => void) => {
    list.push(type);
    if (list === added) {
      if (!handlers.has(type)) handlers.set(type, new Set());
      handlers.get(type)!.add(fn);
    } else {
      handlers.get(type)?.delete(fn);
    }
  };

  const win = {
    addEventListener: record(added),
    removeEventListener: record(removed),
    dispatch: (type: string) => {
      for (const fn of handlers.get(type) ?? []) fn();
    },
  };

  const vv = withVisualViewport
    ? { addEventListener: record(added), removeEventListener: record(removed) }
    : undefined;

  return {
    win: vv ? Object.assign(win, { visualViewport: vv }) : win,
    vv,
    added,
    removed,
    dispatch: win.dispatch,
  };
}

const originalWindow = (globalThis as { window?: unknown }).window;

function install(stub: ReturnType<typeof stubWindow>) {
  (globalThis as { window?: unknown }).window = stub.win;
}

afterEach(() => {
  if (originalWindow === undefined) {
    delete (globalThis as { window?: unknown }).window;
  } else {
    (globalThis as { window?: unknown }).window = originalWindow;
  }
});

describe("VIEWPORT_EVENTS", () => {
  it("includes resize and orientationchange, the two that always existed", () => {
    expect(VIEWPORT_EVENTS).toContain("resize");
    expect(VIEWPORT_EVENTS).toContain("orientationchange");
  });

  it("includes fullscreenchange — the round-6 regression", () => {
    expect(VIEWPORT_EVENTS).toContain("fullscreenchange");
  });

  it("includes the vendor prefixes that older Safari and Firefox still emit", () => {
    expect(VIEWPORT_EVENTS).toContain("webkitfullscreenchange");
    expect(VIEWPORT_EVENTS).toContain("mozfullscreenchange");
    expect(VIEWPORT_EVENTS).toContain("MSFullscreenChange");
  });

  it("lists each event once", () => {
    expect(new Set(VIEWPORT_EVENTS).size).toBe(VIEWPORT_EVENTS.length);
  });
});

describe("onViewportChange", () => {
  it("subscribes to every event in the list", () => {
    const stub = stubWindow();
    install(stub);
    const off = onViewportChange(() => {});
    for (const type of VIEWPORT_EVENTS) {
      expect(stub.added, `not subscribed to ${type}`).toContain(type);
    }
    off();
  });

  it("subscribes to visualViewport when the browser has one", () => {
    const stub = stubWindow({ withVisualViewport: true });
    install(stub);
    const off = onViewportChange(() => {});
    // Once per window event plus once on the visual viewport.
    expect(stub.added.filter((t) => t === "resize")).toHaveLength(2);
    off();
    expect(stub.removed.filter((t) => t === "resize")).toHaveLength(2);
  });

  it("unsubscribes from exactly what it subscribed to", () => {
    const stub = stubWindow({ withVisualViewport: true });
    install(stub);
    const off = onViewportChange(() => {});
    off();
    expect([...stub.removed].sort()).toEqual([...stub.added].sort());
  });

  it("calls the handler when a fullscreen change fires", () => {
    const stub = stubWindow();
    install(stub);
    let calls = 0;
    const off = onViewportChange(() => {
      calls += 1;
    });
    stub.dispatch("fullscreenchange");
    stub.dispatch("webkitfullscreenchange");
    expect(calls).toBe(2);
    off();
  });

  it("stops calling the handler after unsubscribe", () => {
    const stub = stubWindow();
    install(stub);
    let calls = 0;
    const off = onViewportChange(() => {
      calls += 1;
    });
    off();
    stub.dispatch("resize");
    stub.dispatch("fullscreenchange");
    expect(calls).toBe(0);
  });

  it("returns a no-op teardown when there is no window", () => {
    // The SSR path: `onViewportChange` must not throw during renderToString.
    delete (globalThis as { window?: unknown }).window;
    const off = onViewportChange(() => {});
    expect(typeof off).toBe("function");
    expect(() => off()).not.toThrow();
  });
});
