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
  Heart,
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

interface AssisiPageProps {
  setCurrentPage: (page: string) => void;
}

export default function AssisiPage({ setCurrentPage }: AssisiPageProps) {
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
      value: "187",
      unit: "km²",
      description: "이탈리아 중부 우마브리아 주",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "인구",
      value: "28,000",
      unit: "명",
      description: "중세 분위기가 그대로 보존된 성지",
      color: "text-green-600",
    },
    {
      icon: Building,
      title: "설립",
      value: "로마 시대",
      unit: "",
      description: "고대 로마의 아시시움(Asisium)",
      color: "text-purple-600",
    },
    {
      icon: Church,
      title: "성인",
      value: "성 프란치스코",
      unit: "",
      description: "1182-1226, 프란치스코회 설립자",
      color: "text-orange-600",
    },
  ];

  const countryInfo = [
    {
      label: "정식 명칭",
      value: "아시시 (Assisi)",
    },
    { label: "위치", value: "이탈리아 우마브리아 주 페루자 현" },
    { label: "해발고도", value: "424m" },
    { label: "면적", value: "187 평방 KM" },
    { label: "인구", value: "28,000명" },
    { label: "주요 성인", value: "성 프란치스코, 성녀 클라라" },
    { label: "언어", value: "이탈리아어" },
    { label: "화폐단위", value: "유로 (EUR)" },
    { label: "세계문화유산", value: "2000년 지정" },
  ];

  const majorBasilicas = [
    {
      name: "성 프란치스코 대성당",
      subtitle: "프란치스코회의 모교회",
      description:
        "성 프란치스코가 묻힌 곳에 건립된 대성당으로, 상부교회와 하부교회로 나뉘어 있습니다. 13-14세기에 지오토 등 당대 최고의 화가들이 그린 프레스코화로 유명하며, 성 프란치스코의 생애를 생생하게 그려낸 벽화들을 볼 수 있습니다.",
      icon: Church,
      color: "from-amber-100 to-yellow-200",
      iconColor: "text-amber-700",
    },
    {
      name: "성녀 클라라 대성당",
      subtitle: "클라라 수녀회의 성지",
      description:
        "성녀 클라라가 묻혀 있는 성당으로, 13세기에 건립되었습니다. 성녀 클라라는 성 프란치스코의 설교를 듣고 1212년 수도생활을 시작했으며, 여성 프란치스코회인 클라라 수녀회를 설립했습니다. 성당 내부에는 성녀 클라라의 유해가 보관되어 있습니다.",
      icon: Star,
      color: "from-pink-100 to-rose-200",
      iconColor: "text-pink-700",
    },
    {
      name: "산타 마리아 마조레 성당",
      subtitle: "프란치스코가 죽음을 맞이한 성당",
      description:
        "포르치운쿨라라고도 불리는 이 작은 성당은 성 프란치스코가 하느님의 부르심을 받고 수도생활을 시작한 곳입니다. 현재는 큰 성당 안에 보호되어 있으며, 프란치스코회의 발상지로 여겨집니다.",
      icon: Heart,
      color: "from-blue-100 to-indigo-200",
      iconColor: "text-blue-700",
    },
    {
      name: "산타 키아라 성당",
      subtitle: "성녀 클라라의 생애 터전",
      description:
        "성녀 클라라가 실제로 거주하며 수도생활을 했던 곳에 세워진 성당입니다. 고딕 양식으로 건축되었으며, 장밋빛 석재로 지어져 아름다운 외관을 자랑합니다. 성녀 클라라의 유해와 유품들이 보관되어 있습니다.",
      icon: Crown,
      color: "from-purple-100 to-violet-200",
      iconColor: "text-purple-700",
    },
  ];

  const franciscoInfo = [
    {
      title: "성 프란치스코의 탄생",
      period: "1182년",
      description: "아시시의 부유한 상인 가정에서 태어나 젊은 시절에는 화려한 생활을 즐겼습니다."
    },
    {
      title: "회심과 소명",
      period: "1205년경",
      description: "산 다미아노 성당에서 십자가상의 예수님으로부터 '내 집을 고쳐라'는 말씀을 들었습니다."
    },
    {
      title: "프란치스코회 설립",
      period: "1209년",
      description: "교황 인노첸시오 3세로부터 프란치스코회 승인을 받아 수도회를 설립했습니다."
    },
    {
      title: "성흔과 선종",
      period: "1224-1226년",
      description: "라 베르나 산에서 성흔을 받고, 1226년 포르치운쿨라에서 선종했습니다."
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
                  <span>이탈리아 우마브리아 주</span>
                </Badge>
                <Badge variant="outline">성지순례</Badge>
                <Badge variant="outline">프란치스코회 발상지</Badge>
              </div>
              <div>
                <h1 className="text-4xl font-medium text-foreground mb-2">
                  아시시
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  성 프란치스코와 성녀 클라라의 고향, 가난한 이들의 성인이 태어난 평화의 도시
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-amber-500/10 rounded-full flex items-center justify-center">
                <Church className="h-12 w-12 text-amber-600" />
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
                    아시시의 기본 정보
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
                    아시시의 지리적 위치
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GoogleMap
                    center={holyPlacesLocations.assisiBasilica.center}
                    markers={holyPlacesLocations.assisiBasilica.markers}
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
                  아시시 4대 성당
                </h2>
                <p className="text-muted-foreground">
                  성 프란치스코와 성녀 클라라와 관련된 아시시의 주요 성지들을 소개합니다.
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

            {/* 성 프란치스코 특별 섹션 */}
            <section>
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                        <Heart className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          성 프란치스코 - 가난한 이들의 아버지
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          프란치스코회 창설자, 1182-1226
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
                      <div className="aspect-[4/3] bg-gradient-to-br from-amber-100 to-yellow-200 rounded-lg flex items-center justify-center">
                        <div className="text-center space-y-3">
                          <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <Heart className="h-8 w-8 text-amber-700" />
                          </div>
                          <div>
                            <p className="font-medium text-amber-900">
                              Saint Francis
                            </p>
                            <p className="text-sm text-amber-700">
                              성 프란치스코
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 설명 */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="space-y-3">
                        <p className="leading-relaxed">
                          성 프란치스코는 1182년 아시시의 부유한 직물상 가정에서 태어나, 
                          젊은 시절에는 화려한 생활을 즐겼으나 하느님의 부르심을 받고 
                          완전한 회심을 하여 극도의 가난과 겸손의 삶을 살았습니다. 
                          그는 "완전한 기쁨"의 성인으로 불리며, 자연을 사랑하고 
                          평화를 전하는 삶을 살았습니다.
                        </p>

                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                          <div className="flex items-start space-x-2">
                            <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <blockquote className="text-amber-800 italic">
                              "주님, 저를 평화의 도구로 써주소서. 
                              미움이 있는 곳에 사랑을, 다툼이 있는 곳에 용서를, 
                              분열이 있는 곳에 일치를 심게 하소서."
                            </blockquote>
                          </div>
                          <p className="text-amber-600 text-xs mt-2 text-right">
                            - 성 프란치스코의 평화 기도
                          </p>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          1224년 라 베르나 산에서 예수님의 성흔을 받은 성 프란치스코는 
                          1226년 10월 3일 아시시의 포르치운쿨라에서 "자매인 죽음"을 
                          맞이했습니다. 1228년 교황 그레고리우스 9세에 의해 시성되었습니다.
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">
                          축일
                        </span>
                        <span className="text-sm text-muted-foreground">
                          10월 4일
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 성녀 클라라 섹션 */}
            <section>
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                        <Star className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          성녀 클라라 - 맑은 빛
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          클라라 수녀회 창설자, 1194-1253
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      여성 수도회 창설자
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="leading-relaxed">
                      성녀 클라라는 1194년 아시시의 귀족 가문에서 태어나, 
                      1212년 18세의 나이에 성 프란치스코의 설교를 듣고 
                      수도생활을 결심했습니다. 그녀는 여성 최초의 프란치스코회인 
                      클라라 수녀회를 창설하여 극도의 청빈과 관상 생활을 실천했습니다.
                    </p>

                    <div className="bg-pink-50 border-l-4 border-pink-400 p-4 rounded-r-lg">
                      <div className="flex items-start space-x-2">
                        <Info className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                        <div className="text-pink-800">
                          <p className="mb-2">
                            성녀 클라라의 이름 "클라라(Clara)"는 "맑다, 밝다"는 뜻으로, 
                            그녀의 맑고 순수한 영혼을 나타냅니다. 1958년 교황 비오 12세는 
                            그녀를 텔레비전의 수호성인으로 선포했습니다.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">축일</span>
                        <span className="text-sm text-muted-foreground">8월 11일</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">시성</span>
                        <span className="text-sm text-muted-foreground">1255년</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 프란치스코의 생애 */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>성 프란치스코의 생애</span>
                  </CardTitle>
                  <CardDescription>가난한 이들의 성인이 걸어간 거룩한 여정</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {franciscoInfo.map((info, index) => (
                    <div key={index} className="border-l-4 border-amber-200 pl-4">
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

                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-amber-800 leading-relaxed">
                          성 프란치스코는 단순한 삶을 통해 복음의 진리를 실천했으며, 
                          그의 영성은 오늘날에도 전 세계 수많은 이들에게 영감을 주고 있습니다. 
                          아시시는 그의 발자취를 따라 평화와 화해의 메시지를 전하는 
                          순례지로서 중요한 역할을 하고 있습니다.
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
                                    // 현재 페이지이므로 아무것도 하지 않음
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
                                  child === "아시시" ? "bg-primary/5 text-primary border-r-2 border-primary" : ""
                                }`}
                              >
                                <span className={`text-sm ${child === "아시시" ? "" : "text-muted-foreground"}`}>{child}</span>
                                {child !== "아시시" && (
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
                      현지 ��간
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