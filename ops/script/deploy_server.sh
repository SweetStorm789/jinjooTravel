#!/usr/bin/env bash
set -euo pipefail

# 0) server로 이동
cd /root/jinjooTravel/server

# 1) pm2 일시 정지 (있을 경우만)
pm2 stop jinjoo-server || true

# 2) 깨끗하게 초기화
rm -rf node_modules package-lock.json
npm cache clean --force
rm -rf ~/.npm/_libvips ~/.npm/_prebuilds ~/.npm/_cacache

# 3) 소스 빌드 강제 (prebuilt 차단)
export npm_config_build_from_source=true
export SHARP_IGNORE_GLOBAL_LIBVIPS=1
export SHARP_FORCE_LOCAL=1
export npm_config_platform=linux
export npm_config_arch=x64

# 4) sharp 먼저 설치 (소스 빌드)
npm install sharp@0.32.6 --build-from-source --verbose

# 5) 나머지 의존성 설치 → 서버 빌드
npm install
npm run build

# 6) sharp 로드 확인(중요)
node -e "require('sharp'); console.log('sharp OK')"

# 7) pm2 재가동
pm2 start jinjoo-server || pm2 restart jinjoo-server
pm2 save
pm2 logs jinjoo-server --lines 50
