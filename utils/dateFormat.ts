// 날짜를 YYYY년 MM월 DD일 형식으로 포맷팅하는 함수
export const formatDateToKorean = (date: Date): string => {
  return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월 ${String(date.getDate()).padStart(2, '0')}일`;
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
