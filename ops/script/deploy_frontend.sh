#!/usr/bin/env bash
set -euo pipefail

# ===== 설정 =====
REPO_DIR="/root/jinjooTravel"
FRONT_DIR="$REPO_DIR/client"           # 프론트가 client/ 하위에 있으면 사용, 없으면 루트에서 빌드
WEB_ROOT="/var/www/jinjoo-frontend"    # Nginx root (nginx conf에 맞춤)

echo "==> 0) 레포 이동"
cd "$REPO_DIR"

echo "==> 1) 최신 코드 받기 (git pull)"
git fetch --all --prune
# 로컬 변경이 없다는 가정. 로컬 변경 있으면 --ff-only가 실패 -> reset 후 pull 필요
git pull --ff-only || {
  echo "git pull --ff-only 실패 (로컬 변경 존재 가능)"
  echo "필요시: git reset --hard && git pull"
  exit 1
}

# 프론트 디렉토리 결정
if [ -d "$FRONT_DIR" ]; then
  echo "==> 2) 프론트 디렉토리(client)로 이동"
  cd "$FRONT_DIR"
else
  echo "==> 2) client 폴더 없음 -> 레포 루트에서 프론트 빌드 진행"
  cd "$REPO_DIR"
fi

echo "==> 3) 의존성 설치 (npm ci 우선, 실패 시 npm install)"
if [ -f package-lock.json ]; then
  (npm ci) || npm install
else
  npm install
fi

echo "==> 4) 프론트 빌드 (Vite)"
npm run build   # dist/ 생성

echo "==> 5) 배포 디렉토리 동기화: dist/ -> $WEB_ROOT"
sudo mkdir -p "$WEB_ROOT"
sudo rsync -av --delete dist/ "$WEB_ROOT"/

echo "==> 6) 완료. 파일 목록:"
sudo ls -lah "$WEB_ROOT" | head -n 20

echo "==> 7) 참고: 프론트만 배포했으므로 PM2 재시작 불필요 (백엔드 변경 없음)"
echo "Done."