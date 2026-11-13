import { MENU_BACKGROUND_LAYERS } from "./layers";

/**
 * The menu backdrop (v1.1.7) — a thin renderer over {@link MENU_BACKGROUND_LAYERS}.
 *
 * Extracted from StartScreen so the scene can be reasoned about on its own:
 * the component holds no state, subscribes to nothing, and renders exactly the
 * layers it is told about. `aria-hidden` + `pointer-events-none` on every node
 * keeps it out of the accessibility tree and out of the click path.
 */
export default function MenuBackground() {
  return (
    <>
      {MENU_BACKGROUND_LAYERS.map((layer) => (
        <div
          key={layer.id}
          aria-hidden="true"
          data-layer={layer.id}
          className={`${layer.className} ${layer.layout ?? ""} pointer-events-none ${layer.opacity ?? ""}`.replace(/\s+/g, " ").trim()}
        />
      ))}
    </>
  );
}
