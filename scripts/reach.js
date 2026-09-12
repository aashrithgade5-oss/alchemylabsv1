// Dead-file audit: walks the import graph from every file under app/ and
// reports src/ files nothing reachable ever imports.
const fs = require('fs');
const path = require('path');
const root = process.cwd();
const seen = new Set();

function resolve(spec, from) {
  let p;
  if (spec.startsWith('@/')) p = path.join(root, 'src', spec.slice(2));
  else if (spec.startsWith('.')) p = path.resolve(path.dirname(from), spec);
  else return null;
  const cands = [p + '.tsx', p + '.ts', path.join(p, 'index.tsx'), path.join(p, 'index.ts'), p];
  for (const c of cands) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return null;
}

function walk(f) {
  if (seen.has(f)) return;
  seen.add(f);
  let src;
  try {
    src = fs.readFileSync(f, 'utf8');
  } catch {
    return;
  }
  const re = /(?:from\s*|import\s*\(\s*)['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(src))) {
    const r = resolve(m[1], f);
    if (r) walk(r);
  }
}

function all(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) all(p, out);
    else if (/\.(tsx|ts)$/.test(e.name)) out.push(p);
  }
  return out;
}

all(path.join(root, 'app')).forEach(walk);
const dead = all(path.join(root, 'src')).filter((f) => !seen.has(f));
const rel = (f) => path.relative(root, f).split(path.sep).join('/');
console.log('REACHABLE from app/: ' + seen.size);
console.log('\n=== UNREACHABLE src files (' + dead.length + ') ===');
dead.map(rel).sort().forEach((f) => console.log(f));
