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
  Zap,
  Wine,
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


import PozzoDiSanPatrizioImage from "../images/italy/orvieto/PozzoDiSanPatrizio.jpg";     //성 파트리치오 우물
import CappellaDelCorporaleImage from "../images/italy/orvieto/CappellaDelCorporale.jpg"; //성체기적 경당
import CappellaDiSanBrizioImage from "../images/italy/orvieto/CappellaDiSanBrizio.jpg"; //성 브리조 경당
import DuomoDiOrvietoImage from "../images/italy/orvieto/DuomoDiOrvieto.jpg"; //오르비에토 대성당
import miracleOfBolsenaImage from "../images/italy/orvieto/MiracleOfBolsena.jpg"; //볼세나 성체기적

interface OrviettooPageProps {
  setCurrentPage: (page: string) => void;
}

export default function OrviettooPage({ setCurrentPage }: OrviettooPageProps) {
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
      name: "오르비에토 대성당 (Duomo di Orvieto / Cathedral of Santa Maria Assunta)",
      subtitle: "고딕 건축의 걸작, 성체 기적의 중심 성당",
      description:
        "13세기에 건축된 오르비에토 대성당은 이탈리아 고딕 양식의 대표작이다. 황금 모자이크와 조각으로 장식된 정면이 유명하며, 1263년 볼세나 성체 기적과 연결되어 가톨릭 순례의 핵심 성지가 되었다. 대성당 내부에는 성혈 제대보가 보관된 성체 기적 경당과 루카 시뇨렐리의 최후의 심판 프레스코로 유명한 산 브리치오 경당이 있다.",
      icon: Church,
      color: "from-blue-100 to-indigo-200",
      iconColor: "text-blue-700",
      image: DuomoDiOrvietoImage,
    },
    {
      name: "성체 기적 경당 (Cappella del Corporale / Chapel of the Corporal)",
      subtitle: "볼세나 성체 기적 성혈 제대보가 안치된 경당",
      description:
        "오르비에토 대성당 안에 위치한 성체 기적 경당은 1350년대에 지어졌다. 이곳에는 1263년 볼세나에서 성체에서 흘러나온 피가 묻은 제대보(Corporal of Bolsena)가 보관되어 있다. 정교한 제대와 중세 벽화로 꾸며져 있으며, 순례자들이 성체 신비를 깊이 묵상할 수 있는 장소이다.",
      icon: Star,
      color: "from-amber-100 to-yellow-200",
      iconColor: "text-amber-700",
      image: CappellaDelCorporaleImage,
    },
    {
      name: "최후의 심판 프레스코 (Cappella di San Brizio / Chapel of San Brizio – Last Judgement Frescoes)",
      subtitle: "루카 시뇨렐리의 최후의 심판 걸작 프레스코",
      description:
        "대성당 내부 산 브리치오 경당은 15세기 후반 루카 시뇨렐리가 그린 프레스코화로 유명하다. 죽은 자의 부활, 천국과 지옥, 최후의 심판 장면이 생생하게 묘사되어 있으며, 미켈란젤로의 시스티나 성당 최후의 심판에 큰 영향을 끼쳤다. 예술성과 신학적 깊이를 동시에 담은 르네상스의 걸작이다.",
      icon: Crown,
      color: "from-purple-100 to-violet-200",
      iconColor: "text-purple-700",
      image: CappellaDiSanBrizioImage,
    },
    {
      name: "포조 디 산 파트리치오 (Pozzo di San Patrizio / St. Patrick’s Well)",
      subtitle: "르네상스 토목의 경이, 이중 나선형 우물",
      description:
        "16세기 교황 클레멘스 7세가 오르비에토에 피신했을 때 도시의 물 부족 문제를 해결하기 위해 건설된 깊이 약 62m의 거대한 우물이다. 이중 나선형 계단 구조로 설계되어 당나귀가 물을 나르면서 서로 겹치지 않고 오르내릴 수 있었다. 신앙적 상징성과 함께 르네상스 시대 공학의 경이로 꼽히는 명소이다.",
      icon: Building,
      color: "from-green-100 to-emerald-200",
      iconColor: "text-green-700",
      image: PozzoDiSanPatrizioImage,
    },
  ];

  const miracleHistory = [
    {
      title: "볼세나의 성체기적",
      period: "1263년",
      description: "보헤미아 출신 베드로 신부가 볼세나에서 미사 중 성체에서 피가 흘러나와 성체포에 스며든 기적이 일어났습니다."
    },
    {
      title: "교황 우르바노 4세의 조사",
      period: "1263년",
      description: "교황 우르바노 4세가 직접 조사하여 기적임을 확인하고 성체포를 오르비에토로 옮겨왔습니다."
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
                  <GoogleMap
                    center={holyPlacesLocations.orvietto.center}
                    markers={holyPlacesLocations.orvietto.markers}
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
                  성체기적과 관련된 오르비에토의 주요 성지들을 소개합니다.
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
                      <div className="space-y-4">
                        <div className="aspect-[2/3] bg-gradient-to-br from-amber-100 to-yellow-200 rounded-lg overflow-hidden">
                        <ImageWithFallback
                        src={miracleOfBolsenaImage}
                        alt="볼세나 성체 기적"
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
                          The Eucharistic Miracle of Bolsena, 1263
                          </p>
                          <p className="text-sm text-amber-700">
                          볼세나 성체 기적
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 설명 */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="space-y-3">
                        <p className="leading-relaxed">
                          1263년 보헤미아 출신 베드로 신부가 볼세나의 성 크리스티나 성당에서 
                          미사를 드리던 중 성체가 피로 변하는 기적이 일어났습니다. 
                          성체에서 흘러나온 피가 성체포에 스며들었고, 이를 목격한 
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
                          제정했으며, 성체포는 오르비에토로 옮겨져 현재까지 보관되고 있습니다. 
                          오르비에토 대성당은 이 기적을 기념하기 위해 건축되었습니다.
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">
                          축일
                        </span>
                        <span className="text-sm text-muted-foreground">
                          지극히 거룩하신 그리스도의 성체성혈 대축일
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
                                    setCurrentPage("loreto");
                                  } else if (child === "시에나") {
                                    setCurrentPage("siena");
                                  } else if (child === "오르비에또") {
                                    // 현재 페이지이므로 아무것도 하지 않음
                                  } else if (child === "란치아노") {
                                    setCurrentPage("lanciano");
                                  } else {
                                    // console.log(`${child} 페이지는 아직 구현되지 않았습니다.`);
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
                    <p className="font-medium text-gray-700 mb-1">📷 포조 디 산 파트리치오</p>
                    <p>
                      사진: Fabio Poggi, 포조 디 산 파트리치오 (Orvieto, Italy),{" "}
                      <a 
                        href="https://creativecommons.org/licenses/by/3.0/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 underline hover:text-blue-800 font-medium"
                      >
                        CC BY 3.0
                      </a>, Wikimedia Commons 제공
                    </p>
                    <p className="text-gray-500 mt-1">
                      Image: Fabio Poggi, Pozzo di San Patrizio (Orvieto, Italy),{" "}
                      <a 
                        href="https://creativecommons.org/licenses/by/3.0/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        CC BY 3.0
                      </a>, via Wikimedia Commons
                    </p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-md border-l-2 border-green-400">
                    <p className="font-medium text-gray-700 mb-1">📷 성혈 제대보</p>
                    <p>
                      사진: 성혈 제대보 (Orvieto, Italy), Public Domain, Wikimedia Commons 제공
                    </p>
                    <p className="text-gray-500 mt-1">
                      Image: Corporal of Bolsena (Orvieto, Italy), Public Domain, via Wikimedia Commons
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