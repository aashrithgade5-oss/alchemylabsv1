import type { SVGProps } from 'react';

/**
 * Alchemy glyphs (Patches-6): the brand's own icon set, drawn from the atom.
 * Every glyph is built from the same three parts: an orbit (ellipse rx/ry
 * 4:9, the mark's proportion), a nucleus (r 1.6) and straight hairlines.
 * 24px grid, 1.4 stroke, currentColor, so they sit beside Geist Mono labels
 * and inherit ember/bone from their parent.
 */
type P = SVGProps<SVGSVGElement> & { size?: number };

function Glyph({ size = 24, children, ...rest }: P & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {children}
    </svg>
  );
}

/** the mark itself: three orbits + nucleus */
export const GlyphAtom = (p: P) => (
  <Glyph {...p}>
    <ellipse cx="12" cy="12" rx="4" ry="9.5" />
    <ellipse cx="12" cy="12" rx="4" ry="9.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="4" ry="9.5" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="1.6" />
  </Glyph>
);

/** a call: one orbit around a nucleus, with the time hand */
export const GlyphCall = (p: P) => (
  <Glyph {...p}>
    <circle cx="12" cy="12" r="9" />
    <ellipse cx="12" cy="12" rx="3.6" ry="9" transform="rotate(-35 12 12)" opacity="0.45" />
    <path d="M12 7v5l3 2" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
  </Glyph>
);

/** a brief: a sheet crossed by an orbit */
export const GlyphBrief = (p: P) => (
  <Glyph {...p}>
    <path d="M6.5 3h8l3 3v15h-11z" />
    <path d="M14.5 3v3h3" />
    <path d="M9 11h6M9 14h6M9 17h3.5" />
    <ellipse cx="12" cy="13" rx="3" ry="10" transform="rotate(58 12 13)" opacity="0.4" />
  </Glyph>
);

/** a message: the orbit becomes a speech form, the nucleus its voice */
export const GlyphMessage = (p: P) => (
  <Glyph {...p}>
    <path d="M20.5 11.5c0 4.4-3.8 7.5-8.5 7.5-1.2 0-2.3-.2-3.3-.5L4 20l1.3-3.7C4.2 15 3.5 13.3 3.5 11.5 3.5 7.1 7.3 4 12 4s8.5 3.1 8.5 7.5z" />
    <circle cx="8.6" cy="11.5" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="12" cy="11.5" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="15.4" cy="11.5" r="0.9" fill="currentColor" stroke="none" />
  </Glyph>
);

/** the audit: a lens over an orbit */
export const GlyphAudit = (p: P) => (
  <Glyph {...p}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.4 15.4L20.5 20.5" />
    <ellipse cx="10.5" cy="10.5" rx="2.4" ry="5.2" transform="rotate(35 10.5 10.5)" opacity="0.5" />
    <circle cx="10.5" cy="10.5" r="1.3" fill="currentColor" stroke="none" />
  </Glyph>
);

/** scope: one orbit, measured (ticks on the major axis) */
export const GlyphScope = (p: P) => (
  <Glyph {...p}>
    <ellipse cx="12" cy="12" rx="4" ry="9.5" transform="rotate(45 12 12)" />
    <path d="M3 21l3-3M18 6l3-3" />
    <path d="M7.5 12h9M12 7.5v9" opacity="0.4" />
    <circle cx="12" cy="12" r="1.6" />
  </Glyph>
);

/** build: two orbits locking, a third arriving */
export const GlyphBuild = (p: P) => (
  <Glyph {...p}>
    <ellipse cx="12" cy="12" rx="4" ry="9.5" />
    <ellipse cx="12" cy="12" rx="4" ry="9.5" transform="rotate(60 12 12)" />
    <path d="M6.2 18.1A9.5 4 120 0 1 4.8 9" strokeDasharray="1.6 2.2" />
    <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
  </Glyph>
);

/** NDA: a shield holding the nucleus */
export const GlyphShield = (p: P) => (
  <Glyph {...p}>
    <path d="M12 3l7 2.8v5.6c0 4.4-2.9 8-7 9.6-4.1-1.6-7-5.2-7-9.6V5.8z" />
    <ellipse cx="12" cy="11.5" rx="2.3" ry="5" opacity="0.5" />
    <circle cx="12" cy="11.5" r="1.3" fill="currentColor" stroke="none" />
  </Glyph>
);

/** worldwide: a sphere, its meridian an orbit */
export const GlyphGlobe = (p: P) => (
  <Glyph {...p}>
    <circle cx="12" cy="12" r="9" />
    <ellipse cx="12" cy="12" rx="4" ry="9" />
    <path d="M3 12h18" opacity="0.5" />
  </Glyph>
);

/** an arrow that leaves along an orbit */
export const GlyphArrow = (p: P) => (
  <Glyph {...p}>
    <path d="M5 19L19 5" />
    <path d="M9 5h10v10" />
  </Glyph>
);
