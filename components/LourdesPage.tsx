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
  Droplets,
  Cross,
  Star,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useState } from "react";

// 루르드 성지 실제 사진들 import
import lourdesImage1 from '../images/lourdes/Lourdes1.jpg';
import lourdesImage2 from '../images/lourdes/Lourdes2.jpg';
import lourdesImage3 from '../images/lourdes/Lourdes3.jpg';
import lourdesImage4 from '../images/lourdes/Lourdes4.jpg';
import bernadettePhoto from '../images/lourdes/bernadette.png';

interface LourdesPageProps {
  setCurrentPage: (page: string) => void;
}

export default function LourdesPage({ setCurrentPage }: LourdesPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const marianSites = [
    { id: "fatima", name: "파티마", country: "포르투갈", active: false },
    { id: "lourdes", name: "루르드", country: "프랑스", active: true },
    { id: "guadalupe", name: "과달루페", country: "멕시코", active: false },
    { id: "banneux", name: "바뇌", country: "벨기에", active: false },
    { id: "medjugorje", name: "메주고리예", country: "보스니아", active: false }
  ];

  // 루르드 성지 이미지들
  const lourdesImages = [
    {
      src: lourdesImage1,
      alt: "루르드 성지 전경과 성모상",
      caption: "루르드 성지의 무염시태 성당과 성모상. 많은 순례자들이 기도하는 모습이 보입니다."
    },
    {
      src: lourdesImage2,
      alt: "루르드 동굴 내부",
      caption: "루르드 동굴(마사비엘 동굴) 내부. 성모님이 베르나데트에게 발현하신 바로 그곳입니다."
    },
    {
      src: lourdesImage3,
      alt: "루르드 성당과 다리",
      caption: "루르드 무염시태 성당과 아름다운 가을 풍경. 성지 순례의 평화로운 분위기가 느껴집니다."
    },
    {
      src: lourdesImage4,
      alt: "루르드 무염시태 대성당 내부",
      caption: "루르드 무염시태 대성당 내부의 장엄한 고딕 양식과 아름다운 스테인드글라스. 기도와 묵상을 위한 거룩한 공간입니다."
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % lourdesImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + lourdesImages.length) % lourdesImages.length);
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
                  루르드
                </h1>
                <p className="text-xl text-muted-foreground italic">
                  Lourdes, France • 1858년 무염시태 성모님 발현의 성지
                </p>
              </div>
              
              <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
                <span>프랑스 피레네 산맥</span>
                <span>•</span>
                <span>연간 순례자 500만 명</span>
                <span>•</span>
                <span>기적의 치유 성지</span>
              </div>
            </header>

            {/* 루르드 성지 이미지 갤러리 */}
            <div className="mb-12">
              <h3 className="text-xl font-medium mb-4 text-center">루르드 성지 사진</h3>
              
              {/* 이미지 그리드 - 2x2 레이아웃 */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {lourdesImages.map((image, index) => (
                  <div 
                    key={index}
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
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/90 px-3 py-1 rounded text-sm font-medium">
                        클릭하여 크게 보기
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground italic text-center">
                루르드 성지의 주요 장소들. 클릭하시면 큰 화면으로 보실 수 있습니다.
              </p>
            </div>

            {/* 이미지 갤러리 모달 */}
            <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
              <DialogContent className="max-w-[95vw] max-h-[95vh] w-auto h-auto p-0 bg-black">
                {/* 접근성을 위한 숨겨진 제목과 설명 */}
                <DialogTitle className="sr-only">
                  루르드 성지 사진 갤러리 - {lourdesImages[currentImageIndex].alt}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  루르드 성지의 사진들을 큰 화면으로 보실 수 있습니다. 좌우 화살표 버튼이나 하단의 점들을 클릭하여 다른 사진으로 이동할 수 있습니다.
                </DialogDescription>
                
                <div className="relative flex items-center justify-center min-h-[50vh]">
                  {/* 닫기 버튼 */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsGalleryOpen(false)}
                    className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white shadow-lg"
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  {/* 이전 버튼 */}
                  {lourdesImages.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  )}

                  {/* 큰 이미지 */}
                  <div className="relative max-w-full max-h-full">
                    <img
                      src={lourdesImages[currentImageIndex].src}
                      alt={lourdesImages[currentImageIndex].alt}
                      className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain"
                    />
                  </div>

                  {/* 다음 버튼 */}
                  {lourdesImages.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}

                  {/* 하단 정보 패널 */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    {/* 이미지 설명 */}
                    <div className="text-center mb-4">
                      <p className="text-white text-sm leading-relaxed max-w-2xl mx-auto">
                        {lourdesImages[currentImageIndex].caption}
                      </p>
                    </div>

                    {/* 모달 내 인디케이터 */}
                    {lourdesImages.length > 1 && (
                      <div className="flex justify-center space-x-3">
                        {lourdesImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToImage(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                              index === currentImageIndex 
                                ? "bg-white scale-110" 
                                : "bg-white/50 hover:bg-white/75 hover:scale-105"
                            }`}
                            aria-label={`${index + 1}번째 이미지로 이동`}
                          />
                        ))}
                      </div>
                    )}

                    {/* 이미지 카운터 */}
                    <div className="text-center mt-3">
                      <span className="text-white/70 text-xs">
                        {currentImageIndex + 1} / {lourdesImages.length}
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
                  858년 2월 11일부터 7월 16일까지, 프랑스 남부 피레네 산맥 기슭의 
                  작은 마을 루르드에서 일어난 18번의 성모님 발현은 현대 가톨릭교회 
                  역사상 가장 중요한 사건 중 하나가 되었습니다. 14세 소녀 
                  베르나데트 수비루에게 나타나신 "무염시태"의 성모 마리아께서는 
                  기적의 샘을 선물하시며 전 세계 가톨릭 신자들에게 회개와 기도의 
                  메시지를 전하셨습니다. 오늘날 루르드는 연간 500만 명이 찾는 
                  세계 최대 순례지이자 기적적 치유의 성지로 자리잡았습니다.
                </p>
              </div>
            </div>

            {/* 본문 - 멀티 컬럼 */}
            <article className="space-y-16">
              {/* 발현의 역사 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">베르나데트와의 만남</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <p>
                      <span className="text-3xl float-left mr-2 mt-1 leading-none">베</span>
                      르나데트 수비루(1844-1879)는 루르드의 가난한 방앗간 집 딸로 태어났습니다. 
                      건강이 약하고 학교 교육을 제대로 받지 못한 그녀는 1858년 2월 11일, 
                      마사비엘 동굴 근처에서 장작을 줍다가 "아름다운 부인"을 만나게 되었습니다.
                    </p>
                    <p>
                      처음에는 가족과 마을 사람들이 베르나데트의 말을 믿지 않았으나, 
                      발현이 계속되면서 점점 더 많은 사람들이 관심을 갖게 되었습니다. 
                      성모님께서는 베르나데트에게만 보이셨고, 오직 그녀만이 성모님과 대화할 수 있었습니다.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <p>
                      가장 중요한 순간은 1858년 3월 25일, 성모님께서 스스로를 
                      "나는 무염시태다"(Que soy era Immaculada Councepciou)라고 
                      소개하신 때였습니다. 이는 4년 전인 1854년 교황 비오 9세가 
                      선포한 무염시태 교리와 정확히 일치했습니다.
                    </p>
                    <p>
                      성모님께서는 베르나데트에게 기도와 보속을 당부하시며, 
                      죄인들의 회개를 위해 기도하라고 말씀하셨습니다. 
                      또한 동굴에서 샘을 파서 그 물로 씻고 마시라고 하셨습니다.
                    </p>
                  </div>
                </div>

                {/* 인용구 */}
                <blockquote className="bg-muted/50 p-8 my-8 border-l-4 border-primary italic text-center">
                  <Quote className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg mb-4">
                    "나는 무염시태다. 이곳에 성당을 지어달라. 
                    사람들이 행렬을 지어 이곳으로 와야 한다."
                  </p>
                  <footer className="text-sm text-muted-foreground">
                    — 무염시태의 성모님, 1858년 3월 25일
                  </footer>
                </blockquote>
              </section>

              {/* 18번의 발현 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">18번의 발현 일지</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="border-l-2 border-primary pl-6">
                        <h4 className="font-medium">1차 발현 (2월 11일)</h4>
                        <p className="text-sm text-muted-foreground">마사비엘 동굴에서 "아름다운 부인" 첫 만남</p>
                      </div>
                      
                      <div className="border-l-2 border-muted pl-6">
                        <h4 className="font-medium">2-3차 발현 (2월 14, 18일)</h4>
                        <p className="text-sm text-muted-foreground">묵주기도와 함께 재발현, 글 배우기 약속</p>
                      </div>
                      
                      <div className="border-l-2 border-muted pl-6">
                        <h4 className="font-medium">9차 발현 (2월 25일)</h4>
                        <p className="text-sm text-muted-foreground">기적의 샘 발견, "샘에서 마시고 씻으라"</p>
                      </div>
                      
                      <div className="border-l-2 border-muted pl-6">
                        <h4 className="font-medium">13차 발현 (3월 2일)</h4>
                        <p className="text-sm text-muted-foreground">첫 기적적 치유, 카트린 라따피 손가락 치유</p>
                      </div>

                      <div className="border-l-2 border-primary pl-6">
                        <h4 className="font-medium">16차 발현 (3월 25일)</h4>
                        <p className="text-sm text-muted-foreground">"나는 무염시태다" - 성모님 정체 계시</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="border-l-2 border-muted pl-6">
                        <h4 className="font-medium">주요 메시지들</h4>
                        <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                          <li>• 죄인들의 회개를 위한 기도</li>
                          <li>• 보속과 희생의 삶</li>
                          <li>• 이곳에 성당 건립 요청</li>
                          <li>• 행렬과 순례 장려</li>
                        </ul>
                      </div>
                      
                      <div className="border-l-2 border-muted pl-6">
                        <h4 className="font-medium">마지막 발현 (7월 16일)</h4>
                        <p className="text-sm text-muted-foreground">18번째이자 마지막 발현, 성모님과의 작별</p>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h5 className="font-medium mb-2 text-blue-800">교회의 승인</h5>
                        <p className="text-sm text-blue-700">
                          1862년 타르브의 로랑스 주교가 발현을 공식 승인했으며, 
                          이는 가톨릭교회 역사상 가장 빠른 승인 사례 중 하나였습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 성 베르나데트 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">성 베르나데트 수비루</h2>
                
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-muted">
                        <img
                          src={bernadettePhoto}
                          alt="성 베르나데트 수비루"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium mb-2">성 베르나데트 수비루</h3>
                      <p className="text-sm text-muted-foreground mb-2">1844-1879 • 발현 목격자</p>
                      <p className="text-sm">가난한 방앗간 집 딸에서 성인으로</p>
                      <p className="text-xs text-muted-foreground italic mt-1">실제 역사 사진</p>
                    </div>
                    
                    <div className="md:col-span-2 space-y-4">
                      <h3 className="font-medium">단순함 속의 위대한 신앙</h3>
                      <p className="text-sm leading-relaxed">
                        베르나데트는 발현 당시 읽기도 쓰기도 제대로 못하는 가난한 소녀였습니다. 
                        하지만 성모님의 선택을 받아 전 세계 가톨릭교회 역사에 길이 남을 
                        증언자가 되었습니다. 그녀의 순수하고 단순한 신앙이 수많은 기적을 불러왔습니다.
                      </p>
                      <p className="text-sm leading-relaxed">
                        발현 후 베르나데트는 너뵈르의 사랑의 자매회에 입회하여 수도생활을 했으며, 
                        1879년 35세의 나이로 선종했습니다. 1933년 시성되어 현재 성인으로 공경받고 있습니다.
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h4 className="font-medium mb-4">베르나데트의 증언</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium mb-2">성모님의 모습</h5>
                        <p className="text-sm leading-relaxed">
                          "그 부인은 흰 옷을 입고 계셨고, 파란 띠를 두르고 계셨습니다. 
                          각 발등에는 황금 장미가 하나씩 있었고, 팔에는 묵주를 걸치고 계셨습니다. 
                          너무나 아름다우셔서 한 번 본 사람은 다시 보고 싶어집니다."
                        </p>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">발현의 체험</h5>
                        <p className="text-sm leading-relaxed">
                          "저는 그 부인을 '아케로'(저것)라고 불렀습니다. 
                          그 부인께서는 저에게만 말씀하셨고, 다른 사람들은 볼 수 없었습니다. 
                          저는 그 부인이 누구신지 몰랐지만, 너무나 사랑스럽고 거룩하셨습니다."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 기적의 샘 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">기적의 샘과 치유</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-medium mb-4">생명의 샘</h3>
                    <p className="text-sm leading-relaxed mb-4">
                      1858년 2월 25일, 9번째 발현에서 성모님께서는 베르나데트에게 
                      "샘에서 마시고 씻으라"고 말씀하셨습니다. 베르나데트가 동굴 바닥을 
                      팠을 때 작은 웅덩이가 생겼고, 곧 맑은 샘물이 솟아올랐습니다. 
                      이 샘은 165년이 지난 지금도 매일 3만 리터의 물을 내뿜고 있습니다.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 1858년 2월 25일 첫 발견</li>
                      <li>• 매일 3만 리터 생산</li>
                      <li>• 165년간 마르지 않는 기적</li>
                      <li>• 전 세계로 배송되는 성수</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-4">의학적 기적들</h3>
                    <div className="space-y-4">
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">공식 인정 기적 (70건)</h5>
                        <p className="text-sm text-muted-foreground">
                          루르드 의학국이 공식적으로 인정한 기적적 치유는 70건에 달합니다. 
                          각 사례는 엄격한 의학적 검증을 거쳐 인정받았습니다.
                        </p>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">미공개 치유 사례들</h5>
                        <p className="text-sm text-muted-foreground">
                          공식 인정된 것 외에도 수천 건의 치유 사례가 보고되고 있으며, 
                          많은 순례자들이 육체적 정신적 치유를 체험하고 있습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-green-50 p-6 rounded-lg border border-green-200">
                  <h4 className="font-medium mb-3 text-green-800">루르드 의학국 (Bureau des Constatations Médicales)</h4>
                  <p className="text-sm text-green-700 leading-relaxed">
                    1905년 설립된 루르드 의학국은 전 세계 의사들이 참여하여 치유 사례를 
                    엄격하게 검증하는 독립적인 기관입니다. 종교와 관계없이 순전히 
                    의학적 관점에서만 치유의 기적성을 판단하며, 현재까지 수천 건의 
                    사례를 조사하여 70건을 공식 기적으로 인정했습니다.
                  </p>
                </div>
              </section>

              {/* 루르드 성지 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">주요 순례지</h2>
                
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-medium mb-4">마사비엘 동굴</h3>
                      <p className="text-sm leading-relaxed mb-4">
                        성모님이 18번 발현하신 바로 그 동굴입니다. 동굴 안에는 성모상이 
                        모셔져 있으며, 24시간 기도가 끊이지 않습니다. 순례자들은 동굴 
                        앞에서 묵주기도를 바치고, 동굴의 벽과 성모상을 만지며 기도합니다.
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 18번 발현의 현장</li>
                        <li>• 24시간 기도 가능</li>
                        <li>• 매일 수십 개 국어로 미사</li>
                        <li>• 촛불 봉헌 장소</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-medium mb-4">무염시태 대성당</h3>
                      <p className="text-sm leading-relaxed mb-4">
                        1876년 축성된 루르드의 주 성당으로, 동굴 바로 위에 세워져 있습니다. 
                        고딕 양식의 아름다운 건축물로, 성모님께서 요청하신 "이곳에 성당을 
                        지어달라"는 말씀에 따라 건립되었습니다.
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 1876년 축성</li>
                        <li>• 고딕 부흥 양식</li>
                        <li>• 성모님 직접 요청으로 건립</li>
                        <li>• 주요 전례 거행 장소</li>
                      </ul>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-medium mb-4">지하 성당</h3>
                      <p className="text-sm leading-relaxed mb-4">
                        대규모 순례단을 위한 현대적 성당으로, 25,000명을 수용할 수 있습니다. 
                        1958년 발현 100주년을 기념하여 건립되었으며, 국제적인 대형 미사와 
                        특별 전례가 이곳에서 거행됩니다.
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 25,000명 수용 가능</li>
                        <li>• 1958년 건립</li>
                        <li>• 대형 국제 미사</li>
                        <li>• 현대적 음향 시설</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-medium mb-4">십자가의 길과 묵주의 길</h3>
                      <p className="text-sm leading-relaxed mb-4">
                        에스펠뤽스 언덕과 바르뜨레스 언덕에 조성된 기도의 길입니다. 
                        십자가의 길 15처와 묵주기도 15단 묵상을 위한 조각품들이 
                        아름다운 자연 속에 배치되어 있어 순례자들의 영성 체험을 돕습니다.
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 십자가의 길 15처</li>
                        <li>• 묵주기도 15단 조각</li>
                        <li>• 자연 속 묵상 코스</li>
                        <li>• 영성 피정 장소</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 루르드의 메시지 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">루르드의 메시지</h2>
                
                <div className="bg-muted/50 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                      <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                        <Droplets className="h-8 w-8 text-blue-600" />
                      </div>
                      <h4 className="font-medium mb-2">회개와 보속</h4>
                      <p className="text-sm leading-relaxed">
                        죄인들의 회개를 위해 기도하고 보속하며 하느님께 나아가는 삶
                      </p>
                    </div>
                    
                    <div>
                      <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                        <Cross className="h-8 w-8 text-green-600" />
                      </div>
                      <h4 className="font-medium mb-2">기도와 순례</h4>
                      <p className="text-sm leading-relaxed">
                        끊임없는 기도와 순례를 통해 하느님의 은총과 치유를 경험
                      </p>
                    </div>
                    
                    <div>
                      <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                        <Star className="h-8 w-8 text-purple-600" />
                      </div>
                      <h4 className="font-medium mb-2">무염시태 신심</h4>
                      <p className="text-sm leading-relaxed">
                        원죄 없이 잉태되신 성모님께 대한 신심과 전구를 통한 구원
                      </p>
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
                      onClick={() => site.id !== "lourdes" && setCurrentPage(site.id)}
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
                <div>
                  <h3 className="font-medium mb-4">방문 정보</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="font-medium">위치</p>
                        <p className="text-muted-foreground">프랑스 루르드<br />피레네 산맥 기슭</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="font-medium">주요 축일</p>
                        <p className="text-muted-foreground">2월 11일 (첫 발현)<br />12월 8일 (무염시태)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="font-medium">개방 시간</p>
                        <p className="text-muted-foreground">24시간 개방<br />동굴과 성지 전체</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Users className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="font-medium">순례객</p>
                        <p className="text-muted-foreground">연간 500만 명<br />세계 최대 치유 성지</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* 루르드 기도문 */}
                <div>
                  <h3 className="font-medium mb-4">루르드 기도문</h3>
                  <div className="text-sm leading-relaxed p-4 bg-muted/30 italic">
                    <p className="mb-2">
                      "원죄 없이 잉태되신 성모 마리아님, 저희를 위하여 빌어주소서..."
                    </p>
                    <p className="text-xs text-muted-foreground text-right">
                      - 무염시태 기도
                    </p>
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