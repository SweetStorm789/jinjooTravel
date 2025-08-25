import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Edit, 
  Share2, 
  Home, 
  ChevronRight, 
  Eye, 
  MessageCircle, 
  CheckCircle, 
  Clock,
  Lock,
  Unlock,
  Loader2,
  AlertTriangle,
  Send
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useState, useEffect } from "react";
import { BASE_URL } from "../src/lib/constants";
import TipTapEditor from "./ui/TipTapEditor";

interface QnaDetailPageProps {
  setCurrentPage: (page: string) => void;
  qnaId: string;
  isAdmin?: boolean;
}

interface QnaItem {
  id: number;
  title: string;
  content_html: string;
  content_text: string;
  excerpt: string;
  author_name: string;
  author_email?: string;
  author_phone?: string;
  created_at: string;
  updated_at: string;
  view_count: number;
  comment_count: number;
  is_secret: boolean;
  status: string;
  category_id?: number;
  category_name?: string;
  category_slug?: string;
  is_answered: boolean;
}

interface QnaAnswer {
  id: number;
  post_id: number;
  content: string;
  author_name: string;
  author_email?: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export default function QnaDetailPage({ 
  setCurrentPage, 
  qnaId,
  isAdmin = false 
}: QnaDetailPageProps) {
  const [qna, setQna] = useState<QnaItem | null>(null);
  const [answers, setAnswers] = useState<QnaAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  
  // 관리자 답변 작성 상태
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [answerContent, setAnswerContent] = useState("");
  const [submittingAnswer, setSubmittingAnswer] = useState(false);

  // QnA 상세 정보 조회
  const fetchQnaDetail = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${BASE_URL}/api/qna/${qnaId}`);
      
      if (!response.ok) {
        throw new Error('QnA를 찾을 수 없습니다.');
      }

      const data = await response.json();
      
      if (data.success) {
        setQna(data.data.post);
        setAnswers(data.data.answers || []);
      } else {
        throw new Error(data.message || 'QnA 조회 실패');
      }
    } catch (err) {
      console.error('QnA 조회 오류:', err);
      setError(err instanceof Error ? err.message : 'QnA를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 관리자 답변 작성
  const handleSubmitAnswer = async () => {
    if (!answerContent.trim()) {
      alert('답변 내용을 입력해주세요.');
      return;
    }

    try {
      setSubmittingAnswer(true);

      const response = await fetch(`${BASE_URL}/api/qna/${qnaId}/answers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: answerContent
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '답변 등록에 실패했습니다.');
      }

      if (data.success) {
        alert('답변이 등록되었습니다.');
        setAnswerContent("");
        setShowAnswerForm(false);
        // 답변 목록 새로고침
        fetchQnaDetail();
      } else {
        throw new Error(data.message || '답변 등록 실패');
      }
    } catch (err) {
      console.error('답변 등록 오류:', err);
      alert(err instanceof Error ? err.message : '답변 등록에 실패했습니다.');
    } finally {
      setSubmittingAnswer(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchQnaDetail();
  }, [qnaId]);

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 카테고리 색상 반환
  const getCategoryColor = (categoryName?: string) => {
    switch (categoryName) {
      case "상품문의": return "bg-blue-100 text-blue-800";
      case "예약문의": return "bg-green-100 text-green-800";
      case "일반문의": return "bg-gray-100 text-gray-800";
      case "취소/환불": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>QnA를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !qna) {
    return (
      <div className="bg-background min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              오류가 발생했습니다
            </h3>
            <p className="text-gray-500 mb-6">
              {error || 'QnA를 찾을 수 없습니다.'}
            </p>
            <Button onClick={() => setCurrentPage("qna")}>
              목록으로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
              <button 
                onClick={() => setCurrentPage("qna")}
                className="hover:text-foreground transition-colors"
              >
                질문답변
              </button>
              <ChevronRight className="h-4 w-4" />
              <span>상세보기</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* 상단 액션 버튼 */}
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="outline" 
            onClick={() => setCurrentPage("qna")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>목록으로</span>
          </Button>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              공유
            </Button>
            {!isAdmin && (
              <Button 
                onClick={() => setCurrentPage(`qna-form-edit-${qna.id}`)}
                size="sm"
              >
                <Edit className="h-4 w-4 mr-2" />
                수정
              </Button>
            )}
          </div>
        </div>

        {/* QnA 내용 */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {/* 제목과 상태 */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    {qna.is_answered ? (
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                    ) : (
                      <Clock className="h-6 w-6 text-orange-600 flex-shrink-0" />
                    )}
                    <h1 className="text-2xl font-bold text-foreground">
                      {qna.title}
                    </h1>
                    {qna.is_secret && (
                      <div className="flex items-center space-x-1">
                        <Lock className="h-4 w-4 text-amber-600" />
                        <Badge variant="outline" className="text-xs">
                          비공개
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-shrink-0 space-y-2">
                  {qna.category_name && (
                    <Badge className={getCategoryColor(qna.category_name)}>
                      {qna.category_name}
                    </Badge>
                  )}
                  <div className="flex justify-end">
                    <Badge 
                      variant={qna.is_answered ? "default" : "secondary"}
                      className={qna.is_answered ? "bg-green-600" : "bg-orange-500"}
                    >
                      {qna.is_answered ? "답변완료" : "답변대기"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* 메타 정보 */}
              <div className="flex items-center space-x-6 text-sm text-muted-foreground border-b pb-4">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{qna.author_name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(qna.created_at)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{qna.view_count.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{qna.comment_count}개 답변</span>
                </div>
              </div>
            </div>

            {/* 질문 내용 */}
            <div className="prose max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: qna.content_html }} 
                className="leading-relaxed"
              />
            </div>
          </CardContent>
        </Card>

        {/* 답변 섹션 */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium">
              답변 ({answers.length})
            </h2>
            {isAdmin && !showAnswerForm && (
              <Button 
                onClick={() => setShowAnswerForm(true)}
                className="flex items-center space-x-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span>답변하기</span>
              </Button>
            )}
          </div>

          {/* 관리자 답변 작성 폼 */}
          {isAdmin && showAnswerForm && (
            <Card>
              <CardHeader>
                <CardTitle>답변 작성</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="answer">답변 내용</Label>
                  <Textarea
                    id="answer"
                    value={answerContent}
                    onChange={(e) => setAnswerContent(e.target.value)}
                    placeholder="고객님의 질문에 대한 답변을 작성해주세요..."
                    rows={6}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowAnswerForm(false);
                      setAnswerContent("");
                    }}
                  >
                    취소
                  </Button>
                  <Button 
                    onClick={handleSubmitAnswer}
                    disabled={submittingAnswer}
                    className="flex items-center space-x-2"
                  >
                    {submittingAnswer ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    <span>{submittingAnswer ? '등록 중...' : '답변 등록'}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 답변 목록 */}
          {answers.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                아직 답변이 없습니다
              </h3>
              <p className="text-gray-500">
                답변은 영업일 기준 1-2일 내에 등록됩니다.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {answers.map((answer) => (
                <Card key={answer.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          answer.is_admin 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-700'
                        }`}>
                          {answer.is_admin ? '관' : answer.author_name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {answer.author_name}
                            {answer.is_admin && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                관리자
                              </Badge>
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(answer.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="prose max-w-none">
                      <div 
                        dangerouslySetInnerHTML={{ __html: answer.content.replace(/\n/g, '<br>') }} 
                        className="leading-relaxed"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* 안내 메시지 */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4">
            질문답변 이용 안내
          </h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• 답변은 영업일 기준 1-2일 내에 등록됩니다.</p>
            <p>• 추가 질문이 있으시면 새로운 질문을 작성해주세요.</p>
            <p>• 긴급한 사항은 고객센터(1588-1234)로 직접 연락해주세요.</p>
          </div>
        </div>
      </div>
    </div>
  );
}