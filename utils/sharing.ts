// URL 공유 및 링크 관리 유틸리티

/**
 * 현재 페이지 URL을 클립보드에 복사
 */
export const copyCurrentURL = async (): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    return true;
  } catch (error) {
    console.error('URL 복사 실패:', error);
    return false;
  }
};

/**
 * 특정 페이지의 URL 생성
 */
export const generatePageURL = (page: string): string => {
  const baseURL = window.location.origin;
  if (page === 'home') {
    return baseURL;
  }
  return `${baseURL}/#${page}`;
};

/**
 * Web Share API를 사용한 공유 (지원하는 브라우저에서)
 */
export const shareCurrentPage = async (title?: string, text?: string): Promise<boolean> => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: title || document.title,
        text: text || '진주여행사의 성지순례 정보를 확인해보세요.',
        url: window.location.href
      });
      return true;
    } catch (error) {
      console.error('페이지 공유 실패:', error);
      return false;
    }
  } else {
    // Web Share API를 지원하지 않는 경우 URL 복사로 대체
    return await copyCurrentURL();
  }
};

/**
 * 소셜 미디어 공유 URL 생성
 */
export const generateSocialShareURL = (platform: 'facebook' | 'twitter' | 'kakao', url?: string, text?: string): string => {
  const shareURL = url || window.location.href;
  const shareText = text || document.title;
  
  switch (platform) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareURL)}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareURL)}&text=${encodeURIComponent(shareText)}`;
    case 'kakao':
      // 카카오톡 공유는 별도 SDK 필요, 여기서는 기본 URL만 제공
      return `https://story.kakao.com/share?url=${encodeURIComponent(shareURL)}`;
    default:
      return shareURL;
  }
};

/**
 * 이메일로 공유
 */
export const shareViaEmail = (subject?: string, body?: string, url?: string): void => {
  const shareURL = url || window.location.href;
  const emailSubject = subject || document.title;
  const emailBody = body || `진주여행사의 성지순례 정보를 공유합니다:\n\n${shareURL}`;
  
  const mailtoURL = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  window.location.href = mailtoURL;
};

/**
 * 브라우저 기능 감지
 */
export const getBrowserCapabilities = () => {
  return {
    canShare: !!navigator.share,
    canCopy: !!navigator.clipboard,
    canPushNotifications: 'Notification' in window,
    isStandalone: window.matchMedia('(display-mode: standalone)').matches,
    isPWA: window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches
  };
};

/**
 * 페이지 URL 검증 및 정규화
 */
export const normalizePageURL = (page: string): string => {
  // URL 해시에서 불필요한 문자 제거
  const cleanPage = page.replace(/[^a-zA-Z0-9\-_]/g, '');
  return cleanPage || 'home';
};

/**
 * 외부 링크 열기 (새 탭에서)
 */
export const openExternalLink = (url: string): void => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

