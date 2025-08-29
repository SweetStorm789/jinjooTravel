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
  Columns,
  Star,
  Heart,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useState } from "react";
import GoogleMap from "./shared/GoogleMap";
import { holyPlacesLocations } from "./constants/holyPlacesLocations";

interface ItalyPageProps {
  setCurrentPage: (page: string) => void;
}

export default function ItalyPage({ setCurrentPage }: ItalyPageProps) {
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
      value: "301,340",
      unit: "km²",
      description: "유럽 남부 지중해에 위치",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "인구",
      value: "59",
      unit: "백만",
      description: "가톨릭 80%, 기타 20%",
      color: "text-green-600",
    },
    {
      icon: Building,
      title: "수도",
      value: "로마",
      unit: "",
      description: "가톨릭교회의 중심지",
      color: "text-purple-600",
    },
    {
      icon: Clock,
      title: "시차",
      value: "-8/-7",
      unit: "시간",
      description: "한국보다 8-7시간 늦음 (서머타임 적용)",
      color: "text-orange-600",
    },
  ];

  const countryInfo = [
    {
      label: "정식 명칭",
      value: "이탈리아 공화국 (Repubblica Italiana)",
    },
    { label: "정치 체제", value: "공화제" },
    { label: "수도", value: "로마 (Roma)" },
    { label: "면적", value: "301,340 평방 KM" },
    { label: "위치", value: "유럽" },
    { label: "종교", value: "가톨릭 80%, 기타 20%" },
    { label: "인종", value: "이탈리아인 95.1% 기타 4.9%" },
    { label: "언어", value: "이탈리아어" },
    { label: "화폐단위", value: "유로 (EUR)" },
    { 
      label: "시차", 
      value: "한국과의 시차는 8시간 (한국 08:00 이탈리아 00:00), 여름에는 summer time 실시로 7시간 이탈리아가 느립니다." 
    },
  ];

  const cities = [
    {
      name: "로마",
      englishName: "Roma",
      description: "영원한 도시, 사도 베드로와 바울의 순교지",
      page: "rome",
      color: "from-red-100 to-red-200",
      iconColor: "text-red-700",
      icon: Columns,
    },
    {
      name: "아시시",
      englishName: "Assisi",
      description: "성 프란치스코와 성녀 클라라의 성지",
      page: "assisi",
      color: "from-amber-100 to-yellow-200",
      iconColor: "text-amber-700",
      icon: Church,
    },
    {
      name: "산조반니로톤도",
      englishName: "San Giovanni Rotondo",
      description: "성 비오(파드레 피오) 신부의 성흔 성지",
      page: "sangiovannirotondo",
      color: "from-purple-100 to-violet-200",
      iconColor: "text-purple-700",
      icon: Cross,
    },
    {
      name: "로레토",
      englishName: "Loreto",
      description: "성모님의 집(카사 산타)이 있는 성지",
      page: "loreto",
      color: "from-blue-100 to-indigo-200",
      iconColor: "text-blue-700",
      icon: Star,
    },
    {
      name: "시에나",
      englishName: "Siena",
      description: "성녀 카타리나의 고향",
      page: "siena",
      color: "from-pink-100 to-rose-200",
      iconColor: "text-pink-700",
      icon: Heart,
    },
    {
      name: "오르비에또",
      englishName: "Orvieto",
      description: "성체기적의 도시, 95m 절벽 위의 신앙 요새",
      page: "orviettoo",
      color: "from-yellow-100 to-orange-200",
      iconColor: "text-yellow-700",
      icon: Mountain,
    },
    {
      name: "란치아노",
      englishName: "Lanciano",
      description: "세계 최초 성체기적, 1300년간 보존된 신앙의 증거",
      page: "lanciano",
      color: "from-green-100 to-emerald-200",
      iconColor: "text-green-700",
      icon: Crown,
    },
  ];

  const historicalInfo = [
    {
      title: "로마 제국",
      period: "기원전 27년 - 서기 476년",
      description: "세계 최대 제국으로 발전하여 기독교 전파의 중심 역할을 했습니다."
    },
    {
      title: "기독교 공인",
      period: "313년",
      description: "콘스탄티누스 황제의 밀라노 칙령으로 기독교가 공인되었습니다."
    },
    {
      title: "교황청 설립",
      period: "4세기",
      description: "로마가 가톨릭교회의 중심지로 확립되었습니다."
    },
    {
      title: "프란치스코 수도회",
      period: "13세기",
      description: "성 프란치스코에 의해 설립된 수도회가 이탈리아 전역에 퍼졌습니다."
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
                  <span>유럽 남부</span>
                </Badge>
                <Badge variant="outline">성지순례</Badge>
                <Badge variant="outline">가톨릭의 중심지</Badge>
              </div>
              <div>
                <h1 className="text-4xl font-medium text-foreground mb-2">
                  이탈리아
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  가톨릭교회의 심장, 성인들의 발자취가 살아있는 신앙의 나라
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center">
                <Church className="h-12 w-12 text-green-600" />
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
                    이탈리아 공화국의 기본 정보
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
                    이탈리아의 지리적 위치
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GoogleMap
                    center={holyPlacesLocations.italy.center}
                    markers={holyPlacesLocations.italy.markers}
                    zoom={6}
                    height="400px"
                    className="w-full"
                  />
                </CardContent>
              </Card>
            </section>

            {/* 주요 성지 개요 */}
            <section>
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <Church className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          이탈리아 성지순례
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          가톨릭교회의 심장에서 만나는 성인들의 발자취
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      7개 주요 성지
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="leading-relaxed">
                      이탈리아는 가톨릭교회의 중심지로서 수많은 성인들이 살았던 땅이며, 
                      교회 역사상 가장 중요한 사건들이 일어난 곳입니다. 
                      바티칸 시국을 품고 있는 로마부터 성 프란치스코의 아시시, 
                      성체기적의 란치아노와 오르비에또까지, 각 도시마다 고유한 영성과 
                      역사를 간직하고 있습니다.
                    </p>

                    <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                      <div className="flex items-start space-x-2">
                        <Info className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-green-800 font-medium mb-2">이탈리아 성지순례의 특징</p>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• 교황청과 바티칸이 위치한 가톨릭의 중심지</li>
                            <li>• 성 프란치스코, 성녀 클라라, 성 비오 신부 등 위대한 성인들의 발자취</li>
                            <li>• 세계 최초의 성체기적과 다양한 기적들의 현장</li>
                            <li>• 르네상스 시대의 찬란한 종교 예술과 건축물</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 주요 성지 도시들 */}
            <section className="space-y-6">
              <div>
                <h2 className="text-xl font-medium text-foreground mb-2">
                  주요 성지 도시
                </h2>
                <p className="text-muted-foreground">
                  이탈리아의 7개 주요 성지순례 도시를 선택하여 자세한 정보를 확인하세요.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cities.map((city, index) => {
                  const IconComponent = city.icon;
                  return (
                    <Button
                      key={city.page}
                      variant="outline"
                      className="h-auto p-0 overflow-hidden hover:shadow-lg transition-all duration-300"
                      onClick={() => setCurrentPage(city.page)}
                    >
                      <div className="w-full">
                        <div className={`aspect-[4/3] bg-gradient-to-br ${city.color} flex items-center justify-center relative`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                          <div className="text-center space-y-2 relative z-10">
                            <div className="w-12 h-12 bg-white/80 rounded-lg flex items-center justify-center backdrop-blur-sm mx-auto">
                              <IconComponent className={`h-6 w-6 ${city.iconColor}`} />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {city.name}
                              </h3>
                              <p className="text-xs text-gray-600">
                                {city.englishName}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="text-xs text-muted-foreground text-left leading-relaxed">
                            {city.description}
                          </p>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </section>

            {/* 이탈리아의 기독교 역사 */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Cross className="h-5 w-5" />
                    <span>이탈리아의 기독교 역사</span>
                  </CardTitle>
                  <CardDescription>로마 제국에서 가톨릭교회의 중심지까지</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {historicalInfo.map((info, index) => (
                    <div key={index} className="border-l-4 border-green-200 pl-4">
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
                  
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Info className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-green-800 leading-relaxed">
                          이탈리아는 초대교회 시대부터 현재까지 가톨릭교회 발전의 중심지 역할을 
                          해왔습니다. 로마의 사도들부터 중세의 성인들, 근현대의 성인들까지 
                          수많은 성인들이 이 땅에서 하나님의 사랑을 증거했으며, 
                          그들의 발자취는 오늘날까지 순례자들에게 큰 감동을 주고 있습니다.
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
                          <div className="flex items-center bg-primary/5 text-primary border-r-2 border-primary">
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                // 이탈리아 페이지는 이미 현재 페이지이므로 아무것도 하지 않음
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
                                // console.log(`${item.name} 페이지는 아직 구현되지 않았습니다.`);
                              }
                            }}
                            className="flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors group"
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
                                    setCurrentPage("lanciano");
                                  } else {
                                    // console.log(`${child} 페이지는 아직 구현되지 않았습니다.`);
                                  }
                                }}
                                className="flex items-center justify-between px-4 py-2 hover:bg-muted transition-colors group"
                              >
                                <span className="text-sm text-muted-foreground">{child}</span>
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