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

interface LorettoPageProps {
  setCurrentPage: (page: string) => void;
}

export default function LorettoPage({ setCurrentPage }: LorettoPageProps) {
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
      value: "11.8",
      unit: "km²",
      description: "아드리아 해변의 작은 순례 도시",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "인구",
      value: "12,500",
      unit: "명",
      description: "마르케 주의 성모 순례지",
      color: "text-green-600",
    },
    {
      icon: Home,
      title: "성모님의 집",
      value: "카사 산타",
      unit: "",
      description: "나자렛에서 이송된 성가족의 집",
      color: "text-purple-600",
    },
    {
      icon: Church,
      title: "성당 건립",
      value: "13-16세기",
      unit: "",
      description: "고딕-르네상스 양식의 성당",
      color: "text-orange-600",
    },
  ];

  const countryInfo = [
    {
      label: "정식 명칭",
      value: "로레토 (Loreto)",
    },
    { label: "위치", value: "이탈리아 마르케 주 안코나 현" },
    { label: "해발고도", value: "127m" },
    { label: "면적", value: "11.8 평방 KM" },
    { label: "인구", value: "12,500명" },
    { label: "주보", value: "로레토의 성모님" },
    { label: "언어", value: "이탈리아어" },
    { label: "화폐단위", value: "유로 (EUR)" },
    { label: "성모님의 집 도착", value: "1294년 12월 10일 (전승)" },
  ];

  const holyPlaces = [
    {
      name: "로레토 성모 대성당",
      subtitle: "성모님의 집을 품은 대성당",
      description:
        "13세기 말부터 16세기에 건립된 로레토 성모 대성당은 고딕과 르네상스 양식이 조화된 아름다운 건축물입니다. 성당 내부 중앙에는 성모님의 집인 카사 산타가 보호되어 있으며, 세계 각국에서 온 순례자들의 발길이 끊이지 않습니다.",
      icon: Church,
      color: "from-blue-100 to-indigo-200",
      iconColor: "text-blue-700",
    },
    {
      name: "카사 산타 (성모님의 집)",
      subtitle: "나자렛에서 온 성가족의 집",
      description:
        "성모 마리아가 살았던 나자렛의 집이 1291년과 1294년 두 차례에 걸쳐 천사들에 의해 이곳으로 이송되었다고 전해집니다. 3면의 벽돌로 된 이 집은 현재 대리석으로 만든 성막 안에 보호되어 있으며, 수많은 기적이 일어난 성지입니다.",
      icon: Home,
      color: "from-amber-100 to-yellow-200",
      iconColor: "text-amber-700",
    },
    {
      name: "성모님 상",
      subtitle: "기적의 로레토 성모상",
      description:
        "14세기에 제작된 로레토 성모상은 검은 피부색을 가진 성모님과 아기 예수의 모습으로, '검은 성모님'으로도 불립니다. 이 성상 앞에서 수많은 기적이 일어났으며, 1920년 교황 베네딕토 15세는 로레토 성모님을 '항공의 수호성인'으로 선포했습니다.",
      icon: Star,
      color: "from-purple-100 to-violet-200",
      iconColor: "text-purple-700",
    },
    {
      name: "티치아노 갤러리",
      subtitle: "르네상스 예술의 보고",
      description:
        "로레토 성당에는 티치아노, 로렌초 로토 등 르네상스 거장들의 작품이 소장되어 있습니다. 특히 성막을 장식하는 조각들은 안드레아 산소비노, 안토니오 산갈로 등의 작품으로, 16세기 이탈리아 예술의 최고 걸작들을 감상할 수 있습니다.",
      icon: Crown,
      color: "from-green-100 to-emerald-200",
      iconColor: "text-green-700",
    },
  ];

  const casaSantaHistory = [
    {
      title: "나자렛에서의 성모님의 집",
      period: "1-4세기",
      description: "성모 마리아가 살았던 집으로, 성모영보와 성가족의 생활터전이었습니다."
    },
    {
      title: "첫 번째 이송 - 테르사토",
      period: "1291년 5월 10일",
      description: "십자군 전쟁으로 위험해진 성지에서 천사들이 집을 달마티아 테르사토로 이송했다고 전해집니다."
    },
    {
      title: "두 번째 이송 - 레카나티",
      period: "1294년 12월 10일",
      description: "천사들이 성모님의 집을 이탈리아 레카나티의 숲으로 옮겼습니다."
    },
    {
      title: "최종 안착 - 로레토",
      period: "1294년 12월 10일",
      description: "같은 날 밤, 현재의 로레토 자리로 최종 이송되어 지금까지 보존되고 있습니다."
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
                  <span>이탈리아 마르케 주</span>
                </Badge>
                <Badge variant="outline">성지순례</Badge>
                <Badge variant="outline">성모님의 집</Badge>
              </div>
              <div>
                <h1 className="text-4xl font-medium text-foreground mb-2">
                  로레토
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  성모님의 집이 있는 기적의 땅, 나자렛에서 온 카사 산타의 성지
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Home className="h-12 w-12 text-blue-600" />
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
                    로레토의 기본 정보
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
                    로레토의 지리적 위치
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10"></div>
                    <div className="text-center space-y-4 relative z-10">
                      <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center shadow-lg">
                        <MapPin className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">로레토</p>
                        <p className="text-sm text-muted-foreground">
                          43.4367°N, 13.6055°E
                        </p>
                        <Badge
                          variant="secondary"
                          className="mt-2"
                        >
                          구글맵 영역
                        </Badge>
                      </div>
                    </div>
                  </div>
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
                  성모님의 집과 관련된 로레토의 주요 성지들을 소개합니다.
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

            {/* 카사 산타 특별 섹션 */}
            <section>
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Home className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          카사 산타 - 성모님의 집
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          나자렛에서 온 성가족의 거룩한 집
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      세계 순례지
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 이미지 영역 */}
                    <div className="lg:col-span-1">
                      <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg flex items-center justify-center">
                        <div className="text-center space-y-3">
                          <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <Home className="h-8 w-8 text-blue-700" />
                          </div>
                          <div>
                            <p className="font-medium text-blue-900">
                              Casa Santa
                            </p>
                            <p className="text-sm text-blue-700">
                              성모님의 집
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 설명 */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="space-y-3">
                        <p className="leading-relaxed">
                          로레토의 카사 산타는 성모 마리아가 나자렛에서 살았던 집으로, 
                          1291년과 1294년 천사들에 의해 이곳으로 이송되었다고 전해집니다. 
                          3면의 벽으로 구성된 이 집은 현재 대리석 성막 안에 보호되어 있으며, 
                          수세기 동안 수많은 기적이 일어난 성지입니다.
                        </p>

                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                          <div className="flex items-start space-x-2">
                            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <blockquote className="text-blue-800 italic">
                              "보라, 주님의 종이오니 말씀대로 제게 이루어지소서"
                            </blockquote>
                          </div>
                          <p className="text-blue-600 text-xs mt-2 text-right">
                            - 성모영보에서 성모 마리아의 응답 (루가 1:38)
                          </p>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          1920년 교황 베네딕토 15세는 로레토 성모님을 
                          '항공의 수호성인'으로 선포했으며, 현재도 전 세계 
                          조종사들과 승무원들의 수호성인으로 공경받고 있습니다.
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">
                          축일
                        </span>
                        <span className="text-sm text-muted-foreground">
                          12월 10일 (성모님의 집 도착일)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 카사 산타의 역사 */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>카사 산타의 역사</span>
                  </CardTitle>
                  <CardDescription>나자렛에서 로레토까지의 기적적 여정</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {casaSantaHistory.map((info, index) => (
                    <div key={index} className="border-l-4 border-blue-200 pl-4">
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

                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-800 leading-relaxed">
                          로레토의 카사 산타는 700년 이상 전 세계 가톨릭 신자들의 
                          순례지가 되어왔습니다. 성모영보가 일어난 이 거룩한 집에서 
                          수많은 교황들이 기도했으며, 성인들과 복자들이 영성을 
                          기르며 하나님의 은총을 체험했습니다.
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
                                    // 현재 페이지이므로 아무것도 하지 않음
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
                                  child === "로레토" ? "bg-primary/5 text-primary border-r-2 border-primary" : ""
                                }`}
                              >
                                <span className={`text-sm ${child === "로레토" ? "" : "text-muted-foreground"}`}>{child}</span>
                                {child !== "로레토" && (
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