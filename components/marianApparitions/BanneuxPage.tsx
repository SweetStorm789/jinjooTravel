import { 
  Quote, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Heart,
  Phone,
  Mail,
  Globe,
  Droplets,
  Shield
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useState, useEffect } from "react";
import GoogleMap from "../shared/GoogleMap";
import TimezoneDisplay from "../shared/TimezoneDisplay";
import { getTimeDifferenceFromKorea } from "../../utils/timezone";
import { holyPlacesLocations } from "../constants/holyPlacesLocations";

import banneuxPhoto from '../../images/banneux/banneux-sanctuary.png';
import marietteBeckoPhoto from '../../images/banneux/mariette-becko.png';

interface BanneuxPageProps {
  setCurrentPage: (page: string) => void;
}

export default function BanneuxPage({ setCurrentPage }: BanneuxPageProps) {
  const [timeDifference, setTimeDifference] = useState(getTimeDifferenceFromKorea('banneux'));
  
  // 실시간 시차 업데이트
  useEffect(() => {
    const updateTimeDifference = () => {
      setTimeDifference(getTimeDifferenceFromKorea('banneux'));
    };

    // 초기 업데이트
    updateTimeDifference();

    // 1분마다 업데이트
    const interval = setInterval(updateTimeDifference, 60000);

    return () => clearInterval(interval);
  }, []);

  // 성모님발현지 데이터
  const marianSitesData = [
    { id: "fatima", name: "파티마", country: "포르투갈", active: false },
    { id: "lourdes", name: "루르드", country: "프랑스", active: false },
    { id: "guadalupe", name: "과달루페", country: "멕시코", active: false },
    { id: "banneux", name: "바뇌", country: "벨기에", active: true },
    { id: "medjugorje", name: "메주고리예", country: "보스니아", active: false }
  ];

  // 8번의 발현 일지 데이터
  const apparitionTimeline = [
    {
      date: "1월 15일",
      title: "1차 발현",
      description: "\"이리 오너라, 내 딸아\" - 첫 만남",
      type: "primary" as const
    },
    {
      date: "1월 18일",
      title: "2차 발현", 
      description: "\"나를 따라오너라\" - 샘으로 인도",
      type: "secondary" as const
    },
    {
      date: "1월 19일",
      title: "3차 발현",
      description: "\"가난한 자들의 성모님\" 자기 소개",
      type: "secondary" as const
    },
    {
      date: "1월 20일",
      title: "4차 발현",
      description: "작은 성당 건립 요청",
      type: "secondary" as const
    },
    {
      date: "2월 11일",
      title: "5차 발현",
      description: "루르드 발현일에 다시 나타나심",
      type: "secondary" as const
    },
    {
      date: "2월 15일",
      title: "6차 발현",
      description: "병자들을 위한 샘물의 축복",
      type: "secondary" as const
    },
    {
      date: "2월 20일",
      title: "7차 발현",
      description: "묵주기도의 중요성 강조",
      type: "secondary" as const
    },
    {
      date: "3월 2일",
      title: "8차 발현",
      description: "\"내가 그리스도의 어머니임을 믿으라\"",
      type: "secondary" as const
    }
  ];

  // 발현의 특징 데이터
  const apparitionFeatures = {
    temporal: [
      "총 47일간 8번 발현",
      "주로 저녁 시간",
      "짧지만 명확한 메시지"
    ],
    message: [
      "가난한 자들에 대한 사랑",
      "기도와 회개", 
      "병자들을 위한 치유"
    ],
    approval: [
      "1949년 공식 승인",
      "엄격한 조사 과정",
      "의학적 기적 확인"
    ]
  };

  // 마리에트 베코의 증언
  const marietteBeckoTestimony = {
    appearance: "성모님은 하얀 옷을 입고 계셨고, 파란 띠를 두르고 계셨습니다. 황금 장미가 달린 맨발이셨고, 너무나 아름다우셨습니다. 빛이 성모님을 둘러싸고 있었습니다.",
    voice: "성모님의 목소리는 매우 부드럽고 다정했습니다. 마치 어머니가 자녀에게 말하는 것 같았습니다. 프랑스어로 말씀하셨지만 완전히 이해할 수 있었습니다."
  };

  // 가난한 자들의 성모님 영향
  const poorPeopleMotherImpacts = [
    {
      icon: "Heart",
      title: "사회적 메시지",
      description: "성모님께서 \"가난한 자들의 성모님\"이라고 소개하신 것은 사회 정의에 대한 강력한 메시지였습니다.",
      color: "green"
    },
    {
      icon: "Droplets", 
      title: "치유의 샘",
      description: "\"이 샘은 모든 민족들을 위한 것\"이라는 말씀처럼 국경을 초월한 치유의 은총을 베푸셨습니다.",
      color: "blue"
    },
    {
      icon: "Shield",
      title: "모든 민족의 어머니",
      description: "바뇌의 메시지는 특정 지역을 넘어 전 세계 가난하고 소외된 이들을 위한 것이었습니다.",
      color: "purple"
    }
  ];

  // 시대적 배경
  const historicalContext = [
    "1929년 세계 대공황 시작",
    "대량 실업과 사회 불안", 
    "종교적 무관심 증가",
    "사회주의 운동 확산"
  ];

  // 방문 정보
  const visitInfo = [
    {
      icon: "MapPin",
      title: "위치",
      description: "벨기에 리에주 지방\n바뇌 마을"
    },
    {
      icon: "Calendar",
      title: "주요 축일", 
      description: "1월 15일 (첫 발현)\n가난한 자들의 성모님"
    },
    {
      icon: "Clock",
      title: "개방 시간",
      description: "08:00-18:00\n성당과 성지"
    },
    {
      icon: "Users",
      title: "순례객",
      description: "연간 50만 명\n유럽 주요 순례지"
    }
  ];

  // 발현 통계
  const apparitionStats = [
    { label: "발현 횟수", value: "8번" },
    { label: "발현 기간", value: "47일" },
    { label: "교회 승인", value: "1949년" },
    { label: "순례 역사", value: "90년" }
  ];

  // 기적의 샘 특징
  const springFeatures = [
    "성모님이 직접 축복하신 샘물",
    "\"모든 민족들을 위한 것\" 선언",
    "수많은 치유 기적 보고",
    "현재도 계속되는 은총"
  ];

  // 아이콘 맵핑
  const iconMap = {
    Heart,
    Droplets,
    Shield,
    MapPin,
    Calendar,
    Clock,
    Users
  };

  const colorMap = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600"
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* 메인 콘텐츠 (3/4) */}
          <div className="lg:col-span-3">
            {/* 헤더 섹션 - 신문 스타일 */}
            <header className="border-b-2 border-foreground pb-8 mb-12">
              <div className="text-center mb-6">
                <p className="text-sm uppercase tracking-wide text-muted-foreground mb-2">
                  성모님 발현지 특집
                </p>
                <h1 className="text-6xl md:text-7xl tracking-tight mb-4">
                  바뇌
                </h1>
                <p className="text-xl text-muted-foreground italic">
                  Banneux, Belgium • 1933년 가난한 자들의 성모님 발현지
                </p>
              </div>
              
              <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
                <span>벨기에 리에주 지방</span>
                <span>•</span>
                <span>마리에트 베코에게 8번 발현</span>
                <span>•</span>
                <span>가난한 자들의 성모님</span>
              </div>
            </header>

            {/* 리드 이미지 */}
            <div className="mb-12">
              <div className="aspect-[16/9] overflow-hidden mb-4">
                <ImageWithFallback
                  src={banneuxPhoto}
                  alt="바뇌 성지의 성모님 동상과 기적의 샘"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-muted-foreground italic text-center">
                바뇌 성지의 성모님 기념비. 1933년 성모님이 마리에트 베코에게 8번 발현하신 곳에 세워진 기념비입니다.
              </p>
            </div>

            {/* 리드 문단 */}
            <div className="mb-12">
              <div className="bg-muted/30 p-8 border-l-4 border-foreground">
                <p className="text-lg leading-relaxed">
                  <span className="text-6xl float-left mr-3 mt-1 leading-none">1</span>
                  933년 1월 15일부터 3월 2일까지, 벨기에 동부 리에주 지방의 작은 농촌 마을 
                  바뇌에서 일어난 8번의 성모님 발현은 20세기 유럽에서 교회가 공식 인정한 
                  중요한 성모 발현 중 하나입니다. 11세 소녀 마리에트 베코에게 나타나신 
                  성모 마리아께서는 스스로를 "가난한 자들의 성모님"이라고 소개하시며, 
                  기도와 희생, 병자들을 위한 기적의 샘을 선물해 주셨습니다. 
                  작은 마을의 발현이었지만 전 세계 가톨릭 신자들에게 큰 영향을 미쳤습니다.
                </p>
              </div>
            </div>

            {/* 본문 - 멀티 컬럼 */}
            <article className="space-y-16">
              {/* 발현의 역사 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">마리에트 베코와의 만남</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <p>
                      <span className="text-3xl float-left mr-2 mt-1 leading-none">마</span>
                      리에트 베코(1921-2011)는 바뇌의 가난한 농가에서 태어난 
                      평범한 소녀였습니다. 아버지 줄리안 베코는 실업자였고, 
                      어머니 루이즈는 종교에 무관심했으며, 마리에트 자신도 
                      거의 교회에 나가지 않았습니다.
                    </p>
                    <p>
                      1933년 1월 15일 저녁 7시경, 마리에트는 집 창문에서 
                      정원에 하얀 옷을 입은 아름다운 부인이 서 있는 것을 
                      보았습니다. 성모님께서는 마리에트를 부르시며 
                      "이리 오너라, 내 딸아"라고 말씀하셨습니다.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <p>
                      처음에는 가족들이 마리에트의 말을 믿지 않았으나, 
                      발현이 계속되면서 점차 마을 사람들의 관심을 끌게 되었습니다. 
                      마리에트는 발현 중에 무릎을 꿇고 기도하며 성모님과 
                      대화를 나누었습니다.
                    </p>
                    <p>
                      총 8번의 발현에서 성모님께서는 기도의 중요성을 강조하시고, 
                      병자들을 위한 기적의 샘을 보여주시며, 스스로를 
                      "가난한 자들의 성모님"이라고 소개하셨습니다.
                    </p>
                  </div>
                </div>

                {/* 인용구 */}
                <blockquote className="bg-muted/50 p-8 my-8 border-l-4 border-primary italic text-center">
                  <Quote className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg mb-4">
                    "나는 가난한 자들의 성모님이다. 
                    이 샘은 모든 민족들을 위한 것이며, 병자들을 위한 것이다."
                  </p>
                  <footer className="text-sm text-muted-foreground">
                    — 가난한 자들의 성모님, 1933년 1월 19일
                  </footer>
                </blockquote>
              </section>

              {/* 8번의 발현 일지 섹션 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">8번의 발현 일지</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      {apparitionTimeline.slice(0, 4).map((apparition, index) => (
                        <div 
                          key={index}
                          className={`border-l-2 pl-6 ${
                            apparition.type === 'primary' ? 'border-primary' : 'border-muted'
                          }`}
                        >
                          <h4 className="font-medium">{apparition.title} ({apparition.date})</h4>
                          <p className="text-sm text-muted-foreground">{apparition.description}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-6">
                      {apparitionTimeline.slice(4).map((apparition, index) => (
                        <div 
                          key={index}
                          className={`border-l-2 pl-6 ${
                            apparition.type === 'primary' ? 'border-primary' : 'border-muted'
                          }`}
                        >
                          <h4 className="font-medium">{apparition.title} ({apparition.date})</h4>
                          <p className="text-sm text-muted-foreground">{apparition.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h4 className="font-medium mb-3 text-blue-800">발현의 특징</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-medium mb-2 text-blue-700">시간적 특징</h5>
                        <ul className="text-sm text-blue-600 space-y-1">
                          {apparitionFeatures.temporal.map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2 text-blue-700">메시지 특징</h5>
                        <ul className="text-sm text-blue-600 space-y-1">
                          {apparitionFeatures.message.map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2 text-blue-700">교회 승인</h5>
                        <ul className="text-sm text-blue-600 space-y-1">
                          {apparitionFeatures.approval.map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 마리에트 베코의 삶 섹션 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">마리에트 베코의 삶</h2>
                
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-muted">
                        <ImageWithFallback
                          src={marietteBeckoPhoto}
                          alt="어린 시절 마리에트 베코 (왼쪽)와 가족"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium mb-2">마리에트 베코</h3>
                      <p className="text-sm text-muted-foreground mb-2">1921-2011 • 발현 목격자</p>
                      <p className="text-sm mb-2">가난한 농가의 소녀에서 신앙의 증인으로</p>
                      <p className="text-xs text-muted-foreground italic">사진: 어린 시절 마리에트 (왼쪽)</p>
                    </div>
                    
                    <div className="md:col-span-2 space-y-4">
                      <h3 className="font-medium">평범한 삶 속의 특별한 은총</h3>
                      <p className="text-sm leading-relaxed">
                        마리에트는 발현 당시 교회에 거의 나가지 않는 평범한 소녀였습니다. 
                        아버지는 실업자였고, 어머니는 종교에 무관심했던 가정 환경에서 자랐습니다. 
                        하지만 성모님의 발현 이후 그녀의 삶은 완전히 변화되었습니다.
                      </p>
                      <p className="text-sm leading-relaxed">
                        발현 후 마리에트는 깊은 신앙생활을 시작했으며, 1935년 14세에 견진성사를 받았습니다. 
                        1947년 결혼하여 일반인으로 살면서도 바뇌 성지를 방문하는 순례자들을 도왔습니다. 
                        2011년 90세로 선종할 때까지 겸손하고 단순한 신앙의 증인으로 살았습니다.
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h4 className="font-medium mb-4">마리에트의 증언</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium mb-2">성모님의 모습</h5>
                        <p className="text-sm leading-relaxed">
                          "{marietteBeckoTestimony.appearance}"
                        </p>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">성모님의 음성</h5>
                        <p className="text-sm leading-relaxed">
                          "{marietteBeckoTestimony.voice}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 가난한 자들의 성모님 섹션 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">가난한 자들의 성모님</h2>
                
                <div className="bg-muted/50 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {poorPeopleMotherImpacts.map((impact, index) => {
                      const IconComponent = iconMap[impact.icon as keyof typeof iconMap];
                      const colorClass = colorMap[impact.color as keyof typeof colorMap];
                      
                      return (
                        <div key={index}>
                          <div className={`w-16 h-16 mx-auto mb-4 ${colorClass} rounded-full flex items-center justify-center`}>
                            <IconComponent className="h-8 w-8" />
                          </div>
                          <h4 className="font-medium mb-2">{impact.title}</h4>
                          <p className="text-sm leading-relaxed">
                            {impact.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-medium mb-4">시대적 배경</h3>
                    <p className="text-sm leading-relaxed mb-4">
                      1933년은 세계 대공황의 한가운데였으며, 유럽 전체가 경제적 어려움을 겪고 있었습니다. 
                      벨기에도 예외가 아니어서 많은 사람들이 실업과 가난에 시달리고 있었습니다. 
                      이런 상황에서 "가난한 자들의 성모님"이라는 호칭은 특별한 의미를 가졌습니다.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {historicalContext.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">현대적 의미</h3>
                    <div className="space-y-4">
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">사회 정의</h5>
                        <p className="text-sm text-muted-foreground">
                          가난한 자들에 대한 하느님의 특별한 사랑을 보여주며, 
                          교회의 사회 교리 발전에 영향을 미쳤습니다.
                        </p>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">선교적 차원</h5>
                        <p className="text-sm text-muted-foreground">
                          "모든 민족들을 위한 샘"이라는 말씀은 가톨릭 교회의 보편성과 
                          선교 정신을 강조했습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 기적의 샘과 치유 섹션 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">기적의 샘과 치유</h2>
                
                {/* 구글맵 */}
                <div className="mb-8">
                  <GoogleMap
                    center={holyPlacesLocations.banneux.center}
                    markers={holyPlacesLocations.banneux.markers}
                    zoom={15}
                    height="400px"
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-medium mb-4">모든 민족을 위한 샘</h3>
                    <p className="text-sm leading-relaxed mb-4">
                      성모님께서 마리에트를 인도하신 샘은 원래 마을 사람들이 알고 있던 
                      작은 샘이었습니다. 하지만 성모님의 축복 이후 이 샘물로 많은 기적적 
                      치유가 일어났으며, 전 세계에서 순례자들이 찾아오게 되었습니다.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {springFeatures.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-4">의학적 기적들</h3>
                    <div className="space-y-4">
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">공식 인정 기적</h5>
                        <p className="text-sm text-muted-foreground">
                          교회가 공식적으로 인정한 기적적 치유 사례들이 여러 건 있으며, 
                          의학적으로 설명할 수 없는 완전한 회복이 확인되었습니다.
                        </p>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">영적 치유</h5>
                        <p className="text-sm text-muted-foreground">
                          육체적 치유뿐만 아니라 많은 순례자들이 영적 평화와 회심, 
                          신앙의 회복을 체험했다고 증언하고 있습니다.
                        </p>
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
                  {marianSitesData.map((site) => (
                    <button
                      key={site.id}
                      onClick={() => site.id !== "banneux" && setCurrentPage(site.id)}
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
                  <TimezoneDisplay country="banneux" />
                </div>
                <div>
                  <h3 className="font-medium mb-4">방문 정보</h3>
                  <div className="space-y-3 text-sm">
                    {visitInfo.map((info, index) => {
                      const IconComponent = iconMap[info.icon as keyof typeof iconMap];
                      return (
                        <div key={index} className="flex items-start">
                          <IconComponent className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground shrink-0" />
                          <div>
                            <p className="font-medium">{info.title}</p>
                            <p className="text-muted-foreground whitespace-pre-line">{info.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* 바뇌 통계 */}
                <div>
                  <h3 className="font-medium mb-4">발현 통계</h3>
                  <div className="space-y-3 text-sm">
                    {apparitionStats.map((stat, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-muted-foreground">{stat.label}</span>
                        <span className="font-medium">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* 순례 문의 */}
                <div>
                  <h3 className="font-medium mb-4">순례 문의</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      전화 상담
                    </Button>
                    <Button className="w-full justify-start" variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      이메일 문의
                    </Button>
                    <Button className="w-full justify-start" variant="outline" size="sm">
                      <Globe className="h-4 w-4 mr-2" />
                      순례 일정
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* 기도문 */}
                <div>
                  <h3 className="font-medium mb-4">바뇌 기도문</h3>
                  <div className="text-sm leading-relaxed p-4 bg-muted/30 italic">
                    <p className="mb-2">
                      "가난한 자들의 성모님, 저희를 위해 기도하소서..."
                    </p>
                    <p className="text-xs text-muted-foreground text-right">
                      - 바뇌의 기도
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