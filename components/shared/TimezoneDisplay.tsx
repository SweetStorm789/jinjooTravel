import { useState, useEffect } from 'react';
import { Clock, Globe, AlertCircle, Sun, Moon, RefreshCw } from 'lucide-react';
import { getTimezoneInfo, getCurrentTimeInCountry, getTimezoneDisplayString, getTimeDifferenceFromKorea, getDSTDates, KoreaTimeDifference } from '../../utils/timezone';

interface TimezoneDisplayProps {
  country: string;
  className?: string;
}

export default function TimezoneDisplay({ country, className = '' }: TimezoneDisplayProps) {
  const [timezoneInfo, setTimezoneInfo] = useState(getTimezoneInfo(country));
  const [currentTime, setCurrentTime] = useState(getCurrentTimeInCountry(country));
  const [displayString, setDisplayString] = useState(getTimezoneDisplayString(country));
  const [timeDifference, setTimeDifference] = useState<KoreaTimeDifference>(getTimeDifferenceFromKorea(country));
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const updateTimezone = () => {
      setIsUpdating(true);
      const newTimezoneInfo = getTimezoneInfo(country);
      const newCurrentTime = getCurrentTimeInCountry(country);
      const newDisplayString = getTimezoneDisplayString(country);
      const newTimeDifference = getTimeDifferenceFromKorea(country);
      
      setTimezoneInfo(newTimezoneInfo);
      setCurrentTime(newCurrentTime);
      setDisplayString(newDisplayString);
      setTimeDifference(newTimeDifference);
      
      setTimeout(() => setIsUpdating(false), 500); // 0.5초 후 업데이트 완료
    };

    // 초기 업데이트
    updateTimezone();

    // 1분마다 업데이트 (서머타임 변경 시점을 놓치지 않기 위해)
    const interval = setInterval(updateTimezone, 60000);

    return () => clearInterval(interval);
  }, [country]);

  // 서머타임 상태에 따른 아이콘과 색상 결정
  const getDSTStatus = () => {
    if (timezoneInfo.isDST) {
      return {
        icon: Sun,
        color: 'text-orange-600',
        bgColor: 'bg-orange-100',
        text: '서머타임 적용 중'
      };
    } else {
      // 서머타임이 없는 나라인지 확인
      const dstDates = getDSTDates(new Date().getFullYear(), country);
      if (dstDates === null) {
        return {
          icon: AlertCircle,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          text: '서머타임 없음'
        };
      } else {
        return {
          icon: Moon,
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          text: '표준시'
        };
      }
    }
  };

  const dstStatus = getDSTStatus();
  const StatusIcon = dstStatus.icon;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 1. 국가명 및 서머타임 상태 */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            {timezoneInfo.country} ({timezoneInfo.region})
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-xs ${dstStatus.bgColor} ${dstStatus.color} px-2 py-1 rounded flex items-center space-x-1`}>
            <StatusIcon className="h-3 w-3" />
            <span>{dstStatus.text}</span>
          </span>
        </div>
      </div>

      {/* 2. 현지 시간 */}
      <div className="flex items-center space-x-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">
          현지 시간: {currentTime}
        </span>
      </div>

      {/* 3. 한국과의 시차 (이미지 형식으로 변경) */}
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">시차</span>
        </div>
        <div className="flex items-baseline space-x-1">
          <span className="text-3xl font-bold">
            {timeDifference.rawHours}
          </span>
          <span className="text-base font-medium">
            시간
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {timeDifference.displayString}
        </p>
      </div>

      {/* 4. 실시간 업데이트 상태 */}
      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
        <RefreshCw className={`h-3 w-3 ${isUpdating ? 'animate-spin text-green-500' : 'text-gray-400'}`} />
        <span>{isUpdating ? '업데이트 중...' : '실시간 업데이트 중'}</span>
      </div>
    </div>
  );
}
