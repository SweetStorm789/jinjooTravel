import { Plus, Calendar, User, ChevronRight, Home, Eye, MessageCircle, CheckCircle, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { useState } from "react";

interface QnaPageProps {
  setCurrentPage: (page: string) => void;
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
  answerCount: number;
}

export default function QnaPage({ setCurrentPage, isAdmin = false }: QnaPageProps) {
  const [qnaList] = useState<QnaItem[]>([
    {
      id: 1,
      title: "메주고리예 성지순례 3월 출발 일정 문의드립니다",
      author: "김순례",
      date: "2024년 1월 15일",
      content: "3월 중순경 메주고리예 성지순례를 계획하고 있습니다. 현재 예약 가능한 일정과 비용에 대해 자세히 알고 싶습니다.",
      views: 45,
      isAnswered: true,
      category: "상품문의",
      isPrivate: false,
      answerCount: 1
    },
    {
      id: 2,
      title: "로마 바티칸 성지순례 단체 할인 가능한가요?",
      author: "박신부",
      date: "2024년 1월 14일",
      content: "본당에서 25명 정도 단체로 로마 바티칸 성지순례를 계획하고 있습니다. 단체 할인이나 특별 혜택이 있는지 문의드립니다.",
      views: 67,
      isAnswered: true,
      category: "예약문의",
      isPrivate: false,
      answerCount: 2
    },
    {
      id: 3,
      title: "[비공개] 개인적인 사정으로 예약 취소 관련 문의",
      author: "이가톨릭",
      date: "2024년 1월 13일",
      content: "개인적인 문의사항입니다.",
      views: 12,
      isAnswered: false,
      category: "취소/환불",
      isPrivate: true,
      answerCount: 0
    },
    {
      id: 4,
      title: "파티마 성지순례 때 준비물이 따로 있나요?",
      author: "최마리아",
      date: "2024년 1월 12일",
      content: "처음 성지순례를 가게 되어서 무엇을 준비해야 할지 잘 모르겠습니다. 특별히 챙겨가야 할 물건들이 있을까요?",
      views: 89,
      isAnswered: true,
      category: "일반문의",
      isPrivate: false,
      answerCount: 1
    },
    {
      id: 5,
      title: "고령자도 성지순례 참가 가능한가요?",
      author: "정할머니",
      date: "2024년 1월 11일",
      content: "75세 고령자인데 성지순례 참가가 가능한지, 특별히 주의해야 할 사항들이 있는지 궁금합니다.",
      views: 134,
      isAnswered: false,
      category: "일반문의",
      isPrivate: false,
      answerCount: 0
    },
    {
      id: 6,
      title: "성지순례 비용 결제 방법 문의",
      author: "한요셉",
      date: "2024년 1월 10일",
      content: "성지순례 비용을 분할로 결제할 수 있는지, 카드 결제나 계좌이체 중 어떤 방법이 더 유리한지 문의드립니다.",
      views: 78,
      isAnswered: true,
      category: "예약문의",
      isPrivate: false,
      answerCount: 1
    }
  ]);

  const getCategoryColor = (category: QnaItem['category']) => {
    switch (category) {
      case "상품문의": return "bg-blue-100 text-blue-800";
      case "예약문의": return "bg-green-100 text-green-800";
      case "일반문의": return "bg-gray-100 text-gray-800";
      case "취소/환불": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* 헤더 섹션 */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-medium text-foreground mb-2">
                질문답변
              </h1>
              <p className="text-muted-foreground">
                성지순례와 여행에 관한 궁금한 점을 언제든지 문의해주세요
              </p>
            </div>
            
            {/* 브레드크럼 */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Home className="h-4 w-4" />
              <ChevronRight className="h-4 w-4" />
              <span>게시판</span>
              <ChevronRight className="h-4 w-4" />
              <span>질문답변</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 상단 액션 버튼 */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-medium">
            총 {qnaList.length}개의 질문
          </h2>
          
          <Button 
            onClick={() => setCurrentPage("qna-form")}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>질문하기</span>
          </Button>
        </div>

        {/* 질문답변 리스트 */}
        <div className="space-y-4">
          {qnaList.map((qna) => (
            <Card 
              key={qna.id} 
              className="overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.005]"
              onClick={() => setCurrentPage(`qna-detail-${qna.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between space-x-4">
                  <div className="flex-1 space-y-3">
                    {/* 제목과 상태 */}
                    <div className="flex items-center space-x-3">
                      {qna.isAnswered ? (
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <Clock className="h-5 w-5 text-orange-600 flex-shrink-0" />
                      )}
                      <h3 className="text-lg font-medium text-foreground hover:text-blue-600 transition-colors duration-200 line-clamp-1">
                        {qna.title}
                      </h3>
                      {qna.isPrivate && (
                        <Badge variant="outline" className="text-xs">
                          비공개
                        </Badge>
                      )}
                    </div>
                    
                    {/* 메타 정보 */}
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{qna.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{qna.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{qna.views.toLocaleString()}</span>
                      </div>
                      {qna.answerCount > 0 && (
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{qna.answerCount}개 답변</span>
                        </div>
                      )}
                    </div>
                    
                    {/* 내용 미리보기 (비공개가 아닌 경우만) */}
                    {!qna.isPrivate && (
                      <p className="text-foreground leading-relaxed line-clamp-2">
                        {qna.content}
                      </p>
                    )}
                  </div>
                  
                  {/* 카테고리와 상태 배지 */}
                  <div className="flex-shrink-0 space-y-2">
                    <Badge className={getCategoryColor(qna.category)}>
                      {qna.category}
                    </Badge>
                    <div className="flex justify-end">
                      <Badge 
                        variant={qna.isAnswered ? "default" : "secondary"}
                        className={qna.isAnswered ? "bg-green-600" : "bg-orange-500"}
                      >
                        {qna.isAnswered ? "답변완료" : "답변대기"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 안내 메시지 */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4">
            질문답변 이용 안내
          </h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• 성지순례 및 여행 관련 모든 문의를 환영합니다.</p>
            <p>• 개인정보가 포함된 문의는 비공개로 작성해주세요.</p>
            <p>• 답변은 영업일 기준 1-2일 내에 등록됩니다.</p>
            <p>• 긴급한 사항은 고객센터(1588-1234)로 직접 연락해주세요.</p>
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