import { Plus, Calendar, User, ChevronRight, Home, Eye, MessageCircle, CheckCircle, Clock, Search, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState, useEffect } from "react";
import { BASE_URL } from "../src/lib/constants";

interface QnaPageProps {
  setCurrentPage: (page: string) => void;
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
  created_at: string;
  updated_at: string;
  view_count: number;
  comment_count: number;
  is_secret: boolean;
  status: 'draft' | 'published' | 'private' | 'deleted' | 'pending';
  category_id?: number;
  category_name?: string;
  category_slug?: string;
  is_answered: boolean;
}

interface QnaCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
}

interface QnaPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function QnaPage({ setCurrentPage, isAdmin = false }: QnaPageProps) {
  const [qnaList, setQnaList] = useState<QnaItem[]>([]);
  const [categories, setCategories] = useState<QnaCategory[]>([]);
  const [pagination, setPagination] = useState<QnaPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  
  // 필터 상태
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPageNum, setCurrentPageNum] = useState(1);

  // QnA 목록 조회
  const fetchQnaList = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams({
        page: currentPageNum.toString(),
        limit: pagination.limit.toString(),
        status: 'published'
      });

      if (selectedCategory && selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }

      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }

      const response = await fetch(`${BASE_URL}/api/qna?${params}`);
      
      if (!response.ok) {
        throw new Error('QnA 목록을 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      
      if (data.success) {
        setQnaList(data.data.posts);
        setPagination(data.data.pagination);
      } else {
        throw new Error(data.message || 'QnA 목록 조회 실패');
      }
    } catch (err) {
      console.error('QnA 조회 오류:', err);
      setError(err instanceof Error ? err.message : 'QnA 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 카테고리 목록 조회
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/qna/categories`);
      
      if (!response.ok) {
        throw new Error('카테고리를 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      
      if (data.success) {
        setCategories(data.data);
      }
    } catch (err) {
      console.error('카테고리 조회 오류:', err);
    }
  };

  // 컴포넌트 마운트 시 초기 데이터 로드
  useEffect(() => {
    fetchCategories();
  }, []);

  // 페이지나 필터 변경 시 QnA 목록 다시 로드
  useEffect(() => {
    fetchQnaList();
  }, [currentPageNum, selectedCategory, searchQuery]);

  // 검색 핸들러
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPageNum(1);
    fetchQnaList();
  };

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    setCurrentPageNum(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 카테고리 색상 반환
  const getCategoryColor = (categoryName?: string) => {
    switch (categoryName) {
      case "성지순례례문의": return "bg-blue-100 text-blue-800";
      case "예약문의": return "bg-green-100 text-green-800";
      case "일반문의": return "bg-gray-100 text-gray-800";
      case "취소/환불": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
        {/* 검색 및 필터 */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* 검색 */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="제목 또는 내용으로 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </form>
            
            {/* 카테고리 필터 */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 카테고리</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* 상단 정보 및 액션 버튼 */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-medium">
              {loading ? '로딩 중...' : `총 ${pagination.total.toLocaleString()}개의 질문`}
            </h2>
            {selectedCategory && selectedCategory !== 'all' && (
              <Badge variant="outline">
                {categories.find(c => c.slug === selectedCategory)?.name}
              </Badge>
            )}
          </div>
          
          {/* Admin 권한 체크 - 관리자에게만 등록 버튼 표시 */}
          {isAdmin && (
            <Button 
              onClick={() => setCurrentPage("qna-form")}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>새 질문 등록</span>
            </Button>
          )}
          
          <Button 
            onClick={() => setCurrentPage("qna-form")}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>질문하기</span>
          </Button>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* 질문답변 리스트 */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : qnaList.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MessageCircle className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              질문이 없습니다
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery || selectedCategory ? 
                '검색 조건에 맞는 질문이 없습니다.' : 
                '첫 번째 질문을 남겨보세요!'
              }
            </p>
            <Button 
              onClick={() => setCurrentPage("qna-form")}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>질문하기</span>
            </Button>
          </div>
        ) : (
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
                        {qna.is_answered ? (
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <Clock className="h-5 w-5 text-orange-600 flex-shrink-0" />
                        )}
                        <h3 className="text-lg font-medium text-foreground hover:text-blue-600 transition-colors duration-200 line-clamp-1">
                          {qna.title}
                        </h3>
                        {qna.is_secret && (
                          <Badge variant="outline" className="text-xs">
                            비공개
                          </Badge>
                        )}
                      </div>
                      
                      {/* 메타 정보 */}
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
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
                        {qna.comment_count > 0 && (
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{qna.comment_count}개 답변</span>
                          </div>
                        )}
                      </div>
                      
                      {/* 내용 미리보기 (비공개가 아닌 경우만) */}
                      {!qna.is_secret && qna.excerpt && (
                        <p className="text-foreground leading-relaxed line-clamp-2">
                          {qna.excerpt}
                        </p>
                      )}
                    </div>
                    
                    {/* 카테고리와 상태 배지 */}
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
                </CardContent>
              </Card>
            ))}
          </div>
        )}

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
        {!loading && qnaList.length > 0 && pagination.totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                disabled={!pagination.hasPrev}
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                이전
              </Button>
              
              <div className="flex items-center space-x-1">
                {/* 페이지 번호들 */}
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, index) => {
                  const startPage = Math.max(1, pagination.page - 2);
                  const pageNumber = startPage + index;
                  
                  if (pageNumber > pagination.totalPages) return null;
                  
                  return (
                    <Button
                      key={pageNumber}
                      variant={pageNumber === pagination.page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
                
                {/* 더 많은 페이지가 있으면 ... 표시 */}
                {pagination.totalPages > 5 && pagination.page < pagination.totalPages - 2 && (
                  <>
                    <span className="px-2">...</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.totalPages)}
                    >
                      {pagination.totalPages}
                    </Button>
                  </>
                )}
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                disabled={!pagination.hasNext}
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                다음
              </Button>
            </div>
            
            {/* 페이지 정보 */}
            <div className="ml-6 text-sm text-gray-500 self-center">
              {pagination.page} / {pagination.totalPages} 페이지
            </div>
          </div>
        )}
      </div>
    </div>
  );
}