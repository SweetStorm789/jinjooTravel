import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  MapPin,
  Calendar,
  Users,
  Plane,
  Clock,
  ArrowLeft,
  Star,
  Heart,
  Share2,
  Trash2,
  ChevronLeft,
  ChevronRight,
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
import { useState, useEffect, useCallback } from "react";
import { formatDateToKorean } from "../utils/dateFormat";
import { ErrorBoundary } from "./shared/ErrorBoundary";
import { BASE_URL } from '@/lib/constants';

interface PackageData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  region: string;
  duration: string;
  price: string;
  departureDate: string;
  arrivalDate: string;
  maxPeople: number;
  currentBookings: number;
  highlights: string[];
  images: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    activities: string[];
    meals: string;
    accommodation: string;
  }[];
  included: string[];
  notIncluded: string[];
  insuranceNotes: string;
  customerPromise: string;
  cancellationPolicy: string;
  otherInfo: string;
}

interface PilgrimagePackageDetailPageProps {
  setCurrentPage: (page: string) => void;
  packageId?: string;
  isAdmin?: boolean;
}

function PilgrimagePackageDetailPage({ 
  setCurrentPage, 
  packageId = "1",
  isAdmin = false
}: PilgrimagePackageDetailPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  
  const [packageData, setPackageData] = useState<PackageData | null>(null);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        setLoading(true);
        //const response = await fetch(`${BASE_URL}/api/packages/${packageId}`);
        const response = await fetch(`${BASE_URL}/api/packages/${packageId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch package data');
        }
        const data = await response.json();
        
        // 디버깅을 위해 데이터 로깅
        console.log('Raw data:', data);
        
        // 문자열을 배열로 변환하는 함수
        const parseTextToArray = (text: string | null | undefined, defaultValue: any[] = []): any[] => {
          if (!text) return defaultValue;
          
          // 이미 JSON 배열인 경우 파싱 시도
          if (text.startsWith('[') && text.endsWith(']')) {
            try {
              const parsed = JSON.parse(text);
              return Array.isArray(parsed) ? parsed : defaultValue;
            } catch (e) {
              console.log('Not a valid JSON array, treating as text');
            }
          }
          
          // 일반 텍스트를 줄바꿈으로 분리
          return text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        };

        // highlights 처리
        const highlights = parseTextToArray(data.highlights);

        // included 처리
        const included = parseTextToArray(data.included);

        // not_included 처리
        const notIncluded = parseTextToArray(data.not_included);

        // itinerary 처리
        const itinerary = (data.itineraries || []).map((day: any) => {
          return {
            day: day.day_number,
            title: day.title || '',
            description: day.description || '',
            activities: parseTextToArray(day.activities),
            meals: day.meals || '',
            accommodation: day.accommodation || ''
          };
        });

        // API 응답 데이터를 UI에 맞게 변환
        setPackageData({
          id: data.id,
          title: data.title,
          subtitle: data.subtitle,
          description: data.description,
          region: data.region,
          duration: data.duration,
          price: new Intl.NumberFormat('ko-KR').format(data.price) + '원',
          departureDate: formatDateToKorean(data.departure_date),
          arrivalDate: formatDateToKorean(data.arrival_date),
          maxPeople: data.max_people,
          currentBookings: data.current_bookings || 0,
          highlights,
          images: data.images.map((img: any) => img.image_url),
          itinerary,
          included,
          notIncluded,
          insuranceNotes: data.insurance_notes || '',
          customerPromise: data.customer_promise || '',
          cancellationPolicy: data.cancellation_policy || '',
          otherInfo: data.other_info || ''
        });
      } catch (err) {
        console.error('Error in fetchPackageData:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (packageId) {
      fetchPackageData();
    }
  }, [packageId]);

  // 삭제 함수
  const handleDelete = async () => {
    if (!packageId) return;
    
    const confirmDelete = window.confirm(
      `"${packageData?.title}" 성지순례 일정을 정말 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.`
    );
    
    if (!confirmDelete) return;
    
    try {
      setDeleting(true);
      
      const response = await fetch(`${BASE_URL}/api/packages/${packageId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete package');
      }
      
      alert('성지순례 일정이 성공적으로 삭제되었습니다.');
      setCurrentPage('pilgrimage-packages');
    } catch (error) {
      console.error('Error deleting package:', error);
      alert('성지순례 일정 삭제에 실패했습니다.');
    } finally {
      setDeleting(false);
    }
  };

  // 이미지 네비게이션 함수
  const goToPreviousImage = useCallback(() => {
    if (!packageData?.images.length) return;
    setSelectedImageIndex((prev) => 
      prev === 0 ? packageData.images.length - 1 : prev - 1
    );
  }, [packageData?.images.length]);

  const goToNextImage = useCallback(() => {
    if (!packageData?.images.length) return;
    setSelectedImageIndex((prev) => 
      prev === packageData.images.length - 1 ? 0 : prev + 1
    );
  }, [packageData?.images.length]);

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!packageData?.images.length || packageData.images.length <= 1) return;
      
      if (event.key === 'ArrowLeft') {
        goToPreviousImage();
      } else if (event.key === 'ArrowRight') {
        goToNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [packageData?.images.length, goToPreviousImage, goToNextImage]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="space-y-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">패키지 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="space-y-4 text-center">
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

  if (!packageData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="space-y-4 text-center">
          <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto" />
          <div>
            <h3 className="text-lg font-medium">패키지를 찾을 수 없습니다</h3>
            <p className="text-muted-foreground">요청하신 패키지 정보가 존재하지 않습니다.</p>
          </div>
          <Button onClick={() => setCurrentPage("pilgrimage-packages")}>
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  // 패키지 데이터가 있을 때만 렌더링
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
              {/* 관리자 권한 체크 - 관리자에게만 수정/삭제 버튼 표시 */}
              {isAdmin && (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(`package-form-edit-${packageId}`)}
                    className="flex items-center space-x-2"
                  >
                    <span>수정</span>
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex items-center space-x-2"
                  >
                    {deleting ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                    <span>{deleting ? "삭제 중..." : "삭제"}</span>
                  </Button>
                </>
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
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg group">
                  <ImageWithFallback
                    src={packageData.images[selectedImageIndex]}
                    alt={packageData.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* 이미지가 2개 이상일 때만 네비게이션 버튼 표시 */}
                  {packageData.images.length > 1 && (
                    <>
                      {/* 이전 버튼 */}
                      <button
                        onClick={goToPreviousImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        aria-label="이전 이미지"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      
                      {/* 다음 버튼 */}
                      <button
                        onClick={goToNextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        aria-label="다음 이미지"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                      
                      {/* 이미지 인디케이터 */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {packageData.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              selectedImageIndex === index 
                                ? "bg-white" 
                                : "bg-white/50 hover:bg-white/70"
                            }`}
                            aria-label={`이미지 ${index + 1}로 이동`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                {/* 썸네일 그리드 */}
                <div className="grid grid-cols-4 gap-2">
                  {packageData.images.map((image: string, index: number) => (
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
                    {packageData.highlights.map((highlight: string, index: number) => (
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
                    {packageData.itinerary.map((day: PackageData['itinerary'][0]) => (
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
                              {day.activities.map((activity: string, index: number) => (
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
                          {packageData.insuranceNotes}
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
                  <CardTitle>순례 정보</CardTitle>
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
{/*}
                  <div className="space-y-3">
   ㄴ                 <Button className="w-full" size="lg">
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
*/}
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground leading-relaxed space-y-1">
                      <div>• 예약 문의: 02-1234-5678</div>
                      <div>• 상담 시간: 평일 09:00-18:00</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 예약 현황 
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
              */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PilgrimagePackageDetailPageWithErrorBoundary(props: PilgrimagePackageDetailPageProps) {
  return (
    <ErrorBoundary>
      <PilgrimagePackageDetailPage {...props} />
    </ErrorBoundary>
  );
}