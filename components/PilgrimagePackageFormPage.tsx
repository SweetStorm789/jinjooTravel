import {
  CheckCircle,
  XCircle,
  ArrowLeft,
  Save,
  Plus,
  Trash2,
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
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState, useEffect } from "react";
import React from "react";
import { ImageUpload } from "./ui/image-upload";
import ImageLibraryModal from "./ImageLibraryModal";
import axios from "axios";
import { BASE_URL } from '@/lib/constants';

import { formatDateToKorean, parseDayRange, findLastDay } from "../utils/dateFormat";

interface PilgrimagePackageFormPageProps {
  setCurrentPage: (page: string) => void;
  packageId?: string; // 수정시에만 제공됨
}

interface ItineraryDay {
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

interface ImageLibraryImage {
  id: number;
  filename: string;
  original_name: string;
  url: string;
  thumbnail_url: string;
  category: string;
  tags: string[];
  usage_count: number;
  created_at: string;
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
  
  // 이미지 라이브러리 모달 상태
  const [isImageLibraryOpen, setIsImageLibraryOpen] = useState(false);

  // 이미지 라이브러리에서 이미지 선택 처리
  const handleImageLibrarySelect = async (selectedImages: ImageLibraryImage[]) => {
    try {
      console.log('=== 이미지 라이브러리 선택 시작 ===');
      console.log('선택된 이미지들:', selectedImages);
      console.log('현재 폼 이미지 개수:', formData.images.length);
      console.log('현재 폼 이미지들:', formData.images);
      console.log('수정 모드 여부:', isEdit);
      
      if (!selectedImages || selectedImages.length === 0) {
        console.log('선택된 이미지가 없습니다.');
        return;
      }
      
      // 선택된 이미지들을 폼 데이터에 직접 추가
      const newImages: PackageImage[] = selectedImages.map((image, index) => ({
        image_url: image.url,
        display_order: formData.images.length + index + 1,
        image_type: 'detail' as const
      }));

      console.log('새로 추가할 이미지들:', newImages);

      // setFormData를 함수형 업데이트로 변경하여 최신 상태 보장
      setFormData(prev => {
        console.log('setFormData 호출 - 이전 상태:', prev);
        const updatedImages = [...prev.images, ...newImages];
        console.log('업데이트된 이미지 목록:', updatedImages);
        
        const newState = {
          ...prev,
          images: updatedImages
        };
        
        console.log('새로운 상태:', newState);
        return newState;
      });
      
      // 상태 업데이트 후 확인을 위한 setTimeout
      setTimeout(() => {
        console.log('상태 업데이트 후 확인:', formData.images);
      }, 100);
      
      setIsImageLibraryOpen(false);
      console.log('=== 이미지 라이브러리 선택 완료 ===');
    } catch (error) {
      console.error('이미지 라이브러리에서 이미지 추가 실패:', error);
      alert('이미지 추가에 실패했습니다.');
    }
  };
  
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
      dayLabel: "1일차",
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    const fetchPackageData = async () => {
      if (!isEdit || !packageId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${BASE_URL}/api/packages/${packageId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch package data');
        }
        const data = await response.json();
        
        // 문자열을 배열로 변환하는 함수 
        const parseTextToArray = (text: string | null | undefined): string => {
          if (!text) return "";
          
          // 이미 JSON 배열인 경우 문자열로 변환
          if (text.startsWith('[') && text.endsWith(']')) {
            try {
              const parsed = JSON.parse(text);
              return Array.isArray(parsed) ? parsed.join('\n') : text;
            } catch (e) {
              return text;
            }
          }
          
          return text;
        };

        // itinerary 처리 - API 응답에 맞게 변환
        const itinerary = (data.itineraries || []).map((day: any) => ({
          dayLabel: day.day_label || `Day ${day.day_number}`,
          title: day.title || '',
          description: day.description || '',
          activities: parseTextToArray(day.activities),
          meals: day.meals || '',
          accommodation: day.accommodation || ''
        }));

        // 이미지 처리 - 상대 경로로 변환 (PilgrimagePackagesPage와 동일하게)
        const images = (data.images || []).map((img: any) => {
          const imageUrl = img.image_url;
          let processedUrl;
          
          if (imageUrl.startsWith('http')) {
            // 절대 경로에서 파일명만 추출
            const filename = imageUrl.split('/').pop();
            processedUrl = filename ? `${BASE_URL}/uploads/${filename}` : imageUrl;
          } else {
            // 상대 경로인 경우 BASE_URL과 결합
            processedUrl = `${BASE_URL}${imageUrl}`;
          }
          
          console.log('기존 이미지 처리:', { original: img, processed: processedUrl });
          
          return {
            id: img.id,
            image_url: processedUrl,
            display_order: img.display_order,
            image_type: img.image_type
          };
        });

        console.log('수정 모드 - 로드된 이미지들:', images);

        // 가격 처리 - 숫자를 포맷된 문자열로 변환
        const formatPrice = (price: number | string) => {
          let numericPrice: number;
          if (typeof price === 'string') {
            // "3000000.00" 같은 문자열에서 소수점 앞의 정수 부분만 추출
            const cleanedPrice = price.replace(/[^0-9.]/g, ''); // 숫자와 점만 남김
            numericPrice = parseInt(cleanedPrice.split('.')[0]) || 0; // 소수점 앞부분만 취함
          } else {
            // 숫자인 경우 소수점 제거하고 정수로 변환
            numericPrice = Math.floor(price) || 0;
          }
          return new Intl.NumberFormat('ko-KR').format(numericPrice) + '원';
        };

        // 폼 데이터 설정
        setFormData({
          title: data.title || '',
          subtitle: data.subtitle || '',
          description: data.description || '',
          images,
          duration: data.duration || '',
          price: formatPrice(data.price || 0),
          region: data.region || '',
          highlights: parseTextToArray(data.highlights),
          departureDate: data.departure_date ? formatYYYYMMDDToInputDate(data.departure_date) : '',
          arrivalDate: data.arrival_date ? formatYYYYMMDDToInputDate(data.arrival_date) : '',
          maxPeople: data.max_people || 0,
          itinerary: itinerary.length > 0 ? itinerary : [{
            dayLabel: "Day 1",
            title: "",
            description: "",
            activities: "",
            meals: "",
            accommodation: ""
          }],
          included: parseTextToArray(data.included),
          notIncluded: parseTextToArray(data.not_included),
          insuranceNotes: parseTextToArray(data.insurance_notes),
          customerPromise: parseTextToArray(data.customer_promise),
          cancellationPolicy: parseTextToArray(data.cancellation_policy),
          otherInfo: parseTextToArray(data.other_info),
          guide: {
            name: "",
            experience: "",
            specialty: "",
            certification: "",
            language: ""
          }
        });
      } catch (err) {
        console.error('Error fetching package data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load package data');
      } finally {
        setLoading(false);
      }
    };

