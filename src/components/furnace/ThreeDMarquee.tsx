import Image from 'next/image';

// R-7e: contained 3D marquee band (Landing + Work bottoms only — never full
// viewport). Pure CSS perspective/transform (.marquee3d-col, index.css) — no
// WebGL, no Aceternity install, no new dependency. Populated with real
// Work-page imagery, not placeholders. Server-renderable: no hooks, no
// randomness; reduced motion stops the columns via the CSS media query.
const COLUMNS: string[][] = [
  ['/assets/aether-bento.png', '/media/cinematic-still-1.png', '/assets/oakley-bento.png'],
  ['/assets/genesis-bento.png', '/media/cinematic-still-2.png', '/assets/sequentian-5.png'],
  ['/assets/dior-bento.png', '/media/cinematic-still-3.png', '/assets/aether-bento.png'],
  ['/assets/oakley-bento.png', '/assets/thought-leadership-1.png', '/assets/genesis-bento.png'],
];

export function ThreeDMarquee() {
  return (
    <section
      aria-hidden
      className="relative h-[320px] overflow-hidden border-y border-line bg-void md:h-[400px]"
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Orthographic (no perspective): with a 900px perspective the huge
            plane projected thousands of px off-canvas (browser-verified empty
            band). Plain rotateX/rotateZ on an absolute-centered oversized
            plane is affine — it always covers the band. */}
        <div
          className="absolute left-1/2 top-1/2 grid w-[2800px] grid-cols-4 gap-4"
          style={{ transform: 'translate(-50%, -50%) rotateX(55deg) rotateZ(-30deg)' }}
        >
          {COLUMNS.map((column, i) => (
            <div
              key={i}
              className="marquee3d-col flex flex-col gap-4"
              data-dir={i % 2 === 1 ? 'down' : undefined}
              style={{ animationDuration: `${36 + i * 7}s` }}
            >
              {/* list duplicated once so the -50% translate loops seamlessly */}
              {[...column, ...column].map((src, j) => (
                <Image
                  key={`${src}-${j}`}
                  src={src}
                  alt=""
                  width={640}
                  height={427}
                  className="aspect-[3/2] w-full rounded-2xl border border-white/10 object-cover"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* edge treatment: void fades top/bottom, warm ember/bone accents on the
          horizontal edges per tokens */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,9,8,0.95) 0%, transparent 22%, transparent 78%, rgba(10,9,8,0.95) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(255,77,28,0.10) 0%, transparent 18%, transparent 82%, rgba(237,230,221,0.06) 100%)',
        }}
      />
    </section>
  );
}
