#!/usr/bin/env bash
# Live review on your own machine: runs the site at http://localhost:3000 and
# pulls new commits from the review branch every 30s. Next.js hot-reloads, so
# changes appear in the open browser tab without restarting anything.
set -e
BRANCH="${1:-claude/youthful-thompson-2dy1hj}"
cd "$(dirname "$0")/.."

need() { command -v "$1" >/dev/null 2>&1 || { echo "Missing: $1. Install it first (see the steps you were given)."; exit 1; }; }
need git; need node; need npm
NODE_MAJOR=$(node -p 'process.versions.node.split(".")[0]')
if [ "$NODE_MAJOR" -lt 18 ]; then echo "Node $NODE_MAJOR found; this site needs Node 18 or newer (20 or 22 recommended)."; exit 1; fi

git fetch -q origin "$BRANCH"
git checkout -q "$BRANCH"
git pull -q --ff-only origin "$BRANCH"
[ -d node_modules ] || npm install --no-audit --no-fund

# An old server on the port is the #1 reason a review shows a stale site.
PORT="${PORT:-3000}"
if command -v lsof >/dev/null 2>&1; then
  OLD=$(lsof -ti tcp:"$PORT" -sTCP:LISTEN 2>/dev/null || true)
  if [ -n "$OLD" ]; then
    echo "[live-review] port $PORT is held by an old server (pid $OLD): stopping it"
    kill $OLD 2>/dev/null || true
    sleep 1
  fi
fi
# still busy (no lsof, or a server we may not stop)? never fall back onto the
# old site: move to the next free port and say so loudly
port_free() { node -e "const s=require('net').createServer();s.once('error',()=>process.exit(1));s.listen($1,()=>s.close(()=>process.exit(0)))"; }
WANT=$PORT
while ! port_free "$PORT"; do PORT=$((PORT + 1)); done
if [ "$PORT" != "$WANT" ]; then
  echo ""
  echo "  !! Port $WANT is busy with another server (probably an OLD copy of the site)."
  echo "  !! This review runs on http://localhost:$PORT instead. Do not use localhost:$WANT."
  echo ""
fi
rm -rf .next   # never serve a cached build from an older copy

echo "[live-review] running commit $(git log -1 --format='%h  %s')"

lock_hash() { git rev-parse HEAD:package-lock.json 2>/dev/null || echo none; }
LOCK=$(lock_hash)

# background puller: fast-forward only, never touches your own edits
(
  while true; do
    sleep 30
    if git fetch -q origin "$BRANCH" 2>/dev/null && [ "$(git rev-parse HEAD)" != "$(git rev-parse "origin/$BRANCH")" ]; then
      if git pull -q --ff-only origin "$BRANCH"; then
        echo "[live-review] updated to $(git log -1 --format='%h %s')"
        NEW=$(lock_hash)
        if [ "$NEW" != "$LOCK" ]; then
          echo "[live-review] dependencies changed: installing (the page reloads when done)"
          npm install --no-audit --no-fund >/dev/null && LOCK=$NEW
        fi
      fi
    fi
  done
) &
PULLER=$!
trap 'kill $PULLER 2>/dev/null' EXIT INT TERM

echo "[live-review] open http://localhost:$PORT/review  (Ctrl+C to stop)"
# open the review hub once the server answers (macOS `open`, Linux `xdg-open`)
(
  for _ in $(seq 1 60); do
    sleep 2
    if curl -s -o /dev/null "http://localhost:$PORT/review"; then
      (command -v open >/dev/null && open "http://localhost:$PORT/review") || (command -v xdg-open >/dev/null && xdg-open "http://localhost:$PORT/review") || true
      break
    fi
  done
) &
npx next dev -p "$PORT"
