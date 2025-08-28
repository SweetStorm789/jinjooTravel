#!/usr/bin/env bash
set -euo pipefail

# ===== Settings =====
BRANCH="${1:-main}"
ROOT="/root/jinjooTravel"             # 프로젝트 루트
SERVER_DIR="$ROOT/server"
NGINX_ROOT="/var/www/jinjoo-frontend" # 프론트 정적 배포 위치
APP_NAME="jinjoo-server"                  # PM2 앱 이름 (네가 쓰는 이름으로!)

echo "==> [1/6] Git pull ($BRANCH)"
cd "$ROOT"
git fetch --all
git reset --hard "origin/$BRANCH"

echo "==> [2/6] Frontend install & build (at $ROOT)"
if [ -f "$ROOT/package-lock.json" ]; then
  npm ci || npm install
else
  npm install
fi
npm run build    # => $ROOT/dist

echo "==> [3/6] Deploy frontend to Nginx root ($NGINX_ROOT)"
sudo mkdir -p "$NGINX_ROOT"
sudo rm -rf "$NGINX_ROOT"/*
sudo cp -r "$ROOT/dist/"* "$NGINX_ROOT"/
sudo chown -R www-data:www-data "$NGINX_ROOT"

echo "==> [4/6] Backend install & build (at $SERVER_DIR)"
cd "$SERVER_DIR"
if [ -f "$SERVER_DIR/package-lock.json" ]; then
  npm ci || npm install
else
  npm install
fi
# (옵션) sharp 재빌드가 필요할 때만 사용
# npm rebuild sharp --build-from-source || true
npm run build

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

#이렇게 실행하면 됨
#chmod +x ./deploy_all.sh
#./deploy_all.sh               # 기본 main 브랜치
# ./deploy_all.sh feature/xxx # 특정 브랜치 배포도 가능