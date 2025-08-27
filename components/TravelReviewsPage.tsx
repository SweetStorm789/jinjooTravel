import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Calendar, Eye, Heart, MessageCircle, ExternalLink, Instagram, Youtube, Facebook } from 'lucide-react';
import { formatDate } from '../utils/dateFormat';

import { BASE_URL } from "../src/lib/constants";
//const BASE_URL = 'http://localhost:5000';

interface TravelReview {
  id: number;
  title: string;
  content: string;
  author_name: string;
  created_at: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  preview_image?: string;
  preview_title?: string;
  preview_description?: string;
  instagram_url?: string;
  youtube_url?: string;
  facebook_url?: string;
  threads_url?: string;
  category_name?: string;
  category_slug?: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface TravelReviewsPageProps {
  setCurrentPage: (page: string) => void;
}

const TravelReviewsPage: React.FC<TravelReviewsPageProps> = ({ setCurrentPage }) => {
  const [reviews, setReviews] = useState<TravelReview[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPageState, setCurrentPageState] = useState(1);

  // 여행 후기 목록 조회
  const fetchReviews = async (page = 1, category = '', search = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12'
      });
      
      if (category && category !== 'all') params.append('category', category);
      if (search) params.append('search', search);

      const response = await fetch(`${BASE_URL}/api/travel-reviews?${params}`);
      const data = await response.json();

      if (data.success) {
        setReviews(data.data.posts);
        setPagination(data.data.pagination);
      }
    } catch (error) {
      console.error('여행 후기 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 카테고리 목록 조회
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/travel-reviews/categories`);
      const data = await response.json();

      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('카테고리 목록 조회 실패:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchReviews();
  }, []);

  // 검색 및 필터링
  const handleSearch = () => {
    setCurrentPageState(1);
    fetchReviews(1, selectedCategory, searchTerm);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPageState(1);
    fetchReviews(1, category, searchTerm);
  };

  const handlePageChange = (page: number) => {
    setCurrentPageState(page);
    fetchReviews(page, selectedCategory, searchTerm);
  };

  // 소셜 미디어 아이콘 렌더링
  const renderSocialIcons = (review: TravelReview) => {
    const icons: any[] = [];
    
    if (review.instagram_url) {
      icons.push(
        <a key="instagram" href={review.instagram_url} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600">
          <Instagram size={16} />
        </a>
      );
    }
    
    if (review.youtube_url) {
      icons.push(
        <a key="youtube" href={review.youtube_url} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-600">
          <Youtube size={16} />
        </a>
      );
    }
    
    if (review.facebook_url) {
      icons.push(
        <a key="facebook" href={review.facebook_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
          <Facebook size={16} />
        </a>
      );
    }

    return icons.length > 0 ? (
      <div className="flex gap-2 mt-2">
        {icons}
      </div>
    ) : null;
  };

  // 미리보기 이미지 렌더링
  const renderPreviewImage = (review: TravelReview) => {
    if (review.preview_image) {
      return (
        <div className="relative h-48 overflow-hidden rounded-lg">
          <img
            src={`${BASE_URL}/api/travel-reviews/proxy-image?url=${encodeURIComponent(review.preview_image)}`}
            alt={review.preview_title || review.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // 이미지 로드 실패 시 숨김
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      );
    }
    return null;
  };

  if (loading && reviews.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">여행 후기를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">여행 후기</h1>
        <p className="text-gray-600">다른 여행자들의 소중한 경험을 공유해보세요</p>
      </div>

      {/* 검색 및 필터 */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="여행 후기 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="카테고리 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleSearch} className="w-full sm:w-auto">
          검색
        </Button>
        <Button 
          onClick={() => setCurrentPage('travel-reviews-write')} 
          variant="default" 
          className="w-full sm:w-auto"
        >
          후기 작성
        </Button>
      </div>

      {/* 여행 후기 목록 */}
      {reviews.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Calendar size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">아직 여행 후기가 없습니다</h3>
          <p className="text-gray-600 mb-4">첫 번째 여행 후기를 작성해보세요!</p>
          <Button onClick={() => setCurrentPage('travel-reviews-write')}>
            후기 작성하기
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2 mb-2">
                      <button 
                        onClick={() => setCurrentPage(`travel-reviews-detail-${review.id}`)}
                        className="hover:text-blue-600 transition-colors text-left"
                      >
                        {review.title}
                      </button>
                    </CardTitle>
                    {review.category_name && (
                      <Badge variant="secondary" className="mb-2">
                        {review.category_name}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                {/* 미리보기 이미지 */}
                {renderPreviewImage(review)}
                
                {/* 미리보기 정보 */}
                {review.preview_title && (
                  <div className="mb-3">
                    <h4 className="font-medium text-sm text-gray-900 line-clamp-1">
                      {review.preview_title}
                    </h4>
                    {review.preview_description && (
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                        {review.preview_description}
                      </p>
                    )}
                  </div>
                )}

                {/* 소셜 미디어 링크 */}
                {renderSocialIcons(review)}

                {/* 메타 정보 */}
                <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye size={14} />
                      {review.view_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart size={14} />
                      {review.like_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={14} />
                      {review.comment_count}
                    </span>
                  </div>
                  <span>{formatDate(review.created_at)}</span>
                </div>

                {/* 작성자 정보 */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      작성자: {review.author_name}
                    </span>
                    <button 
                      onClick={() => setCurrentPage(`travel-reviews-detail-${review.id}`)}
                      className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                    >
                      자세히 보기
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 페이지네이션 */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {pagination.hasPrev && (
              <Button
                variant="outline"
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                이전
              </Button>
            )}
            
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === pagination.page ? "default" : "outline"}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
            
            {pagination.hasNext && (
              <Button
                variant="outline"
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                다음
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelReviewsPage;