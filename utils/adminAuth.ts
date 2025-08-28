import { BASE_URL } from '../src/lib/constants';

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
  if (!token) return false;

  try {
    const response = await fetch(`${BASE_URL}/admin/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Token verification failed:', error);
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
