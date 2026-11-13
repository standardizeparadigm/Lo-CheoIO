/**
 * Compact segmented control — used for discrete 2-way choices
 * (shake level · visual quality). Keyboard: buttons are native <button>.
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
      >
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={active}
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
