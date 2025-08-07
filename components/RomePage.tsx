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

interface RomePageProps {
  setCurrentPage: (page: string) => void;
}

export default function RomePage({ setCurrentPage }: RomePageProps) {
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
        "란치아노"
      ]
    },
    { name: "튀르키예", type: "page" },
    { name: "프랑스", type: "page" },
    { name: "성지순례 준비물", type: "page" },
  ];

  const keyStats = [
    {
      icon: Globe,
      title: "면적",
      value: "1,285",
      unit: "km²",
      description: "이탈리아의 수도이자 최대 도시",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "인구",
      value: "280",
      unit: "만명",
      description: "대도시권 인구 약 430만명",
      color: "text-green-600",
    },
    {
      icon: Building,
      title: "설립",
      value: "기원전 753년",
      unit: "",
      description: "로물루스에 의해 건설",
      color: "text-purple-600",
    },
    {
      icon: Church,
      title: "기독교 전래",
      value: "서기 27년",
      unit: "",
      description: "사도 베드로와 바울에 의해 전파",
      color: "text-orange-600",
    },
  ];

  const countryInfo = [
    {
      label: "정식 명칭",
      value: "로마 (Roma, Rome)",
    },
    { label: "위치", value: "이탈리아 중서부 라치오주" },
    { label: "건설", value: "기원전 753년 (로물루스)" },
    { label: "면적", value: "1,285 평방 KM" },
    { label: "인구", value: "280만명 (대도시권 430만명)" },
    { label: "종교", value: "가톨릭 85%, 기타 15%" },
    { label: "언어", value: "이탈리아어" },
    { label: "화폐단위", value: "유로 (EUR)" },
    { label: "기독교 전래", value: "서기 27년경 (사도 베드로와 바울)" },
  ];

  const majorBasilicas = [
    {
      name: "성 요한 라테라노 대성당",
      subtitle: "로마 교구의 주교좌 성당",
      description:
        "교황의 주교좌 성당으로 '모든 성당의 어머니(Mater et Caput)'라 불립니다. 콘스탄티누스 황제가 313년에 건립한 이 성당은 로마에서 가장 오래된 기독교 성당 중 하나입니다.",
      icon: Crown,
      color: "from-yellow-100 to-amber-200",
      iconColor: "text-yellow-700",
    },
    {
      name: "성모 마리아 대성당",
      subtitle: "서방교회 최초의 성모 마리아 성당",
      description:
        "서기 432년에 건립된 이 성당은 서방교회에서 성모 마리아에게 봉헌된 최초의 성당입니다. 5세기의 모자이크가 그대로 보존되어 있으며, 베들레헴의 구유 조각이 보관되어 있습니다.",
      icon: Star,
      color: "from-blue-100 to-indigo-200",
      iconColor: "text-blue-700",
    },
    {
      name: "성 바오로 대성당",
      subtitle: "사도 바울의 순교지에 세워진 성당",
      description:
        "사도 바울이 순교한 자리에 건립된 성당으로, 바울의 무덤이 있습니다. 현재의 건물은 19세기에 재건된 것이지만, 고대의 웅장함을 그대로 재현하고 있습니다.",
      icon: Cross,
      color: "from-purple-100 to-violet-200",
      iconColor: "text-purple-700",
    },
    {
      name: "산타 크로체 성당",
      subtitle: "십자가 성유물이 보관된 성당",
      description:
        "성녀 헬레나가 예루살렘에서 가져온 십자가 조각과 가시관 조각 등 예수님의 수난 성유물들이 보관되어 있는 성당입니다. '예루살렘 성당'이라고도 불립니다.",
      icon: Church,
      color: "from-red-100 to-rose-200",
      iconColor: "text-red-700",
    },
  ];

  const historicalInfo = [
    {
      title: "로마 제국의 수도",
      period: "기원전 27년 - 서기 476년",
      description: "아우구스투스 황제부터 서로마 제국 멸망까지 약 500년간 로마 제국의 중심지였습니다."
    },
    {
      title: "기독교 전래와 발전",
      period: "서기 27년 - 313년",
      description: "사도 베드로와 바울에 의해 기독교가 전래되었고, 콘스탄티누스 황제의 기독교 공인까지 박해와 순교의 시대를 거쳤습니다."
    },
    {
      title: "교황청의 중심지",
      period: "4세기 - 현재",
      description: "콘스탄티누스 황제의 기독교 공인 이후 가톨릭교회의 중심지로 발전하여 현재까지 교황청의 소재지입니다."
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
                  <span>이탈리아 라치오주</span>
                </Badge>
                <Badge variant="outline">성지순례</Badge>
                <Badge variant="outline">교황청 소재지</Badge>
              </div>
              <div>
                <h1 className="text-4xl font-medium text-foreground mb-2">
                  로마
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  영원한 도시, 가톨릭교회의 중심지이자 사도 베드로와 바울의 순교지
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center">
                <Columns className="h-12 w-12 text-red-600" />
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
                    로마의 기본 정보
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
                    로마의 지리적 위치
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GoogleMap
                    center={holyPlacesLocations.romeColosseum.center}
                    markers={holyPlacesLocations.romeColosseum.markers}
                    zoom={15}
                    height="400px"
                    className="w-full"
                  />
                </CardContent>
              </Card>
            </section>

            {/* 4대 성당 */}
            <section className="space-y-6">
              <div>
                <h2 className="text-xl font-medium text-foreground mb-2">
                  로마 4대 성당
                </h2>
                <p className="text-muted-foreground">
                  교황청이 있는 바티칸 성 베드로 대성당과 함께 로마의 주요 순례 성당들을 소개합니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {majorBasilicas.map((basilica, index) => {
                  const IconComponent = basilica.icon;
                  return (
                    <Card key={index} className="overflow-hidden">
                      <div className={`aspect-video bg-gradient-to-br ${basilica.color} flex items-center justify-center relative`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        <div className="text-center space-y-2 relative z-10">
                          <div className="w-12 h-12 bg-white/80 rounded-lg flex items-center justify-center backdrop-blur-sm mx-auto">
                            <IconComponent className={`h-6 w-6 ${basilica.iconColor}`} />
                          </div>
                          <h3 className="font-medium text-gray-900">
                            {basilica.name}
                          </h3>
                        </div>
                        {/* 오버레이 텍스트 */}
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="bg-white/90 backdrop-blur-sm rounded px-2 py-1">
                            <span className="text-sm font-medium text-gray-800">
                              {basilica.subtitle}
                            </span>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {basilica.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* 콜로세움 특별 섹션 */}
            <section>
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                        <Columns className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          콜로세움 - 순교자들의 기억
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          초기 기독교인들의 순교 현장
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
                      <div className="aspect-[4/3] bg-gradient-to-br from-amber-100 to-yellow-200 rounded-lg flex items-center justify-center">
                        <div className="text-center space-y-3">
                          <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <Columns className="h-8 w-8 text-amber-700" />
                          </div>
                          <div>
                            <p className="font-medium text-amber-900">
                              Colosseum
                            </p>
                            <p className="text-sm text-amber-700">
                              플라비우스 원형경기장
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 설명 */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="space-y-3">
                        <p className="leading-relaxed">
                          기원후 146년에 기독교가 27년에 걸쳐 전해진 로마에서, 
                          콜로세움은 초기 기독교인들이 박해받고 순교한 상징적인 장소입니다. 
                          검투사의 오락을 위한 경기장이었지만, 수많은 기독교인들이 
                          이곳에서 사자에게 던져지거나 처형되었습니다.
                        </p>

                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                          <div className="flex items-start space-x-2">
                            <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <blockquote className="text-amber-800 italic">
                              "콜로세움이 서 있는 한, 로마도 서 있을 것이요; 
                              콜로세움이 무너질 때, 로마도 무너질 것이요; 
                              로마가 무너질 때, 세상도 무너질 것이다."
                            </blockquote>
                          </div>
                          <p className="text-amber-600 text-xs mt-2 text-right">
                            - 베다 베너라빌리스 (7-8세기)
                          </p>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          현재 콜로세움은 순교자들을 기념하는 성지로 여겨지며, 
                          매년 성금요일에는 교황이 주재하는 십자가의 길 기도가 
                          이곳에서 거행됩니다.
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">
                          건설 연도
                        </span>
                        <span className="text-sm text-muted-foreground">
                          서기 72-80년
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 로마의 기독교 역사 */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Cross className="h-5 w-5" />
                    <span>로마의 기독교 역사</span>
                  </CardTitle>
                  <CardDescription>영원한 도시에서 가톨릭교회의 중심지까지</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {historicalInfo.map((info, index) => (
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
                          로마는 '모든 길이 통하는' 제국의 수도에서 '사도들의 무덤이 있는' 
                          기독교의 성지로 변화하였으며, 현재까지 전 세계 가톨릭교회의 
                          중심지 역할을 하고 있습니다. 바티칸 시국과 함께 교황청의 
                          소재지로서 중요한 의미를 갖습니다.
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
                                    // 현재 페이지이므로 아무것도 하지 않음
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
                                    console.log(`${child} 페이지는 아직 구현되지 않았습니다.`);
                                  }
                                }}
                                className={`flex items-center justify-between px-4 py-2 hover:bg-muted transition-colors group ${
                                  child === "로마" ? "bg-primary/5 text-primary border-r-2 border-primary" : ""
                                }`}
                              >
                                <span className={`text-sm ${child === "로마" ? "" : "text-muted-foreground"}`}>{child}</span>
                                {child !== "로마" && (
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