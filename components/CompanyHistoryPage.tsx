import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// 임시 이미지 URL 사용
const companyImage = "https://via.placeholder.com/800x400?text=Company+History";

export default function CompanyHistoryPage({ setCurrentPage }) {
  const historyData = [
    {
      year: "2024",
      events: [
        "성지순례 전문 여행사로 새로운 도약",
        "온라인 예약 시스템 구축"
      ]
    },
    {
      year: "2023",
      events: [
        "가톨릭 성지순례 전문 가이드 양성 프로그램 시작",
        "유럽 성지순례 코스 개발"
      ]
    },
    {
      year: "2022",
      events: [
        "회사 설립",
        "첫 성지순례 상품 출시"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">회사 연혁</h1>
      
      <div className="mb-12">
        <img
          src={companyImage}
          alt="회사 이미지"
          className="w-full rounded-lg shadow-lg mb-8"
        />
      </div>

      <div className="space-y-8">
        {historyData.map((period) => (
          <div key={period.year} className="border-l-4 border-primary pl-4">
            <h2 className="text-2xl font-semibold mb-4">
              {period.year}
              <Badge variant="secondary" className="ml-3">
                {period.events.length}개의 이벤트
              </Badge>
            </h2>
            <ul className="space-y-2">
              {period.events.map((event, index) => (
                <li key={index} className="text-gray-600">
                  {event}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}