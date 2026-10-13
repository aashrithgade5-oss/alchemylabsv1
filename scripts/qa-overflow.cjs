// Mobile width audit (Patches-8): every route on three iPhone sizes must have
// scrollWidth == clientWidth. Usage: start the site (next start -p 3100), then
//   node scripts/qa-overflow.cjs [baseUrl]
// Needs Playwright: npm i -D playwright (or set PLAYWRIGHT_PATH to an install).
const { chromium, devices } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const BASE = process.argv[2] || 'http://localhost:3100';
const EXE = process.env.CHROMIUM_PATH;
const routes = ['/', '/work', '/services', '/services/studio/campaign-sprint', '/about', '/contact', '/pay', '/journal', '/aashrith', '/eva', '/privacy', '/this-page-does-not-exist'];
(async () => {
  const b = await chromium.launch(EXE ? { executablePath: EXE } : {});
  for (const dev of ['iPhone SE', 'iPhone 13', 'iPhone 15 Pro Max']) {
    const ctx = await b.newContext({ ...devices[dev] });
    const p = await ctx.newPage();
    for (const r of routes) {
      await p.goto(BASE + r, { waitUntil: 'networkidle' }).catch(() => {});
      await p.waitForTimeout(1200);
      // walk the page so scroll-mounted content exists
      const H = await p.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < H; y += 700) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(40); }
      await p.waitForTimeout(600);
      const res = await p.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const sw = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
        const offenders = [];
        if (sw > vw) {
          for (const el of document.querySelectorAll('body *')) {
            const r = el.getBoundingClientRect();
            if (r.width === 0) continue;
            if (r.right > vw + 1 || r.left < -1) {
              // only report if no ancestor clips overflow-x
              let a = el.parentElement, clipped = false;
              while (a && a !== document.body) { const cs = getComputedStyle(a); if (cs.overflowX !== 'visible') { clipped = true; break; } a = a.parentElement; }
              if (!clipped) offenders.push(`${el.tagName.toLowerCase()}.${(el.className && el.className.baseVal === undefined ? el.className : '').toString().slice(0, 70)} r=${Math.round(r.right)} l=${Math.round(r.left)}`);
            }
          }
        }
        return { vw, sw, offenders: offenders.slice(0, 6) };
      });
      if (res.sw > res.vw) process.exitCode = 1;
      console.log(dev, r, res.sw > res.vw ? `OVERFLOW ${res.sw}>${res.vw}` : 'ok', res.offenders.join(' | '));
    }
    await ctx.close();
  }
  await b.close();
  if (process.exitCode) console.log('FAIL: horizontal overflow found');
})();
