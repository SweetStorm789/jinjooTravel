import {
  MapPin,
  Users,
  Calendar,
  Clock,
  Globe,
  Building,
  Waves,
  Mountain,
  Church,
  ArrowRight,
  Info,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface GreecePageProps {
  setCurrentPage: (page: string) => void;
}

export default function GreecePage({
  setCurrentPage,
}: GreecePageProps) {
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
      value: "131,940",
      unit: "km²",
      description: "발칸반도 남단에 위치",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "인구",
      value: "10.7",
      unit: "백만",
      description: "그리스계가 대부분",
      color: "text-green-600",
    },
    {
      icon: Building,
      title: "수도",
      value: "아테네",
      unit: "",
      description: "고대 철학과 민주주의의 발상지",
      color: "text-purple-600",
    },
    {
      icon: Clock,
      title: "시차",
      value: "-7",
      unit: "시간",
      description: "한국보다 7시간 늦음 (서머타임 -6시간)",
      color: "text-orange-600",
    },
  ];

  const countryInfo = [
    {
      label: "정식 명칭",
      value: "그리스 공화국 (Ελληνική Δημοκρατία)",
    },
    { label: "정치 체제", value: "의회 공화제" },
    { label: "국가원수", value: "대통령" },
    { label: "수도", value: "아테네 (Athens)" },
    { label: "공용어", value: "그리스어 (신약성경의 언어)" },
    { label: "종교", value: "그리스정교 97%, 이슬람교 1.2%" },
    { label: "화폐", value: "유로 (EUR)" },
    { label: "국제전화", value: "+30" },
  ];

  const holyPlaces = [
    {
      name: "아테네",
      subtitle:
        "그리스의 수도인 아테네는 장대, 경제, 문화의 중심지로 전해진 그리스 수도다.",
      description:
        "그리스의 수도인 아테네는 장대, 경제, 문화의 중심지로 전해진 그리스 수도다. 약 2,500년 전에 일어난 고대 도시의 중심지였다.",
    },
    {
      name: "콘덴창",
      subtitle:
        "아테네 중심에 되는 광장으로서, 광장 곳곳에 있는 콘덴창은 아테네의 대표적인 콘덴창이다.",
      description:
        "아테네 중심에 되는 광장으로서, 광장 곳곳에 있는 콘덴창은 아테네의 대표적인 콘덴창이다. 이 광장을 둘러싸서 메데르어 대도시인 민주성의 중심지로 존재한다.",
    },
    {
      name: "무덤정신비",
      subtitle:
        "고대 왕이 일장 있어 인간과 칠순강이 응답 현장이 여러 원인 강성된 상황이었다.",
      description:
        "고대 왕이 일장 있어 인간과 칠순강이 응답 현장이 여러 원인 강성된 상황이었다. 향후 불길한 발생이 십분 경제를 전개하고 사항을 일으킨 것도 있었다. 1923년 약 350만으로 형성 경제의 미국에 어머니 기존도로 점판 간결을 압삼하고 있었다.",
    },
    {
      name: "제우스 신전",
      subtitle:
        "그리스 최대의 신전으로서, 후대에 104개가 있던 물건과 가장 15일간 노아 있는 자리스 왕상의 건축이다.",
      description:
        "그리스 최대의 신전으로서, 후대에 104개가 있던 물건과 가장 15일간 노아 있는 자리스 왕상의 건축이다.",
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
                  <span>유럽 동남부</span>
                </Badge>
                <Badge variant="outline">성지순례</Badge>
              </div>
              <div>
                <h1 className="text-4xl font-medium text-foreground mb-2">
                  그리스 공화국
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  사도 바울의 발자취와 요한계시록이 기록된 땅,
                  기독교 초기 교회의 중요한 무대
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Building className="h-12 w-12 text-blue-600" />
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
                    그리스 공화국의 기본 정보
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
                    그리스의 지리적 위치
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10"></div>
                    <div className="text-center space-y-4 relative z-10">
                      <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center shadow-lg">
                        <MapPin className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">아테네</p>
                        <p className="text-sm text-muted-foreground">
                          37.9755°N, 23.7348°E
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
                  아테네
                </h2>
                <p className="text-muted-foreground">
                  그리스의 수도인 아테네는 장대, 경제, 문화의
                  중심지로 전해진그리스 수도이 약1/30번째 목숨
                  사는 대도시이다. 약 2,500년 전에 일어난 고대
                  도시의 중심지였다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {holyPlaces.map((place, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                      <div className="text-center space-y-2 relative z-10">
                        <div className="w-12 h-12 bg-white/80 rounded-lg flex items-center justify-center backdrop-blur-sm mx-auto">
                          {index === 0 && (
                            <Building className="h-6 w-6 text-blue-600" />
                          )}
                          {index === 1 && (
                            <MapPin className="h-6 w-6 text-green-600" />
                          )}
                          {index === 2 && (
                            <Mountain className="h-6 w-6 text-purple-600" />
                          )}
                          {index === 3 && (
                            <Church className="h-6 w-6 text-amber-600" />
                          )}
                        </div>
                        <h3 className="font-medium text-gray-900">
                          {place.name}
                        </h3>
                      </div>
                      {/* 오버레이 텍스트 */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-white/90 backdrop-blur-sm rounded px-2 py-1">
                          <span className="text-sm font-medium text-gray-800">
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
                ))}
              </div>

              {/* 올림피아 경기장 */}
              <div className="mt-8">
                <Card className="overflow-hidden">
                  <div className="aspect-[2/1] bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10"></div>
                    <div className="text-center space-y-2 relative z-10">
                      <div className="w-16 h-16 bg-white/80 rounded-lg flex items-center justify-center backdrop-blur-sm mx-auto">
                        <Mountain className="h-8 w-8 text-amber-600" />
                      </div>
                      <h3 className="font-medium text-amber-900">
                        올림피아 경기장
                      </h3>
                    </div>
                    {/* 오버레이 텍스트 */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded px-3 py-2">
                        <span className="font-medium text-amber-800">
                          올림피아 경기장
                        </span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground leading-relaxed">
                      고대의 로마테네 대륙에서 가장의
                      경기장이었던 곳으로 1896년 제1회 근대
                      올림픽 출범때부터 현재까지 유명한
                      경기장이다. 현재 광장에서는 약 10년 간이나
                      위보를 아일에만 약50,000명조를 올수 있는
                      경기장 이다.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 아테네 - 바울의 설교 */}
            <section>
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Building className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          아테네 아레오바고
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          바울의 유명한 설교 장소
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      사도행전 17장
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
                            <Building className="h-8 w-8 text-blue-700" />
                          </div>
                          <div>
                            <p className="font-medium text-blue-900">
                              Areopagus
                            </p>
                            <p className="text-sm text-blue-700">
                              아레오바고
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 설명 */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="space-y-3">
                        <p className="leading-relaxed">
                          사도 바울이 아테네를 방문했을 때, 그는
                          도시 곳곳에 우상들이 가득한 것을 보고
                          마음이 격분했다. 그는 회당에서
                          유대인들과 경건한 사람들과 변론하고,
                          또 날마다 시장에서 만나는 사람들과도
                          변론했다.
                        </p>

                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                          <div className="flex items-start space-x-2">
                            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <blockquote className="text-blue-800 italic">
                              "알지 못하는 신에게라고 새긴 단도
                              보았으니 그런즉 너희가 알지 못하고
                              위하는 그것을 내가 너희에게 알게
                              하리라"
                            </blockquote>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          아레오바고는 아테네의 고대
                          법정이었으며, 바울은 이곳에서
                          그리스인들에게 창조주 하나님과 부활의
                          복음을 전했다. 이는 기독교가 헬라
                          문화권으로 전해지는 중요한 순간이었다.
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">
                          성경 구절
                        </span>
                        <span className="text-sm text-muted-foreground">
                          사도행전 17:16-34
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 파트모스섬 - 요한계시록 */}
            <section>
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                        <Mountain className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          파트모스섬
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          요한계시록이 기록된 성지
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      요한계시록
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="leading-relaxed">
                      사도 요한이 로마 황제 도미티아누스에 의해
                      유배된 섬으로, 이곳에서 요한계시록을
                      기록했다고 전해진다. 에게해의 작은
                      섬이지만 기독교 역사에서 매우 중요한
                      의미를 갖는 성지이다.
                    </p>

                    <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                      <div className="flex items-start space-x-2">
                        <Info className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <blockquote className="text-purple-800 italic">
                          "나 요한은 너희 형제요 예수의 환난과
                          나라와 참음에 동참하는 자라 하나님의
                          말씀과 예수의 증거로 말미암아 밧모라
                          하는 섬에 있었더니"
                        </blockquote>
                      </div>
                      <p className="text-purple-600 text-xs mt-2 text-right">
                        - 요한계시록 1:9
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
                              } else if (item.name === "그리스") {
                                // 현재 페이지이므로 아무것도 하지 않음
                              } else {
                                // 다른 페이지들은 아직 구현되지 않음
                                console.log(
                                  `${item.name} 페이지는 아직 구현되지 않았습니다.`,
                                );
                              }
                            }}
                            className={`flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors group ${
                              item.name === "그리스"
                                ? "bg-primary/5 text-primary border-r-2 border-primary"
                                : ""
                            }`}
                          >
                            <span className="text-sm">
                              {item.name}
                            </span>
                            {item.name !== "그리스" ? (
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
                    <Badge variant="secondary">UTC+2</Badge>
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