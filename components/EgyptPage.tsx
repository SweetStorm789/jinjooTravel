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
  Pyramid,
  Sun,
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

import sinaiImage from "../images/egypt/mount-sinai-egypt.jpg";
import cairoImage from "../images/egypt/cairo-egypt.jpg";
import luxorImage from "../images/egypt/luxor-egypt.jpg";
import gizaImage from "../images/egypt/giza-egypt.jpg";
import saintCatherinesMonasteryImage from "../images/egypt/saint-catherines-monastery-egypt.jpg";



interface EgyptPageProps {
  setCurrentPage: (page: string) => void;
}

export default function EgyptPage({ setCurrentPage }: EgyptPageProps) {
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
      value: "1,001,450",
      unit: "km²",
      description: "아프리카 대륙 북동부에 위치",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "인구",
      value: "105",
      unit: "백만",
      description: "이슬람 90%, 콥트교 9%, 기타스도교 1%",
      color: "text-green-600",
    },
    {
      icon: Building,
      title: "수도",
      value: "카이로",
      unit: "",
      description: "아랍권의 중심 도시",
      color: "text-purple-600",
    },
    {
      icon: Clock,
      title: "시차",
      value: "-6/-7",
      unit: "시간",
      description: "한국보다 6-7시간 늦음 (서머타임 적용)",
      color: "text-orange-600",
    },
  ];

  const countryInfo = [
    {
      label: "정식 명칭",
      value: "이집트 아랍공화국 (جمهورية مصر العربية)",
    },
    { label: "정치 체제", value: "공화제" },
    { label: "수도", value: "카이로 (القاهرة, Cairo)" },
    { label: "면적", value: "1,001,450 평방 KM" },
    { label: "위치", value: "아프리카" },
    { label: "종교", value: "이슬람 90%, 콥트교 9%, 기타스도교 1%" },
    { label: "인종", value: "이집트인 99.6% 기타 0.4%" },
    { label: "언어", value: "아랍어" },
    { label: "화폐단위", value: "이집트파운드" },
    { label: "시차", value: "한국과의 시차는 7시간 (한국 07:00 이집트00:00), 여름에는 summer time 실시로 6시간 이집트가 느립니다." },
  ];

  const holyPlaces = [
    {
      name: "시나이산",
      subtitle: "모세가 십계명을 받은 성스러운 산",
      description:
        "시나이산은 모세가 하느님으로부터 십계명을 받은 성경의 무대로, 해발 2,285m의 시나이산 정상과 그 옆에 위치한 성녀 카타리나는 세계적으로 유명한 순례지입니다. 산 기슭에는 세계에서 가장 오래된 수도원 중 하나인 성녀 카타리나 수도원이 있습니다.",
      icon: Mountain,
      color: "from-orange-100 to-red-200",
      iconColor: "text-orange-700",
      image: sinaiImage,
    },
    {
      name: "카이로",
      subtitle: "성가족의 피난 경로",
      description:
        "카이로는 성가족이 헤롯왕의 박해를 피해 피난 왔던 곳으로, 다양한 콥트 교회와 유적들이 남아있습니다. 특히 올드 카이로(Old Cairo) 지역에는 성가족이 머물렀다고 전해지는 여러 성당들이 위치해 있습니다.",
      icon: Building,
      color: "from-yellow-100 to-amber-200",
      iconColor: "text-yellow-700",
      image: cairoImage,
    },
    {
      name: "룩소르",
      subtitle: "고대 이집트 문명의 중심지",
      description:
        "룩소르는 고대 이집트의 수도였던 테베의 현재 모습으로, 구약시대부터 이집트 문명의 중심지였습니다. 카르나크 신전과 룩소르 신전, 왕들의 계곡 등 성경 시대의 이집트 문명을 엿볼 수 있는 중요한 유적지들이 있습니다.",
      icon: Pyramid,
      color: "from-amber-100 to-orange-200",
      iconColor: "text-amber-700",
      image: luxorImage,
    },
    {
      name: "기자",
      subtitle: "피라미드와 스핑크스",
      description:
        "기자의 피라미드는 세계 7대 불가사의 중 하나로, 성경에 등장하는 이집트의 위대한 문명을 보여주는 상징적인 유적입니다. 스핑크스와 함께 고대 이집트의 신비로운 역사를 간직하고 있습니다.",
      icon: Crown,
      color: "from-yellow-100 to-yellow-200",
      iconColor: "text-yellow-700",
      image: gizaImage,
    },
  ];

  const historicalInfo = [
    {
      title: "초기 교회 시대",
      period: "1~4세기",
      description: "사도 마르코(마가)가 복음을 전하며 알렉산드리아 교회를 창립. 당시 로마 교황과 일치된 보편교회(가톨릭)의 일부였으며, 이집트는 가톨릭 신학과 수도원 운동의 중심지로 성장했습니다."
    },
    {
      title: "분열의 시대",
      period: "451년 칼케돈 공의회 이후",
      description: "신학적 논쟁(예수님의 신성과 인성)으로 인해 이집트 교회 다수가 로마와 분리. 콥트 정교회(Coptic Orthodox Church)로 독립하여 가톨릭과의 공식 관계가 단절되었습니다."
    },
    {
      title: "가톨릭의 재진입",
      period: "17~18세기",
      description: "프란치스코회, 예수회 등 서방 선교사들이 이집트에 복음을 재전파. 일부 콥트 신자들이 로마 교황과의 일치 회복을 선언했습니다."
    },
    {
      title: "콥트 가톨릭 교회 공식 설립",
      period: "19세기",
      description: "1895년, 교황 레오 13세에 의해 콥트 가톨릭 총대주교좌가 정식 설립. 전통적인 콥트 전례와 언어를 유지하면서도 로마 교황과 완전한 일치를 이루었습니다."
    }
  ];

  const catholicChurches = [
    {
      name: "콥트 가톨릭 교회",
      feature: "이집트 가톨릭의 중심. 전통적인 콥트 전례 사용"
    },
    {
      name: "라틴 가톨릭 교회", 
      feature: "주로 외국인 및 유럽계 신자 중심, 로마 전례 사용"
    },
    {
      name: "멜키트 가톨릭 교회",
      feature: "비잔틴 전례, 레반트 계열 아랍계 신자"
    },
    {
      name: "마론/아르메니아/시리아 가톨릭",
      feature: "이주민 중심 소규모 공동체"
    }
  ];

  const timeline = [
    {
      year: "1세기",
      event: "사도 마르코, 알렉산드리아에 복음 전파 – 초대교회 설립"
    },
    {
      year: "451년",
      event: "칼케돈 공의회 – 로마와 분열, 콥트 정교회 형성"
    },
    {
      year: "1741년",
      event: "첫 콥트 가톨릭 주교 임명 (로마와의 일치 시도)"
    },
    {
      year: "1895년",
      event: "콥트 가톨릭 총대주교좌 공식 승인 (교황 레오 13세)"
    },
    {
      year: "현재",
      event: "다양한 가톨릭 교파가 활동 중 – 콥트 가톨릭 중심"
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
                  <span>아프리카 북동부</span>
                </Badge>
                <Badge variant="outline">성지순례</Badge>
                <Badge variant="outline">성가족 피난지</Badge>
              </div>
              <div>
                <h1 className="text-4xl font-medium text-foreground mb-2">
                  이집트 아랍공화국
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  성가족이 피난한 땅, 모세가 십계명을 받은 시나이산과 콥트교의 발상지
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-yellow-500/10 rounded-full flex items-center justify-center">
                <Pyramid className="h-12 w-12 text-yellow-600" />
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
                    이집트 아랍공화국의 기본 정보
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
                    이집트의 지리적 위치
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GoogleMap
                    center={holyPlacesLocations.egypt.center}
                    markers={holyPlacesLocations.egypt.markers}
                    zoom={15}
                    height="400px"
                    className="w-full"
                  />
                </CardContent>
              </Card>
            </section>

            {/* 이집트 개관 정보 */}
            <section className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Pyramid className="h-5 w-5" />
                    <span>이집트 - 성경 속 피난의 땅</span>
                  </CardTitle>
                  <CardDescription>
                    구약에서 신약까지, 하느님 백성들의 보호처가 된 땅
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 성경적 의미 */}
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Cross className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800 mb-2">📖 성경 속 이집트</h4>
                        <p className="text-sm text-yellow-800 leading-relaxed">
                          이집트는 이스라엘 민족의 피난처이면서, 아기 예수께서 헤로데를 피하기 위한 피난처로 사용된 땅입니다. 
                          그리고 아브라함과 야곱의 가족이 가뭄을 피해 갔던 땅이자 예레미야가 피해 갔던 땅입니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 기후 정보 */}
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Sun className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-800 mb-2">🌤️ 기후</h4>
                          <div className="text-sm text-blue-800 space-y-2">
                            <p><strong>지중해 연안:</strong> 온화한 지중해성 기후</p>
                            <p><strong>내륙 대부분:</strong> 건조기후</p>
                            <p><strong>12월~2월:</strong> 겨울철 가끔 비</p>
                            <p><strong>3월~5월:</strong> 열풍과 모래 폭풍</p>
                            <p><strong>6월~9월:</strong> 무더위 (37~48°C)</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 여행 정보 */}
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Info className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-800 mb-2">✈️ 여행 정보</h4>
                          <div className="text-sm text-green-800 space-y-2">
                            <p><strong>화폐:</strong> 이집트 파운드, 피아스타, 밀림</p>
                            <p><strong>언어:</strong> 아랍어 (주요 기관 영어 가능)</p>
                            <p><strong>공휴일:</strong> 금요일 (안식일)</p>
                            <p><strong>휴무:</strong> 목요일 오후~금요일 일몰</p>
                          </div>
                        </div>
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
                  성경과 기독교 역사에서 중요한 이집트의 주요 성지들을 소개합니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {holyPlaces.map((place, index) => {
                  const IconComponent = place.icon;
                  return (
                    <Card key={index} className="overflow-hidden">
                      <div className={`aspect-video bg-gradient-to-br ${place.color} flex items-center justify-center relative`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        <ImageWithFallback
                        src={place.image}
                        alt={place.name}
                        className="w-full h-[240px] object-cover"
                      />
                        {/* 오버레이 텍스트 */}
                        <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-white/50 backdrop-blur-sm rounded px-2 py-1 flex justify-center items-center w-full">
                            <span className="text-sm font-medium text-gray-800">
                              {place.name} - {place.subtitle}
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

            {/* 시나이산 특별 섹션 */}
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
                          시나이산 - 십계명을 받은 성산
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          모세가 하느님으로부터 십계명을 받은 장소
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      해발 2,285m
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 이미지 영역 */}
                    <div className="lg:col-span-1">
                      <div className="space-y-4">
                        <div className="aspect-[4/3] bg-gradient-to-br from-orange-100 to-red-200 rounded-lg overflow-hidden">
                          <ImageWithFallback
                            src={saintCatherinesMonasteryImage}
                            alt="성녀 카타리나 수도원"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-orange-900">
                            Mount Sinai
                          </p>
                          <p className="text-sm text-orange-700">
                            성녀 카타리나 수도원
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 설명 */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="space-y-3">
                        <p className="leading-relaxed">
                          시나이산은 이집트 시나이 반도에 위치한 해발 2,285m의 산으로, 
                          구약성경에서 모세가 하느님으로부터 십계명을 받은 성스러운 장소입니다. 
                          산 기슭에는 세계에서 가장 오래된 수도원 중 하나인 
                          성녀 카타리나 수도원이 위치해 있습니다.
                        </p>

                        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                          <div className="flex items-start space-x-2">
                            <Info className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                            <blockquote className="text-orange-800 italic">
                              "여호와께서 시내산 위에 강림하시고 모세를 산 꼭대기로 부르시니 
                              모세가 올라가매 여호와께서 모세에게 이르시되"
                            </blockquote>
                          </div>
                          <p className="text-orange-600 text-xs mt-2 text-right">
                            - 출애굽기 19:20
                          </p>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          성녀 카타리나 수도원은 6세기에 건립되어 현재까지 
                          지속적으로 운영되고 있는 세계에서 가장 오래된 
                          기독교 수도원 중 하나입니다. 수도원 내에는 
                          모세의 불타는 떨기나무로 여겨지는 나무가 있습니다.
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">
                          해발 고도
                        </span>
                        <span className="text-sm text-muted-foreground">
                          2,285m
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 가톨릭 역사 */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Cross className="h-5 w-5" />
                    <span>✝️ 이집트의 가톨릭 역사</span>
                  </CardTitle>
                  <CardDescription>"사도 마르코에서 콥트 가톨릭 교회까지"</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 개요 */}
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800 mb-2">🏛 고대에서 현대까지, 이집트 속 가톨릭의 발자취</h4>
                        <p className="text-sm text-yellow-800 leading-relaxed mb-3">
                          이집트는 초대교회 시대부터 중요한 가톨릭 중심지 중 하나였으며, 오늘날에도 로마 가톨릭과 일치된 전통을 이어가는 콥트 가톨릭 교회를 중심으로 그 역사적 신앙을 간직하고 있습니다.
                        </p>
                        <p className="text-sm text-yellow-700 leading-relaxed">
                          이집트의 가톨릭 역사는 초기 보편교회의 일부로 시작되었다가, 수세기 간 단절을 거쳐, 19세기 이후 다시 교황과의 일치를 회복한 여정으로 설명됩니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 역사 흐름 */}
                  <div>
                    <h3 className="font-medium mb-4">📜 역사 흐름 요약</h3>
                    {historicalInfo.map((info, index) => (
                      <div key={index} className="border-l-4 border-yellow-200 pl-4 mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{index + 1}. {info.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {info.period}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {info.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* 현재 이집트의 가톨릭 교회 */}
                  <div>
                    <h3 className="font-medium mb-4">⛪ 현재 이집트의 가톨릭 교회</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      오늘날 이집트에는 다양한 가톨릭 교파가 활동 중이며, 모두 로마 교황청과의 완전한 일치 상태에 있습니다.
                    </p>
                    
                    <div className="space-y-3">
                      {catholicChurches.map((church, index) => (
                        <div key={index} className="flex justify-between items-start p-3 bg-muted rounded-lg">
                          <span className="font-medium text-sm">{church.name}</span>
                          <span className="text-sm text-muted-foreground text-right flex-1 ml-4">
                            {church.feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <p className="text-xs text-muted-foreground mt-3">
                      전체 이집트 인구의 약 0.3% 내외가 가톨릭 신자이며, 대다수는 콥트 가톨릭 교회에 소속되어 있습니다.
                    </p>
                  </div>

                  {/* 타임라인 */}
                  <div>
                    <h3 className="font-medium mb-4">📅 이집트 가톨릭 역사 타임라인</h3>
                    <div className="space-y-3">
                      {timeline.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Badge variant="secondary" className="text-xs min-w-fit">
                            {item.year}
                          </Badge>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.event}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 마무리 메시지 */}
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Cross className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800 mb-2">🙏 이집트에서 만나는 가톨릭의 유산</h4>
                        <p className="text-sm text-blue-800 leading-relaxed mb-2">
                          이집트는 가톨릭 신앙이 단절과 회복을 거쳐 살아있는 형태로 유지되고 있는 중동 지역의 대표적 신앙의 터전입니다.
                        </p>
                        <p className="text-sm text-blue-700 leading-relaxed">
                          콥트 전통과 로마 가톨릭의 일치가 공존하는 이 땅에서, 초대교회의 숨결을 직접 느껴보실 수 있습니다.
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
                                // 현재 페이지이므로 아무것도 하지 않음
                              } else if (item.name === "튀르키예") {
                                setCurrentPage("turkiye");
                              } else if (item.name === "프랑스") {
                                setCurrentPage("france");
                              } else {
                                // 다른 페이지들은 아직 구현되지 않음
                                // console.log(`${item.name} 페이지는 아직 구현되지 않았습니다.`);
                              }
                            }}
                            className={`flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors group ${
                              item.name === "이집트" ? "bg-primary/5 text-primary border-r-2 border-primary" : ""
                            }`}
                          >
                            <span className="text-sm">{item.name}</span>
                            {item.name !== "이집트" ? (
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
                    <Badge variant="secondary">UTC+2</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">
                      전압
                    </span>
                    <span className="text-sm">220V</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">
                      화폐
                    </span>
                    <span className="text-sm">이집트파운드(EGP)</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">
                      기후
                    </span>
                    <span className="text-sm">사막성 기후</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">
                      베스트 시즌
                    </span>
                    <span className="text-sm">11-3월</span>
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