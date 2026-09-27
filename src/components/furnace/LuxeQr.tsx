import { encode } from 'uqr';

/**
 * Editorial QR: soft-square modules, soft-cornered finder eyes, and the atom
 * seal in the center. ECC level H (30% redundancy) carries the seal: the
 * cleared center stays well under that budget, so every UPI app still reads
 * it. Dark-on-bone on purpose: inverted codes fail in several Android
 * scanners. Pure SVG, no runtime cost beyond the encode.
 */
export function LuxeQr({ value, label, className = '' }: { value: string; label: string; className?: string }) {
  const { size, data } = encode(value, { ecc: 'H', border: 0 });
  const quiet = 3;
  const full = size + quiet * 2;
  // centered clearing for the seal: ~17% of the symbol width
  const hole = Math.floor(size * 0.17) | 1;
  const h0 = Math.floor((size - hole) / 2);
  const h1 = h0 + hole;

  const inFinder = (x: number, y: number) =>
    (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7);
  const inHole = (x: number, y: number) => x >= h0 && x < h1 && y >= h0 && y < h1;

  const dots: JSX.Element[] = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!data[y][x] || inFinder(x, y) || inHole(x, y)) continue;
      // soft squares that touch their neighbours: round dots left white
      // gaps that broke decoding on high-DPR screens (tested on 5 devices)
      dots.push(<rect key={`${x}-${y}`} x={x + quiet} y={y + quiet} width={1.02} height={1.02} rx={0.3} />);
    }
  }

  const eye = (ex: number, ey: number) => (
    <g key={`${ex}-${ey}`}>
      <rect x={ex + quiet + 0.5} y={ey + quiet + 0.5} width={6} height={6} rx={1.9} fill="none" stroke="currentColor" strokeWidth={1} />
      <rect x={ex + quiet + 2} y={ey + quiet + 2} width={3} height={3} rx={0.9} />
    </g>
  );

  const c = full / 2;
  const sealR = (hole / 2) * 0.92;

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 ${full} ${full}`}
      className={className}
      shapeRendering="geometricPrecision"
    >
      <rect width={full} height={full} fill="#EDE6DD" />
      <g fill="#0A0908" color="#0A0908">
        {dots}
        {eye(0, 0)}
        {eye(size - 7, 0)}
        {eye(0, size - 7)}
      </g>
      {/* the seal: void disc, ember hairline, the atom in bone */}
      <circle cx={c} cy={c} r={sealR} fill="#0A0908" />
      <circle cx={c} cy={c} r={sealR - 0.35} fill="none" stroke="#FF4D1C" strokeWidth={0.18} />
      <image
        href="/media/alchemy-minimal-logo.png"
        x={c - sealR * 1.25}
        y={c - sealR * 1.25}
        width={sealR * 2.5}
        height={sealR * 2.5}
      />
    </svg>
  );
}
