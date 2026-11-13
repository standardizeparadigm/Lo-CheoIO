/**
 * Switch — the on/off switch used by Settings.
 *
 * Split out of the monolithic `components/ui.tsx` in v1.1.7: one primitive
 * per file so a change to, say, the modal shell cannot touch the scoreboard.
 */


export function Switch({
  checked,
  onChange,
  label,
  desc,
  id,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  desc?: string;
  id: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 border-2 border-jade-800 bg-jade-900/50 px-3 py-2 text-left transition-colors hover:border-jade-600"
    >
      <span className="min-w-0">
        <span className="block font-body text-[11px] font-extrabold tracking-[0.14em] text-clay-100 uppercase">{label}</span>
        {desc && <span className="mt-0.5 block font-body text-[10px] leading-snug text-clay-100/55">{desc}</span>}
      </span>
      <span
        aria-hidden="true"
        className={`relative h-6 w-11 shrink-0 border-2 border-jade-700 transition-colors duration-200 ${
          checked ? "bg-brine-500/90" : "bg-jade-950"
        }`}
      >
        <span
          className={`absolute top-[2px] h-4 w-4 bg-jade-950 shadow-[1px_1px_0_rgba(0,0,0,0.4)] transition-transform duration-200 ${
            checked ? "translate-x-[22px]" : "translate-x-[2px]"
          } ${checked ? "bg-jade-950" : "bg-jade-600"}`}
        />
      </span>
    </button>
  );
}
