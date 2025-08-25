import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Calendar, 
  Eye, 
  Heart, 
  MessageCircle, 
  ExternalLink, 
  Instagram, 
  Youtube, 
  Facebook, 
  ArrowLeft,
  Edit,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { formatDate } from '../utils/dateFormat';
import { BASE_URL } from "../src/lib/constants";

//const BASE_URL = 'http://localhost:5000';

interface TravelReview {
  id: number;
  title: string;
  content: string;
  author_name: string;
  author_email?: string;
  author_phone?: string;
  created_at: string;
  updated_at: string;
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

interface TravelReviewDetailPageProps {
  setCurrentPage: (page: string) => void;
  reviewId: string;
}

const TravelReviewDetailPage: React.FC<TravelReviewDetailPageProps> = ({ setCurrentPage, reviewId }) => {
  const id = reviewId;
  const [review, setReview] = useState<TravelReview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 여행 후기 상세 조회
  const fetchReviewDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/travel-reviews/${id}`);
      const data = await response.json();

      if (data.success) {
        setReview(data.data.post);
      } else {
        setError(data.message || '여행 후기를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('여행 후기 상세 조회 실패:', error);
      setError('서버 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchReviewDetail();
    }
  }, [id]);

  // 소셜 미디어 링크 렌더링
  const renderSocialLinks = () => {
    const links = [];
    
    if (review?.instagram_url) {
      links.push(
        <a 
          key="instagram" 
          href={review.instagram_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-lg transition-colors"
        >
          <Instagram size={20} />
          <span>Instagram에서 보기</span>
          <ExternalLink size={16} />
        </a>
      );
    }
    
    if (review?.youtube_url) {
      links.push(
        <a 
          key="youtube" 
          href={review.youtube_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors"
        >
          <Youtube size={20} />
          <span>YouTube에서 보기</span>
          <ExternalLink size={16} />
        </a>
      );
    }
    
    if (review?.facebook_url) {
      links.push(
        <a 
          key="facebook" 
          href={review.facebook_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
        >
          <Facebook size={20} />
          <span>Facebook에서 보기</span>
          <ExternalLink size={16} />
        </a>
      );
    }

         if (review?.threads_url) {
       links.push(
         <a 
           key="threads" 
           href={review.threads_url} 
           target="_blank" 
           rel="noopener noreferrer"
           className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors"
         >
           <MessageCircle size={20} />
           <span>Threads에서 보기</span>
           <ExternalLink size={16} />
         </a>
       );
     }

    return links.length > 0 ? (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">소셜 미디어 링크</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {links}
        </div>
      </div>
    ) : null;
  };

  // 미리보기 이미지 렌더링
  const renderPreviewImage = () => {
    if (review?.preview_image) {
      return (
        <div className="relative w-full h-64 mb-6 overflow-hidden rounded-lg">
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">여행 후기를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !review) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <AlertCircle size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">여행 후기를 찾을 수 없습니다</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => setCurrentPage('travel-reviews')}>
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 헤더 */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => setCurrentPage('travel-reviews')}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          목록으로 돌아가기
        </Button>
        
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{review.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                {formatDate(review.created_at)}
              </span>
              <span className="flex items-center gap-1">
                <Eye size={16} />
                조회 {review.view_count}
              </span>
              {review.category_name && (
                <Badge variant="secondary">{review.category_name}</Badge>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Edit size={16} className="mr-2" />
              수정
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 size={16} className="mr-2" />
              삭제
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 메인 콘텐츠 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 미리보기 이미지 */}
          {renderPreviewImage()}

          {/* 미리보기 정보 */}
          {review.preview_title && (
            <Card>
              <CardHeader>
                <CardTitle>링크 미리보기</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{review.preview_title}</h4>
                    {review.preview_description && (
                      <p className="text-gray-600 mt-1">{review.preview_description}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 여행 후기 내용 */}
          {review.content && (
            <Card>
              <CardHeader>
                <CardTitle>여행 후기</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {review.content}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 소셜 미디어 링크 */}
          {renderSocialLinks()}
        </div>

        {/* 사이드바 */}
        <div className="space-y-6">
          {/* 작성자 정보 */}
          <Card>
            <CardHeader>
              <CardTitle>작성자 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">작성자</span>
                  <p className="font-medium">{review.author_name}</p>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">작성일</span>
                  <span>{formatDate(review.created_at)}</span>
                </div>
                {review.updated_at !== review.created_at && (
                  <>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">수정일</span>
                      <span>{formatDate(review.updated_at)}</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 통계 정보 */}
          <Card>
            <CardHeader>
              <CardTitle>통계</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <Eye size={16} />
                    조회수
                  </span>
                  <span className="font-medium">{review.view_count.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <Heart size={16} />
                    좋아요
                  </span>
                  <span className="font-medium">{review.like_count.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <MessageCircle size={16} />
                    댓글
                  </span>
                  <span className="font-medium">{review.comment_count.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 관련 링크 */}
          <Card>
            <CardHeader>
              <CardTitle>관련 링크</CardTitle>
            </CardHeader>
            <CardContent>
                             <div className="space-y-2">
                 <button 
                   onClick={() => setCurrentPage('travel-reviews')}
                   className="block text-blue-600 hover:text-blue-700 text-sm text-left"
                 >
                   ← 여행 후기 목록
                 </button>
                 <button 
                   onClick={() => setCurrentPage('travel-reviews-write')}
                   className="block text-blue-600 hover:text-blue-700 text-sm text-left"
                 >
                   + 새 여행 후기 작성
                 </button>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TravelReviewDetailPage;