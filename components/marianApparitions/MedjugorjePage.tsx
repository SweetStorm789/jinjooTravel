import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Church,
  Heart,
  Phone,
  Mail,
  Globe,
  Quote,
  Star,
  Mountain,
  Eye,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useState, useEffect } from "react";
import GoogleMap from "../shared/GoogleMap";
import TimezoneDisplay from "../shared/TimezoneDisplay";
import { getTimeDifferenceFromKorea } from "../../utils/timezone";
import { holyPlacesLocations } from "../constants/holyPlacesLocations";

// 메주고리예 실제 사진들 import
import crossMountainPhoto from '../../images/medjugorje/medjugorje1.jpg';
import apparitionHillPhoto from '../../images/medjugorje/medjugorje2.jpg';
import stJamesChurchPhoto from '../../images/medjugorje/medjugorje3.jpg';

interface MedjugorjePageProps {
  setCurrentPage: (page: string) => void;
}

export default function MedjugorjePage({ setCurrentPage }: MedjugorjePageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [timeDifference, setTimeDifference] = useState(getTimeDifferenceFromKorea('medjugorje'));
  
  // 실시간 시차 업데이트
  useEffect(() => {
    const updateTimeDifference = () => {
      setTimeDifference(getTimeDifferenceFromKorea('medjugorje'));
    };

    // 초기 업데이트
    updateTimeDifference();

    // 1분마다 업데이트
    const interval = setInterval(updateTimeDifference, 60000);

    return () => clearInterval(interval);
  }, []);

  const marianSites = [
    { id: "fatima", name: "파티마", country: "포르투갈", active: false },
    { id: "lourdes", name: "루르드", country: "프랑스", active: false },
    { id: "guadalupe", name: "과달루페", country: "멕시코", active: false },
    { id: "banneux", name: "바뇌", country: "벨기에", active: false },
    { id: "medjugorje", name: "메주고리예", country: "보스니아", active: true }
  ];

  // 메주고리예 성지 이미지들
  const medjugorjeImages = [
    {
      src: crossMountainPhoto,
      alt: "메주고리예 십자가의 산",
      caption: "크리제바츠 산(십자가의 산)에서 기도하는 순례자들. 십자가의 길을 따라 오르며 깊은 묵상과 기도를 드릴 수 있습니다."
    },
    {
      src: apparitionHillPhoto,
      alt: "메주고리예 발현언덕의 성모상",
      caption: "포드브르도 언덕(발현언덕)의 성모상. 1981년 첫 발현이 일어난 바로 이곳에서 성모님을 기리는 순례자들의 모습입니다."
    },
    {
      src: stJamesChurchPhoto,
      alt: "메주고리예 성 야고보 성당 야경",
      caption: "메주고리예의 중심인 성 야고보 성당 야경. 매일 저녁 이곳에서 전 세계 순례자들과 함께 드리는 미사는 특별한 은총의 시간입니다."
    }
  ];

  const visionaries = [
    { name: "이반카 이반코비치", birth: "1966", status: "일일 발현 종료" },
    { name: "미르야나 드라기체비치", birth: "1965", status: "월 2일 발현" },
    { name: "비츠카 이반코비치", birth: "1964", status: "계속 발현" },
    { name: "마르야 파블로비치", birth: "1965", status: "계속 발현" },
    { name: "이반 드라기체비치", birth: "1965", status: "계속 발현" },
    { name: "야코프 콜로", birth: "1971", status: "계속 발현" }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % medjugorjeImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + medjugorjeImages.length) % medjugorjeImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* 메인 컨텐츠 (3/4) */}
          <div className="lg:col-span-3">
            {/* 헤더 섹션 - 신문 스타일 */}
            <header className="border-b-2 border-foreground pb-8 mb-12">
              <div className="text-center mb-6">
                <p className="text-sm uppercase tracking-wide text-muted-foreground mb-2">
                  성모님 발현지 특집
                </p>
                <h1 className="text-6xl md:text-7xl tracking-tight mb-4">
                  메주고리예
                </h1>
                <p className="text-xl text-muted-foreground italic">
                  Medjugorje, Bosnia Herzegovina • 1981년부터 현재까지 계속되는 발현
                </p>
              </div>
              
              <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
                <span>보스니아 헤르체고비나</span>
                <span>•</span>
                <span>6명의 시현자들</span>
                <span>•</span>
                <span>42년간 계속되는 발현</span>
              </div>
            </header>

            {/* 메주고리예 성지 이미지 갤러리 */}
            <div className="mb-12">
              <h3 className="text-xl font-medium mb-4 text-center">메주고리예 성지 사진</h3>
              
              {/* 이미지 그리드 - 루르드와 동일한 2x2 레이아웃으로 변경하되 3개만 사용 */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {medjugorjeImages.map((image, index) => (
                  <div 
                    key={index}
                    className={`flex flex-col space-y-4 ${
                      index === 2 ? 'col-span-2' : ''
                    }`}
                  >
                    <div 
                      className="aspect-video overflow-hidden rounded-lg cursor-pointer group relative"
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setIsGalleryOpen(true);
                      }}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      
                      {/* 호버 오버레이 */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      {image.alt}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground italic text-center">
                메주고리예 성지의 주요 장소들. 클릭하시면 큰 화면으로 보실 수 있습니다.
              </p>
            </div>

            {/* 이미지 갤러리 모달 - 완벽한 중앙 정렬 */}
            <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
              <DialogContent className="max-w-[95vw] max-h-[95vh] w-auto h-auto p-0 bg-transparent border-0 shadow-none">
                {/* 접근성을 위한 숨겨진 제목과 설명 */}
                <DialogTitle className="sr-only">
                  메주고리예 성지 사진 갤러리 - {medjugorjeImages[currentImageIndex].alt}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  메주고리예 성지의 사진들을 큰 화면으로 보실 수 있습니다. 좌우 화살표 버튼이나 하단의 점들을 클릭하여 다른 사진으로 이동할 수 있습니다.
                </DialogDescription>
                
                {/* 고정된 모달 틀 */}
                <div className="relative w-full h-full min-h-[80vh]">
                  {/* 닫기 버튼 - 숨김 처리 */}
                  {/* <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsGalleryOpen(false)}
                    className="absolute top-4 right-4 z-40 bg-white hover:bg-white/90 shadow-lg border border-gray-300"
                  >
                    <X className="h-4 w-4" />
                  </Button> */}

                  {/* 이미지와 네비게이션 버튼 컨테이너 - 모달 중앙에 배치 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <img
                        key={currentImageIndex}
                        src={medjugorjeImages[currentImageIndex].src}
                        alt={medjugorjeImages[currentImageIndex].alt}
                        className="object-contain"
                        style={{
                          maxWidth: 'calc((100vw - 12rem) * 0.7)',
                          maxHeight: 'calc((100vh - 16rem) * 0.7)'
                        }}
                      />
                      
                      {/* 네비게이션 버튼들 - 이미지 양끝에 배치 */}
                      {medjugorjeImages.length > 1 && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={prevImage}
                            className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 z-30 bg-white hover:bg-white/90 shadow-lg border border-gray-300"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={nextImage}
                            className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 z-30 bg-white hover:bg-white/90 shadow-lg border border-gray-300"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* 하단 정보 패널 - 모달 하단에 고정 */}
                  <div 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-t from-black/95 via-black/80 to-black/20 p-8 pt-12 z-20 rounded-t-lg"
                    style={{
                      width: 'calc((100vw - 12rem) * 0.7)',
                      maxWidth: 'calc((100vw - 12rem) * 0.7)'
                    }}
                  >
                    {/* 이미지 설명 - 더 큰 텍스트와 넓은 영역 */}
                    <div className="text-center mb-6">
                      <p className="text-white text-base leading-relaxed max-w-4xl mx-auto">
                        {medjugorjeImages[currentImageIndex].caption}
                      </p>
                    </div>

                    {/* 모달 내 인디케이터 - 더 큰 크기 */}
                    {medjugorjeImages.length > 1 && (
                      <div className="flex justify-center space-x-4 mb-6">
                        {medjugorjeImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToImage(index)}
                            className={`w-4 h-4 rounded-full transition-all duration-200 ${
                              index === currentImageIndex 
                                ? "bg-white scale-110" 
                                : "bg-white/50 hover:bg-white/75 hover:scale-105"
                            }`}
                            aria-label={`${index + 1}번째 이미지로 이동`}
                          />
                        ))}
                      </div>
                    )}

                    {/* 이미지 카운터 - 더 큰 텍스트 */}
                    <div className="text-center">
                      <span className="text-white/70 text-sm">
                        {currentImageIndex + 1} / {medjugorjeImages.length}
                      </span>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* 리드 문단 */}
            <div className="mb-12">
              <div className="bg-muted/30 p-8 border-l-4 border-foreground">
                <p className="text-lg leading-relaxed">
                  <span className="text-6xl float-left mr-3 mt-1 leading-none">1</span>
                  981년 6월 24일부터 시작된 메주고리예의 성모님 발현은 현대에 일어나고 있는 
                  가장 오랜 기간 계속되는 성모 발현 중 하나입니다. 보스니아 헤르체고비나의 
                  작은 마을에서 6명의 어린이들에게 나타나신 성모 마리아께서는 스스로를 
                  "평화의 여왕"이라고 소개하시며, 기도와 단식, 회개를 통한 평화의 메시지를 
                  전하고 계십니다. 42년이 지난 지금도 일부 시현자들에게는 발현이 계속되고 있으며, 
                  전 세계에서 연간 100만 명 이상의 순례자가 찾는 현대의 대표적인 성지가 되었습니다.
                </p>
              </div>
            </div>

            {/* 본문 - 멀티 컬럼 */}
            <article className="space-y-16">
              {/* 발현의 시작 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">6명의 시현자들</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <p>
                      <span className="text-3xl float-left mr-2 mt-1 leading-none">1</span>
                      981년 6월 24일 오후, 메주고리예 마을의 6명의 어린이들이 
                      포드브르도 언덕에서 양을 치고 있을 때 아름다운 부인이 
                      나타나는 것을 보았습니다. 처음에는 무서워서 달아났지만, 
                      다음 날 다시 같은 곳에서 성모님을 만났습니다.
                    </p>
                    <p>
                      시현자들은 이반카 이반코비치(15세), 미르야나 드라기체비치(16세), 
                      비츠카 이반코비치(17세), 마르야 파블로비치(16세), 
                      이반 드라기체비치(16세), 야코프 콜로(10세)였습니다. 
                      이들은 모두 평범한 농촌 마을의 아이들이었습니다.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <p>
                      성모님께서는 크로아티아어로 말씀하시며, 
                      "평화, 평화, 평화! 하느님과 인간 사이에만 평화가 있어야 한다"고 
                      말씀하셨습니다. 이것이 메주고리예 메시지의 핵심인 
                      평화의 메시지의 시작이었습니다.
                    </p>
                    <p>
                      42년이 지난 지금도 3명의 시현자(비츠카, 마르야, 이반)는 
                      매일 발현을 계속 받고 있으며, 미르야나는 매월 2일에, 
                      이반카와 야코프는 각자의 생일에 연례 발현을 받고 있습니다.
                    </p>
                  </div>
                </div>

                {/* 시현자들 정보 */}
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h4 className="font-medium mb-4">6명의 시현자들</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {visionaries.map((visionary, index) => (
                      <div key={index} className="bg-background p-4 rounded border">
                        <h5 className="font-medium mb-1">{visionary.name}</h5>
                        <p className="text-sm text-muted-foreground mb-1">출생: {visionary.birth}년</p>
                        <p className="text-xs text-muted-foreground">{visionary.status}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 인용구 */}
                <blockquote className="bg-muted/50 p-8 my-8 border-l-4 border-primary italic text-center">
                  <Quote className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg mb-4">
                    "나는 평화의 여왕이다. 평화, 평화, 평화! 
                    하느님과 인간 사이에만 평화가 있어야 한다."
                  </p>
                  <footer className="text-sm text-muted-foreground">
                    — 평화의 여왕, 1981년 6월 26일
                  </footer>
                </blockquote>
              </section>

              {/* 5개의 기둥 메시지 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">메주고리예의 5개 기둥</h2>
                
                <div className="space-y-8">
                  <p className="leading-relaxed">
                    성모님께서는 메주고리예에서 평화에 이르는 길로 5가지 기본적인 영성 실천을 제시하셨습니다. 
                    이것이 바로 메주고리예의 "5개 기둥"이라고 불리는 메시지입니다.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                        <Heart className="h-8 w-8 text-blue-600" />
                      </div>
                      <h4 className="font-medium mb-2">기도</h4>
                      <p className="text-sm text-muted-foreground">
                        특히 묵주기도와 성체조배를 통한 깊은 기도 생활
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                        <Mountain className="h-8 w-8 text-green-600" />
                      </div>
                      <h4 className="font-medium mb-2">단식</h4>
                      <p className="text-sm text-muted-foreground">
                        수요일과 금요일 빵과 물만으로 하는 단식
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                        <Church className="h-8 w-8 text-purple-600" />
                      </div>
                      <h4 className="font-medium mb-2">성경</h4>
                      <p className="text-sm text-muted-foreground">
                        매일 성경 말씀을 읽고 묵상하는 삶
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                        <Star className="h-8 w-8 text-amber-600" />
                      </div>
                      <h4 className="font-medium mb-2">고해성사</h4>
                      <p className="text-sm text-muted-foreground">
                        정기적인 고해성사를 통한 회개와 정화
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                        <Users className="h-8 w-8 text-red-600" />
                      </div>
                      <h4 className="font-medium mb-2">성체성사</h4>
                      <p className="text-sm text-muted-foreground">
                        매일 미사 참례와 성체께 대한 깊은 사랑
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h4 className="font-medium mb-3 text-blue-800">평화의 길</h4>
                    <p className="text-sm text-blue-700 leading-relaxed">
                      성모님께서는 이 5가지 실천을 통해 개인의 마음에 평화가 이루어지고, 
                      이것이 가정과 사회, 나아가 세계 평화로 확산된다고 말씀하셨습니다. 
                      "너희 마음에 평화가 있으면 세상에도 평화가 있을 것이다"라는 메시지가 
                      메주고리예 영성의 핵심입니다.
                    </p>
                  </div>
                </div>
              </section>

              {/* 주요 메시지들 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">주요 메시지들</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="border-l-2 border-primary pl-6">
                        <h4 className="font-medium">평화의 메시지</h4>
                        <p className="text-sm text-muted-foreground">
                          "평화가 위협받고 있다. 기도를 통해서만 평화를 지킬 수 있다"
                        </p>
                      </div>
                      
                      <div className="border-l-2 border-muted pl-6">
                        <h4 className="font-medium">회개의 촉구</h4>
                        <p className="text-sm text-muted-foreground">
                          "회개하라. 이것이 내가 여기 온 이유다. 회개 없이는 평화가 없다"
                        </p>
                      </div>
                      
                      <div className="border-l-2 border-muted pl-6">
                        <h4 className="font-medium">기도의 중요성</h4>
                        <p className="text-sm text-muted-foreground">
                          "기도하라, 기도하라, 기도하라! 기도로써 모든 것을 얻을 수 있다"
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="border-l-2 border-muted pl-6">
                        <h4 className="font-medium">단식의 은총</h4>
                        <p className="text-sm text-muted-foreground">
                          "단식은 기도와 함께 전쟁도 막을 수 있고 자연법칙도 바꿀 수 있다"
                        </p>
                      </div>
                      
                      <div className="border-l-2 border-muted pl-6">
                        <h4 className="font-medium">마음의 변화</h4>
                        <p className="text-sm text-muted-foreground">
                          "너희 마음을 바꾸어라. 너희가 성인이 되기를 원한다"
                        </p>
                      </div>
                      
                      <div className="border-l-2 border-muted pl-6">
                        <h4 className="font-medium">사탄에 대한 경고</h4>
                        <p className="text-sm text-muted-foreground">
                          "사탄이 강하고 모든 것을 파괴하려 한다. 기도로 사탄을 이겨라"
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h4 className="font-medium mb-4">10개의 비밀</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium mb-2">미래에 관한 계시</h5>
                        <p className="text-sm leading-relaxed">
                          성모님께서는 각 시현자에게 미래에 관한 10개의 비밀을 알려주고 계십니다. 
                          이 비밀들은 개인적인 것들부터 교회와 세계에 관한 것들까지 다양하며, 
                          아직 완전히 공개되지 않았습니다.
                        </p>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">경고와 표징</h5>
                        <p className="text-sm leading-relaxed">
                          비밀들 중 일부는 인류에 대한 경고이며, 회개하지 않을 경우 
                          일어날 일들에 대한 내용이라고 알려져 있습니다. 
                          하지만 기도와 회개를 통해 이를 완화시킬 수 있다고 하셨습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 교회의 입장 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">교회의 공식 입장</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-medium mb-4">조사와 검토 과정</h3>
                    <p className="text-sm leading-relaxed mb-4">
                      메주고리예 발현에 대해 가톨릭 교회는 40년 넘게 신중하고 철저한 조사를 
                      진행해왔습니다. 지역 주교, 바티칸 조사위원회, 그리고 최근에는 
                      교황청 교리성에서 지속적으로 검토하고 있습니다.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 1984년 지역 주교 조사 시작</li>
                      <li>• 1987년 첫 번째 부정적 결론</li>
                      <li>• 2010년 바티칸 조사위원회 설치</li>
                      <li>• 2017년 교황 특사 파견</li>
                      <li>• 현재 교리성에서 최종 검토 중</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-4">현재 상황</h3>
                    <div className="space-y-4">
                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <h5 className="font-medium mb-2 text-yellow-800">공식 순례 허용</h5>
                        <p className="text-sm text-yellow-700">
                          2019년 바티칸은 메주고리예로의 공식 순례를 허용했으며, 
                          많은 주교들과 신부들이 순례를 인도하고 있습니다.
                        </p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h5 className="font-medium mb-2 text-blue-800">영적 열매 인정</h5>
                        <p className="text-sm text-blue-700">
                          교회는 메주고리예에서 나타나는 기도, 회개, 화해 등의 
                          긍정적인 영적 열매들을 인정하고 있습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 순례 체험 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">메주고리예 순례</h2>
                
                {/* 구글맵 */}
                <div className="mb-8">
                  <GoogleMap
                    center={holyPlacesLocations.medjugorje.center}
                    markers={holyPlacesLocations.medjugorje.markers}
                    zoom={15}
                    height="400px"
                    className="w-full"
                  />
                </div>

                <div className="bg-muted/50 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                      <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                        <Mountain className="h-8 w-8 text-green-600" />
                      </div>
                      <h4 className="font-medium mb-2">십자가의 산</h4>
                      <p className="text-sm leading-relaxed">
                        크리제바츠 산의 십자가의 길은 순례자들에게 특별한 기도와 묵상의 시간을 제공합니다.
                      </p>
                    </div>
                    
                    <div>
                      <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                        <Eye className="h-8 w-8 text-blue-600" />
                      </div>
                      <h4 className="font-medium mb-2">발현의 언덕</h4>
                      <p className="text-sm leading-relaxed">
                        포드브르도 언덕은 첫 발현이 일어난 곳으로, 많은 순례자들이 기도하며 오르는 성지입니다.
                      </p>
                    </div>
                    
                    <div>
                      <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                        <Church className="h-8 w-8 text-purple-600" />
                      </div>
                      <h4 className="font-medium mb-2">성 야고보 성당</h4>
                      <p className="text-sm leading-relaxed">
                        매일 저녁 미사와 기도 프로그램이 진행되며, 전 세계 순례자들이 모이는 중심지입니다.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-medium mb-4">순례 일정</h3>
                  <div className="bg-muted/30 p-6 rounded-lg space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium mb-2">일반적인 순례 프로그램</h5>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• 아침: 미사 및 성체조배</li>
                          <li>• 오전: 발현의 언덕 순례</li>
                          <li>• 오후: 십자가의 산 기도</li>
                          <li>• 저녁: 묵주기도 및 저녁 미사</li>
                          <li>• 밤: 성체조배 (목요일)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">특별 행사</h5>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• 6월 24일: 발현 기념일</li>
                          <li>• 8월 5일: 평화의 여왕 축일</li>
                          <li>• 젊은이 축제 (7-8월)</li>
                          <li>• 국제 세미나 및 피정</li>
                          <li>• 치유를 위한 특별 기도</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </article>
          </div>

          {/* 사이드바 (1/4) */}
          <div className="lg:col-span-1">
            <div className="sticky top-[200px] space-y-8">
              {/* 성모님발현지 메뉴 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-red-500" />
                    성모님발현지
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  {marianSites.map((site) => (
                    <button
                      key={site.id}
                      onClick={() => site.id !== "medjugorje" && setCurrentPage(site.id)}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                        site.active
                          ? "font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{site.name}</span>
                        <span className="text-xs">{site.country}</span>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* 방문 정보 */}
              <div className="space-y-6">
                {/* 시차 정보 */}
                <div className="py-2 border-b">
                  <TimezoneDisplay country="medjugorje" />
                </div>
                <div>
                  <h3 className="font-medium mb-4">방문 정보</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="font-medium">위치</p>
                        <p className="text-muted-foreground">보스니아 헤르체고비나<br />메주고리예 마을</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="font-medium">주요 축일</p>
                        <p className="text-muted-foreground">6월 24일 (첫 발현)<br />평화의 여왕</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="font-medium">개방 시간</p>
                        <p className="text-muted-foreground">24시간 개방<br />성당과 성지</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Users className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="font-medium">순례객</p>
                        <p className="text-muted-foreground">연간 100만 명<br />현대 최대 성모 순례지</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* 메주고리예 통계 */}
                <div>
                  <h3 className="font-medium mb-4">발현 통계</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">시현자 수</span>
                      <span className="font-medium">6명</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">발현 기간</span>
                      <span className="font-medium">42년</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">현재 발현</span>
                      <span className="font-medium">3명</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">총 메시지</span>
                      <span className="font-medium">1000+개</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}