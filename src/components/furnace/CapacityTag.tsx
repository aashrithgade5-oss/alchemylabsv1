// Build-time capacity line. The month is stamped when the site builds,
// which is honest enough for a static deploy that ships every few weeks.
const MONTHS = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
];

export function CapacityTag({ className = '' }: { className?: string }) {
  const month = MONTHS[new Date().getMonth()];
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.25em] text-ash ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
      </span>
      TAKING 3 PROJECTS · {month}
    </span>
  );
}
