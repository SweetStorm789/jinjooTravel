// 키보드 단축키 관리 유틸리티

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  action: () => void;
  description: string;
}

/**
 * 키보드 단축키 설정
 */
export const setupKeyboardShortcuts = (setCurrentPage: (page: string) => void) => {
  // 모든 키보드 단축키 제거됨 (이미지 갤러리 네비게이션은 별도 관리)
  // 빈 클린업 함수 반환
  return () => {
    // 제거할 이벤트 리스너 없음
  };
};

/**
 * 단축키 도움말 표시
 */
export const showKeyboardShortcuts = () => {
  const shortcuts = [
    '← → : 이미지 갤러리 네비게이션 (상세페이지)'
  ];
  
  alert('키보드 단축키:\n\n' + shortcuts.join('\n'));
};

