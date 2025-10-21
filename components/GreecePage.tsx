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
import { useState, useEffect } from "react";
import GoogleMap from "./shared/GoogleMap";
import { getTimeDifferenceFromKorea } from "../utils/timezone";
import { holyPlacesLocations } from "./constants/holyPlacesLocations";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import olympiaStadiumImage from "../images/greece/ancient-olympia-stadium-greece.jpg";
import athensImage from "../images/greece/athens-acropolis-parthenon-temple.jpg";
import syntagmaSquareImage from "../images/greece/syntagma-square-athens-view.jpg";
import unnamedSoldierImage from "../images/greece/tomb-of-the-unknown-soldier-athens.jpg";
import zeusTempleImage from "../images/greece/temple-of-zeus-athens-ruins.jpg";
import areopagusHillImage from "../images/greece/areopagus-hill-athens-panorama.jpg";

interface GreecePageProps {
  setCurrentPage: (page: string) => void;
}

export default function GreecePage({
  setCurrentPage,
}: GreecePageProps) {
  const [isItalyExpanded, setIsItalyExpanded] = useState(true);
  const [timeDifference, setTimeDifference] = useState(getTimeDifferenceFromKorea('greece'));
  
  // 실시간 시차 업데이트
  useEffect(() => {
    const updateTimeDifference = () => {
      setTimeDifference(getTimeDifferenceFromKorea('greece'));
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
      value: "131,957",
      unit: "km²",
      description: "발칸반도 남단에 위치",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "인구",
      value: "10.41",
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
      value: "그리스 공화국 (Ελληνική Δημοκρατία)",
    },
    { label: "정치 체제", value: "의회 공화제" },
    { label: "국가원수", value: "대통령" },
    { label: "수도", value: "아테네 (Athens)" },
    { label: "공용어", value: "그리스어" },
    { label: "종교", value: "그리스정교(90%), 기독교(3%), 이슬람교(1.3%)" },
    { label: "화폐", value: "유로 (EUR)" },
    { label: "국제전화", value: "+30" },
  ];

  const holyPlaces = [
    {
      name: "아크로폴리스",
      subtitle:
        "폴리스(도시국가)의 중심이었던 언덕으로 기운전 13세기경에 세워진 고대 그리스의 유적지이며 유네스코 지정 세계 고적 제 1호다.",
      description:
        "폴리스(도시국가)의 중심이었던 언덕으로 기운전 13세기경에 세워진 고대 그리스의 유적지이며 유네스코 지정 세계 고적 제 1호다. 아크로폴리스는 ‘도시의 높은 곳’ 이라는 뜻으로, 아테네에서 가장 높은 곳에 위치하고 있다.",
      image: athensImage,
    },
    {
      name: "신타그마 광장(헌법 광장)",
      subtitle:
        "신타그마 광장은 그리스 아테네의 중심부에 있는 광장이다. 1844년 그리스 왕국의 헌법이 여기서 반포되었다.",
      description:
        "신타그마 광장은 그리스 아테네의 중심부에 있는 광장이다. 1844년 그리스 왕국의 헌법이 여기서 반포되었다. 신타그마는 그리스어로 헌법을 의미한다. 그리스 고궁이 광장 바로 앞에 위치해 있으며, 이 건물은 1934년부터 그리스 국회로 사용되고 있다. 이 광장의 동쪽에는 무명 용사의 비가 있다. 그 밖에도 광장 주변에는 각종 관공서가 위치해있고, 광장 서쪽으로 아테네 최대의 번화가인 에르무 거리가 있다.",
        image: syntagmaSquareImage,
    },
    {
      name: "무명전사비",
      subtitle:
        "아테네 신타그마 광장 앞에 위치한 무명전사비는 그리스 독립 전쟁부터 현대의 여러 전투에 이르기까지, 나라를 위해 목숨을 바친 이름 없는 전사들을 추모하기 위해 세워진 기념비다.",
      description:
        "아테네 신타그마 광장 앞에 위치한 무명전사비는 그리스 독립 전쟁부터 현대의 여러 전투에 이르기까지, 나라를 위해 목숨을 바친 이름 없는 전사들을 추모하기 위해 세워진 기념비다. 기념비 앞에서는 전통 의상을 입은 근위병들이 정해진 시간마다 엄숙한 교대식을 진행하며, 그리스의 역사와 희생, 전통을 상징하는 의미 있는 장소로 많은 이들의 발길이 이어지고 있다.",
        image: unnamedSoldierImage,
    },
    {
      name: "제우스 신전",
      subtitle:
        "제우스 신전(올림피에이온)은 아테네에 위치한 고대 그리스 최대 규모의 신전으로, 천둥의 신 제우스를 기리기 위해 건립되었다.",
      description:
        "제우스 신전(올림피에이온)은 아테네에 위치한 고대 그리스 최대 규모의 신전으로, 천둥의 신 제우스를 기리기 위해 건립되었다. 기원전 6세기에 착공되어 로마 황제 하드리아누스 치세인 서기 132년에 완공되었으며, 현재는 일부 기둥만 남아 있지만, 당시의 장엄함을 보여주는 중요한 유적이이다.",
        image: zeusTempleImage,
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
                사도 바오로의 발자취와 요한 묵시록이 기록된 땅, 가톨릭 초대 교회의 중요한 무대
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
                  <GoogleMap
                    center={holyPlacesLocations.greece.center}
                    markers={holyPlacesLocations.greece.markers}
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
                  아테네
                </h2>
                <p className="text-muted-foreground">
                아테네는 그리스의 수도이자 고대 그리스 문명의 중심지로, 민주주의와 철학, 예술이 꽃피운 도시다. 소크라테스, 플라톤, 아리스토텔레스 같은 위대한 철학자들이 활동했던 곳으로, 서양 문명의 뿌리를 간직하고 있다. 도시 중심에 자리한 아크로폴리스와 파르테논 신전은 아테네의 상징이며, 고대 유적과 현대적인 도시 문화가 조화를 이루는 모습이 인상적이다. 오늘날에도 유럽 문화와 역사를 체험할 수 있는 대표적인 여행지로 많은 이들이 찾고 있다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {holyPlaces.map((place, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative">
                      <div className="absolute inset-0"></div>
                      <ImageWithFallback
                        src={place.image}
                        alt={place.name}
                        className="w-full h-[240px] object-cover"
                      />
                     {/*
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
                      </div>*/}
                      {/* 오버레이 텍스트 */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-white/50 backdrop-blur-sm rounded px-2 py-1 flex justify-center items-center w-full">
                          <span className="text-sm font-medium text-gray-800 text-center">
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
                    
                    {/* 오버레이 텍스트 */}
                    <div className="absolute bottom-0 left-0 right-0">
                      <ImageWithFallback
                        src={olympiaStadiumImage}
                        alt="올림피아 경기장"
                        className="w-full h-full object-cover"
                      />
                      <div className="bg-white/90 backdrop-blur-sm rounded px-3 py-2">
                        <span className="font-medium text-amber-800">
                          올림피아 경기장
                        </span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground leading-relaxed">
                    올림피아 경기장은 고대 그리스 올림픽의 발상지로, 제우스 신을 기리기 위해 기원전 776년부터 4년에 한 번씩 경기가 열렸던 장소다. 펠로폰네소스 반도에 위치하며, 육상 경기를 위한 트랙과 제우스 신전, 필리페이온, 헤라 신전 등의 유적이 함께 남아 있다. 유네스코 세계문화유산으로 지정되어 고대 스포츠와 종교 문화의 중심지로 평가받는는다.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 아테네 - 바오로의 설교 */}
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
                          아테네 아레오파고 
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          바오로로의 유명한 설교 장소
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
                      <div className="space-y-4">
                        <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg overflow-hidden">
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageWithFallback
                              src={areopagusHillImage}
                              alt="아레오파고 "
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-blue-900">
                            Areopagus
                          </p>
                          <p className="text-sm text-blue-700">
                            아레오파고 
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 설명 */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="space-y-3">
                        <p className="leading-relaxed">
                        아레오파고는 아테네 아크로폴리스 서쪽에 위치한 바위 언덕으로, 고대에는 최고 법정을 겸한 회의 장소였다.
                        사도 바오로은 아테네를 방문했을 때, 도시 곳곳에 세워진 수많은 우상들을 보고 마음이 격분하여 회당과 광장에서 유다인들과 시민들을 상대로 하느님을 전했다. 그러던 중 에피쿠로스와 스토아 철학자들에 의해 아레오파고로 불려가게 된다.

                        이 자리에서 바오로은 아테네 시민들에게 이렇게 말한다:
                        </p>

                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                          <div className="flex items-start space-x-2">
                            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <blockquote className="text-blue-800 italic">
                            “내가 걷다가 너희가 받들어 모시는 것들을 보다가 ‘알지 못하는 신에게’ 바친 제단도 보았습니다.
                              그러니 너희가 알지도 못하면서 받들어 모시는 그분을 내가 너희에게 알려 드리겠습니다.”
                              <p className="text-blue-600 text-xs mt-2 text-right">
                              (사도행전 17,23)</p>
                              <p>“이제 하느님께서는 모든 사람에게 어디에 있든지 회개하라고 명하십니다.”</p>
                              <p className="text-blue-600 text-xs mt-2 text-right">
                              (사도행전 17,30)</p>
                              “그들은 죽은 이들의 부활에 대한 말을 듣고 조롱하는 사람도 있었고, ‘이 일에 대해서는 나중에 다시 듣겠다’ 하는 사람도 있었다.”
                              <p className="text-blue-600 text-xs mt-2 text-right">(사도행전 17,32)</p>
                            </blockquote>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                        사도 바오로은 이 자리에서 하느님은 세상의 창조주시며, 사람의 손을 통해 섬김을 받는 분이 아니고, 모든 사람을 회개로 부르며 예수 그리스도의 부활을 통해 구원의 길을 여셨다고 선포했다.
                        이 설교는 복음이 헬레니즘 문화권에 본격적으로 전해지는 중요한 전환점이 되었으며, 가톨릭 선교사적 관점에서 매우 상징적인 장소로 여겨진다.
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

            {/* 파트모스섬 - 요한묵시록 */}
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
                          요한묵시록이 기록된 성지
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      요한묵시록
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="leading-relaxed">
                    요한 묵시록이 기록된 성지
                    </p>
                    <p>파트모스는 사도 요한이 로마 황제 도미티아누스에 의해 유배된 섬으로, 전승에 따르면 이곳에서 요한 묵시록을 기록한 것으로 전해진다.
                    에게 해의 작은 섬이지만, 하느님의 계시가 내려진 장소로서 가톨릭 역사에서 매우 중요한 의미를 지닌 성지다.
                    </p>

                    <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                      <div className="flex items-start space-x-2">
                        <Info className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <blockquote className="text-purple-800 italic">
                        “나 요한은 여러분의 형제이며, 예수님과 함께 환난과 나라와 인내를 함께 받은 사람입니다. 나는 하느님의 말씀과 예수님에 대한 증언 때문에 밧모라고 하는 섬에 있었습니다.”
                        </blockquote>
                      </div>
                      <p className="text-purple-600 text-xs mt-2 text-right">
                        - 요한 묵시록 1장 9절 (가톨릭 성경 공동번역)
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
                                // console.log(
                                //   `${item.name} 페이지는 아직 구현되지 않았습니다.`,
                                // );
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
                                      // console.log(
                                      //   `${child} 페이지는 아직 구현되지 않았습니다.`,
                                      // );
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