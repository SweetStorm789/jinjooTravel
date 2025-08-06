# Jinjoo Travel - 가톨릭 성지순례 전문 여행사

## 프로젝트 소개
가톨릭 성지순례 전문 여행사 웹사이트입니다. React와 TypeScript를 사용하여 개발되었으며, 
성지순례 상품 관리, 예약 시스템, 성지 정보 제공 등의 기능을 제공합니다.

## 주요 기능
- 성지순례 상품 조회/등록/수정
- 성지 정보 제공
- 관리자 기능
- 예약 시스템
- 이미지 갤러리

## 기술 스택
- React
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- Lucide React

## 시작하기

### 환경 변수 설정
1. 프로젝트 루트에 `.env` 파일을 생성합니다.
2. 다음 환경 변수를 설정합니다:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```
   - Google Maps API 키는 [Google Cloud Console](https://console.cloud.google.com/)에서 생성할 수 있습니다.

### 개발 환경 설정
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 프로젝트 구조
```
jinjooTravel/
├── src/
│   ├── types/
│   └── styles/
├── components/
│   ├── ui/
│   ├── shared/
│   └── routing/
├── utils/
└── public/
```