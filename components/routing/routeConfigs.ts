// 라우트 설정 타입
export interface RouteConfig {
  pattern: string;
  component: string;
  props?: Record<string, any>;
}

// 동적 라우트 패턴 매칭을 위한 헬퍼 함수
export const matchRoute = (currentPage: string, pattern: string): { match: boolean; params: Record<string, string> } => {
  // 정확한 매치
  if (currentPage === pattern) {
    return { match: true, params: {} };
  }
  
  // 패턴에 매개변수가 있는 경우 (예: "notice-detail-{id}")
  const patternParts = pattern.split('-');
  const pageParts = currentPage.split('-');
  
  if (patternParts.length !== pageParts.length) {
    return { match: false, params: {} };
  }
  
  const params: Record<string, string> = {};
  let isMatch = true;
  
  for (let i = 0; i < patternParts.length; i++) {
    const patternPart = patternParts[i];
    const pagePart = pageParts[i];
    
    if (patternPart.startsWith('{') && patternPart.endsWith('}')) {
      // 매개변수 추출
      const paramName = patternPart.slice(1, -1);
      params[paramName] = pagePart;
    } else if (patternPart !== pagePart) {
      isMatch = false;
      break;
    }
  }
  
  return { match: isMatch, params };
};

// 라우트 설정
export const ROUTE_CONFIGS: RouteConfig[] = [
  // 홈
  { pattern: "home", component: "home" },
  
  // 가톨릭성지순례 상품
  { pattern: "pilgrimage-packages", component: "PilgrimagePackages" },
  { pattern: "pilgrimage-packages-europe", component: "PilgrimagePackages", props: { initialRegion: "유럽" } },
  { pattern: "pilgrimage-packages-asia", component: "PilgrimagePackages", props: { initialRegion: "아시아" } },
  { pattern: "pilgrimage-packages-domestic", component: "PilgrimagePackages", props: { initialRegion: "국내" } },
  { pattern: "pilgrimage-packages-israel", component: "PilgrimagePackages", props: { initialRegion: "이스라엘" } },
  { pattern: "package-detail-{id}", component: "PilgrimagePackageDetail" },
  { pattern: "package-form", component: "PilgrimagePackageForm" },
  { pattern: "package-form-edit-{id}", component: "PilgrimagePackageForm" },
  
  // 성모님메세지
  { pattern: "marian-messages", component: "MarianMessages" },
  { pattern: "marian-message-form", component: "MarianMessageForm" },
  { pattern: "marian-message-form-edit-{id}", component: "MarianMessageForm" },
  { pattern: "marian-message-detail-{id}", component: "MarianMessageDetail" },
  
  // 공지사항
  { pattern: "notices", component: "Notices" },
  { pattern: "notice-form", component: "NoticeForm" },
  { pattern: "notice-form-edit-{id}", component: "NoticeForm" },
  { pattern: "notice-detail-{id}", component: "NoticeDetail" },
  
  // 여행후기
  { pattern: "travel-reviews", component: "TravelReviews" },
  { pattern: "travel-review-form", component: "TravelReviewForm" },
  { pattern: "travel-review-form-edit-{id}", component: "TravelReviewForm" },
  { pattern: "travel-review-detail-{id}", component: "TravelReviewDetail" },
  
  // 질문답변
  { pattern: "qna", component: "Qna" },
  { pattern: "qna-form", component: "QnaForm" },
  { pattern: "qna-form-edit-{id}", component: "QnaForm" },
  { pattern: "qna-detail-{id}", component: "QnaDetail" },
  
  // 자유게시판
  { pattern: "freeboard", component: "FreeBoard" },
  { pattern: "freeboard-form", component: "FreeBoardForm" },
  { pattern: "freeboard-form-edit-{id}", component: "FreeBoardForm" },
  { pattern: "freeboard-detail-{id}", component: "FreeBoardDetail" },
  
  // 포토갤러리
  { pattern: "photo-gallery", component: "PhotoGallery" },
  { pattern: "photo-gallery-form", component: "PhotoGalleryForm" },
  { pattern: "photo-gallery-form-edit-{id}", component: "PhotoGalleryForm" },
  { pattern: "photo-gallery-detail-{id}", component: "PhotoGalleryDetail" },
  
  // 성모님발현지
  { pattern: "fatima", component: "Fatima" },
  { pattern: "lourdes", component: "Lourdes" },
  { pattern: "guadalupe", component: "Guadalupe" },
  { pattern: "banneux", component: "Banneux" },
  { pattern: "medjugorje", component: "Medjugorje" },
  
  // 성지정보
  { pattern: "vatican", component: "Vatican" },
  { pattern: "greece", component: "Greece" },
  { pattern: "spain", component: "Spain" },
  { pattern: "israel", component: "Israel" },
  { pattern: "egypt", component: "Egypt" },
  { pattern: "turkiye", component: "Turkiye" },
  { pattern: "france", component: "France" },
  { pattern: "italy", component: "Italy" },
  { pattern: "rome", component: "Rome" },
  { pattern: "assisi", component: "Assisi" },
  { pattern: "sangiovannirotondo", component: "SanGiovanniRotondo" },
  { pattern: "loreto", component: "Loretto" },
  { pattern: "siena", component: "Siena" },
  { pattern: "orviettoo", component: "Orviettoo" },
  { pattern: "lanciano", component: "Lanciano" }
];