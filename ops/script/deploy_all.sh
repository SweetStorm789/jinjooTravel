#!/usr/bin/env bash
set -euo pipefail

BRANCH="${1:-main}"
ROOT="/root/jinjooTravel"
SERVER_DIR="$ROOT/server"
WEB_ROOT="/var/www/jinjoo-frontend"      # 상위 폴더
PM2_NAME="jinjoo-server"

echo "==> [0] Pre-check .env files"
[ -f "$ROOT/.env.production" ] || echo "WARN: $ROOT/.env.production missing (VITE_API_BASE_URL=/api 권장)"
[ -f "$SERVER_DIR/.env" ] || { echo "ERROR: $SERVER_DIR/.env missing"; exit 1; }

echo "==> [1/7] Git sync ($BRANCH)"
cd "$ROOT"
git fetch --all
git reset --hard "origin/$BRANCH"

echo "==> [2/7] Frontend install & build"
if [ -f "$ROOT/package-lock.json" ]; then npm ci; else npm install; fi
rm -rf "$ROOT/dist"
npm run build   # => $ROOT/dist

echo "==> [3/7] Deploy frontend (dist folder)"
sudo mkdir -p "$WEB_ROOT"
sudo rm -rf "$WEB_ROOT/dist"
sudo cp -r "$ROOT/dist" "$WEB_ROOT/"

sudo chown -R www-data:www-data "$WEB_ROOT"

echo "==> [4/7] Backend install & build"
cd "$SERVER_DIR"
if [ -f "$SERVER_DIR/package-lock.json" ]; then npm ci; else npm install; fi
rm -rf "$SERVER_DIR/dist"
npm run build   # => $SERVER_DIR/dist/app.js

echo "==> [5/7] PM2 start/restart ($PM2_NAME)"
if pm2 describe "$PM2_NAME" >/dev/null 2>&1; then
  pm2 restart "$PM2_NAME" --update-env
else
  pm2 start "$SERVER_DIR/dist/app.js" --name "$PM2_NAME"
fi
pm2 save

echo "==> [6/7] Nginx reload"
sudo nginx -t && sudo systemctl reload nginx || true

echo "==> [7/7] Recent logs"
pm2 status | grep "$PM2_NAME" || true
pm2 logs "$PM2_NAME" --lines 50 || true

echo '✅ Deploy completed (standardized: root -> /var/www/jinjoo-frontend/dist).'
