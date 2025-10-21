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
  Crown,
  Cross,
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
import { useState, useEffect } from "react";
import GoogleMap from "./shared/GoogleMap";
import { getTimeDifferenceFromKorea } from "../utils/timezone";
import { holyPlacesLocations } from "./constants/holyPlacesLocations";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import madridImage from "../images/spain/madrid-2179954_1920.jpg";
import segoviaImage from "../images/spain/segovia-91266_1920.jpg";
import avilaImage from "../images/spain/Avila-cathedral-573069_1920.jpg";
import salanamceImage from "../images/spain/salamanca-3143997_1920.jpg";
import sanctiagoImage from "../images/spain/santiago-de-compostela.jpg";



interface SpainPageProps {
  setCurrentPage: (page: string) => void;
}

export default function SpainPage({
  setCurrentPage,
}: SpainPageProps) {
  const [isItalyExpanded, setIsItalyExpanded] = useState(true);
  const [timeDifference, setTimeDifference] = useState(getTimeDifferenceFromKorea('spain'));
  
  // 실시간 시차 업데이트
  useEffect(() => {
    const updateTimeDifference = () => {
      setTimeDifference(getTimeDifferenceFromKorea('spain'));
    };

    // 초기 업데이트
    updateTimeDifference();

    // 1분마다 업데이트
    const interval = setInterval(updateTimeDifference, 60000);

    return () => clearInterval(interval);
  }, []);

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
  ];

  const keyStats = [
    {
      icon: Globe,
      title: "면적",
      value: "505,990",
      unit: "km²",
      description: "이베리아 반도의 대부분을 차지",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "인구",
      value: "47.4",
      unit: "백만",
      description: "유럽연합 내 5번째 인구 대국",
      color: "text-green-600",
    },
    {
      icon: Building,
      title: "수도",
      value: "마드리드",
      unit: "",
      description: "정치·경제·문화의 중심지",
      color: "text-purple-600",
    },
    {
      icon: Clock,
      title: "시차(현재)",
      value: `${timeDifference.rawHours}시간`,
      unit: `(${timeDifference.isDST ? '서머타임' : '표준시'})`,
      description: timeDifference.isDST 
        ? `한국보다 ${Math.abs(timeDifference.rawHours)}시간 늦음 (표준시는 -8시간)`
        : `한국보다 ${Math.abs(timeDifference.rawHours)}시간 늦음 (서머타임은 -7시간)`,
      color: "text-orange-600",
    },
  ];

  const countryInfo = [
    {
      label: "정식 명칭",
      value: "스페인 (Reino de España)",
    },
    { label: "정치 체제", value: "입헌군주제" },
    { label: "국가원수", value: "펠리페 6세 (Felipe VI)" },
    { label: "수도", value: "마드리드 (Madrid)" },
    { label: "공용어", value: "스페인어 (카스티야어)" },
    { label: "종교", value: "가톨릭 67%, 무종교 27%" },
    { label: "화폐", value: "유로 (EUR)" },
    { label: "국제전화", value: "+34" },
  ];

  const majorCities = [
    {
      name: "마드리드",
      subtitle: "스페인의 수도이자 정치·경제·문화의 중심지",
      description:
        "스페인의 수도인 마드리드는 이베리아 반도 중앙에 위치한 정치·경제·문화의 중심지입니다. 알무데나 성당과 왕궁 등 중요한 가톨릭 성지들이 위치해 있다.",
        image: madridImage,
    },
    {
      name: "살라망카",
      subtitle: "유럽에서 가장 오래된 대학 도시 중 하나",
      description:
        "1218년에 설립된 살라망카 대학교로 유명한 이 도시는 '황금빛 도시'라고 불립니다. 신구 대성당과 산 마르코스 수도원 등이 위치해 있다.",
        image: salanamceImage,
    },
    {
      name: "세고비아",
      subtitle: "로마 시대의 수도교와 알카사르로 유명한 고도",
      description:
        "세고비아는 로마 시대부터 이어져 온 고도로, 유네스코 세계문화유산인 로마 수도교와 알카사르가 있습니다. 성모 마리아에게 봉헌된 대성당이 도시의 중심에 자리하고 있다.",
        image: segoviaImage,
    },
    {
      name: "아빌라",
      subtitle:
        "성녀 테레사의 고향이자 중세 성벽으로 둘러싸인 성스러운 도시",
      description:
        "대성녀 테레사(데 헤수스)의 고향인 아빌라는 완전히 보존된 중세 성벽으로 유명합니다. 성녀 테레사 수도원과 성 비센테 성당 등 중요한 순례지들이 있다.",
        image: avilaImage,
    },
    
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
                  <span>이베리아 반도</span>
                </Badge>
                <Badge variant="outline">성지순례</Badge>
              </div>
              <div>
                <h1 className="text-4xl font-medium text-foreground mb-2">
                  스페인 왕국
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  산티아고 순례길의 종착지이자 성녀 테레사의
                  고향, 가톨릭 신앙의 보루
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-amber-500/10 rounded-full flex items-center justify-center">
                <Crown className="h-12 w-12 text-amber-600" />
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

            {/* 국가 정보와 지도 */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 국가 정보 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5" />
                    <span>국가 정보</span>
                  </CardTitle>
                  <CardDescription>
                    스페인 왕국의 기본 정보
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
                    스페인의 지리적 위치
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GoogleMap
                    center={holyPlacesLocations.spain.center}
                    markers={holyPlacesLocations.spain.markers}
                    zoom={15}
                    height="400px"
                    className="w-full"
                  />
                </CardContent>
              </Card>
            </section>

            {/* 주요 도시들 */}
            <section className="space-y-6">
              <div>
                <h2 className="text-xl font-medium text-foreground mb-2">
                  주요 순례 도시
                </h2>
                <p className="text-muted-foreground">
                  스페인의 주요 가톨릭 성지와 순례 도시들을
                  소개합니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {majorCities.map((city, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative">
                      <div className="absolute inset-0"></div>
                      <ImageWithFallback
                        src={city.image}
                        alt={city.name}
                        className="w-full h-[240px] object-cover"
                      />
                     
                      {/* 오버레이 텍스트 */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-white/50 backdrop-blur-sm rounded px-2 py-1 flex justify-center items-center w-full">
                          <span className="text-sm font-medium text-gray-800 text-center">
                            {city.name}
                          </span>
                        </div>
                      </div>
                      
                    </div>
                    <CardContent className="p-4">
                    <span className="text-sm font-medium text-gray-800">
                          </span>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {city.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* 산티아고 순례길 */}
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
                          산티아고 데 콤포스텔라
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          산티아고 순례길의 종착지
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      세계문화유산
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 이미지 영역 */}
                    <div className="lg:col-span-1">
                      <div className="space-y-4">
                        <div className="aspect-[4/3] bg-gradient-to-br from-amber-100 to-yellow-200 rounded-lg overflow-hidden">
                        <ImageWithFallback
                        src={sanctiagoImage}
                        alt="산티아고 데 콤포스텔라"
                        className="w-full h-full object-cover"
                      />
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center space-y-3">
                              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                                <Church className="h-8 w-8 text-amber-700" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-amber-900">
                            Santiago de Compostela
                          </p>
                          <p className="text-sm text-amber-700">
                            산티아고 대성당
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 설명 */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="space-y-3">
                        <p className="leading-relaxed">
                        산티아고 데 콤포스텔라는 예루살렘, 로마와 함께 가톨릭 3대 성지 중 하나로 꼽히며, 스페인 북서부 갈리시아 지방에 위치한 순례의 중심지다. 이곳에는 사도 야고보(스페인어로 산티아고)의 무덤이 있다고 전해지며, 
                        그의 유해가 안치된 대성당은 전 세계에서 순례자들을 끌어들이는 신앙의 상징이다. 
                        중세부터 시작된 산티아고 순례길(카미노 데 산티아고)은 유럽 각지에서 출발해 이곳으로 향하는 대표적인 성지순례로 자리 잡았으며, 오늘날에도 수많은 이들이 영적 여정과 치유, 
                        새로운 삶의 의미를 찾기 위해 걸음을 이어가고 있다.
                        </p>

                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                          <div className="flex items-start space-x-2">
                            <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <blockquote className="text-amber-800 italic">
                              "산티아고 순례길(카미노)은 신앙의
                              여정이자 자아 성찰의 길입니다.
                              매년 전 세계에서 30만 명 이상의
                              순례자들이 이 길을 걷습니다."
                            </blockquote>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                        프랑스 국경에 위치한 작은 마을 **생장피드포르(Saint-Jean-Pied-de-Port)**에서 시작되는 **프랑스 길(Camino Francés)**은 산티아고 순례길 중에서도 가장 인기 있는 노선이다. 
                        피레네 산맥을 넘어 스페인 북부를 가로지르며 이어지는 이 길은 총 800km에 달하며, 역사적 성지와 중세 도시, 다양한 자연 경관을 지나 산티아고 데 콤포스텔라 대성당까지 이어진다. 
                        이 길은 순례자뿐 아니라 여행자들에게도 깊은 영적 체험과 치유의 시간을 제공하며, 유네스코 세계문화유산으로도 등재되어 그 가치를 인정받고 있다.
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">
                          순례 거리
                        </span>
                        <span className="text-sm text-muted-foreground">
                          약 800km (프랑스 길 기준)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 성녀 테레사 */}
            <section>
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                        <Church className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          아빌라 - 성녀 테레사의 고향
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          교회박사이자 신비가의 성지
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">교회박사</Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="leading-relaxed">
                    스페인의 아름다운 고도 아빌라는 대성녀 **테레사 데 헤수스(1515–1582)**의 고향으로, 그녀의 삶과 영성을 깊이 느낄 수 있는 순례지다. 
                    성녀 테레사는 스페인을 대표하는 신비가이자 교회박사로, 가르멜회 개혁과 수도원 설립을 통해 수도생활의 본질을 되살리고자 했다. 
                    그녀의 발자취가 남아 있는 아빌라는 완벽하게 보존된 중세 성벽 도시로, 순례자와 여행자 모두에게 깊은 영적 울림을 전한다.
                    </p>

                    <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                      <div className="flex items-start space-x-2">
                        <Info className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <blockquote className="text-purple-800 italic">
                          "그리스도 안에서는 가장 작은 일도
                          위대하게 행할 수 있고, 가장 위대한
                          일도 작게 행할 수 있다."
                        </blockquote>
                      </div>
                      <p className="text-purple-600 text-xs mt-2 text-right">
                        - 성녀 테레사 데 헤수스
                      </p>
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
                              } else if (item.name === "이스라엘") {
                                setCurrentPage("israel");
                              } else if (item.name === "이집트") {
                                setCurrentPage("egypt");
                              } else if (item.name === "튀르키예") {
                                setCurrentPage("turkiye");
                              } else if (item.name === "프랑스") {
                                setCurrentPage("france");
                              } else if (item.name === "스페인") {
                                // 현재 페이지이므로 아무것도 하지 않음
                              } else {
                                // 다른 페이지들은 아직 구현되지 않음
                                // console.log(
                                //   `${item.name} 페이지는 아직 구현되지 않았습니다.`,
                                // );
                              }
                            }}
                            className={`flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors group ${
                              item.name === "스페인"
                                ? "bg-primary/5 text-primary border-r-2 border-primary"
                                : ""
                            }`}
                          >
                            <span className="text-sm">
                              {item.name}
                            </span>
                            {item.name !== "스페인" ? (
                              <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            ) : null}
                          </a>
                        )}

                        {/* 이탈리아 하위 메뉴 */}
                        {item.type === "parent" &&
                          isItalyExpanded && (
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
                                      setCurrentPage("lanciano");
                                    } else {
                                      // console.log(
                                      //   `${child} 페이지는 아직 구현되지 않았습니다.`,
                                      // );
                                    }
                                  }}
                                  className="flex items-center justify-between px-4 py-2 hover:bg-muted transition-colors group"
                                >
                                  <span className="text-sm text-muted-foreground">
                                    {child}
                                  </span>
                                  <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
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
                    <span className="text-sm">4-10월</span>
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