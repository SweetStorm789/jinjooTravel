import { ArrowLeft, Edit, Trash2, Calendar, User, Eye, Heart, Share2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { useState, useEffect } from "react";
import { BASE_URL } from "../src/lib/constants";

interface PhotoGalleryDetailPageProps {
  setCurrentPage: (page: string) => void;
  isAdmin?: boolean;
}

interface GalleryPost {
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

interface GalleryImage {
  original_name: string;
  stored_name: string;
  file_path: string;
  alt_text?: string;
  width?: number;
  height?: number;
}

export default function PhotoGalleryDetailPage({ setCurrentPage, isAdmin = false }: PhotoGalleryDetailPageProps) {
  const [post, setPost] = useState<GalleryPost | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // URL에서 ID 추출
  const getPostIdFromUrl = () => {
    const currentPath = window.location.hash.substring(1);
    const match = currentPath.match(/gallery-detail-(\d+)/);
    return match ? match[1] : null;
  };

  const postId = getPostIdFromUrl();

  // 갤러리 상세 조회
  const fetchGalleryDetail = async () => {
    if (!postId) {
      setError('갤러리 ID가 없습니다.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/gallery/${postId}`);
      
      if (!response.ok) {
        throw new Error('갤러리를 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      
      if (data.success) {
        setPost(data.data.post);
        setImages(data.data.images || []);
      } else {
        throw new Error(data.message || '갤러리 조회 실패');
      }
    } catch (err) {
      console.error('갤러리 조회 오류:', err);
      setError(err instanceof Error ? err.message : '갤러리를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchGalleryDetail();
  }, [postId]);

  // 갤러리 삭제 핸들러
  const handleDelete = async () => {
    if (!post || !postId) return;

    // Admin은 비밀번호 없이 삭제 가능
    let password = '';
    if (!isAdmin) {
      const inputPassword = prompt('갤러리 삭제를 위해 비밀번호를 입력해주세요:');
      password = inputPassword || '';
      if (!password) return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/gallery/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        alert('갤러리가 삭제되었습니다.');
        setCurrentPage("photo-gallery");
      } else {
        alert(data.message || '갤러리 삭제에 실패했습니다.');
      }
    } catch (err) {
      console.error('갤러리 삭제 오류:', err);
      alert('갤러리 삭제에 실패했습니다.');
    }
  };

  // 갤러리 수정 핸들러
  const handleEdit = () => {
    if (!postId) return;
    setCurrentPage(`gallery-form-edit-${postId}`);
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

  // 라이트박스 열기
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  // 라이트박스 닫기
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // 이전 이미지
  const previousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // 다음 이미지
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  // 키보드 이벤트 핸들러
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        previousImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [lightboxOpen, images.length]);

  // 카테고리 색상 반환
  const getCategoryColor = (categoryName?: string) => {
    switch (categoryName) {
      case "국내여행": return "bg-green-100 text-green-800";
      case "해외여행": return "bg-blue-100 text-blue-800";
      case "성지순례": return "bg-purple-100 text-purple-800";
      case "자연풍경": return "bg-emerald-100 text-emerald-800";
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
          <p className="text-muted-foreground">갤러리를 불러오는 중...</p>
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
              {error || '갤러리를 찾을 수 없습니다.'}
            </AlertDescription>
          </Alert>
          <div className="mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentPage("photo-gallery")}
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
            onClick={() => setCurrentPage("photo-gallery")}
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

        {/* 갤러리 정보 */}
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
                {post.like_count > 0 && (
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span>좋아요 {post.like_count}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <span>📷 {images.length}개 이미지</span>
                </div>
              </div>
            </div>
          </CardHeader>

          {/* 설명 */}
          {post.content_html && (
            <CardContent className="p-8">
              <div 
                className="prose prose-gray max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: post.content_html }}
              />
            </CardContent>
          )}
        </Card>

        {/* 이미지 갤러리 */}
        {images.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <h3 className="text-lg font-semibold">
                이미지 ({images.length})
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div 
                    key={index} 
                    className="relative group cursor-pointer overflow-hidden rounded-lg border hover:shadow-lg transition-all duration-200"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={`${BASE_URL}${image.file_path}`}
                      alt={image.alt_text || `Gallery image ${index + 1}`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                      style={{
                        objectPosition: 'center',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                      onLoad={(e) => {
                        const img = e.currentTarget;
                        // 이미지 비율에 따라 object-fit 조정
                        if (img.naturalWidth < img.naturalHeight) {
                          // 세로 사진인 경우 - contain으로 비율 유지
                          img.style.objectFit = 'contain';
                          img.style.backgroundColor = '#f9fafb';
                        } else {
                          // 가로 사진인 경우 - cover로 컨테이너 채움
                          img.style.objectFit = 'cover';
                          img.style.backgroundColor = 'transparent';
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white font-medium">
                        클릭하여 크게 보기
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 이전/다음 갤러리 네비게이션 */}
        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentPage("photo-gallery")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>목록으로 돌아가기</span>
          </Button>
        </div>

        {/* 안내 메시지 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4">
            갤러리 관리 안내
          </h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• 갤러리 수정/삭제 시 작성 시 입력한 비밀번호가 필요합니다.</p>
            <p>• 이미지를 클릭하면 큰 화면으로 볼 수 있습니다.</p>
            <p>• 부적절한 내용의 갤러리는 관리자에 의해 삭제될 수 있습니다.</p>
            <p>• 문의사항은 고객센터(1588-1234)로 연락해주세요.</p>
          </div>
        </div>
      </div>

      {/* 라이트박스 */}
      {lightboxOpen && images.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative max-w-4xl max-h-full p-4">
            {/* 닫기 버튼 */}
            <Button
              variant="outline"
              size="sm"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>

            {/* 이전 버튼 */}
            {images.length > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={previousImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}

            {/* 다음 버튼 */}
            {images.length > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-100"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}

            {/* 이미지 */}
            <img
              src={`${BASE_URL}${images[currentImageIndex].file_path}`}
              alt={images[currentImageIndex].alt_text || `Gallery image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* 이미지 정보 */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>

          {/* 배경 클릭 시 닫기 */}
          <div 
            className="absolute inset-0 -z-10" 
            onClick={closeLightbox}
          ></div>
        </div>
      )}
    </div>
  );
}

