import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Building,
  ArrowRight,
  Info,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Sun,
  Umbrella,
  Book,
  Heart,
  Shield,
  DollarSign,
  Smartphone,
  Shirt,
  Footprints,
  Camera,
  Globe
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
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface PilgrimagePreparationPageProps {
  setCurrentPage: (page: string) => void;
}

export default function PilgrimagePreparationPage({
  setCurrentPage,
}: PilgrimagePreparationPageProps) {
  const [isPreparationExpanded, setIsPreparationExpanded] = useState(true);
  const [isEtiquetteExpanded, setIsEtiquetteExpanded] = useState(true);
  const [isPrecautionsExpanded, setIsPrecautionsExpanded] = useState(true);

  const preparationItems = [
    {
      icon: Book,
      title: "필수 준비물",
      items: [
        "여권",
        "성경",
        "기도서",
        "성가집",
        "매일미사책",
        "묵주",
        "모자",
        "세면도구",
        "우산 또는 우비",
        "편한 옷 (따뜻한 옷)",
        "잠바",
        "편한 신발",
        "슬리퍼",
        "공동경비 (1일 약 10유로)",
        "스마트폰 충전기 (5핀)",
        "자외선차단제",
        "썬글라스"
      ],
      color: "text-blue-600"
    },
    {
      icon: DollarSign,
      title: "환전",
      items: [
        "1인당 미화 일만 불까지 소지 가능",
        "분실 염려가 있으므로 여행자 수표를 준비",
        "현금은 가급적 잔돈으로 준비하는 것이 좋음",
        "(출발 당일 공항에서 환전 가능)"
      ],
      color: "text-green-600"
    },
    {
      icon: Sun,
      title: "날씨",
      items: [
        "우리나라와 비슷한 기온이지만, 저녁은 춥습니다",
        "잠바를 준비하시기 바랍니다",
        "** 기온 변화가 심할 수 있습니다"
      ],
      color: "text-orange-600"
    },
    {
      icon: Shirt,
      title: "복장",
      items: [
        "성지순례에 적합한 단정한 옷차림"
      ],
      color: "text-purple-600"
    }
  ];

  const etiquetteItems = [
    {
      icon: Building,
      title: "기내에서의 기본예절",
      items: [
        {
          subtitle: "가. 좌석",
          content: "기내에서는 탑승권에 명기된 자신의 좌석에 앉아야 하며 여타의 사정으로 바꾸고자 할 경우, 이륙한 뒤 벨트싸인이 꺼진 후 상대방의 양해를 구하여 바꾸면 됩니다."
        },
        {
          subtitle: "나. 금연",
          content: "항공기에서는 절대 금연으로 되어 있습니다. 화장실이나 기타 기내에서 금연하여 주십시오."
        }
      ],
      color: "text-blue-600"
    },
    {
      icon: Building,
      title: "호텔에서의 기본예절",
      items: [
        {
          subtitle: "가. 객실 관리",
          content: "호텔 투숙 시 객실번호를 기록하여 잊지 않도록 하시고, 외출 시에는 반드시 동행 안내원에게 행선지를 알려주시고 호텔에 비치된 명함 또는 성냥갑을 소지하면 유용하게 쓰입니다."
        },
        {
          subtitle: "나. 열쇠 관리",
          content: "외출 시에는 프론트에 열쇠를 맡겨 주시기 바랍니다."
        },
        {
          subtitle: "다. 팁",
          content: "호텔에서는 1박에 1달러의 팁을 베개 밑이나 침대 위에 놓는 게 국제적 관례입니다."
        },
        {
          subtitle: "라. 욕실 사용",
          content: "호텔의 욕조에서 샤워나 목욕을 하실 때에는 커텐을 욕조 안으로 넣어 물이 밖으로 튀지 않게 하여 주십시오."
        }
      ],
      color: "text-green-600"
    }
  ];

  const precautionsItems = [
    {
      icon: AlertTriangle,
      title: "주의사항",
      content: [
        "저희 여행사 성지순례는 일반 쇼핑이나 단순 관광 스케줄은 포함되어 있지 않습니다.",
        "저희 여행사 성지순례는 매일미사, 기도와 보속, 희생과 고행으로 거룩한 순례를 지향하고 있음을 알려드립니다.",
        "성서, 매일미사책, 성가책이 필요합니다.",
        "성지순례를 위하여 복되신 성모님께서 당신에게 넘치는 은총과 축복으로 채워 주시고, 당신의 삶을 회개하고 변화된 거룩한 삶으로 바꾸어 주시도록, 그리고 당신의 모든 기도를 아드님이신 예수 그리스도께 전구하여 주시기를 간절히 청하는 묵주의 기도를 바쳐 주시기 바랍니다."
      ],
      color: "text-red-600"
    }
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-3 space-y-8">
            {/* 헤더 */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-foreground">
                성지순례 준비물
              </h1>
              <p className="text-lg text-muted-foreground">
                거룩한 성지순례를 위한 완벽한 준비 가이드
              </p>
            </div>

            {/* 준비물 안내 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Book className="h-6 w-6 text-blue-600" />
                    <CardTitle className="text-2xl">준비물 안내</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPreparationExpanded(!isPreparationExpanded)}
                  >
                    {isPreparationExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              {isPreparationExpanded && (
                <CardContent className="space-y-6">
                  {preparationItems.map((section, index) => {
                    const IconComponent = section.icon;
                    return (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <IconComponent className={`h-5 w-5 ${section.color}`} />
                          <h3 className="text-lg font-semibold">{section.title}</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-7">
                          {section.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                        {index < preparationItems.length - 1 && <Separator />}
                      </div>
                    );
                  })}
                </CardContent>
              )}
            </Card>

            {/* 여행 상식 및 기본 예절 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-6 w-6 text-green-600" />
                    <CardTitle className="text-2xl">여행 상식 및 기본 예절</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEtiquetteExpanded(!isEtiquetteExpanded)}
                  >
                    {isEtiquetteExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              {isEtiquetteExpanded && (
                <CardContent className="space-y-6">
                  {etiquetteItems.map((section, index) => {
                    const IconComponent = section.icon;
                    return (
                      <div key={index} className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <IconComponent className={`h-5 w-5 ${section.color}`} />
                          <h3 className="text-lg font-semibold">{section.title}</h3>
                        </div>
                        <div className="space-y-3 ml-7">
                          {section.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="space-y-2">
                              <div className="flex items-start space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                <div>
                                  <p className="font-medium text-sm">{item.subtitle}</p>
                                  <p className="text-sm text-muted-foreground">{item.content}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {index < etiquetteItems.length - 1 && <Separator />}
                      </div>
                    );
                  })}
                </CardContent>
              )}
            </Card>

            {/* 주의사항 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                    <CardTitle className="text-2xl">주의사항</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPrecautionsExpanded(!isPrecautionsExpanded)}
                  >
                    {isPrecautionsExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              {isPrecautionsExpanded && (
                <CardContent className="space-y-4">
                  {precautionsItems.map((section, index) => {
                    const IconComponent = section.icon;
                    return (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <IconComponent className={`h-5 w-5 ${section.color}`} />
                          <h3 className="text-lg font-semibold">{section.title}</h3>
                        </div>
                        <div className="space-y-3 ml-7">
                          {section.content.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-start space-x-2">
                              <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                              <p className="text-sm">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              )}
            </Card>

            {/* 하단 메시지 */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2 text-blue-700">
                  <CheckCircle className="h-5 w-5" />
                  <p className="text-sm font-medium">
                    끝으로 순례 동안 매일 미사와 고백성사 그리고 모든 지도를 맡아 주실 신부님을 위하여 기도하여 주시기 바랍니다.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 빠른 링크 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">빠른 링크</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setCurrentPage('vatican')}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  바티칸 성지
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setCurrentPage('fatima')}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  파티마 성지
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setCurrentPage('lourdes')}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  루르드 성지
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setCurrentPage('medjugorje')}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  메주고리예 성지
                </Button>
              </CardContent>
            </Card>

            {/* 연락처 정보 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">문의사항</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span>성지순례 관련 문의사항이 있으시면 언제든 연락주세요.</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>전문 상담사가 도와드립니다.</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
