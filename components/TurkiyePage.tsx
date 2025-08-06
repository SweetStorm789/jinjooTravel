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
import { Separator } from "./ui/separator";
import { useState } from "react";
import GoogleMap from "./shared/GoogleMap";
import { holyPlacesLocations } from "./constants/holyPlacesLocations";

interface TurkiyePageProps {
  setCurrentPage: (page: string) => void;
}

export default function TurkiyePage({ setCurrentPage }: TurkiyePageProps) {
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
      value: "783,562",
      unit: "km²",
      description: "아시아와 유럽에 걸쳐 위치",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "인구",
      value: "8,400",
      unit: "만명",
      description: "이슬람 99.8%, 기타 0.2%",
      color: "text-green-600",
    },
    {
      icon: Building,
      title: "수도",
      value: "앙카라",
      unit: "",
      description: "최대도시는 이스탄불",
      color: "text-purple-600",
    },
    {
      icon: Clock,
      title: "시차",
      value: "-6",
      unit: "시간",
      description: "한국보다 6시간 늦음",
      color: "text-orange-600",
    },
  ];

  const countryInfo = [
    {
      label: "정식 명칭",
      value: "튀르키예 공화국 (Türkiye Cumhuriyeti, Republic of Turkey)",
    },
    { label: "정치 체제", value: "공화제" },
    { label: "수도", value: "앙카라" },
    { label: "위치", value: "유럽과 아시아의 남서, 아나톨리아 남쪽, 소아시아 연안" },
    { label: "면적", value: "783,562 평방 KM" },
    { label: "종교", value: "이슬람 99.8%, 기타 0.2%" },
    { label: "언어", value: "터키어" },
    { label: "화폐단위", value: "터키리라(TL)" },
    { 
      label: "시차", 
      value: "한국과의 시차는 6시간 (한국 07:00 튀르키예 00:00), 여름에는 summer time 실시로 5시간 튀르키예가 느립니다." 
    },
  ];

  const holyPlaces = [
    {
      name: "아야 소피아",
      subtitle: "비잔틴 제국의 성당에서 오스만 제국의 모스크로",
      description:
        "콘스탄티노플의 대성당으로 건설되어 1453년 오스만 제국의 정복 후 모스크로 전환된 역사적 건물입니다. 기독교와 이슬람교의 만남을 보여주는 상징적인 건축물입니다.",
      icon: Crown,
      color: "from-amber-100 to-yellow-200",
      iconColor: "text-amber-700",
    },
    {
      name: "블루 모스크",
      subtitle: "술탄 아흐메트 모스크",
      description:
        "오스만 제국의 건축 양식을 보여주는 대표적인 모스크로, 6개의 첨탑과 아름다운 청색 타일로 유명합니다. 아야 소피아와 마주보고 있어 이스탄불의 상징이 되었습니다.",
      icon: Star,
      color: "from-blue-100 to-indigo-200",
      iconColor: "text-blue-700",
    },
    {
      name: "지하 궁전",
      subtitle: "예레바탄 사라이",
      description:
        "비잔틴 시대에 건설된 지하 저수조로, 기독교 시대의 뛰어난 건축 기술을 보여줍니다. 336개의 기둥이 받치고 있는 신비로운 지하 공간입니다.",
      icon: Building,
      color: "from-purple-100 to-violet-200",
      iconColor: "text-purple-700",
    },
    {
      name: "성모 마리아의 집",
      subtitle: "에페소 인근의 성지",
      description:
        "사도 요한이 성모 마리아를 모시고 살았다고 전해지는 곳으로, 가톨릭교회와 이슬람교 모두에서 성지로 여겨집니다. 매년 수많은 순례자들이 찾는 곳입니다.",
      icon: Heart,
      color: "from-pink-100 to-rose-200",
      iconColor: "text-pink-700",
    },
  ];

  const historicalInfo = [
    {
      title: "비잔틴 제국의 수도",
      period: "330년 - 1453년",
      description: "콘스탄티노플(현 이스탄불)은 동로마 제국의 수도로서 기독교 문화의 중심지였습니다."
    },
    {
      title: "사도 바울의 선교 여행",
      period: "1세기",
      description: "사도 바울이 소아시아 지역에서 활발한 선교 활동을 펼쳤으며, 에페소교회 등을 설립했습니다."
    },
    {
      title: "초대교회 공의회",
      period: "325년, 381년",
      description: "니케아 공의회와 콘스탄티노플 공의회가 열려 기독교 교리의 기초가 확립되었습니다."
    },
    {
      title: "오스만 제국 시대",
      period: "1299년 - 1922년",
      description: "이슬람 제국으로 발전하며 기독교 유적들이 이슬람 건축물로 변환되거나 공존하게 되었습니다."
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
                  <span>유럽과 아시아 교차점</span>
                </Badge>
                <Badge variant="outline">성지순례</Badge>
                <Badge variant="outline">사도 바울 선교지</Badge>
              </div>
              <div>
                <h1 className="text-4xl font-medium text-foreground mb-2">
                  튀르키예 공화국
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  사도 바울의 선교 여행지이자 초대교회의 요람, 비잔틴과 오스만의 만남
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center">
                <Star className="h-12 w-12 text-red-600" />
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
                    튀르키예 공화국의 기본 정보
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
                    튀르키예의 지리적 위치
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GoogleMap
                    center={holyPlacesLocations.turkiye.center}
                    markers={holyPlacesLocations.turkiye.markers}
                    zoom={6}
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
                  사도 바울의 선교 여행지와 초대교회 유적이 있는 튀르키예의 주요 성지들을 소개합니다.
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

            {/* 이스탄불 특별 섹션 */}
            <section>
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                        <Crown className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          이스탄불 - 동서양의 만남
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          콘스탄티노플에서 이스탄불로
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
                            <Crown className="h-8 w-8 text-amber-700" />
                          </div>
                          <div>
                            <p className="font-medium text-amber-900">
                              Istanbul
                            </p>
                            <p className="text-sm text-amber-700">
                              콘스탄티노플
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 설명 */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="space-y-3">
                        <p className="leading-relaxed">
                          이스탄불은 비잔틴 제국의 수도 콘스탄티노플로 시작하여 
                          1천년 이상 기독교 세계의 중심지였습니다. 
                          330년 콘스탄티누스 황제에 의해 건설된 이 도시는 
                          동방정교회의 중심지로 발전했으며, 1453년 오스만 제국의 정복 이후 
                          이슬람 문화의 중심지가 되었습니다.
                        </p>

                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                          <div className="flex items-start space-x-2">
                            <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <blockquote className="text-amber-800 italic">
                              "이스탄불은 하나의 도시가 아니라 하나의 세계이다. 
                              여기서 동양과 서양, 과거와 현재, 
                              기독교와 이슬람이 만난다."
                            </blockquote>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          현재의 이스탄불에는 아야 소피아, 블루 모스크, 
                          톱카프 궁전 등 비잔틴과 오스만 시대의 유산이 
                          공존하며, 기독교와 이슬람교의 만남을 보여주는 
                          독특한 문화적 풍경을 제공합니다.
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">
                          인구
                        </span>
                        <span className="text-sm text-muted-foreground">
                          약 1,550만명
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 카파도키아 */}
            <section>
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                        <Mountain className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          카파도키아 - 초기 기독교의 피난처
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          지하 도시와 바위 교회
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      세계자연문화유산
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="leading-relaxed">
                      카파도키아는 독특한 바위 지형으로 유명한 지역으로, 
                      초기 기독교인들이 로마의 박해를 피해 은신했던 곳입니다. 
                      지하 도시들과 바위를 깎아 만든 교회들이 수백 개 발견되어 
                      초기 기독교 역사의 중요한 증거가 되고 있습니다.
                    </p>

                    <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                      <div className="flex items-start space-x-2">
                        <Info className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-orange-800 font-medium mb-2">주요 특징</p>
                          <ul className="text-sm text-orange-700 space-y-1">
                            <li>• 지하 8층까지 내려가는 데린쿠유 지하도시</li>
                            <li>• 괴뢰메 야외 박물관의 바위 교회들</li>
                            <li>• 4-11세기 비잔틴 시대의 프레스코화</li>
                            <li>• 초기 기독교 수도원 공동체의 흔적</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 튀르키예의 기독교 역사 */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Cross className="h-5 w-5" />
                    <span>튀르키예의 기독교 역사</span>
                  </CardTitle>
                  <CardDescription>사도 바울의 선교지에서 비잔틴 제국까지</CardDescription>
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
                          튀르키예는 사도 바울의 선교 여행지로서 초대교회 형성에 중요한 역할을 했으며, 
                          비잔틴 제국 시대에는 동방 기독교의 중심지였습니다. 
                          현재도 에페소의 성모 마리아의 집을 비롯해 많은 기독교 유적이 
                          잘 보존되어 있어 전 세계 기독교도들의 순례지가 되고 있습니다.
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
                                // 현재 페이지이므로 아무것도 하지 않음
                              } else if (item.name === "프랑스") {
                                setCurrentPage("france");
                              } else {
                                console.log(`${item.name} 페이지는 아직 구현되지 않았습니다.`);
                              }
                            }}
                            className={`flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors group ${
                              item.name === "튀르키예" ? "bg-primary/5 text-primary border-r-2 border-primary" : ""
                            }`}
                          >
                            <span className="text-sm">{item.name}</span>
                            {item.name !== "튀르키예" ? (
                              <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            ) : null}
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
                                    console.log(`${child} 페이지는 아직 구현되지 않았습니다.`);
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
                    <Badge variant="secondary">UTC+3</Badge>
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
                    <span className="text-sm">터키리라(TRY)</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">
                      기후
                    </span>
                    <span className="text-sm">지중해성/대륙성</span>
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