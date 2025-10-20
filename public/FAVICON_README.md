# 파비콘 사용 가이드

## 📋 개요
진주여행사 웹사이트의 파비콘 설정입니다. 픽셀 아트 스타일의 십자가 성화를 파비콘으로 사용합니다.

## 🎨 현재 파비콘
- **파일**: `favicon.png` (픽셀 아트 스타일 십자가 성화)
- **디자인**: 붉은색 십자가에 못 박힌 예수 그리스도
- **스타일**: 픽셀 아트로 작은 크기에서도 명확하게 보임
- **용도**: 가톨릭 성지순례 테마에 적합

## 📁 파일 구조

### 현재 사용 중인 파일
```
public/
└── favicon.png                   # 메인 파비콘 (모든 크기 대응)
```

## ✅ 구현 완료

현재 PNG 파일 하나로 모든 파비콘 요구사항을 충족합니다.

## 🔧 HTML 설정

### index.html 파비콘 링크
```html
<!-- 파비콘 -->
<link rel="icon" type="image/png" href="/favicon.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
<link rel="manifest" href="/site.webmanifest" />
```

### site.webmanifest 설정
```json
"icons": [
  { "src": "/favicon.png", "sizes": "16x16", "type": "image/png" },
  { "src": "/favicon.png", "sizes": "32x32", "type": "image/png" },
  { "src": "/favicon.png", "sizes": "180x180", "type": "image/png" },
  { "src": "/favicon.png", "sizes": "192x192", "type": "image/png" },
  { "src": "/favicon.png", "sizes": "512x512", "type": "image/png" }
]
```

## ✅ 구현 완료

### 완료된 작업
- [x] PNG 파비콘 파일 사용
- [x] `index.html`에 파비콘 링크 추가
- [x] `site.webmanifest` 업데이트
- [x] 모든 크기 대응 (16x16, 32x32, 180x180, 192x192, 512x512)
- [x] 불필요한 SVG 파일 정리

## 🚀 확인 방법

### 1. 브라우저에서 확인
- 브라우저 탭에서 파비콘 표시 확인
- Chrome, Firefox, Safari, Edge 등에서 테스트

### 2. 모바일에서 확인
- iOS Safari: 홈 화면에 추가 후 아이콘 확인
- Android Chrome: 홈 화면에 추가 후 아이콘 확인

### 3. 캐시 문제 해결
파비콘이 바로 보이지 않으면:
- 브라우저 캐시 지우기: `Ctrl+Shift+Delete` (Windows) 또는 `Cmd+Shift+Delete` (Mac)
- 시크릿 모드에서 확인
- 버전 쿼리 추가: `href="/favicon.png?v=2"`

## 🎯 파비콘 테스트 도구

- **Favicon Checker**: https://realfavicongenerator.net/favicon_checker
- **Google Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly

## 💡 최적화 팁

1. **PNG 압축**
   - TinyPNG 등으로 파일 크기 최적화
   - 품질과 파일 크기 균형 맞추기

2. **버전 관리**
   - 파비콘 변경 시 버전 쿼리 추가
   - `?v=2` 형태로 캐시 무효화

## 📞 문의
파비콘 관련 문의사항이 있으시면 개발팀에 연락주세요.

