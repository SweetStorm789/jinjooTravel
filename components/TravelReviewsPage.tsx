import { Plus, Calendar, User, ChevronRight, Home, Eye, Star, MapPin, Camera } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

interface TravelReviewsPageProps {
  setCurrentPage: (page: string) => void;
  isAdmin?: boolean;
}

interface TravelReview {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  views: number;
  rating: number;
  destination: string;
  travelDate: string;
  category: "성지순례" | "개별여행" | "단체여행";
  images: string[];
  mainImageIndex: number;
}

export default function TravelReviewsPage({ setCurrentPage, isAdmin = false }: TravelReviewsPageProps) {
  const [reviews] = useState<TravelReview[]>([
    {
      id: 1,
      title: "메주고리예 성지순례 - 평화와 은총이 가득한 여행",
      author: "김가톨릭",
      date: "2024년 1월 15일",
      content: "메주고리예에서의 일주일은 제 신앙생활에 새로운 전환점이 되었습니다. 성모님의 현현지에서 느낀 평화와 은총은 말로 표현할 수 없을 정도였습니다. 특히 성 야고보 성당에서의 미사와 십자가의 길 기도는 깊은 감동을 주었습니다.",
      views: 234,
      rating: 5,
      destination: "메주고리예",
      travelDate: "2023년 12월",
      category: "성지순례",
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1520637836862-4d197d17c915?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73fb6?w=300&h=200&fit=crop"
      ],
      mainImageIndex: 0
    },
    {
      id: 2,
      title: "로마 & 바티칸 성지순례 후기 - 사도들의 발자취를 따라",
      author: "박베드로",
      date: "2024년 1월 12일",
      content: "로마와 바티칸에서의 성지순례는 초대교회의 역사를 직접 체험할 수 있는 소중한 시간이었습니다. 성 베드로 대성당에서의 교황님 알현과 콜로세움에서의 순교자들을 기억하는 기도시간이 특히 인상 깊었습니다.",
      views: 187,
      rating: 5,
      destination: "로마/바티칸",
      travelDate: "2023년 11월",
      category: "성지순례",
      images: [
        "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300&h=200&fit=crop"
      ],
      mainImageIndex: 0
    },
    {
      id: 3,
      title: "파티마 성지순례 - 성모님의 발현지에서의 기적 같은 체험",
      author: "이루치아",
      date: "2024년 1월 10일",
      content: "파티마 성모님 발현지에서의 순례는 제 마음에 깊은 변화를 가져다주었습니다. 로사리오 성당에서의 철야기도와 파티마 성모님께 올린 기도는 평생 잊지 못할 추억이 되었습니다.",
      views: 156,
      rating: 5,
      destination: "파티마",
      travelDate: "2023년 10월",
      category: "성지순례",
      images: [
        "https://images.unsplash.com/photo-1520637836862-4d197d17c915?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=200&fit=crop"
      ],
      mainImageIndex: 0
    },
    {
      id: 4,
      title: "루르드 성지 개별순례 - 치유와 은총의 샘터에서",
      author: "최베르나데트",
      date: "2024년 1월 8일",
      content: "루르드 성지에서의 개별순례는 조용히 성모님과 대화할 수 있는 시간이었습니다. 성수를 마시고 동굴에서 기도하며 많은 은총을 받았습니다. 가족의 건강을 위해 바친 기도가 응답받은 것 같습니다.",
      views: 143,
      rating: 4,
      destination: "루르드",
      travelDate: "2023년 9월",
      category: "개별여행",
      images: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1520637836862-4d197d17c915?w=300&h=200&fit=crop"
      ],
      mainImageIndex: 0
    },
    {
      id: 5,
      title: "아시시 성 프란치스코 성지순례 - 가난과 겸손의 길",
      author: "정프란치스코",
      date: "2024년 1월 5일",
      content: "아시시에서 성 프란치스코의 삶을 따라가며 진정한 가난과 겸손이 무엇인지 깨달았습니다. 산 다미아노 성당과 포르치운쿨라에서의 기도시간이 특별했습니다.",
      views: 167,
      rating: 5,
      destination: "아시시",
      travelDate: "2023년 8월",
      category: "성지순례",
      images: [
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73fb6?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=300&h=200&fit=crop"
      ],
      mainImageIndex: 0
    }
  ]);

  const getCategoryColor = (category: TravelReview['category']) => {
    switch (category) {
      case "성지순례": return "bg-blue-100 text-blue-800";
      case "개별여행": return "bg-green-100 text-green-800";
      case "단체여행": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-background min-h-screen">
      {/* 헤더 섹션 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-medium text-foreground mb-2">
                여행후기
              </h1>
              <p className="text-muted-foreground">
                진주여행사와 함께한 고객들의 소중한 여행 경험담을 확인하세요
              </p>
            </div>
            
            {/* 브레드크럼 */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Home className="h-4 w-4" />
              <ChevronRight className="h-4 w-4" />
              <span>게시판</span>
              <ChevronRight className="h-4 w-4" />
              <span>여행후기</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 상단 액션 버튼 */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-medium">
            총 {reviews.length}개의 여행후기
          </h2>
          
          <Button 
            onClick={() => setCurrentPage("travel-review-form")}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>후기 작성하기</span>
          </Button>
        </div>

        {/* 여행후기 리스트 */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <Card 
              key={review.id} 
              className="overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.005]"
              onClick={() => setCurrentPage(`travel-review-detail-${review.id}`)}
            >
              <CardContent className="p-0">
                <div className="flex">
                  {/* 대표사진 썸네일 */}
                  <div className="w-48 h-40 flex-shrink-0 relative">
                    <ImageWithFallback
                      src={review.images[review.mainImageIndex]}
                      alt={review.title}
                      className="w-full h-full object-cover"
                    />
                    {/* 사진 개수 표시 */}
                    <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                      <Camera className="h-3 w-3" />
                      <span>{review.images.length}</span>
                    </div>
                    {/* 카테고리 배지 */}
                    <div className="absolute top-3 left-3">
                      <Badge className={getCategoryColor(review.category)}>
                        {review.category}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* 텍스트 콘텐츠 */}
                  <div className="flex-1 p-6">
                    <div className="space-y-4">
                      {/* 제목과 별점 */}
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium text-foreground hover:text-blue-600 transition-colors duration-200 line-clamp-1">
                          {review.title}
                        </h3>
                        <div className="flex items-center space-x-1">
                          {renderStars(review.rating)}
                          <span className="text-sm text-muted-foreground ml-2">
                            ({review.rating}/5)
                          </span>
                        </div>
                      </div>
                      
                      {/* 여행 정보 */}
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{review.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{review.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{review.destination}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{review.views.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      {/* 내용 미리보기 */}
                      <p className="text-foreground leading-relaxed line-clamp-2">
                        {review.content}
                      </p>

                      {/* 여행일자 */}
                      <div className="text-sm text-muted-foreground">
                        여행일자: {review.travelDate}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 후기 작성 안내 */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4">
            여행후기 작성 안내
          </h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• 여행에서 찍은 사진과 함께 생생한 후기를 작성해주세요.</p>
            <p>• 사진은 개수 제한 없이 업로드할 수 있으며, 대표사진을 선택할 수 있습니다.</p>
            <p>• 다른 고객분들께 도움이 되는 구체적인 정보를 포함해주시면 더욱 좋습니다.</p>
            <p>• 개인정보나 연락처는 작성하지 마세요.</p>
          </div>
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">이전</Button>
            <div className="flex items-center space-x-1">
              <Button variant="default" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
            </div>
            <Button variant="outline" size="sm">다음</Button>
          </div>
        </div>
      </div>
    </div>
  );
}