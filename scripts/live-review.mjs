#!/usr/bin/env node
// Live review on your own machine (Windows, Mac or Linux). Runs the site on
// http://localhost:3000 (or the next free port), opens the /review hub, and
// pulls new commits from the review branch every 30s. Next.js hot-reloads, so
// changes show up in the open tab without restarting anything.
import { execSync, spawn } from 'node:child_process';
import { existsSync, rmSync, readFileSync } from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(root);
const BRANCH = process.argv[2] || 'claude/youthful-thompson-2dy1hj';
const win = process.platform === 'win32';

const run = (cmd, opts = {}) => execSync(cmd, { stdio: 'pipe', ...opts }).toString().trim();
const loud = (m) => console.log(`[live-review] ${m}`);

const nodeMajor = Number(process.versions.node.split('.')[0]);
if (nodeMajor < 18) {
  console.error(`Node ${process.versions.node} found; this site needs Node 18 or newer (22 recommended): https://nodejs.org`);
  process.exit(1);
}
try {
  run('git --version');
} catch {
  console.error('Git is not installed: https://git-scm.com/downloads');
  process.exit(1);
}

loud(`updating to the latest ${BRANCH}`);
run(`git fetch -q origin ${BRANCH}`);
run(`git checkout -q ${BRANCH}`);
run(`git pull -q --ff-only origin ${BRANCH}`);

if (!existsSync(path.join(root, 'node_modules'))) {
  loud('installing dependencies (a minute or two, once)');
  execSync('npm install --no-audit --no-fund', { stdio: 'inherit' });
}

const lockHash = () => {
  try {
    return run('git rev-parse HEAD:package-lock.json');
  } catch {
    return 'none';
  }
};
let LOCK = lockHash();

const portFree = (port) =>
  new Promise((resolve) => {
    const s = net.createServer();
    s.once('error', () => resolve(false));
    s.listen(port, () => s.close(() => resolve(true)));
  });

const WANT = Number(process.env.PORT) || 3000;
let PORT = WANT;
while (!(await portFree(PORT))) PORT += 1;

// an old server on the port is the #1 reason a review shows a stale site
if (PORT !== WANT) {
  console.log('');
  console.log(`  !! Port ${WANT} is busy with another server (probably an OLD copy of the site).`);
  console.log(`  !! This review runs on http://localhost:${PORT} instead. Do not use localhost:${WANT}.`);
  console.log('');
}

rmSync(path.join(root, '.next'), { recursive: true, force: true }); // never serve a cached older build
loud(`running commit ${run('git log -1 --format="%h  %s"')}`);

// background puller: fast-forward only, never touches your own edits
const puller = setInterval(() => {
  try {
    run(`git fetch -q origin ${BRANCH}`);
    if (run('git rev-parse HEAD') !== run(`git rev-parse origin/${BRANCH}`)) {
      run(`git pull -q --ff-only origin ${BRANCH}`);
      loud(`updated to ${run('git log -1 --format="%h %s"')}`);
      const next = lockHash();
      if (next !== LOCK) {
        loud('dependencies changed: installing (the page reloads when done)');
        execSync('npm install --no-audit --no-fund', { stdio: 'ignore' });
        LOCK = next;
      }
    }
  } catch {
    /* offline or mid-pull: try again in 30s */
  }
}, 30_000);

const url = `http://localhost:${PORT}/review`;
loud(`open ${url}  (Ctrl+C to stop)`);

// open the review hub once the server answers
const opener = setInterval(async () => {
  try {
    const res = await fetch(url);
    if (res.status === 200) {
      clearInterval(opener);
      const cmd = win ? `cmd /c start "" "${url}"` : process.platform === 'darwin' ? `open "${url}"` : `xdg-open "${url}"`;
      try {
        execSync(cmd, { stdio: 'ignore' });
      } catch {
        loud(`could not open a browser automatically: go to ${url}`);
      }
    }
  } catch {
    /* server still starting */
  }
}, 2000);

const server = spawn(`npx next dev -p ${PORT}`, { stdio: 'inherit', shell: true });
const stop = () => {
  clearInterval(puller);
  clearInterval(opener);
  server.kill();
  process.exit(0);
};
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
server.on('exit', (code) => {
  clearInterval(puller);
  clearInterval(opener);
  process.exit(code ?? 0);
});
