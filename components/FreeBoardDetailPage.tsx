import { ArrowLeft, Edit, Trash2, Calendar, User, Eye, MessageCircle, Heart, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { useState, useEffect } from "react";
import { BASE_URL } from "../src/lib/constants";

interface FreeBoardDetailPageProps {
  setCurrentPage: (page: string) => void;
  isAdmin?: boolean;
}

interface FreeBoardPost {
  id: number;
  title: string;
  content_html: string;
  content_text: string;
  excerpt: string;
  author_name: string;
  author_email?: string;
  created_at: string;
  updated_at: string;
  view_count: number;
  comment_count: number;
  like_count: number;
  status: string;
  category_id?: number;
  category_name?: string;
  category_slug?: string;
  featured_image?: string;
  attachments?: string;
}

interface FreeBoardComment {
  id: number;
  post_id: number;
  parent_id?: number;
  content: string;
  author_name: string;
  author_email?: string;
  is_member: boolean;
  created_at: string;
  updated_at: string;
}

export default function FreeBoardDetailPage({ setCurrentPage, isAdmin = false }: FreeBoardDetailPageProps) {
  const [post, setPost] = useState<FreeBoardPost | null>(null);
  const [comments, setComments] = useState<FreeBoardComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // URL에서 ID 추출
  const getPostIdFromUrl = () => {
    const currentPath = window.location.hash.substring(1);
    const match = currentPath.match(/freeboard-detail-(\d+)/);
    return match ? match[1] : null;
  };

  const postId = getPostIdFromUrl();

  // 게시글 상세 조회
  const fetchPostDetail = async () => {
    if (!postId) {
      setError('게시글 ID가 없습니다.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/freeboard/${postId}`);
      
      if (!response.ok) {
        throw new Error('게시글을 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      
      if (data.success) {
        setPost(data.data.post);
        setComments(data.data.comments || []);
      } else {
        throw new Error(data.message || '게시글 조회 실패');
      }
    } catch (err) {
      console.error('게시글 조회 오류:', err);
      setError(err instanceof Error ? err.message : '게시글을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchPostDetail();
  }, [postId]);

  // 게시글 삭제 핸들러
  const handleDelete = async () => {
    if (!post || !postId) return;

    // Admin은 비밀번호 없이 삭제 가능
    let password = '';
    if (!isAdmin) {
      password = prompt('게시글 삭제를 위해 비밀번호를 입력해주세요:');
      if (!password) return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/freeboard/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        alert('게시글이 삭제되었습니다.');
        setCurrentPage("freeboard");
      } else {
        alert(data.message || '게시글 삭제에 실패했습니다.');
      }
    } catch (err) {
      console.error('게시글 삭제 오류:', err);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  // 게시글 수정 핸들러
  const handleEdit = () => {
    if (!postId) return;
    setCurrentPage(`freeboard-form-edit-${postId}`);
  };

  // 공유 핸들러
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('링크가 클립보드에 복사되었습니다!');
      }
    } catch (err) {
      console.error('공유 실패:', err);
    }
  };

  // 카테고리 색상 반환
  const getCategoryColor = (categoryName?: string) => {
    switch (categoryName) {
      case "자유토론": return "bg-purple-100 text-purple-800";
      case "여행팁": return "bg-green-100 text-green-800";
      case "질문답변": return "bg-blue-100 text-blue-800";
      case "정보공유": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">게시글을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-600">
              {error || '게시글을 찾을 수 없습니다.'}
            </AlertDescription>
          </Alert>
          <div className="mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentPage("freeboard")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>목록으로</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage("freeboard")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>목록으로</span>
          </Button>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex items-center space-x-2"
            >
              <Share2 className="h-4 w-4" />
              <span>공유</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              className="flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>수정</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
              <span>삭제</span>
            </Button>
          </div>
        </div>

        {/* 게시글 정보 */}
        <Card className="mb-8">
          <CardHeader className="border-b">
            <div className="space-y-4">
              {/* 카테고리 */}
              {post.category_name && (
                <Badge className={getCategoryColor(post.category_name)}>
                  {post.category_name}
                </Badge>
              )}

              {/* 제목 */}
              <h1 className="text-2xl font-bold text-foreground leading-tight">
                {post.title}
              </h1>

              {/* 메타 정보 */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{post.author_name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.created_at)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>조회 {post.view_count.toLocaleString()}</span>
                </div>
                {post.comment_count > 0 && (
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>댓글 {post.comment_count}</span>
                  </div>
                )}
                {post.like_count > 0 && (
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span>좋아요 {post.like_count}</span>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            {/* 게시글 내용 */}
            <div 
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content_html }}
            />
          </CardContent>
        </Card>

        {/* 댓글 섹션 */}
        {comments.length > 0 && (
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">
                댓글 ({comments.length})
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {comments.map((comment, index) => (
                <div key={comment.id} className={`${index > 0 ? 'border-t pt-4' : ''}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium">{comment.author_name}</span>
                    {comment.is_member && (
                      <Badge variant="secondary" className="text-xs">회원</Badge>
                    )}
                    <span className="text-sm text-muted-foreground">
                      {formatDate(comment.created_at)}
                    </span>
                  </div>
                  <p className="text-foreground whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* 이전/다음 게시글 네비게이션 */}
        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentPage("freeboard")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>목록으로 돌아가기</span>
          </Button>
        </div>

        {/* 안내 메시지 */}
        <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-purple-900 mb-4">
            게시글 관리 안내
          </h3>
          <div className="space-y-2 text-sm text-purple-800">
            <p>• 게시글 수정/삭제 시 작성 시 입력한 비밀번호가 필요합니다.</p>
            <p>• 부적절한 내용의 게시글은 관리자에 의해 삭제될 수 있습니다.</p>
            <p>• 문의사항은 고객센터(1588-1234)로 연락해주세요.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


