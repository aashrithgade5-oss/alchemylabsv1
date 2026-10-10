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

PORT="${PORT:-3000}"
echo "[live-review] open http://localhost:$PORT  (Ctrl+C to stop)"
npx next dev -p "$PORT"
