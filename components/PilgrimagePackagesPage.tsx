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
import { useState } from "react";

interface PilgrimagePackagesPageProps {
  setCurrentPage: (page: string) => void;
  isAdmin?: boolean;
  initialRegion?: string;
}

export default function PilgrimagePackagesPage({ setCurrentPage, isAdmin = false, initialRegion = "all" }: PilgrimagePackagesPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [selectedDuration, setSelectedDuration] = useState("all");

  const packages = [
    {
      id: 1,
      title: "바티칸 & 로마 성지순례",
      subtitle: "가톨릭의 중심지에서 만나는 신앙의 뿌리",
      description: "베드로 대성당, 시스티나 성당, 바티칸 박물관과 로마의 주요 성지들을 방문하는 특별한 순례",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=800&auto=format&fit=crop",
      duration: "7박 8일",
      price: "2,890,000원",
      region: "유럽",
      highlights: ["베드로 대성당", "시스티나 성당", "산 조반니 라테라노 대성당", "산타 마리아 마조레 대성당"],
      departureDate: "2024년 3월 15일",
      arrivalDate: "2024년 3월 22일",
      maxPeople: 25,
    },
    {
      id: 2,
      title: "이탈리아 전체 성지순례",
      subtitle: "아시시에서 파두아까지, 이탈리아 성인들의 발자취",
      description: "성 프란치스코의 아시시, 성 안토니오의 파두아, 성 비오 신부의 산조반니로톤도까지",
      image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=800&auto=format&fit=crop",
      duration: "10박 11일",
      price: "3,590,000원",
      region: "유럽",
      highlights: ["아시시 성 프란치스코 대성당", "산조반니로톤도", "로레토 성모 성당", "란치아노 성체기적지"],
      departureDate: "2024년 4월 20일",
      arrivalDate: "2024년 4월 30일",
      maxPeople: 20,
    },
    {
      id: 3,
      title: "성지 이스라엘 순례",
      subtitle: "예수님의 발자취를 따라가는 거룩한 여정",
      description: "베들레헴, 나사렛, 갈릴리 호수, 예루살렘의 주요 성지들을 방문하는 감동적인 순례",
      image: "https://images.unsplash.com/photo-1544637112-6e4174881c80?q=80&w=800&auto=format&fit=crop",
      duration: "8박 9일",
      price: "2,990,000원",
      region: "이스라엘",
      highlights: ["베들레헴 예수 탄생교회", "나사렛 수태고지 성당", "갈릴리 호수", "예루살렘 성묘교회"],
      departureDate: "2024년 3월 25일",
      arrivalDate: "2024년 4월 2일",
      maxPeople: 30,
    },
    {
      id: 4,
      title: "스페인 순례길 & 성지순례",
      subtitle: "산티아고 순례길과 스페인 주요 성지 탐방",
      description: "산티아고 데 콤포스텔라 순례길과 아빌라, 세고비아 등 스페인 성인들의 성지 방문",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop",
      duration: "9박 10일",
      price: "3,290,000원",
      region: "유럽",
      highlights: ["산티아고 대성당", "아빌라 성 테레사 성지", "사그라다 파밀리아", "몬세라트 수도원"],
      departureDate: "2024년 5월 10일",
      arrivalDate: "2024년 5월 19일",
      maxPeople: 22,
    },
    {
      id: 5,
      title: "그리스 사도 바울로 순례",
      subtitle: "사도 바울로의 전도여행 경로를 따라",
      description: "아테네, 코린토스, 테살로니키 등 사도 바울로가 복음을 전한 그리스 주요 도시들",
      image: "https://images.unsplash.com/photo-1555993539-1732b0258048?q=80&w=800&auto=format&fit=crop",
      duration: "7박 8일",
      price: "2,690,000원",
      region: "유럽",
      highlights: ["아테네 아레오파고스", "코린토스 고고학 유적지", "테살로니키", "파트모스 섬"],
      departureDate: "2024년 4월 5일",
      arrivalDate: "2024년 4월 12일",
      maxPeople: 25,
    },
    {
      id: 6,
      title: "이집트 성가족 피난길",
      subtitle: "성가족이 걸었던 이집트 피난길을 따라",
      description: "카이로, 시나이산, 알렉산드리아를 통해 성가족의 이집트 피난 여정을 체험",
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?q=80&w=800&auto=format&fit=crop",
      duration: "8박 9일",
      price: "3,190,000원",
      region: "아시아",
      highlights: ["시나이산", "성녀 카타리나 수도원", "올드 카이로", "알렉산드리아"],
      departureDate: "2024년 6월 1일",
      arrivalDate: "2024년 6월 9일",
      maxPeople: 20,
    },
    {
      id: 7,
      title: "프랑스 루르드 순례",
      subtitle: "성모 마리아의 발현지 루르드와 리지외 성녀 테레사",
      description: "루르드 성모 발현지와 리지외의 성녀 테레사 성지를 방문하는 은총의 순례",
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop",
      duration: "6박 7일",
      price: "2,490,000원",
      region: "유럽",
      highlights: ["루르드 성모 동굴", "베르나데트 성녀 유적", "리지외 테레사 성당", "몽마르트르 언덕"],
      departureDate: "2024년 5월 25일",
      arrivalDate: "2024년 5월 31일",
      maxPeople: 28,
    },
    {
      id: 8,
      title: "튀르키예 일곱 교회 순례",
      subtitle: "요한 묵시록의 일곱 교회와 사도 바울로의 발자취",
      description: "에페소스, 스미르나 등 요한 묵시록에 등장하는 일곱 교회와 사도 바울로 유적지 탐방",
      image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=800&auto=format&fit=crop",
      duration: "8박 9일",
      price: "2,790,000원",
      region: "아시아",
      highlights: ["에페소스 유적지", "파묵칼레", "카파도키아", "성 소피아 대성당"],
      departureDate: "2024년 4월 15일",
      arrivalDate: "2024년 4월 23일",
      maxPeople: 24,
    },
    {
      id: 9,
      title: "한국 가톨릭 성지순례",
      subtitle: "한국 순교성인들의 발자취와 성모님 발현지",
      description: "서울 명동성당, 절두산 순교성지, 강화 갑곶순교성지, 노트르담 수녀원 등 한국 가톨릭 성지 순례",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop",
      duration: "4박 5일",
      price: "890,000원",
      region: "국내",
      highlights: ["명동성당", "절두산 순교성지", "강화 갑곶순교성지", "노트르담 수녀원"],
      departureDate: "2024년 6월 15일",
      arrivalDate: "2024년 6월 19일",
      maxPeople: 35,
    }
  ];

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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
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
            
            <Select value={selectedDuration} onValueChange={setSelectedDuration}>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPackages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer" onClick={() => setCurrentPage(`package-detail-${pkg.id}`)}>
                <div className="relative">
                  <div className="aspect-[16/10] overflow-hidden">
                    <ImageWithFallback
                      src={pkg.image}
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
                        {pkg.highlights.slice(0, 3).map((highlight, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                        {pkg.highlights.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{pkg.highlights.length - 3}
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
                        <span className="text-sm">최대 {pkg.maxPeople}명</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Plane className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">항공포함</span>
                      </div>
                    </div>
                    
                    {/* 가격 */}
                    <div className="pt-4 border-t border-border">
                      <p className="text-lg font-medium">{pkg.price}</p>
                      <p className="text-xs text-muted-foreground">1인 기준, 세금 포함</p>
                    </div>
                    
                    {/* 출발일 및 도착일 */}
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>출발일: {pkg.departureDate}</div>
                      <div>도착일: {pkg.arrivalDate}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 더 보기 버튼 */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            더 많은 상품 보기
          </Button>
        </div>

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