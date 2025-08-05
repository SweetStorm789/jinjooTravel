import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// 임시 이미지 URL 사용
const mapImage = "https://via.placeholder.com/800x400";

export default function DirectionsPage({ setCurrentPage }) {
  const contactInfo = {
    address: "서울특별시 중구 명동길 74 (명동2가, 명동성당) 가톨릭회관 4층",
    phone: "02-777-8585",
    fax: "02-777-8586",
    email: "info@jinjootravel.com"
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">오시는 길</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={mapImage} alt="회사 위치" className="w-full rounded-lg shadow-lg" />
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">주소</h2>
            <p>{contactInfo.address}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">연락처</h2>
            <p>전화: {contactInfo.phone}</p>
            <p>팩스: {contactInfo.fax}</p>
            <p>이메일: {contactInfo.email}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">교통편</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>지하철 4호선 명동역 6번 출구</li>
              <li>버스 104, 105, 421, 472 명동성당 하차</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}