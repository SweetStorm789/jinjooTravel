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
  Star,
  Cross,
  Waves,
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
import { ImageWithFallback } from "./figma/ImageWithFallback";

import bethlehemImage from "../images/israel/israel-bethlehem-church.jpg";
import deadSeaImage from "../images/israel/dead-sea.jpg";
import nazarethImage from "../images/israel/nazareth.jpg";
import jerusalemImage from "../images/israel/jerusalem-1314895_1920.jpg";
import peterChurchImage from "../images/israel/peter-church.jpg";




interface IsraelPageProps {
  setCurrentPage: (page: string) => void;
}

export default function IsraelPage({
  setCurrentPage,
}: IsraelPageProps) {
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
      value: "20,770",
      unit: "km²",
      description: "이름만으로도 역사의 지혜와 숭고 깊은 기원",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "인구",
      value: "9.4",
      unit: "백만",
      description: "유대인 76.4%, 기타 23.6%",
      color: "text-green-600",
    },
    {
      icon: Building,
      title: "수도",
      value: "예루살렘",
      unit: "",
      description: "3대 종교의 성지",
      color: "text-purple-600",
    },
    {
      icon: Clock,
      title: "시차",
      value: "-6/-7",
      unit: "시간",
      description: "한국보다 6-7시간 늦음 (서머타임 적용)",
      color: "text-orange-600",
    },
  ];

  const countryInfo = [
    {
      label: "정식 명칭",
      value: "이스라엘 (מדינת ישראל, The State of Israel)",
    },
    { label: "정치 체제", value: "의회민주주의" },
    { label: "수도", value: "예루살렘 (Jerusalem)" },
    { label: "경제중심지", value: "텔아비브 (Tel Aviv)" },
    { label: "공용어", value: "히브리어, 아랍어" },
    {
      label: "종교",
      value: "유대교 75.4%, 이슬람 17.2%, 기독교 2.0%",
    },
    { label: "화폐", value: "셰켈 (ILS)" },
    { label: "국제전화", value: "+972" },
  ];

  const holyPlaces = [
    {
      name: "베들레헴 - 예수탄생기념성당",
      subtitle: "예수님 탄생지",
      description:
        "예수 탄생 교회는 팔레스타인 베들레헴에 위치한 성지로, 예수 그리스도께서 탄생하신 장소 위에 세워진 성당이다. 가톨릭 신앙 안에서 이곳은 하느님의 말씀이 사람이 되어 오신 ‘강생의 신비’가 실제로 이루어진 자리로, 성탄의 의미를 가장 깊이 되새길 수 있는 성지다.",
      icon: Star,
      color: "from-amber-100 to-yellow-200",
      iconColor: "text-amber-700",
      image: bethlehemImage,
    },
    {
      name: "타브가 - 베드로 수위권 성당",
      subtitle: "",
      description:
        "이스라엘 갈릴래아 호숫가 타브가에 있는 베드로 수위권 성당은, 부활한 예수님이 베드로에게 “내 양을 먹여라”라고 말씀하며 교회의 수장으로 세운 장소로 전해진다. 성당 안에는 그때 식사가 이루어진 바위인 **‘멘사 도미니’**가 보존되어 있어 순례자들이 깊이 묵상하는 곳이다.",
      icon: Mountain,
      color: "from-green-100 to-emerald-200",
      iconColor: "text-green-700",
      image: peterChurchImage,
    },
    {
      name: "나사렛 - 성모영보대성당",
      subtitle: "예수님이 성장하신 곳",
      description:
      "이스라엘 **나사렛(Nazareth)**은 갈릴래아 지역에 위치한 도시로, 예수 그리스도께서 유년 시절을 보내신 곳으로 전해져 가톨릭 신앙에서 매우 중요한 성지로 여겨진다. 오늘날에도 많은 순례자들이 이곳을 찾아 예수님의 삶의 자취를 되새기며 기도하는 은총의 장소로 삼고 있다.",
      icon: Church,
      color: "from-purple-100 to-violet-200",
      iconColor: "text-purple-700",
      image: nazarethImage,
    },
    {
      name: "사해",
      subtitle: "염분 농도가 높은 신비한 바다",
      description:
        "예루살렘에서 동쪽으로 약 35km 떨어진 곳에 위치한 사해는 수면이 해수면보다 392m 낮고, 가장 깊은 곳의 수심은 약 400m까지 내려간다. 높은 염분 농도로 인해 몸이 자연스럽게 떠오르는 신비한 경험을 할 수 있다.",
      icon: Waves,
      color: "from-blue-100 to-cyan-200",
      iconColor: "text-blue-700",
      image: deadSeaImage,
    },
  ];

  const cities = [
    {
      name: "골란",
      description:
        "사해의 서쪽 연안에서 1.3km 떨어진 곳에 위치한 이 골란은 1947년부터 유엔에서 지정된 지역입니다.",
    },
    {
      name: "야포",
      description:
        "히브리어로 '야펫'이라는 뜻으로, 텔아비브 남쪽에 있는 3600년간의 역사를 가진 옛 지중해 항구 도시입니다.",
    },
    {
      name: "가이사리아",
      description:
        "텔아비브로부터 하이파 중간에 위치한 지중해 연안의 항구도시로, 헤롤왕이 건설한 고대 로마 도시의 유적이 남아있습니다.",
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
                  <span>중동 지중해 연안</span>
                </Badge>
                <Badge variant="outline">성지순례</Badge>
                <Badge variant="outline">3대 종교 성지</Badge>
              </div>
              <div>
                <h1 className="text-4xl font-medium text-foreground mb-2">
                  이스라엘국
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  예수님이 태어나고 활동하신 약속의 땅,
                  유대교·기독교·이슬람교 3대 종교의 성지
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Star className="h-12 w-12 text-blue-600" />
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
                    이스라엘국의 기본 정보
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
                    이스라엘의 지리적 위치
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GoogleMap
                    center={holyPlacesLocations.israel.center}
                    markers={holyPlacesLocations.israel.markers}
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
                  예수님의 생애와 관련된 이스라엘의 주요
                  성지들을 소개합니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {holyPlaces.map((place, index) => {
                  const IconComponent = place.icon;
                  return (
                    <Card
                      key={index}
                      className="overflow-hidden"
                    >
                      <div className="relative">
                        <div className="absolute inset-0"></div>
                        <ImageWithFallback
                        src={place.image}
                        alt={place.name}
                        className={`w-full h-[240px] object-cover ${place.image === peterChurchImage ? 'object-top' : ''}`}
                      />
                       
                        {/* 오버레이 텍스트 */}
                        <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-white/50 backdrop-blur-sm rounded px-2 py-1 flex justify-center items-center w-full">
                          <span className="text-sm font-medium text-gray-800 text-center">
                            {place.name}
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

            {/* 예루살렘 - 특별 섹션 */}
            <section>
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                        <Cross className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          예루살렘 - 거룩한 도시
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          3대 종교의 성지
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
                        <div className="aspect-[4/3] bg-gradient-to-br from-yellow-100 to-amber-200 rounded-lg overflow-hidden">
                        <ImageWithFallback
                        src={jerusalemImage}
                        alt="예루살렘"
                        className="w-full h-[240px] object-cover"
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
                            Jerusalem
                          </p>
                          <p className="text-sm text-amber-700">
                            예루살렘 구시가지
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 설명 */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="space-y-3">
                        <p className="leading-relaxed">
                          예루살렘은 유대교, 가톨릭을 포함한 그리스도교, 이슬람교가 모두 성지로 여기는 인류 신앙의 중심지다. 수천 년의 역사를 품은 이 거룩한 도시는 예수 그리스도의 수난, 죽음, 부활이 이루어진 장소로, 오늘날에도 전 세계 순례자들이 끊임없이 찾는 깊은 영적 의미의 공간이다.
                        </p>

                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                          <div className="flex items-start space-x-2">
                            <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <blockquote className="text-yellow-800 italic">
                              "예루살렘아 내가 너를 잊을진대 내 오른손이 그 재주를 잊을지로다"
                            </blockquote>
                          </div>
                          <p className="text-yellow-600 text-xs mt-2 text-right">
                            - 시편 137:5
                          </p>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed space-y-2">
                          <strong>📍 주요 성지</strong><br />

                          <span className="block mt-2">
                            <strong>성묘 교회 (Holy Sepulchre)</strong><br />
                            예수님의 십자가 처형, 무덤, 부활의 장소로 전해지는 그리스도교의 가장 중심적인 성지.
                          </span>

                          <span className="block mt-2">
                            <strong>성전산 (Temple Mount)</strong><br />
                            유대교의 솔로몬 성전 터이자, 이슬람교의 바위돔(Dome of the Rock)이 있는 성스러운 장소.
                          </span>

                          <span className="block mt-2">
                            <strong>통곡의 벽 (Western Wall)</strong><br />
                            유대교에서 가장 거룩하게 여기는 장소로, 고대 성전의 서쪽 벽 일부가 남아 있다.
                          </span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">구시가지 면적</span>
                        <span className="text-sm text-muted-foreground">약 1km²</span>
                      </div>
                    </div>

                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 기타 도시들 */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5" />
                    <span>기타 주요 도시</span>
                  </CardTitle>
                  <CardDescription>
                    이스라엘의 다른 중요한 도시들
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {cities.map((city, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-blue-200 pl-4"
                    >
                      <h4 className="font-medium mb-2">
                        {city.name}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {city.description}
                      </p>
                    </div>
                  ))}
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
                              } else if (item.name === "이집트") {
                                setCurrentPage("egypt");
                              } else if (item.name === "이스라엘") {
                                // 현재 페이지이므로 아무것도 하지 않음
                              } else if (item.name === "튀르키예") {
                                setCurrentPage("turkiye");
                              } else if (item.name === "프랑스") {
                                setCurrentPage("france");
                              } else {
                                // 다른 페이지들은 아직 구현되지 않음
                                console.log(
                                  `${item.name} 페이지는 아직 구현되지 않았습니다.`,
                                );
                              }
                            }}
                            className={`flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors group ${
                              item.name === "이스라엘"
                                ? "bg-primary/5 text-primary border-r-2 border-primary"
                                : ""
                            }`}
                          >
                            <span className="text-sm">
                              {item.name}
                            </span>
                            {item.name !== "이스라엘" ? (
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
                                      console.log(
                                        `${child} 페이지는 아직 구현되지 않았습니다.`,
                                      );
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
                    <Badge variant="secondary">UTC+2/+3</Badge>
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
                    <span className="text-sm">셰켈(ILS)</span>
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
                    <span className="text-sm">
                      3-5월, 9-11월
                    </span>
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