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
  Wine,
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

interface OrviettooPageProps {
  setCurrentPage: (page: string) => void;
}

export default function OrviettooPage({ setCurrentPage }: OrviettooPageProps) {
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
      icon: Mountain,
      title: "해발고도",
      value: "325m",
      unit: "",
      description: "95m 높이 절벽 위의 도시",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "인구",
      value: "20,000",
      unit: "명",
      description: "움브리아 주의 역사 도시",
      color: "text-green-600",
    },
    {
      icon: Zap,
      title: "성체기적",
      value: "1263년",
      unit: "",
      description: "볼세나의 성체기적",
      color: "text-purple-600",
    },
    {
      icon: Church,
      title: "대성당 건립",
      value: "1290-1591",
      unit: "",
      description: "이탈리아 고딕의 걸작",
      color: "text-orange-600",
    },
  ];

  const countryInfo = [
    {
      label: "정식 명칭",
      value: "오르비에토 (Orvieto)",
    },
    { label: "위치", value: "이탈리아 움브리아 주 테르니 현" },
    { label: "해발고도", value: "325m (절벽 위 95m)" },
    { label: "면적", value: "281.27 평방 KM" },
    { label: "인구", value: "20,000명" },
    { label: "주요 성지", value: "성체기적 대성당" },
    { label: "언어", value: "이탈리아어" },
    { label: "화폐단위", value: "유로 (EUR)" },
    { label: "성체기적", value: "1263년 볼세나" },
  ];

  const holyPlaces = [
    {
      name: "오르비에토 대성당",
      subtitle: "성체기적을 기념하는 이탈리아 고딕의 걸작",
      description:
        "1290년 교황 니콜라오 4세의 명령으로 건축이 시작된 대성당으로, 1263년 볼세나에서 일어난 성체기적을 기념하기 위해 지어졌습니다. 300년에 걸쳐 완성된 이 성당은 이탈리아 고딕 건축의 최고 걸작으로 평가받으며, 시뇨렐리의 프레스코화로 유명합니다.",
      icon: Church,
      color: "from-blue-100 to-indigo-200",
      iconColor: "text-blue-700",
    },
    {
      name: "성체기적 경당",
      subtitle: "볼세나 성체기적의 성혈포가 보관된 경당",
      description:
        "대성당 내부에 있는 성체기적 경당(Cappella del Corporale)에는 1263년 볼세나에서 일어난 성체기적 당시의 성혈포가 보관되어 있습니다. 우골리노 디 프레테 일라리오가 제작한 성체기적 제단화는 이 기적을 생생하게 묘사하고 있습니다.",
      icon: Star,
      color: "from-amber-100 to-yellow-200",
      iconColor: "text-amber-700",
    },
    {
      name: "최후의 심판 프레스코",
      subtitle: "시뇨렐리가 그린 르네상스 걸작",
      description:
        "루카 시뇨렐리(Luca Signorelli)가 1499-1504년에 완성한 최후의 심판 프레스코화는 르네상스 예술의 걸작입니다. 미켈란젤로의 시스티나 성당 천장화에 영감을 준 이 작품은 인간의 육체와 영혼을 극도로 사실적으로 묘사했습니다.",
      icon: Crown,
      color: "from-purple-100 to-violet-200",
      iconColor: "text-purple-700",
    },
    {
      name: "포조 디 산 파트리치오",
      subtitle: "르네상스 시대의 건축 기적",
      description:
        "교황 클레멘스 7세의 명령으로 안토니오 다 상갈로가 1527년에 설계한 우물로, 깊이 62m의 이중 나선 계단이 특징입니다. 248개의 계단으로 이루어진 이 우물은 르네상스 건축 기술의 걸작으로, 물을 운반하는 당나귀들이 서로 마주치지 않도록 설계되었습니다.",
      icon: Building,
      color: "from-green-100 to-emerald-200",
      iconColor: "text-green-700",
    },
  ];

  const miracleHistory = [
    {
      title: "볼세나의 성체기적",
      period: "1263년",
      description: "보헤미아 출신 베드로 신부가 볼세나에서 미사 중 성체에서 피가 흘러나와 성혈포에 스며든 기적이 일어났습니다."
    },
    {
      title: "교황 우르바노 4세의 조사",
      period: "1263년",
      description: "교황 우르바노 4세가 직접 조사하여 기적임을 확인하고 성혈포를 오르비에토로 옮겨왔습니다."
    },
    {
      title: "성체축일 제정",
      period: "1264년",
      description: "이 기적을 계기로 교황 우르바노 4세는 성체축일(코르푸스 도미니)을 제정했습니다."
    },
    {
      title: "대성당 건축 시작",
      period: "1290년",
      description: "교황 니콜라오 4세가 성체기적을 기념하여 오르비에토 대성당 건축을 명령했습니다."
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
                  <span>이탈리아 움브리아 주</span>
                </Badge>
                <Badge variant="outline">성지순례</Badge>
                <Badge variant="outline">성체기적</Badge>
              </div>
              <div>
                <h1 className="text-4xl font-medium text-foreground mb-2">
                  오르비에또
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  성체기적의 도시, 95m 절벽 위에 세워진 신앙의 요새
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-gold-500/10 rounded-full flex items-center justify-center">
                <Zap className="h-12 w-12 text-yellow-600" />
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
                    오르비에토의 기본 정보
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
                    오르비에토의 지리적 위치
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10"></div>
                    <div className="text-center space-y-4 relative z-10">
                      <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center shadow-lg">
                        <MapPin className="h-8 w-8 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium">오르비에토</p>
                        <p className="text-sm text-muted-foreground">
                          42.7167°N, 12.1167°E
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
                  성체기적과 관련된 오르비에토의 주요 성지들을 소개합니다.
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
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          볼세나 성체기적 - 1263년
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          성체축일 제정의 계기가 된 기적
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      성체축일
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 이미지 영역 */}
                    <div className="lg:col-span-1">
                      <div className="aspect-[4/3] bg-gradient-to-br from-yellow-100 to-orange-200 rounded-lg flex items-center justify-center">
                        <div className="text-center space-y-3">
                          <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <Zap className="h-8 w-8 text-yellow-700" />
                          </div>
                          <div>
                            <p className="font-medium text-yellow-900">
                              Miracolo Eucaristico
                            </p>
                            <p className="text-sm text-yellow-700">
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
                          1263년 보헤미아 출신 베드로 신부가 볼세나의 성 크리스티나 성당에서 
                          미사를 드리던 중 성체가 피로 변하는 기적이 일어났습니다. 
                          성체에서 흘러나온 피가 성혈포에 스며들었고, 이를 목격한 
                          교황 우르바노 4세는 직접 조사하여 기적임을 확인했습니다.
                        </p>

                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                          <div className="flex items-start space-x-2">
                            <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <blockquote className="text-yellow-800 italic">
                              "이는 진정 내 몸이요, 이는 진정 내 피니라"
                            </blockquote>
                          </div>
                          <p className="text-yellow-600 text-xs mt-2 text-right">
                            - 성체기적 중 들려온 목소리
                          </p>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          이 기적을 계기로 교황 우르바노 4세는 1264년 성체축일(코르푸스 도미니)을 
                          제정했으며, 성혈포는 오르비에토로 옮겨져 현재까지 보관되고 있습니다. 
                          오르비에토 대성당은 이 기적을 기념하기 위해 건축되었습니다.
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">
                          성체축일
                        </span>
                        <span className="text-sm text-muted-foreground">
                          성령강림 후 두 번째 목요일
                        </span>
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
                  <CardDescription>볼세나에서 오르비에토까지의 신앙 여정</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {miracleHistory.map((info, index) => (
                    <div key={index} className="border-l-4 border-yellow-200 pl-4">
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

                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-yellow-800 leading-relaxed">
                          오르비에토의 성체기적은 가톨릭교회의 성체신학 발전에 
                          중대한 영향을 미쳤습니다. 이 기적은 성체 안에 예수 
                          그리스도가 참으로 현존하신다는 믿음을 강화했으며, 
                          성체축일이라는 보편 축일의 제정으로 이어졌습니다.
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
                                    // 현재 페이지이므로 아무것도 하지 않음
                                  } else if (child === "란치아노") {
                                    setCurrentPage("lanciano");
                                  } else {
                                    console.log(`${child} 페이지는 아직 구현되지 않았습니다.`);
                                  }
                                }}
                                className={`flex items-center justify-between px-4 py-2 hover:bg-muted transition-colors group ${
                                  child === "오르비에또" ? "bg-primary/5 text-primary border-r-2 border-primary" : ""
                                }`}
                              >
                                <span className={`text-sm ${child === "오르비에또" ? "" : "text-muted-foreground"}`}>{child}</span>
                                {child !== "오르비에또" && (
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