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
  BookOpen,
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

import basilicaDiSanDomenicoImage from "../images/italy/siena/BasilicaDiSanDomenico.jpg";
import duomoDiSienaImage from "../images/italy/siena/DuomoDiSiena.jpg";
import piazzaDelCampoImage from "../images/italy/siena/piazzaDelCampo.jpg";
import santuarioDiSantaCaterinaImage from "../images/italy/siena/SantuarioDiSantaCaterina.jpg";

interface SienaPageProps {
  setCurrentPage: (page: string) => void;
}

export default function SienaPage({ setCurrentPage }: SienaPageProps) {
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
      value: "118",
      unit: "km²",
      description: "토스카나 지역의 중세 도시",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "인구",
      value: "54,000",
      unit: "명",
      description: "시에나 대학으로 유명한 도시",
      color: "text-green-600",
    },
    {
      icon: Star,
      title: "성녀 카타리나",
      value: "1347-1380",
      unit: "",
      description: "교회박사이자 이탈리아 수호성인",
      color: "text-purple-600",
    },
    {
      icon: Crown,
      title: "세계문화유산",
      value: "1995년",
      unit: "",
      description: "유네스코 세계문화유산 등재",
      color: "text-orange-600",
    },
  ];

  const countryInfo = [
    {
      label: "정식 명칭",
      value: "시에나 (Siena)",
    },
    { label: "위치", value: "이탈리아 토스카나 주" },
    { label: "해발고도", value: "322m" },
    { label: "면적", value: "118 평방 KM" },
    { label: "인구", value: "54,000명" },
    { label: "주보성인", value: "성녀 카타리나" },
    { label: "언어", value: "이탈리아어" },
    { label: "화폐단위", value: "유로 (EUR)" },
    { label: "성녀 카타리나 시성", value: "1461년" },
  ];

  const holyPlaces = [
    {
      name: "성녀 카타리나의 집 (Santuario di Santa Caterina)",
      subtitle: "성녀의 탄생과 신앙의 발자취",
      description:
        "1347년에 성녀 카타리나가 태어난 집이다. 현재는 성지로 꾸며져 있으며, 어린 시절 기도와 고행을 했던 방과 도미니코 제3회 활동 공간을 둘러볼 수 있다. 성녀의 영성을 가까이 느낄 수 있는 장소이다.",
      icon: Home,
      color: "from-amber-100 to-yellow-200",
      iconColor: "text-amber-700",
      image: santuarioDiSantaCaterinaImage,
    },
    {
      name: "성 도미니코 성당 (Basilica di San Domenico)",
      subtitle: "성녀 카타리나 성골이 안치된 성당",
      description:
        "13세기에 지어진 고딕 양식 성당이다. 성녀 카타리나가 환시를 보고 기도했던 장소이며, 성녀의 머리 성골이 안치되어 있다. 소도 디 조반니가 그린 성녀의 초상화도 함께 볼 수 있다.",
      icon: Church,
      color: "from-blue-100 to-indigo-200",
      iconColor: "text-blue-700",
      image: basilicaDiSanDomenicoImage,
    },
    {
      name: "시에나 대성당 (Duomo di Siena, Cattedrale di Santa Maria Assunta)",
      subtitle: "이탈리아 고딕 건축의 보석",
      description:
        "12~14세기에 완공된 대성당이다. 대리석 모자이크 바닥, 피콜로미니 도서관, 미켈란젤로와 도나텔로의 작품들이 장식되어 있다. 성녀 카타리나가 자주 기도하던 장소로도 알려져 있다.",
      icon: Crown,
      color: "from-purple-100 to-violet-200",
      iconColor: "text-purple-700",
      image: duomoDiSienaImage,
    },
    {
      name: "시에나 캄포 광장 (Piazza del Campo, 부속 성당 포함)",
      subtitle: "시에나의 심장, 공동체의 상징",
      description:
        "부채꼴 모양의 광장으로, 시에나 시민들의 신앙과 삶의 중심이었다. 시청사와 망루가 둘러싸고 있으며, 매년 팔리오 축제가 열려 도시의 전통과 공동체 정신을 보여준다.",
      icon: Building,
      color: "from-green-100 to-emerald-200",
      iconColor: "text-green-700",
      image: piazzaDelCampoImage,
    },
  ];

  const caterinaInfo = [
    {
      title: "출생과 어린 시절",
      period: "1347년 3월 25일",
      description: "시에나의 염색업자 야코포 베닌카사의 25명 자녀 중 막내딸로 태어났습니다. 6세에 그리스도와 성인들에 대한 신비한 환시를 체험했습니다."
    },
    {
      title: "도미니코 제3회 입회",
      period: "1363년 (16세)",
      description: "부모의 결혼 강요를 거부하고 도미니코 제3회에 입회했습니다. 이때부터 그리스도, 마리아, 성인들에 대한 환시가 더욱 잦아졌습니다."
    },
    {
      title: "병자 돌봄과 영적 활동",
      period: "1360년대-1370년대",
      description: "병원에서 환자들을 돌보는 일에 전념했으며, 특히 나병환자와 같은 절망적인 병을 앓는 환자들을 간호했습니다. 페스트로 황량해진 시에나에서 주민들을 돌보았습니다."
    },
    {
      title: "교회 개혁과 아비뇽 유수",
      period: "1370년대",
      description: "교황 그레고리우스 11세에게 아비뇽에서 로마로 돌아올 것을 간청하여 아비뇽 유수를 끝내는 데 기여했습니다. 1375년 피사에서 오상 성흔을 받았습니다."
    },
    {
      title: "교회 분열과 통합",
      period: "1378-1380년",
      description: "교회 분열 시기 우르바누스 6세 교황을 지지하여 교회 통합에 기여했습니다. 『대화』라는 영성서와 400여 통의 서한을 남겼습니다."
    },
    {
      title: "선종과 시성",
      period: "1380년 선종, 1461년 시성",
      description: "33세의 나이로 로마에서 선종하였고, 1461년 시성되어 1970년 교회박사로 선포되었습니다. 1999년 유럽의 공동 수호성인으로 선포되었습니다."
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
                  <span>이탈리아 토스카나 주</span>
                </Badge>
                <Badge variant="outline">성지순례</Badge>
                <Badge variant="outline">성녀 카타리나</Badge>
              </div>
              <div>
                <h1 className="text-4xl font-medium text-foreground mb-2">
                  시에나
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  성녀 카타리나의 고향, 중세의 아름다움이 살아 숨쉬는 토스카나의 보석
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-red-600" />
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
                    시에나의 기본 정보
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
                    시에나의 지리적 위치
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GoogleMap
                    center={holyPlacesLocations.siena.center}
                    markers={holyPlacesLocations.siena.markers}
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
                  성녀 카타리나와 관련된 시에나의 주요 성지들을 소개합니다.
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

            {/* 성녀 카타리나 특별 섹션 */}
            <section>
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          성녀 카타리나 - 교회의 어머니
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          카타리나 베닌카사, 1347-1380
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
                      <div className="aspect-[4/3] bg-gradient-to-br from-red-100 to-pink-200 rounded-lg flex items-center justify-center">
                        <div className="text-center space-y-3">
                          <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <BookOpen className="h-8 w-8 text-red-700" />
                          </div>
                          <div>
                            <p className="font-medium text-red-900">
                              Santa Caterina
                            </p>
                            <p className="text-sm text-red-700">
                              성녀 카타리나
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 설명 */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="space-y-3">
                        <p className="leading-relaxed">
                          성녀 카타리나(1347-1380)는 시에나의 염색업자 야코포 베닌카사의 
                          25명 자녀 중 막내딸로 태어났습니다. 6세에 신비한 체험을 하며 
                          그리스도와 성인들에 대한 환시를 받았고, 16세에 도미니코 제3회에 
                          입회했습니다. 교황 그레고리우스 11세에게 아비뇽에서 로마로 
                          돌아올 것을 간청하여 아비뇽 유수를 끝내는 데 기여했으며, 
                          1970년 여성 최초로 교회박사로 선포되었습니다.
                        </p>

                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                          <div className="flex items-start space-x-2">
                            <Info className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <blockquote className="text-red-800 italic">
                              "불을 원한다면 불 속으로 들어가야 합니다. 
                              그리스도를 원한다면 십자가 위로 올라가야 합니다."
                            </blockquote>
                          </div>
                          <p className="text-red-600 text-xs mt-2 text-right">
                            - 성녀 카타리나
                          </p>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          성녀 카타리나는 『대화』라는 영성서와 400여 통의 서한을 남겨 
                          후세에 큰 영향을 미쳤습니다. 1375년 피사에서 오상 성흔을 받았으며, 
                          교회 분열 시기에는 우르바누스 6세 교황을 지지하여 교회 통합에 
                          기여했습니다. 그녀는 이탈리아와 유럽의 수호성인이며, 1999년 교황 
                          요한 바오로 2세에 의해 유럽의 공동 수호성인으로 선포되었습니다.
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">
                          축일
                        </span>
                        <span className="text-sm text-muted-foreground">
                          4월 29일
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 성녀 카타리나의 생애 */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>성녀 카타리나의 생애</span>
                  </CardTitle>
                  <CardDescription>교회의 어머니가 걸어간 거룩한 여정</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {caterinaInfo.map((info, index) => (
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
                          성녀 카타리나는 짧은 생애(33년)에도 불구하고 교회사에 
                          큰 족적을 남겼습니다. 그녀의 영성과 교회에 대한 사랑, 
                          그리고 교회 개혁을 위한 열정은 오늘날에도 
                          많은 이들에게 영감을 주고 있습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 시에나의 성체기적 */}
            <section>
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                        <Star className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          시에나의 성체기적
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          1730년부터 지속되는 기적적 성체 보존
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      기적적 사건
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                      <div className="flex items-start space-x-2">
                        <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-amber-800 mb-2">1730년 성체 도난 사건</h4>
                          <p className="text-sm text-amber-700 leading-relaxed">
                            1730년 8월 15일 성모승천대축일에 성 프란치스코 성당에서 348개의 성체가 
                            보관되어 있던 성합이 도난을 당했습니다. 후에 이 성체가 모셔진 성합은 
                            산타 마리아 성당의 헌금함에서 발견되었습니다.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                      <div className="flex items-start space-x-2">
                        <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-amber-800 mb-2">기적적 보존</h4>
                          <p className="text-sm text-amber-700 leading-relaxed">
                            성체 모독을 방지하기 위해 자연 부패되도록 되찾은 이 성체 중 223개를 
                            보관하기로 했으나, 매우 놀랍게도 그 성체는 하나도 변하지 않은 채 
                            하얗고 깨끗하게 보존되어 있었습니다.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                      <div className="flex items-start space-x-2">
                        <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-amber-800 mb-2">과학적 조사</h4>
                          <p className="text-sm text-amber-700 leading-relaxed">
                            1780년 화학자, 대학교수, 그리고 시에나의 대주교 하에 있는 학자들로 
                            구성된 법정위원회가 조사를 실시한 결과, '이 성체들은 실제로 산성화되지 
                            않은 빵의 중요한 구성성분인 전분이 포함된 반죽으로 만들어졌고, 
                            성체의 보관상태는 매우 양호하였다'고 결론지었습니다.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-amber-800 leading-relaxed">
                            교황 베네딕토 15세는 시에나의 이 놀라운 성체기적에 관해 자주 언급하셨으며, 
                            이 성체들은 현재까지도 시에나 대성당에서 보존되고 있습니다. 
                            이는 성체의 실재성에 대한 강력한 증거로 여겨지고 있습니다.
                          </p>
                        </div>
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
                                    // 현재 페이지이므로 아무것도 하지 않음
                                  } else if (child === "오르비에또") {
                                    setCurrentPage("orviettoo");
                                  } else if (child === "란치아노") {
                                    setCurrentPage("lanciano");
                                  } else {
                                    // console.log(`${child} 페이지는 아직 구현되지 않았습니다.`);
                                  }
                                }}
                                className={`flex items-center justify-between px-4 py-2 hover:bg-muted transition-colors group ${
                                  child === "시에나" ? "bg-primary/5 text-primary border-r-2 border-primary" : ""
                                }`}
                              >
                                <span className={`text-sm ${child === "시에나" ? "" : "text-muted-foreground"}`}>{child}</span>
                                {child !== "시에나" && (
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
                    <p className="font-medium text-gray-700 mb-1">📷 성녀 카타리나의 집</p>
                    <p>
                      사진: Sailko, 성녀 카타리나의 집 (Siena, Italy),{" "}
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
                      Image: Sailko, House of Saint Catherine of Siena (Siena, Italy),{" "}
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
                    <p className="font-medium text-gray-700 mb-1">📷 산 도미니코 대성당</p>
                    <p>
                      사진: Luca Aless, 산 도미니코 대성당 (Siena, Italy),{" "}
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
                      Image: Luca Aless, Basilica di San Domenico (Siena, Italy),{" "}
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

                  <div className="p-3 bg-gray-50 rounded-md border-l-2 border-purple-400">
                    <p className="font-medium text-gray-700 mb-1">📷 시에나 대성당 전경</p>
                    <p>
                      사진: Luca Aless, 시에나 대성당 전경 (Siena, Italy),{" "}
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
                      Image: Luca Aless, Veduta del Duomo di Siena (Siena, Italy),{" "}
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

                  <div className="p-3 bg-gray-50 rounded-md border-l-2 border-orange-400">
                    <p className="font-medium text-gray-700 mb-1">📷 캄포 광장</p>
                    <p>
                      사진: Holger Uwe Schmitt, 캄포 광장 (Siena, Italy),{" "}
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
                      Image: Holger Uwe Schmitt, Piazza del Campo (Siena, Italy),{" "}
                      <a 
                        href="https://creativecommons.org/licenses/by-sa/4.0/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        CC BY-SA 4.0
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