import { Quote, Crown, Users, Heart, MapPin, Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import guadalupeImage from '../../images/guadalupe/guadalupe.png';
import tilmaImage from '../../images/guadalupe/tilmaImage.png';
import { ImageWithFallback } from "../figma/ImageWithFallback";
import GoogleMap from "../shared/GoogleMap";
import { holyPlacesLocations } from "../constants/holyPlacesLocations";

interface GuadalupePageProps {
  setCurrentPage: (page: string) => void;
}

// 데이터 상수들
const marianSitesData = [
  { id: "fatima", name: "파티마", country: "포르투갈", active: false },
  { id: "lourdes", name: "루르드", country: "프랑스", active: false },
  { id: "guadalupe", name: "과달루페", country: "멕시코", active: true },
  { id: "banneux", name: "바뇌", country: "벨기에", active: false },
  { id: "medjugorje", name: "메주고리예", country: "보스니아", active: false }
];

const apparitionTimeline = [
  {
    date: "12월 9일",
    title: "1차 발현",
    description: "테페약 언덕에서 성모님 첫 발현",
    type: "primary" as const
  },
  {
    date: "12월 10일", 
    title: "2차 발현",
    description: "주교의 표징 요구, 성모님의 재확인",
    type: "secondary" as const
  },
  {
    date: "12월 11일",
    title: "3차 발현", 
    description: "삼촌의 병으로 성모님께 도움 청함",
    type: "secondary" as const
  },
  {
    date: "12월 12일",
    title: "4차 발현",
    description: "틸마의 기적, 성화 현현",
    type: "secondary" as const
  }
];

const mainMessages = [
  "모든 민족의 어머니",
  "원주민과 스페인인의 화해", 
  "가난하고 소외된 자들에 대한 사랑",
  "아메리카 대륙의 복음화"
];

const juanDiegoTimeline = [
  { label: "출생", value: "1474년 쿠아우티틀란 출생" },
  { label: "개종", value: "1524년 가톨릭 개종 (50세)" },
  { label: "발현", value: "1531년 성모님 발현 목격 (57세)" },
  { label: "선종", value: "1548년 5월 30일 선종 (74세)" },
  { label: "시성", value: "2002년 7월 31일 시성" }
];

const tilmaScientificData = {
  physical: [
    "선인장 섬유로 제작 (아가베 아야카틀)",
    "168cm × 103cm 크기",
    "490년간 부패하지 않음", 
    "온도와 습도 변화에 무관"
  ],
  chemical: [
    "알려진 안료나 염료 검출 안됨",
    "색상 변화 없음",
    "바니시나 보호막 없음",
    "붓질이나 스케치 흔적 없음"
  ]
};

const modernImpacts = [
  {
    icon: Crown,
    title: "문화적 화해",
    description: "스페인 정복자와 원주민 사이의 갈등을 성모님의 사랑으로 치유하는 계기가 되었습니다.",
    color: "amber"
  },
  {
    icon: Users, 
    title: "대규모 개종",
    description: "발현 후 10년간 800만 명의 원주민이 가톨릭으로 개종하여 신대륙 복음화의 토대를 마련했습니다.",
    color: "blue"
  },
  {
    icon: Heart,
    title: "사회 변화", 
    description: "원주민의 인권과 존엄성을 인정받는 계기가 되었으며, 멕시코 정체성 형성에 큰 영향을 미쳤습니다.",
    color: "green"
  }
];

const visitInfo = [
  {
    icon: MapPin,
    title: "위치",
    description: "멕시코시티 북부\n테페약 언덕"
  },
  {
    icon: Calendar, 
    title: "주요 축일",
    description: "12월 12일\n과달루페 성모 대축일"
  },
  {
    icon: Clock,
    title: "개방 시간", 
    description: "06:00-21:00\n대성당과 성당"
  },
  {
    icon: Users,
    title: "순례객",
    description: "연간 2천만 명\n세계 최대 성모 순례지"
  }
];

const miracleStats = [
  { label: "발현 횟수", value: "4번" },
  { label: "틸마 보존", value: "490년" },
  { label: "개종자 수", value: "800만명" },
  { label: "순례 역사", value: "490년" }
];

export default function GuadalupePage({ setCurrentPage }: GuadalupePageProps) {
  const colorMap = {
    amber: "bg-amber-100 text-amber-600",
    blue: "bg-blue-100 text-blue-600", 
    green: "bg-green-100 text-green-600"
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
                  과달루페
                </h1>
                <p className="text-xl text-muted-foreground italic">
                  Guadalupe, México • 1531년 과달루페의 성모님 발현지
                </p>
              </div>
              
              <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
                <span>멕시코 테페약 언덕</span>
                <span>•</span>
                <span>아메리카 대륙 첫 발현</span>
                <span>•</span>
                <span>틸마의 기적</span>
              </div>
            </header>

            {/* 리드 이미지 */}
            <div className="mb-12">
              <div className="aspect-[21/9] overflow-hidden mb-4">
                <ImageWithFallback
                  src={guadalupeImage}
                  alt="과달루페 성당 전경"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-muted-foreground italic text-center">
                과달루페 성당 전경. 왼쪽의 새 대성당과 오른쪽의 구 대성당이 어우러진 모습으로, 연간 2천만 명의 순례자가 찾는 성지입니다.
              </p>
            </div>

            {/* 리드 문단 */}
            <div className="mb-12">
              <div className="bg-muted/30 p-8 border-l-4 border-foreground">
                <p className="text-lg leading-relaxed">
                  <span className="text-6xl float-left mr-3 mt-1 leading-none">1</span>
                  531년 12월 9일, 멕시코시티 근교 테페약 언덕에서 일어난 성모님 발현은 
                  아메리카 대륙 기독교 역사의 전환점이 되었습니다. 57세의 인디오 후안 디에고에게 
                  나타나신 성모 마리아께서는 스페인어와 나와틀어로 말씀하시며, 
                  당신의 모습을 기적적으로 틸마(인디오 망토)에 새겨 주셨습니다. 
                  이 기적적인 성화는 490년이 지난 지금도 변함없이 보존되어 있으며, 
                  연간 2천만 명의 순례자가 찾는 세계 최대의 성모 순례지가 되었습니다.
                </p>
              </div>
            </div>

            {/* 본문 - 멀티 컬럼 */}
            <article className="space-y-16">
              {/* 발현의 역사 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">후안 디에고와의 만남</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <p>
                      <span className="text-3xl float-left mr-2 mt-1 leading-none">후</span>
                      안 디에고(1474-1548)는 멕시코시티 북쪽 쿠아우티틀란에 사는 
                      아즈텍 원주민이었습니다. 스페인 정복 이후 가톨릭으로 개종하여 
                      쿠아우티틀라토아친이라는 원래 이름 대신 후안 디에고라는 
                      세례명을 받았습니다.
                    </p>
                    <p>
                      1531년 12월 9일 새벽, 삼촌 후안 베르나르디노를 위해 신부를 
                      모시러 가던 중 테페약 언덕을 지나다가 아름다운 노래 소리를 
                      들었습니다. 언덕 위에서 빛나는 구름 속에서 아름다운 부인이 
                      나타나 그를 부르셨습니다.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <p>
                      성모님께서는 나와틀어로 "후안치토, 후안 디에기토"라고 
                      친근하게 부르시며, 당신을 위한 성당을 지어달라고 
                      주교에게 전해달라고 하셨습니다. 주교는 처음에는 
                      믿지 않았으나, 성모님의 표징을 요구했습니다.
                    </p>
                    <p>
                      12월 12일, 성모님께서는 겨울임에도 불구하고 언덕에 
                      만개한 카스티야 장미를 따서 후안 디에고의 틸마에 담아 
                      주교에게 가져가라고 하셨습니다. 틸마를 펼쳤을 때 
                      장미와 함께 성모님의 모습이 기적적으로 새겨져 있었습니다.
                    </p>
                  </div>
                </div>

                {/* 인용구 */}
                <blockquote className="bg-muted/50 p-8 my-8 border-l-4 border-primary italic text-center">
                  <Quote className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg mb-4">
                    "나는 완전하신 동정 성 마리아, 참되신 하느님의 어머니이다. 
                    나는 이곳에 내 집을 지어 세우기를 바란다."
                  </p>
                  <footer className="text-sm text-muted-foreground">
                    — 과달루페의 성모님, 1531년 12월 9일
                  </footer>
                </blockquote>
              </section>

              {/* 틸마의 기적 섹션 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">틸마의 기적</h2>
                
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-muted">
                        <ImageWithFallback
                          src={tilmaImage}
                          alt="과달루페 성모님의 틸마 성화"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium mb-2">기적적인 성화</h3>
                      <p className="text-sm text-muted-foreground mb-2">490년간 변하지 않는 신비</p>
                      <p className="text-sm">선인장 섬유 틸마에 새겨진 성모님 모습</p>
                    </div>
                    
                    <div className="md:col-span-2 space-y-4">
                      <h3 className="font-medium">과학으로 설명할 수 없는 신비</h3>
                      <p className="text-sm leading-relaxed">
                        틸마는 아가베 선인장 섬유로 만들어진 것으로, 통상 20년을 넘지 못하는 
                        수명을 가지고 있습니다. 그러나 490년이 지난 지금도 전혀 부패하지 않고 
                        있으며, 성화의 색깔도 변하지 않았습니다. 현대 과학으로도 어떤 안료나 
                        염료가 사용되었는지 밝혀내지 못했습니다.
                      </p>
                      <p className="text-sm leading-relaxed">
                        더욱 놀라운 것은 성모님의 눈동자에 1531년 당시 성당에 있던 사람들의 
                        모습이 반사되어 있다는 사실입니다. 현미경으로 확대해보면 후안 디에고와 
                        주교, 그리고 다른 사람들의 모습을 선명하게 볼 수 있습니다.
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h4 className="font-medium mb-4">틸마의 과학적 연구</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium mb-2">물리학적 특성</h5>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {tilmaScientificData.physical.map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">화학적 분석</h5>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {tilmaScientificData.chemical.map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 발현 일지 섹션 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">발현 일지</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      {apparitionTimeline.map((apparition, index) => (
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
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-medium mb-3">주요 메시지</h4>
                        <ul className="text-sm space-y-2">
                          {mainMessages.map((message, index) => (
                            <li key={index}>• {message}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-medium mb-3 text-green-800">역사적 의미</h4>
                        <p className="text-sm text-green-700 leading-relaxed">
                          과달루페 발현 이후 불과 10년 만에 800만 명의 원주민이 가톨릭으로 개종했으며, 
                          이는 아메리카 대륙 복음화의 결정적 계기가 되었습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 성 후안 디에고 섹션 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">성 후안 디에고</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-medium mb-4">평범한 인디오에서 성인으로</h3>
                    <p className="text-sm leading-relaxed mb-4">
                      후안 디에고(쿠아우티틀라토아친, 1474-1548)는 아즈텍 제국의 평범한 농민이었습니다. 
                      스페인 정복 후 50세에 가톨릭으로 개종했으며, 성모님 발현 후 테페약 언덕 옆 
                      작은 집에서 순례자들을 돌보며 살았습니다.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {juanDiegoTimeline.map((item, index) => (
                        <li key={index}>• <span className="font-medium">{item.label}:</span> {item.value}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-4">겸손한 신앙의 증인</h3>
                    <div className="space-y-4">
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">성모님의 선택</h5>
                        <p className="text-sm text-muted-foreground">
                          성모님께서는 부유하거나 학식 있는 사람이 아닌 가난한 원주민을 선택하셨습니다. 
                          이는 하느님께서 낮은 자를 높이시는 복음의 정신을 보여줍니다.
                        </p>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">순종과 신뢰</h5>
                        <p className="text-sm text-muted-foreground">
                          후안 디에고는 주교가 믿지 않아도, 사람들이 조롱해도 끝까지 성모님의 
                          말씀에 순종했습니다. 이런 단순한 믿음이 큰 기적을 일으켰습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 아메리카 대륙의 복음화 섹션 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">아메리카 대륙의 복음화</h2>
                
                {/* 구글맵 */}
                <div className="mb-8">
                  <GoogleMap
                    center={holyPlacesLocations.guadalupe.center}
                    markers={holyPlacesLocations.guadalupe.markers}
                    zoom={15}
                    height="400px"
                    className="w-full"
                  />
                </div>

                <div className="bg-muted/50 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {modernImpacts.map((impact, index) => {
                      const IconComponent = impact.icon;
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
                    <h3 className="font-medium mb-4">현대적 의미</h3>
                    <p className="text-sm leading-relaxed mb-4">
                      과달루페의 성모님은 오늘날에도 라틴 아메리카 전체의 수호성인으로 공경받고 있습니다. 
                      특히 이민자, 소외된 자, 가난한 사람들의 어머니로 여겨지며, 
                      사회 정의와 인권 보호의 상징이 되고 있습니다.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 라틴 아메리카 수호성인</li>
                      <li>• 멕시코 국가적 상징</li>
                      <li>• 이민자들의 어머니</li>
                      <li>• 사회 정의의 상징</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">교황들의 순례</h3>
                    <div className="space-y-4">
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">요한 바오로 2세 교황</h5>
                        <p className="text-sm text-muted-foreground">
                          5차례 과달루페를 방문하며 후안 디에고를 시성했습니다 (2002년).
                        </p>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">프란치스코 교황</h5>
                        <p className="text-sm text-muted-foreground">
                          과달루페의 성모님을 "신대륙의 복음화 별"이라고 칭하며 
                          그 의미를 강조했습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </article>
          </div>

          {/* 사이드바 */}
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
                      onClick={() => site.id !== "guadalupe" && setCurrentPage(site.id)}
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
                    {visitInfo.map((info, index) => {
                      const IconComponent = info.icon;
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

                {/* 과달루페 통계 */}
                <div>
                  <h3 className="font-medium mb-4">기적 통계</h3>
                  <div className="space-y-3 text-sm">
                    {miracleStats.map((stat, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-muted-foreground">{stat.label}</span>
                        <span className="font-medium">{stat.value}</span>
                      </div>
                    ))}
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