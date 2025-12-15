// 환경 변수에서 API 기본 URL을 가져오거나 기본값 사용
// 클라우드 환경에서는 window.location.origin을 사용하여 현재 도메인 기반으로 설정
export const getBaseUrl = () => {
  // 개발 환경에서는 환경 변수 사용
  if (import.meta.env.DEV) {
    const devUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/api$/, '');
    // console.log('🔧 Development URL:', devUrl);
    return devUrl;
  }

  // 프로덕션 환경에서는 환경 변수 우선, 없으면 현재 도메인 사용
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    const prodUrl = envUrl.replace(/\/api$/, '');
    // console.log('🔧 Production URL from env:', prodUrl);
    return prodUrl;
  }

  // 환경 변수가 없으면 현재 도메인 사용
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    const originUrl = window.location.origin.replace(/\/api$/, '');
    // console.log('🔧 Production URL from origin:', originUrl);
    return originUrl;
  }

  // 프로덕션에서 window.location이 없는 경우 빈 문자열 반환
  // console.log('🔧 Fallback URL: empty string (will be handled by getSafeBaseUrl)');
  return '';
};

// 런타임에 결정되는 BASE_URL (빈 문자열 방지)
export const BASE_URL = (() => {
  const url = getBaseUrl();
  if (!url || url === '') {
    console.warn('⚠️ BASE_URL is empty, using fallback');
    return import.meta.env.DEV ? 'http://localhost:5000' : '';
  }
  return url;
})();

// 런타임에 안전하게 BASE_URL을 가져오는 함수
export const getSafeBaseUrl = () => {
  // 이미 설정된 BASE_URL이 있으면 사용
  if (BASE_URL && BASE_URL !== '') {
    return BASE_URL;
  }

  // 런타임에 다시 계산
  const runtimeUrl = getBaseUrl();
  if (runtimeUrl && runtimeUrl !== '') {
    return runtimeUrl;
  }

  // 마지막 fallback: 개발 환경이면 localhost, 아니면 빈 문자열
  if (import.meta.env.DEV) {
    return 'http://localhost:5000';
  }

  // 프로덕션에서는 window.location.origin을 강제로 사용
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    return window.location.origin.replace(/\/api$/, '');
  }

  // 모든 방법이 실패하면 빈 문자열 반환
  console.error('❌ Failed to determine BASE_URL');
  return '';
};