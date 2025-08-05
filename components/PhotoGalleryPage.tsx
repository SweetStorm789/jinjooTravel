import { Plus, Calendar, User, ChevronRight, Home, Eye, Heart, MessageCircle, Camera, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

interface PhotoGalleryPageProps {
  setCurrentPage: (page: string) => void;
  isAdmin?: boolean;
}

interface PhotoPost {
  id: number;
  title: string;
  author: string;
  date: string;
  description: string;
  views: number;
  likes: number;
  comments: number;
  thumbnailUrl: string;
  imageCount: number;
  category: "성지순례" | "현지문화" | "자연경관" | "기타";
  location: string;
}

export default function PhotoGalleryPage({ setCurrentPage, isAdmin = false }: PhotoGalleryPageProps) {
  const [photos] = useState<PhotoPost[]>([
    {
      id: 1,
      title: "메주고리예 아파리션 힐에서의 일몰",
      author: "김순례",
      date: "2024년 1월 15일",
      description: "성모님이 발현하신 아파리션 힐에서 바라본 아름다운 일몰입니다. 그 순간 마음에 깊은 평화가 임했습니다.",
      views: 234,
      likes: 45,
      comments: 12,
      thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      imageCount: 8,
      category: "성지순례",
      location: "메주고리예, 보스니아"
    },
    {
      id: 2,
      title: "바티칸 성 베드로 대성당의 웅장함",
      author: "박베드로",
      date: "2024년 1월 14일",
      description: "세계 가톨릭의 중심지 바티칸 성 베드로 대성당의 아름다운 모습들을 담았습니다.",
      views: 189,
      likes: 38,
      comments: 15,
      thumbnailUrl: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=300&fit=crop",
      imageCount: 12,
      category: "성지순례",
      location: "바티칸"
    },
    {
      id: 3,
      title: "파티마 성모님 발현 동굴에서의 기도",
      author: "이루치아",
      date: "2024년 1월 13일",
      description: "파티마 성모님이 발현하신 동굴에서 세계 각국의 순례자들이 함께 기도하는 모습입니다.",
      views: 267,
      likes: 52,
      comments: 18,
      thumbnailUrl: "https://images.unsplash.com/photo-1520637836862-4d197d17c915?w=400&h=300&fit=crop",
      imageCount: 6,
      category: "성지순례",
      location: "파티마, 포르투갈"
    },
    {
      id: 4,
      title: "아시시 성 프란치스코 성당의 고요함",
      author: "정프란치스코",
      date: "2024년 1월 12일",
      description: "성 프란치스코의 고향 아시시에서 느낀 평화로운 순간들을 사진으로 담았습니다.",
      views: 156,
      likes: 34,
      comments: 9,
      thumbnailUrl: "https://images.unsplash.com/photo-1539650116574-75c0c6d73fb6?w=400&h=300&fit=crop",
      imageCount: 10,
      category: "성지순례",
      location: "아시시, 이탈리아"
    },
    {
      id: 5,
      title: "루르드 성수터에서 만난 기적",
      author: "최베르나데트",
      date: "2024년 1월 11일",
      description: "루르드 성모님의 샘터에서 많은 사람들이 치유의 은총을 구하는 모습들입니다.",
      views: 198,
      likes: 41,
      comments: 14,
      thumbnailUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      imageCount: 7,
      category: "성지순례",
      location: "루르드, 프랑스"
    },
    {
      id: 6,
      title: "로마 콜로세움과 순교자들의 발자취",
      author: "한스테파노",
      date: "2024년 1월 10일",
      description: "초대교회 순교자들이 신앙을 증거한 콜로세움에서의 감동적인 순간들입니다.",
      views: 143,
      likes: 29,
      comments: 8,
      thumbnailUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop",
      imageCount: 9,
      category: "성지순례",
      location: "로마, 이탈리아"
    },
    {
      id: 7,
      title: "이탈리아 토스카나의 아름다운 풍경",
      author: "조안나",
      date: "2024년 1월 9일",
      description: "성지순례 중 만난 토스카나 지역의 목가적인 풍경들입니다.",
      views: 178,
      likes: 33,
      comments: 11,
      thumbnailUrl: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=300&fit=crop",
      imageCount: 15,
      category: "자연경관",
      location: "토스카나, 이탈리아"
    },
    {
      id: 8,
      title: "현지 가톨릭 문화와 전통 음식",
      author: "윤마르타",
      date: "2024년 1월 8일",
      description: "성지순례 중 경험한 현지의 가톨릭 문화와 전통 음식들을 소개합니다.",
      views: 134,
      likes: 26,
      comments: 7,
      thumbnailUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      imageCount: 11,
      category: "현지문화",
      location: "유럽 여러 지역"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const getCategoryColor = (category: PhotoPost['category']) => {
    switch (category) {
      case "성지순례": return "bg-blue-100 text-blue-800";
      case "현지문화": return "bg-green-100 text-green-800";
      case "자연경관": return "bg-purple-100 text-purple-800";
      case "기타": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredPhotos = photos.filter(photo =>
    photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    photo.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-background min-h-screen">
      {/* 헤더 섹션 */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-medium text-foreground mb-2">
                포토갤러리
              </h1>
              <p className="text-muted-foreground">
                성지순례의 아름다운 순간들을 사진으로 나누어보세요
              </p>
            </div>
            
            {/* 브레드크럼 */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Home className="h-4 w-4" />
              <ChevronRight className="h-4 w-4" />
              <span>게시판</span>
              <ChevronRight className="h-4 w-4" />
              <span>포토갤러리</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 상단 컨트롤 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h2 className="text-xl font-medium">
            총 {filteredPhotos.length}개의 사진
          </h2>
          
          <div className="flex items-center space-x-4">
            {/* 검색 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="사진 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            {/* 업로드 버튼 */}
            <Button 
              onClick={() => setCurrentPage("photo-gallery-form")}
              className="flex items-center space-x-2"
            >
              <Camera className="h-4 w-4" />
              <span>사진 업로드</span>
            </Button>
          </div>
        </div>

        {/* 포토 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <Card 
              key={photo.id} 
              className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105"
              onClick={() => setCurrentPage(`photo-gallery-detail-${photo.id}`)}
            >
              <div className="relative">
                {/* 썸네일 이미지 */}
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                {/* 이미지 개수 배지 */}
                <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                  <Camera className="h-3 w-3" />
                  <span>{photo.imageCount}</span>
                </div>
                
                {/* 카테고리 배지 */}
                <div className="absolute top-3 left-3">
                  <Badge className={getCategoryColor(photo.category)}>
                    {photo.category}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* 제목 */}
                  <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-amber-600 transition-colors">
                    {photo.title}
                  </h3>
                  
                  {/* 위치 */}
                  <p className="text-sm text-muted-foreground flex items-center space-x-1">
                    <Camera className="h-3 w-3" />
                    <span>{photo.location}</span>
                  </p>
                  
                  {/* 메타 정보 */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{photo.author}</span>
                    </div>
                    <span>{photo.date}</span>
                  </div>
                  
                  {/* 상호작용 정보 */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{photo.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span>{photo.likes}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{photo.comments}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 포토갤러리 이용 안내 */}
        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-amber-900 mb-4">
            포토갤러리 이용 안내
          </h3>
          <div className="space-y-2 text-sm text-amber-800">
            <p>• 성지순례 및 여행 관련 사진만 업로드해주세요.</p>
            <p>• 사진에 대한 간단한 설명을 함께 작성해주시면 더욱 좋습니다.</p>
            <p>• 개인이 식별될 수 있는 사진은 업로드 시 주의해주세요.</p>
            <p>• 저작권이 있는 사진은 업로드하지 마세요.</p>
            <p>• 부적절한 내용의 사진은 관리자에 의해 삭제될 수 있습니다.</p>
          </div>
        </div>

        {/* 검색 결과가 없을 때 */}
        {filteredPhotos.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">검색 결과가 없습니다</h3>
            <p className="text-muted-foreground mb-4">
              "{searchTerm}"에 대한 사진을 찾을 수 없습니다.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setSearchTerm("")}
            >
              전체 사진 보기
            </Button>
          </div>
        )}

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