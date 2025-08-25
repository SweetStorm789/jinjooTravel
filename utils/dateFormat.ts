/**
 * 날짜를 한국어 형식으로 포맷팅
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  // 유효하지 않은 날짜인 경우
  if (isNaN(date.getTime())) {
    return '날짜 없음';
  }

  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffTime / (1000 * 60));

  // 1분 미만
  if (diffMinutes < 1) {
    return '방금 전';
  }
  
  // 1시간 미만
  if (diffHours < 1) {
    return `${diffMinutes}분 전`;
  }
  
  // 24시간 미만
  if (diffDays < 1) {
    return `${diffHours}시간 전`;
  }
  
  // 7일 미만
  if (diffDays < 7) {
    return `${diffDays}일 전`;
  }
  
  // 30일 미만
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks}주 전`;
  }
  
  // 365일 미만
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months}개월 전`;
  }
  
  // 1년 이상
  const years = Math.floor(diffDays / 365);
  return `${years}년 전`;
};

/**
 * 날짜를 상세한 형식으로 포맷팅
 */
export const formatDateDetailed = (dateString: string): string => {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return '날짜 없음';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
};

/**
 * 날짜를 간단한 형식으로 포맷팅
 */
export const formatDateSimple = (dateString: string): string => {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return '날짜 없음';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/**
 * 날짜를 YYYY년 MM월 DD일 형식으로 포맷팅하는 함수
 */
export const formatDateToKorean = (date: Date | string): string => {
  // YYYYMMDD 형식 문자열인 경우
  if (typeof date === 'string' && date.length === 8 && /^\d{8}$/.test(date)) {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
  }
  
  // Date 객체인 경우
  const dateObj = date instanceof Date ? date : new Date(date);
  if (isNaN(dateObj.getTime())) return '미정';
  
  return `${dateObj.getFullYear()}년 ${String(dateObj.getMonth() + 1).padStart(2, '0')}월 ${String(dateObj.getDate()).padStart(2, '0')}일`;
};

// 일차 범위에서 시작일과 종료일을 추출하는 함수
export const parseDayRange = (dayLabel: string): { start: number; end: number } | null => {
  // "Day 1", "Day 1-2", "Day 2~3" 등의 형식에서 숫자를 추출
  const numbers = dayLabel.match(/\d+/g)?.map(Number) || [];
  if (numbers.length === 0) return { start: 1, end: 1 };
  if (numbers.length === 1) return { start: numbers[0], end: numbers[0] };
  
  // 시작일이 종료일보다 크거나 같은 경우 null 반환
  if (numbers[0] >= numbers[1]) return null;
  return { start: numbers[0], end: numbers[1] };
};

// 일정의 마지막 일차를 찾는 함수
export const findLastDay = (itinerary: { dayLabel: string }[]): number => {
  let maxDay = 0;
  itinerary.forEach(day => {
    const range = parseDayRange(day.dayLabel);
    if (range) {
      maxDay = Math.max(maxDay, range.end);
    }
  });
  return maxDay;
};
