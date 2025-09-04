#!/usr/bin/env bash
set -euo pipefail

# ===== Settings =====
BRANCH="${1:-main}"                       # ./deploy_front.sh  (기본 main)  또는  ./deploy_front.sh develop
ROOT="/root/jinjooTravel"                 # 리포 루트 (package.json이 있는 곳)
WEB_ROOT="/var/www/jinjoo-frontend"       # Nginx가 서빙하는 상위 폴더 (정적 루트는 ${WEB_ROOT}/dist)

echo "==> [0] Pre-check"
if [ ! -f "$ROOT/package.json" ]; then
  echo "ERROR: $ROOT 에 package.json이 없음. ROOT 경로 확인 필요."
  exit 1
fi
if [ ! -f "$ROOT/.env.production" ]; then
  echo "WARN: $ROOT/.env.production 없음. (VITE_API_BASE_URL=/api 권장)"
fi

echo "==> [1/5] Git sync ($BRANCH)"
cd "$ROOT"
git fetch --all
git reset --hard "origin/$BRANCH"

echo "==> [2/5] Install deps & build (Vite)"
if [ -f "$ROOT/package-lock.json" ]; then
  npm ci
else
  npm install
fi
rm -rf "$ROOT/dist"
npm run build   # => $ROOT/dist

echo "==> [3/5] Deploy to Nginx static root"
sudo mkdir -p "$WEB_ROOT"
# 표준화: dist 폴더 자체를 복사 → Nginx는 ${WEB_ROOT}/dist 를 루트로 사용
sudo rm -rf "$WEB_ROOT/dist"
sudo cp -r "$ROOT/dist" "$WEB_ROOT/"
sudo chown -R www-data:www-data "$WEB_ROOT"

echo "==> [4/5] Nginx reload"
sudo nginx -t && sudo systemctl reload nginx || true

echo "==> [5/5] Verify"
if [ -f "$WEB_ROOT/dist/index.html" ]; then
  echo "OK: $WEB_ROOT/dist/index.html 존재"
else
  echo "ERROR: $WEB_ROOT/dist/index.html 없음"
  exit 1
fi

echo "✅ Frontend deploy completed."
