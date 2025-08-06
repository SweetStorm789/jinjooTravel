import {
  MapPin,
  Users,
  Calendar,
  Clock,
  Globe,
  Building,
  Mountain,
  Church,
  ArrowRight,
  Info,
  ChevronDown,
  ChevronRight,
  Cross,
  Heart,
  Star,
  Crown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { useState } from "react";
import GoogleMap from "./shared/GoogleMap";
import { holyPlacesLocations } from "./constants/holyPlacesLocations";

interface SanGiovanniRotondoPageProps {
  setCurrentPage: (page: string) => void;
}

export default function SanGiovanniRotondoPage({ setCurrentPage }: SanGiovanniRotondoPageProps) {
  const [isItalyExpanded, setIsItalyExpanded] = useState(true);

  const holyLandMenuItems = [
    { name: "바티칸", type: "page" },
    { name: "그리스", type: "page" },
    { name: "스페인", type: "page" },
    { name: "이스라엘", type: "page" },
    { name: "이집트", type: "page" },
    {
      name: "이탈리아",
      type: "parent",
      children: [
        "로마",
        "아시시",
        "산조반니로톤도",
        "로레토",
        "시에나",
        "오르비에또",
        "란치아노",
      ],
    },
    { name: "튀르키예", type: "page" },
    { name: "프랑스", type: "page" },
    { name: "성지순례 준비물", type: "page" },
  ];

  const keyStats = [
    {
      icon: Globe,
      title: "면적",
      value: "84",
      unit: "km²",
      description: "이탈리아 남부 풀리아 주에 위치",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "인구",
      value: "27,000",
      unit: "명",
      description: "성 비오 신부로 유명한 순례지",
      color: "text-green-600",
    },
    {
      icon: Church,
      title: "성인",
      value: "성 비오 신부",
      unit: "",
      description: "1887-1968, 카푸친 수도회",
      color: "text-purple-600",
    },
    {
      icon: Star,
      title: "성흔",
      value: "1918년",
      unit: "",
      description: "50년간 지속된 기적의 성흔",
      color: "text-orange-600",
    },
  ];

  const countryInfo = [
    {
      label: "정식 명칭",
      value: "산 조반니 로톤도 (San Giovanni Rotondo)",
    },
    { label: "위치", value: "이탈리아 풀리아 주 포지아 현" },
    { label: "해발고도", value: "566m" },
    { label: "면적", value: "84 평방 KM" },
    { label: "인구", value: "27,000명" },
    { label: "주보성인", value: "성 비오 신부 (Padre Pio)" },
    { label: "언어", value: "이탈리아어" },
    { label: "화폐단위", value: "유로 (EUR)" },
    { label: "성 비오 신부 시성", value: "2002년 6월 16일" },
  ];

  const holyPlaces = [
    {
      name: "성 비오 신부 성당",
      subtitle: "성 비오 신부의 무덤이 있는 신성당",
      description:
        "2004년에 건축된 현대적인 성당으로, 성 비오 신부의 유해가 안치되어 있습니다. 렌조 피아노(Renzo Piano)가 설계한 이 성당은 현대 건축의 걸작으로 평가받으며, 매년 전 세계에서 수백만 명의 순례자들이 찾아옵니다.",
      icon: Church,
      color: "from-blue-100 to-indigo-200",
      iconColor: "text-blue-700",
    },
    {
      name: "산타 마리아 델레 그라치에 성당",
      subtitle: "성 비오 신부가 50년간 봉사한 옛 성당",
      description:
        "성 비오 신부가 1916년부터 1968년까지 52년간 사목활동을 했던 성당입니다. 이곳에서 성 비오 신부는 매일 미사를 드리고 고해성사를 들었으며, 1918년 9월 20일 성흔을 받은 곳이기도 합니다.",
      icon: Cross,
      color: "from-amber-100 to-yellow-200",
      iconColor: "text-amber-700",
    },
    {
      name: "성 비오 신부 박물관",
      subtitle: "성 비오 신부의 생애와 유품 전시",
      description:
        "성 비오 신부의 일생과 기적들을 보여주는 박물관으로, 그의 개인 유품, 편지, 사진 등이 전시되어 있습니다. 성흔의 증거와 치유의 기적에 대한 자료들도 볼 수 있습니다.",
      icon: Star,
      color: "from-purple-100 to-violet-200",
      iconColor: "text-purple-700",
    },
    {
      name: "카사 솔리에보 델라 소페렌자 병원",
      subtitle: "성 비오 신부가 설립한 병원",
      description:
        "1956년 성 비오 신부가 설립한 병원으로, '고통 받는 이들의 집'이라는 뜻입니다. 성 비오 신부는 이 병원을 통해 병자들을 치료하고 가난한 이들을 도왔으며, 현재도 최첨단 의료시설로 운영되고 있습니다.",
      icon: Heart,
      color: "from-green-100 to-emerald-200",
      iconColor: "text-green-700",
    },
  ];

  const padreProInfo = [
    {
      title: "출생과 어린 시절",
      period: "1887년 5월 25일",
      description: "이탈리아 남부 피에트렐치나에서 농부의 아들로 태어나 어려서부터 신심이 깊었습니다."
    },
    {
      title: "카푸친 수도회 입회",
      period: "1903년",
      description: "16세에 카푸친 수도회에 입회하여 프란치스코 포르조네라는 이름으로 수도생활을 시작했습니다."
    },
    {
      title: "사제 서품과 성흔",
      period: "1910년 서품, 1918년 성흔",
      description: "1910년 사제로 서품되었고, 1918년 9월 20일 예수님의 성흔을 받아 50년간 지속되었습니다."
    },
    {
      title: "시성과 선종",
      period: "1968년 선종, 2002년 시성",
      description: "1968년 9월 23일 선종하였고, 2002년 교황 요한 바오로 2세에 의해 시성되었습니다."
    }
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* 헤더 섹션 */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Badge
                  variant="secondary"
                  className="flex items-center space-x-1"
                >
                  <MapPin className="h-3 w-3" />
                  <span>이탈리아 풀리아 주</span>
                </Badge>
                <Badge variant="outline">성지순례</Badge>
                <Badge variant="outline">성 비오 신부</Badge>
              </div>
              <div>
                <h1 className="text-4xl font-medium text-foreground mb-2">
                  산조반니로톤도
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  성 비오 신부의 성지, 성흔과 기적의 땅, 고통받는 이들의 위로자
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-amber-500/10 rounded-full flex items-center justify-center">
                <Cross className="h-12 w-12 text-amber-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="xl:col-span-3 space-y-8">
            {/* 주요 통계 */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {keyStats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <Card
                      key={index}
                      className="relative overflow-hidden"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div
                            className={`p-2 rounded-lg bg-secondary ${stat.color}`}
                          >
                            <IconComponent className="h-5 w-5" />
                          </div>
                        </div>
                        <CardTitle className="text-sm text-muted-foreground">
                          {stat.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-baseline space-x-1">
                            <span className="text-3xl font-medium">
                              {stat.value}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {stat.unit}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {stat.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* 도시 정보와 지도 */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 도시 정보 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5" />
                    <span>도시 정보</span>
                  </CardTitle>
                  <CardDescription>
                    산조반니로톤도의 기본 정보
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {countryInfo.map((info, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start py-2"
                      >
                        <span className="text-sm text-muted-foreground font-medium min-w-[100px]">
                          {info.label}
                        </span>
                        <span className="text-sm text-right flex-1">
                          {info.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 지도 영역 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>위치</span>
                  </CardTitle>
                  <CardDescription>
                    산조반니로톤도의 지리적 위치
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GoogleMap
                    center={holyPlacesLocations.sanGiovanniRotondo.center}
                    markers={holyPlacesLocations.sanGiovanniRotondo.markers}
                    zoom={15}
                    height="400px"
                    className="w-full"
                  />
                </CardContent>
              </Card>
            </section>

            {/* 주요 성지들 */}
            <section className="space-y-6">
              <div>
                <h2 className="text-xl font-medium text-foreground mb-2">
                  주요 성지
                </h2>
                <p className="text-muted-foreground">
                  성 비오 신부와 관련된 산조반니로톤도의 주요 성지들을 소개합니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {holyPlaces.map((place, index) => {
                  const IconComponent = place.icon;
                  return (
                    <Card key={index} className="overflow-hidden">
                      <div className={`aspect-video bg-gradient-to-br ${place.color} flex items-center justify-center relative`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        <div className="text-center space-y-2 relative z-10">
                          <div className="w-12 h-12 bg-white/80 rounded-lg flex items-center justify-center backdrop-blur-sm mx-auto">
                            <IconComponent className={`h-6 w-6 ${place.iconColor}`} />
                          </div>
                          <h3 className="font-medium text-gray-900">
                            {place.name}
                          </h3>
                        </div>
                        {/* 오버레이 텍스트 */}
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="bg-white/90 backdrop-blur-sm rounded px-2 py-1">
                            <span className="text-sm font-medium text-gray-800">
                              {place.subtitle}
                            </span>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {place.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* 성 비오 신부 특별 섹션 */}
            <section>
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                        <Cross className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          성 비오 신부 - 성흔의 성인
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          프란치스코 포르조네, 1887-1968
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      카푸친 수도회
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 이미지 영역 */}
                    <div className="lg:col-span-1">
                      <div className="aspect-[4/3] bg-gradient-to-br from-amber-100 to-yellow-200 rounded-lg flex items-center justify-center">
                        <div className="text-center space-y-3">
                          <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <Cross className="h-8 w-8 text-amber-700" />
                          </div>
                          <div>
                            <p className="font-medium text-amber-900">
                              Padre Pio
                            </p>
                            <p className="text-sm text-amber-700">
                              성 비오 신부
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 설명 */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="space-y-3">
                        <p className="leading-relaxed">
                          성 비오 신부(본명: 프란치스코 포르조네)는 1887년 이탈리아 
                          피에트렐치나에서 태어나 1903년 카푸친 수도회에 입회했습니다. 
                          1918년 9월 20일 예수님의 성흔을 받아 50년간 지속되었으며, 
                          수많은 기적과 치유로 유명한 20세기의 위대한 성인입니다.
                        </p>

                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                          <div className="flex items-start space-x-2">
                            <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <blockquote className="text-amber-800 italic">
                              "기도하라, 희망하라, 걱정하지 말라. 
                              걱정은 영혼에 해롭다. 하나님은 모든 것을 아시고, 
                              모든 것을 제공하시며, 모든 것을 돌보신다."
                            </blockquote>
                          </div>
                          <p className="text-amber-600 text-xs mt-2 text-right">
                            - 성 비오 신부
                          </p>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          성 비오 신부는 1968년 9월 23일 선종하였고, 
                          2002년 6월 16일 교황 요한 바오로 2세에 의해 시성되었습니다. 
                          그가 설립한 '고통받는 이들의 집' 병원은 현재도 
                          수많은 환자들을 치료하고 있습니다.
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">
                          축일
                        </span>
                        <span className="text-sm text-muted-foreground">
                          9월 23일
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 성 비오 신부의 생애 */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>성 비오 신부의 생애</span>
                  </CardTitle>
                  <CardDescription>고통받는 이들의 위로자가 걸어간 거룩한 여정</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {padreProInfo.map((info, index) => (
                    <div key={index} className="border-l-4 border-amber-200 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{info.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {info.period}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {info.description}
                      </p>
                    </div>
                  ))}

                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-amber-800 leading-relaxed">
                          성 비오 신부는 현대에 성흔을 받은 최초의 사제로, 
                          50년간 계속된 성흔과 수많은 기적으로 전 세계 
                          가톨릭 신자들의 존경을 받고 있습니다. 
                          그의 영성과 사랑은 오늘날에도 수많은 이들에게 
                          위로와 희망을 주고 있습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* 사이드바 */}
          <div className="xl:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* 성지정보 메뉴 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>성지정보</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <nav className="space-y-1">
                    {holyLandMenuItems.map((item) => (
                      <div key={item.name}>
                        {item.type === "parent" ? (
                          <div className="flex items-center">
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage("italy");
                              }}
                              className="flex-1 px-4 py-3 hover:bg-muted transition-colors"
                            >
                              <span className="text-sm">{item.name}</span>
                            </a>
                            <button
                              onClick={() => setIsItalyExpanded(!isItalyExpanded)}
                              className="px-3 py-3 hover:bg-muted transition-colors"
                            >
                              {isItalyExpanded ? (
                                <ChevronDown className="h-3 w-3 text-muted-foreground" />
                              ) : (
                                <ChevronRight className="h-3 w-3 text-muted-foreground" />
                              )}
                            </button>
                          </div>
                        ) : (
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (item.name === "바티칸") {
                                setCurrentPage("vatican");
                              } else if (item.name === "그리스") {
                                setCurrentPage("greece");
                              } else if (item.name === "스페인") {
                                setCurrentPage("spain");
                              } else if (item.name === "이스라엘") {
                                setCurrentPage("israel");
                              } else if (item.name === "이집트") {
                                setCurrentPage("egypt");
                              } else if (item.name === "튀르키예") {
                                setCurrentPage("turkiye");
                              } else if (item.name === "프랑스") {
                                setCurrentPage("france");
                              } else {
                                // 다른 페이지들은 아직 구현되지 않음
                                console.log(`${item.name} 페이지는 아직 구현되지 않았습니다.`);
                              }
                            }}
                            className={`flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors group`}
                          >
                            <span className="text-sm">{item.name}</span>
                            <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        )}
                        
                        {/* 이탈리아 하위 메뉴 */}
                        {item.type === "parent" && isItalyExpanded && (
                          <div className="ml-4 border-l border-border">
                            {item.children?.map((child) => (
                              <a
                                key={child}
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (child === "로마") {
                                    setCurrentPage("rome");
                                  } else if (child === "아시시") {
                                    setCurrentPage("assisi");
                                  } else if (child === "산조반니로톤도") {
                                    // 현재 페이지이므로 아무것도 하지 않음
                                  } else if (child === "로레토") {
                                    setCurrentPage("loreto");
                                  } else if (child === "시에나") {
                                    setCurrentPage("siena");
                                  } else if (child === "오르비에또") {
                                    setCurrentPage("orviettoo");
                                  } else if (child === "란치아노") {
                                    setCurrentPage("lanciano");
                                  } else {
                                    console.log(`${child} 페이지는 아직 구현되지 않았습니다.`);
                                  }
                                }}
                                className={`flex items-center justify-between px-4 py-2 hover:bg-muted transition-colors group ${
                                  child === "산조반니로톤도" ? "bg-primary/5 text-primary border-r-2 border-primary" : ""
                                }`}
                              >
                                <span className={`text-sm ${child === "산조반니로톤도" ? "" : "text-muted-foreground"}`}>{child}</span>
                                {child !== "산조반니로톤도" && (
                                  <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                )}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>
                </CardContent>
              </Card>

              {/* 빠른 정보 */}
              <Card>
                <CardHeader>
                  <CardTitle>여행 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">
                      현지 시간
                    </span>
                    <Badge variant="secondary">UTC+1</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">
                      전압
                    </span>
                    <span className="text-sm">230V</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">
                      화폐
                    </span>
                    <span className="text-sm">유로(EUR)</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">
                      기후
                    </span>
                    <span className="text-sm">지중해성</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">
                      베스트 시즌
                    </span>
                    <span className="text-sm">4-6월, 9-10월</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}