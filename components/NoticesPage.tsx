import { Plus, Calendar, User, ChevronRight, Home, Loader2, AlertCircle, ChevronLeft, Search, Filter } from "lucide-react";
import { BASE_URL } from '@/lib/constants';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState, useEffect } from "react";

interface NoticesPageProps {
  setCurrentPage: (page: string) => void;
  isAdmin?: boolean;
}

interface BoardPost {
  id: string;
  board_type: string;
  category_id?: number;
  title: string;
  content_html: string;
  content_text: string;
  excerpt?: string;
  author_name: string;
  author_email?: string;
  status: 'draft' | 'published' | 'private' | 'deleted' | 'pending';
  is_featured: boolean;
  is_notice: boolean;
  view_count: number;
  like_count: number;
  comment_count: number;
  featured_image?: string;
  tags?: string;
  published_at?: string;
  expired_at?: string;
  created_at: string;
  updated_at: string;
  category_name?: string;
  category_slug?: string;
}



interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// 텍스트에서 요약 생성 함수
const generateSummary = (text: string, maxLength: number = 150): string => {
  if (!text) return "";
  
  const cleanText = text.replace(/\s+/g, ' ').trim();
  
  if (cleanText.length <= maxLength) {
    return cleanText;
  }
  
  const truncated = cleanText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > maxLength * 0.7) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
};

// 날짜 포맷팅 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// 상대적 시간 표시 함수
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

export default function NoticesPage({ setCurrentPage, isAdmin = false }: NoticesPageProps) {
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });



  // 공지사항 목록 가져오기
  const fetchPosts = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        board_type: 'notice',
        status: 'published',
        page: page.toString(),
        limit: limit.toString(),
        sort: 'created_at',
        order: 'DESC'
      });

      if (searchTerm) {
        params.append('search', searchTerm);
      }



      const response = await fetch(`${BASE_URL}/api/board?${params}`);
      if (!response.ok) {
        throw new Error('공지사항을 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      if (data.success) {
        setPosts(data.data || []);
        setPagination({
          currentPage: data.pagination?.currentPage || 1,
          totalPages: data.pagination?.totalPages || 1,
          totalItems: data.pagination?.totalItems || 0,
          itemsPerPage: data.pagination?.itemsPerPage || limit
        });
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

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages && page !== pagination.currentPage) {
      fetchPosts(page, pagination.itemsPerPage);
      
      // 페이지 변경 시 화면 상단으로 스크롤
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // 검색 실행
  const handleSearch = () => {
    fetchPosts(1, pagination.itemsPerPage);
  };

  // 검색어 입력 시 엔터키 처리
  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };



  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchPosts();
  }, []);

  // 로딩 중인 경우
  if (loading && posts.length === 0) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-muted-foreground">공지사항을 불러오는 중...</span>
        </div>
      </div>
    );
  }

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
                진주여행사의 최신 소식과 중요한 공지사항을 확인하세요
              </p>
            </div>
            
            {/* 브레드크럼 */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Home className="h-4 w-4" />
              <ChevronRight className="h-4 w-4" />
              <span>공지사항</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 에러 메시지 */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* 검색 및 필터 */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="공지사항 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch}>검색</Button>
          </div>
          
          <div className="flex gap-2">
          </div>
        </div>

        {/* 상단 정보 */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-medium">
              총 {pagination.totalItems}개의 공지사항
            </h2>
            {pagination.totalItems > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                {pagination.currentPage}페이지 / {pagination.totalPages}페이지 
                ({((pagination.currentPage - 1) * pagination.itemsPerPage) + 1}-
                {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)}번째)
              </p>
            )}
          </div>
          
          {isAdmin && (
            <Button 
              onClick={() => setCurrentPage("notice-form")}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>새 공지사항 등록</span>
            </Button>
          )}
        </div>

        {/* 공지사항이 없는 경우 */}
        {posts.length === 0 && !loading && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">등록된 공지사항이 없습니다</h3>
                  <p className="text-gray-500 mt-1">첫 번째 공지사항을 등록해보세요</p>
                </div>
                {isAdmin && (
                  <Button onClick={() => setCurrentPage("notice-form")} className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    공지사항 등록하기
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 공지사항 리스트 */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card 
              key={post.id} 
              className="overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => setCurrentPage(`notice-detail-${post.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* <div className="flex items-center gap-2 mb-2">
                      {post.is_notice && (
                        <Badge variant="destructive" className="text-xs">공지</Badge>
                      )}
                      {post.is_featured && (
                        <Badge variant="secondary" className="text-xs">추천</Badge>
                      )}
                      {post.category_name && (
                        <Badge variant="outline" className="text-xs">{post.category_name}</Badge>
                      )}
                    </div> */}
                    
                    <h3 className="text-lg font-medium text-foreground hover:text-orange-600 transition-colors duration-200 mb-2">
                      {post.title}
                    </h3>
                    
                    {post.excerpt && (
                      <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                        {generateSummary(post.excerpt)}
                      </p>
                    )}
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{post.author_name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{getRelativeTime(post.created_at)}</span>
                      </div>
                      <span>조회 {post.view_count}</span>
                    </div>
                  </div>
                  
                  {post.featured_image && (
                    <div className="ml-4 flex-shrink-0">
                      <img 
                        src={post.featured_image} 
                        alt={post.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 페이지네이션 */}
        {pagination.totalItems > 0 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-2">
              {/* 이전 페이지 버튼 */}
              {pagination.totalPages > 1 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={pagination.currentPage === 1}
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  className="flex items-center space-x-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>이전</span>
                </Button>
              )}

              {/* 페이지 번호들 */}
              <div className="flex items-center space-x-1">
                {(() => {
                  const pages = [];
                  const maxVisiblePages = 5;
                  let startPage = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2));
                  let endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);
                  
                  if (endPage - startPage + 1 < maxVisiblePages) {
                    startPage = Math.max(1, endPage - maxVisiblePages + 1);
                  }

                  // 첫 페이지
                  if (startPage > 1) {
                    pages.push(
                      <Button 
                        key={1}
                        variant={1 === pagination.currentPage ? "default" : "outline"} 
                        size="sm"
                        onClick={() => handlePageChange(1)}
                        className="min-w-[40px]"
                      >
                        1
                      </Button>
                    );
                    if (startPage > 2) {
                      pages.push(<span key="ellipsis1" className="px-2 text-muted-foreground">...</span>);
                    }
                  }

                  // 중간 페이지들
                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(
                      <Button 
                        key={i}
                        variant={i === pagination.currentPage ? "default" : "outline"} 
                        size="sm"
                        onClick={() => handlePageChange(i)}
                        className="min-w-[40px]"
                      >
                        {i}
                      </Button>
                    );
                  }

                  // 마지막 페이지
                  if (endPage < pagination.totalPages) {
                    if (endPage < pagination.totalPages - 1) {
                      pages.push(<span key="ellipsis2" className="px-2 text-muted-foreground">...</span>);
                    }
                    pages.push(
                      <Button 
                        key={pagination.totalPages}
                        variant={pagination.totalPages === pagination.currentPage ? "default" : "outline"} 
                        size="sm"
                        onClick={() => handlePageChange(pagination.totalPages)}
                        className="min-w-[40px]"
                      >
                        {pagination.totalPages}
                      </Button>
                    );
                  }

                  return pages;
                })()}
              </div>

              {/* 다음 페이지 버튼 */}
              {pagination.totalPages > 1 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={pagination.currentPage === pagination.totalPages}
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  className="flex items-center space-x-1"
                >
                  <span>다음</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}