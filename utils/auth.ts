// 관리자 권한 체크 함수 (현재는 모든 사용자에게 true 반환)
// 실제 구현시에는 로그인 상태와 권한을 체크해야 함
export const checkAdminPermission = (): boolean => {
  // TODO: 실제 관리자 권한 체크 로직 구현
  // 예: JWT 토큰 검증, 사용자 역할 확인 등
  return true; // 현재는 모든 사용자에게 관리자 권한 부여
};