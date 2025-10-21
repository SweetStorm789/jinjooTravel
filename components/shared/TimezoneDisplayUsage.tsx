// 각 성지 페이지에서 TimezoneDisplay 컴포넌트 사용 방법

import TimezoneDisplay from './TimezoneDisplay';

// 예시: 루르드 페이지에 적용
export default function LourdesPage({ setCurrentPage }: LourdesPageProps) {
  return (
    <div className="bg-background min-h-screen">
      {/* ... 기존 코드 ... */}
      
      {/* 사이드바에 시간대 정보 추가 */}
      <div className="xl:col-span-1">
        <div className="sticky top-6 space-y-6">
          {/* 시간대 정보 */}
          <Card>
            <CardHeader>
              <CardTitle>시간대 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <TimezoneDisplay country="lourdes" />
            </CardContent>
          </Card>
          
          {/* 기존 여행 정보 */}
          <Card>
            <CardHeader>
              <CardTitle>여행 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* 전압, 화폐, 기후 등 기존 정보 */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// 다른 성지 페이지들에서의 사용법:

// 파티마 페이지
<TimezoneDisplay country="fatima" />

// 메주고리예 페이지  
<TimezoneDisplay country="medjugorje" />

// 과달루페 페이지
<TimezoneDisplay country="guadalupe" />

// 바뇌 페이지
<TimezoneDisplay country="banneux" />

// 이스라엘 페이지
<TimezoneDisplay country="israel" />

// 이집트 페이지 (서머타임 없음)
<TimezoneDisplay country="egypt" />

// 그리스 페이지
<TimezoneDisplay country="greece" />

// 스페인 페이지
<TimezoneDisplay country="spain" />

// 튀르키예 페이지 (서머타임 없음)
<TimezoneDisplay country="turkiye" />
