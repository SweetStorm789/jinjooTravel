// 브라우저 히스토리 관리를 위한 유틸리티 함수들
import { updateMetaTags, updateStructuredData } from './seo';

export interface HistoryState {
  page: string;
  timestamp: number;
}

/**
 * URL에서 현재 페이지를 추출하는 함수
 */
export const getPageFromURL = (): string => {
  const hash = window.location.hash.slice(1); // # 제거
  return hash || 'home';
};

/**
 * 페이지 변경 시 브라우저 히스토리에 추가하는 함수
 */
export const pushPageToHistory = (page: string) => {
  const state: HistoryState = {
    page,
    timestamp: Date.now()
  };
  
  // URL 해시 업데이트
  const url = page === 'home' ? '/' : `/#${page}`;
  window.history.pushState(state, '', url);
};

/**
 * 페이지 변경 시 브라우저 히스토리를 교체하는 함수 (뒤로가기 시 사용)
 */
export const replacePageInHistory = (page: string) => {
  const state: HistoryState = {
    page,
    timestamp: Date.now()
  };
  
  const url = page === 'home' ? '/' : `/#${page}`;
  window.history.replaceState(state, '', url);
};

/**
 * 페이지 메타 정보를 업데이트하는 함수 (제목, 설명, SEO 등)
 */
export const updatePageMeta = (page: string) => {
  // 동적 페이지별 커스텀 메타 데이터
  let customMeta = {};
  
  if (page.startsWith('package-detail-')) {
    customMeta = {
      title: '순례일정 상세 - 진주여행사',
      description: '성지순례 일정의 상세 정보를 확인하세요. 일정, 가격, 포함사항 등 모든 정보를 제공합니다.',
      keywords: '순례일정, 성지순례 일정, 순례 가격, 성지여행, 성지순례'
    };
  } else if (page.startsWith('package-form')) {
    customMeta = {
      title: '순례일정 등록/수정 - 진주여행사',
      description: '성지순례 일정을 등록하거나 수정할 수 있습니다.',
      keywords: '일정등록, 일정수정, 관리자'
    };
  } else if (page.startsWith('marian-message-detail-')) {
    customMeta = {
      title: '성모님 메시지 상세 - 진주여행사',
      description: '성모님의 메시지를 읽고 묵상하세요.',
      keywords: '성모님메시지, 성모발현, 메주고리예메시지'
    };
  } else if (page.startsWith('notice-detail-')) {
    customMeta = {
      title: '공지사항 상세 - 진주여행사',
      description: '진주여행사의 중요한 공지사항을 확인하세요.',
      keywords: '공지사항, 여행사공지, 순례공지'
    };
  } else if (page.startsWith('travel-review-detail-')) {
    customMeta = {
      title: '여행 후기 상세 - 진주여행사',
      description: '성지순례를 다녀온 고객들의 생생한 후기를 읽어보세요.',
      keywords: '여행후기, 순례후기, 성지순례경험'
    };
  } else if (page.startsWith('qna-detail-')) {
    customMeta = {
      title: 'Q&A 상세 - 진주여행사',
      description: '성지순례에 대한 궁금한 점들과 답변을 확인하세요.',
      keywords: 'QnA, 질문답변, 순례문의'
    };
  }
  
  // 메타 태그 업데이트
  updateMetaTags(page, customMeta);
  
  // 구조화된 데이터 업데이트  
  updateStructuredData(page);
};

/**
 * 브라우저 뒤로가기/앞으로가기 이벤트 리스너 설정
 */
export const setupHistoryListener = (setCurrentPage: (page: string) => void) => {
  const handlePopState = (event: PopStateEvent) => {
    const state = event.state as HistoryState | null;
    
    if (state?.page) {
      // 히스토리에서 온 페이지 변경
      setCurrentPage(state.page);
      updatePageMeta(state.page);
    } else {
      // 초기 상태 또는 외부 링크에서 온 경우
      const pageFromURL = getPageFromURL();
      setCurrentPage(pageFromURL);
      updatePageMeta(pageFromURL);
    }
  };

  window.addEventListener('popstate', handlePopState);
  
  // 클린업 함수 반환
  return () => {
    window.removeEventListener('popstate', handlePopState);
  };
};

/**
 * 페이지 새로고침 방지 (개발 중에만 사용)
 */
export const preventPageRefresh = (enable: boolean = true) => {
  if (enable) {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '정말로 페이지를 떠나시겠습니까? 입력한 내용이 사라질 수 있습니다.';
      return event.returnValue;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }
  return () => {};
};

/**
 * 히스토리 상태 확인
 */
export const getHistoryInfo = () => {
  return {
    length: window.history.length,
    currentPage: getPageFromURL(),
    canGoBack: window.history.length > 1,
    state: window.history.state
  };
};
