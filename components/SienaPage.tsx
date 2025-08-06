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
  BookOpen,
  Home,
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

interface SienaPageProps {
  setCurrentPage: (page: string) => void;
}

export default function SienaPage({ setCurrentPage }: SienaPageProps) {
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
      value: "118",
      unit: "km²",
      description: "토스카나 지역의 중세 도시",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "인구",
      value: "54,000",
      unit: "명",
      description: "시에나 대학으로 유명한 도시",
      color: "text-green-600",
    },
    {
      icon: Star,
      title: "성녀 카타리나",
      value: "1347-1380",
      unit: "",
      description: "교회박사이자 이탈리아 수호성인",
      color: "text-purple-600",
    },
    {
      icon: Crown,
      title: "세계문화유산",
      value: "1995년",
      unit: "",
      description: "유네스코 세계문화유산 등재",
      color: "text-orange-600",
    },
  ];

  const countryInfo = [
    {
      label: "정식 명칭",
      value: "시에나 (Siena)",
    },
    { label: "위치", value: "이탈리아 토스카나 주" },
    { label: "해발고도", value: "322m" },
    { label: "면적", value: "118 평방 KM" },
    { label: "인구", value: "54,000명" },
    { label: "주보성인", value: "성녀 카타리나" },
    { label: "언어", value: "이탈리아어" },
    { label: "화폐단위", value: "유로 (EUR)" },
    { label: "성녀 카타리나 시성", value: "1461년" },
  ];

  const holyPlaces = [
    {
      name: "성 도미니코 성당",
      subtitle: "성녀 카타리나의 머리가 보관된 성당",
      description:
        "13세기에 건립된 고딕 양식의 성당으로, 성녀 카타리나가 환상을 보고 기도했던 곳입니다. 성당 내 성녀 카타리나 경당에는 그녀의 머리가 보관되어 있으며, 소다 디 조반니가 그린 성녀의 초상화도 감상할 수 있습니다.",
      icon: Church,
      color: "from-blue-100 to-indigo-200",
      iconColor: "text-blue-700",
    },
    {
      name: "성녀 카타리나의 집",
      subtitle: "성녀가 태어나고 자란 생가",
      description:
        "1347년 성녀 카타리나가 태어난 집으로, 현재는 성소로 꾸며져 있습니다. 성녀가 어린 시절부터 기도와 고행을 했던 방과 그녀가 도미니코 제3회에 입회한 후 활동했던 공간들을 둘러볼 수 있습니다.",
      icon: Home,
      color: "from-amber-100 to-yellow-200",
      iconColor: "text-amber-700",
    },
    {
      name: "시에나 대성당",
      subtitle: "로마네스크-고딕 양식의 걸작",
      description:
        "12-14세기에 건축된 시에나 대성당은 이탈리아 고딕 건축의 걸작 중 하나입니다. 미켈란젤로, 베르니니, 도나텔로 등의 작품들이 소장되어 있으며, 성녀 카타리나도 이곳에서 자주 기도했습니다.",
      icon: Crown,
      color: "from-purple-100 to-violet-200",
      iconColor: "text-purple-700",
    },
    {
      name: "캄포 광장",
      subtitle: "세계에서 가장 아름다운 광장 중 하나",
      description:
        "부채꼴 모양의 캄포 광장은 시에나의 심장부로, 성녀 카타리나가 시민들에게 설교했던 곳이기도 합니다. 광장을 둘러싼 중세 건물들과 만지아 탑은 시에나의 상징이며, 매년 7월과 8월 팔리오 축제가 열립니다.",
      icon: Building,
      color: "from-green-100 to-emerald-200",
      iconColor: "text-green-700",
    },
  ];

  const caterinaInfo = [
    {
      title: "출생과 어린 시절",
      period: "1347년 3월 25일",
      description: "시에나의 염색업자 야코포 베닌카사의 딸로 태어나 어린 시절부터 신비 체험을 했습니다."
    },
    {
      title: "도미니코 제3회 입회",
      period: "1363년 (16세)",
      description: "도미니코 제3회에 입회하여 3년간 고행과 기도의 생활을 하며 영성을 기르게 됩니다."
    },
    {
      title: "교회 개혁과 아비뇽 유수",
      period: "1370년대",
      description: "교황에게 편지를 보내 아비뇽에서 로마로 돌아올 것을 간청하며 교회 개혁에 앞장섰습니다."
    },
    {
      title: "선종과 시성",
      period: "1380년 선종, 1461년 시성",
      description: "33세의 나이로 로마에서 선종하였고, 1461년 시성되어 1970년 교회박사로 선포되었습니다."
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
                  <span>이탈리아 토스카나 주</span>
                </Badge>
                <Badge variant="outline">성지순례</Badge>
                <Badge variant="outline">성녀 카타리나</Badge>
              </div>
              <div>
                <h1 className="text-4xl font-medium text-foreground mb-2">
                  시에나
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  성녀 카타리나의 고향, 중세의 아름다움이 살아 숨쉬는 토스카나의 보석
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-red-600" />
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
                    시에나의 기본 정보
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
                    시에나의 지리적 위치
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GoogleMap
                    center={holyPlacesLocations.siena.center}
                    markers={holyPlacesLocations.siena.markers}
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
                  성녀 카타리나와 관련된 시에나의 주요 성지들을 소개합니다.
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

            {/* 성녀 카타리나 특별 섹션 */}
            <section>
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          성녀 카타리나 - 교회의 어머니
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          카타리나 베닌카사, 1347-1380
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      교회박사
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
                            <BookOpen className="h-8 w-8 text-red-700" />
                          </div>
                          <div>
                            <p className="font-medium text-red-900">
                              Santa Caterina
                            </p>
                            <p className="text-sm text-red-700">
                              성녀 카타리나
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 설명 */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="space-y-3">
                        <p className="leading-relaxed">
                          성녀 카타리나(1347-1380)는 시에나에서 태어나 도미니코 제3회에 
                          입회한 후 교회 개혁에 헌신했습니다. 교황에게 아비뇽에서 로마로 
                          돌아올 것을 간청하여 아비뇽 유수를 끝내는 데 기여했으며, 
                          1970년 여성 최초로 교회박사로 선포되었습니다.
                        </p>

                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                          <div className="flex items-start space-x-2">
                            <Info className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <blockquote className="text-red-800 italic">
                              "불을 원한다면 불 속으로 들어가야 합니다. 
                              그리스도를 원한다면 십자가 위로 올라가야 합니다."
                            </blockquote>
                          </div>
                          <p className="text-red-600 text-xs mt-2 text-right">
                            - 성녀 카타리나
                          </p>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          성녀 카타리나는 '신학대전'과 함께 『대화』라는 영성서를 
                          저술하여 후세에 큰 영향을 미쳤습니다. 그녀는 이탈리아와 
                          유럽의 수호성인이며, 1999년 교황 요한 바오로 2세에 의해 
                          유럽의 공동 수호성인으로 선포되었습니다.
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">
                          축일
                        </span>
                        <span className="text-sm text-muted-foreground">
                          4월 29일
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 성녀 카타리나의 생애 */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>성녀 카타리나의 생애</span>
                  </CardTitle>
                  <CardDescription>교회의 어머니가 걸어간 거룩한 여정</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {caterinaInfo.map((info, index) => (
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
                          성녀 카타리나는 짧은 생애(33년)에도 불구하고 교회사에 
                          큰 족적을 남겼습니다. 그녀의 영성과 교회에 대한 사랑, 
                          그리고 교회 개혁을 위한 열정은 오늘날에도 
                          많은 이들에게 영감을 주고 있습니다.
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
                                    // 현재 페이지이므로 아무것도 하지 않음
                                  } else if (child === "오르비에또") {
                                    setCurrentPage("orviettoo");
                                  } else if (child === "란치아노") {
                                    setCurrentPage("lanciano");
                                  } else {
                                    console.log(`${child} 페이지는 아직 구현되지 않았습니다.`);
                                  }
                                }}
                                className={`flex items-center justify-between px-4 py-2 hover:bg-muted transition-colors group ${
                                  child === "시에나" ? "bg-primary/5 text-primary border-r-2 border-primary" : ""
                                }`}
                              >
                                <span className={`text-sm ${child === "시에나" ? "" : "text-muted-foreground"}`}>{child}</span>
                                {child !== "시에나" && (
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