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
import { BASE_URL } from '@/lib/constants';

interface NoticeDetailPageProps {
  setCurrentPage: (page: string) => void;
  noticeId: string;
  isAdmin?: boolean;
}

interface BoardPost {
  id: string;
  board_type: string;
  category_id?: number;
  title: string;
  content_html: string;
  content_json: any;
  content_text: string;
  excerpt?: string;
  author_name: string;
  author_email?: string;
  status: string;
  is_featured: boolean;
  is_notice: boolean;
  allow_comments: boolean;
  is_secret: boolean;
  view_count: number;
  like_count: number;
  comment_count: number;
  featured_image?: string;
  attachments?: string;
  meta_title?: string;
  meta_description?: string;
  tags?: string;
  published_at?: string;
  expired_at?: string;
  created_at: string;
  updated_at: string;
  category_name?: string;
  category_slug?: string;
}

export default function NoticeDetailPage({ 
  setCurrentPage, 
  noticeId,
  isAdmin = false 
}: NoticeDetailPageProps) {
  const [notice, setNotice] = useState<BoardPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 공지사항 데이터 로드
  useEffect(() => {
    const fetchNotice = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${BASE_URL}/api/board/${noticeId}`);
        if (!response.ok) {
          throw new Error('공지사항을 불러오는데 실패했습니다.');
        }

        const data = await response.json();
        if (data.success) {
          setNotice(data.data);
        } else {
          setError(data.message || '공지사항을 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('공지사항 로드 실패:', error);
        setError('서버와의 연결에 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [noticeId]);

  // 공지사항 삭제 핸들러
  const handleDelete = async () => {
    if (!confirm('정말로 이 공지사항을 삭제하시겠습니까? 삭제된 공지사항은 복구할 수 없습니다.')) {
      return;
    }

    try {
      setDeleting(true);
      
      const response = await fetch(`${BASE_URL}/api/board/${noticeId}`, {
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
        alert('공지사항이 성공적으로 삭제되었습니다.');
        setCurrentPage('notices');
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

  // 상대적 시간 표시
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return '방금 전';
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    if (diffInHours < 48) return '어제';
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}일 전`;
    
    return formatDate(dateString);
  };

  // 공유하기
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: notice?.title,
        text: notice?.excerpt || notice?.title,
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
          <span className="text-muted-foreground">공지사항을 불러오는 중...</span>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error || !notice) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Alert variant="destructive" className="mb-4 inline-block">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error || '공지사항을 찾을 수 없습니다.'}</AlertDescription>
          </Alert>
          <div>
            <Button onClick={() => setCurrentPage("notices")}>
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
                onClick={() => setCurrentPage("notices")}
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
                    onClick={() => setCurrentPage(`notice-form-edit-${noticeId}`)}
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
              {/* 제목 및 배지 */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  {notice.is_notice && (
                    <Badge variant="destructive">공지</Badge>
                  )}
              {/*     {notice.is_featured && (
                    <Badge variant="secondary">추천</Badge>
                  )} */}
                  {notice.category_name && (
                    <Badge variant="outline">{notice.category_name}</Badge>
                  )}
                </div>
                
                <h1 className="text-2xl font-medium text-foreground mb-4">
                  {notice.title}
                </h1>
                
                {/* 메타 정보 */}
                <div className="flex items-center space-x-6 text-sm text-muted-foreground pb-6 border-b border-border">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{notice.author_name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{getRelativeTime(notice.created_at)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>조회 {notice.view_count}</span>
                  </div>
                </div>
              </div>

              {/* 대표 이미지 */}
              {notice.featured_image && (
                <div className="w-full">
                  <img 
                    src={notice.featured_image} 
                    alt={notice.title}
                    className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
                  />
                </div>
              )}

              {/* 공지사항 내용 - TipTap으로 렌더링 */}
              <div className="prose prose-lg max-w-none">
                <TipTapEditor
                  content={notice.content_html}
                  readOnly={true}
                  className="border-0 p-0"
                />
              </div>

              {/* 태그 */}
              {notice.tags && (
                <div className="pt-6 border-t border-border">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-muted-foreground">태그:</span>
                    {JSON.parse(notice.tags).map((tag: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* 하단 액션 */}
              <div className="pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <div>등록일: {formatDate(notice.created_at)}</div>
                    {notice.updated_at !== notice.created_at && (
                      <div>수정일: {formatDate(notice.updated_at)}</div>
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

        {/* 이전/다음 공지사항 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground mb-1">이전 공지사항</div>
              <h4 className="font-medium text-sm hover:text-orange-600 transition-colors">
                이전 공지사항 제목이 여기에 표시됩니다
              </h4>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground mb-1">다음 공지사항</div>
              <h4 className="font-medium text-sm hover:text-orange-600 transition-colors">
                다음 공지사항 제목이 여기에 표시됩니다
              </h4>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}