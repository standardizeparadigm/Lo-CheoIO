/**
 * Compact segmented control — used for discrete 2-way choices
 * (shake level · visual quality). Keyboard: native <button>s plus
 * ←/→/Home/End roving behaviour inside the group (v1.1.6 a11y pass).
 */
export default function SegmentedControl<T extends string>({
  id,
  label,
  desc,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  desc?: string;
  value: T;
  options: readonly { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  const idx = options.findIndex((o) => o.value === value);

  const move = (delta: number) => {
    const next = (idx + delta + options.length) % options.length;
    const target = options[next];
    if (!target) return;
    onChange(target.value);
    // focus follows selection so the next arrow press keeps working
    requestAnimationFrame(() => {
      document.getElementById(`${id}-opt-${target.value}`)?.focus();
    });
  };

  return (
    <div className="flex w-full items-center justify-between gap-3 border-2 border-jade-800 bg-jade-900/50 px-3 py-2">
      <span className="min-w-0">
        <span id={`${id}-label`} className="block font-body text-[11px] font-extrabold tracking-[0.14em] text-clay-100 uppercase">
          {label}
        </span>
        {desc && <span className="mt-0.5 block font-body text-[10px] leading-snug text-clay-100/55">{desc}</span>}
      </span>
      <div
        role="group"
        aria-labelledby={`${id}-label`}
        className="flex shrink-0 border-2 border-jade-700"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            move(1);
          } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            move(-1);
          } else if (e.key === "Home") {
            e.preventDefault();
            const first = options[0];
            if (first) onChange(first.value);
          } else if (e.key === "End") {
            e.preventDefault();
            const last = options[options.length - 1];
            if (last) onChange(last.value);
          }
        }}
      >
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              id={`${id}-opt-${opt.value}`}
              type="button"
              aria-pressed={active}
              tabIndex={active ? 0 : -1}
              onClick={() => onChange(opt.value)}
              className={`press h-8 min-w-14 px-2 font-display text-[10px] tracking-[0.14em] uppercase transition-colors ${
                active ? "bg-tumeric-500 text-jade-950" : "text-clay-100/70 hover:bg-jade-800 hover:text-clay-100"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
