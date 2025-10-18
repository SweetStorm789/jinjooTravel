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

import AntiochInPisidia2966Image from "../images/turkiye/Antioch_in_Pisidia_2966.jpg"; //피시디아 안티오키아 성당
import HagiaSophiaFromTheSultanamehtSquareHippodromeImage from "../images/turkiye/Hagia_Sophia_from_the_Sultanameht_Square_Hippodrome.jpg"; //아야 소피아 대성당
import HouseOfTheVirginMaryImage from "../images/turkiye/House_of_the_Virgin_Mary.jpg"; //성모 마리아의 집
import KonyaSenPolKilisesi4486Image from "../images/turkiye/Konya_Sen_Pol_Kilisesi_4486.jpg"; // 콘야 바오로 기념 성당
import LaodiceaBasilicaChurchImage from "../images/turkiye/LaodiceaBasilicaChurch.jpg"; //라오디케이아 성당


interface TurkiyePageProps {
  setCurrentPage: (page: string) => void;
}

export default function TurkiyePage({ setCurrentPage }: TurkiyePageProps) {
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
      name: "성 소피아 (Istanbul – Hagia Sophia)",
      subtitle: "동방정교회의 중심이었던 대성당",
      description:
        "콘스탄티누스 대제의 아들에 의해 처음 세워진 성 소피아 대성당은 동로마 제국의 상징이자 세계 건축사의 걸작으로 꼽힌다. 537년 유스티니아누스 황제 시대에 완성된 이 건물은 약 천 년간 동방 교회의 중심 대성당이었으며, 1453년 오스만 제국의 콘스탄티노폴리스 정복 이후 모스크로 전환되었다. 현재는 이슬람 예배와 관광이 함께 이루어지는 복합 문화 유산으로, 기독교와 이슬람의 역사가 공존하는 상징적 장소로 남아 있다.",
      icon: Crown,
      color: "from-amber-100 to-yellow-200",
      iconColor: "text-amber-700",
      image: HagiaSophiaFromTheSultanamehtSquareHippodromeImage,
    },
    {
      name: "라오디케이아 성당 (Laodicea Church, Pamukkale)",
      subtitle: "묵시록의 일곱 교회 중 하나",
      description:
        "라오디케이아(Laodicea) 는 신약성경 요한묵시록에 등장하는 일곱 교회 중 하나로, 오늘날 파묵칼레 인근의 유적지에 위치한다. 당시 이 지역은 상업과 의료의 중심지였으나, 신앙의 열정을 잃은 교회로 꾸지람을 받았던 곳으로 전해진다. 현재는 4세기경에 세워진 초기 기독교 성당의 터와 기둥, 모자이크 바닥이 남아 있으며, 터키 내에서 가장 잘 보존된 고대 교회 유적 중 하나로 평가된다.",
      icon: Building,
      color: "from-blue-100 to-indigo-200",
      iconColor: "text-blue-700",
      image: LaodiceaBasilicaChurchImage,
    },
    {
      name: "성 바오로 기념 성당 (Konya – St. Paul Memorial Church)",
      subtitle: "사도 바오로의 선교 발자취가 남은 곳",
      description:
        "사도 바오로가 복음 선교 중 머물렀던 코니아(Konya, 옛 이코니온) 에는 그의 이름을 딴 성 바오로 기념 성당(St. Paul Memorial Church) 이 있다. 1910년에 세워진 이 성당은 터키 내 몇 안 되는 가톨릭 성당 중 하나로, 현재 예수의 작은 자매회 수녀들이 순례자들을 맞이하고 있다. 사도 바오로의 전도 여정을 기념하는 이곳은 오늘날에도 세계 각지의 신자들이 찾아와 묵상과 기도를 드리는 성지로 남아 있다.",
      icon: Star,
      color: "from-green-100 to-emerald-200",
      iconColor: "text-green-700",
      image: KonyaSenPolKilisesi4486Image,
    },
    {
      name: "피시디아 안티오키아 성당 (Yalvaç – Pisidian Antioch)",
      subtitle: "사도 바오로의 첫 복음 선포지",
      description:
        "얄바츠 인근 산악지대에 위치한 피시디아 안티오키아는 사도 바오로가 제1차 선교 여행 중 처음으로 복음을 전한 도시입니다. 사도행전 13장에 언급된 이곳은 이방인 선교의 출발점으로, 초대 교회의 터와 세례당 유적이 남아 있습니다.",
      icon: Cross,
      color: "from-amber-100 to-yellow-200",
      iconColor: "text-amber-700",
      image: AntiochInPisidia2966Image,
    },
  ];

  const historicalInfo = [
    {
      title: "비잔틴 제국의 수도",
      period: "330년 - 1453년",
      description: "콘스탄티노플(현 이스탄불)은 동로마 제국의 수도로서 가톨릭 문화의 중심지였습니다."
    },
    {
      title: "사도 바오로의 선교 여행",
      period: "1세기",
      description: "사도 바오로이 소아시아 지역에서 활발한 선교 활동을 펼쳤으며, 에페소교회 등을 설립했습니다."
    },
    {
      title: "초대교회 공의회",
      period: "325년, 381년",
      description: "니케아 공의회와 콘스탄티노플 공의회가 열려 가톨릭 교리의 기초가 확립되었습니다."
    },
    {
      title: "오스만 제국 시대",
      period: "1299년 - 1922년",
      description: "이슬람 제국으로 발전하며 가톨릭 유적들이 이슬람 건축물로 변환되거나 공존하게 되었습니다."
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
                <Badge variant="outline">사도 바오로 선교지</Badge>
              </div>
              <div>
                <h1 className="text-4xl font-medium text-foreground mb-2">
                  튀르키예 공화국
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  사도 바오로의 선교 여행지이자 초대교회의 요람, 비잔틴과 오스만의 만남
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
                  사도 바오로의 선교 여행지와 초대교회 유적이 있는 튀르키예의 주요 성지들을 소개합니다.
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
                      <div className="space-y-4">
                        <div className="bg-gradient-to-br from-amber-100 to-yellow-200 rounded-lg overflow-hidden">
                        <ImageWithFallback
                        src={HouseOfTheVirginMaryImage}
                        alt="성모 마리아의 집"
                        className="w-full h-full object-cover"
                      />
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-amber-900">
                          Ephesus
                          </p>
                          <p className="text-sm text-amber-700">
                          성모 마리아의 집
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* 설명 */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="space-y-3">
                        <p className="leading-relaxed">
                          에페소 인근의 언덕 위에 자리한 성모 마리아의 집은 예수의 어머니 
                          성모 마리아가 사도 요한과 함께 여생을 보낸 곳으로 전해집니다. 
                          교황청이 공식 성지로 인정했으며, 교황 바오로 6세, 요한 바오로 2세, 
                          베네딕토 16세 등 여러 교황이 직접 방문한 순례지입니다.
                        </p>

                        <div className="bg-pink-50 border-l-4 border-pink-400 p-4 rounded-r-lg">
                          <div className="flex items-start space-x-2">
                            <Info className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                            <blockquote className="text-pink-800 italic">
                              "이곳은 평화와 위로의 집입니다. 
                              성모님이 머무신 이 자리에서 
                              신앙인들은 하느님의 사랑과 
                              자비를 새롭게 체험합니다."
                            </blockquote>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          작은 석조 건물로 남아 있는 성모 마리아의 집은 
                          전 세계 신자들의 순례가 끊이지 않는 성지입니다. 
                          매년 수많은 이들이 이곳을 찾아와 기도하며, 
                          그분의 보호와 은총을 간청합니다. 
                          주변에는 초기 그리스도교 유적과 고대 에페소 도시가 함께 자리해 
                          신앙과 역사가 어우러진 특별한 공간을 이룹니다.
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">
                          위치
                        </span>
                        <span className="text-sm text-muted-foreground">
                          터키 에페소 인근 (셀주크, Izmir)
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
                          카파도키아 - 초기 가톨릭의 피난처
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
                      초기 가톨릭 신자들이 로마의 박해를 피해 은신했던 곳입니다. 
                      지하 도시들과 바위를 깎아 만든 교회들이 수백 개 발견되어 
                      초기 가톨릭 역사의 중요한 증거가 되고 있습니다.
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
                            <li>• 초기 가톨릭 수도원 공동체의 흔적</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 튀르키예의 가톨릭 역사 */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Cross className="h-5 w-5" />
                    <span>튀르키예의 가톨릭 역사</span>
                  </CardTitle>
                  <CardDescription>사도 바오로의 선교지에서 비잔틴 제국까지</CardDescription>
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
                          튀르키예는 사도 바오로의 선교 여행지로서 초대교회 형성에 중요한 역할을 했으며, 
                          비잔틴 제국 시대에는 동방 가톨릭의 중심지였습니다. 
                          현재도 에페소의 성모 마리아의 집을 비롯해 많은 가톨릭 유적이 
                          잘 보존되어 있어 전 세계 가톨릭 신자들의 순례지가 되고 있습니다.
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
                                // console.log(`${item.name} 페이지는 아직 구현되지 않았습니다.`);
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
                    <p className="font-medium text-gray-700 mb-1">📷 성 소피아 대성당</p>
                    <p>
                      사진: Helge Høifødt, 성 소피아 대성당 (Hagia Sophia, Istanbul, Turkey),{" "}
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
                      Image: Helge Høifødt, Hagia Sophia seen from the Sultanahmet Square (Istanbul, Turkey),{" "}
                      <a
                        href="https://creativecommons.org/licenses/by-sa/3.0/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800 font-medium"
                      >
                        CC BY-SA 3.0
                      </a>, via Wikimedia Commons
                    </p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-md border-l-2 border-blue-400">
                    <p className="font-medium text-gray-700 mb-1">📷 라오디케이아 성당</p>
                    <p>
                      사진: Torsten62, 라오디케이아 성당 (Laodicea Basilica Church, Denizli, Turkey),{" "}
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
                      Image: Torsten62, View of the 4th-century church in Laodicea (Denizli, Turkey),{" "}
                      <a
                        href="https://creativecommons.org/licenses/by-sa/4.0/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800 font-medium"
                      >
                        CC BY-SA 4.0
                      </a>, via Wikimedia Commons
                    </p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-md border-l-2 border-blue-400">
                    <p className="font-medium text-gray-700 mb-1">📷 성 바오로 가톨릭 성당</p>
                    <p>
                      사진: Dosseman, 성 바오로 가톨릭 성당 (St. Paul's Catholic Church, Konya, Turkey),{" "}
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
                      Image: Dosseman, St. Paul's Catholic Church (Konya, Turkey),{" "}
                      <a
                        href="https://creativecommons.org/licenses/by-sa/4.0/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800 font-medium"
                      >
                        CC BY-SA 4.0
                      </a>, via Wikimedia Commons
                    </p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-md border-l-2 border-blue-400">
                    <p className="font-medium text-gray-700 mb-1">📷 피시디아 안티오키아 성당</p>
                    <p>
                      사진: Dosseman, 피시디아 안티오키아 유적 – 성 바오로 성당 (Yalvaç, Turkey),{" "}
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
                      Image: Dosseman, From the theatre a view towards the Great Basilica or St. Paul's Church (Pisidian Antioch, Yalvaç, Turkey),{" "}
                      <a
                        href="https://creativecommons.org/licenses/by-sa/4.0/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800 font-medium"
                      >
                        CC BY-SA 4.0
                      </a>, via Wikimedia Commons
                    </p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-md border-l-2 border-blue-400">
                    <p className="font-medium text-gray-700 mb-1">📷 성모 마리아의 집</p>
                    <p>
                      사진: Zorro2212, 성모님의 집 (House of the Virgin Mary, Ephesus, Turkey),{" "}
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
                      Image: Zorro2212, House of the Virgin Mary (Ephesus, Turkey),{" "}
                      <a
                        href="https://creativecommons.org/licenses/by-sa/3.0/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800 font-medium"
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