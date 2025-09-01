// 환경 변수에서 API 기본 URL을 가져오거나 기본값 사용
// 클라우드 환경에서는 window.location.origin을 사용하여 현재 도메인 기반으로 설정
export const getBaseUrl = () => {
  console.log('🔧 getBaseUrl called');
  console.log('🔧 import.meta.env.DEV:', import.meta.env.DEV);
  console.log('🔧 import.meta.env.VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
  console.log('🔧 typeof window:', typeof window);
  console.log('🔧 window.location:', window.location);
  
  // 개발 환경에서는 환경 변수 사용
  if (import.meta.env.DEV) {
    const devUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/api$/, '');
    console.log('🔧 Development URL:', devUrl);
    return devUrl;
  }
  
  // 프로덕션 환경에서는 환경 변수 우선, 없으면 현재 도메인 사용
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    const prodUrl = envUrl.replace(/\/api$/, '');
    console.log('🔧 Production URL from env:', prodUrl);
    return prodUrl;
  }
  
  // 환경 변수가 없으면 현재 도메인 사용
  if (typeof window !== 'undefined' && window.location) {
    const originUrl = window.location.origin.replace(/\/api$/, '');
    console.log('🔧 Production URL from origin:', originUrl);
    return originUrl;
  }
  
  // fallback
  console.log('🔧 Fallback URL: empty string');
  return '';
};

// 기본값으로 빈 문자열 설정 (런타임에 결정됨)
export const BASE_URL = getBaseUrl();