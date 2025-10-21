// 각 나라별 시차와 서머타임 정보를 관리하는 유틸리티

export interface TimezoneInfo {
  base: string;           // 표준시 (UTC 기준)
  summer: string;         // 서머타임 (UTC 기준)
  isDST: boolean;         // 현재 서머타임 적용 여부
  offset: number;         // UTC 기준 분 단위 오프셋
  country: string;        // 국가명
  region: string;         // 지역명
}

/**
 * 특정 년도의 서머타임 시작/종료 날짜를 계산하는 함수
 */
export const getDSTDates = (year: number, country: string) => {
  // 유럽 서머타임: 3월 마지막 일요일 02:00 ~ 10월 마지막 일요일 03:00
  const getLastSunday = (month: number, year: number, hour: number = 2) => {
    const lastDay = new Date(year, month + 1, 0);
    const lastSunday = lastDay.getDate() - lastDay.getDay();
    return new Date(year, month, lastSunday, hour, 0, 0);
  };

  // 북미 서머타임: 3월 둘째 일요일 02:00 ~ 11월 첫째 일요일 02:00
  const getSecondSunday = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1);
    const firstSunday = firstDay.getDate() + (7 - firstDay.getDay()) % 7;
    const secondSunday = firstSunday + 7;
    return new Date(year, month, secondSunday, 2, 0, 0);
  };

  const getFirstSunday = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1);
    const firstSunday = firstDay.getDate() + (7 - firstDay.getDay()) % 7;
    return new Date(year, month, firstSunday, 2, 0, 0);
  };

  switch (country) {
    case 'vatican':
    case 'rome':
    case 'lourdes':
    case 'france':
    case 'italy':
    case 'spain':
    case 'greece':
    case 'turkiye':
    case 'medjugorje':
      return {
        start: getLastSunday(2, year, 2), // 3월 마지막 일요일 02:00
        end: getLastSunday(9, year, 3)     // 10월 마지막 일요일 03:00
      };
    
    case 'fatima':
    case 'portugal':
      return {
        start: getLastSunday(2, year, 2), // 3월 마지막 일요일 02:00
        end: getLastSunday(9, year, 3)     // 10월 마지막 일요일 03:00
      };
    
    case 'guadalupe':
    case 'mexico':
      return {
        start: getSecondSunday(3, year), // 4월 첫째 일요일
        end: getFirstSunday(10, year)     // 10월 마지막 일요일
      };
    
    case 'banneux':
    case 'belgium':
      return {
        start: getLastSunday(2, year, 2), // 3월 마지막 일요일 02:00
        end: getLastSunday(9, year, 3)     // 10월 마지막 일요일 03:00
      };
    
    case 'israel':
      // 이스라엘은 복잡한 규칙 (대략 3월 마지막 금요일 ~ 10월 마지막 일요일)
      return {
        start: new Date(year, 2, 31 - new Date(year, 2, 31).getDay() + 5, 2, 0, 0), // 3월 마지막 금요일
        end: getLastSunday(9, year) // 10월 마지막 일요일
      };
    
    case 'egypt':
      // 이집트는 서머타임을 사용하지 않음
      return null;
    
    default:
      return null;
  }
};

/**
 * 각 나라별 시차 정보
 */
const countryTimezones: Record<string, Omit<TimezoneInfo, 'isDST' | 'offset'>> = {
  vatican: { base: 'UTC+1', summer: 'UTC+2', country: '바티칸', region: '유럽' },
  rome: { base: 'UTC+1', summer: 'UTC+2', country: '이탈리아', region: '유럽' },
  lourdes: { base: 'UTC+1', summer: 'UTC+2', country: '프랑스', region: '유럽' },
  france: { base: 'UTC+1', summer: 'UTC+2', country: '프랑스', region: '유럽' },
  italy: { base: 'UTC+1', summer: 'UTC+2', country: '이탈리아', region: '유럽' },
  spain: { base: 'UTC+1', summer: 'UTC+2', country: '스페인', region: '유럽' },
  greece: { base: 'UTC+2', summer: 'UTC+3', country: '그리스', region: '유럽' },
  turkiye: { base: 'UTC+3', summer: 'UTC+3', country: '튀르키예', region: '유럽' }, // 서머타임 없음
  medjugorje: { base: 'UTC+1', summer: 'UTC+2', country: '보스니아', region: '유럽' },
  
  fatima: { base: 'UTC+0', summer: 'UTC+1', country: '포르투갈', region: '유럽' },
  portugal: { base: 'UTC+0', summer: 'UTC+1', country: '포르투갈', region: '유럽' },
  
  guadalupe: { base: 'UTC-6', summer: 'UTC-5', country: '멕시코', region: '북미' },
  mexico: { base: 'UTC-6', summer: 'UTC-5', country: '멕시코', region: '북미' },
  
  banneux: { base: 'UTC+1', summer: 'UTC+2', country: '벨기에', region: '유럽' },
  belgium: { base: 'UTC+1', summer: 'UTC+2', country: '벨기에', region: '유럽' },
  
  israel: { base: 'UTC+2', summer: 'UTC+3', country: '이스라엘', region: '중동' },
  egypt: { base: 'UTC+2', summer: 'UTC+2', country: '이집트', region: '아프리카' }, // 서머타임 없음
};

