#!/usr/bin/env bash
set -euo pipefail

# ===== Settings =====
BRANCH="${1:-main}"                         # ./deploy_backend.sh  (기본 main)
ROOT="/root/jinjooTravel"
SERVER_DIR="$ROOT/server"
PM2_NAME="jinjoo-server"

echo "==> [0] Pre-check"
if [ ! -f "$SERVER_DIR/package.json" ]; then
  echo "ERROR: $SERVER_DIR 에 package.json이 없음. SERVER_DIR 경로 확인 필요."
  exit 1
fi
if [ ! -f "$SERVER_DIR/.env" ]; then
  echo "ERROR: $SERVER_DIR/.env 없음 (DB/PORT 등 필수)."
  exit 1
fi

echo "==> [1/5] Git sync ($BRANCH)"
cd "$ROOT"
git fetch --all
git reset --hard "origin/$BRANCH"

echo "==> [2/5] Install deps & build (Server)"
cd "$SERVER_DIR"
if [ -f "$SERVER_DIR/package-lock.json" ]; then
  npm ci
else
  npm install
fi
rm -rf "$SERVER_DIR/dist"
npm run build   # => $SERVER_DIR/dist/app.js

echo "==> [3/5] PM2 start/restart"
if pm2 describe "$PM2_NAME" >/dev/null 2>&1; then
  pm2 restart "$PM2_NAME" --update-env
else
  pm2 start "$SERVER_DIR/dist/app.js" --name "$PM2_NAME"
fi
pm2 save

echo "==> [4/5] Show status & recent logs"
pm2 status | grep "$PM2_NAME" || true
pm2 logs "$PM2_NAME" --lines 50 || true

echo "==> [5/5] Sanity check (local API)"
curl -s -I http://127.0.0.1:5000/api/packages | head -n 1 || true

echo "✅ Backend deploy completed."
