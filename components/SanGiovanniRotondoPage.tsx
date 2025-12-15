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
  Cross,
  Heart,
  Star,
  Crown,
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

import casaSollievoDellaSofferenzaImage from "../images/italy/sanGiovanniRotondo/CasaSollievoDellaSofferenza.jpg";
import chiesaDiSanPioDaPietrelcinaImage from "../images/italy/sanGiovanniRotondo/ChiesaDiSanPioDaPietrelcina.jpg";
import PadrePioImage from "../images/italy/sanGiovanniRotondo/PadrePio.jpg";
import museoDiPadrePioImage from "../images/italy/sanGiovanniRotondo/MuseoDiPadrePio.jpg";
import santaMariaDelleGrazieImage from "../images/italy/sanGiovanniRotondo/SantaMariaDelleGrazie.jpg";
import HolyLandMenu from "./HolyLandMenu";

interface SanGiovanniRotondoPageProps {
  setCurrentPage: (page: string) => void;
}

export default function SanGiovanniRotondoPage({ setCurrentPage }: SanGiovanniRotondoPageProps) {



  const keyStats = [
    {
      icon: Globe,
      title: "면적",
      value: "84",
      unit: "km²",
      description: "이탈리아 남부 풀리아 주에 위치",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "인구",
      value: "27,000",
      unit: "명",
      description: "성 비오 신부로 유명한 순례지",
      color: "text-green-600",
    },
    {
      icon: Church,
      title: "성인",
      value: "성 비오 신부",
      unit: "",
      description: "1887-1968, 카푸친 수도회",
      color: "text-purple-600",
    },
    {
      icon: Star,
      title: "성흔",
      value: "1918년",
      unit: "",
      description: "50년간 지속된 기적의 성흔",
      color: "text-orange-600",
    },
  ];

  const countryInfo = [
    {
      label: "정식 명칭",
      value: "산 조반니 로톤도 (San Giovanni Rotondo)",
    },
    { label: "위치", value: "이탈리아 풀리아 주 포지아 현" },
    { label: "해발고도", value: "566m" },
    { label: "면적", value: "84 평방 KM" },
    { label: "인구", value: "27,000명" },
    { label: "주보성인", value: "성 비오 신부 (Padre Pio)" },
    { label: "언어", value: "이탈리아어" },
    { label: "화폐단위", value: "유로 (EUR)" },
    { label: "성 비오 신부 시성", value: "2002년 6월 16일" },
  ];

  const holyPlaces = [
    {
      name: "성 비오 신부 성당(Santuario di San Pio da Pietrelcina)",
      subtitle: "성 비오 신부의 무덤이 있는 신 성당",
      description:
        "2004년에 완공된 현대적인 대성당으로, 세계적 건축가 렌조 피아노(Renzo Piano)가 설계하였다. 성당 내부에는 성 비오 신부의 유해가 안치되어 있으며, 웅장한 구조와 예술적 설계는 현대 가톨릭 건축의 걸작으로 평가받는다. 매년 수백만 명의 순례자들이 이곳을 찾아 기도하며 성인의 전구를 청한다.",
      icon: Church,
      color: "from-blue-100 to-indigo-200",
      iconColor: "text-blue-700",
      image: chiesaDiSanPioDaPietrelcinaImage,
    },
    {
      name: "산타 마리아 델레 그라치에 성당(Santuario di Santa Maria delle Grazie)",
      subtitle: "성 비오 신부가 50년간 봉사한 옛 성당",
      description:
        "성 비오 신부가 1916년부터 선종한 1968년까지 50여 년간 사목 활동을 이어간 옛 성당이다. 이곳에서 매일 미사를 집전하고 신자들의 고해성사를 들었으며, 1918년 9월 20일 성흔을 받은 장소로도 알려져 있다. 성당 옆에는 성 비오 신부가 사용하던 고해실이 보존되어 있어, 당시의 영적 현장을 그대로 느낄 수 있다.",
      icon: Cross,
      color: "from-amber-100 to-yellow-200",
      iconColor: "text-amber-700",
      image: santaMariaDelleGrazieImage,
    },
    {
      name: "성 비오 신부 박물관(Museo Paramenti sacri Padre Pio)",
      subtitle: "성 비오 신부의 생애와 유품 전시",
      description:
        "성인의 삶과 신앙을 보여주는 공간으로, 성 비오 신부의 유품, 편지, 사진, 성구 등이 전시되어 있다. 단순한 기록물이 아니라 성인의 영성과 기적을 증언하는 증거로서, 방문자들에게 깊은 신앙적 감동을 준다. 이곳은 성 비오 신부의 내적 삶과 사도직을 이해하는 중요한 관문이 된다.",
      icon: Star,
      color: "from-purple-100 to-violet-200",
      iconColor: "text-purple-700",
      image: museoDiPadrePioImage,
    },
    {
      name: "카사 솔리에보 델라 소페렌자 병원(Casa Sollievo della Sofferenza)",
      subtitle: "성 비오 신부가 설립한 병원",
      description:
        "1956년 성 비오 신부가 설립한 병원으로, 이름은 ‘고통 받는 이들의 집’을 뜻한다. 단순한 의료기관이 아니라, 신앙과 사랑으로 환자를 돌보고 고통을 나누는 공간으로 기획되었다. 오늘날에도 최첨단 의료 시설을 갖춘 유럽의 대표적인 병원으로 운영되고 있으며, 성인의 자비와 연대 정신을 계승하고 있다.",
      icon: Heart,
      color: "from-green-100 to-emerald-200",
      iconColor: "text-green-700",
      image: casaSollievoDellaSofferenzaImage,
    },
  ];

  const padreProInfo = [
    {
      title: "출생과 어린 시절",
      period: "1887년 5월 25일",
      description: "이탈리아 남부 피에트렐치나에서 농부의 아들로 태어나 어려서부터 신심이 깊었습니다."
    },
    {
      title: "카푸친 수도회 입회",
      period: "1903년",
      description: "16세에 카푸친 수도회에 입회하여 프란치스코 포르조네라는 이름으로 수도생활을 시작했습니다."
    },
    {
      title: "사제 서품과 성흔",
      period: "1910년 서품, 1918년 성흔",
      description: "1910년 사제로 서품되었고, 1918년 9월 20일 예수님의 성흔을 받아 50년간 지속되었습니다."
    },
    {
      title: "시성과 선종",
      period: "1968년 선종, 2002년 시성",
      description: "1968년 9월 23일 선종하였고, 2002년 교황 요한 바오로 2세에 의해 시성되었습니다."
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
                  <span>이탈리아 풀리아 주</span>
                </Badge>
                <Badge variant="outline">성지순례</Badge>
                <Badge variant="outline">성 비오 신부</Badge>
              </div>
              <div>
                <h1 className="text-4xl font-medium text-foreground mb-2">
                  산조반니로톤도
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  성 비오 신부의 성지, 성흔과 기적의 땅, 고통받는 이들의 위로자
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-amber-500/10 rounded-full flex items-center justify-center">
                <Cross className="h-12 w-12 text-amber-600" />
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
                    산조반니로톤도의 기본 정보
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
                    산조반니로톤도의 지리적 위치
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GoogleMap
                    center={holyPlacesLocations.sanGiovanniRotondo.center}
                    markers={holyPlacesLocations.sanGiovanniRotondo.markers}
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
                  성 비오 신부와 관련된 산조반니로톤도의 주요 성지들을 소개합니다.
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
                        className="w-full h-[280px] object-cover"
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
                      {/* <h3 className="text-sm font-medium text-muted-foreground mb-3 border-l-2 border-blue-200 pl-3">
                        {city.subtitle}
                      </h3> */}
                      <h3 className="text-lg font-medium text-foreground mb-2">
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

            {/* 성 비오 신부 특별 섹션 */}
            <section>
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                        <Cross className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          성 비오 신부 - 성흔의 성인
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          프란치스코 포르조네, 1887-1968
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      카푸친 수도회
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
                            src={PadrePioImage}
                            alt="Padre Pio"
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
                            Padre Pio
                          </p>
                          <p className="text-sm text-amber-700">
                            Padre Pio
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 설명 */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="space-y-3">
                        <p className="leading-relaxed">
                          성 비오 신부(본명: 프란치스코 포르조네)는 1887년 이탈리아
                          피에트렐치나에서 태어나 1903년 카푸친 수도회에 입회했습니다.
                          1918년 9월 20일 예수님의 성흔을 받아 50년간 지속되었으며,
                          수많은 기적과 치유로 유명한 20세기의 위대한 성인입니다.
                        </p>

                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                          <div className="flex items-start space-x-2">
                            <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <blockquote className="text-amber-800 italic">
                              "기도하라, 희망하라, 걱정하지 말라.
                              걱정은 영혼에 해롭다. 하나님은 모든 것을 아시고,
                              모든 것을 제공하시며, 모든 것을 돌보신다."
                            </blockquote>
                          </div>
                          <p className="text-amber-600 text-xs mt-2 text-right">
                            - 성 비오 신부
                          </p>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          성 비오 신부는 1968년 9월 23일 선종하였고,
                          2002년 6월 16일 교황 요한 바오로 2세에 의해 시성되었습니다.
                          그가 설립한 '고통받는 이들의 집' 병원은 현재도
                          수많은 환자들을 치료하고 있습니다.
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">
                          축일
                        </span>
                        <span className="text-sm text-muted-foreground">
                          9월 23일
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 성 비오 신부의 생애 */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>성 비오 신부의 생애</span>
                  </CardTitle>
                  <CardDescription>고통받는 이들의 위로자가 걸어간 거룩한 여정</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {padreProInfo.map((info, index) => (
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
                          성 비오 신부는 현대에 성흔을 받은 최초의 사제로,
                          50년간 계속된 성흔과 수많은 기적으로 전 세계
                          가톨릭 신자들의 존경을 받고 있습니다.
                          그의 영성과 사랑은 오늘날에도 수많은 이들에게
                          위로와 희망을 주고 있습니다.
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
              {/* 성지정보 메뉴 */}
              <HolyLandMenu currentPage="sangiovannirotondo" setCurrentPage={setCurrentPage} />

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
      </div>
    </div>
  );
}