import { JarLogo } from "../../ui";

/** The menu's decorative centerpiece. Controls live in the GAME panel. */
export default function MenuHero() {
  return (
    <div className="menu-hero anim-pop">
      <h1 className="menu-wordmark font-display select-none" aria-label="LỌ CHÉO">
        <span className="menu-wordmark-top">LỌ</span>
        <span className="menu-wordmark-bottom text-shimmer">CHÉO</span>
      </h1>
      <div className="menu-mascot" aria-hidden="true">
        <div className="menu-orbits anim-spin-slow">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(245,168,28,0.45)" strokeWidth="1.4" strokeDasharray="3 9" />
            <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(182,224,122,0.35)" strokeWidth="1" strokeDasharray="1 6" />
          </svg>
        </div>
        <span className="glow-ring pointer-events-none absolute inset-0" />
        <JarLogo className="anim-bob anim-breathe jar-glow relative h-[55%] w-auto" mood="happy" />
      </div>
    </div>
  );
}