    fetchPackageData();
  }, [isEdit, packageId]);

  // formData.images 변경 감지
  useEffect(() => {
    console.log('formData.images 변경됨:', formData.images);
  }, [formData.images]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 가격 포맷팅 함수
  const formatPriceInput = (value: string) => {
    // 숫자만 추출
    const numericValue = value.replace(/[^0-9]/g, '');
    if (!numericValue) return '';
    
    // 숫자를 콤마로 포맷팅하고 "원" 추가
    const formattedNumber = new Intl.NumberFormat('ko-KR').format(parseInt(numericValue));
    return formattedNumber + '원';
  };

  // 가격 입력 핸들러
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPrice = formatPriceInput(e.target.value);
    handleInputChange("price", formattedPrice);
  };

  // YYYYMMDD 형식을 YYYY-MM-DD 형식으로 변환 (HTML input[type="date"]용)
  const formatYYYYMMDDToInputDate = (dateString: string): string => {
    if (!dateString) return '';
    
    // YYYYMMDD 형식인지 확인
    if (dateString.length === 8 && /^\d{8}$/.test(dateString)) {
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6, 8);
      return `${year}-${month}-${day}`;
    }
    
    // ISO 형식이나 다른 날짜 형식 처리
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      
      // 로컬 시간대로 날짜를 가져와서 시간대 차이 문제 해결
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    } catch {
      // 기존 형식 처리 (fallback)
      if (dateString.includes('T')) {
        return dateString.split('T')[0];
      }
      
      return dateString;
    }
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
      itinerary: prev.itinerary.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      // 기본 유효성 검사
      if (!formData.title.trim()) {
        alert('상품명을 입력해주세요.');
        return;
      }
      if (!formData.duration.trim()) {
        alert('여행 기간을 입력해주세요.');
        return;
      }
      if (!formData.price.trim()) {
        alert('순례 금액을 입력해주세요.');
        return;
      }
      if (!formData.departureDate) {
        alert('출발일을 선택해주세요.');
        return;
      }
      if (!formData.arrivalDate) {
        alert('도착일을 선택해주세요.');
        return;
      }
      if (!formData.maxPeople || formData.maxPeople <= 0) {
        alert('최대 인원을 입력해주세요.');
        return;
      }
      if (!formData.region) {
        alert('지역을 선택해주세요.');
        return;
      }

      // 데이터 형식 변환
      const departureDateFormatted = formData.departureDate ? formData.departureDate.replace(/-/g, '') : null;
      const arrivalDateFormatted = formData.arrivalDate ? formData.arrivalDate.replace(/-/g, '') : null;
      
      console.log('📅 날짜 변환 확인:', {
        원본_departure: formData.departureDate,
        변환_departure: departureDateFormatted,
        원본_arrival: formData.arrivalDate,
        변환_arrival: arrivalDateFormatted
      });

      const packageData = {
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        region: formData.region,
        duration: formData.duration,
        price: parseInt(formData.price.replace(/[^0-9]/g, '')) || 0, // 정수만 추출하여 숫자형으로
        departure_date: departureDateFormatted,
        arrival_date: arrivalDateFormatted,
        max_people: formData.maxPeople,
        highlights: formData.highlights,
        status: 'published',
        included: formData.included,
        not_included: formData.notIncluded,
        insurance_notes: formData.insuranceNotes,
        customer_promise: formData.customerPromise,
        cancellation_policy: formData.cancellationPolicy,
        other_info: formData.otherInfo,

        // 일정 데이터 변환 (API 스키마에 맞게)
        itinerary: formData.itinerary.map((d, index) => ({
          day_number: index + 1, // 인덱스 기반으로 day_number 생성
          day_label: d.dayLabel, // dayLabel 필드 추가
          title: d.title,
          description: d.description,
          activities: d.activities,
          meals: d.meals,
          accommodation: d.accommodation,
        })),
      };

      let responsePackageId;

      if (isEdit && packageId) {
        // 수정 모드: PUT 요청
        await axios.put(`${BASE_URL}/api/packages/${packageId}`, packageData);
        responsePackageId = packageId;
        
        // 수정 모드에서도 이미지 처리
        if (formData.images.length > 0) {
          // 기존 이미지와 새로 추가된 이미지를 구분하여 처리
          const existingImages = formData.images.filter(img => img.id);
          const newImages = formData.images.filter(img => !img.id);
          
          console.log('수정 모드 - 기존 이미지:', existingImages);
          console.log('수정 모드 - 새 이미지:', newImages);
          
          // 기존 이미지 순서 업데이트
          if (existingImages.length > 0) {
            await axios.put(`${BASE_URL}/api/images/order`, {
              images: existingImages.map(img => ({
                id: img.id,
                display_order: img.display_order,
                image_type: img.image_type
              }))
            });
          }
          
          // 새로 추가된 이미지들 처리 (이미지 라이브러리에서 선택한 것들)
          // 기존 이미지 순서 업데이트
          if (existingImages.length > 0) {
            await axios.put(`${BASE_URL}/api/images/order`, {
              images: existingImages.map(img => ({
                id: img.id,
                display_order: img.display_order,
                image_type: img.image_type
              }))
            });
          }
          
          // 새로 추가된 이미지들 처리 (이미지 라이브러리에서 선택한 것들)
          for (const newImage of newImages) {
            await axios.post(`${BASE_URL}/api/packages/${packageId}/images`, {
              image_url: newImage.image_url,
              display_order: newImage.display_order,
              image_type: newImage.image_type
            });
          }
        }
        
        alert("상품이 수정되었습니다.");
        setCurrentPage(`package-detail-${packageId}`);
      } else {
        // 등록 모드: POST 요청
        const response = await axios.post(`${BASE_URL}/api/packages`, packageData);
        responsePackageId = response.data.id;

        // 이미지들을 상품과 연결
        if (formData.images.length > 0) {
          // 기존 이미지들 (직접 업로드한 것들) - package_id 업데이트
          const existingImages = formData.images.filter(img => img.id);
          if (existingImages.length > 0) {
            await axios.put(`${BASE_URL}/api/images/link/${responsePackageId}`, {
              images: existingImages.map(img => ({
                id: img.id,
                display_order: img.display_order,
                image_type: img.image_type
              }))
            });
          }
          
          // 새 이미지들 (이미지 라이브러리에서 선택한 것들) - 개별 추가
          const newImages = formData.images.filter(img => !img.id);
          for (const newImage of newImages) {
            await axios.post(`${BASE_URL}/api/packages/${responsePackageId}/images`, {
              image_url: newImage.image_url,
              display_order: newImage.display_order,
              image_type: newImage.image_type
            });
          }
        }

        alert("상품이 등록되었습니다.");
        // 옵션: 상세 페이지로 이동하거나 목록으로 이동
        setCurrentPage("pilgrimage-packages");
        // 또는 상세 페이지로: setCurrentPage(`package-detail-${responsePackageId}`);
      }
    } catch (error) {
      console.error('상품 저장 실패:', error);
      alert('상품 저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 로딩 상태
  if (loading && isEdit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">패키지 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
          <div>
            <h3 className="text-lg font-medium">오류가 발생했습니다</h3>
            <p className="text-muted-foreground">{error}</p>
          </div>
          <Button onClick={() => window.location.reload()}>
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

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
              {/* <Button variant="outline" size="sm">
                미리보기
              </Button> */}
              <Button 
                onClick={handleSubmit} 
                disabled={loading}
                className="flex items-center space-x-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span>{loading ? "저장 중..." : (isEdit ? "수정" : "등록")}</span>
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
                  <Label htmlFor="description">상품 설명</Label>
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
                      onChange={handlePriceChange}
                      placeholder="예: 2890000 (숫자만 입력)"
                    />
                    <p className="text-xs text-muted-foreground">
                      숫자만 입력하세요. 자동으로 포맷팅됩니다.
                    </p>
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
                <div className="flex gap-2 mb-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsImageLibraryOpen(true)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    이미지 라이브러리에서 선택
                  </Button>
                </div>
                <ImageUpload
                  images={formData.images}
                  onUpload={async (files) => {
                    try {
                      const uploadFormData = new FormData();
                      Array.from(files).forEach(file => {
                        uploadFormData.append('images', file);
                      });
                      // 등록 모드에서는 package_id를 전송하지 않음 (null로 처리)
                      if (isEdit && packageId) {
                        uploadFormData.append('package_id', packageId.toString());
                      }
                      uploadFormData.append('image_type', 'detail');

                      //const response = await axios.post(`${BASE_URL}/api/images`, uploadFormData, {
                      const response = await axios.post(`${BASE_URL}/api/images`, uploadFormData, {
                        headers: {
                          'Content-Type': 'multipart/form-data'
                        }
                      });

                      if (response.data.images) {
                        // 이미지 URL을 절대 경로로 변환하고 올바른 순서 설정
                        const currentImageCount = formData.images.length;
                        const imagesWithFullUrls = response.data.images.map((img: PackageImage, index: number) => ({
                          ...img,
                          image_url: `${BASE_URL}${img.image_url}`,
                          display_order: currentImageCount + index + 1 // 기존 이미지 개수 + 새 이미지 순서
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
                        //await axios.delete(`${BASE_URL}/api/images/${image.id}`);
                        await axios.delete(`${BASE_URL}/api/images/${image.id}`);
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
                      //  await axios.put(`${BASE_URL}/api/images/order`, {
                      await axios.put(`${BASE_URL}/api/images/order`, {
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
                        {index + 1}
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
                        // 입력 중에는 validation 없이 값만 업데이트
                        handleItineraryChange(index, "dayLabel", e.target.value);
                      }}
                      onBlur={(e) => {
                        // 포커스가 벗어날 때 validation 실행
                        const newValue = e.target.value;
                        const range = parseDayRange(newValue);
                        if (range === null) {
                          alert("잘못된 일차 범위입니다. 시작일이 종료일보다 작아야 합니다.");
                          // setTimeout을 사용하여 무한 루프 방지
                          setTimeout(() => {
                            e.target.focus();
                          }, 0);
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
                          // setTimeout을 사용하여 무한 루프 방지
                          setTimeout(() => {
                            e.target.focus();
                          }, 0);
                          return;
                        }
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

      {/* 이미지 라이브러리 모달 */}
      <ImageLibraryModal
        isOpen={isImageLibraryOpen}
        onClose={() => setIsImageLibraryOpen(false)}
        onSelectImage={(image) => handleImageLibrarySelect([image])}
        onSelectMultipleImages={handleImageLibrarySelect}
        selectedImages={formData.images
          .filter(img => !img.id) // 이미지 라이브러리에서 선택한 이미지들 (id가 없음)
          .map(img => ({
            id: 0, // 임시 ID
            filename: '',
            original_name: '',
            url: img.image_url,
            thumbnail_url: img.image_url,
            category: '',
            tags: [],
            usage_count: 0,
            created_at: ''
          }))}
        multiple={true}
      />
    </div>
  );
}