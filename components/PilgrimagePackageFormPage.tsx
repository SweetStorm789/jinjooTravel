import {
  MapPin,
  Calendar,
  Users,
  Plane,
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Upload,
  AlertTriangle,
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
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { ImageUpload } from "./ui/image-upload";
import axios from "axios";

import { formatDateToKorean, parseDayRange, findLastDay } from "../utils/dateFormat";

interface PilgrimagePackageFormPageProps {
  setCurrentPage: (page: string) => void;
  packageId?: string; // 수정시에만 제공됨
}

interface ItineraryDay {
  day: number;
  dayLabel: string; // "Day 1", "Day 2 ~ 3", "Day 1-2" 등 자유 형식
  title: string;
  description: string;
  activities: string;
  meals: string;
  accommodation: string;
}

interface GuideInfo {
  name: string;
  experience: string;
  specialty: string;
  certification: string;
  language: string;
}

interface PackageImage {
  id?: number;
  image_url: string;
  display_order: number;
  image_type: 'main' | 'detail';
}

interface PackageFormData {
  title: string;
  subtitle: string;
  description: string;
  images: PackageImage[];
  duration: string;
  price: string;

  region: string;
  highlights: string;
  departureDate: string;
  arrivalDate: string;
  maxPeople: number;
  itinerary: ItineraryDay[];
  included: string;
  notIncluded: string;
  insuranceNotes: string;
  customerPromise: string;
  cancellationPolicy: string;
  otherInfo: string;
  
  guide: GuideInfo;
}

export default function PilgrimagePackageFormPage({ 
  setCurrentPage, 
  packageId 
}: PilgrimagePackageFormPageProps) {
  const isEdit = !!packageId;
  
  const [formData, setFormData] = useState<PackageFormData>({
    title: "",
    subtitle: "",
    description: "",
    images: [],
    duration: "",
    price: "",

    region: "",
    highlights: "",
    departureDate: "",
    arrivalDate: "",
    maxPeople: 0,
    itinerary: [{
      day: 1,
      dayLabel: "Day 1",
      title: "",
      description: "",
      activities: "",
      meals: "",
      accommodation: ""
    }],
    included: "엄선된 고품격 호텔을 사용합니다.\n메주고리예:PERO'S PENSION\n지역별 특별한 현지식으로 고객님들의 미각 충족을 위해 노력하였습니다.\n박물관 등 입장시 필요한 경우 개인용 수신기 서비스를 제공합니다.\nNO 필수옵션 상품\n일급~준특급호텔 사용 – 호텔조식(아메리칸 뷔페식)\n일정상의 항공료, 유류할증료,호텔(2인1실 기준),식사,관광 입장료 포함입니다.\n1억원 여행자 보험, 인천공항세, 출국납부금(관광진흥개발기금,전쟁보험료 등),제세금 포함입니다.\n진주여행사의 모든 상품은 관광객들에게 징수하는 호텔TAX를 포함하고 있습니다.",
    notIncluded: "전일정 기사, 가이드, 인솔자 팁, 식당 팁, 식당 물값 등은 불포함입니다. (€10/1일)\n개인 경비 및 매너팁 (호텔, 개인수화물 대리운반등)\n매너팁은 소비자의 자율적 선택사항으로 지불여부에 따른 불이익은 없습니다.\n초과 수하물 요금(규정의 무게, 크기, 개수를 초과 하는것)\n선택관광 비용",
    insuranceNotes: "– 지병이나 정신 질환을 가지고 계신 고객, 임신중이거나 장애를 가지고 있는 고객 ,\n고령자 (81세 이상), 특별한 배려를 필요로하시는 고객은 여행 신청시 증상을 포함한 내용을 반드시 알려주셔야 합니다.\n– 당사는 가능한 합리적인 범위내에서 의사의 진단서나 소정의 \"여행 동의서\"를 제출 요청 드릴 수가 있습니다.\n또한, 경우에 따라서는 참가를 거절하거나 동반자 동행을 조건으로 할 수 있습니다.\n– 단. 만 15세 미만 및 79세 6개월 이상의 고객의 경우 1억원 여행자 보험 플랜으로 적용됩니다.\n※ 여행자보험 담당 : [동부화재] 나성현(보험관련문의만가능)\n\nTel)070-434-6601~2 Fax)02-737-3271~2\n– 단 15세 미만의 사망보험금 및 만 79세 6개월 이상의 질병사망에 대해서는 보험 약관에 따라 보험금이 지급되지 않습니다.\n– 자세한 세부사항은 홈페이지 하단 여행보험을 참조 바랍니다.",
    customerPromise: "- 카드 결제로 인한 추가 요금 NO! 상품가 보장!\n- 단체별 무조건 전문 인솔자 동반하여 출발 보장!\n- 안정적인 현지일정 및 체계적인 관리\n- 전 지역 호텔 투어리스트 택스 포함\n- 장거리 구간 대형버스(45~55인승) 진행\n- 진주여행사 단독행사 보장! (타 여행사와 연합하여 행사하지 않습니다.)\n♧♣ 전 지역 엄선된 준특급 및 일급 호텔 사용 ♧♣\n\n♣♧ 각 지역 특식 제공 ♧♣\n1. 만족도 최고! 정통 현지식 제공\n\n♣♧ 고객감사 PLUS 특전 ♧♣\n1. 박물관 관광 시 개인용 수신기 제공\n2. 전 지역 호텔 투어리스트 택스 포함\n3. 각 지역별 네트워크 운영으로 비상시 특화된 서비스 지원가능",
    cancellationPolicy: "- 이 상품은 취소시 공정거래 위원회 여행약관(2019년 12월19일 변경공시)과 (주)진주여행사의 특별약관 규정에 기준하여 취소수수료가 발생할 수 있으며, 취소시점에 항공(또는 선박)좌석 또는 호텔객실에 대한 비용을 선납해 놓은 경우, 취소시 별도의 취소료가 적용됨을 양해해 주시기 바랍니다.",
    otherInfo: "* NO 필수옵션\n* 지도신부님, 인솔자 동반\n* 선별된 우수가이드\n* 한식 특식\n* 1억원 여행자 보험\n* 최신의 깨끗한 차량을 우선배정\n* 아프거나 사고 발생시 각 지역별 병원과 연계하여 진료를 받도록 현지 의료정보 제공",
    guide: {
      name: "",
      experience: "",
      specialty: "",
      certification: "",
      language: ""
    }
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (isEdit && packageId) {
      // 실제로는 API에서 데이터를 가져올 예정
      // 현재는 샘플 데이터로 테스트
      if (packageId === "1") {
        setFormData({
          title: "바티칸 & 로마 성지순례",
          subtitle: "가톨릭의 중심지에서 만나는 신앙의 뿌리",
          description: "베드로 대성당, 시스티나 성당, 바티칸 박물관과 로마의 주요 성지들을 방문하는 특별한 순례로, 2천 년 가톨릭 역사의 심장부에서 신앙을 깊게 하는 거룩한 여정입니다.",
          images: [
            {
              id: 1,
              image_url: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1200&auto=format&fit=crop",
              display_order: 1,
              image_type: 'main'
            },
            {
              id: 2,
              image_url: "https://images.unsplash.com/photo-1552832230-92e4d7b42344?q=80&w=1200&auto=format&fit=crop",
              display_order: 2,
              image_type: 'detail'
            },
            {
              id: 3,
              image_url: "https://images.unsplash.com/photo-1598969444050-b2d67d7d5a3a?q=80&w=1200&auto=format&fit=crop",
              display_order: 3,
              image_type: 'detail'
            },
            {
              id: 4,
              image_url: "https://images.unsplash.com/photo-1609650982475-8e9bb7e8f7a0?q=80&w=1200&auto=format&fit=crop",
              display_order: 4,
              image_type: 'detail'
            }
          ],
          duration: "7박 8일",
          price: "2,890,000원",
          region: "유럽",
          highlights: "베드로 대성당\n시스티나 성당\n산 조반니 라테라노 대성당\n산타 마리아 마조레 대성당",
          departureDate: "2024-03-15",
          arrivalDate: "2024-03-22",
          maxPeople: 25,
          itinerary: [
            {
              day: 1,
              dayLabel: "Day 1",
              title: "인천 출발 → 로마 도착",
              description: "인천국제공항 출발, 로마 레오나르도 다 빈치 공항 도착 후 호텔 체크인",
              activities: "인천국제공항 출발 (KE927편)\n로마 레오나르도 다 빈치 공항 도착\n호텔 체크인 및 휴식",
              meals: "기내식, 석식",
              accommodation: "Rome Marriott Grand Hotel Flora (4성급)"
            }
          ],
          included: "왕복 항공료 (대한항공 직항)\n전 일정 숙박비 (4성급 호텔)\n전 일정 식사\n전용 차량 및 현지 가이드\n바티칸 박물관 입장료\n성지 입장료 및 미사 참례",
          notIncluded: "개인 경비\n여권 발급비\n선택관광비\n개인 여행자보험\n팁 (가이드, 기사, 호텔)\n개인적인 쇼핑 및 음료",
          insuranceNotes: "– 지병이나 정신 질환을 가지고 계신 고객, 임신중이거나 장애를 가지고 있는 고객 ,\n고령자 (81세 이상), 특별한 배려를 필요로하시는 고객은 여행 신청시 증상을 포함한 내용을 반드시 알려주셔야 합니다.\n– 당사는 가능한 합리적인 범위내에서 의사의 진단서나 소정의 \"여행 동의서\"를 제출 요청 드릴 수가 있습니다.\n또한, 경우에 따라서는 참가를 거절하거나 동반자 동행을 조건으로 할 수 있습니다.\n– 단. 만 15세 미만 및 79세 6개월 이상의 고객의 경우 1억원 여행자 보험 플랜으로 적용됩니다.\n※ 여행자보험 담당 : [동부화재] 나성현(보험관련문의만가능)\n\nTel)070-434-6601~2 Fax)02-737-3271~2\n– 단 15세 미만의 사망보험금 및 만 79세 6개월 이상의 질병사망에 대해서는 보험 약관에 따라 보험금이 지급되지 않습니다.\n– 자세한 세부사항은 홈페이지 하단 여행보험을 참조 바랍니다.",
          customerPromise: "- 카드 결제로 인한 추가 요금 NO! 상품가 보장!\n- 단체별 무조건 전문 인솔자 동반하여 출발 보장!\n- 안정적인 현지일정 및 체계적인 관리\n- 전 지역 호텔 투어리스트 택스 포함\n- 장거리 구간 대형버스(45~55인승) 진행\n- 진주여행사 단독행사 보장! (타 여행사와 연합하여 행사하지 않습니다.)\n♧♣ 전 지역 엄선된 준특급 및 일급 호텔 사용 ♧♣\n\n♣♧ 각 지역 특식 제공 ♧♣\n1. 만족도 최고! 정통 현지식 제공\n\n♣♧ 고객감사 PLUS 특전 ♧♣\n1. 박물관 관광 시 개인용 수신기 제공\n2. 전 지역 호텔 투어리스트 택스 포함\n3. 각 지역별 네트워크 운영으로 비상시 특화된 서비스 지원가능",
          cancellationPolicy: "- 이 상품은 취소시 공정거래 위원회 여행약관(2019년 12월19일 변경공시)과 (주)진주여행사의 특별약관 규정에 기준하여 취소수수료가 발생할 수 있으며, 취소시점에 항공(또는 선박)좌석 또는 호텔객실에 대한 비용을 선납해 놓은 경우, 취소시 별도의 취소료가 적용됨을 양해해 주시기 바랍니다.",
          otherInfo: "* NO 필수옵션\n* 지도신부님, 인솔자 동반\n* 선별된 우수가이드\n* 한식 특식\n* 1억원 여행자 보험\n* 최신의 깨끗한 차량을 우선배정\n* 아프거나 사고 발생시 각 지역별 병원과 연계하여 진료를 받도록 현지 의료정보 제공",
          guide: {
            name: "김마리아 가이드",
            experience: "15년",
            specialty: "바티칸 성지 전문",
            certification: "공인 바티칸 가이드",
            language: "한국어, 이탈리아어, 영어"
          }
        });
      }
    }
  }, [isEdit, packageId]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const handleItineraryChange = (index: number, field: keyof ItineraryDay, value: any) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((day, i) => 
        i === index ? { ...day, [field]: value } : day
      )
    }));
  };

  const addItineraryDay = () => {
    setFormData(prev => {
      const lastDay = findLastDay(prev.itinerary);
      const nextDay = lastDay + 1;
      return {
        ...prev,
        itinerary: [...prev.itinerary, {
          day: nextDay,
          dayLabel: `Day ${nextDay}`,
          title: "",
          description: "",
          activities: "",
          meals: "",
          accommodation: ""
        }]
      };
    });
  };

  const removeItineraryDay = (index: number) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index).map((day, i) => ({
        ...day,
        day: i + 1
      }))
    }));
  };

  const handleGuideChange = (field: keyof GuideInfo, value: string) => {
    setFormData(prev => ({
      ...prev,
      guide: {
        ...prev.guide,
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {
    try {
      // 데이터 형식 변환
      const packageData = {
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        region: formData.region,
        duration: formData.duration,
        price: formData.price.replace(/[^0-9]/g, ''), // 숫자만 추출
        departure_date: formData.departureDate,
        arrival_date: formData.arrivalDate,
        max_people: formData.maxPeople,
        highlights: formData.highlights,
        status: 'published',
        included: formData.included,
        not_included: formData.notIncluded,
        insurance_notes: formData.insuranceNotes,
        customer_promise: formData.customerPromise,
        cancellation_policy: formData.cancellationPolicy,
        other_info: formData.otherInfo,

        // ✅ 반드시 포함
        itinerary: formData.itinerary.map(d => ({
          day: d.day,
          dayLabel: d.dayLabel,
          title: d.title,
          description: d.description,
          activities: d.activities,
          meals: d.meals,
          accommodation: d.accommodation,
        })),
      };

      // 1. 상품 정보 저장
      const response = await axios.post('http://localhost:5000/api/packages', packageData);

      const packageId = response.data.id;

      // 2. 임시 이미지들을 상품과 연결
      if (formData.images.length > 0) {
        await axios.put(`http://localhost:5000/api/images/link/${packageId}`, {
          images: formData.images.map(img => ({
            id: img.id,
            display_order: img.display_order,
            image_type: img.image_type
          }))
        });
      }

      alert(isEdit ? "상품이 수정되었습니다." : "상품이 등록되었습니다.");
      setCurrentPage("pilgrimage-packages");
    } catch (error) {
      console.error('상품 저장 실패:', error);
      alert('상품 저장에 실패했습니다.');
    }
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
                onClick={() => setCurrentPage(isEdit ? `package-detail-${packageId}` : "pilgrimage-packages")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>뒤로가기</span>
              </Button>
              <h1 className="text-lg font-medium">
                {isEdit ? "성지순례 상품 수정" : "성지순례 상품 등록"}
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                미리보기
              </Button>
              <Button onClick={handleSubmit} className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>{isEdit ? "수정" : "등록"}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="basic">기본정보</TabsTrigger>
            <TabsTrigger value="itinerary">일정표</TabsTrigger>
            <TabsTrigger value="included">포함사항</TabsTrigger>
            <TabsTrigger value="promise">고객에 대한 약속</TabsTrigger>
            <TabsTrigger value="cancellation">예약 및 취소료 규정</TabsTrigger>
            <TabsTrigger value="other">기타안내</TabsTrigger>
            <TabsTrigger value="notes">여행자보험 주의사항</TabsTrigger>
          </TabsList>

          {/* 기본정보 탭 */}
          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>기본 정보</CardTitle>
                <CardDescription>성지순례 상품의 기본 정보를 입력하세요.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">상품명 *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="예: 바티칸 & 로마 성지순례"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">지역 *</Label>
                    <Select value={formData.region} onValueChange={(value) => handleInputChange("region", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="지역 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="유럽">유럽</SelectItem>
                        <SelectItem value="아시아">아시아</SelectItem>
                        <SelectItem value="국내">국내</SelectItem>
                        <SelectItem value="이스라엘">이스라엘</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subtitle">부제목</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => handleInputChange("subtitle", e.target.value)}
                    placeholder="예: 가톨릭의 중심지에서 만나는 신앙의 뿌리"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">상품 설명 *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="성지순례 상품에 대한 상세 설명을 입력하세요"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="duration">여행기간 *</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => handleInputChange("duration", e.target.value)}
                      placeholder="예: 7박 8일"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">순례금액 *</Label>
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      placeholder="예: 2,890,000원"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="departureDate">출발일 *</Label>
                    <Input
                      id="departureDate"
                      type="date"
                      value={formData.departureDate}
                      onChange={(e) => handleInputChange("departureDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="arrivalDate">도착일 *</Label>
                    <Input
                      id="arrivalDate"
                      type="date"
                      value={formData.arrivalDate}
                      onChange={(e) => handleInputChange("arrivalDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxPeople">최대인원 *</Label>
                    <Input
                      id="maxPeople"
                      type="number"
                      value={formData.maxPeople}
                      onChange={(e) => handleInputChange("maxPeople", parseInt(e.target.value))}
                      placeholder="예: 25"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

                          {/* 이미지 관리 */}
            <Card>
              <CardHeader>
                <CardTitle>상품 이미지</CardTitle>
                <CardDescription>상품을 나타내는 이미지들을 등록하세요 (최대 10개)</CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  images={formData.images}
                  onUpload={async (files) => {
                    try {
                      const formData = new FormData();
                      Array.from(files).forEach(file => {
                        formData.append('images', file);
                      });
                      formData.append('package_id', packageId || '0');
                      formData.append('image_type', 'detail');

                      const response = await axios.post('http://localhost:5000/api/images', formData, {
                        headers: {
                          'Content-Type': 'multipart/form-data'
                        }
                      });

                      if (response.data.images) {
                        // 이미지 URL을 절대 경로로 변환
                        const imagesWithFullUrls = response.data.images.map((img: PackageImage) => ({
                          ...img,
                          image_url: `http://localhost:5000${img.image_url}`
                        }));
                        setFormData(prev => ({
                          ...prev,
                          images: [...prev.images, ...imagesWithFullUrls]
                        }));
                      }
                    } catch (error) {
                      console.error('이미지 업로드 실패:', error);
                      alert('이미지 업로드에 실패했습니다.');
                    }
                  }}
                  onRemove={async (index) => {
                    const image = formData.images[index];
                    if (image.id) {
                      try {
                        await axios.delete(`http://localhost:5000/api/images/${image.id}`);
                      } catch (error) {
                        console.error('이미지 삭제 실패:', error);
                        alert('이미지 삭제에 실패했습니다.');
                        return;
                      }
                    }
                    setFormData(prev => ({
                      ...prev,
                      images: prev.images.filter((_, i) => i !== index)
                    }));
                  }}
                  onReorder={async (dragIndex, hoverIndex) => {
                    const draggedImage = formData.images[dragIndex];
                    const newImages = [...formData.images];
                    newImages.splice(dragIndex, 1);
                    newImages.splice(hoverIndex, 0, draggedImage);
                    
                    // 순서 업데이트
                    const updatedImages = newImages.map((image, index) => ({
                      ...image,
                      display_order: index + 1
                    }));

                    try {
                      await axios.put('http://localhost:5000/api/images/order', {
                        images: updatedImages.map(img => ({
                          id: img.id,
                          display_order: img.display_order
                        }))
                      });

                      setFormData(prev => ({
                        ...prev,
                        images: updatedImages
                      }));
                    } catch (error) {
                      console.error('이미지 순서 변경 실패:', error);
                      alert('이미지 순서 변경에 실패했습니다.');
                    }
                  }}
                />
              </CardContent>
            </Card>

            {/* 주요 방문지 */}
            <Card>
              <CardHeader>
                <CardTitle>주요 방문지</CardTitle>
                <CardDescription>순례에서 방문할 주요 성지들을 입력하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={formData.highlights}
                  onChange={(e) => handleInputChange("highlights", e.target.value)}
                  placeholder="주요 방문지들을 입력하세요. 각 방문지는 새 줄로 구분해주세요."
                  rows={4}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* 일정표 탭 */}
          <TabsContent value="itinerary" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">여행 일정표</h3>
                <p className="text-sm text-muted-foreground">Day별 상세 일정을 입력하세요</p>
              </div>
              <Button onClick={addItineraryDay} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>일정 추가</span>
              </Button>
            </div>

            {/* Day 표기 가이드 */}
            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mt-0.5">
                    i
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-2">Day 표기 형식 안내</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>• <span className="font-medium">Day 1</span> - 단일 일차</p>
                      <p>• <span className="font-medium">Day 2~3</span> - 범위 일차 (물결표)</p>
                      <p>• <span className="font-medium">Day 1-2</span> - 범위 일차 (하이픈)</p>
                      <p>• <span className="font-medium">Day 4 오전</span> - 시간대 포함</p>
                      <p>• <span className="font-medium">출발일</span> - 자유 형식</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {formData.itinerary.map((day, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {day.day}
                      </div>
                      <div className="flex flex-col">
                        <span>{day.dayLabel}</span>
                        {formData.departureDate && (
                          <span className="text-sm text-muted-foreground">
                                                          {(() => {
                                const range = parseDayRange(day.dayLabel);
                                if (!range) return "";
                                
                                const startDate = new Date(formData.departureDate);
                                startDate.setDate(startDate.getDate() + range.start - 1);
                                
                                if (range.start === range.end) {
                                  return formatDateToKorean(startDate);
                                } else {
                                  const endDate = new Date(formData.departureDate);
                                  endDate.setDate(endDate.getDate() + range.end - 1);
                                  return `${formatDateToKorean(startDate)} ~ ${formatDateToKorean(endDate)}`;
                                }
                              })()}
                          </span>
                        )}
                      </div>
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeItineraryDay(index)}
                      disabled={formData.itinerary.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Day 표기 *</Label>
                    <Input
                      value={day.dayLabel}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        const range = parseDayRange(newValue);
                        if (range === null) {
                          alert("잘못된 일차 범위입니다. 시작일이 종료일보다 작아야 합니다.");
                          return;
                        }
                        // 다른 일정과의 일차 중복 검사
                        const hasOverlap = formData.itinerary.some((otherDay, otherIndex) => {
                          if (otherIndex === index) return false;
                          const otherRange = parseDayRange(otherDay.dayLabel);
                          if (!otherRange) return false;
                          return (range.start <= otherRange.end && range.end >= otherRange.start);
                        });
                        if (hasOverlap) {
                          alert("일차가 다른 일정과 중복됩니다.");
                          return;
                        }
                        handleItineraryChange(index, "dayLabel", newValue);
                      }}
                      placeholder="예: Day 1, Day 2~3, Day 1-2, Day 4 오전"
                    />
                    <p className="text-xs text-muted-foreground">
                      💡 팁: "Day 1~4", "Day 2-3", "출발일", "Day 5 오전" 등 자유롭게 입력 가능
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>제목 *</Label>
                    <Input
                      value={day.title}
                      onChange={(e) => handleItineraryChange(index, "title", e.target.value)}
                      placeholder="예: 인천 출발 → 로마 도착"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>설명</Label>
                    <Textarea
                      value={day.description}
                      onChange={(e) => handleItineraryChange(index, "description", e.target.value)}
                      placeholder="해당 일차의 전체적인 설명을 입력하세요"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>주요 활동</Label>
                    <Textarea
                      value={day.activities}
                      onChange={(e) => handleItineraryChange(index, "activities", e.target.value)}
                      placeholder="해당 일차의 주요 활동들을 입력하세요. 각 활동은 새 줄로 구분해주세요."
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>식사</Label>
                      <Input
                        value={day.meals}
                        onChange={(e) => handleItineraryChange(index, "meals", e.target.value)}
                        placeholder="예: 조식, 중식, 석식"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>숙박</Label>
                      <Input
                        value={day.accommodation}
                        onChange={(e) => handleItineraryChange(index, "accommodation", e.target.value)}
                        placeholder="예: Rome Marriott Grand Hotel Flora (4성급)"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* 하단 일정 추가 버튼 */}
            <div className="flex justify-center mt-6">
              <Button onClick={addItineraryDay} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>일정 추가</span>
              </Button>
            </div>
          </TabsContent>

          {/* 포함사항 탭 */}
          <TabsContent value="included" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span>포함사항</span>
                  </CardTitle>
                  <CardDescription>
                    여행 패키지에 포함된 항목들을 입력하세요. 각 항목은 새 줄로 구분해주세요.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={formData.included}
                    onChange={(e) => handleInputChange("included", e.target.value)}
                    placeholder="포함사항을 입력하세요. 각 항목은 새 줄로 구분해주세요."
                    rows={10}
                    className="resize-none"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-red-600">
                    <XCircle className="h-5 w-5" />
                    <span>불포함사항</span>
                  </CardTitle>
                  <CardDescription>
                    여행 패키지에 포함되지 않은 항목들을 입력하세요. 각 항목은 새 줄로 구분해주세요.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={formData.notIncluded}
                    onChange={(e) => handleInputChange("notIncluded", e.target.value)}
                    placeholder="불포함사항을 입력하세요. 각 항목은 새 줄로 구분해주세요."
                    rows={8}
                    className="resize-none"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 고객에 대한 약속 탭 */}
          <TabsContent value="promise" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-600">
                  <Star className="h-5 w-5" />
                  <span>고객에 대한 약속</span>
                </CardTitle>
                <CardDescription>진주여행사가 고객님께 드리는 확실한 약속사항을 입력하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.customerPromise}
                  onChange={(e) => handleInputChange("customerPromise", e.target.value)}
                  placeholder="고객에 대한 약속사항을 입력하세요. 각 항목은 새 줄로 구분해주세요."
                  rows={15}
                  className="resize-none"
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* 예약 및 취소료 규정 탭 */}
          <TabsContent value="cancellation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  <span>예약 및 취소료 규정</span>
                </CardTitle>
                <CardDescription>예약 취소시 적용되는 규정에 관한 안내사항을 입력하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.cancellationPolicy}
                  onChange={(e) => handleInputChange("cancellationPolicy", e.target.value)}
                  placeholder="예약 및 취소료 규정을 입력하세요."
                  rows={8}
                  className="resize-none"
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* 기타안내 탭 */}
          <TabsContent value="other" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span>기타안내</span>
                </CardTitle>
                <CardDescription>추가로 제공되는 서비스 및 혜택 안내를 입력하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.otherInfo}
                  onChange={(e) => handleInputChange("otherInfo", e.target.value)}
                  placeholder="기타 안내사항을 입력하세요. 각 항목은 새 줄로 구분해주세요."
                  rows={10}
                  className="resize-none"
                />
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
                  여행자보험 가입 및 보장에 관한 중요 안내사항을 입력하세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.insuranceNotes}
                  onChange={(e) => handleInputChange("insuranceNotes", e.target.value)}
                  placeholder="여행자보험 관련 주의사항을 입력하세요."
                  rows={15}
                  className="resize-none"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}