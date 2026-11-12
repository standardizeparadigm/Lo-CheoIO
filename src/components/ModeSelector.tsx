import { MODE_LIST, type ModeId } from "../game/modes";

/** Icons per mode so the three cards read at a glance. */
function ModeGlyph({ id, className }: { id: ModeId; className?: string }) {
  if (id === "zen") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 19c0-8 6-13 14-13 0 9-6 14-14 13z" fill="currentColor" fillOpacity="0.18" />
        <path d="M5 19c4-6 9-9 14-10" />
      </svg>
    );
  }
  if (id === "inferno") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2c1 4-3 5-3 9a4 4 0 008 0c0-1.5-.5-2.5-1.5-4-.5 1-1.2 1.6-2.5 2 .8-2.3.3-5-1-7z" fill="currentColor" fillOpacity="0.22" />
        <path d="M8 14a4 4 0 110 0" opacity="0" />
        <path d="M7 15a5 5 0 0010 0" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 3h6M9.5 3v3.5C7 8.5 6 11 6 13.5 6 17.6 8.6 20 12 20s6-2.4 6-6.5C18 11 17 8.5 14.5 6.5V3" fill="currentColor" fillOpacity="0.18" />
      <path d="M9.5 10h5" />
    </svg>
  );
}

export default function ModeSelector({
  mode,
  onChange,
}: {
  mode: ModeId;
  onChange: (m: ModeId) => void;
}) {
  return (
    <fieldset className="anim-slide">
      <legend className="sr-only">Chọn chế độ chơi</legend>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="font-body text-[10px] font-extrabold tracking-[0.3em] text-jade-500 uppercase">
          Chọn chế độ
        </span>
        <span className="font-body text-[9px] font-bold tracking-[0.18em] text-jade-600 uppercase">
          đổi được trước mỗi ván
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {MODE_LIST.map((m) => {
          const active = m.id === mode;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onChange(m.id)}
              aria-pressed={active}
              style={{ background: m.gradient, ["--mode-accent" as string]: m.accent }}
              className="mode-card group flex min-w-0 flex-col items-center gap-1 px-2 py-2.5 text-center"
              data-active={active}
            >
              <ModeGlyph
                id={m.id}
                className="h-6 w-6 shrink-0 transition-transform duration-200 group-hover:scale-110"
              />
              <span
                className="font-display text-[10px] leading-tight tracking-[0.08em] sm:text-[11px]"
                style={{ color: m.accent }}
              >
                {m.name}
              </span>
              <span className="hidden font-body text-[9px] leading-snug text-clay-100/60 min-[420px]:block">
                {m.tagline}
              </span>
              <span
                className="mt-auto inline-block border px-1.5 py-0.5 font-display text-[8px] tracking-[0.14em]"
                style={{ borderColor: m.accent, color: m.accent }}
              >
                {m.badge}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-1.5 border-l-2 border-jade-800 pl-2 font-body text-[10px] leading-snug text-clay-100/55">
        {MODE_LIST.find((m) => m.id === mode)?.description}
      </p>
    </fieldset>
  );
}
