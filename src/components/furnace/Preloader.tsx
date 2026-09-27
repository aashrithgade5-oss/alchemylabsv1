import { PreloaderController } from './PreloaderController';

// Runs during HTML parse, before first paint: decides whether the opening
// sequence plays. Only the homepage, only the first visit per session, never
// under reduced motion. It sets a data attribute instead of removing the node
// so hydration still finds the markup React rendered.
const GATE = `(function(){var d=document.documentElement,s='skip';try{var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(location.pathname==='/'&&!r&&!sessionStorage.getItem('al-pl')){sessionStorage.setItem('al-pl','1');s='run';}}catch(e){}d.setAttribute('data-pl',s);})();`;

/**
 * Opening sequence, server-rendered so it is the FIRST frame the browser
 * paints (the old client-only loader mounted after hydration, so Safari
 * showed the hero, then its own URL-bar progress line, then nothing).
 * The atom mark sits as a faint outline, fills bottom-up with brushed metal
 * while a hairline ring closes, then an aperture opens from the mark and the
 * hero settles forward out of depth. CSS failsafe hides it at 7s even if
 * JavaScript never arrives.
 */
export function Preloader() {
  return (
    <>
      <div id="al-preloader" className="al-pl" aria-hidden>
        {/* the void is its own layer: the aperture masks it, never the mark */}
        <div className="al-pl-void">
          <div className="al-pl-glow" />
        </div>
        <div className="al-pl-stage">
          <div className="al-pl-mark al-pl-outline" />
          <div className="al-pl-fillclip">
            <div className="al-pl-mark al-pl-metal" />
            <div id="al-pl-shader" className="absolute inset-0" />
          </div>
          <svg className="al-pl-ring" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" pathLength={100} className="al-pl-ring-track" />
            <circle cx="50" cy="50" r="48" pathLength={100} className="al-pl-ring-fill" />
          </svg>
        </div>
        <div className="al-pl-caption">
          <p className="font-playfair text-[1.35rem] italic leading-none text-bone">
            Alchemy{' '}
            <span className="font-mono text-[9px] not-italic tracking-[0.35em] text-bone/60">LABS</span>
          </p>
          <p className="mt-4 font-mono text-[10px] tracking-[0.3em] text-ember tabular-nums">
            <span id="al-pl-count">0</span>%
          </p>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: GATE }} />
      <PreloaderController />
    </>
  );
}
