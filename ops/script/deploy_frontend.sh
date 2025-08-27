#!/usr/bin/env bash
set -euo pipefail

# 0) 프로젝트 루트로 이동 (프론트가 루트에 있음)
cd /root/jinjooTravel

# 1) 의존성 설치
#    CI 환경이면 npm ci, 그렇지 않으면 npm install
if [ -f package-lock.json ]; then
  (npm ci) || npm install
else
  npm install
fi

# 2) 프론트 빌드 (Vite)
npm run build    # dist/ 생성

# 3) (선택) 백엔드 pm2 재시작 - 정적 파일 교체 반영
pm2 restart jinjoo-server || true

# 4) 상태/로그(선택)
pm2 status | grep jinjoo-server || true
pm2 logs jinjoo-server --lines 20 || true
