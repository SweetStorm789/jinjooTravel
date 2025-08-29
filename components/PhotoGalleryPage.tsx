import { Plus, Calendar, User, ChevronRight, Home, Eye, Heart, Search, Filter, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState, useEffect } from "react";
import { BASE_URL } from '@/lib/constants';

interface PhotoGalleryPageProps {
  setCurrentPage: (page: string) => void;
  isAdmin?: boolean;
}

interface GalleryItem {
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
  image_count: number;
}

interface GalleryCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
}

interface GalleryPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function PhotoGalleryPage({ setCurrentPage, isAdmin = false }: PhotoGalleryPageProps) {
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [pagination, setPagination] = useState<GalleryPagination>({
    page: 1,
    limit: 12, // 갤러리는 더 많이 표시
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

  // 포토갤러리 목록 조회
  const fetchGalleryList = async () => {
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

      const response = await fetch(`${BASE_URL}/api/gallery?${params}`);
      
      if (!response.ok) {
        throw new Error('포토갤러리 목록을 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      
      if (data.success) {
        // console.log('📋 갤러리 데이터 로드됨:', data.data.posts.length, '개');
        setGalleryList(data.data.posts);
        setPagination(data.data.pagination);
      } else {
        throw new Error(data.message || '포토갤러리 목록 조회 실패');
      }
    } catch (err) {
      console.error('포토갤러리 조회 오류:', err);
      setError(err instanceof Error ? err.message : '포토갤러리 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 카테고리 목록 조회
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/gallery/categories`);
      
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
    // console.log('🚀 PhotoGalleryPage 마운트됨');
    fetchCategories();
  }, []);

  // 페이지나 필터 변경 시 포토갤러리 목록 다시 로드
  useEffect(() => {
    fetchGalleryList();
  }, [currentPageNum, selectedCategory, searchQuery]);

  // 검색 핸들러
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPageNum(1);
    fetchGalleryList();
  };

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    setCurrentPageNum(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      day: 'numeric'
    });
  };

  return (
    <div className="bg-background min-h-screen">
      {/* 헤더 섹션 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-medium text-foreground mb-2">
                포토갤러리
              </h1>
              <p className="text-muted-foreground">
                아름다운 여행의 순간들을 사진으로 공유해보세요
              </p>
            </div>
            
            {/* 브레드크럼 */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Home className="h-4 w-4" />
              <ChevronRight className="h-4 w-4" />
              <span>게시판</span>
              <ChevronRight className="h-4 w-4" />
              <span>포토갤러리</span>
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
                  placeholder="제목으로 검색..."
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
              {loading ? '로딩 중...' : `총 ${pagination.total.toLocaleString()}개의 갤러리`}
            </h2>
            {selectedCategory && selectedCategory !== 'all' && (
              <Badge variant="outline">
                {categories.find(c => c.slug === selectedCategory)?.name}
              </Badge>
            )}
          </div>
          
          <Button 
            onClick={() => setCurrentPage("gallery-form")}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>갤러리 등록</span>
          </Button>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* 포토갤러리 그리드 */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        ) : galleryList.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <ImageIcon className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              갤러리가 없습니다
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery || selectedCategory ? 
                '검색 조건에 맞는 갤러리가 없습니다.' : 
                '첫 번째 갤러리를 등록해보세요!'
              }
            </p>
            <Button 
              onClick={() => setCurrentPage("gallery-form")}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>갤러리 등록</span>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryList.map((gallery) => (
              <Card 
                key={gallery.id} 
                className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-[1.02]"
                onClick={() => setCurrentPage(`gallery-detail-${gallery.id}`)}
              >
                {/* 대표 이미지 */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  {gallery.featured_image ? (
                    <img
                      src={`${BASE_URL}${gallery.featured_image}`}
                      alt={gallery.title}
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: 'center',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        console.error('❌ 이미지 로드 실패:', gallery.title, e.currentTarget.src);
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
                        
                        console.group(`🖼️ 갤러리 이미지 로드 - ${gallery.title}`);
                                // console.log('📸 Image URL:', `${BASE_URL}${gallery.featured_image}`);
        // console.log('📁 Original featured_image:', gallery.featured_image);
        // console.log('🆔 Gallery ID:', gallery.id);
        // console.log('📝 Gallery Title:', gallery.title);
        // console.log('📐 Image dimensions:', `${img.naturalWidth}x${img.naturalHeight}`);
        // console.log('🎨 Display mode:', img.naturalWidth < img.naturalHeight ? 'contain (세로)' : 'cover (가로)');
                        console.groupEnd();
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <ImageIcon className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                  
                  {/* 이미지 개수 오버레이 */}
                  {gallery.image_count > 0 && (
                    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      📷 {gallery.image_count}
                    </div>
                  )}
                  
                  {/* 카테고리 배지 */}
                  {gallery.category_name && (
                    <div className="absolute top-2 left-2">
                      <Badge className={getCategoryColor(gallery.category_name)}>
                        {gallery.category_name}
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  {/* 제목 */}
                  <h3 className="font-medium text-foreground mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                    {gallery.title}
                  </h3>
                  
                  {/* 메타 정보 */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{gallery.author_name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(gallery.created_at)}</span>
                    </div>
                  </div>
                  
                  {/* 상호작용 정보 */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{gallery.view_count}</span>
                      </div>
                      {gallery.like_count > 0 && (
                        <div className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{gallery.like_count}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* 설명 미리보기 */}
                    {gallery.excerpt && (
                      <span className="text-xs text-gray-500 truncate max-w-20">
                        {gallery.excerpt.slice(0, 20)}...
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* 페이지네이션 */}
        {!loading && galleryList.length > 0 && pagination.totalPages > 1 && (
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

        {/* 안내 메시지 */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4">
            포토갤러리 이용 안내
          </h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• 여행지의 아름다운 사진들을 업로드하여 공유해주세요.</p>
            <p>• 저작권이 있는 이미지나 부적절한 내용은 삭제될 수 있습니다.</p>
            <p>• 고화질 이미지를 업로드하시면 더욱 아름답게 감상하실 수 있습니다.</p>
            <p>• 사진에 대한 간단한 설명을 함께 작성해주시면 좋습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}