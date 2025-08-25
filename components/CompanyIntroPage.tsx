import React from 'react';
import { Card, CardContent } from './ui/card';
import { Building, Star, Heart, Users, Award, Globe, MapPin, Phone, Mail } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import companyLogo from '../images/company/company.png';

interface CompanyIntroPageProps {
  setCurrentPage: (page: string) => void;
}

export default function CompanyIntroPage({ setCurrentPage }: CompanyIntroPageProps) {
  // 회사 설립연도와 현재 연도 계산
  const foundingYear = 1991;
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - foundingYear;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">회사 소개</h1>
        <p className="text-gray-600">{yearsOfExperience}년간 고객과 함께한 진주여행사의 이야기</p>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* 왼쪽 섹션 - 텍스트 콘텐츠 */}
        <div className="space-y-6">
          {/* 대표 인사말 */}
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <div className="flex items-center gap-2 mb-4">
                <Building className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">대표 인사말</h2>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                진주여행사에 오신 것을 환영합니다
              </h3>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  1991년부터 시작하여 고객과의 신뢰를 바탕으로 해외여행과 성지순례를 통해 
                  국내 여행업계에서 중견 역량을 발휘하고 있는 진주여행사입니다.
                </p>
                
                <p>
                  고객의 사랑과 쌓아온 노하우를 바탕으로 성지순례 상품팀을 중심으로 
                  고객들에게 다가서겠습니다.
                </p>
                
                <p>
                  차별화된 서비스와 최고의 서비스를 제공하기 위해 노력하고 있으며, 
                  고객의 소중한 추억이 될 여행을 위해 최선을 다하겠습니다.
                </p>
                
                <p>
                  감사합니다.
                </p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-gray-600">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">진주여행사 대표이사 박영민 야고보</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span>{yearsOfExperience}년 여행업계 경력</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 회사 정보 */}
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">회사 정보</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">회사명</p>
                      <p className="text-gray-600">진주여행사</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">주소</p>
                      <p className="text-gray-600">서울특별시 서대문구 서소문로 37 충정로 대우디오빌 801호</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">전화번호</p>
                      <p className="text-gray-600">02-738-0747</p>
                    </div>
                  </div>
                  

                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">설립연도</p>
                      <p className="text-gray-600">{foundingYear}년</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">주요 사업</p>
                      <p className="text-gray-600">해외여행, 성지순례</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">이메일</p>
                      <p className="text-gray-600">master@jjtravel.co.kr</p>
                    </div>
                  </div>                  
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 오른쪽 섹션 - 이미지 */}
        <div className="flex items-center justify-center">
          <Card className="w-full h-96 bg-gray-100 border-0 shadow-none">
            <ImageWithFallback src={companyLogo} alt="진주여행사 로고" className="w-full h-full object-cover" />
            <CardContent className="p-0 h-full flex items-center justify-center">
              <div className="text-center">
                {/*     <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Building className="h-16 w-16 text-gray-400" />
                </div> */}
                <div className="bg-white p-4 rounded-lg shadow-sm max-w-xs mx-auto">
                  <p className="text-sm text-gray-700 italic">
                    "하느님의 은총 안에서 함께 걸어가는 신앙의 여정"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 회사 비전 및 미션 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="text-center p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">비전</h3>
          <p className="text-gray-600">
            신앙과 여행을 결합한 최고의 성지순례 전문 여행사
          </p>
        </Card>

        <Card className="text-center p-6">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">미션</h3>
          <p className="text-gray-600">
            고객의 영적 성장과 소중한 추억을 위한 최고의 서비스 제공
          </p>
        </Card>

        <Card className="text-center p-6">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="h-6 w-6 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">핵심가치</h3>
          <p className="text-gray-600">
            신뢰, 전문성, 고객 중심의 서비스 정신
          </p>
        </Card>
      </div>

      {/* 연혁 */}
      {/* <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">회사 연혁</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-16 text-sm font-medium text-blue-600">1991</div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">진주여행사 설립</p>
                <p className="text-gray-600">해외여행 전문 여행사로 시작</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-16 text-sm font-medium text-blue-600">2000</div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">성지순례 전문팀 구성</p>
                <p className="text-gray-600">성지순례 전문 상품 개발 및 운영</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-16 text-sm font-medium text-blue-600">2010</div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">온라인 예약 시스템 구축</p>
                <p className="text-gray-600">고객 편의를 위한 디지털 서비스 도입</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-16 text-sm font-medium text-blue-600">2020</div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">성지순례 전문 브랜드 확립</p>
                <p className="text-gray-600">국내 최고의 성지순례 전문 여행사로 성장</p>
              </div>
            </div>
            
                         <div className="flex items-start gap-4">
               <div className="w-16 text-sm font-medium text-blue-600">{currentYear}</div>
               <div className="flex-1">
                 <p className="font-medium text-gray-900">{yearsOfExperience}주년 기념</p>
                 <p className="text-gray-600">고객과 함께한 {yearsOfExperience}년의 신뢰와 성장</p>
               </div>
             </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
