import { ArrowLeft, Calendar, User, Edit, Share2, Home, ChevronRight, Eye, MessageCircle, CheckCircle, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { useState, useEffect } from "react";

interface QnaDetailPageProps {
  setCurrentPage: (page: string) => void;
  qnaId: string;
  isAdmin?: boolean;
}

interface QnaItem {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  views: number;
  isAnswered: boolean;
  category: "상품문의" | "예약문의" | "일반문의" | "취소/환불";
  isPrivate: boolean;
  answers: Array<{
    id: number;
    author: string;
    date: string;
    content: string;
    isAdmin: boolean;
  }>;
}

export default function QnaDetailPage({ 
  setCurrentPage, 
  qnaId,
  isAdmin = false 
}: QnaDetailPageProps) {
  const [qna, setQna] = useState<QnaItem | null>(null);

  useEffect(() => {
    const qnaData: QnaItem[] = [
      {
        id: 1,
        title: "메주고리예 성지순례 3월 출발 일정 문의드립니다",
        author: "김순례",
        date: "2024년 1월 15일",
        content: `안녕하세요. 3월 중순경 메주고리예 성지순례를 계획하고 있습니다.

몇 가지 문의사항이 있어서 글을 남깁니다.

1. 3월 15일~25일 사이에 출발하는 일정이 있는지요?
2. 현재 예약 가능한 상황인지요?
3. 총 비용은 얼마 정도 예상해야 하는지요?
4. 포함 사항과 불포함 사항에 대해 자세히 알고 싶습니다.
5. 혹시 3월 성지순례 참가자들을 위한 특별 프로그램이 있는지요?

가능하시면 자세한 일정표와 비용 안내를 이메일로 보내주시면 감사하겠습니다.

빠른 답변 부탁드립니다.`,
        views: 45,
        isAnswered: true,
        category: "상품문의",
        isPrivate: false,
        answers: [
          {
            id: 1,
            author: "진주여행사",
            date: "2024년 1월 15일",
            content: `안녕하세요, 김순례님. 메주고리예 성지순례에 관심을 가져주셔서 감사합니다.

문의해주신 사항에 대해 답변드립니다.

**1. 3월 출발 일정**
- 3월 17일(일) 출발 6박 8일 일정이 있습니다.
- 3월 24일(일) 출발 6박 8일 일정도 예정되어 있습니다.

**2. 예약 현황**
- 3월 17일 출발: 현재 12명 예약, 8명 추가 모집 중
- 3월 24일 출발: 현재 8명 예약, 12명 추가 모집 중

**3. 예상 비용**
- 성인 1인 기준: 1,580,000원 (유류할증료, 제세공과금 포함)
- 조기 예약 시 50,000원 할인 혜택

**4. 포함/불포함 사항**
포함: 항공료, 숙박비, 차량비, 가이드비, 입장료, 아침식사
불포함: 점심/저녁식사, 개인경비, 선택관광, 여행자보험

**5. 특별 프로그램**
- 성모님 발현 동굴에서의 특별 기도회
- 현지 신부님과의 영적 대화 시간
- 십자가의 길 순례 프로그램

자세한 일정표와 약관은 고객센터(1588-1234)로 연락주시면 이메일로 발송해드리겠습니다.

감사합니다.`,
            isAdmin: true
          }
        ]
      }
    ];

    const foundQna = qnaData.find(q => q.id === parseInt(qnaId));
    if (foundQna) {
      setQna({ ...foundQna, views: foundQna.views + 1 });
    }
  }, [qnaId]);

  const getCategoryColor = (category: QnaItem['category']) => {
    switch (category) {
      case "상품문의": return "bg-blue-100 text-blue-800";
      case "예약문의": return "bg-green-100 text-green-800";
      case "일반문의": return "bg-gray-100 text-gray-800";
      case "취소/환불": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (!qna) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-4">질문을 찾을 수 없습니다</h2>
          <Button onClick={() => setCurrentPage("qna")}>
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
                onClick={() => setCurrentPage("qna")}
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
              {(isAdmin || qna.author === "김순례") && (
                <Button 
                  size="sm"
                  onClick={() => setCurrentPage(`qna-form-edit-${qnaId}`)}
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
            onClick={() => setCurrentPage("qna")}
            className="hover:text-blue-600 transition-colors"
          >
            질문답변
          </button>
          <ChevronRight className="h-4 w-4" />
          <span>질문 상세</span>
        </div>

        {/* 질문 상세 내용 */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* 제목과 상태 */}
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  {qna.isAnswered ? (
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <Clock className="h-6 w-6 text-orange-600 flex-shrink-0" />
                  )}
                  <h1 className="text-2xl font-medium text-foreground">
                    {qna.title}
                  </h1>
                </div>
                
                {/* 메타 정보 */}
                <div className="flex items-center justify-between pb-6 border-b border-border">
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{qna.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{qna.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span>{qna.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="h-4 w-4" />
                      <span>{qna.answers.length}개 답변</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getCategoryColor(qna.category)}>
                      {qna.category}
                    </Badge>
                    <Badge 
                      variant={qna.isAnswered ? "default" : "secondary"}
                      className={qna.isAnswered ? "bg-green-600" : "bg-orange-500"}
                    >
                      {qna.isAnswered ? "답변완료" : "답변대기"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* 질문 내용 */}
              <div className="prose prose-lg max-w-none">
                <div className="text-foreground leading-relaxed whitespace-pre-line">
                  {qna.content}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 답변 목록 */}
        {qna.answers.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>답변 ({qna.answers.length}개)</span>
            </h3>
            
            {qna.answers.map((answer) => (
              <Card key={answer.id} className={answer.isAdmin ? "border-blue-200 bg-blue-50/30" : ""}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* 답변 헤더 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span className="font-medium">{answer.author}</span>
                          {answer.isAdmin && (
                            <Badge variant="default" className="text-xs">
                              관리자
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{answer.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* 답변 내용 */}
                    <div className="prose prose-lg max-w-none">
                      <div className="text-foreground leading-relaxed whitespace-pre-line">
                        {answer.content}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* 답변 작성 (관리자만) */}
        {isAdmin && (
          <Card className="mt-8">
            <CardContent className="p-6">
              <h4 className="font-medium mb-4">답변 작성</h4>
              <div className="space-y-4">
                <textarea
                  className="w-full min-h-[200px] p-4 border rounded-lg resize-none"
                  placeholder="답변을 작성해주세요..."
                />
                <div className="flex justify-end">
                  <Button>답변 등록</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 다른 질문들 */}
        <div className="mt-12">
          <h3 className="text-lg font-medium mb-6">다른 질문답변</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <Badge className="bg-green-100 text-green-800 text-xs">예약문의</Badge>
                </div>
                <h4 className="font-medium text-sm mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                  로마 바티칸 성지순례 단체 할인 가능한가요?
                </h4>
                <p className="text-xs text-muted-foreground">박신부 | 2024년 1월 14일</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <Badge className="bg-gray-100 text-gray-800 text-xs">일반문의</Badge>
                </div>
                <h4 className="font-medium text-sm mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                  고령자도 성지순례 참가 가능한가요?
                </h4>
                <p className="text-xs text-muted-foreground">정할머니 | 2024년 1월 11일</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}