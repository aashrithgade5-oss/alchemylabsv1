// Phase 2 (Landing_Page_Patches.pdf): "FIXED SCOPE · FIXED PRICE" replaces
// the "taking N projects" framing — less disclosed, reads as scarcity/status
// rather than a literal headcount that needs updating every sprint.
export function CapacityTag({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.25em] text-ash ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
      </span>
      FIXED SCOPE · FIXED PRICE
    </span>
  );
}
