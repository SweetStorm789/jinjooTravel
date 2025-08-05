import { Plus, Calendar, User, ChevronRight, Home, Eye, Pin } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { useState } from "react";

interface NoticesPageProps {
  setCurrentPage: (page: string) => void;
  isAdmin?: boolean;
}

interface Notice {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  views: number;
  isPinned: boolean;
  category: "공지" | "안내" | "이벤트";
}

export default function NoticesPage({ setCurrentPage, isAdmin = false }: NoticesPageProps) {
  const [notices] = useState<Notice[]>([
    {
      id: 1,
      title: "2024년 설날 연휴 영업시간 안내",
      author: "관리자",
      date: "2024년 1월 15일",
      content: "설날 연휴 기간 중 영업시간 변경에 대해 안내드립니다. 2월 9일(금)부터 2월 12일(월)까지는 휴무이며, 2월 13일(화)부터 정상 영업합니다.",
      views: 156,
      isPinned: true,
      category: "공지"
    },
    {
      id: 2,
      title: "메주고리예 성지순례 신규 상품 출시",
      author: "상품팀",
      date: "2024년 1월 10일",
      content: "평화의 모후 메주고리예 성지순례 7박 9일 상품이 새롭게 출시되었습니다. 특별가 이벤트도 함께 진행됩니다.",
      views: 243,
      isPinned: true,
      category: "이벤트"
    },
    {
      id: 3,
      title: "바티칸 & 로마 성지순례 예약 마감 임박",
      author: "예약팀",
      date: "2024년 1월 8일",
      content: "3월 출발 바티칸 & 로마 성지순례 상품의 예약이 거의 마감되었습니다. 참가를 원하시는 분들은 서둘러 예약해 주시기 바랍니다.",
      views: 189,
      isPinned: false,
      category: "안내"
    },
    {
      id: 4,
      title: "홈페이지 리뉴얼 완료 안내",
      author: "IT팀",
      date: "2024년 1월 5일",
      content: "고객 여러분께 더 나은 서비스를 제공하기 위해 홈페이지를 새롭게 리뉴얼하였습니다. 새로운 기능들을 확인해보세요.",
      views: 298,
      isPinned: false,
      category: "공지"
    },
    {
      id: 5,
      title: "2024년 성지순례 일정 및 요금 안내",
      author: "기획팀",
      date: "2024년 1월 3일",
      content: "2024년 한 해 동안 진행될 성지순례 상품들의 전체 일정과 요금을 안내드립니다. 조기 예약 할인 혜택도 확인하세요.",
      views: 412,
      isPinned: false,
      category: "안내"
    },
    {
      id: 6,
      title: "고객센터 운영시간 변경 안내",
      author: "고객서비스팀",
      date: "2023년 12월 28일",
      content: "더 나은 고객 서비스 제공을 위해 고객센터 운영시간이 변경됩니다. 평일 오전 9시부터 오후 6시까지 운영합니다.",
      views: 167,
      isPinned: false,
      category: "공지"
    }
  ]);

  // 공지사항을 핀고정된 것부터 정렬
  const sortedNotices = [...notices].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.id - a.id; // 최신순
  });

  const getCategoryColor = (category: Notice['category']) => {
    switch (category) {
      case "공지": return "bg-blue-100 text-blue-800";
      case "안내": return "bg-green-100 text-green-800";
      case "이벤트": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* 헤더 섹션 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-medium text-foreground mb-2">
                공지사항
              </h1>
              <p className="text-muted-foreground">
                진주여행사의 새로운 소식과 중요한 안내사항을 확인하세요
              </p>
            </div>
            
            {/* 브레드크럼 */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Home className="h-4 w-4" />
              <ChevronRight className="h-4 w-4" />
              <span>게시판</span>
              <ChevronRight className="h-4 w-4" />
              <span>공지사항</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 상단 액션 버튼 */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-medium">
            총 {notices.length}개의 공지사항
          </h2>
          
          {isAdmin && (
            <Button 
              onClick={() => setCurrentPage("notice-form")}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>새 공지사항 작성</span>
            </Button>
          )}
        </div>

        {/* 공지사항 리스트 */}
        <div className="space-y-4">
          {sortedNotices.map((notice) => (
            <Card 
              key={notice.id} 
              className={`overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.005] ${
                notice.isPinned ? 'ring-2 ring-blue-200 bg-blue-50/30' : ''
              }`}
              onClick={() => setCurrentPage(`notice-detail-${notice.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between space-x-4">
                  <div className="flex-1 space-y-3">
                    {/* 제목과 핀 아이콘 */}
                    <div className="flex items-center space-x-2">
                      {notice.isPinned && (
                        <Pin className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      )}
                      <h3 className="text-lg font-medium text-foreground hover:text-blue-600 transition-colors duration-200 line-clamp-1">
                        {notice.title}
                      </h3>
                    </div>
                    
                    {/* 메타 정보 */}
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{notice.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{notice.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{notice.views.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    {/* 내용 미리보기 */}
                    <p className="text-foreground leading-relaxed line-clamp-2">
                      {notice.content}
                    </p>
                  </div>
                  
                  {/* 카테고리 배지 */}
                  <div className="flex-shrink-0">
                    <Badge className={getCategoryColor(notice.category)}>
                      {notice.category}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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