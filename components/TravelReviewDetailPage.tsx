import { ArrowLeft, Calendar, User, Edit, Share2, Home, ChevronRight, Eye, Star, MapPin, Heart, Camera, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect } from "react";

interface TravelReviewDetailPageProps {
  setCurrentPage: (page: string) => void;
  reviewId: string;
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

export default function TravelReviewDetailPage({ 
  setCurrentPage, 
  reviewId,
  isAdmin = false 
}: TravelReviewDetailPageProps) {
  const [review, setReview] = useState<TravelReview | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 여행후기 데이터 로드
  useEffect(() => {
    const reviews: TravelReview[] = [
      {
        id: 1,
        title: "메주고리예 성지순례 - 평화와 은총이 가득한 여행",
        author: "김가톨릭",
        date: "2024년 1월 15일",
        content: `메주고리예에서의 일주일은 제 신앙생활에 새로운 전환점이 되었습니다. 

**여행 전 기대와 걱정**
처음 성지순례를 떠나면서 많은 기대와 함께 약간의 걱정도 있었습니다. 과연 제가 충분히 준비가 되었을까, 언어 소통은 괜찮을까 하는 걱정들이었죠.

**메주고리예 도착**
메주고리예에 도착했을 때의 그 평화로운 분위기는 지금도 잊을 수 없습니다. 공항에서부터 느껴지는 경건한 분위기와 따뜻한 환대가 인상깊었습니다.

**성 야고보 성당에서의 미사**
성 야고보 성당에서 드린 미사는 정말 특별했습니다. 세계 각국에서 온 순례자들과 함께 드리는 미사는 가톨릭의 보편성을 느끼게 해주었습니다. 특히 저녁 미사 후 성체조배 시간이 가장 은총이 넘쳤습니다.

**아파리션 힐(현현의 언덕)**
성모님이 처음 발현하신 아파리션 힐에 올라가는 길은 험했지만, 그 과정 자체가 기도였습니다. 정상에서 바라본 메주고리예 마을의 평화로운 풍경과 함께 성모님의 현존을 깊이 느낄 수 있었습니다.

**십자가의 길**
크리체벡 언덕의 십자가의 길은 정말 감동적이었습니다. 맨발로 오르는 현지인들의 모습을 보며 진정한 신앙이 무엇인지 깨달았습니다. 14처마다 묵상하며 주님의 수난을 새롭게 느꼈습니다.

**현지 가족과의 만남**
홈스테이로 머물렀던 현지 가족분들의 따뜻한 환대는 메주고리예 여행의 하이라이트였습니다. 언어는 달랐지만 신앙 안에서 하나가 되는 기쁨을 체험했습니다.

**돌아오며**
메주고리예에서의 일주일은 제게 새로운 신앙의 여정을 시작하게 해주었습니다. 성모님의 메시지대로 기도하고, 금식하고, 성경을 읽으며 살아가고 싶습니다.

이번 성지순례를 함께해주신 진주여행사와 동행 순례자분들께 감사드립니다. 메주고리예에서의 추억은 평생 제 마음 속에 살아있을 것입니다.`,
        views: 234,
        rating: 5,
        destination: "메주고리예",
        travelDate: "2023년 12월",
        category: "성지순례",
        images: [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1520637836862-4d197d17c915?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1539650116574-75c0c6d73fb6?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop"
        ],
        mainImageIndex: 0
      }
    ];

    const foundReview = reviews.find(r => r.id === parseInt(reviewId));
    if (foundReview) {
      setReview({ ...foundReview, views: foundReview.views + 1 });
      setCurrentImageIndex(foundReview.mainImageIndex);
    }
  }, [reviewId]);

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
        className={`h-5 w-5 ${
          i < rating 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const nextImage = () => {
    if (review && currentImageIndex < review.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  if (!review) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-4">여행후기를 찾을 수 없습니다</h2>
          <Button onClick={() => setCurrentPage("travel-reviews")}>
            목록으로 돌아가기
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
                onClick={() => setCurrentPage("travel-reviews")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>목록으로 돌아가기</span>
              </Button>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center space-x-2"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'text-red-500 fill-red-500' : ''}`} />
                <span>좋아요</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                <span>공유</span>
              </Button>
              {(isAdmin || review.author === "김가톨릭") && (
                <Button 
                  size="sm"
                  onClick={() => setCurrentPage(`travel-review-form-edit-${reviewId}`)}
                  className="flex items-center space-x-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>수정</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* 브레드크럼 */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Home className="h-4 w-4" />
          <ChevronRight className="h-4 w-4" />
          <span>게시판</span>
          <ChevronRight className="h-4 w-4" />
          <button 
            onClick={() => setCurrentPage("travel-reviews")}
            className="hover:text-blue-600 transition-colors"
          >
            여행후기
          </button>
          <ChevronRight className="h-4 w-4" />
          <span>후기 상세</span>
        </div>

        {/* 사진 갤러리 */}
        {review.images.length > 0 && (
          <Card className="mb-8">
            <CardContent className="p-0">
              <div className="relative">
                {/* 메인 이미지 */}
                <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={review.images[currentImageIndex]}
                    alt={`${review.title} - 사진 ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* 이미지 네비게이션 버튼 */}
                {review.images.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                      onClick={prevImage}
                      disabled={currentImageIndex === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                      onClick={nextImage}
                      disabled={currentImageIndex === review.images.length - 1}
                    >
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  </>
                )}
                
                {/* 이미지 카운터 */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full flex items-center space-x-1">
                  <Camera className="h-3 w-3" />
                  <span>{currentImageIndex + 1} / {review.images.length}</span>
                </div>
              </div>
              
              {/* 썸네일 네비게이션 */}
              {review.images.length > 1 && (
                <div className="p-4 bg-gray-50">
                  <div className="flex space-x-2 overflow-x-auto">
                    {review.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-all ${
                          currentImageIndex === index 
                            ? 'border-blue-500 scale-105' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <ImageWithFallback
                          src={image.replace('w=800&h=600', 'w=200&h=150')}
                          alt={`썸네일 ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* 여행후기 상세 내용 */}
        <Card>
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* 제목과 별점 */}
              <div>
                <h1 className="text-2xl font-medium text-foreground mb-4">
                  {review.title}
                </h1>
                
                {/* 별점 */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-lg font-medium text-foreground">
                    {review.rating}/5
                  </span>
                </div>
                
                {/* 메타 정보 */}
                <div className="flex items-center justify-between pb-6 border-b border-border">
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{review.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{review.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{review.destination}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span>{review.views.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getCategoryColor(review.category)}>
                      {review.category}
                    </Badge>
                    <Badge variant="outline">
                      {review.travelDate}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* 여행후기 내용 */}
              <div className="prose prose-lg max-w-none">
                <div className="text-foreground leading-relaxed whitespace-pre-line">
                  {review.content}
                </div>
              </div>

              {/* 하단 액션 */}
              <div className="pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    이 후기가 도움이 되셨나요?
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'text-red-500 fill-red-500' : ''}`} />
                      좋아요
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      공유하기
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 다른 여행후기들 */}
        <div className="mt-12">
          <h3 className="text-lg font-medium mb-6">다른 여행후기</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex space-x-3">
                  <div className="w-16 h-12 rounded-md overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=100&h=75&fit=crop"
                      alt="로마 바티칸"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-1 mb-2">
                      {renderStars(5)}
                    </div>
                    <h4 className="font-medium text-sm mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                      로마 & 바티칸 성지순례 후기 - 사도들의 발자취를 따라
                    </h4>
                    <p className="text-xs text-muted-foreground">박베드로 | 2024년 1월 12일</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex space-x-3">
                  <div className="w-16 h-12 rounded-md overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1520637836862-4d197d17c915?w=100&h=75&fit=crop"
                      alt="파티마"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-1 mb-2">
                      {renderStars(5)}
                    </div>
                    <h4 className="font-medium text-sm mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                      파티마 성지순례 - 성모님의 발현지에서의 기적 같은 체험
                    </h4>
                    <p className="text-xs text-muted-foreground">이루치아 | 2024년 1월 10일</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}