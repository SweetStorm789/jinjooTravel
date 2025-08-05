import { ArrowLeft, Calendar, User, Edit, Share2, Home, ChevronRight, Eye, Pin } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { useState, useEffect } from "react";

interface NoticeDetailPageProps {
  setCurrentPage: (page: string) => void;
  noticeId: string;
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

export default function NoticeDetailPage({ 
  setCurrentPage, 
  noticeId,
  isAdmin = false 
}: NoticeDetailPageProps) {
  const [notice, setNotice] = useState<Notice | null>(null);

  // 공지사항 데이터 로드
  useEffect(() => {
    // 실제로는 API에서 데이터를 가져올 예정
    const notices: Notice[] = [
      {
        id: 1,
        title: "2024년 설날 연휴 영업시간 안내",
        author: "관리자",
        date: "2024년 1월 15일",
        content: `안녕하세요, 진주여행사입니다.

2024년 설날 연휴 기간 중 영업시간 변경에 대해 안내드립니다.

**휴무 기간**
- 2024년 2월 9일(금) ~ 2월 12일(월)

**정상 영업 재개**
- 2024년 2월 13일(화)부터 정상 영업

휴무 기간 중에는 전화 상담이 불가하며, 홈페이지를 통한 문의는 정상 영업일에 순차적으로 답변드리겠습니다.

고객 여러분의 양해를 부탁드리며, 새해 복 많이 받으시기 바랍니다.

감사합니다.`,
        views: 156,
        isPinned: true,
        category: "공지"
      },
      {
        id: 2,
        title: "메주고리예 성지순례 신규 상품 출시",
        author: "상품팀",
        date: "2024년 1월 10일",
        content: `평화의 모후 메주고리예 성지순례 7박 9일 상품이 새롭게 출시되었습니다.

**상품 특징**
- 메주고리예 성모 발현지 순례
- 현지 가톨릭 가이드와 함께하는 깊이 있는 순례
- 성모님의 메시지를 묵상하는 시간 제공

**특별가 이벤트**
- 조기 예약 시 20% 할인
- 2024년 3월 31일까지 한정

자세한 일정과 예약은 고객센터 1588-1234로 문의해 주시기 바랍니다.`,
        views: 243,
        isPinned: true,
        category: "이벤트"
      },
      {
        id: 3,
        title: "바티칸 & 로마 성지순례 예약 마감 임박",
        author: "예약팀",
        date: "2024년 1월 8일",
        content: `3월 출발 바티칸 & 로마 성지순례 상품의 예약이 거의 마감되었습니다.

**상품 정보**
- 출발일: 2024년 3월 15일(금)
- 기간: 6박 8일
- 남은 좌석: 3석

참가를 원하시는 분들은 서둘러 예약해 주시기 바랍니다.

예약 문의: 1588-1234`,
        views: 189,
        isPinned: false,
        category: "안내"
      }
    ];

    const foundNotice = notices.find(n => n.id === parseInt(noticeId));
    if (foundNotice) {
      // 조회수 증가 (실제로는 API 호출)
      setNotice({ ...foundNotice, views: foundNotice.views + 1 });
    }
  }, [noticeId]);

  const getCategoryColor = (category: Notice['category']) => {
    switch (category) {
      case "공지": return "bg-blue-100 text-blue-800";
      case "안내": return "bg-green-100 text-green-800";
      case "이벤트": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (!notice) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-4">공지사항을 찾을 수 없습니다</h2>
          <Button onClick={() => setCurrentPage("notices")}>
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
                onClick={() => setCurrentPage("notices")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>목록으로 돌아가기</span>
              </Button>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                <span>공유</span>
              </Button>
              {isAdmin && (
                <Button 
                  size="sm"
                  onClick={() => setCurrentPage(`notice-form-edit-${noticeId}`)}
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

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* 브레드크럼 */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Home className="h-4 w-4" />
          <ChevronRight className="h-4 w-4" />
          <span>게시판</span>
          <ChevronRight className="h-4 w-4" />
          <button 
            onClick={() => setCurrentPage("notices")}
            className="hover:text-blue-600 transition-colors"
          >
            공지사항
          </button>
          <ChevronRight className="h-4 w-4" />
          <span>공지사항 상세</span>
        </div>

        {/* 공지사항 상세 내용 */}
        <Card>
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* 제목과 핀 */}
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  {notice.isPinned && (
                    <Pin className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  )}
                  <h1 className="text-2xl font-medium text-foreground">
                    {notice.title}
                  </h1>
                </div>
                
                {/* 메타 정보 */}
                <div className="flex items-center justify-between pb-6 border-b border-border">
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{notice.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{notice.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span>{notice.views.toLocaleString()}</span>
                    </div>
                  </div>
                  <Badge className={getCategoryColor(notice.category)}>
                    {notice.category}
                  </Badge>
                </div>
              </div>

              {/* 공지사항 내용 */}
              <div className="prose prose-lg max-w-none">
                <div className="text-foreground leading-relaxed whitespace-pre-line">
                  {notice.content}
                </div>
              </div>

              {/* 하단 액션 */}
              <div className="pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    진주여행사 공지사항
                  </div>
                  <div className="flex items-center space-x-3">
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

        {/* 이전/다음 공지사항 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground mb-1">이전 글</div>
              <h4 className="font-medium text-sm hover:text-blue-600 transition-colors line-clamp-2">
                메주고리예 성지순례 신규 상품 출시
              </h4>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground mb-1">다음 글</div>
              <h4 className="font-medium text-sm hover:text-blue-600 transition-colors line-clamp-2">
                홈페이지 리뉴얼 완료 안내
              </h4>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}