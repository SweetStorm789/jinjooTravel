import { Plus, Calendar, User, ChevronRight, Home, Eye, MessageCircle, Heart, Pin } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { useState } from "react";

interface FreeBoardPageProps {
  setCurrentPage: (page: string) => void;
  isAdmin?: boolean;
}

interface FreeBoardPost {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  views: number;
  likes: number;
  comments: number;
  isPinned: boolean;
  category: "일반" | "정보공유" | "모임" | "추천";
}

export default function FreeBoardPage({ setCurrentPage, isAdmin = false }: FreeBoardPageProps) {
  const [posts] = useState<FreeBoardPost[]>([
    {
      id: 1,
      title: "메주고리예 성지순례 후 나눔 모임 안내",
      author: "김베드로",
      date: "2024년 1월 15일",
      content: "지난달 메주고리예 성지순례를 다녀온 분들과 함께 은총 나눔 모임을 갖고자 합니다. 성모님께서 주신 특별한 체험들을 함께 나누어요.",
      views: 89,
      likes: 12,
      comments: 8,
      isPinned: true,
      category: "모임"
    },
    {
      id: 2,
      title: "성지순례 준비물 체크리스트 공유드려요",
      author: "이마리아",
      date: "2024년 1월 14일",
      content: "여러 번 성지순례를 다녀오면서 정리한 준비물 리스트입니다. 처음 가시는 분들께 도움이 되었으면 좋겠습니다.",
      views: 156,
      likes: 23,
      comments: 15,
      isPinned: false,
      category: "정보공유"
    },
    {
      id: 3,
      title: "파티마 성지에서 찍은 사진들 감상해주세요",
      author: "박요셉",
      date: "2024년 1월 13일",
      content: "파티마 성지에서 정말 아름다운 일몰을 보았어요. 성모님 발현 동굴에서의 기도시간도 너무 감동적이었습니다.",
      views: 203,
      likes: 34,
      comments: 22,
      isPinned: false,
      category: "일반"
    },
    {
      id: 4,
      title: "로마 성지순례 맛집 추천해드립니다",
      author: "정안나",
      date: "2024년 1월 12일",
      content: "로마에서 꼭 가봐야 할 맛집들을 정리해봤어요. 현지 가톨릭 신자분이 추천해주신 곳들이라 더욱 의미있었습니다.",
      views: 178,
      likes: 28,
      comments: 19,
      isPinned: false,
      category: "추천"
    },
    {
      id: 5,
      title: "성지순례 중 느낀 신앙의 변화",
      author: "최도미니코",
      date: "2024년 1월 11일",
      content: "아시시에서 성 프란치스코의 발자취를 따라가며 느낀 깊은 감동을 나누고 싶습니다. 정말 생명을 바꾸는 여행이었어요.",
      views: 134,
      likes: 45,
      comments: 12,
      isPinned: false,
      category: "일반"
    },
    {
      id: 6,
      title: "단체 성지순례 계획하시는 분들 계신가요?",
      author: "김신부",
      date: "2024년 1월 10일",
      content: "본당에서 성지순례를 계획하고 있는데 함께 하실 분들이 계시면 연락주세요. 더 의미있는 순례가 될 것 같습니다.",
      views: 92,
      likes: 15,
      comments: 6,
      isPinned: false,
      category: "모임"
    }
  ]);

  const getCategoryColor = (category: FreeBoardPost['category']) => {
    switch (category) {
      case "일반": return "bg-gray-100 text-gray-800";
      case "정보공유": return "bg-blue-100 text-blue-800";
      case "모임": return "bg-green-100 text-green-800";
      case "추천": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // 핀고정된 것부터 정렬
  const sortedPosts = [...posts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.id - a.id; // 최신순
  });

  return (
    <div className="bg-background min-h-screen">
      {/* 헤더 섹션 */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-medium text-foreground mb-2">
                자유게시판
              </h1>
              <p className="text-muted-foreground">
                성지순례 경험담, 정보 공유, 모임 안내 등 자유롭게 소통하는 공간입니다
              </p>
            </div>
            
            {/* 브레드크럼 */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Home className="h-4 w-4" />
              <ChevronRight className="h-4 w-4" />
              <span>게시판</span>
              <ChevronRight className="h-4 w-4" />
              <span>자유게시판</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 상단 액션 버튼 */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-medium">
            총 {posts.length}개의 글
          </h2>
          
          <Button 
            onClick={() => setCurrentPage("freeboard-form")}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>글쓰기</span>
          </Button>
        </div>

        {/* 게시글 리스트 */}
        <div className="space-y-4">
          {sortedPosts.map((post) => (
            <Card 
              key={post.id} 
              className={`overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.005] ${
                post.isPinned ? 'ring-2 ring-purple-200 bg-purple-50/30' : ''
              }`}
              onClick={() => setCurrentPage(`freeboard-detail-${post.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between space-x-4">
                  <div className="flex-1 space-y-3">
                    {/* 제목과 핀 아이콘 */}
                    <div className="flex items-center space-x-2">
                      {post.isPinned && (
                        <Pin className="h-4 w-4 text-purple-600 flex-shrink-0" />
                      )}
                      <h3 className="text-lg font-medium text-foreground hover:text-purple-600 transition-colors duration-200 line-clamp-1">
                        {post.title}
                      </h3>
                    </div>
                    
                    {/* 메타 정보 */}
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                    
                    {/* 내용 미리보기 */}
                    <p className="text-foreground leading-relaxed line-clamp-2">
                      {post.content}
                    </p>
                  </div>
                  
                  {/* 카테고리 배지 */}
                  <div className="flex-shrink-0">
                    <Badge className={getCategoryColor(post.category)}>
                      {post.category}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 커뮤니티 가이드라인 */}
        <div className="mt-12 bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-purple-900 mb-4">
            자유게시판 이용 안내
          </h3>
          <div className="space-y-2 text-sm text-purple-800">
            <p>• 서로를 존중하며 예의를 지켜주세요.</p>
            <p>• 성지순례와 관련된 정보 공유를 환영합니다.</p>
            <p>• 상업적 홍보나 광고성 글은 삭제될 수 있습니다.</p>
            <p>• 부적절한 내용이나 욕설은 금지됩니다.</p>
            <p>• 개인정보 보호를 위해 연락처 공개는 신중히 해주세요.</p>
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