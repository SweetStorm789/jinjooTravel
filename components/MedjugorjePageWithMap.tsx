import LocationMap from "./shared/LocationMap";
import { getPilgrimageInfo } from "./constants/holyPlaces";

// 기존 MedjugorjePage 컴포넌트에 다음을 추가:

export default function MedjugorjePage({ setCurrentPage }: MedjugorjePageProps) {
  // ... 기존 코드 ...

  const placeInfo = getPilgrimageInfo('medjugorje');

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* 메인 컨텐츠 (3/4) */}
          <div className="lg:col-span-3">
            {/* 기존 헤더 섹션 */}
            <header className="border-b-2 border-foreground pb-8 mb-12">
              {/* 기존 헤더 내용 */}
            </header>

            {/* 위치 정보 맵 추가 */}
            <div className="mb-12">
              <LocationMap
                placeName={placeInfo?.nameKo || "메주고리예"}
                coordinates={placeInfo?.coordinates}
                address={placeInfo?.address}
                className="mb-6"
              />
              
              {/* 방문 안내 */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="font-medium mb-3 text-blue-800">📍 방문 안내</h4>
                <div className="space-y-2 text-sm text-blue-700">
                  <p><strong>주소:</strong> {placeInfo?.address}</p>
                  <p><strong>교통:</strong> 사라예보 공항에서 차로 약 2시간</p>
                  <p><strong>숙박:</strong> 메주고리예 마을 내 가톨릭 순례자 숙소 이용</p>
                  <div className="flex gap-2 mt-4">
                    <a 
                      href={placeInfo?.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                    >
                      🗺️ 길찾기
                    </a>
                    <a 
                      href={placeInfo?.searchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors"
                    >
                      🔍 지도에서 보기
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 기존 갤러리 및 콘텐츠 */}
            {/* ... */}
          </div>

          {/* 기존 사이드바 */}
          {/* ... */}
        </div>
      </div>
    </div>
  );
}