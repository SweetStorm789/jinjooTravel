#!/usr/bin/env bash
set -euo pipefail

# ========= Settings =========
BRANCH="${1:-main}"
ROOT="/root/jinjooTravel"              # 프로젝트 루트
SERVER_DIR="$ROOT/server"              # 백엔드 디렉토리
NGINX_ROOT="/var/www/jinjoo-frontend"  # 프론트 정적 배포 경로 (Nginx가 서빙)
APP_NAME="jinjoo-server"               # PM2 앱 이름

echo "==> [1/6] Git pull ($BRANCH)"
cd "$ROOT"
git fetch --all
git reset --hard "origin/$BRANCH"

echo "==> [2/6] Frontend install & build"
if [ -f "$ROOT/package-lock.json" ]; then
  npm ci
else
  npm install
fi
npm run build   # => $ROOT/dist

echo "==> [3/6] Deploy frontend to Nginx root ($NGINX_ROOT)"
mkdir -p "$NGINX_ROOT"
# 안전 삭제 (빈 폴더여도 OK, set -e에서도 중단 안 됨)
find "$NGINX_ROOT" -mindepth 1 -delete
cp -r "$ROOT/dist/"* "$NGINX_ROOT"/
chown -R www-data:www-data "$NGINX_ROOT"

echo "==> [4/6] Backend install & build"
cd "$SERVER_DIR"
if [ -f "$SERVER_DIR/package-lock.json" ]; then
  npm ci
else
  npm install
fi
npm run build   # => $SERVER_DIR/dist

echo "==> [5/6] PM2 start/restart ($APP_NAME)"
if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  pm2 restart "$APP_NAME" --update-env
else
  pm2 start "$SERVER_DIR/dist/app.js" --name "$APP_NAME"
fi
pm2 save

echo "==> [6/6] Done. Recent logs:"
pm2 status | grep "$APP_NAME" || true
pm2 logs "$APP_NAME" --lines 50 || true

echo '✅ Deploy completed.'
