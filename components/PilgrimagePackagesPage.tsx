import {
  MapPin,
  Calendar,
  Users,
  Clock,
  Filter,
  Search,
  Plane,
  Cross,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from '@/lib/constants';

interface PilgrimagePackage {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image_url?: string;
  duration: string;
  price: string;
  region: string;
  highlights: string;
  departure_date: string;
  arrival_date: string;
  max_people: number;
  status: 'draft' | 'published' | 'closed';
}

interface PilgrimagePackagesPageProps {
  setCurrentPage: (page: string) => void;
  isAdmin?: boolean;
  initialRegion?: string;
}

export default function PilgrimagePackagesPage({ setCurrentPage, isAdmin = false, initialRegion = "all" }: PilgrimagePackagesPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [packages, setPackages] = useState<PilgrimagePackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(9);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setIsLoading(true);
        // const response = await axios.get('http://localhost:5000/api/packages');
        const response = await axios.get(`${BASE_URL}/api/packages`);
        console.log('Fetched packages:', response.data);

        const featuredPackages = response.data
        .map((pkg: any) => {
          console.log('Package images:', pkg.images); // 이미지 데이터 확인
          
          // 메인 이미지 찾기
          const mainImage = pkg.images?.find((img: any) => img.image_type === 'main');
          const firstImage = pkg.images?.[0];
          const imageObj = mainImage || firstImage;
          
            // 파일명 안전 추출
          const filename = imageObj?.image_url?.split?.('/')?.pop?.();
          const relativeImagePath = filename ? `/uploads/${filename}` : undefined;

          // 이미지 URL 로깅
          if (imageObj) {
            console.log('Selected image:', imageObj);
            console.log('Full image URL:', `${BASE_URL}/uploads/${imageObj.image_url.split('/').pop()}`);
          }

          return {
            id: pkg.id,
            title: pkg.title,
            subtitle: pkg.subtitle,
            region: pkg.region,
            duration: pkg.duration,
            price: pkg.price,
            image_url: relativeImagePath,
            status: pkg.status,
            max_people: pkg.max_people,
            rating: 4.8, // 임시 평점
            reviews: Math.floor(Math.random() * 300) + 100 // 임시 리뷰 수
          };
        });


        setPackages(featuredPackages);
      } catch (error) {
        console.error('Failed to fetch packages:', error);
        setError('상품 목록을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">상품 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-xl">{error}</div>
          <Button onClick={() => window.location.reload()}>다시 시도</Button>
        </div>
      </div>
    );
  }

  // 안전한 날짜 포매터
  const formatDate = (dateString?: string) => {
    if (!dateString) return '미정';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '미정';
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  // 만원 단위 표시 포매터
  const formatPrice = (price: string | number) => {
    let numericPrice: number;

    if (typeof price === 'string') {
      numericPrice = parseFloat(price.replace(/,/g, '')); // 소수점 유지
    } else {
      numericPrice = price ?? 0;
    }

    // 만원 단위로 변환
    const manWon = Math.round(numericPrice / 10000);
    return `${manWon}만원`;
  };

  // 안전한 하이라이트 파서
  const getHighlights = (highlightsString?: string): string[] => {
    if (!highlightsString || typeof highlightsString !== 'string') return [];
    return highlightsString
      .split('\n')
      .map(h => h.trim())
      .filter(Boolean);
  };

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === "all" || pkg.region === selectedRegion;
    const matchesDuration = selectedDuration === "all" || 
                           (selectedDuration === "short" && pkg.duration.includes("7박") || pkg.duration.includes("6박")) ||
                           (selectedDuration === "medium" && (pkg.duration.includes("8박") || pkg.duration.includes("9박"))) ||
                           (selectedDuration === "long" && (pkg.duration.includes("10박") || pkg.duration.includes("11박")));
    
    return matchesSearch && matchesRegion && matchesDuration;
  });

  return (
    <div className="bg-background min-h-screen">
      {/* 헤더 섹션 */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Cross className="h-3 w-3" />
                <span>가톨릭 성지순례</span>
              </Badge>
              <Badge variant="outline">전문여행사</Badge>
              <Badge variant="outline">20년 경험</Badge>
            </div>
            
            <h1 className="text-4xl font-medium text-foreground mb-4">
              가톨릭 성지순례 상품
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              하느님의 은총이 깃든 성지들을 방문하여 신앙을 깊게 하고 영적 성장을 경험하는 특별한 여정입니다.
            </p>
            
            <div className="flex items-center justify-center space-x-8 pt-6 border-t border-border mt-8">
              <div className="text-center">
                <div className="text-2xl font-medium">20+</div>
                <div className="text-sm text-muted-foreground">년 경험</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-medium">8</div>
                <div className="text-sm text-muted-foreground">개 국가</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-medium">5,000+</div>
                <div className="text-sm text-muted-foreground">순례자들</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 검색 및 필터 섹션 */}
        <div className="bg-card rounded-lg p-6 mb-8 border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="순례 상품 검색..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setVisibleCount(9);
                }}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedRegion} onValueChange={(value) => {
              setSelectedRegion(value);
              setVisibleCount(9);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="지역 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 지역</SelectItem>
                <SelectItem value="유럽">유럽</SelectItem>
                <SelectItem value="아시아">아시아</SelectItem>
                <SelectItem value="국내">국내</SelectItem>
                <SelectItem value="이스라엘">이스라엘</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedDuration} onValueChange={(value) => {
              setSelectedDuration(value);
              setVisibleCount(9);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="기간 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 기간</SelectItem>
                <SelectItem value="short">단기 (6-7일)</SelectItem>
                <SelectItem value="medium">중기 (8-9일)</SelectItem>
                <SelectItem value="long">장기 (10일 이상)</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>고급 필터</span>
            </Button>
          </div>
        </div>

        {/* 상품 리스트 */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium">
              총 {filteredPackages.length}개의 순례 상품
            </h2>
            <div className="flex items-center space-x-4">
              {/* 관리자 권한 체크 - 관리자에게만 등록 버튼 표시 */}
              {isAdmin && (
                <Button 
                  onClick={() => setCurrentPage("package-form")}
                  className="flex items-center space-x-2"
                >
                  <span>새 상품 등록</span>
                </Button>
              )}
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">정렬:</span>
                <Select defaultValue="popular">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">인기순</SelectItem>
                    <SelectItem value="price-low">가격 낮은순</SelectItem>
                    <SelectItem value="price-high">가격 높은순</SelectItem>
                    <SelectItem value="duration">기간순</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.slice(0, visibleCount).map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer" onClick={() => setCurrentPage(`package-detail/${pkg.id}`)}>
                <div className="relative">
                  <div className="aspect-[16/10] overflow-hidden">
                    <ImageWithFallback
                      src={pkg.image_url ? `${BASE_URL}${pkg.image_url}` : '/placeholder-image.jpg'}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* 지역 배지 */}
                    <Badge variant="secondary" className="text-xs">
                      <MapPin className="h-3 w-3 mr-1" />
                      {pkg.region}
                    </Badge>
                    
                    {/* 제목과 부제목 */}
                    <div>
                      <h3 className="font-medium text-lg mb-1">{pkg.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{pkg.subtitle}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{pkg.description}</p>
                    </div>
                    
                    {/* 주요 포인트 */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">주요 방문지</p>
                      <div className="flex flex-wrap gap-1">
                        {getHighlights(pkg.highlights).slice(0, 3).map((highlight, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                        {getHighlights(pkg.highlights).length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{getHighlights(pkg.highlights).length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {/* 여행 정보 */}
                    <div className="grid grid-cols-3 gap-4 py-3 border-t border-border">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{pkg.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">최대 {pkg.max_people}명</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Plane className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">항공포함</span>
                      </div>
                    </div>
                    
                    {/* 가격 */}
                    <div className="pt-4 border-t border-border">
                      <p className="text-lg font-medium">{formatPrice(pkg.price)}</p>
                      <p className="text-xs text-muted-foreground">1인 기준, 세금 포함</p>
                    </div>
                    
                    {/* 출발일 및 도착일 */}
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>출발일: {formatDate(pkg.departure_date)}</div>
                      <div>도착일: {formatDate(pkg.arrival_date)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 더 보기 버튼 */}
        {filteredPackages.length > visibleCount && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8"
              onClick={() => setVisibleCount(prev => prev + 9)}
            >
              더 많은 상품 보기
            </Button>
          </div>
        )}

        {/* 상담 문의 섹션 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mt-12">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-medium">맞춤 순례 상담</h3>
            <p className="text-muted-foreground">
              원하시는 성지나 특별한 요청사항이 있으시면 언제든 상담해 드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                전화 상담 신청
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                온라인 상담
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              상담 시간: 평일 09:00 - 18:00 | 전화: 02-1234-5678
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}