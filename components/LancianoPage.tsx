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
  Zap,
  Droplet,
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

interface LancianoPageProps {
  setCurrentPage: (page: string) => void;
}

export default function LancianoPage({ setCurrentPage }: LancianoPageProps) {
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
      value: "66.4",
      unit: "km²",
      description: "아드리아 해변의 고대 도시",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "인구",
      value: "35,000",
      unit: "명",
      description: "아브루초 주의 역사 도시",
      color: "text-green-600",
    },
    {
      icon: Zap,
      title: "성체기적",
      value: "8세기",
      unit: "",
      description: "세계 최초의 성체기적",
      color: "text-purple-600",
    },
    {
      icon: Cross,
      title: "프란치스코회",
      value: "1258년",
      unit: "",
      description: "성 프란치스코회 도착",
      color: "text-orange-600",
    },
  ];

  const countryInfo = [
    {
      label: "정식 명칭",
      value: "란치아노 (Lanciano)",
    },
    { label: "위치", value: "이탈리아 아브루초 주 키에티 현" },
    { label: "해발고도", value: "283m" },
    { label: "면적", value: "66.4 평방 KM" },
    { label: "인구", value: "35,000명" },
    { label: "주요 성지", value: "성체기적 성당" },
    { label: "언어", value: "이탈리아어" },
    { label: "화폐단위", value: "유로 (EUR)" },
    { label: "성체기적", value: "8세기 (700년경)" },
  ];

  const holyPlaces = [
    {
      name: "성체기적 성당",
      subtitle: "세계 최초 성체기적이 일어난 성 프란치스코 성당",
      description:
        "8세기 바실리코 수도사가 미사 중 성체와 포도주가 실제 살과 피로 변한 기적이 일어난 곳입니다. 1258년 성 프란치스코회가 이곳에 정착한 후 성당을 관리해오고 있으며, 1300년 이상 보존된 성체기적의 유물들이 전시되어 있습니다.",
      icon: Church,
      color: "from-red-100 to-pink-200",
      iconColor: "text-red-700",
    },
    {
      name: "성체기적 박물관",
      subtitle: "1300년간 보존된 기적의 유물 전시",
      description:
        "성체와 성혈이 변화된 살과 피의 유물이 보관된 박물관입니다. 현대 과학 연구에 의하면 이 유물들은 실제 인간의 심장 조직과 AB형 혈액임이 확인되었으며, 1300년이 넘는 시간 동안 부패하지 않고 보존되어 있습니다.",
      icon: Star,
      color: "from-amber-100 to-yellow-200",
      iconColor: "text-amber-700",
    },
    {
      name: "성 프란치스코 제단",
      subtitle: "성체기적을 모신 거룩한 제단",
      description:
        "성체기적이 일어난 바로 그 제단으로, 1886년 교황 레오 13세에 의해 대사가 선포되었습니다. 매년 수많은 순례자들이 이곳에서 성체기적을 경험하며 믿음을 새롭게 다지고 있습니다.",
      icon: Cross,
      color: "from-purple-100 to-violet-200",
      iconColor: "text-purple-700",
    },
    {
      name: "기적의 성혈",
      subtitle: "1300년간 응고되지 않는 성혈",
      description:
        "8세기부터 현재까지 1300년 이상 응고되지 않고 액체 상태를 유지하는 기적의 성혈입니다. 과학자들의 연구 결과 이 혈액은 AB형이며 실제 인간의 혈액과 동일한 성분을 가지고 있음이 확인되었습니다.",
      icon: Droplet,
      color: "from-rose-100 to-red-200",
      iconColor: "text-rose-700",
    },
  ];

  const miracleHistory = [
    {
      title: "세계 최초 성체기적",
      period: "8세기 (700년경)",
      description: "바실리코 수도사가 성체의 현존을 의심하며 미사를 드리던 중 성체와 포도주가 실제 살과 피로 변하는 기적이 일어났습니다."
    },
    {
      title: "프란치스코회 정착",
      period: "1258년",
      description: "성 프란치스코회 수도사들이 란치아노에 도착하여 성체기적의 성당을 관리하기 시작했습니다."
    },
    {
      title: "과학적 연구",
      period: "1970-1981년",
      description: "WHO와 UN의 의뢰로 오데아르도 리노리 박사 등이 과학적 연구를 실시하여 기적임을 확인했습니다."
    },
    {
      title: "현재까지 보존",
      period: "1300년 이상",
      description: "성체기적의 유물들은 1300년 이상 부패하지 않고 보존되어 현재까지 전 세계 순례자들의 신앙을 증거하고 있습니다."
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
                  <span>이탈리아 아브루초 주</span>
                </Badge>
                <Badge variant="outline">성지순례</Badge>
                <Badge variant="outline">성체기적</Badge>
              </div>
              <div>
                <h1 className="text-4xl font-medium text-foreground mb-2">
                  란치아노
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  세계 최초 성체기적의 도시, 1300년간 보존된 신앙의 증거
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center">
                <Droplet className="h-12 w-12 text-red-600" />
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
                    란치아노의 기본 정보
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
                    란치아노의 지리적 위치
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GoogleMap
                    center={holyPlacesLocations.lanciano.center}
                    markers={holyPlacesLocations.lanciano.markers}
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
                  성체기적과 관련된 란치아노의 주요 성지들을 소개합니다.
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

            {/* 성체기적 특별 섹션 */}
            <section>
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                        <Droplet className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          란치아노 성체기적 - 8세기
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          세계 최초이자 가장 오래된 성체기적
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      1300년 보존
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 이미지 영역 */}
                    <div className="lg:col-span-1">
                      <div className="aspect-[4/3] bg-gradient-to-br from-red-100 to-pink-200 rounded-lg flex items-center justify-center">
                        <div className="text-center space-y-3">
                          <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <Droplet className="h-8 w-8 text-red-700" />
                          </div>
                          <div>
                            <p className="font-medium text-red-900">
                              Miracolo Eucaristico
                            </p>
                            <p className="text-sm text-red-700">
                              성체기적
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 설명 */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="space-y-3">
                        <p className="leading-relaxed">
                          8세기 바실리코 수도사가 성체의 현존을 의심하며 미사를 드리던 중 
                          성체가 실제 살덩어리로, 포도주가 진짜 피로 변하는 기적이 일어났습니다. 
                          이는 세계에서 가장 오래되고 첫 번째 성체기적으로 기록되어 있으며, 
                          1300년 이상 부패하지 않고 보존되어 있습니다.
                        </p>

                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                          <div className="flex items-start space-x-2">
                            <Info className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div className="space-y-2">
                              <p className="text-red-800 font-medium">과학적 연구 결과 (1970-1981년)</p>
                              <ul className="text-sm text-red-700 space-y-1">
                                <li>• 살: 실제 인간의 심장 근육 조직</li>
                                <li>• 피: AB형 혈액, 신선한 상태 유지</li>
                                <li>• 살과 피 모두 같은 혈액형</li>
                                <li>• 1300년 이상 보존, 부패 없음</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          현재 이 성체기적의 유물들은 란치아노의 성 프란치스코 성당에 
                          보관되어 있으며, 매년 전 세계에서 수많은 순례자들이 찾아와 
                          성체성사의 신비를 체험하고 있습니다.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <span className="text-sm font-medium">기적 발생</span>
                          <span className="text-sm text-muted-foreground">8세기</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <span className="text-sm font-medium">보존 기간</span>
                          <span className="text-sm text-muted-foreground">1300년+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 성체기적의 역사 */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>성체기적의 역사</span>
                  </CardTitle>
                  <CardDescription>1300년을 이어온 신앙의 증거</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {miracleHistory.map((info, index) => (
                    <div key={index} className="border-l-4 border-red-200 pl-4">
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

                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Info className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-red-800 leading-relaxed">
                          란치아노의 성체기적은 가톨릭교회에서 공식 인정한 
                          성체기적 중 가장 오래되고 과학적으로 가장 철저히 
                          검증된 기적입니다. 이 기적은 성체성사에 대한 
                          우리의 믿음을 강화하고, 예수 그리스도의 
                          참된 현존을 증명하는 영원한 증거입니다.
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
                                    setCurrentPage("sangiovannirotondo");
                                  } else if (child === "로레토") {
                                    setCurrentPage("loreto");
                                  } else if (child === "시에나") {
                                    setCurrentPage("siena");
                                  } else if (child === "오르비에또") {
                                    setCurrentPage("orviettoo");
                                  } else if (child === "란치아노") {
                                    // 현재 페이지이므로 아무것도 하지 않음
                                  } else {
                                    console.log(`${child} 페이지는 아직 구현되지 않았습니다.`);
                                  }
                                }}
                                className={`flex items-center justify-between px-4 py-2 hover:bg-muted transition-colors group ${
                                  child === "란치아노" ? "bg-primary/5 text-primary border-r-2 border-primary" : ""
                                }`}
                              >
                                <span className={`text-sm ${child === "란치아노" ? "" : "text-muted-foreground"}`}>{child}</span>
                                {child !== "란치아노" && (
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