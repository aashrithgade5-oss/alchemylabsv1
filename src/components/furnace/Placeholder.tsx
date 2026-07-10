// Honest placeholder: carbon ground, hairline border, a DM Mono spec label
// naming exactly what asset belongs here, ember corner mark.
interface PlaceholderProps {
  /** Spec label, e.g. "PORTRAIT · ASH · 4:5 · ≥1200px" */
  label: string;
  className?: string;
}

export function Placeholder({ label, className = '' }: PlaceholderProps) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden border border-line bg-carbon ${className}`}
    >
      <span aria-hidden className="absolute left-0 top-0 h-3 w-px bg-ember" />
      <span aria-hidden className="absolute left-0 top-0 h-px w-3 bg-ember" />
      <span className="px-6 text-center font-dmmono text-[10px] tracking-[0.2em] text-ash">
        {label}
      </span>
    </div>
  );
}
