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
  Crown,
  Cross,
  Star,
  Heart,
  Droplets,
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
import { useState, useEffect } from "react";
import GoogleMap from "./shared/GoogleMap";
import { getTimeDifferenceFromKorea } from "../utils/timezone";
import { holyPlacesLocations } from "./constants/holyPlacesLocations";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import ParisChapelOfOurLadyOfTheMiraculousMedalImage from "../images/france/ParisChapelOfOurLadyOfTheMiraculousMedal.jpg";
import LisieuxBasilicaOfSaintThérèseImage from "../images/france/LisieuxBasilicaOfSaintThérèse.jpg";
import LourdesImage from "../images/france/Lourdes.jpg";
import LourdesSanctuaryOfOurLadyOfLourdesImage from "../images/france/LourdesSanctuaryOfOurLadyOfLourdes.jpg";
import ParisBasiliqueDuSacréCœurDeMontmartreImage from "../images/france/ParisBasiliqueDuSacréCœurDeMontmartre.jpg";

interface FrancePageProps {
  setCurrentPage: (page: string) => void;
}

export default function FrancePage({ setCurrentPage }: FrancePageProps) {
  const [isItalyExpanded, setIsItalyExpanded] = useState(true);
  const [isCopyrightExpanded, setIsCopyrightExpanded] = useState(false);
  const [timeDifference, setTimeDifference] = useState(getTimeDifferenceFromKorea('france'));
  
  // 실시간 시차 업데이트
  useEffect(() => {
    const updateTimeDifference = () => {
      setTimeDifference(getTimeDifferenceFromKorea('france'));
    };

    // 초기 업데이트
    updateTimeDifference();

    // 1분마다 업데이트
    const interval = setInterval(updateTimeDifference, 60000);

    return () => clearInterval(interval);
  }, []);

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
      value: "674,843",
      unit: "km²",
      description: "서유럽 최대 국가",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "인구",
      value: "6,800",
      unit: "만명",
      description: "가톨릭 83-88%, 이슬람 5-10%",
      color: "text-green-600",
    },
    {
      icon: Building,
      title: "수도",
      value: "파리",
      unit: "",
      description: "빛의 도시, 문화와 예술의 중심",
      color: "text-purple-600",
    },
    {
      icon: Clock,
      title: "시차(현재)",
      value: `${timeDifference.rawHours}시간`,
      unit: `(${timeDifference.isDST ? '서머타임' : '표준시'})`,
      description: timeDifference.isDST 
        ? `한국보다 ${Math.abs(timeDifference.rawHours)}시간 늦음 (표준시는 -8시간)`
        : `한국보다 ${Math.abs(timeDifference.rawHours)}시간 늦음 (서머타임은 -7시간)`,
      color: "text-orange-600",
    },
  ];

  const countryInfo = [
    {
      label: "정식 명칭",
      value: "프랑스 공화국 (République française, French Republic)",
    },
    { label: "정치 체제", value: "공화제" },
    { label: "수도", value: "파리 (Paris)" },
    { label: "위치", value: "서유럽" },
    { label: "면적", value: "674,843 평방 KM" },
    { 
      label: "종교", 
      value: "로마가톨릭 83-88%, 이슬람 5-10%, 개신교 2%, 유대교 1%, 기타 4%" 
    },
    { label: "언어", value: "프랑스어" },
    { label: "화폐단위", value: "유로 (Euro)" },
    { 
      label: "시차", 
      value: "한국보다 시차는 8시간 (한국 08:00 대 프랑스 00:00), 여름에는 summer time 실시로 7시간 프랑스가 느리다." 
    },
  ];

  const holyPlaces = [
    {
      name: "루르드 (Lourdes – Sanctuary of Our Lady of Lourdes)",
      subtitle: "성모 발현과 치유의 샘으로 유명한 세계 3대 성모 성지",
      description:
        "1858년, 어린 소녀 베르나데트 수비루에게 성모 마리아가 18차례 발현한 루르드는 세계 가톨릭 신자들의 대표적인 순례지입니다. 성모님의 인도로 솟은 ‘치유의 샘물’과 루르드 대성당, 동굴 성당(Grotto)은 병자와 신자들이 은총과 회복을 체험하는 장소로 널리 알려져 있습니다.",
      icon: Crown, // 치유와 은총 상징
      color: "from-blue-100 to-sky-200",
      iconColor: "text-blue-700",
      image: LourdesImage,
    },
    {
      name: "리지외 (Lisieux – Basilica of Saint Thérèse)",
      subtitle: "‘작은 꽃’ 성녀 데레사의 고향",
      description:
        "성녀 데레사(어린 예수의 데레사)는 단순한 사랑과 신뢰의 영성으로 전 세계 신자들에게 깊은 감동을 준 인물입니다. 그녀의 유해가 모셔진 리지외 대성당은 ‘작은 일 속의 위대한 사랑’이라는 메시지를 되새기며 신앙을 새롭게 하는 장소로 사랑받고 있습니다.",
      icon: Building,
      color: "from-pink-100 to-rose-200",
      iconColor: "text-rose-700",
      image: LisieuxBasilicaOfSaintThérèseImage,
    },
    {
      name: "파리 기적의 메달 경당 (Paris – Chapel of Our Lady of the Miraculous Medal)",
      subtitle: "성모 발현과 ‘기적의 패’의 기원지",
      description:
        "1830년, 성녀 카타리나 라부레에게 성모 마리아가 발현하여 ‘기적의 패’를 전하신 장소입니다. 단순한 경당이지만, 전 세계 수많은 신자들이 성모의 보호와 은총을 청하러 방문하는 깊은 신심의 중심지로 자리 잡았습니다. 지금도 매일 미사와 기도가 이어지고 있습니다.",
      icon: Star,
      color: "from-amber-100 to-yellow-200",
      iconColor: "text-amber-700",
      image: ParisChapelOfOurLadyOfTheMiraculousMedalImage,
    },
    {
      name: "몽마르트 성심대성당 (Paris – Basilique du Sacré-Cœur de Montmartre)",
      subtitle: "예수 성심 신심의 중심지",
      description:
        "파리의 가장 높은 언덕 몽마르트에 자리한 성심대성당은 프랑스가 회개와 속죄의 표징으로 세운 대성전입니다. 19세기 말부터 지금까지 24시간 끊임없이 성체조배가 이어지고 있으며, 하느님의 자비와 사랑을 묵상하는 전 세계 신자들의 기도처로 사랑받고 있습니다.",
      icon: Cross,
      color: "from-red-100 to-rose-200",
      iconColor: "text-red-700",
      image: ParisBasiliqueDuSacréCœurDeMontmartreImage,
    },
  ];

  const historicalInfo = [
    {
      title: "갈리아 시대와 가톨릭 전래",
      period: "1-5세기",
      description: "로마의 갈리아 지역에 가톨릭이 전래되어 리용, 투르 등에서 초기 교회가 발전했습니다."
    },
    {
      title: "프랑크 왕국과 가톨릭화",
      period: "5-9세기",
      description: "클로비스 왕의 개종으로 프랑크족이 가톨릭화되었고, 샤를마뉴 대제 시대에 교회와 국가가 밀접해졌습니다."
    },
    {
      title: "아비뇽 교황청 시대",
      period: "1309-1377년",
      description: "교황청이 아비뇽에 머물렀던 시대로, 프랑스가 서방 가톨릭 세계의 중심 역할을 했습니다."
    },
    {
      title: "성모 발현과 현대 순례",
      period: "19-20세기",
      description: "루르드의 성모 발현(1858)과 성녀 테레사(1873-1897) 등으로 현대적 순례 문화가 꽃피웠습니다."
    }
  ];

  const frenchSaints = [
    {
      name: "성녀 테레사 (소화 데레사)",
      period: "1873-1897",
      description: "리지외 출신의 가르멜 수녀로, '작은 길'의 영성으로 유명하며 교회박사이자 선교의 수호성인입니다."
    },
    {
      name: "성녀 베르나데트",
      period: "1844-1879",
      description: "루르드에서 성모 마리아의 발현을 목격한 성녀로, 무염시태의 성모님을 세상에 알렸습니다."
    },
    {
      name: "성 루이 9세",
      period: "1214-1270",
      description: "프랑스 왕이자 십자군 원정을 이끈 성왕으로, 정의와 자비로 통치한 모범적인 가톨릭 군주입니다."
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
                  <span>서유럽</span>
                </Badge>
                <Badge variant="outline">성지순례</Badge>
                <Badge variant="outline">성모 발현지</Badge>
              </div>
              <div>
                <h1 className="text-4xl font-medium text-foreground mb-2">
                  프랑스 공화국
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  루르드 성모 발현지와 성녀 테레사의 고향, 교회의 맏딸이라 불리는 나라
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Droplets className="h-12 w-12 text-blue-600" />
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
                    프랑스 공화국의 기본 정보
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
                    프랑스의 지리적 위치
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GoogleMap
                    center={holyPlacesLocations.france.center}
                    markers={holyPlacesLocations.france.markers}
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
                  성모 발현지 루르드를 비롯해 프랑스의 주요 가톨릭 성지들을 소개합니다.
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

            {/* 루르드 특별 섹션 */}
            <section>
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Droplets className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          루르드 - 기적의 샘물
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          성모 마리아의 발현지
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      세계적 순례지
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 이미지 영역 */}
                    <div className="lg:col-span-1">
                      <div className="space-y-4">
                        <div className="bg-gradient-to-br from-amber-100 to-yellow-200 rounded-lg overflow-hidden">
                        <ImageWithFallback
                        src={LourdesSanctuaryOfOurLadyOfLourdesImage}
                        alt="무염시태의 성모님"
                        className="w-full h-full object-cover"
                      />
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-amber-900">
                            Lourdes Sanctuary of Our Lady of Lourdes
                          </p>
                          <p className="text-sm text-amber-700">
                            무염시태의 성모님
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 설명 */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="space-y-3">
                        <p className="leading-relaxed">
                          1858년 2월 11일부터 7월 16일까지 총 18회에 걸쳐 
                          14세 소녀 베르나데트 수비루에게 성모 마리아가 발현한 성지입니다. 
                          성모님은 스스로를 "무염시태"라고 소개하셨으며, 
                          기적의 샘물이 솟아나게 하셨습니다.
                        </p>

                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                          <div className="flex items-start space-x-2">
                            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <blockquote className="text-blue-800 italic">
                              "나는 무염시태이다 (Que soy era Immaculada Concepciou)"
                            </blockquote>
                          </div>
                          <p className="text-blue-600 text-xs mt-2 text-right">
                            - 성모 마리아가 베르나데트에게 하신 말씀
                          </p>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          매년 전 세계에서 약 600만 명의 순례자가 찾는 세계 최대의 
                          가톨릭 순례지 중 하나입니다. 교회가 공식 인정한 기적적 치유가 
                          70여 건에 달하며, 수많은 은혜와 치유의 체험이 보고되고 있습니다.
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">
                          연간 순례자 수
                        </span>
                        <span className="text-sm text-muted-foreground">
                          약 600만명
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 프랑스 성인들 */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5" />
                    <span>프랑스의 주요 성인들</span>
                  </CardTitle>
                  <CardDescription>교회의 맏딸 프랑스가 배출한 위대한 성인들</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {frenchSaints.map((saint, index) => (
                    <div key={index} className="border-l-4 border-blue-200 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{saint.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {saint.period}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {saint.description}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* 프랑스의 가톨릭 역사 */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Cross className="h-5 w-5" />
                    <span>프랑스의 가톨릭 역사</span>
                  </CardTitle>
                  <CardDescription>갈리아 시대부터 현대까지</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {historicalInfo.map((info, index) => (
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
                          프랑스는 "교회의 맏딸(Fille aînée de l'Église)"이라 불리며, 
                          가톨릭 신앙의 수호와 전파에 큰 역할을 해왔습니다. 
                          루르드의 성모 발현과 성녀 테레사 등을 통해 현대 교회에도 
                          지속적인 영향을 미치고 있는 중요한 가톨릭 국가입니다.
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
                                // 현재 페이지이므로 아무것도 하지 않음
                              } else {
                                // console.log(`${item.name} 페이지는 아직 구현되지 않았습니다.`);
                              }
                            }}
                            className={`flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors group ${
                              item.name === "프랑스" ? "bg-primary/5 text-primary border-r-2 border-primary" : ""
                            }`}
                          >
                            <span className="text-sm">{item.name}</span>
                            {item.name !== "프랑스" ? (
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
                    <span className="text-sm">대륙성/지중해성</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">
                      베스트 시즌
                    </span>
                    <span className="text-sm">5-9월</span>
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
                    <p className="font-medium text-gray-700 mb-1">📷 리지외 대성당</p>
                    <p>
                      사진: Raimond Spekking, 리지외 성녀 데레사 대성당 (Basilique Sainte-Thérèse de Lisieux, France),{" "}
                      <a
                        href="https://creativecommons.org/licenses/by-sa/4.0/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800 font-medium"
                      >
                        CC BY-SA 4.0
                      </a>, Wikimedia Commons 제공
                    </p>
                    <p className="text-gray-500 mt-1">
                      Image: Raimond Spekking, Basilique Sainte-Thérèse de Lisieux (France),{" "}
                      <a
                        href="https://creativecommons.org/licenses/by-sa/4.0/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800 font-medium"
                      >
                        CC BY-SA 4.0
                      </a>, via Wikimedia Commons (wikidata:Q108103612)
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