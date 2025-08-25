import { ArrowLeft, Calendar, User, Edit, Share2, Home, ChevronRight, Trash2, Loader2, AlertCircle } from "lucide-react";
import { BASE_URL } from '@/lib/constants';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { useState, useEffect } from "react";

interface MarianMessageDetailPageProps {
  setCurrentPage: (page: string) => void;
  messageId: string;
  isAdmin?: boolean;
}

interface MarianMessage {
  id: string;
  message_date: string;
  content_message: string;
  prayer_priest?: string;
  prayer_intent?: string;
  created_at: string;
  updated_at: string;
}

export default function MarianMessageDetailPage({ 
  setCurrentPage, 
  messageId,
  isAdmin = false 
}: MarianMessageDetailPageProps) {
  const [message, setMessage] = useState<MarianMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 메시지 데이터 로드
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${BASE_URL}/api/marian-messages/${messageId}`);
        if (!response.ok) {
          throw new Error('메시지를 불러오는데 실패했습니다.');
        }

        const data = await response.json();
        if (data.success) {
          setMessage(data.data);
        } else {
          setError(data.message || '메시지를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('메시지 로드 실패:', error);
        setError('서버와의 연결에 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [messageId]);

  // 메시지 삭제 핸들러
  const handleDelete = async () => {
    if (!confirm('정말로 이 메시지를 삭제하시겠습니까? 삭제된 메시지는 복구할 수 없습니다.')) {
      return;
    }

    try {
      setDeleting(true);
      
      const response = await fetch(`${BASE_URL}/api/marian-messages/${messageId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('삭제에 실패했습니다.');
      }

      const data = await response.json();
      if (data.success) {
        alert('메시지가 성공적으로 삭제되었습니다.');
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

  // 제목 생성 (날짜 기반)
  const generateTitle = () => {
    if (!message) return '성모님 메시지';
    try {
      const date = new Date(message.message_date);
      return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 평화의 모후 메주고리예 성모님 메시지`;
    } catch {
      return '성모님 메시지';
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

  // 로딩 상태
  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-muted-foreground">메시지를 불러오는 중...</span>
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
            <AlertDescription>{error || '메시지를 찾을 수 없습니다.'}</AlertDescription>
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
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
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
            성모님 메세지
          </button>
          <ChevronRight className="h-4 w-4" />
          <span>메시지 상세</span>
        </div>

        {/* 메시지 상세 내용 */}
        <Card>
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* 제목 */}
              <div>
                <h1 className="text-2xl font-medium text-foreground mb-4">
                  {generateTitle()}
                </h1>
                
                {/* 메타 정보 */}
                <div className="flex items-center space-x-6 text-sm text-muted-foreground pb-6 border-b border-border">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>성모님메시지</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(message.created_at)}</span>
                  </div>
                  <Badge variant="secondary">메주고리예</Badge>
                </div>
              </div>

              {/* 메시지 내용 */}
              <div className="prose prose-lg max-w-none">
                <div className="text-foreground leading-relaxed whitespace-pre-line font-bold">
                  {message.content_message}
                </div>
              </div>

              {/* 묵상글이 있는 경우 */}
              {message.prayer_priest && (
                <div className="mt-12">
                  {/* <h3 className="text-lg font-medium text-foreground mb-4">묵상글</h3> */}
                  <div className="text-foreground leading-relaxed whitespace-pre-line">
                    {message.prayer_priest}
                  </div>
                </div>
              )}

              {/* 기도 지향이 있는 경우 */}
              {message.prayer_intent && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-foreground mb-4">이번달 기도지향입니다.</h3>
                  <div className="text-foreground leading-relaxed whitespace-pre-line">
                    {message.prayer_intent}
                  </div>
                </div>
              )}

              {/* 하단 액션 */}
              <div className="pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    평화의 모후 메주고리예에서 전해주시는 성모님의 메시지
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
      </div>
    </div>
  );
}