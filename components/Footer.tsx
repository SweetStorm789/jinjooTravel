import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Phone, Mail, MapPin, Clock, ArrowUp } from "lucide-react";
import Logo from "./Logo";

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4">
                  <span className="text-xl text-gray-900">⛪</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">(주)진주여행사</h3>
                  <span className="text-gray-400">성지순례 전문여행사</span>
                </div>
              </div>
              
              <p className="text-gray-300 mb-8 leading-relaxed max-w-lg">
                30여년간 쌓아온 전문 노하우로 안전하고 의미있는 성지순례 여행을 제공합니다. 
                믿음과 함께하는 특별한 여행을 경험해보세요.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="w-5 h-5 text-gray-300" />
                  </div>
                  <div>
                    <div className="font-medium">전화번호</div>
                    <div className="text-gray-400">02-738-0747, 02-734-1236</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-5 h-5 text-gray-300" />
                  </div>
                  <div>
                    <div className="font-medium">이메일</div>
                    <div className="text-gray-400">master@jjtravel.co.kr</div>
                  </div>
                </div>
              </div>
            </div>



            {/* Contact & Hours */}
            <div>
              <h4 className="text-lg font-semibold mb-6">고객센터</h4>
              
              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                  <Clock className="w-5 h-5 text-gray-300 mr-3" />
                  <span className="font-medium">운영시간</span>
                </div>
                <div className="space-y-2 text-gray-400 text-sm">
                  <div>평일 09:00 - 18:00</div>
                  <div>토요일, 일요일 및 공휴일 휴무</div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage("directions");
                  }}
                  className="block hover:bg-gray-700 rounded-lg p-2 -m-2 transition-colors duration-200"
                >
                  <div className="flex items-center mb-4">
                    <MapPin className="w-5 h-5 text-gray-300 mr-3" />
                    <span className="font-medium text-gray-300 hover:text-white">오시는 길</span>
                  </div>
                  <div className="text-gray-400 text-sm leading-relaxed">
                    서울시 서대문구 서소문로 37 충정로 대우디오빌 801호
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-800" />

        {/* Bottom footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 진주여행사. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage("company");
                }}
              className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                회사소개
              </a>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage("privacy-policy");
                }}
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                개인정보처리방침
              </a>
              <a href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage("travel-terms");
                }}
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                여행약관
              </a>
              <Button
                onClick={scrollToTop}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}