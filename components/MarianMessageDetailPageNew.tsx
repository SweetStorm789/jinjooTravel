import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import TipTapEditor from "./ui/TipTapEditor";
import { 
  ArrowLeft, 
  Calendar, 
  Edit, 
  Trash2,
  Loader2,
  AlertCircle,
  User,
  Eye,
  Share2,
  Home,
  ChevronRight
} from "lucide-react";

interface MarianMessageDetailPageProps {
  setCurrentPage: (page: string) => void;
  messageId: string;
  isAdmin?: boolean;
}

interface BoardPost {
  id: string;
  board_type: string;
  title: string;
  content_html: string;
  content_json: any;
  author_name: string;
  author_email?: string;
  status: string;
  view_count: number;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export default function MarianMessageDetailPageNew({ 
  setCurrentPage, 
  messageId,
  isAdmin = false 
}: MarianMessageDetailPageProps) {
  const [message, setMessage] = useState<BoardPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 성모님 메시지 데이터 로드
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`http://localhost:5000/api/board/${messageId}`);
        if (!response.ok) {
          throw new Error('성모님 메시지를 불러오는데 실패했습니다.');
        }

        const data = await response.json();
        if (data.success) {
          setMessage(data.data);
        } else {
          setError(data.message || '성모님 메시지를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('성모님 메시지 로드 실패:', error);
        setError('서버와의 연결에 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [messageId]);

  // 성모님 메시지 삭제 핸들러
  const handleDelete = async () => {
    if (!confirm('정말로 이 성모님 메시지를 삭제하시겠습니까? 삭제된 메시지는 복구할 수 없습니다.')) {
      return;
    }

    try {
      setDeleting(true);
      
      const response = await fetch(`http://localhost:5000/api/board/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({}) // 관리자는 비밀번호 필요 없음
      });

      if (!response.ok) {
        throw new Error('삭제에 실패했습니다.');
      }

      const data = await response.json();
      if (data.success) {
        alert('성모님 메시지가 성공적으로 삭제되었습니다.');
        setCurrentPage('marian-messages');
      } else {
        throw new Error(data.message || '삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setDeleting(false);
    }
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  // 메시지 날짜 포맷팅 (published_at 기준)
  const formatMessageDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 공유하기
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: message?.title,
        text: message?.title,
        url: window.location.href,
      });
    } else {
      // 폴백: URL 복사
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 클립보드에 복사되었습니다.');
    }
  };

  // 로딩 상태
  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-muted-foreground">성모님 메시지를 불러오는 중...</span>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error || !message) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Alert variant="destructive" className="mb-4 inline-block">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error || '성모님 메시지를 찾을 수 없습니다.'}</AlertDescription>
          </Alert>
          <div>
            <Button onClick={() => setCurrentPage("marian-messages")}>
              목록으로 돌아가기
            </Button>
          </div>
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
                onClick={() => setCurrentPage("marian-messages")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>목록으로 돌아가기</span>
              </Button>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={handleShare} className="flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                <span>공유</span>
              </Button>
              {isAdmin && (
                <>
                  <Button 
                    size="sm"
                    onClick={() => setCurrentPage(`marian-message-form-edit-${messageId}`)}
                    className="flex items-center space-x-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span>수정</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:border-red-300"
                  >
                    {deleting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                    <span>{deleting ? "삭제 중..." : "삭제"}</span>
                  </Button>
                </>
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
          <button 
            onClick={() => setCurrentPage("marian-messages")}
            className="hover:text-blue-600 transition-colors"
          >
            성모님 메시지
          </button>
          <ChevronRight className="h-4 w-4" />
          <span>메시지 상세</span>
        </div>

        {/* 성모님 메시지 상세 내용 */}
        <Card>
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* 제목 및 배지 */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">메주고리예</Badge>
                </div>
                
                <h1 className="text-2xl font-medium text-foreground mb-4">
                  {message.title}
                </h1>
                
                {/* 메타 정보 */}
                <div className="flex items-center space-x-6 text-sm text-muted-foreground pb-6 border-b border-border">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{message.author_name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatMessageDate(message.published_at || message.created_at)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>조회 {message.view_count}</span>
                  </div>
                </div>
              </div>

              {/* 성모님 메시지 내용 - TipTap으로 렌더링 */}
              <div className="prose prose-lg max-w-none">
                <TipTapEditor
                  content={message.content_html}
                  readOnly={true}
                  className="border-0 p-0"
                />
              </div>

              {/* 하단 액션 */}
              <div className="pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <div>등록일: {formatDate(message.created_at)}</div>
                    {message.updated_at !== message.created_at && (
                      <div>수정일: {formatDate(message.updated_at)}</div>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4 mr-2" />
                      공유하기
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 이전/다음 성모님 메시지 */}
        <div className="mt-12">
          <h3 className="text-lg font-medium mb-6">다른 성모님 메시지</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <h4 className="font-medium text-sm mb-2 hover:text-orange-600 transition-colors">
                  이전 성모님 메시지가 여기에 표시됩니다
                </h4>
                <p className="text-xs text-muted-foreground">날짜 정보</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <h4 className="font-medium text-sm mb-2 hover:text-orange-600 transition-colors">
                  다음 성모님 메시지가 여기에 표시됩니다
                </h4>
                <p className="text-xs text-muted-foreground">날짜 정보</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

