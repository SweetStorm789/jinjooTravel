import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin, Phone, Mail } from "lucide-react";

// 구글맵 주소
const companyAddress = "서울특별시 서대문구 서소문로 37 충정로 대우디오빌 801호";
const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(companyAddress)}`;

interface DirectionsPageProps {
  setCurrentPage: (page: string) => void;
}

export default function DirectionsPage({ setCurrentPage }: DirectionsPageProps) {
  const contactInfo = {
    address: "서울특별시 서대문구 서소문로 37 충정로 대우디오빌 801호",
    phone: "02-738-0747, 02-734-1236",
    fax: "02-738-0769",
    email: "master@jjtravel.co.kr"
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">오시는 길</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="w-full h-96 rounded-lg shadow-lg overflow-hidden">
            <iframe
              src={googleMapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="진주여행사 위치"
            />
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              주소
            </h2>
            <p className="text-gray-700 leading-relaxed">{contactInfo.address}</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Phone className="h-5 w-5 text-blue-600" />
              연락처
            </h2>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-medium">전화:</span> {contactInfo.phone}</p>
              <p><span className="font-medium">팩스:</span> {contactInfo.fax}</p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="font-medium">이메일:</span> {contactInfo.email}
              </p>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">교통편</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>지하철 2호선, 5호선 충정로역 3번 출구</li>
              <li>도보 약 3분 거리</li>
              {/* <li>버스 104, 105, 421, 472 명동성당 하차</li> */}
            </ul>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <h2 className="text-lg font-semibold mb-3">찾아오시는 길</h2>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• 충정로역 3번 출구로 나와서</p>
              <p>• 서소문로 방향으로 직진</p>
              <p>• 대우디오빌 건물 8층 801호</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}