/**
 * 현재 시간을 기준으로 서머타임 적용 여부를 판단
 */
export const getTimezoneInfo = (country: string): TimezoneInfo => {
  const now = new Date();
  const year = now.getFullYear();
  
  const countryInfo = countryTimezones[country];
  if (!countryInfo) {
    return {
      base: 'UTC+0',
      summer: 'UTC+0',
      isDST: false,
      offset: 0,
      country: '알 수 없음',
      region: '알 수 없음'
    };
  }

  const dstDates = getDSTDates(year, country);
  let isDST = false;
  let offset = 0;

  if (dstDates) {
    isDST = now >= dstDates.start && now < dstDates.end;
  }

  // UTC 기준 분 단위 오프셋 계산
  if (isDST) {
    offset = parseTimezoneOffset(countryInfo.summer);
  } else {
    offset = parseTimezoneOffset(countryInfo.base);
  }

  return {
    ...countryInfo,
    isDST,
    offset
  };
};

/**
 * UTC 문자열을 분 단위 오프셋으로 변환
 */
const parseTimezoneOffset = (timezone: string): number => {
  const match = timezone.match(/UTC([+-])(\d+)/);
  if (!match) return 0;
  
  const sign = match[1] === '+' ? 1 : -1;
  const hours = parseInt(match[2]);
  return sign * hours * 60;
};

/**
 * 현재 시간을 특정 국가의 시간대로 변환
 */
export const getCurrentTimeInCountry = (country: string): string => {
  const timezoneInfo = getTimezoneInfo(country);
  const now = new Date();
  
  // UTC 시간에 오프셋을 더해서 해당 국가 시간 계산
  const countryTime = new Date(now.getTime() + (timezoneInfo.offset * 60 * 1000));
  
  return countryTime.toLocaleString('ko-KR', {
    timeZone: 'UTC',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
};

/**
 * 한국과의 시차 정보를 반환하는 인터페이스
 */
export interface KoreaTimeDifference {
  displayString: string; // 예: "한국보다 8시간 늦음 (서머타임 -7시간)"
  rawHours: number;      // 예: -8 (시간 단위)
  rawMinutes: number;    // 예: 0 (분 단위)
  isBehind: boolean;     // 한국보다 늦으면 true, 빠르면 false
  isDST: boolean;        // 서머타임 적용 여부
}

/**
 * 한국과의 시차를 계산 (서머타임 정보 포함)
 */
export const getTimeDifferenceFromKorea = (country: string): KoreaTimeDifference => {
  const timezoneInfo = getTimezoneInfo(country);
  const koreaOffset = 9 * 60; // 한국은 UTC+9 (540분)
  const difference = timezoneInfo.offset - koreaOffset; // 분 단위 시차

  const absDifferenceMinutes = Math.abs(difference);
  const hours = Math.floor(absDifferenceMinutes / 60);
  const minutes = absDifferenceMinutes % 60;

  let displayString = '';
  let isBehind = false;

  if (difference > 0) { // 한국보다 빠름
    displayString = `한국보다 ${hours}시간 ${minutes > 0 ? minutes + '분 ' : ''}빠름`;
    isBehind = false;
  } else if (difference < 0) { // 한국보다 늦음
    displayString = `한국보다 ${hours}시간 ${minutes > 0 ? minutes + '분 ' : ''}늦음`;
    isBehind = true;
  } else {
    displayString = '한국과 동일';
    isBehind = false;
  }

  // 서머타임 정보 추가
  if (timezoneInfo.isDST) {
    // 서머타임 적용 중일 때
    displayString += ' (서머타임 적용)';
  } else {
    // 서머타임이 없는 나라인지 확인
    const dstDates = getDSTDates(new Date().getFullYear(), country);
    if (dstDates === null) {
      displayString += ' (서머타임 없음)';
    } else {
      // 표준시일 때
      displayString += ' (표준시)';
    }
  }

  return {
    displayString,
    rawHours: isBehind ? -hours : hours, // 한국보다 늦으면 음수, 빠르면 양수
    rawMinutes: minutes,
    isBehind: isBehind,
    isDST: timezoneInfo.isDST, // 서머타임 적용 여부 추가
  };
};

/**
 * 시차 정보를 표시용 문자열로 변환
 */
export const getTimezoneDisplayString = (country: string): string => {
  const timezoneInfo = getTimezoneInfo(country);
  const currentTimezone = timezoneInfo.isDST ? timezoneInfo.summer : timezoneInfo.base;
  const difference = getTimeDifferenceFromKorea(country);
  
  return `${currentTimezone} (${difference})`;
};
