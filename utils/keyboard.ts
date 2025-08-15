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
  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'h',
      altKey: true,
      action: () => setCurrentPage('home'),
      description: 'Alt + H: 홈으로 이동'
    },
    {
      key: 'p',
      altKey: true,
      action: () => setCurrentPage('pilgrimage-packages'),
      description: 'Alt + P: 순례상품 목록으로 이동'
    },
    {
      key: 'v',
      altKey: true,
      action: () => setCurrentPage('vatican'),
      description: 'Alt + V: 바티칸 페이지로 이동'
    },
    {
      key: 'l',
      altKey: true,
      action: () => setCurrentPage('lourdes'),
      description: 'Alt + L: 루르드 페이지로 이동'
    },
    {
      key: 'f',
      altKey: true,
      action: () => setCurrentPage('fatima'),
      description: 'Alt + F: 파티마 페이지로 이동'
    },
    {
      key: 'm',
      altKey: true,
      action: () => setCurrentPage('medjugorje'),
      description: 'Alt + M: 메주고리예 페이지로 이동'
    },
    {
      key: 'c',
      altKey: true,
      action: () => setCurrentPage('company-history'),
      description: 'Alt + C: 회사소개 페이지로 이동'
    }
  ];

  const handleKeyDown = (event: KeyboardEvent) => {
    // 입력 필드에서는 단축키 비활성화
    if (event.target instanceof HTMLInputElement || 
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement) {
      return;
    }

    const shortcut = shortcuts.find(s => 
      s.key.toLowerCase() === event.key.toLowerCase() &&
      !!s.ctrlKey === event.ctrlKey &&
      !!s.altKey === event.altKey &&
      !!s.shiftKey === event.shiftKey
    );

    if (shortcut) {
      event.preventDefault();
      shortcut.action();
    }
  };

  // ESC 키로 홈으로 이동
  const handleEscKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setCurrentPage('home');
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keydown', handleEscKey);

  // 클린업 함수 반환
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keydown', handleEscKey);
  };
};

/**
 * 단축키 도움말 표시
 */
export const showKeyboardShortcuts = () => {
  const shortcuts = [
    'Alt + H: 홈으로 이동',
    'Alt + P: 순례상품 목록',
    'Alt + V: 바티칸',
    'Alt + L: 루르드',
    'Alt + F: 파티마',
    'Alt + M: 메주고리예',
    'Alt + C: 회사소개',
    'ESC: 홈으로 이동',
    '← → : 이미지 갤러리 네비게이션 (상세페이지)'
  ];
  
  alert('키보드 단축키:\n\n' + shortcuts.join('\n'));
};

