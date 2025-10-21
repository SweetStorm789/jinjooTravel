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
  ChevronUp,
  Cross,
  Heart,
  Star,
  Crown,
  Home,
  Image as ImageIcon,
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

import basilicaDellaSantaCasaDiLoretoImage from "../images/italy/loreto/BasilicaDellaSantaCasaDiLoreto.jpg";
import loretoSacelloDellaSantaCasaImage from "../images/italy/loreto/LoretoSacelloDellaSantaCasa.jpg";
import santaCasaImage from "../images/italy/loreto/SantaCasa.jpg";

interface LorettoPageProps {
  setCurrentPage: (page: string) => void;
}

export default function LorettoPage({ setCurrentPage }: LorettoPageProps) {
  const [isItalyExpanded, setIsItalyExpanded] = useState(true);
  const [isCopyrightExpanded, setIsCopyrightExpanded] = useState(false);

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
      name: "로레토 성모 대성당 (Basilica della Santa Casa di Loreto)",
      subtitle: "성모님의 집을 품은 대성당",
      description:
        "13세기 말부터 16세기에 걸쳐 건립된 대성당은 고딕과 르네상스 양식이 조화를 이루는 아름다운 건축물이다. 성당 중앙에는 성모님의 집인 카사 산타가 보호되어 있으며, 세계 각국에서 온 순례자들의 발길이 끊이지 않는다. 성당 내부와 외부를 장식하는 조각과 회화들은 16세기 이탈리아 예술의 정수를 보여주며, 로레토 순례의 중심지가 되고 있다.",
      icon: Church,
      color: "from-blue-100 to-indigo-200",
      iconColor: "text-blue-700",
      image: basilicaDellaSantaCasaDiLoretoImage,
    },

    {
      name: "성모님 상 (Statue of Our Lady of Loreto)",
      subtitle: "기적의 로레토 성모상",
      description:
        "14세기에 제작된 목조 성모상으로, 검은 피부색을 한 성모님과 아기 예수의 모습으로 표현되어 ‘검은 성모님’이라 불린다. 이 성상 앞에서 수많은 기적이 일어났으며, 1920년 교황 베네딕토 15세는 로레토의 성모님을 ‘항공의 수호성인’으로 선포하였다. 오늘날에도 순례자들의 기도와 봉헌이 이어지는 신앙의 상징이다.",
      icon: Star,
      color: "from-purple-100 to-violet-200",
      iconColor: "text-purple-700",
      image: loretoSacelloDellaSantaCasaImage,
    },
   
  ];

  const casaSantaHistory = [
    {
      title: "나자렛에서의 성모님의 집",
      period: "1-4세기",
      description: "성모 마리아가 살았던 집으로, 성모영보와 성가족의 생활터전이었습니다."
    },
    {
      title: "첫 번째 이송 - 트르사트",
      period: "1291년 5월 10일",
      description: "십자군 전쟁으로 위험해진 성지에서 천사들이 집을 달마티아 트르사트로 이송했다고 전해집니다."
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
                  <GoogleMap
                    center={holyPlacesLocations.loretto.center}
                    markers={holyPlacesLocations.loretto.markers}
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
                  성모님의 집과 관련된 로레토의 주요 성지들을 소개합니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {holyPlaces.map((city, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative">
                      <div className="absolute inset-0"></div>
                      <ImageWithFallback
                        src={city.image}
                        alt={city.name}
                        className="w-full h-[300px] object-cover"
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
                      <h3 className="text-sm font-medium text-muted-foreground mb-3 border-l-2 border-blue-200 pl-3">
                        {city.subtitle}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {city.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
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
                      <div className="space-y-4">
                        <div className="aspect-[4/3] bg-gradient-to-br from-amber-100 to-yellow-200 rounded-lg overflow-hidden">
                        <ImageWithFallback
                        src={santaCasaImage}
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
                            Santa Casa
                          </p>
                          <p className="text-sm text-amber-700">
                            성모님의 집
                          </p>
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
                              "보십시오, 저는 주님의 종입니다. 말씀하신 대로 저에게 이루어지기를 바랍니다."
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
                          12월 10일 (로레토의 복되신 동정 마리아)
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
                                // console.log(`${item.name} 페이지는 아직 구현되지 않았습니다.`);
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
                                    // console.log(`${child} 페이지는 아직 구현되지 않았습니다.`);
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
        {/* 저작권 정보 */}
        <div className="w-full pt-4">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => setIsCopyrightExpanded(!isCopyrightExpanded)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-md bg-white shadow-sm">
                  <ImageIcon className="h-4 w-4 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  이미지 저작권 정보
                </span>
                <Badge variant="secondary" className="text-xs">
                  {isCopyrightExpanded ? "클릭하여 접기" : "클릭하여 펼치기"}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500 hidden sm:block">
                  {isCopyrightExpanded ? "접기" : "자세히 보기"}
                </span>
                {isCopyrightExpanded ? (
                  <ChevronUp className="h-4 w-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
                )}
              </div>
            </button>

            {isCopyrightExpanded && (
              <div className="px-4 pb-4 pt-2 bg-white border-t border-gray-200 animate-in slide-in-from-top duration-300">
                <div className="space-y-3 text-[11px] text-gray-600 leading-relaxed">
                  <div className="p-3 bg-gray-50 rounded-md border-l-2 border-blue-400">
                    <p className="font-medium text-gray-700 mb-1">📷 로레토 성모상</p>
                    <p>
                      사진: Flyer20061, 로레토 성모상 (Loreto, Italy),{" "}
                      <a 
                        href="https://creativecommons.org/licenses/by-sa/3.0/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 underline hover:text-blue-800 font-medium"
                      >
                        CC BY-SA 3.0
                      </a>, Wikimedia Commons 제공
                    </p>
                    <p className="text-gray-500 mt-1">
                      Image: Flyer20061, Statue of Our Lady of Loreto (Loreto, Italy),{" "}
                      <a 
                        href="https://creativecommons.org/licenses/by-sa/3.0/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        CC BY-SA 3.0
                      </a>, via Wikimedia Commons
                    </p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-md border-l-2 border-green-400">
                    <p className="font-medium text-gray-700 mb-1">📷 성모님의 집 (Santa Casa)</p>
                    <p>
                      사진: Zorro2212, 성모님의 집 (Santa Casa, Loreto, Italy),{" "}
                      <a 
                        href="https://creativecommons.org/licenses/by-sa/3.0/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 underline hover:text-blue-800 font-medium"
                      >
                        CC BY-SA 3.0
                      </a>, Wikimedia Commons 제공
                    </p>
                    <p className="text-gray-500 mt-1">
                      Image: Zorro2212, Holy House (Santa Casa), Loreto, Italy,{" "}
                      <a 
                        href="https://creativecommons.org/licenses/by-sa/3.0/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        CC BY-SA 3.0
                      </a>, via Wikimedia Commons
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    
  );
}