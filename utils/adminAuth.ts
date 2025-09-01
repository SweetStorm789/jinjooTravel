import { getBaseUrl } from '../src/lib/constants';

interface AdminUser {
  id: number;
  username: string;
  fullName: string;
  role: string;
}

// Admin 토큰 가져오기
export const getAdminToken = (): string | null => {
  return localStorage.getItem('adminToken');
};

// Admin 사용자 정보 가져오기
export const getAdminUser = (): AdminUser | null => {
  const userStr = localStorage.getItem('adminUser');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Failed to parse admin user:', error);
      return null;
    }
  }
  return null;
};

// Admin 로그인 상태 확인
export const isAdminLoggedIn = (): boolean => {
  const token = getAdminToken();
  const user = getAdminUser();
  return !!(token && user);
};

// Admin 로그아웃
export const adminLogout = (): void => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
};

// Admin 토큰 검증
export const verifyAdminToken = async (): Promise<boolean> => {
  const token = getAdminToken();
  if (!token) {
    // 토큰이 없으면 조용히 false 반환 (로그 없음)
    return false;
  }

  // 토큰 형식 검증 (간단한 JWT 형식 체크)
  if (!token.includes('.') || token.split('.').length !== 3) {
    // 잘못된 토큰 형식이면 조용히 false 반환
    return false;
  }

  try {
    // 개발 환경에서는 localhost:5000, 프로덕션에서는 현재 도메인 사용
    const baseUrl = import.meta.env.DEV ? 'http://localhost:5000' : window.location.origin;
    
    const response = await fetch(`${baseUrl}/api/admin/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // 401 에러는 정상적인 상황이므로 로그 없이 false 반환
      return false;
    }

    const data = await response.json();
    return data.success;
  } catch (error) {
    // 네트워크 에러나 서버 연결 실패 시에만 로그 출력
    console.error('❌ Admin token verification network error:', error);
    return false;
  }
};

// Admin 권한이 필요한 API 요청을 위한 헤더 생성
export const getAdminHeaders = (): HeadersInit => {
  const token = getAdminToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};
