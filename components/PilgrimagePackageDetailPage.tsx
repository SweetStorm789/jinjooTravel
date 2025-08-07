import {
  MapPin,
  Calendar,
  Users,
  Plane,
  Clock,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  ArrowLeft,
  Star,
  Heart,
  Share2,
  Download,
  AlertTriangle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";
import { formatDateToKorean } from "../utils/dateFormat";

interface PilgrimagePackageDetailPageProps {
  setCurrentPage: (page: string) => void;
  packageId?: string;
  isAdmin?: boolean;
}

export default function PilgrimagePackageDetailPage({ 
  setCurrentPage, 
  packageId = "1",
  isAdmin = false
}: PilgrimagePackageDetailPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // 실제로는 packageId를 기반으로 DB에서 데이터를 가져올 예정
  const packageData = {
    id: 1,
    title: "바티칸 & 로마 성지순례",
    subtitle: "가톨릭의 중심지에서 만나는 신앙의 뿌리",
    description: "베드로 대성당, 시스티나 성당, 바티칸 박물관과 로마의 주요 성지들을 방문하는 특별한 순례로, 2천 년 가톨릭 역사의 심장부에서 신앙을 깊게 하는 거룩한 여정입니다.",
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552832230-92e4d7b42344?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598969444050-b2d67d7d5a3a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1609650982475-8e9bb7e8f7a0?q=80&w=1200&auto=format&fit=crop",
    ],
    duration: "7박 8일",
    price: "2,890,000원",
    region: "이탈리아",
    highlights: [
      "베드로 대성당",
      "시스티나 성당",
      "산 조반니 라테라노 대성당",
      "산타 마리아 마조레 대성당",
      "산 클레멘테 성당",
      "진실의 입",
      "로마 지하묘지",
      "바티칸 박물관"
    ],
    departureDate: "2024년 3월 15일",
    arrivalDate: "2024년 3월 22일",
    maxPeople: 25,
    currentBookings: 18,
    
    itinerary: [
      {
        day: 1,
        title: "인천 출발 → 로마 도착",
        description: "인천국제공항 출발, 로마 레오나르도 다 빈치 공항 도착 후 호텔 체크인",
        activities: [
          "인천국제공항 출발 (KE927편)",
          "로마 레오나르도 다 빈치 공항 도착",
          "호텔 체크인 및 휴식",
          "환영 만찬"
        ],
        meals: "기내식, 석식",
        accommodation: "Rome Marriott Grand Hotel Flora (4성급)"
      },
      {
        day: 2,
        title: "바티칸 성지순례",
        description: "가톨릭의 중심지 바티칸에서 베드로 대성당과 시스티나 성당 참배",
        activities: [
          "바티칸 박물관 관람",
          "시스티나 성당 미사 참례",
          "베드로 대성당 참배",
          "베드로 묘소 참배",
          "교황 일반알현 (수요일인 경우)"
        ],
        meals: "조식, 중식, 석식",
        accommodation: "Rome Marriott Grand Hotel Flora (4성급)"
      },
      {
        day: 3,
        title: "로마 4대 성당 순례",
        description: "로마의 4대 성당을 차례로 방문하며 가톨릭 역사를 체험",
        activities: [
          "산 조반니 라테라노 대성당 (교황좌 성당)",
          "산타 마리아 마조레 대성당 (구유 성유물)",
          "산 바오로 푸오리 레 무라 대성당",
          "성계단 기도"
        ],
        meals: "조식, 중식, 석식",
        accommodation: "Rome Marriott Grand Hotel Flora (4성급)"
      },
      {
        day: 4,
        title: "로마 시내 성지 & 역사 탐방",
        description: "고대 로마와 초기 기독교 유적지 방문",
        activities: [
          "콜로세움 및 포로 로마노",
          "산 클레멘테 성당 (지하교회)",
          "라테라노 세례소",
          "진실의 입",
          "트레비 분수"
        ],
        meals: "조식, 중식, 석식",
        accommodation: "Rome Marriott Grand Hotel Flora (4성급)"
      },
      {
        day: 5,
        title: "로마 지하묘지 & 근교 성지",
        description: "초기 기독교 순교자들의 발자취를 따라",
        activities: [
          "산 칼리스토 지하묘지",
          "산 세바스티아노 성당",
          "도미네 쿠오 바디스 성당",
          "세 개의 분수 성당",
          "아피아 가도"
        ],
        meals: "조식, 중식, 석식",
        accommodation: "Rome Marriott Grand Hotel Flora (4성급)"
      },
      {
        day: 6,
        title: "카스텔 간돌포 & 자유시간",
        description: "교황의 여름 별장과 로마 시내 자유시간",
        activities: [
          "카스텔 간돌포 (교황 여름 별장)",
          "알바노 호수 관람",
          "로마 시내 자유시간",
          "기념품 쇼핑"
        ],
        meals: "조식, 중식, 석식",
        accommodation: "Rome Marriott Grand Hotel Flora (4성급)"
      },
      {
        day: 7,
        title: "마지막 미사 & 공항 출발",
        description: "순례 마무리 미사와 한국으로 출발",
        activities: [
          "순례 마무리 미사",
          "개인 기도 시간",
          "공항 이동",
          "로마 출발 (KE928편)"
        ],
        meals: "조식, 기내식",
        accommodation: "기내숙박"
      },
      {
        day: 8,
        title: "인천 도착",
        description: "인천국제공항 도착 및 해산",
        activities: [
          "인천국제공항 도착",
          "입국 수속",
          "순례단 해산"
        ],
        meals: "기내식",
        accommodation: "-"
      }
    ],

    included: [
      "왕복 항공료 (대한항공 직항)",
      "전 일정 숙박비 (4성급 호텔)",
      "전 일정 식사 (조식 7회, 중식 6회, 석식 6회)",
      "전용 관광버스",
      "현지 가톨릭 가이드",
      "모든 입장료 및 관람료",
      "여행자 보험",
      "팁 (가이드, 기사, 호텔)",
      "순례 기념품"
    ],

    notIncluded: [
      "개인 경비",
      "여권 발급비",
      "선택관광비",
      "물값 및 음료",
      "세탁비",
      "전화 및 통신비",
      "개인 여행자 보험 추가 가입시",
      "항공료 할증료 (유류할증료 등)"
    ],

    notes: `– 지병이나 정신 질환을 가지고 계신 고객, 임신중이거나 장애를 가지고 있는 고객 ,
고령자 (81세 이상), 특별한 배려를 필요로하시는 고객은 여행 신청시 증상을 포함한 내용을 반드시 알려주셔야 합니다.
– 당사는 가능한 합리적인 범위내에서 의사의 진단서나 소정의 "여행 동의서"를 제출 요청 드릴 수가 있습니다.
또한, 경우에 따라서는 참가를 거절하거나 동반자 동행을 조건으로 할 수 있습니다.
– 단. 만 15세 미만 및 79세 6개월 이상의 고객의 경우 1억원 여행자 보험 플랜으로 적용됩니다.
※ 여행자보험 담당 : [동부화재] 나성현(보험관련문의만가능)

Tel)070-434-6601~2 Fax)02-737-3271~2
– 단 15세 미만의 사망보험금 및 만 79세 6개월 이상의 질병사망에 대해서는 보험 약관에 따라 보험금이 지급되지 않습니다.
– 자세한 세부사항은 홈페이지 하단 여행보험을 참조 바랍니다.`,
    customerPromise: `- 카드 결제로 인한 추가 요금 NO! 상품가 보장!
- 단체별 무조건 전문 인솔자 동반하여 출발 보장!
- 안정적인 현지일정 및 체계적인 관리
- 전 지역 호텔 투어리스트 택스 포함
- 장거리 구간 대형버스(45~55인승) 진행
- 진주여행사 단독행사 보장! (타 여행사와 연합하여 행사하지 않습니다.)
♧♣ 전 지역 엄선된 준특급 및 일급 호텔 사용 ♧♣

♣♧ 각 지역 특식 제공 ♧♣
1. 만족도 최고! 정통 현지식 제공

♣♧ 고객감사 PLUS 특전 ♧♣
1. 박물관 관광 시 개인용 수신기 제공
2. 전 지역 호텔 투어리스트 택스 포함
3. 각 지역별 네트워크 운영으로 비상시 특화된 서비스 지원가능`,
    cancellationPolicy: `- 이 상품은 취소시 공정거래 위원회 여행약관(2019년 12월19일 변경공시)과 (주)진주여행사의 특별약관 규정에 기준하여 취소수수료가 발생할 수 있으며, 취소시점에 항공(또는 선박)좌석 또는 호텔객실에 대한 비용을 선납해 놓은 경우, 취소시 별도의 취소료가 적용됨을 양해해 주시기 바랍니다.`,
    otherInfo: `* NO 필수옵션
* 지도신부님, 인솔자 동반
* 선별된 우수가이드
* 한식 특식
* 1억원 여행자 보험
* 최신의 깨끗한 차량을 우선배정
* 아프거나 사고 발생시 각 지역별 병원과 연계하여 진료를 받도록 현지 의료정보 제공`,


  };

  return (
    <div className="bg-background min-h-screen">
      {/* 상단 네비게이션 */}
      <div className="bg-card border-b sticky top-[140px] z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentPage("pilgrimage-packages")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>목록으로</span>
              </Button>

            </div>
            <div className="flex items-center space-x-2">
              {/* 관리자 권한 체크 - 관리자에게만 수정 버튼 표시 */}
              {isAdmin && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentPage(`package-form-edit-${packageId}`)}
                  className="flex items-center space-x-2"
                >
                  <span>수정</span>
                </Button>
              )}
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2">
            {/* 히어로 섹션 */}
            <div className="space-y-6">
              {/* 이미지 갤러리 */}
              <div className="space-y-4">
                <div className="aspect-[16/10] overflow-hidden rounded-lg">
                  <ImageWithFallback
                    src={packageData.images[selectedImageIndex]}
                    alt={packageData.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {packageData.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-[4/3] overflow-hidden rounded border-2 transition-all ${
                        selectedImageIndex === index 
                          ? "border-primary" 
                          : "border-transparent hover:border-border"
                      }`}
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`${packageData.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* 기본 정보 */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">
                    <MapPin className="h-3 w-3 mr-1" />
                    {packageData.region}
                  </Badge>
                  <Badge variant="outline">베스트셀러</Badge>
                  <Badge variant="outline">신부님 동행</Badge>
                </div>

                <div>
                  <h1 className="text-3xl font-medium mb-2">{packageData.title}</h1>
                  <p className="text-xl text-muted-foreground mb-4">{packageData.subtitle}</p>
                  <p className="text-muted-foreground leading-relaxed">{packageData.description}</p>
                </div>

                {/* 주요 정보 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-border">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{packageData.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">최대 {packageData.maxPeople}명</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Plane className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">직항편</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">신부님 동행</span>
                  </div>
                </div>

                {/* 주요 방문지 */}
                <div>
                  <h3 className="font-medium mb-3">주요 방문지</h3>
                  <div className="flex flex-wrap gap-2">
                    {packageData.highlights.map((highlight, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 상세 정보 탭 */}
            <div className="mt-12">
              <Tabs defaultValue="itinerary" className="space-y-6">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="itinerary">일정표</TabsTrigger>
                  <TabsTrigger value="included">포함사항</TabsTrigger>
                  <TabsTrigger value="promise">고객에 대한 약속</TabsTrigger>
                  <TabsTrigger value="cancellation">예약 및 취소료 규정</TabsTrigger>
                  <TabsTrigger value="other">기타안내</TabsTrigger>
                  <TabsTrigger value="notes">여행자보험 주의사항</TabsTrigger>
                </TabsList>

                <TabsContent value="itinerary" className="space-y-4">
                  <div className="space-y-4">
                    {packageData.itinerary.map((day) => (
                      <Card key={day.day}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                                {day.day}
                              </div>
                              <div className="flex flex-col">
                                <span>Day {day.day} - {day.title}</span>
                                {packageData.departureDate && (
                                  <span className="text-sm text-muted-foreground">
                                    {(() => {
                                      const startDate = new Date(packageData.departureDate.replace(/년|월|일/g, '').trim());
                                      startDate.setDate(startDate.getDate() + day.day - 1);
                                      return formatDateToKorean(startDate);
                                    })()}
                                  </span>
                                )}
                              </div>
                            </CardTitle>
                          </div>
                          <CardDescription>{day.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h5 className="font-medium mb-2">주요 활동</h5>
                            <ul className="space-y-1">
                              {day.activities.map((activity, index) => (
                                <li key={index} className="flex items-start space-x-2 text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                  <span>{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                            <div>
                              <span className="text-xs font-medium text-muted-foreground">식사</span>
                              <p className="text-sm">{day.meals}</p>
                            </div>
                            <div>
                              <span className="text-xs font-medium text-muted-foreground">숙박</span>
                              <p className="text-sm">{day.accommodation}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="included" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          <span>포함사항</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {packageData.included.map((item, index) => (
                            <li key={index} className="flex items-start space-x-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-red-600">
                          <XCircle className="h-5 w-5" />
                          <span>불포함사항</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {packageData.notIncluded.map((item, index) => (
                            <li key={index} className="flex items-start space-x-2 text-sm">
                              <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>



                <TabsContent value="promise" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-blue-600">
                        <Star className="h-5 w-5" />
                        <span>고객에 대한 약속</span>
                      </CardTitle>
                      <CardDescription>
                        진주여행사가 고객님께 드리는 확실한 약속입니다.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
                          {packageData.customerPromise}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="cancellation" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-red-600">
                        <AlertTriangle className="h-5 w-5" />
                        <span>예약 및 취소료 규정</span>
                      </CardTitle>
                      <CardDescription>
                        예약 취소시 적용되는 규정에 관한 안내사항입니다.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
                          {packageData.cancellationPolicy}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="other" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span>기타안내</span>
                      </CardTitle>
                      <CardDescription>
                        추가로 제공되는 서비스 및 혜택 안내입니다.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
                          {packageData.otherInfo}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notes" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-amber-600">
                        <AlertTriangle className="h-5 w-5" />
                        <span>여행자보험 주의사항</span>
                      </CardTitle>
                      <CardDescription>
                        여행자보험 가입 및 보장에 관한 중요 안내사항입니다.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
                          {packageData.notes}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="lg:col-span-1">
            <div className="sticky top-[200px] space-y-6">
              {/* 예약 정보 카드 */}
              <Card>
                <CardHeader>
                  <CardTitle>예약 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-medium">{packageData.price}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">1인 기준, 세금 포함</p>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>출발일</span>
                      <span className="font-medium">{packageData.departureDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>도착일</span>
                      <span className="font-medium">{packageData.arrivalDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>여행기간</span>
                      <span className="font-medium">{packageData.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>예약현황</span>
                      <span className="font-medium">
                        {packageData.currentBookings}/{packageData.maxPeople}명
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      <Phone className="h-4 w-4 mr-2" />
                      전화 예약
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      <Mail className="h-4 w-4 mr-2" />
                      온라인 문의
                    </Button>
                    <Button variant="ghost" className="w-full" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      상품설명서 다운로드
                    </Button>
                  </div>

                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground leading-relaxed space-y-1">
                      <div>• 예약 문의: 02-1234-5678</div>
                      <div>• 상담 시간: 평일 09:00-18:00</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 예약 현황 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">예약 현황</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>예약 가능</span>
                      <span className="text-green-600 font-medium">
                        {packageData.maxPeople - packageData.currentBookings}자리
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(packageData.currentBookings / packageData.maxPeople) * 100}%` 
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((packageData.currentBookings / packageData.maxPeople) * 100)}% 예약됨
                    </p>
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