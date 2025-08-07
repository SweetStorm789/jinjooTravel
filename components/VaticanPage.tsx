import {
  MapPin,
  Users,
  Calendar,
  Clock,
  Globe,
  Building,
  Crown,
  Church,
  ArrowRight,
  Info,
  ChevronDown,
  ChevronRight,
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
import vaticanImage from "../images/vatican/st-peters-basilica.jpg";

interface VaticanPageProps {
  setCurrentPage: (page: string) => void;
}

export default function VaticanPage({
  setCurrentPage,
}: VaticanPageProps) {
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
      value: "0.44",
      unit: "km²",
      description: "세계에서 가장 작은 독립국가",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "인구",
      value: "800",
      unit: "명",
      description: "대부분이 성직자와 스위스 근위대",
      color: "text-green-600",
    },
    {
      icon: Calendar,
      title: "독립",
      value: "1929",
      unit: "년",
      description: "라테란 조약으로 독립국가 인정",
      color: "text-purple-600",
    },
    {
      icon: Clock,
      title: "시차",
      value: "-8",
      unit: "시간",
      description: "한국보다 8시간 늦음 (서머타임 -7시간)",
      color: "text-orange-600",
    },
  ];

  const countryInfo = [
    {
      label: "정식 명칭",
      value: "바티칸 시국 (Stato della Città del Vaticano)",
    },
    { label: "정치 체제", value: "교황제 (절대군주제)" },
    { label: "국가원수", value: "로마 가톨릭교회 교황" },
    { label: "수도", value: "바티칸 시티" },
    { label: "공용어", value: "이탈리아어, 라틴어" },
    { label: "종교", value: "로마 가톨릭교" },
    { label: "화폐", value: "유로 (EUR)" },
    { label: "국제전화", value: "+39 06" },
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
                  <span>이탈리아 로마</span>
                </Badge>
                <Badge variant="outline">성지순례</Badge>
              </div>
              <div>
                <h1 className="text-4xl font-medium text-foreground mb-2">
                  바티칸 시국
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  세계 가톨릭교의 중심지이자 교황의 거주지, 전
                  세계 13억 가톨릭 신자들의 영적 고향
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center">
                <Church className="h-12 w-12 text-primary" />
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
                    바티칸 시국의 기본 정보
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
                    바티칸 시국의 지리적 위치
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GoogleMap
                    center={holyPlacesLocations.vaticanBasilica.center}
                    markers={holyPlacesLocations.vaticanBasilica.markers}
                    zoom={15}
                    height="400px"
                    className="w-full"
                  />
                </CardContent>
              </Card>
            </section>

            {/* 역사 섹션 */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>역사</span>
                  </CardTitle>
                  <CardDescription>
                    바티칸 시국의 성립과 발전
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-xs font-medium text-primary">
                            8c
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">
                            교황령의 시작
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            8세기경에 시작된 교황령은 르네상스
                            시대에 이탈리아 반도의 북부와 중앙
                            영토로 확장되었다.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-xs font-medium text-green-700">
                            1929
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">
                            독립국가 인정
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            라테란 조약에 따라 이탈리아 파시스트
                            정권으로부터 독립국가로 인정받았다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2 text-blue-900">
                      한국과의 외교관계
                    </h4>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p>
                        • 1963년 12월: 한국-바티칸 외교관계 수립
                      </p>
                      <p>
                        • 1974년 4월: 한국에 바티칸 주재
                        상주대사관 개설
                      </p>
                      <p>
                        • 1831년 9월: 교황 그레고리우스 16세가
                        조선을 독립 교구로 설정
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 성 베드로 대성당 */}
            <section>
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                        <Church className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          성 베드로 대성당
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          교회의 반석 사도들의 기초
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">특별 성지</Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 이미지 영역 */}
                    <div className="lg:col-span-1">
                      <div className="space-y-4">
                        <div className="aspect-[4/3] bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg overflow-hidden">
                          <ImageWithFallback
                            src={vaticanImage}
                            alt="성 베드로 대성당"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-center space-y-3">
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto">
                            <Church className="h-8 w-8 text-amber-700" />
                          </div>
                          <div>
                            <p className="font-medium text-amber-900">
                              St. Peter's Basilica
                            </p>
                            <p className="text-sm text-amber-700">
                              성 베드로 대성당
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 설명 */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="space-y-3">
                        <p className="leading-relaxed">
                          오늘날 성 베드로 대성당은 모든
                          그리스도인들이 만나는 가장 중요한
                          장소이다. 성 베드로 성당은 신앙 안의
                          일치와 신앙고백을 표현하는 곳이다.
                          이곳을 찾는 모든 이들은 성당 전체를
                          장식하고 있는 무수한 성인들의 삶을
                          통해 드러난 신앙의 증거들과 그들이
                          걸어간 거룩함의 여정을 자신 안에서
                          되새기고자 하는 것이다.
                        </p>

                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                          <div className="flex items-start space-x-2">
                            <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <blockquote className="text-amber-800 italic">
                              "그대는 베드로(반석)입니다. 나는
                              이 반석 위에 내 교회를 세울 터인데
                              저승의 문도 그것을 이기지 못할
                              것입니다."
                            </blockquote>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          모든 그리스도인들은 부족함, 연약함,
                          배신의 어두움, 용서의 필요성, 사랑
                          고백, 그 사랑, 그리고 마지막에 가서는
                          순교까지의 최고의 증거를 보인 베드로의
                          삶을 다시 살아간다.
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">
                          추천 활동
                        </span>
                        <span className="text-sm text-muted-foreground">
                          로마의 중심에서 드리는 기도
                        </span>
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
                              if (item.name === "그리스") {
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
                              } else if (item.name === "바티칸") {
                                // 현재 페이지이므로 아무것도 하지 않음
                              } else {
                                // 다른 페이지들은 아직 구현되지 않음
                                console.log(
                                  `${item.name} 페이지는 아직 구현되지 않았습니다.`,
                                );
                              }
                            }}
                            className={`flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors group ${
                              item.name === "바티칸"
                                ? "bg-primary/5 text-primary border-r-2 border-primary"
                                : ""
                            }`}
                          >
                            <span className="text-sm">
                              {item.name}
                            </span>
                            {item.name !== "바티칸" ? (
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}